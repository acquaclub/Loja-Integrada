import sys,re,os,glob
from PIL import Image,ImageDraw
rel,brutas,tipo,out=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]
C=230 if tipo!='medidas' else 300;POR=8 if tipo!='medidas' else 6
cat=None;itens=[]
for l in open(rel):
    m=re.match(r'## (\S+)',l)
    if m: cat=m.group(1);continue
    m=re.match(r'  - (.+)-\d\d\.jpg ← foto (\S+) do cadastro \((\w+),',l)
    if m and m.group(3)==tipo: itens.append((cat,m.group(1),m.group(2)))
print(len(itens))
pag=60 if tipo!='medidas' else 30
for p in range(0,len(itens),pag):
    grupo=itens[p:p+pag];rows=-(-len(grupo)//POR)
    sh=Image.new('RGB',(POR*(C+8)+8,rows*(C+26)+8),(200,200,200));d=ImageDraw.Draw(sh)
    for k,(c,sku,stem) in enumerate(grupo):
        f=glob.glob(f'{brutas}/{c}/{sku}/{stem}.*')
        x=8+(k%POR)*(C+8);y=8+(k//POR)*(C+26)
        if f:
            im=Image.open(f[0]).convert('RGBA');bg=Image.new('RGBA',im.size,'white');bg.alpha_composite(im);im=bg.convert('RGB');im.thumbnail((C,C));sh.paste(im,(x,y))
        d.text((x,y+C+3),f'{sku}/{stem}',fill=(0,0,120))
    sh.save(f'{out}-{p//pag+1}.jpg',quality=82);print(f'{out}-{p//pag+1}.jpg')
