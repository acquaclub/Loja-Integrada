/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-interacoes.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
*/
(function () {

    // 1. SCROLL REVEAL (SURGIMENTO SUAVE DOS PRODUTOS)
    // Os produtos surgem quando entram na tela (os que já estão visíveis aparecem logo no início).
    // Nada é medido na hora de carregar: o próprio navegador avisa quem está na tela,
    // sem forçar recálculo da página (apontado pelo PageSpeed como "reflow forçado").
    // Produtos carregados depois (paginação, filtros, carrossel) também são tratados.
    if ('IntersectionObserver' in window && 'MutationObserver' in window) {
        var observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('revelado');
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.05 });

        var prepararProdutos = function () {
            document.querySelectorAll('.listagem-item:not(.revelado):not([data-revelar])').forEach(function (item) {
                item.setAttribute('data-revelar', '');
                observador.observe(item);
            });
        };

        prepararProdutos();
        document.documentElement.classList.add('js-revelar');

        var agendado = false;
        new MutationObserver(function () {
            if (agendado) return;
            agendado = true;
            requestAnimationFrame(function () {
                agendado = false;
                prepararProdutos();
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    // 2. ACESSIBILIDADE (apontada pelo PageSpeed): região principal da página
    //    e nome nos botões que só têm ícone (setas dos carrosséis e menu do celular)
    var nomearBotoes = function () {
        var corpo = document.getElementById('corpo');
        if (corpo && !corpo.getAttribute('role')) corpo.setAttribute('role', 'main');
        document.querySelectorAll('a.flex-prev:not([aria-label])').forEach(function (a) { a.setAttribute('aria-label', 'Anterior'); });
        document.querySelectorAll('a.flex-next:not([aria-label])').forEach(function (a) { a.setAttribute('aria-label', 'Próximo'); });
        document.querySelectorAll('.atalho-menu:not([aria-label])').forEach(function (a) { a.setAttribute('aria-label', 'Menu'); });
    };
    if (document.readyState === 'complete') nomearBotoes();
    else window.addEventListener('load', nomearBotoes);

    // 3. PULSO SUTIL NO CARRINHO AO ADICIONAR PRODUTO
    document.body.addEventListener('minicart_state_changed', function () {
        document.querySelectorAll('#cabecalho .carrinho, .menu.flutuante .carrinho').forEach(function (carrinho) {
            carrinho.classList.add('animar-carrinho');
            setTimeout(function () {
                carrinho.classList.remove('animar-carrinho');
            }, 500);
        });
    });

})();
