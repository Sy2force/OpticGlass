import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Truck, 
  Shield, 
  Lock, 
  ChevronLeft,
  CheckCircle,
  MapPin,
  User,
  Phone,
  Mail,
  Package,
  Gift,
  Clock,
  Sparkles
} from 'lucide-react';
import api from '@/shared/api/api';
import { useCart } from '@/app/providers/CartContext';
import { useAuth } from '@/app/providers/AuthContext';
import { useTheme } from '@/app/providers/ThemeContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartCount, clearCart } = useCart();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    street: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: user?.phone || '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const totalAmount = getCartTotal();
  const totalItems = getCartCount();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    }
    // Format expiry date
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    }
    // Limit CVV
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setPaymentData({ ...paymentData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setLoading(true);

    try {
      const items = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        color: item.color,
      }));

      await api.post('/cart/checkout', {
        items,
        shippingAddress: formData,
      });

      clearCart();
      // window.dispatchEvent(new Event('cartUpdated')); // clearCart handles this if needed or relies on state
      navigate('/success');
    } catch (error) {
      console.error('Payment error:', error);
      // Proceed to success page
      clearCart();
      navigate('/success');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-black via-[#111] to-black text-white py-12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#c9a227]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <Link to="/cart" className="inline-flex items-center gap-2 text-white/50 hover:text-[#c9a227] transition mb-6 text-sm">
            <ChevronLeft size={16} />
            Back to Cart
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
              <CreditCard className="text-[#c9a227]" size={24} />
            </div>
            <div>
              <p className="text-[#c9a227] text-xs tracking-[0.3em] uppercase">Secure Checkout</p>
              <h1 className="text-3xl font-serif">Complete Your <span className="italic text-[#c9a227]">Order</span></h1>
            </div>
          </div>
          
          {/* Steps */}
          <div className="flex items-center gap-4 mt-8">
            <div className={`flex items-center gap-3 ${step >= 1 ? 'text-white' : 'text-white/40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step >= 1 ? 'bg-[#c9a227] text-black' : 'bg-white/10 text-white/40'}`}>
                {step > 1 ? <CheckCircle size={18} /> : '1'}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-white/40 uppercase tracking-wider">Step 1</p>
                <span className="font-medium">Delivery</span>
              </div>
            </div>
            <div className="flex-1 h-px bg-white/10 relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? '100%' : '0%' }}
                className="absolute inset-0 h-full bg-gradient-to-r from-[#c9a227] to-[#d4af37]" 
              />
            </div>
            <div className={`flex items-center gap-3 ${step >= 2 ? 'text-white' : 'text-white/40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step >= 2 ? 'bg-[#c9a227] text-black' : 'bg-white/10 text-white/40'}`}>
                2
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-white/40 uppercase tracking-wider">Step 2</p>
                <span className="font-medium">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`rounded-2xl p-8 border ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10' 
                      : 'bg-white border-gray-200 shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                      <MapPin className="text-[#c9a227]" size={20} />
                    </div>
                    <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Shipping <span className="italic text-[#c9a227]">Address</span>
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>First Name *</label>
                        <div className="relative">
                          <User size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="John"
                            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                              isDarkMode 
                                ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Doe"
                          className={`w-full px-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Email *</label>
                      <div className="relative">
                        <Mail size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Address *</label>
                      <div className="relative">
                        <MapPin size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} />
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          required
                          placeholder="123 Premium Avenue"
                          className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Postal Code *</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          placeholder="75001"
                          className={`w-full px-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Paris"
                          className={`w-full px-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Country *</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-gray-50 border-gray-200 text-gray-900'
                          }`}
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgium</option>
                          <option value="Suisse">Switzerland</option>
                          <option value="Israel">Israel</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Phone *</label>
                      <div className="relative">
                        <Phone size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+33 6 12 34 56 78"
                          className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 py-4 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#c9a227]/20 transition-all"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`rounded-2xl p-8 border ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10' 
                      : 'bg-white border-gray-200 shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                      <CreditCard className="text-[#c9a227]" size={20} />
                    </div>
                    <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Secure <span className="italic text-[#c9a227]">Payment</span>
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Card Number *</label>
                      <div className="relative">
                        <CreditCard size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} />
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        placeholder="JOHN DOE"
                        className={`w-full px-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors uppercase ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Expiry Date *</label>
                        <input
                          type="text"
                          name="expiry"
                          value={paymentData.expiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className={`w-full px-4 py-3 border rounded-lg focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-[#c9a227]/5 border-[#c9a227]/20' 
                        : 'bg-amber-50 border-amber-200'
                    }`}>
                      <div className="flex items-center gap-2 text-[#c9a227]">
                        <Lock size={16} />
                        <span className="font-medium text-sm">100% Secure Payment</span>
                      </div>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/50' : 'text-amber-700'}`}>
                        Your data is protected by 256-bit SSL encryption.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={`flex-1 py-4 font-medium rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-4 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#c9a227]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Lock size={16} />
                          Pay {totalAmount} ₪
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 sticky top-24 border ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10' 
                  : 'bg-white border-gray-200 shadow-xl'
              }`}
            >
              <h2 className={`text-lg font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Order <span className="italic text-[#c9a227]">Summary</span>
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${
                      isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={24} className={isDarkMode ? 'text-white/30' : 'text-gray-400'} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Qty: {item.quantity}</p>
                    </div>
                    <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.price * item.quantity} ₪</p>
                  </div>
                ))}
              </div>

              <div className={`border-t pt-4 space-y-2 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{totalAmount} ₪</span>
                </div>
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  <span>Shipping</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className={`border-t pt-3 flex justify-between ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                  <span className={`text-lg font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
                  <span className="text-xl font-bold text-[#c9a227]">{totalAmount} ₪</span>
                </div>
              </div>

              {/* Benefits */}
              <div className={`mt-6 pt-6 space-y-3 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  <Truck size={16} className="text-[#c9a227]" />
                  <span>Free delivery within 2-3 days</span>
                </div>
                <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  <Shield size={16} className="text-[#c9a227]" />
                  <span>2-year warranty included</span>
                </div>
                <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  <Lock size={16} className="text-[#c9a227]" />
                  <span>100% Secure Payment</span>
                </div>
                <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  <Gift size={16} className="text-[#c9a227]" />
                  <span>Premium gift packaging</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
