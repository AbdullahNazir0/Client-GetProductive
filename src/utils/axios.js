import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.BASE_URI}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
