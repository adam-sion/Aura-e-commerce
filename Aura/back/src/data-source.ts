import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",

  entities: [path.join(__dirname, 'entities', '**/*.entity.{ts,js}')],

  schema: "aura",
  namingStrategy: new SnakeNamingStrategy(),
});
