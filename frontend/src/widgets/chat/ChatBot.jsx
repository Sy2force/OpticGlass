import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Calendar, 
  Package, 
  HelpCircle, 
  Phone, 
  Clock, 
  MapPin,
  CheckCircle,
  ArrowLeft,
  User,
  Mail,
  Sparkles
} from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('menu');
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
  });
  const [orderNumber, setOrderNumber] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(getWelcomeMessage());
    }
  }, [isOpen]);

  const getWelcomeMessage = () => {
    const greetings = {
      fr: "Bonjour ! 👋 Je suis l'assistant virtuel d'Optic Glass. Comment puis-je vous aider aujourd'hui ?",
      en: "Hello! 👋 I'm the Optic Glass virtual assistant. How can I help you today?",
      he: "שלום! 👋 אני העוזר הווירטואלי של Optic Glass. איך אוכל לעזור לך היום?"
    };
    return greetings[language] || greetings.fr;
  };

  const menuOptions = {
    fr: [
      { id: 'appointment', icon: Calendar, label: 'Prendre un rendez-vous', color: 'bg-blue-500' },
      { id: 'order', icon: Package, label: 'Vérifier ma commande', color: 'bg-green-500' },
      { id: 'faq', icon: HelpCircle, label: 'Questions fréquentes', color: 'bg-purple-500' },
      { id: 'contact', icon: Phone, label: 'Contacter un conseiller', color: 'bg-amber-500' },
    ],
    en: [
      { id: 'appointment', icon: Calendar, label: 'Book an appointment', color: 'bg-blue-500' },
      { id: 'order', icon: Package, label: 'Check my order', color: 'bg-green-500' },
      { id: 'faq', icon: HelpCircle, label: 'FAQ', color: 'bg-purple-500' },
      { id: 'contact', icon: Phone, label: 'Contact an advisor', color: 'bg-amber-500' },
    ],
    he: [
      { id: 'appointment', icon: Calendar, label: 'קביעת תור', color: 'bg-blue-500' },
      { id: 'order', icon: Package, label: 'בדיקת הזמנה', color: 'bg-green-500' },
      { id: 'faq', icon: HelpCircle, label: 'שאלות נפוצות', color: 'bg-purple-500' },
      { id: 'contact', icon: Phone, label: 'יצירת קשר', color: 'bg-amber-500' },
    ],
  };

  const services = {
    fr: [
      { id: 'eye-exam', label: 'Examen de vue', duration: '30 min' },
      { id: 'fitting', label: 'Essayage de frames', duration: '45 min' },
      { id: 'adjustment', label: 'Ajustement de glasses', duration: '15 min' },
      { id: 'consultation', label: 'Consultation personnalisée', duration: '1h' },
    ],
    en: [
      { id: 'eye-exam', label: 'Eye exam', duration: '30 min' },
      { id: 'fitting', label: 'Frame fitting', duration: '45 min' },
      { id: 'adjustment', label: 'Glasses adjustment', duration: '15 min' },
      { id: 'consultation', label: 'Personal consultation', duration: '1h' },
    ],
    he: [
      { id: 'eye-exam', label: 'בדיקת ראייה', duration: '30 דק' },
      { id: 'fitting', label: 'מדידת מסגרות', duration: '45 דק' },
      { id: 'adjustment', label: 'התאמת משקפיים', duration: '15 דק' },
      { id: 'consultation', label: 'ייעוץ אישי', duration: 'שעה' },
    ],
  };

  const faqItems = {
    fr: [
      { q: 'Quels sont vos horaires ?', a: 'Nous sommes ouverts du lundi au samedi de 9h à 19h.' },
      { q: 'Livraison gratuite ?', a: 'Oui, la livraison est gratuite pour toute commande supérieure à 100€.' },
      { q: 'Garantie des produits ?', a: 'Tous nos produits sont garantis 2 ans.' },
      { q: 'Retours possibles ?', a: 'Vous avez 30 jours pour retourner un produit non satisfaisant.' },
      { q: 'Modes de paiement ?', a: 'Nous acceptons CB, PayPal, et paiement en 3x sans frais.' },
    ],
    en: [
      { q: 'What are your hours?', a: 'We are open Monday to Saturday from 9am to 7pm.' },
      { q: 'Free shipping?', a: 'Yes, shipping is free for orders over €100.' },
      { q: 'Product warranty?', a: 'All our products come with a 2-year warranty.' },
      { q: 'Returns possible?', a: 'You have 30 days to return an unsatisfactory product.' },
      { q: 'Payment methods?', a: 'We accept credit cards, PayPal, and 3x interest-free payments.' },
    ],
    he: [
      { q: 'מה שעות הפעילות?', a: 'אנחנו פתוחים משני עד שבת מ-9 עד 19.' },
      { q: 'משלוח חינם?', a: 'כן, משלוח חינם להזמנות מעל 400₪.' },
      { q: 'אחריות למוצרים?', a: 'כל המוצרים שלנו באחריות לשנתיים.' },
      { q: 'אפשר להחזיר?', a: 'יש לך 30 יום להחזיר מוצר.' },
      { q: 'אמצעי תשלום?', a: 'אנחנו מקבלים כרטיסי אשראי, PayPal ותשלומים.' },
    ],
  };

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const addBotMessage = (text, options = null) => {
    setMessages(prev => [...prev, { type: 'bot', text, options, timestamp: new Date() }]);
    
    // Envoyer une notification à la boîte de messagerie
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('newChatMessage', {
        detail: { message: text }
      });
      window.dispatchEvent(event);
    }
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
  };

  const handleMenuSelect = (optionId) => {
    const option = (menuOptions[language] || menuOptions.fr).find(o => o.id === optionId);
    addUserMessage(option.label);

    switch (optionId) {
      case 'appointment':
        setCurrentStep('appointment-service');
        setTimeout(() => {
          addBotMessage(
            language === 'he' ? 'מעולה! איזה שירות תרצה?' :
            language === 'en' ? 'Great! What service would you like?' :
            'Parfait ! Quel service souhaitez-vous ?'
          );
        }, 500);
        break;
      case 'order':
        setCurrentStep('order-check');
        setTimeout(() => {
          addBotMessage(
            language === 'he' ? 'אנא הזן את מספר ההזמנה שלך (לדוגמה: OG-2024-001):' :
            language === 'en' ? 'Please enter your order number (e.g., OG-2024-001):' :
            'Veuillez entrer votre numéro de commande (ex: OG-2024-001) :'
          );
        }, 500);
        break;
      case 'faq':
        setCurrentStep('faq');
        setTimeout(() => {
          addBotMessage(
            language === 'he' ? 'הנה השאלות הנפוצות שלנו:' :
            language === 'en' ? 'Here are our frequently asked questions:' :
            'Voici nos questions fréquentes :'
          );
        }, 500);
        break;
      case 'contact':
        setCurrentStep('contact');
        setTimeout(() => {
          const contactInfo = language === 'he' 
            ? '📞 טלפון: +33 1 23 45 67 89\n📧 אימייל: contact@opticglass.com\n📍 כתובת: 123 שאנז אליזה, פריז\n\nשעות פעילות:\nשני-שבת: 9:00-19:00'
            : language === 'en'
            ? '📞 Phone: +33 1 23 45 67 89\n📧 Email: contact@opticglass.com\n📍 Address: 123 Champs-Élysées, Paris\n\nOpening hours:\nMon-Sat: 9am-7pm'
            : '📞 Phone : +33 1 23 45 67 89\n📧 Email : contact@opticglass.com\n📍 Address : 123 Champs-Élysées, Paris\n\nHours :\nLun-Sam : 9h-19h';
          addBotMessage(contactInfo);
          setTimeout(() => {
            addBotMessage(
              language === 'he' ? 'האם יש עוד משהו שאוכל לעזור בו?' :
              language === 'en' ? 'Is there anything else I can help you with?' :
              'Y a-t-il autre chose que je puisse faire pour vous ?'
            );
            setCurrentStep('menu');
          }, 1000);
        }, 500);
        break;
    }
  };

  const handleServiceSelect = (serviceId) => {
    const service = (services[language] || services.fr).find(s => s.id === serviceId);
    setAppointmentData(prev => ({ ...prev, service: service.label }));
    addUserMessage(service.label);
    setCurrentStep('appointment-date');
    setTimeout(() => {
      addBotMessage(
        language === 'he' ? 'באיזה תאריך תרצה להגיע? (בחר תאריך)' :
        language === 'en' ? 'What date would you like to come? (Select a date)' :
        'À quelle date souhaitez-vous venir ? (Sélectionnez une date)'
      );
    }, 500);
  };

  const handleDateSelect = (date) => {
    setAppointmentData(prev => ({ ...prev, date }));
    addUserMessage(date);
    setCurrentStep('appointment-time');
    setTimeout(() => {
      addBotMessage(
        language === 'he' ? 'באיזו שעה?' :
        language === 'en' ? 'What time?' :
        'À quelle heure ?'
      );
    }, 500);
  };

  const handleTimeSelect = (time) => {
    setAppointmentData(prev => ({ ...prev, time }));
    addUserMessage(time);
    setCurrentStep('appointment-name');
    setTimeout(() => {
      addBotMessage(
        language === 'he' ? 'מה שמך המלא?' :
        language === 'en' ? 'What is your full name?' :
        'Quel est votre nom complet ?'
      );
    }, 500);
  };

  const handleOrderCheck = (orderNum) => {
    addUserMessage(orderNum);
    
    // Simulate order check
    const mockOrders = {
      'OG-2024-001': { status: 'shipped', anda: '2 jours' },
      'OG-2024-002': { status: 'delivered', anda: null },
      'OG-2024-003': { status: 'processing', anda: '5 jours' },
    };

    setTimeout(() => {
      const order = mockOrders[orderNum.toUpperCase()];
      if (order) {
        const statusMessages = {
          fr: {
            shipped: `📦 Votre commande ${orderNum} est en cours de livraison !\n🚚 Livraison estimée : ${order.anda}\n\nVous recevrez un SMS à la livraison.`,
            delivered: `✅ Votre commande ${orderNum} a été livrée !\n\nMerci pour votre confiance.`,
            processing: `⏳ Votre commande ${orderNum} est en préparation.\n📅 Expédition prévue dans ${order.anda}.`,
          },
          en: {
            shipped: `📦 Your order ${orderNum} is on its way!\n🚚 Estimated delivery: ${order.anda}\n\nYou will receive an SMS upon delivery.`,
            delivered: `✅ Your order ${orderNum} has been delivered!\n\nThank you for your trust.`,
            processing: `⏳ Your order ${orderNum} is being prepared.\n📅 Expected shipping in ${order.anda}.`,
          },
          he: {
            shipped: `📦 ההזמנה שלך ${orderNum} בדרך!\n🚚 משלוח משוער: ${order.anda}\n\nתקבל SMS עם המשלוח.`,
            delivered: `✅ ההזמנה שלך ${orderNum} נמסרה!\n\nתודה על האמון.`,
            processing: `⏳ ההזמנה שלך ${orderNum} בהכנה.\n📅 משלוח צפוי בעוד ${order.anda}.`,
          },
        };
        addBotMessage((statusMessages[language] || statusMessages.fr)[order.status]);
      } else {
        addBotMessage(
          language === 'he' ? `❌ לא נמצאה הזמנה עם המספר ${orderNum}. אנא בדוק את המספר ונסה שוב.` :
          language === 'en' ? `❌ No order found with number ${orderNum}. Please check the number and try again.` :
          `❌ Aucune commande trouvée avec le numéro ${orderNum}. Veuillez vérifier le numéro et réessayer.`
        );
      }
      setTimeout(() => {
        addBotMessage(
          language === 'he' ? 'האם יש עוד משהו שאוכל לעזור בו?' :
          language === 'en' ? 'Is there anything else I can help you with?' :
          'Y a-t-il autre chose que je puisse faire pour vous ?'
        );
        setCurrentStep('menu');
      }, 1000);
    }, 1000);
  };

  const handleFaqSelect = (faqIndex) => {
    const faq = (faqItems[language] || faqItems.fr)[faqIndex];
    addUserMessage(faq.q);
    setTimeout(() => {
      addBotMessage(faq.a);
      setTimeout(() => {
        addBotMessage(
          language === 'he' ? 'יש לך שאלה נוספת?' :
          language === 'en' ? 'Do you have another question?' :
          'Avez-vous une autre question ?'
        );
      }, 500);
    }, 500);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const value = inputValue.trim();
    setInputValue('');

    switch (currentStep) {
      case 'order-check':
        handleOrderCheck(value);
        break;
      case 'appointment-name':
        setAppointmentData(prev => ({ ...prev, name: value }));
        addUserMessage(value);
        setCurrentStep('appointment-email');
        setTimeout(() => {
          addBotMessage(
            language === 'he' ? 'מה כתובת האימייל שלך?' :
            language === 'en' ? 'What is your email address?' :
            'Quelle est votre adresse email ?'
          );
        }, 500);
        break;
      case 'appointment-email':
        setAppointmentData(prev => ({ ...prev, email: value }));
        addUserMessage(value);
        setCurrentStep('appointment-phone');
        setTimeout(() => {
          addBotMessage(
            language === 'he' ? 'מה מספר הטלפון שלך?' :
            language === 'en' ? 'What is your phone number?' :
            'Quel est votre numéro de téléphone ?'
          );
        }, 500);
        break;
      case 'appointment-phone':
        setAppointmentData(prev => ({ ...prev, phone: value }));
        addUserMessage(value);
        setCurrentStep('appointment-confirm');
        setTimeout(() => {
          const confirmMsg = language === 'he' 
            ? `✅ סיכום התור שלך:\n\n📋 שירות: ${appointmentData.service}\n📅 תאריך: ${appointmentData.date}\n🕐 שעה: ${appointmentData.time}\n👤 שם: ${appointmentData.name}\n📧 אימייל: ${appointmentData.email}\n📱 טלפון: ${value}\n\nהאם לאשר את התור?`
            : language === 'en'
            ? `✅ Your appointment summary:\n\n📋 Service: ${appointmentData.service}\n📅 Date: ${appointmentData.date}\n🕐 Time: ${appointmentData.time}\n👤 Name: ${appointmentData.name}\n📧 Email: ${appointmentData.email}\n📱 Phone: ${value}\n\nConfirm this appointment?`
            : `✅ Résumé de votre rendez-vous :\n\n📋 Service : ${appointmentData.service}\n📅 Date : ${appointmentData.date}\n🕐 Heure : ${appointmentData.time}\n👤 Nom : ${appointmentData.name}\n📧 Email : ${appointmentData.email}\n📱 Téléphone : ${value}\n\nConfirmer ce rendez-vous ?`;
          addBotMessage(confirmMsg);
        }, 500);
        break;
      default:
        addUserMessage(value);
        setTimeout(() => {
          addBotMessage(
            language === 'he' ? 'תודה על ההודעה! איך אוכל לעזור לך?' :
            language === 'en' ? 'Thank you for your message! How can I help you?' :
            'Merci pour votre message ! Comment puis-je vous aider ?'
          );
          setCurrentStep('menu');
        }, 500);
    }
  };

  const handleConfirmAppointment = (confirmed) => {
    if (confirmed) {
      addUserMessage(language === 'he' ? 'כן, אשר' : language === 'en' ? 'Oui, confirm' : 'Oui, confirmer');
      setTimeout(() => {
        addBotMessage(
          language === 'he' ? '🎉 מעולה! התור שלך אושר!\n\nתקבל אימייל אישור בקרוב.\n\nתודה שבחרת ב-Optic Glass!' :
          language === 'en' ? '🎉 Excellent! Your appointment is confirmed!\n\nYou will receive a confirmation email shortly.\n\nThank you for choosing Optic Glass!' :
          '🎉 Parfait ! Votre rendez-vous est confirmé !\n\nVous recevrez un email de confirmation sous peu.\n\nMerci d\'avoir choisi Optic Glass !'
        );
        setAppointmentData({ name: '', email: '', phone: '', date: '', time: '', service: '' });
        setTimeout(() => {
          addBotMessage(
            language === 'he' ? 'האם יש עוד משהו שאוכל לעזור בו?' :
            language === 'en' ? 'Is there anything else I can help you with?' :
            'Y a-t-il autre chose que je puisse faire pour vous ?'
          );
          setCurrentStep('menu');
        }, 1000);
      }, 500);
    } else {
      addUserMessage(language === 'he' ? 'לא, בטל' : language === 'en' ? 'No, cancel' : 'No, annuler');
      setAppointmentData({ name: '', email: '', phone: '', date: '', time: '', service: '' });
      setTimeout(() => {
        addBotMessage(
          language === 'he' ? 'בסדר, התור בוטל. איך אוכל לעזור לך?' :
          language === 'en' ? 'Okay, appointment cancelled. How can I help you?' :
          'D\'accord, rendez-vous annulé. Comment puis-je vous aider ?'
        );
        setCurrentStep('menu');
      }, 500);
    }
  };

  const goBackToMenu = () => {
    setCurrentStep('menu');
    setAppointmentData({ name: '', email: '', phone: '', date: '', time: '', service: '' });
    addBotMessage(
      language === 'he' ? 'איך אוכל לעזור לך?' :
      language === 'en' ? 'How can I help you?' :
      'Comment puis-je vous aider ?'
    );
  };

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Skip Sunday
        days.push(date.toLocaleDateString(language === 'he' ? 'he-IL' : language === 'en' ? 'en-US' : 'fr-FR', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short' 
        }));
      }
    }
    return days.slice(0, 5);
  };

  return (
    <>
      {/* Chat Button - Modern Design */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#c9a227] via-[#d4af37] to-[#e5c04a] rounded-2xl shadow-[0_8px_32px_rgba(201,162,39,0.4)] flex items-center justify-center hover:shadow-[0_12px_40px_rgba(201,162,39,0.6)] transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle size={24} className="text-black" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#c9a227] to-[#d4af37] rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Optic Glass</h3>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {language === 'he' ? 'מחובר' : language === 'en' ? 'Online' : 'En ligne'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {currentStep !== 'menu' && (
                  <button
                    onClick={goBackToMenu}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black rounded-br-sm'
                        : 'bg-white shadow-md text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Menu Options */}
              {currentStep === 'menu' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-2"
                >
                  {(menuOptions[language] || menuOptions.fr).map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleMenuSelect(option.id)}
                        className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center gap-2 text-center"
                      >
                        <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{option.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {/* Service Selection */}
              {currentStep === 'appointment-service' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  {(services[language] || services.fr).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className="w-full p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-800">{service.label}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {service.duration}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Date Selection */}
              {currentStep === 'appointment-date' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {getNextDays().map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-[#c9a227] hover:text-black transition text-sm font-medium"
                    >
                      {date}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Time Selection */}
              {currentStep === 'appointment-time' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-[#c9a227] hover:text-black transition text-sm font-medium"
                    >
                      {time}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* FAQ Selection */}
              {currentStep === 'faq' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  {(faqItems[language] || faqItems.fr).map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => handleFaqSelect(index)}
                      className="w-full p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition text-left"
                    >
                      <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Appointment Confirmation */}
              {currentStep === 'appointment-confirm' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <button
                    onClick={() => handleConfirmAppointment(true)}
                    className="flex-1 p-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    {language === 'he' ? 'אשר' : language === 'en' ? 'Confirm' : 'Confirm'}
                  </button>
                  <button
                    onClick={() => handleConfirmAppointment(false)}
                    className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    {language === 'he' ? 'בטל' : language === 'en' ? 'Cancel' : 'Cancel'}
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleInputSubmit} className="p-4 bg-white border-t">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    currentStep === 'order-check' 
                      ? (language === 'he' ? 'מספר הזמנה...' : language === 'en' ? 'Order number...' : 'Numéro de commande...')
                      : (language === 'he' ? 'כתוב הודעה...' : language === 'en' ? 'Type a message...' : 'Écrivez un message...')
                  }
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a227] text-sm"
                />
                <button
                  type="submit"
                  className="p-3 bg-gradient-to-r from-[#c9a227] to-[#d4af37] rounded-xl hover:shadow-lg transition"
                >
                  <Send size={20} className="text-black" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
