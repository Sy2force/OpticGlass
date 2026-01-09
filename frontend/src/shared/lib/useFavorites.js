import { useContext } from 'react';
import FavoritesContext from '@/app/providers/FavoritesContext';

/**
 * Hook pour accéder au contexte des favoris
 * Re-export du hook depuis FavoritesContext pour compatibilité
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export default useFavorites;
