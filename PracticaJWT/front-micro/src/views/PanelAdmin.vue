<template>
  <div class="flex min-h-screen">
    <ToolbarAdmin @navigate="navigate" @logout="logout" />
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Toolbar from '@/components/ToolbarAdmin.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigate = (section) => {
  if (section === 'events') {
    router.push('/admin/events')
  }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
