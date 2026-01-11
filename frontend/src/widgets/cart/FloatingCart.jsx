import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const getItemId = (item) => item?.product?._id || item?.productId;
  const getItemName = (item) => item?.product?.name || item?.name;
  const getItemBrand = (item) => item?.product?.brand || item?.brand;
  const getItemPrice = (item) => item?.product?.price ?? item?.price ?? 0;
  const getItemImage = (item) => item?.product?.images?.[0] || item?.image;

  useEffect(() => {
    loadCart();
    window.addEventListener('storage', loadCart);
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const loadCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (Array.isArray(cart)) {
        setCartItems(cart);
        setItemCount(cart.reduce((sum, item) => sum + item.quantity, 0));
      } else {
        setCartItems([]);
        setItemCount(0);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
      setItemCount(0);
    }
  };

  const updateQuantity = (productId, change) => {
    const updatedCart = cartItems.map((item) => {
      if (getItemId(item) === productId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter((item) => getItemId(item) !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-40 bg-primary hover:bg-[#d4af37] text-white p-4 rounded-full shadow-2xl shadow-primary/50 transition-colors"
      >
        <ShoppingCart size={28} />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-gold text-black w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
          >
            {itemCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gray-900 shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShoppingCart size={24} className="text-primary" />
                  Cart ({itemCount})
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400 hover:text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={64} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400 text-lg">Your cart is empty</p>
                    <Link to="/glasses">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(false)}
                        className="mt-4 bg-primary hover:bg-[#d4af37] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Discover our glasses
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <motion.div
                      key={`${getItemId(item) || 'item'}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10"
                    >
                      <div className="flex gap-4">
                        <img
                          src={getItemImage(item) || '/images/default-glasses.jpg'}
                          alt={getItemName(item) || 'Produit'}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
                            {getItemName(item)}
                          </h3>
                          <p className="text-primary text-xs mb-2">{getItemBrand(item)}</p>
                          <p className="text-white font-bold">
                            {(getItemPrice(item) * item.quantity).toFixed(2)}€
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(getItemId(item), -1)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Minus size={16} className="text-white" />
                          </button>
                          <span className="text-white font-medium px-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(getItemId(item), 1)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus size={16} className="text-white" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(getItemId(item))}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                        >
                          <Trash2 size={18} className="text-gray-400 group-hover:text-red-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-bold text-2xl">{getTotalPrice()}€</span>
                  </div>

                  <Link to="/cart" onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors mb-2"
                    >
                      View cart
                    </motion.button>
                  </Link>

                  <Link to="/checkout" onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary hover:bg-[#d4af37] text-white py-3 rounded-lg font-medium transition-colors shadow-lg shadow-primary/50"
                    >
                      Checkout
                    </motion.button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCart;
