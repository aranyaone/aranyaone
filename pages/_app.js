import '../styles/globals.css'
import { useEffect } from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { NotificationProvider } from '../contexts/NotificationContext'

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
    <AuthProvider>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </AuthProvider>
  )
}
