import Head from 'next/head'
import { memo, useState, useEffect } from 'react'

// World-Class Premium Website for Aranya One
// Token: Mn7HYW5eZVBMIX2ea73uXwNG

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

  return (
    <a 
      href={href} 
      className={`block p-6 ${colorClasses[color]} text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group`}
    >
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </a>
  );
});

const StatCard = memo(function StatCard({ icon, title, value }) {
  return (
    <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <div className="text-2xl font-bold text-purple-200">{value}</div>
    </div>
  );
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const TOKEN_ID = 'Mn7HYW5eZVBMIX2ea73uXwNG';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Aranya One - Premium Digital Empire Platform</title>
        <meta name="description" content="World-class digital empire management platform with AI-powered analytics and enterprise security" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e293b" />
      </Head>

      {/* Premium Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A1</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Aranya One</h1>
                <div className="text-white/60 text-xs">Premium Edition</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white/60 text-sm">Token: {TOKEN_ID.slice(-8)}</div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium">✨ Premium Edition • Token: {TOKEN_ID.slice(-12)} ✨</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
            ARANYA ONE
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-light text-purple-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            🌟 Your Digital Empire Command Center 🌟
            <span className="block text-lg md:text-xl text-white/60 mt-4">
              ⚡ World-Class Analytics • 🤖 AI-Powered Insights • 🔒 Enterprise Security
            </span>
          </h2>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { icon: '🚀', title: 'Lightning Fast', desc: 'Optimized for world-class performance' },
              { icon: '🛡️', title: 'Ultra Secure', desc: 'Military-grade encryption & protection' },
              { icon: '🧠', title: 'AI-Powered', desc: 'Smart insights & intelligent automation' }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="/dashboard" className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg">
              🚀 Enter Dashboard
            </a>
            <a href="/analytics" className="px-10 py-4 bg-white/10 text-white font-bold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-lg">
              📊 View Analytics
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mx-auto">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">🎯 Empire Control Center</h2>
            <p className="text-xl text-white/70 mb-4">Access all your premium world-class features</p>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NavCard href="/dashboard" icon="🎯" title="Dashboard" description="Ultimate control center" color="blue" />
            <NavCard href="/analytics" icon="📊" title="Analytics" description="AI-powered insights" color="purple" />
            <NavCard href="/automation" icon="⚡" title="Automation" description="Smart workflows" color="indigo" />
            <NavCard href="/security" icon="🔒" title="Security" description="Enterprise protection" color="gray" />
            <NavCard href="/ai-assistant" icon="🤖" title="AI Assistant" description="Intelligent automation" color="orange" />
            <NavCard href="/integrations" icon="🔗" title="Integrations" description="Connect everything" color="pink" />
            <NavCard href="/reports" icon="📋" title="Reports" description="Advanced reporting" color="teal" />
            <NavCard href="/workspace" icon="🌐" title="Multi-Workspace" description="Manage multiple projects" color="green" />
          </div>
        </div>
      </section>

      {/* Premium Stats */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">⚡ World-Class Performance Metrics</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon="🚀" title="Uptime" value="99.99%" />
            <StatCard icon="⚡" title="Response" value="<50ms" />
            <StatCard icon="🛡️" title="Security" value="Military Grade" />
            <StatCard icon="🌍" title="Global CDN" value="200+ Locations" />
          </div>
        </div>
      </section>

      {/* Real-time Dashboard Preview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">📈 Real-time Analytics Dashboard</h3>
              <p className="text-white/70">Live metrics powered by your premium token</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">💰 Revenue</h4>
                  <span className="text-green-400 text-sm">↗ +24.5%</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">$1,247,892</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">👥 Active Users</h4>
                  <span className="text-green-400 text-sm">↗ +18.2%</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">45,627</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">⚡ Performance</h4>
                  <span className="text-green-400 text-sm">↗ +5.3%</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">98.7%</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A1</span>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-2xl">Aranya One</div>
              <div className="text-white/60">Premium Digital Empire Platform</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 mb-6">
            <div className="text-white/90 mb-2 font-semibold">🔐 Your Premium Token</div>
            <div className="text-white font-mono text-lg">{TOKEN_ID}</div>
            <div className="text-green-400 text-sm mt-2">✅ Enterprise Edition Active</div>
          </div>
          
          <div className="text-white/60 text-lg mb-4">
            🏗️ Built with Next.js 14 & Advanced Performance Optimization
          </div>
          <div className="text-white/40">
            🌟 World-Class Digital Empire Management Platform
          </div>
          <div className="text-white/40 text-sm mt-2">
            © 2025 Aranya One • All Rights Reserved • Premium Enterprise Edition
          </div>
        </div>
      </footer>
    </div>
  );
}
