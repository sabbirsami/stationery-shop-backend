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
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
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
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        console.log(query);
        const result = yield (0, product_services_1.getAllProductFromDB)();
        res.send(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to add product',
            error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
};
