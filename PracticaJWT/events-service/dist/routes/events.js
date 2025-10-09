"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../lib/data-source");
const Event_1 = require("../entities/Event");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const eventRepository = data_source_1.AppDataSource.getRepository(Event_1.Event);
router.get('/', async (req, res) => {
    try {
        const events = await eventRepository.find({ order: { date: 'ASC' } });
        res.json(events);
    }
    catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.post('/', auth_1.authMiddleware, async (req, res) => {
    try {
        const { name, date, place, capacity, price } = req.body;
        if (!name || !date || !place || !capacity || !price) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        if (capacity < 1 || price < 0) {
            return res.status(400).json({ error: 'Capacidad debe ser >=1 y precio >=0' });
        }
        const newEvent = eventRepository.create({
            name,
            date: new Date(date),
            place,
            capacity,
            price,
        });
        const savedEvent = await eventRepository.save(newEvent);
        res.status(201).json(savedEvent);
    }
    catch (error) {
        console.error('Error al crear evento:', error);
        res.status(400).json({ error: 'Error al crear el evento' });
    }
});
router.put('/:id', auth_1.authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date, place, capacity, price } = req.body;
        const event = await eventRepository.findOne({ where: { id: parseInt(id) } });
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        if (name)
            event.name = name;
        if (date)
            event.date = new Date(date);
        if (place)
            event.place = place;
        if (capacity !== undefined)
            event.capacity = capacity;
        if (price !== undefined)
            event.price = price;
        const updatedEvent = await eventRepository.save(event);
        res.json(updatedEvent);
    }
    catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(400).json({ error: 'Error al actualizar el evento' });
    }
});
router.delete('/:id', auth_1.authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventRepository.findOne({ where: { id: parseInt(id) } });
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        await eventRepository.remove(event);
        res.json({ message: 'Evento eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
});
exports.default = router;
