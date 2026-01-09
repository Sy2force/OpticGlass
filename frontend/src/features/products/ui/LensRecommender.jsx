import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const LensRecommender = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'faceShape',
      question: 'What is your face shape?',
      options: [
        { value: 'round', label: 'Round', emoji: '🔵', description: 'Full cheeks, rounded chin' },
        { value: 'oval', label: 'Oval', emoji: '🥚', description: 'Balanced proportions' },
        { value: 'square', label: 'Square', emoji: '⬜', description: 'Strong jawline, broad forehead' },
        { value: 'heart', label: 'Heart', emoji: '💜', description: 'Broad forehead, narrow chin' },
      ],
    },
    {
      id: 'style',
      question: 'Which style suits you best?',
      options: [
        { value: 'classic', label: 'Classic', emoji: '👔', description: 'Elegant and timeless' },
        { value: 'trendy', label: 'Trendy', emoji: '✨', description: 'Fashion forward' },
        { value: 'sporty', label: 'Sporty', emoji: '⚡', description: 'Dynamic and active' },
        { value: 'bold', label: 'Bold', emoji: '🔥', description: 'Original and daring' },
      ],
    },
    {
      id: 'usage',
      question: 'What will be the main usage?',
      options: [
        { value: 'everyday', label: 'Everyday', emoji: '☀️', description: 'Versatile use' },
        { value: 'work', label: 'Work', emoji: '💼', description: 'Office and meetings' },
        { value: 'sport', label: 'Sport', emoji: '🏃', description: 'Physical activities' },
        { value: 'fashion', label: 'Fashion', emoji: '👗', description: 'Style accessory' },
      ],
    },
    {
      id: 'color',
      question: 'Which color do you prefer?',
      options: [
        { value: 'black', label: 'Black', emoji: '⚫', description: 'Classic and elegant' },
        { value: 'brown', label: 'Tortoise', emoji: '🟤', description: 'Warm and natural' },
        { value: 'gold', label: 'Gold', emoji: '🟡', description: 'Luxurious and refined' },
        { value: 'colorful', label: 'Colorful', emoji: '🌈', description: 'Fun and expressive' },
      ],
    },
  ];

  const recommendations = {
    round: {
      classic: ['Ray-Ban Clubmaster', 'Persol PO3019S'],
      trendy: ['Gucci GG0061S', 'Prada PR 01OS'],
      sporty: ['Oakley Holbrook', 'Carrera Champion'],
      bold: ['Tom Ford Snowdon', 'Versace VE4361'],
    },
    oval: {
      classic: ['Ray-Ban Aviator', 'Persol PO0714'],
      trendy: ['Dior DiorSoReal', 'Celine CL40061I'],
      sporty: ['Oakley Radar EV', 'Carrera 1001/S'],
      bold: ['Gucci GG0053S', 'Versace VE2150Q'],
    },
    square: {
      classic: ['Ray-Ban Round Metal', 'Persol PO3152S'],
      trendy: ['Prada PR 17WS', 'Dior DiorSoLight'],
      sporty: ['Oakley Sutro', 'Polaroid PLD 2066/S'],
      bold: ['Tom Ford FT0752', 'Celine CL40187I'],
    },
    heart: {
      classic: ['Ray-Ban Wayfarer', 'Persol PO3059S'],
      trendy: ['Gucci GG0327S', 'Prada PR 14WS'],
      sporty: ['Oakley Flak 2.0', 'Carrera 8035/S'],
      bold: ['Dior DiorClub', 'Versace VE4353'],
    },
  };

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
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
  };

  const getRecommendations = () => {
    const faceShape = answers.faceShape || 'oval';
    const style = answers.style || 'classic';
    return recommendations[faceShape]?.[style] || recommendations.oval.classic;
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
        animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a227] rounded-full mb-4"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Personalized Quiz</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Find your ideal glasses
          </h2>
          <p className="text-gray-400">
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
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Question {currentStep + 1}/{questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#c9a227] to-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-2xl font-bold text-center mb-8">
                {questions[currentStep].question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {questions[currentStep].options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      answers[questions[currentStep].id] === option.value
                        ? 'border-[#c9a227] bg-[#c9a227]/20'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="font-bold text-lg mb-1">{option.label}</div>
                    <div className="text-sm text-gray-400">{option.description}</div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              {currentStep > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={goBack}
                  className="mt-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors mx-auto"
                >
                  <ChevronLeft size={20} />
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
                className="w-20 h-20 bg-[#c9a227] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-10 h-10" />
              </motion.div>

              <h3 className="text-3xl font-bold mb-4">Your recommendations</h3>
              <p className="text-gray-400 mb-8">
                Based on your answers, here are the perfect frames for you
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
                {getRecommendations().map((rec, index) => (
                  <motion.div
                    key={rec}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
                  >
                    <div className="text-4xl mb-3">🕶️</div>
                    <div className="font-bold">{rec}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/glasses"
                  className="px-8 py-4 bg-[#c9a227] text-white font-semibold rounded-xl hover:bg-[#d4af37] transition-all inline-flex items-center justify-center gap-2"
                >
                  View Collection
                  <ChevronRight size={20} />
                </Link>
                <button
                  onClick={restart}
                  className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  Restart
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
