# Auditoria técnica — unikitchen.com.br

Data: 28/09/2026
Escopo: todo o código personalizado cadastrado no painel da Loja Integrada (CSS e Códigos HTML), versionado em `tema/`.

**Limitação importante:** o site em produção **não foi acessado**, porque a política de rede do ambiente bloqueia o domínio. Tudo abaixo vem da leitura do código. Os itens marcados como [Provável] ou [Chute] precisam ser confirmados no site ao vivo.

Legenda de confiança: [Certeza] evidência direta no código · [Provável] inferência forte · [Chute] depende de como a Loja Integrada/o tema renderiza.

---

## Inventário do que está instalado

| Arquivo no repo | Local no painel | Páginas |
|---|---|---|
| `tema/css-personalizado.css` | CSS do tema | Todas |
| `script-barra-de-beneficios.html` | Rodapé (HTML) | Home |
| `secao-marcas-de-prestigio.html` | Rodapé (HTML) | Home |
| `script-whatsapp-home.html` | Rodapé (HTML) | Home |
| `script-mobile-categorias.html` | Rodapé (HTML) | Home |
| `script-botao-vitrine.html` | Rodapé (HTML) | Todas |
| `script-rodape.html` | Rodapé (HTML) | Todas |
| `script-interacoes.js` | Rodapé (JavaScript) | Todas |
| `script-whatsapp-produto.js` | Rodapé (JavaScript) | Página do produto |
| `google-tag-manager.html` | Cabeçalho (HTML) | Todas |
| `dominio-facebook-pixel.html` | Cabeçalho (HTML) | Todas, exceto checkout |

Os scripts se sobrepõem bastante: o mesmo elemento (`.botao-comprar`, `.listagem-item`, `#rodape`, ícones) é estilizado em 2 ou 3 lugares diferentes, quase sempre com `!important`. **Essa é a raiz da maior parte das divergências visuais.** [Certeza]

---

## 🔴 Crítico: afeta venda, dados ou exigência legal

### 1. Produtos podem ficar invisíveis
- O CSS, na seção 14, deixa **todo** `.listagem .listagem-item` com `opacity: 0`. O produto só aparece quando o JavaScript (`script-interacoes.js`) adiciona a classe `.revelado`. [Certeza]
- O JavaScript só observa os produtos que já existem no carregamento da página. Produtos que chegam depois ficam **invisíveis para sempre**: "carregar mais", paginação via AJAX, filtros e clones de carrossel/vitrine. [Provável]
- Se qualquer outro script da página der erro antes desse, **a vitrine inteira fica em branco**. [Provável]
- **Correção:** inverter a lógica. O padrão deve ser visível e a animação só esconde o produto se o JavaScript estiver ativo. Também é preciso observar novos produtos (MutationObserver) ou simplesmente remover o efeito.

### 2. Botão da vitrine com texto diferente da ação
- `script-botao-vitrine.html` troca o texto de **todos** os `.listagem-item .botao-comprar` para "VER ESPECIFICAÇÕES". [Certeza]
- Na Loja Integrada, `.botao-comprar` na listagem pode ser o botão que **adiciona ao carrinho**, dependendo da configuração do produto (sem variação ou com variação). O cliente clica em "ver especificações" e o produto vai para o carrinho. [Provável]
- O CSS principal esconde o botão (`opacity: 0`) enquanto ele tem `title="Ver detalhes do produto"`, só que o script troca esse `title`. Resultado: o botão pisca invisível e depois aparece. Esconder até passar o mouse também não funciona no celular, porque não existe "hover". [Certeza]
- O botão tem 2 estilos conflitantes: preto (CSS principal) e branco com borda (script da vitrine). [Certeza]
- `ajaxComplete` reescreve todos os botões a cada chamada AJAX da página, incluindo cálculo de frete e carrinho. [Certeza]
- **Correção:** alterar só o texto dos botões cujo link leva à página do produto e unificar o estilo num lugar só.

