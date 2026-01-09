// OAKLEY - 5 produits avec fiches complètes et vraies images
export const oakleyProducts = [
  {
    name: 'Oakley Holbrook OO9102',
    brand: 'Oakley',
    price: 189,
    originalPrice: 219,
    category: 'Sport',
    type: 'Carré',
    gender: 'Homme',
    color: 'Noir Mat/Prizm Sapphire',
    material: 'O-Matter',
    description: 'Le Holbrook combine le design rétro américain des années 40-60 avec la technologie Prizm révolutionnaire d\'Oakley. Monture O-Matter ultra-résistante avec verres Prizm Sapphire qui amplifient les couleurs et les contrastes pour une vision optimale.',
    shortDescription: 'Le rétro américain rencontre la technologie Prizm.',
    features: ['Technologie Prizm Sapphire', 'O-Matter ultra-léger et résistant', 'Résistance aux impacts certifiée', 'Grip Unobtainium hydrophile', 'Design rétro-sport iconique'],
    specifications: { largeurVerres: '55mm', hauteurVerres: '44mm', pont: '18mm', branches: '137mm', poids: '27g' },
    images: [
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9102/OO9102-F555_main.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9102/OO9102-F555_A1.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9102/OO9102-F555_A2.png'
    ],
    stock: 50, isNew: false, isBestseller: true, discount: 14, rating: 4.8, reviewsCount: 2134,
    sku: 'OO9102-F555', warranty: '2 ans', madeIn: 'USA',
    tags: ['holbrook', 'prizm', 'sport', 'performance', 'bestseller', 'lifestyle']
  },
  {
    name: 'Oakley Radar EV Path OO9208',
    brand: 'Oakley',
    price: 219,
    originalPrice: 259,
    category: 'Sport',
    type: 'Masque',
    gender: 'Mixte',
    color: 'Polished White/Prizm Road',
    material: 'O-Matter',
    description: 'La référence absolue pour les cyclistes et coureurs professionnels. Le verre étendu offre un champ de vision inégalé tandis que la technologie Prizm Road optimise la perception des détails sur la route pour une performance maximale.',
    shortDescription: 'La référence absolue pour le cyclisme et la course.',
    features: ['Prizm Road pour contraste optimal', 'Champ de vision étendu vers le haut', 'Système ventilation Advancer', 'Grip Unobtainium antidérapant', 'Verres interchangeables Switchlock'],
    specifications: { largeurVerres: '138mm', hauteurVerres: '45mm', pont: '0mm', branches: '128mm', poids: '32g' },
    images: [
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9208/OO9208-5438_main.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9208/OO9208-5438_A1.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9208/OO9208-5438_A2.png'
    ],
    stock: 35, isNew: true, isBestseller: false, discount: 15, rating: 4.9, reviewsCount: 1567,
    sku: 'OO9208-5438', warranty: '2 ans', madeIn: 'USA',
    tags: ['radar', 'cyclisme', 'course', 'pro', 'performance', 'tour de france']
  },
  {
    name: 'Oakley Frogskins OO9013',
    brand: 'Oakley',
    price: 159,
    originalPrice: 179,
    category: 'Solaire',
    type: 'Carré',
    gender: 'Mixte',
    color: 'Polished Clear/Prizm Violet',
    material: 'O-Matter',
    description: 'Les Frogskins, icône des années 80 ressuscitée avec style moderne. Monture translucide en O-Matter avec verres Prizm Violet créant un look unique et coloré. L\'esprit californien décontracté dans toute sa splendeur.',
    shortDescription: 'L\'icône californienne des années 80.',
    features: ['Design iconique années 80', 'Monture translucide cristal', 'Verres Prizm Violet', 'O-Matter léger et durable', 'Style surf californien'],
    specifications: { largeurVerres: '55mm', hauteurVerres: '44mm', pont: '17mm', branches: '133mm', poids: '25g' },
    images: [
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9013/OO9013-H655_main.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9013/OO9013-H655_A1.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9013/OO9013-H655_A2.png'
    ],
    stock: 48, isNew: false, isBestseller: false, discount: 11, rating: 4.6, reviewsCount: 1234,
    sku: 'OO9013-H655', warranty: '2 ans', madeIn: 'USA',
    tags: ['frogskins', 'années 80', 'californie', 'coloré', 'fun', 'surf']
  },
  {
    name: 'Oakley Flak 2.0 XL OO9188',
    brand: 'Oakley',
    price: 199,
    originalPrice: 229,
    category: 'Sport',
    type: 'Masque',
    gender: 'Mixte',
    color: 'Polished Black/Prizm Black Polarized',
    material: 'O-Matter',
    description: 'Protection et performance maximales pour les athlètes les plus exigeants. Les verres Prizm Black Polarized éliminent les reflets tout en amplifiant les détails. Système de verres interchangeables pour s\'adapter à toutes les conditions.',
    shortDescription: 'Performance maximale pour athlètes exigeants.',
    features: ['Prizm Black Polarized anti-reflets', 'Verres interchangeables Switchlock', 'Ajustement Unobtainium personnalisable', 'Traitement anti-buée F3', 'Protection latérale étendue'],
    specifications: { largeurVerres: '59mm', hauteurVerres: '44mm', pont: '12mm', branches: '133mm', poids: '30g' },
    images: [
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9188/OO9188-9459_main.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9188/OO9188-9459_A1.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9188/OO9188-9459_A2.png'
    ],
    stock: 40, isNew: false, isBestseller: true, discount: 13, rating: 4.8, reviewsCount: 1876,
    sku: 'OO9188-9459', warranty: '2 ans', madeIn: 'USA',
    tags: ['flak', 'polarized', 'sport', 'athlète', 'performance', 'baseball']
  },
  {
    name: 'Oakley Sutro OO9406',
    brand: 'Oakley',
    price: 209,
    originalPrice: 239,
    category: 'Sport',
    type: 'Masque',
    gender: 'Mixte',
    color: 'Matte Black/Prizm Road',
    material: 'O-Matter',
    description: 'Design bouclier audacieux inspiré du cyclisme urbain et des podiums du Tour de France. Verre panoramique Prizm Road offrant une vision exceptionnelle, monture mate apportant une touche streetwear moderne.',
    shortDescription: 'Le bouclier urbain pour cyclistes stylés.',
    features: ['Design bouclier panoramique', 'Prizm Road haute définition', 'Style streetwear urbain', 'Protection coupe-vent totale', 'Monture mate légère'],
    specifications: { largeurVerres: '137mm', hauteurVerres: '50mm', pont: '0mm', branches: '140mm', poids: '33g' },
    images: [
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9406/OO9406-0137_main.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9406/OO9406-0137_A1.png',
      'https://www.oakley.com/on/demandware.static/-/Sites-masterCatalog_Oakley/default/dw8c8e3e8c/product/OO9406/OO9406-0137_A2.png'
    ],
    stock: 32, isNew: true, isBestseller: false, discount: 13, rating: 4.7, reviewsCount: 892,
    sku: 'OO9406-0137', warranty: '2 ans', madeIn: 'USA',
    tags: ['sutro', 'urbain', 'cyclisme', 'streetwear', 'bouclier', 'tour de france']
  }
];
