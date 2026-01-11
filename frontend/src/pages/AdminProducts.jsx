import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Trash2, Edit, Plus, Search, X, Save, Upload, Check, AlertCircle } from 'lucide-react';
import api from '@/shared/api/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'sunglasses',
    price: '',
    originalPrice: '',
    description: '',
    shortDescription: '',
    gender: 'unisex',
    season: 'all',
    material: '',
    frameShape: '',
    colors: '',
    stock: 50,
    discount: 0,
    isNewArrival: false,
    isFeatured: false,
    isBestseller: false,
    warranty: '2 ans',
    madeIn: '',
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products?limit=1000'); // Get all products
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
        name: product.name || '',
        brand: product.brand || '',
        category: product.category || 'sunglasses',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        gender: product.gender || 'unisex',
        season: product.season || 'all',
        material: product.material || '',
        frameShape: product.frameShape || '',
        colors: product.colors?.join(', ') || '',
        stock: product.stock || 0,
        discount: product.discount || 0,
        isNewArrival: product.isNewArrival || false,
        isFeatured: product.isFeatured || false,
        isBestseller: product.isBestseller || false,
        warranty: product.warranty || '2 ans',
        madeIn: product.madeIn || '',
        image: product.images?.[0] || product.image || ''
      });
      setImagePreview(product.images?.[0] || product.image || '');
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '',
        brand: '',
        category: 'sunglasses',
        price: '',
        originalPrice: '',
        description: '',
        shortDescription: '',
        gender: 'unisex',
        season: 'all',
        material: '',
        frameShape: '',
        colors: '',
        stock: 50,
        discount: 0,
        isNewArrival: false,
        isFeatured: false,
        isBestseller: false,
        warranty: '2 ans',
        madeIn: '',
        image: ''
      });
      setImagePreview('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
    setImageFile(null);
    setImagePreview('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading('save');
    
    try {
      let imageUrl = formData.image;

      // Handle Image Upload if file selected
      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', imageFile);
        
        const uploadRes = await api.post('/upload', uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        // Construct full URL
        const relativePath = uploadRes.data.image;
        imageUrl = `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3005'}${relativePath}`;
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        description: formData.description,
        shortDescription: formData.shortDescription,
        gender: formData.gender,
        season: formData.season,
        material: formData.material,
        frameShape: formData.frameShape,
        colors: formData.colors ? formData.colors.split(',').map(c => c.trim()).filter(Boolean) : [],
        stock: Number(formData.stock),
        discount: Number(formData.discount) || 0,
        isNewArrival: formData.isNewArrival,
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        warranty: formData.warranty,
        madeIn: formData.madeIn,
        images: imageUrl ? [imageUrl] : [],
        image: imageUrl
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
                  <span className="text-[#c9a227] font-bold">{product.price} ₪</span>
                </div>
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                  <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-white/60 text-sm">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
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
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Name *</label>
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
                      <label className="text-sm font-medium text-white/70">Brand *</label>
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
                      <label className="text-sm font-medium text-white/70">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                      >
                        <option value="sunglasses">Sunglasses</option>
                        <option value="optical">Optical</option>
                        <option value="sport">Sport</option>
                        <option value="vintage">Vintage</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                      >
                        <option value="unisex">Unisex</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Season</label>
                      <select
                        name="season"
                        value={formData.season}
                        onChange={handleInputChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                      >
                        <option value="all">All Seasons</option>
                        <option value="summer">Summer</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="fall">Fall</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Frame Shape</label>
                      <input
                        type="text"
                        name="frameShape"
                        value={formData.frameShape}
                        onChange={handleInputChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="e.g. Aviator, Round, Square"
                      />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Price (₪) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="199.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Original Price (₪)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="249.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Discount (%)</label>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="50"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Material</label>
                      <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleInputChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="e.g. Acetate, Metal, Titanium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Colors (comma separated)</label>
                      <input
                        type="text"
                        name="colors"
                        value={formData.colors}
                        onChange={handleInputChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="e.g. Black, Gold, Brown"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Made In</label>
                      <input
                        type="text"
                        name="madeIn"
                        value={formData.madeIn}
                        onChange={handleInputChange}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                        placeholder="e.g. Italy, France"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Short Description</label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                      placeholder="Brief product summary..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Full Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                      placeholder="Detailed product description..."
                    />
                  </div>

                  {/* Image */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Product Image</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                            <Upload size={20} className="text-[#c9a227]" />
                            <span className="text-sm font-medium text-white">Upload Image</span>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                        <span className="text-white/40 text-sm">or enter URL below</span>
                    </div>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c9a227] focus:outline-none transition-colors"
                      placeholder="https://..."
                    />
                    {imagePreview && (
                      <div className="mt-2 relative w-full h-40 bg-white rounded-lg overflow-hidden border border-white/10 group">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-contain"
                          onError={(e) => e.target.style.display = 'none'} 
                        />
                      </div>
                    )}
                  </div>

                  {/* Flags */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#111] rounded-lg border border-white/10">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isNewArrival"
                        checked={formData.isNewArrival}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded border-gray-600 text-[#c9a227] focus:ring-[#c9a227]"
                      />
                      <span className="text-white text-sm">New Arrival</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded border-gray-600 text-[#c9a227] focus:ring-[#c9a227]"
                      />
                      <span className="text-white text-sm">Featured</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isBestseller"
                        checked={formData.isBestseller}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded border-gray-600 text-[#c9a227] focus:ring-[#c9a227]"
                      />
                      <span className="text-white text-sm">Bestseller</span>
                    </label>
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
