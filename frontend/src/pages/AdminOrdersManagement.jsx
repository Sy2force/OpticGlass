import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, CheckCircle, Clock, XCircle, MessageCircle, Send, Filter, Search, Download, Truck,
  Eye, X, User, Calendar, MapPin, Phone, Mail, ChevronDown, ChevronUp, Users, ShoppingBag,
  CreditCard, ArrowUpDown, FileText, Printer, RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react';
import api from '@/shared/api/api';

const AdminOrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const sampleOrders = [
    { _id: '1', orderNumber: 'OG-2024-001', user: { _id: 'u1', firstName: 'Jean', lastName: 'Dupont', email: 'jean@example.com', phone: '+33 6 12 34 56 78' }, createdAt: new Date(), status: 'pending', totalAmount: 1250, items: [{ product: { name: 'Aviator Classic', brand: 'Soléra', images: ['/images/products/optical-01.jpg'] }, quantity: 1, price: 890 }, { product: { name: 'Round Vintage', brand: 'Optic Glass', images: ['/images/products/optical-02.jpg'] }, quantity: 1, price: 360 }], shippingAddress: { street: '123 Rue de la Paix', postalCode: '75001', city: 'Paris', country: 'France' }, messages: [{ from: 'client', text: 'Quand sera expédiée ma commande ?', date: new Date() }] },
    { _id: '2', orderNumber: 'OG-2024-002', user: { _id: 'u2', firstName: 'Marie', lastName: 'Martin', email: 'marie@example.com', phone: '+33 6 98 76 54 32' }, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), status: 'validated', totalAmount: 1680, items: [{ product: { name: 'Lumina SoReal', brand: 'Lumina', images: ['/images/products/sun-01.jpg'] }, quantity: 1, price: 1680 }], shippingAddress: { street: '45 Avenue des Champs', postalCode: '75008', city: 'Paris', country: 'France' }, messages: [] },
    { _id: '3', orderNumber: 'OG-2024-003', user: { _id: 'u1', firstName: 'Jean', lastName: 'Dupont', email: 'jean@example.com', phone: '+33 6 12 34 56 78' }, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), status: 'shipped', totalAmount: 2150, items: [{ product: { name: 'Aurélia GG', brand: 'Aurélia', images: ['/images/products/optical-05.jpg'] }, quantity: 1, price: 1580 }, { product: { name: 'Cat Eye Elite', brand: 'Optic Glass', images: ['/images/products/optical-08.jpg'] }, quantity: 1, price: 570 }], shippingAddress: { street: '123 Rue de la Paix', postalCode: '75001', city: 'Paris', country: 'France' }, messages: [{ from: 'client', text: 'Numéro de suivi ?', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }, { from: 'admin', text: 'TR123456789FR', date: new Date() }] },
    { _id: '4', orderNumber: 'OG-2024-004', user: { _id: 'u3', firstName: 'Pierre', lastName: 'Bernard', email: 'pierre@example.com', phone: '+33 6 11 22 33 44' }, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), status: 'delivered', totalAmount: 890, items: [{ product: { name: 'Zenith Pro', brand: 'Zenith', images: ['/images/products/sun-05.jpg'] }, quantity: 1, price: 890 }], shippingAddress: { street: '78 Boulevard Haussmann', postalCode: '75009', city: 'Paris', country: 'France' }, messages: [] },
    { _id: '5', orderNumber: 'OG-2024-005', user: { _id: 'u2', firstName: 'Marie', lastName: 'Martin', email: 'marie@example.com', phone: '+33 6 98 76 54 32' }, createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), status: 'delivered', totalAmount: 3200, items: [{ product: { name: 'Orion Elite', brand: 'Orion', images: ['/images/products/optical-10.jpg'] }, quantity: 2, price: 1600 }], shippingAddress: { street: '45 Avenue des Champs', postalCode: '75008', city: 'Paris', country: 'France' }, messages: [] },
    { _id: '6', orderNumber: 'OG-2024-006', user: { _id: 'u4', firstName: 'Sophie', lastName: 'Petit', email: 'sophie@example.com', phone: '+33 6 55 66 77 88' }, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), status: 'pending', totalAmount: 1450, items: [{ product: { name: 'Vespera Night', brand: 'Vespera', images: ['/images/products/sun-10.jpg'] }, quantity: 1, price: 1450 }], shippingAddress: { street: '12 Rue du Commerce', postalCode: '75015', city: 'Paris', country: 'France' }, messages: [] },
    { _id: '7', orderNumber: 'OG-2024-007', user: { _id: 'u5', firstName: 'Lucas', lastName: 'Moreau', email: 'lucas@example.com', phone: '+33 6 99 88 77 66' }, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), status: 'cancelled', totalAmount: 750, items: [{ product: { name: 'Artis Frame', brand: 'Artis', images: ['/images/products/optical-15.jpg'] }, quantity: 1, price: 750 }], shippingAddress: { street: '56 Rue de Rivoli', postalCode: '75004', city: 'Paris', country: 'France' }, messages: [] },
  ];

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders');
      setOrders(response.data.data || []);
    } catch { setOrders(sampleOrders); }
    finally { setLoading(false); }
  };

  const uniqueUsers = useMemo(() => {
    const users = {};
    orders.forEach(o => { if (o.user) users[o.user._id || o.user.email] = o.user; });
    return Object.values(users);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    if (filterStatus !== 'all') result = result.filter(o => o.status === filterStatus);
    if (filterUser !== 'all') result = result.filter(o => (o.user._id || o.user.email) === filterUser);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(o => 
        o.orderNumber?.toLowerCase().includes(term) ||
        o.user?.firstName?.toLowerCase().includes(term) ||
        o.user?.lastName?.toLowerCase().includes(term) ||
        o.user?.email?.toLowerCase().includes(term)
      );
    }
    result.sort((a, b) => {
      let aVal = a[sortField], bVal = b[sortField];
      if (sortField === 'createdAt') { aVal = new Date(aVal); bVal = new Date(bVal); }
      if (sortField === 'user') { aVal = `${a.user?.firstName} ${a.user?.lastName}`; bVal = `${b.user?.firstName} ${b.user?.lastName}`; }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [orders, filterStatus, filterUser, searchTerm, sortField, sortDirection]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const updateOrderStatus = async (orderId, newStatus) => {
    try { await api.put(`/admin/orders/${orderId}/status`, { status: newStatus }); fetchOrders(); }
    catch { setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o)); }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedOrder) return;
    try {
      await api.post(`/admin/orders/${selectedOrder._id}/message`, { message });
      const newMsg = { from: 'admin', text: message, date: new Date() };
      setOrders(orders.map(o => o._id === selectedOrder._id ? { ...o, messages: [...(o.messages || []), newMsg] } : o));
      setSelectedOrder({ ...selectedOrder, messages: [...(selectedOrder.messages || []), newMsg] });
      setMessage('');
    } catch { alert('Error sending message'); }
  };

  const handleSort = (field) => {
    if (sortField === field) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDirection('desc'); }
  };

  const getStatusColor = (status) => ({
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    validated: 'bg-green-500/20 text-green-400 border-green-500/30',
    shipped: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    delivered: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  }[status] || 'bg-gray-500/20 text-gray-400');

  const getStatusIcon = (status) => ({
    pending: <Clock size={14} />, validated: <CheckCircle size={14} />, shipped: <Truck size={14} />,
    delivered: <CheckCircle size={14} />, cancelled: <XCircle size={14} />,
  }[status] || <Package size={14} />);

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    validated: orders.filter(o => o.status === 'validated').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + (o.totalAmount || 0), 0),
  }), [orders]);

  const exportToCSV = () => {
    const headers = ['Order Number', 'Customer', 'Email', 'Date', 'Status', 'Total', 'Items'];
    const rows = filteredOrders.map(o => [
      o.orderNumber, `${o.user?.firstName} ${o.user?.lastName}`, o.user?.email,
      new Date(o.createdAt).toLocaleDateString(), o.status, o.totalAmount,
      o.items?.map(i => i.product?.name).join(', ')
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'orders.csv'; a.click();
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
    </div>
  );

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Package className="text-[#c9a227]" size={32} />
              Orders Management
            </h1>
            <p className="text-white/50 mt-1">View and manage all customer orders</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchOrders} className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-white">
              <RefreshCw size={20} />
            </button>
            <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-black rounded-lg hover:bg-[#d4af37] font-semibold transition">
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {[
            { label: 'Total', value: stats.total, icon: Package, color: 'text-white', bg: 'bg-white/5' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            { label: 'Validated', value: stats.validated, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
            { label: 'Shipped', value: stats.shipped, icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Delivered', value: stats.delivered, icon: CheckCircle, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
            { label: 'Revenue', value: `${stats.revenue.toLocaleString()} ₪`, icon: CreditCard, color: 'text-[#c9a227]', bg: 'bg-[#c9a227]/10' },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} border border-white/10 rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={16} className={s.color} />
                <span className="text-white/50 text-xs">{s.label}</span>
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input type="text" placeholder="Search by order number, name, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227]" />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-white focus:outline-none focus:border-[#c9a227] cursor-pointer">
                  <option value="all" className="bg-[#1a1a1a]">All Status</option>
                  <option value="pending" className="bg-[#1a1a1a]">Pending</option>
                  <option value="validated" className="bg-[#1a1a1a]">Validated</option>
                  <option value="shipped" className="bg-[#1a1a1a]">Shipped</option>
                  <option value="delivered" className="bg-[#1a1a1a]">Delivered</option>
                  <option value="cancelled" className="bg-[#1a1a1a]">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
              </div>
              <div className="relative">
                <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-white focus:outline-none focus:border-[#c9a227] cursor-pointer">
                  <option value="all" className="bg-[#1a1a1a]">All Customers</option>
                  {uniqueUsers.map(u => (
                    <option key={u._id || u.email} value={u._id || u.email} className="bg-[#1a1a1a]">
                      {u.firstName} {u.lastName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  {[
                    { key: 'orderNumber', label: 'Order #' },
                    { key: 'user', label: 'Customer' },
                    { key: 'createdAt', label: 'Date' },
                    { key: 'status', label: 'Status' },
                    { key: 'totalAmount', label: 'Total' },
                    { key: 'items', label: 'Items' },
                    { key: 'actions', label: 'Actions' },
                  ].map(col => (
                    <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                      {col.key !== 'actions' && col.key !== 'items' ? (
                        <button onClick={() => handleSort(col.key)} className="flex items-center gap-1 hover:text-white transition">
                          {col.label}
                          {sortField === col.key && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                        </button>
                      ) : col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginatedOrders.map(order => (
                  <motion.tr key={order._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition cursor-pointer" onClick={() => { setSelectedOrder(order); setShowDetailModal(true); }}>
                    <td className="px-4 py-4">
                      <span className="font-mono font-semibold text-white">{order.orderNumber}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#c9a227]/20 rounded-full flex items-center justify-center">
                          <User size={14} className="text-[#c9a227]" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{order.user?.firstName} {order.user?.lastName}</p>
                          <p className="text-xs text-white/40">{order.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs text-white/40">{new Date(order.createdAt).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-bold text-[#c9a227]">{order.totalAmount?.toLocaleString()} ₪</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-white/60">{order.items?.length || 0} item(s)</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <button onClick={() => { setSelectedOrder(order); setShowDetailModal(true); }}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-white/60 hover:text-white">
                          <Eye size={16} />
                        </button>
                        <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-[#c9a227]">
                          <option value="pending" className="bg-[#1a1a1a]">Pending</option>
                          <option value="validated" className="bg-[#1a1a1a]">Validated</option>
                          <option value="shipped" className="bg-[#1a1a1a]">Shipped</option>
                          <option value="delivered" className="bg-[#1a1a1a]">Delivered</option>
                          <option value="cancelled" className="bg-[#1a1a1a]">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <p className="text-sm text-white/50">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white">
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page = i + 1;
                  if (totalPages > 5) {
                    if (currentPage > 3) page = currentPage - 2 + i;
                    if (currentPage > totalPages - 2) page = totalPages - 4 + i;
                  }
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-medium transition ${currentPage === page ? 'bg-[#c9a227] text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                      {page}
                    </button>
                  );
                })}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {showDetailModal && selectedOrder && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetailModal(false)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Order Details</h2>
                    <p className="text-[#c9a227] font-mono">{selectedOrder.orderNumber}</p>
                  </div>
                  <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-white/10 rounded-full transition text-white/60 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2"><User size={16} /> Customer</h3>
                      <p className="font-semibold text-white">{selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
                      <p className="text-sm text-white/60 flex items-center gap-2 mt-1"><Mail size={14} /> {selectedOrder.user?.email}</p>
                      {selectedOrder.user?.phone && <p className="text-sm text-white/60 flex items-center gap-2 mt-1"><Phone size={14} /> {selectedOrder.user?.phone}</p>}
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2"><MapPin size={16} /> Shipping Address</h3>
                      <p className="text-white">{selectedOrder.shippingAddress?.street}</p>
                      <p className="text-white/60">{selectedOrder.shippingAddress?.postalCode} {selectedOrder.shippingAddress?.city}</p>
                      <p className="text-white/60">{selectedOrder.shippingAddress?.country}</p>
                    </div>
                  </div>
                  {/* Status & Date */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-white/60">Status:</span>
                      <select value={selectedOrder.status} onChange={(e) => { updateOrderStatus(selectedOrder._id, e.target.value); setSelectedOrder({...selectedOrder, status: e.target.value}); }}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-[#c9a227]">
                        <option value="pending" className="bg-[#1a1a1a]">Pending</option>
                        <option value="validated" className="bg-[#1a1a1a]">Validated</option>
                        <option value="shipped" className="bg-[#1a1a1a]">Shipped</option>
                        <option value="delivered" className="bg-[#1a1a1a]">Delivered</option>
                        <option value="cancelled" className="bg-[#1a1a1a]">Cancelled</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar size={16} />
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </div>
                  </div>
                  {/* Items */}
                  <div>
                    <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2"><ShoppingBag size={16} /> Items ({selectedOrder.items?.length})</h3>
                    <div className="space-y-2">
                      {selectedOrder.items?.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{item.product?.name}</p>
                            <p className="text-sm text-white/40">{item.product?.brand} × {item.quantity}</p>
                          </div>
                          <p className="font-bold text-[#c9a227]">{(item.price * item.quantity).toLocaleString()} ₪</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                      <span className="text-white/60">Total</span>
                      <span className="text-2xl font-bold text-[#c9a227]">{selectedOrder.totalAmount?.toLocaleString()} ₪</span>
                    </div>
                  </div>
                  {/* Messages */}
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2"><MessageCircle size={16} /> Messages ({selectedOrder.messages?.length || 0})</h3>
                    <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                      {selectedOrder.messages?.map((msg, i) => (
                        <div key={i} className={`p-3 rounded-lg max-w-[80%] ${msg.from === 'admin' ? 'bg-[#c9a227]/20 ml-auto' : 'bg-white/10'}`}>
                          <p className="text-xs font-bold text-white/60 mb-1">{msg.from === 'admin' ? 'You' : 'Customer'}</p>
                          <p className="text-sm text-white">{msg.text}</p>
                          <p className="text-[10px] text-white/30 mt-1">{new Date(msg.date).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Reply to customer..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227]" />
                      <button onClick={sendMessage} className="px-4 py-2 bg-[#c9a227] text-black rounded-lg hover:bg-[#d4af37] transition font-semibold">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminOrdersManagement;
