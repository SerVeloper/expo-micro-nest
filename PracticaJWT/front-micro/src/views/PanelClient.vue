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
</script>

<style scoped>
/* Toolbar ocupa toda la altura gracias a flex */
</style>
