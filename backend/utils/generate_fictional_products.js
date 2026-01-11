import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADJECTIVES = ['Soléra', 'Nova', 'Eclipse', 'Quartz', 'Zenit', 'Aéria', 'Luna', 'Vesta', 'Orion', 'Polaris', 'Vega', 'Sirius', 'Altair', 'Mira', 'Lyra', 'Helios', 'Apex', 'Flux', 'Lumen', 'Prisma', 'Spectra', 'Chronos', 'Aether', 'Ion', 'Radia', 'Stratus', 'Nimbus', 'Cirrus', 'Ventus', 'Terra'];
const NOUNS = ['Air', 'Vision', 'Edge', 'Soft', 'Clear', 'Max', 'Lite', 'Prime', 'Core', 'Ray', 'View', 'Sight', 'Scope', 'Lens', 'Frame', 'Guard', 'Shield', 'Focus', 'Glance', 'Look', 'Shade', 'Tint', 'Beam', 'Glow', 'Flash', 'Spark', 'Shine', 'Vista', 'Scene', 'Aspect'];

const COLORS = ['Noir Minuit', 'Écaille Tortue', 'Or Solaire', 'Argent Lunaire', 'Bleu Océan', 'Gris Ardoise', 'Brun Terre', 'Rose Poudré', 'Vert Forêt', 'Transparent Cristal'];
const SHAPES = ['Aviator', 'Square', 'Round', 'Rectangular', 'Cat-Eye', 'Geometric', 'Browline', 'Oversized'];
const CATEGORIES = ['sunglasses', 'optical'];
const BRANDS = [
  'Soléra', 'Zenith', 'Aurélia', 'Vespera', 'Equinox', 'Lumina', 'Orion', 'Apex', 'Artis', 'Nova',
  'Ethereal', 'Céleste', 'Romano', 'Royale', 'Baron', 'Heritage', 'Sportif', 'Roma', 'London', 'Rossi'
];

// Unsplash Image IDs for eyewear (generic, stylish, high quality)
// We will cycle through these to ensure valid images
const UNSPLASH_IDS = {
  sunglasses: [
    '1511499767150-a48a237f0083', // Sunglasses on table
    '1572635196237-14b3f281503f', // Sunglasses lifestyle
    '1577803645773-f96470509666', // Cat eye sunglasses
    '1570222094114-2819cd987a25', // Round sunglasses
    '1508296695146-0c8690410c31', // Aviator style
    '1509695507497-903c140c4356', // Dark sunglasses
    '1570482607773-7cb791c2968c', // Fashion sunglasses
    '1574258495973-f010dfbb5371', // Store display
    '1513694203232-719a286e2969', // Minimalist sunglasses
    '1473496169904-658ba7c44d8a', // Lifestyle
    '1563907797782-72c676767727', // Sunglasses flat lay
    '1614716766737-25e24744747c', // Modern sunglasses
    '1604514285736-231a7732bdbe', // Red sunglasses
    '1625591342274-013866180475', // Blue lens
    '1589782182703-2aaa192f4369', // Classic black
  ],
  optical: [
    '1591076482161-42ce6da69f67', // Clear glasses on book
    '1574258495973-f010dfbb5371', // Glasses display
    '1556740758-90de374c12ad', // Store interior
    '1562920722333-727829ac3e79', // Glasses on face
    '1582142896383-c9069e3a5161', // Reading glasses
    '1597852075236-19018f6cc6b4', // Round glasses
    '1617723439102-3a9d043d9435', // Transparent frame
    '1559526324-593bc973d63b', // Workspace glasses
    '1520366677860-2e067c2c5c4e', // Minimalist glasses
    '1619626620573-2c0663737477', // Wire frame glasses
    '1509695507497-903c140c4356', // Glasses on wood
    '1556742502-ec7c0e9f34b1', // Optical shop
    '1556742522-d0f7797529a6', // Glasses rack
    '1556742159-d69eb0753cb7', // Eye test
    '1556742205-e10c9486e506', // Optician
  ]
};

const generatePrice = () => {
  return Math.floor(Math.random() * (350 - 120 + 1) + 120) * 10 / 10;
};

const generateProducts = () => {
  const products = [];
  const usedNames = new Set();

  for (let i = 0; i < 70; i++) {
    // Generate Unique Name
    let name;
    do {
      const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
      const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
      name = `${adj} ${noun}`;
    } while (usedNames.has(name));
    usedNames.add(name);

    const category = i < 40 ? 'sunglasses' : 'optical'; // 40 sun, 30 optical
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    
    // Select image from Unsplash ID pool
    const pool = UNSPLASH_IDS[category];
    const imageId = pool[i % pool.length];
    
    // We will download these later to /images/products/
    // Naming convention: category-name-slug.jpg
    const slug = name.toLowerCase().replace(' ', '-');
    const localImagePath = `/images/products/${category}-${slug}.jpg`;
    
    // Add remote URL for the download script to find (we'll strip this before saving file if needed, or use a separate mapping)
    // Actually, let's keep the Unsplash URL in a comment or separate property for the downloader
    const unsplashUrl = `https://images.unsplash.com/photo-${imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;

    products.push({
      name: name,
      brand: brand,
      category: category,
      season: Math.random() > 0.5 ? 'summer' : 'winter',
      price: generatePrice(),
      originalPrice: generatePrice() + 50,
      description: `Le modèle ${name} incarne l'élégance moderne. Avec sa monture ${color} de forme ${shape.toLowerCase()}, il offre un confort exceptionnel et un style intemporel. Conçu pour ceux qui recherchent la distinction au quotidien.`,
      images: [localImagePath],
      colors: [color, COLORS[Math.floor(Math.random() * COLORS.length)]],
      frameShape: shape.toLowerCase(),
      material: Math.random() > 0.5 ? 'Acetate' : 'Metal',
      gender: Math.random() > 0.3 ? 'unisex' : (Math.random() > 0.5 ? 'women' : 'men'),
      stock: Math.floor(Math.random() * 50) + 5,
      rating: (Math.random() * (5 - 4) + 4).toFixed(1),
      reviewsCount: Math.floor(Math.random() * 200) + 10,
      isBestseller: Math.random() > 0.8,
      isNewArrival: Math.random() > 0.8,
      // Internal property for downloader, will be removed before saving to products.js? 
      // Actually we can leave it or generate a separate mapping file. 
      // Let's attach it here and clean it up or use it in the downloader.
      _downloadUrl: unsplashUrl
    });
  }

  return products;
};

const productsList = generateProducts();

// Save products.js (ESM format)
const productsContent = `export const products = ${JSON.stringify(productsList.map(p => {
  const { _downloadUrl, ...rest } = p;
  return rest;
}), null, 2)};\n\nexport default products;\n`;

const productsPath = path.join(__dirname, '../data/products.js');
fs.writeFileSync(productsPath, productsContent);

// Save download mapping for the downloader script
const downloadMapping = productsList.map(p => ({
  url: p._downloadUrl,
  filename: path.basename(p.images[0])
}));

const mappingPath = path.join(__dirname, 'image_mapping.json');
fs.writeFileSync(mappingPath, JSON.stringify(downloadMapping, null, 2));

console.log(`✅ Generated ${productsList.length} fictional products in ${productsPath}`);
console.log(`✅ Created image download mapping in ${mappingPath}`);