### 3. Rodapé sem os dados obrigatórios da empresa
- O CSS esconde o rodapé nativo inteiro (`#rodape { display: none !important }`). [Certeza]
- O rodapé personalizado **não tem CNPJ, razão social, endereço físico, telefone nem e-mail**. [Certeza]
- O **Decreto 7.962/2013 (art. 2º)** obriga lojas virtuais a mostrar esses dados em local de destaque e fácil visualização. Isso é risco jurídico (Procon) e também de confiança, num ticket alto como eletros premium. [Certeza] sobre a exigência legal.
- Não há link de contato direto nem WhatsApp no rodapé, e o WhatsApp flutuante só aparece na Home.
- **Correção:** acrescentar um bloco "Unikitchen — Razão Social LTDA — CNPJ — Endereço do showroom em Sorocaba — Telefone — E-mail".

### 4. Rastreamento (GTM) instalado na mão: provável origem de divergência de dados
- O GTM está cadastrado como código manual, e o próprio painel avisa que existe **aplicativo nativo** com "diversos eventos nativos". [Certeza]
- A instalação manual **não envia os eventos de e-commerce** da Loja Integrada para o `dataLayer`: view_item, add_to_cart, begin_checkout, purchase com valor. Isso faz GA4/Meta mostrarem números diferentes dos pedidos reais. [Provável]
- Se o aplicativo também estiver ativo com o mesmo ID, **todos os eventos contam em dobro**. [Provável]
- Falta a parte `<noscript>` do GTM. Isso tem impacto pequeno.
- O Pixel do Meta não aparece em nenhum código enviado, só a meta tag de verificação de domínio. Ou ele está no aplicativo nativo, ou dentro do GTM. Precisa conferir onde está e se não está nos dois ao mesmo tempo. [Chute]
- **Correção:** remover o GTM manual, configurar `GTM-WMXKQ2QM` pelo aplicativo nativo e revisar no GTM se há tags duplicadas de GA4 ou Pixel.

---

## 🟠 Alto: quebra visual perceptível

### 5. Ícones quebrados e conflito entre 3 bibliotecas de ícones
- O rodapé carrega o **Font Awesome 6.0.0-beta3** (versão *beta*, pesada) em todas as páginas. O tema usa ícones `icon-*` com a fonte própria "FontAwesome". [Certeza]
- O CSS, na seção 16, força `font-family: 'FontAwesome'` em tudo que tem `fa-` ou `icon-`, mas os ícones `fab fa-instagram` e `fab fa-whatsapp` do FA6 dependem da fonte "Font Awesome 6 Brands". O ícone do Instagram pode sair como quadrado vazio. [Provável]
- No cabeçalho fixo (`#cabecalho.fixed *`, `.menu.flutuante *`), a fonte Urbane e a cor #1a1a1a são forçadas com `!important` em **todos** os elementos, incluindo os ícones. Isso deixa ícones virando letras ou quadrados e **a lupa da busca preta sobre fundo preto**. [Provável]
- O SVG do WhatsApp no CSS termina em `-117z`. No desenho original do ícone é `-157z`, então o ícone pode sair deformado. [Provável]
- **Correção:** remover o FA6 do CDN, usar SVG inline para Instagram e WhatsApp e restringir os seletores `*` do cabeçalho fixo.

### 6. Selos e imagens deformados nos cards
- `.listagem-item img` força `aspect-ratio: 1/1`, `width: 100%` e `mix-blend-mode` em **qualquer** imagem dentro do card, não só na foto do produto. Selos em imagem (frete grátis, desconto, marca) ficam esticados. [Provável]
- O fundo da foto é definido duas vezes com valores diferentes: `#f7f7f5` na seção 4B e `#fafafa !important` na seção 24. [Certeza]
- O card sobe no hover (`translateY`) e a imagem dá zoom ao mesmo tempo. Com `transition: all !important`, isso atropela a animação de entrada. [Certeza]

### 7. Banners cortados
- Os banners estão com altura fixa (520px no computador e 280px no celular) e `object-fit: cover`. Em telas com proporção diferente, **o texto e a oferta do banner são cortados nas laterais**, principalmente no celular. [Certeza]
- A tarja está limitada a 56px com `cover`, então também corta. [Certeza]
- **Correção:** usar a proporção real da arte, ou cadastrar banners específicos para mobile, sem altura fixa.

