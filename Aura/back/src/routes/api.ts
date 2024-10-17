import express from "express"
import { Router } from "express";
import { addProductHandler, getProductsHandler } from "../controllers/product.controller";
import multer from "multer";
import { uploadImageHandler } from "../controllers/image.controller";

export const APIRouter = Router();

APIRouter.get('/products', getProductsHandler);
APIRouter.post('/product', addProductHandler);

const storage = multer.diskStorage({
    destination: './upload/images',

    filename:(req,file, cb)=> {
     return cb(null,`${file.fieldname}_${Date.now()}_${Math.round(Math.random() * 1e9)}`)
    }
})

const upload = multer({storage:storage});

APIRouter.use('/images', express.static('upload/images'));

APIRouter.post('/upload', upload.single('product'), uploadImageHandler);
