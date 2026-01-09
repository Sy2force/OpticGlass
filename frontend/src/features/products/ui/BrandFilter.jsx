import { motion } from 'framer-motion';
import brands from '@/shared/data/brands';

const BrandFilter = ({ selectedBrand, onBrandSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Filtrer par marque</h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Bouton "Toutes les marques" */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onBrandSelect(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedBrand === null
              ? 'bg-black text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-black'
          }`}
        >
          Toutes les marques
        </motion.button>

        {/* Boutons des marques */}
        {brands.slice(0, 20).map((brand) => (
          <motion.button
            key={brand.slug}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBrandSelect(brand.name)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedBrand === brand.name
                ? 'bg-gradient-to-r from-luxury-gold to-gold text-white shadow-gold'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-luxury-gold'
            }`}
          >
            {brand.name}
          </motion.button>
        ))}
      </div>

      {selectedBrand && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-apple-blue/10 border border-apple-blue rounded-lg"
        >
          <p className="text-sm">
            🔍 Filtré par : <strong>{selectedBrand}</strong>
            <button
              onClick={() => onBrandSelect(null)}
              className="ml-3 text-ferrari underline hover:no-underline"
            >
              Réinitialiser
            </button>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BrandFilter;