### 8. Conteúdo "pulando" ao carregar (CLS)
- A barra de benefícios, as marcas e os atalhos mobile são inseridos no rodapé e **movidos via jQuery** só depois que a página carrega. O usuário vê o conteúdo pular, e isso piora o Core Web Vitals (CLS) e o SEO. [Certeza]
- Se o jQuery falhar, os blocos ficam no fim da página. [Provável]

---

## 🟡 Médio: desempenho, manutenção e detalhes

9. **Fontes pesadas:** 3 arquivos `.ttf` sem versão `.woff2`, que é cerca de 50–70% menor. [Certeza] O peso 400 (regular) não existe, então o texto padrão cai para light (300) ou demibold. [Provável]
10. **Largura de até 2000px** no computador (`.conteiner`): em monitores grandes a vitrine fica esticada demais e as linhas longas prejudicam a leitura. O comum é algo entre 1280 e 1440px. [Certeza]
11. **Código morto:**
    - CSS de `#rodape` no mobile (o rodapé está escondido)
    - `.custom-footer-restored .single_footer` (essa classe não existe)
    - Seção 0 "Paleta" vazia
    - `!important` dentro de `@keyframes`, que o navegador ignora
    
    [Certeza]
12. **Regras duplicadas:** o nome do produto está com 14px na seção 4 e 13px na seção 24; o card está estilizado nas seções 12 e 24. [Certeza]
13. **Evento `minicart_state_changed`:** não confirmei que a Loja Integrada dispara esse evento. Se não disparar, o pulso do carrinho nunca acontece. [Chute]
14. **Links dos atalhos mobile:** `/coifas-`, `/fornos-` e `/refrigeradores-e-frezzers` ("frezzers") parecem slugs com erro. Precisa conferir se abrem a categoria ou dão 404. [Chute]
15. **Botão de WhatsApp na página de produto** (`script-whatsapp-produto.js`). *Correção de uma versão anterior desta auditoria: o botão existe; a afirmação de que faltava estava errada.* Problemas encontrados:
    - **O botão sai preto e fica dourado no hover, não verde.** Ele recebe a classe `botao principal`, e a regra `html body .botao.principal` do CSS (seção 4, `!important`) é mais específica que `html body .wpp-produto-cta` (seção 20). Os estilos inline do script perdem para `!important`. [Certeza]
    - **A mensagem pode citar o nome errado.** O nome do produto é buscado primeiro em `[itemprop="name"]`, que também pode existir no breadcrumb, na marca ou em produtos relacionados. A mensagem pode sair como "interesse no produto 'Início'". [Provável]
    - O script espera `window.load` (todas as imagens carregadas), então o botão aparece segundos depois e empurra o layout. [Certeza]
    - A constante `NUMERO_WHATSAPP` fica no escopo global. Se o código for incluído duas vezes, dá erro de JavaScript e pode derrubar os scripts seguintes (ver item 1). [Certeza]
    - Nas páginas de categoria continua sem WhatsApp. [Certeza]
16. **Acessibilidade:** o nome do produto é cortado em 2 linhas com altura fixa de 38px. Nomes longos de eletro (modelo, voltagem) perdem justamente a informação que diferencia um produto do outro. [Provável]
17. **Newsletter removida:** foi uma decisão consciente, mas elimina a captação de e-mail. Vale reavaliar. [Provável]

---

## O que falta verificar no site ao vivo

A verificação depende de liberar `www.unikitchen.com.br` no acesso de rede do ambiente:
- Console do navegador: erros de JavaScript e recursos 404
- Vitrine com paginação/filtro: confirmar o item 1
- Comportamento real do botão da vitrine: confirmar o item 2
- Lighthouse (desempenho, SEO, acessibilidade) no mobile
- SEO técnico: títulos e descriptions, dados estruturados de Produto (preço/estoque para o Google Shopping), canonical, sitemap
- Consistência de preço entre listagem, página de produto e checkout (Pix, parcelamento)
- Links do menu, dos atalhos e do rodapé (páginas institucionais existem?)

