import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Filter, X, Glasses, Sparkles, Shield, Eye, Zap, Award, Crown, Diamond, 
  Star, ChevronRight, Grid3x3, LayoutGrid, Check, Search, SlidersHorizontal, ArrowUpRight,
  Sun, Gem, Clock, TrendingUp, Heart
} from 'lucide-react';
import api from '@/shared/api/api';
import Glass3DCard from '@/entities/product/ui/Glass3DCard';
import { products as localProducts } from '@/shared/data/products';
import { useTheme } from '@/app/providers/ThemeContext';

const GlassesPage = () => {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    gender: '',
    color: '',
    category: '',
    material: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const brands = ['Soléra', 'Aurélia', 'Equinox', 'Vespera', 'Artis', 'Lumina', 'Orion', 'Zenith'];
  const materials = ['Acetate', 'Metal', 'Titanium', 'Gold Plated', 'Wood', 'Mixed'];
  const colors = ['Black', 'Tortoise', 'Gold', 'Silver', 'Clear', 'Blue', 'Brown'];

  // Premium Collections Data
  const featuredCollections = [
    {
      id: 'prestige',
      name: 'Prestige Collection',
      subtitle: 'Luxury Redefined',
      description: 'Handcrafted masterpieces for the discerning eye',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop',
      icon: Crown,
      gradient: 'from-[#c9a227] via-[#d4af37] to-[#c9a227]',
      count: 24,
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      subtitle: 'Less is More',
      description: 'Clean lines, timeless elegance',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop',
      icon: Diamond,
      gradient: 'from-gray-400 via-gray-300 to-gray-400',
      count: 18,
    },
    {
      id: 'vintage',
      name: 'Vintage Heritage',
      subtitle: 'Classic Revival',
      description: 'Timeless designs reimagined',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2070&auto=format&fit=crop',
      icon: Clock,
      gradient: 'from-amber-600 via-amber-500 to-amber-600',
      count: 15,
    },
    {
      id: 'sport',
      name: 'Sport Elite',
      subtitle: 'Performance First',
      description: 'Engineered for active lifestyles',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop',
      icon: Zap,
      gradient: 'from-blue-500 via-blue-400 to-blue-500',
      count: 21,
    },
  ];

  const styleCategories = [
    { id: 'round', name: 'Round', icon: '○', count: 32 },
    { id: 'square', name: 'Square', icon: '□', count: 28 },
    { id: 'aviator', name: 'Aviator', icon: '◇', count: 24 },
    { id: 'cat-eye', name: 'Cat Eye', icon: '◠', count: 19 },
    { id: 'rectangle', name: 'Rectangle', icon: '▭', count: 35 },
    { id: 'oval', name: 'Oval', icon: '⬭', count: 22 },
  ];

  useEffect(() => {
    fetchProducts();
    // Load new arrivals
    const arrivals = localProducts.filter(p => p.isNew && (p.category === 'optical' || p.category === 'glasses' || p.category === 'optique')).slice(0, 10);
    setNewArrivals(arrivals.length > 0 ? arrivals : localProducts.filter(p => p.category === 'optical' || p.category === 'glasses' || p.category === 'optique').slice(0, 10));
  }, [filters, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Try API first
      try {
        const response = await api.get('/products?category=optical');
        if (response.data && response.data.data && response.data.data.length > 0) {
           setProducts(response.data.data);
           setLoading(false);
           return;
        }
      } catch (err) {
        console.warn('API fetch failed, falling back to local data');
      }

      // Fallback to local data
      // Add delay for smooth transition when loading local data
      if (products.length === 0) {
         await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      let filtered = localProducts.filter(p => p.category === 'optical' || p.category === 'glasses' || p.category === 'optique');

      if (filters.brand) filtered = filtered.filter(p => p.brand === filters.brand);
      if (filters.gender) filtered = filtered.filter(p => p.gender === filters.gender);
      if (filters.material) filtered = filtered.filter(p => p.material === filters.material);
      if (filters.color) filtered = filtered.filter(p => p.color?.includes(filters.color));
      if (filters.minPrice) filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
      if (filters.maxPrice) filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));

      // Sorting
      if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
      if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
      if (sortBy === 'newest') filtered.sort((a, b) => b.isNew ? 1 : -1);
      
      setProducts(filtered);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value === prev[key] ? '' : value }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      gender: '',
      color: '',
      category: '',
      material: '',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#c9a227] selection:text-black">
      {/* Hero Section */}
      <div ref={containerRef} className="relative h-[50vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#0a0a0a]" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a227]" />
              <span className="text-[#c9a227] uppercase tracking-[0.3em] text-xs font-medium">Optical Collection</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              The Art of <span className="font-serif italic text-[#c9a227]">Vision</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Discover our exclusive selection of optical frames, combining precision engineering and refined aesthetics.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Collections Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a227]" />
              <Gem size={20} className="text-[#c9a227]" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Our <span className="font-serif italic text-[#c9a227]">Collections</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Explore our curated collections, each telling a unique story of craftsmanship and style
            </p>
          </motion.div>

          {/* Main Featured Collection - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link 
              to={`/glasses?collection=${featuredCollections[0].id}`}
              className="group relative block h-[500px] rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img 
                  src={featuredCollections[0].image} 
                  alt={featuredCollections[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              
              {/* Decorative Border */}
              <div className="absolute inset-4 border border-white/10 rounded-xl pointer-events-none group-hover:border-[#c9a227]/30 transition-colors duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-xl">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${featuredCollections[0].gradient} mb-6`}>
                    <Crown size={16} className="text-black" />
                    <span className="text-black text-sm font-semibold uppercase tracking-wider">Featured</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif text-white mb-3">
                    {featuredCollections[0].name}
                  </h3>
                  <p className="text-[#c9a227] text-lg font-light mb-4">{featuredCollections[0].subtitle}</p>
                  <p className="text-white/60 text-lg mb-8 max-w-md">{featuredCollections[0].description}</p>
                  <div className="flex items-center gap-6">
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm group-hover:bg-white transition-colors duration-300">
                      Explore Collection
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <span className="text-white/40 text-sm">{featuredCollections[0].count} pieces</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCollections.slice(1).map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={`/glasses?collection=${collection.id}`}
                  className="group relative block h-[350px] rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                  </div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${collection.gradient} flex items-center justify-center shadow-lg`}>
                      <collection.icon size={20} className="text-black" />
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2">{collection.subtitle}</p>
                    <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#c9a227] transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-white/40 text-sm mb-4 line-clamp-2">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#c9a227] text-sm font-medium">{collection.count} pieces</span>
                      <span className="flex items-center gap-1 text-white/60 text-sm group-hover:text-[#c9a227] transition-colors">
                        View <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Categories Section */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h3 className="text-2xl font-light text-white mb-2">Shop by <span className="text-[#c9a227]">Style</span></h3>
              <p className="text-white/40 text-sm">Find your perfect frame shape</p>
            </div>
            <Link to="/glasses" className="text-[#c9a227] text-sm flex items-center gap-1 hover:underline">
              View All <ChevronRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {styleCategories.map((style, index) => (
              <motion.button
                key={style.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => handleFilterChange('category', style.id)}
                className={`group p-6 rounded-xl border transition-all duration-300 ${
                  filters.category === style.id
                    ? 'bg-[#c9a227]/10 border-[#c9a227]'
                    : 'bg-white/5 border-white/10 hover:border-[#c9a227]/50'
                }`}
              >
                <div className="text-4xl mb-3 text-center text-white/60 group-hover:text-[#c9a227] transition-colors">
                  {style.icon}
                </div>
                <p className="text-white text-sm font-medium text-center mb-1">{style.name}</p>
                <p className="text-white/40 text-xs text-center">{style.count} items</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now Banner */}
      <section className="py-12 bg-gradient-to-r from-[#c9a227]/10 via-[#c9a227]/5 to-[#c9a227]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c9a227] flex items-center justify-center">
                <TrendingUp size={20} className="text-black" />
              </div>
              <div>
                <p className="text-white font-medium">Trending This Season</p>
                <p className="text-white/50 text-sm">Discover what's popular right now</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {['Titanium Frames', 'Gold Accents', 'Oversized', 'Clear Frames'].map((trend, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm hover:border-[#c9a227]/50 hover:text-[#c9a227] transition-all cursor-pointer"
                >
                  {trend}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-24 pt-16">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light text-white mb-2">All <span className="text-[#c9a227]">Products</span></h2>
          <p className="text-white/40">Browse our complete collection</p>
        </motion.div>

        {/* Filters Bar */}
        <div className="sticky top-20 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-white/5 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  showFilters || activeFiltersCount > 0
                    ? 'border-[#c9a227] text-[#c9a227] bg-[#c9a227]/10' 
                    : 'border-white/10 text-white/70 hover:border-white/30'
                }`}
              >
                <SlidersHorizontal size={16} />
                <span className="text-sm font-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center bg-[#c9a227] text-black text-xs rounded-full font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="h-6 w-px bg-white/10 hidden md:block" />

              {/* Quick Filters */}
              {['Men', 'Women', 'Unisex'].map(gender => (
                <button
                  key={gender}
                  onClick={() => handleFilterChange('gender', gender)}
                  className={`text-sm transition-colors whitespace-nowrap ${
                    filters.gender === gender ? 'text-white font-medium' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/50">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm text-white border-none focus:ring-0 cursor-pointer"
                >
                  <option value="featured" className="bg-[#1a1a1a]">Featured</option>
                  <option value="newest" className="bg-[#1a1a1a]">New Arrivals</option>
                  <option value="price-asc" className="bg-[#1a1a1a]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#1a1a1a]">Price: High to Low</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[#c9a227] text-black' : 'text-white/50 hover:text-white'}`}
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('large')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'large' ? 'bg-[#c9a227] text-black' : 'text-white/50 hover:text-white'}`}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-white/5"
              >
                <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-[#c9a227] text-xs uppercase tracking-wider font-semibold mb-4">Brands</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                            filters.brand === brand ? 'bg-[#c9a227] border-[#c9a227]' : 'border-white/20 group-hover:border-white/40'
                          }`}>
                            {filters.brand === brand && <Check size={10} className="text-black" />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={filters.brand === brand}
                            onChange={() => handleFilterChange('brand', brand)}
                          />
                          <span className={`text-sm transition-colors ${filters.brand === brand ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                            {brand}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[#c9a227] text-xs uppercase tracking-wider font-semibold mb-4">Materials</h3>
                    <div className="space-y-2">
                      {materials.map(material => (
                        <label key={material} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                            filters.material === material ? 'bg-[#c9a227] border-[#c9a227]' : 'border-white/20 group-hover:border-white/40'
                          }`}>
                            {filters.material === material && <Check size={10} className="text-black" />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={filters.material === material}
                            onChange={() => handleFilterChange('material', material)}
                          />
                          <span className={`text-sm transition-colors ${filters.material === material ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                            {material}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[#c9a227] text-xs uppercase tracking-wider font-semibold mb-4">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.map(color => (
                        <button
                          key={color}
                          onClick={() => handleFilterChange('color', color)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            filters.color === color
                              ? 'bg-white text-black border-white'
                              : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[#c9a227] text-xs uppercase tracking-wider font-semibold mb-4">Price</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c9a227]"
                      />
                      <span className="text-white/30">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c9a227]"
                      />
                    </div>
                    <button 
                      onClick={clearFilters}
                      className="text-xs text-red-500 hover:text-red-400 underline decoration-1 underline-offset-4"
                    >
                      Reset all filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="flex items-center gap-2 mb-8 text-white/40 text-sm font-light">
          <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full" />
          {products.length} {products.length === 1 ? 'result' : 'results'} found
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2'
          }`}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl h-[400px] animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2'
          }`}>
            {products.map((product, index) => (
              <motion.div
                key={product._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Glass3DCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Glasses size={40} className="text-white/20" />
            </div>
            <h3 className="text-2xl font-light text-white mb-2">No results found</h3>
            <p className="text-white/40 max-w-md mx-auto mb-8">
              We couldn't find any frames matching your criteria. Try adjusting your filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 bg-[#c9a227] text-black font-medium rounded-full hover:bg-white transition-colors duration-300"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* New Arrivals Section */}
        {newArrivals.length > 0 && (
          <section className={`mt-20 py-16 px-4 rounded-lg ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">News</p>
              <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                New <span className="italic text-[#c9a227]">Arrivals</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {newArrivals.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/glasses/${product._id}`} className="group block">
                    <div className={`relative aspect-square overflow-hidden mb-3 rounded-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#1a1a1a] border border-white/10 group-hover:border-[#c9a227]/30' 
                        : 'bg-white border border-gray-200 group-hover:border-[#c9a227]/30'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center p-3">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Glasses size={32} className="text-gray-300" />
                          </div>
                        )}
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-1 bg-[#c9a227] text-black text-[9px] font-medium tracking-wider uppercase">
                        New
                      </span>
                    </div>
                    <p className="text-[#c9a227] text-[9px] tracking-[0.2em] uppercase mb-1 font-medium">{product.brand}</p>
                    <p className={`font-light text-xs line-clamp-1 group-hover:text-[#c9a227] transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                    <p className={`text-sm mt-1 font-semibold ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>{product.price} ₪</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Banner */}
        {!loading && products.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 relative rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#c9a227]" />
            <div className="relative px-8 py-16 md:p-20 text-center text-black">
              <p className="text-black/60 text-sm tracking-[0.3em] uppercase mb-4">Expert Advice</p>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Need Personal <span className="italic">Advice?</span></h2>
              <div className="w-16 h-px bg-black/20 mx-auto mb-6" />
              <p className="text-lg mb-10 max-w-2xl mx-auto opacity-80">
                Our visage experts are here to help you find the perfect pair.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="px-8 py-4 bg-black text-white font-semibold tracking-wider uppercase text-sm hover:bg-gray-900 transition-all">
                  Book Appointment
                </Link>
                <Link to="/try-on" className="px-8 py-4 bg-transparent border border-black/30 text-black font-semibold tracking-wider uppercase text-sm hover:bg-black/10 transition-all">
                  Virtual Try-On
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GlassesPage;
