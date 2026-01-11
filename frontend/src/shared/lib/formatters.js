// Fonctions de formatage pour Optic Glass

import { CURRENCY } from './constants';

/**
 * Formate un prix avec le symbole de devise
 */
export const formatPrice = (price, showCurrency = true) => {
  if (price === null || price === undefined) return '';
  
  const formattedPrice = new Intl.NumberFormat('he-IL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return showCurrency ? `${formattedPrice} ${CURRENCY.SYMBOL}` : formattedPrice;
};

/**
 * Formate un prix avec réduction
 */
export const formatPriceWithDiscount = (originalPrice, discountPercent) => {
  const discountedPrice = originalPrice * (1 - discountPercent / 100);
  return {
    original: formatPrice(originalPrice),
    discounted: formatPrice(discountedPrice),
    savings: formatPrice(originalPrice - discountedPrice),
    percent: `${discountPercent}%`,
  };
};

/**
 * Formate une date en French
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Formate une date courte (JJ/MM/AAAA)
 */
export const formatDateShort = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US');
};

/**
 * Formate une date relative (il y a X jours)
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
};

/**
 * Formate une heure
 */
export const formatTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formate une date et heure complète
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  return `${formatDate(date)} à ${formatTime(date)}`;
};

/**
 * Formate un numéro de téléphone israélien
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('972')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }
  
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

/**
 * Formate un numéro de commande
 */
export const formatOrderNumber = (orderNumber) => {
  if (!orderNumber) return '';
  return `#${orderNumber.toString().padStart(6, '0')}`;
};

/**
 * Formate un pourcentage
 */
export const formatPercent = (value, decimals = 0) => {
  if (value === null || value === undefined) return '';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formate un nombre avec séparateurs de milliers
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return '';
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Formate une taille de fichier
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

/**
 * Formate une adresse
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const parts = [
    address.street,
    address.city,
    address.postalCode,
    address.country,
  ].filter(Boolean);

  return parts.join(', ');
};

/**
 * Formate un nom complet
 */
export const formatFullName = (firstName, lastName) => {
  return [firstName, lastName].filter(Boolean).join(' ');
};

/**
 * Formate les initiales d'un nom
 */
export const formatInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${first}${last}`;
};

/**
 * Formate une note (étoiles)
 */
export const formatRating = (rating, maxRating = 5) => {
  if (rating === null || rating === undefined) return '';
  return `${rating.toFixed(1)}/${maxRating}`;
};

/**
 * Formate une durée en minutes
 */
export const formatDuration = (minutes) => {
  if (!minutes) return '';
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}min`;
};

/**
 * Formate une quantité avec unité
 */
export const formatQuantity = (quantity, unit = 'article') => {
  if (quantity === null || quantity === undefined) return '';
  const plural = quantity > 1 ? 's' : '';
  return `${quantity} ${unit}${plural}`;
};

/**
 * Masque un email (ex: j***@example.com)
 */
export const maskEmail = (email) => {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const maskedLocal = local.charAt(0) + '***';
  return `${maskedLocal}@${domain}`;
};

/**
 * Masque un numéro de carte (ex: **** **** **** 1234)
 */
export const maskCardNumber = (cardNumber) => {
  if (!cardNumber) return '';
  const last4 = cardNumber.slice(-4);
  return `**** **** **** ${last4}`;
};

/**
 * Formate un code promo
 */
export const formatSaleCode = (code) => {
  if (!code) return '';
  return code.toUpperCase().replace(/[^A-Z0-9]/g, '');
};
