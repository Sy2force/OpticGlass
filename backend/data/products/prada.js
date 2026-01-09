// PRADA - 5 produits avec fiches complètes et vraies images
export const pradaProducts = [
  {
    name: 'Prada PR 01OS Conceptual',
    brand: 'Prada',
    price: 360,
    originalPrice: 420,
    category: 'Luxe',
    type: 'Carré',
    gender: 'Femme',
    color: 'Noir/Gris Dégradé',
    material: 'Acétate',
    description: 'Le minimalisme milanais à la perfection. Cette monture carrée en acétate noir arbore le logo triangulaire emblématique de Prada. Les verres gris dégradés apportent une sophistication discrète pour les femmes qui cultivent le raffinement.',
    shortDescription: 'Le minimalisme milanais à son apogée.',
    features: ['Logo triangulaire Prada signature', 'Acétate italien premium', 'Verres gris dégradés', 'Design minimaliste épuré', 'Élégance discrète milanaise'],
    specifications: { largeurVerres: '55mm', hauteurVerres: '45mm', pont: '18mm', branches: '140mm', poids: '35g' },
    images: [
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR01O/1AB3M1/0PR01O_1AB3M1_F0A7N_S_055_SLF.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR01O/1AB3M1/0PR01O_1AB3M1_F0A7N_S_055_SLA.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR01O/1AB3M1/0PR01O_1AB3M1_F0A7N_S_055_SLB.jpg'
    ],
    stock: 28, isNew: false, isBestseller: true, discount: 14, rating: 4.8, reviewsCount: 678,
    sku: 'PR01OS-1AB3M1', warranty: '2 ans', madeIn: 'Italie',
    tags: ['prada', 'minimaliste', 'milan', 'élégant', 'femme', 'conceptual']
  },
  {
    name: 'Prada PR 17WS Symbole',
    brand: 'Prada',
    price: 395,
    originalPrice: 460,
    category: 'Luxe',
    type: 'Papillon',
    gender: 'Femme',
    color: 'Tortoise/Marron',
    material: 'Acétate',
    description: 'La forme papillon sublimée avec l\'élégance italienne Prada. L\'acétate tortoise aux reflets chauds est rehaussé du logo Prada sur les branches. Une sophistication absolue pour les femmes exigeantes.',
    shortDescription: 'La sophistication italienne en forme papillon.',
    features: ['Forme papillon élégante', 'Acétate tortoise premium', 'Logo Prada sur branches', 'Verres marron dégradés', 'Sophistication absolue'],
    specifications: { largeurVerres: '56mm', hauteurVerres: '48mm', pont: '19mm', branches: '140mm', poids: '38g' },
    images: [
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR17W/2AU6S1/0PR17W_2AU6S1_F00A6_S_056_SLF.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR17W/2AU6S1/0PR17W_2AU6S1_F00A6_S_056_SLA.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR17W/2AU6S1/0PR17W_2AU6S1_F00A6_S_056_SLB.jpg'
    ],
    stock: 24, isNew: false, isBestseller: false, discount: 14, rating: 4.7, reviewsCount: 432,
    sku: 'PR17WS-2AU6S1', warranty: '2 ans', madeIn: 'Italie',
    tags: ['prada', 'papillon', 'tortoise', 'sophistiqué', 'femme', 'symbole']
  },
  {
    name: 'Prada Linea Rossa PS 01US',
    brand: 'Prada',
    price: 340,
    originalPrice: 400,
    category: 'Sport',
    type: 'Masque',
    gender: 'Homme',
    color: 'Noir Rubber/Gris',
    material: 'Nylon',
    description: 'La fusion parfaite du luxe italien et de la performance sportive. Cette monture en nylon technique arbore la bande rouge signature de Prada Linea Rossa. Design aérodynamique pour les hommes actifs qui ne renoncent pas au style.',
    shortDescription: 'Le luxe italien rencontre la performance sportive.',
    features: ['Ligne rouge Linea Rossa', 'Nylon technique léger', 'Verres gris miroir', 'Sport luxe italien', 'Design aérodynamique'],
    specifications: { largeurVerres: '59mm', hauteurVerres: '42mm', pont: '14mm', branches: '135mm', poids: '28g' },
    images: [
      'https://www.prada.com/content/dam/pradabkg_products/0/0PS/0PS01U/DG05S0/0PS01U_DG05S0_F00A7_S_059_SLF.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PS/0PS01U/DG05S0/0PS01U_DG05S0_F00A7_S_059_SLA.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PS/0PS01U/DG05S0/0PS01U_DG05S0_F00A7_S_059_SLB.jpg'
    ],
    stock: 30, isNew: true, isBestseller: false, discount: 15, rating: 4.8, reviewsCount: 345,
    sku: 'PS01US-DG05S0', warranty: '2 ans', madeIn: 'Italie',
    tags: ['prada', 'linea rossa', 'sport', 'luxe', 'homme', 'rubber']
  },
  {
    name: 'Prada PR 14WS Runway',
    brand: 'Prada',
    price: 380,
    originalPrice: 440,
    category: 'Luxe',
    type: 'Œil de chat',
    gender: 'Femme',
    color: 'Noir/Argent',
    material: 'Métal',
    description: 'Design avant-gardiste tout droit sorti des podiums milanais. Cette forme œil de chat en métal argenté aux lignes architecturales incarne l\'innovation Prada. Pour les femmes visionnaires qui osent l\'originalité.',
    shortDescription: 'L\'avant-garde architecturale des podiums Prada.',
    features: ['Design architectural runway', 'Métal argenté poli', 'Verres fumés', 'Forme audacieuse féline', 'Avant-garde milanaise'],
    specifications: { largeurVerres: '52mm', hauteurVerres: '42mm', pont: '20mm', branches: '140mm', poids: '30g' },
    images: [
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR14W/1BC5S0/0PR14W_1BC5S0_F0A7N_S_052_SLF.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR14W/1BC5S0/0PR14W_1BC5S0_F0A7N_S_052_SLA.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR14W/1BC5S0/0PR14W_1BC5S0_F0A7N_S_052_SLB.jpg'
    ],
    stock: 20, isNew: true, isBestseller: false, discount: 14, rating: 4.6, reviewsCount: 198,
    sku: 'PR14WS-1BC5S0', warranty: '2 ans', madeIn: 'Italie',
    tags: ['prada', 'runway', 'avant-garde', 'architectural', 'femme', 'podium']
  },
  {
    name: 'Prada PR 51VS Heritage',
    brand: 'Prada',
    price: 370,
    originalPrice: 430,
    category: 'Luxe',
    type: 'Ronde',
    gender: 'Mixte',
    color: 'Havana/Vert',
    material: 'Acétate',
    description: 'Le style vintage revisité avec le raffinement italien Prada. Ces lunettes rondes en acétate havana avec pont keyhole évoquent l\'élégance des années 60. Un modèle unisexe pour les amateurs de rétro-chic.',
    shortDescription: 'Le vintage italien avec pont keyhole signature.',
    features: ['Pont keyhole rétro', 'Acétate havana premium', 'Verres verts classiques', 'Style années 60', 'Design unisexe'],
    specifications: { largeurVerres: '50mm', hauteurVerres: '50mm', pont: '22mm', branches: '145mm', poids: '32g' },
    images: [
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR51V/2AU1I0/0PR51V_2AU1I0_F00A6_S_050_SLF.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR51V/2AU1I0/0PR51V_2AU1I0_F00A6_S_050_SLA.jpg',
      'https://www.prada.com/content/dam/pradabkg_products/0/0PR/0PR51V/2AU1I0/0PR51V_2AU1I0_F00A6_S_050_SLB.jpg'
    ],
    stock: 26, isNew: false, isBestseller: false, discount: 14, rating: 4.7, reviewsCount: 287,
    sku: 'PR51VS-2AU1I0', warranty: '2 ans', madeIn: 'Italie',
    tags: ['prada', 'heritage', 'vintage', 'keyhole', 'unisexe', 'havana']
  }
];
