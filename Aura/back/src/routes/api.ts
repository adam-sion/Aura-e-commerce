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

// Product routes
APIRouter.get('/products/category/:category', getProductsByCategoryHandler);
APIRouter.get('/products/sale', getSaleProductsHandler);
APIRouter.get('/product/:id', getProductByIdHandler);
APIRouter.post('/product', addProductHandler);
APIRouter.delete('/product/:id', deleteProductHandler);

// Configure multer to use /tmp/images for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp/images'); // Use /tmp for writable space
    },
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}_${Date.now()}_${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Upload route for images
APIRouter.post('/upload', upload.single('product'), uploadImageHandler);
