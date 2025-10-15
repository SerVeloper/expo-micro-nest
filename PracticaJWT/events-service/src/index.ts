import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppDataSource } from './lib/data-source';
import eventsRouter from './routes/events';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

// Inicializar TypeORM
const initializeDataSource = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Conexión a PostgreSQL establecida con TypeORM');
  } catch (error) {
    console.error('Error al inicializar TypeORM:', error);
    process.exit(1);
  }
};

// Middlewares globales
app.use(helmet());
app.use(cors()); 
app.use(express.json());

// Rutas
app.use('/events', eventsRouter);

// Endpoint de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servicio de Eventos activo' });
});

const startServer = async (): Promise<void> => {
  await initializeDataSource();
  app.listen(PORT, () => {
    console.log(`Servicio de Eventos corriendo en puerto ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
});