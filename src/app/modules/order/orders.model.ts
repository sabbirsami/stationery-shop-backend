import { Document, model, Schema } from 'mongoose';
import { OrderType } from './orders.interface';

interface OrderDocument extends OrderType, Document {}

const orderSchema = new Schema<OrderType>({
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  product: {
    type: String,
    required: [true, 'product id is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be zero'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Total Price cannot be zero'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre('save', async function (next) {
  const newOrder = this as OrderDocument;

  if (!newOrder.createdAt) {
    newOrder.createdAt = new Date();
  }

  next();
});

export const OrderModal = model<OrderType>('order', orderSchema);
