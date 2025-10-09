import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Interfaz para el payload de SimpleJWT
interface JwtPayload {
  user_id: string;
  roles: string[];  // Array de roles
  exp?: number;
  iat?: number;
  // Otros...
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  //console.log('Header Authorization recibido:', authHeader ? authHeader.substring(0, 50) + '...' : 'NULL');  // Log parcial para no spamear

  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS256'] }) as JwtPayload;
    
    //console.log('Payload decodificado:', JSON.stringify(decoded, null, 2));

    // Chequeo para array de roles (fix para SimpleJWT)
    if (!decoded.roles || !decoded.roles.includes('admin')) {
      console.log('Rol no autorizado. Roles disponibles:', decoded.roles);
      return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }

    req.user = decoded;
    next();
  } catch (error: any) {
    console.error('JWT Verify Error Details:', {
      message: error.message,
      name: error.name,
      tokenPrefix: token.substring(0, 20) + '...'
    });
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};