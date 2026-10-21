# Unikitchen – Novos produtos para cadastro

Oct 21, 2026 · @Ana

## Como usar

Cada ficha abaixo traz tudo o que o Claude do PC precisa para criar o produto na loja pela API e validar os dados. As regras de conteúdo são as de `INSTRUCOES-CLAUDE-PC.md`.

1. Conferir pela API que o SKU ainda não existe na loja (nem com código antigo). Se existir, trocar o código no anúncio antigo em vez de criar outro.
2. Abrir os links oficiais da ficha e conferir nome, medidas, tensão e potência. Divergência: avisar o cliente, não corrigir sozinho.
3. Baixar as fotos dos links na ordem indicada (01 = principal), padronizar com `padronizar_fotos.py` e conferir a folha de conferência.
4. Mostrar ao cliente o lote a criar e esperar o ok. Criar inativo, conferir no site e só então ativar.
5. Incluir título curto e subtítulo na lista de nomes (script-nomes-1 ou 2).

Origem dos dados: só material oficial do fabricante (site, ficha, manual, folder). Campo sem dado oficial fica em branco e aparece em "Sem dado oficial". Conflito entre fontes: valor escolhido e descartado em "Conflitos".

## Validação obrigatória pelo Claude do PC (antes de criar qualquer produto)

Este documento foi feito pelo Claude da nuvem **sem acesso à base atual da loja**. Ele usou a exportação da Loja Integrada de 21/10/2026 às 07:09 e as listas de estoque Tecno (02/10), Elettromec (21/10) e Evol (05/10). Tudo o que diz "já existe", "não existe", "inativo" ou "categoria vazia" vale para aquela data. Valide tudo pela API antes de gravar e devolva o resultado ao cliente.

1. **Duplicados.** Para cada SKU das tabelas, buscar na loja pelo SKU, pelo código sem pontos ou traços, pelo código antigo citado e por parte do nome. Se já existir: não criar; trocar o código ou atualizar o anúncio existente e avisar.
2. **Anúncios existentes citados aqui:** conferir o estado atual de TR06HC (era TR08HC), AC-300-TRI (variações 127/220), MAST366RTBXT, ELLER0152A, EGAEB0062A, B, C e D, JC145CL, CBY200SB, EFNEB0352C e D. Ações só com ok do cliente.
3. **Categorias.** Confirmar que cada categoria indicada existe com esse nome e pegar o ID. Categorias propostas que não existem ("Cooktop com Coifa Integrada", "Coifa de Teto", "Misturadores e Torneiras > Com Filtro"): não criar sem o ok do cliente.
4. **Marcas.** Confirmar que a marca está cadastrada (Lofra, por exemplo, é nova). Não criar marca sem o ok do cliente.
5. **Dados técnicos.** Abrir a página oficial e os PDFs de cada ficha e conferir nome, código, tensão, potência, medidas, EAN e garantia. Divergência: não corrigir sozinho; anotar "ficha diz X, fonte diz Y".
6. **Itens marcados "Aguardando material" ou "Aguardando folder"** (Deca, Tecno, Bertazzoni, Lofra): o Claude do PC deve tentar abrir os links, porque daqui os sites bloquearam. Se abrir, trazer os dados e mandar ao Claude da nuvem pelo cliente. Não criar o produto só com os dados parciais.
7. **Itens "Sem dado oficial / conferir"** de cada ficha: resolver o que der com os PDFs (embalagem, EAN, recorte) e listar o que continuar em aberto.
8. **Fotos.** Baixar dos links, padronizar com `padronizar_fotos.py` e conferir a folha antes de subir.
9. **Sugestões das listas de estoque:** são só sugestões. Criar apenas o que o cliente marcar como aprovado.
10. **Relatório de volta:** uma tabela SKU → situação (OK para criar / corrigir antes / bloqueado), com o motivo. Criar os produtos inativos e ativar só depois de conferir no site.

## Índice dos SKUs

Lote 1 (Deca, 21/10): 5 cubas novas e 1 triturador que já existe na loja. O site da Deca bloqueia o acesso automático: as fichas dependem do material enviado pelo cliente (PDF ou print da página).

