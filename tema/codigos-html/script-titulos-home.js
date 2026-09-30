/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-titulos-home.js
  Local publicação: Rodapé | Página: Página inicial - Home | Tipo: JavaScript
*/
// Estrutura de títulos da home para o Google (nada muda no visual):
// 1. O H1 da página deixa de ser o logo (uma imagem) e passa a ser uma frase em texto,
//    lida pelo Google e por leitores de tela, mas sem aparecer na tela.
// 2. Os títulos das vitrines ("DESTAQUES", "FOGÕES"...) viram <h2> (hoje são caixas <div> comuns).
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

    function montar() {
        if (document.querySelector('.uk-h1')) return;

        // 1. Logo: de <h1> para <div> (o estilo do logo é pela classe, não pela tag)
        var logo = document.querySelector('#cabecalho h1.logo');
        if (logo) trocarTag(logo, 'div');

        var h1 = document.createElement('h1');
        h1.className = 'uk-h1';
        h1.textContent = FRASE_H1;
        h1.style.cssText = 'position:absolute !important;width:1px !important;height:1px !important;margin:-1px !important;padding:0 !important;'
            + 'overflow:hidden !important;clip:rect(0 0 0 0) !important;white-space:nowrap !important;border:0 !important';
        var corpo = document.getElementById('corpo') || document.body;
        corpo.insertBefore(h1, corpo.firstChild);

        // 2. Títulos das vitrines: de <div> para <h2>, com a mesma altura de linha de antes
        document.querySelectorAll('.listagem div.titulo-categoria').forEach(function (div) {
            var altura = getComputedStyle(div).lineHeight;
            var h2 = trocarTag(div, 'h2');
            h2.style.setProperty('line-height', altura, 'important');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
})();
