<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-900">
    <!-- Sidebar / Toolbar -->
    <Toolbar 
      @go-home="goHome" 
      @go-profile="goProfile" 
      @logout="logout" 
      class="bg-gray-900 text-white"
    />

    <!-- Contenido principal -->
    <main class="flex-1 p-6">
      <h2 class="text-3xl font-bold mb-4">Panel de Cliente</h2>
    </main>
  </div>
</template>

<script setup>
import Toolbar from '@/components/Toolbar.vue'

const goHome = () => console.log('Volver al inicio')
const goProfile = () => console.log('Ir al perfil')
const logout = () => console.log('Cerrar sesión')
</script>

<style scoped>
/* Opcional: que el toolbar ocupe toda la altura */
</style>
