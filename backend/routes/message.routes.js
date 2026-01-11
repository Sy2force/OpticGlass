import express from 'express';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  markAsRead,
  replyToMessage,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Public route - anyone can send a message
router.post('/', createMessage);

// Admin routes
router.get('/', protect, isAdmin, getAllMessages);
router.get('/:id', protect, isAdmin, getMessageById);
router.put('/:id/read', protect, isAdmin, markAsRead);
router.post('/:id/reply', protect, isAdmin, replyToMessage);
router.delete('/:id', protect, isAdmin, deleteMessage);

export default router;
