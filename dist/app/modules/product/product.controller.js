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
exports.ProductController = void 0;
const zod_1 = require("zod");
const product_validations_1 = require("./product.validations");
const product_services_1 = require("./product.services");
// CREATE PRODUCT
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // DO SOME CHANGES
        productData.updatedAt = new Date();
        productData.inStock = productData.quantity > 0;
        console.log(productData);
        const validateData = product_validations_1.productValidationSchema.parse(productData);
        const result = yield (0, product_services_1.createProductIntoDB)(validateData);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'product created successfully',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Unable to add product',
            });
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(500).json({
                success: false,
                message: 'Unable to add product',
                error: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Unable to add product',
                error,
            });
        }
    }
});
// GET ALL PRODUCT / USING QUERY
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const query = {};
        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { brand: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ];
        }
        const result = yield (0, product_services_1.getAllProductFromDB)(query);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Product retrieved successfully',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Unable to get product',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to add product',
            error,
        });
    }
});
// GET SINGLE PRODUCT BY ID
const getSingleProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield (0, product_services_1.getProductDetailsFromDB)(productId);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Product retrieved successfully',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Unable to get product details',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot get product details',
            error,
        });
    }
});
// UPDATE PRODUCT BY ID
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedData = req.body;
        const result = yield (0, product_services_1.updateProductFromDB)(productId, updatedData);
        // HANDLE RESPONSE
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Product updated successfully',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Unable to update product details',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot update product details',
            error,
        });
    }
});
// DELETE PRODUCT BY ID
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield (0, product_services_1.deleteProductFromDB)(productId);
        // HANDLE RESPONSE
        if (result === null || result === void 0 ? void 0 : result.deletedCount) {
            res.status(200).json({
                status: true,
                message: 'Product deleted successfully',
                data: {},
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Unable to delete product details',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot delete product details',
            error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    getSingleProductDetails,
    updateProduct,
    deleteProduct,
};
