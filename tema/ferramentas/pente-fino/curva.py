import re
import pandas as pd
from novos import df as listas, norm

B = '/tmp/claude-0/-home-user-Loja-Integrada/0b260f62-f894-5c80-bcd2-1eb1b4038619/scratchpad/skus/'
LIMITE, MARGEM = 500, 70

site = pd.read_excel(B + 'produtos.xlsx', dtype=str).fillna('')
DELETADOS = set(open(B + 'deletados.txt').read().split())
ATUALIZAR = {  # sucessores que entram pela atualização de anúncio existente (não contam como novos)
    'EFNEB0352C', 'EFNEB0352D', 'EMCEB0352B', 'EMCEB0352C', 'EGAEB0062C', 'EGAEB0062D', 'ECTGD4QM3C', 'ECTGD4QM3D',
    'CBY300', 'JC145CL220R', 'TR06HC', 'TG14EXDP', 'TG14EXDA', 'TO81EXDAP', 'TO81EXDA', 'TR10GFXDA',
    'FRLL45XXNPLA', 'FRLL45XXNGZA', 'FRLL60XXNPLA', 'FRLL60XXNGZA', 'CKI4Q60CI2KSA', 'DI2Q30CI2KSA',
    'FGAN90LC2TNA', 'FMEL90LC2TNA', 'GA6S14XX2TNA', 'GA6S14BM2TNA', 'BCBI88XV2VPA', 'FBBI88XV2VPA',
    'BCBI145XV2VPA', 'BCBI145XV2VPB', 'FBBI145XV2VPA'}
no_site = {norm(s) for s in site.sku if s not in DELETADOS}
# códigos da lista que batem com o site com sufixo (ex.: CBK401(B))
def ja_no_site(cod):
    n = norm(cod)
    return n in no_site or any(n.startswith(s) and len(n) - len(s) <= 2 and len(s) >= 5 for s in no_site)

atual = site[~site.sku.isin(DELETADOS)]
pais_vazios = [p for p in atual[atual.tipo == 'com-variacao'].sku if atual[atual['sku-pai'] == p].empty]
cadastros_hoje = len(atual) - len(pais_vazios)  # anúncios + variações
anuncios_hoje = len(atual[(atual.tipo != 'variacao') & ~atual.sku.isin(pais_vazios)])

MARCAS_SITE = {'Tecno', 'Bertazzoni', 'Elettromec', 'Evol', 'Gorenje', 'Dometic'}
NUCLEO = ['COIFA', 'COOKTOP', 'FORNO', 'FOGÃO', 'FOGAO', 'RANGETOP', 'RANGE TOP', 'ADEGA', 'CERVEJEIRA', 'BEER',
          'CHURRASQUEIRA', 'REFRIGERADOR', 'FREEZER', 'LAVA-LOUÇA', 'LAVA LOUÇA', 'LAVA-LOUCA', 'LAVA LOUCA', 'DUO', 'WINE CENTER']
COMPLEMENTO = ['GAVETA', 'MICRO', 'GELO', 'ICE', 'CAFETEIRA', 'CAFÉ', 'FRIGOBAR', 'DOMIN', 'UMIDOR', 'DISPENSER',
               'SIDE BURNER', 'LAVA E SECA', 'PIZZA']
ACESSORIO = ['KIT', 'ACESS', 'SEGUNDO MOTOR', 'MOTOR', 'VIDRO', 'FILTRO', 'PAINEL', 'PORTA ', 'FRENTE', 'PUXADOR', 'CHAPA',
             'TOOLS', 'ESPATULA', 'ESPÁTULA', 'GRELHA', 'CAPA', 'ACABAMENTO', 'TAMPA', 'DUTO', 'EXAUSTOR', 'CONJUNTO', 'BASE', 'PEDESTAL', 'ROTISSERIE', 'TRIM', 'TRANSFORMADOR', 'SUPORTE']

ACC_INICIO = ('KIT', 'SEGUNDO MOTOR', 'VIDRO', 'FILTRO', 'PORTA', 'FRENTE', 'PAINEL', 'PUXADOR', 'CHAPA', 'BBQ TOOLS',
              'ESPATULA', 'ESPÁTULA', 'DUTO', 'EXAUSTOR', 'TAMPA', 'CAPA', 'ACABAMENTO', 'TRIM', 'MOTOR', 'GRELHA', 'PEDESTAL', 'BASE ', 'CONJUNTO', 'ROTISSERIE')
