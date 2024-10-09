import { Request, Response } from "express";  // Import Response
import { Product } from "../entities/product.entity";
import { getProducts } from "../services/productService";
import { StatusCodes } from "http-status-codes";

const getProductsHandler = async (req: Request, res: Response): Promise<void> => {  // Use Request and Response types
    try {
        const products: Product[] = await getProducts();
        res.status(StatusCodes.OK).json(products);
    } catch (error: unknown) {
        console.log('error: ' + error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('error, something went wrong');
    }
};

export {getProductsHandler}