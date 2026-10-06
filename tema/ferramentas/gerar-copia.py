import html,sys
# uso: python3 gerar_copia.py saida.html "Título|caminho|instrução" ...
out=sys.argv[1];blocos=[a.split('|',2) for a in sys.argv[2:]]
h=['<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Códigos para copiar</title><style>body{margin:0;font-family:system-ui,sans-serif;background:#f7f7f5;color:#1a1a1a}section{margin:0 0 24px}header{position:sticky;top:0;display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;padding:12px 16px;background:#1a1a1a;color:#fff}h2{margin:0;font-size:15px;flex-basis:100%}button{padding:10px 18px;border:0;background:#c49a45;color:#fff;font-weight:700;letter-spacing:1px;cursor:pointer}textarea{box-sizing:border-box;width:100%;height:60vh;border:0;padding:16px;font:12px/1.5 monospace;background:#fff}</style></head><body>']
for i,(t,p,ins) in enumerate(blocos):
    c=open(p,encoding='utf-8').read()
    n=f'{len(c):,}'.replace(',','.')
    h.append(f'<section><header><h2>{i+1}. {html.escape(t)}</h2><button data-i="{i}">COPIAR TUDO</button><span id="m{i}">{html.escape(ins)} ({n} caracteres)</span></header><textarea id="t{i}" readonly>{html.escape(c)}</textarea></section>')
h.append('<script>document.querySelectorAll("button").forEach(function(b){b.onclick=function(){var i=b.dataset.i,t=document.getElementById("t"+i);t.select();var ok=function(){document.getElementById("m"+i).textContent="Copiado ✓ — agora cole no painel. (Se não colar nada: clique no texto, Ctrl+A e Ctrl+C)"};if(navigator.clipboard)navigator.clipboard.writeText(t.value).then(ok,function(){document.execCommand("copy");ok()});else{document.execCommand("copy");ok()}}})</script></body></html>')
open(out,'w',encoding='utf-8').write(''.join(h))
