import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';
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
  Eye
} from 'lucide-react';

const ProfilePage = () => {
  const { user, login, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
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
      alert('Profil mis à jour avec succès');
      setIsEditing(false);
      // Forcer un rafraîchissement pour voir les nouvelles données ou utiliser une méthode de contexte
      window.location.reload(); 
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      alert(error.response?.data?.message || 'Erreur lors de la mise à jour du profil');
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
    { label: 'Role', value: user?.role === 'admin' ? 'Admin' : 'Member', icon: Shield },
    { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024', icon: Calendar },
    { label: 'Status', value: 'Active', icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden sticky top-24">
              <div className="p-6 text-center border-b border-white/10">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#c9a227] to-amber-700 p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-white/50 text-sm mt-1">{user?.email}</p>
                {user?.role === 'admin' && (
                  <span className="inline-block mt-3 px-3 py-1 bg-[#c9a227]/20 border border-[#c9a227]/30 text-[#c9a227] text-xs font-bold rounded-full uppercase tracking-wider">
                    Admin
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
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all group"
                      >
                        <Icon size={20} className="group-hover:text-[#c9a227] transition-colors" />
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  }
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#c9a227] text-black shadow-lg shadow-[#c9a227]/20'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}

                <div className="my-2 border-t border-white/10" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
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
                    className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-white/50 text-sm font-medium mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl text-[#c9a227]">
                        <Icon size={24} />
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
              className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-8"
            >
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 text-[#c9a227] hover:text-[#d4af37] transition-colors"
                    >
                      <Edit2 size={18} />
                      <span className="font-medium">{isEditing ? 'Cancel' : 'Edit'}</span>
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      <div>
                        <label className="block text-white/50 text-sm mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2 pt-4 border-t border-white/10 mt-4">
                        <h3 className="text-lg font-bold mb-4">Change Password</h3>
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Leave blank to keep current"
                          className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end mt-6">
                        <button 
                          type="submit"
                          className="px-8 py-3 bg-[#c9a227] text-black font-bold rounded-xl hover:bg-[#b8912a] transition shadow-lg"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                      <div>
                        <label className="block text-white/50 text-sm mb-1">First Name</label>
                        <div className="flex items-center gap-3 text-lg font-medium">
                          <User size={20} className="text-[#c9a227]" />
                          {user?.firstName || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-1">Last Name</label>
                        <div className="flex items-center gap-3 text-lg font-medium">
                          <User size={20} className="text-[#c9a227]" />
                          {user?.lastName || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-1">Email</label>
                        <div className="flex items-center gap-3 text-lg font-medium">
                          <Mail size={20} className="text-[#c9a227]" />
                          {user?.email || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-1">Phone</label>
                        <div className="flex items-center gap-3 text-lg font-medium">
                          <Phone size={20} className="text-[#c9a227]" />
                          {user?.phone || 'Not specified'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab - Placeholder */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                   <h2 className="text-2xl font-bold border-b border-white/10 pb-6">My Addresses</h2>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-[#c9a227] bg-[#c9a227]/5 p-6 rounded-xl relative">
                        <div className="absolute top-4 right-4 text-[#c9a227] text-xs font-bold uppercase border border-[#c9a227] px-2 py-1 rounded">Default</div>
                        <h3 className="font-bold mb-2">Home</h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {user?.firstName} {user?.lastName}<br />
                          123 Luxury Avenue<br />
                          75008 Paris<br />
                          France
                        </p>
                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                          <button className="text-sm text-white/70 hover:text-white">Edit</button>
                          <button className="text-sm text-red-500 hover:text-red-400">Delete</button>
                        </div>
                      </div>
                      
                      <button className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-white/50 hover:border-[#c9a227] hover:text-[#c9a227] transition-all">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
                           <span className="text-2xl">+</span>
                        </div>
                        <span className="font-medium">Add New Address</span>
                      </button>
                   </div>
                </div>
              )}

              {/* Payment Methods - Placeholder */}
              {activeTab === 'payments' && (
                 <div className="text-center py-12">
                   <CreditCard size={48} className="mx-auto text-white/20 mb-4" />
                   <h3 className="text-xl font-bold mb-2">Payment Methods</h3>
                   <p className="text-white/50">Securely manage your payment options here.</p>
                 </div>
              )}
              
              {/* Settings - Placeholder */}
              {activeTab === 'settings' && (
                 <div className="text-center py-12">
                   <Settings size={48} className="mx-auto text-white/20 mb-4" />
                   <h3 className="text-xl font-bold mb-2">Account Settings</h3>
                   <p className="text-white/50">Manage your preferences and security settings.</p>
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
