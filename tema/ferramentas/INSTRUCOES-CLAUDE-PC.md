# Instruções completas para o Claude do PC (Unikitchen)

Versão de 21/10/2026, preparada pelo Claude da nuvem (repositório GitHub `acquaclub/Loja-Integrada`, branch `claude/modest-gauss-4q5q91`).
Colocar este arquivo e a pasta do pacote dentro de `1. Workflow\API` e citar no `CLAUDE.md` dessa pasta: "Leia `INSTRUCOES-CLAUDE-PC.md` antes de qualquer tarefa. Em conflito com regras anteriores, vale ele."

## 0. O pacote

| Arquivo / pasta | O que é |
|---|---|
| `INSTRUCOES-CLAUDE-PC.md` | Este arquivo. |
| `descricoes/*.html` | As 128 descrições prontas (só o conteúdo, sem `<html>`, `<style>`, `<meta>`). |
| `descricoes/*-seo.txt` | Por produto: nome, título SEO, meta, categoria, ação de cadastro, fontes, campos de especificação, embalagem, conflitos resolvidos. |
| `descricoes/produtos-feitos-128.json` | Os 128 em formato de máquina: `sku`, `codigo_antigo_no_anuncio`, `marca`, `nome_produto`, `seo_titulo`, `seo_meta`, `titulo_curto`, `subtitulo`, `status_controle`, `categoria_controle`, `obs`. |
| `descricoes/controle.md` | Controle completo: produtos entregues e catálogo com a ação pendente de cada SKU. |
| `descricoes/marcas.md` | Dados oficiais por marca e o **bloco de garantia** de cada uma (copiar igual). |
| `descricoes/categorias.md` | Árvore de categorias da loja. |
| `descricoes/pendente-conflitos.md` | Os 41 conflitos de fonte e a decisão tomada em cada um. |
| `regra-titulo-subtitulo.md` | Regra de título curto e subtítulo por categoria. |
| `fotos/padronizar_fotos.py` | Ferramenta de padronização das fotos (Python 3 + Pillow, numpy, scipy). |

## 1. Contexto da loja
- unikitchen.com.br, plataforma Loja Integrada, **modo catálogo** (sem preço, sem carrinho; venda pelo WhatsApp).
- Lojas físicas em **Sorocaba** e **Itapetininga**.
- Público de alto padrão: Elettromec, Evol, Tecno, Bertazzoni, Tramontina, Franke, Deca, Jacuzzi, Gorenje, InSinkErator, Speed Queen.
- O SKU da loja é o código do fabricante. Produto com variação de tensão: o anúncio "pai" leva a descrição; as variações têm SKU próprio.

## 2. Divisão de trabalho e segurança
- **Só um Claude mexe na loja por vez.** Hoje é você (PC). O Claude da nuvem prepara conteúdo e não escreve na loja.
- **Antes de qualquer gravação**, mostrar ao cliente a lista do que vai mudar (SKU, campo, valor atual → valor novo) e esperar o "ok". Lote grande: testar com 1 produto, conferir no site, depois o resto.
- **Antes de alterar, ler e guardar o valor atual** (backup em JSON por data). Assim qualquer troca pode ser desfeita.
- Nunca pedir nem mostrar o token no chat. Respeitar o limite da API (100 requisições/min).
- Registrar tudo o que foi aplicado (arquivo de log com data, SKU, campo, antes, depois). O cliente repassa o resumo ao Claude da nuvem.
- **Cada SKU é feito por um Claude só.** Antes de fazer uma descrição, conferir se ela já existe em `produtos-feitos-128.json` ou no seu próprio registro.

## 3. Como responder ao cliente
- Português, tom de conselheiro: aponte o problema primeiro, sem elogio. Marque a confiança: [Certeza], [Provável], [Chute], [Fora do escopo]. Conciso.
- **Quando o cliente mandar só um SKU**, responder em UMA linha: "faremos" (e pedir o material oficial), "já feito", "ficou para depois (motivo curto)" ou "trocar por outro: CÓDIGO". Sempre dizer se o anúncio está desativado. Se houver substituto, citar **um só** código e dizer se a troca foi confirmada no site oficial. Sem justificativas.
- Não repetir afirmações de listas antigas sem conferir no site oficial (já erramos assim: FG-AN-90, JC145CL, FR-LL-45, TO73EXDB).

