import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check - in real implementation this would check JWT/session
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user')
        if (userData) {
          const parsed = JSON.parse(userData)
          setUser(parsed)
        }
      } catch (error) {
        console.warn('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    if (typeof window !== 'undefined') {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [])

  const login = (userData) => {
    const userWithDefaults = {
      id: Date.now().toString(),
      name: 'Aranya One',
      email: 'hello@aranyaone.com',
      role: 'user',
      subscription: {
        plan: 'free',
        status: 'trial',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        autoRenewal: true
      },
      ...userData
    }
    
    setUser(userWithDefaults)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userWithDefaults))
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  const updateSubscription = (subscriptionData) => {
    if (!user) return
    
    const updatedUser = {
      ...user,
      subscription: {
        ...user.subscription,
        ...subscriptionData
      }
    }
    
    setUser(updatedUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const hasAccess = (requiredPlan = 'free') => {
    if (!user) return false
    
    const planHierarchy = { free: 0, pro: 1, enterprise: 2 }
    const userPlanLevel = planHierarchy[user.subscription?.plan] || 0
    const requiredLevel = planHierarchy[requiredPlan] || 0
    
    return userPlanLevel >= requiredLevel
  }

  const isTrialExpired = () => {
    if (!user?.subscription?.trialEndsAt) return false
    return new Date() > new Date(user.subscription.trialEndsAt)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      updateSubscription,
      hasAccess,
      isTrialExpired
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}