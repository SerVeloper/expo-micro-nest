// src/database/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { StudentOrmEntity } from '../modules/students/infraestructure/repositories/student.orm.entity';

// Cargar variables de entorno
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [StudentOrmEntity],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
