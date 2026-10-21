# uso: recorte.py origem.png destino.png x0 y0 x1 y1   (frações da página)
import sys
from PIL import Image
import numpy as np
im=Image.open(sys.argv[1]).convert('RGB');W,H=im.size
x0,y0,x1,y1=map(float,sys.argv[3:7])
c=np.array(im.crop((int(x0*W),int(y0*H),int(x1*W),int(y1*H))))
c[c.min(axis=2)>=232]=255
Image.fromarray(c).save(sys.argv[2])
