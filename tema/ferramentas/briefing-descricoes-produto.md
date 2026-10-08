# Passagem: revisão das descrições de produto (Unikitchen)

Leia este arquivo inteiro antes de começar. Ele resume o que já existe e o que depende das descrições.

## Contexto da loja
- unikitchen.com.br, plataforma **Loja Integrada**, modo **catálogo**: sem preço e sem carrinho; a venda é pelo **WhatsApp**.
- Lojas físicas em **Sorocaba** (Av. Antônio Carlos Comitre, 1253) e **Itapetininga** (Av. Dr. José Ozi, 450, Urban Mall).
- Público premium: eletrodomésticos, louças e metais de alto padrão (Tramontina, Bertazzoni, Gorenje, Elettromec, Tecno, Evol, Jacuzzi, Smeg...).
- Repositório: `/home/user/Loja-Integrada`, branch `claude/modest-gauss-4q5q91`. O código do site fica em `tema/` (CSS Avançado em `tema/css-personalizado.css`, Códigos HTML em `tema/codigos-html/`).

## Arquivos de trabalho (ler antes de cada produto)
- `tema/descricoes/controle.md`: produtos já feitos (não repetir) e pendências.
- `tema/descricoes/marcas.md`: informações oficiais por marca (garantia etc.) já recebidas do cliente.
- `tema/descricoes/<marca>-<produto>-<código>.html` (+ `-seo.txt`): descrição e campos de SEO de cada produto.
- `tema/descricoes/planilha/produtos-AAAA-MM-DD.csv`: última exportação de produtos da Loja Integrada (sem preços). Tem nome, SEO, categoria, ativo/inativo, variações e a **descrição atual** de cada produto: não é preciso pedir o HTML antigo ao cliente se o produto estiver nela.
- `tema/descricoes/categorias.md`: árvore de categorias do painel. **Em todo produto, indicar a categoria correta (último nível)**.
- `tema/descricoes/lista-outro-chat-2026-10-08.md`: plano do chat de cadastro (trocar código, reativar, corrigir, remover e 195 produtos novos). É planejamento, não dado oficial.

## Fluxo combinado com o cliente (08/10/2026)
1. O cliente manda **primeiro só o código**. Eu avalio (planilha + `controle.md` + lista do outro chat) e respondo **o que faremos** com o item e **o que preciso** (em geral, a ficha/site oficial; o HTML atual já está na planilha). Só então ele manda o resto. Vale para produtos **ativos e inativos**.
   - **Um produto por vez: só o código enviado.** Produtos relacionados (par L/R, mesma família) eu só cito; não proponho fazer junto. **Cadastros novos ficam para o fim** (cliente, 08/10/2026).
2. Antes de escrever, cruzar o código com `controle.md` (coluna "Ação pendente") e com a planilha, e **dizer ao cliente o que fazer com o item**: só atualizar a descrição, trocar o código/produto (Parte A), reativar (B), corrigir cadastro (C), excluir (D), virar variação de outro anúncio, cadastrar como novo etc.
3. Depois fazer a descrição (modelo novo) + nome, title e meta description + **categoria correta** (conferir com `categorias.md`), e entregar.
4. Atualizar `controle.md` (tabela de cima + marcar "x" no catálogo) e `marcas.md` (dados oficiais novos da marca). Commit e push a cada entrega: o repositório é o lugar seguro para não perder nada quando a conversa for compactada.
5. Quando o cliente mandar uma planilha nova: salvar em `planilha/` (sem colunas de preço), regenerar o catálogo de `controle.md` e conferir o que mudou (produtos apagados, ativados, novos).

