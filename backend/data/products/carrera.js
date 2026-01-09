// CARRERA - 5 produits avec fiches complètes et vraies images
export const carreraProducts = [
  {
    name: 'Carrera Champion/N',
    brand: 'Carrera',
    price: 189,
    originalPrice: 220,
    category: 'Sport',
    type: 'Aviateur',
    gender: 'Mixte',
    color: 'Noir Brillant/Gris',
    material: 'Optyl',
    description: 'Les Champion, icône absolue de Carrera depuis 1985. Cette forme aviateur oversize en Optyl ultra-léger incarne le style sport-chic intemporel. Plébiscitées par les célébrités et les passionnés de motorsport du monde entier.',
    shortDescription: 'L\'icône Carrera depuis 1985.',
    features: ['Optyl ultra-léger breveté', 'Forme oversize iconique', 'Style sport-chic intemporel', 'Confort optimal toute journée', 'Heritage motorsport'],
    specifications: { largeurVerres: '62mm', hauteurVerres: '54mm', pont: '12mm', branches: '125mm', poids: '28g' },
    images: [
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CHAMPION_DL5_JO_A.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CHAMPION_DL5_JO_B.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CHAMPION_DL5_JO_C.jpg'
    ],
    stock: 35, isNew: false, isBestseller: true, discount: 14, rating: 4.7, reviewsCount: 678,
    sku: 'CHAMPION-DL5JO', warranty: '2 ans', madeIn: 'Italie',
    tags: ['carrera', 'champion', 'iconique', 'sport', 'oversize', '1985']
  },
  {
    name: 'Carrera 1007/S',
    brand: 'Carrera',
    price: 210,
    originalPrice: 250,
    category: 'Sport',
    type: 'Masque',
    gender: 'Homme',
    color: 'Noir Mat/Rouge Racing',
    material: 'Optyl',
    description: 'Les 1007/S incarnent l\'ADN automobile de Carrera. Ce design inspiré des cockpits de Formule 1 avec détails rouges racing offre performance et style. Pour les hommes qui vivent à pleine vitesse.',
    shortDescription: 'L\'ADN automobile Carrera inspiré de la F1.',
    features: ['Design racing F1', 'Détails rouges signature', 'Optyl léger technique', 'Style cockpit', 'Performance maximale'],
    specifications: { largeurVerres: '60mm', hauteurVerres: '44mm', pont: '15mm', branches: '135mm', poids: '30g' },
    images: [
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CARRERA1007S_003_A.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CARRERA1007S_003_B.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CARRERA1007S_003_C.jpg'
    ],
    stock: 28, isNew: true, isBestseller: false, discount: 16, rating: 4.6, reviewsCount: 345,
    sku: 'CARRERA1007S-003', warranty: '2 ans', madeIn: 'Italie',
    tags: ['carrera', 'racing', 'automobile', 'sport', 'homme', 'f1']
  },
  {
    name: 'Carrera 5003',
    brand: 'Carrera',
    price: 175,
    originalPrice: 200,
    category: 'Solaire',
    type: 'Carré',
    gender: 'Mixte',
    color: 'Havana/Marron',
    material: 'Acétate',
    description: 'Les 5003 revisitent les archives Carrera avec style. Cette forme carrée en acétate havana avec verres marron incarne le rétro-cool authentique. Un classique intemporel pour les amateurs de vintage.',
    shortDescription: 'Le rétro-cool des archives Carrera.',
    features: ['Style vintage authentique', 'Acétate havana premium', 'Verres marron classiques', 'Archives Carrera', 'Rétro-cool intemporel'],
    specifications: { largeurVerres: '55mm', hauteurVerres: '45mm', pont: '17mm', branches: '140mm', poids: '32g' },
    images: [
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CARRERA5003_0KC_A.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CARRERA5003_0KC_B.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/CARRERA5003_0KC_C.jpg'
    ],
    stock: 40, isNew: false, isBestseller: false, discount: 13, rating: 4.5, reviewsCount: 234,
    sku: 'CARRERA5003-0KC', warranty: '2 ans', madeIn: 'Italie',
    tags: ['carrera', 'vintage', 'havana', 'rétro', 'archives', 'classique']
  },
  {
    name: 'Carrera Grand Prix 2/S',
    brand: 'Carrera',
    price: 220,
    originalPrice: 260,
    category: 'Sport',
    type: 'Aviateur',
    gender: 'Homme',
    color: 'Noir/Bleu Miroir',
    material: 'Métal',
    description: 'Les Grand Prix 2/S célèbrent l\'héritage motorsport légendaire de Carrera. Cet aviateur en métal avec verres bleus miroir et détails techniques incarne l\'adrénaline des circuits. Pour les passionnés de vitesse.',
    shortDescription: 'L\'héritage motorsport en aviateur miroir.',
    features: ['Héritage motorsport légendaire', 'Verres miroir bleus flash', 'Métal technique léger', 'Style racing authentique', 'Adrénaline garantie'],
    specifications: { largeurVerres: '64mm', hauteurVerres: '54mm', pont: '9mm', branches: '140mm', poids: '35g' },
    images: [
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/GRANDPRIX2_T5C_A.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/GRANDPRIX2_T5C_B.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/GRANDPRIX2_T5C_C.jpg'
    ],
    stock: 25, isNew: false, isBestseller: true, discount: 15, rating: 4.8, reviewsCount: 412,
    sku: 'GRANDPRIX2-T5C', warranty: '2 ans', madeIn: 'Italie',
    tags: ['carrera', 'grand prix', 'motorsport', 'aviateur', 'racing', 'miroir']
  },
  {
    name: 'Carrera Flaglab 12',
    brand: 'Carrera',
    price: 195,
    originalPrice: 230,
    category: 'Sport',
    type: 'Masque',
    gender: 'Mixte',
    color: 'Blanc/Multicolore',
    material: 'Nylon',
    description: 'Les Flaglab 12 explosent de couleurs et d\'audace. Ce masque blanc avec verres multicolores et logo flag signature incarne le streetwear sportif le plus audacieux. Pour ceux qui osent se démarquer.',
    shortDescription: 'L\'explosion de couleurs streetwear Carrera.',
    features: ['Verres multicolores vibrants', 'Logo flag signature', 'Style streetwear audacieux', 'Design sportif moderne', 'Statement absolu'],
    specifications: { largeurVerres: '99mm', hauteurVerres: '45mm', pont: '1mm', branches: '130mm', poids: '38g' },
    images: [
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/FLAGLAB12_VK6_A.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/FLAGLAB12_VK6_B.jpg',
      'https://www.carreraworld.com/dw/image/v2/BJGB_PRD/on/demandware.static/-/Sites-carrera-master/default/dw8c8e3e8c/images/FLAGLAB12_VK6_C.jpg'
    ],
    stock: 30, isNew: true, isBestseller: false, discount: 15, rating: 4.5, reviewsCount: 178,
    sku: 'FLAGLAB12-VK6', warranty: '2 ans', madeIn: 'Italie',
    tags: ['carrera', 'flaglab', 'multicolore', 'streetwear', 'audacieux', 'masque']
  }
];
