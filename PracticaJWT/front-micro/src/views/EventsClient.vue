<template>
  <div class="events-grid">
    <EventCardClient
      v-for="event in events"
      :key="event.id"
      :event="event"
      @click="viewEventDetail(event.id)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EventCardClient from '@/components/client/EventCardClient.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const events = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3001/events')
    events.value = await res.json()
  } catch (error) {
    console.error('Error al obtener eventos:', error)
  }
})

const viewEventDetail = (id) => {
  router.push(`/client/events/${id}`)
}
</script>

<style scoped>
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
