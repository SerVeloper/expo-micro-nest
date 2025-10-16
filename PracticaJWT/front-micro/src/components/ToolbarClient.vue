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
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const goEvents = () => {
  router.push({ name: 'ClientEvents' })
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Opcional: estilos personalizados */
</style>
