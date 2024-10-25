"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.name = 'BadRequest';
        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
}
exports.BadRequest = BadRequest;
