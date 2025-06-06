'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-white"></div>
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-gray-700 dark:text-gray-300">Welcome, </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {session.user?.name || session.user?.email}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        href="/signin"
        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className="text-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1 rounded-md transition-colors dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
      >
        Sign up
      </Link>
    </div>
  )
}
