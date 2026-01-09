// Service API pour les commandes

import api from './api';

/**
 * Récupère les commandes de l'utilisateur connecté
 */
export const getMyOrders = async () => {
  try {
    const response = await api.get('/cart/orders');
    return response.data;
  } catch (error) {
    console.error('Error récupération commandes:', error);
    throw error;
  }
};

/**
 * Récupère une commande par son ID
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/cart/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération commande:', error);
    throw error;
  }
};

/**
 * Crée une nouvelle commande
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/cart/checkout', orderData);
    return response.data;
  } catch (error) {
    console.error('Error création commande:', error);
    throw error;
  }
};

/**
 * Annule une commande
 */
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.patch(`/cart/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error annulation commande:', error);
    throw error;
  }
};

/**
 * Récupère le suivi d'une commande
 */
export const getOrderTracking = async (orderId) => {
  try {
    const response = await api.get(`/cart/orders/${orderId}/tracking`);
    return response.data;
  } catch (error) {
    console.error('Error récupération suivi:', error);
    throw error;
  }
};

// ============ ADMIN ============

/**
 * Récupère toutes les commandes (Admin)
 */
export const getAllOrders = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/admin/orders?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération commandes admin:', error);
    throw error;
  }
};

/**
 * Met à jour le statut d'une commande (Admin)
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.patch(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Erreur mise à jour statut:', error);
    throw error;
  }
};

/**
 * Récupère les statistiques des commandes (Admin)
 */
export const getOrderStats = async (period = 'month') => {
  try {
    const response = await api.get(`/admin/orders/stats?period=${period}`);
    return response.data;
  } catch (error) {
    console.error('Error récupération stats commandes:', error);
    throw error;
  }
};

export default {
  getMyOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  getOrderTracking,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
};
