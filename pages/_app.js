import '../styles/globals.css'
import { useEffect, useState, createContext, useContext } from 'react'

// Notification Context for global notification system
const NotificationContext = createContext()

export function useNotifications() {
  return useContext(NotificationContext)
}

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = { id, ...notification }
    setNotifications(prev => [...prev, newNotification])
    
    // Auto-remove after 5 seconds unless persistent
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(id)
      }, 5000)
    }
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

function NotificationCard({ notification, onClose }) {
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      case 'info':
      default: return 'ℹ️'
    }
  }

  return (
    <div className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${getNotificationStyle(notification.type)} animate-slide-in`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{getIcon(notification.type)}</span>
          <div>
            <h4 className="font-semibold">{notification.title}</h4>
            {notification.message && (
              <p className="text-sm opacity-80">{notification.message}</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Performance monitoring - only in browser environment
    if (typeof window === 'undefined') return;

    // Log Core Web Vitals
    function sendToAnalytics(metric) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric);
      }
      // In production, send to your analytics service
      // analytics.track('Web Vital', metric)
    }

    // Monitor page load performance with safety checks
    if (window.performance && window.performance.timing) {
      const measureLoadTime = () => {
        try {
          const timing = performance.timing;
          if (timing.loadEventEnd && timing.navigationStart) {
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            if (loadTime > 0) {
              console.log('Page Load Time:', loadTime + 'ms');
            }
          }
        } catch (error) {
          console.warn('Performance timing measurement failed:', error);
        }
      };

      if (document.readyState === 'complete') {
        measureLoadTime();
      } else {
        window.addEventListener('load', measureLoadTime, { once: true });
      }
    }

    // Monitor Core Web Vitals with dynamic import
    if (process.env.NODE_ENV === 'production') {
      import('web-vitals').then(({ onFCP, onLCP, onCLS, onFID, onTTFB }) => {
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onCLS(sendToAnalytics);
        onFID(sendToAnalytics);
        onTTFB(sendToAnalytics);
      }).catch((error) => {
        console.warn('Web Vitals loading failed:', error);
      });
    }

    // Preload critical resources safely
    const preloadCriticalResources = () => {
      try {
        // Only preload if not already present
        if (!document.querySelector('link[href*="app.css"]')) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'style';
          preloadLink.href = '/_next/static/css/app.css';
          preloadLink.onload = () => preloadLink.remove();
          preloadLink.onerror = () => preloadLink.remove();
          document.head.appendChild(preloadLink);
        }
      } catch (error) {
        console.warn('Resource preloading failed:', error);
      }
    };

    preloadCriticalResources();

    // Cleanup function
    return () => {
      // Remove any event listeners or cleanup
    };
  }, []);

  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  )
}