COMP_CAT = ('GAVETA', 'MICRO', 'GELO', 'ICE', 'CAFETEIRA', 'FRIGOBAR', 'DOMIN', 'DISPENSER', 'LAVA E SECA', 'PIZZA', 'UMIDOR', 'SIDE BURNER', 'STORAGE')
def categoria(r):
    c, d = r['categoria'].upper(), r['descricao'].upper()
    if 'ACESS' in c or d.startswith(ACC_INICIO) or re.match(r'^[^,–]*\b(KIT|ACESS[OÓ]RIO)\b', d):
        return 'Acessório'
    if any(k in c for k in COMP_CAT) or (not c and any(k in d[:40] for k in COMP_CAT)):
        return 'Complemento'
    if any(n in (c + ' ' + d) for n in NUCLEO):
        return 'Núcleo'
    return 'Complemento'

def disponibilidade(s):
    s = s.upper()
    if 'INDISPON' in s or 'EM BREVE' in s:
        return 'Previsão' if re.search(r'\d|PREVIS|QUINZ|SEM|LOTE', s) else 'Sem previsão'
    if 'SOB CONSULTA' in s or 'SOB DEMANDA' in s or 'SOB. CONSULTA' in s:
        return 'Sob consulta'
    return 'Disponível'

# linha/coleção: palavras que também aparecem nos nomes do site da mesma marca
COLECOES = ['PROFESSIONAL', 'VINTAGE', 'ORIGINAL', 'MASTER', 'HERITAGE', 'METALLI', 'CONNECT', 'VETRO', 'SMART', 'HOMEMADE',
            'LUCE', 'MILANO', 'QUADRATTO', 'ADRIA', 'SOSPESA', 'MOBILE', 'NAUTILUS', 'PROTEUS', 'SOLLEVARE', 'WINE CENTER', 'BEER COOLER', 'MODENA', 'IX13', 'IX17', 'H13', 'SOLE']
def colecao(r):
    t = (r['descricao'] + ' ' + r['extra']).upper()
    return next((c for c in COLECOES if c in t), '')
nomes_site = {m: ' '.join(atual[atual.marca == m].nome).upper() for m in MARCAS_SITE}

def chave_variacao(r):
    """Junta 127V/220V e abertura direita/esquerda num anúncio só."""
    t = r['descricao'].upper()
    t = re.sub(r'\b(127|220|110)\s?V\b|BIVOLT|\bV\b', '', t)
    t = re.sub(r'ABER(TURA)?\.?\s*(P\.?|PARA)?\s*(DIR(EITA)?|ESQ(UERDA)?)|AB\.? (DIREITA|ESQUERDA)|PORTA (DIREITA|ESQUERDA)|\b(DIREITA|ESQUERDA)\b|REVERS[IÍ]VEL', '', t)
    t = re.sub(r'[^A-Z0-9]', '', t)
    if r['marca'] == 'Elettromec':
        t = t.replace('BLACKMATTE', '').replace('INOX', '')
    if r['marca'] in ('Bertazzoni', 'Lofra'):
        t = re.sub(r'INOX|AVORIO|BRANCO|AMARELO|PRETO|VERMELHO|MARFIM|NERO|BLACK|GOLD|LARANJA|AZUL|VERDE|BORDO|BORDÔ|CINZA|FOSCO|MATTE|CREME|BRONZE', '', t)
    if r['marca'] == 'Evol':
        t = re.sub(r'(127|220)?[LR]?$', '', norm(r['codigo']).replace('127', '').replace('220', ''))
    return r['marca'] + '|' + t

linhas = []
for _, r in listas.iterrows():
    if not r['codigo'] or ja_no_site(r['codigo']):
        continue
    n = norm(r['codigo'])
    if n in ATUALIZAR:
        continue
    cat = categoria(r)
    disp = disponibilidade(r['situacao'])
    novo = bool(re.search(r'NOVO|LANÇAMENTO|LANCAMENTO|NOVA VERS', (r['extra'] + ' ' + r['situacao'] + ' ' + r['descricao']).upper()))
    col = colecao(r)
    linha_site = bool(col) and r['marca'] in nomes_site and col in nomes_site[r['marca']]
    marca_site = r['marca'] in MARCAS_SITE
    # pontuação
    p = {'Núcleo': 50, 'Complemento': 25, 'Acessório': 0}[cat]
    p += {'Disponível': 25, 'Previsão': 25, 'Sob consulta': 4, 'Sem previsão': -10}[disp]
    p += 12 if novo else 0
    p += 10 if linha_site else 0
    p += 15 if marca_site else 0
    p += min(10, (r['preco'] or 0) / 3000) if pd.notna(r['preco']) and r['preco'] else 0
    if cat == 'Núcleo' and disp in ('Disponível', 'Previsão') or (cat == 'Núcleo' and novo):
        curva = 'A'
    elif cat == 'Acessório' or disp == 'Sem previsão' or (cat == 'Complemento' and disp == 'Sob consulta'):
        curva = 'C'
    else:
        curva = 'B'
    motivo = [cat.lower(), disp.lower()]
    if novo: motivo.append('lançamento/novo')
    if linha_site: motivo.append('completa a linha ' + col.title() + ' do site')
    if not marca_site: motivo.append('marca nova no site')
    linhas.append(dict(r, cat=cat, disp=disp, novo=novo, colecao=col.title(), linha_site=linha_site,
                       marca_site=marca_site, pontos=round(p, 1), curva=curva, motivo=', '.join(motivo),
                       grupo=chave_variacao(r)))
