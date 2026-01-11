import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import brands from '@/shared/data/brands';

const BrandFilter = ({ selectedBrand, onBrandSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Filter by Brand</h3>
      
      <div className="flex flex-wrap gap-3">
        {/* All Brands Button */}
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

        {/* Brand Buttons */}
        {brands.slice(0, 20).map((brand) => (
          <motion.button
            key={brand.slug}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBrandSelect(brand.name)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedBrand === brand.name
                ? 'bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-[#c9a227]'
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
          <p className="text-sm flex items-center gap-2">
            <Search size={14} /> Filtered by: <strong>{selectedBrand}</strong>
            <button
              onClick={() => onBrandSelect(null)}
              className="ml-3 text-ferrari underline hover:no-underline"
            >
              Reset
            </button>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BrandFilter;
