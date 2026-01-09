import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Plus,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  MoreVertical,
  Trash2
} from 'lucide-react';
import api from '@/shared/api/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  // Données mock pour l'affichage
  const mockStats = {
    totalUsers: 1247,
    totalProducts: 156,
    totalOrders: 892,
    totalRevenue: 458750,
    userGrowth: 12.5,
    orderGrowth: 8.3,
    revenueGrowth: 15.2,
    recentOrders: [
      { _id: '1', orderNumber: 'OG-2024-001', user: { firstName: 'John', lastName: 'Doe' }, createdAt: new Date(), totalAmount: 1250, status: 'validated' },
      { _id: '2', orderNumber: 'OG-2024-002', user: { firstName: 'Mary', lastName: 'Martin' }, createdAt: new Date(), totalAmount: 890, status: 'pending' },
      { _id: '3', orderNumber: 'OG-2024-003', user: { firstName: 'Peter', lastName: 'Bernard' }, createdAt: new Date(), totalAmount: 2100, status: 'shipped' },
      { _id: '4', orderNumber: 'OG-2024-004', user: { firstName: 'Sophie', lastName: 'Small' }, createdAt: new Date(), totalAmount: 750, status: 'validated' },
      { _id: '5', orderNumber: 'OG-2024-005', user: { firstName: 'Lucas', lastName: 'Moreau' }, createdAt: new Date(), totalAmount: 1680, status: 'pending' },
    ],
    recentUsers: [
      { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', createdAt: new Date(), role: 'user' },
      { _id: '2', firstName: 'Mary', lastName: 'Martin', email: 'mary@example.com', createdAt: new Date(), role: 'user' },
      { _id: '3', firstName: 'Admin', lastName: 'Test', email: 'admin@opticglass.com', createdAt: new Date(), role: 'admin' },
    ],
    topProducts: [
      { _id: '1', name: 'Aviator Classic', brand: 'Ray-Ban', sales: 145, revenue: 129050 },
      { _id: '2', name: 'Wayfarer Original', brand: 'Ray-Ban', sales: 98, revenue: 73500 },
      { _id: '3', name: 'GG Square', brand: 'Gucci', sales: 67, revenue: 97150 },
      { _id: '4', name: 'DiorSoReal', brand: 'Dior', sales: 54, revenue: 90720 },
    ],
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.data);
    } catch {
      // Utiliser les données mock en cas d'erreur
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setActionLoading(userId);
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchStats();
    } catch {
      // Erreur silencieuse
    } finally {
      setActionLoading(null);
    }
  };

  const handleSupprimeUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setActionLoading(userId);
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchStats();
    } catch {
      // Silent error
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'validated': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'delivered': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'validated': return <CheckCircle size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'shipped': return <Truck size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227] mx-auto mb-4"></div>
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const displayStats = stats || mockStats;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-[#111111] hidden lg:block sticky top-0 h-screen">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-[#c9a227] to-amber-600 bg-clip-text text-transparent">
              OPTIC ADMIN
            </h1>
          </div>
          
          <nav className="p-4 space-y-2">
            <Link to="/admin/images" className="block">
              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-[#c9a227] to-amber-600 text-black font-medium shadow-lg">
                <Package size={20} />
                📸 Gérer les Images
              </div>
            </Link>
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === 'analytics' ? window.location.href='/admin/analytics' : setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-[#c9a227] text-black font-medium shadow-lg shadow-[#c9a227]/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Topbar */}
          <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 lg:hidden">
              <span className="text-xl font-bold text-[#c9a227]">OA</span>
            </div>
            
            <div className="flex-1 max-w-xl mx-auto px-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-white/60 hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a227] to-amber-700 flex items-center justify-center font-bold text-sm">
                AD
              </div>
            </div>
          </header>

          <div className="p-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Users', value: displayStats.totalUsers, growth: displayStats.userGrowth, icon: Users },
                { label: 'Products', value: displayStats.totalProducts, sub: 'In stock', icon: Package },
                { label: 'Orders', value: displayStats.totalOrders, growth: displayStats.orderGrowth, icon: ShoppingCart },
                { label: 'Revenue', value: `${displayStats.totalRevenue.toLocaleString()} €`, growth: displayStats.revenueGrowth, icon: TrendingUp },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 hover:border-[#c9a227]/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white/5 rounded-xl text-[#c9a227] group-hover:bg-[#c9a227] group-hover:text-black transition-colors">
                      <stat.icon size={24} />
                    </div>
                    {stat.growth !== undefined && (
                      <span className={`flex items-center gap-1 text-sm font-medium ${stat.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.growth > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {Math.abs(stat.growth)}%
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-lg font-bold">Recent Orders</h3>
                  <Link to="#" className="text-sm text-[#c9a227] hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase">Order</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase">Client</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase">Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-white/60 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {displayStats.recentOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-mono text-[#c9a227]">{order.orderNumber}</span>
                            <br />
                            <span className="text-xs text-white/40">{new Date(order.createdAt).toLocaleDateString()}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium">{order.user.firstName} {order.user.lastName}</div>
                          </td>
                          <td className="px-6 py-4 font-bold">{order.totalAmount} €</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold">Top Products</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {displayStats.topProducts.map((product, i) => (
                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-xl">
                        👓
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{product.name}</h4>
                        <p className="text-sm text-white/50">{product.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#c9a227]">{product.revenue.toLocaleString()} €</p>
                        <p className="text-xs text-white/40">{product.sales} sales</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/10">
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl transition-colors text-sm font-medium">
                    View Catalog
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content - Users */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h2 className="text-xl font-bold">User Management</h2>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#c9a227]"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase">User</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase">Role</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase">Date</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-white/60 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {displayStats.recentUsers?.map((user) => (
                        <tr key={user._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a227] to-amber-700 flex items-center justify-center font-bold text-xs">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                              </div>
                              <span className="font-medium">{user.firstName} {user.lastName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-white/60">{user.email}</td>
                          <td className="px-6 py-4">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                              disabled={actionLoading === user._id}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#c9a227]"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-white/60 text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleSupprimeUser(user._id)}
                              className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
