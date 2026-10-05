/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-interacoes.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
*/
(function () {

    // 1. SCROLL REVEAL (SURGIMENTO SUAVE DOS PRODUTOS)
    // Os produtos surgem quando entram na tela (os que já estão visíveis aparecem logo no início).
    // Sem medir nada ao carregar (evita o "reflow forçado" do PageSpeed); vale também para produtos carregados depois.
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

    // 2. CARDS: MARCA EM CIMA DO NOME (como na página do produto) E CÓDIGO EMBAIXO
    //    Marca reconhecida pelo nome, a partir desta lista (edite quando entrar marca nova); sem marca, espaço vazio.
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
        + 'html body .listagem .listagem-item .uk-card-marca + .nome-produto{margin-top:6px !important}'
        // Código do produto, embaixo do nome
        + "html body .listagem-item .uk-card-codigo{margin:6px 0 0;font-family:'Urbane',sans-serif;font-size:11px;font-weight:300;line-height:1.4;letter-spacing:.6px;color:#8a8a8a;text-align:left}"
        + 'html body .listagem-item .uk-card-codigo.vazia{visibility:hidden}'
        // Fica por cima do link do card: clicar copia o código
        + 'html body .listagem-item .uk-card-codigo:not(.vazia){position:relative;z-index:3;display:inline-block;cursor:copy;transition:color .2s ease}'
        + 'html body .listagem-item .uk-card-codigo:not(.vazia):hover{color:#c49a45}'
        + 'html body .listagem-item .uk-card-codigo.copiado{color:#c49a45}';
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

            // SKU escondido no card; sem código, espaço vazio para alinhar
            var fonte = item.querySelector('.produto-sku, [itemprop="sku"], [data-sku]');
            var codigo = fonte ? (fonte.getAttribute('content') || fonte.getAttribute('data-sku') || fonte.textContent || '').trim() : '';
            var linhaCodigo = document.createElement('div');
            linhaCodigo.className = 'uk-card-codigo' + (codigo ? '' : ' vazia');
            linhaCodigo.textContent = codigo ? 'Cód. ' + codigo : '—';
            if (codigo) {
                linhaCodigo.title = 'Clique para copiar o código';
                linhaCodigo.setAttribute('data-codigo', codigo);
            }
            nome.parentNode.insertBefore(linhaCodigo, nome.nextSibling);
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

    // Clique no código: copia e mostra "Copiado ✓"
    document.addEventListener('click', function (e) {
        var alvo = e.target.closest && e.target.closest('.uk-card-codigo[data-codigo]');
        if (!alvo) return;
        e.preventDefault();
        e.stopPropagation();
        var codigo = alvo.getAttribute('data-codigo');
        var avisar = function () {
            alvo.textContent = 'Copiado ✓';
            alvo.classList.add('copiado');
            setTimeout(function () {
                alvo.textContent = 'Cód. ' + codigo;
                alvo.classList.remove('copiado');
            }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(codigo).then(avisar, function () { copiarAntigo(codigo); avisar(); });
        } else {
            copiarAntigo(codigo);
            avisar();
        }
    }, true);
    function copiarAntigo(texto) {
        var campo = document.createElement('textarea');
        campo.value = texto;
        campo.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(campo);
        campo.select();
        try { document.execCommand('copy'); } catch (erro) { }
        document.body.removeChild(campo);
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

    // 4. CARROSSÉIS DE PRODUTOS: SÓ PRODUTOS INTEIROS NA FILEIRA
    //    Janela com a largura exata dos cards inteiros, centralizada, com fade (se falhar, aparece em 3 s).
    var estiloJanela = document.createElement('style');
    estiloJanela.textContent = '@keyframes ukMostrarFileira{to{opacity:1}}'
        + '.listagem .flex-viewport{opacity:0;animation:ukMostrarFileira .3s ease 3s forwards}'
        + '.listagem .flex-viewport.uk-ajustada{opacity:1;animation:none;transition:opacity .3s ease}';
    document.head.appendChild(estiloJanela);

    var ajustarJanela = function (janela) {
        janela.style.maxWidth = '';
        var item = janela.querySelector('li');
        if (item) {
            var estilo = getComputedStyle(item);
            var margemDireita = parseFloat(estilo.marginRight) || 0;
            var passo = item.getBoundingClientRect().width + (parseFloat(estilo.marginLeft) || 0) + margemDireita;
            var largura = janela.getBoundingClientRect().width;
            if (passo && largura) {
                var cabem = Math.max(1, Math.floor((largura + margemDireita + 1) / passo));
                var util = cabem * passo - margemDireita;
                if (largura - util > 2) {
                    janela.style.maxWidth = util + 'px';
                    janela.style.marginLeft = 'auto';
                    janela.style.marginRight = 'auto';
                }
                // Setas (CSS, seção 8): encostadas na fileira, no meio da foto
                var moldura = janela.parentElement;
                var foto = janela.querySelector('.imagem-produto');
                moldura.style.setProperty('--uk-folga', Math.max(0, (largura - Math.min(largura, util)) / 2) + 'px');
                if (foto) moldura.style.setProperty('--uk-meio', (janela.offsetTop + foto.offsetTop + foto.offsetHeight / 2) + 'px');
            }
        }
        janela.classList.add('uk-ajustada');
    };

    // Vigia por alguns segundos: o tema cria a moldura da fileira só quando liga
    var inicioVigia = Date.now();
    var vigiarCarrosseis = function () {
        document.querySelectorAll('.listagem .flex-viewport:not(.uk-ajustada)').forEach(function (janela) {
            var fileira = janela.querySelector('ul');
            if (fileira && fileira.style.width) ajustarJanela(janela);
        });
        if (Date.now() - inicioVigia < 8000) {
            requestAnimationFrame(vigiarCarrosseis);
        } else {
            document.querySelectorAll('.listagem .flex-viewport:not(.uk-ajustada)').forEach(ajustarJanela);
        }
    };
    requestAnimationFrame(vigiarCarrosseis);

    // Cards por fileira conforme a largura: o tema só calcula ao abrir a página (ao girar o tablet sobrava
    // pedaço do próximo card). De 700 a 769px (iPad Mini em pé) mostra 2 em vez de 1.
    var produtosPorFileira = function (fileira) {
        var w = window.innerWidth;
        if (w < 700) return 1;
        if (w < 770) return 2;
        return parseInt(jQuery(fileira).closest('.produtos-carrossel').attr('data-produtos-linha'), 10) || 4;
    };
    var recalcularCarrosseis = function () {
        if (!window.jQuery) return;
        jQuery('.listagem .produtos-carrossel .listagem-linha').each(function () {
            var carrossel = jQuery(this).data('flexslider');
            if (!carrossel) return;
            var janela = this.querySelector('.flex-viewport');
            if (janela) janela.style.maxWidth = '';
            var n = produtosPorFileira(this);
            carrossel.vars.minItems = n;
            carrossel.vars.maxItems = n;
            carrossel.vars.itemWidth = jQuery(this).width() / n - 10;
            carrossel.doMath();
            (carrossel.newSlides || carrossel.slides).width(carrossel.computedW);
            carrossel.update(carrossel.pagingCount);
            carrossel.setProps();
        });
    };
    if (window.innerWidth >= 700 && window.innerWidth < 770) {
        window.addEventListener('load', function () {
            recalcularCarrosseis();
            jQuery(window).trigger('resize');
        });
    }

    // Só quando a largura muda (ao rolar no celular muda só a altura)
    var esperaRedimensionar;
    var larguraAnterior = window.innerWidth;
    window.addEventListener('resize', function () {
        clearTimeout(esperaRedimensionar);
        esperaRedimensionar = setTimeout(function () {
            if (window.innerWidth !== larguraAnterior) {
                larguraAnterior = window.innerWidth;
                recalcularCarrosseis();
            }
            document.querySelectorAll('.listagem .flex-viewport').forEach(ajustarJanela);
        }, 250);
    });

    // 5. ARRASTAR OS CARROSSÉIS DE PRODUTOS COM O DEDO (celular e tablet)
    //    O tema liga os carrosséis sem deslize por toque (só setas).
    var inicioToque = null;
    document.addEventListener('touchstart', function (e) {
        var janela = e.target.closest && e.target.closest('.listagem .flex-viewport');
        inicioToque = janela && e.touches.length === 1 ? { janela: janela, x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
    }, { passive: true });
    document.addEventListener('touchend', function (e) {
        if (!inicioToque || !window.jQuery) return;
        var toque = e.changedTouches[0];
        var dx = toque.clientX - inicioToque.x;
        var dy = toque.clientY - inicioToque.y;
        var carrossel = jQuery(inicioToque.janela).closest('.listagem-linha').data('flexslider');
        inicioToque = null;
        // Só arraste claramente para o lado (o vertical continua rolando a página)
        if (!carrossel || carrossel.animating || Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        carrossel.flexAnimate(carrossel.getTarget(dx < 0 ? 'next' : 'prev'), true);
    }, { passive: true });

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
