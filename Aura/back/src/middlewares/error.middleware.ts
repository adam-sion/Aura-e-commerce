import { Request, Response, NextFunction } from 'express';
import { ExistsError } from '../errors/ExistsError';
import { BadRequest } from '../errors/BadRequest';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
   if (err instanceof ExistsError || err instanceof BadRequest) {
    res.status(err.status).json({
        status:'error',
        message:err.message
    })
   } else {

    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error'; 

    res.status(statusCode).json({
        status: 'error',
        message: message,
    });
}

};
