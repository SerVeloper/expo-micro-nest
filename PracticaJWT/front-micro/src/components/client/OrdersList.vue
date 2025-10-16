<!-- src/components/client/OrdersList.vue -->
<template>
  <div class="orders-list">
    <h3>Mis Compras</h3>
    
    <div v-if="isLoading" class="loading">
      Cargando órdenes...
    </div>

    <div v-else-if="orders.length === 0" class="no-orders">
      <p>No tienes órdenes realizadas.</p>
    </div>

    <div v-else class="orders-container">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        class="order-card"
        :class="{
          'pending': order.status === 'pending',
          'paid': order.status === 'paid',
          'cancelled': order.status === 'cancelled'
        }"
      >
        <div class="order-header">
          <h4>Orden #{{ order.id }}</h4>
          <span class="status-badge">{{ getStatusText(order.status) }}</span>
        </div>
        
        <div class="order-details">
          <p><strong>Evento ID:</strong> {{ order.event_id }}</p>
          <p><strong>Cantidad:</strong> {{ order.quantity }} tickets</p>
          <p><strong>Total:</strong> ${{ order.total_amount }}</p>
          <p><strong>Fecha:</strong> {{ new Date(order.created_at).toLocaleDateString() }}</p>
        </div>

        <div v-if="order.status === 'pending'" class="order-actions">
          <button 
            @click="payOrder(order.id)" 
            :disabled="isPaying === order.id"
            class="btn btn-success"
          >
            {{ isPaying === order.id ? 'Procesando...' : 'Pagar Ahora' }}
          </button>
        </div>

        <div v-if="order.status === 'paid'" class="order-confirmation">
          <span class="confirmed">✅ Pago confirmado</span>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ordersApi } from '@/api/compras'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const orders = ref([])
const isLoading = ref(false)
const isPaying = ref(null)
const error = ref('')

const loadOrders = async () => {
  isLoading.value = true
  error.value = ''

  try {
    orders.value = await ordersApi.getMyOrders()
  } catch (err) {
    error.value = 'Error cargando órdenes: ' + err.message
  } finally {
    isLoading.value = false
  }
}

const payOrder = async (orderId) => {
  isPaying.value = orderId
  error.value = ''

  try {
    const result = await ordersApi.payOrder(orderId)
    
    // Actualizar la orden localmente
    const orderIndex = orders.value.findIndex(order => order.id === orderId)
    if (orderIndex !== -1) {
      orders.value[orderIndex] = { ...orders.value[orderIndex], ...result.order }
    }
    
    alert('¡Pago procesado exitosamente! Se ha enviado un correo de confirmación.')
  } catch (err) {
    error.value = 'Error procesando pago: ' + err.message
  } finally {
    isPaying.value = null
  }
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Pendiente de pago',
    'paid': 'Pagado',
    'cancelled': 'Cancelado'
  }
  return statusMap[status] || status
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.orders-list {
  max-width: 800px;
  margin: 0 auto;
}

.loading, .no-orders {
  text-align: center;
  padding: 40px;
  color: #666;
}

.order-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  background: white;
}

.order-card.pending {
  border-left: 4px solid #ffa000;
}

.order-card.paid {
  border-left: 4px solid #4caf50;
}

.order-card.cancelled {
  border-left: 4px solid #f44336;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.pending .status-badge {
  background: #fff3e0;
  color: #e65100;
}

.paid .status-badge {
  background: #e8f5e8;
  color: #2e7d32;
}

.cancelled .status-badge {
  background: #ffebee;
  color: #c62828;
}

.order-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
}

.order-actions {
  text-align: right;
}

.btn-success {
  background: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.order-confirmation {
  text-align: right;
}

.confirmed {
  color: #4caf50;
  font-weight: bold;
}

.error-message {
  color: #d32f2f;
  background: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}
</style>