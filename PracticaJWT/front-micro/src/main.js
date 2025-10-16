import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

const authStore = useAuthStore()
authStore.initialize().then(() => {
  app.use(router)
  app.mount('#app')
})
