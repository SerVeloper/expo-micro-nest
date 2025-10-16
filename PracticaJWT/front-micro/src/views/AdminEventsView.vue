<template>
  <div class="p-6 text-gray-900 dark:text-gray-100">
    <!-- Encabezado -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-3">
        <input
          type="text"
          placeholder="Buscar evento..."
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
        <button
          disabled
          class="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed"
        >
          Buscar
        </button>
      </div>

      <button
        @click="openCreateModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        Crear Evento
      </button>
    </div>

    <!-- Tabla de eventos -->
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg">
        <thead class="bg-gray-100 dark:bg-gray-800 text-left">
          <tr>
            <th class="px-4 py-2 border-b dark:border-gray-700">#</th>
            <th class="px-4 py-2 border-b dark:border-gray-700">Nombre</th>
            <th class="px-4 py-2 border-b dark:border-gray-700">Fecha</th>
            <th class="px-4 py-2 border-b dark:border-gray-700">Lugar</th>
            <th class="px-4 py-2 border-b dark:border-gray-700">Capacidad</th>
            <th class="px-4 py-2 border-b dark:border-gray-700">Precio (Bs)</th>
            <th class="px-4 py-2 border-b dark:border-gray-700 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        <tr
            v-for="(event, index) in events"
            :key="event.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
        >
            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 font-mono">
            {{ index + 1 }}
            </td>
            <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ event.name }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
            {{ formattedDate(event.date) }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
            {{ event.place }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 text-center">
            <span class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                {{ event.capacity }}
            </span>
            </td>
            <td class="px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">
            ${{ event.price }}
            </td>
            <td class="px-4 py-3 text-sm">
            <div class="flex justify-center space-x-1">
                <button
                @click="openEditModal(event)"
                class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Editar"
                >
                ✏️
                </button>
                <button
                @click="openDeleteModal(event)"
                class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Eliminar"
                >
                🗑️
                </button>
            </div>
            </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="events.length === 0"
      class="text-center text-gray-500 dark:text-gray-400 mt-10"
    >
      No hay eventos registrados.
    </div>

    <!-- Modal Crear / Editar -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-96 p-6 text-gray-800 dark:text-gray-100 transition-all"
      >
        <h2 class="text-2xl font-semibold mb-4 text-center">
          {{ isEditing ? 'Editar Evento' : 'Crear Evento' }}
        </h2>

        <form @submit.prevent="isEditing ? updateEvent() : createEvent()" class="space-y-3">
          <input
            v-model="form.name"
            type="text"
            placeholder="Nombre del evento"
            class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-800"
            required
          />
          <input
            v-model="form.date"
            type="date"
            class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-800"
            required
          />
          <input
            v-model="form.place"
            type="text"
            placeholder="Lugar"
            class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-800"
            required
          />
          <input
            v-model.number="form.capacity"
            type="number"
            placeholder="Capacidad"
            class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-800"
            required
          />
          <input
            v-model.number="form.price"
            type="number"
            placeholder="Precio"
            class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-800"
            required
          />

          <div class="flex justify-between mt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              {{ isEditing ? 'Guardar Cambios' : 'Crear' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Confirmar Eliminación -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-gray-800 dark:text-gray-100"
    >
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-80 p-6 text-center text-gray-800 dark:text-gray-100">
        <h3 class="text-lg font-semibold mb-4">¿Eliminar este evento?</h3>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Esta acción no se puede deshacer.
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            @click="deleteEvent"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const events = ref([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedEvent = ref(null)

const form = ref({
  name: '',
  date: '',
  place: '',
  capacity: null,
  price: null,
})

const fetchEvents = async () => {
  try {
    const res = await fetch('http://localhost:3001/events')
    if (!res.ok) throw new Error('Error al obtener eventos')
    events.value = await res.json()
  } catch (error) {
    console.error('Error al cargar eventos:', error)
  }
}

onMounted(fetchEvents)

const openCreateModal = () => {
  isEditing.value = false
  Object.assign(form.value, { name: '', date: '', place: '', capacity: null, price: null })
  showModal.value = true
}

const openEditModal = (event) => {
  isEditing.value = true
  selectedEvent.value = event
  Object.assign(form.value, { ...event })
  showModal.value = true
}

const openDeleteModal = (event) => {
  selectedEvent.value = event
  showDeleteModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const createEvent = async () => {
  try {
    const res = await fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useAuthStore().token}`
      },
      body: JSON.stringify(form.value),
    })
    if (!res.ok) throw new Error('Error al crear evento')
    await fetchEvents()
    showModal.value = false
  } catch (error) {
    console.error(error)
  }
}

const updateEvent = async () => {
  try {
    const res = await fetch(`http://localhost:3001/events/${selectedEvent.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useAuthStore().token}`
      },
      body: JSON.stringify(form.value),
    })
    if (!res.ok) throw new Error('Error al actualizar evento')
    await fetchEvents()
    showModal.value = false
  } catch (error) {
    console.error(error)
  }
}

const deleteEvent = async () => {
  try {
    const res = await fetch(`http://localhost:3001/events/${selectedEvent.value.id}`, {
      method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
        },
    })
    if (!res.ok) throw new Error('Error al eliminar evento')
    await fetchEvents()
    showDeleteModal.value = false
  } catch (error) {
    console.error(error)
  }
}

const formattedDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
