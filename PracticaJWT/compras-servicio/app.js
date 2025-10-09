const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const amqp = require('amqplib');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const EVENTS_SERVICE_URL = process.env.EVENTS_SERVICE_URL;

async function getDBConnection() {
    return await mysql.createConnection(dbConfig);
}

// Agrega esto ANTES del middleware authenticateToken
app.use((req, res, next) => {
    console.log('🔍 Headers recibidos:', req.headers);
    next();
});

// Endpoint para debug del token
app.post('/debug-token', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(400).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({
            tokenReceived: true,
            decodedUser: decoded,
            keys: Object.keys(decoded)
        });
    } catch (error) {
        res.status(401).json({ 
            error: 'Invalid token', 
            message: error.message 
        });
    }
});

// Middleware de autenticación
// Middleware de autenticación CORREGIDO
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('🔐 Token recibido:', token ? 'Sí' : 'No');
    
    if (!token) {
        return res.status(401).json({ error: 'Token de autorización requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('❌ Error verificando token:', err.message);
            return res.status(403).json({ 
                error: 'Token inválido o expirado',
                details: err.message 
            });
        }
        
        console.log('✅ Token decodificado:', decoded);
        
        // Asegurar que userId exista (compatibilidad con diferentes estructuras)
        req.user = {
            userId: decoded.userId || decoded.id || decoded.user_id,
            email: decoded.email,
            name: decoded.username ,
            //role: decoded.role
        };
        
        console.log('👤 Usuario extraído:', req.user);
        next();
    });
};

// Crear orden
app.post('/orders', authenticateToken, async (req, res) => {
    try {
        const { event_id, quantity } = req.body;
        const user_id = req.user.userId;

        if (!event_id || !quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Evento y cantidad válida son requeridos' });
        }

        // Verificar disponibilidad del evento
        const eventResponse = await fetch(`${EVENTS_SERVICE_URL}/events/${event_id}`);
        if (!eventResponse.ok) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        const event = await eventResponse.json();

        if (event.available_tickets < quantity) {
            return res.status(400).json({ error: 'No hay suficientes tickets disponibles' });
        }

        const total_amount = event.price * quantity;

        const connection = await getDBConnection();
        const [result] = await connection.execute(
            'INSERT INTO orders (user_id, event_id, quantity, total_amount) VALUES (?, ?, ?, ?)',
            [user_id, event_id, quantity, total_amount]
        );

        await connection.end();

        res.status(201).json({
            message: 'Orden creada exitosamente',
            orderId: result.insertId,
            total_amount,
            event: {
                id: event.id,
                name: event.name,
                date: event.date
            }
        });
    } catch (error) {
        console.error('Error creando orden:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Procesar pago
// Procesar pago - CON SIMULACIÓN DE SERVICIO DE EVENTOS
app.post('/orders/:id/pay', authenticateToken, async (req, res) => {
    let connection;
    try {
        const orderId = req.params.id;
        console.log(`💰 Procesando pago para orden: ${orderId}`);
        
        connection = await getDBConnection();

        // Obtener la orden
        const [orders] = await connection.execute(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?',
            [orderId, req.user.userId]
        );

        if (orders.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        const order = orders[0];
        console.log('📦 Orden encontrada:', order);

        if (order.status !== 'pending') {
            await connection.end();
            return res.status(400).json({ error: 'La orden ya ha sido procesada' });
        }

        // SIMULAR procesamiento de pago (sin llamar al servicio externo)
        console.log('💳 Simulando procesamiento de pago...');
        
        // Actualizar estado a pagado
        await connection.execute(
            'UPDATE orders SET status = "paid" WHERE id = ?',
            [orderId]
        );

        // SIMULAR actualización de disponibilidad en servicio de eventos
        console.log('🎭 Simulando actualización en servicio de eventos...');
        console.log(`📊 Evento ${order.event_id}: Reduciendo ${order.quantity} tickets`);
        
        // Aquí iría la llamada real al servicio de eventos cuando esté listo:
        /*
        const updateResponse = await fetch(`${EVENTS_SERVICE_URL}/events/${order.event_id}/tickets`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: order.quantity })
        });

        if (!updateResponse.ok) {
            throw new Error('Error actualizando disponibilidad');
        }
        */

        // Enviar notificación a la cola
        console.log('📨 Enviando notificación a RabbitMQ...');
        try {
            const connectionMQ = await amqp.connect(RABBITMQ_URL);
            const channel = await connectionMQ.createChannel();
            
            await channel.assertQueue('notifications');
            
            const notification = {
                type: 'ORDER_PAID',
                orderId: order.id,
                userId: order.user_id,
                eventId: order.event_id,
                quantity: order.quantity,
                totalAmount: order.total_amount,
                timestamp: new Date().toISOString(),
                userEmail: req.user.email,
                userName: req.user.name
            };

            channel.sendToQueue('notifications', Buffer.from(JSON.stringify(notification)));
            
            await channel.close();
            await connectionMQ.close();
            console.log('✅ Notificación enviada a RabbitMQ');
        } catch (mqError) {
            console.warn('⚠️ Error enviando a RabbitMQ (continuando):', mqError.message);
            // No detenemos el flujo principal por error en RabbitMQ
        }

        await connection.end();

        res.json({ 
            message: 'Pago procesado exitosamente',
            order: {
                id: order.id,
                status: 'paid',
                total_amount: order.total_amount,
                quantity: order.quantity,
                event_id: order.event_id
            },
            notification: 'Notificación enviada al sistema'
        });

    } catch (error) {
        console.error('💥 Error procesando pago:', error);
        if (connection) {
            await connection.end();
        }
        res.status(500).json({ 
            error: 'Error procesando el pago',
            details: error.message 
        });
    }
});

// Obtener órdenes del usuario
app.get('/orders', authenticateToken, async (req, res) => {
    try {
        const connection = await getDBConnection();
        const [orders] = await connection.execute(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.userId]
        );
        await connection.end();

        res.json(orders);
    } catch (error) {
        console.error('Error obteniendo órdenes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`🛒 Orders Service running on port ${PORT}`);
});