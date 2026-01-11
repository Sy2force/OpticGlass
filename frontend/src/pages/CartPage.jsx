import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/providers/ThemeContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  Shield, 
  CreditCard,
  Tag,
  ChevronRight,
  Gift,
  Heart,
  RotateCcw,
  Package,
  Clock,
  CheckCircle,
  Glasses,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const CartPage = () => {
  const { isDarkMode } = useTheme();
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);
  const navigate = useNavigate();

  const promoCodes = {
    'optic10': { discount: 0.1, label: '10% off' },
    'welcome20': { discount: 0.2, label: '20% off' },
    'vip30': { discount: 0.3, label: '30% VIP discount' },
    'freeship': { discount: 0, freeShipping: true, label: 'Free Express Shipping' }
  };

  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (index) => {
    setRemovingItem(index);
    setTimeout(() => {
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
      setRemovingItem(null);
    }, 300);
  };

  const moveToWishlist = (index) => {
    const item = cart[index];
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.find(w => w.productId === item.productId)) {
      wishlist.push(item);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    removeItem(index);
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
      localStorage.setItem('cart', JSON.stringify([]));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const getSubtotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getShipping = () => getSubtotal() >= 500 ? 0 : 25;
  const getTax = () => Math.round(getSubtotal() * 0.17);
  const getTotalPrice = () => getSubtotal() - promoDiscount + getShipping();

  const applySaleCode = () => {
    setPromoError('');
    const code = promoCode.toLowerCase().trim();
    
    if (promoCodes[code]) {
      const promo = promoCodes[code];
      if (promo.discount > 0) {
        setPromoDiscount(Math.round(getSubtotal() * promo.discount));
      }
      setPromoApplied(true);
      setShowPromoSuccess(true);
      setTimeout(() => setShowPromoSuccess(false), 3000);
    } else {
      setPromoError('Invalid promo code. Try OPTIC10, WELCOME20 or VIP30');
    }
  };

  const removePromo = () => {
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoCode('');
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  const getSavings = () => {
    return cart.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + (originalPrice - item.price) * item.quantity;
    }, 0) + promoDiscount;
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#c9a227] selection:text-black ${
      isDarkMode 
        ? 'bg-[#0a0a0a] text-white' 
        : 'bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 text-gray-900'
    }`}>
      {/* Hero Header - Style cohérent avec les autres pages */}
      <div className="relative h-[40vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-b from-black/40 via-black/60 to-[#0a0a0a]' 
              : 'bg-gradient-to-b from-stone-800/60 via-stone-700/50 to-stone-100'
          }`} />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a227]" />
              <span className="text-[#c9a227] uppercase tracking-[0.3em] text-xs font-medium">Your Selection</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              Shopping <span className="font-serif italic text-[#c9a227]">Cart</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {cart.length === 0 
                ? 'Your cart is waiting to be filled with premium eyewear'
                : `${getTotalItems()} ${getTotalItems() === 1 ? 'item' : 'items'} ready for checkout`
              }
            </p>
            {cart.length > 0 && (
              <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-white/60">Total:</span>
                <span className="text-2xl font-bold text-[#c9a227]">{getTotalPrice().toLocaleString()} ₪</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-white/5 to-white/10 border-white/10' 
                : 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300'
            }`}>
              <ShoppingBag size={56} className={isDarkMode ? 'text-white/30' : 'text-amber-400'} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
              Your Cart is <span className="font-serif italic text-[#c9a227]">Empty</span>
            </h2>
            
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto my-6" />
            
            <p className={`mb-12 max-w-lg mx-auto text-lg font-light leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>
              Discover our exclusive collection of premium eyewear crafted for those who appreciate refined elegance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/glasses"
                className="px-8 py-4 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium tracking-wider uppercase text-sm hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] transition-all duration-300"
              >
                Explore Collection
              </Link>
              <Link
                to="/sunglasses"
                className={`px-8 py-4 border font-medium tracking-wider uppercase text-sm transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-white/20 text-white hover:bg-white/5 hover:border-white/40' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                View Sunglasses
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className={`flex items-center justify-between pb-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <div>
                  <h2 className="text-2xl font-light tracking-tight">
                    Your <span className="font-serif italic text-[#c9a227]">Items</span>
                  </h2>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{getTotalItems()} {getTotalItems() === 1 ? 'product' : 'products'} selected</p>
                </div>
                <button
                  onClick={clearCart}
                  className={`text-sm hover:text-red-400 transition flex items-center gap-2 px-4 py-2 border rounded-lg hover:border-red-400/50 ${
                    isDarkMode ? 'text-white/40 border-white/10' : 'text-gray-500 border-gray-200'
                  }`}
                >
                  <Trash2 size={14} />
                  Clear All
                </button>
              </div>

              {/* Items List */}
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={`${item.productId}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: removingItem === index ? 0 : 1, 
                      y: 0,
                      x: removingItem === index ? -100 : 0,
                      scale: removingItem === index ? 0.9 : 1
                    }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`rounded-2xl border overflow-hidden transition-all group ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10 hover:border-[#c9a227]/30' 
                        : 'bg-white border-gray-200 hover:border-[#c9a227]/50 shadow-lg'
                    }`}
                  >
                    <div className="p-6 flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      <Link to={`/glasses/${item.productId}`} className="flex-shrink-0">
                        <div className="w-full md:w-36 h-36 bg-white rounded-xl overflow-hidden relative group-hover:shadow-lg transition-shadow">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <Glasses size={48} className="text-gray-400" />
                            </div>
                          )}
                          {item.discount > 0 && (
                            <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                              -{item.discount}%
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[#c9a227] text-sm font-semibold uppercase tracking-wider">{item.brand}</p>
                              <Link to={`/glasses/${item.productId}`}>
                                <h3 className={`text-xl font-bold hover:text-[#c9a227] transition mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                              </Link>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => moveToWishlist(index)}
                                className={`p-2 hover:text-pink-400 hover:bg-pink-500/10 rounded-lg transition ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}
                                title="Move to Wishlist"
                              >
                                <Heart size={18} />
                              </button>
                              <button
                                onClick={() => removeItem(index)}
                                className={`p-2 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}
                                title="Remove"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          
                          {/* Attributes */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.color && (
                              <span className={`text-xs px-3 py-1.5 rounded-full border ${
                                isDarkMode ? 'bg-white/5 text-white/70 border-white/10' : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}>
                                Color: {item.color}
                              </span>
                            )}
                            {item.size && (
                              <span className={`text-xs px-3 py-1.5 rounded-full border ${
                                isDarkMode ? 'bg-white/5 text-white/70 border-white/10' : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}>
                                Size: {item.size}
                              </span>
                            )}
                            {item.category && (
                              <span className="text-xs px-3 py-1.5 bg-[#c9a227]/10 text-[#c9a227] rounded-full border border-[#c9a227]/20">
                                {item.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price & Quantity */}
                        <div className={`flex items-center justify-between mt-4 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                          <div className={`flex items-center gap-1 rounded-xl p-1 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className={`w-10 h-10 flex items-center justify-center rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed ${
                                isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-50 shadow-sm'
                              }`}
                            >
                              <Minus size={16} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                            </button>
                            <span className={`w-12 text-center font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className={`w-10 h-10 flex items-center justify-center rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed ${
                                isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-50 shadow-sm'
                              }`}
                            >
                              <Plus size={16} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            {item.originalPrice && item.originalPrice > item.price && (
                              <p className={`text-sm line-through ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{item.originalPrice * item.quantity} ₪</p>
                            )}
                            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{(item.price * item.quantity).toLocaleString()} ₪</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: Truck, title: 'Free Shipping', desc: 'Orders over 500₪' },
                  { icon: RotateCcw, title: '30-Day Returns', desc: 'Easy returns' },
                  { icon: Shield, title: '2-Year Warranty', desc: 'Full coverage' },
                  { icon: Package, title: 'Secure Packaging', desc: 'Premium box' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`rounded-xl p-4 text-center border transition ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/5 hover:border-[#c9a227]/20' 
                        : 'bg-white border-gray-200 hover:border-[#c9a227]/50 shadow-sm'
                    }`}
                  >
                    <feature.icon size={24} className="mx-auto mb-2 text-[#c9a227]" />
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</p>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-2xl border p-6 sticky top-24 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10' 
                    : 'bg-white border-gray-200 shadow-xl'
                }`}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-light tracking-tight">
                    Order <span className="font-serif italic text-[#c9a227]">Summary</span>
                  </h2>
                  <div className="w-16 h-px bg-gradient-to-r from-[#c9a227] to-transparent mt-4" />
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className={`text-sm font-medium mb-2 block ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    Promo Code
                  </label>
                  {promoApplied ? (
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-400" />
                        <span className="text-green-400 font-medium">{promoCode.toUpperCase()}</span>
                      </div>
                      <button onClick={removePromo} className="text-white/40 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value);
                            setPromoError('');
                          }}
                          placeholder="Enter code"
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-[#c9a227] transition ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/40' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                      <button
                        onClick={applySaleCode}
                        disabled={!promoCode}
                        className="px-4 py-3 bg-[#c9a227] text-black font-bold rounded-xl hover:bg-[#b8912a] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-red-400 text-sm mt-2">{promoError}</p>
                  )}
                  {showPromoSuccess && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <Gift size={14} />
                      Promo code applied successfully!
                    </motion.p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className={`flex justify-between ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{getSubtotal().toLocaleString()} ₪</span>
                  </div>
                  
                  {promoApplied && promoDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount</span>
                      <span>-{promoDiscount.toLocaleString()} ₪</span>
                    </div>
                  )}
                  
                  <div className={`flex justify-between ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    <span>Shipping</span>
                    {getShipping() === 0 ? (
                      <span className="text-green-500 font-medium">Free</span>
                    ) : (
                      <span>{getShipping()} ₪</span>
                    )}
                  </div>
                  
                  {getShipping() > 0 && (
                    <p className={`text-xs p-2 rounded-lg ${isDarkMode ? 'text-white/40 bg-white/5' : 'text-gray-500 bg-gray-100'}`}>
                      Add {(500 - getSubtotal()).toLocaleString()} ₪ more for free shipping
                    </p>
                  )}
                  
                  <div className={`border-t pt-4 flex justify-between ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#c9a227]">{getTotalPrice().toLocaleString()} ₪</span>
                      <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>VAT included</p>
                    </div>
                  </div>
                </div>

                {/* Savings */}
                {getSavings() > 0 && (
                  <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                      <Sparkles size={16} />
                      You're saving {getSavings().toLocaleString()} ₪ on this order!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-[#c9a227] to-amber-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#c9a227]/30 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  Proceed to Checkout
                  <ChevronRight size={22} />
                </button>

                <Link
                  to="/glasses"
                  className={`block text-center mt-4 transition ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xs">VISA</span>
                    </div>
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-red-500 font-bold text-xs">MC</span>
                    </div>
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-blue-500 font-bold text-xs">AMEX</span>
                    </div>
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-green-600 font-bold text-xs">BIT</span>
                    </div>
                  </div>
                  <div className={`flex items-center justify-center gap-2 text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                    <Shield size={14} />
                    <span>Secure SSL Encrypted Payment</span>
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className={`mt-4 p-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-[#c9a227]" />
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Estimated Delivery</p>
                      <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>3-5 business days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
