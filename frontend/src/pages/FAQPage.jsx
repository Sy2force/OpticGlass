import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Package, CreditCard, RefreshCw, Shield, Truck, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tout', icon: HelpCircle },
    { id: 'shipping', label: 'Livraison', icon: Truck },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
    { id: 'returns', label: 'Retours', icon: RefreshCw },
    { id: 'warranty', label: 'Garantie', icon: Shield },
    { id: 'products', label: 'Produits', icon: Package }
  ];

  const faqs = [
    {
      category: 'shipping',
      question: 'Quels sont les délais de livraison ?',
      answer: 'Nous livrons en 2-4 jours ouvrés en France. Pour l\'international, comptez 5-10 jours ouvrés. La livraison est gratuite pour toute commande supérieure à 100€.'
    },
    {
      category: 'shipping',
      question: 'Puis-je suivre ma commande ?',
      answer: 'Oui ! Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pouvez suivre votre colis en temps réel depuis votre compte ou directement sur le site du transporteur.'
    },
    {
      category: 'shipping',
      question: 'Livrez-vous à l\'international ?',
      answer: 'Oui, nous livrons dans plus de 50 pays. Les frais de livraison et les délais varient selon la destination. Consultez notre page Livraison pour plus de détails.'
    },
    {
      category: 'payment',
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer: 'Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, et le paiement en plusieurs fois via notre partenaire.'
    },
    {
      category: 'payment',
      question: 'Le paiement est-il sécurisé ?',
      answer: 'Absolument ! Toutes les transactions sont cryptées avec le protocole SSL 256 bits. Nous ne stockons aucune donnée bancaire. Vos paiements sont traités par des prestataires certifiés PCI-DSS.'
    },
    {
      category: 'payment',
      question: 'Puis-je payer en plusieurs fois ?',
      answer: 'Oui, pour tout achat supérieur à 100€, vous pouvez payer en 3 ou 4 fois sans frais. Cette option vous est proposée automatiquement au moment du paiement.'
    },
    {
      category: 'returns',
      question: 'Quelle est votre politique de retour ?',
      answer: 'Vous disposez de 30 jours pour retourner vos lunettes si elles ne vous conviennent pas. Les retours sont gratuits et le remboursement est effectué sous 5-7 jours après réception.'
    },
    {
      category: 'returns',
      question: 'Comment effectuer un retour ?',
      answer: 'Connectez-vous à votre compte, sélectionnez la commande et cliquez sur "Retourner un article". Imprimez l\'étiquette de retour prépayée et déposez votre colis en point relais.'
    },
    {
      category: 'returns',
      question: 'Puis-je échanger mes lunettes ?',
      answer: 'Oui ! Si vous souhaitez un autre modèle, effectuez un retour et passez une nouvelle commande. Vous pouvez aussi contacter notre service client pour un échange direct.'
    },
    {
      category: 'warranty',
      question: 'Quelle garantie offrez-vous ?',
      answer: 'Toutes nos lunettes bénéficient d\'une garantie fabricant de 2 ans couvrant les défauts de fabrication. Nous offrons également une garantie casse de 6 mois avec preuve d\'achat.'
    },
    {
      category: 'warranty',
      question: 'Les lunettes sont-elles authentiques ?',
      answer: '100% authentiques ! Nous sommes revendeurs agréés pour toutes nos marques. Chaque paire est livrée avec son certificat d\'authenticité, son étui d\'origine et la garantie fabricant.'
    },
    {
      category: 'warranty',
      question: 'Que faire si mes lunettes cassent ?',
      answer: 'Contactez notre service client avec votre numéro de commande et des photos. Si la casse est couverte par la garantie, nous procéderons à un échange ou une réparation gratuite.'
    },
    {
      category: 'products',
      question: 'Comment choisir la bonne taille ?',
      answer: 'Chaque page produit indique les dimensions (largeur des verres, pont, branches). Comparez avec vos lunettes actuelles ou utilisez notre guide des tailles disponible sur chaque page produit.'
    },
    {
      category: 'products',
      question: 'Les verres sont-ils polarisés ?',
      answer: 'Cela dépend du modèle. Les lunettes avec verres polarisés sont clairement indiquées dans la description. Cette technologie réduit l\'éblouissement et améliore le confort visuel.'
    },
    {
      category: 'products',
      question: 'Puis-je commander des verres correcteurs ?',
      answer: 'Oui ! Sélectionnez l\'option "Verres correcteurs" sur la page produit. Vous pourrez ensuite saisir votre ordonnance ou nous l\'envoyer par email après la commande.'
    },
    {
      category: 'products',
      question: 'Comment entretenir mes lunettes ?',
      answer: 'Nettoyez vos lunettes avec une chiffonnette microfibre et un spray nettoyant adapté. Évitez les produits abrasifs. Rangez-les toujours dans leur étui pour les protéger.'
    },
    {
      category: 'products',
      question: 'Proposez-vous des étuis de protection ?',
      answer: 'Chaque paire est livrée avec son étui de marque d\'origine. Nous proposons également des étuis et accessoires premium dans notre boutique.'
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
            Questions <span className="text-primary">Fréquentes</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Trouvez rapidement des réponses à vos questions
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
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-gray-300 mb-6">
            Notre équipe est disponible 7j/7 pour répondre à toutes vos questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-[#d4af37] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contacter le Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-white/20"
            >
              Chat en Direct
            </motion.button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            📧 support@opticglass.com | 📞 +33 1 23 45 67 89 | ⏰ Lun-Dim 9h-20h
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
