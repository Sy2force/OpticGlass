import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Truck, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreVertical,
  Glasses
} from 'lucide-react';
import api from '@/shared/api/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default statistics for initial display
  const defaultStats = {
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
    topProducts: [
      { _id: '1', name: 'Aviator Classic', brand: 'Soléra', sales: 145, revenue: 129050 },
      { _id: '2', name: 'Classic Square Original', brand: 'Soléra', sales: 98, revenue: 73500 },
      { _id: '3', name: 'Aurélia Square', brand: 'Aurélia', sales: 67, revenue: 97150 },
      { _id: '4', name: 'Lumina SoReal', brand: 'Lumina', sales: 54, revenue: 90720 },
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
      setStats(defaultStats);
    } finally {
      setLoading(false);
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
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  const displayStats = stats || defaultStats;

  return (
    <div className="p-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Users', value: displayStats.totalUsers, growth: displayStats.userGrowth, icon: Users },
          { label: 'Products', value: displayStats.totalProducts, sub: 'In stock', icon: Package },
          { label: 'Orders', value: displayStats.totalOrders, growth: displayStats.orderGrowth, icon: ShoppingCart },
          { label: 'Revenue', value: `${displayStats.totalRevenue.toLocaleString()} ₪`, growth: displayStats.revenueGrowth, icon: TrendingUp },
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
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <Link to="/admin/orders" className="text-sm text-[#c9a227] hover:underline">View All</Link>
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
                      <div className="font-medium text-white">{order.user.firstName} {order.user.lastName}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{order.totalAmount} ₪</td>
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
            <h3 className="text-lg font-bold text-white">Top Products</h3>
          </div>
          <div className="divide-y divide-white/10">
            {displayStats.topProducts.map((product, i) => (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Glasses size={20} className="text-[#c9a227]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate text-white">{product.name}</h4>
                  <p className="text-sm text-white/50">{product.brand}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#c9a227]">{product.revenue.toLocaleString()} ₪</p>
                  <p className="text-xs text-white/40">{product.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/10">
            <Link to="/admin/products" className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl transition-colors text-sm font-medium text-center">
              View Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
