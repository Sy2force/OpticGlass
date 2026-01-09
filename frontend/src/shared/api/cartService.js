// Service API pour le panier

import api from './api';

/**
 * Récupère le panier de l'utilisateur
 */
export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error récupération panier:', error);
    throw error;
  }
};

/**
 * Ajoute un produit au panier
 */
export const addToCart = async (productId, quantity = 1, options = {}) => {
  try {
    const response = await api.post('/cart', {
      productId,
      quantity,
      ...options,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur ajout au panier:', error);
    throw error;
  }
};

/**
 * Met à jour la quantité d'un item
 */
export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Erreur mise à jour panier:', error);
    throw error;
  }
};

/**
 * Supprime un item du panier
 */
export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error suppression du panier:', error);
    throw error;
  }
};

/**
 * Vide le panier
 */
export const clearCart = async () => {
  try {
    const response = await api.delete('/cart/clear');
    return response.data;
  } catch (error) {
    console.error('Error vidage panier:', error);
    throw error;
  }
};

/**
 * Applique un code promo
 */
export const applySaleCode = async (code) => {
  try {
    const response = await api.post('/cart/promo', { code });
    return response.data;
  } catch (error) {
    console.error('Error application code promo:', error);
    throw error;
  }
};

/**
 * Supprime le code promo
 */
export const removeSaleCode = async () => {
  try {
    const response = await api.delete('/cart/promo');
    return response.data;
  } catch (error) {
    console.error('Error suppression code promo:', error);
    throw error;
  }
};

/**
 * Calcule le total du panier
 */
export const getCartTotal = async () => {
  try {
    const response = await api.get('/cart/total');
    return response.data;
  } catch (error) {
    console.error('Error calcul total:', error);
    throw error;
  }
};

/**
 * Récupère le nombre d'items dans le panier
 */
export const getCartCount = async () => {
  try {
    const response = await api.get('/cart/count');
    return response.data;
  } catch (error) {
    console.error('Error comptage panier:', error);
    throw error;
  }
};

/**
 * Valide le panier avant checkout
 */
export const validateCart = async () => {
  try {
    const response = await api.post('/cart/validate');
    return response.data;
  } catch (error) {
    console.error('Error validation panier:', error);
    throw error;
  }
};

/**
 * Checkout - Passe la commande
 */
export const checkout = async (checkoutData) => {
  try {
    const response = await api.post('/cart/checkout', checkoutData);
    return response.data;
  } catch (error) {
    console.error('Error checkout:', error);
    throw error;
  }
};

// ============ LOCAL STORAGE (fallback) ============

/**
 * Récupère le panier local
 */
export const getLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
};

/**
 * Sauvegarde le panier local
 */
export const saveLocalCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

/**
 * Ajoute au panier local
 */
export const addToLocalCart = (product, quantity = 1, options = {}) => {
  const cart = getLocalCart();
  
  const existingIndex = cart.findIndex(
    (item) =>
      item.productId === product._id &&
      item.color === options.color
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images?.[0] || '',
      quantity,
      ...options,
    });
  }

  saveLocalCart(cart);
  return cart;
};

/**
 * Met à jour la quantité locale
 */
export const updateLocalCartItem = (index, quantity) => {
  const cart = getLocalCart();
  if (cart[index]) {
    cart[index].quantity = quantity;
    saveLocalCart(cart);
  }
  return cart;
};

/**
 * Supprime du panier local
 */
export const removeFromLocalCart = (index) => {
  const cart = getLocalCart();
  cart.splice(index, 1);
  saveLocalCart(cart);
  return cart;
};

/**
 * Vide le panier local
 */
export const clearLocalCart = () => {
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cartUpdated'));
};

/**
 * Calcule le total local
 */
export const getLocalCartTotal = () => {
  const cart = getLocalCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Compte les items locaux
 */
export const getLocalCartCount = () => {
  const cart = getLocalCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applySaleCode,
  removeSaleCode,
  getCartTotal,
  getCartCount,
  validateCart,
  checkout,
  getLocalCart,
  saveLocalCart,
  addToLocalCart,
  updateLocalCartItem,
  removeFromLocalCart,
  clearLocalCart,
  getLocalCartTotal,
  getLocalCartCount,
};
