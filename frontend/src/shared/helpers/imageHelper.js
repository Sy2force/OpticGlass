// Helper pour gérer les images de produits avec fallback
export const getProductImage = (product) => {
  // Si le produit a des images, retourner la première
  if (product.images && product.images.length > 0 && product.images[0]) {
    return product.images[0];
  }
  
  // Sinon, retourner une image placeholder basée sur la catégorie
  const placeholders = {
    'soleil': `https://placehold.co/400x300/1a1a1a/ffffff/png?text=${encodeURIComponent(product.brand + ' Sunglasses')}`,
    'vue': `https://placehold.co/400x300/2d2d2d/ffffff/png?text=${encodeURIComponent(product.brand + ' Glasses')}`,
    'sport': `https://placehold.co/400x300/0a0a0a/ffffff/png?text=${encodeURIComponent(product.brand + ' Sport')}`,
    'sunglasses': `https://placehold.co/400x300/1a1a1a/ffffff/png?text=${encodeURIComponent(product.brand + ' Sunglasses')}`,
    'glasses': `https://placehold.co/400x300/2d2d2d/ffffff/png?text=${encodeURIComponent(product.brand + ' Glasses')}`,
    'optique': `https://placehold.co/400x300/2d2d2d/ffffff/png?text=${encodeURIComponent(product.brand + ' Optical')}`,
  };
  
  return placeholders[product.category] || `https://placehold.co/400x300/1a1a1a/ffffff/png?text=${encodeURIComponent(product.name)}`;
};

// Vérifier si une image peut être chargée
export const checkImageUrl = async (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

export default { getProductImage, checkImageUrl };
