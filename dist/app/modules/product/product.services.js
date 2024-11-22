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
exports.deleteProductFromDB = exports.updateProductFromDB = exports.getProductDetailsFromDB = exports.getAllProductFromDB = exports.createProductIntoDB = void 0;
const product_model_1 = require("./product.model");
// CREATE PRODUCT
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.ProductModal.create(product);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(String(error));
    }
});
exports.createProductIntoDB = createProductIntoDB;
// GET ALL PRODUCT / USING QUERY
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.ProductModal.find(query);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(String(error));
    }
});
exports.getAllProductFromDB = getAllProductFromDB;
// GET SINGLE PRODUCT BY ID
const getProductDetailsFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.ProductModal.findById({ _id: productId });
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(String(error));
    }
});
exports.getProductDetailsFromDB = getProductDetailsFromDB;
// UPDATE PRODUCT BY ID
const updateProductFromDB = (productId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDataWithUpdatedAtTime = Object.assign(Object.assign({}, updatedData), { updatedAt: new Date() });
        const result = yield product_model_1.ProductModal.findByIdAndUpdate(productId, updatedDataWithUpdatedAtTime, { new: true });
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(String(error));
    }
});
exports.updateProductFromDB = updateProductFromDB;
// DELETE PRODUCT BY ID
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.ProductModal.deleteOne({ _id: productId });
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(String(error));
    }
});
exports.deleteProductFromDB = deleteProductFromDB;
