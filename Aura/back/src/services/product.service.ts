import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { BadRequest } from "../errors/BadRequest";

const productRepository:Repository<Product> = AppDataSource.getRepository(Product);

const getProductsByCategory = async (category:Product["category"]): Promise<Product[]> => {
    return await productRepository.find({where: {category:category}});
}

const getSaleProducts = async ():Promise<Product[]>=> {
    return await productRepository.createQueryBuilder("product")
    .orderBy("product.price", "ASC")
    .limit(15)
    .getMany();
            
}

const addProduct = async (product:Product):Promise<void> => {
    await productRepository.save(product);
}

const deleteProduct = async (id:number):Promise<void>=> {
    await productRepository.delete(id);
 
}

export {getProductsByCategory, addProduct, deleteProduct, getSaleProducts}