<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800">
    <div class="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center">
      <h1 class="text-4xl font-bold text-blue-400 mb-8">
        Registro de Usuario
      </h1>
      <form @submit.prevent="register">
        <div class="mb-4">
          <input
            type="text"
            v-model="username"
            placeholder="Usuario"
            class="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <input
            type="email"
            v-model="email"
            placeholder="Correo Electrónico"
            class="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-6">
          <input
            type="password"
            v-model="password"
            placeholder="Contraseña"
            class="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white text-lg transition-all"
        >
          Registrarse
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const register = async () => {
  const success = await authStore.register(username.value, email.value, password.value)
  if (success) {
    // Opcional: mostrar un mensaje de éxito
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.')
    router.push('/login')
  } else {
    // Opcional: mostrar un mensaje de error
    alert('Error en el registro. Inténtalo de nuevo.')
  }
}
</script>
