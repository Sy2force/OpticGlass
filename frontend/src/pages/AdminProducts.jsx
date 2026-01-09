import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Trash2, Edit, Plus, Search, Filter } from 'lucide-react';
import api from '@/shared/api/api';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setActionLoading(productId);
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      alert('Error deleting product');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Products Management</h1>
            <p className="text-white/60">Manage your catalog and stock</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227] transition-colors"
              />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-black rounded-xl font-bold hover:bg-[#b8912a] transition-colors shadow-lg shadow-[#c9a227]/20">
              <Plus size={20} />
              <span className="hidden sm:inline">Add Product</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#c9a227]/30 transition-all group"
            >
              <div className="relative aspect-[4/3] bg-white p-4">
                <img 
                  src={product.images?.[0] || product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    to={`/glasses/${product._id}`}
                    className="p-2 bg-white/90 backdrop-blur rounded-lg text-black hover:bg-[#c9a227] transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <button 
                    onClick={() => handleDeleteProduct(product._id)}
                    disabled={actionLoading === product._id}
                    className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-white/40 text-xs font-bold tracking-wider uppercase">{product.brand}</p>
                    <h3 className="text-white font-bold truncate pr-4">{product.name}</h3>
                  </div>
                  <span className="text-[#c9a227] font-bold">{product.price} €</span>
                </div>
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-white/60 text-sm">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="ml-auto text-white/40 text-sm">
                    {product.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
