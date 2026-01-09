import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Filter, X, Glasses, Sparkles, Shield, Eye, Zap, Award, Crown, Diamond, 
  Star, ChevronRight, Grid3x3, LayoutGrid, Check, Search, SlidersHorizontal, ArrowUpRight
} from 'lucide-react';
import api from '@/shared/api/api';
import Glass3DCard from '@/entities/product/ui/Glass3DCard';
import { luxuryProducts } from '@/shared/data/luxuryProducts';

const GlassesPage = () => {
  const [products, setProducts] = useState([]);
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

  const brands = ['Ray-Ban', 'Gucci', 'Tom Ford', 'Prada', 'Persol', 'Oliver Peoples', 'Cartier', 'Dior'];
  const materials = ['Acetate', 'Metal', 'Titanium', 'Gold Plated', 'Wood', 'Mixed'];
  const colors = ['Black', 'Tortoise', 'Gold', 'Silver', 'Clear', 'Blue', 'Brown'];

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Simulate API delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filtered = luxuryProducts.filter(p => p.type === 'glasses' || p.category === 'optical');

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
      console.error('Erreur chargement produits:', error);
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
              <span className="text-[#c9a227] uppercase tracking-[0.3em] text-xs font-medium">Collection Optique</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              L'Art de la <span className="font-serif italic text-[#c9a227]">Vision</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Découvrez notre sélection exclusive de montures optiques, alliant ingénierie de précision et esthétique raffinée.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
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
                <span className="text-sm font-medium">Filtres</span>
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
                <span className="text-sm text-white/50">Trier par:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm text-white border-none focus:ring-0 cursor-pointer"
                >
                  <option value="featured" className="bg-[#1a1a1a]">Recommandé</option>
                  <option value="newest" className="bg-[#1a1a1a]">Nouveautés</option>
                  <option value="price-asc" className="bg-[#1a1a1a]">Prix croissant</option>
                  <option value="price-desc" className="bg-[#1a1a1a]">Prix décroissant</option>
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
                    <h3 className="text-[#c9a227] text-xs uppercase tracking-wider font-semibold mb-4">Marques</h3>
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
                    <h3 className="text-[#c9a227] text-xs uppercase tracking-wider font-semibold mb-4">Matériaux</h3>
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
                    <h3 className="text-[#c9a227] text-xs uppercase tracking-wider font-semibold mb-4">Couleurs</h3>
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
                    <h3 className="text-[#c9a227] text-xs uppercase tracking-wider font-semibold mb-4">Prix</h3>
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
                      Réinitialiser tous les filtres
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
          {products.length} {products.length === 1 ? 'résultat' : 'résultats'} trouvés
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
            <h3 className="text-2xl font-light text-white mb-2">Aucun résultat trouvé</h3>
            <p className="text-white/40 max-w-md mx-auto mb-8">
              Nous n'avons pas trouvé de montures correspondant à vos critères. Essayez d'ajuster vos filtres.
            </p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 bg-[#c9a227] text-black font-medium rounded-full hover:bg-white transition-colors duration-300"
            >
              Effacer les filtres
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        {!loading && products.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#c9a227]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            </div>
            <div className="relative px-8 py-16 md:p-20 text-center text-black">
              <h2 className="text-3xl md:text-5xl font-light mb-6">Besoin de conseils personnalisés ?</h2>
              <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto opacity-80">
                Nos opticiens visagistes sont là pour vous aider à trouver la paire parfaite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="px-8 py-4 bg-black text-white font-medium rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
                  Prendre Rendez-vous
                </Link>
                <Link to="/try-on" className="px-8 py-4 bg-white/20 border border-black/10 backdrop-blur-md text-black font-medium rounded-full hover:bg-white/30 transition-all duration-300">
                  Essayage Virtuel
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
