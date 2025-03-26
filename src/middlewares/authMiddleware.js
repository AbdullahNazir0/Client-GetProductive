import api from '../utils/axios.js'

export async function authMiddleware(to, from, next) {
  try {
    if (!authStore.isAuthenticated) {
      const response = await api.get('/users/status', { withCredentials: true })
      authStore.setUser(response.data)
    }

    next()
  } catch (error) {
    next('/auth/login')
  }
}
