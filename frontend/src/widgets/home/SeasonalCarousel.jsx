import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCurrentSeason, getSeasonTheme } from '@/shared/lib/seasons';

const SeasonalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSeason = getCurrentSeason();
  const seasonTheme = getSeasonTheme(currentSeason);

  // Images de lunettes par saison
  const slides = [
    {
      season: 'spring',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80',
      title: 'Spring Collection 2026',
      subtitle: 'Freshness & Elegance',
      color: '#FF6B9D',
    },
    {
      season: 'summer',
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=80',
      title: 'Summer Collection 2026',
      subtitle: 'Sun & Protection',
      color: '#FFD700',
    },
    {
      season: 'autumn',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80',
      title: 'Autumn Collection 2026',
      subtitle: 'Warmth & Sophistication',
      color: '#D2691E',
    },
    {
      season: 'winter',
      image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1200&q=80',
      title: 'Winter Collection 2026',
      subtitle: 'Prestige & Refinement',
      color: '#4169E1',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Image de fond */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          
          {/* Contenu */}
          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-2xl"
            >
              {/* Badge saison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/90 backdrop-blur-sm rounded-full mb-4"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium uppercase tracking-wider">
                  Nouvelle Collection
                </span>
              </motion.div>

              {/* Titre */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-6xl font-light text-white mb-3 tracking-tight"
              >
                {slides[currentSlide].title}
              </motion.h2>

              {/* Sous-titre */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-white/80 mb-8 font-light"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4"
              >
                <button className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  Discover
                </button>
                <button className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg">
                  View Collection
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-10"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-10"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SeasonalCarousel;
