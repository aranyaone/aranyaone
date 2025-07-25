// Advanced analytics and performance tracking
class AnalyticsTracker {
  constructor() {
    this.events = []
    this.sessionStart = Date.now()
    this.pageViews = new Set()
    this.performanceMetrics = {}
    
    this.init()
  }

  init() {
    // Track page performance
    this.trackPagePerformance()
    
    // Track user interactions
    this.trackUserInteractions()
    
    // Track errors
    this.trackErrors()
    
    // Track network conditions
    this.trackNetworkConditions()
    
    // Send analytics data periodically
    this.startAnalyticsSync()
  }

  trackPagePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0]
          const paint = performance.getEntriesByType('paint')
          
          this.performanceMetrics = {
            pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
            firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
            timeToInteractive: this.calculateTimeToInteractive(),
            cumulativeLayoutShift: this.calculateCLS(),
            timestamp: Date.now()
          }
          
          this.logEvent('page_performance', this.performanceMetrics)
        }, 1000)
      })
    }
  }

  trackUserInteractions() {
    // Track clicks
    document.addEventListener('click', (e) => {
      const element = e.target
      const elementInfo = {
        tagName: element.tagName,
        className: element.className,
        id: element.id,
        textContent: element.textContent?.substring(0, 50),
        href: element.href,
        timestamp: Date.now()
      }
      
      this.logEvent('user_click', elementInfo)
    })

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target
      this.logEvent('form_submit', {
        formId: form.id,
        formClass: form.className,
        timestamp: Date.now()
      })
    })

    // Track scroll depth
    let maxScrollDepth = 0
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100)
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        if (maxScrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          this.logEvent('scroll_depth', { depth: maxScrollDepth, timestamp: Date.now() })
        }
      }
    })
  }

  trackErrors() {
    // JavaScript errors
    window.addEventListener('error', (e) => {
      this.logEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        timestamp: Date.now()
      })
    })

    // Promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      this.logEvent('promise_rejection', {
        reason: e.reason?.toString(),
        timestamp: Date.now()
      })
    })
  }

  trackNetworkConditions() {
    if ('connection' in navigator) {
      const connection = navigator.connection
      this.logEvent('network_info', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
        timestamp: Date.now()
      })
    }
  }

  calculateTimeToInteractive() {
    // Simplified TTI calculation
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0]
      return navigation.domInteractive - navigation.fetchStart
    }
    return 0
  }

  calculateCLS() {
    // Simplified CLS calculation
    // In a real implementation, you'd use the Layout Instability API
    return Math.random() * 0.1 // Placeholder
  }

  logEvent(eventType, data) {
    const event = {
      type: eventType,
      data: data,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      page: window.location.pathname
    }
    
    this.events.push(event)
    
    // Keep only last 100 events in memory
    if (this.events.length > 100) {
      this.events = this.events.slice(-100)
    }
    
    // Store in localStorage for offline sync
    this.storeOfflineEvents()
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id')
    if (!sessionId) {
      sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2)
      sessionStorage.setItem('analytics_session_id', sessionId)
    }
    return sessionId
  }

  getUserId() {
    let userId = localStorage.getItem('analytics_user_id')
    if (!userId) {
      userId = Date.now().toString(36) + Math.random().toString(36).substr(2)
      localStorage.setItem('analytics_user_id', userId)
    }
    return userId
  }

  storeOfflineEvents() {
    try {
      const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics') || '[]')
      offlineEvents.push(...this.events.slice(-5)) // Store last 5 events
      localStorage.setItem('offline_analytics', JSON.stringify(offlineEvents.slice(-50)))
    } catch (error) {
      console.warn('Failed to store offline analytics:', error)
    }
  }

  startAnalyticsSync() {
    // Send analytics data every 30 seconds
    setInterval(() => {
      this.syncAnalytics()
    }, 30000)

    // Send on page unload
    window.addEventListener('beforeunload', () => {
      this.syncAnalytics(true)
    })
  }

  syncAnalytics(isBeforeUnload = false) {
    if (this.events.length === 0) return

    const payload = {
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      events: [...this.events],
      performance: this.performanceMetrics,
      sessionDuration: Date.now() - this.sessionStart,
      timestamp: Date.now()
    }

    // Use sendBeacon for reliable sending on page unload
    if (isBeforeUnload && 'sendBeacon' in navigator) {
      navigator.sendBeacon('/api/analytics', JSON.stringify(payload))
    } else {
      // Regular fetch for periodic sync
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch(error => {
        console.warn('Analytics sync failed:', error)
      })
    }

    // Clear sent events
    this.events = []
  }

  // Public methods for manual tracking
  trackCustomEvent(eventName, properties = {}) {
    this.logEvent('custom_event', {
      eventName,
      properties,
      timestamp: Date.now()
    })
  }

  trackPageView(page = window.location.pathname) {
    if (!this.pageViews.has(page)) {
      this.pageViews.add(page)
      this.logEvent('page_view', {
        page,
        referrer: document.referrer,
        timestamp: Date.now()
      })
    }
  }

  trackConversion(type, value = null) {
    this.logEvent('conversion', {
      type,
      value,
      timestamp: Date.now()
    })
  }

  // Get analytics summary
  getAnalyticsSummary() {
    return {
      sessionId: this.getSessionId(),
      sessionDuration: Date.now() - this.sessionStart,
      eventsCount: this.events.length,
      pageViews: Array.from(this.pageViews),
      performance: this.performanceMetrics
    }
  }
}

// Initialize analytics tracker
let analytics
if (typeof window !== 'undefined') {
  analytics = new AnalyticsTracker()
  
  // Make available globally
  window.analytics = analytics
  
  // Track initial page view
  analytics.trackPageView()
}

export default analytics