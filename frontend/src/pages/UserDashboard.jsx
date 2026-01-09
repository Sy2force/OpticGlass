import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/providers/AuthContext';
import { Package, Heart, User, LogOut, ShoppingBag, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const stats = [
    { label: 'Active Orders', value: '2', icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Wishlist Items', value: '5', icon: Heart, color: 'text-red-400', bg: 'bg-red-500/10' },
    { label: 'Loyalty Points', value: '1,250', icon: ShoppingBag, color: 'text-[#c9a227]', bg: 'bg-[#c9a227]/10' },
  ];

  const menuItems = [
    { title: 'My Orders', icon: Package, desc: 'Track, return, or buy things again', to: '/orders' },
    { title: 'Profile Settings', icon: User, desc: 'Edit login, name, and mobile number', to: '/profile' },
    { title: 'Addresses', icon: MapPin, desc: 'Manage delivery addresses', to: '/profile' },
    { title: 'Payment Methods', icon: CreditCard, desc: 'Manage cards and billing', to: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            {greeting}, <span className="text-[#c9a227]">{user?.firstName}</span>
          </h1>
          <p className="text-white/60">Welcome back to your personal space.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-[#c9a227]/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white group-hover:text-[#c9a227] transition-colors">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <motion.Link
              key={index}
              to={item.to}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:bg-white/5 hover:border-[#c9a227]/50 transition-all group flex items-center gap-6"
            >
              <div className="p-4 bg-white/5 rounded-xl text-white group-hover:text-[#c9a227] group-hover:bg-[#c9a227]/10 transition-colors">
                <item.icon size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#c9a227] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.Link>
          ))}
          
          {/* Logout Card */}
          <motion.button
            onClick={logout}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:bg-red-500/10 hover:border-red-500/50 transition-all group flex items-center gap-6 w-full text-left"
          >
            <div className="p-4 bg-white/5 rounded-xl text-white group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
              <LogOut size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
                Sign Out
              </h3>
              <p className="text-white/60 text-sm">
                Securely log out of your account
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
