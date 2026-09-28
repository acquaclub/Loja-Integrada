/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-interacoes.js
  Local publicação: Rodapé | Página: Todas as páginas | Tipo: JavaScript
*/
document.addEventListener("DOMContentLoaded", function() {

    // 1. INTERAÇÃO: SCROLL REVEAL (SURGIMENTO SUAVE DOS PRODUTOS)
    if ('IntersectionObserver' in window) {
        const observadorProdutos = new IntersectionObserver((entradas, observador) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('revelado');
                    observador.unobserve(entrada.target); // Mantém estático após revelar
                }
            });
        }, { threshold: 0.05 }); // Ativa assim que 5% do produto surge na tela
        document.querySelectorAll('.listagem-item').forEach(produto => {
            observadorProdutos.observe(produto);
        });
    } else {
        // Fallback de segurança para navegadores muito antigos
        document.querySelectorAll('.listagem-item').forEach(produto => {
            produto.classList.add('revelado');
        });
    }

    // 2. INTERAÇÃO: PULSO SUTIL NO CARRINHO AO ADICIONAR PRODUTO
    // Correção: "removeClass" não existe em JS puro (era sintaxe jQuery) —
    // por isso a classe nunca era removida e o pulso só disparava 1x por sessão.
    document.querySelector('body').addEventListener('minicart_state_changed', function() {
        const elementosCarrinho = document.querySelectorAll('#cabecalho .carrinho, .menu.flutuante .carrinho');

        elementosCarrinho.forEach(carrinho => {
            carrinho.classList.add('animar-carrinho');

            setTimeout(() => {
                carrinho.classList.remove('animar-carrinho'); // corrigido
            }, 500);
        });
    });

});
