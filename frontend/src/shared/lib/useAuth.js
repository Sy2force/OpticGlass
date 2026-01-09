import { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthContext';

/**
 * Hook pour accéder au contexte d'authentification
 * Re-export du hook depuis AuthContext pour compatibilité
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default useAuth;
