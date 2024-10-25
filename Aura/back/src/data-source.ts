import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import * as dotenv from 'dotenv';
import 'reflect-metadata';

const isProd = process.env.NODE_ENV === 'production';
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL, 
    ssl: isProd ? { rejectUnauthorized: false } : false,
    entities: [path.join(__dirname, 'entities', '**/*.entity.{ts,js}')],
    schema: "aura",
    namingStrategy: new SnakeNamingStrategy(),
});