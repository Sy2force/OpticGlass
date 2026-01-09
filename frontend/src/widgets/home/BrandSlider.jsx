import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import brands from '@/shared/data/brands';

const BrandSlider = () => {
  // Filter les brands avec logo
  const brandsWithLogo = brands.filter(b => b.logo);
  
  // Diviser en deux rangées
  const halfLength = Math.ceil(brandsWithLogo.length / 2);
  const firstRow = brandsWithLogo.slice(0, halfLength);
  const secondRow = brandsWithLogo.slice(halfLength);
  
  // Dupliquer pour défilement infini fluide
  const duplicatedFirstRow = [...firstRow, ...firstRow, ...firstRow];
  const duplicatedSecondRow = [...secondRow, ...secondRow, ...secondRow];

  return (
    <section className="relative w-full overflow-hidden py-20 bg-[#0a0a0a]">
      {/* Lignes décoratives */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />

      <div className="relative z-10">
        {/* Header Luxury */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-3 text-[#c9a227] text-xs tracking-[0.3em] uppercase mb-6">
              <span className="w-12 h-px bg-[#c9a227]" />
              Partners d'Excellence
              <span className="w-12 h-px bg-[#c9a227]" />
            </span>
            
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
              Nos <span className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] bg-clip-text text-transparent">Maisons</span>
            </h2>
            <p className="text-white/40 text-lg font-light">
              {brands.length} maisons prestigieuses
            </p>
          </motion.div>
        </div>

        {/* Logo Slider - Deux rangées */}
        <div className="space-y-8">
          {/* Première rangée - vers la gauche */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            
            <div className="flex overflow-hidden">
              <motion.div
                className="flex items-center gap-12"
                animate={{ x: ['0%', '-33.33%'] }}
                transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 50, ease: 'linear' } }}
              >
                {duplicatedFirstRow.map((brand, index) => (
                  <Link key={`row1-${brand.slug}-${index}`} to={`/glasses?brand=${brand.name}`} className="flex-shrink-0 group">
                    <div className="w-48 h-24 flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                      <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500" />
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Deuxième rangée */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            
            <div className="flex overflow-hidden">
              <motion.div
                className="flex items-center gap-12"
                animate={{ x: ['-33.33%', '0%'] }}
                transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 50, ease: 'linear' } }}
              >
                {duplicatedSecondRow.map((brand, index) => (
                  <Link key={`row2-${brand.slug}-${index}`} to={`/glasses?brand=${brand.name}`} className="flex-shrink-0 group">
                    <div className="w-48 h-24 flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                      <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500" />
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Luxury */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/brands"
            className="inline-flex items-center gap-3 px-10 py-4 border border-[#c9a227] text-[#c9a227] text-xs tracking-[0.15em] uppercase hover:bg-[#c9a227] hover:text-black transition-all duration-500"
          >
            Découvrir nos Maisons
            <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandSlider;
