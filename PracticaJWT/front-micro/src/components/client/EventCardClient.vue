<template>
  <div class="event-card" @click="$emit('click')">
    <!-- Parte superior: imagen -->
    <div class="event-image">
      <img :src="eventImage" alt="Imagen del evento" />
    </div>

    <!-- Parte media: nombre y fecha -->
    <div class="event-info bg-gray-700">
      <h3 class="event-name">{{ event.name }}</h3>
      <p class="event-date">{{ formattedDate }}</p>
    </div>

    <!-- Parte inferior: lugar y precio -->
    <div class="event-details">
      <p class="event-place">{{ event.place }}</p>
      <p class="event-price">$ {{ event.price }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props del componente
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

// Formatear la fecha
const formattedDate = computed(() => {
  if (!props.event?.date) return ''
  const date = new Date(props.event.date)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

// Imagen del evento (puedes colocar una imagen genérica en assets)
const eventImage = computed(() => {
  const imgs = [
    new URL('@/assets/portada-1.png', import.meta.url).href,
    new URL('@/assets/portada-2.png', import.meta.url).href,
    new URL('@/assets/portada-3.png', import.meta.url).href,
    new URL('@/assets/portada-4.png', import.meta.url).href,
    new URL('@/assets/portada-5.png', import.meta.url).href,
    new URL('@/assets/portada-6.png', import.meta.url).href,
    new URL('@/assets/portada-7.png', import.meta.url).href,
    new URL('@/assets/portada-8.png', import.meta.url).href,
    new URL('@/assets/portada-9.png', import.meta.url).href,
    new URL('@/assets/portada-10.png', import.meta.url).href
  ]
  return imgs[Math.floor(Math.random() * imgs.length)]
})
</script>

<style scoped>
.event-card {
  width: 220px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

/* Parte superior: imagen */
.event-image img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

/* Parte media: nombre y fecha */
.event-info {
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
}

.event-name {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 4px;
  color: #fff;
}

.event-date {
  font-size: 0.85rem;
  color: #ccc;
}

/* Parte inferior: lugar y precio */
.event-details {
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
}
</style>
