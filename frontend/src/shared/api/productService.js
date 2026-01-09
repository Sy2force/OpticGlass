// Service API pour les produits

import api from './api';

/**
 * Récupère tous les produits avec filtres optionnels
 */
export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.gender) params.append('gender', filters.gender);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.color) params.append('color', filters.color);
    if (filters.material) params.append('material', filters.material);
    if (filters.shape) params.append('shape', filters.shape);
    if (filters.season) params.append('season', filters.season);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération produits:', error);
    throw error;
  }
};

/**
 * Récupère un produit par son ID
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération produit:', error);
    throw error;
  }
};

/**
 * Récupère les produits par catégorie
 */
export const getProductsByCategory = async (category, limit = 12) => {
  try {
    const response = await api.get(`/products?category=${category}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération produits par catégorie:', error);
    throw error;
  }
};

/**
 * Récupère les produits par marque
 */
export const getProductsByBrand = async (brand, limit = 12) => {
  try {
    const response = await api.get(`/products?brand=${brand}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération produits par marque:', error);
    throw error;
  }
};

/**
 * Récupère les nouveautés
 */
export const getNewArrivals = async (limit = 8) => {
  try {
    const response = await api.get(`/products?sort=newest&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération nouveautés:', error);
    throw error;
  }
};

/**
 * Récupère les produits populaires
 */
export const getPopularProducts = async (limit = 8) => {
  try {
    const response = await api.get(`/products?sort=popular&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération produits populaires:', error);
    throw error;
  }
};

/**
 * Récupère les produits en promotion
 */
export const getDiscountedProducts = async (limit = 8) => {
  try {
    const response = await api.get(`/products?discount=true&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération promotions:', error);
    throw error;
  }
};

/**
 * Récupère les produits saisonniers
 */
export const getSeasonalProducts = async (season, limit = 8) => {
  try {
    const response = await api.get(`/products?season=${season}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération produits saisonniers:', error);
    throw error;
  }
};

/**
 * Recherche de produits
 */
export const searchProducts = async (query, limit = 20) => {
  try {
    const response = await api.get(`/products?search=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error recherche produits:', error);
    throw error;
  }
};

/**
 * Récupère les produits similaires
 */
export const getSimilarProducts = async (productId, limit = 4) => {
  try {
    const response = await api.get(`/products/${productId}/similar?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération produits similaires:', error);
    throw error;
  }
};

/**
 * Récupère les filtres disponibles
 */
export const getFilters = async () => {
  try {
    const response = await api.get('/products/filters');
    return response.data;
  } catch (error) {
    console.error('Error récupération filtres:', error);
    throw error;
  }
};

// ============ ADMIN ============

/**
 * Crée un nouveau produit (Admin)
 */
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/admin/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error création produit:', error);
    throw error;
  }
};

/**
 * Met à jour un produit (Admin)
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Erreur mise à jour produit:', error);
    throw error;
  }
};

/**
 * Supprime un produit (Admin)
 */
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error suppression produit:', error);
    throw error;
  }
};

/**
 * Met à jour le stock d'un produit (Admin)
 */
export const updateStock = async (id, stock) => {
  try {
    const response = await api.patch(`/admin/products/${id}/stock`, { stock });
    return response.data;
  } catch (error) {
    console.error('Erreur mise à jour stock:', error);
    throw error;
  }
};

export default {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByBrand,
  getNewArrivals,
  getPopularProducts,
  getDiscountedProducts,
  getSeasonalProducts,
  searchProducts,
  getSimilarProducts,
  getFilters,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};
