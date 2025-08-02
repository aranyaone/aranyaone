import Head from 'next/head'
import { memo, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { PREMIUM_CONFIG } from '../config/premium'

// Premium Components - Lazy loaded for performance
const PremiumHero = dynamic(() => import('../components/layout/PremiumHero'), { ssr: false })
const PremiumNavigation = dynamic(() => import('../components/navigation/PremiumNavigation'), { ssr: false })
const PremiumAnalytics = dynamic(() => import('../components/analytics/PremiumAnalytics'), { ssr: false })

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-${title.replace(/\s+/g, '-')}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [title]);

  return (
    <div 
      id={`stat-${title.replace(/\s+/g, '-')}`}
      className={`text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-500`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <div className="text-2xl font-bold text-purple-200">{value}</div>
    </div>
  );
});

// Main Component
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Performance: Preload critical pages safely
    if (typeof window !== 'undefined') {
      const criticalPages = ['/dashboard', '/analytics', '/settings'];
      criticalPages.forEach(page => {
        if (!document.querySelector(`link[href="${page}"]`)) {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = page;
          document.head.appendChild(link);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Aranya One - Premium Digital Empire Platform</title>
        <meta name="description" content="World-class digital empire management platform with AI-powered analytics and enterprise security" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Performance optimizations */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA optimizations */}
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Aranya One - Premium Edition" />
        <meta property="og:description" content="Your complete digital empire command center" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Premium Navigation */}
      <PremiumNavigation />

      {/* Premium Hero Section */}
      <PremiumHero />

      {/* Premium Analytics Dashboard */}
      <section className="py-20 px-6">
        <PremiumAnalytics />
      </section>

      {/* Enhanced Navigation Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Empire Control Center</h2>
            <p className="text-xl text-white/70">Access all your premium features</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
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
              description="AI-powered insights"
              color="purple"
            />
            
            <NavCard 
              href="/services"
              icon="⚡"
              title="Automation"
              description="Smart workflows"
              color="indigo"
            />
            
            <NavCard 
              href="/settings"
              icon="🔒"
              title="Security"
              description="Enterprise protection"
              color="gray"
            />
            
            {/* Premium Features */}
            <NavCard 
              href="/profile"
              icon="🤖"
              title="AI Assistant"
              description="Intelligent automation"
              color="orange"
            />
            
            <NavCard 
              href="/support"
              icon="🔗"
              title="Integrations"
              description="Connect everything"
              color="pink"
            />
            
            <NavCard 
              href="/docs"
              icon="📋"
              title="Reports"
              description="Advanced reporting"
              color="teal"
            />
            
            <NavCard 
              href="/status"
              icon="🌐"
              title="Multi-Workspace"
              description="Manage multiple projects"
              color="green"
            />
            
          </div>
        </div>
      </section>

      {/* Premium Stats with Animation */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon="🚀" title="Uptime" value="99.9%" />
            <StatCard icon="⚡" title="Response Time" value="<100ms" />
            <StatCard icon="🔒" title="Encryption" value="256-bit" />
            <StatCard icon="🌍" title="CDN Network" value="Global" />
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A1</span>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-xl">Aranya One</div>
              <div className="text-white/60 text-sm">Premium Digital Empire Platform</div>
            </div>
          </div>
          <div className="text-white/60 mb-4">
            Token ID: {PREMIUM_CONFIG.TOKEN_ID} | Enterprise Edition
          </div>
          <div className="text-white/40 text-sm">
            🏗️ Built with Next.js 14 & Advanced Performance Optimization
          </div>
          <div className="text-white/40 text-sm mt-2">
            🌟 World-Class Digital Empire Management Platform
          </div>
        </div>
      </footer>
    </div>
  );
}
