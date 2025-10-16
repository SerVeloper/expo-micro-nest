<template>
  <aside class="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
    <h2 class="text-2xl font-bold mb-8">Menú</h2>

    <nav class="flex flex-col gap-4">
      <!-- Botón de eventos -->
      <button
        @click="$emit('navigate', 'events')"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Eventos
      </button>

      <!-- Otros botones (pueden quedar inactivos por ahora) -->
      <button
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
        disabled
      >
        Boletos
      </button>

      <button
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
        disabled
      >
        Mis Compras
      </button>

      <!-- Cerrar sesión -->
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
</script>

<style scoped>
</style>
