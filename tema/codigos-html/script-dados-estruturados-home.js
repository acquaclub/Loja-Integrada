/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-dados-estruturados-home.js
  Local publicação: Rodapé | Página: Página inicial - Home | Tipo: JavaScript
*/
// Dados estruturados da loja (schema.org) para o Google: nome, logo, endereço do showroom,
// telefones e horários. Ajudam a busca e o Maps a mostrar essas informações.
// Para mudar horário, telefone ou endereço, edite o bloco LOJA abaixo.
(function () {
    if (document.querySelector('script[data-uk-dados-loja]')) return;

    var logo = document.querySelector('#cabecalho .logo img');

    var LOJA = {
        '@context': 'https://schema.org',
        '@type': 'HomeGoodsStore',
        'name': 'Unikitchen',
        'description': 'Eletrodomésticos, louças e metais premium com consultoria especializada, showroom em Sorocaba e entrega fracionada.',
        'url': 'https://www.unikitchen.com.br/',
        'logo': logo ? (logo.currentSrc || logo.src) : undefined,
        'image': logo ? (logo.currentSrc || logo.src) : undefined,
        'telephone': '+55-15-3217-3499',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Av. Antônio Carlos Comitre, 1253 - Parque Campolim',
            'addressLocality': 'Sorocaba',
            'addressRegion': 'SP',
            'postalCode': '18047-620',
            'addressCountry': 'BR'
        },
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+55-15-99610-0914',
            'contactType': 'customer service',
            'availableLanguage': 'Portuguese'
        },
        'openingHoursSpecification': [
            { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], 'opens': '09:00', 'closes': '18:00' },
            { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Friday', 'opens': '09:00', 'closes': '17:00' },
            { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Saturday', 'opens': '09:00', 'closes': '13:00' }
        ]
    };

    var tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.setAttribute('data-uk-dados-loja', '');
    tag.textContent = JSON.stringify(LOJA);
    document.head.appendChild(tag);
})();
