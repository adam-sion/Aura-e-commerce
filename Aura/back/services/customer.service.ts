import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Customer } from "../entities/Customer.entity";
import bcrypt from "bcrypt";
import jwt from"jsonwebtoken";
import { ExistsError } from "../errors/ExistsError";
import { StatusCodes } from "http-status-codes";

const customerRepository:Repository<Customer> = AppDataSource.getRepository(Customer);

const signup = async ({username, password}:Omit<Customer, "id">):Promise<void>=> {

    const existingCustomer = await customerRepository.findOne({ where: { username } });

    if (existingCustomer) {
        throw new ExistsError("User already exists", StatusCodes.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     await customerRepository.save({username, password: hashedPassword})
}

const signin = async ({ username, password }: Omit<Customer, "id">): Promise<{username:string, token:string}> => {
    const user = await customerRepository.findOne({where: {username}});

    if (!user) {
        throw new ExistsError("User was not found", StatusCodes.UNAUTHORIZED);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new ExistsError("User was not found", StatusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return {username, token};
  };
  

export {signup, signin}