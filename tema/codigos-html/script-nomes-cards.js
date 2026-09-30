/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-nomes-cards.js
  Local publicação: Rodapé | Página: Todas as páginas exceto checkout | Tipo: JavaScript
  Depende de: script-nomes-lista.js (a lista UK_NOMES) e script-interacoes.js (marca e código nos cards)
*/
// Nos cards de produto, troca o nome longo da plataforma pelo nome curto do título da descrição
// (ex.: "Adega Vetro") e mostra embaixo a linha técnica ("Built-In · 220V · 40 Garrafas").
// O nome completo continua no "title" do link e no "alt" da foto (SEO e acessibilidade).
// Produto fora da lista mantém o nome normal. A lista é gerada pelo ferramentas/gerar-lista-nomes.js.
(function () {
    var MOSTRAR_LINHA_TECNICA = true; // false = só o nome curto

    var estilo = document.createElement('style');
    estilo.textContent = "html body .listagem-item .uk-card-tecnico{margin:4px 0 0;font-family:'Urbane',sans-serif;font-size:12px;font-weight:300;"
        + 'line-height:1.4;letter-spacing:.2px;color:#666;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
    document.head.appendChild(estilo);

    function trocarNomes() {
        var lista = window.UK_NOMES;
        if (!lista) return;
        // Só cards que o script-interacoes já marcou: a marca é lida do nome completo, antes da troca
        document.querySelectorAll('.listagem-item[data-uk-marca]:not([data-uk-nome])').forEach(function (item) {
            item.setAttribute('data-uk-nome', '');
            var sku = item.querySelector('.produto-sku');
            var nome = item.querySelector('.nome-produto');
            var dados = sku && nome && lista[sku.textContent.trim()];
            if (!dados || !dados[0]) return;

            nome.setAttribute('title', nome.textContent.trim());
            nome.textContent = dados[0];

            if (MOSTRAR_LINHA_TECNICA && dados[1]) {
                var tecnico = document.createElement('div');
                tecnico.className = 'uk-card-tecnico';
                tecnico.textContent = dados[1].split('|').map(function (t) { return t.trim(); }).filter(Boolean).join(' · ');
                nome.parentNode.insertBefore(tecnico, nome.nextSibling);
            }
        });
    }

    var agendado = false;
    function agendar() {
        if (agendado) return;
        agendado = true;
        requestAnimationFrame(function () {
            agendado = false;
            trocarNomes();
        });
    }
    agendar();
    if ('MutationObserver' in window) {
        new MutationObserver(agendar).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-uk-marca'] });
    }
})();
