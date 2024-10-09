import { Router } from "express";
import { getProductsHandler } from "../controllers/productController";

export const APIRouter = Router();

APIRouter.get('/products', getProductsHandler);