import axios from 'axios';
import { SignUpFormData } from './validation';

const API_BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

export async function signUpUser(userData: SignUpFormData): Promise<AuthResponse> {
  try {
    const response = await axios.post('/api/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      username: userData.username,
    });

    const data = response.data;

    return {
      success: true,
      message: 'Account created successfully',
      user: data.user || data,
    };
  } catch (error) {
    console.error('Sign up error:', error);

    // Handle axios error response
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || 'Registration failed',
      };
    }

    return {
      success: false,
      message: 'An error occurred during registration',
    };
  }
}

export async function checkAuthHealth(): Promise<boolean> {
  try {
    const response = await api.get('/auth/health');
    return response.status === 200;
  } catch (error) {
    console.error('Auth health check failed:', error);
    return false;
  }
}
