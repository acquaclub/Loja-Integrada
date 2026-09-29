/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-coluna-tipo.js
  Local publicação: Rodapé | Página: Página da categoria | Tipo: JavaScript
  Estilo: seção 9 do CSS personalizado (.uk-tipo e lista de categorias da coluna)
*/
// Coluna lateral das categorias:
// - em cima, bloco "TIPO" com as subcategorias da categoria aberta (ou as irmãs, se ela for uma subcategoria);
// - embaixo, a lista de todas as categorias principais, com a atual destacada (o CSS esconde os subníveis).
(function () {
    function caminho(url) {
        return url.replace(/[?#].*$/, '').replace(/\/+$/, '').toLowerCase();
    }

    function montarTipo() {
        var menu = document.querySelector('.coluna .menu.lateral:not(.outras)');
        if (!menu || menu.querySelector('.uk-tipo')) return;
        var arvore = menu.querySelector('.nivel-um');
        if (!arvore) return;

        // Categoria aberta: o link da árvore que aponta para a página atual
        var atual = caminho(location.pathname);
        var links = arvore.querySelectorAll('a[href]');
        var liAtual = null;
        for (var i = 0; i < links.length; i++) {
            if (caminho(links[i].pathname) === atual) {
                liAtual = links[i].closest('li');
                break;
            }
        }
        if (!liAtual || liAtual.parentElement === arvore) return;

        // Destaca, na lista de categorias principais, a categoria (ou a "mãe" da subcategoria) aberta
        var principal = liAtual;
        while (principal && principal.parentElement && !principal.parentElement.classList.contains('nivel-dois')) {
            principal = principal.parentElement.closest('li');
        }
        if (principal) principal.classList.add('uk-atual');

        // Subcategorias da categoria aberta; se não houver, as categorias do mesmo nível.
        // Categoria principal sem subcategorias (ex.: Banheiras): sem bloco "TIPO".
        var filhos = liAtual.querySelector(':scope > ul');
        if (!filhos && liAtual.parentElement.classList.contains('nivel-dois')) return;
        var lista = filhos ? filhos : liAtual.parentElement;
        var itens = lista.querySelectorAll(':scope > li > a');
        if (!itens.length) return;

        var bloco = document.createElement('div');
        bloco.className = 'uk-tipo';
        bloco.style.marginBottom = '40px';
        var html = '<p class="uk-tipo__titulo">Tipo</p><ul class="uk-tipo__lista">';
        for (var j = 0; j < itens.length; j++) {
            var ativo = caminho(itens[j].pathname) === atual ? ' class="ativo"' : '';
            html += '<li><a href="' + itens[j].getAttribute('href') + '"' + ativo + '>' + itens[j].textContent.trim() + '</a></li>';
        }
        html += '</ul>';
        bloco.innerHTML = html;

        menu.insertBefore(bloco, menu.firstChild);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montarTipo);
    } else {
        montarTipo();
    }
})();
