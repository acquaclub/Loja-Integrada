import re, sys
import pandas as pd
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.utils import get_column_letter

ORIGEM, SAIDA = sys.argv[1], sys.argv[2]
d = pd.read_excel(ORIGEM, dtype=str)
d = d.fillna('')

pais = {r['sku']: r for _, r in d[d.tipo == 'com-variacao'].iterrows()}

def n_fotos(r):
    return sum(1 for i in range(1, 6) if r.get(f'imagem-{i}'))

def categoria(r):
    nv = [r.get(f'categoria-nome-nivel-{i}') for i in range(2, 6)]
    nv = [x for x in nv if x]
    return (nv[0] if nv else ''), (' > '.join(nv[1:]) if len(nv) > 1 else '')

def ref_no_nome(nome, sku):
    # códigos de fábrica que aparecem no nome (ex.: CFP-MLN-90-XX-1ATA), quando diferentes do SKU
    achados = re.findall(r'\b[A-Z0-9]{2,}(?:[-/][A-Z0-9]{1,})+\b|\b(?=[A-Z0-9]*\d)(?=[A-Z0-9]*[A-Z])[A-Z0-9]{6,}\b', nome or '')
    achados = [a for a in achados if a != sku and not re.fullmatch(r'\d+(V|L|CM|MM|W)', a)]
    return ', '.join(dict.fromkeys(achados))

linhas = []
for _, r in d.iterrows():
    if r['tipo'] == 'com-variacao':
        continue
    pai = pais.get(r['sku-pai']) if r['tipo'] == 'variacao' else None
    base = pai if pai is not None else r
    cat, sub = categoria(base)
    variacao = ' / '.join(x for x in [r.get('grade-voltagem'), r.get('grade-cor')] if x)
    linhas.append({
        'marca': base.get('marca') or '(sem marca)',
        'sku': r['sku'],
        'nome': base.get('nome') or '',
        'variacao': variacao,
        'tipo': 'Variação' if pai is not None else 'Simples',
        'sku_pai': r.get('sku-pai') or '',
        'ref': ref_no_nome(base.get('nome'), r['sku']),
        'cat': cat, 'sub': sub,
        'ativo': r['ativo'],
        'pai_ativo': (pai['ativo'] if pai is not None else ''),
        'preco': float(r['preco-cheio'] or 0),
        'gtin': r.get('gtin') or '',
        'fotos': n_fotos(base),
        'id': int(r['id']),
    })

import cruzar
for l in linhas:
    l['sit'] = l['fonte'] = l['obs'] = None
    marca_lista = 'Dometic' if l['sku'] == 'DM50CF' else l['marca']
    if marca_lista not in cruzar.FONTES:
        continue
    res = cruzar.procurar(marca_lista, l['sku'], l['nome'])
    DICAS = {'CBB300C': ('Evol – Estoque 05/10/2026', 'Mesmo modelo (Modena 28") aparece na lista como CBY300 | Lista: DISPONÍVEL'),
             'TR08HC': ('Tecno – Gestão de estoque 02/10/2026', 'Umidor 38cm Professional aparece na lista como TR06HC – NOVA VERSÃO | Lista: Disponível'),
             'DM50CF': ('Dometic – lista de preços fev/2026', 'Na lista como "DM 50 CF" (SKU Dometic 9600049995): frigobar 50L compressor, gaveta, 127V, sem painel decorativo. Cadastro sem marca: preencher Dometic')}
    if res is None and l['sku'] in DICAS:
        l['sit'], (l['fonte'], l['obs']) = ('Em linha' if l['sku'] == 'DM50CF' else 'Confirmar'), DICAS[l['sku']]
        continue
    if res is None:
        l['sit'] = 'Não encontrado'
        l['fonte'] = {'Evol': 'Evol – Estoque 05/10/2026', 'Tecno': 'Tecno – Gestão de estoque 02/10/2026',
                      'Bertazzoni': 'Tecno – Gestão de estoque 02/10/2026', 'Elettromec': 'Elettromec – Posição 25/09/2026',
                      'Gorenje': 'Gorenje – lista de preços (sem coluna de estoque)', 'Dometic': 'Dometic – lista de preços fev/2026'}[marca_lista]
        l['obs'] = 'Código não consta na lista da marca'
        continue
    l['sit'] = res['classe']
    l['fonte'] = res['fonte']
    partes = [] if res['tipo'] == 'Exato' else [res['tipo']]
    if res.get('status_txt'):
        partes.append('Lista: ' + res['status_txt'])
    l['obs'] = ' | '.join(partes)

linhas.sort(key=lambda x: (x['marca'] == '(sem marca)', x['marca'].lower(), x['cat'], x['nome'], x['variacao']))

# ---------- alertas ----------
alertas = []
for sku, pai in pais.items():
    filhos = d[d['sku-pai'] == sku]
    ativos = filhos[filhos.ativo == 'S']
    if pai['ativo'] == 'N' and len(ativos):
        alertas.append(('Produto principal inativo com variação ativa', pai.get('marca') or '', sku,
                        pai['nome'], f"Variações ativas: {', '.join(ativos.sku)}. O produto não aparece no site; decidir se reativa ou inativa as variações."))
