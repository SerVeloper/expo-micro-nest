import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  //CORS
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, 
  });
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Ejemplo de API con NestJS')
    .setDescription('API para gestionar estudiantes')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(3000);
  console.log(`App running on http://localhost:3000/api/v1`);
  console.log(`Swagger docs available on http://localhost:3000/api/v1/docs`);
}
bootstrap();
