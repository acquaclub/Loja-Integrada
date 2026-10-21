import sys,re
from PIL import Image,ImageDraw
S,filtro,out,C,P,POR=sys.argv[1],sys.argv[2],sys.argv[3],int(sys.argv[4]),int(sys.argv[5]),int(sys.argv[6])
cat=None;its=[]
for l in open(S+'/relatorio.md'):
    m=re.match(r'## (\S+)',l)
    if m: cat=m.group(1)
    m=re.match(r'  - (.+-\d\d)\.jpg ← foto (\S+) do cadastro \((.*)\)',l)
    if m and re.search(filtro,m.group(3)): its.append((cat,m.group(1)))
for p in range(0,len(its),P):
    g=its[p:p+P];rows=-(-len(g)//POR)
    sh=Image.new('RGB',(POR*(C+8)+8,rows*(C+22)+8),(150,150,150));d=ImageDraw.Draw(sh)
    for k,(c,n) in enumerate(g):
        im=Image.open(f'{S}/{c}/{n}.jpg');im.thumbnail((C,C));x=8+(k%POR)*(C+8);y=8+(k//POR)*(C+22);sh.paste(im,(x,y));d.text((x,y+C+3),n,fill=0)
    sh.save(f'{out}-{p//P+1}.jpg',quality=82)
print(len(its))
