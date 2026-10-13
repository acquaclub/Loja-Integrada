import re
import pandas as pd

B = '/tmp/claude-0/-home-user-Loja-Integrada/0b260f62-f894-5c80-bcd2-1eb1b4038619/scratchpad/skus/'
norm = lambda s: re.sub(r'[^A-Z0-9]', '', str(s).upper())

def preco(txt):
    t = re.sub(r'[^\d,\.]', '', txt.replace(' ', ''))
    try:
        return float(t.replace('.', '').replace(',', '.'))
    except ValueError:
        return None

itens = []

# ---------- Tecno (inclui Bertazzoni, Lofra, Elica) ----------
pat = re.compile(r'^(\d{1,3})\s*(.*?)\s*R\$\s*([\d \.]+?)\s+(Dispon[ií]vel|Indispon[ií]vel|Sob\.? ?Consulta)\s*(.*)$')
marca = 'Tecno'
ls = open(B + 'evol/tecno.txt', encoding='utf-8').read().split('\n')
for i, l in enumerate(ls):
    if l.startswith('N° CATEGORIA'):
        h = l.upper()
        for mk, nome in [('LOFRA', 'Lofra'), ('ELICA', 'Elica'), ('BERTAZZONI', 'Bertazzoni'), ('TECNO', 'Tecno'), ('COLEÇÃO', 'Tecno')]:
            if mk in h:
                marca = nome
                break
        continue
    m = pat.match(l)
    if not m:
        continue
    meio = re.sub(r'([a-zà-ú])([A-Z])', r'\1 \2', m.group(2))
    d = re.search(r"(?<![A-Z0-9])[A-ZÇÃÉÁÍÓÚÂÊÕ\-]{3,}(?=[ ,])[A-ZÇÃÉÁÍÓÚÂÊÕ0-9 \-\.\(\)'/+]*,", meio)
    esquerda, desc = (meio[:d.start()], meio[d.start():]) if d else (meio, '')
    toks = esquerda.split()
    cod = ''
    for k, t in enumerate(toks):
        if re.search(r'\d', t) and re.search(r'[A-Z]', t) or (t.isupper() and len(t) >= 5 and k > 0):
            cod = t
            break
    cat = esquerda[:esquerda.find(cod)].strip() if cod else esquerda
    extra = esquerda[esquerda.find(cod) + len(cod):].strip(' -') if cod else ''
    st = m.group(4).replace('.', '').title().replace('Disponivel', 'Disponível')
    resto = m.group(5).strip()
    if i + 1 < len(ls) and ls[i + 1].strip() and not pat.match(ls[i + 1]) and not ls[i + 1].startswith(('N°', 'TECNO SUD')):
        resto = (resto + ' ' + ls[i + 1].strip()).strip()
    if 'NOVO PRODUTF' in desc:
        desc = desc.replace('NOVO PRODUTFOOGAO', 'FOGAO'); extra = (extra + ' NOVO PRODUTO').strip()
    marca_l = marca
    for mk, nome in [('LOFRA', 'Lofra'), ('BERTAZZONI', 'Bertazzoni'), ('ELICA', 'Elica')]:
        if mk in desc.upper():
            marca_l = nome
    itens.append(dict(marca=marca_l, codigo=cod, descricao=desc.strip() or meio, categoria=cat, extra=extra,
                      situacao=(st + (' – ' + resto if resto else '')).strip(), preco=preco(m.group(3)),
                      fonte='Tecno 02/10/2026'))

# ---------- Elettromec e marcas do grupo (Viking, Invita, Falmec, Fulgor Milano) ----------
el = pd.read_excel(B + 'evol/elettromec.xlsx', header=1, dtype=str).fillna('')
for _, r in el.iterrows():
    if r['STATUS'].strip().upper() != 'EM LINHA' or not r['CÓDIGO'].strip():
        continue
    prev = r['PREVISÃO DE CHEGADA NO CLIENTE'].strip()
    itens.append(dict(marca=r['MARCA'].strip().title().replace('Fulgor Milano', 'Fulgor Milano'), codigo=r['CÓDIGO'].strip(),
                      descricao=r['DESCRIÇÃO'].strip(), categoria=r['GRUPO'].strip().title(), extra=r['VOLTAGEM'].strip(),
                      situacao=r['ESTOQUE'].strip().title() + (' – ' + prev if prev not in ('', '0') else ''),
                      preco=None, fonte='Elettromec 25/09/2026'))

