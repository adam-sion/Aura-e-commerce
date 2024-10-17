import { StatusCodes } from "http-status-codes";

export class BadRequest extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
        this.name = 'BadRequest'; 
        Error.captureStackTrace(this, this.constructor); 
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
}