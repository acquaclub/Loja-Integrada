// GERADOR DA LISTA DE NOMES CURTOS (não vai para o painel; roda no Console do navegador)
// 1. Abra uma página da loja com produtos (a home, uma categoria...).
// 2. F12 > Console > cole este código inteiro > Enter.
// 3. Ele abre por trás a página de cada produto listado, lê o título da descrição
//    (ex.: "Torneira Versa | Tramontina" → "Torneira Versa") e a linha logo abaixo dele,
//    e monta o código completo do script-nomes-lista.js.
// 4. Quando aparecer "Pronto", digite no Console:  copy(UK_LISTA_GERADA)  e Enter (copia o código).
//    (O copy() do Console só funciona digitado direto, não dentro do gerador.)
// 5. No painel, substitua o script-nomes-lista inteiro pelo que foi copiado (Ctrl+V).
// Rodando em outra página depois, ele soma os produtos novos aos que já estão na lista instalada.
(async function () {
    var lista = Object.assign({}, window.UK_NOMES || {});
    var links = {};
    document.querySelectorAll('.listagem-item').forEach(function (card) {
        var sku = card.querySelector('.produto-sku');
        var link = card.querySelector('a.produto-sobrepor, a.nome-produto');
        if (sku && link && sku.textContent.trim()) links[sku.textContent.trim()] = link.href;
    });
    var novos = Object.keys(links).filter(function (sku) { return !lista[sku]; });
    console.log('Produtos na página: ' + Object.keys(links).length + ' | novos para ler: ' + novos.length);

    var semTitulo = [];
    var lidos = 0;
    async function ler(sku) {
        try {
            var resposta = await fetch(links[sku], { credentials: 'same-origin' });
            var pagina = new DOMParser().parseFromString(await resposta.text(), 'text/html');
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
        }
        lidos++;
        if (lidos % 10 === 0) console.log('Lidos ' + lidos + ' de ' + novos.length + '...');
    }
    for (var i = 0; i < novos.length; i += 4) {
        await Promise.all(novos.slice(i, i + 4).map(ler));
    }

    var linhas = Object.keys(lista).map(function (sku) { return '    ' + JSON.stringify(sku) + ': ' + JSON.stringify(lista[sku]); });
    var codigo = '/*\n'
        + '  Painel Loja Integrada > Códigos HTML\n'
        + '  Descrição: script-nomes-lista.js\n'
        + '  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript\n'
        + '  Usada por: script-nomes-cards.js\n'
        + '*/\n'
        + '// Nome curto de cada produto: código → [nome, linha técnica], tirado do título da descrição.\n'
        + '// NÃO edite à mão: gere de novo com o tema/ferramentas/gerar-lista-nomes.js (Console do navegador)\n'
        + '// e substitua este código inteiro pelo que ele copiar.\n'
        + 'var UK_NOMES = {\n' + linhas.join(',\n') + '\n};\n';
    window.UK_LISTA_GERADA = codigo;
    if (semTitulo.length) console.log('Sem título na descrição (ficam com o nome normal):\n' + semTitulo.join('\n'));
    console.log('Pronto: ' + linhas.length + ' produtos na lista, ' + codigo.length + ' caracteres'
        + (codigo.length > 15000 ? ' — PASSOU DO LIMITE DE 15 MIL, me avise.' : '.')
        + '\n\n>>> Agora digite  copy(UK_LISTA_GERADA)  e aperte Enter para copiar. Depois cole no script-nomes-lista.');
})();
