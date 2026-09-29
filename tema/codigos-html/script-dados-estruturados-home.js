/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-dados-estruturados-home.js
  Local publicação: Rodapé | Página: Página inicial - Home | Tipo: JavaScript
*/
// Dados estruturados (schema.org) para o Google: o grupo e os três showrooms, com endereço,
// telefone e horário. Ajudam a busca e o Maps a ligar o site às lojas físicas.
// Para mudar horário, telefone ou endereço, edite a lista LOJAS abaixo.
(function () {
    if (document.querySelector('script[data-uk-dados-loja]')) return;

    var SITE = 'https://www.unikitchen.com.br/';
    var logo = document.querySelector('#cabecalho .logo img');
    var urlLogo = logo ? (logo.currentSrc || logo.src) : undefined;

    function horario(dias, abre, fecha) {
        return { '@type': 'OpeningHoursSpecification', 'dayOfWeek': dias, 'opens': abre, 'closes': fecha };
    }

    var GRUPO = {
        '@type': 'Organization',
        '@id': SITE + '#grupo',
        'name': 'Grupo Unikitchen',
        'url': SITE,
        'logo': urlLogo,
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+55-15-99610-0914',
            'contactType': 'customer service',
            'availableLanguage': 'Portuguese'
        }
    };

    var LOJAS = [
        {
            'name': 'Unikitchen - Eletrodomésticos, Louças e Metais',
            'telephone': '+55-15-3217-3499',
            'address': { 'streetAddress': 'Av. Antônio Carlos Comitre, 1253 - Parque Campolim', 'addressLocality': 'Sorocaba', 'postalCode': '18047-620' },
            'openingHoursSpecification': [
                horario(['Monday', 'Tuesday', 'Wednesday', 'Thursday'], '09:00', '18:00'),
                horario('Friday', '09:00', '17:00'),
                horario('Saturday', '09:00', '13:00')
            ]
        },
        {
            'name': 'Acqua - Louças e Metais Deca & Pisos e Revestimentos Portinari',
            'telephone': '+55-15-3202-4531',
            'address': { 'streetAddress': 'Rod. João Leme dos Santos, 147', 'addressLocality': 'Sorocaba' }
        },
        {
            'name': 'Unikitchen Itapetininga - Eletrodomésticos, Revestimentos, Louças e Metais',
            'telephone': '+55-15-3500-7995',
            'address': { 'addressLocality': 'Itapetininga' }
        }
    ];

    var dados = [GRUPO].concat(LOJAS.map(function (loja) {
        loja['@type'] = 'HomeGoodsStore';
        loja.url = SITE;
        loja.image = urlLogo;
        loja.parentOrganization = { '@id': SITE + '#grupo' };
        loja.address['@type'] = 'PostalAddress';
        loja.address.addressRegion = 'SP';
        loja.address.addressCountry = 'BR';
        return loja;
    }));

    var tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.setAttribute('data-uk-dados-loja', '');
    tag.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': dados });
    document.head.appendChild(tag);
})();
