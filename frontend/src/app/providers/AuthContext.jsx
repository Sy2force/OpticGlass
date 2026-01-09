import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/shared/api/api';

const AuthContext = createContext(null);

// Durée de session: 4 hours (en millisecondes) - Exigence HackerU Bonus
const SESSION_DURATION = 4 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction de logout (déclarée avant useEffect pour éviter les dépendances circulaires)
  const performLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    
    // Clear both storages to be safe
    ['token', 'user', 'loginTime'].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }, []);

  // Vérification de l'expiration de session
  const checkSessionExpiry = useCallback(() => {
    const loginTime = localStorage.getItem('loginTime') || sessionStorage.getItem('loginTime');
    if (loginTime) {
      const elapsed = Date.now() - parseInt(loginTime, 10);
      if (elapsed > SESSION_DURATION) {
        performLogout();
        return true; // Session expirée
      }
    }
    return false;
  }, [performLogout]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (storedToken && storedUser) {
      // Vérifier si la session a expiré
      if (checkSessionExpiry()) {
        setLoading(false);
        return;
      }

      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        performLogout();
      }
    }
    setLoading(false);
  }, [checkSessionExpiry, performLogout]);

  // Auto-logout après 4h - Vérification périodique toutes les minutes
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (checkSessionExpiry()) {
        // Optional: afficher une notification
        window.dispatchEvent(new CustomEvent('session-expired'));
      }
    }, 60000); // Vérifier toutes les minutes

    return () => clearInterval(interval);
  }, [token, checkSessionExpiry]);

  const login = async (email, password, remember = false) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: newToken, ...userData } = response.data.data;

      setToken(newToken);
      setUser(userData);
      
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('token', newToken);
      storage.setItem('user', JSON.stringify(userData));
      storage.setItem('loginTime', Date.now().toString());

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de connexion',
      };
    }
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      const { token: newToken, ...userData } = response.data.data;

      setToken(newToken);
      setUser(userData);
      
      // Default to localStorage for registration (or sessionStorage if preferred, but usually persistent)
      // Let's use persistent for new registrations for better UX
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('loginTime', Date.now().toString());

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erreur d'inscription",
      };
    }
  };

  const logout = () => {
    performLogout(); // Utilise la fonction centralisée
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