## Como trabalhar com o cliente
- Português, tom de conselheiro: aponte falhas primeiro, sem elogio de abertura. Marque a confiança: [Certeza] / [Provável] / [Chute] / [Fora do escopo].
- Conciso. Um passo de cada vez.
- **Nunca invente especificação técnica** (medida, voltagem, potência, garantia). Se faltar dado, pergunte ou deixe marcado para o cliente preencher.
- **REGRA DO CLIENTE: só dado oficial.** Toda informação da descrição precisa estar no material oficial que o cliente manda (site/ficha/manual do fabricante). O que não estiver lá, ou for dedução (ordem L x A x P, lado de abertura, "da mesma linha"...), **sai do texto ou é avisado ao cliente antes**. Na dúvida, não colocar. O que vier só da descrição antiga também precisa ser confirmado na fonte oficial.
- **Ordem das medidas (L x A x P etc.): confirmar com o cliente a cada produto.** A aprovação vale só para aquele produto, nunca como regra geral.
- **Largura comercial (regra do cliente):** largura real de 59,5 cm = largura comercial **60 cm**. Pode colocar sem perguntar quando a ficha oficial trouxer 59,5 cm (595 mm).
- **Entrega (preferência do cliente):** 4 arquivos de texto **separados**, enviados com `SendUserFile` um a um: `1-nome-do-produto.txt`, `2-descricao.txt` (HTML indentado), `3-seo-titulo.txt`, `4-seo-descricao.txt`. Os textos curtos (nome, title, description) também vão direto no chat em blocos de código. Não usar a página "COPIAR TUDO" para isso (o cliente achou ruim de abrir). CSS: mandar o arquivo inteiro ou dizer exatamente onde colar.
- **SEO:** nome do produto com o termo de busca ("Adega Climatizada de Embutir..."); title até ~60 caracteres terminando em "| Unikitchen"; meta description até ~155 caracteres terminando em "Lojas em Sorocaba e Itapetininga."; **URL: manter** (trocar perde indexação). Versões do mesmo produto (L/R) com titles diferentes.
- Sempre diga **onde colar** e **como termina** o código. Faça commit e push a cada entrega.

## Como a descrição é hoje (problemas)
Cada descrição foi colada como uma **página HTML inteira** dentro do campo de descrição do produto. Exemplo (produto DFD72EXB):
- Traz `<meta name="description">`, `<meta name="keywords">`, `<meta charset>`, `<meta viewport>`, `<meta name="robots">` e `<title>` **dentro do corpo da página**: inválido e redundante (o Google ignora ou se confunde; a meta description real é a do cadastro do produto).
- Traz um `<style>` com regras globais (`body {...}`, `h1 {...}`, `h2 {...}`, `.container {...}`) que **vazam para o site todo** (hoje o `script-produto-sanfona.js` remove esses `<style>` na página, mas o certo é não existirem).
- Usa **`<h1>`** para o título (ex.: "Painel Decorativo para Lava-Louças | Gorenje"): a página fica com **dois H1** (o nome do produto já é o H1). Hoje o `script-descricao-titulo.js` troca para `<h2>` no navegador, como remendo. **Correção na origem = objetivo desta revisão.**
- Títulos de seção com níveis misturados (`h3`, `h4`, `h6` com a classe `section-title`, e `div.div-title`).
- Emoji no aviso (⚠️) e caixas com cores próprias (verde da garantia) que destoam do padrão do site.

Estrutura de conteúdo atual (o que vale manter):
1. `article.description` com título "Nome curto | Marca", subtítulo "Item | Item | Item" (linha técnica) e 2–3 parágrafos de apresentação.
2. Seções com título (`.section-title`): Detalhes do Produto, Especificações Técnicas, Dimensões e Peso, etc., em tabelas.
3. Rodapé: aviso importante (`.alert-box`) e garantia (`.guarantee`).

## O que depende da descrição (não quebrar)
- **`tema/ferramentas/gerar-lista-nomes.js`**: lê de cada produto o **título** (`#descricao h1`, linha 69) e a **linha abaixo** (`#descricao h2`, linha 75) para gerar a lista de nomes curtos `UK_NOMES` (Códigos HTML `script-nomes-1.js` e `-2.js`), usada nos **cards** e no **título da página do produto** (`script-produto-topo.js`). **Se o título virar `<h2>`, ajuste o gerador** (ex.: título = `#descricao .uk-desc-titulo` ou o primeiro `h2`; linha = o elemento seguinte).
- **`script-produto-sanfona.js`**: transforma cada `.section-title` / `.div-title` em item de sanfona e junta `.alert-box` e `.guarantee` no fim. Manter essas classes (ou ajustar o script junto).
- **CSS Avançado, seção 10** (`#descricao article.description h1/h2`, `h2.uk-desc-titulo`): estilo do título e subtítulo. Ajustar junto se mudar a marcação.
- **`script-descricao-titulo.js`**: pode ser desativado **só depois** que todas as descrições estiverem corrigidas.

