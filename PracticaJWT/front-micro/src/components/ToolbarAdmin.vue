<template>
  <aside class="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
    <h2 class="text-2xl font-bold mb-8">Panel Admin</h2>

    <nav class="flex flex-col gap-4">
      <!-- Usuarios (desactivado por ahora) -->
      <button
        disabled
        class="text-left px-4 py-2 rounded bg-gray-800 text-gray-500 cursor-not-allowed"
      >
        Usuarios
      </button>

      <!-- Eventos (activo) -->
      <button
        @click="$emit('navigate', 'events')"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition bg-gray-800"
      >
        Eventos
      </button>

      <!-- Boletos (desactivado) -->
      <button
        disabled
        class="text-left px-4 py-2 rounded bg-gray-800 text-gray-500 cursor-not-allowed"
      >
        Boletos
      </button>

      <!-- Compras (desactivado) -->
      <button
        disabled
        class="text-left px-4 py-2 rounded bg-gray-800 text-gray-500 cursor-not-allowed"
      >
        Compras
      </button>

      <button
        @click="$emit('logout')"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition mt-auto"
      >
        Cerrar Sesión
      </button>
    </nav>
  </aside>
</template>

<script setup>
// No requiere lógica adicional por ahora
</script>

<style scoped>
/* Puedes añadir estilos personalizados si lo deseas */
</style>
