import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { BadRequest } from "../errors/BadRequest";

const productRepository:Repository<Product> = AppDataSource.getRepository(Product);

const getProductsByCategory = async (category:Product["gender"]): Promise<Product[]> => {
    return await productRepository.find({where: {gender:category}});
}

const addProduct = async (product:Product):Promise<void> => {
    await productRepository.save(product);
}

const deleteProduct = async (product:Product):Promise<void>=> {
    if (product.id === undefined) {
        throw new BadRequest("product is not valid");
    }
    
    const productFound = await productRepository.findOne({where: product});

    if (!productFound) {
        throw new BadRequest(`No product with id ${product.id} was found`);
    }

    await productRepository.remove(productFound);
}

export {getProductsByCategory, addProduct, deleteProduct}