import sys,os,glob,subprocess
from PIL import Image,ImageDraw
base=sys.argv[1];out=sys.argv[2];skus=sys.argv[3:];C=220
linhas=[]
for sku in skus:
    d=os.path.join(base,sku);itens=[]
    for f in sorted(glob.glob(d+'/*')):
        n=os.path.basename(f)
        if n.endswith('.pdf'):
            pre=f[:-4]+'-pg'
            if not glob.glob(pre+'*.png'): subprocess.run(['pdftoppm','-r','40','-l','8','-png',f,pre],capture_output=True)
            for p in sorted(glob.glob(pre+'*.png')): itens.append((os.path.basename(p)[:-4],p))
        elif n.endswith(('.jpg','.jpeg','.png','.webp')) and '-pg' not in n: itens.append((n,f))
    linhas.append((sku,itens))
W=8+max(1,max(len(i) for _,i in linhas))*(C+8);H=len(linhas)*(C+44)
sh=Image.new('RGB',(min(W,8+10*(C+8)),sum(((len(i)-1)//10+1)*(C+30)+16 for _,i in linhas)),(190,190,190));d=ImageDraw.Draw(sh);y=0
for sku,itens in linhas:
    d.text((8,y),sku,fill=(0,0,128));y+=14
    for k,(n,f) in enumerate(itens):
        try:
            im=Image.open(f).convert('RGBA');sz=im.size;bg=Image.new('RGBA',im.size,'white');bg.alpha_composite(im);im=bg.convert('RGB');im.thumbnail((C,C))
        except Exception: continue
        x=8+(k%10)*(C+8);yy=y+(k//10)*(C+30)
        sh.paste(im,(x,yy));d.text((x,yy+C+2),f'{n} {sz[0]}x{sz[1]}',fill=0)
    y+=((len(itens)-1)//10+1)*(C+30)+2
sh.save(out,quality=85);print(out)
