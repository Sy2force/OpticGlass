import axios from 'axios';

// Configuration de l'URL de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005/api';

// ⚠️ Warning si l'URL de l'API n'est pas définie
if (!import.meta.env.VITE_API_URL) {
  console.warn(
    '⚠️ VITE_API_URL n\'est pas définie dans .env. Utilisation de l\'URL par défaut:',
    API_URL
  );
}

// URL de l'API configurée

// Création de l'instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 secondes
});

// Intercepteur de requête - Ajoute le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Erreur lors de la préparation de la requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse - Gestion des erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Erreur 401 - Non autorisé (seulement si on avait un token)
    if (error.response?.status === 401) {
      const hadToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (hadToken) {
        console.warn('🔒 Session expirée. Redirection vers la page de connexion...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/auth';
      }
      return Promise.reject(new Error('Non autorisé'));
    }

    // Erreur réseau - API non disponible
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      console.error('🌐 Erreur réseau: Impossible de contacter l\'API');
      return Promise.reject(
        new Error(
          'Impossible de contacter le serveur. Vérifiez votre connexion internet ou réessayez plus tard.'
        )
      );
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout: La requête a pris trop de temps');
      return Promise.reject(
        new Error('La requête a pris trop de temps. Veuillez réessayer.')
      );
    }

    // Erreur 500 - Erreur serveur
    if (error.response?.status >= 500) {
      console.error('🔥 Erreur serveur:', error.response.status);
      return Promise.reject(
        new Error('Erreur serveur. Veuillez réessayer plus tard.')
      );
    }

    // Autres erreurs
    console.error('❌ Erreur API:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
