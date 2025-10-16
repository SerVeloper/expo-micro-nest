<template>
  <div class="p-8 bg-gray-900 min-h-screen text-white">
    <h1 class="text-3xl font-bold mb-6 text-blue-400">Eventos Disponibles</h1>

    <div v-if="loading" class="text-center text-gray-400">Cargando eventos...</div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @click="goToDetail(event.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllEvents } from '@/api/events'
import EventCard from '@/components/client/EventCard.vue'
import { useRouter } from 'vue-router'

const events = ref([])
const loading = ref(true)
const router = useRouter()

const goToDetail = (id) => {
  router.push(`/client/events/${id}`)
}

onMounted(async () => {
  try {
    events.value = await getAllEvents()
  } catch (error) {
    console.error('Error al obtener eventos:', error)
  } finally {
    loading.value = false
  }
})
</script>