| SKU | Marca | Produto | Categoria | Situação |
| --- | --- | --- | --- | --- |
| [CC.670.70.SUP.INX](https://www.deca.com.br/ambientes/cozinha/cubas-para-cozinha/cubas-de-inox/cuba-de-cozinha-retangular-70x40cm-com-monocomando-inoxcc67070supinx) | Deca | Cuba retangular 70x40 cm com monocomando, inox | Cubas e Tanques > Cuba Única | Novo. Aguardando material |
| [CC.670.75.AC.INX](https://www.deca.com.br/ambientes/cozinha/cubas-para-cozinha/cubas-de-inox/cuba-de-cozinha-retangular-75x40cm-com-acessorios-inoxcc67075acinx) | Deca | Cuba retangular 75x40 cm com acessórios, inox | Cubas e Tanques > Cuba Única | Novo. Aguardando material |
| [CC.680.90.FUN.INX](https://www.deca.com.br/ambientes/cozinha/cubas-para-cozinha/cubas-de-inox/cuba-de-cozinha-retangular-90x50cm-com-deck-e-acessorios-inoxcc68090funinx) | Deca | Cuba retangular 90x50 cm com deck e acessórios, inox | Cubas e Tanques > Cuba Única | Novo. Aguardando material |
| [CC.700.75.WOR.INX](https://www.deca.com.br/ambientes/cozinha/cubas-para-cozinha/cubas-de-inox/cuba-de-cozinha-retangular-com-deck-e-acessorios-inoxcc70075worinx) | Deca | Cuba retangular com deck e acessórios, inox | Cubas e Tanques > Cuba Única | Novo. Aguardando material |
| [CC.670.40.SUP.INX](https://www.deca.com.br/ambientes/cozinha/cubas-para-cozinha/cubas-de-inox/cuba-de-cozinha-retangular-50x40cm-inoxcc67040supinx) | Deca | Cuba retangular 50x40 cm, inox | Cubas e Tanques > Cuba Única | Novo. Aguardando material |
| AC-300-TRI (variações [AC-300-TRIT-220](https://www.deca.com.br/ambientes/cozinha/cubas-para-cozinha/triturador-de-residuos/triturador-de-residuos-de-alimentos-220vac300trit220) e [AC-300-TRIT-127](https://www.deca.com.br/ambientes/cozinha/cubas-para-cozinha/triturador-de-residuos/triturador-de-residuos-de-alimentos-127vac300trit127)) | Deca | Triturador de resíduos de alimentos 3/4 HP, 127V ou 220V | Trituradores de alimentos | JÁ EXISTE (ativo, marca Deca já corrigida). Atualizar descrição, não criar. Aguardando material |

**Para o Claude do PC (lote Deca):** o link de cada SKU é a página oficial da Deca. Abrir cada um e trazer:

- **Cores:** todas as cores/acabamentos disponíveis no anúncio da Deca, com o código de cada uma (o final do código muda por cor: INX, BL, GL etc.). Na loja, as cores entram como **variações de cor no mesmo anúncio** (como as tensões do triturador), cada variação com o SKU oficial da cor e as fotos dela.
- Especificações completas, itens inclusos, medidas do produto e da embalagem, EAN.
- Links das fotos (de cada cor) e dos PDFs: manual, ficha técnica, gabarito de recorte.
- Confirmar o código exato de cada SKU (os códigos acima foram lidos da URL).

Depois, mandar esses dados ao Claude da nuvem pelo cliente, para ele completar as fichas abaixo.

Lote 2 (Deca, 21/10): 12 links = 9 anúncios (bica 1290.C99 removida pelo cliente). Nenhum misturador Deca existe na loja hoje. Mesmas instruções do lote 1 (cores, especificações, fotos, PDFs, código exato).

| SKU | Marca | Produto | Categoria | Situação |
| --- | --- | --- | --- | --- |
| [2275.C](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/misturador-monocomando-para-cozinha/misturador-monocomando-de-mesa-para-cozinha-cromado2275c) | Deca | Misturador monocomando de mesa, cromado | Misturadores e Torneiras > Com ou Sem Extensor (conferir) | Novo. Aguardando material |
| [2253.C](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/misturador-monocomando-para-cozinha/misturador-monocomando-de-mesa-para-cozinha-cromado2253c) | Deca | Misturador monocomando de mesa, cromado | Misturadores e Torneiras > Com ou Sem Extensor (conferir) | Novo. Aguardando material |
| [2256.C109.FINT](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/misturador-monocomando-para-cozinha/misturador-monocomando-de-mesa-para-cozinha-cromado2256c109fint) | Deca | Misturador monocomando de mesa, cromado | Misturadores e Torneiras > Com ou Sem Extensor (conferir) | Novo. Aguardando material |
| [2270.INX.IND](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/misturador-monocomando-para-cozinha/misturador-monocomando-de-mesa-para-cozinha-urban-inox-2270inxind) | Deca | Misturador monocomando de mesa Urban, inox | Misturadores e Torneiras > Com ou Sem Extensor (conferir) | Novo. Aguardando material |
| 2289 — cores [2289.C.PT](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/misturador-monocomando-para-cozinha/misturador-monocomando-de-mesa-para-cozinha-deca-colore-cromado-e-preto-2289-c-pt) (Colore, cromado e preto) e [2289.INX.IND.FD](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/misturador-monocomando-para-cozinha/misturador-monocomando-de-mesa-para-cozinha-urban-inox-e-fendi-2289inxindfd) (Urban, inox e fendi) | Deca | Misturador monocomando de mesa | Misturadores e Torneiras > Com ou Sem Extensor (conferir) | Novo. Um anúncio com 2 variações de cor SE for o mesmo modelo (Colore x Urban podem ser linhas diferentes: conferir). Aguardando material |
| 2280.CR.HT — variações [220V](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/torneiras-com-filtro-para-cozinha/misturador-monocomando-enjoy-express-com-filtro-e-agua-fervente-220v-cromado2280crht220) e [127V](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/torneiras-com-filtro-para-cozinha/misturador-monocomando-enjoy-express-com-filtro-e-agua-fervente-127v-cromado2280crht127) | Deca | Misturador Enjoy Express com filtro e água fervente, cromado | Misturadores e Torneiras > Com Filtro (categoria a criar) | Novo. Um anúncio, 2 tensões. Aguardando material |
| 2280.CR.CS — variações [220V](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/torneiras-com-filtro-para-cozinha/misturador-monocomando-enjoy-pro-com-filtro-agua-gelada-e-agua-com-gas-220v-cromado2280crcs220) e [127V](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/torneiras-com-filtro-para-cozinha/misturador-monocomando-enjoy-pro-com-filtro-agua-gelada-e-agua-com-gas-127v-cromado2280crcs127) | Deca | Misturador Enjoy Pro com filtro, água gelada e com gás, cromado | Misturadores e Torneiras > Com Filtro (categoria a criar) | Novo. Um anúncio, 2 tensões. Aguardando material |
| [2281.CR.FM](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/torneiras-com-filtro-para-cozinha/misturador-monocomando-enjoy-go-com-filtro-para-cozinha-cromado2281crfm) | Deca | Misturador Enjoy Go com filtro, cromado | Misturadores e Torneiras > Com Filtro (categoria a criar) | Novo. Aguardando material |
| [2281.CR.FE](https://www.deca.com.br/ambientes/cozinha/torneiras-e-misturadores-para-cozinha/torneiras-com-filtro-para-cozinha/misturador-monocomando-enjoy-select-com-seletor-de-volume-e-filtro-para-cozinha-cromado2281crfe) | Deca | Misturador Enjoy Select com seletor de volume e filtro, cromado | Misturadores e Torneiras > Com Filtro (categoria a criar) | Novo. Aguardando material |

Lote 3 (Tecno, Bertazzoni, Lofra e Elettromec, 21/10): 9 links = 6 anúncios novos, 1 anúncio existente e 1 que já está na loja. O portal vendas.tecnoeletros.com.br bloqueia o acesso daqui (fotos e folders também): os itens Tecno/Bertazzoni/Lofra têm só os dados da API pública da Tecno e precisam do folder.

| SKU | Marca | Produto | Categoria | Situação |
| --- | --- | --- | --- | --- |
| [RT-8Q-48-XP-1SGA](https://elettromec.com.br/produto/rangetop-professional-inox-48/) | Elettromec | Rangetop a gás Professional 48", 8 queimadores, 127V | Rangetop > 6 a 8 Queimadores a Gás | Novo. **Ficha completa** |
| [RT-6Q-36-XP-1SGA](https://elettromec.com.br/produto/rangetop-professional-inox-36/) | Elettromec | Rangetop a gás Professional 36", 6 queimadores, 127V | Rangetop > 6 a 8 Queimadores a Gás | Novo. **Ficha completa** |
| [PROF486GRTBXT](https://vendas.tecnoeletros.com.br/catalog/product/view/id/399) | Bertazzoni | Rangetop Professional 122 cm, 6 queimadores e grill elétrico | Rangetop > 6 a 8 Queimadores a Gás | Novo (é outro modelo: a loja já tem o Master MAST486GRTBXT). Aguardando folder |
| [TRS126/5C](https://vendas.tecnoeletros.com.br/catalog/product/view/id/650) | Lofra | Rangetop Dolcevita 120 cm, 5 queimadores e 2 zonas elétricas | Rangetop > 4 a 5 Queimadores a Gás | Novo (marca nova na loja). Aguardando folder |
| [TRS96/5](https://vendas.tecnoeletros.com.br/catalog/product/view/id/646) | Lofra | Rangetop Dolcevita 90 cm, 5 queimadores | Rangetop > 4 a 5 Queimadores a Gás | Novo (marca nova; em pré-venda na Tecno). Aguardando folder |
| [PRO95I1EXT](https://vendas.tecnoeletros.com.br/catalog/product/view/id/653) | Bertazzoni | Fogão de indução Professional 90 cm, 5 zonas, forno elétrico | Fogões > 4 a 5 Zonas Indução | Novo (em pré-venda na Tecno). Aguardando folder |
| [TR06HCV2](https://vendas.tecnoeletros.com.br/catalog/product/view/id/892) | Tecno | Umidor de charutos Vintage 38 cm, puxador em latão | Umidores de Charuto > Termoumidor de Charutos | Novo (lançamento 2026). Aguardando folder |
| [TR06HC](https://vendas.tecnoeletros.com.br/catalog/product/view/id/891) | Tecno | Umidor de charutos Professional 38 cm, puxador em inox | Umidores de Charuto > Termoumidor de Charutos (hoje está em Umidor de Charutos) | **JÁ EXISTE** (anúncio que era TR08HC, inativo). Atualizar e reativar, não criar. Conflito: loja diz 65 L, Tecno diz 80 L |
| [MAST366RTBXT](https://vendas.tecnoeletros.com.br/catalog/product/view/id/357) | Bertazzoni | Rangetop Master 91 cm, 6 queimadores | — | **JÁ EXISTE** (ativo, criado em 21/10). Nada a fazer |

Lote 4 (Bertazzoni, 21/10): 2 lava-louças novos, os primeiros da marca na loja. Os dois aparecem como disponíveis no estoque Tecno de 02/10. A API pública dá as mesmas especificações para os dois: 14 serviços, 9 programas, lavagem a 70 °C, 42 dB, 597 x 870 x 550 mm (L x A x P). A diferença é o puxador.

| SKU | Marca | Produto | Categoria | Situação |
| --- | --- | --- | --- | --- |
| [MASTBERTD14](https://vendas.tecnoeletros.com.br/catalog/product/view/id/534) | Bertazzoni | Lava-louças Master 60 cm, 14 serviços, porta inox, puxador tubular | Lava Louças > Lava-louças | Novo. Aguardando folder (tensão, potência, embalagem, programas) |
| [PROFBERTD14](https://vendas.tecnoeletros.com.br/catalog/product/view/id/679) | Bertazzoni | Lava-louças Professional 60 cm, 14 serviços, porta inox, puxador retangular | Lava Louças > Lava-louças | Novo. Aguardando folder (tensão, potência, embalagem, programas) |

Lote 5 (Franke, 21/10): 7 anúncios novos com ficha completa. Nenhum existe na loja. A lava-louças Evol do mesmo pedido (ELLER0152A) já está na loja. Avulso: o CKI-6Q-90-SR-2KSA (Elettromec) também tem ficha completa abaixo.

| SKU | Marca | Produto | Categoria | Situação |
| --- | --- | --- | --- | --- |
| [16830](https://loja.franke.com.br/extractor-franke-mythos-fma-839-cooktop-e-coifa-integrados-83x52-16830/p) | Franke | Cooktop de indução com coifa integrada Mythos Extractor FMA 839 | Cooktops > 4 a 5 Zonas Indução + secundária Coifa de Bancada (decidir) | Novo. Ficha completa. Precisa de kit vendido à parte |
| [17108](https://loja.franke.com.br/cooktop-de-inducao-maris-vidro-preto-franke-4-zonas-coccao-fma-804-17108/p) | Franke | Cooktop de indução Maris FMA 804 | Cooktops > 4 a 5 Zonas Indução | Novo. Ficha completa |
| [17110](https://loja.franke.com.br/cooktop-inducao-mythos-fmy808-77x51cm-8-areas-17110/p) | Franke | Cooktop de indução Mythos FMY 808 | Cooktops > 6 a 8 Zonas Indução | Novo. Ficha completa |
| [18881](https://loja.franke.com.br/coifa-embutir-movel-fbfp-black-matte-a86-86cm-220v-18881/p) | Franke | Coifa de embutir FBFP Black Matte A86 86 cm | Coifas > Coifa de Embutir | Novo. Ficha completa |
| [18883](https://loja.franke.com.br/coifa-embutir-movel-franke-fbfe-xs-a70-inox-70cm-220v-18883/p) | Franke | Coifa de embutir FBFE XS A70 70 cm | Coifas > Coifa de Embutir | Novo. Ficha completa |
| [19194](https://loja.franke.com.br/coifa-teto-invisible-ceiling-franke-fcmy-90cm-220v-19194/p) | Franke | Coifa de teto Invisible Ceiling FCMY 90 cm | Coifa de Embutir (sugestão: criar Coifa de Teto) | Novo. Ficha completa. Kits 17440/17460 à parte |
| [18644](https://loja.franke.com.br/lava-loucas-16-servicos-embutir-e-revestir-franke-60cm-220v-18644/p) | Franke | Lava-louças 16 serviços embutir e revestir 60 cm | Lava Louças > Lava-louças | Novo. Ficha completa. Garantia e ordem da embalagem a conferir |
| [CKI-6Q-90-SR-2KSA](https://elettromec.com.br/produto/cooktop-invisivel-90cm/) | Elettromec | Cooktop de indução invisível 90 cm, 6 zonas | Cooktops > 6 a 8 Zonas Indução | Novo. Ficha completa |

Lote 6 (21/10): 2 anúncios novos com ficha completa. Nenhum existe na loja.

| SKU | Marca | Produto | Categoria | Situação |
| --- | --- | --- | --- | --- |
| [94754220](https://www.tramontina.com.br/cooktop-inducao-tramontina-design-collection-duo-4ei-80-com-coifa-integrada-em-modo-exaustao-220-v/94754220.html) | Tramontina | Cooktop de indução Duo 4EI 80 com coifa integrada, modo exaustão | Cooktops > 4 a 5 Zonas Indução + secundária Coifa de Bancada (mesma decisão do 16830) | Novo. Ficha completa. Existe a versão depuração 94754/221 |
| [CKG-5Q-90-SR-3TNA](https://elettromec.com.br/produto/cooktop-revestir-90cm/) | Elettromec | Cooktop a gás para revestir 90 cm, 5 queimadores, bivolt | Cooktops > 5 Queimadores a Gás | Novo. Ficha completa. Indisponível na lista de estoque |

## Sugestões das listas de estoque (para aprovação)

As 3 listas têm cerca de 850 itens: Tecno com Bertazzoni, Lofra e Elica (02/10), Elettromec com Viking, Invita, Falmec e Fulgor (21/10), e Evol (05/10). Escolhi só o que preenche categoria vazia ou fraca, está em linha e não repete o que a loja já tem demais (cooktop a gás de 5 queimadores, forno elétrico, coifa de ilha, adega de embutir). Marque o que aprovar.

| Aprovar | Código | Marca | Produto | Preenche | Estoque |
| --- | --- | --- | --- | --- | --- |
| \[ \] | CFP-BBQ-90-XX-2ATA | Elettromec | Coifa de churrasqueira de parede 90 cm | Coifa de Churrasqueira (vazia) | Disponível |
| \[ \] | CFP-BBQ-36-XP-2ELA | Elettromec | Coifa de churrasqueira de parede 36" Professional | Coifa de Churrasqueira (vazia) | Disponível |
| \[ \] | CFB-BBQ-34-XP-2ELA | Elettromec | Coifa de churrasqueira de embutir 34" | Coifa de Churrasqueira (vazia) | Disponível |
| \[ \] | EVLCHVER | Evol | Chapa de ferro para churrasqueiras Capri, Amalfi e Florence (45 x 30 cm) | Acessórios de churrasqueira (vazia) | Disponível |
| \[ \] | EVLBBQT | Evol | Kit de 3 utensílios de churrasco em inox | Acessórios de churrasqueira (vazia) | Disponível |
| \[ \] | CKI-6Q-90-CI-2KSA | Elettromec | Cooktop de indução 90 cm, 6 zonas (vitrocerâmica) | Indução 6 a 8 zonas (vazia) | Disponível |
| \[x\] | CKI-6Q-90-SR-2KSA | Elettromec | Cooktop invisível 90 cm (pedido por você; ficha abaixo) | Indução 6 a 8 zonas (vazia) | Indisponível |
| \[ \] | MAST366QBXT | Bertazzoni | Cooktop a gás Master 93 cm, 6 queimadores | Cooktop 6 queimadores (vazia) | Disponível |
| \[ \] | TR43AVDF-L3 | Tecno | Adega vertical Professional 141 garrafas, 3 zonas (conferir no folder se é de piso) | Adegas de Piso (vazia) | Disponível |
| \[ \] | CV-1FS-14-XV-2ATA | Elettromec | Adega 14 garrafas de piso (com versão 127 V) | Adegas de Piso (vazia) | Disponível |
| \[ \] | FG-AN-90-LC-2TNA | Elettromec | Forno a gás Luce 90 cm | Forno a gás (1 produto) | Disponível |
| \[ \] | BC-BI-428-XV-2VPA | Elettromec | Beer Center 428 L, abertura direita (tem a esquerda 2VPB) | Cervejeira grande (a loja só tem a Evol 425 L) | Disponível |
| \[ \] | BC-BI-145-XV-2VPA | Elettromec | Beer Center 145 L, abertura direita (tem a esquerda 2VPB) | Substitui a cervejeira 135 L excluída em 09/10 | Disponível |
| \[ \] | IM-BI-23-XX-2VIB | Elettromec | Máquina de gelo inox de embutir | Máquinas de Gelo (3 produtos) | Disponível |
| \[ \] | TR10GFXDV2 | Tecno | Gaveta refrigerada com freezer Vintage 95 L, uso externo | Gavetas Refrigeradas (1 ativa) | Disponível |
| \[ \] | TCM45EXDA | Tecno | Cafeteira automática de embutir Original 60 cm | Cafeteiras (2 produtos) | Disponível |

O que NÃO sugiro:

- **Chopeiras:** nenhuma das 3 marcas tem. Recomendo esconder a categoria do menu.
- **Linha Tecno Vintage inteira (43 itens):** é a Professional com outro acabamento. Seria mais do mesmo; só vale se a Vintage vender diferente na loja.
- **Fogões Bertazzoni e Lofra (50), coifas Tecno, Elica e Bertazzoni (70) e refrigeradores Bertazzoni (43):** muitas cores e variações do que já existe.
- **Marcas novas** (Viking, Fulgor Milano, Falmec, Invita, Lofra, Elica): decisão sua. Invita é a linha de entrada do grupo Elettromec. O único forno de pizza das listas é Invita (I-FPZ-FS-16-XX-NMHA).

Achados das listas que mexem em anúncios existentes:

- **Gavetas Evol:** o estoque só tem EGAEB0062C (IX13, inox) e EGAEB0062D (IX17, vidro), e os dois já estão na loja. Os anúncios antigos EGAEB0062A e EGAEB0062B viram duplicados: desativar ou excluir depois de conferir.
- **Freezer Evol:** o estoque usa o código JC-145CL220R. Isso confirma a troca do JC145CL que tínhamos deixado em aberto.
- **Side burner Evol:** no estoque o código é CBY200SB-A; na loja, CBY200SB. Conferir se é uma versão nova.
- **Forno Evol IX17 (EFNEB0352D):** está no estoque e não está na loja. O anúncio IX17 antigo virou o IX13 (EFNEB0352C).
- **Umidor TR06HC:** a lista Tecno diz 65 L, igual à loja; a API do site diz 80 L. Confirmar no folder.
- **Rangetop Elettromec 48" (RT-8Q-48-XP-1SGA):** não aparece na lista de estoque da Elettromec, nem como fora de linha. Só o 36" aparece. Confirmar com a Elettromec antes de criar.

## Fichas por SKU

Cada produto entra aqui com os blocos abaixo, nesta ordem.

| Bloco | Conteúdo |
| --- | --- |
| Identificação | SKU, marca, linha, página oficial, já existe na loja? |
| Nome e SEO | Nome do produto, título SEO (até 60, termina em "\| Unikitchen"), meta (até 155, termina em "Lojas em Sorocaba e Itapetininga."), URL sugerida |
| Cards | Título curto e subtítulo pela tabela da categoria |
| Categoria | Principal e secundária (último nível) |
| Cadastro | Modelo, EAN, NCM (se oficial), tensão, campos de especificação da categoria |
| Embalagem | Peso e medidas da embalagem; se faltar, as do produto, avisado |
| Fotos | Links oficiais na ordem: 01 principal, depois produto, detalhes, ambiente, desenho |
| Documentos | Manual, ficha técnica, guia, gabarito de instalação |
| Conflitos | Valor escolhido e descartado, com a fonte |
| Sem dado oficial | Campos em branco |
| Descrição | HTML completo no modelo da loja |

### RT-8Q-48-XP-1SGA — Rangetop Professional 48" Elettromec

Ficha completa, pronta para criar. Página oficial: [RT-8Q-48-XP-1SGA](https://elettromec.com.br/produto/rangetop-professional-inox-48/). Não existe na loja.

| Campo | Valor |
| --- | --- |
| Nome do produto | Rangetop a Gás de Embutir Elettromec Professional 48" 8 Queimadores 120 cm Inox 304 127V |
| Título SEO | Rangetop a Gás Elettromec Professional 48" \| Unikitchen |
| Meta | Rangetop a gás de embutir Elettromec Professional 48", 8 queimadores Defendi, 27,54 kW, inox 304, 127V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | rangetop-gas-embutir-elettromec-professional-48-8-queimadores-120-cm-inox-127v |
| Título curto | Rangetop a Gás Professional 8 Queimadores 120 cm |
| Subtítulo | Mesa Esmaltada \| Superautomático \| 127V |
| Categoria | Cooktops, Rangetops e Dominós > Rangetop > 6 a 8 Queimadores a Gás |
| Embalagem | 1.320 x 350 x 780 mm (L x A x P), 70 kg bruto. Produto: 1.217 x 254 x 720 mm, 60 kg. |
| Modelo | RT-8Q-48-XP-1SGA |
| EAN | 7898593937437 |
| NCM | 7321.11.00 |
| Tensão | 127 V, 60 Hz |
| Queimadores | 8 |
| Tipo de gás | GLP (de fábrica) / GN com conversão |
| Largura comercial | 120 cm |
| Cor | Inox |
| Fabricante | Elettromec |
| Linha | Professional |

**Fotos (ordem sugerida, 01 = principal):**

1. [Elettromec\_EF\_20-Rangetop-Professional-48-Polegadas-127V\_02-.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/Elettromec_EF_20-Rangetop-Professional-48-Polegadas-127V_02-.jpg)
2. [Elettromec\_EF\_20-Rangetop-Professional-48-Polegadas-127V\_03--scaled.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/Elettromec_EF_20-Rangetop-Professional-48-Polegadas-127V_03--scaled.jpg)
3. [BENEFICIO-01-Elettromec\_EF\_20-Rangetop-Professional-48-Polegadas-127V\_01-.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/BENEFICIO-01-Elettromec_EF_20-Rangetop-Professional-48-Polegadas-127V_01-.jpg)
4. [BENEFICIO-02-Elettromec\_EF\_20-Rangetop-Professional-48-Polegadas-127V\_06-.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/BENEFICIO-02-Elettromec_EF_20-Rangetop-Professional-48-Polegadas-127V_06-.jpg)
5. [BENEFICIO-03-Elettromec\_EF\_20-Rangetop-Professional-48-Polegadas-127V\_05-.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/BENEFICIO-03-Elettromec_EF_20-Rangetop-Professional-48-Polegadas-127V_05-.jpg)

**Documentos:** [Manual](https://elettromec.com.br/wp-content/uploads/2025/04/IM_RT-8Q-48-XP-1SGA_R2.pdf) · [Gabarito](https://elettromec.com.br/wp-content/uploads/2025/04/ID_RT-8Q-48-XP-1SGA_R2.pdf) · [Guia comercial](https://elettromec.com.br/wp-content/uploads/2025/04/GUIA_COMERCIAL_RANGETOP_48_POL.pdf)

**Conflitos resolvidos:**

- Queimador de 5,86 kW: guia e site chamam de "Dual Flame" no texto; tabela do guia e manual dizem "tripla chama" → tripla chama (tabela > texto).
- Potências por queimador: guia 3,516 / 2,637 / 1,758 kW; manual 3,51 / 2,63 / 1,75 → manual.

**Sem dado oficial / conferir:**

- Medidas de recorte da bancada: só no gabarito (desenho sem legenda em texto) → conferir no PDF.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Rangetop a Gás Professional 8 Queimadores 120 cm | Elettromec</h2>
    <p class="uk-desc-linha">Mesa Esmaltada | Superautomático | 127V</p>

    <p>O <strong>Rangetop Professional Inox 48" Elettromec</strong> é uma mesa de cocção a gás de embutir, com design inspirado nos modelos americanos, para bancadas de cozinhas e áreas gourmet. Tem <strong>8 queimadores Defendi</strong>, com potência total de <strong>27,54 kW (94.000 BTU/h)</strong>, e combina com os outros equipamentos da linha Professional.</p>

    <p>Os <strong>2 queimadores tripla chama de 5,86 kW</strong> atendem os preparos maiores; há ainda 2 rápidos, 2 semirrápidos e 2 auxiliares. A mesa tem <strong>acabamento esmaltado</strong>, resistente a altas temperaturas, com <strong>trempes em ferro fundido</strong> e manípulos robustos. O <strong>acendimento é superautomático</strong>: basta pressionar e girar o manípulo, sem botão secundário. Há sistema de reignição. O acabamento é em <strong>aço inoxidável 304</strong>.</p>

    <p>O <strong>inox 304</strong> tem mais cromo e níquel que o inox 430, usado na maior parte dos eletrodomésticos, e por isso resiste melhor à corrosão. É uma escolha mais segura para cozinhas úmidas e para casas em cidades litorâneas, onde a maresia favorece o aparecimento de pontos de ferrugem no 430. Para manter o acabamento, a limpeza regular continua necessária.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Queimadores</th>
                        <td>8 queimadores a gás Defendi</td>
                    </tr>
                    <tr>
                        <th scope="row">Potência total</th>
                        <td>27,54 kW (94.000 BTU/h)</td>
                    </tr>
                    <tr>
                        <th scope="row">Mesa</th>
                        <td>Acabamento esmaltado</td>
                    </tr>
                    <tr>
                        <th scope="row">Trempes</th>
                        <td>Ferro fundido</td>
                    </tr>
                    <tr>
                        <th scope="row">Acendimento</th>
                        <td>Superautomático, no próprio manípulo</td>
                    </tr>
                    <tr>
                        <th scope="row">Sistema de reignição</th>
                        <td>Sim</td>
                    </tr>
                    <tr>
                        <th scope="row">Válvula de segurança</th>
                        <td>Não</td>
                    </tr>
                    <tr>
                        <th scope="row">Acabamento</th>
                        <td>Aço inoxidável 304</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="section">
        <h3 class="section-title">Queimadores</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Tripla chama (2)</th>
                        <td>5,86 kW (20.000 BTU/h) cada</td>
                    </tr>
                    <tr>
                        <th scope="row">Rápido (2)</th>
                        <td>3,51 kW (12.000 BTU/h) cada</td>
                    </tr>
                    <tr>
                        <th scope="row">Semirrápido (2)</th>
                        <td>2,63 kW (9.000 BTU/h) cada</td>
                    </tr>
                    <tr>
                        <th scope="row">Auxiliar (2)</th>
                        <td>1,75 kW (6.000 BTU/h) cada</td>
                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td>27,54 kW (94.000 BTU/h)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Modelo</th>
                        <td>Rangetop Professional Inox 48"</td>
                    </tr>
                    <tr>
                        <th scope="row">Código</th>
                        <td>RT-8Q-48-XP-1SGA</td>
                    </tr>
                    <tr>
                        <th scope="row">Instalação</th>
                        <td>Embutir</td>
                    </tr>
                    <tr>
                        <th scope="row">Largura comercial</th>
                        <td>120 cm</td>
                    </tr>
                    <tr>
                        <th scope="row">Tipo de gás</th>
                        <td>Sai de fábrica para GLP; conversão para gás natural feita na instalação</td>
                    </tr>
                    <tr>
                        <th scope="row">Pressão do gás</th>
                        <td>GLP 2,75 kPa; GN 1,96 kPa</td>
                    </tr>
                    <tr>
                        <th scope="row">Tensão</th>
                        <td>127 V, 60 Hz</td>
                    </tr>
                    <tr>
                        <th scope="row">Potência elétrica</th>
                        <td>2 W</td>
                    </tr>
                    <tr>
                        <th scope="row">Corrente</th>
                        <td>0,01 A</td>
                    </tr>
                    <tr>
                        <th scope="row">EAN</th>
                        <td>7898593937437</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="section">
        <h3 class="section-title">Dimensões e Peso</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Produto (L x A x P)</th>
                        <td>1.217 x 254 x 720 mm</td>
                    </tr>
                    <tr>
                        <th scope="row">Peso líquido</th>
                        <td>60 kg</td>
                    </tr>
                    <tr>
                        <th scope="row">Embalagem (L x A x P)</th>
                        <td>1.320 x 350 x 780 mm</td>
                    </tr>
                    <tr>
                        <th scope="row">Peso bruto</th>
                        <td>70 kg</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="section">
        <h3 class="section-title">Instalação</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Coifa</th>
                        <td>Distância de 800 a 900 mm entre o rangetop e a parte inferior da coifa; vazão mínima recomendada de 1.600 m³/h, com suporte a temperaturas acima de 100 °C</td>
                    </tr>
                    <tr>
                        <th scope="row">Coifa de parede</th>
                        <td>O rangetop pode ficar rente à parede traseira; mínimo de 200 mm até paredes laterais</td>
                    </tr>
                    <tr>
                        <th scope="row">Coifa de ilha</th>
                        <td>Folga mínima de 150 mm entre a traseira do rangetop e o fim da ilha</td>
                    </tr>
                    <tr>
                        <th scope="row">Local</th>
                        <td>Permanentemente ventilado, sem correntes de ar; não instalar em ambiente enclausurado</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>2 anos de garantia Elettromec:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 21 meses, cobrindo peças com defeito de fabricação e a mão de obra do reparo.</p>
            <p>O defeito deve ser comunicado em até 48 horas ao Serviço Autorizado Elettromec, com a nota fiscal. A garantia não cobre instalação feita por profissionais não credenciados pela Elettromec, uso em desacordo com o manual, ligação em tensão diferente da indicada, nem lâmpadas e vidros.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> o rangetop é 127 V e sai de fábrica para gás GLP; para gás natural, a conversão deve ser feita pelo serviço autorizado na instalação. Siga as medidas de nicho e de coifa do gabarito oficial. Após a instalação, verifique se há vazamento de gás com espuma de sabão em todas as conexões. Erros de instalação feita por profissionais não credenciados pela Elettromec não têm cobertura da garantia.</p>
    </div>
</article>
```

### RT-6Q-36-XP-1SGA — Rangetop Professional 36" Elettromec

Ficha completa, pronta para criar. Página oficial: [RT-6Q-36-XP-1SGA](https://elettromec.com.br/produto/rangetop-professional-inox-36/). Não existe na loja.

| Campo | Valor |
| --- | --- |
| Nome do produto | Rangetop a Gás de Embutir Elettromec Professional 36" 6 Queimadores 91 cm Inox 304 127V |
| Título SEO | Rangetop a Gás Elettromec Professional 36" \| Unikitchen |
| Meta | Rangetop a gás de embutir Elettromec Professional 36", 6 queimadores Defendi, 20,80 kW, inox 304, 127V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | rangetop-gas-embutir-elettromec-professional-36-6-queimadores-91-cm-inox-127v |
| Título curto | Rangetop a Gás Professional 6 Queimadores 91 cm |
| Subtítulo | Mesa Esmaltada \| Superautomático \| 127V |
| Categoria | Cooktops, Rangetops e Dominós > Rangetop > 6 a 8 Queimadores a Gás |
| Embalagem | 1.020 x 350 x 780 mm (L x A x P), 55 kg bruto. Produto: 915 x 254 x 695 mm, 45 kg. |
| Modelo | RT-6Q-36-XP-1SGA |
| EAN | 7898593937208 |
| NCM | 7321.11.00 |
| Tensão | 127 V, 60 Hz |
| Queimadores | 6 |
| Tipo de gás | GLP (de fábrica) / GN com conversão |
| Largura comercial | 91 cm |
| Cor | Inox |
| Fabricante | Elettromec |
| Linha | Professional |

**Fotos (ordem sugerida, 01 = principal):**

1. [BENEFICIO-01-2.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/BENEFICIO-01-2.jpg)
2. [BENEFICIO-02-1.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/BENEFICIO-02-1.jpg)
3. [BENEFICIO-03-3.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/BENEFICIO-03-3.jpg)
4. [Elettromec-helenabertolini.jpg](https://elettromec.com.br/wp-content/uploads/2025/04/Elettromec-helenabertolini.jpg) (ambiente)

**Documentos:** [Manual](https://elettromec.com.br/wp-content/uploads/2025/06/IM_RT-6Q-36-XP-1SGA_R2.pdf) · [Gabarito](https://elettromec.com.br/wp-content/uploads/2025/04/ID_RT-6Q-36-XP-1SGA_R2.pdf) · [Guia comercial](https://elettromec.com.br/wp-content/uploads/2025/04/GUIA_COMERCIAL_RANGETOP_36_POL.pdf)

**Conflitos resolvidos:**

- Altura: guia 231 mm, manual 254 mm → 254 mm (manual > guia).
- Potência total: manual 20,79 kW; site e guia 20,80 kW → 20,80 kW (valor repetido).
- Queimador de 5,86 kW: texto "Dual Flame"; manual "tripla chama" → tripla chama.

**Sem dado oficial / conferir:**

- Medidas de recorte da bancada: só no gabarito → conferir no PDF.
- A página tem poucas fotos do produto em fundo branco: conferir se a 01 serve de principal; se não, pedir à Elettromec.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Rangetop a Gás Professional 6 Queimadores 91 cm | Elettromec</h2>
    <p class="uk-desc-linha">Mesa Esmaltada | Superautomático | 127V</p>

    <p>O <strong>Rangetop Professional Inox 36" Elettromec</strong> é uma mesa de cocção a gás de embutir, com design inspirado nos modelos americanos, para bancadas de cozinhas e áreas gourmet. Tem <strong>6 queimadores Defendi</strong>, com potência total de <strong>20,80 kW (71.000 BTU/h)</strong>, e combina com os outros equipamentos da linha Professional.</p>

    <p>O <strong>queimador tripla chama de 5,86 kW</strong> atende os preparos maiores; há ainda 2 rápidos, 2 semirrápidos e 1 auxiliar. A mesa tem <strong>acabamento esmaltado</strong>, resistente a altas temperaturas, com <strong>trempes em ferro fundido</strong> e manípulos robustos. O <strong>acendimento é superautomático</strong>: basta pressionar e girar o manípulo, sem botão secundário. Há sistema de reignição. O acabamento é em <strong>aço inoxidável 304</strong>.</p>

    <p>O <strong>inox 304</strong> tem mais cromo e níquel que o inox 430, usado na maior parte dos eletrodomésticos, e por isso resiste melhor à corrosão. É uma escolha mais segura para cozinhas úmidas e para casas em cidades litorâneas, onde a maresia favorece o aparecimento de pontos de ferrugem no 430. Para manter o acabamento, a limpeza regular continua necessária.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Queimadores</th><td>6 queimadores a gás Defendi</td></tr>
                    <tr><th scope="row">Potência total</th><td>20,80 kW (71.000 BTU/h)</td></tr>
                    <tr><th scope="row">Mesa</th><td>Acabamento esmaltado</td></tr>
                    <tr><th scope="row">Trempes</th><td>Ferro fundido</td></tr>
                    <tr><th scope="row">Acendimento</th><td>Superautomático, no próprio manípulo</td></tr>
                    <tr><th scope="row">Sistema de reignição</th><td>Sim</td></tr>
                    <tr><th scope="row">Válvula de segurança</th><td>Não</td></tr>
                    <tr><th scope="row">Acabamento</th><td>Aço inoxidável 304</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Queimadores</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Tripla chama (frente direita)</th><td>5,86 kW (20.000 BTU/h)</td></tr>
                    <tr><th scope="row">Rápido (frente esquerda)</th><td>4,39 kW (15.000 BTU/h)</td></tr>
                    <tr><th scope="row">Rápido (traseira direita)</th><td>3,51 kW (12.000 BTU/h)</td></tr>
                    <tr><th scope="row">Semirrápido (traseira esquerda e meio traseiro)</th><td>2,63 kW (9.000 BTU/h) cada</td></tr>
                    <tr><th scope="row">Auxiliar (meio frontal)</th><td>1,75 kW (6.000 BTU/h)</td></tr>
                    <tr><th scope="row">Total</th><td>20,80 kW (71.000 BTU/h)</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>Rangetop Professional Inox 36"</td></tr>
                    <tr><th scope="row">Código</th><td>RT-6Q-36-XP-1SGA</td></tr>
                    <tr><th scope="row">Instalação</th><td>Embutir</td></tr>
                    <tr><th scope="row">Largura comercial</th><td>91 cm</td></tr>
                    <tr><th scope="row">Tipo de gás</th><td>Sai de fábrica para GLP; conversão para gás natural feita na instalação</td></tr>
                    <tr><th scope="row">Pressão do gás</th><td>GLP 2,75 kPa; GN 1,96 kPa</td></tr>
                    <tr><th scope="row">Tensão</th><td>127 V, 60 Hz</td></tr>
                    <tr><th scope="row">Potência elétrica</th><td>2 W</td></tr>
                    <tr><th scope="row">Corrente</th><td>0,01 A</td></tr>
                    <tr><th scope="row">EAN</th><td>7898593937208</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Dimensões e Peso</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Produto (L x A x P)</th><td>915 x 254 x 695 mm</td></tr>
                    <tr><th scope="row">Peso líquido</th><td>45 kg</td></tr>
                    <tr><th scope="row">Embalagem (L x A x P)</th><td>1.020 x 350 x 780 mm</td></tr>
                    <tr><th scope="row">Peso bruto</th><td>55 kg</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Instalação</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Coifa</th><td>Distância de 800 a 900 mm entre o rangetop e a parte inferior da coifa; vazão mínima recomendada de 1.600 m³/h, com suporte a temperaturas acima de 100 °C</td></tr>
                    <tr><th scope="row">Coifa de parede</th><td>O rangetop pode ficar rente à parede traseira; mínimo de 200 mm até paredes laterais</td></tr>
                    <tr><th scope="row">Coifa de ilha</th><td>Folga mínima de 150 mm entre a traseira do rangetop e o fim da ilha</td></tr>
                    <tr><th scope="row">Local</th><td>Permanentemente ventilado, sem correntes de ar; não instalar em ambiente enclausurado</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>2 anos de garantia Elettromec:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 21 meses, cobrindo peças com defeito de fabricação e a mão de obra do reparo.</p>
            <p>O defeito deve ser comunicado em até 48 horas ao Serviço Autorizado Elettromec, com a nota fiscal. A garantia não cobre instalação feita por profissionais não credenciados pela Elettromec, uso em desacordo com o manual, ligação em tensão diferente da indicada, nem lâmpadas e vidros.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> o rangetop é 127 V e sai de fábrica para gás GLP; para gás natural, a conversão deve ser feita pelo serviço autorizado na instalação. Siga as medidas de nicho e de coifa do gabarito oficial. Após a instalação, verifique se há vazamento de gás com espuma de sabão em todas as conexões. Erros de instalação feita por profissionais não credenciados pela Elettromec não têm cobertura da garantia.</p>
    </div>
</article>
```

O HTML completo do 36" também está no repositório: `tema/descricoes/novos/elettromec-rangetop-professional-36-RT-6Q-36-XP-1SGA.html`.

### CKI-6Q-90-SR-2KSA — Cooktop Invisível 90 cm Elettromec

Ficha completa, pronta para criar. Página oficial: [CKI-6Q-90-SR-2KSA](https://elettromec.com.br/produto/cooktop-invisivel-90cm/). Não existe na loja. Na lista de estoque de 21/10 está indisponível. É o primeiro produto da categoria 6 a 8 Zonas Indução.

| Campo | Valor |
| --- | --- |
| Nome do produto | Cooktop de Indução Invisível Elettromec 6 Zonas 90 cm para Pedra Sinterizada 220V |
| Título SEO | Cooktop de Indução Invisível Elettromec 90 cm \| Unikitchen |
| Meta | Cooktop de indução invisível Elettromec instalado sob a pedra sinterizada, 6 zonas, Semi-Flex e Boost, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | cooktop-inducao-invisivel-elettromec-6-zonas-90-cm-220v |
| Título curto | Cooktop de Indução Invisível 6 Zonas 90 cm |
| Subtítulo | Sob Pedra Sinterizada \| 220V |
| Categoria | Cooktops, Rangetops e Dominós > Cooktops > 6 a 8 Zonas Indução |
| Embalagem | 1.040 x 185 x 650 mm (L x A x P), 16,5 kg bruto. Produto: 900 x 62 x 520 mm, 14,8 kg. |
| Modelo | CKI-6Q-90-SR-2KSA |
| EAN | 7898593939165 |
| NCM | 8516.60.00 |
| Tensão | 220 V, 60 Hz, 32 A |
| Potência | 7.200 W |
| Zonas | 6 |
| Largura comercial | 90 cm |
| Fabricante | Elettromec |

**Fotos (ordem sugerida, 01 = principal):**

1. [EF\_110-01](https://elettromec.com.br/wp-content/uploads/2026/02/Elettromec_EF_110-Cooktop-Invisivel-90-cm-220V-01-scaled.png)
2. [EF\_110-02](https://elettromec.com.br/wp-content/uploads/2026/02/Elettromec_EF_110-Cooktop-Invisivel-90-cm-220V-02.png)
3. [EF\_110-03](https://elettromec.com.br/wp-content/uploads/2026/02/Elettromec_EF_110-Cooktop-Invisivel-90-cm-220V-03.png)
4. [EF\_110-04](https://elettromec.com.br/wp-content/uploads/2026/02/Elettromec_EF_110-Cooktop-Invisivel-90-cm-220V-04.png)
5. [EF\_110-05](https://elettromec.com.br/wp-content/uploads/2026/02/Elettromec_EF_110-Cooktop-Invisivel-90-cm-220V-05.png)
6. [EF\_110-06](https://elettromec.com.br/wp-content/uploads/2026/02/Elettromec_EF_110-Cooktop-Invisivel-90-cm-220V-06-scaled.png)

Conferir qual delas mostra o produto inteiro em fundo branco para ser a 01.

**Documentos:** [Manual](https://elettromec.com.br/wp-content/uploads/2026/06/CKI-6Q2.pdf) · [Guia comercial](https://elettromec.com.br/wp-content/uploads/2026/03/Guia_comercial_Cooktop_InvisC3ADvel_90cm.pdf). Gabarito: não há PDF separado (as medidas de instalação estão no manual).

**Conflitos resolvidos:**

- Medidas do produto: site e guia 900 x 62 x 520 mm; manual 893 x 58 x 453 mm → 900 x 62 x 520 (valor repetido).
- Largura comercial: texto do guia 60 cm; tabela do guia 90 cm → 90 cm (tabela > texto).
- Potência do Boost: guia 2.100 W (texto); manual 1.800 / 2.000 W por zona → sem número na descrição, só "por até 5 minutos".
- Tapete de silicone: o manual diz "deve ser sempre utilizado" e depois "uso opcional" → "use sempre" (mais conservador).

**Sem dado oficial / conferir:**

- A Elettromec só cita como testada a pedra Petra (Dexco). Vale a loja combinar com o marmorista antes de vender.

**Descrição (HTML):** arquivo completo em `tema/descricoes/novos/elettromec-cooktop-invisivel-90-CKI-6Q-90-SR-2KSA.html` (8,4 mil caracteres). Seções: Detalhes do Produto, Especificações Técnicas, Dimensões e Peso, Instalação, Garantia e Importante, este com o aviso de que só serve sob pedra sinterizada de 12 a 15 mm.

```html
<article class="description">
    <h2 class="uk-desc-titulo">Cooktop de Indução Invisível 6 Zonas 90 cm | Elettromec</h2>
    <p class="uk-desc-linha">Sob Pedra Sinterizada | 220V</p>

    <p>O <strong>Cooktop Invisível 90 cm Elettromec</strong> é um cooktop de indução instalado na <strong>parte inferior da bancada</strong>: a cocção acontece direto sobre a pedra e, com o aparelho desligado, a bancada fica livre para outras funções. O revestimento é a própria pedra escolhida para o projeto.</p>

    <p>São <strong>6 zonas de cocção de 1.800 W</strong>, com potência nominal de <strong>7.200 W</strong>. A <strong>função Zona Semi-Flex</strong> combina duas zonas verticais para panelas ovais, maiores ou chapas, e a <strong>função Boost</strong> intensifica a potência de uma zona por até 5 minutos. O <strong>painel de controle touch</strong> é instalado à parte, e o cooktop tem timer, desligamento automático, trava de segurança, indicação de calor residual e sensor que reduz a potência em caso de superaquecimento.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Instalação</th><td>Sob a bancada, invisível; cocção direta na pedra</td></tr>
                    <tr><th scope="row">Superfície compatível</th><td>Somente superfícies ultracompactas, como pedras sinterizadas, com 12 a 15 mm de espessura</td></tr>
                    <tr><th scope="row">Zonas de cocção</th><td>6 zonas de 190 mm, 1.800 W cada</td></tr>
                    <tr><th scope="row">Zona Semi-Flex</th><td>Combina duas zonas verticais (área de 390 x 210 mm)</td></tr>
                    <tr><th scope="row">Função Boost</th><td>Potência intensificada em uma zona por até 5 minutos</td></tr>
                    <tr><th scope="row">Comando</th><td>Painel de controle touch, instalado separadamente</td></tr>
                    <tr><th scope="row">Segurança</th><td>Trava de segurança, desligamento automático, sensor contra superaquecimento e indicação de calor residual</td></tr>
                    <tr><th scope="row">Timer</th><td>Desliga a zona após o tempo programado</td></tr>
                    <tr><th scope="row">Itens inclusos</th><td>Painel de controle, tapete de silicone e 10 presilhas de fixação</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>Cooktop Invisível 90 cm 220 V</td></tr>
                    <tr><th scope="row">Código</th><td>CKI-6Q-90-SR-2KSA</td></tr>
                    <tr><th scope="row">Tipo de cocção</th><td>Indução</td></tr>
                    <tr><th scope="row">Largura comercial</th><td>90 cm</td></tr>
                    <tr><th scope="row">Potência nominal</th><td>7.200 W</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V, 60 Hz</td></tr>
                    <tr><th scope="row">Corrente</th><td>32 A</td></tr>
                    <tr><th scope="row">Instalação elétrica</th><td>Disjuntor dedicado fora do nicho; fios de no mínimo 2,5 mm²; ponto aterrado</td></tr>
                    <tr><th scope="row">EAN</th><td>7898593939165</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Dimensões e Peso</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Produto (L x A x P)</th><td>900 x 62 x 520 mm</td></tr>
                    <tr><th scope="row">Peso líquido</th><td>14,8 kg</td></tr>
                    <tr><th scope="row">Embalagem (L x A x P)</th><td>1.040 x 185 x 650 mm</td></tr>
                    <tr><th scope="row">Peso bruto</th><td>16,5 kg</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Instalação</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Espessura da pedra</th><td>12 a 15 mm na área do cooktop</td></tr>
                    <tr><th scope="row">Distâncias</th><td>Zonas a no mínimo 100 mm de qualquer borda ou recorte; 50 mm livres ao redor do aparelho; 200 mm entre o aparelho e outros recortes de embutidos</td></tr>
                    <tr><th scope="row">Painel de controle</th><td>Recomendado na parte frontal da marcenaria, com 100 mm de margem até a estrutura do móvel</td></tr>
                    <tr><th scope="row">Móvel</th><td>Laterais resistentes a 95 °C; ventilação permanente, com entrada e saída de ar livres</td></tr>
                    <tr><th scope="row">Panelas</th><td>Próprias para indução, com fundo plano</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>2 anos de garantia Elettromec:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 21 meses, cobrindo peças com defeito de fabricação e a mão de obra do reparo.</p>
            <p>O defeito deve ser comunicado em até 48 horas ao Serviço Autorizado Elettromec, com a nota fiscal. A garantia não cobre instalação feita por profissionais não credenciados pela Elettromec, uso em desacordo com o manual, ligação em tensão diferente da indicada, nem lâmpadas e vidros.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> o cooktop só pode ser instalado sob superfícies ultracompactas, como pedras sinterizadas, de 12 a 15 mm; outras superfícies não são compatíveis. A Elettromec não se responsabiliza por danos à pedra, e a instalação da pedra e a marcação das zonas na superfície ficam a cargo do cliente. Use sempre o tapete de silicone sobre a área de cocção. O aparelho é 220 V e exige disjuntor dedicado. Instalação feita por profissionais não credenciados pela Elettromec não tem cobertura da garantia.</p>
    </div>
</article>
```

### 16830 — Cooktop de Indução com Coifa Integrada Mythos Extractor FMA 839 Franke

Ficha completa, pronta para criar. Não existe na loja. **Decisão de categoria:** a loja não tem categoria para cooktop com coifa integrada (ver Categoria). Página oficial: [16830](https://loja.franke.com.br/extractor-franke-mythos-fma-839-cooktop-e-coifa-integrados-83x52-16830/p).

| Campo | Valor |
| --- | --- |
| Nome do produto | Cooktop de Indução com Coifa Integrada Franke Mythos Extractor FMA 839 4 Zonas 83 cm Vitrocerâmica Preta 220V |
| Título SEO | Cooktop de Indução c/ Coifa Franke Mythos 83 cm \| Unikitchen |
| Meta | Cooktop de indução Franke Mythos Extractor com coifa integrada, 4 zonas, 700 m³/h, sobreposto ou rente, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | cooktop-inducao-coifa-integrada-franke-mythos-extractor-fma-839-83-cm-220v |
| Título curto | Cooktop de Indução com Coifa Mythos 4 Zonas 83 cm |
| Subtítulo | Vitrocerâmica Preta \| 700 m³/h \| 220V |
| Categoria | Principal: Cooktops, Rangetops e Dominós > Cooktops > 4 a 5 Zonas Indução. Secundária: Coifas > Coifa de Bancada. \[Provável\] Alternativa: criar a subcategoria "Cooktop com Coifa Integrada" (decisão do cliente). |
| Embalagem | Não informada no site → usar a do produto e avisar (o site também não traz o peso). |
| Modelo | FMA 839 (Extractor Mythos) |
| Referência Franke | 16830 (FUN 340.0595.364) |
| EAN | 7892162168307 |
| Tipo | Indução, com coifa integrada |
| Zonas | 4 (2 flex com função bridge) |
| Mesa | Vitrocerâmica preta |
| Dimensões da mesa | 83 x 52 cm |
| Vazão da coifa | 700 m³/h (IEC 61591) |
| Tensão | 220 V, 50/60 Hz |
| Fabricante | Franke |
| Linha | Mythos |

**Fotos (ordem sugerida, 01 = principal):**

1. [1extractor-franke.jpg](https://lojafranke.vteximg.com.br/arquivos/ids/157021/1extractor-franke.jpg)
2. [2extractor-franke.jpg](https://lojafranke.vteximg.com.br/arquivos/ids/157030/2extractor-franke.jpg)
3. [16830-.jpg](https://lojafranke.vteximg.com.br/arquivos/ids/160641/16830-.jpg)
4. [1extractor-franke-tecnico.jpg](https://lojafranke.vteximg.com.br/arquivos/ids/157031/1extractor-franke-tecnico.jpg) (desenho)
5. [2extractor-franke-tecnico.jpg](https://lojafranke.vteximg.com.br/arquivos/ids/157032/2extractor-franke-tecnico.jpg) (desenho)

**Documentos:** [Manual](https://www.franke.com/content/dam/franke/br/pt/home-solutions/manuais/publicado/16830_extractor.pdf) · [Certificado de garantia](https://www.franke.com/content/dam/franke/br/pt/home-solutions/certificados-garantia/revisados/1.%20Certificado%20de%20garantia%20Franke%20-%20Eletrodom%C3%A9sticos.pdf)

**Conflitos resolvidos:**

- A ficha do site marca "Válvula de segurança: Sim", que não se aplica a cooktop de indução → não usado.

**Sem dado oficial / conferir:**

- Peso e embalagem.
- Potência total do cooktop (o site informa só 2.100 W e 3.700 W por zona, sem dizer quais).
- Medidas de recorte: só no desenho técnico e no manual → conferir no PDF.
- O produto funciona com um **kit de instalação vendido à parte** (filtragem ou exaustor). Os códigos dos kits não estão na página: pedir à Franke.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Cooktop de Indução com Coifa Mythos 4 Zonas 83 cm | Franke</h2>
    <p class="uk-desc-linha">Vitrocerâmica Preta | 700 m³/h | 220V</p>

    <p>O <strong>Extractor Mythos FMA 839 Franke</strong> é um cooktop de indução com <strong>coifa integrada</strong> no centro da mesa. Tem <strong>4 áreas de cocção</strong>, sendo <strong>2 áreas flex com função bridge</strong> nas laterais, e a coifa extrai até <strong>700 m³/h</strong> (IEC 61591).</p>

    <p>Quando o cooktop é ligado, a coifa é <strong>acionada automaticamente</strong> na velocidade proporcional à potência escolhida. O painel touch central com slider tem <strong>9 níveis de potência + booster</strong>, para as zonas e para a coifa, timer em todas as áreas, função pausa e bloqueio de segurança. O <strong>indicador de saturação</strong> avisa quando lavar o filtro de gordura ou trocar o filtro de carvão.</p>

    <p>A grade da coifa é de <strong>ferro fundido</strong> e o filtro de gordura pode ser lavado na lava-louças. A instalação pode ser <strong>sobreposta ou rente à bancada</strong>. Para funcionar, o produto precisa de um <strong>kit de instalação</strong>, vendido à parte: <strong>filtragem</strong> (depurador, com saída de ar no rodapé do móvel e filtro de carvão) ou <strong>exaustor</strong> (para duto flexível de 150 mm, que não acompanha).</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Áreas de cocção</th><td>4, sendo 2 flex com função bridge</td></tr>
                    <tr><th scope="row">Potência por zona</th><td>2.100 W e 3.700 W</td></tr>
                    <tr><th scope="row">Níveis de potência</th><td>9 + booster (zonas e coifa)</td></tr>
                    <tr><th scope="row">Comando</th><td>Painel touch central com slider</td></tr>
                    <tr><th scope="row">Coifa</th><td>Integrada, com acionamento automático ao ligar o cooktop</td></tr>
                    <tr><th scope="row">Vazão da coifa</th><td>700 m³/h (IEC 61591)</td></tr>
                    <tr><th scope="row">Filtros</th><td>Filtro de gordura metálico (lavável na lava-louças) e filtro de carvão ativado</td></tr>
                    <tr><th scope="row">Indicador de saturação de filtro</th><td>Sim</td></tr>
                    <tr><th scope="row">Grade da coifa</th><td>Ferro fundido</td></tr>
                    <tr><th scope="row">Timer</th><td>Em todas as áreas de cocção</td></tr>
                    <tr><th scope="row">Outras funções</th><td>Pausa e parada de cozimento; bloqueio de segurança</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>Extractor Mythos FMA 839</td></tr>
                    <tr><th scope="row">Código Franke</th><td>16830</td></tr>
                    <tr><th scope="row">Mesa</th><td>Vitrocerâmica preta</td></tr>
                    <tr><th scope="row">Dimensões da mesa</th><td>83 x 52 cm</td></tr>
                    <tr><th scope="row">Instalação</th><td>Sobreposta ou rente à bancada (flush)</td></tr>
                    <tr><th scope="row">Modo da coifa</th><td>Depurador (kit filtragem) ou exaustor (kit exaustor), vendidos à parte</td></tr>
                    <tr><th scope="row">Duto (kit exaustor)</th><td>Flexível de 150 mm de diâmetro, não incluso</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V, 50/60 Hz</td></tr>
                    <tr><th scope="row">EAN</th><td>7892162168307</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>1 ano de garantia Franke:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 275 dias de garantia contratual, contados da emissão da nota fiscal, contra vícios ou defeitos de fabricação.</p>
            <p>O atendimento é feito pela Franke (0800 477 3000 ou ks-info.br@franke.com) ou por sua rede credenciada, mediante nota fiscal. A garantia não cobre uso ou instalação inadequados, tensão fora da especificada, limpeza com produtos não indicados, peças não originais, quedas ou danos de transporte.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> o cooktop só funciona com um dos kits de instalação (filtragem ou exaustor), vendidos separadamente; confirme o kit antes da compra. O duto de exaustão não acompanha. Use panelas próprias para indução e siga as medidas de recorte e de ventilação do manual de instalação.</p>
    </div>
</article>
```

### 17108 — Cooktop de Indução Maris FMA 804 Franke

Ficha completa, pronta para criar. Não existe na loja. Página oficial: [17108](https://loja.franke.com.br/cooktop-de-inducao-maris-vidro-preto-franke-4-zonas-coccao-fma-804-17108/p).

| Campo | Valor |
| --- | --- |
| Nome do produto | Cooktop de Indução Franke Maris FMA 804 4 Zonas 77 cm Vitrocerâmica Preta 220V |
| Título SEO | Cooktop de Indução Franke Maris 4 Zonas 77 cm \| Unikitchen |
| Meta | Cooktop de indução Franke Maris FMA 804, 4 zonas com área flex, 18 níveis + booster, mesa 77 x 51 cm, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | cooktop-inducao-franke-maris-fma-804-4-zonas-77-cm-220v |
| Título curto | Cooktop de Indução Maris 4 Zonas 77 cm |
| Subtítulo | Vitrocerâmica Preta \| 220V |
| Categoria | Cooktops, Rangetops e Dominós > Cooktops > 4 a 5 Zonas Indução |
| Embalagem | 85,5 x 12 x 60 cm (L x A x P), 12,3 kg. Produto: 11,3 kg. |
| Modelo | FMA 804 |
| Referência Franke | 17108 |
| EAN | 7892162171086 |
| Zonas | 4 (área flex à esquerda) |
| Mesa | Vitrocerâmica preta |
| Dimensões da mesa | 77 x 51 cm |
| Potência máxima | 7,2 kW (ajustável: 2,5 / 4,0 / 6,0 / 7,2 kW) |
| Tensão | 220 V, 50/60 Hz |
| Comando | Slider touch |
| Fabricante | Franke |
| Linha | Maris |

**Fotos (ordem sugerida, 01 = principal):**

1. [Maris](https://lojafranke.vteximg.com.br/arquivos/ids/158712/17108---Cooktop-de-Inducao-Maris.jpg)
2. [Maris2](https://lojafranke.vteximg.com.br/arquivos/ids/159037/17108---Cooktop-de-Inducao-Maris2.jpg)
3. [Maris3](https://lojafranke.vteximg.com.br/arquivos/ids/159038/17108---Cooktop-de-Inducao-Maris3.jpg)
4. [Maris4](https://lojafranke.vteximg.com.br/arquivos/ids/159039/17108---Cooktop-de-Inducao-Maris4.jpg)
5. [Maris5](https://lojafranke.vteximg.com.br/arquivos/ids/159040/17108---Cooktop-de-Inducao-Maris5.jpg)
6. [Maris6](https://lojafranke.vteximg.com.br/arquivos/ids/159041/17108---Cooktop-de-Inducao-Maris6.jpg)
7. [Maris8](https://lojafranke.vteximg.com.br/arquivos/ids/159043/17108---Cooktop-de-Inducao-Maris8.jpg)
8. [Maris7](https://lojafranke.vteximg.com.br/arquivos/ids/159042/17108---Cooktop-de-Inducao-Maris7.png)

**Documentos:** [Manual](https://www.franke.com/content/dam/franke/br/pt/home-solutions/manuais/FMA%20804%20I%20F%20BK_400011522637.pdf) · [Certificado de garantia](https://www.franke.com/content/dam/franke/br/pt/home-solutions/certificados-garantia/revisados/1.%20Certificado%20de%20garantia%20Franke%20-%20Eletrodom%C3%A9sticos.pdf)

**Conflitos resolvidos:** nenhum. Potência máxima (7,2 kW) e níveis ajustáveis vêm do manual; potências por zona, do site.

**Sem dado oficial / conferir:**

- Largura comercial: a regra (arredondar para cima) daria 80 cm; usei 77 cm, a medida da Franke. Confirmar com o cliente.
- Medidas de recorte: só no manual → conferir no PDF.
- Fotos: há 11 na página; deixei 8. Conferir quais são desenho ou ambiente.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Cooktop de Indução Maris 4 Zonas 77 cm | Franke</h2>
    <p class="uk-desc-linha">Vitrocerâmica Preta | 220V</p>

    <p>O <strong>Cooktop de Indução Maris FMA 804 Franke</strong> tem mesa em <strong>vitrocerâmica preta</strong> de <strong>77 x 51 cm</strong> e <strong>4 áreas de cocção quadradas</strong>. As 2 áreas da esquerda formam uma <strong>área flex</strong>, que pode ser usada em conjunto com panelas retangulares ou ovais.</p>

    <p>O comando é <strong>slider touch</strong>, com <strong>18 níveis de potência + booster</strong> e <strong>6 funções de cozimento</strong>: derreter, manter quente, ferver, cozinhar brando e Cookassist, entre outras. Há timer em todas as áreas, bloqueio de segurança e indicador de calor residual. A potência máxima sai de fábrica em <strong>7,2 kW</strong> e pode ser limitada a 2,5, 4,0 ou 6,0 kW conforme a instalação elétrica da casa.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Áreas de cocção</th><td>4 quadradas, sendo 1 área flex (as 2 da esquerda)</td></tr>
                    <tr><th scope="row">Níveis de potência</th><td>18 + booster</td></tr>
                    <tr><th scope="row">Funções de cozimento</th><td>6 (inclui derreter, manter quente, ferver, cozinhar brando e Cookassist)</td></tr>
                    <tr><th scope="row">Comando</th><td>Slider touch</td></tr>
                    <tr><th scope="row">Timer</th><td>Em todas as áreas de cocção</td></tr>
                    <tr><th scope="row">Segurança</th><td>Bloqueio de segurança e indicador de calor residual</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Potência por Zona</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Frontal esquerda</th><td>1.750 a 2.200 W</td></tr>
                    <tr><th scope="row">Posterior esquerda</th><td>1.750 a 2.200 W</td></tr>
                    <tr><th scope="row">Posterior direita</th><td>2.100 a 3.000 W</td></tr>
                    <tr><th scope="row">Frontal direita</th><td>1.200 a 1.600 W</td></tr>
                    <tr><th scope="row">Potência máxima</th><td>7,2 kW, ajustável para 2,5 / 4,0 / 6,0 kW</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>Maris FMA 804</td></tr>
                    <tr><th scope="row">Código Franke</th><td>17108</td></tr>
                    <tr><th scope="row">Mesa</th><td>Vitrocerâmica preta</td></tr>
                    <tr><th scope="row">Instalação</th><td>Bancada</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V, 50/60 Hz</td></tr>
                    <tr><th scope="row">EAN</th><td>7892162171086</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Dimensões e Peso</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Mesa</th><td>77 x 51 cm</td></tr>
                    <tr><th scope="row">Peso do produto</th><td>11,3 kg</td></tr>
                    <tr><th scope="row">Embalagem (L x A x P)</th><td>85,5 x 12 x 60 cm</td></tr>
                    <tr><th scope="row">Peso com embalagem</th><td>12,3 kg</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>1 ano de garantia Franke:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 275 dias de garantia contratual, contados da emissão da nota fiscal, contra vícios ou defeitos de fabricação.</p>
            <p>O atendimento é feito pela Franke (0800 477 3000 ou ks-info.br@franke.com) ou por sua rede credenciada, mediante nota fiscal. A garantia não cobre uso ou instalação inadequados, tensão fora da especificada, limpeza com produtos não indicados, peças não originais, quedas ou danos de transporte.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> use panelas com fundo próprio para indução. Na primeira utilização, ajuste a potência máxima do cooktop ao limite da instalação elétrica da casa, como indica o manual. Siga as medidas de recorte e a ligação elétrica do manual de instalação.</p>
    </div>
</article>
```

### 17110 — Cooktop de Indução Mythos FMY 808 Franke

Ficha completa, pronta para criar. Não existe na loja. Página oficial: [17110](https://loja.franke.com.br/cooktop-inducao-mythos-fmy808-77x51cm-8-areas-17110/p).

| Campo | Valor |
| --- | --- |
| Nome do produto | Cooktop de Indução Franke Mythos FMY 808 8 Áreas Flex 77 cm Vitrocerâmica Preta 220V |
| Título SEO | Cooktop de Indução Franke Mythos 8 Áreas 77 cm \| Unikitchen |
| Meta | Cooktop de indução Franke Mythos FMY 808, 8 áreas Flex Pro, CookAssist com 63 receitas, mesa 77 x 51 cm, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | cooktop-inducao-franke-mythos-fmy-808-8-areas-77-cm-220v |
| Título curto | Cooktop de Indução Mythos 8 Áreas 77 cm |
| Subtítulo | Vitrocerâmica Preta \| 220V |
| Categoria | Cooktops, Rangetops e Dominós > Cooktops > 6 a 8 Zonas Indução (categoria hoje vazia) |
| Embalagem | Não informada no site → usar a do produto e avisar (o site também não traz o peso). |
| Modelo | FMY 808 |
| Referência Franke | 17110 |
| EAN | 7892162171109 |
| Zonas | 8 áreas Flex Pro (15 x 19 cm cada) |
| Mesa | Vitrocerâmica preta |
| Dimensões da mesa | 77 x 51 cm |
| Potência máxima | 7,4 kW (ajustável: 2,5 / 4,0 / 6,0 / 7,4 kW) |
| Tensão | 220 V, 50/60 Hz |
| Comando | Slider touch, display LED branco |
| Fabricante | Franke |
| Linha | Mythos |

**Fotos (ordem sugerida, 01 = principal):**

1. [mythos1](https://lojafranke.vteximg.com.br/arquivos/ids/158708/17110_cooktop-mythos1.png)
2. [mythos2](https://lojafranke.vteximg.com.br/arquivos/ids/158565/17110_cooktop-mythos2.jpg)
3. [mythos3](https://lojafranke.vteximg.com.br/arquivos/ids/158566/17110_cooktop-mythos3.jpg)
4. [mythos4](https://lojafranke.vteximg.com.br/arquivos/ids/158567/17110_cooktop-mythos4.jpg)
5. [mythos5](https://lojafranke.vteximg.com.br/arquivos/ids/158568/17110_cooktop-mythos5.jpg)
6. [mythos6](https://lojafranke.vteximg.com.br/arquivos/ids/158569/17110_cooktop-mythos6.jpg)
7. [mythos7](https://lojafranke.vteximg.com.br/arquivos/ids/158570/17110_cooktop-mythos7.jpg)
8. [mythos8](https://lojafranke.vteximg.com.br/arquivos/ids/158571/17110_cooktop-mythos8.jpg)

**Documentos:** [Manual](https://www.franke.com/content/dam/franke/br/pt/home-solutions/manuais/publicado/17110_COOKTOP-MYTHOS-FMY808.pdf) · [Certificado de garantia](https://www.franke.com/content/dam/franke/br/pt/home-solutions/certificados-garantia/revisados/1.%20Certificado%20de%20garantia%20Franke%20-%20Eletrodom%C3%A9sticos.pdf)

**Conflitos resolvidos:**

- Display: ficha do site diz "LCD"; texto da Franke diz "display em LED branco com slider" → LED branco (texto mais específico).
- A ficha do site traz "Ajuste de potência: 1200W - 1800W" sem dizer a que se refere → não usado.

**Sem dado oficial / conferir:**

- Largura comercial: a regra daria 80 cm; usei 77 cm, a medida da Franke. Confirmar com o cliente.
- Peso e embalagem.
- Medidas de recorte (sobreposta e rente): só no manual → conferir no PDF.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Cooktop de Indução Mythos 8 Áreas 77 cm | Franke</h2>
    <p class="uk-desc-linha">Vitrocerâmica Preta | 220V</p>

    <p>O <strong>Cooktop de Indução Mythos FMY 808 Franke</strong> tem mesa em <strong>vitrocerâmica preta</strong> de <strong>77 x 51 cm</strong> com <strong>8 áreas de cocção Flex Pro</strong> de 15 x 19 cm, que se combinam para panelas de diferentes tamanhos.</p>

    <p>O comando tem display LED branco com slider, <strong>18 níveis de potência + booster</strong> e <strong>8 funções</strong> (derreter/manter quente, Flex Pro, cozinhar lentamente, ProCook, ferver, grelhar, fritar e moka). O <strong>CookAssist</strong> traz <strong>63 receitas pré-definidas</strong> com explicação passo a passo: ao escolher o prato, o assistente define o programa e a potência. Há bloqueio de segurança para crianças.</p>

    <p>A instalação pode ser <strong>sobreposta ou rente à bancada</strong>, e o cooktop faz parte do Sistema Mythos da Franke. A potência máxima sai de fábrica em <strong>7,4 kW</strong> e pode ser limitada a 2,5, 4,0 ou 6,0 kW conforme a instalação elétrica.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Áreas de cocção</th><td>8 áreas Flex Pro de 15 x 19 cm</td></tr>
                    <tr><th scope="row">Níveis de potência</th><td>18 + booster</td></tr>
                    <tr><th scope="row">Funções</th><td>8: derreter/manter quente, Flex Pro, cozinhar lentamente, ProCook, ferver, grelhar, fritar e moka</td></tr>
                    <tr><th scope="row">CookAssist</th><td>63 receitas pré-definidas, com explicação passo a passo</td></tr>
                    <tr><th scope="row">Comando</th><td>Slider touch, display LED branco</td></tr>
                    <tr><th scope="row">Segurança</th><td>Bloqueio de segurança para crianças</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>Mythos FMY 808</td></tr>
                    <tr><th scope="row">Código Franke</th><td>17110</td></tr>
                    <tr><th scope="row">Mesa</th><td>Vitrocerâmica preta, 77 x 51 cm</td></tr>
                    <tr><th scope="row">Instalação</th><td>Sobreposta ou rente à bancada</td></tr>
                    <tr><th scope="row">Potência máxima</th><td>7,4 kW, ajustável para 2,5 / 4,0 / 6,0 kW</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V, 50/60 Hz</td></tr>
                    <tr><th scope="row">EAN</th><td>7892162171109</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>1 ano de garantia Franke:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 275 dias de garantia contratual, contados da emissão da nota fiscal, contra vícios ou defeitos de fabricação.</p>
            <p>O atendimento é feito pela Franke (0800 477 3000 ou ks-info.br@franke.com) ou por sua rede credenciada, mediante nota fiscal. A garantia não cobre uso ou instalação inadequados, tensão fora da especificada, limpeza com produtos não indicados, peças não originais, quedas ou danos de transporte.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> use panelas com fundo próprio para indução. Na primeira utilização, ajuste a potência máxima ao limite da instalação elétrica da casa, como indica o manual. Siga as medidas de recorte do manual de instalação (são diferentes para instalação sobreposta e rente à bancada).</p>
    </div>
</article>
```

### 18881 — Coifa de Embutir FBFP Black Matte A86 86 cm Franke

Ficha completa, pronta para criar. Não existe na loja. **Atenção:** a ficha técnica do site da Franke para este código tem campos copiados do modelo de 70 cm (ver Conflitos). Página oficial: [18881](https://loja.franke.com.br/coifa-embutir-movel-fbfp-black-matte-a86-86cm-220v-18881/p).

| Campo | Valor |
| --- | --- |
| Nome do produto | Coifa de Embutir no Móvel Franke FBFP Black Matte A86 86 cm Inox Preto Fosco 220V |
| Título SEO | Coifa de Embutir Franke FBFP Black Matte 86 cm \| Unikitchen |
| Meta | Coifa de embutir no móvel Franke FBFP A86, 86 cm, inox preto fosco, 720 m³/h, 3 velocidades + intensiva, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | coifa-embutir-movel-franke-fbfp-black-matte-a86-86-cm-220v |
| Título curto | Coifa de Embutir FBFP Black Matte 86 cm |
| Subtítulo | 720 m³/h \| Filtro Metálico \| 47 a 68 dB \| 220V |
| Categoria | Coifas > Coifa de Embutir |
| Embalagem | Não informada no site → usar a do produto e avisar (o site também não traz o peso). |
| Modelo | FBFP BK MATT A86 |
| Referência Franke | 18881 |
| EAN | 7892162188817 |
| Tipo | Embutir no móvel |
| Largura | 86 cm |
| Acabamento | Inox preto fosco (black matte) |
| Vazão | 720 m³/h (IEC) |
| Ruído | 47 a 68 dB |
| Velocidades | 3 + intensiva |
| Tensão | 220 V |
| Fabricante | Franke |
| Origem | Itália |

**Fotos (ordem sugerida, 01 = principal):**

1. [A86\_1](https://lojafranke.vteximg.com.br/arquivos/ids/161604/18881_Coifa-de-embutir_FBFP_black_matte_A86_1.jpg.jpg)
2. [A86\_2](https://lojafranke.vteximg.com.br/arquivos/ids/161605/18881_Coifa-de-embutir_FBFP_black_matte_A86_2.jpg.jpg)
3. [A86\_3](https://lojafranke.vteximg.com.br/arquivos/ids/161606/18881_Coifa-de-embutir_FBFP_black_matte_A86_3.jpg.jpg)
4. [desenho](https://lojafranke.vteximg.com.br/arquivos/ids/161853/18881_desenho_1000x1000.png) (desenho)

**Documentos:** [Manual](https://www.franke.com/content/dam/franke/br/pt/home-solutions/manuais/publicado/13881_coifa_fbfp_bk_matt_a86.pdf) · [Certificado de garantia](https://www.franke.com/content/dam/franke/br/pt/home-solutions/certificados-garantia/revisados/1.%20Certificado%20de%20garantia%20Franke%20-%20Eletrodom%C3%A9sticos.pdf)

**Conflitos resolvidos:**

- Vazão: ficha do site 670 m³/h; texto "Destaques do modelo 86 cm" 720 m³/h → **720 m³/h** (fonte específica do código; a ficha repete os dados do modelo de 70 cm, inclusive "Dimensão 70 cm").
- Ruído: descrição curta 47 a 66 dB; texto do modelo 86 cm 47 a 68 dB → **47 a 68 dB** (mesmo motivo).
- Iluminação e comando: a descrição curta fala em 1 lâmpada e acionamento manual (texto do 70 cm); o texto do 86 cm diz 2 lâmpadas LED, controle remoto ou app → texto do 86 cm.

**Sem dado oficial / conferir:**

- Peso e embalagem.
- Medidas do nicho no móvel e diâmetro do duto: só no desenho e no manual → conferir no PDF.
- Controle remoto: o texto diz que a coifa pode ser acionada por controle remoto, mas não diz se ele acompanha → confirmar com a Franke antes de anunciar como incluso.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Coifa de Embutir FBFP Black Matte 86 cm | Franke</h2>
    <p class="uk-desc-linha">720 m³/h | Filtro Metálico | 47 a 68 dB | 220V</p>

    <p>A <strong>Coifa de Embutir no Móvel FBFP Black Matte A86 Franke</strong> fica embutida no armário, com <strong>86 cm</strong> de largura e acabamento em <strong>inox na cor preto fosco</strong>, que combina com os fornos e micro-ondas da linha Maris. É fabricada na Itália.</p>

    <p>A extração é <strong>perimetral</strong>, de até <strong>720 m³/h</strong> (IEC), com <strong>3 velocidades + intensiva</strong> e ruído de <strong>47 a 68 dB</strong>. Tem <strong>função 24h</strong> e <strong>função delay</strong>. As <strong>2 lâmpadas LED</strong> e o motor podem ser acionados no painel, por controle remoto ou pelo aplicativo.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Instalação</th><td>Embutida no móvel</td></tr>
                    <tr><th scope="row">Extração</th><td>Perimetral</td></tr>
                    <tr><th scope="row">Vazão máxima</th><td>720 m³/h (IEC)</td></tr>
                    <tr><th scope="row">Velocidades</th><td>3 + intensiva</td></tr>
                    <tr><th scope="row">Ruído</th><td>47 a 68 dB</td></tr>
                    <tr><th scope="row">Iluminação</th><td>2 lâmpadas LED</td></tr>
                    <tr><th scope="row">Funções</th><td>Função 24h e função delay</td></tr>
                    <tr><th scope="row">Acionamento</th><td>Painel, controle remoto ou aplicativo</td></tr>
                    <tr><th scope="row">Filtros</th><td>Filtros de gordura metálicos; filtro de carvão ativado para uso como depurador</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>FBFP BK MATT A86</td></tr>
                    <tr><th scope="row">Código Franke</th><td>18881</td></tr>
                    <tr><th scope="row">Largura</th><td>86 cm</td></tr>
                    <tr><th scope="row">Acabamento</th><td>Inox preto fosco</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V</td></tr>
                    <tr><th scope="row">Origem</th><td>Itália</td></tr>
                    <tr><th scope="row">EAN</th><td>7892162188817</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>1 ano de garantia Franke:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 275 dias de garantia contratual, contados da emissão da nota fiscal, contra vícios ou defeitos de fabricação.</p>
            <p>O atendimento é feito pela Franke (0800 477 3000 ou ks-info.br@franke.com) ou por sua rede credenciada, mediante nota fiscal. A garantia não cobre uso ou instalação inadequados, tensão fora da especificada, limpeza com produtos não indicados, peças não originais, quedas ou danos de transporte.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> a coifa é embutida no móvel: confira as medidas do nicho e o diâmetro do duto no manual antes de fazer a marcenaria. O filtro de carvão ativado não é lavável e deve ser trocado periodicamente; os filtros de gordura devem ser limpos regularmente.</p>
    </div>
</article>
```

### 18883 — Coifa de Embutir FBFE XS A70 70 cm Franke

Ficha completa, pronta para criar. Não existe na loja. Página oficial: [18883](https://loja.franke.com.br/coifa-embutir-movel-franke-fbfe-xs-a70-inox-70cm-220v-18883/p).

| Campo | Valor |
| --- | --- |
| Nome do produto | Coifa de Embutir no Móvel Franke FBFE XS A70 70 cm Inox 220V |
| Título SEO | Coifa de Embutir Franke FBFE XS 70 cm Inox \| Unikitchen |
| Meta | Coifa de embutir no móvel Franke FBFE XS A70, 70 cm, inox, 670 m³/h, 3 velocidades + intensiva, luz LED, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | coifa-embutir-movel-franke-fbfe-xs-a70-70-cm-inox-220v |
| Título curto | Coifa de Embutir FBFE XS 70 cm |
| Subtítulo | 670 m³/h \| Filtro Metálico \| 47 a 66 dB \| 220V |
| Categoria | Coifas > Coifa de Embutir |
| Embalagem | Não informada no site → usar a do produto e avisar (o site também não traz o peso). |
| Modelo | FBFE XS A70 |
| Referência Franke | 18883 |
| EAN | 7892162188831 |
| Tipo | Embutir no móvel |
| Largura | 70 cm |
| Acabamento | Inox |
| Vazão | 670 m³/h (IEC) |
| Ruído | 47 a 66 dB |
| Velocidades | 3 + intensiva |
| Tensão | 220 V |
| Fabricante | Franke |
| Origem | Itália |

**Fotos (ordem sugerida, 01 = principal):**

1. [A70\_1](https://lojafranke.vteximg.com.br/arquivos/ids/161601/18883_coifa_de-embutir_FBFE_XS_A70_1.jpg.jpg)
2. [A70\_2](https://lojafranke.vteximg.com.br/arquivos/ids/161602/18883_coifa_de-embutir_FBFE_XS_A70_2.jpg.jpg)
3. [desenho](https://lojafranke.vteximg.com.br/arquivos/ids/161692/desenho_18883.png) (desenho)

**Documentos:** [Manual](https://www.franke.com/content/dam/franke/br/pt/home-solutions/manuais/publicado/13883_coifa_fbfe_xs_a70.pdf) · [Certificado de garantia](https://www.franke.com/content/dam/franke/br/pt/home-solutions/certificados-garantia/revisados/1.%20Certificado%20de%20garantia%20Franke%20-%20Eletrodom%C3%A9sticos.pdf)

**Conflitos resolvidos:** ruído "66 dB" na ficha e "47 a 66 dB" no texto → faixa 47 a 66 dB (o 66 é o máximo; sem conflito real).

**Sem dado oficial / conferir:**

- Peso e embalagem.
- Medidas do nicho no móvel e diâmetro do duto: só no desenho e no manual → conferir no PDF.
- Só 2 fotos do produto e 1 desenho: pouco para o padrão da loja.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Coifa de Embutir FBFE XS 70 cm | Franke</h2>
    <p class="uk-desc-linha">670 m³/h | Filtro Metálico | 47 a 66 dB | 220V</p>

    <p>A <strong>Coifa de Embutir no Móvel FBFE XS A70 Franke</strong> fica embutida no armário, com <strong>70 cm</strong> de largura e acabamento em <strong>inox</strong>, que combina com os cooktops inox Franke. É fabricada na Itália.</p>

    <p>A extração é <strong>perimetral</strong>, de até <strong>670 m³/h</strong> (IEC), com <strong>3 velocidades + intensiva</strong> e ruído de <strong>47 a 66 dB</strong>. O acionamento é manual, no painel, e a <strong>lâmpada LED</strong> pode ser ligada separadamente para iluminar a área de preparo.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Instalação</th><td>Embutida no móvel</td></tr>
                    <tr><th scope="row">Extração</th><td>Perimetral</td></tr>
                    <tr><th scope="row">Vazão máxima</th><td>670 m³/h (IEC)</td></tr>
                    <tr><th scope="row">Velocidades</th><td>3 + intensiva</td></tr>
                    <tr><th scope="row">Ruído</th><td>47 a 66 dB</td></tr>
                    <tr><th scope="row">Iluminação</th><td>Lâmpada LED</td></tr>
                    <tr><th scope="row">Acionamento</th><td>Manual, no painel</td></tr>
                    <tr><th scope="row">Filtros</th><td>Filtros de gordura metálicos; filtro de carvão ativado para uso como depurador</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>FBFE XS A70</td></tr>
                    <tr><th scope="row">Código Franke</th><td>18883</td></tr>
                    <tr><th scope="row">Largura</th><td>70 cm</td></tr>
                    <tr><th scope="row">Acabamento</th><td>Inox</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V</td></tr>
                    <tr><th scope="row">Origem</th><td>Itália</td></tr>
                    <tr><th scope="row">EAN</th><td>7892162188831</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>1 ano de garantia Franke:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 275 dias de garantia contratual, contados da emissão da nota fiscal, contra vícios ou defeitos de fabricação.</p>
            <p>O atendimento é feito pela Franke (0800 477 3000 ou ks-info.br@franke.com) ou por sua rede credenciada, mediante nota fiscal. A garantia não cobre uso ou instalação inadequados, tensão fora da especificada, limpeza com produtos não indicados, peças não originais, quedas ou danos de transporte.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> a coifa é embutida no móvel: confira as medidas do nicho e o diâmetro do duto no manual antes de fazer a marcenaria. O filtro de carvão ativado não é lavável e deve ser trocado periodicamente; os filtros de gordura devem ser limpos regularmente.</p>
    </div>
</article>
```

### 19194 — Coifa de Teto Invisible Ceiling FCMY 90 cm Franke

Ficha completa, pronta para criar. Não existe na loja. **Decisão de categoria:** a loja não tem "Coifa de Teto" (ver Categoria). Página oficial: [19194](https://loja.franke.com.br/coifa-teto-invisible-ceiling-franke-fcmy-90cm-220v-19194/p).

| Campo | Valor |
| --- | --- |
| Nome do produto | Coifa de Teto Franke Invisible Ceiling FCMY 90 cm com Iluminação LED e Controle Remoto 220V |
| Título SEO | Coifa de Teto Franke Invisible Ceiling 90 cm \| Unikitchen |
| Meta | Coifa de teto Franke Invisible Ceiling 90 cm, 760 m³/h, LED perimetral com dimmer e controle remoto, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | coifa-teto-franke-invisible-ceiling-fcmy-90-cm-220v |
| Título curto | Coifa de Teto Invisible Ceiling 90 cm |
| Subtítulo | 760 m³/h \| Filtro de Carvão Ativado \| 49 a 70 dB \| 220V |
| Categoria | Hoje: Coifas > Coifa de Embutir (é onde a própria Franke a coloca). \[Provável\] Melhor: criar Coifas > Coifa de Teto (decisão do cliente). |
| Embalagem | Peso com embalagem 26 kg; medidas da embalagem não informadas. Produto: 19,9 kg. |
| Modelo | FCMY Invisible Ceiling |
| Referência Franke | 19194 |
| EAN | 7892162191947 |
| Tipo | Embutida no teto (forro) |
| Largura | 90 cm |
| Vazão | 760 m³/h (IEC) |
| Ruído | 49 a 70 dB (sem o kit de motor remoto) |
| Modo | Exaustor ou depurador (filtro incluso) |
| Controle remoto | Incluso |
| Tensão | 220 V |
| Fabricante | Franke |
| Origem | Itália |

**Fotos (ordem sugerida, 01 = principal):**

1. [ceiling1](https://lojafranke.vteximg.com.br/arquivos/ids/161930/19194_invisible_ceiling1.png)
2. [ceiling2](https://lojafranke.vteximg.com.br/arquivos/ids/161931/19194_invisible_ceiling2.png)
3. [ceiling3](https://lojafranke.vteximg.com.br/arquivos/ids/161932/19194_invisible_ceiling3.png)
4. [ceiling4](https://lojafranke.vteximg.com.br/arquivos/ids/161935/19194_invisible_ceiling4.png)
5. [ceiling5](https://lojafranke.vteximg.com.br/arquivos/ids/161934/19194_invisible_ceiling5.png)
6. [ceiling6](https://lojafranke.vteximg.com.br/arquivos/ids/161937/19194_invisible_ceiling6.png)
7. [19194\_1](https://lojafranke.vteximg.com.br/arquivos/ids/161936/19194_1.png)
8. [19194\_2](https://lojafranke.vteximg.com.br/arquivos/ids/161933/19194_2.png)

**Documentos:** [Manual (instalação e uso)](https://www.franke.com/content/dam/franke/br/pt/home-solutions/manuais/19194_350.0731.515_invisible_ceiling_franke.pdf) · [Certificado de garantia](https://www.franke.com/content/dam/franke/br/pt/home-solutions/certificados-garantia/revisados/1.%20Certificado%20de%20garantia%20Franke%20-%20Eletrodom%C3%A9sticos.pdf)

**Conflitos resolvidos:** nenhum.

**Sem dado oficial / conferir:**

- Medidas da embalagem.
- Medidas de recorte no forro e altura do nicho: só no manual de instalação → conferir no PDF.
- Kits vendidos à parte (não incluir no anúncio sem cadastro próprio): motor remoto, código 17440; Kit Heaven, código 17460.
- Há uma 9ª imagem (19194\_3.png); conferir se é desenho ou repetição.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Coifa de Teto Invisible Ceiling 90 cm | Franke</h2>
    <p class="uk-desc-linha">760 m³/h | Filtro de Carvão Ativado | 49 a 70 dB | 220V</p>

    <p>A <strong>Coifa de Teto Invisible Ceiling FCMY Franke</strong> fica embutida no forro, com <strong>90 cm</strong>. Para integrá-la ao teto, a Franke indica pintar o teto em tom próximo ao NCS S 500 N (RGB 255, 235, 202). É fabricada na Itália.</p>

    <p>A extração chega a <strong>760 m³/h</strong> (IEC), com ruído de <strong>49 a 70 dB</strong>. A <strong>iluminação perimetral em LED</strong> tem dimmer e ajuste de tonalidade, com configurações pré-definidas de intensidade e temperatura da luz. A <strong>função 24h</strong> liga a coifa por 10 minutos a cada hora durante 24 horas, e a <strong>função delay</strong> a desliga 30 minutos após o uso. Funciona como <strong>exaustor ou depurador</strong> (filtro incluso), com <strong>controle remoto incluso</strong>.</p>

    <p>Com o <strong>kit de motor remoto</strong> (código 17440, vendido à parte), o motor fica fora do ambiente e o ruído na cozinha cai. Combinado ao <strong>Kit Heaven</strong> (código 17460, vendido à parte), o espaço necessário entre forro e laje cai para <strong>12,5 cm</strong>.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Instalação</th><td>Embutida no teto (forro)</td></tr>
                    <tr><th scope="row">Vazão máxima</th><td>760 m³/h (IEC)</td></tr>
                    <tr><th scope="row">Ruído</th><td>49 a 70 dB (sem o kit de motor remoto)</td></tr>
                    <tr><th scope="row">Iluminação</th><td>LED perimetral, com dimmer e ajuste de tonalidade</td></tr>
                    <tr><th scope="row">Função 24h</th><td>Liga por 10 min a cada hora, durante 24 h</td></tr>
                    <tr><th scope="row">Função delay</th><td>Desliga 30 min após o uso</td></tr>
                    <tr><th scope="row">Modo de uso</th><td>Exaustor ou depurador</td></tr>
                    <tr><th scope="row">Filtro</th><td>Filtro de carvão ativado incluso</td></tr>
                    <tr><th scope="row">Comando</th><td>Controle remoto incluso</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Acessórios vendidos à parte</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Kit de motor remoto</th><td>Código 17440: instala o motor fora do ambiente</td></tr>
                    <tr><th scope="row">Kit Heaven</th><td>Código 17460: com o motor remoto, reduz o espaço entre forro e laje para 12,5 cm</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>FCMY Invisible Ceiling</td></tr>
                    <tr><th scope="row">Código Franke</th><td>19194</td></tr>
                    <tr><th scope="row">Largura</th><td>90 cm</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V</td></tr>
                    <tr><th scope="row">Peso</th><td>19,9 kg</td></tr>
                    <tr><th scope="row">Peso com embalagem</th><td>26 kg</td></tr>
                    <tr><th scope="row">Origem</th><td>Itália</td></tr>
                    <tr><th scope="row">EAN</th><td>7892162191947</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>1 ano de garantia Franke:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 275 dias de garantia contratual, contados da emissão da nota fiscal, contra vícios ou defeitos de fabricação.</p>
            <p>O atendimento é feito pela Franke (0800 477 3000 ou ks-info.br@franke.com) ou por sua rede credenciada, mediante nota fiscal. A garantia não cobre uso ou instalação inadequados, tensão fora da especificada, limpeza com produtos não indicados, peças não originais, quedas ou danos de transporte.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> a coifa é instalada no forro: confira no manual de instalação as medidas do recorte e o espaço necessário acima do forro antes da obra. O kit de motor remoto e o Kit Heaven são vendidos separadamente.</p>
    </div>
</article>
```

### 18644 — Lava-louças 16 Serviços Embutir e Revestir 60 cm Franke

Ficha completa, pronta para criar. Não existe na loja. Página oficial: [18644](https://loja.franke.com.br/lava-loucas-16-servicos-embutir-e-revestir-franke-60cm-220v-18644/p).

| Campo | Valor |
| --- | --- |
| Nome do produto | Lava-louças de Embutir e Revestir Franke 16 Serviços 60 cm 220V |
| Título SEO | Lava-louças Franke 16 Serviços Revestir 60 cm \| Unikitchen |
| Meta | Lava-louças Franke de embutir e revestir, 16 serviços, 8 programas + autolimpeza, 3 cestos, 42 dB, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | lava-loucas-embutir-revestir-franke-16-servicos-60-cm-220v |
| Título curto | Lava-louças 16 Serviços |
| Subtítulo | Embutir ou Revestir \| 60 cm \| 8 Programas \| 220V |
| Categoria | Lava Louças > Lava-louças |
| Embalagem | 89,5 x 65,5 x 69 cm, 35,8 kg. A Franke rotula como L x A x P, mas pela largura do produto (59,8 cm) a ordem provável é A x L x P → conferir antes de preencher o frete. |
| Referência Franke | 18644 (FUN 117.0711.437) |
| EAN | 7892162186448 |
| Capacidade | 16 serviços |
| Instalação | Embutir ou revestir |
| Programas | 8 + autolimpeza |
| Ruído | 42 dB(A) |
| Potência | 1.900 W |
| Tensão | 220 V, 60 Hz |
| Pressão da água | 0,03 a 1,0 MPa |
| Dimensões | 598 x 816 a 890 x 555 mm (L x A x P) |
| Peso | 30 kg |
| Fabricante | Franke |
| Origem | Europa |

**Fotos (ordem sugerida, 01 = principal):**

1. [lava-loucas1](https://lojafranke.vteximg.com.br/arquivos/ids/161907/18644_lava-loucas1.jpg)
2. [lava-loucas2](https://lojafranke.vteximg.com.br/arquivos/ids/161908/18644_lava-loucas2.jpg)
3. [lava-loucas3](https://lojafranke.vteximg.com.br/arquivos/ids/161909/18644_lava-loucas3.jpg)
4. [lava-loucas4](https://lojafranke.vteximg.com.br/arquivos/ids/161910/18644_lava-loucas4.jpg)
5. [lava-loucas6](https://lojafranke.vteximg.com.br/arquivos/ids/161914/18644_lava-loucas6.jpg)
6. [lava-loucas7](https://lojafranke.vteximg.com.br/arquivos/ids/161915/18644_lava-loucas7.jpg)
7. [lava-loucas5](https://lojafranke.vteximg.com.br/arquivos/ids/161911/18644_lava-loucas5.png)

**Documentos:** [Manual](https://www.franke.com/content/dam/franke/br/pt/home-solutions/manuais/publicado/18644_manual_lava-lou%C3%A7as.pdf) · [Certificado de garantia (lava-louças)](https://www.franke.com/content/dam/franke/br/pt/home-solutions/manuais/publicado/Certificado%20de%20Garantia%20Franke_Eletros_Dishwasher.pdf)

**Conflitos resolvidos:**

- Altura: texto do site 81,6 cm; manual 816 a 890 mm (pés ajustáveis) → faixa do manual.
- Potência: site 1.900 W; o manual só diz "consulte a etiqueta" → 1.900 W (único valor informado).

**Sem dado oficial / conferir:**

- Garantia: o certificado de lava-louças da Franke é um PDF sem texto legível daqui; usei só "1 ano" (site). O bloco padrão Franke não cita lava-louças → o Claude do PC deve ler o certificado e completar.
- Medidas do nicho: o manual remete às instruções de instalação à parte.
- Duas imagens com o mesmo nome "lava-loucas.png" (ids 161912 e 161913): conferir se são ícones ou selos antes de usar.

**Descrição (HTML):**

```html
<article class="description">
    <h2 class="uk-desc-titulo">Lava-louças 16 Serviços | Franke</h2>
    <p class="uk-desc-linha">Embutir ou Revestir | 60 cm | 8 Programas | 220V</p>

    <p>A <strong>Lava-louças Franke 16 Serviços</strong> é de <strong>60 cm</strong> e pode ser <strong>embutida ou revestida</strong> com o painel da marcenaria. Tem <strong>3 cestos</strong>, e os suportes de pratos do cesto podem ser dobrados para receber panelas e tigelas.</p>

    <p>São <strong>8 programas de lavagem</strong> (automático, ecológico, 1h 65 °C, intensivo 70 °C, vidro 40 °C, higiênico 70 °C, noturno 55 °C e rápido 35 °C) e <strong>1 programa de autolimpeza</strong>. A função <strong>Postergar Início</strong> adia o começo de qualquer programa em até 24 horas. O ruído é de <strong>42 dB</strong>. Uma luz de status se apaga ao fim do programa, e a <strong>porta abre automaticamente</strong> no fim do ciclo.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Capacidade</th><td>16 serviços</td></tr>
                    <tr><th scope="row">Cestos</th><td>3</td></tr>
                    <tr><th scope="row">Programas</th><td>8: automático, ecológico, 1h 65 °C, intensivo 70 °C, vidro 40 °C, higiênico 70 °C, noturno 55 °C e rápido 35 °C</td></tr>
                    <tr><th scope="row">Autolimpeza</th><td>Programa dedicado</td></tr>
                    <tr><th scope="row">Postergar Início</th><td>Até 24 horas</td></tr>
                    <tr><th scope="row">Fim do ciclo</th><td>Luz de status e abertura automática da porta</td></tr>
                    <tr><th scope="row">Ruído</th><td>42 dB(A)</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Código Franke</th><td>18644</td></tr>
                    <tr><th scope="row">Instalação</th><td>Embutir ou revestir</td></tr>
                    <tr><th scope="row">Largura</th><td>60 cm</td></tr>
                    <tr><th scope="row">Potência</th><td>1.900 W</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V, 60 Hz</td></tr>
                    <tr><th scope="row">Pressão da água</th><td>0,03 a 1,0 MPa</td></tr>
                    <tr><th scope="row">Origem</th><td>Europa</td></tr>
                    <tr><th scope="row">EAN</th><td>7892162186448</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Dimensões e Peso</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Produto (L x A x P)</th><td>598 x 816 a 890 x 555 mm</td></tr>
                    <tr><th scope="row">Peso</th><td>30 kg</td></tr>
                    <tr><th scope="row">Peso com embalagem</th><td>35,8 kg</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>1 ano de garantia Franke</strong>, contado da emissão da nota fiscal, conforme o certificado de garantia de lava-louças da Franke.</p>
            <p>O atendimento é feito pela Franke (0800 477 3000 ou ks-info.br@franke.com) ou por sua rede credenciada, mediante nota fiscal.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> para revestir, o painel da porta é feito pela marcenaria; confira as medidas do nicho e do painel nas instruções de instalação da Franke antes da obra. A altura varia de 816 a 890 mm com o ajuste dos pés.</p>
    </div>
</article>
```

### 94754220 — Cooktop de Indução com Coifa Integrada Duo 4EI 80 Tramontina (modo exaustão)

Ficha completa, pronta para criar. Não existe na loja. Página oficial: [94754220](https://www.tramontina.com.br/cooktop-inducao-tramontina-design-collection-duo-4ei-80-com-coifa-integrada-em-modo-exaustao-220-v/94754220.html).

| Campo | Valor |
| --- | --- |
| Nome do produto | Cooktop de Indução com Coifa Integrada Tramontina Design Collection Duo 4EI 80 Modo Exaustão 220V |
| Título SEO | Cooktop Indução c/ Coifa Tramontina Duo 4EI 80 \| Unikitchen |
| Meta | Cooktop de indução Tramontina Duo 4EI 80 com coifa integrada em modo exaustão, 4 áreas, bridge, 600 m³/h, 220V. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | cooktop-inducao-coifa-integrada-tramontina-duo-4ei-80-exaustao-220v |
| Título curto | Cooktop de Indução com Coifa Duo 4EI 80 |
| Subtítulo | Vitrocerâmica \| 600 m³/h \| 220V |
| Categoria | Principal: Cooktops > 4 a 5 Zonas Indução. Secundária: Coifas > Coifa de Bancada (ou a categoria nova "Cooktop com Coifa Integrada", se for criada) |
| Embalagem | 87,5 x 64 x 59,5 cm (comprimento x largura x altura, como o site rotula), 30,25 kg bruto. Produto: 770 x 284,3 x 520 mm, 24,5 kg. |
| Modelo | Duo 4EI 80 Ex |
| Referência | 94754/220 (SKU 94754220) |
| EAN | Não informado |
| Tensão | 220 V, 50/60 Hz |
| Potência máxima | 7,2 kW (cooktop) + 135 W (coifa) |
| Disjuntor | 40 A |
| Fabricante | Tramontina |
| Linha | Design Collection |

**Fotos (ordem do site, 01 = principal):**

1. [PDM001](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220PDM001G.jpg)
2. [IXM001](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220IXM001G.jpg)
3. [IXM002](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220IXM002G.jpg)
4. [PRM001](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220PRM001G.jpg)
5. [PRM002](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220PRM002G.jpg)
6. [PRM003](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220PRM003G.jpg)

**Documentos:** [Ficha técnica](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220FIP002.pdf) · [Manual](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220MIP001.pdf) · [Garantia](https://assets.tramontina.com.br/upload/tramon/imagens/TEC/94754220GAM001.pdf)

**Conflitos resolvidos:**

- Velocidades da coifa: site "5 velocidades + Booster"; manual "6 (5 + P)" → mesmo dado, mantido "5 + booster".

**Sem dado oficial / conferir:**

- EAN: não aparece no site nem nos PDFs.
- Embalagem: no site da Tramontina os rótulos de altura e largura às vezes vêm trocados → conferir antes do frete.
- Nicho: as letras do gabarito (750, 774, 490, 524, rebaixo de 6 mm, "≥ 600") estão no desenho da ficha técnica; a descrição só cita os números e remete à ficha.
- Itens inclusos: a ficha lista o sistema de dutos (conectores, tubos, curvas, grade inox, defletor). Confirmar com a Tramontina se o tubo flexível de 1.500 mm e a tampa externa (93993/724 e 94550/013) também acompanham.

**Descrição (HTML):** arquivo completo em `tema/descricoes/novos/tramontina-cooktop-duo-4ei-80-94754220.html`. Seções: Cooktop, Coifa Integrada, Especificações Técnicas, Dimensões e Peso (com o nicho), Garantia (bloco padrão Tramontina, até 2 anos) e Importante (versão exaustão x depuração, panelas, marca-passo, filtros).

```html
<article class="description">
    <h2 class="uk-desc-titulo">Cooktop de Indução com Coifa Duo 4EI 80 | Tramontina</h2>
    <p class="uk-desc-linha">Vitrocerâmica | 600 m³/h | 220V</p>

    <p>O <strong>Cooktop de Indução Tramontina Design Collection Duo 4EI 80</strong> junta em um só produto o <strong>cooktop de indução</strong> e a <strong>coifa</strong>, integrada à mesa de vitrocerâmica. Esta versão (94754/220) é para <strong>modo exaustão</strong>: os vapores passam pelo filtro metálico e saem do ambiente pelos dutos retangulares, que acompanham o produto. A instalação pode ser <strong>flush ou semi-flush</strong>.</p>

    <p>O cooktop tem <strong>4 áreas de aquecimento</strong>, <strong>9 níveis de potência</strong>, <strong>booster</strong> nas 4 áreas e <strong>sistema bridge</strong>, que une duas áreas em uma para panelas grandes e assadeiras. Há função manter aquecido, pausa, timer, bloqueio do painel, indicador de calor residual e desligamento automático de segurança. A coifa tem <strong>vazão de até 600 m³/h</strong>, 5 velocidades mais booster e <strong>modo automático</strong>, que ajusta a velocidade conforme a potência usada no cooktop.</p>

    <div class="section">
        <h3 class="section-title">Cooktop</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Áreas de aquecimento</th><td>4, com sistema bridge</td></tr>
                    <tr><th scope="row">Potência das áreas</th><td>Dianteiras 2,0 kW (booster 2,8 kW); traseiras 1,5 kW (booster 2,0 kW)</td></tr>
                    <tr><th scope="row">Potência máxima</th><td>7,2 kW</td></tr>
                    <tr><th scope="row">Níveis de potência</th><td>9 + booster</td></tr>
                    <tr><th scope="row">Funções</th><td>Manter aquecido, pausa, timer, bloqueio do painel, indicador de calor residual e desligamento automático</td></tr>
                    <tr><th scope="row">Panelas</th><td>Fundo de material ferroso (que atrai ímã), de 140 a 220 mm de diâmetro</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Coifa Integrada</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modo</th><td>Exaustão (versão 94754/220)</td></tr>
                    <tr><th scope="row">Vazão</th><td>Até 600 m³/h (IEC 61591)</td></tr>
                    <tr><th scope="row">Ruído</th><td>63 dB(A) (IEC 60704)</td></tr>
                    <tr><th scope="row">Velocidades</th><td>5 + booster, com modo automático</td></tr>
                    <tr><th scope="row">Filtros</th><td>2 filtros metálicos para gordura, com indicador de limpeza</td></tr>
                    <tr><th scope="row">Reservatórios</th><td>2, para condensação e líquidos derramados</td></tr>
                    <tr><th scope="row">Potência</th><td>135 W</td></tr>
                    <tr><th scope="row">Dutos</th><td>Sistema de dutos retangulares de 180 x 90 mm incluso</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>Design Collection Duo 4EI 80 (exaustão)</td></tr>
                    <tr><th scope="row">Referência</th><td>94754/220</td></tr>
                    <tr><th scope="row">Mesa</th><td>Vitrocerâmica, painel touch</td></tr>
                    <tr><th scope="row">Instalação</th><td>Flush ou semi-flush</td></tr>
                    <tr><th scope="row">Tensão</th><td>220 V, 50/60 Hz</td></tr>
                    <tr><th scope="row">Disjuntor recomendado</th><td>40 A</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Dimensões e Peso</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Produto (L x A x P)</th><td>770 x 284,3 x 520 mm</td></tr>
                    <tr><th scope="row">Peso líquido</th><td>24,5 kg</td></tr>
                    <tr><th scope="row">Nicho flush</th><td>Medidas do gabarito: 750 x 490 mm e 774 x 524 mm, com rebaixo de 6 mm (ver ficha técnica)</td></tr>
                    <tr><th scope="row">Nicho semi-flush</th><td>Medidas do gabarito: 750 x 490 mm (ver ficha técnica)</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>Até 2 anos de garantia Tramontina:</strong> 1 ano (3 meses de garantia legal + 9 meses de garantia contratual) contra vícios ou defeitos de fabricação, contado da nota fiscal.</p>
            <p>Pode ser estendida em mais 6 meses registrando o produto gratuitamente no site da Tramontina e mais 6 meses instalando com o Serviço Autorizado Tramontina (instalação não gratuita). Sem o Serviço Autorizado, a garantia pode chegar a 18 meses. O registro deve ser feito dentro do período de garantia contratual.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> esta versão é para modo exaustão, com saída dos vapores para fora do ambiente; para recircular o ar sem duto externo, a Tramontina tem a versão em modo depuração (94754/221). Use panelas com fundo ferroso. Pessoas com marca-passo devem consultar um médico antes de usar cooktop de indução. Nunca use a coifa sem os filtros metálicos e limpe os reservatórios sempre que houver derramamento.</p>
    </div>
</article>
```

### CKG-5Q-90-SR-3TNA — Cooktop a Gás para Revestir 90 cm Elettromec

Ficha completa, pronta para criar. Não existe na loja. Página oficial: [CKG-5Q-90-SR-3TNA](https://elettromec.com.br/produto/cooktop-revestir-90cm/). Na lista de estoque de 21/10 está indisponível.

| Campo | Valor |
| --- | --- |
| Nome do produto | Cooktop a Gás para Revestir Elettromec 5 Queimadores 90 cm Dual Flame Bivolt |
| Título SEO | Cooktop a Gás para Revestir Elettromec 90 cm \| Unikitchen |
| Meta | Cooktop a gás Elettromec para revestir, instalado sob a bancada, 5 queimadores com Dual Flame de 4 kW, trempes de ferro, bivolt. Lojas em Sorocaba e Itapetininga. |
| URL sugerida | cooktop-gas-revestir-elettromec-5-queimadores-90-cm-bivolt |
| Título curto | Cooktop a Gás para Revestir 5 Queimadores 90 cm |
| Subtítulo | Sob a Bancada \| Superautomático \| Bivolt |
| Categoria | Cooktops, Rangetops e Dominós > Cooktops > 5 Queimadores a Gás |
| Embalagem | Não informada (sem guia comercial no site) → usar a do produto e avisar. Produto: 850 x 50 x 500 mm, 14,81 kg. |
| Modelo | CKG-5Q-90-SR-3TNA |
| EAN | Não informado |
| Tensão | Bivolt 127/220 V, 60 Hz |
| Queimadores | 5 (potência total 11,5 kW) |
| Tipo de gás | GLP ou GN |
| Largura comercial | 90 cm |
| Fabricante | Elettromec |

**Fotos (ordem sugerida, 01 = principal):**

1. [EF\_104-01](https://elettromec.com.br/wp-content/uploads/2026/09/Elettromec_EF_104-Cooktop-Revestir-90-cm-127V-01.png)
2. [EF\_104-02](https://elettromec.com.br/wp-content/uploads/2026/09/Elettromec_EF_104-Cooktop-Revestir-90-cm-127V-02.png)
3. [EF\_104-03](https://elettromec.com.br/wp-content/uploads/2026/09/Elettromec_EF_104-Cooktop-Revestir-90-cm-127V-03.png)
4. [EF\_104-05](https://elettromec.com.br/wp-content/uploads/2026/09/Elettromec_EF_104-Cooktop-Revestir-90-cm-127V-05.png)
5. [EF\_104-06](https://elettromec.com.br/wp-content/uploads/2026/09/Elettromec_EF_104-Cooktop-Revestir-90-cm-127V-06-scaled.png)
6. [Ambiente](https://elettromec.com.br/wp-content/uploads/2026/09/Elettromec_2024_EF_01-Elettromec-Cam-01-scaled.jpg)

**Documentos:** [Manual](https://elettromec.com.br/wp-content/uploads/2026/09/CKG-5Q-90-SR-3TNA_IM0294611782240014-1.pdf). O link "Guia Comercial" da página não aponta para PDF.

**Conflitos resolvidos:** nenhum. Site (85 x 5 x 50 cm) e manual (850 x 50 x 500 mm) batem.

**Sem dado oficial / conferir:**

- EAN e embalagem: sem guia comercial. Pedir à Elettromec.
- Os nomes das fotos dizem "127V", mas o manual e a lista de estoque dizem bivolt → usar bivolt.
- Esse cooktop entra na categoria mais cheia da loja (17 cooktops de 5 queimadores), mas é o único para revestir.

**Descrição (HTML):** arquivo completo em `tema/descricoes/novos/elettromec-cooktop-revestir-90-CKG-5Q-90-SR-3TNA.html`. Seções: Detalhes do Produto (com bancadas compatíveis e não compatíveis), Queimadores, Especificações Técnicas, Dimensões e Peso, Garantia Elettromec e Importante (bancada de 10 a 20 mm; Corian, HPL e madeira não servem).

```html
<article class="description">
    <h2 class="uk-desc-titulo">Cooktop a Gás para Revestir 5 Queimadores 90 cm | Elettromec</h2>
    <p class="uk-desc-linha">Sob a Bancada | Superautomático | Bivolt</p>

    <p>O <strong>Cooktop para Revestimento 5 Queimadores 90 cm Elettromec</strong> é instalado <strong>sob a pedra da bancada</strong>: só os <strong>queimadores e os manípulos</strong> ficam à vista, e o revestimento escolhido para o projeto compõe a superfície. Os queimadores ficam nivelados com a bancada.</p>

    <p>São <strong>5 queimadores</strong>, com potência total de <strong>11,5 kW</strong>, incluindo um <strong>queimador Dual Flame de 4,0 kW</strong>. As <strong>trempes são de ferro fundido</strong> e o <strong>acendimento é superautomático</strong>. Funciona com gás GLP ou gás natural.</p>

    <div class="section">
        <h3 class="section-title">Detalhes do Produto</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Instalação</th><td>Sob a bancada, com queimadores e manípulos aparentes</td></tr>
                    <tr><th scope="row">Bancadas compatíveis</th><td>Aço inoxidável, concreto ou superfícies ultracompactas, com 10 a 20 mm de espessura</td></tr>
                    <tr><th scope="row">Bancadas não compatíveis</th><td>Superfície sólida (tipo Corian), laminado de alta pressão (HPL) e madeira</td></tr>
                    <tr><th scope="row">Queimadores</th><td>5: 1 Dual Flame, 1 rápido, 2 semirrápidos e 1 auxiliar</td></tr>
                    <tr><th scope="row">Trempes</th><td>Ferro fundido</td></tr>
                    <tr><th scope="row">Acendimento</th><td>Superautomático</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Queimadores</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Dual Flame</th><td>4,0 kW</td></tr>
                    <tr><th scope="row">Rápido</th><td>3,0 kW</td></tr>
                    <tr><th scope="row">Semirrápido (2)</th><td>1,75 kW cada</td></tr>
                    <tr><th scope="row">Auxiliar</th><td>1,0 kW</td></tr>
                    <tr><th scope="row">Potência total</th><td>11,5 kW</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Especificações Técnicas</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Modelo</th><td>Cooktop de Revestimento 5 Queimadores 90 cm</td></tr>
                    <tr><th scope="row">Código</th><td>CKG-5Q-90-SR-3TNA</td></tr>
                    <tr><th scope="row">Largura comercial</th><td>90 cm</td></tr>
                    <tr><th scope="row">Tipo de gás</th><td>GLP ou gás natural</td></tr>
                    <tr><th scope="row">Pressão do gás</th><td>GLP 3,0 kPa; GN 1,75 kPa</td></tr>
                    <tr><th scope="row">Tensão</th><td>Bivolt (127/220 V), 60 Hz</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Dimensões e Peso</h3>
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr><th scope="row">Produto (L x A x P)</th><td>850 x 50 x 500 mm</td></tr>
                    <tr><th scope="row">Peso líquido</th><td>14,81 kg</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">Garantia</h3>
        <div class="guarantee">
            <p><strong>2 anos de garantia Elettromec:</strong> 90 dias de garantia legal (Código de Defesa do Consumidor) mais 21 meses, cobrindo peças com defeito de fabricação e a mão de obra do reparo.</p>
            <p>O defeito deve ser comunicado em até 48 horas ao Serviço Autorizado Elettromec, com a nota fiscal. A garantia não cobre instalação feita por profissionais não credenciados pela Elettromec, uso em desacordo com o manual, ligação em tensão diferente da indicada, nem lâmpadas e vidros.</p>
        </div>
    </div>

    <div class="alert-box">
        <p><strong>Importante:</strong> a bancada precisa ser de aço inox, concreto ou superfície ultracompacta, com 10 a 20 mm de espessura; Corian, HPL e madeira não servem. Os recortes para queimadores e manípulos devem seguir com precisão o gabarito do manual. Verifique o tipo de gás disponível antes da instalação e confira se há vazamento com espuma de sabão em todas as conexões. Instalação feita por profissionais não credenciados pela Elettromec não tem cobertura da garantia.</p>
    </div>
</article>
```
