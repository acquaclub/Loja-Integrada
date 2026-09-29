/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-produto-miniaturas.js
  Local publicação: Rodapé | Página: Produto | Tipo: JavaScript
  Traz o próprio estilo (não depende do CSS Avançado). Só no computador; no celular fica a faixa do tema.
*/
// Miniaturas do produto em coluna vertical, à esquerda da foto principal.
// As miniaturas ficam pequenas e a selecionada fica maior. O clique usa a miniatura
// original do tema (escondida), então a troca da foto principal continua a mesma.
// Setas sobre a foto e as setas do teclado (← →) passam de uma foto para outra.
(function () {
    var ESTILO =
        '@media (min-width:980px){'
        + '.uk-galeria-produto{display:flex !important;align-items:flex-start;gap:24px}'
        + '.uk-galeria-produto > .uk-thumbs{order:0}'
        + '.uk-galeria-produto > .uk-galeria-produto__foto{order:1;flex:1 1 auto;min-width:0}'
        + '.uk-galeria-produto > .produto-thumbs{display:none !important}'
        + '.uk-thumbs{flex:0 0 72px;display:flex;flex-direction:column;align-items:center;gap:12px;max-height:520px;overflow-y:auto;padding:4px 0;scrollbar-width:none}'
        + '.uk-thumbs::-webkit-scrollbar{display:none}'
        + '.uk-thumbs__item{display:flex;align-items:center;justify-content:center;width:52px;height:52px;padding:0;margin:0;'
        + 'background:#ffffff;border:1px solid transparent;border-radius:0;box-shadow:none;cursor:pointer;opacity:.55;'
        + 'transition:width .3s ease,height .3s ease,opacity .3s ease,border-color .3s ease}'
        + '.uk-thumbs__item:hover{opacity:.9}'
        + '.uk-thumbs__item.ativa{width:68px;height:68px;opacity:1;border-color:#1a1a1a}'
        + '.uk-thumbs__item img{display:block;width:100% !important;height:100% !important;max-width:none !important;object-fit:contain;padding:4px;box-sizing:border-box}'
        // Setas sobre a foto principal (aparecem com o mouse em cima)
        + '.uk-galeria-produto__foto{position:relative}'
        + '.uk-foto-seta{position:absolute;top:50%;z-index:5;display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin-top:-22px;padding:0;'
        + 'background:rgba(255,255,255,.85);border:1px solid #e0e0e0;border-radius:0;box-shadow:none;cursor:pointer;opacity:0;transition:opacity .3s ease,border-color .2s ease}'
        + '.uk-galeria-produto__foto:hover .uk-foto-seta{opacity:1}'
        + '.uk-foto-seta:hover{border-color:#c49a45}'
        + '.uk-foto-seta--ant{left:12px}.uk-foto-seta--prox{right:12px}'
        + '.uk-foto-seta::before{content:"";display:block;width:9px;height:9px;border-right:1.5px solid #1a1a1a;border-bottom:1.5px solid #1a1a1a}'
        + '.uk-foto-seta--ant::before{transform:translateX(2px) rotate(135deg)}'
        + '.uk-foto-seta--prox::before{transform:translateX(-2px) rotate(-45deg)}'
        + '}';

    function montar() {
        if (window.innerWidth < 980 || document.querySelector('.uk-thumbs')) return;
        var faixa = document.querySelector('.produto-thumbs');
        var foto = document.getElementById('imagemProduto');
        if (!faixa || !foto) return;
        var links = faixa.querySelectorAll('#carouselImagem .miniaturas li a');
        if (links.length < 2) return;

        // Coluna que contém a foto e a faixa de miniaturas
        var coluna = faixa.parentElement;
        var blocoFoto = foto;
        while (blocoFoto.parentElement && blocoFoto.parentElement !== coluna) blocoFoto = blocoFoto.parentElement;
        if (blocoFoto.parentElement !== coluna) return;

        var estilo = document.createElement('style');
        estilo.textContent = ESTILO;
        document.head.appendChild(estilo);

        var thumbs = document.createElement('div');
        thumbs.className = 'uk-thumbs';
        thumbs.setAttribute('aria-label', 'Fotos do produto');

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
            thumbs.appendChild(botao);
        });

        var atual = 0;
        function marcar(i) {
            atual = i;
            botoes.forEach(function (b, j) {
                b.classList.toggle('ativa', j === i);
                b.setAttribute('aria-current', j === i ? 'true' : 'false');
            });
        }

        // Começa marcando a miniatura que o tema já deixou ativa (ou a primeira)
        var inicial = 0;
        [].forEach.call(links, function (link, i) {
            if (link.parentElement.classList.contains('active')) inicial = i;
        });
        marcar(inicial);

        coluna.classList.add('uk-galeria-produto');
        blocoFoto.classList.add('uk-galeria-produto__foto');
        coluna.insertBefore(thumbs, coluna.firstChild);

        // Setas na foto principal e setas do teclado (← →); depois da última volta para a primeira
        function ir(passo) {
            botoes[(atual + passo + botoes.length) % botoes.length].click();
        }
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
            blocoFoto.appendChild(seta);
        });
        document.addEventListener('keydown', function (e) {
            var alvo = e.target;
            if (alvo && (alvo.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(alvo.tagName))) return;
            if (e.key === 'ArrowLeft') ir(-1);
            if (e.key === 'ArrowRight') ir(1);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
})();
