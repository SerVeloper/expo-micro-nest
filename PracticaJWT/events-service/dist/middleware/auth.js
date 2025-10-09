"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    // Extrae el token del header Authorization (formato: Bearer <token>)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    try {
        // Verifica y decodifica el token con la clave secreta
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Chequea si el rol es 'admin' (solo admins pueden modificar eventos)
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
        }
        // Agrega el payload del usuario al request para usarlo en rutas posteriores
        req.user = decoded;
        next(); // Continúa al siguiente middleware/ruta
    }
    catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
exports.authMiddleware = authMiddleware;
