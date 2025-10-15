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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>

        <h1 class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
          Bienvenido
        </h1>
        <p class="text-gray-300 mb-10 text-sm">
          Accede a tu cuenta para continuar
        </p>

        <button
          @click="goLogin"
          class="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold text-white text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Iniciar Sesión
        </button>

        <p class="text-gray-400 text-xs mt-8">
           © 2025 Venta de Tickets. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => router.push('/login')
</script>