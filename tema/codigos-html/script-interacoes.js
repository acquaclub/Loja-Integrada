/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-interacoes.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
*/
(function () {

    // 1. SCROLL REVEAL (SURGIMENTO SUAVE DOS PRODUTOS)
    // Produtos já visíveis na tela aparecem na hora; os de baixo surgem ao rolar.
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
                if (window.innerHeight > item.getBoundingClientRect().top) {
                    item.classList.add('revelado');
                } else {
                    observador.observe(item);
                }
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

    // 2. PULSO SUTIL NO CARRINHO AO ADICIONAR PRODUTO
    document.body.addEventListener('minicart_state_changed', function () {
        document.querySelectorAll('#cabecalho .carrinho, .menu.flutuante .carrinho').forEach(function (carrinho) {
            carrinho.classList.add('animar-carrinho');
            setTimeout(function () {
                carrinho.classList.remove('animar-carrinho');
            }, 500);
        });
    });

})();
