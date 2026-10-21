> **Substituído por `INSTRUCOES-CLAUDE-PC.md` (21/10/2026).** Use aquele arquivo.

# Regras da Unikitchen para o Claude do PC (acrescentar ao CLAUDE.md da pasta "1. Workflow\API")

Versão de 21/10/2026, definida junto com o Claude da nuvem (repositório GitHub acquaclub/Loja-Integrada, branch claude/modest-gauss-4q5q91). Quando houver diferença entre estas regras e as anteriores deste arquivo, valem estas.

## 1. Divisão de trabalho
- **Claude da nuvem** prepara o conteúdo: descrições (HTML), nome, título SEO, meta, título curto e subtítulo, conferência com o material oficial e padronização das fotos. Entrega arquivos prontos (planilha .xlsx no formato da exportação da loja, HTML por SKU, zip de fotos com uma pasta por SKU). **Não altera nada na loja.**
- **Claude do PC** (você) aplica na loja pela API: cadastro, descrições, fotos, SEO, listas de nomes curtos (script-nomes-1 e 2), ativação. Só um Claude mexe na loja.
- Antes de mudança em massa: mostrar ao cliente o que muda e pedir ok (como já fazemos).
- Depois de aplicar, registrar o que foi feito (produtos_criados.json) e avisar o cliente, que repassa ao Claude da nuvem.

## 2. Título curto e subtítulo (a mesma regra vale para a lista de nomes e para a descrição)
- **Título curto** (lista de nomes e h2 da descrição): identifica o produto. Até ~40 caracteres, sem marca. No h2: "Título curto | Marca".
- **Subtítulo**: características, com **campos fixos por categoria**, nesta ordem, separados por " | " (o site troca por " · "). 3 a 5 itens. Sem diferenciais (Dual Flame, Gas-Stop, Air Fry, Wi-Fi etc. ficam no texto da descrição), sem adjetivos. Campo sem dado oficial: pula. Tensão sempre por último.
- **Nada que está no título pode se repetir no subtítulo.**
- **Um texto só:** a linha técnica da lista de nomes é exatamente o `<p class="uk-desc-linha">` da descrição. Não existe "linha de destaque" diferente do subtítulo.
- Versões parecidas: diferenciar pela cor ou pela porta ("Porta Esquerda"/"Porta Direita" antes da tensão; cor no subtítulo ou no título curto).

| Categoria | TÍTULO | SUBTÍTULO (nesta ordem) |
|---|---|---|
| Adega | Adega + Linha + nº de garrafas + Dual Zone (se tiver) | Instalação · Largura · Temperatura · Tensão |
| Cervejeira / Beer Center | Cervejeira + Linha + litros | Instalação · Largura · Temperatura · Tensão |
| Frigobar | Frigobar + Linha + litros | Instalação · Largura · Temperatura · Tensão |
| Freezer | Freezer + Linha + litros | Instalação · Largura · Temperatura · Degelo · Tensão |
| Refrigerador | Refrigerador + tipo de porta (Bottom Freezer, French Door, Duo) + Linha + litros | Instalação · Largura · Degelo · Tensão |
| Gaveta aquecida / refrigerada | Gaveta Aquecida/Refrigerada + Linha + largura | Instalação · Capacidade · Temperatura · Tensão |
| Forno | Forno Elétrico/a Gás + Linha + litros | Instalação · Largura · Nº de funções · Tensão |
| Micro-ondas / combinado | Micro-ondas (ou Micro-ondas Combinado) + Linha + litros | Instalação · Largura · Nº de funções · Tensão |
| Cooktop / Rangetop | Cooktop a Gás/Indução/Elétrico + Linha + nº de queimadores/zonas + largura | Mesa (vidro, inox) · Acendimento · Tensão |
| Dominó | Dominó + tipo (Gás, Indução, Teppan, Fryer, Barbecue) + Linha + largura | Nº de queimadores/zonas · Mesa · Tensão |
| Fogão | Fogão + Linha + nº de queimadores + largura | Tipo de forno (gás/elétrico) · Litros do forno · Instalação · Tensão |
| Coifa | Coifa de Parede/Ilha/Embutir + Linha + largura | Vazão (m³/h) · Filtro · Ruído (dB) · Tensão |
| Lava-louças | Lava-louças + Linha + nº de serviços | Instalação · Largura · Nº de programas · Tensão |
| Frente de lava-louças | Frente Lava-louças + nº de serviços | Largura · Acabamento |
| Cuba | Cuba Simples/Dupla + Linha + medida (cm) | Instalação · Material · Válvula |
| Misturador / Torneira | Misturador Monocomando/Torneira + Linha | Material · Bica/ducha · Acabamento · Instalação |
| Triturador | Triturador + Linha + potência (HP) | Câmara · Acionamento · Tensão |
| Dosador de sabão | Dosador de Sabão + formato + capacidade (ml) | Acabamento · Abastecimento · Instalação |
| Lixeira | Lixeira + formato + litros | Material · Instalação |
| Banheira | Banheira de Hidro/Imersão + Linha + comprimento | Material · Instalação · Tensão |
| Churrasqueira | Churrasqueira a Gás/Carvão/Elétrica + Linha + medida | Nº de queimadores · Potência (BTU/h) · Instalação · Tensão |
| Lavadora / Secadora | Lavadora/Lava e Seca + Linha + kg | Abertura · Cor · Tensão |
| Máquina de gelo | Máquina de Gelo + Linha + produção (kg/dia) | Reservatório · Instalação · Tensão |
| Cafeteira / Wine dispenser / Umidor | Tipo + Linha | Instalação · Largura · Função principal · Tensão |

