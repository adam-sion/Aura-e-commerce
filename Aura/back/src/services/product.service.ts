import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";

const productRepository:Repository<Product> = AppDataSource.getRepository(Product);

const getProductsByCategory = async (category:Product["gender"]): Promise<Product[]> => {
    return await productRepository.find({where: {gender:category}});
}

const addProduct = async (product:Product):Promise<void> => {
    await productRepository.save(product);
}

export {getProductsByCategory, addProduct}