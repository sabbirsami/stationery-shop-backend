import { z } from 'zod';

export const productValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required.',
    })
    .min(1, 'Name cannot be empty.'),
  brand: z
    .string({
      required_error: 'Brand name is required.',
    })
    .min(1, 'Brand name cannot be empty.'),
  price: z
    .number({
      required_error: 'Price is required.',
    })
    .min(0, 'Price cannot be less than zero.'),
  category: z.enum(
    ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
    {
      required_error: 'Category is required.',
      invalid_type_error:
        'Category must be one of Writing, Office Supplies, Art Supplies, Educational, or Technology.',
    }
  ),
  quantity: z
    .number({
      required_error: 'Quantity is required.',
      invalid_type_error: 'Quantity must be a number.',
    })
    .min(0, 'Quantity cannot be less than zero.'),
  inStock: z.boolean().default(true),
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

// export type ProductValidationType = z.infer<typeof productValidationSchema>;
