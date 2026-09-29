/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-produto-sanfona.js
  Local publicação: Rodapé | Página: Produto | Tipo: JavaScript
  Traz o próprio estilo (não depende do CSS Avançado).
*/
// Descrição do produto em sanfona: o texto de apresentação fica aberto e cada seção
// com título "section-title" (Detalhes, Acabamento, Funções, Informações Elétricas…) vira
// uma linha que abre e fecha. O <style> que vem dentro de cada descrição é desligado,
// porque ele altera a página inteira (body, h1, h2, .table…).
(function () {
    var ESTILO =
        '#descricao article.description{max-width:960px;margin:0 auto}'
        + '#descricao .uk-sanfona{max-width:960px;margin:48px auto 0;border-top:1px solid #1a1a1a}'
        + '#descricao .uk-sanfona__item{border-bottom:1px solid #d9d6cf}'
        + '#descricao .uk-sanfona__botao{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;margin:0;padding:22px 4px;'
        + 'background:none;border:0;border-radius:0;box-shadow:none;cursor:pointer;text-align:left;'
        + "font-family:'Urbane',sans-serif;font-size:13px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#1a1a1a;transition:color .2s ease}"
        + '#descricao .uk-sanfona__botao:hover{color:#c49a45}'
        + '#descricao .uk-sanfona__sinal{position:relative;flex:0 0 12px;width:12px;height:12px}'
        + '#descricao .uk-sanfona__sinal::before,#descricao .uk-sanfona__sinal::after{content:"";position:absolute;left:0;top:5.5px;width:12px;height:1px;background:currentColor;transition:transform .3s ease}'
        + '#descricao .uk-sanfona__sinal::after{transform:rotate(90deg)}'
        + '#descricao .uk-sanfona__item.aberto .uk-sanfona__sinal::after{transform:rotate(0)}'
        + '#descricao .uk-sanfona__painel{overflow:hidden;height:0;transition:height .35s ease}'
        + '#descricao .uk-sanfona__conteudo{padding:0 4px 28px}'
        // Tabelas e textos dentro da descrição, no padrão do site
        + '#descricao .table-responsive{overflow-x:auto;margin:0 0 16px;border:0;border-radius:0}'
        + '#descricao table,#descricao .table{width:100%;min-width:0;margin:0;border-collapse:collapse;background:none;border:0}'
        + '#descricao table th,#descricao table td{padding:13px 12px;border:0;border-bottom:1px solid #eeeeee;background:none;text-align:left;vertical-align:top;'
        + "font-family:'Urbane',sans-serif;font-size:14px;font-weight:300;line-height:1.6;color:#555555}"
        + '#descricao table th{width:38%;font-weight:600;color:#1a1a1a}'
        + '#descricao table tr:last-child th,#descricao table tr:last-child td{border-bottom:0}'
        + '#descricao table strong{font-weight:600;color:#1a1a1a}'
        + '#descricao table caption{padding:0 0 10px;text-align:left;font-size:12px;font-style:normal;color:#999999}'
        + '#descricao article.description p,#descricao .section p{text-align:left !important}'
        + '#descricao .uk-sanfona__rodape{max-width:960px;margin:32px auto 0;display:grid;gap:2px}'
        + '#descricao .alert-box,#descricao .guarantee{margin:0 !important;padding:22px 26px !important;background:#f7f7f5 !important;'
        + 'border:0 !important;border-left:2px solid #c49a45 !important;border-radius:0 !important;text-align:left !important;'
        + "font-family:'Urbane',sans-serif;font-size:14px !important;font-weight:300;line-height:1.7;color:#555555 !important}"
        + '#descricao .alert-box strong,#descricao .guarantee strong{font-weight:600;color:#1a1a1a}'
        + '@media (max-width:767px){#descricao .uk-sanfona{margin-top:32px}#descricao .uk-sanfona__botao{padding:18px 2px;font-size:12px}'
        + '#descricao table th,#descricao table td{padding:11px 8px;font-size:13px}#descricao table th{width:45%}}';

    function montar() {
        var descricao = document.getElementById('descricao');
        if (!descricao || descricao.querySelector('.uk-sanfona')) return;

        // Só age nas descrições do modelo com seções; as demais ficam como estão
        var titulos = descricao.querySelectorAll('.section-title, .div-title');
        if (!titulos.length) return;

        // Desliga o <style> que vem dentro da descrição (ele muda a página inteira)
        descricao.querySelectorAll('style').forEach(function (s) { s.remove(); });

        var estilo = document.createElement('style');
        estilo.textContent = ESTILO;
        document.head.appendChild(estilo);

        // Aviso e garantia saem das seções e ficam abertos, logo abaixo da sanfona
        var avisos = descricao.querySelectorAll('.alert-box, .guarantee');

        var sanfona = document.createElement('div');
        sanfona.className = 'uk-sanfona';
        var primeiraSecao = titulos[0].closest('.section') || titulos[0];
        primeiraSecao.parentNode.insertBefore(sanfona, primeiraSecao);

        titulos.forEach(function (titulo, i) {
            var item = document.createElement('div');
            item.className = 'uk-sanfona__item';
            var id = 'uk-sanfona-' + i;

            var botao = document.createElement('button');
            botao.type = 'button';
            botao.className = 'uk-sanfona__botao';
            botao.setAttribute('aria-expanded', 'false');
            botao.setAttribute('aria-controls', id);
            botao.innerHTML = '<span>' + titulo.textContent.trim() + '</span><span class="uk-sanfona__sinal" aria-hidden="true"></span>';

            var painel = document.createElement('div');
            painel.className = 'uk-sanfona__painel';
            painel.id = id;
            var conteudo = document.createElement('div');
            conteudo.className = 'uk-sanfona__conteudo';
            painel.appendChild(conteudo);

            // Tudo o que vem depois do título, até o próximo título, vai para dentro do painel
            var no = titulo.nextElementSibling;
            while (no && !no.matches('.section-title, .div-title')) {
                var proximo = no.nextElementSibling;
                if (!no.matches('.alert-box, .guarantee')) conteudo.appendChild(no);
                no = proximo;
            }
            var secao = titulo.closest('.section');
            titulo.remove();
            if (secao && !secao.querySelector('.section-title, .div-title') && !secao.querySelector('.alert-box, .guarantee') && !secao.textContent.trim()) {
                secao.remove();
            }

            botao.addEventListener('click', function () {
                var abrir = !item.classList.contains('aberto');
                if (abrir) {
                    painel.style.height = conteudo.offsetHeight + 'px';
                } else {
                    painel.style.height = painel.offsetHeight + 'px';
                    painel.offsetHeight; // força o navegador a registrar a altura antes de fechar
                    painel.style.height = '0px';
                }
                item.classList.toggle('aberto', abrir);
                botao.setAttribute('aria-expanded', abrir ? 'true' : 'false');
            });
            painel.addEventListener('transitionend', function () {
                if (item.classList.contains('aberto')) painel.style.height = 'auto';
            });

            item.appendChild(botao);
            item.appendChild(painel);
            sanfona.appendChild(item);
        });

        if (avisos.length) {
            var rodape = document.createElement('div');
            rodape.className = 'uk-sanfona__rodape';
            avisos.forEach(function (a) { rodape.appendChild(a); });
            sanfona.parentNode.insertBefore(rodape, sanfona.nextSibling);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montar);
    } else {
        montar();
    }
})();
