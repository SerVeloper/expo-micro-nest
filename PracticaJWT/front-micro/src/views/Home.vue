<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800">
    <div class="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center">
      <h1 class="text-4xl font-bold text-blue-400 mb-8">
        Bienvenido al sistema
      </h1>

      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <button
          @click="goLogin"
          class="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white text-lg transition-all"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => router.push('/login')
</script>
