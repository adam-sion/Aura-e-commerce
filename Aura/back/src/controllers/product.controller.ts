import { NextFunction, Request, Response } from "express"; 
import { Product } from "../entities/product.entity";
import { addProduct, deleteProduct, getProductsByCategory } from "../services/product.service";
import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../errors/BadRequest";

const getProductsByCategoryHandler = async (req: Request, res: Response, next:NextFunction): Promise<void> => {  
    try {
        const products: Product[] = await getProductsByCategory(req.params.category);
        res.status(StatusCodes.OK).json(products);
    } catch (error: unknown) {
        next(new Error("couldn't get the products"))
    }
};

const addProductHandler = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    try {
    
      await addProduct(req.body);
      res.status(StatusCodes.CREATED).json("Product added successfully!")
    } catch (error: any) {
        if (error.code === '23502') {
            next(new BadRequest('Product must have all its fields filled'));
        } else {
            next(error);
        }
    }
}

const deleteProductHandler = async (req:Request, res:Response, next:NextFunction)=> {
    try {
       
     await deleteProduct(req.body);
     res.status(StatusCodes.OK).json("product deleted successfully!");
    } catch (error:any) {
      next(error);
    }
}

export {getProductsByCategoryHandler, addProductHandler, deleteProductHandler}