import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import express from "express";
import { Request, Response, NextFunction } from 'express';
import { BadRequest } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { Router } from "express";
import { 
    addProductHandler, 
    deleteProductHandler, 
    getProductByIdHandler, 
    getProductsByCategoryHandler, 
    getSaleProductsHandler 
} from "../controllers/product.controller";
import { uploadImageHandler } from "../controllers/image.controller";

export const APIRouter = Router();

APIRouter.get('/products/category/:category', getProductsByCategoryHandler);
APIRouter.get('/products/sale', getSaleProductsHandler);
APIRouter.get('/product/:id', getProductByIdHandler);
APIRouter.post('/product', addProductHandler);
APIRouter.delete('/product/:id', deleteProductHandler);


//images upload
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3Client = new S3Client({
    region: 'eu-north-1', // Your bucket's region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});


// Configure multer to use S3 for storage
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'my-aura-images', 
        acl: 'public-read', 
        contentType: multerS3.AUTO_CONTENT_TYPE, 
        key: (req: Request, file: Express.Multer.File, cb: (error: any, key: string) => void) => {
            const uniqueName = `${file.fieldname}_${Date.now()}_${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
            cb(null, uniqueName); // Name of the file in the S3 bucket
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Set file size limit (5 MB)
});



APIRouter.post('/upload', upload.single('product'), uploadImageHandler as express.RequestHandler);

