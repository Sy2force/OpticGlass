import express from 'express';
import upload from '../utils/fileUpload.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.send({
    message: 'Image uploaded',
    image: `/${req.file.path.replace('backend/', '')}`,
  });
});

export default router;
