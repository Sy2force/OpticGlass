// INDEX - Fichier principal regroupant tous les produits (50 au total)
import { raybanProducts } from './rayban.js';
import { oakleyProducts } from './oakley.js';
import { gucciProducts } from './gucci.js';
import { pradaProducts } from './prada.js';
import { tomfordProducts } from './tomford.js';
import { diorProducts } from './dior.js';
import { versaceProducts } from './versace.js';
import { carreraProducts } from './carrera.js';
import { persolProducts } from './persol.js';
import { polaroidProducts } from './polaroid.js';
import { celineProducts } from './celine.js';

// Combinaison de tous les produits (55 produits au total - 11 marques × 5 produits)
export const allProducts = [
  ...raybanProducts,      // 5 produits
  ...oakleyProducts,      // 5 produits
  ...gucciProducts,       // 5 produits
  ...pradaProducts,       // 5 produits
  ...tomfordProducts,     // 5 produits
  ...diorProducts,        // 5 produits
  ...versaceProducts,     // 5 produits
  ...carreraProducts,     // 5 produits
  ...persolProducts,      // 5 produits
  ...polaroidProducts,    // 5 produits
  ...celineProducts       // 5 produits = 55 total
];

// Export individuel des marques
export {
  raybanProducts,
  oakleyProducts,
  gucciProducts,
  pradaProducts,
  tomfordProducts,
  diorProducts,
  versaceProducts,
  carreraProducts,
  persolProducts,
  polaroidProducts,
  celineProducts
};

// Statistiques des produits
export const productStats = {
  total: 55,
  brands: 11,
  categories: {
    Solaire: allProducts.filter(p => p.category === 'Solaire').length,
    Sport: allProducts.filter(p => p.category === 'Sport').length,
    Luxe: allProducts.filter(p => p.category === 'Luxe').length,
    Enfant: allProducts.filter(p => p.category === 'Enfant').length
  },
  priceRange: {
    min: Math.min(...allProducts.map(p => p.price)),
    max: Math.max(...allProducts.map(p => p.price)),
    avg: Math.round(allProducts.reduce((sum, p) => sum + p.price, 0) / allProducts.length)
  }
};

export default allProducts;
