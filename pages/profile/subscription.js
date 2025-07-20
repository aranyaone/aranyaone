import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../lib/auth'

export default function SubscriptionPage() {
  const router = useRouter()
  const { success } = router.query
  const { user, updateSubscription, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/pricing')
    }
  }, [user, router])

  const handleToggleAutoRenewal = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      updateSubscription({
        autoRenewal: !user.subscription.autoRenewal
      })
    } catch (error) {
      console.error('Failed to update auto-renewal:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      updateSubscription({
        status: 'cancelled',
        cancelledAt: new Date().toISOString(),
        autoRenewal: false
      })
      setShowCancelDialog(false)
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = () => {
    router.push('/pricing')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const subscription = user.subscription
  const isTrialActive = subscription.status === 'trial' && new Date() < new Date(subscription.trialEndsAt)
  const trialDaysLeft = isTrialActive 
    ? Math.ceil((new Date(subscription.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div>
      <Head>
        <title>Subscription - Aranya One</title>
        <meta name="description" content="Manage your subscription and billing" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          
          {/* Success Message */}
          {success && (
            <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center gap-2">
                <span>🎉</span>
                <span className="font-medium">Payment successful! Welcome to your new plan.</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">💎 Subscription Management</h1>
            <p className="text-gray-600">Manage your billing, plan, and subscription settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Current Plan */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Current Plan</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-blue-800 capitalize">
                      {subscription.plan} Plan
                    </h3>
                    <StatusBadge status={subscription.status} />
                  </div>
                  
                  {isTrialActive && (
                    <div className="text-orange-600 font-medium">
                      🕒 {trialDaysLeft} days left in trial
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <InfoRow label="Status" value={subscription.status} />
                  <InfoRow 
                    label="Auto Renewal" 
                    value={subscription.autoRenewal ? 'Enabled' : 'Disabled'}
                    action={
                      <button
                        onClick={handleToggleAutoRenewal}
                        disabled={loading}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          subscription.autoRenewal 
                            ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        } transition-colors disabled:opacity-50`}
                      >
                        {subscription.autoRenewal ? 'Disable' : 'Enable'}
                      </button>
                    }
                  />
                  
                  {subscription.currentPeriodEnd && (
                    <InfoRow 
                      label="Next Billing" 
                      value={new Date(subscription.currentPeriodEnd).toLocaleDateString()} 
                    />
                  )}
                  
                  {subscription.trialEndsAt && isTrialActive && (
                    <InfoRow 
                      label="Trial Ends" 
                      value={new Date(subscription.trialEndsAt).toLocaleDateString()} 
                    />
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  {subscription.plan === 'free' && (
                    <button
                      onClick={handleUpgrade}
                      className="flex-1 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      🚀 Upgrade Plan
                    </button>
                  )}
                  
                  {subscription.plan !== 'free' && subscription.status !== 'cancelled' && (
                    <button
                      onClick={() => setShowCancelDialog(true)}
                      className="flex-1 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel Subscription
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📄 Billing History</h2>
              
              <BillingHistory subscription={subscription} />
            </div>
          </div>

          {/* Usage Stats */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Usage Statistics</h2>
            <UsageStats plan={subscription.plan} />
          </div>

          {/* Cancel Dialog */}
          {showCancelDialog && (
            <CancelDialog
              onConfirm={handleCancelSubscription}
              onCancel={() => setShowCancelDialog(false)}
              loading={loading}
            />
          )}

          {/* Navigation */}
          <div className="mt-8 text-center space-x-4">
            <a href="/profile" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Profile
            </a>
            <a href="/pricing" className="text-blue-600 hover:text-blue-800 font-medium">
              View All Plans →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatusBadge({ status }) {
  const statusConfig = {
    trial: { color: 'bg-orange-100 text-orange-800', icon: '🕒', text: 'Trial' },
    active: { color: 'bg-green-100 text-green-800', icon: '✅', text: 'Active' },
    cancelled: { color: 'bg-red-100 text-red-800', icon: '❌', text: 'Cancelled' },
    expired: { color: 'bg-gray-100 text-gray-800', icon: '⏰', text: 'Expired' }
  }

  const config = statusConfig[status] || statusConfig.active

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {config.icon} {config.text}
    </span>
  )
}

function InfoRow({ label, value, action }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600">{label}:</span>
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-800">{value}</span>
        {action}
      </div>
    </div>
  )
}

function BillingHistory({ subscription }) {
  const payments = [
    subscription.lastPayment && {
      date: subscription.lastPayment.date,
      amount: subscription.lastPayment.amount,
      status: subscription.lastPayment.status,
      description: `${subscription.plan} Plan - Monthly`
    }
  ].filter(Boolean)

  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">📋</div>
        <p>No billing history yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {payments.map((payment, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-800">{payment.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(payment.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">${payment.amount}</p>
              <p className="text-sm text-gray-500 capitalize">{payment.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function UsageStats({ plan }) {
  const limits = {
    free: { services: 3, storage: 1, apiCalls: 1000 },
    pro: { services: 999, storage: 50, apiCalls: 50000 },
    enterprise: { services: 999, storage: 500, apiCalls: 200000 }
  }

  const usage = {
    services: 5,
    storage: 12,
    apiCalls: 15420
  }

  const currentLimits = limits[plan] || limits.free

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Services"
        current={usage.services}
        limit={currentLimits.services}
        unit=""
        icon="⚙️"
      />
      <StatCard
        title="Storage"
        current={usage.storage}
        limit={currentLimits.storage}
        unit="GB"
        icon="💾"
      />
      <StatCard
        title="API Calls"
        current={usage.apiCalls}
        limit={currentLimits.apiCalls}
        unit="/month"
        icon="🔗"
      />
    </div>
  )
}

function StatCard({ title, current, limit, unit, icon }) {
  const percentage = Math.min((current / limit) * 100, 100)
  const isNearLimit = percentage > 80
  const isOverLimit = current > limit

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm">
          <span className={isOverLimit ? 'text-red-600' : 'text-gray-600'}>
            {current.toLocaleString()}{unit}
          </span>
          <span className="text-gray-500">
            {limit === 999 ? 'Unlimited' : `${limit.toLocaleString()}${unit}`}
          </span>
        </div>
      </div>
      
      {limit !== 999 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              isOverLimit ? 'bg-red-500' : isNearLimit ? 'bg-orange-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  )
}

function CancelDialog({ onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">⚠️ Cancel Subscription</h3>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to cancel your subscription? This action cannot be undone.
          </p>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">What happens when you cancel:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Your plan remains active until the end of the billing period</li>
              <li>• You'll lose access to premium features after expiration</li>
              <li>• Your data will be preserved for 30 days</li>
              <li>• You can reactivate anytime</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Keep Subscription
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Cancelling...' : 'Cancel Plan'}
          </button>
        </div>
      </div>
    </div>
  )
}