## 4. Protocolo para fazer uma descrição
1. Cliente manda o SKU → resposta de uma linha (item 3).
2. Cliente manda o material oficial (site, ficha, manual, folder, guia) → entregar tudo de uma vez:
   - **Nome do produto**, **título SEO** e **meta** (em blocos de código);
   - **embalagem** (peso e dimensões para o frete);
   - **campos de especificação do cadastro** na ordem exata da tela;
   - **conflitos** entre fontes e o valor escolhido;
   - **o que saiu** da descrição antiga (dado sem fonte, superlativo) e **o que entrou**;
   - o HTML completo.
3. Quem aplica na loja é você, pela API, depois do "ok".

### Nome, título SEO e meta
- **Nome do produto:** completo, com o termo de busca: tipo + (de Embutir etc.) + marca + linha/modelo + especificações principais + medida + tensão. Ex.: "Frigobar de Embutir Elettromec Built-In Connect 145 Litros Inox 304 220V".
- **Título SEO:** até ~60 caracteres, termina em `| Unikitchen`.
- **Meta:** até ~155 caracteres, termina em `Lojas em Sorocaba e Itapetininga.`
- **URL:** manter sempre a atual (trocar perde indexação).
- Versões parecidas (porta esquerda/direita, cor) com nomes e títulos diferentes.

### Cadastro
- Peso/dimensões do cadastro = **embalagem** (usado no frete). Sem dado de embalagem: usar o do produto e avisar.
- **GTIN/EAN:** só com EAN oficial (ficha, caixa, nota). Sem EAN, deixar vazio; GTIN errado é pior que vazio.
- **Modelo alfanumérico:** sempre o código oficial do fabricante.
- **Largura comercial:** a largura real arredondada para cima, até a dezena seguinte (59,5 → 60 cm; 38 → 40 cm). Medidas de mercado (45 cm de lava-louças, 38 cm de undercounter): confirmar com o cliente.
- **Ordem das medidas (L x A x P):** confirmar com o cliente em cada produto.
- Termos: "Embutir" (não "Built-in"), "Embutir ou Piso" quando a ficha disser os dois. Nome oficial que tenha "Built-in" fica como a marca escreve.
- Categoria: sempre indicar a categoria de último nível (ver `categorias.md`).

## 5. Regras de conteúdo
- **Só dado oficial.** Tudo na descrição precisa estar no material oficial. Dedução ("da mesma linha", lado de abertura, ordem das medidas) sai ou é perguntada. O que vier só da descrição antiga precisa ser confirmado na fonte.
- **Sem superlativos e promessas:** "perfeito", "ideal", "premium", "sofisticado", "elegância", "incomparável", "o melhor", "alta performance", "tecnologia de ponta" etc.
- **Conflito entre fontes oficiais: escolher um valor** (cliente, 19/10: "não podemos ficar sem informação"). Ordem:
  1. fonte específica do código vence a genérica (folder da linha);
  2. tabela técnica vence texto de marketing;
  3. valor repetido em mais fontes vence;
  4. manual > guia comercial > site;
  5. empate: o valor mais conservador (menor potência/capacidade, maior exigência de instalação, menor garantia).
  Registrar o valor escolhido e o descartado no `-seo.txt`. Dado que não existe em nenhuma fonte fica em branco.
- **Exceção do cliente (20/10):** número de funções/programas de forno = o número do **site** do fabricante (ex.: Luce 75 → 12 programas, embora o manual diga 7).
- Garantia: só aplicar restrições à categoria que o termo nomeia.
- **Inox 304:** quando o fabricante disser 304, incluir este parágrafo, igual:
  > O inox 304 tem mais cromo e níquel que o inox 430, usado na maior parte dos eletrodomésticos, e por isso resiste melhor à corrosão. É uma escolha mais segura para cozinhas úmidas e para casas em cidades litorâneas, onde a maresia favorece o aparecimento de pontos de ferrugem no 430. Para manter o acabamento, a limpeza regular continua necessária.
- **Garantia:** usar o bloco pronto da marca em `marcas.md` (Elettromec 2 anos; Evol 1 ano; Tecno 2 anos; Bertazzoni, Franke, Tramontina, Deca, Jacuzzi: ver arquivo). Marca sem bloco: pedir o termo oficial ao cliente.

