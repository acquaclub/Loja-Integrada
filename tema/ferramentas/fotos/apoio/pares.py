import sys,glob,os
from PIL import Image,ImageDraw
base=sys.argv[1];out=sys.argv[2];C=180;G=10;POR=5
for cat in sorted(os.listdir(base)):
    d=os.path.join(base,cat)
    if not os.path.isdir(d): continue
    skus=sorted({f.rsplit('-',1)[0] for f in os.listdir(d) if f.endswith('-01.jpg')})
    rows=-(-len(skus)//POR)
    sh=Image.new('RGB',(POR*(2*C+3*G),rows*(C+30)+G),(200,200,200));dr=ImageDraw.Draw(sh)
    for k,s in enumerate(skus):
        x=(k%POR)*(2*C+3*G)+G;y=(k//POR)*(C+30)+G
        for j,n in enumerate(['01','02']):
            p=os.path.join(d,f'{s}-{n}.jpg')
            if os.path.exists(p):
                im=Image.open(p);im.thumbnail((C,C));sh.paste(im,(x+j*(C+4),y))
        dr.text((x,y+C+3),s,fill=0)
    sh.save(os.path.join(out,f'pares-{cat}.jpg'),quality=85)
