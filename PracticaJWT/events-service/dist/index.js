"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./lib/data-source");
const events_1 = __importDefault(require("./routes/events"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Inicializar TypeORM
const initializeDataSource = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Conexión a PostgreSQL establecida con TypeORM');
    }
    catch (error) {
        console.error('Error al inicializar TypeORM:', error);
        process.exit(1);
    }
};
// Middlewares globales
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas
app.use('/events', events_1.default);
// Endpoint de health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servicio de Eventos activo' });
});
const startServer = async () => {
    await initializeDataSource();
    app.listen(PORT, () => {
        console.log(`Servicio de Eventos corriendo en puerto ${PORT}`);
    });
};
startServer().catch((error) => {
    console.error('Error al iniciar el servidor:', error);
});
