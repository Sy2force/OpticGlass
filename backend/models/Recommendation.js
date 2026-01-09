import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['tendance', 'saison', 'style', 'nouveauté', 'conseil'],
    default: 'tendance'
  },
  imageUrl: {
    type: String,
    default: '/images/default-recommendation.jpg'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

recommendationSchema.index({ category: 1, priority: -1 });
recommendationSchema.index({ isActive: 1, createdAt: -1 });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
