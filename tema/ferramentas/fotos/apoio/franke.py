import sys,re,os,requests
S=requests.Session();S.headers['User-Agent']='Mozilla/5.0'
dest=sys.argv[1]
MAP={"16590":"115.0653.382","18095":"115.0590.045","18097":"115.0521.438","18099":"115.0590.047","14609":"127.0392.000",
"16060":"127.0538.259","18629":"122.0694.479","15815":"134.0525.152","17986":"325.0671.574","17988":"325.0671.575",
"13320":"119.0294.705","13318":"119.0294.775","08326":"119.0066.497","16168":"134.0560.808",
"ActiveTwist":"115.0653.505","PescaraXL":"115.0393.974","15813":"134.0525.151"}
for sku,pid in MAP.items():
    imgs=set()
    for fam in ["misturadores","cubas","coifas","acessorios","trituradores","lixeiras","produtos"]:
        r=S.get(f"https://www.franke.com/br/pt/home-solutions/produtos/{fam}/product-detail-page.html/{pid}.html",timeout=60)
        if r.status_code==200 and pid in r.text:
            imgs=set(re.findall(r'product-images/ALL/\d+-1x1/([A-Z]{2}\d{3}_'+re.escape(pid)+r'\.(?:jpg|png))',r.text)); break
    d=os.path.join(dest,sku);os.makedirs(d,exist_ok=True);n=0
    for im in sorted(imgs):
        for size in ["1600-1x1","1000-1x1"]:
            g=S.get(f"https://www.franke.com/product-images/ALL/{size}/{im}",timeout=60)
            if g.status_code==200 and len(g.content)>3000:
                open(os.path.join(d,'k'+im.split('_')[0]+'.'+im.rsplit('.',1)[1]),'wb').write(g.content);n+=1;break
    print(sku,pid,len(imgs),n)
