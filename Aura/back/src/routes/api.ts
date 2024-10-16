import { Router } from "express";
import { getProductsHandler } from "../controllers/product.controller";

export const APIRouter = Router();

APIRouter.get('/products', getProductsHandler);
