'use client'

import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { apiClient } from '../../utils/api'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

export default function TestPage() {
  const { user, isAuthenticated } = useAuth()
  const [healthStatus, setHealthStatus] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const testBackendConnection = async () => {
    setIsLoading(true)
    setHealthStatus('')
    
    try {
      const result = await apiClient.checkHealth()
      
      if (result.success) {
        setHealthStatus('✅ Backend connection successful!')
      } else {
        setHealthStatus(`❌ Backend connection failed: ${result.error}`)
      }
    } catch (error) {
      setHealthStatus(`❌ Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Authentication Test Page
            </h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  User Information
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p><strong>Name:</strong> {user?.name || 'Not provided'}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>ID:</strong> {user?.id}</p>
                  <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Backend Connection Test
                </h2>
                <button
                  onClick={testBackendConnection}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Testing...' : 'Test Backend Connection'}
                </button>
                
                {healthStatus && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p>{healthStatus}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This page is protected and only accessible to authenticated users.
                  It demonstrates the authentication integration with your Spring backend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
