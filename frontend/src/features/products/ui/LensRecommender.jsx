import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, RotateCcw, Glasses, Eye, Diamond } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/app/providers/ThemeContext';

const LensRecommender = () => {
  const { isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const questions = [
    {
      id: 'faceShape',
      question: 'What is your face shape?',
      options: [
        { value: 'round', label: 'Round', icon: '○', description: 'Full cheeks, rounded chin' },
        { value: 'oval', label: 'Oval', icon: '◯', description: 'Balanced proportions' },
        { value: 'square', label: 'Square', icon: '□', description: 'Strong jawline, broad forehead' },
        { value: 'heart', label: 'Heart', icon: '♡', description: 'Broad forehead, narrow chin' },
      ],
    },
    {
      id: 'style',
      question: 'Which style suits you best?',
      options: [
        { value: 'classic', label: 'Classic', icon: '◈', description: 'Elegant and timeless' },
        { value: 'trendy', label: 'Trendy', icon: '✦', description: 'Fashion forward' },
        { value: 'sporty', label: 'Sporty', icon: '◇', description: 'Dynamic and active' },
        { value: 'bold', label: 'Bold', icon: '◆', description: 'Original and daring' },
      ],
    },
    {
      id: 'usage',
      question: 'What will be the main usage?',
      options: [
        { value: 'everyday', label: 'Everyday', icon: '☼', description: 'Versatile use' },
        { value: 'work', label: 'Work', icon: '▣', description: 'Office and meetings' },
        { value: 'sport', label: 'Sport', icon: '△', description: 'Physical activities' },
        { value: 'fashion', label: 'Fashion', icon: '✧', description: 'Style accessory' },
      ],
    },
    {
      id: 'color',
      question: 'Which color do you prefer?',
      options: [
        { value: 'black', label: 'Black', icon: '●', description: 'Classic and elegant' },
        { value: 'brown', label: 'Tortoise', icon: '◉', description: 'Warm and natural' },
        { value: 'gold', label: 'Gold', icon: '◎', description: 'Luxurious and refined' },
        { value: 'colorful', label: 'Colorful', icon: '❖', description: 'Fun and expressive' },
      ],
    },
  ];

  const recommendations = {
    round: {
      classic: ['Soléra Browline', 'Artis Classic'],
      trendy: ['Aurélia GG-Style', 'Vespera Minimal'],
      sporty: ['Zenith Holbrook', 'Apex Champion'],
      bold: ['Equinox Snowdon', 'Orion Bold'],
    },
    oval: {
      classic: ['Soléra Aviator', 'Artis Foldable'],
      trendy: ['Lumina SoReal', 'Ethereal Chic'],
      sporty: ['Zenith Radar', 'Apex Speed'],
      bold: ['Aurélia Oversize', 'Orion Medusa'],
    },
    square: {
      classic: ['Soléra Round Metal', 'Artis PO-Style'],
      trendy: ['Vespera Geometric', 'Lumina Light'],
      sporty: ['Zenith Sutro', 'Nova Polarized'],
      bold: ['Equinox FT-Style', 'Ethereal Bold'],
    },
    heart: {
      classic: ['Soléra Classic Square', 'Artis Retro'],
      trendy: ['Aurélia Chic', 'Vespera Cat-Eye'],
      sporty: ['Zenith Flak', 'Apex Active'],
      bold: ['Lumina Club', 'Orion Statement'],
    },
  };
  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: value };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
      // Get recommendations based on face shape and style
      const faceShape = newAnswers.faceShape || 'oval';
      const style = newAnswers.style || 'classic';
      const recommended = recommendations[faceShape]?.[style] || recommendations.oval.classic;
      setRecommendedProducts(recommended);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setRecommendedProducts([]);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className={`relative overflow-hidden rounded-2xl ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] border border-white/10' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-gray-200'
    }`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl" />

      <div className="relative z-10 p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto mb-6 bg-[#c9a227]/10 rounded-full flex items-center justify-center"
          >
            <Glasses className="w-8 h-8 text-[#c9a227]" />
          </motion.div>
          <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-3">Personalized Quiz</p>
          <h2 className={`text-3xl md:text-4xl font-serif mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Find your <span className="italic text-[#c9a227]">ideal</span> glasses
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-4" />
          <p className={`${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
            Answer a few questions to discover the frames made for you
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="mb-10 max-w-md mx-auto">
                <div className={`flex justify-between text-sm mb-3 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  <span className="tracking-wider">Step {currentStep + 1} of {questions.length}</span>
                  <span className="text-[#c9a227] font-medium">{Math.round(progress)}%</span>
                </div>
                <div className={`h-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#c9a227] to-[#d4af37]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className={`text-xl md:text-2xl font-serif text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {questions[currentStep].question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                {questions[currentStep].options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className={`p-5 rounded-xl border transition-all text-left group ${
                      answers[questions[currentStep].id] === option.value
                        ? 'border-[#c9a227] bg-[#c9a227]/10'
                        : isDarkMode 
                          ? 'border-white/10 bg-white/5 hover:border-[#c9a227]/50 hover:bg-white/10' 
                          : 'border-gray-200 bg-white hover:border-[#c9a227]/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`text-2xl mb-2 ${
                      answers[questions[currentStep].id] === option.value 
                        ? 'text-[#c9a227]' 
                        : isDarkMode ? 'text-white/60' : 'text-gray-400'
                    } group-hover:text-[#c9a227] transition-colors`}>{option.icon}</div>
                    <div className={`font-serif text-base mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{option.label}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{option.description}</div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              {currentStep > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={goBack}
                  className={`mt-8 flex items-center gap-2 transition-colors mx-auto text-sm ${
                    isDarkMode ? 'text-white/40 hover:text-[#c9a227]' : 'text-gray-400 hover:text-[#c9a227]'
                  }`}
                >
                  <ChevronLeft size={16} />
                  Previous question
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {/* Results */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 bg-[#c9a227]/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-10 h-10 text-[#c9a227]" />
              </motion.div>

              <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-3">Results</p>
              <h3 className={`text-2xl md:text-3xl font-serif mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Your <span className="italic text-[#c9a227]">Recommendations</span>
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-4" />
              <p className={`mb-8 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                Based on your answers, here are the perfect frames for you
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto mb-10">
                {recommendedProducts.map((rec, index) => (
                  <motion.div
                    key={rec}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`rounded-xl p-5 border ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="w-10 h-10 mx-auto mb-3 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                      <Glasses className="w-5 h-5 text-[#c9a227]" />
                    </div>
                    <div className={`font-serif text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{rec}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/glasses"
                  className="px-8 py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all inline-flex items-center justify-center gap-2"
                >
                  View Collection
                  <ChevronRight size={16} />
                </Link>
                <button
                  onClick={restart}
                  className={`px-8 py-4 border font-semibold tracking-wider uppercase text-sm transition-all inline-flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? 'border-white/20 text-white hover:border-[#c9a227] hover:text-[#c9a227]' 
                      : 'border-gray-300 text-gray-700 hover:border-[#c9a227] hover:text-[#c9a227]'
                  }`}
                >
                  <RotateCcw size={16} />
                  Restart Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LensRecommender;
