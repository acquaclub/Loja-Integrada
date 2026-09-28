"""Gera a versão "completa" (com <style> embutido) de uma página de conteúdo,
a partir de estilo-paginas.css. Inclui só os ícones usados na página.
Uso: python3 tema/paginas/gerar_completa.py entrega [--compacto]
"""
import re, sys, os
base_dir = os.path.dirname(os.path.abspath(__file__))
css = open(os.path.join(base_dir, 'estilo-paginas.css'), encoding='utf-8').read()
nome = sys.argv[1]
html = open(os.path.join(base_dir, nome + '.html'), encoding='utf-8').read().split('\n', 1)[1]

ini = css.index('html body .uk-pg,\nhtml body .uk-pg * {')
fim = css.index('/* Tablet */')
sec = re.sub(r'/\*.*?\*/', '', css[ini:fim], flags=re.S)
classes_html = set(re.findall(r'\buk-[a-z0-9_-]+', html))

def regra_usada(seletor):
    # mantém a regra se todas as classes uk-* do seletor aparecem na página
    return all(c in classes_html for c in re.findall(r'\.(uk-[a-z0-9_-]+)', seletor))

def filtra(bloco):
    saida = []
    for seletor, corpo in re.findall(r'([^{}]+)\{([^{}]*)\}', bloco):
        partes = [x.strip() for x in seletor.strip().split(',')]
        partes = [x for x in partes if regra_usada(x)]
        if partes:
            sel = ',\n'.join(partes)
            saida.append(sel + ' {' + corpo.rstrip() + '\n}')
    return '\n'.join(saida)

sec = filtra(sec)

def media(q):
    a = css.index('@media (' + q + ') {', fim)
    b = css.index('\n}\n', a)
    corpo = re.sub(r'/\*.*?\*/', '', css[a:b], flags=re.S)
    regras = re.findall(r'(    html body \.uk-pg[^{]*\{[^}]*\})', corpo)
    regras = [r for r in regras if regra_usada(r.split('{')[0])]
    return '@media (' + q + ') {\n' + '\n'.join(regras) + '\n}' if regras else ''

estilo = sec + '\n' + media('max-width: 979px') + '\n' + media('max-width: 767px')
for v, c in [('var(--uk-dourado)', '#c49a45'), ('var(--uk-preto)', '#1a1a1a'), ('var(--uk-cinza)', '#666666')]:
    estilo = estilo.replace(v, c)
if '--compacto' in sys.argv:
    # versão compacta para páginas longas: sem recuos nem quebras desnecessárias
    estilo = re.sub(r'\s*([{};,>])\s*', r'\1', estilo)
    estilo = re.sub(r'\s+', ' ', estilo).replace(';}', '}').replace(': ', ':').replace(' !important', '!important')
    html = re.sub(r'\n\s*', '\n', html)
saida = ('<style type="text/css">\n/* Páginas de conteúdo Unikitchen (gerado de estilo-paginas.css) */\n'
         + estilo + '\n</style>\n' + html)
open(os.path.join(base_dir, nome + '-completa.html'), 'w', encoding='utf-8').write(saida)
print(nome + '-completa.html', len(saida), 'caracteres')
