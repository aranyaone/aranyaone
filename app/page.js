import Link from "next/link";
import { ArrowRight, Globe, Bot, TrendingUp, Crown } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Premium Hero Section */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A1</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">Aranya One</h1>
                  <div className="text-white/60 text-xs">Ultimate Edition</div>
                </div>
              </div>
              <div className="text-white/60 text-sm">
                Token: Mn7HYW5e
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="pt-20 pb-12 px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Aranya One
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-2xl mx-auto">
              Ultimate Digital Empire Command Center with AI Automation
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-transform">
                Launch Dashboard
              </Link>
              <Link href="/services" className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Empire Control Center</h2>
            <p className="text-xl text-white/70">Access all your premium features</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Core AI Services */}
            <Link href="/ai-chat-premium" className="block p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🤖</div>
                <h3 className="text-lg font-bold mb-2">AI Chat Premium</h3>
                <p className="text-sm opacity-90">Stanford/MIT-level intelligence</p>
              </div>
            </Link>
            
            <Link href="/analytics" className="block p-6 bg-purple-500 hover:bg-purple-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📊</div>
                <h3 className="text-lg font-bold mb-2">Advanced Analytics</h3>
                <p className="text-sm opacity-90">Real-time AI insights</p>
              </div>
            </Link>
            
            <Link href="/cybersecurity-empire" className="block p-6 bg-red-500 hover:bg-red-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔒</div>
                <h3 className="text-lg font-bold mb-2">Cybersecurity Empire</h3>
                <p className="text-sm opacity-90">Military-grade protection</p>
              </div>
            </Link>
            
            <Link href="/king-wallet" className="block p-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">👑</div>
                <h3 className="text-lg font-bold mb-2">King Wallet</h3>
                <p className="text-sm opacity-90">Ultimate payment system</p>
              </div>
            </Link>
            
            {/* Advanced AI Tools */}
            <Link href="/ai-tools" className="block p-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧠</div>
                <h3 className="text-lg font-bold mb-2">AI Tools Suite</h3>
                <p className="text-sm opacity-90">Complete AI automation</p>
              </div>
            </Link>
            
            <Link href="/ai-video-creator" className="block p-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎬</div>
                <h3 className="text-lg font-bold mb-2">AI Video Creator</h3>
                <p className="text-sm opacity-90">Professional video creation</p>
              </div>
            </Link>
            
            <Link href="/smart-design-assistant" className="block p-6 bg-teal-500 hover:bg-teal-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">�</div>
                <h3 className="text-lg font-bold mb-2">Smart Design Assistant</h3>
                <p className="text-sm opacity-90">AI-powered creative design</p>
              </div>
            </Link>
            
            <Link href="/smart-crm" className="block p-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">�</div>
                <h3 className="text-lg font-bold mb-2">Smart CRM</h3>
                <p className="text-sm opacity-90">Customer relationship management</p>
              </div>
            </Link>
            
            <Link href="/email-marketing-pro" className="block p-6 bg-purple-500 hover:bg-purple-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📧</div>
                <h3 className="text-lg font-bold mb-2">Email Marketing Pro</h3>
                <p className="text-sm opacity-90">AI-powered email campaigns</p>
              </div>
            </Link>
            
            {/* NEWLY RESTORED WORLD-CLASS SERVICES */}
            <Link href="/advanced-ai" className="block p-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧠</div>
                <h3 className="text-lg font-bold mb-2">Advanced AI Engine</h3>
                <p className="text-sm opacity-90">Multiple AI models & quantum processing</p>
              </div>
            </Link>
            
            <Link href="/advanced-analytics" className="block p-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📈</div>
                <h3 className="text-lg font-bold mb-2">Advanced Analytics Engine</h3>
                <p className="text-sm opacity-90">Enterprise-grade data insights</p>
              </div>
            </Link>
            
            <Link href="/ai-website-builder" className="block p-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🌐</div>
                <h3 className="text-lg font-bold mb-2">AI Website Builder</h3>
                <p className="text-sm opacity-90">Professional websites in minutes</p>
              </div>
            </Link>
            
            {/* NEW ITERATION SERVICES */}
            <Link href="/advanced-video-studio" className="block p-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎬</div>
                <h3 className="text-lg font-bold mb-2">Advanced Video Studio</h3>
                <p className="text-sm opacity-90">Hollywood-quality video editing</p>
              </div>
            </Link>
            
            <Link href="/ai-music-composer" className="block p-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎵</div>
                <h3 className="text-lg font-bold mb-2">AI Music Composer</h3>
                <p className="text-sm opacity-90">Create original music with AI</p>
              </div>
            </Link>
            
            {/* WORLD-CLASS SERVICE RESTORATION - ONE BY ONE */}
            <Link href="/security-manager" className="block p-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔒</div>
                <h3 className="text-lg font-bold mb-2">Security Manager</h3>
                <p className="text-sm opacity-90">Military-grade cybersecurity</p>
              </div>
            </Link>
            
            <Link href="/seo-ai-optimizer" className="block p-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🚀</div>
                <h3 className="text-lg font-bold mb-2">SEO AI Optimizer</h3>
                <p className="text-sm opacity-90">Search engine domination</p>
              </div>
            </Link>
            
            <Link href="/social-media-manager" className="block p-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📱</div>
                <h3 className="text-lg font-bold mb-2">Social Media Manager</h3>
                <p className="text-sm opacity-90">Multi-platform automation</p>
              </div>
            </Link>
            
            <Link href="/code-generator-pro" className="block p-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💻</div>
                <h3 className="text-lg font-bold mb-2">Code Generator Pro</h3>
                <p className="text-sm opacity-90">AI-powered development</p>
              </div>
            </Link>
            
            <Link href="/creative-ai-studio" className="block p-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎨</div>
                <h3 className="text-lg font-bold mb-2">Creative AI Studio</h3>
                <p className="text-sm opacity-90">Professional design suite</p>
              </div>
            </Link>
            
            <Link href="/voice-assistant-ai" className="block p-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🗣️</div>
                <h3 className="text-lg font-bold mb-2">Voice Assistant AI</h3>
                <p className="text-sm opacity-90">Advanced speech recognition</p>
              </div>
            </Link>
            
            <Link href="/performance-optimizer" className="block p-6 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚡</div>
                <h3 className="text-lg font-bold mb-2">Performance Optimizer</h3>
                <p className="text-sm opacity-90">Speed enhancement suite</p>
              </div>
            </Link>
            
            <Link href="/business-intelligence" className="block p-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📊</div>
                <h3 className="text-lg font-bold mb-2">Business Intelligence</h3>
                <p className="text-sm opacity-90">Advanced analytics & insights</p>
              </div>
            </Link>
            
            <Link href="/global-trend-analyzer" className="block p-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🌍</div>
                <h3 className="text-lg font-bold mb-2">Global Trend Analyzer</h3>
                <p className="text-sm opacity-90">Market intelligence platform</p>
              </div>
            </Link>
            
            <Link href="/customer-support-ai" className="block p-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🤖</div>
                <h3 className="text-lg font-bold mb-2">Customer Support AI</h3>
                <p className="text-sm opacity-90">Intelligent support platform</p>
              </div>
            </Link>
            
            {/* Enterprise Features */}
            <Link href="/services" className="block p-6 bg-gray-500 hover:bg-gray-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚙️</div>
                <h3 className="text-lg font-bold mb-2">Service Manager</h3>
                <p className="text-sm opacity-90">Enterprise deployment</p>
              </div>
            </Link>
            
            <Link href="/founder" className="block p-6 bg-green-500 hover:bg-green-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">�‍💼</div>
                <h3 className="text-lg font-bold mb-2">Founder Hub</h3>
                <p className="text-sm opacity-90">Leadership dashboard</p>
              </div>
            </Link>
            
            <Link href="/qr-payment" className="block p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📱</div>
                <h3 className="text-lg font-bold mb-2">QR Payment System</h3>
                <p className="text-sm opacity-90">Instant transactions</p>
              </div>
            </Link>
            
            <Link href="/support" className="block p-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group">
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🆘</div>
                <h3 className="text-lg font-bold mb-2">Support Center</h3>
                <p className="text-sm opacity-90">24/7 enterprise support</p>
              </div>
            </Link>
            
          </div>
        </div>
      </section>

      {/* Premium Stats */}
      <section className="py-16 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Empire Performance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="text-white/70 text-sm mb-1">Active Users</h3>
              <p className="text-2xl font-bold text-white">50,000+</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-white/70 text-sm mb-1">Revenue Generated</h3>
              <p className="text-2xl font-bold text-white">$2.5M+</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">�</div>
              <h3 className="text-white/70 text-sm mb-1">Growth Rate</h3>
              <p className="text-2xl font-bold text-white">+156%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-white/70 text-sm mb-1">AI Operations</h3>
              <p className="text-2xl font-bold text-white">1M+/day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A1</span>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-xl">Aranya One</div>
              <div className="text-white/60 text-sm">Ultimate Digital Empire Platform</div>
            </div>
          </div>
          <div className="text-white/60 mb-4">
            Token ID: Mn7HYW5eZVBMIX2ea73uXwNG | Ultimate Edition
          </div>
          <div className="text-white/40 text-sm">
            🏗️ Built with Next.js 15 & Advanced Performance Optimization
          </div>
          <div className="text-white/40 text-sm mt-2">
            🌟 World's Most Advanced Digital Empire Management Platform
          </div>
        </div>
      </footer>
    </div>
  );
}