### Estrutura HTML (fixa)
```html
<article class="description">
    <h2 class="uk-desc-titulo">Título curto | Marca</h2>
    <p class="uk-desc-linha">Campo | Campo | Campo | Tensão</p>

    <p>Parágrafo de apresentação, com <strong>dados-chave</strong>.</p>
    <p>Segundo parágrafo (recursos).</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Campo</th>
                        <td>Valor</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- outras seções: Especificações Técnicas, Dimensões e Peso, Instalação, Itens Inclusos... -->

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <!-- bloco da marca, copiado de marcas.md -->
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> ...</p>
    </div>
</article>
```
- Nunca `<h1>`, `<style>`, `<meta>`, `<title>`, emoji ou cor própria.
- Todas as seções em `h3.section-title` (sem h4/h5/h6/div-title). A sanfona do site depende dessas classes.
- Um exemplo completo: `descricoes/elettromec-frigobar-built-in-connect-145-FB-BI-145-XV-2VPA.html`.

## 6. Título curto e subtítulo
Valem para o `<h2>`/`<p class="uk-desc-linha">` da descrição **e** para a lista de nomes (script-nomes-1 e 2), que mostra o título curto e a linha técnica nos cards e no topo da página.
- **Título curto:** identifica e diferencia o produto. Até ~40 caracteres, sem marca (no h2: "Título curto | Marca"). Exceção: cooktops Tramontina Penta mantêm o nome inteiro da linha (até 50).
- **Subtítulo:** campos fixos da categoria, nesta ordem, separados por " | " (o site troca por " · "). 3 a 5 itens. Campo sem dado oficial: pula. Tensão por último; sem energia, sem tensão.
- **Nada do título se repete no subtítulo.** Sem campo "Diferencial" (Dual Flame, Air Fry, Wi-Fi ficam no texto). Sem adjetivos.
- **Um texto só:** a linha técnica da lista de nomes é exatamente o `uk-desc-linha` da descrição.
- Porta esquerda/direita: "Porta Esquerda"/"Porta Direita" antes da tensão.

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
| Fogão | Fogão + Linha + nº de queimadores + largura | Tipo de forno · Litros do forno · Instalação · Tensão |
| Coifa | Coifa de Parede/Ilha/Embutir + Linha + largura | Vazão (m³/h) · Filtro · Ruído (dB) · Tensão |
| Lava-louças | Lava-louças + Linha + nº de serviços | Instalação · Largura · Nº de programas · Tensão |
| Frente de lava-louças | Frente Lava-louças + nº de serviços | Largura · Acabamento |
| Cuba | Cuba Simples/Dupla + Linha + medida (cm) | Instalação · Material · Válvula |
| Misturador / Torneira | Misturador Monocomando/Torneira + Linha | Material · Bica/ducha · Acabamento · Instalação |
| Triturador | Triturador + Linha + potência (HP) | Câmara · Acionamento · Tensão |
| Dosador de sabão | Dosador de Sabão + formato + capacidade (ml) | Acabamento · Abastecimento · Instalação |
| Lixeira | Lixeira + formato + litros | Material · Instalação |
| Banheira | Banheira de Hidro/Imersão + Linha + comprimento | Material · Acabamento · Volume · Instalação |
| Churrasqueira | Churrasqueira a Gás/Carvão/Elétrica + Linha + medida | Nº de queimadores · Potência (BTU/h) · Instalação · Tensão |
| Lavadora / Secadora | Lavadora/Lava e Seca + Linha + kg | Abertura · Cor · Tensão |
| Máquina de gelo | Máquina de Gelo + Linha + produção (kg/dia) | Reservatório · Instalação · Tensão |
| Cafeteira / Wine dispenser / Umidor | Tipo + Linha | Instalação · Largura · Função principal · Tensão |

Exemplos: "Adega Senses 27 Garrafas Dual Zone" / "Embutir | 38 cm | 5 a 18 °C | 220V"; "Frigobar Built-In Connect 145 Litros" / "Embutir | 60 cm | 0 a 10 °C | 220V"; "Forno Elétrico Luce 68 Litros" / "Embutir | 60 cm | 11 Programas | 220V".

Isto **substitui** a sua tabela anterior ("Linha de destaque" diferente do subtítulo, subtítulo com Dual Flame/Gas-Stop): agora é um texto só, com campos fixos.

