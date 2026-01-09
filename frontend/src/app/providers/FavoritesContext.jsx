import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import api from '@/shared/api/api';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les favorites au démarrage
  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      // Charger depuis localStorage pour les non-authentifiés
      try {
        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(localFavorites);
      } catch (err) {
        console.error('Erreur lecture favoris locaux:', err);
        setFavorites([]);
      }
    }
  }, [isAuthenticated]);

  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await api.get('/favorites');
      setFavorites(response.data.data || []);
    } catch (err) {
      console.error('Erreur chargement favoris:', err);
      setError('Erreur lors du chargement des favoris');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addToFavorites = useCallback(async (product) => {
    const productId = product._id || product.id;

    if (isAuthenticated) {
      try {
        setLoading(true);
        await api.post('/favorites', { productId });
        await loadFavorites();
      } catch (err) {
        console.error('Erreur ajout favori:', err);
        setError('Erreur lors de l\'ajout aux favoris');
      } finally {
        setLoading(false);
      }
    } else {
      // Mode local
      try {
        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!localFavorites.some((fav) => fav._id === productId || fav.id === productId)) {
          localFavorites.push(product);
          localStorage.setItem('favorites', JSON.stringify(localFavorites));
          setFavorites(localFavorites);
        }
      } catch (err) {
        console.error('Erreur ajout favori local:', err);
      }
    }
  }, [isAuthenticated, loadFavorites]);

  const removeFromFavorites = useCallback(async (productId) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        await api.delete(`/favorites/${productId}`);
        setFavorites((prev) => prev.filter((fav) => fav._id !== productId));
      } catch (err) {
        console.error('Erreur suppression favori:', err);
        setError('Erreur lors de la suppression du favori');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const filtered = localFavorites.filter(
          (fav) => fav._id !== productId && fav.id !== productId
        );
        localStorage.setItem('favorites', JSON.stringify(filtered));
        setFavorites(filtered);
      } catch (err) {
        console.error('Erreur suppression favori local:', err);
      }
    }
  }, [isAuthenticated]);

  const toggleFavorite = useCallback(async (product) => {
    const productId = product._id || product.id;
    const isFav = isFavorite(productId);

    if (isFav) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(product);
    }
  }, [addToFavorites, removeFromFavorites]);

  const isFavorite = useCallback((productId) => {
    return favorites.some(
      (fav) => fav._id === productId || fav.id === productId
    );
  }, [favorites]);

  const clearFavorites = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await api.delete('/favorites/clear');
        setFavorites([]);
      } catch (err) {
        console.error('Erreur suppression favoris:', err);
      }
    } else {
      localStorage.removeItem('favorites');
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const getFavoritesCount = useCallback(() => {
    return favorites.length;
  }, [favorites]);

  const value = {
    favorites,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesCount,
    refreshFavorites: loadFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;
