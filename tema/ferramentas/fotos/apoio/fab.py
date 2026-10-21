import sys,re,os,json,requests
from urllib.parse import quote
S=requests.Session();S.headers['User-Agent']='Mozilla/5.0'
SITES={'elettromec':('https://elettromec.com.br','/?s={q}&customset%5B%5D=produto',r'https://elettromec.com.br/produto/[^"\']+'),
       'evol':('https://evol.com.br','/?s={q}',r'https://evol.com.br/produtos/[^"\']+')}
def get(u):
    try:
        r=S.get(u,timeout=40); return r if r.status_code==200 else None
    except Exception: return None
def achar(site,sku):
    base,busca,padrao=SITES[site]
    chaves=[sku, re.sub(r'-\d[A-Z]{3}$','',sku), sku.rsplit('-',1)[0]]
    for q in dict.fromkeys(chaves):
        r=get(base+busca.format(q=quote(q)))
        if not r: continue
        links=list(dict.fromkeys(re.findall(padrao,r.text)))
        for l in links[:8]:
            p=get(l)
            if p and sku[:10].lower() in p.text.lower(): return l,p.text
    return None,None
def main():
    site,dest=sys.argv[1],sys.argv[2]; skus=sys.argv[3:]
    out={}
    for sku in skus:
        if '=' in sku:
            sku,l=sku.split('=',1); r=get(l); html=r.text if r else None
            if not html: l=None
        else:
            l,html=achar(site,sku)
        if not l: out[sku]=None; print(sku,'NAO ACHOU'); continue
        d=os.path.join(dest,sku); os.makedirs(d,exist_ok=True)
        urls=re.findall(r'https://[a-z.]*(?:elettromec|evol)\.com\.br/wp-content/uploads/[^"\'\s)]+\.(?:jpg|jpeg|png|webp|pdf)',html)
        urls=[u for u in dict.fromkeys(urls) if not re.search(r'-\d+x\d+\.\w+$',u) and not re.search(r'(?i)logo|favicon|icon|selo|Relatorio|Transparencia|Marca-evol|elettromec\.png|thumbs/',u)]
        n=0;arqs=[]
        for u in urls:
            if 'manual' in u.lower(): continue
            r=get(u)
            if not r: continue
            n+=1;ext=u.rsplit('.',1)[1].lower()
            nome=('pdf-' if ext=='pdf' else 'm')+str(n)+'.'+ext
            open(os.path.join(d,nome),'wb').write(r.content);arqs.append((nome,u))
        out[sku]={'link':l,'arquivos':arqs}; print(sku,l,len(arqs))
    json.dump(out,open(os.path.join(dest,f'_{site}.json'),'w'),indent=1)
main()
