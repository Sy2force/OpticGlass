import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Package, CreditCard, RefreshCw, Shield, Truck, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: HelpCircle },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'returns', label: 'Returns', icon: RefreshCw },
    { id: 'warranty', label: 'Warranty', icon: Shield },
    { id: 'products', label: 'Products', icon: Package }
  ];

  const faqs = [
    {
      category: 'shipping',
      question: 'What are the delivery times?',
      answer: 'We deliver in 2-4 business days in France. For international orders, allow 5-10 business days. Shipping is free for all orders over €100.'
    },
    {
      category: 'shipping',
      question: 'Can I track my order?',
      answer: 'Yes! Once your order has shipped, you will receive an email with a tracking number. You can track your package in real-time from your account or directly on the carrier\'s website.'
    },
    {
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries. Shipping costs and times vary depending on the destination. Check our Shipping page for more details.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and installment payments via our partner.'
    },
    {
      category: 'payment',
      question: 'Is payment secure?',
      answer: 'Absolutely! All transactions are encrypted with 256-bit SSL protocol. We do not store any banking data. Your payments are processed by PCI-DSS certified providers.'
    },
    {
      category: 'payment',
      question: 'Can I pay in installments?',
      answer: 'Yes, for any purchase over €100, you can pay in 3 or 4 installments free of charge. This option is automatically proposed to you at checkout.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'You have 30 days to return your glasses if they do not suit you. Returns are free and refunds are processed within 5-7 days after receipt.'
    },
    {
      category: 'returns',
      question: 'How do I make a return?',
      answer: 'Log in to your account, select the order, and click "Return an item". Print the prepaid return label and drop off your package at a relay point.'
    },
    {
      category: 'returns',
      question: 'Can I exchange my glasses?',
      answer: 'Yes! If you want another model, make a return and place a new order. You can also contact our customer service for a direct exchange.'
    },
    {
      category: 'warranty',
      question: 'What warranty do you offer?',
      answer: 'All our glasses benefit from a 2-year manufacturer\'s warranty covering manufacturing defects. We also offer a 6-month breakage warranty with proof of purchase.'
    },
    {
      category: 'warranty',
      question: 'Are the glasses authentic?',
      answer: '100% authentic! We are authorized retailers for all our brands. Each pair comes with its certificate of authenticity, original case, and manufacturer\'s warranty.'
    },
    {
      category: 'warranty',
      question: 'What if my glasses break?',
      answer: 'Contact our customer service with your order number and photos. If the breakage is covered by the warranty, we will proceed with a free exchange or repair.'
    },
    {
      category: 'products',
      question: 'How do I choose the right size?',
      answer: 'Each product page indicates dimensions (lens width, bridge, temples). Compare with your current glasses or use our size guide available on each product page.'
    },
    {
      category: 'products',
      question: 'Are the lenses polarized?',
      answer: 'It depends on the model. Glasses with polarized lenses are clearly indicated in the description. This technology reduces glare and improves visual comfort.'
    },
    {
      category: 'products',
      question: 'Can I order corrective lenses?',
      answer: 'Yes! Select the "Corrective Lenses" option on the product page. You can then enter your prescription or send it to us by email after ordering.'
    },
    {
      category: 'products',
      question: 'How do I care for my glasses?',
      answer: 'Clean your glasses with a microfiber cloth and suitable cleaning spray. Avoid abrasive products. Always store them in their case to protect them.'
    },
    {
      category: 'products',
      question: 'Do you offer protective cases?',
      answer: 'Each pair is delivered with its original brand case. We also offer premium cases and accessories in our shop.'
    }
  ];

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <HelpCircle size={40} className="text-primary" />
          </div>
          <h1 className="text-5xl font-display font-bold text-white mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Quickly find answers to your questions
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <Icon size={18} />
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="text-primary flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-primary/20 to-red-900/20 backdrop-blur-md rounded-2xl p-8 border border-primary/30 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Can't find your answer?
          </h3>
          <p className="text-gray-300 mb-6">
            Our team is available 7/7 to answer all your questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-[#d4af37] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-white/20"
            >
              Live Chat
            </motion.button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            📧 support@opticglass.com | 📞 +33 1 23 45 67 89 | ⏰ Mon-Sun 9am-8pm
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
