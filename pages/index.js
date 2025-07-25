import Head from 'next/head'
import { memo, useState, useEffect } from 'react'
import Footer from '../components/Footer'
import DarkModeToggle from '../components/DarkModeToggle'

// Performance: Lazy load heavy components
const NavCard = memo(function NavCard({ href, icon, title, description, color }) {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    purple: "bg-purple-500 hover:bg-purple-600", 
    indigo: "bg-indigo-500 hover:bg-indigo-600",
    gray: "bg-gray-500 hover:bg-gray-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    pink: "bg-pink-500 hover:bg-pink-600",
    teal: "bg-teal-500 hover:bg-teal-600",
    green: "bg-green-500 hover:bg-green-600"
  };

  const handlePrefetch = () => {
    // Only prefetch in browser environment and avoid duplicates
    if (typeof window === 'undefined') return;
    if (document.querySelector(`link[href="${href}"]`)) return;
    
    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.onload = () => setTimeout(() => link.remove(), 5000); // Clean up after 5s
      link.onerror = () => link.remove();
      document.head.appendChild(link);
    } catch (error) {
      console.warn('Prefetch failed for:', href, error);
    }
  };

  return (
    <a 
      href={href} 
      className={`block p-6 ${colorClasses[color]} text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group gpu-accelerated will-change-transform`}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
    >
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform will-change-transform">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </a>
  );
});

const StatCard = memo(function StatCard({ icon, title, value }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-${title.replace(/\s+/g, '-')}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [title]);

  return (
    <div 
      id={`stat-${title.replace(/\s+/g, '-')}`}
      className={`bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-100 metric-card ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-500`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-blue-600">{value}</div>
    </div>
  );
});

// Pages Router version - optimized for performance
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Performance: Preload critical pages safely
    if (typeof window === 'undefined') return;
    
    const criticalPages = ['/dashboard', '/analytics', '/services'];
    criticalPages.forEach(page => {
      // Check if already prefetched
      if (document.querySelector(`link[href="${page}"]`)) return;
      
      try {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        link.onload = () => setTimeout(() => link.remove(), 10000); // Clean up after 10s
        link.onerror = () => link.remove();
        document.head.appendChild(link);
      } catch (error) {
        console.warn('Critical page prefetch failed for:', page, error);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Aranya One - Digital Empire Dashboard | AI-Powered Platform</title>
        <meta name="description" content="Your complete digital empire management platform - optimized for performance with AI-powered analytics, plugin management, and advanced intelligence features." />
        <meta name="keywords" content="digital empire, dashboard, analytics, AI, performance optimization, plugin management, business intelligence" />
        <meta name="author" content="Aranya One" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Enhanced SEO Meta Tags */}
        <meta property="og:title" content="Aranya One - Digital Empire Dashboard" />
        <meta property="og:description" content="Complete digital empire management platform with AI-powered analytics and performance optimization" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aranyaone.vercel.app" />
        <meta property="og:image" content="/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aranya One - Digital Empire Dashboard" />
        <meta name="twitter:description" content="AI-powered digital empire management platform" />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Aranya One",
            "description": "Digital empire management platform with AI-powered analytics",
            "url": "https://aranyaone.vercel.app",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web"
          })}
        </script>
        
        {/* Performance optimizations */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA optimizations */}
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={`p-6 md:p-10 bg-gray-50 min-h-screen transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h1 className="text-6xl font-bold text-gray-800 mb-4 gpu-accelerated">🌟 Aranya One</h1>
                <p className="text-2xl text-gray-600 mb-6">Your Digital Empire Starts Here</p>
                <p className="text-lg text-green-600 font-semibold">🚀 Performance Optimized - July 17, 2025</p>
              </div>
              <div className="ml-8">
                <DarkModeToggle />
              </div>
            </div>
          </div>

          {/* Main Navigation Dashboard */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-green-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🎯 Empire Control Center</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              
              {/* Core Pages */}
              <NavCard 
                href="/dashboard"
                icon="🎯"
                title="Dashboard"
                description="Main control center"
                color="blue"
              />
              
              <NavCard 
                href="/analytics"
                icon="📊"
                title="Analytics"
                description="Performance metrics"
                color="purple"
              />
              
              <NavCard 
                href="/services"
                icon="⚙️"
                title="Services"
                description="Manage your tools"
                color="indigo"
              />
              
              <NavCard 
                href="/settings"
                icon="🔧"
                title="Settings"
                description="Configure empire"
                color="gray"
              />
              
              {/* User Pages */}
              <NavCard 
                href="/profile"
                icon="👤"
                title="Profile"
                description="Your empire profile"
                color="orange"
              />
              
              <NavCard 
                href="/support"
                icon="💬"
                title="Support"
                description="Get help & contact"
                color="pink"
              />
              
              <NavCard 
                href="/docs"
                icon="📚"
                title="Documentation"
                description="Guides & API docs"
                color="teal"
              />
              
              <NavCard 
                href="/status"
                icon="✅"
                title="Status"
                description="System health"
                color="green"
              />

              {/* Phase III - New Advanced Features */}
              <NavCard 
                href="/plugin-deploy"
                icon="🔌"
                title="Plugin Deploy"
                description="Admin plugin management"
                color="indigo"
              />
              
              <NavCard 
                href="/brain-room"
                icon="🧠"
                title="Brain Room"
                description="AI intelligence center"
                color="purple"
              />
              
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon="👥" title="Active Users" value="1,234" />
            <StatCard icon="💰" title="Revenue" value="$8,432" />
            <StatCard icon="📈" title="Growth" value="+23%" />
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-600">
            <p>🏗️ Built with Next.js & Tailwind CSS | Optimized for Performance</p>
            <p className="text-sm mt-2">🌟 Aranya One Digital Empire Platform</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
