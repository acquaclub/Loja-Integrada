/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-nomes-cards.js (versão única: lista + troca, sem a linha técnica)
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  Depende de: script-interacoes.js (marca e código nos cards)
*/
// Nos cards de produto, troca o nome longo da plataforma pelo nome curto do título da descrição
// (ex.: "Adega Vetro"). O nome completo continua no "title" do link e no "alt" da foto.
// Produto fora da lista mantém o nome normal. Para atualizar a lista, edite NOMES (código: nome).
(function () {
    var NOMES = {
    "13318": "Dosador de Sabão Aço Escovado",
    "13320": "Dosador de Sabão Quadrado",
    "13546": "Lixeira Quadrada 10L",
    "14609": "Cuba Box 16x41",
    "15190": "Cuba Box 68x41",
    "15192": "Cuba Box 54x41",
    "15194": "Cuba Box 45x41",
    "15196": "Cuba Box 36x41",
    "15198": "Cuba Box Dupla 78x45",
    "15815": "Triturador Turbo Elite 125",
    "16060": "Cuba Box Center",
    "16168": "Lixeira Redonda 5L",
    "16590": "Misturador Active Plus Pull Out",
    "16592": "Dosador de Sabão Black Matte",
    "17986": "Coifa de Parede New Format",
    "17988": "Coifa de Ilha New Format",
    "18095": "Misturador Eos Neo",
    "18097": "Misturador Atlas Neo",
    "18099": "Misturador Leda Neo",
    "18629": "Cuba Maris Quiet 82x42",
    "94731": "Cooktop Penta Glass Flat 5GG 90",
    "947093": "Cooktop Penta Side Plus 5GG",
    "947311": "Cooktop Penta Glass Full 5GG 90",
    "9452200": "Triturador de Resíduos 0,75 HP",
    "94520017": "Torneira Arko",
    "94520020": "Torneira Angolare",
    "94520021": "Misturador Monocomando Arko",
    "94520022": "Misturador Monocomando Angolare",
    "94520024": "Torneira Versa",
    "94520026": "Misturador Monocomando Flexion",
    "94520027": "Misturador Monocomando Versa",
    "94520028": "Misturador Monocomando Monde Plus",
    "94520029": "Misturador Monocomando Versatile",
    "94520030": "Misturador Monocomando Graceful",
    "94520031": "Misturador Monocomando Obelisk",
    "94520032": "Misturador Monocomando Hidden",
    "94520033": "Torneira Flexion Wall",
    "94520034": "Misturador Monocomando Versatile Black",
    "94520312": "Misturador Monocomando Angolare",
    "94520512": "Misturador Monocomando Angolare",
    "94702201": "Cooktop Dominó a Gás 2GG 30",
    "94708201": "Cooktop Penta 5GG",
    "94727104": "Cooktop Penta Inox Flat 5GX 70",
    "94728104": "Cooktop Penta Inox Flat 5GX 90",
    "94728174": "Cooktop Penta Inox Full 5GX 90",
    "94730104": "Cooktop Penta Glass Flat 5GG 70",
    "94747022": "Cooktop Elétrico New Square 60",
    "94748022": "Cooktop Elétrico New Dominó Touch",
    "94833221": "Coifa Tube Isla 35",
    "94880006": "Micro-ondas Inox 60",
    "94895209": "Lava-Louças SB09X 45",
    "94895214": "Lava-Louças SB14X 60",
    "94895220": "Lava-Louças S15X 60",
    "94896001": "Adega Senses 27 Garrafas",
    "94896002": "Adega Senses 45 Garrafas",
    "94896201": "Beer Center Senses 85L",
    "94896202": "Beer Center Senses 145L",
    "94897001": "Refrigerador de Embutir 250L",
    "95800023": "Coifa Dritta Wall 90 Split",
    "95800024": "Coifa Dritta Isla 90 Split",
    "95800025": "Coifa Incasso 75 Split",
    "95800030": "Coifa Slim Wall 90 Split",
    "95800031": "Coifa Slim Isla 90 Split",
    "95800123": "Coifa Dritta Wall Silent Pro 90",
    "95800124": "Coifa Dritta Isla Silent Pro 90",
    "99501124": "Banheira Freestanding Troppo",
    "99606238": "Banheira Freestanding Sunset",
    "99606246": "Banheira Freestanding Maya",
    "99800963": "Banheira Freestanding Piazza",
    "FAB28RDMM5": "Refrigerador Smeg Edição Mickey Mouse",
    "FAB28RDIT5": "Refrigerador Bandeira Italiana",
    "FAB28RDUJ5": "Refrigerador Bandeira Reino Unido",
    "FAB28RDPP5": "Refrigerador Anni 50 Pale",
    "FAB28RPK5": "Refrigerador Anni 50 Rosa",
    "FAB28RDRU5": "Refrigerador Anni 50 Ferrugem",
    "CV-1BI-40-VT-2VPA": "Adega Vetro",
    "JC-425B220R": "Wine Center 160 Garrafas",
    "TR14AVDC": "Adega 136L Professional",
    "JC-145B-L": "Wine Center 46 Garrafas",
    "JC-145B-R": "Wine Center 46 Garrafas",
    "TR08AVDA": "Adega Professional 80 Litros",
    "TR14AVDB": "Adega 136L Professional",
    "JC-115DR220": "Dual Wine & Beer Smart",
    "TR14ARDB": "Adega Professional de Revestir",
    "CV-2BI-181-VT-2VPB": "Adega Vetro 181 Garrafas",
    "CBK401B": "Churrasqueira a Gás Modena 34\"",
    "CV-2BI-87-VT-2VPA": "Adega Vetro 87 Garrafas",
    "CBK200": "Churrasqueira a Gás Capri",
    "CFD-SOL-90-XV-2ATC": "Coifa Sollevare Connect",
    "DBQ-IR-40-XX-NHUA": "Dominó Churrasqueira Infrared 40cm",
    "CBY200SB": "Side Burner a Gás",
    "CBK301M": "Churrasqueira a Gás Verona",
    "CFI-MLN-90-XX": "Coifa de Ilha Milano",
    "CFI-MLN-120-XX-2ATA": "Coifa de Ilha Milano",
    "CKG-4Q-60-XQ-3ZEA": "Cooktop a Gás Quadratto",
    "CFI-MOB-90-VP-2ATC": "Coifa Mobile Built-in Connect",
    "ECTGD5QM3A": "Cooktop a Gás 87cm",
    "GW951X-BR": "Cooktop a Gás 90cm",
    "EFGGF6QM2A": "Fogão Profissional a gás 36\"",
    "MAS604GGEVSXE": "Fogão Bertazzoni Master",
    "MAS604GMFESXE": "Fogão Bertazzoni Master",
    "FGG-5Q-90-XP-2GMA": "Fogão Professional Gás/Gás 90cm",
    "FGG-6Q-36-XP-1SGA": "Fogão Professional 36\"",
    "FGE-5Q-90-XP-2GMA": "Fogão Professional Gás/Elétrico 90cm",
    "FGG-8Q-48-XP-1SGA": "Fogão Professional Gás/Gás 48\"",
    "FG-AN-60-LC-2TNA": "Forno Luce a Gás 60cm",
    "BOS6747A01XBR": "Forno Multifunção 60cm",
    "EFNEB0352A": "Forno Elétrico 73L IX13",
    "FM-EL-60-LC-2TNA": "Forno Multifunção Luce 60cm",
    "FM-EL-75-LC-2TNA": "Forno Multifunção Luce 75cm",
    "FM-EL-60-VT-2TNA": "Forno Multifunção Vetro 60cm",
    "BM321A7X-BR": "Micro-ondas Combinado 32L BM321A7X",
    "EMCEB0352A": "Micro-ondas Combinado 35L IX13",
    "EMCEB0352B": "Micro-ondas Combinado 35L IX17",
    "FMC-LT-25-LC-2GZB": "Micro-ondas Luce Flat 23L",
    "FMC-LT-25-VT-2GZA": "Micro-ondas Vetro Flat 23L",
    "EMOEB0252B": "Micro-ondas 25L C17",
    "EGAEB0062A": "Gaveta Aquecida IX17 60cm",
    "GA-12S-30-XX-2TNA": "Gaveta Aquecida Inox 30cm",
    "EGAEB0062B": "Gaveta Aquecida IX13 60cm",
    "GA-6S-14-XX-2TNA": "Gaveta Aquecida Inox 14cm",
    "FR-LL-45-XX-NCLA": "Frente para Lava-louças 10S",
    "FR-LL-60-XX-NCLB": "Frente para Lava-louças",
    "LL-10S-45-SR-2VSA": "Lava-louças 10 Serviços",
    "TD14EXDO": "Lava-louças Original 14 Serviços",
    "TD14EXDP": "Lava-louças Professional 14 Serviços",
    "TD14WP": "Lava-louças de Embutir 14 Serviços",
    "GV693C60UVBR": "Lava-louças SmartFlex 16S",
    "ELLER0152A": "Lava-louças 15 Serviços",
    "TR10FZDA": "Freezer 100L Professional",
    "FZ-DU-307-XX-2VSA": "Freezer Duo 307L",
    "ESPLL0001": "Painel Decorativo para Lava-Louças",
    "FNI5182A1": "Freezer Vertical de Embutir",
    "TR14BVDB": "Frigobar 136L Professional",
    "RI5182A1": "Refrigerador de Embutir RI5182A1",
    "NRKI5182A2": "Refrigerador de Embutir NRKI5182A2",
    "RF-BF-510-XX-2VSA": "Refrigerador Inox Bottom Freezer 510L",
    "RF-DU-404-XX-2VSA": "Refrigerador Duo 404L",
    "GRF-49W": "Refrigerador French Door 466L",
    "ERDEB5042A": "Refrigerador Multi Door 504L",
    "08326": "Dosador de Sabão Cromado",
    "DE-BQ-30-XQ-2ZEA": "Dominó Barbecue Quadratto 30cm",
    "DFD72EXB": "Painel Decorativo para Lava-Louças",
    "FAB28RDGC5": "Refrigerador Smeg Dolce & Gabbana",
    "FAB28RBE5": "Refrigerador Anni 50 Azul",
    "TWD60EXDP": "Wine Dispenser Enoteca",
    "THV30BBQ": "Cooktop Dominó Barbecue",
    "THV30TEPPAN": "Cooktop Dominó Teppan Yaki",
    "TR08HC": "Umidor de Charutos 80L",
    "TR14CVDC": "Cervejeira 136L Professional",
    "TR14CVDD": "Cervejeira 136L Professional",
    "THV30FRYER": "Cooktop Dominó Fryer",
    "TR14CRDD": "Cervejeira Professional de Revestir",
    "TIM50EXDA": "Máquina de Gelo 50kg Professional",
    "JG36I": "Ice Maker Smart 20kg",
    "TR08CVDA": "Cervejeira 80L Professional",
    "BC-BI-144-VT-2VPA": "Beer Center Vetro 144 Litros",
    "ECFEP0902B": "Coifa Smart de Parede Zeta 90cm",
    "JC-145C": "Beer Center Smart 135L",
    "ECFEP0702A": "Coifa Smart de Parede Tau 70cm",
    "ECFEI0382A": "Coifa Tubular de Ilha 38cm",
    "ECFEI0902A": "Coifa Smart de Ilha Delta 90cm",
    "ECFEP0902A": "Coifa Smart de Parede Sigma 90cm",
    "ECFEI0902B": "Coifa Smart de Ilha Sigma 90cm",
    "CKG-5Q-70-VT-3TNB": "Cooktop Vetro 70cm",
    "IS846BG": "Cooktop de Indução OmniFlex",
    "CKG-4Q-60-VT-3TNA": "Cooktop Vetro 60cm",
    "CKG-5Q-90-VT-3TNA": "Cooktop Vetro 90cm",
    "THV90L2": "Cooktop a Gás Tecno 90cm Vitrocerâmico",
    "CKG-5Q-75-XQ-3ZEA": "Cooktop a Gás Quadratto 75cm",
    "DG-2Q-30-XQ-3ZEA": "Dominó Quadratto 2 Queimadores",
    "CKG-5Q-90-XQ-3ZEA": "Cooktop a Gás Quadratto 90cm",
    "ECTID4QM2A": "Cooktop de Indução 60cm",
    "ECTID5QM2A": "Cooktop de Indução 90cm",
    "THV30DFL": "Cooktop Dominó a Gás",
    "CKG-5Q-90-LC-3ZEA": "Cooktop a Gás Luce 90cm",
    "ECTGD2QM3A": "Cooktop a Gás Siena 2Q",
    "CKG-5Q-75-LC-3ZEA": "Cooktop a Gás Luce 75cm",
    "CKG-4Q-60-LC-3ZEA": "Cooktop a Gás Luce 60cm",
    "DG-1Q-30-XQ-3ZEA": "Dominó Quadratto Dual Flame 30cm",
    "1007-QUA-8-INX": "Lixeira Quadrada com Sensor 8L",
    "ECTGD4QM3C": "Cooktop Black Glass",
    "BCM4547A10XBR": "Forno Combinado com Micro-ondas 50L",
    "09888": "Lixeira Redonda 12L",
    "Insinkerator1000SR": "Triturador Evolution Plus 1000 SR",
    "AC-300-TRI": "Triturador de Resíduos de Alimentos Deca",
    "Insinkerator750SR": "Triturador Evolution Plus 750 SR",
    "RF-BF-510-VT-2VSA": "Refrigerador Vetro Bottom 510L",
    "Insinkerator460": "Triturador Standard 460",
    "Insinkerator700SR": "Triturador Premium 700 SR",
    "Insinkerator550SR": "Triturador Premium 550 SR"
    };

    function trocarNomes() {
        // Só cards que o script-interacoes já marcou: a marca é lida do nome completo, antes da troca
        document.querySelectorAll('.listagem-item[data-uk-marca]:not([data-uk-nome])').forEach(function (item) {
            item.setAttribute('data-uk-nome', '');
            var sku = item.querySelector('.produto-sku');
            var nome = item.querySelector('.nome-produto');
            var curto = sku && nome && NOMES[sku.textContent.trim()];
            if (!curto) return;
            // A marca já aparece em cima do nome: se o título repetir a marca, ela sai
            var marca = item.querySelector('.uk-card-marca:not(.vazia)');
            if (marca) {
                var texto = marca.textContent.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                curto = curto.replace(new RegExp('(^|\\s)' + texto + '(?=\\s|$)', 'i'), '$1').replace(/\s+/g, ' ').trim() || curto;
            }
            nome.setAttribute('title', nome.textContent.trim());
            nome.textContent = curto;
        });
    }

    var agendado = false;
    function agendar() {
        if (agendado) return;
        agendado = true;
        requestAnimationFrame(function () {
            agendado = false;
            trocarNomes();
        });
    }
    agendar();
    if ('MutationObserver' in window) {
        new MutationObserver(agendar).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-uk-marca'] });
    }
})();
