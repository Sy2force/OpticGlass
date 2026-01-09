import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom du produit est requis'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'La marque est requise'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Le prix est requis'],
      min: [0, 'Le prix ne peut pas être négatif'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Le prix original ne peut pas être négatif'],
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      enum: ['Solaire', 'Sport', 'Luxe', 'Enfant', 'Vue', 'vue', 'soleil', 'sport', 'vintage', 'sunglasses', 'optical'],
    },
    type: {
      type: String,
    },
    frameShape: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Homme', 'Femme', 'Mixte', 'Enfant', 'men', 'women', 'unisex'],
      default: 'Mixte',
    },
    season: {
      type: String,
    },
    colors: {
      type: [String],
      default: [],
    },
    material: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    shortDescription: {
      type: String,
    },
    features: {
      type: [String],
      default: [],
    },
    specifications: {
      largeurVerres: String,
      hauteurVerres: String,
      pont: String,
      branches: String,
      poids: String,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Le stock ne peut pas être négatif'],
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    warranty: {
      type: String,
      default: '2 ans',
    },
    madeIn: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 'text', brand: 'text', description: 'text', tags: 'text' });
productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ type: 1 });
productSchema.index({ gender: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
