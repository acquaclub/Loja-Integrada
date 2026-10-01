# Próximos passos (combinado em 01/10/2026)

Lista do que ficou para as próximas levas, em ordem de prioridade. Ao retomar, comece por aqui.

## Prioridades

### 1. Prova social
Hoje o site mostra marcas fortes, mas nada da Unikitchen em ação.
- Projetos realizados: fotos de cozinhas e áreas gourmet entregues, com crédito ao arquiteto.
- Depoimentos de arquitetos e clientes.
- Avaliações do Google das lojas de Sorocaba e Itapetininga.
- A definir: onde entra na home (sugestão: antes de "Marcas de Prestígio") e se ganha página própria.
- Precisa do cliente: fotos, nomes/autorizações dos arquitetos, textos dos depoimentos.

### 2. Banner para celular
- No celular, as artes de 1920×450 ficam com ~91px de altura (ilegível).
- Cliente vai criar artes próprias para celular (sugestão: 1080×720).
- Conferir se o painel de banners da Loja Integrada aceita imagem separada para celular; se não, resolver por código.
- CSS do banner: seção 7 do `tema/css-personalizado.css` (proporção `1920 / 450` nas duas regras).

### 3. PageSpeed
- Rodar pagespeed.web.dev (aba Celular) e trazer o print.
- Pontos já conhecidos: peso das artes do banner (meta: JPG < 300 KB), carregamento do banner (LCP), scripts de terceiros.

### 4. Textos de SEO nas categorias
- Um parágrafo curto por categoria (Coifas, Adegas, Cooktops...) para buscas como "coifa de ilha Sorocaba".

### 5. Favicon e logo em PNG
- Feito pelo cliente em 01/10/2026.

## Lembretes de medição (ver `tema/ferramentas/guia-gtm-rastreio-cliques.md`)
- 02/10/2026: marcar `clique_whatsapp` como evento principal no GA4 (Administrador > Eventos > Eventos recentes > estrela).
- ~08/10/2026: ler o relatório Engajamento > Eventos > clique_whatsapp (lugar do contato, produto, origem).
- Se acessar o site de outro Wi-Fi (casa), criar mais uma regra de tráfego interno com o IP de lá.

## Outros itens adiados
- Produtos dos Destaques da home.
- Logos de Smeg, Falmec e InSinkErator na grade de marcas.
- Ajuste fino de espaçamentos no celular (cliente aponta o ponto exato com print).
- Aviso de cookies: hoje só informa; consentimento antes do rastreio (LGPD) fica para avaliar.
- Menu por ambiente, seção de showroom, "Consultar especialista".
