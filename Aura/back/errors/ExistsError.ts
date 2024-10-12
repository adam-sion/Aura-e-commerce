export class ExistsError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'ExistsError'; 
        Error.captureStackTrace(this, this.constructor); 
        Object.setPrototypeOf(this, ExistsError.prototype);
    }
}
