/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-whatsapp-produto.js
  Local publicação: Rodapé | Página: Página do produto | Tipo: JavaScript
*/
// Adiciona o botão "Falar no WhatsApp sobre este produto" na página do produto
// Compatível com Modo Catálogo (Sem Preço) e Modo Loja
// No celular, uma barra fixa no rodapé da tela repete o contato quando o botão sai da tela.
(function () {
    var NUMERO_WHATSAPP = '5515996100914';
    var ICONE_WHATSAPP = '<svg width="18" height="18" viewBox="0 0 448 512" aria-hidden="true" style="display:block;flex-shrink:0;"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';

    function criarBotao() {
        // Evita duplicar se o bloco rodar mais de uma vez por engano
        if (document.querySelector('.wpp-produto-cta')) return;

        // Nome do produto: título principal da página (não usa itemprop, que também existe no breadcrumb)
        var elementoNome = document.querySelector('h1.nome-produto') || document.querySelector('h1');
        var nomeProduto = elementoNome ? elementoNome.textContent.trim() : document.title.split('|')[0].trim();

        // URL limpa, sem parâmetros de campanha
        var urlProduto = window.location.origin + window.location.pathname;
        var mensagem = encodeURIComponent(
            'Olá! Tenho interesse no produto "' + nomeProduto + '" (' + urlProduto + '). Pode me passar mais informações?'
        );

        // Ponto de inserção compatível com Modo Catálogo
        var alvo = document.querySelector('.acoes-produto')
                || document.querySelector('.codigo-produto')
                || document.querySelector('.conteudo-detalhes')
                || document.querySelector('h1.nome-produto');

        if (!alvo) return;

        var botao = document.createElement('a');
        botao.href = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + mensagem;
        botao.target = '_blank';
        botao.rel = 'noopener';
        botao.className = 'wpp-produto-cta';

        // Estilo inline com !important: não depende do CSS do tema nem do CSS personalizado
        var VERDE = '#25D366', VERDE_ESCURO = '#1DA851';
        botao.style.cssText = [
            'display:inline-flex', 'align-items:center', 'justify-content:center', 'gap:10px',
            'width:auto', 'height:auto', 'min-height:0', 'float:none', 'vertical-align:middle',
            'box-sizing:border-box', 'margin:18px 0 0 0', 'padding:14px 26px',
            'background:' + VERDE, 'color:#ffffff', 'border:0', 'border-radius:0', 'box-shadow:none',
            'font-family:Urbane,sans-serif', 'font-size:13px', 'font-weight:600', 'line-height:1',
            'letter-spacing:0.5px', 'text-transform:uppercase', 'text-decoration:none',
            'white-space:normal', 'text-align:left', 'max-width:100%', 'transition:background-color 0.25s ease'
        ].map(function (regra) { return regra + ' !important'; }).join(';');
        botao.addEventListener('mouseenter', function () { botao.style.setProperty('background', VERDE_ESCURO, 'important'); });
        botao.addEventListener('mouseleave', function () { botao.style.setProperty('background', VERDE, 'important'); });

        botao.innerHTML =
            ICONE_WHATSAPP
            + '<span style="text-decoration:none !important;color:#ffffff !important;">Falar no WhatsApp sobre este produto</span>';

        alvo.parentNode.insertBefore(botao, alvo.nextSibling);
        criarBarraFixa(botao);
    }

    // Celular: barra presa no rodapé da tela com o mesmo contato. Aparece quando o botão
    // principal sai da tela para cima (a pessoa rolou para a descrição) e some quando ele volta.
    function criarBarraFixa(botao) {
        if (window.innerWidth > 767 || document.querySelector('.uk-wpp-fixo')) return;

        var estilo = document.createElement('style');
        estilo.textContent = '.uk-wpp-fixo{position:fixed;left:0;right:0;bottom:0;z-index:9990;box-sizing:border-box;'
            + 'padding:10px 16px calc(10px + env(safe-area-inset-bottom));background:rgba(255,255,255,.97);border-top:1px solid #e5e5e5;'
            + 'transform:translateY(110%);transition:transform .3s ease}'
            + '.uk-wpp-fixo.ativa{transform:none}'
            + '.uk-wpp-fixo a{display:flex;align-items:center;justify-content:center;gap:10px;height:48px;background:#25D366;color:#ffffff !important;'
            + "font-family:'Urbane',sans-serif;font-size:13px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;text-decoration:none !important}"
            + '.uk-wpp-fixo a:active{background:#1DA851}'
            + '.uk-wpp-fixo svg{display:block;flex-shrink:0;width:18px;height:18px}'
            + '@media (min-width:768px){.uk-wpp-fixo{display:none}}';
        document.head.appendChild(estilo);

        var barra = document.createElement('div');
        barra.className = 'uk-wpp-fixo';
        barra.innerHTML = '<a href="' + botao.href + '" target="_blank" rel="noopener">' + ICONE_WHATSAPP
            + '<span>Falar com um especialista</span></a>';
        document.body.appendChild(barra);

        if (!('IntersectionObserver' in window)) {
            barra.classList.add('ativa');
            return;
        }
        new IntersectionObserver(function (entradas) {
            var e = entradas[0];
            barra.classList.toggle('ativa', !e.isIntersecting && e.boundingClientRect.top < 0);
        }).observe(botao);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', criarBotao);
    } else {
        criarBotao();
    }
})();
