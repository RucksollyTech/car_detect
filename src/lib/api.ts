import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach access token to every request
api.interceptors.request.use(config => {
  const token = Cookies.get('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-refresh on 401
api.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refresh = Cookies.get('refresh')
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/refresh/`,
          { refresh }
        )
        Cookies.set('access', data.access)
        original.headers.Authorization = `Bearer ${data.access}`
        return api(original)
      } catch {
        Cookies.remove('access')
        Cookies.remove('refresh')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api