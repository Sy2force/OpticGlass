// Middleware de validation avancée
export const validateProduct = (req, res, next) => {
  const { name, brand, price, category, description } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Le nom du produit doit contenir au moins 2 caractères');
  }

  if (!brand || brand.trim().length < 2) {
    errors.push('La marque est requise');
  }

  if (!price || isNaN(price) || price < 0) {
    errors.push('Le prix doit être un nombre positif');
  }

  if (!category) {
    errors.push('La catégorie est requise');
  }

  if (!description || description.trim().length < 10) {
    errors.push('La description doit contenir au moins 10 caractères');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors,
    });
  }

  next();
};

export const validateOrder = (req, res, next) => {
  const { items, shippingAddress } = req.body;
  const errors = [];

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('Le panier ne peut pas être vide');
  }

  if (items) {
    items.forEach((item, index) => {
      if (!item.productId) {
        errors.push(`Article ${index + 1}: ID produit manquant`);
      }
      if (!item.quantity || item.quantity < 1) {
        errors.push(`Article ${index + 1}: Quantité invalide`);
      }
    });
  }

  if (!shippingAddress) {
    errors.push('Adresse de livraison requise');
  } else {
    const { firstName, lastName, street, city, postalCode } = shippingAddress;
    if (!firstName) errors.push('Prénom requis');
    if (!lastName) errors.push('Nom requis');
    if (!street) errors.push('Adresse requise');
    if (!city) errors.push('Ville requise');
    if (!postalCode) errors.push('Code postal requis');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors,
    });
  }

  next();
};

export const validateUser = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const errors = [];

  if (!firstName || firstName.trim().length < 2) {
    errors.push('Le prénom doit contenir au moins 2 caractères');
  }

  if (!lastName || lastName.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Email invalide');
  }

  if (!password || password.length < 6) {
    errors.push('Le mot de passe doit contenir au moins 6 caractères');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors,
    });
  }

  next();
};

export const validateBrand = (req, res, next) => {
  const { name, description, country } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Le nom de la marque est requis');
  }

  if (!description || description.trim().length < 10) {
    errors.push('La description doit contenir au moins 10 caractères');
  }

  if (!country) {
    errors.push('Le pays d\'origine est requis');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors,
    });
  }

  next();
};

export const sanitizeInput = (req, res, next) => {
  // Nettoyer les entrées pour éviter les injections
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      return obj.trim().replace(/<[^>]*>/g, '');
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }
    if (obj && typeof obj === 'object') {
      const sanitized = {};
      for (const key in obj) {
        sanitized[key] = sanitize(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);

  next();
};
