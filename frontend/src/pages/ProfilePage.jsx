import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';
import { useTheme } from '@/app/providers/ThemeContext';
import { useFavorites } from '@/app/providers/FavoritesContext';
import api from '@/shared/api/api';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Package, 
  Heart, 
  Settings, 
  CreditCard,
  MapPin,
  Phone,
  Calendar,
  Edit2,
  LogOut,
  ChevronRight,
  Eye,
  Plus,
  Trash2,
  Check,
  Home,
  Building,
  Star,
  Sparkles,
  ArrowLeft,
  Crown
} from 'lucide-react';

const ProfilePage = () => {
  const { user, login, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const { getFavoritesCount } = useFavorites();
  const [searchParams] = useSearchParams();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  
  // Update tab when URL changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // Fetch real orders data
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await api.get('/orders');
        const orders = response.data.data || response.data || [];
        setOrdersCount(orders.length);
        const spent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        setTotalSpent(spent);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrdersData();
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: ''
  });

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Note: In a real app, we would handle password change validation better
      await api.put('/auth/profile', formData);
      alert('Profile updated successfully');
      setIsEditing(false);
      // Forcer un rafraîchissement pour voir les nouvelles données ou utiliser une méthode de contexte
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Error updating profile');
    }
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package, link: '/orders' },
    { id: 'favorites', label: 'My Favorites', icon: Heart, link: '/favorites' },
    { id: 'addresses', label: 'My Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Orders', value: ordersCount.toString(), icon: Package },
    { label: 'Favorites', value: getFavoritesCount().toString(), icon: Heart },
    { label: 'Total Spent', value: `${totalSpent.toLocaleString()} ₪`, icon: Crown },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100'}`}>
      {/* Hero Header */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/user/dashboard" className={`flex items-center gap-2 text-sm transition-colors ${isDarkMode ? 'text-white/50 hover:text-[#c9a227]' : 'text-gray-500 hover:text-[#c9a227]'}`}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a227]" />
            <span className="text-[#c9a227] uppercase tracking-[0.3em] text-xs font-medium flex items-center gap-2">
              <Sparkles size={14} /> Account Settings
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a227]" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-serif text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className="italic text-[#c9a227]">Profile</span>
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`rounded-xl border overflow-hidden sticky top-24 ${isDarkMode ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
              <div className={`p-6 text-center border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#c9a227] to-amber-600 p-[2px]">
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                    <span className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                </div>
                <h2 className={`text-lg font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{user?.email}</p>
                {user?.role === 'admin' && (
                  <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 bg-[#c9a227]/10 border border-[#c9a227]/30 text-[#c9a227] text-xs font-medium rounded-full uppercase tracking-wider">
                    <Shield size={10} /> Admin
                  </span>
                )}
              </div>

              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  if (item.link) {
                    return (
                      <Link
                        key={item.id}
                        to={item.link}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group text-sm ${
                          isDarkMode 
                            ? 'text-white/60 hover:text-white hover:bg-white/5' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={18} className="group-hover:text-[#c9a227] transition-colors" />
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  }
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                        isActive
                          ? 'bg-[#c9a227] text-black'
                          : isDarkMode 
                            ? 'text-white/60 hover:text-white hover:bg-white/5' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}

                <div className={`my-2 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`} />

                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 transition-all text-sm ${
                    isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                  }`}
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-xl p-5 border ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10' 
                        : 'bg-white border-gray-200 shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{stat.label}</p>
                        <p className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                        <Icon size={18} className="text-[#c9a227]" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Main Content Area */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl border p-6 md:p-8 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
            >
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className={`flex items-center justify-between border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Personal <span className="italic text-[#c9a227]">Information</span>
                    </h2>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 text-[#c9a227] hover:text-[#d4af37] transition-colors text-sm"
                    >
                      <Edit2 size={16} />
                      <span className="font-medium">{isEditing ? 'Cancel' : 'Edit'}</span>
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full border rounded-lg px-4 py-3 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-gray-50 border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full border rounded-lg px-4 py-3 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-gray-50 border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full border rounded-lg px-4 py-3 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-gray-50 border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full border rounded-lg px-4 py-3 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-gray-50 border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                      <div className={`md:col-span-2 pt-4 border-t mt-4 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                        <h3 className={`text-sm font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Change <span className="italic text-[#c9a227]">Password</span></h3>
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Leave blank to keep current"
                          className={`w-full border rounded-lg px-4 py-3 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/20 transition-colors ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end mt-6">
                        <button 
                          type="submit"
                          className="px-6 py-2.5 bg-[#c9a227] text-black text-sm font-medium uppercase tracking-wider rounded-lg hover:bg-[#d4af37] transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>First Name</label>
                        <div className={`flex items-center gap-3 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <User size={18} className="text-[#c9a227]" />
                          {user?.firstName || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Last Name</label>
                        <div className={`flex items-center gap-3 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <User size={18} className="text-[#c9a227]" />
                          {user?.lastName || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Email</label>
                        <div className={`flex items-center gap-3 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <Mail size={18} className="text-[#c9a227]" />
                          {user?.email || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Phone</label>
                        <div className={`flex items-center gap-3 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <Phone size={18} className="text-[#c9a227]" />
                          {user?.phone || 'Not specified'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                   <div className={`flex items-center justify-between border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                     <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                       My <span className="italic text-[#c9a227]">Addresses</span>
                     </h2>
                     <button className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-black text-sm font-medium rounded-lg hover:bg-[#d4af37] transition-colors">
                       <Plus size={16} />
                       Add Address
                     </button>
                   </div>
                   <div className="grid md:grid-cols-2 gap-4">
                      {/* Home Address */}
                      <div className={`border p-5 rounded-xl relative group ${
                        isDarkMode 
                          ? 'border-[#c9a227]/50 bg-[#c9a227]/5' 
                          : 'border-[#c9a227] bg-[#c9a227]/5'
                      }`}>
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <span className="text-[#c9a227] text-xs font-medium uppercase border border-[#c9a227] px-2 py-1 rounded flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> Default
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 bg-[#c9a227]/20 rounded-full flex items-center justify-center">
                            <Home size={18} className="text-[#c9a227]" />
                          </div>
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Home</h3>
                        </div>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          {user?.firstName} {user?.lastName}<br />
                          123 Premium Avenue<br />
                          75008 Paris<br />
                          France<br />
                          <span className={isDarkMode ? 'text-white/40' : 'text-gray-400'}>+33 6 12 34 56 78</span>
                        </p>
                        <div className={`flex gap-4 mt-4 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                          <button className="text-xs text-[#c9a227] hover:text-[#d4af37] font-medium flex items-center gap-1">
                            <Edit2 size={12} /> Edit
                          </button>
                          <button className="text-xs text-red-500 hover:text-red-400 font-medium flex items-center gap-1">
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                      
                      {/* Work Address */}
                      <div className={`border p-5 rounded-xl relative group transition-colors ${
                        isDarkMode 
                          ? 'border-white/10 bg-white/5 hover:border-white/20' 
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                            <Building size={18} className={isDarkMode ? 'text-white/60' : 'text-gray-500'} />
                          </div>
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Work</h3>
                        </div>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          {user?.firstName} {user?.lastName}<br />
                          456 Business Center<br />
                          75001 Paris<br />
                          France<br />
                          <span className={isDarkMode ? 'text-white/40' : 'text-gray-400'}>+33 1 23 45 67 89</span>
                        </p>
                        <div className={`flex gap-4 mt-4 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                          <button className={`text-xs font-medium flex items-center gap-1 ${isDarkMode ? 'text-white/60 hover:text-[#c9a227]' : 'text-gray-500 hover:text-[#c9a227]'}`}>
                            <Star size={12} /> Set Default
                          </button>
                          <button className="text-xs text-[#c9a227] hover:text-[#d4af37] font-medium flex items-center gap-1">
                            <Edit2 size={12} /> Edit
                          </button>
                          <button className="text-xs text-red-500 hover:text-red-400 font-medium flex items-center gap-1">
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                      
                      {/* Add New Address Button */}
                      <button className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 transition-all min-h-[180px] ${
                        isDarkMode 
                          ? 'border-white/10 text-white/40 hover:border-[#c9a227] hover:text-[#c9a227]' 
                          : 'border-gray-200 text-gray-400 hover:border-[#c9a227] hover:text-[#c9a227]'
                      }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                           <Plus size={20} />
                        </div>
                        <span className="text-sm font-medium">Add New Address</span>
                        <span className={`text-xs ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`}>Shipping or billing</span>
                      </button>
                   </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className={`flex items-center justify-between border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Payment <span className="italic text-[#c9a227]">Methods</span>
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-black text-sm font-medium rounded-lg hover:bg-[#d4af37] transition-colors">
                      <Plus size={16} />
                      Add Card
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Visa Card */}
                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-xl border border-white/10 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a227]/10 rounded-full blur-3xl" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-[#c9a227] text-xs font-bold uppercase border border-[#c9a227] px-2 py-1 rounded flex items-center gap-1">
                            <Star size={12} fill="currentColor" /> Default
                          </span>
                          <span className="text-2xl font-bold text-white/80">VISA</span>
                        </div>
                        <p className="text-white/40 text-xs mb-1">Card Number</p>
                        <p className="text-white font-mono text-lg tracking-wider mb-4">•••• •••• •••• 4242</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-white/40 text-xs mb-1">Cardholder</p>
                            <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                          </div>
                          <div>
                            <p className="text-white/40 text-xs mb-1">Expires</p>
                            <p className="text-white font-medium">12/26</p>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                          <button className="text-sm text-[#c9a227] hover:text-[#d4af37] font-medium">Edit</button>
                          <button className="text-sm text-red-500 hover:text-red-400 font-medium">Remove</button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mastercard */}
                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-xl border border-white/10 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-white/40 text-xs">Secondary</span>
                          <div className="flex">
                            <div className="w-8 h-8 bg-red-500 rounded-full -mr-3"></div>
                            <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-80"></div>
                          </div>
                        </div>
                        <p className="text-white/40 text-xs mb-1">Card Number</p>
                        <p className="text-white font-mono text-lg tracking-wider mb-4">•••• •••• •••• 8888</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-white/40 text-xs mb-1">Cardholder</p>
                            <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                          </div>
                          <div>
                            <p className="text-white/40 text-xs mb-1">Expires</p>
                            <p className="text-white font-medium">08/25</p>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                          <button className="text-sm text-white/70 hover:text-[#c9a227] font-medium">Set Default</button>
                          <button className="text-sm text-[#c9a227] hover:text-[#d4af37] font-medium">Edit</button>
                          <button className="text-sm text-red-500 hover:text-red-400 font-medium">Remove</button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Add New Card */}
                    <button className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-white/50 hover:border-[#c9a227] hover:text-[#c9a227] transition-all min-h-[200px]">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                        <CreditCard size={24} />
                      </div>
                      <span className="font-medium">Add New Card</span>
                      <span className="text-xs text-white/30">Visa, Mastercard, Amex</span>
                    </button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                    <Shield size={20} className="text-[#c9a227]" />
                    <p className="text-white/60 text-sm">Your payment information is encrypted and secure. We never store your full card details.</p>
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className={`border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <h2 className={`text-xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Account <span className="italic text-[#c9a227]">Settings</span>
                    </h2>
                  </div>
                  
                  {/* Notifications */}
                  <div className="space-y-4">
                    <h3 className={`text-sm font-medium uppercase tracking-wider ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Order updates', desc: 'Get notified about your order status', checked: true },
                        { label: 'Promotions', desc: 'Receive exclusive offers and discounts', checked: true },
                        { label: 'New arrivals', desc: 'Be the first to know about new products', checked: false },
                        { label: 'Newsletter', desc: 'Weekly curated content and tips', checked: true },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/10' 
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div>
                            <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                            <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                            <div className={`w-10 h-5 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9a227] ${
                              isDarkMode ? 'bg-white/10' : 'bg-gray-200'
                            }`}></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Privacy */}
                  <div className={`space-y-4 pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <h3 className={`text-sm font-medium uppercase tracking-wider ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>Privacy & Security</h3>
                    <div className="space-y-3">
                      <button className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors text-left ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/10 hover:border-[#c9a227]/50' 
                          : 'bg-gray-50 border-gray-200 hover:border-[#c9a227]/50'
                      }`}>
                        <div>
                          <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Two-Factor Authentication</p>
                          <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Add an extra layer of security</p>
                        </div>
                        <ChevronRight size={18} className={isDarkMode ? 'text-white/40' : 'text-gray-400'} />
                      </button>
                      <button className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors text-left ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/10 hover:border-[#c9a227]/50' 
                          : 'bg-gray-50 border-gray-200 hover:border-[#c9a227]/50'
                      }`}>
                        <div>
                          <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Download My Data</p>
                          <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Get a copy of your personal data</p>
                        </div>
                        <ChevronRight size={18} className={isDarkMode ? 'text-white/40' : 'text-gray-400'} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Danger Zone */}
                  <div className={`space-y-4 pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-red-400">Danger Zone</h3>
                    <button className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors text-left ${
                      isDarkMode 
                        ? 'bg-red-500/10 border-red-500/20 hover:border-red-500/50' 
                        : 'bg-red-50 border-red-200 hover:border-red-300'
                    }`}>
                      <div>
                        <p className="font-medium text-sm text-red-500">Delete Account</p>
                        <p className="text-sm text-red-400/60">Permanently delete your account and all data</p>
                      </div>
                      <Trash2 size={20} className="text-red-400" />
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
