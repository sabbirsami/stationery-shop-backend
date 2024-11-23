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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalRevenueIntoDB = exports.createUserOrderIntoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../product/product.model");
const orders_model_1 = require("./orders.model");
const createUserOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(order === null || order === void 0 ? void 0 : order.product)) {
            throw new Error('Invalid product ID format');
        }
        const productEexist = yield product_model_1.ProductModal.exists({ _id: order === null || order === void 0 ? void 0 : order.product });
        if (!productEexist) {
            throw new Error('Product not found with the provided ID');
        }
        // FIND PRODUCT QUANTITY
        const productQuantityFindById = yield product_model_1.ProductModal.find({ _id: order.product }, { quantity: 1 });
        // IF PRODUCT QUANTITY ZERO
        if (!productQuantityFindById[0].quantity) {
            yield product_model_1.ProductModal.findByIdAndUpdate(order === null || order === void 0 ? void 0 : order.product, { inStock: false });
            throw new Error('Product out of stock');
        }
        // IF DON'T HAVE ENOUGH PRODUCT
        if (productQuantityFindById[0].quantity < (order === null || order === void 0 ? void 0 : order.quantity)) {
            throw new Error(`Only ${productQuantityFindById[0].quantity} product available`);
        }
        // CALCULATE NEW PRODUCT QUANTITY
        const productQuantity = productQuantityFindById[0].quantity;
        const newProductQuantity = order === null || order === void 0 ? void 0 : order.quantity;
        const updatedProductQuantity = productQuantity - newProductQuantity;
        // UPDATE NEW PRODUCT QUANTITY
        const updateQuantityIntoDB = yield product_model_1.ProductModal.findByIdAndUpdate(order === null || order === void 0 ? void 0 : order.product, { quantity: updatedProductQuantity });
        // IF UNABLE TO UPDATE PRODUCT QUANTITY FROM PRODUCT DB
        if (!updateQuantityIntoDB) {
            throw new Error('Unable to update product quantity');
        }
        // CREATE ORDER IN DB
        const result = yield orders_model_1.OrderModal.create(order);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(String(error));
    }
});
exports.createUserOrderIntoDB = createUserOrderIntoDB;
const getTotalRevenueIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const revenueData = yield orders_model_1.OrderModal.aggregate([
            {
                $project: {
                    revenue: { $multiply: ['$totalPrice', '$quantity'] },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$revenue' },
                },
            },
        ]);
        // console.log(revenueData);
        const totalRevenue = ((_a = revenueData[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
        return totalRevenue;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(String(error));
    }
});
exports.getTotalRevenueIntoDB = getTotalRevenueIntoDB;
