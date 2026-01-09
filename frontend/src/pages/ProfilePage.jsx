import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';
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
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const menuItems = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'orders', label: 'Mes Commandes', icon: Package, link: '/orders' },
    { id: 'favorites', label: 'Mes Favoris', icon: Heart, link: '/favorites' },
    { id: 'addresses', label: 'Mes Adresses', icon: MapPin },
    { id: 'payments', label: 'Moyens de Paiement', icon: CreditCard },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const stats = [
    { label: 'Commandes', value: '12', icon: Package },
    { label: 'Favoris', value: '8', icon: Heart },
    { label: 'Points fidélité', value: '2,450', icon: Eye },
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
                  <span className="font-medium">Déconnexion</span>
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
                    <h2 className="text-2xl font-bold">Informations personnelles</h2>
                    <button className="flex items-center gap-2 text-[#c9a227] hover:text-[#d4af37] transition-colors">
                      <Edit2 size={18} />
                      <span className="font-medium">Modifier</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                      <label className="block text-white/50 text-sm mb-1">Prénom</label>
                      <div className="flex items-center gap-3 text-lg font-medium">
                        <User size={20} className="text-[#c9a227]" />
                        {user?.firstName || 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm mb-1">Nom</label>
                      <div className="flex items-center gap-3 text-lg font-medium">
                        <User size={20} className="text-[#c9a227]" />
                        {user?.lastName || 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm mb-1">Email</label>
                      <div className="flex items-center gap-3 text-lg font-medium">
                        <Mail size={20} className="text-[#c9a227]" />
                        {user?.email || 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm mb-1">Téléphone</label>
                      <div className="flex items-center gap-3 text-lg font-medium">
                        <Phone size={20} className="text-[#c9a227]" />
                        {user?.phone || 'Non renseigné'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs placeholders - keeping simple for now */}
              {activeTab !== 'profile' && (
                <div className="text-center py-12">
                  <p className="text-white/50">Section en cours de développement...</p>
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
