import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getUserById,
  getAllOrders,
  updateOrderStatus,
  getStats,
  getAnalytics,
} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Gestion des utilisateurs
router.get('/users', protect, isAdmin, getAllUsers);
router.get('/users/:id', protect, isAdmin, getUserById);
router.put('/users/:id/role', protect, isAdmin, updateUserRole);
router.delete('/users/:id', protect, isAdmin, deleteUser);

// Gestion des commandes
router.get('/orders', protect, isAdmin, getAllOrders);
router.put('/orders/:id', protect, isAdmin, updateOrderStatus);

// Statistiques et analytics
router.get('/stats', protect, isAdmin, getStats);
router.get('/analytics', protect, isAdmin, getAnalytics);

export default router;
