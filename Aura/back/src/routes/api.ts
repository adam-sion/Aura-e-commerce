import express from "express"
import path from "path";
import { Router } from "express";
import { addProductHandler, deleteProductHandler, getProductsByCategoryHandler } from "../controllers/product.controller";
import multer from "multer";
import { uploadImageHandler } from "../controllers/image.controller";

export const APIRouter = Router();

APIRouter.get('/products/:category', getProductsByCategoryHandler);
APIRouter.post('/product', addProductHandler);
APIRouter.delete('/product', deleteProductHandler);

const storage = multer.diskStorage({
    destination: './upload/images',

    filename:(req,file, cb)=> {
     return cb(null,`${file.fieldname}_${Date.now()}_${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

APIRouter.use('/images', express.static('upload/images'));

APIRouter.post('/upload', upload.single('product'), uploadImageHandler);