## Plano de correção sugerido

1. Itens 1 e 2: consertar a vitrine (animação segura e botão correto).
2. Item 4: migrar o GTM para o aplicativo nativo e auditar as tags.
3. Item 3: dados legais no rodapé (depende de você passar os dados da empresa).
4. Itens 5 a 8: consolidar o CSS num arquivo só, sem conflitos, com ícones em SVG e banners sem corte.
5. Itens 9 a 17: limpeza e desempenho.

Cada correção fica versionada em `tema/`. Você copia e cola no painel.

---

## Atualização 28/09/2026: mudança de regras no checkout (comunicado da Loja Integrada)

- O checkout deixa de executar códigos HTML/JS publicados em "Página de checkout", "Finalização do pedido" e "Todas as páginas".
- GTM colado manualmente: para de funcionar no checkout. **Data divergente nos textos oficiais: 01/10/2026 no artigo e 05/10/2026 no aviso.** Planejar pela data mais cedo.
- **Contradição no artigo oficial:** num trecho diz que "a Loja Integrada vai remover o código"; na FAQ, diz que o código continua carregando fora do checkout.
- Aplicativo GTM + script manual ao mesmo tempo = container carregado 2x e conversões em dobro (confirmado pela documentação oficial). **Situação atual da loja.**
- Com o aplicativo, no checkout só funcionam acionadores do tipo **Evento personalizado** (begin_checkout, add_shipping_info, add_payment_info, purchase…). Acionadores de clique, visibilidade, formulário, rolagem e variáveis DOM/JS param de funcionar nessa etapa.

Ações:
1. Confirmar que o aplicativo GTM usa `GTM-WMXKQ2QM` e remover o código manual "Google Tag Manager | BM01".
2. Revisar tags/acionadores do container: remover GA4/Pixel duplicados com os aplicativos e trocar acionadores de página por eventos da plataforma.
3. `script-rodape.html`: mudar para "Todas as páginas exceto checkout".

### IDs de rastreamento confirmados (28/09/2026)

| Ferramenta | Caminho | ID |
|---|---|---|
| Google Tag Manager | Aplicativo nativo (código manual BM01: remover) | `GTM-WMXKQ2QM` |
| Google Analytics 4 | Aplicativo nativo | `G-WBGPWNLQDT` |
| Pixel do Meta | Aplicativo nativo | `656247179541941` |

Pendente: conferir se o contêiner GTM tem tags com `G-WBGPWNLQDT` ou `656247179541941`, o que seria duplicação.

### Progresso do rastreamento (28/09/2026)

- ✅ GTM manual (BM01) removido: só `GTM-WMXKQ2QM` carrega, via aplicativo.
- ✅ `script-rodape.html` passou para "Todas as páginas exceto checkout".
- ✅ Pixel duplicado corrigido: tag `Pixel | Meta Ads | PageView` pausada no GTM. Console: 1 PageView (`656247179541941`).
- ⚠️ GA4: com a `Tag | GA4` (`G-WBGPWNLQDT`) pausada no GTM, o GA4 parou de registrar. **O aplicativo nativo de Google Analytics não envia dados.** A tag foi reativada e continua sendo a única fonte do GA4. Próximo passo: chamado na Loja Integrada sobre o aplicativo.
- ⚠️ Há duas propriedades GA4 com nome quase igual: 396078289 (recebendo dados) e 346482005 (a verificar).
- ⚠️ O contêiner antigo `GTM-WVCN28L` não carrega no site e pode ser arquivado.
- Pendente: acionadores `Acionador | WhatsApp` (Google Ads) e `Acionador | WhatsApp [SITE NOVO]` (Meta) são diferentes, então os leads de WhatsApp podem não estar chegando ao Google Ads. Também falta verificar o ID do `Remarketing do Google Ads`.

### Outras mudanças (28/09/2026)

- ✅ Aplicativo "Login Social via Google" desinstalado (carregava scripts do Google em todas as páginas e gerava erros no console).
- ✅ Tarja preta de benefícios (imagem) removida pelo lojista. A seção 5 do CSS (regras da tarja) pode ser limpa.
- Adiado: ícone quadrado da loja (manifest 192×192 usa o logo retangular).

