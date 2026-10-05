/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-cabecalho-celular.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  O visual (linha única, menu, campo de busca) fica no CSS Avançado, seção 12, para valer já no primeiro
  desenho da página. Este código só cria a lupa e o pino e abre/fecha a busca. No computador não faz nada
  (a lupa do computador é do script-cabecalho-fixo.js).
*/
// Cabeçalho do celular em uma linha: menu (três traços finos) à esquerda, logo no centro,
// lupa e pino do mapa à direita. A lupa abre o campo de busca logo abaixo, só com uma linha fina.
(function () {
    if (window.innerWidth > 767) return;

    var LINK_MAPA = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Av. Antônio Carlos Comitre, 1253 - Parque Campolim, Sorocaba - SP, 18047-620');
    var ICONE_LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';
    var ICONE_PINO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21.5s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';

    function montar() {
        var cabecalho = document.getElementById('cabecalho');
        var linha = cabecalho && cabecalho.querySelector('.busca-mobile');
        var busca = linha && linha.querySelector('.busca');
        var form = busca && busca.querySelector('form');
        var campo = busca && busca.querySelector('input[type="text"], input[type="search"], input:not([type])');
        if (!form || !campo || linha.querySelector('.uk-cel-btn')) return;

        linha.classList.add('uk-cel-linha');
        campo.setAttribute('placeholder', 'O que você procura?');

        var lupa = document.createElement('button');
        lupa.type = 'button';
        lupa.className = 'uk-cel-btn';
        lupa.setAttribute('aria-label', 'Pesquisar');
        lupa.setAttribute('aria-expanded', 'false');
        lupa.innerHTML = ICONE_LUPA;

        var pino = document.createElement('a');
        pino.className = 'uk-cel-btn';
        pino.href = LINK_MAPA;
        pino.target = '_blank';
        pino.rel = 'noopener';
        pino.setAttribute('aria-label', 'Como chegar ao showroom');
        pino.innerHTML = ICONE_PINO;

        linha.appendChild(lupa);
        linha.appendChild(pino);

        function abrir() {
            cabecalho.classList.add('uk-cel-aberta');
            lupa.setAttribute('aria-expanded', 'true');
            campo.focus();
        }
        function fechar() {
            cabecalho.classList.remove('uk-cel-aberta');
            lupa.setAttribute('aria-expanded', 'false');
        }
        // Lupa: abre o campo; com texto digitado, pesquisa; vazio, fecha
        lupa.addEventListener('click', function () {
            if (!cabecalho.classList.contains('uk-cel-aberta')) return abrir();
            if (campo.value.trim()) {
                if (form.requestSubmit) form.requestSubmit(); else form.submit();
            } else {
                fechar();
            }
        });
        document.addEventListener('click', function (e) {
            if (!linha.contains(e.target) && !campo.value.trim()) fechar();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
})();
