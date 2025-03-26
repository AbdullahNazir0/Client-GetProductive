import api from '../utils/axios.js'

export async function authMiddleware(to, from, next) {
  try {
    await api.get('/users/status', { withCredentials: true })

    next()
  } catch (error) {
    next('/auth/login')
  }
}
