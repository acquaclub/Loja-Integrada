/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-whatsapp-produto.js
  Local publicação: Rodapé | Página: Página do produto | Tipo: JavaScript
*/
// Adiciona o botão "Falar no WhatsApp sobre este produto" na página do produto
// Compatível com Modo Catálogo (Sem Preço) e Modo Loja
const NUMERO_WHATSAPP = '5515996100914';

window.addEventListener('load', function() {
    // Evita duplicar se o bloco rodar mais de uma vez por engano
    if (document.querySelector('.wpp-produto-cta')) return;

    // Pega o nome do produto
    const elementoNome = document.querySelector('[itemprop="name"]') || document.querySelector('.nome-produto') || document.querySelector('h1');
    const nomeProduto = elementoNome ? elementoNome.textContent.trim() : document.title.split('|')[0].trim();

    const urlProduto = window.location.href;
    const mensagem = encodeURIComponent(
        `Olá! Tenho interesse no produto "${nomeProduto}" (${urlProduto}). Pode me passar mais informações?`
    );

    const linkWhatsapp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`;

    // Ponto de inserção compatível com Modo Catálogo
    const alvo = document.querySelector('.acoes-produto')
              || document.querySelector('.codigo-produto')
              || document.querySelector('.conteudo-detalhes')
              || document.querySelector('.principal')
              || document.querySelector('h1.nome-produto')
              || document.querySelector('.nome-produto');

    if (!alvo) return;

    const botao = document.createElement('a');
    botao.href = linkWhatsapp;
    botao.target = '_blank';
    botao.rel = 'noopener';
    botao.className = 'botao principal wpp-produto-cta';
    botao.style.display = 'inline-flex';
    botao.style.alignItems = 'center';
    botao.style.gap = '8px';
    botao.style.marginTop = '15px';
    botao.style.backgroundColor = '#25D366';
    botao.style.color = '#ffffff';
    botao.style.padding = '12px 22px';
    botao.style.borderRadius = '4px';
    botao.style.fontWeight = '600';
    botao.style.textTransform = 'uppercase';
    botao.style.textDecoration = 'none';

    botao.innerHTML = '<i class="fab fa-whatsapp" style="font-size: 18px;"></i> Falar no WhatsApp sobre este produto';

    alvo.parentNode.insertBefore(botao, alvo.nextSibling);
});
