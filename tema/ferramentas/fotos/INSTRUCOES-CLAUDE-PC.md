# Fotos do site Unikitchen — instruções para o Claude Code no PC

Você vai continuar o trabalho de padronização das fotos de produto da loja Unikitchen (Loja Integrada).
Leia este arquivo inteiro antes de começar. O lojista responde em português do Brasil, quer respostas
curtas, sem elogios, e com a confiança das afirmações marcada ([Certeza], [Provável], [Chute], [Fora do escopo]).

## 1. Preparar

1. Repositório `acquaclub/loja-integrada`, branch `claude/modest-gauss-4q5q91`. Faça `git pull` antes de tudo.
   Faça commit + push a cada entrega (mensagens em português).
2. Python 3 com: `pip install pillow numpy scipy requests beautifulsoup4`. Para desenhos em PDF: `pdftoppm`
   (poppler). `rembg` é opcional (só com `--ia`).
3. Pasta de trabalho fora do repositório, por exemplo `C:\fotos-trabalho\` (chamada abaixo de `TRAB`).
4. Pasta de entrega do lojista: `Documentos\1. Workflow\Site\FOTOS SITE RENDERIZADAS\` — uma subpasta por SKU,
   com as fotos soltas dentro (sem zip).

## 2. Montar as fotos de origem (`TRAB\brutas`)

As fotos de origem não ficam no repositório (são ~500 MB).

1. Baixe as fotos atuais da loja:
   `python tema/ferramentas/fotos/baixar_fotos.py TRAB/brutas`
   Grava `TRAB/brutas/<perfil>/<SKU>/<n>.<ext>` (n = posição no cadastro) e `produtos.json`.
2. Descompacte o `FOTOS-FONTES-EXTRAS.zip` (o lojista tem esse arquivo) **dentro de** `TRAB/brutas`,
   mantendo as pastas. Ele traz as fotos e desenhos tirados dos sites e fichas oficiais dos fabricantes,
   que a seleção usa. Prefixos: `e`/`m` Elettromec e Evol, `t` Tramontina, `k` Franke, `j` Jacuzzi,
   `f` desenho recortado de ficha PDF.
   Se o zip não estiver disponível, os scripts de `tema/ferramentas/fotos/apoio/` refazem a coleta
   (`fab.py`, `tramontina.py`, `franke.py`, `pagina.py`); confira o resultado visualmente.

Atenção: se a loja tiver mudado a ordem das fotos de um produto depois de 19/10/2026, os números em
`selecao.json` podem apontar para a foto errada. Confira nas folhas de conferência (passo 4).

## 3. Gerar

`python tema/ferramentas/fotos/padronizar_fotos.py TRAB/brutas TRAB/saida`

- `--so=SKU1,SKU2` gera só esses produtos.
- Saída: `TRAB/saida/<perfil>/<SKU>-NN.jpg`, `_conferencia.png` por categoria e `relatorio.md`.

Arquivos que controlam o resultado (todos em `tema/ferramentas/fotos/`):
- `selecao.json` — por SKU, quais fotos usar e o tipo: `"3"` (detecta), `"3:produto"`, `"3:detalhe"`,
  `"3:ambiente"`, `"3:medidas"`.
- `recortes.json` — ajuste por foto (`SKU/arquivo`): `corte` [x0,y0,x1,y1] e `apagar` (retângulos), em
  frações 0–1; `manter_sombra: true` desliga a remoção de sombra de uma foto.
- `perfis.json` — mapa categoria da loja → perfil (pasta).

## 4. Padrão que precisa sair (combinado com o lojista)

- 2000×2000 px, JPG, até 5 MB, fundo branco (não usar PNG transparente).
- Nome: `SKU-01.jpg`, `SKU-02.jpg`… na ordem de subida.
- Ordem: **01** principal (produto de frente) · **02** o produto em outra perspectiva (efeito de giro
  ao passar o mouse; sem ângulo oficial, o produto instalado) · demais fotos do produto · ambientes ·
  **medidas por último**.
- Foto de produto: recortada, sem sombra/reflexo no chão, centralizada, encostando na margem de 5%
  (largo encosta nas laterais, alto em cima e embaixo). Banheiras ficam fora da remoção de sombra.
- Detalhe/ambiente: foto cheia nos 2000×2000, sem borda (corte central; se cortar algo importante,
  ajustar com `corte` no `recortes.json`).
- Medidas: só o desenho com as cotas, fundo branco; tirar títulos, logos, notas, ícones "cm/mm".
- Só fotos oficiais do fabricante ou do cadastro; nada de baixa resolução (a ferramenta descarta
  complementares fracas e avisa no relatório quando a foto 1 ou 2 é fraca).

Conferência obrigatória antes de entregar: abrir cada `_conferencia.png` (vitrine no topo, um produto
por linha embaixo) e checar: tamanhos iguais na vitrine, reflexo saiu, detalhe cheio, corte não perdeu
a parte importante, desenho limpo.

## 5. Entregar

1. Escopo atual: só os produtos da **lista oficial** (`tema/ferramentas/fotos/lista-oficial.txt`,
   128 SKUs com descrição feita). Os demais ficam para depois.
2. Copie as fotos de cada SKU da lista para `Documentos\1. Workflow\Site\FOTOS SITE RENDERIZADAS\<SKU>\`
   (substituindo o que houver), mais um `_PENDENCIAS.md` gerado do `relatorio.md`.
3. Atualize `tema/ferramentas/fotos/controle-fotos.md` (status entregue / no ar) e faça commit + push.

## 6. Pendências em aberto (21/10/2026)

- Sem fotos: TO81EXDAP (Tecno) e BH-53135-AMFC (Deca) — sites da Tecno e Deca não abriam da nuvem;
  tente do PC ou peça o álbum ao lojista.
- 30 SKUs sem segundo ângulo oficial, 21 sem desenho de medidas, 5 com foto 1/2 abaixo do ideal
  (lista no `_PENDENCIAS.md` da última entrega). Sites da Gorenje, Bertazzoni, Deca e Tecno também
  não abriam da nuvem: do PC podem abrir — vale buscar lá.
- Upload na loja: é manual pelo painel, ou pela API da Loja Integrada (`/produto_imagem/`, envio por
  URL pública), que exige chave da API e chave da aplicação pedidas ao suporte. Nunca pedir que o
  lojista cole as chaves no chat.
