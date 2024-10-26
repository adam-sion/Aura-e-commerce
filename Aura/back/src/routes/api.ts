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

// Use memory storage for multer
const storage = multer.memoryStorage();  
const upload = multer({ storage });  

// Define upload route
APIRouter.post('/upload', upload.single('product'), uploadImageHandler);



APIRouter.post('/upload', upload.single('product'), uploadImageHandler);
