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
