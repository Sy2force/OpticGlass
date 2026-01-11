import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart, ShoppingCart, Sparkles, ArrowRight, Glasses } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/providers/ThemeContext';
import api from '@/shared/api/api';
import { products as localProducts } from '@/shared/data/products';

const FavoritesPage = () => {
  const { isDarkMode } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingItem, setRemovingItem] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data.data || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (localFavorites.length > 0) {
        const favProducts = localProducts.filter(p => localFavorites.includes(p._id));
        setFavorites(favProducts);
      } else {
        setFavorites(localProducts.filter(p => p.isBestseller).slice(0, 4));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    setRemovingItem(productId);
    setTimeout(async () => {
      try {
        await api.delete(`/favorites/${productId}`);
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
      setFavorites(favorites.filter((fav) => fav._id !== productId));
      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      localStorage.setItem('favorites', JSON.stringify(localFavorites.filter(id => id !== productId)));
      setRemovingItem(null);
    }, 300);
  };

  const handleAddToCart = (product) => {
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
        image: product.images?.[0],
        quantity: 1,
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAddAllToCart = () => {
    favorites.forEach(product => handleAddToCart(product));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227] mx-auto mb-4"></div>
          <p className="text-white/60">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#c9a227] selection:text-black ${
      isDarkMode 
        ? 'bg-[#0a0a0a] text-white' 
        : 'bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 text-gray-900'
    }`}>
      {/* Hero Header */}
      <div className="relative h-[40vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-b from-black/40 via-black/60 to-[#0a0a0a]' 
              : 'bg-gradient-to-b from-stone-800/60 via-stone-700/50 to-stone-100'
          }`} />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a227]" />
              <span className="text-[#c9a227] uppercase tracking-[0.3em] text-xs font-medium">Your Collection</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              My <span className="font-serif italic text-[#c9a227]">Favorites</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {favorites.length === 0 
                ? 'Start building your collection of premium eyewear'
                : `${favorites.length} ${favorites.length === 1 ? 'piece' : 'pieces'} curated with care`
              }
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-white/5 to-white/10 border-white/10' 
                : 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300'
            }`}>
              <Heart size={56} className={isDarkMode ? 'text-white/30' : 'text-amber-400'} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
              No Favorites <span className="font-serif italic text-[#c9a227]">Yet</span>
            </h2>
            
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto my-6" />
            
            <p className={`mb-12 max-w-lg mx-auto text-lg font-light leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>
              Explore our exclusive collection and save your favorite pieces for later.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/glasses"
                className="px-8 py-4 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium tracking-wider uppercase text-sm hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] transition-all duration-300"
              >
                Explore Collection
              </Link>
              <Link
                to="/sunglasses"
                className={`px-8 py-4 border font-medium tracking-wider uppercase text-sm transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-white/20 text-white hover:bg-white/5 hover:border-white/40' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                View Sunglasses
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header with actions */}
            <div className={`flex flex-col md:flex-row items-center justify-between pb-8 border-b mb-8 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div>
                <h2 className="text-2xl font-light tracking-tight">
                  Saved <span className="font-serif italic text-[#c9a227]">Pieces</span>
                </h2>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your wishlist</p>
              </div>
              <button
                onClick={handleAddAllToCart}
                className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium tracking-wider uppercase text-sm hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingCart size={16} />
                Add All to Cart
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {favorites.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: removingItem === product._id ? 0 : 1, 
                      y: 0,
                      scale: removingItem === product._id ? 0.9 : 1
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group rounded-xl border overflow-hidden transition-all ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10 hover:border-[#c9a227]/30' 
                        : 'bg-white border-gray-200 hover:border-[#c9a227]/50 shadow-lg'
                    }`}
                  >
                    <Link to={`/glasses/${product._id}`}>
                      <div className="aspect-square bg-white overflow-hidden relative">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <Glasses size={56} className="text-gray-400" />
                          </div>
                        )}
                        
                        {/* Heart icon */}
                        <div className="absolute top-3 right-3 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <Heart size={18} className="text-white" fill="currentColor" />
                        </div>
                        
                        {product.isNew && (
                          <span className="absolute top-3 left-3 px-3 py-1 bg-[#c9a227] text-black text-xs font-bold uppercase tracking-wider">
                            New
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="p-5">
                      <Link to={`/glasses/${product._id}`}>
                        <p className="text-[#c9a227] text-xs font-semibold uppercase tracking-wider">{product.brand}</p>
                        <h3 className={`font-medium text-lg mb-3 line-clamp-1 group-hover:text-[#c9a227] transition mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.price} ₪</span>
                          {product.originalPrice && (
                            <span className={`text-sm line-through ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{product.originalPrice} ₪</span>
                          )}
                        </div>
                      </Link>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border hover:bg-[#c9a227] hover:text-black hover:border-[#c9a227] transition-all font-medium text-sm uppercase tracking-wider ${
                            isDarkMode ? 'bg-white/5 text-white border-white/10' : 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}
                        >
                          <ShoppingCart size={16} />
                          Add
                        </button>
                        <button
                          onClick={() => handleRemove(product._id)}
                          className={`p-3 border hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all ${
                            isDarkMode ? 'bg-white/5 text-white/60 border-white/10' : 'bg-gray-50 text-gray-500 border-gray-200'
                          }`}
                          title="Remove from favorites"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-8" />
              
              <h3 className="text-2xl font-light tracking-tight mb-4">
                Discover <span className="font-serif italic text-[#c9a227]">More</span>
              </h3>
              <p className={`mb-8 max-w-md mx-auto font-light ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>
                Explore our complete collection of premium eyewear.
              </p>
              <Link
                to="/glasses"
                className={`inline-flex items-center gap-2 px-8 py-4 border font-medium tracking-wider uppercase text-sm transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-white/20 text-white hover:bg-white/5 hover:border-white/40' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                View Full Collection
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
