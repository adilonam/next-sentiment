# Authentication Setup

This project includes NextAuth.js integration with your Spring Boot backend APIs.

## Features

- **Sign Up**: New user registration using `/api/auth/register`
- **Sign In**: User authentication using `/api/auth/login` 
- **JWT Token Management**: Automatic token refresh using `/api/auth/refresh`
- **Protected Routes**: Pages that require authentication
- **Form Validation**: Zod schemas for form validation
- **Responsive Design**: Tailwind CSS styled components

## Environment Variables

Make sure to set up your `.env.local` file:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
BACKEND_API_URL=http://localhost:8080/api
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8080/api
```

## API Integration

The frontend integrates with your Spring Boot backend APIs:

- `GET /api/auth/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh

## Components

### Authentication Components
- `SignInForm` - Login form with email/password
- `SignUpForm` - Registration form with validation
- `AuthStatus` - Shows login status in header
- `ProtectedRoute` - Wrapper for protected pages

### Usage Examples

#### Protecting a Page
```tsx
import ProtectedRoute from '../components/auth/ProtectedRoute'

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      {/* Your protected content */}
    </ProtectedRoute>
  )
}
```

#### Using Authentication Hook
```tsx
import { useAuth } from '../hooks/useAuth'

export default function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Please sign in</div>
  
  return <div>Welcome, {user?.name}!</div>
}
```

#### Making Authenticated API Calls
```tsx
import { makeAuthenticatedRequest } from '../utils/api'

const result = await makeAuthenticatedRequest('/some-endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
})
```

## Pages

- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page  
- `/test` - Protected test page to verify authentication
- `/` - Main app (requires login for analysis)

## Testing

1. Start your Spring Boot backend on port 8080
2. Start the Next.js dev server: `npm run dev`
3. Visit `http://localhost:3000/auth/signup` to create an account
4. Visit `http://localhost:3000/test` to test the backend integration

## Form Validation

Uses Zod schemas for robust form validation:

- Email format validation
- Password strength requirements
- Confirmation password matching
- Required field validation
- Real-time error messages
