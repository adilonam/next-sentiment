import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { Session, User, Account } from 'next-auth'
import axios from 'axios'
import jwt from 'jsonwebtoken'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
    error?: string
    user: {
      id: string
      email: string
      name?: string
      username?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
    user?: {
      id: string
      email: string
      name?: string
      username?: string
    }
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const url = `${process.env.BACKEND_API_URL}/api/auth/refresh`
    
    const response = await axios.post(url, {
      refreshToken: token.refreshToken,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { auth } = response.data

    if (auth && auth.accessToken) {
      // Decode the new access token to get updated user info
      const decodedToken = jwt.decode(auth.accessToken) as any
      
      return {
        ...token,
        accessToken: auth.accessToken,
        accessTokenExpires: Date.now() + (decodedToken?.exp ? (decodedToken.exp * 1000) - Date.now() : 60 * 60 * 1000),
        refreshToken: auth.refreshToken ?? token.refreshToken,
      }
    }

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const response = await axios.post(`${process.env.BACKEND_API_URL}/api/auth/login`, {
            username: credentials.email,
            password: credentials.password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })

          
          const { auth } = response.data

          if (auth && auth.accessToken) {
            // Decode the JWT access token to extract user information
            const decodedToken = jwt.decode(auth.accessToken) as any
            
            if (!decodedToken) {
              console.error('Failed to decode access token')
              return null
            }

            return {
              id: decodedToken.sub || decodedToken.jti,
              email: decodedToken.email,
              name: decodedToken.name || `${decodedToken.given_name} ${decodedToken.family_name}`.trim(),
              username: decodedToken.preferred_username,
              accessToken: auth.accessToken,
              refreshToken: auth.refreshToken,
            }
          }

          return null
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/signin',
    signUp: '/signup',
  },
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: User; account?: Account | null }): Promise<JWT> {
      // Initial sign in
      if (account && user) {
        const decodedToken = jwt.decode((user as any).accessToken) as any
        return {
          ...token,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          accessTokenExpires: decodedToken?.exp ? decodedToken.exp * 1000 : Date.now() + 60 * 60 * 1000,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            username: (user as any).username,
          },
        } as JWT
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.user = token.user as any
        session.error = token.error as any
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