Exemplos: "Cooktop a Gás Filotop Original 4 Queimadores 110 cm" / "Mesa Inox 304 | Superautomático | 220V"; "Adega Senses 27 Garrafas Dual Zone" / "Embutir | 38 cm | 5 a 20 °C | 220V"; "Churrasqueira a Gás Modena 28\"" / "3 Queimadores + Infrared | 60.000 BTU/h | Embutir".

Nome do produto, título SEO e meta: continuam como já está no seu arquivo (nome completo; "… | Unikitchen"; meta terminando em "Lojas em Sorocaba e Itapetininga.", até ~155 caracteres).

## 3. Conteúdo da descrição
- Só dados oficiais (site, guia, manual, folder do fabricante). Nada inventado.
- Sem superlativos e promessas de marketing ("perfeito", "ideal", "premium", "sofisticado", "incomparável", "o melhor", "alta performance" etc.).
- Quando duas fontes oficiais divergem, **escolher um valor**, nesta ordem: 1) fonte específica do código vence a genérica; 2) tabela técnica vence texto de marketing; 3) valor repetido em mais fontes vence; 4) manual > guia > site; 5) empate: o mais conservador. Dado que simplesmente não existe fica em branco.
- Número de funções/programas de fornos: usar o número do site do fabricante.
- Inox 304: quando o fabricante informar 304, incluir o texto padrão: "O inox 304 tem mais cromo e níquel que o inox 430, usado na maior parte dos eletrodomésticos, e por isso resiste melhor à corrosão. É uma escolha mais segura para cozinhas úmidas e para casas em cidades litorâneas, onde a maresia favorece o aparecimento de pontos de ferrugem no 430. Para manter o acabamento, a limpeza regular continua necessária."
- Estrutura HTML: article.description > h2.uk-desc-titulo > p.uk-desc-linha > parágrafos > div.section (h3.section-title + table em div.table-responsive, com th scope="row") > garantia (div.guarantee, bloco padrão da marca) > div.alert-box começando com "Importante:".
- **Código mudou (produto substituído):** trocar o código no anúncio antigo em vez de criar outro. Mantém o endereço e o histórico no Google. Só criar anúncio novo quando for produto realmente novo.

## 4. Fotos
- Continuam as suas regras de seleção (até 8; sem selos, etiquetas, logos, peças internas, outro modelo; 01 = principal; SKU-01.jpg…; troca sem deixar o produto sem foto).
- **Antes de subir, toda foto passa pela padronização** (ferramenta tema/ferramentas/fotos/padronizar_fotos.py do repositório, ou o Claude da nuvem padroniza e devolve o zip):
  - 2000x2000, JPG, fundo branco;
  - foto de produto: recortada, centralizada, sem sombra/reflexo no chão;
  - foto de detalhe/ambiente: cheia nos 2000x2000 (corte central quadrado), sem borda branca;
  - desenho técnico: centralizado com margem.

## 5. Pendências abertas (21/10)
- Os 46 produtos novos: fotos sem padronização; descrições a conferir com estas regras (o Claude da nuvem vai ler pela API, só leitura, e mandar a lista de correções).
- Possíveis duplicados (versão nova criada como anúncio novo): ECTGD4QM3D x ECTGD4QM3C, ECTID5QM2B x ECTID5QM2A, ECTGD5QM3B x ECTGD5QM3A, EMOEB0252A x EMOEB0252B. Não desativar nada antes da conferência.
- 70 produtos antigos ainda com fotos fora do padrão (dependem das fotos de fabricante da sessão de imagens).
