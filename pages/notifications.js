import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Simulate real-time notifications
    const initialNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Website deployed successfully',
        message: 'Your AI-generated website is now live at aranyaone.vercel.app',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
        action: 'view'
      },
      {
        id: 2,
        type: 'warning',
        title: 'High CPU usage detected',
        message: 'Your server is experiencing high CPU usage (85%). Consider upgrading.',
        timestamp: new Date(Date.now() - 15 * 60000),
        read: false,
        action: 'optimize'
      },
      {
        id: 3,
        type: 'info',
        title: 'New AI feature available',
        message: 'Check out our new voice recognition feature in Bujji AI Panel.',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: true,
        action: 'explore'
      },
      {
        id: 4,
        type: 'error',
        title: 'API rate limit reached',
        message: 'You have reached your API rate limit. Upgrade your plan for more calls.',
        timestamp: new Date(Date.now() - 45 * 60000),
        read: false,
        action: 'upgrade'
      },
      {
        id: 5,
        type: 'success',
        title: 'Backup completed',
        message: 'Your daily backup has been completed successfully.',
        timestamp: new Date(Date.now() - 60 * 60000),
        read: true,
        action: null
      }
    ]
    setNotifications(initialNotifications)

    // Simulate new notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: ['success', 'warning', 'info', 'error'][Math.floor(Math.random() * 4)],
        title: 'Real-time update',
        message: 'This is a simulated real-time notification to demonstrate the system.',
        timestamp: new Date(),
        read: false,
        action: 'view'
      }
      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Keep latest 10
    }, 30000) // New notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    return notif.type === filter
  })

  const unreadCount = notifications.filter(notif => !notif.read).length

  const getNotificationIcon = (type) => {
    const icons = {
      success: '✅',
      warning: '⚠️',
      info: 'ℹ️',
      error: '❌'
    }
    return icons[type] || 'ℹ️'
  }

  const getNotificationColor = (type) => {
    const colors = {
      success: 'border-green-200 bg-green-50',
      warning: 'border-yellow-200 bg-yellow-50',
      info: 'border-blue-200 bg-blue-50',
      error: 'border-red-200 bg-red-50'
    }
    return colors[type] || 'border-gray-200 bg-gray-50'
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Notification Center - Aranya One</title>
        <meta name="description" content="Smart notification management with real-time updates" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🔔 Notification Center
          </h1>
          <p className="text-gray-600 text-lg">
            Stay updated with real-time alerts and system notifications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Notifications</p>
                <p className="text-3xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <div className="text-4xl">📧</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unread</p>
                <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
              </div>
              <div className="text-4xl">🔴</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-green-600">98.5%</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Response Time</p>
                <p className="text-3xl font-bold text-blue-600">0.8s</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Notification Panel */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-xl text-gray-900">
                Recent Notifications
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-royal-purple-600 hover:text-royal-purple-700 transition-colors"
                >
                  Mark all as read
                </button>
                <div className="w-px h-4 bg-gray-300"></div>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {['all', 'unread', 'success', 'warning', 'info', 'error'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors capitalize ${
                    filter === filterType
                      ? 'bg-royal-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 transition-colors hover:bg-gray-50 ${
                      !notification.read ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 ${getNotificationColor(notification.type)} flex items-center justify-center`}>
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{formatTimestamp(notification.timestamp)}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {notification.action && (
                              <button className="text-xs bg-royal-purple-500 hover:bg-royal-purple-600 text-white px-3 py-1 rounded-lg transition-colors capitalize">
                                {notification.action}
                              </button>
                            )}
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                                title="Mark as read"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-xs text-red-600 hover:text-red-700 transition-colors"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">🔔</div>
                <p>No notifications found for the selected filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Smart Insights */}
        <div className="mt-8 bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-4">
            🧠 Smart Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">🎯 Performance Trend</h3>
              <p className="text-sm opacity-90">Your system performance has improved by 23% this week. Great job optimizing!</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">⚡ Next Action</h3>
              <p className="text-sm opacity-90">Consider upgrading your plan to handle the increasing traffic efficiently.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}