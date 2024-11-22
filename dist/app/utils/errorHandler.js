"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    res.status(status).json({
        status: (err === null || err === void 0 ? void 0 : err.status) ? err.status : 'error',
        message,
    });
};
exports.default = errorHandler;