## REGRA FIXA: títulos da descrição (não mudar)
A página do produto tem **um único `<h1>`**: o nome do produto, que a plataforma coloca no topo (`.nome-produto`). Por isso, dentro da descrição:
- **Nunca usar `<h1>`.**
- O título da descrição é sempre **`<h2 class="uk-desc-titulo">Nome curto | Marca</h2>`**, por exemplo `<h2 class="uk-desc-titulo">Torneira Versa | Tramontina</h2>`.
- A linha técnica logo abaixo **não é título**: `<p class="uk-desc-linha">Inox 304 | Bica Articulada | Instalação de Bancada</p>`. Ela não pode ser `h2`, para não haver dois `h2` seguidos no topo.
- As seções (Detalhes do Produto, Especificações Técnicas, Dimensões e Peso, Garantia...) são todas **`<h3 class="section-title">`**: mesmo nível, sem `h4`, `h5`, `h6` ou `div.div-title`.
- Hierarquia final da página: `h1` (nome do produto, da plataforma) > `h2.uk-desc-titulo` (título da descrição) > `h3.section-title` (seções).
- Quando o modelo novo existir, o gerador de nomes (`gerar-lista-nomes.js`) passa a ler o título em `#descricao .uk-desc-titulo` e a linha em `#descricao .uk-desc-linha`. Para as descrições antigas, continua lendo `h1` e `h2` enquanto houver produto sem correção.
- O `script-descricao-titulo.js` (remendo que troca `h1` por `h2` no navegador) continua ativo até o **último** produto ser corrigido; só então sai do painel.

## Objetivo proposto (validar com o cliente antes)
1. **Modelo novo de descrição**, só o conteúdo (sem `<html>`, `<meta>`, `<title>`, `<style>`):
   - título como `<h2 class="uk-desc-titulo">Nome curto | Marca</h2>` e a linha técnica logo abaixo (ex.: `<p class="uk-desc-linha">Inox 304 | Bica Articulada | Instalação de Bancada</p>`);
   - apresentação em parágrafos;
   - seções com `<h3 class="section-title">` (todas no mesmo nível) e tabelas;
   - aviso e garantia com as classes atuais, sem emoji e sem cores próprias (o visual vem do CSS do site).
2. Ajustar **gerador de nomes**, **sanfona** e **CSS** para o modelo novo, mantendo compatibilidade com as descrições antigas enquanto a troca acontece.
3. **Revisar o texto** de cada produto: correção, tom premium, palavras de busca naturais (produto + marca + característica; Sorocaba só onde fizer sentido), sem inventar dados.
4. **SEO no lugar certo**: o texto da `<meta name="description">` que hoje está dentro da descrição vai para o campo de SEO do produto no painel da Loja Integrada (descrição para buscadores), onde ele vira a meta description real do `<head>`. `keywords` é ignorada pelo Google (não precisa migrar); `<title>` vem do campo de título/SEO do produto.
5. Definir o **fluxo de troca** no painel (produto a produto), com uma lista de controle do que já foi feito.

## Material que o cliente precisa fornecer
- O HTML atual das descrições (ou acesso via exportação/planilha de produtos da Loja Integrada), começando por poucos produtos para validar o modelo.

## Decisões já tomadas (não refazer)
- Página de produto: título visível = nome curto + linha técnica (de `UK_NOMES`); nome completo continua no `<title>`, em `meta itemprop="name"` e no `title` do H1 (`script-produto-topo.js`).
- Descrição exibida com título em maiúsculas, subtítulo em caixa alta espaçada e seções em sanfona (já no ar).
- Limite de 15 mil caracteres por Código HTML; CSS Avançado tem cache de 15–20 min (testar com `?teste=1`).
