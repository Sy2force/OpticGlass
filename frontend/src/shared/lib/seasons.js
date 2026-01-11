// Logique des saisons pour Optic Glass

import { SEASONS, SEASON_LABELS } from './constants';

// Couleurs des saisons (définies localement pour éviter les imports circulaires)
export const SEASON_COLORS = {
  spring: {
    primary: '#FFB6C1',
    secondary: '#98FB98',
    accent: '#87CEEB',
  },
  summer: {
    primary: '#FFD700',
    secondary: '#FF6347',
    accent: '#00CED1',
  },
  autumn: {
    primary: '#D2691E',
    secondary: '#FF8C00',
    accent: '#8B4513',
  },
  winter: {
    primary: '#4169E1',
    secondary: '#E0E0E0',
    accent: '#1E90FF',
  },
};

/**
 * Obtient la saison actuelle basée sur la date
 */
export const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1; // 1-12

  if (month >= 3 && month <= 5) return SEASONS.SPRING;
  if (month >= 6 && month <= 8) return SEASONS.SUMMER;
  if (month >= 9 && month <= 11) return SEASONS.AUTUMN;
  return SEASONS.WINTER;
};

/**
 * Obtient le label de la saison actuelle
 */
export const getCurrentSeasonLabel = () => {
  return SEASON_LABELS[getCurrentSeason()];
};

/**
 * Obtient les couleurs de la saison actuelle
 */
export const getCurrentSeasonColors = () => {
  return SEASON_COLORS[getCurrentSeason()];
};

/**
 * Obtient les informations complètes de la saison actuelle
 */
export const getCurrentSeasonInfo = () => {
  const season = getCurrentSeason();
  return {
    id: season,
    label: SEASON_LABELS[season],
    colors: SEASON_COLORS[season],
    ...getSeasonTheme(season),
  };
};

/**
 * Obtient le thème d'une saison
 */
export const getSeasonTheme = (season) => {
  const themes = {
    spring: {
      title: 'Spring Collection',
      subtitle: 'Fresh and Light',
      description: 'Discover our spring collection with lightweight frames and pastel colors.',
      heroImage: '/assets/images/seasons/spring-hero.jpg',
      backgroundGradient: 'from-pink-100 via-green-50 to-blue-100',
      accentColor: 'text-pink-500',
      buttonColor: 'bg-pink-500 hover:bg-pink-600',
      keywords: ['light', 'pastel', 'floral', 'transparent'],
    },
    summer: {
      title: 'Summer Collection',
      subtitle: 'Sun and Protection',
      description: 'Protect your eyes in style with our summer sunglasses collection.',
      heroImage: '/assets/images/seasons/summer-hero.jpg',
      backgroundGradient: 'from-yellow-100 via-orange-50 to-cyan-100',
      accentColor: 'text-orange-500',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      keywords: ['sun', 'beach', 'sport', 'polarized'],
    },
    autumn: {
      title: 'Autumn Collection',
      subtitle: 'Elegance and Warmth',
      description: 'Warm tones and noble materials for a stylish season.',
      heroImage: '/assets/images/seasons/autumn-hero.jpg',
      backgroundGradient: 'from-orange-100 via-amber-50 to-brown-100',
      accentColor: 'text-amber-600',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
      keywords: ['tortoise', 'wood', 'brown', 'vintage'],
    },
    winter: {
      title: 'Winter Collection',
      subtitle: 'Prestige and Sophistication',
      description: 'Premium frames to face winter with elegance.',
      heroImage: '/assets/images/seasons/winter-hero.jpg',
      backgroundGradient: 'from-blue-100 via-gray-50 to-indigo-100',
      accentColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      keywords: ['premium', 'metal', 'silver', 'black'],
    },
  };

  return themes[season] || themes.spring;
};

/**
 * Obtient toutes les saisons avec leurs informations
 */
export const getAllSeasons = () => {
  return Object.values(SEASONS).map((season) => ({
    id: season,
    label: SEASON_LABELS[season],
    colors: SEASON_COLORS[season],
    ...getSeasonTheme(season),
  }));
};

/**
 * Vérifie si un produit correspond à la saison actuelle
 */
export const isSeasonalProduct = (product) => {
  if (!product || !product.season) return false;
  return product.season === getCurrentSeason();
};

/**
 * Filtre les produits par saison
 */
export const filterProductsBySeason = (products, season = null) => {
  const targetSeason = season || getCurrentSeason();
  return products.filter((product) => product.season === targetSeason);
};

/**
 * Obtient les produits recommandés pour la saison
 */
export const getSeasonalRecommendations = (products, limit = 8) => {
  const seasonalProducts = filterProductsBySeason(products);
  
  // Si pas assez de produits saisonniers, compléter avec d'autres
  if (seasonalProducts.length < limit) {
    const otherProducts = products.filter((p) => p.season !== getCurrentSeason());
    return [...seasonalProducts, ...otherProducts].slice(0, limit);
  }
  
  return seasonalProducts.slice(0, limit);
};

/**
 * Obtient le message promotionnel saisonnier
 */
export const getSeasonalSaleMessage = () => {
  const season = getCurrentSeason();
  
  const messages = {
    spring: {
      title: 'Spring Offer',
      message: '-20% on the spring collection',
      code: 'SPRING20',
    },
    summer: {
      title: 'Summer Sale',
      message: 'Up to -30% on sunglasses',
      code: 'SUMMER30',
    },
    autumn: {
      title: 'Autumn Collection',
      message: '-15% on optical frames',
      code: 'AUTUMN15',
    },
    winter: {
      title: 'Winter Offer',
      message: '-25% on the premium collection',
      code: 'WINTER25',
    },
  };

  return messages[season];
};

/**
 * Obtient les catégories mises en avant pour la saison
 */
export const getSeasonalCategories = () => {
  const season = getCurrentSeason();
  
  const categories = {
    spring: ['vue', 'transparent', 'pastel'],
    summer: ['soleil', 'sport', 'polarise'],
    autumn: ['vue', 'vintage', 'ecaille'],
    winter: ['chic', 'métal', 'premium'],
  };

  return categories[season] || categories.spring;
};

/**
 * Calcule le nombre de jours jusqu'à la prochaine saison
 */
export const getDaysUntilNextSeason = () => {
  const now = new Date();
  const year = now.getFullYear();
  
  const seasonDates = [
    new Date(year, 2, 21),  // Printemps - 21 mars
    new Date(year, 5, 21),  // Été - 21 juin
    new Date(year, 8, 21),  // Automne - 21 septembre
    new Date(year, 11, 21), // Hiver - 21 décembre
  ];

  // Trouver la prochaine date de changement de saison
  let nextSeasonDate = seasonDates.find((date) => date > now);
  
  // Si aucune date cette année, prendre le printemps de l'année prochaine
  if (!nextSeasonDate) {
    nextSeasonDate = new Date(year + 1, 2, 21);
  }

  const diffTime = nextSeasonDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Obtient le nom de la prochaine saison
 */
export const getNextSeason = () => {
  const currentSeason = getCurrentSeason();
  const seasonOrder = [SEASONS.SPRING, SEASONS.SUMMER, SEASONS.AUTUMN, SEASONS.WINTER];
  const currentIndex = seasonOrder.indexOf(currentSeason);
  const nextIndex = (currentIndex + 1) % seasonOrder.length;
  
  return {
    id: seasonOrder[nextIndex],
    label: SEASON_LABELS[seasonOrder[nextIndex]],
  };
};
