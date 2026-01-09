import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/shared/api/api';
import { products as mockProducts } from '@/shared/data/products';

const FavoritesPage = () => {
  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data.data || []);
    } catch (error) {
      console.error('Erreur chargement favoris:', error);
      // Charger depuis localStorage ou utiliser des données mock
      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (localFavorites.length > 0) {
        const favProducts = mockProducts.filter(p => localFavorites.includes(p._id));
        setFavorites(favProducts);
      } else {
        // Afficher quelques produits mock comme favoris pour la démo
        setFavorites(mockProducts.filter(p => p.isBestseller).slice(0, 3));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/favorites/${productId}`);
    } catch (error) {
      console.error('Erreur suppression favori:', error);
    }
    // Mettre à jour localement dans tous les cas
    setFavorites(favorites.filter((fav) => fav._id !== productId));
    const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    localStorage.setItem('favorites', JSON.stringify(localFavorites.filter(id => id !== productId)));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading de vos favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Heart size={32} className="text-red-500" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">'favorites'</h1>
              <p className="text-gray-400 mt-1">{favorites.length} article{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Noe favori pour le moment</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explorez notre collection et ajoutez vos lunettes préférées pour les retrouver facilement.
            </p>
            <Link
              to="/glasses"
              className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition shadow-lg"
            >
              Discover la Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <Link to={`/glasses/${product._id}`}>
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden relative">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl">👓</span>
                      </div>
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    
                    {/* Badges */}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-5">
                  <Link to={`/glasses/${product._id}`}>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-amber-600 transition">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold">{product.price} ₪</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice} ₪</span>
                      )}
                    </div>
                  </Link>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium"
                    >
                      <ShoppingCart size={18} />
                      Add
                    </button>
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                      title="Remove des favoris"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-2">Vous aimez ces lunettes ?</h3>
            <p className="text-white/80 mb-6">Découvrez encore plus de modèles dans notre collection complète.</p>
            <Link
              to="/glasses"
              className="inline-block px-8 py-4 bg-white text-amber-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg"
            >
              Voir toute la collection
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
