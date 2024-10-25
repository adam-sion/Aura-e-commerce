import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import 'reflect-metadata';

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT! || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",


  ssl: isProd? { rejectUnauthorized: true }:false ,

  entities: [path.join(__dirname, 'entities', '**/*.entity.{ts,js}')],
  
  schema: "aura",
  namingStrategy: new SnakeNamingStrategy(),
});
