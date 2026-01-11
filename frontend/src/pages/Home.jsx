import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Star, ArrowRight, Sparkles, Diamond, Crown, Shield, Truck, Eye } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthContext';
import { useTheme } from '@/app/providers/ThemeContext';
import BrandSlider from '@/widgets/home/BrandSlider';
import LensRecommender from '@/features/products/ui/LensRecommender';
import SeasonalCarousel from '@/widgets/home/SeasonalCarousel';
import PromoBanner from '@/widgets/home/PromoBanner';
import api from '@/shared/api/api';
import { products as localProducts } from '@/shared/data/products_en';

// Palette premium avec touches de rouge
const premium = {
  gold: '#c9a227',
  goldLight: '#d4af37',
  red: '#DC2626',
  redDark: '#B91C1C',
  black: '#0a0a0a',
  charcoal: '#1a1a1a',
  cream: '#f5f5f0',
  white: '#ffffff',
};

// Reusable classes - Premium Compact Style with Red
const styles = {
  section: 'py-16 px-4',
  sectionDark: 'py-16 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]',
  container: 'max-w-7xl mx-auto',
  title: 'text-3xl md:text-4xl font-light tracking-tight',
  titleGold: 'text-3xl md:text-4xl font-light tracking-tight bg-gradient-to-r from-[#c9a227] via-[#d4af37] to-[#c9a227] bg-clip-text text-transparent',
  subtitle: 'text-gray-400 text-center mb-12 text-base font-light tracking-wide',
  btnPremium: 'px-8 py-3 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium tracking-wider uppercase text-sm hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all duration-300',
  btnRed: 'px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium tracking-wider uppercase text-sm hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300',
  btnOutlinePremium: 'px-8 py-3 border border-[#c9a227] text-[#c9a227] font-medium tracking-wider uppercase text-sm hover:bg-[#c9a227] hover:text-black transition-all duration-300',
  btnOutlineRed: 'px-8 py-3 border border-red-600 text-red-600 font-medium tracking-wider uppercase text-sm hover:bg-red-600 hover:text-white transition-all duration-300',
  card: 'bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-300',
  gridCols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  gridCols3: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  gridCols4: 'grid grid-cols-2 md:grid-cols-4 gap-4',
  dividerGold: 'w-20 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto my-6',
  dividerRed: 'w-20 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto my-6',
};

