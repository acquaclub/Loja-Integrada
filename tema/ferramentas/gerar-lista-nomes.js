// GERADOR DA LISTA DE NOMES CURTOS (não vai para o painel; roda no Console do navegador)
// 1. Abra qualquer página da loja (a home serve).
// 2. F12 > Console > cole este código inteiro > Enter.
// 3. Ele percorre TODAS as categorias do menu (e as páginas 2, 3... de cada uma), junta todos os produtos,
//    abre por trás a página de cada um e lê o título da descrição
//    (ex.: "Torneira Versa | Tramontina" → "Torneira Versa") e a linha logo abaixo dele.
// 4. Quando aparecer "Pronto", ele diz quantas partes gerou. Para cada parte, digite no Console
//    copy(UK_LISTA_GERADA[0])  (depois [1], [2]...) e cole num Código HTML script-nomes-lista-1, -2...
//    (O copy() do Console só funciona digitado direto, não dentro do gerador.)
// Produtos já na lista instalada não são lidos de novo (mais rápido). Para reler todos
// (ex.: depois de mudar descrições), troque RELER_TODOS para true.
(async function () {
    var RELER_TODOS = false;
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
    var novos = Object.keys(links).filter(function (sku) { return !lista[sku]; });
    console.log('Produtos na loja: ' + Object.keys(links).length + ' | para ler agora: ' + novos.length);
    var semTitulo = [];
    var lidos = 0;
    async function ler(sku) {
        try {
            var pagina = await baixar(links[sku]);
            var descricao = pagina.querySelector('#descricao');
            var titulo = descricao && descricao.querySelector('h1');
            if (!titulo) { semTitulo.push(links[sku]); return; }
            var marca = pagina.querySelector('[itemprop="brand"] [itemprop="name"]');
            marca = marca ? (marca.getAttribute('content') || marca.textContent || '').trim().toLowerCase() : '';
            var nome = titulo.textContent.split('|').map(function (t) { return t.replace(/\s+/g, ' ').trim(); })
                .filter(function (t) { return t && t.toLowerCase() !== marca; }).join(' ');
            var linha = descricao.querySelector('h2');
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

    // 3. Monta o código em partes de até 14 mil caracteres
    var cabecalho = function (n, total) {
        return '/*\n'
            + '  Painel Loja Integrada > Códigos HTML\n'
            + '  Descrição: script-nomes-lista-' + n + '.js (parte ' + n + ' de ' + total + ')\n'
            + '  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript\n'
            + '  Usada por: script-nomes-cards.js\n'
            + '*/\n'
            + '// Nome curto de cada produto: código → [nome, linha técnica], tirado do título da descrição.\n'
            + '// NÃO edite à mão: gere de novo com o tema/ferramentas/gerar-lista-nomes.js (Console do navegador).\n'
            + 'window.UK_NOMES = Object.assign(window.UK_NOMES || {}, {\n';
    };
    var linhas = Object.keys(lista).map(function (sku) { return '    ' + JSON.stringify(sku) + ': ' + JSON.stringify(lista[sku]); });
    var grupos = [[]];
    var tamanho = 600;
    linhas.forEach(function (linha) {
        if (tamanho + linha.length + 2 > LIMITE_PARTE) { grupos.push([]); tamanho = 600; }
        grupos[grupos.length - 1].push(linha);
        tamanho += linha.length + 2;
    });
    window.UK_LISTA_GERADA = grupos.map(function (grupo, n) {
        return cabecalho(n + 1, grupos.length) + grupo.join(',\n') + '\n});\n';
    });

    if (semTitulo.length) console.log('Sem título na descrição (ficam com o nome normal):\n' + semTitulo.join('\n'));
    var instrucoes = window.UK_LISTA_GERADA.map(function (parte, n) {
        return '   copy(UK_LISTA_GERADA[' + n + '])  → cole no Código HTML  script-nomes-lista-' + (n + 1);
    }).join('\n');
    console.log('Pronto: ' + linhas.length + ' produtos em ' + grupos.length + ' parte(s).\n\n'
        + '>>> Para cada linha abaixo: digite o comando no Console, Enter, e cole no código indicado:\n' + instrucoes);
})();
