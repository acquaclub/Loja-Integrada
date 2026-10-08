// GERADOR DA LISTA DE NOMES CURTOS (não vai para o painel; roda no Console do navegador)
// 1. Abra qualquer página da loja (a home serve).
// 2. F12 > Console > cole este código inteiro > Enter.
// 3. Ele percorre TODAS as categorias do menu (e as páginas 2, 3... de cada uma), junta todos os produtos,
//    abre por trás a página de cada um e lê o título da descrição
//    (ex.: "Torneira Versa | Tramontina" → "Torneira Versa") e a linha logo abaixo dele.
// 4. Quando aparecer "Pronto", ele diz quantos códigos gerou. Para cada um, digite no Console
//    copy(UK_LISTA_GERADA[0])  (depois [1], [2]...) e substitua todo o Código HTML script-nomes-1, -2...
//    (O copy() do Console só funciona digitado direto, não dentro do gerador.)
// Produtos já na lista instalada não são lidos de novo (mais rápido). Para reler todos
// (ex.: depois de mudar descrições), troque RELER_TODOS para true, ou ponha só os códigos alterados em RELER.
(async function () {
    var RELER_TODOS = false;
    var RELER = []; // ex.: ['CV-1BI-40-VT-2VPA'] (produtos com a descrição corrigida, para pegar o título novo)
    var LIMITE_PARTE = 14000; // caracteres por Código HTML (o painel aceita 15 mil)

    var lista = RELER_TODOS ? {} : Object.assign({}, window.UK_NOMES || {});
    var links = {};
    var origem = location.origin;

    async function baixar(url) {
        var resposta = await fetch(url, { credentials: 'same-origin' });
        return new DOMParser().parseFromString(await resposta.text(), 'text/html');
    }
    function guardarCards(raiz) {
        raiz.querySelectorAll('.listagem-item').forEach(function (card) {
            var sku = card.querySelector('.produto-sku');
            var link = card.querySelector('a.produto-sobrepor, a.nome-produto');
            if (sku && link && sku.textContent.trim()) links[sku.textContent.trim()] = new URL(link.getAttribute('href'), origem).href;
        });
    }

    // 1. Todas as listagens: categorias e subcategorias do menu (topo e coluna), com as páginas seguintes
    var fila = [];
    var vistas = {};
    function enfileirar(href) {
        if (!href) return;
        var url = new URL(href, origem);
        if (url.origin !== origem) return;
        url.hash = '';
        if (vistas[url.href]) return;
        vistas[url.href] = true;
        fila.push(url.href);
    }
    document.querySelectorAll('#cabecalho .menu.superior a[href], .coluna .menu.lateral a[href]').forEach(function (a) {
        enfileirar(a.getAttribute('href'));
    });
    guardarCards(document);
    console.log('Lendo as categorias (' + fila.length + ' no menu, mais as páginas seguintes)...');
    for (var f = 0; f < fila.length && f < 400; f++) {
        try {
            var pagina = await baixar(fila[f]);
            guardarCards(pagina);
            pagina.querySelectorAll('.pagination a[href]').forEach(function (a) { enfileirar(a.getAttribute('href')); });
        } catch (erro) {
            console.warn('Não consegui abrir a listagem', fila[f], erro);
        }
        if ((f + 1) % 10 === 0) console.log('Listagens lidas: ' + (f + 1) + ' de ' + fila.length + ' | produtos achados: ' + Object.keys(links).length);
    }

    // 2. Página de cada produto novo: título e linha técnica da descrição
    var novos = Object.keys(links).filter(function (sku) { return !lista[sku] || RELER.indexOf(sku) >= 0; });
    console.log('Produtos na loja: ' + Object.keys(links).length + ' | para ler agora: ' + novos.length);
    var semTitulo = [];
    var modeloAntigo = [];
    var lidos = 0;
    async function ler(sku) {
        try {
            var pagina = await baixar(links[sku]);
            var descricao = pagina.querySelector('#descricao');
            // Modelo novo: h2.uk-desc-titulo + p.uk-desc-linha. Modelo antigo: h1 + h2.
            var titulo = descricao && (descricao.querySelector('.uk-desc-titulo') || descricao.querySelector('h1'));
            if (!titulo) { semTitulo.push(links[sku]); return; }
            var marca = pagina.querySelector('[itemprop="brand"] [itemprop="name"]');
            marca = marca ? (marca.getAttribute('content') || marca.textContent || '').trim().toLowerCase() : '';
            var nome = titulo.textContent.split('|').map(function (t) { return t.replace(/\s+/g, ' ').trim(); })
                .filter(function (t) { return t && t.toLowerCase() !== marca; }).join(' ');
            var linha = descricao.querySelector('.uk-desc-linha') || descricao.querySelector('h2:not(.uk-desc-titulo)');
            if (!descricao.querySelector('.uk-desc-titulo')) modeloAntigo.push(sku);
            var tecnico = linha ? linha.textContent.replace(/\s+/g, ' ').trim() : '';
            if (nome) lista[sku] = tecnico ? [nome, tecnico] : [nome];
        } catch (erro) {
            console.warn('Não consegui ler', links[sku], erro);
        } finally {
            lidos++;
            if (lidos % 20 === 0) console.log('Produtos lidos: ' + lidos + ' de ' + novos.length + '...');
        }
    }
    for (var i = 0; i < novos.length; i += 4) {
        await Promise.all(novos.slice(i, i + 4).map(ler));
    }

    // 3. Monta os códigos do painel: script-nomes-1 (lista + a troca dos nomes), script-nomes-2 (resto da lista)...
    //    Cada um com até 14 mil caracteres; se a loja crescer, ele cria o script-nomes-3 sozinho.
    var LOGICA = "(function () {\n    var MOSTRAR_LINHA_TECNICA = true; // false = só o nome curto\n\n    var estilo = document.createElement('style');\n    estilo.textContent = \"html body .listagem-item .uk-card-tecnico{margin:4px 0 0;font-family:'Urbane',sans-serif;font-size:12px;font-weight:300;\"\n        + 'line-height:1.4;letter-spacing:.2px;color:#666;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';\n    document.head.appendChild(estilo);\n\n    function trocarNomes() {\n        var lista = window.UK_NOMES;\n        if (!lista) return;\n        // Só cards que o script-interacoes já marcou: a marca é lida do nome completo, antes da troca\n        document.querySelectorAll('.listagem-item[data-uk-marca]:not([data-uk-nome])').forEach(function (item) {\n            item.setAttribute('data-uk-nome', '');\n            var sku = item.querySelector('.produto-sku');\n            var nome = item.querySelector('.nome-produto');\n            var dados = sku && nome && lista[sku.textContent.trim()];\n            if (!dados || !dados[0]) return;\n\n            // A marca já aparece em cima do nome: se a descrição repetir a marca no título, ela sai\n            var curto = dados[0];\n            var marca = item.querySelector('.uk-card-marca:not(.vazia)');\n            if (marca) {\n                var texto = marca.textContent.trim().replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');\n                curto = curto.replace(new RegExp('(^|\\\\s)' + texto + '(?=\\\\s|$)', 'i'), '$1').replace(/\\s+/g, ' ').trim() || dados[0];\n            }\n\n            nome.setAttribute('title', nome.textContent.trim());\n            nome.textContent = curto;\n\n            if (MOSTRAR_LINHA_TECNICA && dados[1]) {\n                var tecnico = document.createElement('div');\n                tecnico.className = 'uk-card-tecnico';\n                tecnico.textContent = dados[1].split('|').map(function (t) { return t.trim(); }).filter(Boolean).join(' · ');\n                nome.parentNode.insertBefore(tecnico, nome.nextSibling);\n            }\n        });\n    }\n\n    var agendado = false;\n    function agendar() {\n        if (agendado) return;\n        agendado = true;\n        requestAnimationFrame(function () {\n            agendado = false;\n            trocarNomes();\n        });\n    }\n    agendar();\n    if ('MutationObserver' in window) {\n        new MutationObserver(agendar).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-uk-marca'] });\n    }\n})();\n";
    var cabecalho = function (n, total) {
        return '/*\n'
            + '  Painel Loja Integrada > Códigos HTML\n'
            + '  Descrição: script-nomes-' + n + '.js (código ' + n + ' de ' + total + (n === 1 ? ': troca dos nomes + parte da lista' : ': parte da lista') + ')\n'
            + '  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript\n'
            + (n === 1 ? '  Depende de: script-interacoes.js (marca e código nos cards).\n' : '  Usada por: script-nomes-1.js (a troca dos nomes)\n')
            + '*/\n'
            + '// Lista: código → [nome, linha técnica], tirada do título da descrição. Produto fora da lista mantém o nome normal.\n'
            + '// Gerada pelo tema/ferramentas/gerar-lista-nomes.js (Console do navegador).\n'
            + 'window.UK_NOMES = Object.assign(window.UK_NOMES || {}, {\n';
    };
    var linhas = Object.keys(lista).map(function (sku) { return '    ' + JSON.stringify(sku) + ': ' + JSON.stringify(lista[sku]); });
    var grupos = [[]];
    var tamanho = 700 + LOGICA.length; // o código 1 leva também a troca dos nomes
    linhas.forEach(function (linha) {
        if (tamanho + linha.length + 2 > LIMITE_PARTE) { grupos.push([]); tamanho = 700; }
        grupos[grupos.length - 1].push(linha);
        tamanho += linha.length + 2;
    });
    window.UK_LISTA_GERADA = grupos.map(function (grupo, n) {
        return cabecalho(n + 1, grupos.length) + grupo.join(',\n') + '\n});\n' + (n === 0 ? '\n' + LOGICA : '');
    });

    if (modeloAntigo.length) console.log('Descrição ainda no modelo antigo (' + modeloAntigo.length + ', entre os lidos agora; com RELER_TODOS = true, a loja toda):\n' + modeloAntigo.join('\n'));
    if (semTitulo.length) console.log('Sem título na descrição (ficam com o nome normal):\n' + semTitulo.join('\n'));
    var instrucoes = window.UK_LISTA_GERADA.map(function (parte, n) {
        return '   copy(UK_LISTA_GERADA[' + n + '])  → substitua todo o Código HTML  script-nomes-' + (n + 1);
    }).join('\n');
    console.log('Pronto: ' + linhas.length + ' produtos em ' + grupos.length + ' código(s).\n\n'
        + '>>> Para cada linha abaixo: digite o comando no Console, Enter, e cole no código indicado:\n' + instrucoes);
})();