## 7. Fotos
- Suas regras de seleção continuam: até 8; sem selos, etiqueta de energia, logos, peças internas ou outro modelo; `SKU-01.jpg` é a principal; fotos novas entram antes de as antigas saírem.
- **Toda foto passa pela padronização antes de subir** (`fotos/padronizar_fotos.py`):
  - 2000x2000, JPG, fundo branco;
  - foto do produto: recortada, centralizada, sem sombra nem reflexo no chão;
  - foto de detalhe ou ambiente: cheia nos 2000x2000 (corte central quadrado), sem borda branca;
  - desenho técnico: centralizado com margem.
- Como rodar no PC: `pip install pillow numpy scipy`; trocar o conteúdo de `fotos/selecao.json` por `{}` (a seleção da nuvem usa outra numeração; no PC a seleção é a sua, pelos nomes SKU-01…08); rodar `python fotos/padronizar_fotos.py <pasta-mãe de L.I> <pasta de saída> --so=SKU1,SKU2`. A entrada é `<entrada>/L.I/<SKU>/SKU-01.jpg`; a ordem segue o número no fim do nome. A saída fica em `<saída>/L.I/SKU-01.jpg…`, com uma folha `_conferencia.png` e um `relatorio.md`.
- Abrir a `_conferencia.png` e conferir antes de subir (o cliente reprova sombra e borda branca). Foto com problema: ajustar `recortes.json` ou trocar a foto.

## 8. Lista de correções para aplicar pela API
Status de 21/10 pelo controle. **Antes de cada item, ler o produto pela API: parte pode já ter sido feita.** Mostrar ao cliente o que falta e pedir o ok.

### 8.1 Os 128 produtos com descrição nova
A importação de 20/10 trocou **só a descrição**. Falta conferir e aplicar o resto, com os dados de `produtos-feitos-128.json`:
1. **Descrição:** comparar a descrição da loja com o HTML do pacote (ignorar espaços). Listar as diferentes.
2. **Nome do produto** = `nome_produto`.
3. **Título SEO** = `seo_titulo`; **meta** = `seo_meta`.
4. **Lista de nomes (script-nomes-1/2):** `[titulo_curto, subtitulo]` de cada SKU. Você já tirou a marca dos nomes; manter isso e trocar só o que for diferente. Produto sem entrada: incluir.
5. **Categoria:** a de `categoria_controle` (tabela 8.4).
6. **Especificações e embalagem:** estão no `-seo.txt`, seção "CADASTRO / ESPECIFICAÇÕES". Aplicar se a API permitir; senão, gerar lista para o cliente fazer à mão.

Exceção: **94702201** — o cliente manteve esse anúncio; a descrição do 94700214 foi aplicada nele. Não trocar o código.

### 8.2 Troca de código (manter o anúncio antigo, só trocar SKU/nome/ficha)
Trocar o código no anúncio que já existe; não criar outro (mantém a URL e o histórico no Google).

| Anúncio atual | Código novo | O que mais | Situação |
|---|---|---|---|
| BC-BI-86-XV-2ATB (cervejeira) | BC-BI-88-XV-2VPA | reativar | descrição pronta |
| CBB300C | CBY300 | reativar | descrição pronta |
| CKI-4Q-60-CI-2XBB | CKI-4Q-60-CI-2KSA | reativar | descrição pronta |
| DI-2Q-30-CI-2XBB | DI-2Q-30-CI-2KSA | reativar | descrição pronta |
| EMCEB0352A | EMCEB0352C | categoria → Forno e Micro-ondas Combinado | descrição pronta |
| EFNEB0352B | EFNEB0352C | nome IX17 → IX13; reativar | descrição pronta |
| TO73EXDB | TO81EXDAP | nome 73 → 81 L; reativar | descrição pronta |
| FB-BI-135-XV | FB-BI-145-XV-2VPA | **remover a variação 127V (FB-BI-135-XV-1ATC)**; nome 135 → 145 L; tirar "Abertura para Esquerda"; reativar | descrição pronta |
| FB-BI-86-XV-2ATB (frigobar) | FB-BI-88-XV-2VPA | reativar | descrição pronta |
| FM-EL-90-LC-2LCA | FM-EL-90-LC-2TNA | reativar | descrição pronta |
| THV100 (Tecno) | P905LHERXG (Bertazzoni) | marca e nome mudam | descrição pronta; conferir se já foi criado como anúncio novo (aí o THV100 sai) |
| GA-6S-14-VT-2TNA | GA-6S-14-XX-2TNA? | — | **não confirmado**: GA-6S-14-XX-2TNA já tem anúncio próprio. Perguntar ao cliente |
| FR-LL-60-VT-NLGB | FR-LL-60-XX-NPLA ou NGZA | — | não confirmado; precisa de material |
| EGAEB0062B | EGAEB0062C (provável) | — | aguardando material |
| EGAEB0062A | EGAEB0062C ou D | — | aguardando material |
| TG14EXAP | TG14EXDP | — | não confirmado; precisa de material |
| TR14GXDA | TR10GFXDA | — | não confirmado; precisa de material |
| TR08HC | TR06HC | — | não confirmado; precisa de material |

