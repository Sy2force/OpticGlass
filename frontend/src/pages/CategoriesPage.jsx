import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoriesPage = () => {
  

  const categories = [
    {
      name: 'Vue',
      slug: 'vue',
      description: 'Lunettes de vue élégantes et confortables',
      gradient: 'from-blue-600 to-blue-400',
    },
    {
      name: 'Solaire',
      slug: 'sun',
      description: 'Protection UV et style incomparable',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      name: 'Sport',
      slug: 'sport',
      description: 'Performance et technologie avancée',
      gradient: 'from-red-600 to-red-400',
    },
    {
      name: 'Vintage',
      slug: 'vintage',
      description: 'Designs rétro et intemporels',
      gradient: 'from-purple-600 to-pink-500',
    },
  ];

  const seasons = [
    {
      name: 'Printemps',
      slug: 'printemps',
      description: 'Couleurs fraîches et légères',
      gradient: 'from-pink-400 to-green-400',
      emoji: '🌸',
    },
    {
      name: 'Été',
      slug: 'summer',
      description: 'Protection solaire maximale',
      gradient: 'from-yellow-400 to-red-400',
      emoji: '☀️',
    },
    {
      name: 'Automne',
      slug: 'automne',
      description: 'Tons chauds et élégants',
      gradient: 'from-orange-600 to-amber-700',
      emoji: '🍂',
    },
    {
      name: 'Hiver',
      slug: 'hiver',
      description: 'Styles sophistiqués',
      gradient: 'from-blue-600 to-cyan-400',
      emoji: '❄️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-[#c9a227] via-black to-[#c9a227] bg-clip-text text-transparent">
            Categories
          </h1>
          <p className="text-xl text-gray-600">
            Trouvez les lunettes parfaites pour chaque occasion
          </p>
        </motion.div>

        {/* Par type */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-10"
          >
            Par type
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Link
                  to={`/glasses?category=${category.slug}`}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all block"
                  style={{
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
                  >
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                      className="text-6xl mb-4"
                    >
                      {category.slug === 'vue' && '👓'}
                      {category.slug === 'sun' && '🕶️'}
                      {category.slug === 'sport' && '⚡'}
                      {category.slug === 'vintage' && '✨'}
                    </motion.div>
                    
                    <h3 className="text-3xl font-bold mb-3">{category.name}</h3>
                    <p className="text-white/90 text-lg">{category.description}</p>
                    
                    <motion.div
                      className="mt-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                    >
                      Découvrir →
                    </motion.div>
                  </div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: 'inset 0 0 60px rgba(255, 255, 255, 0.2)',
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Par season */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-10"
          >
            Par saison
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((season, index) => (
              <motion.div
                key={season.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <Link
                  to={`/glasses?season=${season.slug}`}
                  className="group relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all block"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${season.gradient}`}>
                    {/* Effet de motif animé */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                      }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-8 text-center">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="text-7xl mb-6"
                    >
                      {season.emoji}
                    </motion.div>
                    
                    <h3 className="text-4xl font-display font-bold mb-3">{season.name}</h3>
                    <p className="text-white/90 text-lg mb-6">{season.description}</p>
                    
                    <motion.div
                      className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                    >
                      Découvrir →
                    </motion.div>
                  </div>

                  {/* Particules animées selon la saison */}
                  {season.slug === 'hiver' && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        y: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a227] via-[#8B0000] to-[#c9a227]">
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          
          <div className="relative p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Découvrez toute notre collection de lunettes de luxe
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/glasses"
                className="inline-block px-8 py-4 bg-white text-[#c9a227] font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-xl"
              >
                Voir tous les produits
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesPage;
