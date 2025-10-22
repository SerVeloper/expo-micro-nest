<template>
  <div v-if="event" class="event-detail">
    <div class="event-image-container">
      <img :src="eventImage" alt="Imagen del evento" class="event-image" />
    </div>

    <div class="event-info">
      <h2 class="event-title">{{ event.name }}</h2>
      <p class="event-date">{{ formattedDate }}</p>
      <p class="event-place"> Lugar: {{ event.place }}</p>
      <p class="event-price"> Precio: {{ event.price }} Bs</p>
      <p class="event-capacity"> Capacidad: {{ event.capacity }} personas</p>
    </div>

    <div class="event-buttons">
      <button class="btn back" @click="goBack">Volver</button>
      <!-- <button class="btn buy" disabled>Comprar</button> -->
      <button class="btn buy" @click="goToCreateOrder">Comprar</button>
    </div>
  </div>

  <div v-else class="loading">Cargando evento...</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const event = ref(null)

// 🔹 Cargar el evento al montar el componente
onMounted(async () => {
  try {
    const { id } = route.params
    const response = await axios.get(`http://localhost:3001/events/${id}`)
    event.value = response.data
  } catch (error) {
    console.error('Error al cargar el evento:', error)
  }
})

// 🔹 Formatear la fecha
const formattedDate = computed(() => {
  if (!event.value?.date) return ''
  const date = new Date(event.value.date)
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

// 🔹 Imagen aleatoria para cada evento
const images = [
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
const eventImage = images[Math.floor(Math.random() * images.length)]

// 🔹 Navegar hacia atrás
const goBack = () => router.back()
// 🔹 Navegar a la página de creación de la orden                                                             
const goToCreateOrder = () => {                                                                             
   if (event.value) {                                                                                        
     router.push({ name: 'CreateOrder', params: { eventId: event.value.id } })                               
   }                                                                                                         
 } 
</script>

<style scoped>
.event-detail {
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
}

.event-detail:hover {
  transform: translateY(-3px);
}

.event-image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-info {
  padding: 20px 30px;
  text-align: left;
}

.event-title {
  font-size: 2rem;
  color: #222;
  margin-bottom: 10px;
}

.event-date {
  color: #666;
  font-style: italic;
  margin-bottom: 12px;
}

.event-place,
.event-price,
.event-capacity {
  margin: 8px 0;
  font-size: 1.1rem;
}

.event-buttons {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  border-top: 1px solid #eee;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn.back {
  background-color: #e0e0e0;
  color: #333;
}

.btn.back:hover {
  background-color: #d6d6d6;
}

.btn.buy {
  background-color: #007bff;
  color: #fff;
}
.btn.buy:hover {                                                                                             
    background-color: #0056b3;                                                                                 
  }
.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}
</style>
