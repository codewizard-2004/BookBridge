import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Polyfill for structuredClone (not available in React Native)
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj: any) => {
    // Handle primitive values and null
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    
    // Handle Date objects
    if (obj instanceof Date) {
      return new Date(obj.getTime())
    }
    
    // Handle Arrays
    if (Array.isArray(obj)) {
      return obj.map((item) => global.structuredClone(item))
    }
    
    // Handle plain objects
    if (obj.constructor === Object) {
      const cloned: any = {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = global.structuredClone(obj[key])
        }
      }
      return cloned
    }
    
    // Fallback to JSON method for other objects
    try {
      return JSON.parse(JSON.stringify(obj))
    } catch (error) {
      console.warn('structuredClone fallback failed:', error)
      return obj
    }
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})