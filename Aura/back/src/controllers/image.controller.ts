import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../errors/BadRequest";
import { StatusCodes } from "http-status-codes";

const port = process.env.PORT||3000;

const uploadImageHandler = (req:Request, res:Response, next:NextFunction): void=> {
     if (!req.file) {
        throw new BadRequest("No image uploaded");
     }

     res.status(StatusCodes.OK).json({
        image_url: `${process.env.SERVER_URL}/images/${req.file.filename}`
     }) 
}

export {uploadImageHandler}