/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-nomes-1.js (código 1 de 2: troca dos nomes + 1ª metade da lista)
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  Depende de: script-interacoes.js (marca e código nos cards). A 2ª metade da lista está no script-nomes-2.
*/
// Nos cards de produto, troca o nome longo da plataforma pelo nome curto do título da descrição
// (ex.: "Adega Vetro") e mostra embaixo a linha técnica ("Built-In · 220V · 40 Garrafas").
// O nome completo continua no "title" do link e no "alt" da foto (SEO e acessibilidade).
// Lista: código → [nome, linha técnica]. Produto fora da lista mantém o nome normal.
window.UK_NOMES = Object.assign(window.UK_NOMES || {}, {
    "13318": ["Dosador de Sabão Aço Escovado","330ml | Abastecimento Superior | Inox Redondo"],
    "13320": ["Dosador de Sabão Quadrado","330ml | Abastecimento Superior | Aço Inox Escovado"],
    "13546": ["Lixeira Quadrada 10L","Inox Escovado | Sobrepor | Antibacteriana"],
    "14609": ["Cuba Box 16x41","Inox 304 | Embutir ou Sobrepor | Válvula Inclusa | Fast Fixing"],
    "15190": ["Cuba Box 68x41","Inox 304 | Embutir ou Sobrepor | Válvula Inclusa | Fast Fixing"],
    "15192": ["Cuba Box 54x41","Inox 304 | Embutir ou Sobrepor | Válvula Inclusa | Fast Fixing"],
    "15194": ["Cuba Box 45x41","Inox 304 | Embutir ou Sobrepor | Válvula Inclusa | Fast Fixing"],
    "15196": ["Cuba Box 36x41","Inox 304 | Embutir ou Sobrepor | Válvula Inclusa | Fast Fixing"],
    "15198": ["Cuba Box Dupla 78x45","Inox 304 | Embutir ou Sobrepor | 2 Cubas Iguais | Fast Fixing"],
    "15815": ["Triturador Turbo Elite 125","1.25 HP | 1.400ml | Bioshield | Torque Master"],
    "16060": ["Cuba Box Center","Workstation | Inox 304 | Acessórios Inclusos | 86x51cm"],
    "16168": ["Lixeira Redonda 5L","Inox Escovado | De Embutir | Praticidade"],
    "16590": ["Misturador Active Plus Pull Out","Black Matte | Ducha Extensível | Monocomando"],
    "16592": ["Dosador de Sabão Black Matte","300ml | Abastecimento Superior | Acabamento Fosco"],
    "17986": ["Coifa de Parede New Format","90cm | Filtro Baffle | Silenciosa (65dB) | 220V | Inox"],
    "17988": ["Coifa de Ilha New Format","90cm | Filtro Baffle | Silenciosa (65dB) | 220V | Inox"],
    "18095": ["Misturador Eos Neo","Aço Inox 304 Maciço | Bica Extensível em J | Acabamento Fosco"],
    "18097": ["Misturador Atlas Neo","Aço Inox 304 Maciço | Bica Extensível | Acabamento Fosco"],
    "18099": ["Misturador Leda Neo","Aço Inox 304 Maciço | Bica Extensível | Acabamento Fosco"],
    "18629": ["Cuba Maris Quiet 82x42","Inox 304 | Embutir | Sistema Antirruído | Válvula 7\""],
    "94731": ["Cooktop Penta Glass Flat 5GG 90","5 Queimadores | Vidro Temperado | Safestop | Manípulos em Baquelite | 90cm"],
    "947093": ["Cooktop Penta Side Plus 5GG","5 Queimadores | Vidro Temperado | Tripla Chama Lateral | 86cm | Bivolt"],
    "947311": ["Cooktop Penta Glass Full 5GG 90","5 Queimadores | Vidro Temperado | Safestop | Manípulos em Zamak | 90cm"],
    "9452200": ["Triturador de Resíduos 0,75 HP","Câmara de 1,4L | Air Switch | 127V ou 220V"],
    "94520017": ["Torneira Arko","Inox 304 | Bica Articulada | Acabamento Scotch Brite"],
    "94520020": ["Torneira Angolare","Inox 304 | Bica Articulada | Acabamento Scotch Brite"],
    "94520021": ["Misturador Monocomando Arko","Inox 304 | Acabamento Scotch Brite | Bica Articulada"],
    "94520022": ["Misturador Monocomando Angolare","Inox 304 | Bica Articulada | Água Quente e Fria"],
    "94520024": ["Torneira Versa","Inox 304 | Bica Articulada | Instalação de Bancada"],
    "94520026": ["Misturador Monocomando Flexion","Inox 304 | Bica Articulada | Acabamento Acetinado"],
    "94520027": ["Misturador Monocomando Versa","Inox 304 | Bica Articulada | Acabamento Acetinado"],
    "94520028": ["Misturador Monocomando Monde Plus","Inox 304 | Ducha Extensível | Acabamento Acetinado"],
    "94520029": ["Misturador Monocomando Versatile","Inox 304 | Ducha Removível | Semi-Profissional"],
    "94520030": ["Misturador Monocomando Graceful","Design Collection | Inox 304 | Bica Articulada"],
    "94520031": ["Misturador Monocomando Obelisk","Design Collection | Inox 304 | Acetinado | Bica Giratória"],
    "94520032": ["Misturador Monocomando Hidden","Design Collection | Inox 304 | Bica Retrátil (Oculta)"],
    "94520033": ["Torneira Flexion Wall","Inox 304 | Bica Articulada | Instalação de Parede"],
    "94520034": ["Misturador Monocomando Versatile Black","Inox 304 | Mangueira Silicone Preto | Ducha Removível"],
    "94520312": ["Misturador Monocomando Angolare","Inox 304 | Revestimento PVD Gold | Bica Articulada"],
    "94520512": ["Misturador Monocomando Angolare","Inox 304 | Revestimento PVD Black | Bica Articulada"],
    "94702201": ["Cooktop Dominó a Gás 2GG 30","2 Queimadores | Vidro Temperado | 30cm | Aço Carbono | Bivolt"],
    "94708201": ["Cooktop Penta 5GG","5 Queimadores | Vidro Temperado | 70cm | Bivolt"],
    "94727104": ["Cooktop Penta Inox Flat 5GX 70","5 Queimadores | Safestop | Inox 304 | Trempes Ferro Fundido | Bivolt"],
    "94728104": ["Cooktop Penta Inox Flat 5GX 90","5 Queimadores | Safestop | Inox 304 | Trempes Ferro Fundido | Bivolt"],
    "94728174": ["Cooktop Penta Inox Full 5GX 90","5 Queimadores | Safestop | Inox 304 | Manípulos em Zamak | 90cm"],
    "94730104": ["Cooktop Penta Glass Flat 5GG 70","5 Queimadores | Vidro Temperado | Safestop | 70cm | Bivolt"],
    "94747022": ["Cooktop Elétrico New Square 60","4 Áreas de Aquecimento | Vitrocerâmico | 60cm | 220V"],
    "94748022": ["Cooktop Elétrico New Dominó Touch","2 Áreas de Aquecimento | Vitrocerâmico | 30cm | 220V"],
    "94833221": ["Coifa Tube Isla 35","Ilha | 35cm (Cilíndrica) | Design Collection | 220V | Inox"],
    "94880006": ["Micro-ondas Inox 60","25 Litros | Built-In | Acabamento Acetinado | 220V"],
    "94895209": ["Lava-Louças SB09X 45","9 Serviços | Freestanding (45cm) | Inox | 220V"],
    "94895214": ["Lava-Louças SB14X 60","14 Serviços | Freestanding | Inox | 220V"],
    "94895220": ["Lava-Louças S15X 60","15 Serviços | Freestanding | Inox | 220V"],
    "94896001": ["Adega Senses 27 Garrafas","Dual Zone | TSmart (Wi-Fi) | 38cm | Built-In 220V"],
    "94896002": ["Adega Senses 45 Garrafas","Dual Zone | TSmart (Wi-Fi) | Instalação Livre | 220V"],
    "94896201": ["Beer Center Senses 85L","TSmart (Wi-Fi) | Modo Festa (-9°C) | Compacto 38cm | 220V"],
    "94896202": ["Beer Center Senses 145L","TSmart (Wi-Fi) | Modo Festa (-9°C) | Instalação Livre | 220V"],
    "94897001": ["Refrigerador de Embutir 250L","Para Revestir | Frost Free | Inverter | 220V"],
    "95800023": ["Coifa Dritta Wall 90 Split","Parede | 90cm | Motor Externo (Split) | 220V | Inox"],
    "95800024": ["Coifa Dritta Isla 90 Split","Ilha | 90cm | Motor Split (até 12m) | 220V | Inox"],
    "95800025": ["Coifa Incasso 75 Split","Embutir | Motor Split (Silenciosa) | 75cm | 220V | Aço Inox"],
    "95800030": ["Coifa Slim Wall 90 Split","Parede | 90cm | Design Slim | Motor Split (Silenciosa) | 220V"],
    "95800031": ["Coifa Slim Isla 90 Split","Ilha | 90cm | Motor Split (Até 12m) | 220V | Inox Acetinado"],
    "95800123": ["Coifa Dritta Wall Silent Pro 90","Parede | 90cm | Motor Externo (Silenciosa) | 220V | Inox"],
    "95800124": ["Coifa Dritta Isla Silent Pro 90","Ilha | 90cm | Motor Externo (Silenciosa) | 220V | Inox"],
    "99501124": ["Banheira Freestanding Troppo","150cm | Acrílico Premium | Design Ergonômico | Linha Avvio"],
    "99606238": ["Banheira Freestanding Sunset","170cm | Acrílico Premium | Design Moderno | Linha Avvio"],
    "99606246": ["Banheira Freestanding Maya","178cm | Acrílico | Branca | Superfície Brilho | Linha Avvio"],
    "99800963": ["Banheira Freestanding Piazza","150cm | Acrílico Premium | Design Ergonômico | Linha Avvio"],
    "FAB28RDMM5": ["Refrigerador Smeg Edição Mickey Mouse","Anni 50 | 270L | Colaboração Disney | 220V | Abertura Direita"],
    "FAB28RDIT5": ["Refrigerador Bandeira Italiana","Anni 50 | 270L | Instalação Livre | 220V | Abertura Direita"],
    "FAB28RDUJ5": ["Refrigerador Bandeira Reino Unido","Anni 50 | 270L | Instalação Livre | 220V | Abertura Direita"],
    "FAB28RDPP5": ["Refrigerador Anni 50 Pale","270L | Instalação Livre | 220V | Abertura Direita"],
    "FAB28RPK5": ["Refrigerador Anni 50 Rosa","270L | Instalação Livre | 220V | Abertura Esquerda"],
    "FAB28RDRU5": ["Refrigerador Anni 50 Ferrugem","270L | Instalação Livre | 220V | Abertura Direita"],
    "CV-1BI-40-VT-2VPA": ["Adega Vetro","Built-In (Embutir) | 220V | 40 Garrafas"],
    "JC-425B220R": ["Wine Center 160 Garrafas","Built-In (Embutir) | 220V | Smart (Wi-Fi)"],
    "TR14AVDC": ["Adega 136L Professional","43 Garrafas | Dual Zone | Built-In (Embutir) | 220V"],
    "JC-145B-L": ["Wine Center 46 Garrafas","Abertura Esquerda | Built-In (Embutir) | Smart (Wi-Fi)"],
    "JC-145B-R": ["Wine Center 46 Garrafas","Abertura Direita | Built-In (Embutir) | 220V | Smart"],
    "TR08AVDA": ["Adega Professional 80 Litros","23 Garrafas | Compacta 38cm | Abertura Esquerda | 220V"],
    "TR14AVDB": ["Adega 136L Professional","43 Garrafas | Dual Zone | Abertura Esquerda | 220V"],
    "JC-115DR220": ["Dual Wine & Beer Smart","Adega 18 Garrafas + Cervejeira 58L | Built-In | 220V"],
    "TR14ARDB": ["Adega Professional de Revestir","43 Garrafas | Dual Zone | Panel Ready | 220V"]
});

