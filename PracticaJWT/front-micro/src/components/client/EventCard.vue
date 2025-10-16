<template>
  <div
    class="bg-white/10 backdrop-blur-lg p-5 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer border border-white/10"
    @click="$emit('view-event', event.id)"
  >
    <h3 class="text-xl font-bold text-blue-300 mb-2">
      {{ event.name }}
    </h3>
    <p class="text-sm text-gray-300">
      📅 {{ formattedDate }}
    </p>
    <p class="text-sm text-gray-300">
      📍 {{ event.place }}
    </p>
    <p class="text-sm text-gray-200 mt-2 font-semibold">
      💵 Bs. {{ event.price }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() =>
  new Date(props.event.date).toLocaleString('es-BO', {
    dateStyle: 'long',
    timeStyle: 'short'
  })
)
</script>
