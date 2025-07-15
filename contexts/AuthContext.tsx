import { Session, User } from '@supabase/supabase-js'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { authService } from '../services/authService'
import { AuthContextType, AuthResponse } from '../types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const session = await authService.getCurrentSession()
        setSession(session)
        setUser(session?.user || null)
      } catch (error) {
        console.error('Auth initialization error:', error)
        setSession(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      (event: string, session: Session | null) => {
        console.log('🔄 Auth state change:', event, session?.user?.email || 'No user')
        setSession(session)
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    return await authService.signUp(email, password)
  }

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    return await authService.signIn(email, password)
  }

  const signOut = async (): Promise<AuthResponse> => {
    return await authService.signOut()
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}