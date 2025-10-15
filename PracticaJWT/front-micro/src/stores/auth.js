import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.roles?.includes('admin'),
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/token/', {
          username,
          password,
        })
        const token = response.data.access
        this.token = token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        const decodedToken = jwtDecode(token)
        await this.fetchUser(decodedToken.user_id)

        return true
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        return false
      }
    },
    async fetchUser(userId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/auth/users/${userId}/`)
        this.user = response.data
      } catch (error) {
        console.error('Error al obtener el usuario:', error)
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
    async register(username, email, password) {
      try {
        await axios.post('http://127.0.0.1:8000/api/auth/register/', {
          username,
          email,
          password,
        })
        return true
      } catch (error) {
        console.error('Error en el registro:', error)
        return false
      }
    },
  },
})
