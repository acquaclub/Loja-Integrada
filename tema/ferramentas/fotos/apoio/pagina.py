# uso: pagina.py arquivo.pdf pagina destino.png y0 y1 [x0 x1]  -> recorta a faixa e tira a sobra branca
import sys,subprocess,os,tempfile
from PIL import Image
import numpy as np
pdf,pg,dest=sys.argv[1],sys.argv[2],sys.argv[3];y0,y1=float(sys.argv[4]),float(sys.argv[5])
x0,x1=(float(sys.argv[6]),float(sys.argv[7])) if len(sys.argv)>7 else (0.0,1.0)
t=tempfile.mkdtemp();subprocess.run(['pdftoppm','-r','220','-f',pg,'-l',pg,'-png',pdf,t+'/p'],capture_output=True)
im=np.array(Image.open(t+'/'+os.listdir(t)[0]).convert('RGB'));H,W=im.shape[:2]
c=im[int(y0*H):int(y1*H),int(x0*W):int(x1*W)].copy();c[c.min(axis=2)>=232]=255
m=c.min(axis=2)<200;ys,xs=np.nonzero(m)
p=30;c=c[max(ys.min()-p,0):ys.max()+p,max(xs.min()-p,0):xs.max()+p]
Image.fromarray(c).save(dest)
