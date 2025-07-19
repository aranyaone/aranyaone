import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Performance optimization: preload critical resources
    const preloadFonts = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
      link.as = 'style';
      document.head.appendChild(link);
    };

    // Smooth scrolling enhancement
    const enhanceScrolling = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    // Initialize performance optimizations
    preloadFonts();
    enhanceScrolling();

    // Cleanup on unmount
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <Component {...pageProps} />
}
