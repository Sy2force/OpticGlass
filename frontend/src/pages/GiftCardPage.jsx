import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Mail, User, MessageSquare, CreditCard, Check, Sparkles, Calendar, ShoppingBag } from 'lucide-react';
import { useCart } from '@/app/providers/CartContext';

const GiftCardPage = () => {
  const { addToCart } = useCart();
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    recipientName: '',
    recipientEmail: '',
    amount: 50,
    message: '',
    deliveryDate: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const amounts = [50, 100, 150, 200, 300, 500];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.senderName.trim()) newErrors.senderName = 'Your name is required';
    if (!formData.senderEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.senderEmail = 'Invalid email';
    }
    if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient name required';
    if (!formData.recipientEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.recipientEmail = 'Invalid recipient email';
    }
    if (!formData.amount || formData.amount < 10) {
      newErrors.amount = 'Minimum amount: ₪10';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Process gift card request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const giftCardProduct = {
        _id: `gc-${Date.now()}`,
        name: 'Optic Glass Gift Card',
        brand: 'Optic Glass',
        price: parseInt(formData.amount),
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
        type: 'gift_card',
        customization: { ...formData }
      };

      addToCart(giftCardProduct, 1);
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          senderName: '',
          senderEmail: '',
          recipientName: '',
          recipientEmail: '',
          amount: 50,
          message: '',
          deliveryDate: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#c9a227] to-amber-600 rounded-full mb-8 shadow-lg shadow-amber-900/30">
            <Gift size={40} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            The Art of Gifting
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Give the choice of excellence with the Optic Glass Gift Card.
            The perfect gift for lovers of design and quality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Card Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative aspect-[1.586/1] rounded-3xl overflow-hidden shadow-2xl group transform transition-transform hover:scale-[1.02] duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                
                {/* Gold accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227] opacity-10 blur-[80px] rounded-full transform translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c9a227] opacity-5 blur-[80px] rounded-full transform -translate-x-1/3 translate-y-1/3" />

                <div className="relative h-full p-8 md:p-10 flex flex-col justify-between z-10 border border-white/10 rounded-3xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-3xl font-display font-bold tracking-wide text-white">OPTIC GLASS</h3>
                            <p className="text-[#c9a227] text-sm tracking-[0.2em] uppercase mt-1">Gift Card</p>
                        </div>
                        <Sparkles className="text-[#c9a227]" size={32} />
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">For</p>
                                <p className="text-xl font-medium text-white">{formData.recipientName || 'Recipient'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Amount</p>
                                <p className="text-4xl font-bold text-[#c9a227]">{formData.amount} ₪</p>
                            </div>
                        </div>
                        
                        {formData.message && (
                            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/5">
                                <p className="text-white/80 text-sm italic font-light line-clamp-2">"{formData.message}"</p>
                            </div>
                        )}
                        
                        <div className="flex justify-between items-end pt-4 border-t border-white/10">
                            <div>
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">From</p>
                                <p className="text-white font-medium">{formData.senderName || 'You'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/30 text-xs font-mono">XXXX-XXXX-XXXX-XXXX</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                    <Check className="text-[#c9a227]" size={20} />
                    Exclusive Benefits
                </h3>
                <ul className="space-y-3">
                    {[
                        'Valid on the entire online store',
                        'Usable in one or more installments',
                        'No expiration date',
                        'Instant delivery by email',
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1a1a] rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Customization</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Selection */}
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                        <CreditCard size={16} className="text-[#c9a227]" />
                        Gift Amount
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {amounts.map((amount) => (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, amount }))}
                                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 border ${
                                    formData.amount === amount
                                        ? 'bg-[#c9a227] text-black border-[#c9a227] shadow-lg shadow-amber-900/20'
                                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                            >
                                {amount} ₪
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="10"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a227] transition-colors pl-10"
                            placeholder="Other amount"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">₪</span>
                    </div>
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">From</label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                name="senderName"
                                value={formData.senderName}
                                onChange={handleChange}
                                className={`w-full bg-white/5 border ${errors.senderName ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#c9a227] transition-colors`}
                                placeholder="Your name"
                            />
                        </div>
                        {errors.senderName && <p className="text-red-500 text-sm mt-1">{errors.senderName}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Your Email</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="email"
                                name="senderEmail"
                                value={formData.senderEmail}
                                onChange={handleChange}
                                className={`w-full bg-white/5 border ${errors.senderEmail ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#c9a227] transition-colors`}
                                placeholder="your@email.com"
                            />
                        </div>
                        {errors.senderEmail && <p className="text-red-500 text-sm mt-1">{errors.senderEmail}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">To</label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                name="recipientName"
                                value={formData.recipientName}
                                onChange={handleChange}
                                className={`w-full bg-white/5 border ${errors.recipientName ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#c9a227] transition-colors`}
                                placeholder="Recipient name"
                            />
                        </div>
                        {errors.recipientName && <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Recipient Email</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="email"
                                name="recipientEmail"
                                value={formData.recipientEmail}
                                onChange={handleChange}
                                className={`w-full bg-white/5 border ${errors.recipientEmail ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#c9a227] transition-colors`}
                                placeholder="recipient@email.com"
                            />
                        </div>
                        {errors.recipientEmail && <p className="text-red-500 text-sm mt-1">{errors.recipientEmail}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Personal Message</label>
                    <div className="relative">
                        <MessageSquare size={18} className="absolute left-4 top-4 text-white/30" />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#c9a227] transition-colors min-h-[120px] resize-none"
                            placeholder="Write a little note..."
                            maxLength={300}
                        />
                        <span className="absolute right-4 bottom-4 text-xs text-white/30">
                            {formData.message.length}/300
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Delivery Date (Optional)</label>
                    <div className="relative">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            type="date"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#c9a227] transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                        />
                    </div>
                    <p className="text-xs text-white/40 mt-1">Leave empty for immediate delivery</p>
                </div>

                <motion.button
                    type="submit"
                    disabled={loading || submitted}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        submitted
                            ? 'bg-green-600 text-white'
                            : 'bg-[#c9a227] hover:bg-[#d4af37] text-black shadow-lg shadow-amber-900/20'
                    }`}
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : submitted ? (
                        <>
                            <Check size={24} />
                            Card added to cart!
                        </>
                    ) : (
                        <>
                            <ShoppingBag className="w-5 h-5" />
                            Add to Cart - {formData.amount} ₪
                        </>
                    )}
                </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardPage;
