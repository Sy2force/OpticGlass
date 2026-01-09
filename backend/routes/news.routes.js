import express from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Public routes
router.get('/', getAllNews);
router.get('/:id', getNewsById);

// Admin routes
router.post('/', protect, isAdmin, createNews);
router.put('/:id', protect, isAdmin, updateNews);
router.delete('/:id', protect, isAdmin, deleteNews);

export default router;
