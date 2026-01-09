import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Award,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Package,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Truck,
  X,
  Maximize2,
  Minimize2,
  Share2,
  HelpCircle,
  Eye,
  Zap,
  Scale,
  Brain
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import api from '@/shared/api/api';
import { useAuth } from '@/app/providers/AuthContext';
import { products as mockProducts, getProductById } from '@/shared/data/products';
import { luxuryProducts } from '@/shared/data/luxuryProducts';
import Glass3DCard from '@/entities/product/ui/Glass3DCard';

const GlassDetailPage = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 360]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedLens, setSelectedLens] = useState('Standard');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [purchaseConfirmOpen, setPurchaseConfirmOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '' });
  const [recommendations, setRecommendations] = useState([]);
  const [openAccordion, setOpenAccordion] = useState('');

  useEffect(() => {
    fetchProduct();
    if (isAuthenticated) {
      checkFavorite();
    }
  }, [id, isAuthenticated]);

  const handleAddToCompare = () => {
    const compareList = JSON.parse(localStorage.getItem('compareProducts') || '[null, null, null]');
    // Vérifier si déjà dans la liste
    if (compareList.some(p => p && p._id === product._id)) {
      setToast({ open: true, message: 'Déjà dans la comparaison.' });
      return;
    }
    
    // Trouver un emplacement vide
    const emptyIndex = compareList.findIndex(p => p === null);
    if (emptyIndex !== -1) {
      compareList[emptyIndex] = product;
      localStorage.setItem('compareProducts', JSON.stringify(compareList));
      setToast({ open: true, message: 'Ajouté à la comparaison.' });
    } else {
      setToast({ open: true, message: 'Liste de comparaison pleine (max 3).' });
    }
  };

    const fetchProduct = async () => {
    try {
      setLoading(true);
      // Chercher d'abord dans luxuryProducts (données mock)
      const luxuryProduct = luxuryProducts.find(p => p._id === id);
      
      if (luxuryProduct) {
        setProduct({
          ...luxuryProduct,
          images: luxuryProduct.images || ['https://via.placeholder.com/800'],
          stock: luxuryProduct.stock || 15,
          reviewsCount: luxuryProduct.reviews || 50,
          features: luxuryProduct.features || [
            'Verres de haute qualité avec protection UV400',
            'Monture légère et durable',
            'Design élégant et intemporel',
            'Charnières renforcées',
            'Livré avec étui de protection'
          ],
          specifications: {
            'Largeur du pont': '18mm',
            'Largeur des verres': '52mm',
            'Longueur des branches': '145mm',
            'Poids': '28g',
            'Matériau': luxuryProduct.material || 'Acétate',
            'Genre': luxuryProduct.gender || 'Unisexe'
          }
        });
        setLoading(false);
        return;
      }

      // Repli sur l'API
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Erreur chargement produit:', error);
      // Repli sur les produits mock si l'API échoue
      const mockProduct = getProductById(id) || mockProducts[0];
      if (mockProduct) {
        setProduct({
          ...mockProduct,
          stock: 15,
          reviewsCount: mockProduct.reviews || 50,
          features: [
            'Verres de haute qualité avec protection UV400',
            'Monture légère et durable',
            'Design élégant et intemporel',
            'Charnières renforcées',
            'Livré avec étui de protection'
          ],
          specifications: {
            'Largeur du pont': '18mm',
            'Largeur des verres': '52mm',
            'Longueur des branches': '145mm',
            'Poids': '28g'
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const availableColors = useMemo(() => {
    const raw = product?.availableColors || product?.colors;
    if (Array.isArray(raw) && raw.length > 0) return raw;
    const colorStr = product?.color;
    if (!colorStr) return [];
    return colorStr
      .split(/\s*\/\s*|\s*,\s*/)
      .map((c) => c.trim())
      .filter(Boolean);
  }, [product]);

  const availableSizes = useMemo(() => {
    const raw = product?.sizes;
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return ['S', 'M', 'L'];
  }, [product]);

  const availableLensTypes = useMemo(() => {
    const raw = product?.lensTypes || product?.lenss;
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return ['Standard', 'Blue light blocking', 'Photochromic'];
  }, [product]);

  const stockByColor = useMemo(() => {
    if (!product?.stock) return {};
    if (product?.stockByColor && typeof product.stockByColor === 'object') return product.stockByColor;
    if (availableColors.length === 0) return { default: product.stock };

    const hash = (str) => {
      let h = 0;
      for (let i = 0; i < str.length; i += 1) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
      }
      return Math.abs(h);
    };

    const weights = availableColors.map((c) => 1 + (hash(`${product._id}-${c}`) % 7));
    const sum = weights.reduce((a, b) => a + b, 0);
    let remaining = product.stock;

    const allocation = {};
    availableColors.forEach((c, idx) => {
      const qty = idx === availableColors.length - 1 ? remaining : Math.max(0, Math.floor((product.stock * weights[idx]) / sum));
      allocation[c] = qty;
      remaining -= qty;
    });

    return allocation;
  }, [availableColors, product]);

  const selectedColorStock = useMemo(() => {
    if (!product) return 0;
    if (availableColors.length === 0) return product.stock || 0;
    return stockByColor[selectedColor] ?? 0;
  }, [availableColors.length, product, selectedColor, stockByColor]);

  const effectiveStock = useMemo(() => {
    if (!product) return 0;
    if (availableColors.length > 0) return selectedColorStock;
    return product.stock || 0;
  }, [availableColors.length, product, selectedColorStock]);

  const heroGradient = useMemo(() => {
    const category = product?.category?.toLowerCase?.() || '';
    const type = product?.type?.toLowerCase?.() || '';
    const isLuxury = category.includes('luxe');
    const isSport = category.includes('sport');
    const isSun = category.includes('solaire') || type.includes('sun');

    if (isLuxury) {
      return {
        background:
          'radial-gradient(1000px 500px at 20% 20%, rgba(196,21,28,0.35), transparent 60%), radial-gradient(700px 500px at 80% 20%, rgba(255,215,0,0.18), transparent 55%), linear-gradient(180deg, #0b0b0c 0%, #0e1014 100%)',
      };
    }
    if (isSport) {
      return {
        background:
          'radial-gradient(1000px 500px at 20% 20%, rgba(14,165,233,0.22), transparent 60%), radial-gradient(700px 500px at 80% 20%, rgba(196,21,28,0.22), transparent 55%), linear-gradient(180deg, #0b0b0c 0%, #0e1014 100%)',
      };
    }
    if (isSun) {
      return {
        background:
          'radial-gradient(1000px 500px at 20% 20%, rgba(245,158,11,0.25), transparent 60%), radial-gradient(700px 500px at 80% 20%, rgba(196,21,28,0.22), transparent 55%), linear-gradient(180deg, #0b0b0c 0%, #0e1014 100%)',
      };
    }
    return {
      background:
        'radial-gradient(1000px 500px at 20% 20%, rgba(196,21,28,0.28), transparent 60%), radial-gradient(700px 500px at 80% 20%, rgba(255,255,255,0.10), transparent 55%), linear-gradient(180deg, #0b0b0c 0%, #0e1014 100%)',
    };
  }, [product]);

  useEffect(() => {
    if (!product) return;
    if (!selectedColor && availableColors.length > 0) {
      setSelectedColor(availableColors[0]);
    }
    if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0]);
    }
    if (availableLensTypes.length > 0 && !availableLensTypes.includes(selectedLens)) {
      setSelectedLens(availableLensTypes[0]);
    }
  }, [availableColors, availableLensTypes, availableSizes, product, selectedColor, selectedLens, selectedSize]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!product) return;
      try {
        const brand = encodeURIComponent(product.brand || '');
        const category = encodeURIComponent(product.category || '');

        const primary = await api.get(`/products?limit=12&brand=${brand}`);
        let items = (primary.data.data || []).filter((p) => p._id !== product._id);

        if (items.length < 4 && category) {
          const secondary = await api.get(`/products?limit=12&category=${category}`);
          const extra = (secondary.data.data || []).filter((p) => p._id !== product._id);
          const merged = [...items];
          extra.forEach((p) => {
            if (!merged.some((m) => m._id === p._id)) merged.push(p);
          });
          items = merged;
        }

        setRecommendations(items.slice(0, 8));
      } catch (error) {
        console.error('Erreur recommandations:', error);
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [product]);

  const nextImage = () => {
    if (product?.images?.length > 1) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length > 1) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await api.get('/favorites');
      const favorites = response.data.data;
      setIsFavorite(favorites.some((fav) => fav._id === id));
    } catch (error) {
      console.error('Erreur vérification favoris:', error);
    }
  };

  const handleAddToFavorites = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await api.post(`/favorites/${id}`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Erreur favoris:', error);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return false;
    }

    if (availableColors.length > 0 && !selectedColor) {
      setToast({ open: true, message: 'Please select a color.' });
      return false;
    }

    if (effectiveStock <= 0) {
      setToast({ open: true, message: 'Cette variante est en rupture de stock.' });
      return false;
    }

    const colorToSave = availableColors.length > 0 ? selectedColor : product.color || '';

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(
      (item) =>
        item.productId === id &&
        item.color === colorToSave &&
        item.size === selectedSize &&
        item.lens === selectedLens
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images?.[0],
        color: colorToSave,
        size: selectedSize,
        lens: selectedLens,
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setToast({ open: true, message: 'Added to cart.' });
    return true;
  };

  const handleBuyNow = () => {
    const ok = handleAddToCart();
    if (!ok) return;
    setPurchaseConfirmOpen(true);
    window.setTimeout(() => {
      setPurchaseConfirmOpen(false);
      navigate('/checkout');
    }, 1100);
  };

  useEffect(() => {
    if (!toast.open) return;
    const timer = window.setTimeout(() => setToast({ open: false, message: '' }), 2200);
    return () => window.clearTimeout(timer);
  }, [toast.open]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
        return;
      }

      if (!product?.images?.length) return;

      if (e.key === 'ArrowRight') {
        setLightboxIndex((idx) => (idx + 1) % product.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((idx) => (idx - 1 + product.images.length) % product.images.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Produit non trouvé</p>
      </div>
    );
  }

  const discountedPrice = product.discount > 0
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const reviews = useMemo(
    () => [
      {
        name: 'Sophie',
        rating: 5,
        text: "Finition impeccable et confort immediate. Le design est encore plus beau en vrai.",
      },
      {
        name: 'David',
        rating: 5,
        text: 'Fast delivery et premium packaging. Very satisfied with my purchase.',
      },
      {
        name: 'Maya',
        rating: 4,
        text: 'Excellent maintien et style. Je recommande pour un look chic au quotidien.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen">
      <section ref={heroRef} className="relative overflow-hidden" style={heroGradient}>
        <motion.div
          animate={shouldReduceMotion ? undefined : { opacity: [0.35, 0.55, 0.35] }}
          transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(800px 380px at 50% 35%, rgba(196,21,28,0.35), transparent 60%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-white/70 flex items-center gap-2">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>
              Home
            </span>
            <ChevronRight size={14} className="text-white/30" />
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/glasses')}>
              {product.category === 'sun' ? 'Sunglasses' : 'Glasses'}
            </span>
            <ChevronRight size={14} className="text-white/30" />
            <span className="text-[#c9a227] font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              {/* Image Gallery */}
              <div className="absolute -inset-6 bg-white/5 blur-2xl rounded-[40px]" />
              <div className="relative rounded-[28px] bg-white/5 border border-white/10 overflow-hidden">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.isNewArrival && (
                    <span className="px-3 py-1 bg-[#c9a227] text-white text-xs font-bold rounded-full">
                      NOUVEAU
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                      BESTSELLER
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <div className="aspect-square relative group">
                    {/* Main Image */}
                    <motion.div
                      style={{ rotateY, transformStyle: 'preserve-3d' }}
                      className="w-full h-full"
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={selectedImage}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={product.images?.[selectedImage] || 'https://via.placeholder.com/800'}
                          alt={product.name}
                          loading="eager"
                          onClick={() => {
                            setLightboxIndex(selectedImage);
                            setLightboxOpen(true);
                          }}
                          className="w-full h-full object-contain cursor-zoom-in drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)] hover:scale-105 transition-transform duration-500"
                        />
                      </AnimatePresence>
                    </motion.div>

                    {/* Zoom Hint */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => {
                          setLightboxIndex(selectedImage);
                          setLightboxOpen(true);
                        }}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition"
                      >
                        <Maximize2 size={20} />
                      </button>
                    </div>

                    <div
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-3 w-[78%] h-10 blur-2xl"
                      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)' }}
                    />

                    {/* Navigation Arrows */}
                    {product.images?.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          aria-label="Image précédente"
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full shadow-lg transition"
                        >
                          <ChevronLeft size={22} className="text-white" />
                        </button>
                        <button
                          onClick={nextImage}
                          aria-label="Image suivante"
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full shadow-lg transition"
                        >
                          <ChevronRight size={22} className="text-white" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.images?.length > 1 && (
                    <div className="mt-6 flex gap-3 overflow-x-auto pb-1 justify-start">
                      {product.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          onDoubleClick={() => {
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                          }}
                          className={`group relative w-16 h-16 rounded-xl overflow-hidden border transition flex-shrink-0 ${
                            selectedImage === idx
                              ? 'border-[#c9a227] shadow-[0_0_0_3px_rgba(196,21,28,0.25)]'
                              : 'border-white/10 hover:border-white/25'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Vue ${idx + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-white">
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                {/* Brand & Rating */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-sm text-white/70 font-semibold uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {product.rating > 0 && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.round(product.rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-white/20'
                          }
                        />
                      ))}
                      <span className="text-sm text-white/60 ml-1">({product.reviewsCount} avis)</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                  {product.name}
                </h1>

                <p className="mt-3 text-white/80 text-lg italic">
                  L'équilibre parfait entre design et innovation
                </p>

                {/* Short Description */}
                {product.shortDescription && (
                  <p className="mt-4 text-white/75 leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white">{discountedPrice} ₪</span>
                  {product.discount > 0 && product.originalPrice && (
                    <span className="text-xl text-white/40 line-through">{product.originalPrice} ₪</span>
                  )}
                </div>

                {/* Quick Info */}
                <div className="mt-6 grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  {product.type && (
                    <div>
                      <span className="text-xs text-white/60 uppercase">Type</span>
                      <p className="font-medium">{product.type}</p>
                    </div>
                  )}
                  {product.gender && (
                    <div>
                      <span className="text-xs text-white/60 uppercase">Genre</span>
                      <p className="font-medium">{product.gender}</p>
                    </div>
                  )}
                  {product.material && (
                    <div>
                      <span className="text-xs text-white/60 uppercase">Material</span>
                      <p className="font-medium">{product.material}</p>
                    </div>
                  )}
                  {product.sku && (
                    <div>
                      <span className="text-xs text-white/60 uppercase">SKU</span>
                      <p className="font-medium">{product.sku}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-5">
                  <div>
                    <p className="font-semibold mb-2">Color</p>
                    {availableColors.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {availableColors.map((c) => (
                          <button
                            key={c}
                            onClick={() => {
                              setSelectedColor(c);
                              if (product.images?.length > 0) {
                                const idx = Math.abs(`${c}`.length) % product.images.length;
                                setSelectedImage(idx);
                              }
                            }}
                            className={`px-4 py-2 rounded-xl border transition ${
                              selectedColor === c
                                ? 'border-[#c9a227] bg-[#c9a227]/15 shadow-[0_0_20px_rgba(196,21,28,0.25)]'
                                : 'border-white/15 hover:border-white/35'
                            }`}
                          >
                            <span className="text-sm">{c}</span>
                            <span className="ml-2 text-xs text-white/60">({stockByColor[c] ?? 0})</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/70">{product.color || '—'}</p>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`w-12 h-12 rounded-xl border transition font-semibold ${
                            selectedSize === s
                              ? 'border-[#c9a227] bg-[#c9a227]/15 shadow-[0_0_20px_rgba(196,21,28,0.25)]'
                              : 'border-white/15 hover:border-white/35'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Type de verres</p>
                    <div className="flex flex-wrap gap-2">
                      {availableLensTypes.map((l) => (
                        <button
                          key={l}
                          onClick={() => setSelectedLens(l)}
                          className={`px-4 py-2 rounded-xl border transition ${
                            selectedLens === l
                              ? 'border-[#c9a227] bg-[#c9a227]/15 shadow-[0_0_20px_rgba(196,21,28,0.25)]'
                              : 'border-white/15 hover:border-white/35'
                          }`}
                        >
                          <span className="text-sm">{l}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Quantity */}
                    <p className="font-semibold mb-2">Quantity</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition font-bold"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-10 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(Math.max(1, effectiveStock), quantity + 1))}
                        className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition font-bold"
                      >
                        +
                      </button>
                      <span
                        className={`text-sm ${
                          effectiveStock > 10
                            ? 'text-green-400'
                            : effectiveStock > 0
                              ? 'text-orange-300'
                              : 'text-red-300'
                        }`}
                      >
                        {effectiveStock > 0
                          ? `${effectiveStock} en stock`
                          : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.button
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { y: 1 }}
                    onClick={handleAddToCart}
                    disabled={effectiveStock === 0}
                    className="relative w-full px-6 py-4 rounded-2xl font-semibold text-white border border-white/10 bg-[#c9a227] shadow-[0_18px_45px_rgba(196,21,28,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <ShoppingCart size={20} />
                      Ajouter au panier
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { y: 1 }}
                    onClick={handleBuyNow}
                    disabled={effectiveStock === 0}
                    className="relative w-full px-6 py-4 rounded-2xl font-semibold text-white border border-white/20 bg-white/10 hover:bg-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Sparkles size={20} className="text-[#c9a227]" />
                      Achat immédiat
                    </span>
                  </motion.button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <motion.button
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    onClick={handleAddToFavorites}
                    className={`px-5 py-3 rounded-2xl border transition ${
                      isFavorite
                        ? 'border-[#c9a227] bg-[#c9a227]/15 shadow-[0_0_20px_rgba(196,21,28,0.20)]'
                        : 'border-white/15 hover:border-white/35'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                      Favorites
                    </span>
                  </motion.button>
                  <div className="text-sm text-white/70 flex items-center gap-2">
                    <Shield size={16} className="text-[#c9a227]" />
                    Payment sécurisé
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div className="flex flex-col items-center text-center">
                    <Truck className="text-[#c9a227] mb-1" size={22} />
                    <span className="text-xs text-white/70">Livraison 1–3 jours 🇮🇱</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Shield className="text-[#c9a227] mb-1" size={22} />
                    <span className="text-xs text-white/70">Warranty {product.warranty || '2 ans'}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Award className="text-[#c9a227] mb-1" size={22} />
                    <span className="text-xs text-white/70">{product.madeIn ? `Fabriqué en ${product.madeIn}` : 'Authentique'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Tabs Section */}
            <div className="border-b">
              <div className="flex">
                {['description', 'caractéristiques', 'spécifications', 'ai analysis'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-5 text-center font-medium transition capitalize ${
                      activeTab === tab
                        ? 'text-[#c9a227] border-b-2 border-[#c9a227]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'ai analysis' ? (
                      <span className="flex items-center justify-center gap-2">
                        <Brain size={16} />
                        AI Analysis
                      </span>
                    ) : tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              {activeTab === 'ai analysis' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                    <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                      <Sparkles className="text-indigo-600" size={20} />
                      Analyse de Style & Morphologie
                    </h3>
                    <p className="text-indigo-800 mb-4">
                      Basé sur l'analyse de nos experts IA, cette monture {product.name} est idéale pour :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-indigo-900 mb-2">Formes de visage recommandées</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white rounded-full text-sm border border-indigo-200 text-indigo-700">Ovale</span>
                          <span className="px-3 py-1 bg-white rounded-full text-sm border border-indigo-200 text-indigo-700">Carré</span>
                          <span className="px-3 py-1 bg-white rounded-full text-sm border border-indigo-200 text-indigo-700">Cœur</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-indigo-900 mb-2">Style & Occasion</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white rounded-full text-sm border border-indigo-200 text-indigo-700">Business Chic</span>
                          <span className="px-3 py-1 bg-white rounded-full text-sm border border-indigo-200 text-indigo-700">Quotidien</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-indigo-200">
                      <p className="text-sm text-indigo-700">
                        <strong>Notre avis :</strong> Le design intemporel de la {product.brand} {product.name} apporte une touche de sophistication immédiate. La qualité des matériaux {product.material} assure une durabilité exceptionnelle.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'description' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                  {product.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {product.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {product.features?.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check className="text-green-500 flex-shrink-0" size={20} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Noee caractéristique disponible</p>
                  )}
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {product.specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]) =>
                          value && (
                            <div key={key} className="flex justify-between p-4 bg-gray-50 rounded-xl">
                              <span className="text-gray-500 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="font-medium text-gray-900">{value}</span>
                            </div>
                          )
                      )}
                      {product.sku && (
                        <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
                          <span className="text-gray-500">Référence (SKU)</span>
                          <span className="font-medium text-gray-900">{product.sku}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">Noee spécification disponible</p>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Galerie</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(product.images || []).slice(0, 6).map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                    className="group relative overflow-hidden rounded-2xl bg-gray-100"
                  >
                    <img
                      src={img}
                      alt={`Galerie ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Disponibilité & livraison</h2>
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Package className="text-[#c9a227]" size={22} />
                    <div>
                      <p className="font-semibold text-gray-900">Stock</p>
                      {availableColors.length > 0 ? (
                        <div className="mt-2 space-y-1">
                          {availableColors.map((c) => (
                            <div key={c} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{c}</span>
                              <span className="font-semibold text-gray-900">{stockByColor[c] ?? 0}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">{product.stock} available</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="text-[#c9a227]" size={22} />
                    <div>
                      <p className="font-semibold text-gray-900">Livraison</p>
                      <p className="text-gray-600 text-sm">1 à 3 jours ouvrés 🇮🇱</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="text-[#c9a227]" size={22} />
                    <div>
                      <p className="font-semibold text-gray-900">Payment sécurisé</p>
                      <p className="text-gray-600 text-sm">Transactions chiffrées + protection achandeur</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="text-[#c9a227]" size={22} />
                    <div>
                      <p className="font-semibold text-gray-900">Randrait boutique</p>
                      <p className="text-gray-600 text-sm">Free (selon disponibilité)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <motion.button
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    onClick={handleBuyNow}
                    disabled={effectiveStock === 0}
                    className="w-full py-4 bg-[#c9a227] hover:bg-[#d4af37] text-white font-bold rounded-2xl transition-colors shadow-lg shadow-[#c9a227]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Buy maintenant
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Vous aimerez aussi</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recommendations.slice(0, 6).map((p) => (
              <button
                key={p._id}
                onClick={() => navigate(`/glasses/${p._id}`)}
                className="flex-shrink-0 w-72 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">👓</div>
                  )}
                </div>
                <div className="p-5 text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{p.brand}</p>
                  <p className="font-bold text-gray-900 mt-1 line-clamp-1">{p.name}</p>
                  <p className="mt-3 text-lg font-bold text-[#c9a227]">{p.price} ₪</p>
                </div>
              </button>
            ))}

            {recommendations.length === 0 && (
              <div className="text-gray-500">Noee recommandation disponible</div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Features techniques</h2>

              <div className="space-y-3">
                {[
                  {
                    key: 'matiere',
                    title: 'Material',
                    value: product.material || 'Acétate italien / acier inoxydable',
                  },
                  {
                    key: 'poids',
                    title: 'Poids',
                    value: product.specifications?.poids || '32g',
                  },
                  {
                    key: 'charnieres',
                    title: 'Charnières',
                    value: 'Ressorts flexibles',
                  },
                  {
                    key: 'resistance',
                    title: 'Résistance',
                    value: 'Rayures, UV, pliage',
                  },
                  {
                    key: 'garantie',
                    title: 'Warranty',
                    value: product.warranty || '2 ans',
                  },
                ].map((item) => (
                  <div key={item.key} className="bg-gray-50 rounded-2xl border border-gray-100">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === item.key ? '' : item.key)}
                      className="w-full px-5 py-4 flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-900">{item.title}</span>
                      <ChevronDown
                        size={20}
                        className={`text-gray-500 transition-transform ${openAccordion === item.key ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openAccordion === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 text-gray-700"
                        >
                          <div className="pt-1">{item.value}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Reviews clients</h2>
              <div className="space-y-4">
                {reviews.map((r, idx) => (
                  <motion.div
                    key={`${r.name}-${idx}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{r.name}</p>
                        <p className="text-sm text-gray-500">A achandé: {product.name}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 italic">“{r.text}”</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-900 to-black py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white">
                  Optic Glass – <span className="text-primary">l'élégance à votre vue</span>
                </h3>
                <p className="mt-3 text-white/75">
                  Recevez les actualités, éditions limitées et offres premium.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
                  />
                  <button className="px-6 py-4 rounded-2xl bg-[#c9a227] hover:bg-[#d4af37] text-white font-bold transition-colors">
                    S’abonner
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <button onClick={() => navigate('/contact')} className="text-white/70 hover:text-white text-left">
                  Contact
                </button>
                <button onClick={() => navigate('/faq')} className="text-white/70 hover:text-white text-left">
                  Retours
                </button>
                <button onClick={() => navigate('/faq')} className="text-white/70 hover:text-white text-left">
                  Warranty
                </button>
                <button onClick={() => navigate('/faq')} className="text-white/70 hover:text-white text-left">
                  CGV
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close"
                className="absolute -top-2 -right-2 p-2 rounded-full bg-white text-gray-900 shadow"
              >
                <X size={18} />
              </button>
              <div className="bg-black rounded-2xl overflow-hidden">
                <img
                  src={product.images?.[lightboxIndex]}
                  alt={product.name}
                  loading="eager"
                  className="w-full max-h-[80vh] object-contain"
                />
              </div>
              {product.images?.length > 1 && (
                <div className="mt-3 flex justify-center gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`Voir l'image ${idx + 1}`}
                      className={`w-14 h-14 rounded-xl overflow-hidden border ${
                        lightboxIndex === idx ? 'border-[#c9a227]' : 'border-white/20'
                      }`}
                    >
                      <img src={img} alt={`Mini ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {purchaseConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm w-full"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check size={30} className="text-green-600" />
              </div>
              <p className="mt-4 text-xl font-bold text-gray-900">Achat Validated</p>
              <p className="mt-1 text-gray-600">Redirection vers le paiement…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast.open && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-black text-white shadow-2xl border border-white/10"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlassDetailPage;
