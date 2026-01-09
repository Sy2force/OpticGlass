import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/app/providers/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield, Check } from 'lucide-react';

// Password Regex: 1 uppercase + 1 lowercase + 4 digits + 1 special character + min 8 characters
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@%$#^&*\-_]).{8,}$/;

const Auth = () => {
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
      ? await login(formData.email, formData.password, formData.remember)
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
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          {/* Logo */}
          <Link to="/" className="block text-center mb-8">
            <h1 className="text-3xl font-display font-bold">
              Optic <span className="text-[#c9a227]">Glass</span>
            </h1>
          </Link>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                isLogin ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                !isLogin ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600 mb-6">
                {isLogin
                  ? 'Sign in to access your personal space'
                  : 'Join us and enjoy all benefits'}
              </p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2"
                >
                  <span className="text-red-500">⚠️</span>
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="John"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Doe"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition ${
                        !isLogin && formData.password && passwordErrors.length > 0 
                          ? 'border-red-300' 
                          : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  
                  {/* Password validation indicators (registration) */}
                  {!isLogin && formData.password && (
                    <div className="mt-2 space-y-1">
                      {[
                        { test: formData.password.length >= 8, label: 'At least 8 characters' },
                        { test: /[a-z]/.test(formData.password), label: '1 lowercase letter' },
                        { test: /[A-Z]/.test(formData.password), label: '1 uppercase letter' },
                        { test: /\d.*\d.*\d.*\d/.test(formData.password), label: '4 digits' },
                        { test: /[!@%$#^&*\-_]/.test(formData.password), label: '1 special char (!@%$#^&*-_)' },
                      ].map((rule, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs ${rule.test ? 'text-green-600' : 'text-gray-400'}`}>
                          {rule.test ? <Check size={12} /> : <span className="w-3 h-3 rounded-full border border-gray-300" />}
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
                        className="w-4 h-4 rounded border-gray-300 text-[#c9a227] focus:ring-[#c9a227]"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-[#c9a227] hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-semibold rounded-xl hover:from-[#d4af37] hover:to-[#e5c04a] hover:shadow-lg hover:shadow-[#c9a227]/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Sign Up'}
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </form>

              {!isLogin && (
                <p className="mt-4 text-xs text-gray-500 text-center">
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
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-black to-gray-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a227]/20 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 max-w-lg text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a227] rounded-full mb-6">
            <Sparkles size={18} />
            <span className="font-semibold">Member Area</span>
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Join the Optic Glass Community
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Create your account and enjoy exclusive benefits on our luxury eyewear.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-[#c9a227]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-[#c9a227]" />
                </div>
                <span className="text-gray-300">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <Shield className="text-[#c9a227]" size={24} />
              <div>
                <p className="font-semibold">100% Secure Payment</p>
                <p className="text-sm text-gray-400">Your data is protected</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
