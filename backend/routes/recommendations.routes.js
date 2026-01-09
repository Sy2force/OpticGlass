import express from 'express';
import {
  getAllRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
  getActiveRecommendations
} from '../controllers/recommendationController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/active', getActiveRecommendations);
router.get('/', getAllRecommendations);
router.get('/:id', getRecommendationById);

router.post('/', protect, isAdmin, createRecommendation);
router.put('/:id', protect, isAdmin, updateRecommendation);
router.delete('/:id', protect, isAdmin, deleteRecommendation);

export default router;