simples = d[d.tipo != 'variacao']
chave = simples.nome.str.lower().str.replace(r'[^a-z0-9]', '', regex=True)
for _, grupo in simples[chave.duplicated(keep=False)].groupby(chave):
    alertas.append(('Nome repetido (possível cadastro duplicado)', grupo.iloc[0].get('marca') or '',
                    ', '.join(grupo.sku), grupo.iloc[0]['nome'],
                    'Mesmo nome em SKUs diferentes: conferir se é o mesmo produto ou se falta diferenciar (ex.: abertura direita/esquerda).'))
for _, r in simples[simples.marca == ''].iterrows():
    alertas.append(('Sem marca cadastrada', '', r['sku'], r['nome'], 'Preencher a marca no cadastro.'))
for _, r in simples[simples['categoria-nome-nivel-2'] == ''].iterrows():
    alertas.append(('Sem categoria', r.get('marca') or '', r['sku'], r['nome'], 'Produto não aparece em nenhuma categoria do menu.'))
sem_gtin = sum(1 for l in linhas if not l['gtin'])

# ---------- planilha ----------
wb = Workbook()
F = 'Arial'
fonte = Font(name=F, size=10)
negrito = Font(name=F, size=10, bold=True)
cab_fonte = Font(name=F, size=10, bold=True, color='FFFFFF')
cab_fundo = PatternFill('solid', fgColor='1A1A1A')
entrada = PatternFill('solid', fgColor='FFF2CC')
fino = Side(style='thin', color='D9D9D9')
borda = Border(bottom=fino)

def cabecalho(ws, linha, titulos, larguras):
    for i, (t, w) in enumerate(zip(titulos, larguras), 1):
        c = ws.cell(row=linha, column=i, value=t)
        c.font, c.fill = cab_fonte, cab_fundo
        c.alignment = Alignment(vertical='center', wrap_text=True)
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[linha].height = 30

# Aba SKUs
ws = wb.active
ws.title = 'SKUs'
tit = ['Marca', 'SKU (código no site)', 'Produto', 'Variação', 'Tipo', 'SKU do produto principal',
       'Código no nome', 'Categoria', 'Subcategoria', 'Ativo no site', 'Produto principal ativo',
       'Visível no site', 'Preço cheio (R$)', 'GTIN/EAN', 'Fotos',
       'Situação na marca', 'Fonte (planilha/data)', 'Observação', 'Ação sugerida', 'ID Loja Integrada']
cabecalho(ws, 1, tit, [14, 20, 62, 16, 10, 20, 22, 26, 24, 9, 11, 10, 13, 16, 7, 17, 22, 30, 30, 13])
for i, l in enumerate(linhas, 2):
    vals = [l['marca'], l['sku'], l['nome'], l['variacao'], l['tipo'], l['sku_pai'], l['ref'], l['cat'], l['sub'],
            l['ativo'], l['pai_ativo'],
            f'=IF(AND(J{i}="S",OR(K{i}="",K{i}="S")),"Sim","Não")',
            l['preco'], l['gtin'], l['fotos'], l['sit'], l['fonte'], l['obs'],
            f'=IF(P{i}="","Validar com a marca",IF(P{i}="Fora de linha","Excluir do site",'
            f'IF(P{i}="Em linha",IF(L{i}="Sim","OK","Em linha e fora do site: reativar?"),'
            f'IF(P{i}="Confirmar","Conferir com a marca (código novo?)","Não consta na lista: confirmar se saiu de linha"))))',
            l['id']]
    for j, v in enumerate(vals, 1):
        c = ws.cell(row=i, column=j, value=v)
        c.font = fonte
        c.border = borda
        if j in (2, 6, 7, 14):
            c.number_format = '@'
        if j in (16, 17, 18):
            c.fill = entrada
    ws.cell(row=i, column=13).number_format = '#,##0.00'
ultima = len(linhas) + 1
ws.freeze_panes = 'C2'
ws.auto_filter.ref = f'A1:{get_column_letter(len(tit))}{ultima}'
dv = DataValidation(type='list', formula1='"Em linha,Fora de linha,Confirmar,Não encontrado"', allow_blank=True)
ws.add_data_validation(dv)
dv.add(f'P2:P{ultima}')
vermelho = PatternFill('solid', fgColor='F8D7DA')
verde = PatternFill('solid', fgColor='D4EDDA')
cinza = Font(name=F, size=10, color='999999')
ws.conditional_formatting.add(f'S2:S{ultima}', FormulaRule(formula=[f'$S2="Excluir do site"'], fill=vermelho))
ws.conditional_formatting.add(f'S2:S{ultima}', FormulaRule(formula=[f'LEFT($S2,2)="OK"'], fill=verde))
ws.conditional_formatting.add(f'A2:O{ultima}', FormulaRule(formula=[f'$L2="Não"'], font=cinza))

