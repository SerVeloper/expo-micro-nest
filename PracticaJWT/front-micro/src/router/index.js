import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PanelAdmin from '@/views/PanelAdmin.vue'
import PanelClient from '@/views/PanelClient.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/admin',
    name: 'Admin',
    component: PanelAdmin,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'events',
        name: 'AdminEvents',
        component: () => import('@/views/AdminEventsView.vue')
      },
    ]
  },
  {
    path: '/client',
    name: 'Client',
    component: PanelClient,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'events',
        name: 'ClientEvents',
        component: () => import('@/views/EventsClient.vue')
      },
      {
        path: 'events/:id',
        name: 'ClientEventDetail',
        component: () => import('@/components/client/EventDetail.vue'),
        props: true
      }
    ]
  },
  {
    path: '/client/orders',
    name: 'MyOrders',
    component: () => import('@/views/MyOrders.vue'),
    meta: { requiresAuth: true, role: 'client' }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'Login' })
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return next({ name: 'Client' })
  }

  next()
})

export default router
