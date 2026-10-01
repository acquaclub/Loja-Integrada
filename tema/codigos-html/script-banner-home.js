/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-banner-home.js
  Local publicação: Rodapé | Página: Página inicial - Home | Tipo: JavaScript
  Estilo dos tracinhos e remoção das setas: seção 7 do CSS Avançado
*/
// Banner da home troca sozinho a cada TEMPO_POR_BANNER; pausa com o mouse em cima e com a aba escondida.
// Usa o próprio carrossel do tema quando ele permite; senão, avança clicando no próximo tracinho.
(function () {
    var TEMPO_POR_BANNER = 6000; // milissegundos

    function iniciar() {
        var carrossel = document.querySelector('#banner-home .flexslider, .secao-banners .flexslider');
        if (!carrossel) return;

        var tema = window.jQuery && window.jQuery(carrossel).data('flexslider');
        if (tema && typeof tema.play === 'function') {
            tema.vars.slideshow = true;
            tema.vars.slideshowSpeed = TEMPO_POR_BANNER;
            tema.vars.pauseOnHover = true;
            tema.vars.pauseOnAction = false;
            if (tema.pause) tema.pause();
            tema.play();
            return;
        }

        var parado = false;
        carrossel.addEventListener('mouseenter', function () { parado = true; });
        carrossel.addEventListener('mouseleave', function () { parado = false; });
        setInterval(function () {
            if (parado || document.hidden) return;
            var tracos = carrossel.querySelectorAll('.flex-control-nav li a');
            if (tracos.length < 2) return;
            var atual = carrossel.querySelector('.flex-control-nav li a.flex-active');
            var indice = Array.prototype.indexOf.call(tracos, atual);
            tracos[(indice + 1) % tracos.length].click();
        }, TEMPO_POR_BANNER);
    }

    // O carrossel do tema só fica pronto depois que a página carrega
    if (document.readyState === 'complete') {
        setTimeout(iniciar, 500);
    } else {
        window.addEventListener('load', function () { setTimeout(iniciar, 500); });
    }
})();
