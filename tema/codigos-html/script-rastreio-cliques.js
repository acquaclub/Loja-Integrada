/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-rastreio-cliques.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  Depende de: Google Tag Manager (GTM-WMXKQ2QM), que repassa os eventos ao Google Analytics 4.
*/
// Registra os cliques de contato para saber de onde eles vêm:
// WhatsApp, telefone e "Como chegar", com o lugar do site, o tipo de página e, na página de produto, o produto.
// Cada clique vira um evento no dataLayer (clique_whatsapp, clique_telefone, clique_como_chegar).
// O clique no WhatsApp também é enviado ao Pixel da Meta como "Contact", se o Pixel estiver na página.
(function () {
    if (window.ukRastreioCliques) return;
    window.ukRastreioCliques = true;

    // Lugar do site em que o link está (o primeiro que combinar vale)
    var LUGARES = [
        ['.uk-faixa-topo', 'faixa_superior'],
        ['#barraTopo', 'cabecalho_fixo'],
        ['#cabecalho', 'cabecalho'],
        ['.wpp-flutuante-home .wpp-balao', 'flutuante_home_balao'],
        ['.wpp-flutuante-home', 'flutuante_home_botao'],
        ['.uk-wpp-fixo', 'barra_fixa_produto'],
        ['.wpp-produto-cta', 'botao_produto'],
        ['.uk-beneficios', 'barra_beneficios'],
        ['.uk-rd', 'rodape'],
        ['.uk-pg, .uk-club, .uk-mc, .at-section', 'pagina_institucional'],
        ['#descricao', 'descricao_produto']
    ];

    function tipoDePagina() {
        var c = document.body.className;
        if (/pagina-inicial/.test(c) || location.pathname === '/') return 'home';
        if (/pagina-produto/.test(c)) return 'produto';
        if (/pagina-categoria/.test(c)) return 'categoria';
        if (/pagina-marca/.test(c)) return 'marca';
        if (/pagina-busca/.test(c)) return 'busca';
        if (/pagina-pagina/.test(c) || /\/pagina\//.test(location.pathname)) return 'institucional';
        return 'outra';
    }

    function lugarDo(link) {
        for (var i = 0; i < LUGARES.length; i++) {
            if (link.closest(LUGARES[i][0])) return LUGARES[i][1];
        }
        return 'outro';
    }

    function produtoAtual() {
        if (!/pagina-produto/.test(document.body.className)) return {};
        var nome = document.querySelector('.info-principal-produto .nome-produto');
        var codigo = document.querySelector('.info-principal-produto [itemprop="sku"], [itemprop="sku"]');
        return {
            produto_nome: nome ? nome.textContent.replace(/\s+/g, ' ').trim() : '',
            produto_codigo: codigo ? (codigo.getAttribute('content') || codigo.textContent || '').trim() : ''
        };
    }

    function tipoDoLink(href) {
        if (/^(https?:\/\/)?(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\b|^whatsapp:/i.test(href)) return 'clique_whatsapp';
        if (/^tel:/i.test(href)) return 'clique_telefone';
        if (/google\.[a-z.]+\/maps|maps\.google\.|goo\.gl\/maps|maps\.app\.goo\.gl/i.test(href)) return 'clique_como_chegar';
        return '';
    }

    document.addEventListener('click', function (e) {
        var link = e.target.closest && e.target.closest('a[href]');
        if (!link) return;
        var evento = tipoDoLink(link.getAttribute('href') || '');
        if (!evento) return;

        var dados = {
            event: evento,
            contato_lugar: lugarDo(link),
            tipo_pagina: tipoDePagina(),
            pagina_caminho: location.pathname
        };
        var produto = produtoAtual();
        for (var chave in produto) dados[chave] = produto[chave];

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(dados);

        if (evento === 'clique_whatsapp' && typeof window.fbq === 'function') {
            window.fbq('track', 'Contact', { content_name: dados.contato_lugar, content_category: dados.tipo_pagina });
        }
    }, true);
})();
