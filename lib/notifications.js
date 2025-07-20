import { useState, useEffect } from 'react'
import { useAuth } from './auth'

export function NotificationSystem() {
  const [notifications, setNotifications] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const checkNotifications = () => {
      const newNotifications = []
      const subscription = user.subscription

      // Trial expiry notifications
      if (subscription.status === 'trial' && subscription.trialEndsAt) {
        const trialEnd = new Date(subscription.trialEndsAt)
        const now = new Date()
        const daysLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24))

        if (daysLeft <= 0) {
          newNotifications.push({
            id: 'trial-expired',
            type: 'error',
            title: 'Trial Expired',
            message: 'Your free trial has ended. Upgrade to continue using premium features.',
            action: {
              text: 'Upgrade Now',
              href: '/pricing'
            },
            priority: 'high'
          })
        } else if (daysLeft <= 3) {
          newNotifications.push({
            id: 'trial-expiring',
            type: 'warning',
            title: 'Trial Ending Soon',
            message: `Your trial expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}. Upgrade to keep your access.`,
            action: {
              text: 'Upgrade',
              href: '/pricing'
            },
            priority: 'medium'
          })
        }
      }

      // Payment failure notifications
      if (subscription.lastPayment?.status === 'failed') {
        newNotifications.push({
          id: 'payment-failed',
          type: 'error',
          title: 'Payment Failed',
          message: 'Your last payment failed. Please update your payment method to avoid service interruption.',
          action: {
            text: 'Update Payment',
            href: '/profile/subscription'
          },
          priority: 'high'
        })
      }

      // Renewal reminders
      if (subscription.status === 'active' && subscription.currentPeriodEnd) {
        const renewalDate = new Date(subscription.currentPeriodEnd)
        const daysUntilRenewal = Math.ceil((renewalDate - now) / (1000 * 60 * 60 * 24))

        if (daysUntilRenewal <= 7 && daysUntilRenewal > 0 && subscription.autoRenewal) {
          newNotifications.push({
            id: 'renewal-reminder',
            type: 'info',
            title: 'Upcoming Renewal',
            message: `Your subscription will auto-renew in ${daysUntilRenewal} day${daysUntilRenewal === 1 ? '' : 's'}.`,
            action: {
              text: 'Manage',
              href: '/profile/subscription'
            },
            priority: 'low'
          })
        }

        if (daysUntilRenewal <= 3 && !subscription.autoRenewal) {
          newNotifications.push({
            id: 'manual-renewal',
            type: 'warning',
            title: 'Renewal Required',
            message: `Your subscription expires in ${daysUntilRenewal} day${daysUntilRenewal === 1 ? '' : 's'}. Auto-renewal is disabled.`,
            action: {
              text: 'Renew Now',
              href: '/profile/subscription'
            },
            priority: 'medium'
          })
        }
      }

      setNotifications(newNotifications)
    }

    checkNotifications()
    const interval = setInterval(checkNotifications, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [user])

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map(notification => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </div>
  )
}

function NotificationCard({ notification, onDismiss }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-orange-50 border-orange-200 text-orange-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  }

  const iconMap = {
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
    success: '✅'
  }

  return (
    <div 
      className={`
        ${typeStyles[notification.type]} 
        border-2 rounded-lg p-4 shadow-lg transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{iconMap[notification.type]}</span>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{notification.title}</h4>
          <p className="text-sm mb-3">{notification.message}</p>
          
          {notification.action && (
            <div className="flex gap-2">
              <a
                href={notification.action.href}
                className="text-sm bg-white bg-opacity-70 hover:bg-opacity-100 px-3 py-1 rounded font-medium transition-colors"
              >
                {notification.action.text}
              </a>
            </div>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-lg opacity-60 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Email notification service (mock implementation)
export class EmailNotificationService {
  static async sendTrialExpiryReminder(user, daysLeft) {
    console.log(`Sending trial expiry reminder to ${user.email}: ${daysLeft} days left`)
    
    // In real implementation, this would call your email service
    const emailData = {
      to: user.email,
      subject: `Your Aranya One trial expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
      template: 'trial-expiry-reminder',
      data: {
        name: user.name,
        daysLeft,
        upgradeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`
      }
    }

    // Mock API call
    return this.mockSendEmail(emailData)
  }

  static async sendPaymentFailureNotification(user, amount) {
    console.log(`Sending payment failure notification to ${user.email}`)
    
    const emailData = {
      to: user.email,
      subject: 'Payment failed - Action required',
      template: 'payment-failure',
      data: {
        name: user.name,
        amount,
        manageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/subscription`
      }
    }

    return this.mockSendEmail(emailData)
  }

  static async sendRenewalReminder(user, renewalDate) {
    console.log(`Sending renewal reminder to ${user.email}`)
    
    const emailData = {
      to: user.email,
      subject: 'Your subscription renews soon',
      template: 'renewal-reminder',
      data: {
        name: user.name,
        renewalDate: renewalDate.toLocaleDateString(),
        manageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/subscription`
      }
    }

    return this.mockSendEmail(emailData)
  }

  static async mockSendEmail(emailData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In production, this would integrate with services like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    
    console.log('Email sent:', emailData)
    return { success: true, messageId: Date.now().toString() }
  }
}

// Hook for managing notifications in components
export function useNotifications() {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { ...notification, id }])
    
    // Auto-dismiss after 5 seconds for non-critical notifications
    if (notification.priority !== 'high') {
      setTimeout(() => {
        dismissNotification(id)
      }, 5000)
    }
  }

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return {
    notifications,
    addNotification,
    dismissNotification
  }
}