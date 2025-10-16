// src/composables/useAuth.js
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  
  // Verificar autenticación
  const checkAuth = () => {
    return authStore.isAuthenticated
  }
  
  // Obtener headers de autenticación (por si los necesitas en otro lugar)
  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer ${authStore.token}`,
      'Content-Type': 'application/json'
    }
  }
  
  // Obtener información del usuario
  const getUserInfo = () => {
    return {
      id: authStore.user?.id,
      name: authStore.user?.username,
      email: authStore.user?.email,
      role: authStore.user?.roles?.[0] || 'client'
    }
  }
  
  return {
    checkAuth,
    getAuthHeaders,
    getUserInfo,
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    isAdmin: authStore.isAdmin,
    login: authStore.login,
    logout: authStore.logout,
    register: authStore.register
  }
}