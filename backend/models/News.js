import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    excerpt: {
      type: String,
      required: [true, 'L\'extrait est requis'],
    },
    content: {
      type: String,
      required: [true, 'Le contenu est requis'],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      enum: ['trends', 'tips', 'new', 'events'],
    },
    author: {
      type: String,
      required: [true, 'L\'auteur est requis'],
    },
    readTime: {
      type: String,
      default: '5 min',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    next();
    return;
  }
  this.slug = this.title
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace(/[^\w-]+/g, '');
  next();
});

const News = mongoose.model('News', newsSchema);

export default News;
