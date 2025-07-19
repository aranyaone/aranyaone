import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Log Core Web Vitals
      function sendToAnalytics(metric) {
        console.log(metric)
        // In production, send to your analytics service
        // analytics.track('Web Vital', metric)
      }

      // Monitor page load performance
      if ('performance' in window) {
        window.addEventListener('load', () => {
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
          console.log('Page Load Time:', loadTime + 'ms')
        })
      }

      // Monitor Core Web Vitals
      if ('web-vitals' in window) {
        import('web-vitals').then(({ onFCP, onLCP, onCLS, onFID, onTTFB }) => {
          onFCP(sendToAnalytics)
          onLCP(sendToAnalytics)
          onCLS(sendToAnalytics)
          onFID(sendToAnalytics)
          onTTFB(sendToAnalytics)
        })
      }
    }

    // Preload critical resources
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'style'
    preloadLink.href = '/_next/static/css/app.css'
    document.head.appendChild(preloadLink)

    // Cleanup function
    return () => {
      if (preloadLink.parentNode) {
        preloadLink.parentNode.removeChild(preloadLink)
      }
    }
  }, [])

  return <Component {...pageProps} />
}
