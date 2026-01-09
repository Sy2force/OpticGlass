// Service API pour l'authentification

import api from './api';

/**
 * Login utilisateur
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error connexion:', error);
    throw error;
  }
};

/**
 * Sign up utilisateur
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error inscription:', error);
    throw error;
  }
};

/**
 * Récupère le profil de l'utilisateur connecté
 */
export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Error récupération profil:', error);
    throw error;
  }
};

/**
 * Met à jour le profil utilisateur
 */
export const updateProfilee = async (profileData) => {
  try {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    throw error;
  }
};

/**
 * Change le mot de passe
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/auth/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error changement mot de passe:', error);
    throw error;
  }
};

/**
 * Demande de réinitialisation de mot de passe
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Erreur demande réinitialisation:', error);
    throw error;
  }
};

/**
 * Réinitialise le mot de passe avec le token
 */
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error réinitialisation mot de passe:', error);
    throw error;
  }
};

/**
 * Vérifie si le token est valide
 */
export const verifyToken = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    console.error('Error vérification token:', error);
    throw error;
  }
};

/**
 * Logout (côté client uniquement)
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Supprime le compte utilisateur
 */
export const deleteAccount = async () => {
  try {
    const response = await api.delete('/auth/account');
    return response.data;
  } catch (error) {
    console.error('Error suppression compte:', error);
    throw error;
  }
};

export default {
  login,
  register,
  getProfile,
  updateProfilee,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyToken,
  logout,
  deleteAccount,
};
