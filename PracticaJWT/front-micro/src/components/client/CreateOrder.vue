<!-- src/components/client/CreateOrder.vue -->
<template>
  <div class="create-order">
    <h2 class="text-2xl font-bold mb-6">Realizar Compra</h2>

    <!-- Estado de carga -->
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Cargando información del evento...</p>
    </div>

    <!-- Contenido cuando ya cargó -->
    <div v-else>
      <!-- Notificaciones -->
      <div v-if="notification" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
        {{ notification }}
      </div>
      <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
        {{ error }}
      </div>

      <!-- Información del Evento -->
      <div v-if="event" class="event-info bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4">{{ event.name }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Fecha:</strong> {{ formatDate(event.date) }}</p>
            <p><strong>Descripción:</strong> {{ event.description }}</p>
          </div>
          <div>
            <p><strong>Precio por ticket:</strong> ${{ event.price }}</p>
            <p><strong>Tickets disponibles:</strong> {{ event.available_tickets || event.capacity }}</p>
          </div>
        </div>
      </div>

      <!-- Error si no se encuentra el evento -->
      <div v-else class="bg-red-50 border border-red-200 rounded-md p-6 text-center">
        <p class="text-red-700">No se pudo cargar la información del evento</p>
        <button @click="$router.back()" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
          Volver
        </button>
      </div>

      <!-- Paso 1: Formulario de Compra (si no se ha creado la orden y el evento existe) -->
      <div v-if="!createdOrder && event" class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Detalles de la Compra</h3>
        <form @submit.prevent="handleCreateOrder" class="space-y-4">
          <div class="form-group">
            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de tickets:
            </label>
            <input
              type="number"
              id="quantity"
              v-model.number="quantity"
              min="1"
              :max="getAvailableTickets"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p class="text-sm text-gray-500 mt-1">
              Máximo disponible: {{ getAvailableTickets }} tickets
            </p>
          </div>

          <div v-if="quantity > 0" class="bg-blue-50 rounded-lg p-4">
            <h4 class="font-semibold mb-2">Resumen de la compra:</h4>
            <div class="space-y-1">
              <p><strong>Tickets:</strong> {{ quantity }} x ${{ event.price }}</p>
              <p class="text-lg font-bold text-green-600">Total: ${{ totalAmount }}</p>
            </div>
          </div>

          <div class="flex gap-4 pt-4">
            <button type="button" @click="$router.back()" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
              Cancelar
            </button>
            <button 
              type="submit" 
              :disabled="isLoading || !quantity || quantity > getAvailableTickets" 
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {{ isLoading ? 'Creando orden...' : 'Crear Orden' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Paso 2: Pagar Orden (si ya se creó) -->
      <div v-if="createdOrder" class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Proceder al Pago</h3>
        <div class="bg-green-50 rounded-lg p-4 text-center">
          <p class="font-semibold">Orden Creada: {{ createdOrder.orderId }}</p>
          <p class="text-2xl font-bold text-green-600 mt-2">Total a Pagar: ${{ totalAmount }}</p>
          <button 
            @click="handlePayOrder" 
            :disabled="isLoading" 
            class="mt-6 w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-lg font-bold"
          >
            {{ isLoading ? 'Procesando pago...' : 'Pagar Ahora' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ordersApi } from '@/api/compras'
import { getEventById } from '@/api/events'

const route = useRoute()
const router = useRouter()

const event = ref(null)
const quantity = ref(1)
const isLoading = ref(false)
const loading = ref(true) // Nuevo estado para carga inicial
const error = ref('')
const notification = ref('')
const createdOrder = ref(null)

// Computed para calcular el total
const totalAmount = computed(() => {
  if (!event.value || !quantity.value) return '0.00'
  return (event.value.price * quantity.value).toFixed(2)
})

// Computed para manejar tickets disponibles (compatible con available_tickets o capacity)
const getAvailableTickets = computed(() => {
  if (!event.value) return 0
  return event.value.available_tickets || event.value.capacity || 0
})

// Formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Cargar información del evento
const loadEvent = async () => {
  loading.value = true
  error.value = ''
  try {
    const eventId = route.params.eventId
    console.log('Cargando evento ID:', eventId)
    
    if (!eventId) {
      throw new Error('No se proporcionó ID del evento')
    }
    
    event.value = await getEventById(eventId)
    console.log('Evento cargado:', event.value)
    
    if (!event.value) {
      throw new Error('Evento no encontrado')
    }
  } catch (err) {
    console.error('Error loading event:', err)
    error.value = err.message || 'Error cargando información del evento'
    event.value = null
  } finally {
    loading.value = false
  }
}

// 1. Crear la orden
const handleCreateOrder = async () => {
  if (!event.value) {
    error.value = 'No hay información del evento'
    return
  }

  isLoading.value = true
  error.value = ''
  notification.value = ''

  try {
    const result = await ordersApi.createOrder(event.value.id, quantity.value)
    createdOrder.value = result
    notification.value = `¡Orden creada exitosamente! ID: ${result.orderId}. Ahora puedes proceder al pago.`
  } catch (err) {
    error.value = err.message || 'Error creando la orden'
    console.error('Error creating order:', err)
  } finally {
    isLoading.value = false
  }
}

// 2. Pagar la orden
const handlePayOrder = async () => {
  if (!createdOrder.value) {
    error.value = 'No hay orden para pagar'
    return
  }

  isLoading.value = true
  error.value = ''
  notification.value = ''

  try {
    await ordersApi.payOrder(createdOrder.value.orderId)
    notification.value = '¡Pago realizado con éxito! Redirigiendo a Mis Compras...'
    
    setTimeout(() => {
      router.push('/client/orders')
    }, 2000)

  } catch (err) {
    error.value = err.message || 'Error procesando el pago'
    console.error('Error paying order:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadEvent()
})
</script>

<style scoped>
.create-order {
  max-width: 800px;
  margin: 0 auto;
}

.event-info {
  border-left: 4px solid #3b82f6;
}
</style>