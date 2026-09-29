/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-cabecalho-fixo.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  Estilo: seções 5 (faixa superior) e 6 (cabeçalho fixo) do CSS personalizado
*/
// Cabeçalhos: faixa superior (frases que se alternam + telefone e WhatsApp fixos) e ajustes do cabeçalho fixo
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
    // Frases que se alternam à esquerda; para trocar o texto, edite a lista abaixo.
    var FRASES = [
        'Showroom em Sorocaba · <a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Av. Antônio Carlos Comitre, 1253 - Parque Campolim, Sorocaba - SP, 18047-620') + '" target="_blank" rel="noopener">Como chegar</a>',
        'Atendimento: seg a qui 9h–18h · sex 9h–17h · sáb 9h–13h',
        'Atendimento exclusivo para <a href="/pagina/parceiros.html">arquitetos e especificadores</a>'
    ];
    var TEMPO_POR_FRASE = 5000; // milissegundos

    function montarFaixaSuperior() {
        if (document.querySelector('.uk-faixa-topo')) return;
        var cabecalho = document.getElementById('cabecalho');
        if (!cabecalho) return;

        var html = '<div class="uk-faixa-topo__conteudo"><div class="uk-faixa-topo__frases" aria-live="polite">';
        for (var i = 0; i < FRASES.length; i++) {
            html += '<p class="uk-faixa-topo__frase' + (i === 0 ? ' ativa' : '') + '"' + (i === 0 ? '' : ' aria-hidden="true"') + '>' + FRASES[i] + '</p>';
        }
        html += '</div><div class="uk-faixa-topo__contatos">'
            + '<a href="tel:+551532173499">(15) 3217-3499</a>'
            + '<span class="uk-faixa-topo__sep"></span>'
            + '</div></div>';

        var faixa = document.createElement('div');
        faixa.className = 'uk-faixa-topo';
        faixa.innerHTML = html;
        faixa.querySelector('.uk-faixa-topo__contatos').appendChild(criarLinkWhatsApp());
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
            img.style.cssText = 'display:block !important;width:175px !important;height:35px !important;max-width:none !important;object-fit:cover !important;object-position:center !important;';
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

    function montar() {
        montarFaixaSuperior();
        montarCabecalhoFixo();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
})();
