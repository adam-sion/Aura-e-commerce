import { NextFunction, Request, Response } from "express"; 
import { Product } from "../entities/product.entity";
import { getProducts } from "../services/product.service";
import { StatusCodes } from "http-status-codes";

const getProductsHandler = async (req: Request, res: Response, next:NextFunction): Promise<void> => {  
    try {
        const products: Product[] = await getProducts();
        res.status(StatusCodes.OK).json(products);
    } catch (error: unknown) {
        next(new Error("couldn't get the products"))
    }
};

export {getProductsHandler}