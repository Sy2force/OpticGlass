// Service API pour les marques

import api from './api';

/**
 * Récupère toutes les marques
 */
export const getBrands = async () => {
  try {
    const response = await api.get('/products/brands');
    return response.data;
  } catch (error) {
    console.error('Erreur récupération marques:', error);
    throw error;
  }
};

/**
 * Récupère une marque par son ID ou slug
 */
export const getBrandById = async (id) => {
  try {
    const response = await api.get(`/products/brands/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur récupération marque:', error);
    throw error;
  }
};

/**
 * Récupère les marques populaires
 */
export const getPopularBrands = async (limit = 10) => {
  try {
    const response = await api.get(`/products/brands?popular=true&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Erreur récupération marques populaires:', error);
    throw error;
  }
};

/**
 * Récupère les marques de luxe
 */
export const getLuxuryBrands = async () => {
  try {
    const response = await api.get('/products/brands?category=luxury');
    return response.data;
  } catch (error) {
    console.error('Erreur récupération marques luxe:', error);
    throw error;
  }
};

/**
 * Récupère les produits d'une marque
 */
export const getBrandProducts = async (brandId, filters = {}) => {
  try {
    const params = new URLSearchParams({ brand: brandId, ...filters });
    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Erreur récupération produits marque:', error);
    throw error;
  }
};

/**
 * Recherche de marques
 */
export const searchBrands = async (query) => {
  try {
    const response = await api.get(`/products/brands?search=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Erreur recherche marques:', error);
    throw error;
  }
};

// ============ ADMIN ============

/**
 * Crée une nouvelle marque (Admin)
 */
export const createBrand = async (brandData) => {
  try {
    const response = await api.post('/admin/brands', brandData);
    return response.data;
  } catch (error) {
    console.error('Erreur création marque:', error);
    throw error;
  }
};

/**
 * Met à jour une marque (Admin)
 */
export const updateBrand = async (id, brandData) => {
  try {
    const response = await api.put(`/admin/brands/${id}`, brandData);
    return response.data;
  } catch (error) {
    console.error('Erreur mise à jour marque:', error);
    throw error;
  }
};

/**
 * Supprime une marque (Admin)
 */
export const deleteBrand = async (id) => {
  try {
    const response = await api.delete(`/admin/brands/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur suppression marque:', error);
    throw error;
  }
};

export default {
  getBrands,
  getBrandById,
  getPopularBrands,
  getLuxuryBrands,
  getBrandProducts,
  searchBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
