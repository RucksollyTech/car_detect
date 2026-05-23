import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const setTokens = (access: string, refresh: string) => {
  Cookies.set('access', access,  { expires: 1/24 })  // 1 hour
  Cookies.set('refresh', refresh, { expires: 7 })     // 7 days
}

export const clearTokens = () => {
  Cookies.remove('access')
  Cookies.remove('refresh')
}

export const isAuthenticated = (): boolean => {
  const token = Cookies.get('access')
  if (!token) return false
  try {
    const { exp } = jwtDecode<{ exp: number }>(token)
    return Date.now() < exp * 1000
  } catch { return false }
}