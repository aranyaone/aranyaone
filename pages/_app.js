import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Performance monitoring - only in browser environment
    if (typeof window === 'undefined') return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('aranya_theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Page transition loading states
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

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
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    };
  }, [router]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('aranya_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('aranya_theme', 'light')
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Global Loading Overlay */}
      {isLoading && <PageLoader />}
      
      {/* Dark Mode Toggle - Fixed position */}
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main App Content with fade transition */}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        <Component {...pageProps} />
      </div>
      
      {/* Accessibility announcements */}
      <div id="announcements" className="sr-only" aria-live="polite" aria-atomic="true"></div>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed top-4 right-4 z-40 dark-mode-toggle ${darkMode ? 'active' : ''} no-print`}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-thumb">
        {darkMode ? '🌙' : '☀️'}
      </div>
    </button>
  )
}
