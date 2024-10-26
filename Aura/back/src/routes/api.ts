import express from "express";
import path from "path";
import { Router } from "express";
import { 
    addProductHandler, 
    deleteProductHandler, 
    getProductByIdHandler, 
    getProductsByCategoryHandler, 
    getSaleProductsHandler 
} from "../controllers/product.controller";
import multer from "multer";
import { uploadImageHandler } from "../controllers/image.controller";

export const APIRouter = Router();


APIRouter.get('/products/category/:category', getProductsByCategoryHandler);
APIRouter.get('/products/sale', getSaleProductsHandler);
APIRouter.get('/product/:id', getProductByIdHandler);
APIRouter.post('/product', addProductHandler);
APIRouter.delete('/product/:id', deleteProductHandler);

const storage = multer.diskStorage({
    destination:'/tmp',
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}_${Date.now()}_${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});


const upload = multer({ storage });


APIRouter.post('/upload', upload.single('product'), uploadImageHandler);
