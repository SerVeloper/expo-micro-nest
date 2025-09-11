"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe());
    //CORS
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    });
    // Configuración de Swagger
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Gestor de Proyectos de Grado')
        .setDescription('API para manejo de proyectos de grado, estudiantes y asesores')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    await app.listen(3000);
    console.log(`App running on http://localhost:3000/api/v1`);
    console.log(`Swagger docs available on http://localhost:3000/api/v1/docs`);
}
bootstrap();
//# sourceMappingURL=app.js.map