// src/api/compras.js
import axios from 'axios'

const ORDERS_BASE_URL = 'http://localhost:3003' // URL de tu servicio de órdenes

// Configurar axios interceptor para incluir el token automáticamente
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const ordersApi = {
  // Crear una nueva orden
  async createOrder(eventId, quantity) {
    try {
      const response = await axios.post(`${ORDERS_BASE_URL}/orders`, {
        event_id: eventId,
        quantity: quantity
      })
      return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      throw new Error(error.response?.data?.error || 'Error creando orden')
    }
  },

  // Obtener todas las órdenes del usuario
  async getMyOrders() {
    try {
      const response = await axios.get(`${ORDERS_BASE_URL}/orders`)
      return response.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw new Error('Error obteniendo órdenes')
    }
  },

  // Pagar una orden
  async payOrder(orderId) {
    try {
      const response = await axios.post(`${ORDERS_BASE_URL}/orders/${orderId}/pay`)
      return response.data
    } catch (error) {
      console.error('Error paying order:', error)
      throw new Error(error.response?.data?.error || 'Error procesando pago')
    }
  }
}