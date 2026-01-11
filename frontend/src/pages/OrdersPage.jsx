import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronRight,
  Eye,
  MapPin,
  X,
  Calendar,
  CreditCard,
  Phone,
  RefreshCw,
  Filter,
  ShoppingBag,
  Receipt,
  AlertCircle,
  Download,
  Star,
  Search,
  Copy,
  Glasses,
  CheckCheck,
  Ban,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Printer,
  RotateCcw,
  Shield,
  Award,
  Heart
} from 'lucide-react';
import api from '@/shared/api/api';
import { useTheme } from '@/app/providers/ThemeContext';

const OrdersPage = () => {
  const { isDarkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const statusFilters = [
    { key: 'all', label: 'All', icon: Package, color: 'bg-gray-500' },
    { key: 'pending', label: 'Pending', icon: Clock, color: 'bg-yellow-500' },
    { key: 'validated', label: 'Confirmed', icon: CheckCircle, color: 'bg-green-500' },
    { key: 'shipped', label: 'Shipped', icon: Truck, color: 'bg-blue-500' },
    { key: 'delivered', label: 'Delivered', icon: CheckCheck, color: 'bg-purple-500' },
    { key: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'bg-red-500' },
  ];

  const cancelReasons = [
    'Changed my mind',
    'Found a better price elsewhere',
    'Ordered by mistake',
    'Delivery time too long',
    'Other reason'
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = [...orders];
    
    // Filter by status
    if (activeFilter !== 'all') {
      result = result.filter(order => order.status === activeFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.orderNumber?.toLowerCase().includes(term) ||
        order.items?.some(item => item.product?.name?.toLowerCase().includes(term)) ||
        order.items?.some(item => item.product?.brand?.toLowerCase().includes(term))
      );
    }
    
    // Sort orders
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.totalAmount - b.totalAmount);
    }
    
    setFilteredOrders(result);
  }, [activeFilter, orders, searchTerm, sortBy]);

  const sampleOrders = [
    {
      _id: '1',
      orderNumber: 'OG-2024-001',
      createdAt: new Date(),
      status: 'pending',
      totalAmount: 1250,
      items: [
        { product: { _id: 'p1', name: 'Aviator Classic', brand: 'Soléra', images: ['/images/products/optical-01.jpg'] }, quantity: 1, price: 890 },
        { product: { _id: 'p2', name: 'Round Vintage', brand: 'Optic Glass', images: ['/images/products/optical-02.jpg'] }, quantity: 1, price: 360 },
      ],
      shippingAddress: { firstName: 'Jean', lastName: 'Dupont', street: '123 Rue de la Paix', postalCode: '75001', city: 'Paris', country: 'France', phone: '+33 6 12 34 56 78' },
    },
    {
      _id: '2',
      orderNumber: 'OG-2024-002',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'shipped',
      totalAmount: 1680,
      items: [
        { product: { _id: 'p3', name: 'Lumina SoReal', brand: 'Lumina', images: ['/images/products/sun-01.jpg'] }, quantity: 1, price: 1680 },
      ],
      shippingAddress: { firstName: 'Jean', lastName: 'Dupont', street: '123 Rue de la Paix', postalCode: '75001', city: 'Paris', country: 'France', phone: '+33 6 12 34 56 78' },
    },
    {
      _id: '3',
      orderNumber: 'OG-2024-003',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: 'delivered',
      totalAmount: 2150,
      items: [
        { product: { _id: 'p4', name: 'Aurélia GG', brand: 'Aurélia', images: ['/images/products/optical-05.jpg'] }, quantity: 1, price: 1580 },
        { product: { _id: 'p5', name: 'Cat Eye Elite', brand: 'Optic Glass', images: ['/images/products/optical-08.jpg'] }, quantity: 1, price: 570 },
      ],
      shippingAddress: { firstName: 'Jean', lastName: 'Dupont', street: '123 Rue de la Paix', postalCode: '75001', city: 'Paris', country: 'France', phone: '+33 6 12 34 56 78' },
    },
    {
      _id: '4',
      orderNumber: 'OG-2024-004',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: 'delivered',
      totalAmount: 890,
      reviewed: true,
      items: [
        { product: { _id: 'p6', name: 'Zenith Pro', brand: 'Zenith', images: ['/images/products/sun-05.jpg'] }, quantity: 1, price: 890 },
      ],
      shippingAddress: { firstName: 'Jean', lastName: 'Dupont', street: '123 Rue de la Paix', postalCode: '75001', city: 'Paris', country: 'France', phone: '+33 6 12 34 56 78' },
    },
  ];

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/orders/my-orders');
      if (response.data.data && response.data.data.length > 0) {
        setOrders(response.data.data);
      } else {
        setOrders(sampleOrders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      // Use sample data as fallback
      setOrders(sampleOrders);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelOrder || !cancelReason) return;
    
    setCancelLoading(true);
    try {
      await api.patch(`/orders/${cancelOrder._id}/cancel`, { reason: cancelReason });
      setOrders(orders.map(o => 
        o._id === cancelOrder._id ? { ...o, status: 'cancelled' } : o
      ));
      setShowCancelModal(false);
      setCancelOrder(null);
      setCancelReason('');
    } catch (error) {
      console.error('Error cancelling order:', error);
      // Still update locally for demo
      setOrders(orders.map(o => 
        o._id === cancelOrder._id ? { ...o, status: 'cancelled' } : o
      ));
      setShowCancelModal(false);
      setCancelOrder(null);
      setCancelReason('');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewOrder) return;
    
    setReviewLoading(true);
    try {
      await api.post(`/orders/${reviewOrder._id}/review`, { 
        rating: reviewRating, 
        comment: reviewText 
      });
      setOrders(orders.map(o => 
        o._id === reviewOrder._id ? { ...o, reviewed: true } : o
      ));
      setShowReviewModal(false);
      setReviewOrder(null);
      setReviewRating(5);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
      // Still update locally for demo
      setOrders(orders.map(o => 
        o._id === reviewOrder._id ? { ...o, reviewed: true } : o
      ));
      setShowReviewModal(false);
      setReviewOrder(null);
      setReviewRating(5);
      setReviewText('');
    } finally {
      setReviewLoading(false);
    }
  };

  const copyOrderNumber = (orderNumber) => {
    navigator.clipboard.writeText(orderNumber);
    setCopiedOrderId(orderNumber);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const generateInvoice = (order) => {
    setInvoiceOrder(order);
    setShowInvoiceModal(true);
  };

  const downloadInvoice = () => {
    // Create a simple invoice content
    const invoice = `
OPTIC GLASS - INVOICE
=====================

Order Number: ${invoiceOrder.orderNumber}
Date: ${formatDate(invoiceOrder.createdAt)}

ITEMS:
${invoiceOrder.items.map(item => 
  `- ${item.product?.name || 'Product'} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} ₪`
).join('\n')}

Subtotal: ${invoiceOrder.totalAmount.toLocaleString()} ₪
Shipping: Free
-----------------------
TOTAL: ${invoiceOrder.totalAmount.toLocaleString()} ₪

Shipping Address:
${invoiceOrder.shippingAddress?.firstName} ${invoiceOrder.shippingAddress?.lastName}
${invoiceOrder.shippingAddress?.street}
${invoiceOrder.shippingAddress?.postalCode} ${invoiceOrder.shippingAddress?.city}

Thank you for your purchase!
www.opticglass.com
    `;
    
    const blob = new Blob([invoice], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceOrder.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowInvoiceModal(false);
  };

  const getOrderStats = () => {
    const total = orders.length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    return { total, delivered, pending, totalSpent };
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      validated: 'bg-green-100 text-green-800 border-green-200',
      shipped: 'bg-blue-100 text-blue-800 border-blue-200',
      delivered: 'bg-purple-100 text-purple-800 border-purple-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status, size = 16) => {
    switch (status) {
      case 'pending': return <Clock size={size} />;
      case 'validated': return <CheckCircle size={size} />;
      case 'shipped': return <Truck size={size} />;
      case 'delivered': return <CheckCircle size={size} />;
      case 'cancelled': return <XCircle size={size} />;
      default: return <Package size={size} />;
    }
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pending',
      validated: 'Validated',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return texts[status] || status;
  };

  const getProductImage = (item) => {
    if (item.product?.images && item.product.images.length > 0) {
      const img = item.product.images[0];
      if (img.startsWith('http')) return img;
      return `/images/products/${img}`;
    }
    return null;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTrackingSteps = (order) => {
    const steps = [
      { status: 'pending', label: 'Order Placed', description: 'Your order has been received' },
      { status: 'validated', label: 'Order Confirmed', description: 'Payment verified and order confirmed' },
      { status: 'shipped', label: 'Shipped', description: 'Your order is on its way' },
      { status: 'delivered', label: 'Delivered', description: 'Order delivered successfully' },
    ];

    const statusOrder = ['pending', 'validated', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex && order.status !== 'cancelled',
      current: index === currentIndex && order.status !== 'cancelled',
    }));
  };

  const openTrackingModal = (order) => {
    setTrackingOrder(order);
    setShowTrackingModal(true);
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227] mx-auto mb-4"></div>
          <p className="text-white/60">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#c9a227] selection:text-black ${
      isDarkMode 
        ? 'bg-[#0a0a0a] text-white' 
        : 'bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 text-gray-900'
    }`}>
      {/* Hero Header - Same style as Favorites */}
      <div className="relative h-[40vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-b from-black/40 via-black/60 to-[#0a0a0a]' 
              : 'bg-gradient-to-b from-stone-800/60 via-stone-700/50 to-stone-100'
          }`} />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a227]" />
              <span className="text-[#c9a227] uppercase tracking-[0.3em] text-xs font-medium">Order History</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              My <span className="font-serif italic text-[#c9a227]">Orders</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {orders.length === 0 
                ? 'Your order history will appear here'
                : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} • ${stats.totalSpent.toLocaleString()} ₪ total spent`
              }
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              isDarkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
            }`}
          >
            <AlertCircle className="text-red-400" size={20} />
            <p className={isDarkMode ? 'text-red-400' : 'text-red-600'}>{error}</p>
            <button
              onClick={fetchOrders}
              className="ml-auto text-red-400 hover:text-red-300 font-medium"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Stats Cards - Only show when there are orders */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 -mt-16 relative z-20"
          >
            {[
              { label: 'Total Orders', value: stats.total, icon: Package },
              { label: 'Delivered', value: stats.delivered, icon: CheckCheck },
              { label: 'In Progress', value: stats.pending, icon: Clock },
              { label: 'Total Spent', value: `${stats.totalSpent.toLocaleString()} ₪`, icon: CreditCard },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`rounded-xl p-5 border transition-all group ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10 hover:border-[#c9a227]/30' 
                    : 'bg-white border-gray-200 hover:border-[#c9a227]/50 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon size={20} className="text-[#c9a227]" />
                </div>
                <p className={`text-2xl md:text-3xl font-bold group-hover:text-[#c9a227] transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Search & Filters Bar */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col md:flex-row items-center justify-between pb-8 border-b mb-8 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div>
              <h2 className="text-2xl font-light tracking-tight">
                Order <span className="font-serif italic text-[#c9a227]">History</span>
              </h2>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} size={18} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-[#c9a227] transition-colors ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 text-white placeholder-white/40' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
              
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`appearance-none pl-4 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-[#c9a227] transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="newest" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Newest</option>
                  <option value="oldest" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Oldest</option>
                  <option value="price-high" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Highest</option>
                  <option value="price-low" className={isDarkMode ? 'bg-[#1a1a1a]' : ''}>Lowest</option>
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} size={16} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Status Filters */}
        {orders.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {statusFilters.map((filter) => {
              const Icon = filter.icon;
              const count = filter.key === 'all' 
                ? orders.length 
                : orders.filter(o => o.status === filter.key).length;
              
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                    activeFilter === filter.key
                      ? 'bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black'
                      : isDarkMode 
                        ? 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {filter.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeFilter === filter.key
                      ? 'bg-black/20 text-black'
                      : isDarkMode ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && !error ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-white/5 to-white/10 border-white/10' 
                : 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300'
            }`}>
              <Package size={56} className={isDarkMode ? 'text-white/30' : 'text-amber-400'} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
              No Orders <span className="font-serif italic text-[#c9a227]">Yet</span>
            </h2>
            
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto my-6" />
            
            <p className={`mb-12 max-w-lg mx-auto text-lg font-light leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>
              Start your journey with our exclusive eyewear collection. Your orders will appear here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/glasses"
                className="px-8 py-4 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black font-medium tracking-wider uppercase text-sm hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] transition-all duration-300"
              >
                Explore Collection
              </Link>
              <Link
                to="/sunglasses"
                className={`px-8 py-4 border font-medium tracking-wider uppercase text-sm transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-white/20 text-white hover:bg-white/5 hover:border-white/40' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                View Sunglasses
              </Link>
            </div>
          </motion.div>
        ) : filteredOrders.length === 0 && (activeFilter !== 'all' || searchTerm) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
            <p className={`text-lg ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>No orders found</p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
              {searchTerm ? `No results for "${searchTerm}"` : `No orders with status "${getStatusText(activeFilter)}"`}
            </p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchTerm(''); }}
              className={`mt-6 px-6 py-3 border font-medium transition-all ${
                isDarkMode 
                  ? 'border-white/20 text-white hover:bg-white/5' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            {/* Orders Grid */}
            <div className="space-y-6">
              <AnimatePresence>
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group rounded-xl border overflow-hidden transition-all ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111] border-white/10 hover:border-[#c9a227]/30' 
                        : 'bg-white border-gray-200 hover:border-[#c9a227]/50 shadow-lg'
                    }`}
                  >
                    {/* Order Header */}
                    <div className={`p-5 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-[#c9a227] text-xs font-semibold uppercase tracking-wider">Order</p>
                            <button
                              onClick={() => copyOrderNumber(order.orderNumber)}
                              className={`p-1 rounded transition ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                              title="Copy order number"
                            >
                              {copiedOrderId === order.orderNumber ? (
                                <CheckCheck size={14} className="text-green-500" />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                          </div>
                          <h3 className={`font-medium text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            #{order.orderNumber}
                          </h3>
                          <div className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status, 14)}
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-5">
                      <div className="space-y-3">
                        {order.items.slice(0, expandedOrder === order._id ? undefined : 2).map((item, idx) => (
                          <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg transition ${
                            isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                          }`}>
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100">
                              {getProductImage(item) ? (
                                <img
                                  src={getProductImage(item)}
                                  alt={item.product?.name || 'Product'}
                                  className="w-full h-full object-contain p-1"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <Glasses size={24} className="text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link 
                                to={`/glasses/${item.product?._id}`}
                                className={`font-medium hover:text-[#c9a227] transition truncate block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                              >
                                {item.product?.name || 'Product'}
                              </Link>
                              <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                {item.product?.brand && <span className="text-[#c9a227]">{item.product.brand}</span>}
                                {item.product?.brand && ' • '}
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className={`font-bold whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {(item.price * item.quantity).toLocaleString()} ₪
                            </p>
                          </div>
                        ))}
                        {order.items.length > 2 && expandedOrder !== order._id && (
                          <button
                            onClick={() => setExpandedOrder(order._id)}
                            className="w-full py-2 text-[#c9a227] text-sm font-medium hover:underline"
                          >
                            + {order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                          </button>
                        )}
                      </div>

                      {/* Order Total */}
                      <div className={`flex justify-between items-center mt-4 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                        <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items • Free shipping
                        </span>
                        <div className="text-right">
                          <span className={`text-sm ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Total</span>
                          <p className="text-xl font-bold text-[#c9a227]">{order.totalAmount.toLocaleString()} ₪</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`px-5 pb-5 flex flex-wrap gap-2`}>
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border hover:bg-[#c9a227] hover:text-black hover:border-[#c9a227] transition-all font-medium text-sm uppercase tracking-wider ${
                          isDarkMode ? 'bg-white/5 text-white border-white/10' : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        <Eye size={16} />
                        Details
                      </button>
                      
                      {(order.status === 'shipped' || order.status === 'validated' || order.status === 'delivered') && (
                        <button 
                          onClick={() => openTrackingModal(order)}
                          className={`flex items-center justify-center gap-2 px-4 py-2.5 border hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all font-medium text-sm uppercase tracking-wider ${
                            isDarkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}
                        >
                          <Truck size={16} />
                          Track
                        </button>
                      )}
                      
                      <button 
                        onClick={() => generateInvoice(order)}
                        className={`flex items-center justify-center gap-2 px-4 py-2.5 border transition-all font-medium text-sm uppercase tracking-wider ${
                          isDarkMode ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <Download size={16} />
                      </button>
                      
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => { setCancelOrder(order); setShowCancelModal(true); }}
                          className={`flex items-center justify-center gap-2 px-4 py-2.5 border hover:bg-red-500 hover:text-white hover:border-red-500 transition-all font-medium text-sm uppercase tracking-wider ${
                            isDarkMode ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-red-50 text-red-600 border-red-200'
                          }`}
                        >
                          <Ban size={16} />
                        </button>
                      )}
                      
                      {order.status === 'delivered' && !order.reviewed && (
                        <button 
                          onClick={() => { setReviewOrder(order); setShowReviewModal(true); }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black border border-[#c9a227] transition-all font-medium text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(201,162,39,0.3)]"
                        >
                          <Star size={16} />
                          Review
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-8" />
              
              <h3 className="text-2xl font-light tracking-tight mb-4">
                Discover <span className="font-serif italic text-[#c9a227]">More</span>
              </h3>
              <p className={`mb-8 max-w-md mx-auto font-light ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>
                Explore our complete collection of premium eyewear.
              </p>
              <Link
                to="/glasses"
                className={`inline-flex items-center gap-2 px-8 py-4 border font-medium tracking-wider uppercase text-sm transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-white/20 text-white hover:bg-white/5 hover:border-white/40' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                View Full Collection
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </>
        )}

      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-gray-500">#{selectedOrder.orderNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Status</p>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p className="font-semibold">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Package size={18} />
                    Items ({selectedOrder.items.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                          {getProductImage(item) ? (
                            <img
                              src={getProductImage(item)}
                              alt={item.product?.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <Glasses size={24} className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{item.product?.name || 'Product'}</p>
                          <p className="text-sm text-gray-500">
                            {item.product?.brand} • Qty: {item.quantity}
                            {item.color && ` • ${item.color}`}
                          </p>
                        </div>
                        <p className="font-bold">{(item.price * item.quantity).toLocaleString()} ₪</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <CreditCard size={18} />
                    Payment Summary
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>{selectedOrder.totalAmount.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{selectedOrder.totalAmount.toLocaleString()} ₪</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {selectedOrder.shippingAddress && (
                  <div>
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <MapPin size={18} />
                      Shipping Address
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="font-semibold">
                        {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                      </p>
                      <p className="text-gray-600 mt-1">
                        {selectedOrder.shippingAddress.street}<br />
                        {selectedOrder.shippingAddress.postalCode} {selectedOrder.shippingAddress.city}
                        {selectedOrder.shippingAddress.country && <>, {selectedOrder.shippingAddress.country}</>}
                      </p>
                      {selectedOrder.shippingAddress.phone && (
                        <p className="text-gray-500 mt-2 flex items-center gap-1">
                          <Phone size={14} />
                          {selectedOrder.shippingAddress.phone}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t p-6 flex gap-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
                >
                  Close
                </button>
                {(selectedOrder.status === 'shipped' || selectedOrder.status === 'validated') && (
                  <button
                    onClick={() => {
                      setSelectedOrder(null);
                      openTrackingModal(selectedOrder);
                    }}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Truck size={18} />
                    Track Order
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tracking Modal */}
      <AnimatePresence>
        {showTrackingModal && trackingOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTrackingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="border-b p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Track Order</h2>
                  <p className="text-gray-500">#{trackingOrder.orderNumber}</p>
                </div>
                <button
                  onClick={() => setShowTrackingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Tracking Timeline */}
              <div className="p-6">
                {trackingOrder.status === 'cancelled' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <XCircle size={32} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-red-600 mb-2">Order Cancelled</h3>
                    <p className="text-gray-500">This order has been cancelled.</p>
                  </div>
                ) : (
                  <div className="relative">
                    {getTrackingSteps(trackingOrder).map((step, index, arr) => (
                      <div key={step.status} className="flex gap-4 pb-8 last:pb-0">
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-400'
                          } ${step.current ? 'ring-4 ring-green-200' : ''}`}>
                            {step.completed ? (
                              <CheckCircle size={20} />
                            ) : (
                              getStatusIcon(step.status, 20)
                            )}
                          </div>
                          {index < arr.length - 1 && (
                            <div className={`w-0.5 flex-1 mt-2 ${
                              step.completed && arr[index + 1].completed
                                ? 'bg-green-500'
                                : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                        {/* Content */}
                        <div className="flex-1 pb-2">
                          <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </p>
                          <p className={`text-sm ${step.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                            {step.description}
                          </p>
                          {step.current && (
                            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Current Status
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t p-6">
                <button
                  onClick={() => setShowTrackingModal(false)}
                  className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Order Modal */}
      <AnimatePresence>
        {showCancelModal && cancelOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Ban size={24} className="text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Cancel Order</h2>
                    <p className="text-white/50 text-sm">#{cancelOrder.orderNumber}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-white/70">
                  Are you sure you want to cancel this order? This action cannot be undone.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Reason for cancellation
                  </label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500 transition"
                  >
                    <option value="" className="bg-[#1a1a1a]">Select a reason...</option>
                    {cancelReasons.map(reason => (
                      <option key={reason} value={reason} className="bg-[#1a1a1a]">{reason}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => { setShowCancelModal(false); setCancelOrder(null); setCancelReason(''); }}
                  className="flex-1 py-3 px-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={!cancelReason || cancelLoading}
                  className="flex-1 py-3 px-4 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {cancelLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Ban size={18} />
                      Cancel Order
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && reviewOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c9a227]/20 rounded-xl flex items-center justify-center">
                    <Star size={24} className="text-[#c9a227]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Rate Your Order</h2>
                    <p className="text-white/50 text-sm">#{reviewOrder.orderNumber}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Star Rating */}
                <div className="text-center">
                  <p className="text-white/70 mb-4">How was your experience?</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setReviewRating(star)}
                        className="p-1"
                      >
                        <Star
                          size={36}
                          className={`transition-colors ${
                            star <= reviewRating
                              ? 'text-[#c9a227] fill-[#c9a227]'
                              : 'text-white/20'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-[#c9a227] font-medium mt-2">
                    {reviewRating === 5 ? 'Excellent!' : reviewRating === 4 ? 'Very Good' : reviewRating === 3 ? 'Good' : reviewRating === 2 ? 'Fair' : 'Poor'}
                  </p>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Share your thoughts (optional)
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227] transition resize-none"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => { setShowReviewModal(false); setReviewOrder(null); setReviewRating(5); setReviewText(''); }}
                  className="flex-1 py-3 px-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={reviewLoading}
                  className="flex-1 py-3 px-4 bg-[#c9a227] text-black font-medium rounded-xl hover:bg-[#d4af37] transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {reviewLoading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Star size={18} />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice Modal */}
      <AnimatePresence>
        {showInvoiceModal && invoiceOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInvoiceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Invoice Header */}
              <div className="p-6 border-b bg-gradient-to-r from-[#c9a227] to-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-black">INVOICE</h1>
                    <p className="text-black/70">Optic Glass</p>
                  </div>
                  <div className="text-right">
                    <p className="text-black font-mono font-bold">#{invoiceOrder.orderNumber}</p>
                    <p className="text-black/70 text-sm">{formatDate(invoiceOrder.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Content */}
              <div className="p-6 space-y-6">
                {/* Bill To */}
                {invoiceOrder.shippingAddress && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bill To</h3>
                    <p className="font-semibold text-gray-900">
                      {invoiceOrder.shippingAddress.firstName} {invoiceOrder.shippingAddress.lastName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {invoiceOrder.shippingAddress.street}<br />
                      {invoiceOrder.shippingAddress.postalCode} {invoiceOrder.shippingAddress.city}
                    </p>
                  </div>
                )}

                {/* Items */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items</h3>
                  <div className="space-y-3">
                    {invoiceOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">{item.product?.name || 'Product'}</p>
                          <p className="text-sm text-gray-500">
                            {item.product?.brand} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()} ₪</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{invoiceOrder.totalAmount.toLocaleString()} ₪</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">VAT (17%)</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#c9a227]">{invoiceOrder.totalAmount.toLocaleString()} ₪</span>
                  </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-400 text-xs">
                  Thank you for shopping with Optic Glass!<br />
                  www.opticglass.com • contact@opticglass.com
                </p>
              </div>

              {/* Actions */}
              <div className="p-6 border-t flex gap-3">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
                >
                  Close
                </button>
                <button
                  onClick={downloadInvoice}
                  className="flex-1 py-3 px-4 bg-[#c9a227] text-black font-medium rounded-xl hover:bg-[#d4af37] transition flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
                >
                  <Printer size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersPage;
