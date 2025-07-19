import '../styles/globals.css';
import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Web Vitals Performance Monitoring
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      }).catch(err => console.warn('Web Vitals not available:', err));
    }

    // Royal Theme Setup
    document.documentElement.classList.add('royal-theme');
    
    // Preload Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Page transition effects
    const handleRouteChange = () => {
      document.body.style.opacity = '0.8';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 150);
    };

    // Cleanup function
    return () => {
      document.documentElement.classList.remove('royal-theme');
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6B46C1" />
        <meta name="application-name" content="Aranya One" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Aranya One" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#6B46C1" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      
      <div className="royal-app">
        <Component {...pageProps} />
      </div>
      
      <style jsx global>{`
        .royal-app {
          min-height: 100vh;
          transition: opacity 0.15s ease-in-out;
        }
        
        .page-transition-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .page-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }
        
        .page-transition-exit {
          opacity: 1;
        }
        
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </>
  );
}

export default MyApp;
