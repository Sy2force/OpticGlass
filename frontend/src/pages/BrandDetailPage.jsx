import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Globe, ArrowRight, Filter } from 'lucide-react';
import brands from '@/shared/data/brands';
import api from '@/shared/api/api';
import Glass3DCard from '@/entities/product/ui/Glass3DCard';

const BrandDetailPage = () => {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundBrand = brands.find(b => b.slug === slug);
    if (foundBrand) {
      setBrand(foundBrand);
      fetchBrandProducts(foundBrand.name);
    } else {
      setLoading(false);
    }
  }, [slug]);

  const fetchBrandProducts = async (brandName) => {
    try {
      // In a real app, use the API. For now we might need to rely on the products endpoint filtering
      const response = await api.get(`/products?brand=${encodeURIComponent(brandName)}&limit=12`);
      if (response.data.data) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Erreur chargement produits marque:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!brand && !loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Brand not found</h1>
          <Link to="/brands" className="text-[#c9a227] hover:underline">
            Back to brands
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={brand.image} 
            alt={brand.name} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-white p-6 rounded-2xl shadow-2xl flex items-center justify-center">
              <img src={brand.logo} alt={`${brand.name} logo`} className="max-w-full max-h-full" />
            </div>
            
            <div className="flex-1 mb-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-display font-bold mb-4"
              >
                {brand.name}
              </motion.h1>
              
              <div className="flex flex-wrap gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#c9a227]" />
                  {brand.country}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-[#c9a227]" />
                  Depuis {brand.founded}
                </div>
                {brand.category && (
                  <div className="px-3 py-1 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-full text-[#c9a227] text-sm uppercase tracking-wider">
                    {brand.category}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-xl font-bold mb-4 text-[#c9a227]">About</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                {brand.description}
              </p>
              <div className="pt-6 border-t border-white/10">
                <Link 
                  to="/glasses" 
                  className="flex items-center gap-2 text-white hover:text-[#c9a227] transition-colors"
                >
                  View full collection <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#c9a227]/20 to-transparent rounded-2xl p-8 border border-[#c9a227]/20">
              <Globe size={32} className="text-[#c9a227] mb-4" />
              <h3 className="text-lg font-bold mb-2">Heritage & Craftsmanship</h3>
              <p className="text-white/60 text-sm">
                Discover the excellence and tradition that make {brand.name} renowned worldwide.
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{brand.name} Collection</h2>
              <Link 
                to={`/glasses?brand=${brand.name}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-sm"
              >
                <Filter size={16} />
                View full catalog
              </Link>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.map((product) => (
                  <Glass3DCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/50">No products available at the moment.</p>
                <Link to="/glasses" className="text-[#c9a227] hover:underline mt-2 inline-block">
                  See all glasses
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetailPage;
