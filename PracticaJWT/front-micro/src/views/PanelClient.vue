<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-900">
    <!-- Sidebar / Toolbar del cliente -->
    <ToolbarClient 
      class="bg-gray-900 text-white"
    />

    <!-- Contenido principal según subruta -->
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import ToolbarClient from '@/components/ToolbarClient.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const currentView = ref('events') // vista inicial

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Manejo de navegación desde el toolbar
const handleNavigate = (view) => {
  if (view === 'events') currentView.value = 'events'
  // puedes agregar más vistas aquí si activas los otros botones
}
</script>

<style scoped>
/* Toolbar ocupa toda la altura gracias a flex */
</style>
