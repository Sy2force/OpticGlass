import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Check, ChevronRight, Search, Sparkles, Crown, Star, Filter, Grid3X3, LayoutGrid, Award, Gem, ArrowRight, Eye } from 'lucide-react';
import brands from '@/shared/data/brands';
import { useTheme } from '@/app/providers/ThemeContext';

const BrandsPage = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [showOnlyWithProducts, setShowOnlyWithProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Categories de brands
  const categories = [
    { id: 'all', name: 'All', icon: Sparkles },
    { id: 'premium', name: 'Premium', icon: Crown },
    { id: 'sport', name: 'Sport', icon: Star },
    { id: 'fashion', name: 'Fashion', icon: Gem },
  ];

  // Brands premium mises en avant
  const premiumBrands = ['Soléra', 'Aurélia', 'Lumina', 'Vespera', 'Equinox', 'Orion'];

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = showOnlyWithProducts ? brand.hasProducts : true;
      const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
      return matchesSearch && matchesFilter && matchesCategory;
    });
  }, [searchTerm, showOnlyWithProducts, selectedCategory]);

  const brandsWithProducts = brands.filter(b => b.hasProducts);
  const featuredBrands = filteredBrands.filter(b => premiumBrands.includes(b.name));
  const otherBrands = filteredBrands.filter(b => !premiumBrands.includes(b.name));

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Hero Section - Premium Design */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')`,
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
            Exclusive Collection
          </motion.p>
          
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Our <span className="italic text-[#c9a227]">Brands</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Over {brands.length} prestigious brands selected for their excellence and craftsmanship
          </motion.p>
          
          {/* Golden Line Bottom */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-8"
          />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { value: brands.length + '+', label: 'Brands' },
              { value: brandsWithProducts.length, label: 'In Stock' },
              { value: '100%', label: 'Authentic' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-serif font-bold text-[#c9a227]">{stat.value}</div>
                <div className="text-white/50 text-sm tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Search & Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Search Bar Premium */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className={`${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-white border border-gray-200'} rounded-lg p-2`}>
              <div className="flex items-center gap-3">
                <Search className={`ml-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} size={20} />
                <input
                  type="text"
                  placeholder="Search for a brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full py-3 px-4 focus:outline-none ${
                    isDarkMode 
                      ? 'bg-transparent text-white placeholder-white/40' 
                      : 'bg-transparent text-gray-900 placeholder-gray-400'
                  }`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className={`px-4 py-2 ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowOnlyWithProducts(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                !showOnlyWithProducts 
                  ? 'bg-[#c9a227] text-black' 
                  : isDarkMode 
                    ? 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Sparkles size={16} />
              All ({brands.length})
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowOnlyWithProducts(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                showOnlyWithProducts 
                  ? 'bg-[#c9a227] text-black' 
                  : isDarkMode 
                    ? 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Check size={16} />
              In Stock ({brandsWithProducts.length})
            </motion.button>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
                  selectedCategory === cat.id
                    ? 'bg-[#c9a227] text-black'
                    : isDarkMode 
                      ? 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <cat.icon size={14} />
                {cat.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Brands Grid */}
        <div ref={containerRef} className="space-y-6">
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="group"
            >
              <Link to={`/brands/${brand.slug}`} className="block">
                <div className="relative overflow-hidden rounded-lg">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={brand.image || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
                  </div>

                  {/* Content */}
                  <div className="relative flex items-center min-h-[200px] md:min-h-[240px] p-6 md:p-10">
                    {/* Logo */}
                    <div className="flex-shrink-0 mr-6 md:mr-10">
                      <div className={`w-24 h-24 md:w-32 md:h-32 ${isDarkMode ? 'bg-white' : 'bg-white'} rounded-lg p-3 shadow-xl flex items-center justify-center overflow-hidden`}>
                        <img 
                          src={brand.logo} 
                          alt={`Logo ${brand.name}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = `<span class="text-2xl md:text-3xl font-serif font-bold text-gray-800">${brand.name.charAt(0)}</span>`;
                          }}
                        />
                      </div>
                    </div>

                    {/* Brand Info */}
                    <div className="flex-1">
                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg mb-3">
                        <Crown size={12} className="text-[#c9a227]" />
                        <span className="text-xs font-medium text-[#c9a227] uppercase tracking-wider">
                          {brand.category === 'premium' ? 'Premium' : brand.category === 'sport' ? 'Sport' : 'Fashion'}
                        </span>
                      </div>

                      {/* Brand Name */}
                      <h2 className="text-3xl md:text-5xl font-serif text-white mb-2">
                        {brand.name}
                      </h2>

                      {/* Country & Year */}
                      <div className="flex items-center gap-4 text-white/50 mb-3 text-sm">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {brand.country}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          Since {brand.founded}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-white/60 text-sm md:text-base max-w-lg mb-4 line-clamp-2">
                        {brand.description}
                      </p>

                      {/* CTA Button */}
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm group-hover:bg-[#d4af37] transition-all duration-300">
                        <Eye size={16} />
                        View Collection
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Stock indicator */}
                  {brand.hasProducts && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg">
                      <div className="w-2 h-2 bg-[#c9a227] rounded-full" />
                      <span className="text-xs text-[#c9a227] font-medium">In Stock</span>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredBrands.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className={`w-24 h-24 mx-auto mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
              <Search size={40} className={isDarkMode ? 'text-white/40' : 'text-gray-400'} />
            </div>
            <h3 className={`text-2xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No brand found</h3>
            <p className={`mb-6 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>Try another search term</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-colors"
            >
              Reset Search
            </button>
          </motion.div>
        )}

        {/* CTA Section - Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-[#0a0a0a] rounded-lg p-12 md:p-16 text-center relative overflow-hidden">
            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />

            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-8 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                <Gem size={32} className="text-[#c9a227]" />
              </div>
              
              <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Discover More</p>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                Excellence Within <span className="italic text-[#c9a227]">Reach</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-6" />
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
                Each brand represents the pinnacle of craftsmanship and design. Discover our complete collection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/glasses"
                  className="px-8 py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all inline-flex items-center justify-center gap-2"
                >
                  Explore Collection
                  <ChevronRight size={18} />
                </Link>
                <Link
                  to="/sunglasses"
                  className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold tracking-wider uppercase text-sm hover:border-[#c9a227] hover:text-[#c9a227] transition-all"
                >
                  Sunglasses
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandsPage;