Só aplicar as linhas "descrição pronta". As outras dependem de confirmação no site oficial e do cliente.

### 8.3 Reativar
- Com descrição pronta: BH-53135-BRFC, BH-54150-LK-BRFC, BH-54170-VL-BRFC (está no site da Deca), TCM45EXDP, CBY400, JC145CL (código mantido), TR14AVDC.
- Sem descrição nova ainda: LL-14S-60-SR-2VSA, TIM50ERDA, DM50CF.
- **Não reativar:** BH-53135-AMFC (indisponível no site da Deca; o cliente precisa validar estoque).

### 8.4 Categorias
| SKU | Categoria correta |
|---|---|
| TR14AVDC, TR14AVDB, TR08AVDA, TR14ARDB | principal Adegas de Embutir; secundária Adegas de Piso |
| JC-115DR220 | principal Adegas de Embutir; secundária Cervejeiras |
| 94896001, 94896002 | Adegas de Embutir |
| DBQ-IR-40-XX-NHUA | Dominós + Churrasqueiras a Gás (tirar Side Burner) |
| CFD-SOL-90-XV-2ATC | Coifa de Bancada + secundária Coifa de Embutir |
| CFI-MOB-90-VP-2ATC | Coifa de Embutir (tirar Coifa de Parede) |
| 95800025 | Coifa de Embutir (estava sem categoria) |
| 94700214 / anúncio 94702201 | Dominós |
| P905LHERXG | Cooktops |
| EMCEB0352B, EMCEB0352C | Forno e Micro-ondas Combinado (hoje em Micro-ondas) |
| EFNEB0352C, TO81EXDAP, FM-EL-60-LC-2TNA, FM-EL-60-VT-2TNA, FM-EL-75-LC-2TNA | Fornos e Micro-ondas > Forno Elétrico |
| FG-AN-60-LC-2TNA | Fornos e Micro-ondas > Forno a Gás |
| 16060 | Cuba Dupla (avaliar "1 e meia" com o cliente) |

### 8.5 Cadastro
- **DM50CF:** preencher a marca Dometic.
- **AC-300-TRI:** a marca é Deca, não InSinkErator.
- **TR14ARDB:** nome é da versão para revestir, porta reversível (não "abertura esquerda"); usar o `nome_produto` do JSON.

### 8.6 Os 46 produtos novos que você criou
1. **Possíveis duplicados** (versão nova criada como anúncio novo): ECTGD4QM3D x ECTGD4QM3C, ECTID5QM2B x ECTID5QM2A, ECTGD5QM3B x ECTGD5QM3A, EMOEB0252A x EMOEB0252B. Para cada par, ver no site oficial qual código está em linha. Se for o mesmo produto, o certo é **manter o anúncio antigo, trocar o código dele e apagar o novo**. Mostrar ao cliente antes; não desativar nada sem o ok.
   - Já sabemos: ECTGD4QM3A foi excluído em 13/10 (60 cm saiu de linha; 3C já cadastrado; 3D não constava no site oficial na época: conferir de novo).
2. **Descrições:** revisar as 46 com as regras das seções 5 e 6 (estrutura HTML, sem superlativo, conflitos, inox 304, garantia da marca, título curto e subtítulo pela tabela).
3. **Fotos:** padronizar (seção 7) e trocar.

### 8.7 Fotos dos produtos antigos
- 125 SKUs já foram trocados com o zip padronizado.
- 70 produtos ainda com fotos fora do padrão (as fotos do fabricante estão com a sessão de imagens). Quando o cliente trouxer as fotos, padronizar e subir.

