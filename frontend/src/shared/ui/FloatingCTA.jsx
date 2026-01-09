import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, MessageCircle, Calendar } from 'lucide-react';

const FloatingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const options = [
    { icon: Phone, label: 'Appeler', href: 'tel:+33123456789', color: 'bg-green-500' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/33123456789', color: 'bg-emerald-500' },
    { icon: Calendar, label: 'RDV', href: '/contact', color: 'bg-blue-500' },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 left-0 space-y-3"
          >
            {options.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.a
                  key={option.label}
                  href={option.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 px-4 py-3 ${option.color} text-white rounded-full shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{option.label}</span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-800 rotate-45' : 'bg-[#c9a227] hover:bg-[#d4af37]'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Phone size={24} className="text-black" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingCTA;
