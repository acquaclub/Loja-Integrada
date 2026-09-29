/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-produto-miniaturas.js
  Local publicação: Rodapé | Página: Produto | Tipo: JavaScript
  Traz o próprio estilo (não depende do CSS Avançado). Só no computador; no celular fica a faixa do tema.
*/
// Miniaturas do produto em coluna vertical, à esquerda da foto principal. A foto fica numa moldura
// de altura fixa (a coluna tem a mesma altura), então as setas ficam sempre no mesmo lugar.
// Com muitas fotos, a coluna vira carrossel (setas para cima e para baixo, com começo e fim).
// A selecionada fica maior. O clique usa a miniatura original do tema (escondida), então a troca
// da foto principal continua a mesma. Setas sobre a foto e as setas do teclado (← →) passam de
// uma foto para outra, parando na primeira e na última.
(function () {
    var ALTURA = 520;         // altura fixa da moldura da foto e da coluna no computador (px)
    var ALTURA_CELULAR = 360; // altura fixa da moldura da foto no celular (px)
    var ESTILO =
        // Moldura fixa da foto: a descrição começa sempre no mesmo ponto, qualquer que seja a foto
        '.uk-moldura-foto{position:relative;height:' + ALTURA_CELULAR + 'px;display:flex;align-items:center;justify-content:center;overflow:hidden}'
        + '.uk-moldura-foto #imagemProduto{width:auto !important;height:auto !important;max-width:100% !important;max-height:' + ALTURA_CELULAR + 'px !important;object-fit:contain}'
        + '@media (min-width:980px){'
        + '.uk-moldura-foto{height:' + ALTURA + 'px}'
        + '.uk-moldura-foto #imagemProduto{max-height:' + ALTURA + 'px !important}'
        + '.uk-galeria-produto{display:flex !important;align-items:flex-start;gap:24px}'
        + '.uk-galeria-produto > .uk-thumbs{order:0}'
        + '.uk-galeria-produto > .uk-galeria-produto__foto{order:1;flex:1 1 auto;min-width:0}'
        + '.uk-galeria-produto > .produto-thumbs{display:none !important}'
        // Coluna: seta para cima, janela com as miniaturas, seta para baixo
        + '.uk-thumbs{flex:0 0 64px;display:flex;flex-direction:column;align-items:center;height:' + ALTURA + 'px}'
        + '.uk-thumbs__janela{flex:1 1 auto;width:100%;min-height:0;overflow:hidden;scroll-behavior:smooth}'
        + '.uk-thumbs__trilho{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;padding:4px 0}'
        + '.uk-thumbs__item{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;margin:0;'
        + 'background:#ffffff;border:1px solid transparent;border-radius:0;box-shadow:none;cursor:pointer;opacity:.55;'
        + 'transition:width .3s ease,height .3s ease,opacity .3s ease,border-color .3s ease}'
        + '.uk-thumbs__item:hover{opacity:.9}'
        + '.uk-thumbs__item.ativa{width:54px;height:54px;opacity:1;border-color:#1a1a1a}'
        + '.uk-thumbs__item img{display:block;width:100% !important;height:100% !important;max-width:none !important;object-fit:contain;padding:3px;box-sizing:border-box}'
        + '.uk-thumbs__seta{display:none;align-items:center;justify-content:center;flex:0 0 28px;width:100%;height:28px;padding:0;margin:0;'
        + 'background:none;border:0;box-shadow:none;cursor:pointer;transition:opacity .2s ease}'
        + '.uk-thumbs.tem-rolagem .uk-thumbs__seta{display:flex}'
        + '.uk-thumbs__seta::before{content:"";display:block;width:8px;height:8px;border-right:1.5px solid #1a1a1a;border-bottom:1.5px solid #1a1a1a}'
        + '.uk-thumbs__seta--cima::before{transform:translateY(3px) rotate(-135deg)}'
        + '.uk-thumbs__seta--baixo::before{transform:translateY(-3px) rotate(45deg)}'
        + '.uk-thumbs__seta:hover::before{border-color:#c49a45}'
        + '.uk-thumbs__seta:disabled{opacity:.2;cursor:default}'
        + '.uk-thumbs__seta:disabled::before{border-color:#1a1a1a}'
        // Setas sobre a foto principal (aparecem com o mouse em cima; somem na primeira e na última foto)
        + '.uk-foto-seta{position:absolute;top:50%;z-index:5;display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin-top:-22px;padding:0;'
        + 'background:rgba(255,255,255,.85);border:1px solid #e0e0e0;border-radius:0;box-shadow:none;cursor:pointer;opacity:0;transition:opacity .3s ease,border-color .2s ease}'
        + '.uk-galeria-produto__foto:hover .uk-foto-seta{opacity:1}'
        + '.uk-galeria-produto__foto .uk-foto-seta:disabled{opacity:0 !important;pointer-events:none}'
        + '.uk-foto-seta:hover{border-color:#c49a45}'
        + '.uk-foto-seta--ant{left:12px}.uk-foto-seta--prox{right:12px}'
        + '.uk-foto-seta::before{content:"";display:block;width:9px;height:9px;border-right:1.5px solid #1a1a1a;border-bottom:1.5px solid #1a1a1a}'
        + '.uk-foto-seta--ant::before{transform:translateX(2px) rotate(135deg)}'
        + '.uk-foto-seta--prox::before{transform:translateX(-2px) rotate(-45deg)}'
        + '}';

    function montar() {
        var foto = document.getElementById('imagemProduto');
        if (!foto || document.querySelector('.uk-moldura-foto')) return;
        var faixa = document.querySelector('.produto-thumbs');

        // Coluna da foto (a mesma da faixa de miniaturas, quando existe)
        var coluna = faixa ? faixa.parentElement : foto.closest('.span6') || foto.parentElement;
        var blocoFoto = foto;
        while (blocoFoto.parentElement && blocoFoto.parentElement !== coluna) blocoFoto = blocoFoto.parentElement;
        if (blocoFoto.parentElement !== coluna) return;

        var estilo = document.createElement('style');
        estilo.textContent = ESTILO;
        document.head.appendChild(estilo);

        // A moldura vale sempre: computador, celular e produto com uma foto só
        blocoFoto.classList.add('uk-moldura-foto');

        // A coluna de miniaturas e as setas só entram no computador, com 2 fotos ou mais
        var links = faixa ? faixa.querySelectorAll('#carouselImagem .miniaturas li a') : [];
        // Produto com uma foto só: a faixa com 1 miniatura não serve para nada e empurraria a descrição
        if (faixa && links.length < 2) faixa.style.setProperty('display', 'none', 'important');
        if (window.innerWidth < 980 || links.length < 2) return;

        var thumbs = document.createElement('div');
        thumbs.className = 'uk-thumbs';
        thumbs.setAttribute('aria-label', 'Fotos do produto');

        var cima = document.createElement('button');
        cima.type = 'button';
        cima.className = 'uk-thumbs__seta uk-thumbs__seta--cima';
        cima.setAttribute('aria-label', 'Miniaturas anteriores');
        var janela = document.createElement('div');
        janela.className = 'uk-thumbs__janela';
        var trilho = document.createElement('div');
        trilho.className = 'uk-thumbs__trilho';
        janela.appendChild(trilho);
        var baixo = document.createElement('button');
        baixo.type = 'button';
        baixo.className = 'uk-thumbs__seta uk-thumbs__seta--baixo';
        baixo.setAttribute('aria-label', 'Próximas miniaturas');
        thumbs.appendChild(cima);
        thumbs.appendChild(janela);
        thumbs.appendChild(baixo);

        var botoes = [];
        [].forEach.call(links, function (link, i) {
            var original = link.querySelector('img');
            var botao = document.createElement('button');
            botao.type = 'button';
            botao.className = 'uk-thumbs__item';
            botao.setAttribute('aria-label', 'Ver foto ' + (i + 1));
            var img = document.createElement('img');
            img.src = (original && (original.getAttribute('data-mediumimg') || original.src)) || link.getAttribute('data-imagem-grande');
            img.alt = '';
            img.loading = 'lazy';
            botao.appendChild(img);
            botao.addEventListener('click', function () {
                link.click();
                marcar(i);
            });
            botoes.push(botao);
            trilho.appendChild(botao);
        });

        // Setas sobre a foto principal
        var setas = {};
        [['ant', -1, 'Foto anterior'], ['prox', 1, 'Próxima foto']].forEach(function (d) {
            var seta = document.createElement('button');
            seta.type = 'button';
            seta.className = 'uk-foto-seta uk-foto-seta--' + d[0];
            seta.setAttribute('aria-label', d[2]);
            seta.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                ir(d[1]);
            });
            setas[d[0]] = seta;
            blocoFoto.appendChild(seta);
        });

        var atual = 0;
        function marcar(i) {
            atual = i;
            botoes.forEach(function (b, j) {
                b.classList.toggle('ativa', j === i);
                b.setAttribute('aria-current', j === i ? 'true' : 'false');
            });
            setas.ant.disabled = i === 0;
            setas.prox.disabled = i === botoes.length - 1;
            mostrarNaJanela(botoes[i]);
        }

        // Anterior/próxima, parando na primeira e na última foto
        function ir(passo) {
            var destino = atual + passo;
            if (destino < 0 || destino >= botoes.length) return;
            botoes[destino].click();
        }

        // Com mais miniaturas do que cabem na altura da moldura, a coluna vira carrossel
        function ajustarAltura() {
            janela.scrollTop = 0;
            thumbs.classList.toggle('tem-rolagem', trilho.scrollHeight > ALTURA);
            mostrarNaJanela(botoes[atual]);
            atualizarSetasColuna();
        }

        function atualizarSetasColuna() {
            cima.disabled = janela.scrollTop <= 0;
            baixo.disabled = janela.scrollTop + janela.clientHeight >= janela.scrollHeight - 1;
        }

        function mostrarNaJanela(botao) {
            if (!thumbs.classList.contains('tem-rolagem')) return;
            // primeira e última encostam nas pontas do carrossel
            if (botao === botoes[0]) { janela.scrollTop = 0; return; }
            if (botao === botoes[botoes.length - 1]) { janela.scrollTop = janela.scrollHeight; return; }
            // posição da miniatura dentro do trilho (a selecionada tem 54px de altura)
            var topo = botao.offsetTop;
            var fundo = topo + 54;
            if (topo < janela.scrollTop) {
                janela.scrollTop = Math.max(0, topo - 4);
            } else if (fundo > janela.scrollTop + janela.clientHeight) {
                janela.scrollTop = fundo - janela.clientHeight + 4;
            }
        }

        cima.addEventListener('click', function () { janela.scrollTop -= janela.clientHeight * 0.75; });
        baixo.addEventListener('click', function () { janela.scrollTop += janela.clientHeight * 0.75; });
        janela.addEventListener('scroll', atualizarSetasColuna);

        document.addEventListener('keydown', function (e) {
            var alvo = e.target;
            if (alvo && (alvo.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(alvo.tagName))) return;
            if (e.key === 'ArrowLeft') ir(-1);
            if (e.key === 'ArrowRight') ir(1);
        });

        coluna.classList.add('uk-galeria-produto');
        blocoFoto.classList.add('uk-galeria-produto__foto');
        coluna.insertBefore(thumbs, coluna.firstChild);

        // Começa marcando a miniatura que o tema já deixou ativa (ou a primeira)
        var inicial = 0;
        [].forEach.call(links, function (link, i) {
            if (link.parentElement.classList.contains('active')) inicial = i;
        });
        ajustarAltura();
        marcar(inicial);

        window.addEventListener('resize', ajustarAltura);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
})();
