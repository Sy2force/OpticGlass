import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Shield,
  Truck,
  RotateCcw,
  Check,
  AlertCircle,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById } from '@/shared/api/productService';
import { products as localProducts } from '@/shared/data/products_en';

const GlassDetailPage = () => {
  // 1. All Hooks Declared at Top Level
  const { id } = useParams();
  const navigate = useNavigate();

  // State Management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI State
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  // 2. Fetch Data Effect
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);

      let data = null;

      // 1. Try API
      try {
        const response = await getProductById(id);
        if (response && (response.data || response._id)) {
           data = response.data || response;
        }
      } catch (err) {
        console.warn('API Error, trying fallback:', err);
      }

      // 2. Fallback / Merge with local data
      // Check if API data is missing or has missing images
      const hasValidApiImages = data && Array.isArray(data.images) && data.images.length > 0;
      
      // Find local counterpart
      const local = localProducts.find(p => p._id === id);

      if (local) {
         if (!data) {
             // API failed completely, use local
             data = local;
         } else if (!hasValidApiImages) {
             // API succeeded but no images, patch with local images
             data = { ...data, images: local.images };
         }
      }

      if (data) {
        setProduct(data);
        // Set default color
        if (data.colors && data.colors.length > 0) {
           setSelectedColor(data.colors[0]);
        } else if (data.color) {
           setSelectedColor(data.color);
        }
      } else {
        setError('Product not found');
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // 3. Derived State (useMemo)
  const discountedPrice = useMemo(() => {
    if (!product) return 0;
    return product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;
  }, [product]);

  const stockStatus = useMemo(() => {
    if (!product) return { label: 'Unavailable', color: 'text-gray-500' };
    if (product.stock > 10 || product.inStock) return { label: 'In Stock', color: 'text-green-400' };
    if (product.stock > 0) return { label: 'Low Stock', color: 'text-orange-400' };
    return { label: 'Out of Stock', color: 'text-red-400' };
  }, [product]);

  // Handlers
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    // Implement cart logic here
    console.log('Added to cart:', { product, quantity, selectedColor });
    // In a real app, this would dispatch to a context or Redux store
  };

  // 4. Conditional Rendering
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a227]"></div>
          <p className="text-white/70 animate-pulse">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-white/60 mb-6">{error || "We couldn't find the product you're looking for."}</p>
          <button
            onClick={() => navigate('/glasses')}
            className="px-6 py-3 bg-[#c9a227] hover:bg-[#b08d22] text-white rounded-xl font-medium transition-colors w-full"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  // 5. Main Render
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-sans selection:bg-[#c9a227]/30">
      
      {/* Navigation Bar / Breadcrumb */}
      <div className="pt-6 px-4 sm:px-8 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-[#c9a227] transition-colors flex items-center gap-1">
            <Home size={14} /> Home
          </button>
          <ChevronRight size={14} />
          <button onClick={() => navigate('/glasses')} className="hover:text-[#c9a227] transition-colors">
            Collections
          </button>
          <ChevronRight size={14} />
          <span className="text-white/90 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          
          {/* Left Column: Images */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images && product.images[selectedImage] ? product.images[selectedImage] : 'https://via.placeholder.com/600x600?text=No+Image'}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain p-8 drop-shadow-2xl"
                />
              </AnimatePresence>
              
              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-[#c9a227] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-[#c9a227] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-[#c9a227] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    New Arrival
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white/5 ${
                      selectedImage === idx ? 'border-[#c9a227] ring-2 ring-[#c9a227]/20' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h2 className="text-[#c9a227] font-medium tracking-wide uppercase text-sm mb-2">{product.brand}</h2>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-[#c9a227]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} className={i < Math.floor(product.rating || 0) ? "" : "text-white/20"} />
                  ))}
                  <span className="ml-2 text-white/60 text-sm">({product.reviews || 0} reviews)</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <span className={`text-sm font-medium ${stockStatus.color} flex items-center gap-1.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                  {stockStatus.label}
                </span>
              </div>

              <div className="flex items-end gap-3 mb-8">
                <span className="text-3xl font-bold text-white">{discountedPrice} €</span>
                {product.discount > 0 && (
                  <span className="text-lg text-white/40 line-through mb-1.5">{product.price} €</span>
                )}
              </div>
            </div>

            <div className="prose prose-invert prose-lg text-white/70 mb-8 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Selectors */}
            <div className="space-y-8 border-t border-white/10 pt-8 mb-8">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="block text-sm font-medium text-white mb-3">Available Colors</span>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                          selectedColor === color
                            ? 'bg-[#c9a227] border-[#c9a227] text-white shadow-lg shadow-[#c9a227]/20'
                            : 'bg-transparent border-white/20 text-white/70 hover:border-white/50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <span className="block text-sm font-medium text-white mb-3">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:text-[#c9a227] transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:text-[#c9a227] transition-colors"
                      disabled={product.stock <= quantity}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  {product.stock > 0 && (
                    <span className="text-sm text-white/40">
                      {product.stock} pieces available
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-[#c9a227] hover:bg-[#b08d22] disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl shadow-[#c9a227]/10 hover:shadow-[#c9a227]/30 transition-all flex items-center justify-center gap-2 group"
              >
                <ShoppingCart className="group-hover:scale-110 transition-transform" />
                Add to Cart
              </button>
            </div>

            {/* Features / Benefits */}
            <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <Truck size={20} className="text-[#c9a227]" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <Shield size={20} className="text-[#c9a227]" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <RotateCcw size={20} className="text-[#c9a227]" />
                <span>30 Days Return</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <Check size={20} className="text-[#c9a227]" />
                <span>Authentic Product</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassDetailPage;
