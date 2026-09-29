/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-ver-todos.js
  Local publicação: Rodapé | Página: Página inicial - Home | Tipo: JavaScript
  Traz o próprio estilo (não depende do CSS Avançado).
*/
// "Ver todos →" ao lado do título de cada vitrine de categoria da home (Churrasqueiras, Coifas…).
// O link é o da própria categoria: pego do título, se ele já tiver link, ou do menu de categorias.
// Vitrines sem categoria (ex.: Destaques) ficam sem o link.
(function () {
    var SETA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M14 6l6 6-6 6"/></svg>';

    var ESTILO =
        'html body .listagem .titulo-categoria.uk-com-ver-todos{position:relative !important}'
        + 'html body .uk-ver-todos{position:absolute;top:0;right:0;display:inline-flex;align-items:center;gap:8px;'
        + "font-family:'Urbane',sans-serif !important;font-size:11px !important;font-weight:600 !important;line-height:20px !important;"
        + 'letter-spacing:2px !important;text-transform:uppercase !important;color:#666666 !important;text-decoration:none !important;transition:color .2s ease}'
        + 'html body .uk-ver-todos:hover{color:#c49a45 !important}'
        + 'html body .uk-ver-todos svg{display:block;width:16px;height:16px;transition:transform .2s ease}'
        + 'html body .uk-ver-todos:hover svg{transform:translateX(3px)}'
        // Título que já é link: o "Ver todos" fica logo abaixo do traço dourado
        + 'html body .uk-ver-todos.abaixo{position:static;display:flex;justify-content:center;margin:-16px 0 24px}'
        // Celular: título, traço dourado e, embaixo, o "Ver todos"
        + '@media (max-width:767px){html body .listagem .titulo-categoria.uk-com-ver-todos{display:flex !important;flex-direction:column;align-items:center}'
        + 'html body .listagem .titulo-categoria.uk-com-ver-todos::after{order:1}'
        + 'html body .uk-ver-todos{order:2;position:static;display:flex;justify-content:center;margin:14px 0 0}'
        + 'html body .uk-ver-todos.abaixo{margin:-16px 0 20px}}';

    function normalizar(texto) {
        return (texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function linkValido(a) {
        var href = a && a.getAttribute('href');
        return href && href.charAt(0) !== '#' && href.indexOf('javascript') !== 0 ? a.href : null;
    }

    function montar() {
        var titulos = document.querySelectorAll('.listagem .titulo-categoria');
        if (!titulos.length || document.querySelector('.uk-ver-todos')) return;

        // Categorias do menu: nome → endereço
        var categorias = {};
        document.querySelectorAll('#cabecalho .menu a[href], .menu.superior a[href]').forEach(function (a) {
            var nome = normalizar(a.textContent);
            var url = linkValido(a);
            if (nome && url && !categorias[nome]) categorias[nome] = url;
        });

        var estilo = document.createElement('style');
        estilo.textContent = ESTILO;
        document.head.appendChild(estilo);

        titulos.forEach(function (titulo) {
            var linkDoTitulo = titulo.querySelector('a[href]') || titulo.closest('a[href]');
            var url = linkValido(linkDoTitulo) || categorias[normalizar(titulo.textContent)];
            if (!url) return;

            var link = document.createElement('a');
            link.className = 'uk-ver-todos';
            link.href = url;
            link.innerHTML = '<span>Ver todos</span>' + SETA;
            link.setAttribute('aria-label', 'Ver todos: ' + titulo.textContent.trim());

            if (linkDoTitulo) {
                // Não dá para colocar um link dentro de outro: vai logo abaixo do título
                link.classList.add('abaixo');
                var bloco = titulo.closest('a[href]') || titulo;
                bloco.parentNode.insertBefore(link, bloco.nextSibling);
            } else {
                titulo.classList.add('uk-com-ver-todos');
                titulo.appendChild(link);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
})();
