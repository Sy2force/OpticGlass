import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { sanitizeInput } from './middlewares/validateMiddleware.js';

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';
import favoritesRoutes from './routes/favorites.routes.js';
import cartRoutes from './routes/cart.routes.js';
import adminRoutes from './routes/admin.routes.js';
import recommendationsRoutes from './routes/recommendations.routes.js';
import newsRoutes from './routes/news.routes.js';
import contactRoutes from './routes/contact.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import brandsRoutes from './routes/brands.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import messageRoutes from './routes/message.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false, // Important pour servir les images
}));

// Logger HTTP Morgan - Exigence HackerU
app.use(morgan('dev'));

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
        'http://localhost:3006'
      ].filter(Boolean);
      
      if (!origin) return callback(null, true);
      if (allowed.includes(origin)) return callback(null, true);
      
      // Allow Vercel preview deployments
      if (origin && origin.match(/^https:\/\/.*\.vercel\.app$/)) {
        return callback(null, true);
      }
      
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 1000 : 100,
  message: 'Trop de requêtes, veuillez réessayer plus tard.',
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Optic Glass - Backend opérationnel',
    version: '1.0.0',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/brands', brandsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin/messages', messageRoutes);

// Servir le dossier uploads comme statique
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});
