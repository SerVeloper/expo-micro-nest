"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/database/data-source.ts
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const student_orm_entity_1 = require("../modules/students/infraestructure/repositories/student.orm.entity");
// Cargar variables de entorno
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [student_orm_entity_1.StudentOrmEntity],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
//# sourceMappingURL=data-source.js.map