import '../styles/globals.css'
import { useEffect } from 'react'
import Head from 'next/head'

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
        // Preload critical fonts
        const fontPreloads = [
          { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', type: 'font' },
        ];

        fontPreloads.forEach(({ href, type }) => {
          if (!document.querySelector(`link[href="${href}"]`)) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'style';
            preloadLink.href = href;
            preloadLink.crossOrigin = 'anonymous';
            preloadLink.onload = () => {
              preloadLink.rel = 'stylesheet';
            };
            preloadLink.onerror = () => preloadLink.remove();
            document.head.appendChild(preloadLink);
          }
        });

        // Preload critical CSS
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
    <>
      <Head>
        {/* Critical font preloading */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          />
        </noscript>
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to critical third parties */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
