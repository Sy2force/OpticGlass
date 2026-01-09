import express from 'express';
import {
  checkout,
  getMyOrders,
  getOrderById,
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/checkout', protect, checkout);
router.get('/orders', protect, getMyOrders);
router.get('/orders/:id', protect, getOrderById);

export default router;
