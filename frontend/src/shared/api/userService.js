// Service API pour les utilisateurs (Admin)

import api from './api';

/**
 * Récupère tous les utilisateurs (Admin)
 */
export const getUsers = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.role) params.append('role', filters.role);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/admin/users?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération utilisateurs:', error);
    throw error;
  }
};

/**
 * Récupère un utilisateur par son ID (Admin)
 */
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération utilisateur:', error);
    throw error;
  }
};

/**
 * Met à jour un utilisateur (Admin)
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Erreur mise à jour utilisateur:', error);
    throw error;
  }
};

/**
 * Supprime un utilisateur (Admin)
 */
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error suppression utilisateur:', error);
    throw error;
  }
};

/**
 * Change le rôle d'un utilisateur (Admin)
 */
export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    console.error('Error changement rôle:', error);
    throw error;
  }
};

/**
 * Bloque/Débloque un utilisateur (Admin)
 */
export const toggleUserStatus = async (userId) => {
  try {
    const response = await api.patch(`/admin/users/${userId}/status`);
    return response.data;
  } catch (error) {
    console.error('Error changement statut:', error);
    throw error;
  }
};

/**
 * Récupère les commandes d'un utilisateur (Admin)
 */
export const getUserOrders = async (userId) => {
  try {
    const response = await api.get(`/admin/users/${userId}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error récupération commandes utilisateur:', error);
    throw error;
  }
};

/**
 * Récupère les statistiques utilisateurs (Admin)
 */
export const getUserStats = async () => {
  try {
    const response = await api.get('/admin/users/stats');
    return response.data;
  } catch (error) {
    console.error('Error récupération stats utilisateurs:', error);
    throw error;
  }
};

/**
 * Exporte les utilisateurs en CSV (Admin)
 */
export const exportUsers = async () => {
  try {
    const response = await api.get('/admin/users/export', {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error export utilisateurs:', error);
    throw error;
  }
};

export default {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
  toggleUserStatus,
  getUserOrders,
  getUserStats,
  exportUsers,
};
