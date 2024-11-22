"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Name is required.',
    })
        .min(1, 'Name cannot be empty.'),
    brand: zod_1.z
        .string({
        required_error: 'Brand name is required.',
    })
        .min(1, 'Brand name cannot be empty.'),
    price: zod_1.z
        .number({
        required_error: 'Price is required.',
    })
        .min(0, 'Price cannot be less than zero.'),
    category: zod_1.z.enum(['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'], {
        required_error: 'Category is required.',
        invalid_type_error: 'Category must be one of Writing, Office Supplies, Art Supplies, Educational, or Technology.',
    }),
    quantity: zod_1.z
        .number({
        required_error: 'Quantity is required.',
        invalid_type_error: 'Quantity must be a number.',
    })
        .min(0, 'Quantity cannot be less than zero.'),
    inStock: zod_1.z.boolean().default(true),
    createdAt: zod_1.z
        .preprocess((value) => (typeof value === 'string' ? new Date(value) : value), zod_1.z.date())
        .optional(),
    updatedAt: zod_1.z
        .preprocess((value) => (typeof value === 'string' ? new Date(value) : value), zod_1.z.date())
        .optional(),
});
// export type ProductValidationType = z.infer<typeof productValidationSchema>;
