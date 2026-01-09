import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Check } from 'lucide-react';
import { useState } from 'react';

const Glass3DCard = ({ product, onAddToFavorites, isFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.productId === product._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          productId: product._id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.images?.[0] || '',
          quantity: 1,
          color: product.colors?.[0] || product.color || '',
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Erreur ajout panier:', error);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/glasses/${product._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/glasses/${product._id}`}>
        <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#c9a227]">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            {/* Gradient de fond basé sur la marque */}
            <div className={`absolute inset-0 ${
              product.brand === 'Ray-Ban' ? 'bg-gradient-to-br from-amber-100 to-yellow-200' :
              product.brand === 'Gucci' ? 'bg-gradient-to-br from-red-100 to-pink-200' :
              product.brand === 'Prada' ? 'bg-gradient-to-br from-gray-100 to-slate-200' :
              product.brand === 'Tom Ford' ? 'bg-gradient-to-br from-amber-200 to-orange-200' :
              product.brand === 'Dior' ? 'bg-gradient-to-br from-pink-100 to-rose-200' :
              product.brand === 'Oakley' ? 'bg-gradient-to-br from-blue-100 to-cyan-200' :
              product.brand === 'Versace' ? 'bg-gradient-to-br from-yellow-100 to-amber-200' :
              product.brand === 'Carrera' ? 'bg-gradient-to-br from-red-100 to-orange-200' :
              product.brand === 'Persol' ? 'bg-gradient-to-br from-orange-100 to-amber-200' :
              'bg-gradient-to-br from-gray-100 to-gray-200'
            }`} />
            
            {/* Icône de lunettes stylisée */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="text-7xl mb-3 opacity-80 group-hover:scale-110 transition-transform duration-500">
                🕶️
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700 mb-1">{product.brand}</p>
                <p className="text-xs text-gray-500 font-medium">{product.subcategory || product.category}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded shadow-lg">
                  NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="px-2 py-1 bg-[#c9a227] text-black text-[10px] font-bold rounded shadow-lg">
                  BEST
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-2 py-1 bg-green-600 text-white text-[10px] font-bold rounded shadow-lg">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToFavorites?.(product._id);
              }}
              className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all ${
                isFavorite
                  ? 'bg-red-600 text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-red-600 hover:text-white'
              }`}
            >
              <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">
              {product.brand}
            </p>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900 group-hover:text-[#c9a227] transition-colors">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-[#c9a227]">
                  {product.discount > 0 
                    ? Math.round(product.price * (1 - product.discount / 100))
                    : product.price} ₪
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-xs text-gray-400 line-through">{product.originalPrice} ₪</p>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className={`p-2 rounded-lg transition-all ${
                  addedToCart 
                    ? 'bg-green-600 text-white' 
                    : 'bg-black text-white hover:bg-[#c9a227] hover:text-black'
                }`}
              >
                {addedToCart ? <Check size={16} /> : <ShoppingCart size={16} />}
              </button>
            </div>

            {/* Rating */}
            {(product.rating > 0 || product.reviews > 0) && (
              <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs ${
                      i < Math.floor(product.rating || 4)
                        ? 'text-[#c9a227]'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviewsCount || product.reviews || 0})
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Glass3DCard;
