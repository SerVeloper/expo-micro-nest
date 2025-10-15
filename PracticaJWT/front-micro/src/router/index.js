import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PanelAdmin from '@/views/PanelAdmin.vue'
import PanelClient from '@/views/PanelClient.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/admin', name: 'Admin', component: PanelAdmin },
  { path: '/client', name: 'Client', component: PanelClient },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
