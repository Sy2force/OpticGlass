// GUCCI - 5 produits avec fiches complètes et vraies images
export const gucciProducts = [
  {
    name: 'Gucci GG0061S Aviator',
    brand: 'Gucci',
    price: 390,
    originalPrice: 450,
    category: 'Luxe',
    type: 'Aviateur',
    gender: 'Femme',
    color: 'Or/Rose Dégradé',
    material: 'Métal',
    description: 'Le glamour italien à son apogée. Cet aviateur en métal doré est orné du double G emblématique de la maison Gucci. Les verres roses dégradés apportent une touche romantique et sophistiquée, parfait pour les femmes qui osent briller.',
    shortDescription: 'Le glamour italien dans un aviateur luxueux.',
    features: ['Logo double G emblématique', 'Métal doré premium 18K', 'Verres roses dégradés', 'Étui cuir Gucci inclus', 'Certificat d\'authenticité'],
    specifications: { largeurVerres: '56mm', hauteurVerres: '52mm', pont: '17mm', branches: '140mm', poids: '35g' },
    images: [
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1513601437/491408_J0740_8059_001_100_0000_Light-Aviator-metal-sunglasses.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1513601438/491408_J0740_8059_002_100_0000_Light-Aviator-metal-sunglasses.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1513601439/491408_J0740_8059_003_100_0000_Light-Aviator-metal-sunglasses.jpg'
    ],
    stock: 25, isNew: false, isBestseller: true, discount: 13, rating: 4.9, reviewsCount: 567,
    sku: 'GG0061S-004', warranty: '2 ans', madeIn: 'Italie',
    tags: ['gucci', 'luxe', 'aviateur', 'glamour', 'femme', 'or rose']
  },
  {
    name: 'Gucci GG0034S Papillon Oversize',
    brand: 'Gucci',
    price: 420,
    originalPrice: 480,
    category: 'Luxe',
    type: 'Papillon',
    gender: 'Femme',
    color: 'Havana/Vert',
    material: 'Acétate',
    description: 'Une déclaration de style audacieuse signée Gucci. Cette forme papillon oversize en acétate havana avec verres verts évoque le glamour des divas italiennes des années 60. Les branches ornées du logo GG entrelacé ajoutent une touche d\'opulence.',
    shortDescription: 'L\'audace glamour des divas italiennes.',
    features: ['Forme papillon oversize', 'Acétate italien haute qualité', 'Logo GG sur branches', 'Verres verts anti-UV', 'Style diva rétro'],
    specifications: { largeurVerres: '54mm', hauteurVerres: '50mm', pont: '25mm', branches: '140mm', poids: '42g' },
    images: [
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1515686437/461673_J0740_2330_001_100_0000_Light-Oversize-square-frame-sunglasses.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1515686438/461673_J0740_2330_002_100_0000_Light-Oversize-square-frame-sunglasses.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1515686439/461673_J0740_2330_003_100_0000_Light-Oversize-square-frame-sunglasses.jpg'
    ],
    stock: 20, isNew: false, isBestseller: false, discount: 13, rating: 4.8, reviewsCount: 423,
    sku: 'GG0034S-002', warranty: '2 ans', madeIn: 'Italie',
    tags: ['gucci', 'papillon', 'oversize', 'diva', 'havana', 'rétro']
  },
  {
    name: 'Gucci GG0113S Round Vintage',
    brand: 'Gucci',
    price: 450,
    originalPrice: 520,
    category: 'Luxe',
    type: 'Ronde',
    gender: 'Mixte',
    color: 'Or/Bleu Dégradé',
    material: 'Métal',
    description: 'Les lunettes rondes vintage revisitées avec une touche de luxe contemporain Gucci. La monture en métal doré finement travaillée accueille des verres bleus dégradés mystérieux. Un modèle unisexe qui séduit les amateurs de style rétro-chic.',
    shortDescription: 'Le vintage luxueux revisité par Gucci.',
    features: ['Style vintage luxe', 'Métal doré finement travaillé', 'Verres bleus dégradés', 'Design unisexe chic', 'Détails raffinés GG'],
    specifications: { largeurVerres: '44mm', hauteurVerres: '44mm', pont: '30mm', branches: '145mm', poids: '28g' },
    images: [
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1519747237/494329_I3330_8035_001_100_0000_Light-Round-frame-metal-sunglasses.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1519747238/494329_I3330_8035_002_100_0000_Light-Round-frame-metal-sunglasses.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1519747239/494329_I3330_8035_003_100_0000_Light-Round-frame-metal-sunglasses.jpg'
    ],
    stock: 18, isNew: true, isBestseller: false, discount: 13, rating: 4.7, reviewsCount: 312,
    sku: 'GG0113S-004', warranty: '2 ans', madeIn: 'Italie',
    tags: ['gucci', 'rond', 'vintage', 'luxe', 'unisexe', 'bleu']
  },
  {
    name: 'Gucci GG0010S Carré Web',
    brand: 'Gucci',
    price: 380,
    originalPrice: 440,
    category: 'Luxe',
    type: 'Carré',
    gender: 'Homme',
    color: 'Noir/Vert-Rouge',
    material: 'Acétate',
    description: 'Le choix des hommes raffinés qui apprécient l\'héritage Gucci. Cette monture carrée en acétate noir arbore la bande web tricolore vert-rouge emblématique de la maison. Un design sobre mais immédiatement reconnaissable.',
    shortDescription: 'L\'élégance masculine avec la bande web Gucci.',
    features: ['Bande web tricolore signature', 'Acétate noir premium', 'Verres gris anti-reflets', 'Design masculin affirmé', 'Logo GG discret'],
    specifications: { largeurVerres: '58mm', hauteurVerres: '47mm', pont: '17mm', branches: '145mm', poids: '38g' },
    images: [
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1459866038/GG0010S_002_001_100_0000_Light-Rectangular-frame-acetate-sunglasses.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1459866039/GG0010S_002_002_100_0000_Light-Rectangular-frame-acetate-sunglasses.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1459866040/GG0010S_002_003_100_0000_Light-Rectangular-frame-acetate-sunglasses.jpg'
    ],
    stock: 22, isNew: false, isBestseller: false, discount: 14, rating: 4.8, reviewsCount: 456,
    sku: 'GG0010S-002', warranty: '2 ans', madeIn: 'Italie',
    tags: ['gucci', 'homme', 'carré', 'web', 'tricolore', 'classique']
  },
  {
    name: 'Gucci GG0516S Cat Eye Cristaux',
    brand: 'Gucci',
    price: 510,
    originalPrice: 580,
    category: 'Luxe',
    type: 'Œil de chat',
    gender: 'Femme',
    color: 'Bordeaux/Or',
    material: 'Acétate',
    description: 'Une explosion de glamour signée Gucci. Cette forme œil de chat audacieuse en acétate bordeaux est ornée de cristaux scintillants sur les branches. Un modèle pour les femmes qui veulent captiver tous les regards.',
    shortDescription: 'L\'explosion de glamour avec cristaux précieux.',
    features: ['Cristaux sur branches', 'Acétate bordeaux luxueux', 'Forme œil de chat féline', 'Détails dorés raffinés', 'Ultra glamour hollywoodien'],
    specifications: { largeurVerres: '54mm', hauteurVerres: '44mm', pont: '20mm', branches: '145mm', poids: '40g' },
    images: [
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1567092037/596092_J0740_6012_001_100_0000_Light-Cat-eye-sunglasses-with-crystals.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1567092038/596092_J0740_6012_002_100_0000_Light-Cat-eye-sunglasses-with-crystals.jpg',
      'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1567092039/596092_J0740_6012_003_100_0000_Light-Cat-eye-sunglasses-with-crystals.jpg'
    ],
    stock: 15, isNew: true, isBestseller: false, discount: 12, rating: 4.9, reviewsCount: 234,
    sku: 'GG0516S-003', warranty: '2 ans', madeIn: 'Italie',
    tags: ['gucci', 'oeil de chat', 'cristaux', 'bordeaux', 'glamour', 'hollywood']
  }
];
