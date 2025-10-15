// app.js (Versión completamente limpia - SIN x-message-ttl)
const amqp = require('amqplib');
const nodemailer = require('nodemailer');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const QUEUE_NAME = 'emails_queue';
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@127.0.0.1:5672';
const PORT = process.env.PORT || 3004;

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'rosicela.pinedo.quespi@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'ccrh fgkw fktm fklx'
    }
});

// Verificar configuración del email
transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ Error configurando el transporter de email:', error);
    } else {
        console.log('✅ Servidor de correo listo para enviar mensajes');
    }
});

// Función para enviar email de confirmación de orden
async function sendOrderConfirmationEmail(emailData) {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'Notificaciones <rosicela.pinedo.quespi@gmail.com>',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.body,
        text: emailData.body.replace(/<[^>]*>/g, ''),
        attachments: emailData.attachments || []
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Correo enviado a: ${emailData.to} - Message ID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`❌ Error enviando correo a ${emailData.to}:`, error);
        return { success: false, error: error.message };
    }
}

// Función para enviar email de bienvenida
async function sendWelcomeEmail(emailData) {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'Bienvenida <rosicela.pinedo.quespi@gmail.com>',
        to: emailData.to,
        subject: emailData.subject,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333;">¡Bienvenido/a!</h1>
                <p>Gracias por registrarte en nuestro servicio.</p>
                <p>${emailData.body}</p>
                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0;">Estamos emocionados de tenerte con nosotros.</p>
                </div>
            </div>
        `,
        text: `¡Bienvenido/a! Gracias por registrarte. ${emailData.body}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email de bienvenida enviado a: ${emailData.to}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`❌ Error enviando email de bienvenida:`, error);
        return { success: false, error: error.message };
    }
}

// Función principal para procesar emails de la cola
async function processEmailFromQueue(emailData) {
    console.log(`📧 Procesando email para: ${emailData.to}`);
    console.log(`📝 Tipo: ${emailData.type || 'General'}`);

    let result;
    
    switch (emailData.type) {
        case 'ORDER_CONFIRMATION':
            result = await sendOrderConfirmationEmail(emailData);
            break;
        case 'WELCOME_EMAIL':
            result = await sendWelcomeEmail(emailData);
            break;
        default:
            result = await sendOrderConfirmationEmail(emailData);
            break;
    }

    return result;
}

// Consumidor principal de RabbitMQ - VERSIÓN SIMPLIFICADA
async function consumeEmails() {
    let connection;
    let channel;

    try {
        console.log('🔌 Conectando a RabbitMQ...');
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        
        // SOLO parámetros básicos - SIN x-message-ttl
        await channel.assertQueue(QUEUE_NAME, { 
            durable: true 
        });
        console.log(`✅ Cola '${QUEUE_NAME}' lista`);

        // Configurar prefetch
        channel.prefetch(1);

        console.log(`🔄 Esperando mensajes en la cola: ${QUEUE_NAME}`);
        console.log('🎯 Presiona CTRL+C para salir');

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                try {
                    const emailData = JSON.parse(msg.content.toString());
                    console.log(`📨 Mensaje recibido: ${emailData.type || 'Sin tipo'} para ${emailData.to}`);
                    
                    const result = await processEmailFromQueue(emailData);
                    
                    if (result.success) {
                        console.log(`✅ Email procesado exitosamente: ${emailData.to}`);
                        channel.ack(msg);
                    } else {
                        console.error(`❌ Error procesando email, reintentando...: ${emailData.to}`);
                        // Rechazar y requeuear para reintento
                        channel.nack(msg, false, true);
                    }
                    
                } catch (error) {
                    console.error('💥 Error procesando mensaje:', error);
                    // Rechazar mensaje problemático sin requeue
                    channel.nack(msg, false, false);
                }
            }
        }, {
            noAck: false
        });

        return { connection, channel };

    } catch (error) {
        console.error('💥 Error en el consumidor:', error.message);
        
        // Reintentar después de 5 segundos
        console.log('🔄 Reintentando conexión en 5 segundos...');
        setTimeout(consumeEmails, 5000);
    }
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Notification Service',
        timestamp: new Date().toISOString(),
        queue: QUEUE_NAME
    });
});

// Endpoint para verificar estado de la cola
app.get('/queue-status', async (req, res) => {
    let connection;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        const queueInfo = await channel.assertQueue(QUEUE_NAME, { durable: true });
        
        await channel.close();
        await connection.close();

        res.json({
            queue: QUEUE_NAME,
            messageCount: queueInfo.messageCount,
            consumerCount: queueInfo.consumerCount,
            status: 'active'
        });
    } catch (error) {
        console.error('Error verificando cola:', error.message);
        res.status(500).json({ 
            error: 'Error verificando estado de la cola',
            details: error.message 
        });
    }
});

// Endpoint para enviar email de prueba
app.post('/test-email', async (req, res) => {
    try {
        const { to, subject, body } = req.body;
        
        const testEmail = {
            to: to || 'test@example.com',
            subject: subject || 'Email de prueba - Notification Service',
            body: body || 'Este es un email de prueba del servicio de notificaciones',
            type: 'TEST'
        };

        const result = await processEmailFromQueue(testEmail);
        
        if (result.success) {
            res.json({ 
                message: 'Email de prueba enviado exitosamente',
                messageId: result.messageId 
            });
        } else {
            res.status(500).json({ 
                error: 'Error enviando email de prueba',
                details: result.error 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            error: 'Error procesando solicitud de prueba',
            details: error.message 
        });
    }
});

// Iniciar servidor
const server = app.listen(PORT, () => {
    console.log(`📧 Notification Service running on port ${PORT}`);
    console.log(`🔗 RabbitMQ: ${RABBITMQ_URL}`);
    console.log(`📬 Queue: ${QUEUE_NAME}`);
    
    // Iniciar el consumidor
    consumeEmails();
});

// Manejo graceful de cierre
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servicio de notificaciones...');
    server.close(() => {
        console.log('✅ Servidor HTTP cerrado');
        process.exit(0);
    });
});

process.on('unhandledRejection', (error) => {
    console.error('⚠️ Unhandled Rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    process.exit(1);
});