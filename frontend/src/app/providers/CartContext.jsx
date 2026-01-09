import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import api from '@/shared/api/api';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger le cart au démarrage
  useEffect(() => {
    loadCart();
  }, [isAuthenticated]);

  // Écouter les événements de mise à jour du panier
  useEffect(() => {
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const response = await api.get('/cart');
        setCart(response.data.data || []);
      } catch (err) {
        console.error('Erreur chargement panier:', err);
        // Fallback sur localStorage
        try {
          const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
          setCart(localCart);
        } catch (e) {
          console.error('Erreur lecture panier local:', e);
          setCart([]);
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(localCart);
      } catch {
        setCart([]);
      }
    }
  }, [isAuthenticated]);

  const addToCart = useCallback(async (product, quantity = 1, options = {}) => {
    const cartItem = {
      productId: product._id || product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images?.[0] || product.image || '',
      quantity,
      color: options.color || null,
    };

    if (isAuthenticated) {
      try {
        setLoading(true);
        await api.post('/cart', {
          productId: cartItem.productId,
          quantity,
          ...options,
        });
        await loadCart();
      } catch (err) {
        console.error('Erreur ajout panier:', err);
        setError('Erreur lors de l\'ajout au panier');
      } finally {
        setLoading(false);
      }
    } else {
      // Mode local
      try {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingIndex = localCart.findIndex(
          (item) => item.productId === cartItem.productId && item.color === cartItem.color
        );

        if (existingIndex > -1) {
          localCart[existingIndex].quantity += quantity;
        } else {
          localCart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(localCart));
        setCart(localCart);
        window.dispatchEvent(new Event('cartUpdated'));
      } catch (e) {
        console.error('Erreur ajout panier local:', e);
      }
    }
  }, [isAuthenticated, loadCart]);

  const updateQuantity = useCallback(async (index, newQuantity) => {
    if (newQuantity < 1) return;

    if (isAuthenticated) {
      try {
        const item = cart[index];
        await api.put(`/cart/${item._id || item.productId}`, { quantity: newQuantity });
        await loadCart();
      } catch (err) {
        console.error('Erreur mise à jour quantité:', err);
      }
    } else {
      const localCart = [...cart];
      localCart[index].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(localCart));
      setCart(localCart);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }, [cart, isAuthenticated, loadCart]);

  const removeFromCart = useCallback(async (index) => {
    if (isAuthenticated) {
      try {
        const item = cart[index];
        await api.delete(`/cart/${item._id || item.productId}`);
        await loadCart();
      } catch (err) {
        console.error('Erreur suppression panier:', err);
      }
    } else {
      const localCart = cart.filter((_, i) => i !== index);
      localStorage.setItem('cart', JSON.stringify(localCart));
      setCart(localCart);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }, [cart, isAuthenticated, loadCart]);

  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await api.delete('/cart/clear');
        setCart([]);
      } catch (err) {
        console.error('Erreur vidage panier:', err);
      }
    } else {
      localStorage.removeItem('cart');
      setCart([]);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }, [isAuthenticated]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const isInCart = useCallback((productId) => {
    return cart.some((item) => item.productId === productId || item._id === productId);
  }, [cart]);

  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    refreshCart: loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;
