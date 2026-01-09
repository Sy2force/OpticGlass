import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => `OG${Date.now()}${Math.floor(Math.random() * 1000)}`,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'La quantité doit être au moins 1'],
        },
        price: {
          type: Number,
          required: true,
        },
        color: String,
        size: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Le montant total ne peut pas être négatif'],
    },
    status: {
      type: String,
      enum: ['pending', 'validated', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    shippingAddress: {
      firstName: String,
      lastName: String,
      street: String,
      city: String,
      postalCode: String,
      country: String,
      phone: String,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `OG${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
