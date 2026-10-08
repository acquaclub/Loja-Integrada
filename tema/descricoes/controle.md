# Controle das descrições revisadas

Antes de começar um produto, conferir aqui se ele já foi feito.
Na loja, o SKU é sempre o código do fabricante.
Status: **rascunho** (aguardando dado/validação) · **entregue** (enviado para colar) · **no ar** (cliente confirmou no site).

| SKU (= código do fabricante) | Produto | Marca | Arquivo | SEO (nome/title/description) | Status | Data |
|---|---|---|---|---|---|---|
| CV-1BI-40-VT-2VPA | Adega Vetro 40 Garrafas Built-in 220V | Elettromec | `elettromec-adega-vetro-40-CV-1BI-40-VT-2VPA.html` | `elettromec-adega-vetro-40-CV-1BI-40-VT-2VPA-seo.txt` (URL mantida) | entregue | 08/10/2026 |
| JC-145B-L | Wine Center Smart 46 Garrafas Dual Zone, abertura esquerda, 127V/220V | Evol | `evol-wine-center-46-JC-145B-L.html` | `evol-wine-center-46-JC-145B-L-seo.txt` (URL mantida) | entregue (inversão de porta fora: ficha oficial x descrição antiga divergem) | 08/10/2026 |
| JC-425B220R | Wine Center Smart 160 Garrafas Dual Zone, abertura direita, 220V | Evol | `evol-wine-center-160-JC-425B220R.html` | `evol-wine-center-160-JC-425B220R-seo.txt` (URL mantida) | entregue | 08/10/2026 |

## Pendências gerais
- Depois de cada lote no ar: rodar `gerar-lista-nomes.js` com os SKUs da loja em `RELER`, para atualizar o nome curto dos cards.
- `script-descricao-titulo.js` só sai do painel quando **todos** os produtos estiverem no modelo novo.
- Sanfona: colocar o botão dentro do `h3` (acessibilidade/hierarquia). Não bloqueia as descrições.
