<!-- src/components/client/OrdersList.vue -->
<template>
  <div class="orders-list">
    
    
    <!-- Estado de carga -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando tus órdenes...</p>
    </div>

    <!-- Sin órdenes -->
    <div v-else-if="orders.length === 0" class="empty-state">
      <div class="empty-icon">🛒</div>
      <h3>No tienes órdenes realizadas</h3>
      <p>Cuando realices una compra, aparecerá aquí.</p>
      <button @click="$router.push('/client/events')" class="btn-primary">
        Explorar Eventos
      </button>
    </div>

    <!-- Lista de órdenes -->
    <div v-else class="orders-container">
      <div class="orders-stats">
        <div class="stat-card">
          <span class="stat-number">{{ orders.length }}</span>
          <span class="stat-label">Total de Órdenes</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ paidOrdersCount }}</span>
          <span class="stat-label">Pagadas</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ pendingOrdersCount }}</span>
          <span class="stat-label">Pendientes</span>
        </div>
      </div>

      <div class="orders-grid">
        <div 
          v-for="(order, index) in ordersWithEventInfo" 
          :key="order.id" 
          class="order-card"
          :class="order.status"
        >
          <!-- Header de la orden -->
          <div class="order-header">
            <div class="order-number">
              <span class="number-badge">#{{ index + 1 }}</span>
              <div class="order-info">
                <h3 class="order-id">Orden </h3>
                
              </div>
            </div>
            <div class="order-status">
              <span class="status-badge" :class="order.status">
                {{ getStatusText(order.status) }}
              </span>
              
            </div>
          </div>

          <!-- Información del Evento -->
          <div class="event-info" v-if="order.eventDetails">
            <div class="event-image">
              <img :src="order.eventDetails.image" :alt="order.eventDetails.name" />
            </div>
            <div class="event-details">
              <h4 class="event-name">{{ order.eventDetails.name }}</h4>
              <div class="event-meta">
                <p class="event-place">
                  📍 {{ order.eventDetails.place || 'Lugar por confirmar' }}
                </p>
                <p class="event-date">
                  🗓️ {{ formatEventDate(order.eventDetails.date) }}
                </p>
                <p class="event-description">
                  {{ truncateDescription(order.eventDetails.description) }}
                </p>
              </div>
              
            </div>
          </div>

          <!-- Información básica del evento si no se pudo cargar -->
          <div class="event-info" v-else>
            <div class="event-image">
              <img :src="getDefaultEventImage(order.event_id || order.eventId)" alt="Evento" />
            </div>
            <div class="event-details">
              <h4 class="event-name">Cargando información del evento...</h4>
              <div class="event-meta">
                <p class="event-place">Evento ID: {{ order.event_id || order.eventId }}</p>
                <p class="ticket-quantity">
                  🎫 {{ order.quantity }} ticket{{ order.quantity > 1 ? 's' : '' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Detalles de la compra -->
          <div class="purchase-details">
            <div class="detail-item">
              <span class="label">Precio unitario:</span>
              <span class="value">${{ calculateUnitPrice(order) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Cantidad:</span>
              <span class="value">{{ order.quantity }} tickets</span>
            </div>
            <div class="detail-item total">
              <span class="label">Total:</span>
              <p class="total-amount">${{ order.total_amount || order.totalAmount }}</p>
              
            </div>
          </div>

          <!-- Acciones -->
          <div class="order-actions" v-if="order.status === 'pending'">
            <button 
              @click="payOrder(order.id || order.orderId)" 
              :disabled="isPaying === (order.id || order.orderId)"
              class="btn-pay"
            >
              <span v-if="isPaying === (order.id || order.orderId)" class="btn-loading">
                <div class="spinner-small"></div>
                Procesando...
              </span>
              <span v-else>💳 Pagar Ahora</span>
            </button>
            <button @click="cancelOrder(order.id || order.orderId)" class="btn-cancel">
              Cancelar
            </button>
          </div>

          <!-- Confirmación de pago -->
          <div v-if="order.status === 'paid'" class="order-confirmation">
            <div class="confirmation-badge">
              <span class="confirmation-icon">✅</span>
              <div class="confirmation-text">
                <strong>Pago confirmado</strong>
                <p>Tu entrada ha sido reservada exitosamente</p>
                <p class="confirmation-date">
                  Pagado el: {{ formatOrderDate(order.updated_at || order.updatedAt) }}
                </p>
              </div>
            </div>
            <div class="confirmation-actions">
              
              <button class="btn-view-event" @click="viewEvent(order.event_id || order.eventId)">
                 Ver Detalles del Evento
              </button>
            </div>
          </div>

          <!-- Orden cancelada -->
          <div v-if="order.status === 'cancelled'" class="order-cancelled">
            <span class="cancelled-icon">❌</span>
            <span class="cancelled-text">Orden cancelada</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span>
      <p>{{ error }}</p>
      <button @click="loadOrders" class="btn-retry">Reintentar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ordersApi } from '@/api/compras'
import { getEventById } from '@/api/events'

const router = useRouter()
const orders = ref([])
const eventsInfo = ref({}) // Cache para información de eventos
const isLoading = ref(false)
const isPaying = ref(null)
const error = ref('')

// Computed para estadísticas
const paidOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'paid').length
)

const pendingOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'pending').length
)

