import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, Home, ShoppingBag, Sparkles } from 'lucide-react';

const SuccessPage = () => {
  
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ 
                y: window.innerHeight + 100, 
                rotate: Math.random() * 360,
                opacity: 0
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{ 
                backgroundColor: ['#c9a227', '#FFD700', '#FFFFFF'][Math.floor(Math.random() * 3)]
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-white/10 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2
          }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 0.6,
                times: [0, 0.5, 1],
                delay: 0.3
              }}
              className="absolute inset-0 bg-primary/30 rounded-full blur-2xl"
            />
            <CheckCircle size={100} className="text-primary relative z-10" strokeWidth={2.5} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={30} className="text-gold" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
        >
          Paiement validé !
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-300 text-lg mb-8 max-w-md mx-auto"
        >
          Merci pour votre commande ! Vous recevrez un email de confirmation avec les détails de votre achat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <Package size={32} className="text-primary mx-auto mb-2" />
            <p className="text-white font-medium">Préparation</p>
            <p className="text-gray-400 text-sm">24-48h</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <Mail size={32} className="text-primary mx-auto mb-2" />
            <p className="text-white font-medium">Confirmation</p>
            <p className="text-gray-400 text-sm">Email Envoyé</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Link to="/orders">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-primary hover:bg-[#d4af37] text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/50 flex items-center justify-center gap-2"
            >
              <Package size={20} />
              Voir mes commandes
            </motion.button>
          </Link>

          <Link to="/glasses">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors border border-white/20 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Continuer mes achats
            </motion.button>
          </Link>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Retour à l'accueil
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm">
            Numéro de commande : <span className="text-white font-mono">OG-{Date.now().toString().slice(-8)}</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