### 8.8 Decisões que dependem do cliente (perguntar, não aplicar sozinho)
- **TR14CRDD:** a tabela da Tecno diz "puxador tubular em inox", mas é cervejeira para revestir (o puxador é da marcenaria). Recomendação: tirar essa linha. Aguarda decisão.
- **BH-53135-AMFC:** reativar só se houver estoque.
- **16060:** Cuba Dupla ou 1 e meia.
- **Nomes da loja diferentes do nosso `nome_produto`:** listar e perguntar antes de trocar.
- **Garantias** Elettromec/Tecno/Bertazzoni e **EANs:** completar quando o cliente mandar o termo ou a ficha.

### 8.9 Não mexer
- **Adiados:** Gorenje (site oficial fora do ar): IS846BG, GW951X-BR, BOS6737E13XBR, BOS6747A01XBR, BM321A7X-BR, BCM4547A10XBR, GV693C60UVBR, DFD72EXB, FNI5182A1, GRF-49W, NRKI5182A2, RI5182A1. Speed Queen: AFNE9BSP545DW04, ATEE9ASP543DN04, ATEE9ASP545DW04. Frentes desativadas pelo cliente: FR-LL-45-XX-NCLA, FR-LL-60-XX-NCLB.
- **Deletados pelo cliente:** FG-AN-90-LC-2LCA, 948, EFNEB0352A, BC-BI-135-XV, ECTGD4QM3A.
- **Código mantido:** JC145CL (a troca para JC-145CL220R não foi confirmada).

## 9. Produtos que ainda precisam de descrição nova (64, sem contar os adiados)
Seguir o protocolo da seção 4, um SKU por vez, com o material oficial que o cliente mandar.
- **Elettromec:** GA-12S-30-XX-2TNA, GA-6S-14-XX-2TNA, GA-6S-14-VT-2TNA, LL-10S-45-SR-2VSA, LL-14S-60-SR-2VSA, FR-LL-60-VT-NLGB, RF-BF-510-XX-2VSA, RF-DU-404-XX-2VSA, RF-BF-510-VT-2VSA.
- **Evol:** EGAEB0062B (em andamento: provável EGAEB0062C), EGAEB0062A, CBY200SB, ELLER0152A, ESPLL0001, JG36I, ERDEB5042A.
- **Tecno:** TG14EXAP, TR14GXDA, TD14WP, TIM50EXDA, TIM50ERDA, TR08HC.
- **Tramontina:** 94880006, 94895214, 94895220, 94895209, 94897001, 9452200, misturadores e torneiras 94520512, 94520312, 94520032, 94520022, 94520021, 94520026, 94520031, 94520029, 94520034, 94520030, 94520028, 94520027, 94520020, 94520017, 94520024, 94520033.
- **Franke:** lixeiras 16168 e 09888; misturadores 16590, PescaraXL, ActiveTwist, 18097, 18095, 18099; trituradores 15815, 15813.
- **InSinkErator:** Insinkerator1000SR, 750SR, 550SR, 700SR, 460; AC-300-TRI (Deca).
- **Deca:** 1007-QUA-8-INX (lixeira); BH-54170-LK-BRFC (conferir: pode ser o mesmo da descrição feita como BH-54170-VL-BRFC).
- **Outros:** DM50CF (Dometic), ADGE9BGS545DW01 (Speed Queen, secadora).

Ao terminar cada um, registrar no seu controle (SKU, data, arquivo) e avisar o cliente, para o Claude da nuvem não fazer o mesmo.

## 10. Endereços úteis
- API Loja Integrada: `https://api.awsli.com.br/v1/` (cabeçalho `Authorization` com o token; produto por SKU: `/produto/?sku=X`; detalhe: `/produto/{id}`; SEO é um recurso separado).
- Tecno: catálogo `https://www.tecnoeletros.com.br/api/catalog?page=N` e `/api/product/{id}`.
- Tramontina: `https://www.tramontina.com.br/sitemap_index.xml`.
- Elettromec: busca `https://elettromec.com.br/wp-json/wp/v2/search?search=CODIGO`.
- Fonte oficial é sempre o site, ficha, manual ou folder do fabricante. Lista de outro chat é planejamento, não dado.
