// Service API pour les favoris

import api from './api';

/**
 * Récupère les favoris de l'utilisateur
 */
export const getFavorites = async () => {
  try {
    const response = await api.get('/favorites');
    return response.data;
  } catch (error) {
    console.error('Error récupération favoris:', error);
    throw error;
  }
};

/**
 * Ajoute un produit aux favoris
 */
export const addToFavorites = async (productId) => {
  try {
    const response = await api.post('/favorites', { productId });
    return response.data;
  } catch (error) {
    console.error('Erreur ajout favori:', error);
    throw error;
  }
};

/**
 * Supprime un produit des favoris
 */
export const removeFromFavorites = async (productId) => {
  try {
    const response = await api.delete(`/favorites/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error suppression favori:', error);
    throw error;
  }
};

/**
 * Vérifie si un produit est dans les favoris
 */
export const isFavorite = async (productId) => {
  try {
    const response = await api.get(`/favorites/check/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error vérification favori:', error);
    throw error;
  }
};

/**
 * Toggle favori (ajoute ou supprime)
 */
export const toggleFavorite = async (productId) => {
  try {
    const response = await api.post(`/favorites/toggle/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error toggle favori:', error);
    throw error;
  }
};

/**
 * Supprime tous les favoris
 */
export const clearFavorites = async () => {
  try {
    const response = await api.delete('/favorites/clear');
    return response.data;
  } catch (error) {
    console.error('Erreur suppression tous favoris:', error);
    throw error;
  }
};

/**
 * Récupère le nombre de favoris
 */
export const getFavoritesCount = async () => {
  try {
    const response = await api.get('/favorites/count');
    return response.data;
  } catch (error) {
    console.error('Error comptage favoris:', error);
    throw error;
  }
};

export default {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  toggleFavorite,
  clearFavorites,
  getFavoritesCount,
};
