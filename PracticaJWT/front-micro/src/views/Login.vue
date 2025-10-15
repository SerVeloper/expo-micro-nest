<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 relative overflow-hidden">
    <!-- Elementos decorativos de fondo -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10">
      <div class="bg-white/5 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl text-center border border-white/10 max-w-md w-full mx-4">
        <!-- Logo/Icono -->
        <div class="mb-6 flex justify-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
        </div>

        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          Iniciar Sesión
        </h1>
        <p class="text-gray-400 mb-8 text-sm">
          Ingresa tus credenciales para acceder
        </p>

        <form @submit.prevent="login" class="space-y-4">
          <!-- Campo Usuario -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <input
              type="text"
              v-model="username"
              placeholder="Usuario"
              class="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50"
            />
          </div>

          <!-- Campo Contraseña -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input
              type="password"
              v-model="password"
              placeholder="Contraseña"
              class="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50"
            />
          </div>

          <!-- Mensaje de error -->
          <div v-if="error" class="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm flex items-center gap-2">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- Botón de envío -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-white text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span v-if="!isLoading">Entrar</span>
            <span v-else class="flex items-center gap-2">
              <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Validando...
            </span>
          </button>
        </form>

        <!-- Enlace de regreso -->
        <button
          @click="goHome"
          type="button"
          class="w-full mt-4 px-8 py-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
        >
          ← Volver al inicio
        </button>

        <div class="text-center mt-6">
          <p class="text-gray-400 text-sm">
            ¿No tienes una cuenta?
            <button @click="goToRegister" class="font-semibold text-blue-400 hover:text-blue-300 transition">
              Regístrate aquí
            </button>
          </p>
        </div>

        <p class="text-gray-500 text-xs mt-8">
          © 2025 Venta de Tickets. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  error.value = ''
  isLoading.value = true

  try {
    const success = await authStore.login(username.value, password.value)
    if (success) {
      if (authStore.isAdmin) {
        router.push('/admin')
      } else {
        router.push('/client')
      }
    } else {
      error.value = 'Usuario o contraseña incorrectos'
    }
  } catch (err) {
    error.value = 'Error al conectar con el servidor'
  } finally {
    isLoading.value = false
  }
}

const goHome = () => router.push('/')
const goToRegister = () => router.push('/register')
</script>