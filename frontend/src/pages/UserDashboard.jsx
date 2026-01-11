import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/providers/AuthContext';
import { useTheme } from '@/app/providers/ThemeContext';
import { useFavorites } from '@/app/providers/FavoritesContext';
import { useCart } from '@/app/providers/CartContext';
import { Package, Heart, User, LogOut, ShoppingBag, MapPin, CreditCard, Settings, ChevronRight, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/shared/api/api';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const { getFavoritesCount } = useFavorites();
  const { getCartCount } = useCart();
  const [greeting, setGreeting] = useState('');
  const [ordersCount, setOrdersCount] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Fetch real orders count
  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const response = await api.get('/orders');
        const orders = response.data.data || response.data || [];
        // Count active orders (not delivered or cancelled)
        const activeOrders = orders.filter(o => 
          o.status !== 'delivered' && o.status !== 'cancelled'
        );
        setOrdersCount(activeOrders.length);
        
        // Calculate loyalty points based on total spent
        const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        setLoyaltyPoints(Math.floor(totalSpent * 10)); // 10 points per ₪ spent
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrdersCount(0);
        setLoyaltyPoints(0);
      }
    };
    fetchOrdersCount();
  }, []);

  const stats = [
    { label: 'Active Orders', value: ordersCount.toString(), icon: Package, to: '/orders' },
    { label: 'Wishlist Items', value: getFavoritesCount().toString(), icon: Heart, to: '/favorites' },
    { label: 'Loyalty Points', value: loyaltyPoints.toLocaleString(), icon: Crown, to: null },
  ];

  const menuItems = [
    { title: 'My Orders', icon: Package, desc: 'Track, return, or buy things again', to: '/orders' },
    { title: 'My Favorites', icon: Heart, desc: 'View your saved items', to: '/favorites' },
    { title: 'Profile Settings', icon: User, desc: 'Edit login, name, and mobile number', to: '/profile?tab=profile' },
    { title: 'Addresses', icon: MapPin, desc: 'Manage delivery addresses', to: '/profile?tab=addresses' },
    { title: 'Payment Methods', icon: CreditCard, desc: 'Manage cards and billing', to: '/profile?tab=payments' },
    { title: 'Settings', icon: Settings, desc: 'Notifications and preferences', to: '/profile?tab=settings' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100'
    }`}>
      {/* Hero Header */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a227]" />
              <span className="text-[#c9a227] uppercase tracking-[0.3em] text-xs font-medium flex items-center gap-2">
                <Sparkles size={14} /> Member Area
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {greeting}, <span className="italic text-[#c9a227]">{user?.firstName}</span>
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-4" />
            <p className={`text-lg ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
              Welcome back to your personal space.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const StatWrapper = stat.to ? Link : 'div';
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatWrapper 
                  to={stat.to || undefined}
                  className={`block rounded-xl p-6 border transition-all group cursor-pointer relative overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10 hover:border-[#c9a227]/30' 
                      : 'bg-white border-gray-200 hover:border-[#c9a227]/50 shadow-lg'
                  }`}
                >
                  {/* Subtle glow */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#c9a227]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className={`text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                        {stat.label}
                      </p>
                      <h3 className={`text-3xl font-serif group-hover:text-[#c9a227] transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stat.value}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                      <stat.icon size={20} className="text-[#c9a227]" />
                    </div>
                  </div>
                  {stat.to && (
                    <div className={`mt-4 pt-4 border-t flex items-center justify-between ${
                      isDarkMode ? 'border-white/10' : 'border-gray-100'
                    }`}>
                      <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>View details</span>
                      <ChevronRight size={14} className={`group-hover:text-[#c9a227] transition-colors ${
                        isDarkMode ? 'text-white/40' : 'text-gray-400'
                      }`} />
                    </div>
                  )}
                </StatWrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick <span className="italic text-[#c9a227]">Access</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#c9a227]/30 to-transparent" />
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Link
                to={item.to}
                className={`block rounded-xl p-5 border transition-all group relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10 hover:border-[#c9a227]/30' 
                    : 'bg-white border-gray-200 hover:border-[#c9a227]/50 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    isDarkMode 
                      ? 'bg-white/5 group-hover:bg-[#c9a227]/10' 
                      : 'bg-gray-50 group-hover:bg-[#c9a227]/10'
                  }`}>
                    <item.icon size={22} className={`transition-colors group-hover:text-[#c9a227] ${
                      isDarkMode ? 'text-white/60' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium mb-0.5 group-hover:text-[#c9a227] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs truncate ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight size={16} className={`flex-shrink-0 group-hover:text-[#c9a227] group-hover:translate-x-1 transition-all ${
                    isDarkMode ? 'text-white/20' : 'text-gray-300'
                  }`} />
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* Logout Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              className={`w-full block rounded-xl p-5 border transition-all group relative overflow-hidden text-left ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10 hover:border-red-500/30 hover:bg-red-500/5' 
                  : 'bg-white border-gray-200 hover:border-red-300 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  isDarkMode 
                    ? 'bg-white/5 group-hover:bg-red-500/10' 
                    : 'bg-gray-50 group-hover:bg-red-50'
                }`}>
                  <LogOut size={22} className={`transition-colors group-hover:text-red-500 ${
                    isDarkMode ? 'text-white/60' : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium mb-0.5 group-hover:text-red-500 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sign Out
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                    Securely log out
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
