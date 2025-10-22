<template>
  <aside class="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
    <h2 class="text-2xl font-bold mb-8">Menú</h2>

    <nav class="flex flex-col gap-4">
      <button
        @click="goEvents"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Eventos
      </button>
      <button
        
        @click="navigateTo('orders')"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
        :class="{ 'bg-gray-700': currentRoute === 'orders' }"
      >
        Mis Compras
      </button>
      <!-- Otros botones se pueden habilitar luego -->
      <button
        @click="logout"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition mt-auto"
      >
        Cerrar Sesión
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const goEvents = () => {
  router.push({ name: 'ClientEvents' })
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Determinar la ruta actual para resaltar el botón activo
const currentRoute = computed(() => {
  if (route.name === 'EventsClient' || route.name === 'EventDetail') {
    return 'events'
  } else if (route.name === 'MyOrders') {
    return 'orders'
  }
  return ''
})

const navigateTo = (destination) => {
  switch (destination) {
    
    case 'orders':
      router.push('/client/orders')
      break
  }
}

defineEmits(['logout'])
</script>

<style scoped>
/* Opcional: estilos personalizados */
</style>
