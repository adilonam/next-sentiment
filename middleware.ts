import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Check if the request is for a protected API route
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const token = await getToken({ req: request })
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/protected/:path*']
}
