import express from 'express';
import {
  submitContact,
  getAllMessages,
  updateMessageStatus,
  deleteMessage
} from '../controllers/contactController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Admin routes
router.get('/', protect, isAdmin, getAllMessages);
router.put('/:id', protect, isAdmin, updateMessageStatus);
router.delete('/:id', protect, isAdmin, deleteMessage);

export default router;
