import express from 'express';
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from '../controllers/favoriteController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getFavorites);
router.post('/:productId', protect, addToFavorites);
router.delete('/:productId', protect, removeFromFavorites);

export default router;