### Design e SEO (28/09/2026)

- ✅ Cabeçalho: faixa superior com horário, logo 200×40, busca à direita, menu em Urbane.
- ✅ Rodapé com razão social, CNPJ e endereço (Decreto 7.962/2013).
- ✅ Página de produto: nome à esquerda, código e marca juntos, sem texto de contato duplicado, painel lateral flutuante escondido, setas das miniaturas corrigidas, breadcrumb limpo.
- ✅ Um único `<h1>` por página de produto: `script-descricao-titulo.js` troca o h1 da descrição por h2 (confirmado no console: 1 h1). Correção definitiva ainda pendente na origem: modelo de descrição e produtos existentes.
- Pendentes de design: banners (corte no celular), atalhos do celular (emojis), cards/títulos da vitrine ("Produtos relacionados").

---

## Pendências consolidadas (28/09/2026, fim do dia)

### Dados e rastreamento
1. Acionadores de WhatsApp no GTM: `Acionador | WhatsApp` (Google Ads, 2 anos) ≠ `Acionador | WhatsApp [SITE NOVO]` (Meta). Os leads de WhatsApp podem não estar chegando ao Google Ads.
2. Tag `Remarketing do Google Ads`: conferir o ID de conversão (pode ser de conta antiga).
3. Aplicativo Google Analytics não envia dados: abrir chamado na Loja Integrada.
4. Duas propriedades GA4 (396078289 e 346482005): identificar a oficial e arquivar a outra.
5. Contêiner antigo `GTM-WVCN28L`: arquivar.
6. Melhoria: eventos GA4 pelo GTM (view_item, search, clique no WhatsApp) usando o dataLayer do aplicativo.

### Design
7. Banners: altura fixa com corte (principalmente no celular).
8. Atalhos de categoria no celular: trocar emojis por ícones.
9. Vitrine: título "Produtos relacionados" fora do padrão; setas do carrossel da vitrine.
10. Confirmar código/marca alinhados e logos das marcas maiores (após o cache).

### Arquivos e conteúdo (lojista)
11. Logos Falmec, InSinkErator e Smeg; SVGs das marcas recortados rente ao desenho.
12. Logo Unikitchen reexportado sem margem; ícone quadrado da loja (512×512).
13. Descrições de produto: `<h1>` → `<h2>` na origem (modelo + produtos existentes).
14. Padronização das fotos de produto (quadradas, mesmo fundo).
15. Conferir se as 12 páginas institucionais do rodapé existem.