// Animation variants premium
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/glasses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?limit=8');
        const products = response.data.data || [];
        setNewArrivals(products.filter(p => p.isNew).slice(0, 4));
        setBestsellers(products.filter(p => p.isBestseller).slice(0, 6));
      } catch (error) {
        console.error('Error loading products:', error);
        // Use local data on error
        setNewArrivals(getNewArrivals().slice(0, 4));
        setBestsellers(getBestsellers().slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* Scrolling promotional banner */}
      <PromoBanner />
      
      {/* Seasonal carousel */}
      <SeasonalCarousel />
      
      {/* Old hero section replaced by carousel */}
      <section className="hidden relative h-screen flex items-center justify-center overflow-hidden">
        {/* Premium background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')`,
          }}
        />
        
        {/* Premium overlay with grain */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-50" />
        
        {/* Gold decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
        
        {/* Main content */}
        <motion.div
          style={{ opacity, scale }}
          className="relative z-20 text-center text-white px-4 max-w-5xl"
        >
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 border border-[#c9a227]/40 text-[#c9a227] text-xs tracking-[0.3em] uppercase">
              <Diamond size={12} />
              'exclusiveCollection'
              <Diamond size={12} />
            </span>
          </motion.div>
          
          {/* Premium main title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <h1 className="text-7xl md:text-9xl font-extralight tracking-[0.1em] text-white mb-2">
              OPTIC
            </h1>
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] bg-gradient-to-r from-[#c9a227] via-[#d4af37] to-[#c9a227] bg-clip-text text-transparent">
              GLASS
            </h1>
          </motion.div>
          
          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-8"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-lg md:text-xl mb-12 text-white/70 font-light tracking-[0.15em] uppercase"
          >
            'excellenceToOurGaze'
          </motion.p>
          
          {/* Premium search bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c9a227]/50 via-[#d4af37]/50 to-[#c9a227]/50 opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              <div className="relative flex items-center bg-black/80 backdrop-blur-xl border border-white/10 group-hover:border-[#c9a227]/30 transition-all duration-500">
                <Search className="ml-6 text-[#c9a227]" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-4 py-5 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm tracking-wide"
                />
                <button
                  type="submit"
                  className="px-8 py-5 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium tracking-wider uppercase text-xs hover:shadow-[0_0_30px_rgba(201,162,39,0.3)] transition-all duration-500"
                >
                  Search
                </button>
              </div>
            </div>
          </motion.form>
          
          {/* CTAs premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/glasses" className={styles.btnPremium}>
              Discover Collection
            </Link>
            <Link to="/brands" className={styles.btnOutlinePremium}>
              Our Brands
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator premium */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[#c9a227] text-xs tracking-[0.3em] uppercase">Discover</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-16 bg-gradient-to-b from-[#c9a227] to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Brand Slider - Trust Indicators */}
      <BrandSlider />

      {/* 1. Categories - Quick Navigation */}
      <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-3">Shop By Category</p>
            <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Explore Our <span className="italic text-[#c9a227]">Collections</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Sunglasses', icon: <Eye size={24} />, count: '200+', link: '/sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80' },
              { name: 'Optical', icon: <Diamond size={24} />, count: '150+', link: '/glasses', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80' },
              { name: 'Sport', icon: <Shield size={24} />, count: '80+', link: '/sunglasses?category=sport', image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80' },
              { name: 'Prestige', icon: <Crown size={24} />, count: '120+', link: '/brands', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80' },
            ].map((cat, index) => (
              <motion.div 
                key={cat.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={cat.link} className="group block overflow-hidden rounded-lg">
                  <div className="relative h-[200px] overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-10 h-10 mb-2 bg-[#c9a227]/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="text-[#c9a227]">{cat.icon}</div>
                      </div>
                      <h3 className="text-lg font-serif text-white">{cat.name}</h3>
                      <p className="text-white/50 text-xs">{cat.count} pieces</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Gallery - Scattered Style */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Craftsmanship</p>
            <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Timeless <span className="italic text-[#c9a227]">Elegance</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>
          
          {/* Row 1: Large Left + 2 Small Right */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-7"
            >
              <Link to="/glasses" className="relative block h-[350px] rounded-lg overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1577803645773-f96470509666?w=1000&q=80" 
                  alt="Premium Glasses" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[#c9a227] text-xs tracking-[0.2em] uppercase">Premium Collection</span>
                  <h3 className="text-3xl font-serif text-white mt-2">Aviator Classic</h3>
                </div>
              </Link>
            </motion.div>
            
            <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Link to="/glasses" className="relative block h-[167px] rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80" 
                    alt="Round Vintage" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-sm font-serif">Round Vintage</p>
                  </div>
                </Link>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/glasses" className="relative block h-[167px] rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&q=80" 
                    alt="Cat Eye" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-sm font-serif">Cat Eye</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Row 2: 3 Small Left + Large Right */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="col-span-1"
              >
                <Link to="/sunglasses" className="relative block h-[200px] rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&q=80" 
                    alt="Wayfarer" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white text-xs font-serif">Wayfarer</p>
                  </div>
                </Link>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="col-span-1"
              >
                <Link to="/sunglasses" className="relative block h-[200px] rounded-lg overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80" 
                    alt="Square Modern" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white text-xs font-serif">Square Modern</p>
                  </div>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-7"
            >
              <Link to="/sunglasses" className="relative block h-[200px] rounded-lg overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&q=80" 
                  alt="Sun Protection" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[#c9a227] text-[10px] tracking-[0.2em] uppercase">UV400 Protection</span>
                  <h3 className="text-xl font-serif text-white mt-1">Sun Collection</h3>
                </div>
              </Link>
            </motion.div>
          </div>
          
          {/* Row 3: Wide Banner + Small */}
          <div className="grid grid-cols-12 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-8"
            >
              <Link to="/glasses" className="relative block h-[180px] rounded-lg overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1000&q=80" 
                  alt="Optical Excellence" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="text-[#c9a227] text-[10px] tracking-[0.2em] uppercase">Precision Crafted</span>
                  <h3 className="text-xl font-serif text-white mt-1">Optical Excellence</h3>
                </div>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="col-span-12 md:col-span-4"
            >
              <Link to="/brands" className="relative block h-[180px] rounded-lg overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80" 
                  alt="Sport Performance" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[#c9a227] text-[9px] tracking-[0.2em] uppercase">Performance</span>
                  <p className="text-white text-sm font-serif mt-1">Sport Elite</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Maisons de Prestige */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className={styles.container}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Partners</p>
              <h2 className={`text-4xl md:text-5xl font-serif mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                The Greatest<br />
                <span className="italic text-[#c9a227]">Houses</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-[#c9a227] to-transparent mb-6" />
              <p className={`text-lg mb-10 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                An exclusive selection of the most prestigious houses. Each piece embodies excellence and exceptional craftsmanship.
              </p>
              <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mb-10">
                {['Solera', 'Zenith', 'Aurelia', 'Vespera', 'Equinox', 'Orion'].map((brand, index) => (
                  <motion.div 
                    key={brand}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center"
                  >
                    <Link 
                      to="/brands" 
                      className={`group relative px-3 py-1 font-serif text-base tracking-wide transition-all duration-300 ${
                        isDarkMode 
                          ? 'text-white/50 hover:text-[#c9a227]' 
                          : 'text-gray-400 hover:text-[#c9a227]'
                      }`}
                    >
                      {brand}
                    </Link>
                    {index < 5 && (
                      <span className="text-[#c9a227]/30 text-xs">•</span>
                    )}
                  </motion.div>
                ))}
              </div>
              <Link to="/brands" className="px-8 py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all inline-block">
                Discover our Brands
              </Link>
            </motion.div>
            <div className="grid grid-cols-3 gap-3">
              {['/brands/solera.svg', '/brands/zenith.svg', '/brands/aurelia.svg', '/brands/vespera.svg', '/brands/equinox.svg', '/brands/orion.svg'].map((logo, i) => (
                <motion.div 
                  key={logo} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`aspect-square flex items-center justify-center p-6 rounded-lg hover:border-[#c9a227]/30 transition-all duration-500 ${
                    isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                  }`}
                >
                  <img src={logo} alt="Brand" className="max-h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Prestige */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Excellence</p>
            <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              The Optic Glass <span className="italic text-[#c9a227]">Experience</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Eye size={32} />, title: 'Optical Expertise', desc: 'Our qualified opticians accompany you with state-of-the-art equipment.' },
              { icon: <Truck size={32} />, title: 'Premium Delivery', desc: 'Free express delivery. Premium packaging and personalized tracking.' },
              { icon: <Shield size={32} />, title: 'Exclusive Warranty', desc: '2-year warranty and after-sales service dedicated to your satisfaction.' }
            ].map((service, i) => (
              <motion.div  
                key={service.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`p-10 text-center rounded-lg transition-all duration-500 ${
                  isDarkMode 
                    ? 'bg-[#111] border border-white/10 hover:border-[#c9a227]/30' 
                    : 'bg-gray-50 border border-gray-200 hover:border-[#c9a227]/30'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                  <div className="text-[#c9a227]">{service.icon}</div>
                </div>
                <h3 className={`text-xl font-serif tracking-wider mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Quiz Premium */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp}>
            <LensRecommender />
          </motion.div>
        </div>
      </section>

      {/* 6. Collections 2026 - The Art of Seeing */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Collections 2026</p>
            <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              The Art of <span className="italic text-[#c9a227]">Seeing</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800', desc: 'Protection & Elegance', link: '/sunglasses' },
              { name: 'Optical', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800', desc: 'Precision & Style', link: '/glasses' },
            ].map((col, index) => (
              <motion.div 
                key={col.name} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Link to={col.link} className="group relative block h-[400px] overflow-hidden rounded-lg">
                  <img src={col.image} alt={col.name} className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-[#c9a227] text-xs tracking-[0.2em] uppercase">{col.desc}</span>
                    <h3 className="text-3xl font-serif text-white mt-2 mb-4">{col.name}</h3>
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm group-hover:bg-[#d4af37] transition-all">
                      Discover <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Premium */}
      <section className="py-20 px-4 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
          <motion.div {...fadeInUp}>
            <div className="w-16 h-16 mx-auto mb-8 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
              <Diamond className="text-[#c9a227]" size={28} />
            </div>
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Newsletter</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Join the Private <span className="italic text-[#c9a227]">Circle</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-6" />
            <p className="text-white/50 mb-10 text-lg leading-relaxed">
              Get early access to new collections, private sales, and exclusive events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/50 transition-colors text-sm tracking-wide rounded-lg"
              />
              <button className="px-8 py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-white/30 text-xs mt-6 tracking-wide">
              By subscribing, you agree to our privacy policy
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. Ray-Ban Style Red Banner - Before Footer */}
      <section className="px-4 py-0">
        <div className={styles.container}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[200px] md:h-[220px] overflow-hidden"
          >
            {/* Red Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-600 to-red-800" />
            
            {/* Diagonal Stripes Effect */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.15) 10px, rgba(0,0,0,0.15) 20px)'
            }} />
            
            {/* Light Rays Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-red-500/20 blur-3xl" />
            </div>
            
            {/* Shine Lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-between px-8 md:px-16">
              {/* Left Side - Text */}
              <div className="flex-1">
                <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2">Iconic Style</p>
                <h3 className="text-4xl md:text-5xl font-serif text-white">
                  Never <span className="italic font-light">Hide</span>
                </h3>
                <div className="w-16 h-px bg-gradient-to-r from-white/50 to-transparent mt-4" />
              </div>
              
              {/* Center - Glasses Image */}
              <div className="hidden md:flex items-center justify-center flex-1">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80" 
                    alt="Sunglasses" 
                    className="h-36 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  />
                  {/* Glow Effect Behind */}
                  <div className="absolute inset-0 -z-10 bg-white/10 blur-2xl scale-150 rounded-full" />
                </div>
              </div>
              
              {/* Right Side - CTA */}
              <div className="flex-1 text-right">
                <Link 
                  to="/sunglasses" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-bold tracking-wider uppercase text-sm hover:bg-gray-100 hover:scale-105 transition-all duration-300 group shadow-xl"
                >
                  Shop Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
