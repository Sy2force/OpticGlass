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
      title: 'Collection Printemps',
      subtitle: 'Fraîcheur et légèreté',
      description: 'Découvrez notre collection printanière avec des montures légères et des couleurs pastel.',
      heroImage: '/assets/images/seasons/spring-hero.jpg',
      backgroundGradient: 'from-pink-100 via-green-50 to-blue-100',
      accentColor: 'text-pink-500',
      buttonColor: 'bg-pink-500 hover:bg-pink-600',
      keywords: ['léger', 'pastel', 'floral', 'transparent'],
    },
    summer: {
      title: 'Collection Été',
      subtitle: 'Soleil et protection',
      description: 'Protégez vos yeux avec style grâce à notre collection estivale de lunettes de soleil.',
      heroImage: '/assets/images/seasons/summer-hero.jpg',
      backgroundGradient: 'from-yellow-100 via-orange-50 to-cyan-100',
      accentColor: 'text-orange-500',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      keywords: ['soleil', 'plage', 'sport', 'polarisé'],
    },
    autumn: {
      title: 'Collection Automne',
      subtitle: 'Élégance et chaleur',
      description: 'Des tons chauds et des matériaux nobles pour une rentrée stylée.',
      heroImage: '/assets/images/seasons/autumn-hero.jpg',
      backgroundGradient: 'from-orange-100 via-amber-50 to-brown-100',
      accentColor: 'text-amber-600',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
      keywords: ['écaille', 'bois', 'marron', 'vintage'],
    },
    winter: {
      title: 'Collection Hiver',
      subtitle: 'Luxe et sophistication',
      description: 'Des montures premium pour affronter l\'hiver avec élégance.',
      heroImage: '/assets/images/seasons/winter-hero.jpg',
      backgroundGradient: 'from-blue-100 via-gray-50 to-indigo-100',
      accentColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      keywords: ['luxe', 'métal', 'argent', 'noir'],
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
      title: '🌸 Offre Printemps',
      message: '-20% sur la collection printanière',
      code: 'SPRING20',
    },
    summer: {
      title: '☀️ Soldes d\'été',
      message: 'Jusqu\'à -30% sur les lunettes de soleil',
      code: 'SUMMER30',
    },
    autumn: {
      title: '🍂 Rentrée en beauté',
      message: '-15% sur les lunettes de vue',
      code: 'AUTUMN15',
    },
    winter: {
      title: '❄️ Offre Hiver',
      message: '-25% sur la collection luxe',
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
    winter: ['luxe', 'métal', 'premium'],
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
