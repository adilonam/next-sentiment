import { SignUpFormData } from './validation'

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080/api'

export interface AuthResponse {
  success: boolean
  message?: string
  user?: {
    id: string
    email: string
    name: string
  }
  accessToken?: string
  refreshToken?: string
}

export async function signUpUser(userData: SignUpFormData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Registration failed',
      }
    }

    return {
      success: true,
      message: 'Account created successfully',
      user: data.user || data,
    }
  } catch (error) {
    console.error('Sign up error:', error)
    return {
      success: false,
      message: 'An error occurred during registration',
    }
  }
}

export async function checkAuthHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/health`)
    return response.ok
  } catch (error) {
    console.error('Auth health check failed:', error)
    return false
  }
}
