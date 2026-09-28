/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-coluna-tipo.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  Estilo: seção 9 do CSS personalizado (.uk-tipo)
*/
// Coluna lateral das categorias: troca a árvore inteira de categorias por um bloco "TIPO"
// com só as subcategorias da categoria aberta (ou as irmãs, se ela não tiver subcategorias).
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

        // Subcategorias da categoria aberta; se não houver, as categorias do mesmo nível.
        // Categoria principal sem subcategorias (ex.: Banheiras): só esconde a árvore.
        var filhos = liAtual.querySelector(':scope > ul');
        if (!filhos && liAtual.parentElement.classList.contains('nivel-dois')) {
            arvore.style.setProperty('display', 'none', 'important');
            return;
        }
        var lista = filhos ? filhos : liAtual.parentElement;
        var itens = lista.querySelectorAll(':scope > li > a');
        if (!itens.length) return;

        var bloco = document.createElement('div');
        bloco.className = 'uk-tipo';
        var html = '<p class="uk-tipo__titulo">Tipo</p><ul class="uk-tipo__lista">';
        for (var j = 0; j < itens.length; j++) {
            var ativo = caminho(itens[j].pathname) === atual ? ' class="ativo"' : '';
            html += '<li><a href="' + itens[j].getAttribute('href') + '"' + ativo + '>' + itens[j].textContent.trim() + '</a></li>';
        }
        html += '</ul>';
        bloco.innerHTML = html;

        arvore.style.setProperty('display', 'none', 'important');
        menu.appendChild(bloco);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montarTipo);
    } else {
        montarTipo();
    }
})();