// Computed para órdenes con información completa de eventos
const ordersWithEventInfo = computed(() => {
  return orders.value.map(order => {
    const eventId = order.event_id || order.eventId
    return {
      ...order,
      eventDetails: eventsInfo.value[eventId] || null
    }
  })
})

// Cargar órdenes
const loadOrders = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const ordersData = await ordersApi.getMyOrders()
    orders.value = Array.isArray(ordersData) ? ordersData : []
    
    // Cargar información de eventos para cada orden
    await loadEventsInfo()
    
    
  } catch (err) {
    error.value = 'Error cargando órdenes: ' + (err.message || 'Intenta nuevamente')
    console.error('Error loading orders:', err)
  } finally {
    isLoading.value = false
  }
}

// Cargar información de eventos para todas las órdenes
const loadEventsInfo = async () => {
  const eventIds = [...new Set(orders.value.map(order => order.event_id || order.eventId))]
  
  const eventPromises = eventIds.map(async (eventId) => {
    try {
      const eventInfo = await getEventById(eventId)
      eventsInfo.value[eventId] = {
        ...eventInfo,
        image: getEventImage(eventInfo, eventId)
      }
    } catch (err) {
      console.error(`Error cargando evento ${eventId}:`, err)
      eventsInfo.value[eventId] = null
    }
  })

  await Promise.all(eventPromises)
}

// Pagar orden
const payOrder = async (orderId) => {
  isPaying.value = orderId
  error.value = ''

  try {
    const result = await ordersApi.payOrder(orderId)
    
    // Actualizar la orden localmente
    const orderIndex = orders.value.findIndex(order => 
      order.id === orderId || order.orderId === orderId
    )
    
    if (orderIndex !== -1) {
      orders.value[orderIndex] = { 
        ...orders.value[orderIndex], 
        ...result,
        status: 'paid',
        updatedAt: new Date().toISOString()
      }
    }
    
    showNotification('¡Pago procesado exitosamente! Se ha enviado un correo de confirmación.')
  } catch (err) {
    error.value = 'Error procesando pago: ' + (err.message || 'Intenta nuevamente')
    console.error('Error paying order:', err)
  } finally {
    isPaying.value = null
  }
}

// Cancelar orden
const cancelOrder = async (orderId) => {
  if (confirm('¿Estás seguro de que quieres cancelar esta orden?')) {
    try {
      // Aquí iría la llamada a la API para cancelar
      const orderIndex = orders.value.findIndex(order => 
        order.id === orderId || order.orderId === orderId
      )
      
      if (orderIndex !== -1) {
        orders.value[orderIndex].status = 'cancelled'
        orders.value[orderIndex].updatedAt = new Date().toISOString()
      }
      
      showNotification('Orden cancelada exitosamente')
    } catch (err) {
      error.value = 'Error cancelando orden: ' + err.message
    }
  }
}



// Ver detalles del evento
const viewEvent = (eventId) => {
  router.push(`/client/events/${eventId}`)
}

// Mostrar notificación
const showNotification = (message) => {
  // Podrías integrar un sistema de notificaciones toast aquí
  alert(message) // Temporal - reemplazar con toast system
}

// Helpers
const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Pendiente de pago',
    'paid': 'Pagado ✓',
    'cancelled': 'Cancelado'
  }
  return statusMap[status] || status
}

const formatOrderDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatEventDate = (dateString) => {
  if (!dateString) return 'Fecha por confirmar'
  return new Date(dateString).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateUnitPrice = (order) => {
  const total = order.total_amount || order.totalAmount
  const quantity = order.quantity
  return quantity > 0 ? (total / quantity).toFixed(2) : '0.00'
}

const truncateDescription = (description, maxLength = 120) => {
  if (!description) return 'Sin descripción disponible'
  return description.length > maxLength 
    ? description.substring(0, maxLength) + '...' 
    : description
}

const getEventImage = (eventInfo, eventId) => {
  // Si el evento ya tiene una imagen, usarla
  if (eventInfo.image) return eventInfo.image
  
  // Si no, generar una imagen por defecto basada en el ID
  return getDefaultEventImage(eventId)
}

const getDefaultEventImage = (eventId) => {
  const images = [
    new URL('@/assets/portada-1.png', import.meta.url).href,
    new URL('@/assets/portada-2.png', import.meta.url).href,
    new URL('@/assets/portada-3.png', import.meta.url).href,
    new URL('@/assets/portada-4.png', import.meta.url).href,
    new URL('@/assets/portada-5.png', import.meta.url).href,
    new URL('@/assets/portada-6.png', import.meta.url).href,
    new URL('@/assets/portada-7.png', import.meta.url).href,
    new URL('@/assets/portada-8.png', import.meta.url).href,
    new URL('@/assets/portada-9.png', import.meta.url).href,
    new URL('@/assets/portada-10.png', import.meta.url).href
  ]
  // Usar el eventId para generar un índice consistente
  const index = (parseInt(eventId) || 0) % images.length
  return images[index]
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.orders-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1.1rem;
  color: #6b7280;
}

/* Estados */
.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-left: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #e2e8f0;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #374151;
  margin-bottom: 8px;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 24px;
}

