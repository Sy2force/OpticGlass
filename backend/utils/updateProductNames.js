import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, '../data/products.js');

// Prefixes par saison
const seasonPrefixes = {
  winter: ['Frost', 'Arctic', 'Snow', 'Ice', 'Crystal', 'Polar', 'Nordic', 'Alpine'],
  summer: ['Sun', 'Beach', 'Coral', 'Tropic', 'Sunset', 'Wave', 'Breeze', 'Coastal'],
  spring: ['Bloom', 'Petal', 'Garden', 'Fresh', 'Meadow', 'Blossom', 'Dawn', 'Flora'],
  autumn: ['Amber', 'Maple', 'Harvest', 'Rustic', 'Golden', 'Copper', 'Forest', 'Ember']
};

// Suffixes par genre
const genderSuffixes = {
  men: ['Pro', 'Bold', 'Edge', 'Force', 'Prime', 'Max', 'Sport', 'Classic'],
  women: ['Chic', 'Grace', 'Luxe', 'Elegance', 'Glam', 'Bloom', 'Aura', 'Belle'],
  unisex: ['Style', 'Vision', 'Optic', 'View', 'Look', 'Frame', 'Lens', 'Clear']
};

// Noms de base pour les lunettes
const baseNames = [
  'Vista', 'Horizon', 'Clarity', 'Focus', 'Prism', 'Spectrum', 'Ray', 'Glow',
  'Shine', 'Spark', 'Flash', 'Beam', 'Light', 'Shade', 'Tint', 'Hue',
  'Tone', 'Blend', 'Mix', 'Fusion', 'Core', 'Pure', 'True', 'Real'
];

const getRandomItem = (arr, index) => arr[index % arr.length];

const generateProductName = (product, index) => {
  const season = product.season || 'summer';
  const gender = product.gender || 'unisex';
  
  const prefix = getRandomItem(seasonPrefixes[season] || seasonPrefixes.summer, index);
  const base = getRandomItem(baseNames, index + 5);
  const suffix = getRandomItem(genderSuffixes[gender] || genderSuffixes.unisex, index + 3);
  
  return `${prefix} ${base} ${suffix}`;
};

const updateProducts = () => {
  const content = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
  const match = content.match(/export const products = (\[[\s\S]*\]);?/);
  
  if (!match) {
    console.error('Could not parse products file');
    return;
  }
  
  let products;
  try {
    products = eval(match[1]);
  } catch (e) {
    console.error('Error parsing products:', e);
    return;
  }
  
  // Ensure all products have proper season and gender
  const seasons = ['winter', 'summer', 'spring', 'autumn'];
  const genders = ['men', 'women', 'unisex'];
  
  const updatedProducts = products.map((product, index) => {
    // Assign season if not present or invalid
    if (!product.season || !seasons.includes(product.season)) {
      product.season = seasons[index % seasons.length];
    }
    
    // Assign gender if not present or invalid
    if (!product.gender || !genders.includes(product.gender)) {
      product.gender = genders[index % genders.length];
    }
    
    // Generate new name based on season and gender
    product.name = generateProductName(product, index);
    
    // Ensure stock is reasonable
    if (!product.stock || product.stock < 1) {
      product.stock = Math.floor(Math.random() * 50) + 5;
    }
    
    // Ensure rating is valid
    if (!product.rating) {
      product.rating = (4 + Math.random()).toFixed(1);
    }
    
    // Ensure reviewsCount exists
    if (!product.reviewsCount) {
      product.reviewsCount = Math.floor(Math.random() * 200) + 10;
    }
    
    return product;
  });
  
  // Write back
  const newContent = `export const products = ${JSON.stringify(updatedProducts, null, 2)};\n`;
  fs.writeFileSync(PRODUCTS_FILE, newContent);
  
  console.log('✅ Products updated with season/gender-based names');
  console.log(`📊 Total products: ${updatedProducts.length}`);
  
  // Stats
  const stats = {
    seasons: {},
    genders: {},
    categories: {}
  };
  
  updatedProducts.forEach(p => {
    stats.seasons[p.season] = (stats.seasons[p.season] || 0) + 1;
    stats.genders[p.gender] = (stats.genders[p.gender] || 0) + 1;
    stats.categories[p.category] = (stats.categories[p.category] || 0) + 1;
  });
  
  console.log('\n📈 Distribution:');
  console.log('Seasons:', stats.seasons);
  console.log('Genders:', stats.genders);
  console.log('Categories:', stats.categories);
};

updateProducts();
