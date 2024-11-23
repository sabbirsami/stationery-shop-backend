"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const errorHandler_1 = __importDefault(require("./app/utils/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/', routes_1.default);
app.get('/', (req, res) => {
    res.send('Bye World!');
});
// HANDLE UNKNOWN ERROR ---
app.all('*', (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} route on the server`);
    error.status = 404;
    next(error);
});
app.use(errorHandler_1.default);
exports.default = app;
