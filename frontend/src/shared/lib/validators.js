// Fonctions de validation pour Optic Glass

import { VALIDATION } from './constants';

/**
 * Valide un email
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return VALIDATION.EMAIL_REGEX.test(email.trim());
};

/**
 * Valide un mot de passe
 */
export const isValidPassword = (password) => {
  if (!password) return false;
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
};

/**
 * Valide un mot de passe fort
 */
export const isStrongPassword = (password) => {
  if (!password) return false;
  
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

/**
 * Retourne la force du mot de passe
 */
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Vide', color: 'gray' };
  
  let score = 0;
  
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Faible', color: 'red' };
  if (score <= 4) return { score, label: 'Moyen', color: 'yellow' };
  if (score <= 5) return { score, label: 'Fort', color: 'green' };
  return { score, label: 'Très fort', color: 'emerald' };
};

/**
 * Valide un nom
 */
export const isValidName = (name) => {
  if (!name) return false;
  return name.trim().length >= VALIDATION.NAME_MIN_LENGTH;
};

/**
 * Valide un numéro de téléphone israélien
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return VALIDATION.PHONE_REGEX.test(phone) || (cleaned.length >= 9 && cleaned.length <= 12);
};

/**
 * Valide un code postal israélien
 */
export const isValidPostalCode = (postalCode) => {
  if (!postalCode) return false;
  const cleaned = postalCode.replace(/\D/g, '');
  return cleaned.length === 7;
};

/**
 * Valide un numéro de carte de crédit (Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber) => {
  if (!cardNumber) return false;
  
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Valide une date d'expiration de carte
 */
export const isValidExpiryDate = (month, year) => {
  if (!month || !year) return false;
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);

  if (expMonth < 1 || expMonth > 12) return false;
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;

  return true;
};

/**
 * Valide un CVV
 */
export const isValidCVV = (cvv) => {
  if (!cvv) return false;
  const cleaned = cvv.replace(/\D/g, '');
  return cleaned.length >= 3 && cleaned.length <= 4;
};

/**
 * Valide une URL
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valide une adresse
 */
export const isValidAddress = (address) => {
  if (!address) return false;
  
  const errors = {};
  
  if (!address.street || address.street.trim().length < 3) {
    errors.street = 'Adresse requise (min. 3 caractères)';
  }
  
  if (!address.city || address.city.trim().length < 2) {
    errors.city = 'Ville requise';
  }
  
  if (!address.postalCode || !isValidPostalCode(address.postalCode)) {
    errors.postalCode = 'Code postal invalide';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valide un formulaire de connexion
 */
export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = 'Email requis';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Email invalide';
  }

  if (!data.password) {
    errors.password = 'Mot de passe requis';
  } else if (!isValidPassword(data.password)) {
    errors.password = `Minimum ${VALIDATION.PASSWORD_MIN_LENGTH} caractères`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valide un formulaire d'inscription
 */
export const validateRegisterForm = (data) => {
  const errors = {};

  if (!data.firstName) {
    errors.firstName = 'Prénom requis';
  } else if (!isValidName(data.firstName)) {
    errors.firstName = 'Prénom trop court';
  }

  if (!data.lastName) {
    errors.lastName = 'Nom requis';
  } else if (!isValidName(data.lastName)) {
    errors.lastName = 'Nom trop court';
  }

  if (!data.email) {
    errors.email = 'Email requis';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Email invalide';
  }

  if (!data.password) {
    errors.password = 'Mot de passe requis';
  } else if (!isValidPassword(data.password)) {
    errors.password = `Minimum ${VALIDATION.PASSWORD_MIN_LENGTH} caractères`;
  }

  if (data.confirmPassword !== undefined && data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valide un formulaire de checkout
 */
export const validateCheckoutForm = (data) => {
  const errors = {};

  if (!data.firstName || !isValidName(data.firstName)) {
    errors.firstName = 'First Name requis';
  }

  if (!data.lastName || !isValidName(data.lastName)) {
    errors.lastName = 'Name requis';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Email invalide';
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = 'Téléphone invalide';
  }

  if (!data.street || data.street.trim().length < 3) {
    errors.street = 'Adresse requise';
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'Ville requise';
  }

  if (!data.postalCode || !isValidPostalCode(data.postalCode)) {
    errors.postalCode = 'Code postal invalide (7 chiffres)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valide un formulaire de contact
 */
export const validateContactForm = (data) => {
  const errors = {};

  if (!data.name || !isValidName(data.name)) {
    errors.name = 'Nom requis';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Email invalide';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Sujet requis';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message trop court (min. 10 caractères)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valide un code promo
 */
export const isValidSaleCode = (code) => {
  if (!code) return false;
  const cleaned = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return cleaned.length >= 4 && cleaned.length <= 20;
};

/**
 * Valide une quantité
 */
export const isValidQuantity = (quantity, min = 1, max = 99) => {
  const num = parseInt(quantity, 10);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Sanitize une chaîne (supprime les caractères dangereux)
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

/**
 * Valide un fichier image
 */
export const isValidImageFile = (file) => {
  if (!file) return false;
  
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { isValid: false, error: 'Format non supporté (JPG, PNG, GIF, WebP)' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'Fichier trop volumineux (max 5MB)' };
  }

  return { isValid: true };
};
