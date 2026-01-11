import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/app/providers/AuthContext';
import { useTheme } from '@/app/providers/ThemeContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield, Check, Glasses, Diamond } from 'lucide-react';

// Password Regex: 1 uppercase + 1 lowercase + 4 digits + 1 special character + min 8 characters
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@%$#^&*\-_]).{8,}$/;

const Auth = () => {
  const { isDarkMode } = useTheme();
  const [searchParams] = useSearchParams();
  // Default to registration, or login if ?mode=login
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') === 'login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const { login, register } = useAuth();
  
  const navigate = useNavigate();

  // Real-time password validation
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[a-z]/.test(password)) errors.push('At least 1 lowercase letter');
    if (!/[A-Z]/.test(password)) errors.push('At least 1 uppercase letter');
    if (!/\d.*\d.*\d.*\d/.test(password)) errors.push('At least 4 digits');
    if (!/[!@%$#^&*\-_]/.test(password)) errors.push('At least 1 special character (!@%$#^&*-_)');
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    
    // Real-time password validation (registration only)
    if (name === 'password' && !isLogin) {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Password validation on registration
    if (!isLogin && !PASSWORD_REGEX.test(formData.password)) {
      setLoading(false);
      setError('Password does not meet security criteria');
      return;
    }

    const result = isLogin
      ? await login(formData.email, formData.password, rememberMe)
      : await register(formData.firstName, formData.lastName, formData.email, formData.password);

    if (result.success) {
      // Redirection automatique vers le dashboard approprié
      const targetPath = result.role === 'admin' ? '/admin' : '/user/dashboard';
      navigate(targetPath);
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  const benefits = [
    'Access your orders and favorites',
    'Exclusive offers and promotions',
    'Purchase history',
    'Free shipping over $100',
  ];

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* Left Side - Form */}
      <div className={`flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          {/* Logo */}
          <Link to="/" className="block text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
              <Glasses className="w-8 h-8 text-[#c9a227]" />
            </div>
            <h1 className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Optic <span className="italic text-[#c9a227]">Glass</span>
            </h1>
          </Link>

          {/* Tabs */}
          <div className={`flex rounded-lg p-1 mb-8 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-3 rounded-md font-medium text-sm tracking-wider uppercase transition-all ${
                isLogin 
                  ? 'bg-[#c9a227] text-black shadow-lg' 
                  : isDarkMode ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-3 rounded-md font-medium text-sm tracking-wider uppercase transition-all ${
                !isLogin 
                  ? 'bg-[#c9a227] text-black shadow-lg' 
                  : isDarkMode ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-8">
                <h2 className={`text-2xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {isLogin ? 'Welcome ' : 'Create '}
                  <span className="italic text-[#c9a227]">{isLogin ? 'Back' : 'Account'}</span>
                </h2>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-3" />
                <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  {isLogin
                    ? 'Sign in to access your personal space'
                    : 'Join us and enjoy all benefits'}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm ${
                    isDarkMode 
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                      : 'bg-red-50 border border-red-200 text-red-600'
                  }`}
                >
                  <span>⚠️</span>
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-medium tracking-wider uppercase mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                        First Name
                      </label>
                      <div className="relative">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} size={18} />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="John"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 ${
                            isDarkMode 
                              ? 'bg-white/5 border border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-medium tracking-wider uppercase mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                        Last Name
                      </label>
                      <div className="relative">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} size={18} />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Doe"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 ${
                            isDarkMode 
                              ? 'bg-white/5 border border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className={`block text-xs font-medium tracking-wider uppercase mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className={`w-full pl-11 pr-4 py-3.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 ${
                        isDarkMode 
                          ? 'bg-white/5 border border-white/10 text-white placeholder-white/30' 
                          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium tracking-wider uppercase mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-12 py-3.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 ${
                        !isLogin && formData.password && passwordErrors.length > 0 
                          ? isDarkMode ? 'border-red-500/50 bg-white/5 text-white' : 'border-red-300 bg-gray-50 text-gray-900'
                          : isDarkMode 
                            ? 'bg-white/5 border border-white/10 text-white placeholder-white/30' 
                            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-white/30 hover:text-[#c9a227]' : 'text-gray-400 hover:text-[#c9a227]'}`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Password validation indicators (registration) */}
                  {!isLogin && formData.password && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {[
                        { test: formData.password.length >= 8, label: '8+ chars' },
                        { test: /[a-z]/.test(formData.password), label: 'Lowercase' },
                        { test: /[A-Z]/.test(formData.password), label: 'Uppercase' },
                        { test: /\d.*\d.*\d.*\d/.test(formData.password), label: '4 digits' },
                        { test: /[!@%$#^&*\-_]/.test(formData.password), label: 'Special char' },
                      ].map((rule, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${
                          rule.test 
                            ? 'text-[#c9a227] bg-[#c9a227]/10' 
                            : isDarkMode ? 'text-white/30 bg-white/5' : 'text-gray-400 bg-gray-100'
                        }`}>
                          {rule.test ? <Check size={10} /> : <span className="w-2 h-2 rounded-full border border-current" />}
                          {rule.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#c9a227] focus:ring-[#c9a227] bg-transparent"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-[#c9a227] hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>

              {!isLogin && (
                <p className={`mt-6 text-xs text-center ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-[#c9a227] hover:underline">Terms</a> and{' '}
                  <a href="#" className="text-[#c9a227] hover:underline">Privacy Policy</a>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex flex-1 bg-[#111] items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 max-w-lg text-white"
        >
          <div className="w-16 h-16 mb-8 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
            <Diamond className="w-8 h-8 text-[#c9a227]" />
          </div>

          <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Member Area</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Join the Optic Glass <span className="italic text-[#c9a227]">Community</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-[#c9a227] to-transparent mb-6" />
          <p className="text-white/50 mb-10">
            Create your account and enjoy exclusive benefits on our premium eyewear.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5"
              >
                <div className="w-8 h-8 bg-[#c9a227]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-[#c9a227]" />
                </div>
                <span className="text-white/70 text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                <Shield className="text-[#c9a227]" size={20} />
              </div>
              <div>
                <p className="font-serif text-white">100% Secure Payment</p>
                <p className="text-xs text-white/40">Your data is protected</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
