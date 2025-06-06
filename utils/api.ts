import { getSession } from 'next-auth/react'

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080/api'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export async function makeAuthenticatedRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const session = await getSession()
    
    if (!session?.accessToken) {
      return {
        success: false,
        error: 'Authentication required'
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP error! status: ${response.status}`,
        data
      }
    }

    return {
      success: true,
      data
    }
  } catch (error) {
    console.error('API request failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Specific API functions for your Spring backend
export const apiClient = {
  // Health check
  checkHealth: () => makeAuthenticatedRequest('/auth/health'),
  
  // You can add more specific API calls here as needed
  // For example:
  // getUserProfile: () => makeAuthenticatedRequest('/user/profile'),
  // updateUserProfile: (data: any) => makeAuthenticatedRequest('/user/profile', {
  //   method: 'PUT',
  //   body: JSON.stringify(data)
  // }),
}
