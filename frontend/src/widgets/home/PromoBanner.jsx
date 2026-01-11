import { motion } from 'framer-motion';
import { Tag, Truck, Gift, Sparkles } from 'lucide-react';

const PromoBanner = () => {
  const promos = [
    { icon: <Tag size={16} />, text: '-20% on your first order with code WELCOME20' },
    { icon: <Truck size={16} />, text: 'Free shipping on orders over €100' },
    { icon: <Gift size={16} />, text: 'Free premium case with every order' },
    { icon: <Sparkles size={16} />, text: 'New Spring 2026 collection available' },
  ];

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white py-2 overflow-hidden relative mt-20">
      {/* Animation de défilement */}
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Dupliquer les promos pour un défilement continu */}
        {[...promos, ...promos, ...promos, ...promos].map((promo, index) => (
          <div key={index} className="flex items-center gap-2 text-sm font-medium">
            {promo.icon}
            <span>{promo.text}</span>
          </div>
        ))}
      </motion.div>

      {/* Gradient de fade sur les bords */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-red-600 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-red-600 to-transparent pointer-events-none" />
    </div>
  );
};

export default PromoBanner;
