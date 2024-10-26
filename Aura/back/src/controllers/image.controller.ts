import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../errors/BadRequest";
import { StatusCodes } from "http-status-codes";

interface MulterFile extends Express.Multer.File {
    location: string; 
}


interface CustomRequest extends Request {
    file: MulterFile;
}

const uploadImageHandler = (req: CustomRequest, res: Response, next: NextFunction): void => {
   if (!req.file) {
       throw new BadRequest("No image uploaded");
   }
   
   res.status(StatusCodes.OK).json({
       image_url: req.file.location, 
   });
};

export { uploadImageHandler };
