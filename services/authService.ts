import { AuthResponse } from '../types/auth'
import { supabase } from '../utils/supabaseClient'

export const authService = {
  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('Signup error:', error.message)
      return { success: false, error: error.message }
    }
  },

  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('🔐 Attempting login for:', email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      console.log('✅ Login successful:', data.user?.email)
      return { success: true, data }
    } catch (error: any) {
      console.error('❌ Login error:', error.message)
      return { success: false, error: error.message }
    }
  },

  signOut: async (): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error: any) {
      console.error('Logout error:', error.message)
      return { success: false, error: error.message }
    }
  },

  getCurrentSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error: any) {
      console.error('Get session error:', error.message)
      return null
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error: any) {
      console.error('Get user error:', error.message)
      return null
    }
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  },

  changePassword: async (newPassword: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('Change password error:', error.message)
      return { success: false, error: error.message }
    }
  },
}