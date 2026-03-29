import { createContext, useContext, useState } from 'react'
import { mockUsers } from '../data/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('claimtrack-user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = (email, password) => {
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!user) return { success: false, error: 'Invalid email or password.' }

    // Never store the password
    const { password: _pw, ...safeUser } = user
    setCurrentUser(safeUser)
    localStorage.setItem('claimtrack-user', JSON.stringify(safeUser))
    return { success: true }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('claimtrack-user')
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
