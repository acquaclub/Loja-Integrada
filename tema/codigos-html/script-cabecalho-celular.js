/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-cabecalho-celular.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  Traz o próprio estilo (não depende do CSS Avançado). No computador não faz nada
  (a lupa do computador é do script-cabecalho-fixo.js).
*/
// Cabeçalho do celular em uma linha: menu (três traços finos) à esquerda, logo no centro,
// lupa e pino do mapa à direita. A lupa abre o campo de busca logo abaixo, só com uma linha fina.
(function () {
    if (window.innerWidth > 767) return;

    var LINK_MAPA = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Av. Antônio Carlos Comitre, 1253 - Parque Campolim, Sorocaba - SP, 18047-620');
    var ICONE_LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';
    var ICONE_PINO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21.5s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';

    var C = 'html body #cabecalho';
    var ESTILO = '@media (max-width: 767px){'
        // Logo: o tema deixa a imagem "solta" (absoluta, com margem negativa) e ela sai do centro
        + C + ' .logo img{position:static !important;margin:0 auto !important}'
        // A caixa do logo vem do tema com 80px de altura para uma imagem de 32px: fica do tamanho do logo,
        // e a linha do logo passa a ter os mesmos 60px da linha dos ícones (14 + 32 + 14), com o logo no meio deles
        + C + ' .logo,' + C + ' .logo a{height:auto !important;min-height:0 !important;line-height:0 !important}'
        + C + ' > .conteiner > .row-fluid > .span3{padding-top:14px !important;padding-bottom:14px !important}'
        // A linha da busca sobe para a mesma altura do logo
        + C + ' > .conteiner{position:relative !important;transition:padding-bottom .3s ease}'
        + C + ' .conteudo-topo,' + C + ' .conteudo-topo .inferior{position:static !important}'
        + C + ' .busca-mobile.uk-cel-linha{position:absolute !important;top:0;left:8px;right:8px;width:auto !important;height:60px !important;'
        + 'margin:0 !important;padding:0 !important;display:flex !important;align-items:center;gap:0 !important;pointer-events:none;background:transparent !important}'
        + C + ' .uk-cel-linha > *{pointer-events:auto}'
        // Menu: três traços finos no lugar do quadrado preto
        + C + ' .uk-cel-linha .atalho-menu{display:flex !important;align-items:center;justify-content:center;flex:0 0 40px !important;width:40px !important;height:40px !important;'
        + 'margin:0 auto 0 0 !important;padding:0 !important;background:transparent !important;border:0 !important;box-shadow:none !important;font-size:0 !important;line-height:0 !important}'
        + C + ' .uk-cel-linha .atalho-menu::before{content:"" !important;display:block;width:20px;height:1.5px;margin:0;background:#1a1a1a;box-shadow:0 -6px 0 #1a1a1a,0 6px 0 #1a1a1a}'
        // Campo de busca: fechado por padrão; abre embaixo do logo como um campo claro, com lupa dourada e texto de exemplo
        + C + ' .uk-cel-linha .busca{position:absolute !important;top:64px;left:12px;right:12px;width:auto !important;height:0 !important;margin:0 !important;padding:0 !important;'
        + 'border:1px solid transparent !important;border-radius:0 !important;background:#f7f7f5 no-repeat 12px center / 18px 18px !important;box-shadow:none !important;opacity:0;overflow:hidden !important;'
        + 'transition:height .3s ease,opacity .3s ease,border-color .3s ease !important}'
        + C + '.uk-cel-aberta .uk-cel-linha .busca{height:44px !important;opacity:1;border-color:#e6e3dc !important;'
        + 'background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23c49a45\' stroke-width=\'1.6\' stroke-linecap=\'round\'%3E%3Ccircle cx=\'10.5\' cy=\'10.5\' r=\'6.5\'/%3E%3Cpath d=\'M15.5 15.5L21 21\'/%3E%3C/svg%3E") !important}'
        + C + '.uk-cel-aberta .uk-cel-linha .busca:focus-within{border-color:#c49a45 !important}'
        + C + '.uk-cel-aberta > .conteiner{padding-bottom:60px !important}'
        + C + ' .uk-cel-linha .busca form{height:100% !important;margin:0 !important}'
        + C + ' .uk-cel-linha .busca input{width:100% !important;height:100% !important;margin:0 !important;padding:0 12px 0 40px !important;border:0 !important;background:transparent !important;'
        + "box-shadow:none !important;outline:none !important;font-family:'Urbane',sans-serif !important;font-size:16px !important;color:#1a1a1a !important}"
        + C + ' .uk-cel-linha .busca input::placeholder{color:#8a8a8a !important;opacity:1}'
        + C + ' .uk-cel-linha .busca button,' + C + ' .uk-cel-linha .uk-lupa-btn{display:none !important}'
        + C + ' .uk-cel-btn{display:inline-flex !important;align-items:center;justify-content:center;width:40px;height:40px;margin:0;padding:0;border:0;background:none;color:#1a1a1a !important}'
        + C + ' .uk-cel-btn svg{display:block;width:22px;height:22px}'
        + '}';

    function montar() {
        var cabecalho = document.getElementById('cabecalho');
        var linha = cabecalho && cabecalho.querySelector('.busca-mobile');
        var busca = linha && linha.querySelector('.busca');
        var form = busca && busca.querySelector('form');
        var campo = busca && busca.querySelector('input[type="text"], input[type="search"], input:not([type])');
        if (!form || !campo || linha.querySelector('.uk-cel-btn')) return;

        var estilo = document.createElement('style');
        estilo.textContent = ESTILO;
        document.head.appendChild(estilo);
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
