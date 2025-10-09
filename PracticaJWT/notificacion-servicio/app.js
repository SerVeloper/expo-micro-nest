// notification-service/app.js
const amqp = require('amqplib');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración del email
const transporter = nodemailer.createTransporter({
    service: 'gmail', // Puedes usar otro servicio
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Configuración RabbitMQ
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

async function startNotificationService() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        await channel.assertQueue('notifications');
        
        console.log('Notification Service esperando mensajes...');

        channel.consume('notifications', async (msg) => {
            if (msg !== null) {
                try {
                    const notification = JSON.parse(msg.content.toString());
                    await processNotification(notification);
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error procesando notificación:', error);
                    channel.nack(msg);
                }
            }
        });
    } catch (error) {
        console.error('Error conectando a RabbitMQ:', error);
        setTimeout(startNotificationService, 5000);
    }
}

async function processNotification(notification) {
    switch (notification.type) {
        case 'ORDER_PAID':
            await sendOrderConfirmation(notification);
            break;
        default:
            console.log('Tipo de notificación no reconocido:', notification.type);
    }
}

async function sendOrderConfirmation(notification) {
    // En un caso real, aquí buscarías los detalles del usuario y evento
    // de sus respectivos servicios
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'user@example.com', // En realidad obtendrías esto del servicio de usuarios
        subject: 'Confirmación de Compra - Sistema de Eventos',
        html: `
            <h1>¡Gracias por tu compra!</h1>
            <p>Tu orden #${notification.orderId} ha sido procesada exitosamente.</p>
            <p><strong>Detalles de la compra:</strong></p>
            <ul>
                <li>Cantidad de tickets: ${notification.quantity}</li>
                <li>Monto total: $${notification.totalAmount}</li>
                <li>Evento ID: ${notification.eventId}</li>
            </ul>
            <p>¡Esperamos que disfrutes del evento!</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email de confirmación enviado para la orden ${notification.orderId}`);
    } catch (error) {
        console.error('Error enviando email:', error);
    }
}

const PORT = process.env.PORT || 3004;
startNotificationService();
console.log(`Notification Service running on port ${PORT}`);