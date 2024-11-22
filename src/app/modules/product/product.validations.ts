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
    .min(0, ' Price cannot be less then zero'),
  category: z.enum(
    ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
    {
      required_error: 'Category is require',
      invalid_type_error:
        'Category must be one of Writing, Office Supplies, Art Supplies, Educational, or Technology.',
    }
  ),
  quantity: z.number({
    required_error: 'Quantity is required.',
    invalid_type_error: 'Quantity must be a number',
  }),
  isStock: z.boolean().optional(),
});
