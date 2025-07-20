import { useAuth } from './auth'

export function ProtectedFeature({ 
  requiredPlan = 'pro', 
  children, 
  fallback = null,
  showUpgrade = true 
}) {
  const { user, hasAccess, isTrialExpired } = useAuth()

  if (!user) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔐 Login Required</h3>
        <p className="text-yellow-700 mb-4">Please log in to access this feature.</p>
        <a 
          href="/pricing" 
          className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Get Started
        </a>
      </div>
    )
  }

  const trialExpired = isTrialExpired()
  const hasFeatureAccess = hasAccess(requiredPlan)

  if (!hasFeatureAccess || (user.subscription.status === 'trial' && trialExpired)) {
    if (fallback) {
      return fallback
    }

    return (
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          💎 {getPlanDisplayName(requiredPlan)} Feature
        </h3>
        <p className="text-blue-700 mb-4">
          {trialExpired 
            ? 'Your trial has expired. Upgrade to continue using this feature.'
            : `This feature requires a ${getPlanDisplayName(requiredPlan)} plan or higher.`
          }
        </p>
        {showUpgrade && (
          <a 
            href="/pricing" 
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            🚀 Upgrade Now
          </a>
        )}
      </div>
    )
  }

  return children
}

export function withPlanAccess(Component, requiredPlan = 'pro') {
  return function WrappedComponent(props) {
    return (
      <ProtectedFeature requiredPlan={requiredPlan}>
        <Component {...props} />
      </ProtectedFeature>
    )
  }
}

export function PlanGate({ 
  freePlan, 
  proPlan, 
  enterprisePlan, 
  children 
}) {
  const { user, hasAccess } = useAuth()

  if (!user) {
    return freePlan || children
  }

  if (hasAccess('enterprise') && enterprisePlan) {
    return enterprisePlan
  }

  if (hasAccess('pro') && proPlan) {
    return proPlan
  }

  return freePlan || children
}

export function TrialBanner() {
  const { user, isTrialExpired } = useAuth()

  if (!user || user.subscription.status !== 'trial') {
    return null
  }

  const trialExpired = isTrialExpired()
  const daysLeft = trialExpired 
    ? 0 
    : Math.ceil((new Date(user.subscription.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24))

  if (trialExpired) {
    return (
      <div className="bg-red-500 text-white p-4 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>⏰</span>
            <span className="font-medium">Your trial has expired!</span>
          </div>
          <a 
            href="/pricing" 
            className="px-4 py-2 bg-white text-red-500 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Upgrade Now
          </a>
        </div>
      </div>
    )
  }

  if (daysLeft <= 3) {
    return (
      <div className="bg-orange-500 text-white p-4 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>🕒</span>
            <span className="font-medium">
              {daysLeft === 0 
                ? 'Your trial expires today!' 
                : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in your trial`
              }
            </span>
          </div>
          <a 
            href="/pricing" 
            className="px-4 py-2 bg-white text-orange-500 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Upgrade
          </a>
        </div>
      </div>
    )
  }

  return null
}

function getPlanDisplayName(plan) {
  const names = {
    free: 'Free',
    pro: 'Pro',
    enterprise: 'Enterprise'
  }
  return names[plan] || 'Premium'
}

// Hook for checking feature access in components
export function useFeatureAccess(requiredPlan = 'pro') {
  const { user, hasAccess, isTrialExpired } = useAuth()
  
  const hasFeatureAccess = user && hasAccess(requiredPlan) && 
    !(user.subscription.status === 'trial' && isTrialExpired())
  
  return {
    hasAccess: hasFeatureAccess,
    user,
    isTrialExpired: isTrialExpired(),
    currentPlan: user?.subscription?.plan || 'free'
  }
}