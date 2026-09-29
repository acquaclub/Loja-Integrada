/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-interacoes.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
*/
(function () {

    // 1. SCROLL REVEAL (SURGIMENTO SUAVE DOS PRODUTOS)
    // Os produtos surgem quando entram na tela (os que já estão visíveis aparecem logo no início).
    // Nada é medido na hora de carregar: o próprio navegador avisa quem está na tela,
    // sem forçar recálculo da página (apontado pelo PageSpeed como "reflow forçado").
    // Produtos carregados depois (paginação, filtros, carrossel) também são tratados.
    if ('IntersectionObserver' in window && 'MutationObserver' in window) {
        var observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('revelado');
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.05 });

        var prepararProdutos = function () {
            document.querySelectorAll('.listagem-item:not(.revelado):not([data-revelar])').forEach(function (item) {
                item.setAttribute('data-revelar', '');
                observador.observe(item);
            });
        };

        prepararProdutos();
        document.documentElement.classList.add('js-revelar');

        var agendado = false;
        new MutationObserver(function () {
            if (agendado) return;
            agendado = true;
            requestAnimationFrame(function () {
                agendado = false;
                prepararProdutos();
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    // 2. MARCA EM CIMA DO NOME NOS CARDS (como na página do produto)
    //    A marca é reconhecida pelo nome do produto, a partir desta lista (edite quando entrar uma marca nova).
    //    Card sem marca reconhecida ganha um espaço vazio do mesmo tamanho, para os nomes ficarem alinhados.
    var MARCAS = ['Bertazzoni', 'Tecno', 'Gorenje', 'Elica', 'U-Line', 'Cuisinart', 'Viking', 'Elettromec', 'Tramontina',
        'Smeg', 'Falmec', 'Lofra', 'Mekal', 'Dometic', 'Invita', 'SodaStream', 'Evol', 'Fulgor Milano', 'Franke', 'Crissair',
        'InSinkErator', 'Le Creuset', 'Cheffer', 'Speed Queen', 'Coyote', 'Weber', 'Lynx', 'Kamado Joe', 'De Bacco', 'Ooni',
        'Duravit', 'Hansgrohe', 'Metalworks', 'TOTO', 'TECE', 'Victoria + Albert', 'Deca', 'Axor', 'Bette', 'Sabbia', 'Jacuzzi',
        'BWT', 'Docol', 'Banhomais', 'Codda', 'Doka', 'Rubinettos', 'Novellini', 'Konkrë', 'Hydra', 'Denfa', 'Celite', 'Roca',
        'Portinari', 'Tarkett', 'Ceusa', 'Derosso', 'Adamá', 'Santa Luzia', 'Atlas', 'Quick-Step', 'Durafloor', 'Arquitech',
        'Glass Mosaic'];
    var LETRA = 'A-Za-z0-9À-ÖØ-öø-ÿ';
    var buscaMarcas = MARCAS.map(function (nome) {
        var texto = nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return { nome: nome, regra: new RegExp('(^|[^' + LETRA + '])' + texto + '(?=[^' + LETRA + ']|$)', 'i') };
    });
    var estiloMarca = document.createElement('style');
    estiloMarca.textContent = 'html body .listagem-item .uk-card-marca{display:flex;align-items:center;gap:8px;margin:16px 0 0;'
        + "font-family:'Urbane',sans-serif;font-size:10.5px;font-weight:700;line-height:1.4;letter-spacing:2.5px;text-transform:uppercase;color:#1a1a1a;text-align:left}"
        + 'html body .listagem-item .uk-card-marca::before{content:"";flex:0 0 16px;height:1px;background:#c49a45}'
        + 'html body .listagem-item .uk-card-marca.vazia{visibility:hidden}'
        + 'html body .listagem .listagem-item .uk-card-marca + .nome-produto{margin-top:6px !important}';
    document.head.appendChild(estiloMarca);

    var marcarCards = function () {
        document.querySelectorAll('.listagem-item:not([data-uk-marca])').forEach(function (item) {
            item.setAttribute('data-uk-marca', '');
            var nome = item.querySelector('.nome-produto');
            if (!nome) return;
            var titulo = nome.textContent;
            var achada = null, posicao = Infinity;
            buscaMarcas.forEach(function (m) {
                var r = titulo.search(m.regra);
                if (r > -1 && r < posicao) { posicao = r; achada = m.nome; }
            });
            var rotulo = document.createElement('div');
            rotulo.className = 'uk-card-marca' + (achada ? '' : ' vazia');
            rotulo.textContent = achada || '—';
            nome.parentNode.insertBefore(rotulo, nome);
        });
    };
    marcarCards();
    if ('MutationObserver' in window) {
        var marcaAgendada = false;
        new MutationObserver(function () {
            if (marcaAgendada) return;
            marcaAgendada = true;
            requestAnimationFrame(function () {
                marcaAgendada = false;
                marcarCards();
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    // 3. ACESSIBILIDADE (apontada pelo PageSpeed): região principal da página
    //    e nome nos botões que só têm ícone (setas dos carrosséis e menu do celular)
    var nomearBotoes = function () {
        var corpo = document.getElementById('corpo');
        if (corpo && !corpo.getAttribute('role')) corpo.setAttribute('role', 'main');
        document.querySelectorAll('a.flex-prev:not([aria-label])').forEach(function (a) { a.setAttribute('aria-label', 'Anterior'); });
        document.querySelectorAll('a.flex-next:not([aria-label])').forEach(function (a) { a.setAttribute('aria-label', 'Próximo'); });
        document.querySelectorAll('.atalho-menu:not([aria-label])').forEach(function (a) { a.setAttribute('aria-label', 'Menu'); });
    };
    if (document.readyState === 'complete') nomearBotoes();
    else window.addEventListener('load', nomearBotoes);

    // 4. CARROSSÉIS DE PRODUTOS: ARRASTAR COM O MOUSE (no celular o tema já aceita o dedo)
    //    Clicar, arrastar para o lado e soltar anda a fileira, como as setas.
    //    Depois de um arrasto, o clique não abre o produto sem querer.
    var estiloArrasto = document.createElement('style');
    estiloArrasto.textContent = '@media (hover:hover) and (pointer:fine){.listagem .flex-viewport{cursor:grab}'
        + '.listagem .flex-viewport.uk-arrastando,.listagem .flex-viewport.uk-arrastando a{cursor:grabbing}'
        + '.listagem .flex-viewport img{-webkit-user-drag:none;user-select:none}}';
    document.head.appendChild(estiloArrasto);

    var arrasto = null;
    var cancelarClique = false;
    document.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        var janela = e.target.closest('.listagem .flex-viewport');
        if (!janela) return;
        arrasto = { janela: janela, x: e.clientX, y: e.clientY };
    });
    document.addEventListener('mousemove', function (e) {
        if (!arrasto) return;
        if (Math.abs(e.clientX - arrasto.x) > 8) {
            arrasto.janela.classList.add('uk-arrastando');
            e.preventDefault();
        }
    });
    document.addEventListener('mouseup', function (e) {
        if (!arrasto) return;
        var dx = e.clientX - arrasto.x;
        var janela = arrasto.janela;
        arrasto = null;
        janela.classList.remove('uk-arrastando');
        if (Math.abs(dx) < 40) return;
        cancelarClique = true;
        setTimeout(function () { cancelarClique = false; }, 0);
        var seta = janela.parentElement.querySelector(dx < 0 ? '.flex-next' : '.flex-prev');
        if (seta && !seta.classList.contains('flex-disabled')) seta.click();
    });
    document.addEventListener('click', function (e) {
        if (cancelarClique && e.target.closest('.listagem .flex-viewport')) {
            e.preventDefault();
            e.stopPropagation();
            cancelarClique = false;
        }
    }, true);
    document.addEventListener('dragstart', function (e) {
        if (e.target.closest && e.target.closest('.listagem .flex-viewport')) e.preventDefault();
    });

    // 5. CARROSSÉIS DE PRODUTOS: SÓ PRODUTOS INTEIROS NA FILEIRA
    //    O tema usa largura fixa por produto; com a página larga sobrava um pedaço do próximo card.
    //    A janela do carrossel passa a ter a largura exata dos produtos que cabem inteiros, centralizada.
    var ajustarJanelas = function () {
        document.querySelectorAll('.listagem .flex-viewport').forEach(function (janela) {
            janela.style.maxWidth = '';
            var item = janela.querySelector('li');
            if (!item) return;
            var estilo = getComputedStyle(item);
            var margemDireita = parseFloat(estilo.marginRight) || 0;
            var passo = item.getBoundingClientRect().width + (parseFloat(estilo.marginLeft) || 0) + margemDireita;
            var largura = janela.getBoundingClientRect().width;
            if (!passo || !largura) return;
            var cabem = Math.max(1, Math.floor((largura + margemDireita + 1) / passo));
            var util = cabem * passo - margemDireita;
            if (largura - util > 2) {
                janela.style.maxWidth = util + 'px';
                janela.style.marginLeft = 'auto';
                janela.style.marginRight = 'auto';
            }
        });
    };
    window.addEventListener('load', function () { setTimeout(ajustarJanelas, 300); });
    var esperaRedimensionar;
    window.addEventListener('resize', function () {
        clearTimeout(esperaRedimensionar);
        esperaRedimensionar = setTimeout(ajustarJanelas, 250);
    });

    // 6. PULSO SUTIL NO CARRINHO AO ADICIONAR PRODUTO
    document.body.addEventListener('minicart_state_changed', function () {
        document.querySelectorAll('#cabecalho .carrinho, .menu.flutuante .carrinho').forEach(function (carrinho) {
            carrinho.classList.add('animar-carrinho');
            setTimeout(function () {
                carrinho.classList.remove('animar-carrinho');
            }, 500);
        });
    });

})();
