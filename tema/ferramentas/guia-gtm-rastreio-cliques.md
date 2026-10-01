# Rastreio de cliques de contato: configuração no Google Tag Manager

O código `script-rastreio-cliques.js` (Códigos HTML) cria três eventos no `dataLayer`:

| Evento | Quando |
|---|---|
| `clique_whatsapp` | clique em qualquer link do WhatsApp |
| `clique_telefone` | clique em qualquer telefone |
| `clique_como_chegar` | clique em "Como chegar" / pino do mapa |

Cada evento leva estes dados:

| Dado | Exemplo |
|---|---|
| `contato_lugar` | `cabecalho_fixo`, `faixa_superior`, `rodape`, `flutuante_home_botao`, `botao_produto`, `barra_fixa_produto`... |
| `tipo_pagina` | `home`, `produto`, `categoria`, `marca`, `busca`, `institucional` |
| `pagina_caminho` | `/torneira-flexion-wall` |
| `produto_nome`, `produto_codigo` | só na página de produto |

A origem do visitante (Google, Instagram, anúncio, direto) o Google Analytics já registra sozinho.

## Passo a passo no GTM (tagmanager.google.com, contêiner GTM-WMXKQ2QM)

### 1. Variáveis (menu Variáveis > Variáveis definidas pelo usuário > Nova)
Crie 4 variáveis do tipo **Variável da camada de dados**, uma para cada nome:
`contato_lugar`, `tipo_pagina`, `produto_nome`, `produto_codigo`.
Dê a cada uma o mesmo nome do campo (ex.: variável "contato_lugar" com nome do campo `contato_lugar`).

### 2. Acionador (menu Acionadores > Novo)
- Tipo: **Evento personalizado**
- Nome do evento: `clique_whatsapp|clique_telefone|clique_como_chegar`
- Marque **Usar correspondência de regex**
- Disparar em: **Todos os eventos personalizados**
- Nome do acionador: `Cliques de contato`

### 3. Tag (menu Tags > Nova)
- Tipo: **Google Analytics > Evento do GA4**
- ID de medição: o da sua propriedade GA4 (começa com `G-`)
  - Se ainda não houver uma tag "Tag do Google" com esse ID no contêiner, crie também uma, disparando em **All Pages**.
- Nome do evento: `{{Event}}`
- Parâmetros do evento (Adicionar parâmetro, um por linha):
  - `contato_lugar` = `{{contato_lugar}}`
  - `tipo_pagina` = `{{tipo_pagina}}`
  - `produto_nome` = `{{produto_nome}}`
  - `produto_codigo` = `{{produto_codigo}}`
- Acionamento: **Cliques de contato**
- Nome da tag: `GA4 - Cliques de contato`

### 4. Testar e publicar
1. Clique em **Visualizar**, abra o site e clique em um WhatsApp: o evento `clique_whatsapp` deve aparecer no painel do Tag Assistant com a tag "GA4 - Cliques de contato" disparada.
2. Clique em **Enviar > Publicar**.

## No Google Analytics 4 (analytics.google.com)

1. **Administrador > Eventos**: depois que o primeiro clique chegar (pode levar até 24 h), marque `clique_whatsapp` como **evento principal** (conversão). Opcional: `clique_telefone` também.
2. **Administrador > Definições personalizadas > Criar dimensão personalizada** (escopo: Evento), uma para cada:
   `contato_lugar`, `tipo_pagina`, `produto_nome`, `produto_codigo`.
   Sem isso, os dados chegam mas não aparecem nos relatórios.
3. Para ver: **Relatórios > Engajamento > Eventos > clique_whatsapp**, e adicione a dimensão "contato_lugar" ou "Origem/mídia da sessão".

## Pixel da Meta e Google Ads

O código não chama o Pixel direto: o contêiner já tem as tags "Pixel | Meta Ads | WhatsApp" e "Tag | Lead | WhatsApp" (Google Ads).
Para elas usarem o mesmo clique, troque o acionador delas pelo acionador de evento personalizado `clique_whatsapp`.

## Situação configurada em 01/10/2026

- GTM-WMXKQ2QM instalado só pelo aplicativo nativo da Loja Integrada (sem código colado).
- GA4 (G-WBGPWNLQDT) conta as visitas pelo aplicativo nativo; a "Tag | GA4" do GTM tem `send_page_view = false`.
- Pixel 656247179541941 carregado pelo aplicativo nativo; "Pixel | Meta Ads | PageView" no GTM fica pausada.
- Acionadores "Acionador | WhatsApp" e "[SITE NOVO]": Click URL corresponde a RegEx (ignorar caso) `wa\.me|api\.whatsapp|whatsapp\.com`.
- Variáveis contato_lugar, tipo_pagina, produto_nome, produto_codigo; acionador "Cliques de contato"; tag "GA4 | Cliques de contato".
- GA4: 4 dimensões personalizadas criadas; page_view desmarcado como evento principal; falta marcar clique_whatsapp (aparece em até 24 h).
- GA4: domínios grupounikitchen.com e unikitchen.com.br na vinculação; tráfego interno "Loja Sorocaba" (201.92.132.107) com filtro ativo.
