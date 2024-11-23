import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string({
    required_error: 'Email is required.',
  }),
  product: z.string({
    required_error: 'Product id is required',
  }),
  quantity: z.number({
    required_error: 'Product id is required',
  }),
  totalPrice: z.number({
    required_error: 'Product id is required',
  }),
  createdAt: z
    .preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    )
    .optional(),
  updatedAt: z
    .preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    )
    .optional(),
});
