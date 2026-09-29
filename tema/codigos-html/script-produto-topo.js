/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-produto-topo.js
  Local publicação: Rodapé | Página: Produto | Tipo: JavaScript
  Traz o próprio estilo (não depende do CSS Avançado).
*/
// Topo da página de produto no modo catálogo, ao lado da foto:
// marca (preta, com traço dourado) > nome > "Valores e condições sob consulta" > botão de WhatsApp >
// garantias com ícone dourado > código do produto, discreto, no fim.
// O texto padrão do tema ("Para mais informações entre em contato…") é escondido.
(function () {
    var DOURADO = '#c49a45';

    var ESTILO =
        '.uk-topo__marca{display:inline-flex;align-items:center;gap:12px;margin:6px 0 0;font-family:\'Urbane\',sans-serif;font-size:13px;font-weight:700;'
        + 'letter-spacing:3px;text-transform:uppercase;color:#1a1a1a !important;text-decoration:none !important;transition:color .2s ease}'
        + '.uk-topo__marca::before{content:"";display:block;width:24px;height:1px;background:' + DOURADO + '}'
        + '.uk-topo__marca:hover{color:#9a7430 !important}'
        + '.info-principal-produto .nome-produto{margin-top:8px !important}'
        + '.uk-topo__consulta{margin:0 0 6px !important;padding:0 !important;font-family:\'Urbane\',sans-serif;font-size:16px !important;'
        + 'font-weight:400 !important;line-height:1.6 !important;letter-spacing:.2px;color:#333333 !important}'
        + '.principal .produto-mais-info{display:none !important}'
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
        + '.uk-topo__codigo [itemprop="sku"]{font-size:12px !important;letter-spacing:.5px;color:#666666 !important}';

    function icone(caminho) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="' + DOURADO + '" stroke-width="1.6" stroke-linecap="round" '
            + 'stroke-linejoin="round" aria-hidden="true">' + caminho + '</svg>';
    }

    var GARANTIAS = [
        [icone('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4"/>'), 'Garantia oficial do fabricante'],
        [icone('<rect x="1" y="6" width="14" height="11" rx="1"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="6" cy="18.5" r="2"/><circle cx="18" cy="18.5" r="2"/>'), 'Entrega fracionada'],
        [icone('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M17 11l2 2 4-4"/>'), 'Consultoria especializada']
    ];

    function montar() {
        // Parte do bloco do produto (há botões com a classe "principal" antes dele na página)
        var info = document.querySelector('.info-principal-produto');
        var principal = info && info.parentElement;
        var nome = info && info.querySelector('.nome-produto');
        if (!nome || principal.querySelector('.uk-topo__garantias')) return;

        var estilo = document.createElement('style');
        estilo.textContent = ESTILO;
        document.head.appendChild(estilo);

        // Marca acima do nome
        var marca = info.querySelector('[itemprop="brand"] a');
        if (marca && marca.textContent.trim()) {
            var linkMarca = document.createElement('a');
            linkMarca.className = 'uk-topo__marca';
            linkMarca.href = marca.href;
            linkMarca.textContent = marca.textContent.trim();
            nome.parentNode.insertBefore(linkMarca, nome);
        }

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
})();