(function () {
    var MOSTRAR_LINHA_TECNICA = true; // false = só o nome curto

    var estilo = document.createElement('style');
    estilo.textContent = "html body .listagem-item .uk-card-tecnico{margin:4px 0 0;font-family:'Urbane',sans-serif;font-size:12px;font-weight:300;"
        + 'line-height:1.4;letter-spacing:.2px;color:#666;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
    document.head.appendChild(estilo);

    function trocarNomes() {
        var lista = window.UK_NOMES;
        if (!lista) return;
        // Só cards que o script-interacoes já marcou: a marca é lida do nome completo, antes da troca
        document.querySelectorAll('.listagem-item[data-uk-marca]:not([data-uk-nome])').forEach(function (item) {
            item.setAttribute('data-uk-nome', '');
            var sku = item.querySelector('.produto-sku');
            var nome = item.querySelector('.nome-produto');
            var dados = sku && nome && lista[sku.textContent.trim()];
            if (!dados || !dados[0]) return;

            // A marca já aparece em cima do nome: se a descrição repetir a marca no título, ela sai
            var curto = dados[0];
            var marca = item.querySelector('.uk-card-marca:not(.vazia)');
            if (marca) {
                var texto = marca.textContent.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                curto = curto.replace(new RegExp('(^|\\s)' + texto + '(?=\\s|$)', 'i'), '$1').replace(/\s+/g, ' ').trim() || dados[0];
            }

            nome.setAttribute('title', nome.textContent.trim());
            nome.textContent = curto;

            if (MOSTRAR_LINHA_TECNICA && dados[1]) {
                var tecnico = document.createElement('div');
                tecnico.className = 'uk-card-tecnico';
                tecnico.textContent = dados[1].split('|').map(function (t) { return t.trim(); }).filter(Boolean).join(' · ');
                nome.parentNode.insertBefore(tecnico, nome.nextSibling);
            }
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
