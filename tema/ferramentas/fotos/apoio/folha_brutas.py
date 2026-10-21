import sys,json
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
base=Path(sys.argv[1]); perfil=sys.argv[2]; out=Path(sys.argv[3]); C=170;G=8;R=16
nomes={p['sku']:p.get('nome','') for p in json.load(open(base/'produtos.json'))} if (base/'produtos.json').exists() else {}
prods=sorted(p for p in (base/perfil).iterdir() if p.is_dir())
lote=int(sys.argv[4]) if len(sys.argv)>4 else 12
for k in range(0,len(prods),lote):
  grupo=prods[k:k+lote]
  fs=[sorted([f for f in p.iterdir()],key=lambda f:int(f.stem) if f.stem.isdigit() else 99) for p in grupo]
  ncol=min(10,max(len(x) for x in fs))
  W=G+ncol*(C+G)+0; H=sum(R+(-(-len(x)//10))*(C+R+G) for x in fs)+G
  fl=Image.new('RGB',(W,H),(200,200,200));d=ImageDraw.Draw(fl);y=G
  for p,x in zip(grupo,fs):
    d.text((G,y),f"{p.name}  {nomes.get(p.name,'')[:90]}",fill=(0,0,120));y+=R
    for i,f in enumerate(x):
      try:
        im=Image.open(f);im=ImageOps.exif_transpose(im).convert('RGBA');sz=im.size
        bg=Image.new('RGBA',im.size,(255,255,255,255));bg.alpha_composite(im);im=bg.convert('RGB');im.thumbnail((C,C))
      except Exception as e: im=Image.new('RGB',(C,C),'red');sz=('erro',)
      xx=G+(i%10)*(C+G);yy=y+(i//10)*(C+R+G)
      fl.paste(im,(xx,yy));d.text((xx,yy+C+2),f"{f.stem}  {sz[0]}x{sz[1] if len(sz)>1 else ''}",fill=(0,0,0))
    y+=(-(-len(x)//10))*(C+R+G)
  fl.save(out/f"brutas-{perfil}-{k//lote+1}.jpg",quality=80)
  print(out/f"brutas-{perfil}-{k//lote+1}.jpg")
