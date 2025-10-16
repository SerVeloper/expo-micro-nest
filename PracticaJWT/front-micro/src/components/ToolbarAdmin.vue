<template>
  <aside class="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
    <h2 class="text-2xl font-bold mb-8">Menú</h2>

    <nav class="flex flex-col gap-4">
      <button
        @click="$emit('navigate', 'events')"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Eventos
      </button>

      <button
        @click="$emit('navigate', 'tickets')"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Boletos
      </button>

      <button
        @click="$emit('navigate', 'purchases')"
        class="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Mis Compras
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
</script>

<style scoped>
</style>
