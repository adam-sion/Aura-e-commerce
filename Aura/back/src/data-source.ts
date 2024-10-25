import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost", 
  port: +process.env.DB_PORT! || 5432, 
  username: process.env.DB_USERNAME || "postgres", 
  password: process.env.DB_PASSWORD || "postgres", 
  database: process.env.DB_NAME || "postgres", 

  // Ensure you adjust the SSL settings for Supabase
  ssl: {
    rejectUnauthorized: false,
  },

  entities: [path.join(__dirname, 'entities', '**/*.entity.{ts,js}')],
  
  schema: "aura", 
  namingStrategy: new SnakeNamingStrategy(),
});
