/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-descricao-titulo.js
  Local publicação: Rodapé | Página: Página do produto | Tipo: JavaScript
  Estilo: seção 32 do CSS personalizado
*/
// Troca o <h1> de dentro da descrição por <h2>, para a página ter um único título principal (o nome do produto)
(function () {
    function converter() {
        var titulos = document.querySelectorAll('#descricao h1');
        for (var i = 0; i < titulos.length; i++) {
            var h1 = titulos[i];
            var h2 = document.createElement('h2');
            for (var j = 0; j < h1.attributes.length; j++) {
                h2.setAttribute(h1.attributes[j].name, h1.attributes[j].value);
            }
            h2.classList.add('uk-desc-titulo');
            h2.innerHTML = h1.innerHTML;
            h1.parentNode.replaceChild(h2, h1);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', converter);
    } else {
        converter();
    }
})();