### Limpeza técnica
16. CSS: remover código morto (seção 5 da tarja, regras de #rodape, seletores de newsletter, .single_footer, !important em @keyframes, regras duplicadas, seletores #cabecalho.fixed/.menu.flutuante) e revisar a seção 16 (força 'FontAwesome').
17. `.listagem-item img` atinge também selos/bandeiras dos cards.
18. Fontes: converter TTF → WOFF2 e avaliar peso 400.
19. Blocos movidos por jQuery após o carregamento (barra de benefícios, marcas, atalhos): causam salto de layout (CLS).

### Fonte Urbane (28/09/2026)

- Causa: os .ttf em `cdn.awsli.com.br` eram bloqueados por CORS, e a Urbane **nunca carregava** no site (tudo caía na fonte de reserva).
- ✅ Corrigido: Urbane embutida em WOFF2 (subconjunto para português, com kerning, ~9 KB por peso), em 3 códigos tipo CSS no Cabeçalho. Console: `document.fonts.check('600 14px Urbane') === true`.
- Pendente: confirmar se a licença da Urbane (Device Fonts / Rian Hughes) permite uso web; revisar tamanhos visuais agora que a fonte real aparece.

### Observações de operação (28/09/2026)

- Códigos HTML/JS entram na hora; o CSS Avançado leva ~15–20 min; a **home pode ficar em cache por mais tempo** que as outras páginas (testar com `?teste=1` na URL).
- Rodapé: a versão em sanfona no celular foi revertida a pedido; mantida a versão em colunas. A emenda marcas → rodapé na home fica no CSS principal.
- CSS reorganizado em 12 seções (índice no topo). Equivalência verificada por comparação de estilos calculados (1400/900/390px) antes de publicar.

### Páginas de conteúdo (28/09/2026)
Refeitas no padrão do site (arquivos `tema/paginas/*-completa.html`, colar no modo código/HTML): Parceiros, Confiabilidade, Entrega, Política de Privacidade, Retirada Fácil, Troca e Devolução, Diferenciais e Logística, Central de Atendimento, Nossa História e Assistência Técnica (layout original de cards, 24 marcas).

Pendências de conteúdo destas páginas:
- WhatsApp do SAC (15) 99613-6016 × site (15) 99610-0914; horários diferentes entre topo, Retirada e Central.
- Nossa História: "três showrooms" (o site só cita Sorocaba), "disponíveis 100% do tempo" e "uma das maiores referências" (comprovar).
- Assistência Técnica: faltam contatos confiáveis de Doka, Mekal e Viking (hoje só com link para o site oficial); demais contatos conferidos por busca, confirmar por telefone os principais.

### Progresso (29/09/2026)
- Horários separados: showroom (topo e rodapé), SAC seg–sex 8h–15h (Central e rodapé), retirada seg–sex 9h–17h só na Acqua (Retirada Fácil). WhatsApp oficial (15) 99610-0914 em todo o site.
- Páginas de conteúdo: ícones protegidos com &nbsp; (o editor apagava tags vazias); estilo das páginas separado em tema/paginas/estilo-paginas.css; CSS principal = CSS Avançado publicado.
- Cabeçalho: frases que se alternam na faixa superior; busca com lupa e pino do mapa (principal e fixo).
- Home: barra de qualidades (consultoria, entrega fracionada, showroom, garantia) com ícones dourados; marcas maiores e sem fundo branco; setas e indicadores do banner redesenhados.
- Produto: descrição em sanfona (script-produto-sanfona.js); fotos em moldura fixa, miniaturas em coluna com carrossel, setas e janela ampliada própria (script-produto-miniaturas.min.js — versão compacta por causa do limite de 15 mil caracteres).
- Rodapé: link "Como Comprar" removido (página inativa); link "Marcas" aponta para página inativa até ser refeita.

### Progresso (29/09/2026, tarde)
- Produto: topo em modo catálogo (script-produto-topo.js): marca preta com traço dourado, "Valores e condições sob consulta", voltagem em botões retos, garantias com ícone dourado, código no fim; no celular, miniaturas de 56px deslizantes; escondidos o ícone de WhatsApp do tema e as bordas da caixa de ações vazia. "Produtos relacionados" no padrão dos títulos da home.
- Cabeçalho: menu mais baixo (46px), sem linha entre logo e menu, degradê dourado embaixo. Celular: script-cabecalho-celular.js (logo centralizado, menu fino, lupa que abre a busca, pino do mapa).
- Home: WhatsApp flutuante com "x" para fechar o balão; barra de qualidades só com título no celular.
- CSS limpo (itens 22 e 23): blocos colados no fim reintegrados às seções, regras sobrescritas pelos scripts removidas; equivalência verificada (1400/900/390px).
- PageSpeed (29/09): celular 31 (FCP 6,1 s, LCP 15,7 s, CLS 0); computador 33 (CLS 0,388). Correção aplicada: altura do banner reservada no computador (aguarda nova medição). Acessibilidade: contraste do subtítulo das marcas, nomes nas setas e no menu, região principal.
- Dados estruturados: grupo + 3 showrooms (HomeGoodsStore) com endereço, horário, marcas e perfis — validados no teste de pesquisa aprimorada. Produto: só falta "offers" (esperado no modo catálogo). Casa Osten (SP) fica fora por ser espaço de terceiros.
- Pendências com a loja: reexportar banners em JPG (1920×520, área segura 1200×440; celular 800×800), meta descrição da home, revisar terceiros (GTM possivelmente duplicado, Enviou, login Google, SDK Facebook, Analytics antigo, ebit).
