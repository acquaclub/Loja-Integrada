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
- Feito em 02/10/2026: artes de celular em 767×440 (máximo da Loja Integrada), CSS na seção 12 com a mesma proporção.

### Responsivo (revisão por tamanho de tela)
- Feito em 02–05/10/2026: celulares 320, 360, 390 e 430 (em pé e deitado), iPad Mini, iPad Air (em pé e deitado), iPad Pro 13 e monitores 2K/4K (ampliação moderada a partir de 2200px).
- Conferir com calma quando der: 1366×768 e 1920×1080 nas páginas de categoria e produto.

### Catálogo (pente fino de SKUs) – parado em 09/10/2026, retomar na terça pós-feriado
- Ver `tema/ferramentas/pente-fino/LEIA-ME.md` e a lista `lista-cadastro-e-mudancas.md`.
- Feito: exclusões de fora de linha (39 SKUs + 8 Smeg). Pendente: atualizar 26 códigos, reativar 8, 4 correções, remessa de 195 cadastros (via chat de descrições).
- Faltam listas: Tramontina, Franke, Deca, Jacuzzi, Speed Queen.

### 3. PageSpeed
- 05/10: nota 31 no celular. CLS corrigido (código entregue); falta o cliente colar e rodar de novo. Pendentes: reflow forçado, compressão dos banners de celular (~50–60 KB), revisar apps de terceiros (SDK Facebook, Enviou, ebit).
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
