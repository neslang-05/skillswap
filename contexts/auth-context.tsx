'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  userId: string | null
  setUserId: (value: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check')
        if (res.ok) {
          const data = await res.json()
          setIsAuthenticated(true)
          setUserId(data.userId)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      }
    }
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 