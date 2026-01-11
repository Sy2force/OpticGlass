import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Check, ShoppingCart } from 'lucide-react';
import api from '@/shared/api/api';

const ComparePage = () => {
  const [compareProducts, setCompareProducts] = useState([null, null, null]);
  const [allProducts, setAllProducts] = useState([]);
  const [showProductSelector, setShowProductSelector] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
    loadCompareFromStorage();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      if (response.data.data && response.data.data.length > 0) {
        setAllProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCompareFromStorage = () => {
    const saved = localStorage.getItem('compareProducts');
    if (saved) {
      setCompareProducts(JSON.parse(saved));
    }
  };

  const saveCompareToStorage = (products) => {
    localStorage.setItem('compareProducts', JSON.stringify(products));
  };

  const addProduct = (product, index) => {
    const newCompare = [...compareProducts];
    newCompare[index] = product;
    setCompareProducts(newCompare);
    saveCompareToStorage(newCompare);
    setShowProductSelector(null);
  };

  const removeProduct = (index) => {
    const newCompare = [...compareProducts];
    newCompare[index] = null;
    setCompareProducts(newCompare);
    saveCompareToStorage(newCompare);
  };

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const features = [
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', format: (v) => `${v}₪` },
    { key: 'category', label: 'Category' },
    { key: 'type', label: 'Type' },
    { key: 'gender', label: 'Gender' },
    { key: 'color', label: 'Color' },
    { key: 'material', label: 'Material' },
    { key: 'stock', label: 'Stock', format: (v) => `${v} units` }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-4">
            Compare <span className="text-[#c9a227]">Glasses</span>
          </h1>
          <p className="text-white/60 text-lg">
            Compare up to 3 models side by side to make the best choice
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {compareProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden"
            >
              {product ? (
                <>
                  <div className="relative h-64 bg-white/5">
                    <img
                      src={product.images?.[0] || '/images/default-glasses.jpg'}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                    <button
                      onClick={() => removeProduct(index)}
                      className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-[#c9a227] font-bold text-2xl mb-4">{product.price}₪</p>
                    <button className="w-full bg-[#c9a227] hover:bg-[#d4af37] text-black py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center p-12 min-h-[400px]">
                  <button
                    onClick={() => setShowProductSelector(index)}
                    className="w-full h-full border-2 border-dashed border-white/10 rounded-xl hover:border-[#c9a227]/50 hover:bg-[#c9a227]/5 transition-all flex flex-col items-center justify-center gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#c9a227]/20 transition-colors">
                      <Plus size={32} className="text-white/40 group-hover:text-[#c9a227] transition-colors" />
                    </div>
                    <span className="text-white/40 group-hover:text-[#c9a227] font-medium transition-colors">
                      Add a product
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {compareProducts.some(p => p !== null) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-white/50">Feature</th>
                    {compareProducts.map((product, index) => (
                      <th key={index} className="px-6 py-4 text-center font-bold">
                        {product ? product.name : '-'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {features.map((feature, fIndex) => (
                    <tr key={fIndex}>
                      <td className="px-6 py-4 text-white/70 font-medium">{feature.label}</td>
                      {compareProducts.map((product, pIndex) => (
                        <td key={pIndex} className="px-6 py-4 text-center">
                          {product ? (
                            feature.format ? 
                              feature.format(product[feature.key]) : 
                              product[feature.key]
                          ) : '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-6 py-4 text-white/70 font-medium">Features</td>
                    {compareProducts.map((product, pIndex) => (
                      <td key={pIndex} className="px-6 py-4">
                        {product?.features ? (
                          <ul className="space-y-2">
                            {product.features.map((feat, i) => (
                              <li key={i} className="text-sm text-white/80 flex items-center justify-center gap-2">
                                <Check size={14} className="text-[#c9a227]" />
                                {feat}
                              </li>
                            ))}
                          </ul>
                        ) : '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {showProductSelector !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowProductSelector(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a1a] rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Select a product</h2>
                <button
                  onClick={() => setShowProductSelector(null)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for glasses..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-6 focus:outline-none focus:border-[#c9a227] transition-colors"
              />

              <div className="grid md:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => addProduct(product, showProductSelector)}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#c9a227]/50 cursor-pointer transition-all flex gap-4"
                  >
                    <div className="w-24 h-24 bg-white rounded-lg p-2 flex-shrink-0">
                      <img
                        src={product.images?.[0] || '/images/default-glasses.jpg'}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#c9a227] text-xs uppercase tracking-wider mb-1">{product.brand}</p>
                      <h3 className="font-bold mb-2">{product.name}</h3>
                      <p className="font-bold">{product.price}₪</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
