/*
  Painel Loja Integrada > Códigos HTML
  Descrição: script-dados-estruturados-home.js
  Local publicação: Rodapé | Página: Página inicial - Home | Tipo: JavaScript
*/
// Dados estruturados (schema.org) para o Google: o grupo e os três showrooms, com endereço,
// telefone, horário, marcas e perfis oficiais. Ajudam a busca e o Maps a ligar o site às lojas físicas.
// Para mudar horário, telefone ou endereço, edite a lista LOJAS abaixo.
(function () {
    if (document.querySelector('script[data-uk-dados-loja]')) return;

    var SITE = 'https://www.unikitchen.com.br/';
    var logo = document.querySelector('#cabecalho .logo img');
    var urlLogo = logo ? (logo.currentSrc || logo.src) : undefined;

    // Marcas por linha (edite aqui quando entrar ou sair uma marca)
    var COZINHA = ['Bertazzoni', 'Tecno', 'Gorenje', 'Elica', 'U-Line', 'Cuisinart', 'Viking', 'Elettromec', 'Tramontina',
        'Smeg', 'Falmec', 'Lofra', 'Mekal', 'Dometic', 'Invita', 'SodaStream', 'Evol', 'Fulgor Milano', 'Franke', 'Crissair',
        'InSinkErator', 'Le Creuset', 'Cheffer', 'Speed Queen', 'Coyote', 'Weber', 'Lynx', 'Kamado Joe', 'De Bacco', 'Ooni'];
    var BANHO = ['Duravit', 'Hansgrohe', 'Metalworks by Crismoe', 'TOTO', 'TECE', 'Victoria + Albert', 'Deca', 'Axor', 'Bette',
        'Sabbia', 'Jacuzzi', 'BWT', 'Docol', 'Banhomais', 'Codda', 'Doka', 'Rubinettos', 'Novellini', 'Konkrë', 'Hydra', 'Denfa',
        'Celite', 'Roca'];
    var REVESTIMENTOS = ['Portinari', 'Tarkett', 'Ceusa', 'Derosso', 'Adamá', 'Santa Luzia', 'Atlas', 'Quick-Step', 'Pix',
        'Durafloor', 'Arquitech', 'Glass Mosaic'];
    var MARCAS_ACQUA = ['Deca', 'Portinari', 'Ceusa', 'Hydra'];

    function marcas(lista) {
        return lista.map(function (nome) { return { '@type': 'Brand', 'name': nome }; });
    }

    function horario(dias, abre, fecha) {
        return { '@type': 'OpeningHoursSpecification', 'dayOfWeek': dias, 'opens': abre, 'closes': fecha };
    }

    var GRUPO = {
        '@type': 'Organization',
        '@id': SITE + '#grupo',
        'name': 'Grupo Unikitchen',
        'description': 'Grupo de lojas de eletrodomésticos, louças, metais e revestimentos de alto padrão, com showrooms em Sorocaba e Itapetininga.',
        'url': SITE,
        'brand': marcas(COZINHA.concat(BANHO, REVESTIMENTOS)),
        'logo': urlLogo,
        'sameAs': ['https://www.instagram.com/unikitchen/'],
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+55-15-99610-0914',
            'contactType': 'customer service',
            'availableLanguage': 'Portuguese'
        }
    };

    // Seg a qui 9h–18h e sex 9h–17h nas três lojas; sábado 9h–13h só na matriz
    function horarios(comSabado) {
        var lista = [
            horario(['Monday', 'Tuesday', 'Wednesday', 'Thursday'], '09:00', '18:00'),
            horario('Friday', '09:00', '17:00')
        ];
        if (comSabado) lista.push(horario('Saturday', '09:00', '13:00'));
        return lista;
    }

    var LOJAS = [
        {
            'name': 'Unikitchen - Eletrodomésticos, Louças e Metais',
            'description': 'Loja de eletrodomésticos, louças e metais de alto padrão, com consultoria especializada.',
            'brand': marcas(COZINHA.concat(BANHO)),
            'telephone': '+55-15-3217-3499',
            'address': { 'streetAddress': 'Av. Antônio Carlos Comitre, 1253 - Parque Campolim', 'addressLocality': 'Sorocaba', 'postalCode': '18047-620' },
            'openingHoursSpecification': horarios(true),
            'sameAs': ['https://www.instagram.com/unikitchen/']
        },
        {
            'name': 'Acqua - Louças e Metais Deca & Pisos e Revestimentos Portinari',
            'url': 'https://www.acquaexclusive.com.br/',
            'description': 'Loja de revestimentos, louças e metais, espaço conceito do Grupo Dexco.',
            'brand': marcas(MARCAS_ACQUA),
            'sameAs': ['https://www.instagram.com/acquaexclusive/'],
            'telephone': '+55-15-3202-4531',
            'address': { 'streetAddress': 'Rod. João Leme dos Santos, 147 - Parque Reserva Fazenda Imperial', 'addressLocality': 'Sorocaba', 'postalCode': '18052-780' },
            'openingHoursSpecification': horarios(false)
        },
        {
            'name': 'Unikitchen Itapetininga - Eletrodomésticos, Revestimentos, Louças e Metais',
            'description': 'Loja de eletrodomésticos, revestimentos, louças e metais de alto padrão, com consultoria especializada.',
            'brand': marcas(COZINHA.concat(BANHO, REVESTIMENTOS)),
            'telephone': '+55-15-3500-7995',
            'address': { 'streetAddress': 'Av. Dr. José Ozi, 450 - Urban Mall, Vila Nova Itapetininga', 'addressLocality': 'Itapetininga', 'postalCode': '18203-265' },
            'openingHoursSpecification': horarios(false),
            'sameAs': ['https://www.instagram.com/unikitchen/']
        }
    ];

    var dados = [GRUPO].concat(LOJAS.map(function (loja) {
        loja['@type'] = 'HomeGoodsStore';
        loja.url = loja.url || SITE;
        loja.priceRange = '$$$';
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
