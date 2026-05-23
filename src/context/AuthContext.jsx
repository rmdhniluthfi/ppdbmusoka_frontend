import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const res = await api.get('api/auth/me')
      setUser(res.data.user)
    } catch {
      setUser(null)
      sessionStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    const res = await api.post('api/auth/login', { email, password })
    setUser(res.data.user)
    sessionStorage.setItem('user', JSON.stringify(res.data.user))
    return res.data.user
  }

  async function register(data) {
    const res = await api.post('api/auth/register', data)
    setUser(res.data.user)
    sessionStorage.setItem('user', JSON.stringify(res.data.user))
    return res.data.user
  }

  async function logout() {
    try { await api.post('api/auth/logout') } catch {}
    setUser(null)
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('csrf_token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
