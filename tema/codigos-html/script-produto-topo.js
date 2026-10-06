/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-produto-topo.js
  Local publicação: Rodapé | Página: Produto | Tipo: JavaScript
  Traz o próprio estilo (não depende do CSS Avançado).
*/
// Topo do produto (catálogo): marca > nome curto + linha técnica > "sob consulta" > WhatsApp > garantias > código.
// Celular: miniaturas inteiras e centralizadas; a foto troca deslizando o dedo. Esconde sobras do tema.
(function () {
    var DOURADO = '#c49a45';

    var ESTILO =
        '.uk-topo__marca{display:inline-flex;align-items:center;gap:12px;margin:6px 0 0;font-family:\'Urbane\',sans-serif;font-size:13px;font-weight:700;'
        + 'letter-spacing:3px;text-transform:uppercase;color:#1a1a1a !important;text-decoration:none !important;transition:color .2s ease}'
        // Linha técnica dentro do título, como nos cards
        + '.uk-topo__linha{display:block;margin:10px 0 0;font-family:\'Urbane\',sans-serif;font-size:15px;font-weight:300;line-height:1.5;'
        + 'letter-spacing:.2px;text-transform:none;color:#666666}'
        + '@media (max-width:767px){.uk-topo__linha{font-size:14px;margin-top:8px}}'
        + '.uk-topo__marca::before{content:"";display:block;width:24px;height:1px;background:' + DOURADO + '}'
        + '.uk-topo__marca:hover{color:#9a7430 !important}'
        + '.info-principal-produto .nome-produto{margin-top:8px !important}'
        + '.uk-topo__consulta{margin:0 0 6px !important;padding:0 !important;font-family:\'Urbane\',sans-serif;font-size:16px !important;'
        + 'font-weight:400 !important;line-height:1.6 !important;letter-spacing:.2px;color:#333333 !important}'
        + '.principal .produto-mais-info{display:none !important}'
        // Caixa de ações vazia no modo catálogo: sem as bordas que viravam duas linhas soltas
        + '.principal .acoes-produto{border:0 !important;box-shadow:none !important}'
        // Variações (ex.: Voltagem): rótulo curto e botões retos no padrão do site
        + '.principal .atributos{margin:22px 0 4px !important;padding:0 !important;border:0 !important}'
        + '.principal .atributo-comum{margin:0 0 14px !important;padding:0 !important}'
        + '.principal .atributo-comum > span{display:block;margin:0 0 10px;font-size:0 !important;line-height:0}'
        + '.principal .atributo-comum > span b{font-family:\'Urbane\',sans-serif;font-size:11px !important;font-weight:700 !important;line-height:1.4;'
        + 'letter-spacing:2px;text-transform:uppercase;color:#1a1a1a !important}'
        + '.principal .atributo-comum ul{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0 !important;padding:0 !important}'
        + '.principal .atributo-comum li{float:none !important;margin:0 !important;padding:0 !important;border:0 !important;background:none !important}'
        + '.principal .atributo-item{display:inline-flex !important;align-items:center;justify-content:center;min-width:72px;height:42px;padding:0 18px !important;'
        + 'box-sizing:border-box;background:#ffffff !important;border:1px solid #d9d6cf !important;border-radius:0 !important;box-shadow:none !important;'
        + 'font-family:\'Urbane\',sans-serif;font-size:13px !important;font-weight:600 !important;letter-spacing:1px;color:#1a1a1a !important;'
        + 'text-decoration:none !important;transition:border-color .2s ease,box-shadow .2s ease}'
        + '.principal .atributo-item span{font-size:13px !important;color:inherit !important}'
        + '.principal .atributo-item:hover{border-color:' + DOURADO + ' !important}'
        + '.principal .atributo-item.active,.principal li.active > .atributo-item,.principal .atributo-item.selecionado{border-color:#1a1a1a !important;box-shadow:inset 0 0 0 1px #1a1a1a !important}'
        + '.principal .atributo-item i{display:none !important}'
        + '.uk-topo__garantias{list-style:none;margin:28px 0 0 !important;padding:22px 0 0 !important;border-top:1px solid #e5e5e5;display:grid;gap:14px}'
        + '.uk-topo__garantias li{display:flex;align-items:center;gap:12px;margin:0;padding:0;font-family:\'Urbane\',sans-serif;'
        + 'font-size:14px;font-weight:400;line-height:1.4;color:#333333}'
        + '.uk-topo__garantias svg{display:block;flex:0 0 20px;width:20px;height:20px}'
        + '.principal .codigo-produto.uk-topo__codigo{display:block !important;margin:22px 0 0 !important;padding:18px 0 0 !important;'
        + 'border:0 !important;border-top:1px solid #e5e5e5 !important;font-family:\'Urbane\',sans-serif;font-size:12px !important;color:#666666 !important}'
        + '.uk-topo__codigo > span{float:none !important;display:inline !important;margin:0 !important;padding:0 !important}'
        + '.uk-topo__codigo [itemprop="brand"]{display:none !important}'
        + '.uk-topo__codigo b{font-size:11px !important;font-weight:600 !important;letter-spacing:1px;text-transform:uppercase;color:#1a1a1a !important}'
        + '.uk-topo__codigo [itemprop="sku"]{font-size:12px !important;letter-spacing:.5px;color:#666666 !important}'
        // Celular: miniaturas de 48px, inteiras e centralizadas, sem setas
        + '@media (max-width:767px){'
        + 'html body .produto-thumbs,html body .produto-thumbs #carouselImagem{height:auto !important;max-height:none !important;overflow:visible !important}'
        + 'html body .produto-thumbs #carouselImagem{padding:0 !important;margin:12px 0 0 !important}'
        + 'html body .produto-thumbs #carouselImagem .flex-direction-nav{display:none !important}'
        + 'html body .produto-thumbs #carouselImagem .flex-viewport{height:auto !important;max-height:none !important;overflow:visible !important;margin:0 !important}'
                + 'html body .produto-thumbs #carouselImagem .miniaturas{display:flex !important;flex-wrap:wrap !important;justify-content:center !important;gap:8px;width:auto !important;height:auto !important;margin:0 auto !important;padding:1px 0 !important;list-style:none !important;transform:none !important}'
        + 'html body .produto-thumbs #carouselImagem .miniaturas li{flex:0 0 48px !important;width:48px !important;height:48px !important;margin:0 !important;float:none !important;list-style:none !important}'
        + 'html body .produto-thumbs #carouselImagem .miniaturas li a{display:block !important;width:48px !important;height:48px !important;padding:3px !important;box-sizing:border-box;'
        + 'background:#ffffff !important;border:1px solid #e5e5e5 !important;border-radius:0 !important;box-shadow:none !important}'
        + 'html body .produto-thumbs #carouselImagem .miniaturas li.clone{display:none !important}'
        + 'html body .produto-thumbs #carouselImagem .miniaturas li.active a{border-color:#1a1a1a !important}'
        + 'html body .produto-thumbs #carouselImagem .miniaturas li a span{display:block !important;width:100% !important;height:100% !important;border:0 !important}'
        + 'html body .produto-thumbs #carouselImagem .miniaturas li a img{display:block !important;width:100% !important;height:100% !important;max-width:none !important;object-fit:contain;border:0 !important}'
        + '}';

    function icone(caminho) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="' + DOURADO + '" stroke-width="1.6" stroke-linecap="round" '
            + 'stroke-linejoin="round" aria-hidden="true">' + caminho + '</svg>';
    }

    var GARANTIAS = [
        [icone('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4"/>'), 'Garantia oficial do fabricante'],
        [icone('<rect x="1" y="6" width="14" height="11" rx="1"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="6" cy="18.5" r="2"/><circle cx="18" cy="18.5" r="2"/>'), 'Entrega fracionada'],
        [icone('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M17 11l2 2 4-4"/>'), 'Consultoria especializada']
    ];

    // Ícone de WhatsApp do tema (quadradinho verde vazio): o contato é o botão do script-whatsapp-produto.js
    function esconderIconeWhatsAppTema() {
        document.querySelectorAll('i.fa.fa-whatsapp').forEach(function (i) {
            if (i.closest('.wpp-produto-cta, .wpp-flutuante-home, .uk-rodape')) return;
            var alvo = i.parentElement && i.parentElement.tagName === 'A' ? i.parentElement : i;
            alvo.style.setProperty('display', 'none', 'important');
        });
    }

    // Celular e tablet: deslizar o dedo na foto troca para a próxima/anterior
    function deslizarFoto() {
        var foto = document.getElementById('imagemProduto');
        var area = foto && (foto.closest('.uk-moldura-foto') || foto.parentElement);
        if (!area || area.ukDeslizar) return;
        area.ukDeslizar = true;
        area.style.touchAction = 'pan-y';
        var inicio = null;
        area.addEventListener('touchstart', function (e) {
            inicio = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
        }, { passive: true });
        area.addEventListener('touchend', function (e) {
            if (!inicio || window.innerWidth > 979) return;
            var dx = e.changedTouches[0].clientX - inicio.x;
            var dy = e.changedTouches[0].clientY - inicio.y;
            inicio = null;
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
            var itens = [].slice.call(document.querySelectorAll('#carouselImagem .miniaturas li:not(.clone)'));
            if (itens.length < 2) return;
            var atual = 0;
            itens.forEach(function (li, i) { if (li.classList.contains('active')) atual = i; });
            var destino = atual + (dx < 0 ? 1 : -1);
            if (destino < 0 || destino >= itens.length) return;
            var link = itens[destino].querySelector('a');
            var antes = foto.src;
            if (link) link.click();
            // Se o tema não trocou a foto pelo clique, troca direto
            var mini = itens[destino].querySelector('img');
            setTimeout(function () {
                var media = mini && mini.getAttribute('data-mediumimg');
                if (foto.src === antes && media) foto.src = media;
            }, 60);
            itens.forEach(function (li, i) { li.classList.toggle('active', i === destino); });
        });
    }

    // Título como nos cards: nome curto + linha técnica (UK_NOMES, script-nomes-1 e 2). O nome completo fica
    // no <title>, nos dados estruturados (meta itemprop="name") e no "title" do H1.
    function nomeCurto() {
        var info = document.querySelector('.info-principal-produto');
        var nome = info && info.querySelector('.nome-produto');
        var sku = info && info.querySelector('[itemprop="sku"]');
        var lista = window.UK_NOMES;
        if (!nome || !sku || !lista || nome.hasAttribute('data-uk-nome')) return;
        var dados = lista[(sku.getAttribute('content') || sku.textContent || '').trim()];
        if (!dados || !dados[0]) return;
        nome.setAttribute('data-uk-nome', '');
        var completo = nome.textContent.replace(/\s+/g, ' ').trim();
        if (nome.getAttribute('itemprop') === 'name') {
            var meta = document.createElement('meta');
            meta.setAttribute('itemprop', 'name');
            meta.setAttribute('content', completo);
            nome.parentNode.insertBefore(meta, nome);
            nome.removeAttribute('itemprop');
        }
        // Sem repetir a marca, que já aparece em cima
        var curto = dados[0];
        var marca = info.querySelector('[itemprop="brand"] a');
        if (marca && marca.textContent.trim()) {
            var texto = marca.textContent.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            curto = curto.replace(new RegExp('(^|\\s)' + texto + '(?=\\s|$)', 'i'), '$1').replace(/\s+/g, ' ').trim() || dados[0];
        }
        nome.setAttribute('title', completo);
        nome.textContent = curto;
        if (dados[1]) {
            var linha = document.createElement('span');
            linha.className = 'uk-topo__linha';
            linha.textContent = dados[1].split('|').map(function (t) { return t.trim(); }).filter(Boolean).join(' · ');
            nome.appendChild(document.createTextNode(' '));
            nome.appendChild(linha);
        }
    }

    function montar() {
        esconderIconeWhatsAppTema();
        // Bloco do produto (há outros "principal" antes dele na página)
        var info = document.querySelector('.info-principal-produto');
        var principal = info && info.parentElement;
        var nome = info && info.querySelector('.nome-produto');
        if (!nome || principal.querySelector('.uk-topo__garantias')) return;

        var estilo = document.createElement('style');
        estilo.textContent = ESTILO;
        document.head.appendChild(estilo);
        deslizarFoto();

        // Marca acima do nome
        var marca = info.querySelector('[itemprop="brand"] a');
        if (marca && marca.textContent.trim()) {
            var linkMarca = document.createElement('a');
            linkMarca.className = 'uk-topo__marca';
            linkMarca.href = marca.href;
            linkMarca.textContent = marca.textContent.trim();
            nome.parentNode.insertBefore(linkMarca, nome);
        }

        nomeCurto();

        // Frase no lugar do preço, logo abaixo do nome
        var consulta = document.createElement('p');
        consulta.className = 'uk-topo__consulta';
        consulta.textContent = 'Valores e condições sob consulta';
        nome.parentNode.insertBefore(consulta, nome.nextSibling);

        // Garantias e código vão para o fim do bloco (o botão de WhatsApp fica antes deles)
        var fim = principal.querySelector(':scope > #DelimiterFloat');
        var lista = document.createElement('ul');
        lista.className = 'uk-topo__garantias';
        lista.innerHTML = GARANTIAS.map(function (g) { return '<li>' + g[0] + '<span>' + g[1] + '</span></li>'; }).join('');
        principal.insertBefore(lista, fim);

        var codigo = info.querySelector('.codigo-produto');
        if (codigo) {
            codigo.classList.add('uk-topo__codigo');
            principal.insertBefore(codigo, fim);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
    // O tema pode criar o ícone depois: confere de novo quando a página termina de carregar
    window.addEventListener('load', esconderIconeWhatsAppTema);
    // A lista de nomes pode carregar depois deste código
    window.addEventListener('load', nomeCurto);
})();