# Aba Resumo
rs = wb.create_sheet('Resumo', 0)
rs['A1'] = 'Pente fino de SKUs: dentro e fora de linha'
rs['A1'].font = Font(name=F, size=14, bold=True)
rs['A2'] = 'Origem: exportação de produtos da Loja Integrada de 08/10/2026 (arquivo enviado pelo cliente). Uma linha por item vendável: produto simples ou variação (voltagem/cor).'
rs['A2'].font = Font(name=F, size=9, italic=True, color='666666')
tr = ['Marca', 'SKUs', 'Visíveis no site', 'Fora do site', 'Em linha', 'Fora de linha (excluir)', 'Confirmar (código novo?)', 'Não encontrado', 'Falta validar', 'Em linha e fora do site']
cabecalho(rs, 4, tr, [16, 8, 13, 12, 10, 14, 15, 14, 13, 18])
marcas = sorted({l['marca'] for l in linhas}, key=lambda m: (m == '(sem marca)', m.lower()))
R = f"SKUs!$A$2:$A${ultima}"
def cont(i, extra):
    return f'=COUNTIFS({R},$A{i}{extra})'
for i, m in enumerate(marcas, 5):
    vals = [m,
            cont(i, ''),
            cont(i, f',SKUs!$L$2:$L${ultima},"Sim"'),
            cont(i, f',SKUs!$L$2:$L${ultima},"Não"'),
            cont(i, f',SKUs!$P$2:$P${ultima},"Em linha"'),
            cont(i, f',SKUs!$P$2:$P${ultima},"Fora de linha"'),
            cont(i, f',SKUs!$P$2:$P${ultima},"Confirmar"'),
            cont(i, f',SKUs!$P$2:$P${ultima},"Não encontrado"'),
            f'=B{i}-E{i}-F{i}-G{i}-H{i}',
            cont(i, f',SKUs!$S$2:$S${ultima},"Em linha e fora do site: reativar?"')]
    for j, v in enumerate(vals, 1):
        c = rs.cell(row=i, column=j, value=v)
        c.font = fonte
        c.border = borda
tot = len(marcas) + 5
rs.cell(row=tot, column=1, value='Total').font = negrito
for j in range(2, 11):
    col = get_column_letter(j)
    c = rs.cell(row=tot, column=j, value=f'=SUM({col}5:{col}{tot-1})')
    c.font = negrito
    c.border = Border(top=Side(style='thin', color='1A1A1A'))
n = tot + 2
notas = [
    'Como usar',
    '1. Evol, Tecno, Bertazzoni (lista da Tecno) e Elettromec já vêm preenchidos pelo cruzamento com as listas das marcas. As demais marcas: preencher a coluna amarela "Situação na marca".',
    '   Regra combinada: Fora de linha (ou "não comercializar") = excluir do site. Disponível, indisponível com previsão, em breve, estoque baixo e sob consulta = em linha (fica).',
    '   "Confirmar" = o código do site não está na lista, mas há um código parecido (versão nova). "Não encontrado" = não consta na lista: confirmar com a marca se saiu de linha.',
    '2. A coluna "Ação sugerida" e este resumo se atualizam sozinhos.',
    '3. "Visível no site" = ativo no site e, se for variação, com o produto principal também ativo. Linhas em cinza não aparecem hoje na loja.',
    '4. "Código no nome": códigos de fábrica que aparecem no nome do produto e diferem do SKU; ajudam a achar o item na planilha da marca.',
    f'Observação: só {len(linhas) - sem_gtin} de {len(linhas)} itens têm GTIN/EAN cadastrado (útil para Google Shopping e para cruzar com as marcas).',
    f'Veja a aba Alertas: {len(alertas)} pontos de cadastro para conferir.',
]
for k, t in enumerate(notas):
    c = rs.cell(row=n + k, column=1, value=t)
    c.font = negrito if k == 0 else fonte
rs.freeze_panes = 'A5'

# Aba Alertas
alertas = [a for a in alertas if not ('TR14AVDB' in a[2] and 'TR14ARDB' in a[2])]
alertas.append(('Nome errado (não é duplicado)', 'Tecno', 'TR14AVDB, TR14ARDB', 'Adega de Vinhos Tecno Professional Gourmet 136 Litros Dual Zone de Embutir 220V - Abertura p/ Esquerda',
                'Pela lista da Tecno, TR14AVDB = inox, abertura p/ esquerda; TR14ARDB = para revestir, reversível. Corrigir o nome do TR14ARDB no cadastro.'))
al = wb.create_sheet('Alertas')
cabecalho(al, 1, ['Tipo de alerta', 'Marca', 'SKU(s)', 'Produto', 'O que fazer'], [40, 14, 34, 70, 80])
for i, a in enumerate(alertas, 2):
    for j, v in enumerate(a, 1):
        c = al.cell(row=i, column=j, value=v)
        c.font = fonte
        c.border = borda
        c.alignment = Alignment(wrap_text=True, vertical='top')
al.freeze_panes = 'A2'

from openpyxl.workbook.properties import CalcProperties
wb.calculation = CalcProperties(fullCalcOnLoad=True)
wb.save(SAIDA)
print('itens', len(linhas), 'marcas', len(marcas), 'alertas', len(alertas), 'sem gtin', sem_gtin)
