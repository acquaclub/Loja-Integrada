/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-titulos-home.js
  Local publicação: Rodapé | Página: Página inicial - Home | Tipo: JavaScript
*/
// Estrutura de títulos da home para o Google (nada muda no visual):
// 1. O H1 da página deixa de ser o logo (uma imagem) e passa a ser uma frase em texto,
//    lida pelo Google e por leitores de tela, mas sem aparecer na tela.
// 2. Os títulos das vitrines ("DESTAQUES", "FOGÕES"...) viram <h2> (hoje são uma caixa <div> ou um link <a>).
(function () {
    var FRASE_H1 = 'Unikitchen: eletrodomésticos, louças e metais de alto padrão em Sorocaba';

    function trocarTag(antigo, tag) {
        var novo = document.createElement(tag);
        for (var i = 0; i < antigo.attributes.length; i++) {
            novo.setAttribute(antigo.attributes[i].name, antigo.attributes[i].value);
        }
        while (antigo.firstChild) novo.appendChild(antigo.firstChild);
        antigo.parentNode.replaceChild(novo, antigo);
        return novo;
    }

    function montarH1() {
        // 1. Logo: de <h1> para <div> (o estilo do logo é pela classe, não pela tag)
        var logo = document.querySelector('#cabecalho h1.logo');
        if (logo) trocarTag(logo, 'div');
        if (document.querySelector('.uk-h1')) return;

        var h1 = document.createElement('h1');
        h1.className = 'uk-h1';
        h1.textContent = FRASE_H1;
        h1.style.cssText = 'position:absolute !important;width:1px !important;height:1px !important;margin:-1px !important;padding:0 !important;'
            + 'overflow:hidden !important;clip:rect(0 0 0 0) !important;white-space:nowrap !important;border:0 !important';
        var corpo = document.getElementById('corpo') || document.body;
        corpo.insertBefore(h1, corpo.firstChild);
    }

    function montarTitulos() {
        // 2. Títulos das vitrines viram <h2>, com a mesma altura de linha de antes.
        //    "Destaques" é uma caixa <div>: vira o próprio <h2>.
        //    Os das categorias são um link <a>: o <h2> assume as classes e o link fica dentro dele.
        document.querySelectorAll('.listagem .titulo-categoria:not(h2)').forEach(function (titulo) {
            var altura = getComputedStyle(titulo).lineHeight;
            var h2;
            if (titulo.tagName === 'A') {
                h2 = document.createElement('h2');
                h2.className = titulo.className;
                titulo.removeAttribute('class');
                titulo.parentNode.replaceChild(h2, titulo);
                h2.appendChild(titulo);
            } else {
                h2 = trocarTag(titulo, 'h2');
            }
            h2.style.setProperty('line-height', altura, 'important');
        });
    }

    function montar() {
        montarH1();
        montarTitulos();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
    // Vitrines que o tema coloca na página depois: converte de novo ao terminar de carregar
    window.addEventListener('load', montarTitulos);
})();
