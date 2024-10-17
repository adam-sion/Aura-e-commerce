import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";

const productRepository:Repository<Product> = AppDataSource.getRepository(Product);

const getProducts = async (): Promise<Product[]> => {
    return await productRepository.find();
}

const addProduct = async (product:Product):Promise<void> => {
    await productRepository.save(product);
}

export {getProducts, addProduct}