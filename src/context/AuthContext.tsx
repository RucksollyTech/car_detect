'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { clearTokens, isAuthenticated } from '@/lib/auth'
import api from '@/lib/api'

interface User { id: number; username: string; email: string }
interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const { data } = await api.get('/api/auth/me/')
      setUser(data)
    } catch {
      setUser(null)
    }
  }

  const logout = async () => {
    try {
      const { default: Cookies } = await import('js-cookie')
      await api.post('/api/auth/logout/', { refresh: Cookies.get('refresh') })
    } finally {
      clearTokens()
      setUser(null)
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      refreshUser().finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)