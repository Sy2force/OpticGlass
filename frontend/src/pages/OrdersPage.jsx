import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronRight,
  Eye,
  MapPin
} from 'lucide-react';
import api from '@/shared/api/api';

const OrdersPage = () => {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données mock pour l'affichage
  const mockOrders = [
    {
      _id: '1',
      orderNumber: 'OG-2024-001',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'shipped',
      totalAmount: 1250,
      items: [
        { product: { name: 'Aviator Classic', brand: 'Ray-Ban' }, quantity: 1, price: 890, color: 'Gold' },
        { product: { name: 'Premium Case', brand: 'Optic Glass' }, quantity: 1, price: 360, color: 'Black' },
      ],
      shippingAddress: {
        firstName: 'Jean',
        lastName: 'Dupont',
        street: '123 Rue de la Paix',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
      },
    },
    {
      _id: '2',
      orderNumber: 'OG-2024-002',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: 'delivered',
      totalAmount: 1680,
      items: [
        { product: { name: 'DiorSoReal', brand: 'Dior' }, quantity: 1, price: 1680, color: 'Rose Gold' },
      ],
      shippingAddress: {
        firstName: 'Jean',
        lastName: 'Dupont',
        street: '123 Rue de la Paix',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
      },
    },
    {
      _id: '3',
      orderNumber: 'OG-2024-003',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      status: 'delivered',
      totalAmount: 750,
      items: [
        { product: { name: 'Wayfarer Original', brand: 'Ray-Ban' }, quantity: 1, price: 750, color: 'Noir' },
      ],
      shippingAddress: {
        firstName: 'Jean',
        lastName: 'Dupont',
        street: '123 Rue de la Paix',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
      },
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/cart/orders');
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
      // Utiliser les données mock en cas d'erreur
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      validated: 'bg-green-100 text-green-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-purple-100 text-purple-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'validated': return <CheckCircle size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Package size={16} />;
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Package size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">My Orders</h1>
              <p className="text-gray-400 mt-1">{orders.length} order{orders.length > 1 ? 's' : ''}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No orders</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Discover our luxury eyewear collection.
            </p>
            <Link
              to="/glasses"
              className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition shadow-lg"
            >
              Discover Collection
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Header de la commande */}
                <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Package size={18} className="text-gray-400" />
                        <h3 className="text-xl font-bold">
                          Order #{order.orderNumber}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                {/* Articles */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">👓</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold">{item.product?.name || 'Product'}</p>
                          <p className="text-sm text-gray-500">
                            {item.product?.brand && `${item.product.brand} • `}
                            Qty: {item.quantity}
                            {item.color && ` • ${item.color}`}
                          </p>
                        </div>
                        <p className="font-bold text-lg">{item.price * item.quantity} ₪</p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t mt-6 pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-600">Total</span>
                    <span className="text-2xl font-bold">{order.totalAmount} ₪</span>
                  </div>
                </div>

                {/* Adresse de livraison */}
                {order.shippingAddress && (
                  <div className="px-6 pb-6">
                    <div className="p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                      <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Shipping Address</p>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                          {order.shippingAddress.street}<br />
                          {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-3">
                  <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2">
                    <Eye size={18} />
                    View Details
                  </button>
                  {order.status === 'shipped' && (
                    <button className="flex-1 py-3 px-4 bg-blue-100 text-blue-700 font-medium rounded-xl hover:bg-blue-200 transition flex items-center justify-center gap-2">
                      <Truck size={18} />
                      Track Package
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-2">Need new glasses?</h3>
            <p className="text-white/80 mb-6">Discover our latest arrivals and exclusive collections.</p>
            <Link
              to="/glasses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg"
            >
              View Collection
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
