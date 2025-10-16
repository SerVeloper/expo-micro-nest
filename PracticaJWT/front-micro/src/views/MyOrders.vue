<!-- src/views/MyOrders.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <ToolbarClient @logout="handleLogout" />
    
    <div class="flex-1 overflow-y-auto p-6">
      <div class="my-orders">
        <div class="header">
          <h1 class="text-3xl font-bold text-gray-800">Mis Compras</h1>
          <p class="text-gray-600 mt-2">Gestiona y revisa el estado de tus órdenes</p>
        </div>
        
        <div class="mt-8">
          <OrdersList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ToolbarClient from '@/components/ToolbarClient.vue'
import OrdersList from '@/components/client/OrdersList.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.my-orders {
  max-width: 1200px;
  margin: 0 auto;
}
</style>