/* Estadísticas */
.orders-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Grid de órdenes */
.orders-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Tarjeta de orden */
.order-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

.order-card.pending {
  border-left: 6px solid #f59e0b;
}

.order-card.paid {
  border-left: 6px solid #10b981;
}

.order-card.cancelled {
  border-left: 6px solid #ef4444;
  opacity: 0.7;
}

/* Header de orden */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.order-number {
  display: flex;
  align-items: center;
  gap: 12px;
}

.number-badge {
  background: #3b82f6;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
}

.order-info {
  display: flex;
  flex-direction: column;
}

.order-id {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.order-date {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 4px 0 0 0;
}

.order-status {
  text-align: right;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.pending {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.paid {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.cancelled {
  background: #fee2e2;
  color: #dc2626;
}

.total-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
  margin: 8px 0 0 0;
}

/* Información del evento */
.event-info {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
}

.event-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-details {
  flex: 1;
}

.event-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.event-meta p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.event-description {
  font-style: italic;
  color: #6b7280;
  line-height: 1.4;
}

.event-tickets {
  display: flex;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.event-tickets p {
  margin: 0;
  font-weight: 500;
  color: #374151;
}

/* Detalles de compra */
.purchase-details {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item.total {
  font-weight: 600;
  color: #059669;
  font-size: 1.1rem;
  border-top: 2px solid #e5e7eb;
  margin-top: 8px;
  padding-top: 12px;
}

.label {
  color: #6b7280;
}

.value {
  color: #1f2937;
  font-weight: 500;
}

/* Acciones */
.order-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.confirmation-actions {
  display: flex;
  gap: 12px;
}

.btn-pay, .btn-cancel, .btn-download, .btn-view-event, .btn-primary, .btn-retry {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.btn-pay {
  background: #10b981;
  color: white;
}

.btn-pay:hover:not(:disabled) {
  background: #059669;
}

.btn-pay:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background: #6b7280;
  color: white;
}

.btn-cancel:hover {
  background: #4b5563;
}

.btn-download {
  background: #3b82f6;
  color: white;
}

.btn-download:hover {
  background: #2563eb;
}

.btn-view-event {
  background: #8b5cf6;
  color: white;
}

.btn-view-event:hover {
  background: #7c3aed;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  text-decoration: none;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-retry {
  background: #ef4444;
  color: white;
  margin-left: 12px;
}

.btn-retry:hover {
  background: #dc2626;
}

.btn-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Confirmación */
.order-confirmation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #d1fae5;
  border-radius: 8px;
  border: 1px solid #a7f3d0;
}

.confirmation-badge {
  display: flex;
  align-items: center;
  gap: 12px;
}

.confirmation-icon {
  font-size: 1.5rem;
}

.confirmation-text {
  display: flex;
  flex-direction: column;
}

.confirmation-text strong {
  color: #065f46;
}

.confirmation-text p {
  margin: 2px 0 0 0;
  color: #047857;
  font-size: 0.875rem;
}

.confirmation-date {
  font-size: 0.8rem !important;
  color: #065f46 !important;
  margin-top: 4px !important;
}

/* Orden cancelada */
.order-cancelled {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fef2f2;
  border-radius: 8px;
  color: #dc2626;
  font-weight: 600;
}

/* Error */
.error-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  margin-top: 20px;
}

.error-icon {
  font-size: 1.25rem;
}

.error-message p {
  margin: 0;
  flex: 1;
}

/* Animaciones */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .orders-list {
    padding: 16px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .order-header {
    flex-direction: column;
    gap: 12px;
  }
  
  .order-status {
    text-align: left;
    width: 100%;
  }
  
  .event-info {
    flex-direction: column;
    text-align: center;
  }
  
  .event-image {
    align-self: center;
  }
  
  .order-actions, .confirmation-actions {
    flex-direction: column;
  }
  
  .order-confirmation {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .orders-stats {
    grid-template-columns: 1fr;
  }
  
  .event-tickets {
    flex-direction: column;
    gap: 8px;
  }
}
</style>