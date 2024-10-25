"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistsError = void 0;
class ExistsError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'ExistsError';
        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, ExistsError.prototype);
    }
}
exports.ExistsError = ExistsError;
