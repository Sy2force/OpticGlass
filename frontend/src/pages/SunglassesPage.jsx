import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, X, Sun, Sparkles, Shield, Eye, Zap, Award, Crown, Diamond, 
  Star, ChevronRight, Grid3x3, LayoutGrid, Check, Plane, Square, Circle, Glasses
} from 'lucide-react';
import api from '@/shared/api/api';
import Glass3DCard from '@/entities/product/ui/Glass3DCard';
import { products as localProducts } from '@/shared/data/products';
import { useTheme } from '@/app/providers/ThemeContext';

// Icon mapping for categories
const categoryIconMap = {
  plane: Plane,
  square: Square,
  zap: Zap,
  sparkles: Sparkles,
  crown: Crown,
  circle: Circle,
};

const SunglassesPage = () => {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    gender: '',
    color: '',
    category: '',
    uvProtection: '',
    polarized: '',
    material: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCollection, setSelectedCollection] = useState('all');

  const brands = ['Solera', 'Zenith', 'Aurelia', 'Vespera', 'Equinox', 'Lumina', 'Orion', 'Apex', 'Artis', 'Nova'];
  const colors = ['Black', 'Brown', 'Gold', 'Silver', 'Blue', 'Green', 'Red', 'Pink'];
  const genders = ['Men', 'Women', 'Unisex'];
  
  const sunglassCategories = [
    { id: 'aviator', name: 'Aviator', icon: 'plane', desc: 'Iconic & timeless style' },
    { id: 'classic-square', name: 'Classic Square', icon: 'square', desc: 'Classic & versatile' },
    { id: 'sport', name: 'Sport', icon: 'zap', desc: 'Performance & protection' },
    { id: 'vintage', name: 'Vintage', icon: 'sparkles', desc: 'Retro & elegant' },
    { id: 'oversized', name: 'Oversized', icon: 'crown', desc: 'Glamorous & sophisticated' },
    { id: 'round', name: 'Round', icon: 'circle', desc: 'Bohemian & trendy' },
  ];
  
  const specialCollections = [
    { id: 'summer2026', name: 'Summer 2026', color: 'from-orange-500 to-red-600', badge: 'New' },
    { id: 'premium', name: 'Prestige Collection', color: 'from-[#c9a227] to-[#d4af37]', badge: 'Prestige' },
    { id: 'sport', name: 'Sport Elite Collection', color: 'from-green-500 to-emerald-600', badge: 'Performance' },
  ];
  
  const uvProtections = ['UV400', 'UV100%', 'Category 3', 'Category 4'];
  const materials = ['Acetate', 'Metal', 'Titanium', 'Carbon', 'Wood', 'Tortoiseshell'];

  useEffect(() => {
    fetchProducts();
  }, [page, filters, selectedCollection]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 12,
        category: 'sunglasses',
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      });

      const response = await api.get(`/products?${params}`);
      if (response.data.data && response.data.data.length > 0) {
        // Patch images if missing
        const patchedProducts = response.data.data.map(p => {
            if (!p.images || p.images.length === 0) {
                const localMatch = localProducts.find(lp => 
                    lp._id === p._id || lp.name.toLowerCase() === p.name.toLowerCase()
                );
                if (localMatch && localMatch.images) {
                    return { ...p, images: localMatch.images };
                }
            }
            return p;
        });
        setProducts(patchedProducts);
        setTotalPages(response.data.pagination?.pages || 1);
      } else {
        // Use enriched sunglasses data
        let sunglasses = localProducts.filter(p => p.category === 'sunglasses' || p.category === 'soleil');
        
        // Filter by collection if selected
        if (selectedCollection !== 'all') {
          sunglasses = sunglasses.filter(p => p.collection === selectedCollection);
        }
        
        setProducts(sunglasses);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      let filtered = localProducts.filter(p => p.category === 'sunglasses' || p.category === 'soleil');
      
      // Filter by collection
      if (selectedCollection !== 'all') {
        filtered = filtered.filter(p => p.collection === selectedCollection);
      }
      
      // Apply filters
      if (filters.brand) filtered = filtered.filter(p => p.brand === filters.brand);
      if (filters.gender) filtered = filtered.filter(p => p.gender === filters.gender);
      if (filters.category) filtered = filtered.filter(p => p.subcategory === filters.category);
      if (filters.color) filtered = filtered.filter(p => p.color.includes(filters.color));
      if (filters.uvProtection) filtered = filtered.filter(p => p.uvProtection === filters.uvProtection);
      if (filters.polarized === 'yes') filtered = filtered.filter(p => p.polarized === true);
      if (filters.polarized === 'no') filtered = filtered.filter(p => p.polarized === false);
      if (filters.material) filtered = filtered.filter(p => p.material === filters.material);
      if (filters.minPrice) filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
      if (filters.maxPrice) filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
      
      setProducts(filtered);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      gender: '',
      color: '',
      category: '',
      uvProtection: '',
      polarized: '',
      material: '',
    });
    setPage(1);
    setSelectedCollection('all');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Hero Section - Premium Design */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')`,
          }}
        />
        {/* Premium Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-5xl"
        >
          {/* Golden Line Top */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-6"
          />
          
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4"
          >
            Summer Collection 2026
          </motion.p>
          
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Premium <span className="italic text-[#c9a227]">Sunglasses</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            UV400 Protection & Unmatched Style - Discover our exclusive collections
          </motion.p>
          
          {/* Golden Line Bottom */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-8"
          />
          
          {/* Features */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <Shield className="w-4 h-4 text-[#c9a227]" />
              <span className="text-sm text-white/80">UV400 Protection</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <Eye className="w-4 h-4 text-[#c9a227]" />
              <span className="text-sm text-white/80">Polarized Lenses</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <Award className="w-4 h-4 text-[#c9a227]" />
              <span className="text-sm text-white/80">2-Year Warranty</span>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Special Collections */}
      <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Exclusive Collections</p>
            <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Premium <span className="italic text-[#c9a227]">Collections</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialCollections.map((collection, index) => (
              <motion.button
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCollection(collection.id)}
                className={`relative p-6 rounded-lg border transition-all duration-300 ${
                  selectedCollection === collection.id
                    ? 'border-[#c9a227] bg-[#c9a227]/10'
                    : isDarkMode 
                      ? 'border-white/10 bg-[#1a1a1a] hover:border-[#c9a227]/50' 
                      : 'border-gray-200 bg-white hover:border-[#c9a227]/50'
                }`}
              >
                <div className="absolute top-3 right-3 px-2 py-1 bg-[#c9a227] text-black text-[10px] font-bold tracking-wider uppercase">
                  {collection.badge}
                </div>
                <h3 className={`text-lg font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{collection.name}</h3>
                <div className="w-12 h-px bg-[#c9a227]" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Style Categories */}
      <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Find Your Style</p>
            <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Explore by <span className="italic text-[#c9a227]">Style</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sunglassCategories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setFilters({ ...filters, category: cat.id })}
                className={`p-6 rounded-lg border transition-all duration-300 hover:border-[#c9a227]/50 ${
                  filters.category === cat.id 
                    ? 'border-[#c9a227] bg-[#c9a227]/10' 
                    : isDarkMode 
                      ? 'border-white/10 bg-[#111]' 
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                {(() => {
                  const IconComponent = categoryIconMap[cat.icon];
                  return IconComponent ? <IconComponent size={28} className="mb-3 text-[#c9a227]" /> : null;
                })()}
                <h3 className={`font-serif text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cat.name}</h3>
                <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{cat.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Filters & Products */}
      <section className={`py-16 ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header avec vue mode */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className={`text-2xl font-serif mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sunglasses <span className="italic text-[#c9a227]">Catalog</span>
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>{products.length} products available</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1 ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'} rounded-lg p-1`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[#c9a227] text-black' : isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('large')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'large' ? 'bg-[#c9a227] text-black' : isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className={`${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Advanced Filters</h3>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-[#c9a227] hover:text-[#d4af37] transition flex items-center gap-1"
                    >
                      <X size={16} />
                      Reset
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Brand */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Brand</label>
                      <select
                        name="brand"
                        value={filters.brand}
                        onChange={handleFilterChange}
                        className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-gray-50 border border-gray-200 text-gray-900'
                        }`}
                      >
                        <option value="" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>All Brands</option>
                        {brands.map((brand) => (
                          <option key={brand} value={brand} className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Gender</label>
                      <select
                        name="gender"
                        value={filters.gender}
                        onChange={handleFilterChange}
                        className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-gray-50 border border-gray-200 text-gray-900'
                        }`}
                      >
                        <option value="" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>All</option>
                        {genders.map((gender) => (
                          <option key={gender} value={gender} className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>{gender}</option>
                        ))}
                      </select>
                    </div>

                    {/* UV Protection */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-1">
                        <Shield size={14} className="text-[#c9a227]" />
                        UV Protection
                      </label>
                      <select
                        name="uvProtection"
                        value={filters.uvProtection}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                      >
                        <option value="">All</option>
                        {uvProtections.map((uv) => (
                          <option key={uv} value={uv} className="bg-[#1a1a1a]">{uv}</option>
                        ))}
                      </select>
                    </div>

                    {/* Polarized */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-1">
                        <Eye size={14} className="text-[#c9a227]" />
                        Polarized
                      </label>
                      <select
                        name="polarized"
                        value={filters.polarized}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                      >
                        <option value="">All</option>
                        <option value="yes" className="bg-[#1a1a1a]">Yes</option>
                        <option value="no" className="bg-[#1a1a1a]">No</option>
                      </select>
                    </div>

                    {/* Material */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-1">
                        <Diamond size={14} className="text-[#c9a227]" />
                        Material
                      </label>
                      <select
                        name="material"
                        value={filters.material}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                      >
                        <option value="">All</option>
                        {materials.map((material) => (
                          <option key={material} value={material} className="bg-[#1a1a1a]">{material}</option>
                        ))}
                      </select>
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Color</label>
                      <select
                        name="color"
                        value={filters.color}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                      >
                        <option value="">All</option>
                        {colors.map((color) => (
                          <option key={color} value={color} className="bg-[#1a1a1a]">{color}</option>
                        ))}
                      </select>
                    </div>

                    {/* Min Price */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Min Price (₪)</label>
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="0"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                      />
                    </div>

                    {/* Max Price */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Max Price (₪)</label>
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="2000"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          {loading ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Sun className="w-20 h-20 text-white/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
              <p className="text-white/60 mb-6">Try adjusting your filters</p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium rounded-lg hover:shadow-lg transition-all"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Glass3DCard product={product} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          page === pageNum
                            ? 'bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black shadow-lg'
                            : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* Section Avantages Premium */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Why Choose Us</p>
            <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Premium <span className="italic text-[#c9a227]">Benefits</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield size={28} />, title: 'UV400 Protection', desc: '100% UVA and UVB ray blocking for optimal protection' },
              { icon: <Eye size={28} />, title: 'Polarized Lenses', desc: 'Glare reduction and contrast enhancement for maximum visual comfort' },
              { icon: <Diamond size={28} />, title: 'Premium Materials', desc: 'Italian acetate, Japanese titanium and noble materials for exceptional durability' },
              { icon: <Award size={28} />, title: '2-Year Warranty', desc: 'Premium after-sales service and extended manufacturer warranty' },
              { icon: <Star size={28} />, title: 'Exclusive Design', desc: 'Limited collections and collaborations with the greatest fashion houses' },
              { icon: <Zap size={28} />, title: 'Express Delivery', desc: 'Free delivery within 48h with premium packaging and personalized tracking' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-gray-50 border border-gray-200'} rounded-lg p-6 hover:border-[#c9a227]/50 transition-all duration-300`}
              >
                <div className="w-12 h-12 bg-[#c9a227]/10 rounded-full flex items-center justify-center mb-4">
                  <div className="text-[#c9a227]">{feature.icon}</div>
                </div>
                <h3 className={`text-lg font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SunglassesPage;
