"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = require("../modules/product/product.routes");
const orders_routes_1 = require("../modules/order/orders.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/products',
        route: product_routes_1.ProductRoute,
    },
    {
        path: '/orders',
        route: orders_routes_1.OrderRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