cand = pd.DataFrame(linhas)

DIFERENCIADOS = {
    'THVI90DH': 'Cooktop de indução com coifa retrátil integrada',
    'TCD91P': 'Coifa downdraft de bancada (sobe e desce)',
    'TR43AVDG': 'Adega vertical 151 garrafas com duplo evaporador',
    'FV-DG-60-SL-2TNB': 'Forno a vapor com tela TFT',
    'FMC-FR-45-SL-2TNA': 'Micro-ondas a vapor',
    'IM-BI-23-XX-2VIB': 'Máquina de gelo de embutir',
    'CFI-SOS-110-XX-2ATD': 'Coifa suspensa (sobe e desce do teto)',
    'PROCS30X': 'Forno combinado a vapor Bertazzoni',
    'FPRO6117VTX3': 'Forno elétrico com vapor e Air Fry',
    'MAS365GASXVLP': 'Fogão Bertazzoni linha Metalli (detalhes metálicos)',
    'MAS486BTFGMXTLP': 'Fogão Bertazzoni Metalli 122cm',
    'FHER6117CTAG3': 'Forno a vapor Bertazzoni Heritage (marfim)',
    'FCSO4510TEMX': 'Forno a vapor compacto Fulgor Milano',
    'FCM4500TFX': 'Cafeteira de embutir Fulgor Milano',
    'I-FPZ-FS-16-XX-NMHA': 'Forno de pizza 16" Invita',
    'FIUI5152D-VK': 'Ice maker Viking com dreno automático',
    'CZUN90.F0P2#ZZZI410F': 'Coifa Falmec Zeus Pro',
    'RRD126MFT+E/2': 'Fogão Lofra Dolcevita colorido 120cm (7 queimadores)',
    'RVG96MFT/Ci': 'Fogão Lofra Dolcevita verde (novo)',
}
cand['diferenciado'] = cand.codigo.map(DIFERENCIADOS).fillna('')

def corte(r):
    d, cod = r['descricao'].upper(), r['codigo'].upper()
    if r['marca'] == 'Tecno':
        if 'VINTAGE' in d and cod not in ('TR43AVDEV2', 'TR57FXDBV2'):
            return 'Tecno: Vintage repete a Professional em outro acabamento'
        if 'ORIGINAL' in d and not (r['cat'] == 'Núcleo' and 'COOKTOP' in d):
            return 'Tecno: Original repete a Professional (só cooktops entram)'
        if 'ORIGINAL' in d and 'DOWNDRAFT' in d:
            return 'Tecno: downdraft entra na versão Professional'
    if r['marca'] == 'Elettromec':
        for pre, motivo in [('CV-1FS-14', 'Adega de entrada (instalação livre)'), ('CFI-NAU-35', 'Coifa 35cm de entrada'),
                            ('CFI-PRO-35', 'Coifa 35cm de entrada'), ('BBQ-2Q-55', 'Churrasqueira compacta'), ('BBQ-4Q-65', 'Churrasqueira compacta'),
                            ('CFP-BBQ-30-XP', 'Coifa de churrasqueira repetida'), ('CFB-BBQ-34-XP', 'Coifa de churrasqueira repetida')]:
            if cod.startswith(pre):
                return 'Elettromec: ' + motivo
    return ''
cand['corte'] = cand.apply(corte, axis=1)

# anúncios (grupos de variação)
def cat_curta(r):
    c = (r['categoria'] or '').strip().title()
    if c:
        return c.replace('Fogão De Piso', 'Fogão').replace('Beer Center', 'Cervejeira')
    d = r['descricao'].upper()
    for k, v in [('COIFA', 'Coifa'), ('COOKTOP', 'Cooktop'), ('FORNO', 'Forno'), ('FOG', 'Fogão'), ('ADEGA', 'Adega'), ('CERVEJ', 'Cervejeira'),
                 ('CHURRAS', 'Churrasqueira'), ('REFRIG', 'Refrigerador'), ('FREEZER', 'Freezer'), ('LAVA', 'Lava-Louças'), ('GAVETA', 'Gaveta')]:
        if k in d:
            return v
    return 'Outros'
