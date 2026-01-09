import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Star, ArrowRight, Sparkles, Diamond, Crown, Shield, Truck, Eye } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthContext';
import BrandSlider from '@/widgets/home/BrandSlider';
import LensRecommender from '@/features/products/ui/LensRecommender';
import SeasonalCarousel from '@/widgets/home/SeasonalCarousel';
import PromoBanner from '@/widgets/home/PromoBanner';
import api from '@/shared/api/api';
import { products as localProducts } from '@/shared/data/products_en';

// Palette luxe avec touches de rouge
const luxe = {
  gold: '#c9a227',
  goldLight: '#d4af37',
  red: '#DC2626',
  redDark: '#B91C1C',
  black: '#0a0a0a',
  charcoal: '#1a1a1a',
  cream: '#f5f5f0',
  white: '#ffffff',
};

// Classes réutilisables - Style Luxury Compact avec Rouge
const styles = {
  section: 'py-16 px-4',
  sectionDark: 'py-16 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]',
  container: 'max-w-7xl mx-auto',
  title: 'text-3xl md:text-4xl font-light tracking-tight',
  titleGold: 'text-3xl md:text-4xl font-light tracking-tight bg-gradient-to-r from-[#c9a227] via-[#d4af37] to-[#c9a227] bg-clip-text text-transparent',
  subtitle: 'text-gray-400 text-center mb-12 text-base font-light tracking-wide',
  btnLuxury: 'px-8 py-3 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium tracking-wider uppercase text-sm hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all duration-300',
  btnRed: 'px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium tracking-wider uppercase text-sm hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300',
  btnOutlineLuxury: 'px-8 py-3 border border-[#c9a227] text-[#c9a227] font-medium tracking-wider uppercase text-sm hover:bg-[#c9a227] hover:text-black transition-all duration-300',
  btnOutlineRed: 'px-8 py-3 border border-red-600 text-red-600 font-medium tracking-wider uppercase text-sm hover:bg-red-600 hover:text-white transition-all duration-300',
  card: 'bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-300',
  gridCols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  gridCols3: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  gridCols4: 'grid grid-cols-2 md:grid-cols-4 gap-4',
  dividerGold: 'w-20 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto my-6',
  dividerRed: 'w-20 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto my-6',
};

