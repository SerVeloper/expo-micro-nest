import { DataSource } from 'typeorm';
import { Event } from '../entities/Event';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false, 
  entities: [Event],
  migrations: [], 
  subscribers: [],
});