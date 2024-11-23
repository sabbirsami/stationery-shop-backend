"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'Email is required.',
    }),
    product: zod_1.z.string({
        required_error: 'Product id is required',
    }),
    quantity: zod_1.z.number({
        required_error: 'Product id is required',
    }),
    totalPrice: zod_1.z.number({
        required_error: 'Product id is required',
    }),
    createdAt: zod_1.z
        .preprocess((value) => (typeof value === 'string' ? new Date(value) : value), zod_1.z.date())
        .optional(),
    updatedAt: zod_1.z
        .preprocess((value) => (typeof value === 'string' ? new Date(value) : value), zod_1.z.date())
        .optional(),
});
