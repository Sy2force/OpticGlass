import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom de la marque est requis'],
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      default: '/images/brands/default.png',
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    country: {
      type: String,
      required: true,
    },
    founded: {
      type: Number,
    },
    specialty: {
      type: String,
    },
    website: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    productsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

brandSchema.index({ name: 'text' });

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
