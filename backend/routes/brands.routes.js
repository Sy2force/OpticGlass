import express from 'express';
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
} from '../controllers/brandController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Public routes
router.get('/', getAllBrands);
router.get('/:id', getBrandById);

// Admin routes
router.post('/', protect, isAdmin, createBrand);
router.put('/:id', protect, isAdmin, updateBrand);
router.delete('/:id', protect, isAdmin, deleteBrand);

export default router;
