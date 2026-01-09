import { useContext } from 'react';
import CartContext from '@/app/providers/CartContext';

/**
 * Hook pour accéder au contexte du panier
 * Re-export du hook depuis CartContext pour compatibilité
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default useCart;
