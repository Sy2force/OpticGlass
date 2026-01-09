import express from 'express';
import {
  checkout,
  getMyOrders,
  getOrderById,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Cart Routes
router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:id', protect, updateCartItem);
router.delete('/clear', protect, clearCart);
router.delete('/:id', protect, removeFromCart);

// Checkout & Orders Routes
router.post('/checkout', protect, checkout);
router.get('/orders', protect, getMyOrders);
router.get('/orders/:id', protect, getOrderById);

export default router;
