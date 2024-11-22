import { model, Schema } from 'mongoose';
import { OrderType } from './orders.interface';

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
});

export const OrderModal = model<OrderType>('order', orderSchema);