cand['cat_curta'] = cand.apply(cat_curta, axis=1)
g = cand.groupby('grupo').agg(marca=('marca', 'first'), pontos=('pontos', 'max'), skus=('codigo', 'size'),
                              curva=('curva', lambda s: min(s)), dif=('diferenciado', lambda s: any(s)),
                              corte=('corte', lambda s: all(s)), catg=('cat_curta', 'first')).reset_index()
ATIVOS_HOJE = 188  # painel: 196 de 500, menos 8 refrigeradores Smeg excluídos pelo cliente
REATIVAR = 8  # aba Revisão do catálogo
RESERVA_LISTAS = 35  # vagas guardadas para Tramontina, Franke, InSinkErator, Deca, Jacuzzi, Speed Queen
orc_skus = LIMITE - MARGEM - ATIVOS_HOJE - REATIVAR
alvo = orc_skus - RESERVA_LISTAS
TETO = {'Tecno': 30, 'Elettromec': 30, 'Bertazzoni': 35}
g['custo'] = 1  # variações não contam: cada anúncio = 1 produto
g = g[~g.corte].copy()
# leque de produtos: dentro de cada marca, uma categoria de cada vez (rodízio), por pontuação
g = g.sort_values('pontos', ascending=False)
g['giro'] = g.groupby(['marca', 'catg']).cumcount()
g = g.sort_values(['giro', 'pontos'], ascending=[True, False])
PEQUENAS = ['Gorenje', 'Dometic']
NOVAS = ['Viking', 'Fulgor Milano', 'Falmec', 'Invita', 'Lofra', 'Elica']
SITE = ['Elettromec', 'Tecno', 'Bertazzoni', 'Evol']
escolhidos = set(g[g.marca.isin(PEQUENAS) | (g.dif & (g.curva != 'C'))].grupo)
por_marca = lambda m: sum(1 for x in g[g.grupo.isin(escolhidos)].marca if x == m)
resto = alvo - len(escolhidos)
cota_site, cota_novas = round(resto * 0.7), resto - round(resto * 0.7)
def distribuir(marcas, cota):
    elegiveis = g[g.marca.isin(marcas) & (g.curva != 'C') & ~g.grupo.isin(escolhidos)]
    peso = elegiveis[elegiveis.curva == 'A'].groupby('marca').size().reindex(marcas).fillna(0) + 1
    quota = (peso / peso.sum() * cota).round().astype(int)
    sobra = 0
    for m in sorted(marcas, key=lambda m: m in TETO):  # marcas com teto por último, para a sobra ir às outras
        q = quota[m] + sobra
        teto = TETO.get(m, 10 ** 6) - por_marca(m)
        gasto = 0
        for _, x in elegiveis[elegiveis.marca == m].iterrows():
            if gasto < q and gasto < teto:
                escolhidos.add(x.grupo); gasto += 1
        sobra = q - gasto
distribuir(SITE, cota_site)
distribuir(NOVAS, cota_novas)
# completa o que sobrou das cotas: rodízio de categorias entre todas as marcas, respeitando os tetos
for _, x in g[(g.curva != 'C') & ~g.grupo.isin(escolhidos)].iterrows():
    if len(escolhidos) >= alvo:
        break
    if por_marca(x.marca) < TETO.get(x.marca, 10 ** 6):
        escolhidos.add(x.grupo)
while len(escolhidos) > alvo:
    pior = g[g.grupo.isin(escolhidos) & ~g.marca.isin(PEQUENAS) & ~g.dif].sort_values('pontos').iloc[0].grupo
    escolhidos.discard(pior)
usados = len(escolhidos)
cand['remessa'] = cand.grupo.isin(escolhidos)
grupo_ordem = {k: i for i, k in enumerate(g.grupo)}
cand['cortado'] = cand.corte != ''
cand['ordem'] = cand.grupo.map(grupo_ordem)

if __name__ == '__main__':
    print('hoje: anúncios', anuncios_hoje, '| cadastros (anúncios+variações)', cadastros_hoje, '| orçamento novos', orc_skus, '| usados', usados)
    print(cand.groupby(['marca', 'curva']).size().unstack(fill_value=0))
    print(cand[cand.remessa].groupby('marca').agg(skus=('codigo', 'size'), anuncios=('grupo', 'nunique')))
