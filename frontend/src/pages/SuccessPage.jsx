import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, Home, ShoppingBag, Sparkles, Truck, Clock, MapPin, CreditCard, Gift, Shield } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeContext';
import { useAuth } from '@/app/providers/AuthContext';

const SuccessPage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderNumber] = useState(`OG-${Date.now().toString().slice(-8)}`);
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  });

  // Save purchase confirmation to Messages page
  useEffect(() => {
    const userEmail = user?.email || localStorage.getItem('userEmail') || 'guest';
    const existingMessages = JSON.parse(localStorage.getItem(`user_messages_${userEmail}`) || '[]');
    
    // Check if this order was already saved (prevent duplicates on page refresh)
    const orderExists = existingMessages.some(m => m.details?.['Order Number'] === orderNumber);
    
    if (!orderExists) {
      const newMessage = {
        id: Date.now(),
        type: 'purchase',
        subject: 'Order Confirmed',
        content: `Your order ${orderNumber} has been successfully placed!\n\nA confirmation email has been sent to ${user?.email || 'your email'}.\n\nEstimated delivery: ${estimatedDelivery}\n\nThank you for shopping with Optic Glass!`,
        details: {
          'Order Number': orderNumber,
          'Status': 'Processing',
          'Estimated Delivery': estimatedDelivery,
          'Payment': 'Confirmed'
        },
        timestamp: new Date().toISOString(),
        read: false,
        from: 'Optic Glass'
      };
      
      const updatedMessages = [newMessage, ...existingMessages];
      localStorage.setItem(`user_messages_${userEmail}`, JSON.stringify(updatedMessages));
      
      // Dispatch event to update Messages page if open
      window.dispatchEvent(new CustomEvent('newUserMessage', { detail: newMessage }));
    }
  }, [orderNumber, estimatedDelivery, user]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden ${
      isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl" />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), opacity: 1 }}
              animate={{ 
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100, 
                rotate: Math.random() * 720,
                opacity: 0
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                delay: Math.random() * 0.8,
                ease: "easeOut"
              }}
              className="absolute"
              style={{ 
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                backgroundColor: ['#c9a227', '#d4af37', '#FFD700', '#FFFFFF', '#f5d742'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '2px'
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-2xl w-full rounded-2xl p-8 md:p-12 text-center border relative ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10' 
            : 'bg-white border-gray-200 shadow-2xl'
        }`}
      >
        {/* Golden line decorations */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 bg-[#c9a227]/20 rounded-full blur-2xl"
            />
            <div className="w-24 h-24 bg-gradient-to-br from-[#c9a227] to-[#d4af37] rounded-full flex items-center justify-center relative z-10">
              <CheckCircle size={48} className="text-black" strokeWidth={2.5} />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-2 -right-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} className="text-[#c9a227]" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[#c9a227] text-xs tracking-[0.3em] uppercase mb-2">Order Confirmed</p>
          <h1 className={`text-3xl md:text-4xl font-serif mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Thank You for Your <span className="italic text-[#c9a227]">Purchase!</span>
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-4" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mb-8 max-w-md mx-auto ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}
        >
          Your order has been successfully placed. A confirmation email has been sent to <span className="text-[#c9a227] font-medium">{user?.email || 'your email'}</span>.
        </motion.p>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`rounded-xl p-6 mb-8 border ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package size={18} className="text-[#c9a227]" />
            <span className={`font-mono text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{orderNumber}</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                <Clock size={18} className="text-[#c9a227]" />
              </div>
              <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Status</p>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Processing</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                <Truck size={18} className="text-[#c9a227]" />
              </div>
              <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Delivery</p>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Free Express</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                <MapPin size={18} className="text-[#c9a227]" />
              </div>
              <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Estimated</p>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{estimatedDelivery}</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                <CreditCard size={18} className="text-[#c9a227]" />
              </div>
              <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Payment</p>
              <p className={`text-sm font-medium text-green-500`}>Confirmed</p>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <Gift size={24} className="text-[#c9a227] mx-auto mb-2" />
            <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Premium Packaging</p>
          </div>
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <Shield size={24} className="text-[#c9a227] mx-auto mb-2" />
            <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>2-Year Warranty</p>
          </div>
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <Mail size={24} className="text-[#c9a227] mx-auto mb-2" />
            <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Email Sent</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Link to="/orders" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium uppercase tracking-wider rounded-lg transition-all hover:shadow-lg hover:shadow-[#c9a227]/20 flex items-center justify-center gap-2"
            >
              <Package size={18} />
              Track My Order
            </motion.button>
          </Link>

          <Link to="/glasses" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 font-medium uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 border ${
                isDarkMode 
                  ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' 
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </motion.button>
          </Link>

          <Link to="/" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 transition-colors flex items-center justify-center gap-2 text-sm ${
                isDarkMode ? 'text-white/40 hover:text-[#c9a227]' : 'text-gray-400 hover:text-[#c9a227]'
              }`}
            >
              <Home size={16} />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
