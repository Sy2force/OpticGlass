import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  MessageCircle,
  Send,
  Eye,
  Filter,
  Search,
  Download
} from 'lucide-react';
import api from '@/shared/api/api';

const AdminOrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const mockOrders = [
    {
      _id: '1',
      orderNumber: 'OG-2024-001',
      user: { firstName: 'Jean', lastName: 'Dupont', email: 'jean@example.com' },
      createdAt: new Date(),
      status: 'pending',
      totalAmount: 1250,
      items: [
        { product: { name: 'Aviator Classic', brand: 'Ray-Ban', images: [''] }, quantity: 1, price: 890 },
        { product: { name: 'Case Premium', brand: 'Optic Glass', images: [''] }, quantity: 1, price: 360 },
      ],
      shippingAddress: {
        street: '123 Rue de la Paix',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
      },
      messages: [
        { from: 'client', text: 'Quand est-ce que ma commande sera expédiée ?', date: new Date() }
      ]
    },
    {
      _id: '2',
      orderNumber: 'OG-2024-002',
      user: { firstName: 'Marie', lastName: 'Martin', email: 'marie@example.com' },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'validated',
      totalAmount: 1680,
      items: [
        { product: { name: 'DiorSoReal', brand: 'Dior', images: [''] }, quantity: 1, price: 1680 },
      ],
      shippingAddress: {
        street: '45 Avenue des Champs',
        postalCode: '75008',
        city: 'Paris',
        country: 'France',
      },
      messages: []
    },
    {
      _id: '3',
      orderNumber: 'OG-2024-003',
      user: { firstName: 'Pierre', lastName: 'Durand', email: 'pierre@example.com' },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'shipped',
      totalAmount: 2150,
      items: [
        { product: { name: 'GG0396S', brand: 'Gucci', images: [''] }, quantity: 1, price: 1580 },
        { product: { name: 'Cleaning Kit', brand: 'Optic Glass', images: [''] }, quantity: 1, price: 570 },
      ],
      shippingAddress: {
        street: '78 Boulevard Saint-Germain',
        postalCode: '75006',
        city: 'Paris',
        country: 'France',
      },
      messages: [
        { from: 'client', text: 'Pouvez-vous me donner le numéro de suivi ?', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        { from: 'admin', text: 'Votre numéro de suivi est: TR123456789FR', date: new Date() }
      ]
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders');
      setOrders(response.data.data || []);
    } catch {
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch {
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedOrder) return;

    try {
      await api.post(`/admin/orders/${selectedOrder._id}/message`, { message });
      
      const newMessage = { from: 'admin', text: message, date: new Date() };
      setOrders(orders.map(o => 
        o._id === selectedOrder._id 
          ? { ...o, messages: [...(o.messages || []), newMessage] }
          : o
      ));
      setSelectedOrder({ ...selectedOrder, messages: [...(selectedOrder.messages || []), newMessage] });
      setMessage('');
    } catch {
      alert('Erreur lors de l\'envoi du message');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      validated: 'bg-green-500/20 text-green-400 border-green-500/30',
      shipped: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      delivered: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock size={16} />,
      validated: <CheckCircle size={16} />,
      shipped: <Truck size={16} />,
      delivered: <CheckCircle size={16} />,
      cancelled: <XCircle size={16} />,
    };
    return icons[status] || <Package size={16} />;
  };

  const filteredOrders = orders
    .filter(o => filterStatus === 'all' || o.status === filterStatus)
    .filter(o => 
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                📦 Gestion des Commandes
              </h1>
              <p className="text-white/60 mt-1">
                Gérez vos commandes et communiquez avec vos clients
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-black rounded-lg hover:bg-[#b8912a] font-semibold transition-colors">
              <Download size={20} />
              Exporter
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Rechercher par numéro ou nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227]"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter size={20} className="text-white/60" />
              {['all', 'pending', 'validated', 'shipped', 'delivered'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filterStatus === status
                      ? 'bg-[#c9a227] text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {status === 'all' ? 'Toutes' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {[
              { label: 'Toutes', count: orders.length, color: 'text-white/60', bg: 'bg-white/5', border: 'border-white/10' },
              { label: 'En attente', count: orders.filter(o => o.status === 'pending').length, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
              { label: 'Validées', count: orders.filter(o => o.status === 'validated').length, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
              { label: 'Expédiées', count: orders.filter(o => o.status === 'shipped').length, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
              { label: 'Livrées', count: orders.filter(o => o.status === 'delivered').length, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} border ${stat.border} rounded-lg p-3`}>
                <p className={`text-sm font-medium ${stat.color}`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredOrders.map(order => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-[#111] border rounded-xl overflow-hidden hover:border-[#c9a227]/50 transition-all cursor-pointer ${
                  selectedOrder?._id === order._id ? 'border-[#c9a227]' : 'border-white/10'
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#c9a227]/10 rounded-lg">
                        <Package className="text-[#c9a227]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{order.orderNumber}</h3>
                        <p className="text-sm text-white/60">
                          {order.user.firstName} {order.user.lastName}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#c9a227]">{order.totalAmount} €</p>
                      <p className="text-xs text-white/40">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                    
                    <div className="flex gap-2">
                      {order.messages && order.messages.length > 0 && (
                        <span className="flex items-center gap-1 text-sm text-blue-400">
                          <MessageCircle size={16} />
                          {order.messages.length}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Details Sidebar */}
          {selectedOrder && (
            <div className="lg:col-span-1">
              <div className="bg-[#111] border border-white/10 rounded-xl p-6 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Détails de la Commande
                </h3>

                <div className="space-y-6">
                  {/* Client Info */}
                  <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <p className="text-sm text-white/40 mb-2">Client</p>
                    <p className="font-semibold text-white">
                      {selectedOrder.user.firstName} {selectedOrder.user.lastName}
                    </p>
                    <p className="text-sm text-white/60">{selectedOrder.user.email}</p>
                    <p className="text-sm text-white/60 mt-2">
                      {selectedOrder.shippingAddress.street}<br/>
                      {selectedOrder.shippingAddress.postalCode} {selectedOrder.shippingAddress.city}
                    </p>
                  </div>

                  {/* Items */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Produits</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <div>
                            <p className="text-white">{item.product.name}</p>
                            <p className="text-white/40">{item.quantity}x {item.price} €</p>
                          </div>
                          <p className="text-[#c9a227] font-medium">{item.quantity * item.price} €</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Statut de la commande
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#c9a227]"
                    >
                      <option value="pending">En attente</option>
                      <option value="validated">Validée</option>
                      <option value="shipped">Expédiée</option>
                      <option value="delivered">Livrée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </div>

                  {/* Messages */}
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <MessageCircle size={18} />
                      Messages ({selectedOrder.messages?.length || 0})
                    </h4>
                    
                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
                      {selectedOrder.messages?.map((msg, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg max-w-[85%] ${
                            msg.from === 'admin'
                              ? 'bg-[#c9a227]/20 ml-auto text-right'
                              : 'bg-white/10 mr-auto'
                          }`}
                        >
                          <p className="text-xs font-bold mb-1 text-white/60">
                            {msg.from === 'admin' ? 'Vous' : 'Client'}
                          </p>
                          <p className="text-sm text-white">{msg.text}</p>
                          <p className="text-[10px] text-white/30 mt-1">
                            {new Date(msg.date).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Répondre..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 bg-[#0a0a0a] border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#c9a227] text-sm"
                      />
                      <button
                        onClick={sendMessage}
                        className="p-2 bg-[#c9a227] text-black rounded-lg hover:bg-[#b8912a] transition-colors"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersManagement;
