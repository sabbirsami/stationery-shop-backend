import { model, Schema, Document } from 'mongoose';
import { ProductType } from './product.interface';

interface ProductDocument extends ProductType, Document {}

const productSchema = new Schema<ProductType>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be less then zero'],
  },

  category: {
    type: String,
    enum: {
      values: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      message:
        'Category must be one of Writing, Office Supplies, Art Supplies, Educational, or Technology.',
    },
    required: [true, 'Category is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be less then zero'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

productSchema.pre('save', async function (next) {
  const newProduct = this as ProductDocument;
  if (newProduct?.quantity === 0) {
    newProduct.inStock = false;
  } else {
    newProduct.inStock = true;
  }
  next();
});

export const ProductModal = model('Product', productSchema);
