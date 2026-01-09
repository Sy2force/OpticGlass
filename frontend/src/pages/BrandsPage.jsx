import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Check, ChevronRight, Search, Sparkles, Crown, Star, Filter, Grid3X3, LayoutGrid, Award, Gem, ArrowRight, Eye } from 'lucide-react';
import brands from '@/shared/data/brands';

const BrandsPage = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [showOnlyWithProducts, setShowOnlyWithProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Categories de brands
  const categories = [
    { id: 'all', name: 'All', icon: Sparkles },
    { id: 'luxury', name: 'Luxury', icon: Crown },
    { id: 'sport', name: 'Sport', icon: Star },
    { id: 'fashion', name: 'Fashion', icon: Gem },
  ];

  // Brands premium mises en avant
  const premiumBrands = ['Ray-Ban', 'Gucci', 'Dior', 'Prada', 'Tom Ford', 'Versace'];

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section Premium */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(196,21,28,0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-red-600/20 backdrop-blur-sm border border-primary/30 rounded-full mb-8"
            >
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-white font-semibold">Exclusive Collection</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">Our Brands</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Over {brands.length} prestigious brands selected for their excellence and craftsmanship
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {[
                { value: brands.length + '+', label: 'Brands' },
                { value: brandsWithProducts.length, label: 'In Stock' },
                { value: '100%', label: 'Authentic' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">

        {/* Search & Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Search Bar Premium */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-red-600/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
              <div className="flex items-center gap-3">
                <Search className="ml-4 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Search for a brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOnlyWithProducts(false)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                !showOnlyWithProducts 
                  ? 'bg-gradient-to-r from-primary to-red-600 text-white shadow-lg shadow-primary/30' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              <Sparkles size={18} />
              All ({brands.length})
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOnlyWithProducts(true)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                showOnlyWithProducts 
                  ? 'bg-gradient-to-r from-primary to-red-600 text-white shadow-lg shadow-primary/30' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              <Check size={18} />
              In Stock ({brandsWithProducts.length})
            </motion.button>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-primary to-red-600 text-white shadow-lg shadow-primary/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                <cat.icon size={16} />
                {cat.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Brands Grid - Toutes les titres à gauche avec logos */}
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
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={brand.image || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
                  </div>

                  {/* Content - Torjours à gauche */}
                  <div className="relative flex items-center min-h-[220px] md:min-h-[260px] p-6 md:p-10">
                    {/* Logo de la brand */}
                    <div className="flex-shrink-0 mr-6 md:mr-10">
                      <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center overflow-hidden">
                        <img 
                          src={brand.logo} 
                          alt={`Logo ${brand.name}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = `<span class="text-2xl md:text-3xl font-bold text-gray-800">${brand.name.charAt(0)}</span>`;
                          }}
                        />
                      </div>
                    </div>

                    {/* Infos de la brand */}
                    <div className="flex-1">
                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-3">
                        <Crown size={12} className="text-primary" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          {brand.category === 'luxury' ? 'Luxury' : brand.category === 'sport' ? 'Sport' : 'Fashion'}
                        </span>
                      </div>

                      {/* Brand Name */}
                      <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                        {brand.name}
                      </h2>

                      {/* Country & Year */}
                      <div className="flex items-center gap-4 text-gray-400 mb-3 text-sm">
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
                      <p className="text-gray-300 text-sm md:text-base max-w-lg mb-4 line-clamp-2">
                        {brand.description}
                      </p>

                      {/* CTA Button */}
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300 text-sm">
                        <Eye size={16} />
                        View Collection
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Stock indicator */}
                  {brand.hasProducts && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-xs text-emerald-400 font-medium">In Stock</span>
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
            <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
              <Search size={40} className="text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No brand found</h3>
            <p className="text-gray-400 mb-6">Try another search term</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-[#d4af37] transition-colors"
            >
              Reset Search
            </button>
          </motion.div>
        )}

        {/* CTA Section Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-red-600/10 to-primary/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30"
              >
                <Gem size={40} className="text-white" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Excellence Within Reach
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Each brand represents the pinnacle of craftsmanship and design. Discover our complete collection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/glasses"
                  className="group px-8 py-4 bg-gradient-to-r from-primary to-red-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all inline-flex items-center justify-center gap-2"
                >
                  Explore Collection
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/try-on"
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  Virtual Try-On
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
