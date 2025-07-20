import { useState, useEffect, createContext, useContext } from 'react'

// Notification Context
const NotificationContext = createContext()

// Notification types
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error', 
  WARNING: 'warning',
  INFO: 'info'
}

// Notification Provider
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [settings, setSettings] = useState({
    sound: true,
    vibration: true,
    position: 'top-right'
  })

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      timestamp: new Date(),
      ...notification
    }

    setNotifications(prev => [...prev, newNotification])

    // Play sound if enabled
    if (settings.sound && notification.sound !== false) {
      playNotificationSound(notification.type)
    }

    // Vibrate if enabled and available
    if (settings.vibration && notification.vibration !== false && 'navigator' in window && 'vibrate' in navigator) {
      const pattern = getVibrationPattern(notification.type)
      navigator.vibrate(pattern)
    }

    // Auto remove after duration
    if (notification.autoRemove !== false) {
      const duration = notification.duration || 5000
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  // Helper functions
  const success = (message, options = {}) => addNotification({
    type: NOTIFICATION_TYPES.SUCCESS,
    message,
    ...options
  })

  const error = (message, options = {}) => addNotification({
    type: NOTIFICATION_TYPES.ERROR,
    message,
    ...options
  })

  const warning = (message, options = {}) => addNotification({
    type: NOTIFICATION_TYPES.WARNING,
    message,
    ...options
  })

  const info = (message, options = {}) => addNotification({
    type: NOTIFICATION_TYPES.INFO,
    message,
    ...options
  })

  const value = {
    notifications,
    settings,
    addNotification,
    removeNotification,
    clearAll,
    updateSettings,
    success,
    error,
    warning,
    info
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <SmartNotificationContainer />
    </NotificationContext.Provider>
  )
}

// Hook to use notifications
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Main notification container
function SmartNotificationContainer() {
  const { notifications, settings } = useNotifications()

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  }

  return (
    <div className={`fixed z-50 ${positionClasses[settings.position]} space-y-3 max-w-sm w-full`}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

// Individual notification item
function NotificationItem({ notification }) {
  const { removeNotification } = useNotifications()
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleRemove = () => {
    setIsLeaving(true)
    setTimeout(() => {
      removeNotification(notification.id)
    }, 300)
  }

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✅',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200', 
      icon: '❌',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-800'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '⚠️',
      iconBg: 'bg-yellow-100', 
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'ℹ️',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    }
  }

  const style = typeStyles[notification.type] || typeStyles.info

  return (
    <div 
      className={`
        ${style.bg} ${style.border} border-2 rounded-lg p-4 shadow-lg
        transform transition-all duration-300 ease-in-out
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isLeaving ? 'scale-95' : 'scale-100'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`${style.iconBg} rounded-full p-2 flex-shrink-0`}>
          <span className="text-lg">{style.icon}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          {notification.title && (
            <h4 className={`font-semibold ${style.textColor} mb-1`}>
              {notification.title}
            </h4>
          )}
          <p className={`${style.textColor} text-sm leading-relaxed`}>
            {notification.message}
          </p>
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className={`mt-2 text-sm font-medium ${style.iconColor} hover:underline`}
            >
              {notification.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={handleRemove}
          className={`${style.iconColor} hover:opacity-75 transition-opacity flex-shrink-0`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Notification settings panel
export function NotificationSettings() {
  const { settings, updateSettings } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  const testNotification = (type) => {
    const { [type]: notify } = useNotifications()
    notify(`This is a test ${type} notification`, {
      title: `Test ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      duration: 3000
    })
  }

  const testSound = () => {
    playNotificationSound('info')
  }

  const testVibration = () => {
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        title="Notification Settings"
      >
        🔔
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔔 Notification Settings</h3>
          
          <div className="space-y-4">
            {/* Sound Settings */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Sound Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.sound}
                  onChange={(e) => updateSettings({ sound: e.target.checked })}
                  className="rounded"
                />
              </div>
              <button
                onClick={testSound}
                className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                🔊 Test Sound
              </button>
            </div>

            {/* Vibration Settings */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Vibration</label>
                <input
                  type="checkbox"
                  checked={settings.vibration}
                  onChange={(e) => updateSettings({ vibration: e.target.checked })}
                  className="rounded"
                />
              </div>
              <button
                onClick={testVibration}
                className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
              >
                📳 Test Vibration
              </button>
            </div>

            {/* Position Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <select
                value={settings.position}
                onChange={(e) => updateSettings({ position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-center">Top Center</option>
                <option value="bottom-center">Bottom Center</option>
              </select>
            </div>

            {/* Test Notifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Test Notifications</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => testNotification('success')}
                  className="text-xs px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  ✅ Success
                </button>
                <button
                  onClick={() => testNotification('error')}
                  className="text-xs px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  ❌ Error
                </button>
                <button
                  onClick={() => testNotification('warning')}
                  className="text-xs px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                >
                  ⚠️ Warning
                </button>
                <button
                  onClick={() => testNotification('info')}
                  className="text-xs px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  ℹ️ Info
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

// Utility functions
function playNotificationSound(type) {
  if (typeof window === 'undefined' || !window.AudioContext) return

  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different frequencies for different notification types
    const frequencies = {
      success: 800,
      error: 400,
      warning: 600, 
      info: 500
    }

    oscillator.frequency.setValueAtTime(frequencies[type] || 500, audioContext.currentTime)
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  } catch (error) {
    console.warn('Could not play notification sound:', error)
  }
}

function getVibrationPattern(type) {
  const patterns = {
    success: [100, 50, 100],
    error: [200, 100, 200, 100, 200],
    warning: [150, 75, 150],
    info: [100]
  }
  return patterns[type] || [100]
}

export default SmartNotificationContainer