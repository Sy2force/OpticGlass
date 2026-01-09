import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
const router = express.Router();

// News data (in production, this would be in MongoDB)
let newsArticles = [
  {
    _id: '1',
    title: 'Les tendances lunettes 2024 : Ce qui va faire fureur',
    excerpt: 'Découvrez les styles qui domineront cette année : formes oversized, montures transparentes et retour du vintage.',
    content: 'Article complet sur les tendances 2024...',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
    category: 'trends',
    author: 'Sophie Martin',
    date: new Date('2024-01-15'),
    readTime: '5 min',
    featured: true,
    published: true
  },
  {
    _id: '2',
    title: 'Comment choisir ses lunettes selon la forme de son visage',
    excerpt: 'Guide complet pour trouver la monture parfaite qui mettra en valeur vos traits.',
    content: 'Guide détaillé sur le choix des lunettes...',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
    category: 'tips',
    author: 'Marc Dubois',
    date: new Date('2024-01-12'),
    readTime: '8 min',
    featured: false,
    published: true
  },
  {
    _id: '3',
    title: 'Ray-Ban x Meta : Les lunettes connectées nouvelle génération',
    excerpt: 'Test complet des nouvelles Ray-Ban Stories avec caméra intégrée et assistant vocal.',
    content: 'Review des Ray-Ban Meta...',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
    category: 'new',
    author: 'Thomas Laurent',
    date: new Date('2024-01-10'),
    readTime: '6 min',
    featured: true,
    published: true
  },
  {
    _id: '4',
    title: 'Protection UV : Tout ce que vous devez savoir',
    excerpt: 'Les verres polarisés sont-ils vraiment nécessaires ? Notre expert répond à toutes vos questions.',
    content: 'Article sur la protection UV...',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800',
    category: 'tips',
    author: 'Dr. Claire Petit',
    date: new Date('2024-01-08'),
    readTime: '7 min',
    featured: false,
    published: true
  },
  {
    _id: '5',
    title: 'Collection Gucci Printemps 2024 : L\'élégance italienne',
    excerpt: 'Aperçu exclusif de la nouvelle collection qui mêle tradition et modernité.',
    content: 'Présentation collection Gucci...',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800',
    category: 'new',
    author: 'Emma Rossi',
    date: new Date('2024-01-05'),
    readTime: '4 min',
    featured: false,
    published: true
  },
  {
    _id: '6',
    title: 'Entretien de vos lunettes : Les gestes qui sauvent',
    excerpt: 'Prolongez la durée de vie de vos montures avec ces conseils d\'experts.',
    content: 'Conseils d\'entretien...',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800',
    category: 'tips',
    author: 'Pierre Moreau',
    date: new Date('2024-01-03'),
    readTime: '5 min',
    featured: false,
    published: true
  }
];

// @route   GET /api/news
// @desc    Get all news articles
// @access  Public
router.get('/', (req, res) => {
  const { category, featured, limit } = req.query;
  
  let filtered = newsArticles.filter(a => a.published);
  
  if (category && category !== 'all') {
    filtered = filtered.filter(a => a.category === category);
  }
  
  if (featured === 'true') {
    filtered = filtered.filter(a => a.featured);
  }
  
  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// @route   GET /api/news/:id
// @desc    Get single news article
// @access  Public
router.get('/:id', (req, res) => {
  const article = newsArticles.find(a => a._id === req.params.id);
  
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article non trouvé' });
  }
  
  res.json({ success: true, data: article });
});

// @route   POST /api/news
// @desc    Create news article
// @access  Admin
router.post('/', protect, isAdmin, (req, res) => {
  const newArticle = {
    _id: Date.now().toString(),
    ...req.body,
    date: new Date(),
    published: true
  };
  
  newsArticles.unshift(newArticle);
  
  res.status(201).json({ success: true, data: newArticle });
});

// @route   PUT /api/news/:id
// @desc    Update news article
// @access  Admin
router.put('/:id', protect, isAdmin, (req, res) => {
  const index = newsArticles.findIndex(a => a._id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Article non trouvé' });
  }
  
  newsArticles[index] = { ...newsArticles[index], ...req.body };
  
  res.json({ success: true, data: newsArticles[index] });
});

// @route   DELETE /api/news/:id
// @desc    Delete news article
// @access  Admin
router.delete('/:id', protect, isAdmin, (req, res) => {
  const index = newsArticles.findIndex(a => a._id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Article non trouvé' });
  }
  
  newsArticles.splice(index, 1);
  
  res.json({ success: true, message: 'Article supprimé' });
});

export default router;
