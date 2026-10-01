/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-cabecalho-fixo.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  Estilo: seções 5 (faixa superior) e 6 (cabeçalho fixo) do CSS personalizado; a troca de frases traz o próprio estilo
*/
// Cabeçalhos: faixa superior (frases que se alternam + telefone e WhatsApp), busca com lupa e ajustes do cabeçalho fixo
(function () {
    var NUMERO_WHATSAPP = '5515996100914';
    var ICONE_WHATSAPP = '<svg width="20" height="20" viewBox="0 0 448 512" aria-hidden="true"><path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';

    function criarLinkWhatsApp() {
        var wpp = document.createElement('a');
        wpp.className = 'uk-topo-wpp';
        wpp.href = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent('Olá! Vim pelo site da Unikitchen e gostaria de tirar uma dúvida.');
        wpp.target = '_blank';
        wpp.rel = 'noopener';
        wpp.innerHTML = ICONE_WHATSAPP + '<span>Fale no WhatsApp</span>';
        return wpp;
    }

    // Faixa superior acima do cabeçalho principal (só aparece no computador: seção 5 do CSS).
    // À esquerda, frases que se alternam; à direita, telefone e WhatsApp fixos.
    // Para trocar o texto, edite a lista FRASES. O "|" vira o tracinho separador.
    var FRASES = [
        'Showroom Sorocaba: seg a sex 9h–18h | sáb 9h–13h',
        'Showroom em Sorocaba | <a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Av. Antônio Carlos Comitre, 1253 - Parque Campolim, Sorocaba - SP, 18047-620') + '" target="_blank" rel="noopener">Como chegar</a>',
        'Atendimento exclusivo para <a href="/pagina/parceiros.html">arquitetos e especificadores</a>'
    ];
    var TEMPO_POR_FRASE = 5000; // milissegundos

    // Estilo só da troca de frases (o restante da faixa vem do CSS Avançado)
    var ESTILO_FRASES =
        '@media (min-width: 980px){'
        + 'html body .uk-faixa-topo__frases{position:relative;flex:1 1 auto;align-self:stretch;overflow:hidden}'
        + 'html body .uk-faixa-topo__frase{position:absolute;top:0;bottom:0;left:0;display:flex;align-items:center;gap:22px;white-space:nowrap;'
        + 'opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .6s ease,transform .6s ease}'
        + 'html body .uk-faixa-topo__frase.ativa{opacity:1;transform:none;pointer-events:auto}'
        + 'html body .uk-faixa-topo .uk-faixa-topo__frase a{text-decoration:underline !important;text-decoration-color:rgba(255,255,255,.4) !important;text-underline-offset:3px}'
        + 'html body .uk-faixa-topo .uk-faixa-topo__frase a:hover{text-decoration-color:#c49a45 !important}'
        + '}'
        + '@media (prefers-reduced-motion: reduce){html body .uk-faixa-topo__frase{transition:none;transform:none}}';

    function montarFaixaSuperior() {
        if (document.querySelector('.uk-faixa-topo')) return;
        var cabecalho = document.getElementById('cabecalho');
        if (!cabecalho) return;

        var estilo = document.createElement('style');
        estilo.textContent = ESTILO_FRASES;
        document.head.appendChild(estilo);

        var html = '<div class="uk-faixa-topo__conteudo"><div class="uk-faixa-topo__frases" aria-live="polite">';
        for (var i = 0; i < FRASES.length; i++) {
            html += '<div class="uk-faixa-topo__frase' + (i === 0 ? ' ativa' : '') + '"' + (i === 0 ? '' : ' aria-hidden="true"') + '>'
                + '<span>' + FRASES[i].split(' | ').join('</span><span class="uk-faixa-topo__sep"></span><span>') + '</span></div>';
        }
        html += '</div><div class="uk-faixa-topo__grupo">'
            + '<a href="tel:+551532173499">(15) 3217-3499</a>'
            + '<span class="uk-faixa-topo__sep"></span>'
            + '</div></div>';

        var faixa = document.createElement('div');
        faixa.className = 'uk-faixa-topo';
        faixa.innerHTML = html;
        faixa.querySelector('.uk-faixa-topo__grupo').appendChild(criarLinkWhatsApp());
        document.body.insertBefore(faixa, document.body.firstChild);

        // Troca de frase; pausa com o mouse em cima e quando a aba não está visível
        var frases = faixa.querySelectorAll('.uk-faixa-topo__frase');
        if (frases.length < 2) return;
        var atual = 0, pausado = false;
        faixa.addEventListener('mouseenter', function () { pausado = true; });
        faixa.addEventListener('mouseleave', function () { pausado = false; });
        setInterval(function () {
            if (pausado || document.hidden) return;
            frases[atual].classList.remove('ativa');
            frases[atual].setAttribute('aria-hidden', 'true');
            atual = (atual + 1) % frases.length;
            frases[atual].classList.add('ativa');
            frases[atual].removeAttribute('aria-hidden');
        }, TEMPO_POR_FRASE);
    }

    // Cabeçalho fixo (#barraTopo): logo no lugar do nome em texto e WhatsApp no lugar dos contatos
    function montarCabecalhoFixo() {
        var barra = document.getElementById('barraTopo');
        if (!barra || barra.getAttribute('data-uk-montado')) return;
        barra.setAttribute('data-uk-montado', '1');

        var logo = document.querySelector('#cabecalho .logo img');
        var link = barra.querySelector('.titulo a');
        if (logo && link) {
            var img = document.createElement('img');
            img.src = logo.currentSrc || logo.getAttribute('src');
            img.alt = 'Unikitchen';
            // Tamanho inline: o logo nunca fica gigante, mesmo antes do CSS carregar
            img.style.cssText = 'display:block !important;width:150px !important;height:30px !important;max-width:none !important;object-fit:cover !important;object-position:center !important;';
            link.textContent = '';
            link.appendChild(img);
            var titulo = link.closest('.titulo');
            if (titulo) titulo.style.cssText = 'margin:0 !important;line-height:0 !important;';
        }

        var contatos = barra.querySelector('.canais-contato');
        if (contatos) {
            contatos.style.setProperty('display', 'none', 'important');
            var wpp = criarLinkWhatsApp();
            wpp.style.cssText = 'display:inline-flex !important;align-items:center !important;gap:8px !important;white-space:nowrap !important;text-decoration:none !important;';
            contatos.parentNode.appendChild(wpp);
        }
    }

    // Busca (só no computador), no cabeçalho principal e no cabeçalho fixo que aparece ao rolar:
    // no lugar do campo, uma lupa fina e um pino de mapa. Clicar na lupa abre o campo;
    // Enter ou a lupa pesquisam; Esc ou clicar fora (com o campo vazio) fecham.
    var LINK_MAPA = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Av. Antônio Carlos Comitre, 1253 - Parque Campolim, Sorocaba - SP, 18047-620');
    var ICONE_LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';
    var ICONE_PINO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21.5s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
    var R = ['html body #cabecalho', 'html body #barraTopo'];
    function sel(sufixo) {
        return R.map(function (r) { return r + sufixo; }).join(',');
    }
    var ESTILO_LUPA =
        '@media (min-width: 980px){'
        + sel(' .uk-lupa-linha') + '{display:flex !important;align-items:center;justify-content:flex-end;gap:14px;width:100% !important;margin:0 !important}'
        + sel(' .uk-lupa-linha::before') + ',' + sel(' .uk-lupa-linha::after') + '{display:none !important}'
        + sel(' .uk-lupa-linha .busca') + '{flex:0 1 auto !important;float:none !important;width:420px !important;max-width:0 !important;margin:0 !important;padding:0 !important;opacity:0;'
        + 'border:0 !important;border-bottom:1px solid #1a1a1a !important;height:36px !important;background:transparent !important;overflow:hidden !important;'
        + 'transition:max-width .45s ease,opacity .3s ease !important}'
        + 'html body #cabecalho.uk-busca-aberta .uk-lupa-linha .busca,html body #barraTopo.uk-busca-aberta .uk-lupa-linha .busca{max-width:420px !important;opacity:1}'
        + sel(' .uk-lupa-linha .busca input') + '{padding:0 4px !important;font-size:14px !important;outline:none !important;box-shadow:none !important}'
        + sel(' .uk-lupa-linha .busca button') + ',' + sel(' .uk-lupa-linha .busca .botao-busca') + '{display:none !important}'
        + sel(' .uk-lupa-btn') + '{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;padding:0;margin:0;'
        + 'border:0;background:none;color:#1a1a1a !important;cursor:pointer;transition:color .2s ease}'
        + sel(' .uk-lupa-btn:hover') + '{color:#c49a45 !important}'
        + sel(' .uk-lupa-btn svg') + '{width:22px;height:22px}'
        // No cabeçalho fixo, a coluna da busca deixa de ficar centralizada e encosta à direita, antes do WhatsApp
        + 'html body #barraTopo > .conteiner > .row-fluid > .span6{max-width:none !important;margin:0 0 0 auto !important}'
        + '}';

    function aplicarLupa(raiz) {
        var busca = raiz && raiz.querySelector('.busca');
        if (!busca || raiz.querySelector('.uk-lupa-btn')) return;
        var form = busca.querySelector('form');
        var campo = busca.querySelector('input[type="text"], input[type="search"], input:not([type])');
        if (!form || !campo) return;

        var linha = busca.parentNode;
        linha.classList.add('uk-lupa-linha');

        var lupa = document.createElement('button');
        lupa.type = 'button';
        lupa.className = 'uk-lupa-btn';
        lupa.setAttribute('aria-label', 'Pesquisar');
        lupa.setAttribute('aria-expanded', 'false');
        lupa.innerHTML = ICONE_LUPA;

        var pino = document.createElement('a');
        pino.className = 'uk-lupa-btn';
        pino.href = LINK_MAPA;
        pino.target = '_blank';
        pino.rel = 'noopener';
        pino.setAttribute('aria-label', 'Como chegar ao showroom');
        pino.title = 'Como chegar ao showroom';
        pino.innerHTML = ICONE_PINO;

        linha.appendChild(lupa);
        linha.appendChild(pino);

        function abrir() {
            raiz.classList.add('uk-busca-aberta');
            lupa.setAttribute('aria-expanded', 'true');
            setTimeout(function () { campo.focus(); }, 50);
        }
        function fechar() {
            raiz.classList.remove('uk-busca-aberta');
            lupa.setAttribute('aria-expanded', 'false');
        }
        lupa.addEventListener('click', function () {
            if (!raiz.classList.contains('uk-busca-aberta')) return abrir();
            if (campo.value.trim()) {
                if (form.requestSubmit) form.requestSubmit(); else form.submit();
            } else {
                fechar();
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') fechar();
        });
        document.addEventListener('click', function (e) {
            if (!linha.contains(e.target) && !campo.value.trim()) fechar();
        });
    }

    function montarLupa() {
        if (window.innerWidth < 980 || document.getElementById('uk-estilo-lupa')) return;
        var estilo = document.createElement('style');
        estilo.id = 'uk-estilo-lupa';
        estilo.textContent = ESTILO_LUPA;
        document.head.appendChild(estilo);
        var cabecalho = document.getElementById('cabecalho');
        aplicarLupa(cabecalho && cabecalho.querySelector('.conteudo-topo') ? cabecalho : null);
        aplicarLupa(document.getElementById('barraTopo'));
    }

    // Entrada suave do cabeçalho fixo (só no computador, mais baixo que o padrão): ele desliza de cima quando o cabeçalho
    // principal sai da tela e sobe de volta ao retornar ao topo. O script-rodapé o esconde no fim da página.
    function montarTransicao() {
        var estilo = document.createElement('style');
        estilo.textContent = '@media (min-width:980px){html body #barraTopo{display:block !important;position:fixed !important;top:0 !important;left:0;right:0;z-index:9000;'
            + 'transition:transform .5s cubic-bezier(.22,.61,.36,1),opacity .35s ease !important}html body div#barraTopo{padding:5px 0 !important}'
            + 'html:not(.uk-rolou) body #barraTopo{transform:translateY(-110%);opacity:0;pointer-events:none}}';
        document.head.appendChild(estilo);
        var limite = 300;
        function medir() {
            var cabecalho = document.getElementById('cabecalho');
            if (cabecalho) limite = Math.max(150, cabecalho.getBoundingClientRect().bottom + window.pageYOffset);
        }
        function verificar() {
            document.documentElement.classList.toggle('uk-rolou', window.pageYOffset > limite);
        }
        medir();
        verificar();
        window.addEventListener('scroll', verificar, { passive: true });
        window.addEventListener('load', function () { medir(); verificar(); });
    }

    function montar() {
        montarFaixaSuperior();
        montarCabecalhoFixo();
        montarLupa();
        montarTransicao();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
})();
