import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, ArrowRight, Sun } from 'lucide-react';
import api from '@/shared/api/api';
import { products as localProducts } from '@/shared/data/products';
import { useTheme } from '@/app/providers/ThemeContext';

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    // Load bestsellers from local data
    const bestsellerProducts = localProducts.filter(p => p.isBestseller).slice(0, 6);
    setBestsellers(bestsellerProducts.length > 0 ? bestsellerProducts : localProducts.slice(0, 6));
  }, []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) nextErrors.firstName = { message: 'First name required' };
    if (!formData.lastName.trim()) nextErrors.lastName = { message: 'Last name required' };

    if (!formData.email.trim()) {
      nextErrors.email = { message: 'Email required' };
    } else {
      const emailOk = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email);
      if (!emailOk) nextErrors.email = { message: 'Invalid email' };
    }

    if (!formData.subject) nextErrors.subject = { message: 'Subject required' };

    if (!formData.message.trim()) {
      nextErrors.message = { message: 'Message required' };
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = { message: 'Minimum 10 characters' };
    }

    return nextErrors;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/contact', data);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending contact:', error);
      setErrors({ form: { message: "An error occurred while sending." } });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onSubmit(formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+33 1 23 45 67 89',
      description: 'Mon-Sat: 9am-7pm',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@opticglass.fr',
      description: 'Response within 24h',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Avenue des Champs-Élysées',
      description: '75008 Paris, France',
    },
    {
      icon: Clock,
      title: 'Hours',
      value: 'Mon-Sat: 9am-7pm',
      description: 'Sunday: Closed',
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Hero Section - Premium Design */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')`,
          }}
        />
        {/* Premium Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-5xl"
        >
          {/* Golden Line Top */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-6"
          />
          
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4"
          >
            Get In Touch
          </motion.p>
          
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Contact <span className="italic text-[#c9a227]">Us</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Have a question? Need advice? Our team of experts is here to help you
          </motion.p>
          
          {/* Golden Line Bottom */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto"
          />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-white'} rounded-lg shadow-2xl p-8`}>
              <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-2">Write To Us</p>
              <h2 className={`text-3xl font-serif mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Send us a <span className="italic text-[#c9a227]">message</span>
              </h2>
              <div className="w-12 h-px bg-gradient-to-r from-[#c9a227] to-transparent mb-8" />
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 bg-[#c9a227]/10 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-[#c9a227]" />
                  </motion.div>
                  <h3 className={`text-2xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Message Sent!</h3>
                  <p className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>We will reply to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.form && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg">
                      {errors.form.message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                        First Name *
                      </label>
                      <input
                        value={formData.firstName}
                        onChange={(e) => setField('firstName', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition ${
                          isDarkMode 
                            ? 'bg-white/5 border border-white/10 text-white placeholder-white/40' 
                            : 'bg-white border border-gray-300'
                        } ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="Your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                        Last Name *
                      </label>
                      <input
                        value={formData.lastName}
                        onChange={(e) => setField('lastName', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition ${
                          isDarkMode 
                            ? 'bg-white/5 border border-white/10 text-white placeholder-white/40' 
                            : 'bg-white border border-gray-300'
                        } ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition ${
                        isDarkMode 
                          ? 'bg-white/5 border border-white/10 text-white placeholder-white/40' 
                          : 'bg-white border border-gray-300'
                      } ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition ${
                        isDarkMode 
                          ? 'bg-white/5 border border-white/10 text-white placeholder-white/40' 
                          : 'bg-white border border-gray-300'
                      }`}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setField('subject', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition ${
                        isDarkMode 
                          ? 'bg-white/5 border border-white/10 text-white' 
                          : 'bg-white border border-gray-300'
                      } ${errors.subject ? 'border-red-500' : ''}`}
                    >
                      <option value="" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Select a subject</option>
                      <option value="info" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Information request</option>
                      <option value="order" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Question about an order</option>
                      <option value="return" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Return / Exchange</option>
                      <option value="appointment" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Appointment booking</option>
                      <option value="other" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setField('message', e.target.value)}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition resize-none ${
                        isDarkMode 
                          ? 'bg-white/5 border border-white/10 text-white placeholder-white/40' 
                          : 'bg-white border border-gray-300'
                      } ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition-all`}
                  >
                    <div className="w-12 h-12 bg-[#c9a227]/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#c9a227]" />
                    </div>
                    <h3 className={`font-serif mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{info.title}</h3>
                    <p className="text-[#c9a227] font-medium">{info.value}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{info.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/33123456789"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`block ${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-[#0a0a0a]'} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all group`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#c9a227]/10 rounded-full flex items-center justify-center group-hover:bg-[#c9a227]/20 transition-colors">
                  <MessageCircle className="w-7 h-7 text-[#c9a227]" />
                </div>
                <div>
                  <h3 className="text-xl font-serif">Contact us on WhatsApp</h3>
                  <p className="text-white/60 text-sm">Fast response guaranteed</p>
                </div>
              </div>
            </motion.a>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-white'} rounded-lg shadow-lg overflow-hidden h-64`}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2158371393!2d2.2950!3d48.8698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xcbb47407434935db!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%20Paris!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Optic Glass Location"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Best Sellers Section - Premium */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Popular Choices</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              Our <span className="italic text-[#c9a227]">Best Sellers</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestsellers.length > 0 ? bestsellers.map((product, index) => (
              <motion.div 
                key={product._id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={`/glasses/${product._id}`} className="group block">
                  <div className="relative aspect-square bg-[#111] border border-white/5 overflow-hidden mb-3 rounded-lg group-hover:border-[#c9a227]/30 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Sun size={40} className="text-white/20" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-2 left-2 px-2 py-1 bg-[#c9a227] text-black text-[10px] font-bold tracking-wider uppercase">
                      Best
                    </span>
                  </div>
                  <p className="text-[#c9a227] text-[10px] tracking-[0.2em] uppercase mb-1 font-medium">{product.brand}</p>
                  <p className="text-white font-light text-xs line-clamp-1 group-hover:text-[#c9a227] transition-colors">{product.name}</p>
                  <p className="text-white/60 text-sm mt-1 font-semibold">{product.price} ₪</p>
                </Link>
              </motion.div>
            )) : (
              [...Array(6)].map((_, i) => <div key={i} className="aspect-square bg-white/5 rounded-lg" />)
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/glasses?sort=bestseller" className="px-8 py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all inline-flex items-center">
              View Full Selection <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
