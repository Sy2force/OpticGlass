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
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package, link: '/orders' },
    { id: 'favorites', label: 'My Favorites', icon: Heart, link: '/favorites' },
    { id: 'addresses', label: 'My Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Orders', value: '12', icon: Package },
    { label: 'Favorites', value: '8', icon: Heart },
    { label: 'Loyalty Points', value: '2,450', icon: Eye },
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
                    <button className="flex items-center gap-2 text-[#c9a227] hover:text-[#d4af37] transition-colors">
                      <Edit2 size={18} />
                      <span className="font-medium">Edit</span>
                    </button>
                  </div>

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
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold border-b border-white/10 pb-6">My Orders</h2>
                  <div className="space-y-4">
                     {[
                        {
                          id: 'ORD-2024-001',
                          date: '2024-01-15',
                          status: 'Delivered',
                          total: 599,
                          items: [
                            { name: 'Ray-Ban Aviator Classic', quantity: 1, image: 'https://images.ray-ban.com/is/image/RayBan/8053672565393__STD__shad__qt.png?impolicy=RB_Product&width=800' }
                          ]
                        },
                        {
                          id: 'ORD-2023-089',
                          date: '2023-11-20',
                          status: 'Delivered',
                          total: 1299,
                          items: [
                            { name: 'Gucci Oversized Square GG', quantity: 1, image: 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1643224340/691370_J0740_1012_001_100_0000_Light-Lunettes-de-soleil-carrees-a-monture-Geometrique-GG.jpg' }
                          ]
                        }
                      ].map((order) => (
                        <div key={order.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#c9a227]/50 transition-colors">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-mono font-bold text-[#c9a227]">{order.id}</span>
                                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase">
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-white/50 text-sm">{order.date}</p>
                            </div>
                            <p className="text-xl font-bold">${order.total}</p>
                          </div>
                          
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4 bg-black/20 p-2 rounded-lg">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-white rounded-md" />
                                <div>
                                  <p className="font-medium text-sm">{item.name}</p>
                                  <p className="text-white/50 text-xs">Qty: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
                            <button className="text-sm font-medium text-[#c9a227] hover:underline">View Details</button>
                            <button className="text-sm font-medium text-white/70 hover:text-white hover:underline">Download Invoice</button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold border-b border-white/10 pb-6">My Favorites</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                        {
                          id: 1,
                          name: 'Ray-Ban Wayfarer Black',
                          brand: 'Ray-Ban',
                          price: 549,
                          image: 'https://images.ray-ban.com/is/image/RayBan/805289126577__STD__shad__qt.png?impolicy=RB_Product&width=800'
                        },
                        {
                          id: 2,
                          name: 'Tom Ford Marko',
                          brand: 'Tom Ford',
                          price: 1599,
                          image: 'https://www.tomford.com/on/demandware.static/-/Sites-tomford-master-catalog/default/dw1b1b6b8b/images/FT0144/FT0144_18V_OS_A.jpg'
                        }
                      ].map((product) => (
                        <div key={product.id} className="bg-white/5 rounded-xl p-4 border border-white/10 flex gap-4 group">
                          <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-2">
                             <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[#c9a227] text-xs font-bold uppercase mb-1">{product.brand}</p>
                            <h3 className="font-bold mb-2 group-hover:text-[#c9a227] transition-colors">{product.name}</h3>
                            <p className="font-light">${product.price}</p>
                            
                            <div className="flex gap-2 mt-3">
                              <button className="flex-1 py-1.5 bg-[#c9a227] text-black text-xs font-bold rounded-lg hover:bg-[#d4af37] transition-colors">
                                Add to Cart
                              </button>
                              <button className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                <Heart size={16} fill="currentColor" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
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