# ---------- Evol ----------
ev = open(B + 'evol/evol.txt', encoding='utf-8').read().split('\n')
STATUS = re.compile(r'(DISPON[IÍ]VEL|INDISPON[IÍ]VEL|EM BREVE|ESTOQUE BAIXO)(.*)$')
vistos = set()
for i, l in enumerate(ev):
    if l.startswith(('ESTOQUE 05OUT26', 'PRODUTOS CÓDIGO')):
        continue
    m = re.match(r'^(?:[A-ZÇÃÉ ]+ )?([A-Z]{2,}[A-Z0-9\-()]*\d[A-Z0-9\-()]*|JG36I)\b', l)
    if not m:
        continue
    cod = m.group(1).replace('(', '').replace(')', '')
    if norm(cod) in vistos or len(norm(cod)) < 5:
        continue
    janela = ' '.join(ev[i:i + 3])
    s = STATUS.search(l) or STATUS.search(janela)
    if not s:
        continue
    vistos.add(norm(cod))
    nome = ev[i - 1].strip() if i > 0 else ''
    if STATUS.search(nome) or nome.startswith(('PRODUTOS', 'ESTOQUE')):
        nome = ''
    resto = l[m.end():]
    resto = STATUS.split(resto)[0]
    resto = re.sub(r'^\s*(BIVOLT|220V|127V|-)?\s*[\d\.]{6,}\s*', '', resto)
    itens.append(dict(marca='Evol', codigo=cod, descricao=(nome + ' – ' + resto.strip()).strip(' –'), categoria='',
                      extra='', situacao=(s.group(1) + ' ' + s.group(2)).strip().title(), preco=None, fonte='Evol 05/10/2026'))

# ---------- Gorenje e Dometic (listas de preço, sem estoque) ----------
for cod, desc, cat, p in [
    ('GI3201BC', 'Cooktop indução embutir 2 bocas 30cm preto 220V (novo)', 'Cooktop', 4499),
    ('GI6421BSC', 'Cooktop indução embutir 4 bocas BridgeZone 60cm preto 220V (novo)', 'Cooktop', 6469),
    ('BSA6747A04XBRWI', 'Forno elétrico de embutir 77L 60cm 220V', 'Forno', 14999),
    ('WD1410X', 'Gaveta de aquecimento 20L inox touch, 220V', 'Gaveta Aquecida', 6929),
    ('GWL-46W1ANQRIA', 'Adega de vinho dual zone 128L / 46 garrafas inox 127V', 'Adega', 10390),
    ('GBL-14W1ANQRIA', 'Adega de bebidas 152L / 140 garrafas inox 127V', 'Cervejeira', 10390)]:
    itens.append(dict(marca='Gorenje', codigo=cod, descricao=desc, categoria=cat, extra='', situacao='Na lista de preços',
                      preco=p, fonte='Gorenje – lista de preços'))
for cod, desc, cat, p in [
    ('DM 50 NTEF (9600051021)', 'Frigobar 50L termoelétrico, gaveta, bivolt, sem painel decorativo', 'Frigobar', 11390),
    ('A30S1 127V (9600051694)', 'Frigobar absorção 30L porta preta/cega 127V reversível', 'Frigobar', 6190),
    ('A30S1 220V (9600051698)', 'Frigobar absorção 30L porta preta/cega 220V reversível', 'Frigobar', 6190),
    ('A40S1 127V (9600051696)', 'Frigobar absorção 40L porta preta/cega 127V reversível', 'Frigobar', 6399),
    ('A40S1 220V (9600051700)', 'Frigobar absorção 40L porta preta/cega 220V reversível', 'Frigobar', 6399),
    ('A40G1 127V (9600051695)', 'Frigobar absorção 40L porta de vidro 127V reversível', 'Frigobar', 6890),
    ('A40G1 220V (9600051699)', 'Frigobar absorção 40L porta de vidro 220V reversível', 'Frigobar', 6890),
    ('C35F (9620000492)', 'Adega compressor C35F 220V', 'Adega', 6990),
    ('C55F (9620000493)', 'Adega compressor C55F 220V', 'Adega', 8990),
    ('C154F (9620000494)', 'Adega compressor C154F 220V reversível', 'Adega', 29990)]:
    itens.append(dict(marca='Dometic', codigo=cod, descricao=desc, categoria=cat, extra='', situacao='Na lista de preços',
                      preco=p, fonte='Dometic – lista de preços fev/2026'))

df = pd.DataFrame(itens)
if __name__ == '__main__':
    pd.set_option('display.width', 250); pd.set_option('display.max_rows', 900); pd.set_option('display.max_colwidth', 50)
    print(df.groupby('marca').size())
    print(df[df.marca.isin(['Tecno', 'Evol', 'Lofra', 'Elica', 'Bertazzoni'])][['marca', 'categoria', 'codigo', 'extra', 'descricao', 'situacao', 'preco']].to_string())
