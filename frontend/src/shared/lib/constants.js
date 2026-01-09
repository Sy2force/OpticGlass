// Constantes globales de l'application Optic Glass

// API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005/api';

// Categories de produits
export const PRODUCT_CATEGORIES = {
  VUE: 'vue',
  SOLEIL: 'soleil',
  SPORT: 'sport',
  VINTAGE: 'vintage',
  LUXE: 'luxe',
};

export const CATEGORY_LABELS = {
  vue: 'Lunettes de vue',
  soleil: 'Lunettes de soleil',
  sport: 'Sport',
  vintage: 'Vintage',
  luxe: 'Collection Luxe',
};

// Genres
export const GENDERS = {
  HOMME: 'homme',
  FEMME: 'femme',
  UNISEX: 'unisex',
  ENFANT: 'enfant',
};

export const GENDER_LABELS = {
  homme: 'Homme',
  femme: 'Femme',
  unisex: 'Unisex',
  enfant: 'Enfant',
};

// Shapes de montures
export const FRAME_SHAPES = {
  RECTANGULAIRE: 'rectangulaire',
  RONDE: 'ronde',
  CARREE: 'carree',
  OVALE: 'ovale',
  AVIATEUR: 'aviateur',
  PAPILLON: 'papillon',
  CAT_EYE: 'cat-eye',
  WAYFARER: 'wayfarer',
};

export const FRAME_SHAPE_LABELS = {
  rectangulaire: 'Rectangulaire',
  ronde: 'Ronde',
  carree: 'Carrée',
  ovale: 'Ovale',
  aviateur: 'Aviateur',
  papillon: 'Papillon',
  'cat-eye': 'Cat Eye',
  wayfarer: 'Wayfarer',
};

// Matériaux
export const MATERIALS = {
  METAL: 'métal',
  ACETATE: 'acétate',
  TITANE: 'titane',
  PLASTIQUE: 'plastique',
  BOIS: 'bois',
  CARBONE: 'carbone',
};

export const MATERIAL_LABELS = {
  métal: 'Métal',
  acétate: 'Acétate',
  titane: 'Titane',
  plastique: 'Plastique',
  bois: 'Bois',
  carbone: 'Carbone',
};

// Colors
export const COLORS = [
  { id: 'noir', label: 'Noir', hex: '#000000' },
  { id: 'blanc', label: 'Blanc', hex: '#FFFFFF' },
  { id: 'or', label: 'Or', hex: '#D4AF37' },
  { id: 'argent', label: 'Argent', hex: '#C0C0C0' },
  { id: 'marron', label: 'Marron', hex: '#8B4513' },
  { id: 'bleu', label: 'Bleu', hex: '#0066CC' },
  { id: 'rouge', label: 'Rouge', hex: '#CC0000' },
  { id: 'vert', label: 'Vert', hex: '#228B22' },
  { id: 'rose', label: 'Rose', hex: '#FF69B4' },
  { id: 'ecaille', label: 'Écaille', hex: '#8B4513' },
  { id: 'transparent', label: 'Transparent', hex: '#E0E0E0' },
];

// Statuts de commande
export const ORDER_STATUS = {
  PENDING: 'pending',
  VALIDATED: 'validated',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  pending: 'En attente',
  validated: 'Validée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

export const ORDER_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  validated: 'bg-green-100 text-green-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800',
};

// Rôles utilisateurs
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Saisons
export const SEASONS = {
  SPRING: 'spring',
  SUMMER: 'summer',
  AUTUMN: 'autumn',
  WINTER: 'winter',
};

export const SEASON_LABELS = {
  spring: 'Printemps',
  summer: 'Été',
  autumn: 'Automne',
  winter: 'Hiver',
};

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

// Price
export const PRICE_RANGES = [
  { id: '0-500', label: 'Moins de 500 ₪', min: 0, max: 500 },
  { id: '500-1000', label: '500 - 1000 ₪', min: 500, max: 1000 },
  { id: '1000-2000', label: '1000 - 2000 ₪', min: 1000, max: 2000 },
  { id: '2000-5000', label: '2000 - 5000 ₪', min: 2000, max: 5000 },
  { id: '5000+', label: 'Plus de 5000 ₪', min: 5000, max: Infinity },
];

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [12, 24, 48];

// Tri
export const SORT_OPTIONS = [
  { id: 'newest', label: 'Nouveautés' },
  { id: 'price-asc', label: 'Prix croissant' },
  { id: 'price-desc', label: 'Prix décroissant' },
  { id: 'name-asc', label: 'Nom A-Z' },
  { id: 'name-desc', label: 'Nom Z-A' },
  { id: 'popular', label: 'Populaires' },
];

// Messages
export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Connexion réussie !',
    LOGIN_ERROR: 'Email ou mot de passe incorrect',
    REGISTER_SUCCESS: 'Inscription réussie !',
    REGISTER_ERROR: "Erreur lors de l'inscription",
    LOGOUT_SUCCESS: 'Déconnexion réussie',
    SESSION_EXPIRED: 'Session expirée. Veuillez vous reconnecter.',
  },
  CART: {
    ADDED: 'Produit ajouté au panier',
    REMOVED: 'Produit retiré du panier',
    UPDATED: 'Panier mis à jour',
    EMPTY: 'Votre panier est vide',
  },
  FAVORITES: {
    ADDED: 'Ajouté aux favoris',
    REMOVED: 'Retiré des favoris',
    EMPTY: "Vous n'avez pas encore de favoris",
  },
  ORDER: {
    SUCCESS: 'Commande passée avec succès !',
    ERROR: 'Erreur lors de la commande',
  },
  ERROR: {
    GENERIC: 'Une erreur est survenue. Veuillez réessayer.',
    NETWORK: 'Erreur de connexion. Vérifiez votre connexion internet.',
    SERVER: 'Erreur serveur. Veuillez réessayer plus tard.',
  },
};

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  PHONE_REGEX: /^(\+972|0)([23489]|5[0-9]|77)[0-9]{7}$/,
};

// Devise
export const CURRENCY = {
  CODE: 'ILS',
  SYMBOL: '₪',
  NAME: 'Shekel israélien',
};

// Shipping
export const SHIPPING = {
  FREE_THRESHOLD: 500,
  STANDARD_PRICE: 30,
  EXPRESS_PRICE: 60,
  STANDARD_DAYS: '3-5 jours',
  EXPRESS_DAYS: '1-2 jours',
};
