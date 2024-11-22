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
        .min(0, ' Price cannot be less then zero'),
    category: zod_1.z.enum(['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'], {
        required_error: 'Category is require',
        invalid_type_error: 'Category must be one of Writing, Office Supplies, Art Supplies, Educational, or Technology.',
    }),
    quantity: zod_1.z.number({
        required_error: 'Quantity is required.',
        invalid_type_error: 'Quantity must be a number',
    }),
    isStock: zod_1.z.boolean().optional(),
});
