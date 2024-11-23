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
exports.OrderController = void 0;
const orders_validations_1 = require("./orders.validations");
const zod_1 = require("zod");
const orders_services_1 = require("./orders.services");
const createUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        // ADD UPDATE TIME
        order.updatedAt = new Date();
        // Check VALIDATION
        const validateData = orders_validations_1.orderValidationSchema.parse(order);
        const result = yield (0, orders_services_1.createUserOrderIntoDB)(validateData);
        res.status(200).json({
            status: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                error: error.errors,
            });
        }
        else if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unexpected error occurred',
            });
        }
    }
});
const getTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orders_services_1.getTotalRevenueIntoDB)();
        res.status(200).json({
            status: true,
            message: 'Revenue calculated successfully',
            totalRevenue: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unexpected error occurred',
            });
        }
    }
});
exports.OrderController = {
    createUserOrder,
    getTotalRevenue,
};
