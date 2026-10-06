# Passagem: revisão das descrições de produto (Unikitchen)

Leia este arquivo inteiro antes de começar. Ele resume o que já existe e o que depende das descrições.

## Contexto da loja
- unikitchen.com.br, plataforma **Loja Integrada**, modo **catálogo**: sem preço e sem carrinho; a venda é pelo **WhatsApp**.
- Lojas físicas em **Sorocaba** (Av. Antônio Carlos Comitre, 1253) e **Itapetininga** (Av. Dr. José Ozi, 450, Urban Mall).
- Público premium: eletrodomésticos, louças e metais de alto padrão (Tramontina, Bertazzoni, Gorenje, Elettromec, Tecno, Evol, Jacuzzi, Smeg...).
- Repositório: `/home/user/Loja-Integrada`, branch `claude/modest-gauss-4q5q91`. O código do site fica em `tema/` (CSS Avançado em `tema/css-personalizado.css`, Códigos HTML em `tema/codigos-html/`).

## Como trabalhar com o cliente
- Português, tom de conselheiro: aponte falhas primeiro, sem elogio de abertura. Marque a confiança: [Certeza] / [Provável] / [Chute] / [Fora do escopo].
- Conciso. Um passo de cada vez.
- **Nunca invente especificação técnica** (medida, voltagem, potência, garantia). Se faltar dado, pergunte ou deixe marcado para o cliente preencher.
- **Entrega**: o cliente cola no painel. Gere uma página com botão "COPIAR TUDO" e envie com `SendUserFile` usando `display: "render"` (abre no chat, sem download):
  `python3 tema/ferramentas/gerar-copia.py SAIDA.html "Título|caminho/do/arquivo|Instrução (termina em ...)"` (um bloco por argumento). Grave a saída no scratchpad.
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
