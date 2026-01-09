import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Gift
} from 'lucide-react';

const CartPage = () => {
  
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const navigate = useNavigate();

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
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    return subtotal - promoDiscount;
  };

  const applySaleCode = () => {
    if (promoCode.toLowerCase() === 'optic10') {
      setPromoDiscount(Math.round(getSubtotal() * 0.1));
      setPromoApplied(true);
    } else if (promoCode.toLowerCase() === 'welcome20') {
      setPromoDiscount(Math.round(getSubtotal() * 0.2));
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <ShoppingBag size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">'cart'</h1>
              <p className="text-gray-400 mt-1">
                {getTotalItems()} 'articles'
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">'cartEmpty'</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              'discoverCollectionText'
            </p>
            <Link
              to="/glasses"
              className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition shadow-lg"
            >
              'discoverCollection'
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">'articles' ({getTotalItems()})</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700 transition"
                >
                  Vider le panier
                </button>
              </div>

              {cart.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  <Link to={`/glasses/${item.productId}`} className="flex-shrink-0">
                    <div className="w-full sm:w-28 h-40 sm:h-28 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">👓</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">{item.brand}</p>
                        <Link to={`/glasses/${item.productId}`}>
                          <h3 className="font-bold text-lg hover:text-amber-600 transition">{item.name}</h3>
                        </Link>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.color && (
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                              'color': {item.color}
                            </span>
                          )}
                          {item.size && (
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                              'size': {item.size}
                            </span>
                          )}
                          {item.lens && (
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                              Lens : {item.lens}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition h-fit"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-xl font-bold">{item.price * item.quantity} ₪</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Avantages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <Truck size={24} className="mx-auto mb-2 text-amber-500" />
                  <p className="text-sm font-medium">'freeLivraison'</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <Shield size={24} className="mx-auto mb-2 text-amber-500" />
                  <p className="text-sm font-medium">'warranty'</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <CreditCard size={24} className="mx-auto mb-2 text-amber-500" />
                  <p className="text-sm font-medium">'securePayment'</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold mb-6">'orderSummary'</h2>

                {/* Promo code */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    'promoCode'
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder='promoCode'
                        disabled={promoApplied}
                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <button
                      onClick={applySaleCode}
                      disabled={promoApplied || !promoCode}
                      className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      'apply'
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                      <Gift size={14} />
                      Discount : -{promoDiscount} ₪
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{getSubtotal()} ₪</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{promoDiscount} ₪</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold">{getTotalPrice()} ₪</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition shadow-lg flex items-center justify-center gap-2"
                >
                  Checkout
                  <ChevronRight size={20} />
                </button>

                <Link
                  to="/glasses"
                  className="block text-center mt-4 text-gray-600 hover:text-black transition"
                >
                  Continue Shopping
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center gap-4 text-gray-400">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-50" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50" />
                  </div>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    Secure Payment
                  </p>
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
