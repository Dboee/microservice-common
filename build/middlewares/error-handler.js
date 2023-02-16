"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    console.error('generic error: ', err);
    res.status(400).send({ errors: [{ message: 'Generic error' }] });
};
exports.errorHandler = errorHandler;
