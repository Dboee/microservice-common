"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const unauthorized_error_1 = require("../errors/unauthorized-error");
// we assume that the currentUser property is already defined on the Request interface
const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        // 401: Unauthorized
        throw new unauthorized_error_1.UnauthorizedError();
    }
    next();
};
exports.requireAuth = requireAuth;
