import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import api from '@/shared/api/api';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/analytics?period=${period}`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#c9a227', '#1a1a1a', '#4a4a4a', '#d4af37', '#8a6d1c'];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Analytics</h1>
            <p className="text-white/50">Detailed performance overview</p>
          </div>
          
          <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
            {['7', '30', '90', '365'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  period === p 
                    ? 'bg-[#c9a227] text-black shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {p} Days
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#c9a227]/10 rounded-xl text-[#c9a227]">
                <DollarSign size={24} />
              </div>
              <span className="flex items-center text-green-400 text-sm font-medium">
                <ArrowUpRight size={16} className="mr-1" /> +12.5%
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {(data?.ordersPerDay?.reduce((acc, curr) => acc + curr.revenue, 0) || 0).toLocaleString()} ₪
            </h3>
            <p className="text-white/50 text-sm">Total Revenue</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#c9a227]/10 rounded-xl text-[#c9a227]">
                <ShoppingCart size={24} />
              </div>
              <span className="flex items-center text-green-400 text-sm font-medium">
                <ArrowUpRight size={16} className="mr-1" /> +8.2%
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {data?.ordersPerDay?.reduce((acc, curr) => acc + curr.count, 0) || 0}
            </h3>
            <p className="text-white/50 text-sm">Total Orders</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#c9a227]/10 rounded-xl text-[#c9a227]">
                <TrendingUp size={24} />
              </div>
              <span className="flex items-center text-white/50 text-sm font-medium">
                {data?.conversionRate}%
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{data?.conversionRate}%</h3>
            <p className="text-white/50 text-sm">Conversion Rate</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#c9a227]/10 rounded-xl text-[#c9a227]">
                <DollarSign size={24} />
              </div>
              <span className="flex items-center text-white/50 text-sm font-medium">
                Avg.
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{Math.round(data?.avgOrderValue || 0)} ₪</h3>
            <p className="text-white/50 text-sm">Average Order Value</p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6">Revenue Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.ordersPerDay}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a227" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#c9a227" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="_id" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#c9a227" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6">Sales by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.salesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="revenue"
                    nameKey="_id"
                  >
                    {data?.salesByCategory?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {data?.salesByCategory?.map((entry, index) => (
                <div key={entry._id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm text-white/60">{entry._id}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Brands */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10"
        >
          <h3 className="text-xl font-bold mb-6">Top Performing Brands</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.salesByBrand} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis dataKey="_id" type="category" stroke="#fff" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="revenue" fill="#c9a227" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
