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
    "13318": ["Dosador de Sabão Redondo 330 ml","Aço Escovado | Abastecimento por Cima | Sobrepor"],
    "13320": ["Dosador de Sabão Quadrado 330 ml","Aço Escovado | Abastecimento por Cima | Sobrepor"],
    "13546": ["Lixeira Quadrada 10 Litros","Plástico e Inox Escovado | Sobrepor"],
    "14609": ["Cuba Simples Box 16 x 41 cm","Embutir ou Sobrepor | Inox 304 | Válvula 4,5\""],
    "15190": ["Cuba Simples Box 68 x 41 cm","Embutir ou Sobrepor | Inox 304 | Válvula 4,5\""],
    "15192": ["Cuba Simples Box 54 x 41 cm","Embutir ou Sobrepor | Inox 304 | Válvula 4,5\""],
    "15194": ["Cuba Simples Box 45 x 41 cm","Embutir ou Sobrepor | Inox 304 | Válvula 4,5\""],
    "15196": ["Cuba Simples Box 36 x 41 cm","Embutir ou Sobrepor | Inox 304 | Válvula 4,5\""],
    "15198": ["Cuba Dupla Box 78 x 45 cm","Embutir ou Sobrepor | Inox 304 | Válvula 4,5\""],
    "15815": ["Triturador Turbo Elite 125","1.25 HP | 1.400ml | Bioshield | Torque Master"],
    "16060": ["Cuba 1 e Meia Box Center 86 x 51 cm","Sobrepor ou Flushmount | Inox 304 | Válvula 4,5\""],
    "16168": ["Lixeira Redonda 5L","Inox Escovado | De Embutir | Praticidade"],
    "16590": ["Misturador Active Plus Pull Out","Black Matte | Ducha Extensível | Monocomando"],
    "16592": ["Dosador de Sabão 300 ml","Black Matte | Abastecimento por Cima | Embutir ou Sobrepor"],
    "17986": ["Coifa de Parede New Format 90 cm","870 m³/h | Filtro Baffle | 65 dB | 220V"],
    "17988": ["Coifa de Ilha New Format 90 cm","870 m³/h | Filtro Baffle | 65 dB | 220V"],
    "18095": ["Misturador Eos Neo","Aço Inox 304 Maciço | Bica Extensível em J | Acabamento Fosco"],
    "18097": ["Misturador Atlas Neo","Aço Inox 304 Maciço | Bica Extensível | Acabamento Fosco"],
    "18099": ["Misturador Leda Neo","Aço Inox 304 Maciço | Bica Extensível | Acabamento Fosco"],
    "18629": ["Cuba Simples Maris Quiet 82 x 42 cm","Embutir | Inox 304 | Válvula 7\""],
    "94731": ["Cooktop a Gás Penta Glass Flat 5 Queimadores 90 cm","Vidro Temperado | Superautomático | Bivolt"],
    "947093": ["Cooktop a Gás Penta Side Plus 5 Queimadores 90 cm","Vidro Temperado | Superautomático | Bivolt"],
    "947311": ["Cooktop a Gás Penta Glass Full 5 Queimadores 90 cm","Vidro Temperado | Superautomático | Bivolt"],
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
    "94708201": ["Cooktop a Gás Penta TRI 5 Queimadores 70 cm","Vidro Temperado Preto | Superautomático | Bivolt"],
    "94727104": ["Cooktop a Gás Penta Inox Flat 5 Queimadores 70 cm","Mesa Inox | Superautomático | Bivolt"],
    "94728104": ["Cooktop a Gás Penta Inox Flat 5 Queimadores 90 cm","Mesa Inox | Superautomático | Bivolt"],
    "94728174": ["Cooktop a Gás Penta Inox Full 5 Queimadores 90 cm","Mesa Inox 304 | Superautomático | Bivolt"],
    "94730104": ["Cooktop a Gás Penta Glass Flat 5 Queimadores 70 cm","Vidro Temperado Preto | Superautomático | Bivolt"],
    "94747022": ["Cooktop Elétrico Square Touch 4 Áreas 60 cm","Vitrocerâmica | 220V"],
    "94748022": ["Dominó Elétrico Touch 2EV 30 cm","2 Áreas | Vitrocerâmica | 220V"],
    "94833221": ["Coifa de Ilha Tube 35 cm","580 m³/h | Filtro Metálico + Carvão | 220V"],
    "94880006": ["Micro-ondas Inox 60","25 Litros | Built-In | Acabamento Acetinado | 220V"],
    "94895209": ["Lava-Louças SB09X 45","9 Serviços | Freestanding (45cm) | Inox | 220V"],
    "94895214": ["Lava-Louças SB14X 60","14 Serviços | Freestanding | Inox | 220V"],
    "94895220": ["Lava-Louças S15X 60","15 Serviços | Freestanding | Inox | 220V"],
    "94896001": ["Adega Senses 27 Garrafas Dual Zone","Embutir | 38 cm | 5 a 20 °C | 220V"],
    "94896002": ["Adega Senses 45 Garrafas Dual Zone","Embutir | 60 cm | 5 a 20 °C | 220V"],
    "94896201": ["Beer Center Senses 85 Litros","Embutir | 38 cm | -5 a 10 °C | 220V"],
    "94896202": ["Beer Center Senses 145 Litros","Embutir | 60 cm | -5 a 10 °C | 220V"],
    "94897001": ["Refrigerador de Embutir 250L","Para Revestir | Frost Free | Inverter | 220V"],
    "95800023": ["Coifa de Parede Dritta 90 cm","845 m³/h | Filtros Metálicos | 220V"],
    "95800024": ["Coifa de Ilha Dritta T smart 90 cm","845 m³/h | Filtros Metálicos | 220V"],
    "95800025": ["Coifa de Embutir Incasso 75 cm","830 m³/h | Filtros Metálicos | 220V"],
    "95800030": ["Coifa de Parede Slim T smart 90 cm","845 m³/h | Filtros Metálicos | 220V"],
    "95800031": ["Coifa de Ilha Slim T smart 90 cm","845 m³/h | Filtros Metálicos | 220V"],
    "95800123": ["Coifa de Parede Dritta Silent Pro 90 cm","950 m³/h | Filtros Metálicos | 220V"],
    "95800124": ["Coifa de Ilha Dritta Silent Pro 90 cm","950 m³/h | Filtros Metálicos | 220V"],
    "99501124": ["Banheira de Imersão Troppo 150 cm","Acrílico | 280 Litros | Freestanding"],
    "99606238": ["Banheira de Imersão Sunset 170 cm","Acrílico Brilho | 254 Litros | Freestanding"],
    "99606246": ["Banheira de Imersão Maya 178 cm","Acrílico | 254 Litros | Freestanding"],
    "99800963": ["Banheira de Imersão Piazza 150 cm","Acrílico | 210 Litros | Freestanding"],
    "FAB28RDMM5": ["Refrigerador Smeg Edição Mickey Mouse","Anni 50 | 270L | Colaboração Disney | 220V | Abertura Direita"],
    "FAB28RDIT5": ["Refrigerador Bandeira Italiana","Anni 50 | 270L | Instalação Livre | 220V | Abertura Direita"],
    "FAB28RDUJ5": ["Refrigerador Bandeira Reino Unido","Anni 50 | 270L | Instalação Livre | 220V | Abertura Direita"],
    "FAB28RDPP5": ["Refrigerador Anni 50 Pale","270L | Instalação Livre | 220V | Abertura Direita"],
    "FAB28RPK5": ["Refrigerador Anni 50 Rosa","270L | Instalação Livre | 220V | Abertura Esquerda"],
    "FAB28RDRU5": ["Refrigerador Anni 50 Ferrugem","270L | Instalação Livre | 220V | Abertura Direita"],
    "CV-1BI-40-VT-2VPA": ["Adega Vetro 40 Garrafas","Embutir | 60 cm | 5 a 20 °C | 220V"],
    "JC-425B220R": ["Adega Wine Center 160 Garrafas Dual Zone","Embutir | 60 cm | 5 a 20 °C | 220V"],
    "TR14AVDC": ["Adega Professional 43 Garrafas Dual Zone","Embutir ou Piso | 60 cm | 5 a 20 °C | Porta Direita | 220V"],
    "JC-145B-L": ["Adega Wine Center 46 Garrafas Dual Zone","Embutir | 60 cm | 5 a 20 °C | Porta Esquerda | 127V ou 220V"],
    "JC-145B-R": ["Adega Wine Center 46 Garrafas Dual Zone","Embutir | 60 cm | 5 a 20 °C | Porta Direita | 127V ou 220V"],
    "TR08AVDA": ["Adega Professional 23 Garrafas Dual Zone","Embutir ou Piso | 38 cm | 5 a 20 °C | 220V"],
    "TR14AVDB": ["Adega Professional 43 Garrafas Dual Zone","Embutir ou Piso | 60 cm | 5 a 20 °C | Porta Esquerda | 220V"],
    "JC-115DR220": ["Adega e Cervejeira Dual Wine & Beer","18 Garrafas + 58 L | Embutir | 60 cm | 220V"],
    "TR14ARDB": ["Adega Professional de Revestir","43 Garrafas | Dual Zone | Panel Ready | 220V"],
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
