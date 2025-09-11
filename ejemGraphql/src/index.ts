import 'reflect-metadata';
import express,{Application} from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from './data-source';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Conectado a la base de datos');

    const app: Application = express();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
   server.applyMiddleware({ app: app as any, path: '/graphql' });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`🚀 Servidor listo en http://localhost:${port}${server.graphqlPath}`);
    });
  } catch (err) {
    console.error('Error al iniciar la aplicación:', err);
  }
}

startServer();
