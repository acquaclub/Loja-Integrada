import re, json, sys
import pandas as pd

BASE = '/tmp/claude-0/-home-user-Loja-Integrada/0b260f62-f894-5c80-bcd2-1eb1b4038619/scratchpad/skus/'
norm = lambda s: re.sub(r'[^A-Z0-9]', '', str(s).upper())

def linhas_texto(arq):
    return [l for l in open(BASE + 'evol/' + arq, encoding='utf-8').read().split('\n')]

STATUS_RE = re.compile(r'(FORA DE LINHA|DISPON[IÍ]VEL|INDISPON[IÍ]VEL|SOB CONSULTA|EM BREVE|ESTOQUE BAIXO)', re.I)

def indice_texto(arq, fonte):
    """Para cada token com cara de código no texto, guarda a linha e o status mais próximo."""
    ls = linhas_texto(arq)
    idx = {}
    for i, l in enumerate(ls):
        for tok in re.findall(r'[A-Z0-9][A-Z0-9()\-/]{3,}', l.upper()):
            n = norm(tok)
            if len(n) < 4 or not re.search(r'\d', n) or not re.search(r'[A-Z]', n):
                continue
            janela = ' '.join(ls[i:i + 3])
            m = STATUS_RE.search(l) or STATUS_RE.search(janela)
            resto = ''
            if m:
                txt = l if STATUS_RE.search(l) else janela
                resto = txt[txt.upper().find(m.group(1).upper()):].strip()
            # Tecno: "Indisponível Fora de Linha" vem na mesma linha
            if resto.upper().endswith('NÃO') and i + 1 < len(ls):
                resto += ' ' + ls[i + 1].strip()
            idx.setdefault(n, {'fonte': fonte, 'orig': tok.replace('(', '').replace(')', ''), 'linha': l.strip()[:160], 'status_txt': resto[:90]})
    return idx

def classe(status_txt):
    s = status_txt.upper()
    if 'FORA DE LINHA' in s or 'NÃO COMERCIALIZAR' in s:
        return 'Fora de linha'
    return 'Em linha'

evol = indice_texto('evol.txt', 'Evol – Estoque 05/10/2026')
tecno = indice_texto('tecno.txt', 'Tecno – Gestão de estoque 02/10/2026')

el = pd.read_excel(BASE + 'evol/elettromec.xlsx', header=1, dtype=str).fillna('')
elet = {}
for _, r in el.iterrows():
    if not r['CÓDIGO'].strip():
        continue
    det = ' · '.join(x for x in [r['ESTOQUE'].strip(), (r['PREVISÃO DE CHEGADA NO CLIENTE'].strip() if r['PREVISÃO DE CHEGADA NO CLIENTE'].strip() not in ('0', '') else '')] if x)
    elet[norm(r['CÓDIGO'])] = {'fonte': 'Elettromec – Posição 25/09/2026', 'orig': r['CÓDIGO'].strip(), 'linha': r['DESCRIÇÃO'].strip(),
                               'status_txt': r['STATUS'].strip() + (' · ' + det if det else ''),
                               'classe': 'Fora de linha' if 'FORA' in r['STATUS'].upper() else 'Em linha'}

gorenje = indice_texto('gorenje.txt', 'Gorenje – lista de preços (sem coluna de estoque)')
dometic = indice_texto('dometic.txt', 'Dometic – lista de preços fev/2026')
FONTES = {'Evol': evol, 'Tecno': tecno, 'Bertazzoni': tecno, 'Elettromec': elet, 'Gorenje': gorenje, 'Dometic': dometic}

def procurar(marca, sku, nome):
    idx = FONTES.get(marca)
    if idx is None:
        return None
    n = norm(sku)
    if n in idx:
        e = idx[n]
        return dict(e, tipo='Exato', codigo=n, classe=e.get('classe') or classe(e['status_txt']))
    # código que aparece no nome
    for tok in re.findall(r'[A-Z0-9][A-Z0-9\-/]{4,}', (nome or '').upper()):
        t = norm(tok)
        if t in idx and re.search(r'\d', t):
            e = idx[t]
            return dict(e, tipo='Pelo código no nome', codigo=t, classe=e.get('classe') or classe(e['status_txt']))
    # mesmo produto com código revisado: muda só a letra final (Evol/Tecno) ou o último bloco (Elettromec)
    if marca == 'Elettromec' and '-' in sku:
        base = norm('-'.join(sku.split('-')[:-1]))
        cands = [k for k in idx if k.startswith(base) and len(k) - len(base) <= 5]
    else:
        cands = [k for k in idx if len(n) >= 6 and k[:-1] == n[:-1] and k != n]
        cands += [k for k in idx if len(n) >= 5 and k.startswith(n) and 0 < len(k) - len(n) <= 4]
    curtos = [k for k in idx if len(n) >= 5 and k.startswith(n) and 0 < len(k) - len(n) <= 2]
    if curtos and marca != 'Elettromec':
        e = idx[curtos[0]]
        return dict(e, tipo='Mesmo código com sufixo na lista: ' + e['orig'], codigo=curtos[0], classe=e.get('classe') or classe(e['status_txt']))
    if cands:
        cands = sorted(set(cands))
        e = idx[cands[0]]
        return dict(e, tipo='Versão nova na lista: ' + ', '.join(idx[k]['orig'] for k in cands), codigo=cands[0], classe='Confirmar',
                    status_txt=' / '.join(idx[k].get('status_txt', '') for k in cands))
    return None

if __name__ == '__main__':
    d = pd.read_excel(BASE + 'produtos.xlsx', dtype=str).fillna('')
    pais = d[d.tipo == 'com-variacao'].set_index('sku')
    out = []
    for _, r in d[d.tipo != 'com-variacao'].iterrows():
        base = pais.loc[r['sku-pai']] if r['tipo'] == 'variacao' else r
        m = base['marca']
        if m not in FONTES:
            continue
        res = procurar(m, r['sku'], base['nome'])
        out.append((m, r['sku'], r['ativo'], (res or {}).get('tipo', '—'), (res or {}).get('classe', 'Não encontrado'), (res or {}).get('status_txt', '')))
    df = pd.DataFrame(out, columns=['marca', 'sku', 'ativo', 'tipo', 'classe', 'status'])
    pd.set_option('display.width', 250); pd.set_option('display.max_rows', 500); pd.set_option('display.max_colwidth', 60)
    print(df.groupby(['marca', 'classe']).size())
    print(df[df.classe != 'Em linha'].to_string())
