"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModal = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
            message: 'Category must be one of Writing, Office Supplies, Art Supplies, Educational, or Technology.',
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
productSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = this;
        if ((newProduct === null || newProduct === void 0 ? void 0 : newProduct.quantity) === 0) {
            newProduct.inStock = false;
        }
        else {
            newProduct.inStock = true;
        }
        next();
    });
});
exports.ProductModal = (0, mongoose_1.model)('Product', productSchema);
