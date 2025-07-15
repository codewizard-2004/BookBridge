import { authService } from './authService'

const API_BASE_URL = 'http://localhost:9000' // Replace with your FastAPI URL

interface ApiRequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: any
}

export const apiService = {
  authenticatedRequest: async (endpoint: string, options: ApiRequestOptions = {}) => {
    try {
      const session = await authService.getCurrentSession()
      
      if (!session) {
        throw new Error('No authentication session')
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error: any) {
      console.error('API request error:', error)
      throw error
    }
  },

  getUserProfile: async () => {
    return await apiService.authenticatedRequest('/auth/profile')
  },

  verifyToken: async () => {
    return await apiService.authenticatedRequest('/auth/verify')
  }
}