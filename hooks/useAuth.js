import { useState, useEffect, createContext, useContext } from 'react'

// Authentication Context
const AuthContext = createContext()

// Mock user data for demo purposes
const MOCK_USERS = {
  'admin@aranyaone.com': {
    id: 1,
    email: 'admin@aranyaone.com',
    name: 'Aranya Admin',
    role: 'admin',
    password: 'admin123'
  },
  'user@aranyaone.com': {
    id: 2,
    email: 'user@aranyaone.com', 
    name: 'Aranya User',
    role: 'user',
    password: 'user123'
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('aranya_user') : null
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('aranya_user')
        }
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Mock authentication - in real app, this would be an API call
      const user = MOCK_USERS[email.toLowerCase()]
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password')
      }

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }

      setUser(userData)
      if (typeof window !== 'undefined') {
        localStorage.setItem('aranya_user', JSON.stringify(userData))
      }
      
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aranya_user')
    }
  }

  const hasRole = (requiredRole) => {
    if (!user) return false
    if (requiredRole === 'user') return true // All logged in users have user role
    return user.role === requiredRole
  }

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use authentication
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protecting routes
export function withAuth(WrappedComponent, requiredRole = 'user') {
  return function AuthenticatedComponent(props) {
    const { user, loading, hasRole } = useAuth()

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }

    if (!user) {
      return <LoginForm />
    }

    if (!hasRole(requiredRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
            <div className="text-4xl mb-4">🚫</div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Access Denied</h2>
            <p className="text-red-600">You don't have permission to access this page.</p>
            <p className="text-sm text-red-500 mt-2">Required role: {requiredRole}</p>
          </div>
        </div>
      )
    }

    return <WrappedComponent {...props} />
  }
}

// Login form component
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(email, password)
    
    if (!result.success) {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌟 Aranya One</h1>
          <h2 className="text-2xl font-bold text-gray-900">Sign in to your empire</h2>
          <p className="mt-2 text-gray-600">Access your digital empire dashboard</p>
        </div>
        
        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">❌ {error}</p>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600 mb-4">Demo Accounts:</div>
            <div className="space-y-2 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <strong>Admin:</strong> admin@aranyaone.com / admin123
              </div>
              <div className="bg-green-50 p-2 rounded">
                <strong>User:</strong> user@aranyaone.com / user123
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default useAuth