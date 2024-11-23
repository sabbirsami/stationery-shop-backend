"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModal = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
exports.OrderModal = (0, mongoose_1.model)('order', orderSchema);