// Animation variants luxe
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
        console.error('Erreur chargement produits:', error);
        // Utiliser les données mock en cas d'erreur
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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Bande promotionnelle défilante */}
      <PromoBanner />
      
      {/* Carrousel saisonnier */}
      <SeasonalCarousel />
      
      {/* Ancienne hero section remplacée par le carrousel */}
      <section className="hidden relative h-screen flex items-center justify-center overflow-hidden">
        {/* Image de fond luxe */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')`,
          }}
        />
        
        {/* Overlay luxe avec grain */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-50" />
        
        {/* Lignes décoratives dorées */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
        
        {/* Contenu principal */}
        <motion.div
          style={{ opacity, scale }}
          className="relative z-20 text-center text-white px-4 max-w-5xl"
        >
          {/* Badge luxe */}
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
          
          {/* Titre principal luxe */}
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
          
          {/* Diemptyr doré */}
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
          
          {/* Barre de recherche luxe */}
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
          
          {/* CTAs luxe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/glasses" className={styles.btnLuxury}>
              Discover Collection
            </Link>
            <Link to="/brands" className={styles.btnOutlineLuxury}>
              Our Brands
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator luxe */}
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

      {/* Brand Slider */}
      <BrandSlider />

      {/* Bestsellers Section - Luxury Compact */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full text-red-600 text-xs tracking-wider uppercase mb-4">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              Best Sellers
            </span>
            <h2 className={`${styles.title} text-white mb-3`}>Our Exceptional Pieces</h2>
            <p className="text-white/50 font-light text-sm max-w-xl mx-auto">
              Discover our most prized creations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestsellers.length > 0 ? bestsellers.map((product, index) => (
              <motion.div 
                key={product._id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={`/glasses/${product._id}`} className="group block">
                  <div className="relative aspect-square bg-[#1a1a1a] border border-white/5 overflow-hidden mb-3 rounded-lg group-hover:border-red-600/50 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-white/20">🕶️</div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase rounded">
                      Best
                    </span>
                  </div>
                  <p className="text-red-400 text-[10px] tracking-[0.2em] uppercase mb-1 font-medium">{product.brand}</p>
                  <p className="text-white font-light text-xs line-clamp-1 group-hover:text-red-400 transition-colors">{product.name}</p>
                  <p className="text-white/60 text-sm mt-1 font-semibold">{product.price} ₪</p>
                </Link>
              </motion.div>
            )) : (
              [...Array(6)].map((_, i) => <div key={i} className="aspect-square bg-white/5 animate-pulse" />)
            )}
          </div>
          
          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Link to="/glasses?sort=bestseller" className={styles.btnRed}>
              View Full Selection <ArrowRight size={16} className="ml-2 inline" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Collections Luxury Compact */}
      <section className={`${styles.section} bg-[#f5f5f0]`}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-xs tracking-wider uppercase mb-3">
              Collections 2026
            </span>
            <h2 className={`${styles.title} text-[#1a1a1a] mb-2`}>The Art of Seeing</h2>
            <div className={styles.dividerRed} />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Sun', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800', desc: 'Protection & Elegance', link: '/sunglasses' },
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-red-400 text-xs tracking-wider uppercase">{col.desc}</span>
                    <h3 className="text-3xl font-light text-white mt-2 mb-3">{col.name}</h3>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-lg group-hover:bg-red-600 transition-all">
                      Discover <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Luxury Compact */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-xs tracking-wider uppercase mb-3">
              Our Universes
            </span>
            <h2 className={`${styles.title} text-white`}>Explore Our Collections</h2>
            <div className={styles.dividerRed} />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Sun', icon: <Eye size={28} />, count: '200+', link: '/sunglasses' },
              { name: 'Optical', icon: <Diamond size={28} />, count: '150+', link: '/glasses' },
              { name: 'Sport', icon: <Shield size={28} />, count: '80+', link: '/sunglasses?category=sport' },
              { name: 'Prestige', icon: <Crown size={28} />, count: '120+', link: '/brands' },
            ].map((cat, index) => (
              <motion.div 
                key={cat.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={cat.link} className="group block bg-[#1a1a1a] border border-white/10 rounded-lg p-6 text-center hover:border-red-600/50 hover:bg-[#1a1a1a] transition-all duration-300">
                  <div className="text-[#c9a227] mb-4 flex justify-center group-hover:text-red-600 group-hover:scale-110 transition-all duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-light text-white tracking-wider mb-1">{cat.name}</h3>
                  <p className="text-white/40 text-xs">{cat.count} pieces</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maisons de Luxury */}
      <section className={`${styles.section} bg-[#f5f5f0]`}>
        <div className={styles.container}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <span className="text-[#c9a227] text-xs tracking-[0.3em] uppercase mb-4 block">Partners</span>
              <h2 className="text-5xl md:text-6xl font-light text-[#1a1a1a] mb-6 leading-tight">
                The Greatest<br />
                <span className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] bg-clip-text text-transparent">Houses</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10 font-light leading-relaxed">
                An exclusive selection of the most prestigious houses. Each piece embodies excellence and exceptional craftsmanship.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Gucci', 'Prada', 'Dior', 'Chanel', 'Tom Ford', 'Versace'].map((brand) => (
                  <span key={brand} className="px-5 py-2 border border-[#1a1a1a]/20 text-[#1a1a1a] text-sm tracking-wider">{brand}</span>
                ))}
              </div>
              <Link to="/brands" className={styles.btnLuxury}>
                Discover our Brands
              </Link>
            </motion.div>
            <div className="grid grid-cols-3 gap-3">
              {['/brands/gucci.svg', '/brands/prada.svg', '/brands/dior.svg', '/brands/chanel.svg', '/brands/tomford.svg', '/brands/versace.svg'].map((logo, i) => (
                <motion.div 
                  key={logo} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square bg-white border border-black/5 flex items-center justify-center p-6 hover:border-[#c9a227]/30 hover:shadow-lg transition-all duration-500"
                >
                  <img src={logo} alt="Brand" className="max-h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Luxury */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-[#c9a227] text-xs tracking-[0.3em] uppercase mb-4 block">Excellence</span>
            <h2 className={`${styles.title} text-white`}>The Optic Glass Experience</h2>
            <div className={styles.dividerGold} />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { icon: <Eye size={40} />, title: 'Optical Expertise', desc: 'Our qualified opticians accompany you with state-of-the-art equipment.' },
              { icon: <Truck size={40} />, title: 'Premium Delivery', desc: 'Free express delivery. Luxury packaging and personalized tracking.' },
              { icon: <Shield size={40} />, title: 'Exclusive Warranty', desc: '2-year warranty and after-sales service dedicated to your satisfaction.' }
            ].map((service, i) => (
              <motion.div  
                key={service.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-[#0a0a0a] p-12 text-center group hover:bg-[#1a1a1a] transition-all duration-500"
              >
                <div className="text-[#c9a227] mb-8 flex justify-center group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-light text-white tracking-wider mb-4">{service.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Luxury */}
      <section className={`${styles.section} bg-[#f5f5f0]`}>
        <div className={styles.container}>
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-[#c9a227] text-xs tracking-[0.3em] uppercase mb-4 block">News</span>
            <h2 className={`${styles.title} text-[#1a1a1a]`}>New Arrivals</h2>
            <div className={styles.dividerGold} />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] bg-white animate-pulse" />)
            ) : newArrivals.length > 0 ? (
              newArrivals.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/glasses/${product._id}`} className="group block">
                    <div className="relative aspect-square bg-white overflow-hidden mb-3 rounded-lg border border-gray-100 group-hover:border-red-600/30 transition-all duration-300">
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">👓️</div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#c9a227] text-black text-[10px] font-medium tracking-wider uppercase">
                        New
                      </span>
                    </div>
                    <p className="text-red-600 text-[10px] tracking-[0.2em] uppercase mb-1 font-medium">{product.brand}</p>
                    <p className="text-[#1a1a1a] font-light text-xs line-clamp-1 group-hover:text-red-600 transition-colors">{product.name}</p>
                    <p className="text-[#1a1a1a]/60 text-sm mt-1 font-semibold">{product.price} ₪</p>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-400 py-12">No new arrivals at the moment</div>
            )}
          </div>
          
          <motion.div {...fadeInUp} className="mt-16 text-center">
            <Link to="/glasses" className={styles.btnLuxury}>
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quiz Luxury */}
      <section className={styles.sectionDark}>
        <div className="max-w-4xl mx-auto px-4">
          <motion.div {...fadeInUp}>
            <LensRecommender />
          </motion.div>
        </div>
      </section>

      {/* Newsletter Luxury */}
      <section className={`${styles.section} bg-[#1a1a1a] relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-30" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
          <motion.div {...fadeInUp}>
            <Diamond className="text-[#c9a227] mx-auto mb-6" size={32} />
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Join the Private Circle
            </h2>
            <p className="text-white/50 font-light mb-10 text-lg leading-relaxed">
              Get early access to new collections, private sales, and exclusive events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/50 transition-colors text-sm tracking-wide"
              />
              <button className={styles.btnLuxury}>
                Subscribe
              </button>
            </div>
            <p className="text-white/30 text-xs mt-6 tracking-wide">
              By subscribing, you agree to our privacy policy
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
