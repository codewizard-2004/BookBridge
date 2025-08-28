import { Session, User } from '@supabase/supabase-js'

export interface AuthResponse {
  success: boolean
  data?: any
  error?: string
}

export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<AuthResponse>
  signIn: (email: string, password: string) => Promise<AuthResponse>
  signOut: () => Promise<AuthResponse>
  changePassword: (newPassword: string) => Promise<AuthResponse>
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  email: string
  name: string
  password: string
  confirmPassword: string
  avatar: string
}