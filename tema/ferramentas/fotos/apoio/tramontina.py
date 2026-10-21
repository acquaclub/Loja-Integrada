import sys,re,os,requests
from concurrent.futures import ThreadPoolExecutor
S=requests.Session();S.headers['User-Agent']='Mozilla/5.0'
dest=sys.argv[1];skus=sys.argv[2:]
def get(u):
    try:
        r=S.get(u,timeout=60);return r if r.status_code==200 else None
    except Exception: return None
def um(sku):
    r=get(f'https://www.tramontina.com.br/busca?q={sku}')
    if not r: return sku,'busca falhou',0
    links=[l for l in dict.fromkeys(re.findall(r'href="(/[^"]+/(\d{6,9})\.html)"',r.text))]
    alvo=[l for l,c in links if c.startswith(sku) or sku.startswith(c)]
    if not alvo: return sku,'não achou',0
    p=get('https://www.tramontina.com.br'+alvo[0])
    if not p: return sku,'página falhou',0
    imgs=sorted(set(re.findall(r'https://assets\.tramontina\.com\.br/upload/tramon/imagens/[A-Z]+/(\d+)((?:PDM|IXM|PRM|DCM|AMB|DTM)\d{3})G\.jpg',p.text)))
    imgs=[(c,t) for c,t in imgs if c.startswith(sku[:6])]
    d=os.path.join(dest,sku);os.makedirs(d,exist_ok=True);n=0
    for c,t in imgs:
        g=get(f'https://assets.tramontina.com.br/upload/tramon/imagens/TEC/{c}{t}G.jpg')
        if g: open(os.path.join(d,f't{c}{t}.jpg'),'wb').write(g.content);n+=1
    return sku,alvo[0],n
with ThreadPoolExecutor(5) as ex:
    for r in ex.map(um,skus): print(*r)
