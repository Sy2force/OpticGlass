import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Trash2, Edit, Plus, Search, X, Save, Upload, Check } from 'lucide-react';
import api from '@/shared/api/api';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'soleil',
    price: '',
    description: '',
    inStock: true,
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products?limit=100'); // Get more products for admin
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        description: product.description || '',
        inStock: product.inStock,
        image: product.images?.[0] || product.image || ''
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '',
        brand: '',
        category: 'soleil',
        price: '',
        description: '',
        inStock: true,
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading('save');
    
    try {
      // Préparer les données
      const productData = {
        ...formData,
        price: Number(formData.price),
        images: formData.image ? [formData.image] : []
      };

      if (currentProduct) {
        // Update
        const response = await api.put(`/products/${currentProduct._id}`, productData);
        setProducts(products.map(p => p._id === currentProduct._id ? response.data.data : p));
      } else {
        // Create
        const response = await api.post('/products', productData);
        setProducts([response.data.data, ...products]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Error saving product');
    } finally {
      setActionLoading(null);
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
      <div className="h-96 flex items-center justify-center">
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
            
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-black rounded-xl font-bold hover:bg-[#b8912a] transition-colors shadow-lg shadow-[#c9a227]/20"
            >
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
                  src={product.images?.[0] || product.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(product)}
                    className="p-2 bg-white/90 backdrop-blur rounded-lg text-black hover:bg-[#c9a227] transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product._id)}
                    disabled={actionLoading === product._id}
                    className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    {actionLoading === product._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                    ) : (
                      <Trash2 size={16} />
                    )}
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
                  <span className="ml-auto text-white/40 text-sm capitalize">
                    {product.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Add/Edit */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 p-6 flex justify-between items-center z-10">
                  <h2 className="text-2xl font-bold text-white">
                    {currentProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button onClick={handleCloseModal} className="text-white/60 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="e.g. Aviator Classic"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="e.g. Ray-Ban"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                      >
                        <option value="soleil">Soleil</option>
                        <option value="vue">Vue</option>
                        <option value="sport">Sport</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Price (€)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                      placeholder="Product description..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    {formData.image && (
                      <div className="mt-2 relative w-full h-40 bg-white rounded-lg overflow-hidden border border-white/10">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-contain"
                          onError={(e) => e.target.style.display = 'none'} 
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-[#111] rounded-lg border border-white/10">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-gray-600 text-[#c9a227] focus:ring-[#c9a227]"
                    />
                    <label className="text-white font-medium">Available in Stock</label>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-3 rounded-xl font-bold text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading === 'save'}
                      className="flex items-center gap-2 px-8 py-3 bg-[#c9a227] text-black rounded-xl font-bold hover:bg-[#b8912a] transition-colors shadow-lg shadow-[#c9a227]/20 disabled:opacity-50"
                    >
                      {actionLoading === 'save' ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
                      ) : (
                        <Save size={20} />
                      )}
                      Save Product
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminProducts;
