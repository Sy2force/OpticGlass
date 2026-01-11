import axios from 'axios';

// API URL setup
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005/api';

// Show warning if API URL is not set
if (!import.meta.env.VITE_API_URL) {
  console.warn('VITE_API_URL not set in .env, using default:', API_URL);
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 - Unauthorized
    if (error.response?.status === 401) {
      const hadToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (hadToken) {
        console.warn('Session expired, redirecting to login...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/auth';
      }
      return Promise.reject(new Error('Unauthorized'));
    }

    // Network error
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      console.error('Network error: Cannot reach API');
      return Promise.reject(
        new Error('Cannot reach server. Check your internet connection.')
      );
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('Request timed out. Please try again.'));
    }

    // Server error
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.status);
      return Promise.reject(
        new Error('Server error. Please try again later.')
      );
    }

    // Other errors
    console.error('API error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
