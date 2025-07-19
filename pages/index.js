import SEOHead from '../components/SEOHead'
import LuxuryFooter from '../components/LuxuryFooter'

// Pages Router version - Enhanced luxury design
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-platinum-950 via-platinum-900 to-royal-950">
      <SEOHead />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, #9f61ff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ffca3a 0%, transparent 50%)`,
              backgroundSize: '600px 600px'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
            <div className="text-center mb-16">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-royal-gradient rounded-2xl flex items-center justify-center shadow-royal animate-float">
                  <span className="text-4xl">👑</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gradient">Aranya One</span>
              </h1>
              <p className="text-xl md:text-3xl text-platinum-300 mb-8 font-light">
                Your Digital Empire Starts Here
              </p>
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500/20 rounded-full border border-green-400/30 backdrop-blur-sm">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-300 font-medium">🚀 Production Ready - January 2025</span>
              </div>
            </div>

            {/* Main Navigation Dashboard */}
            <div className="card-luxury max-w-6xl mx-auto mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-platinum-800 mb-4">
                  🎯 Empire Control Center
                </h2>
                <p className="text-platinum-600 text-lg">
                  Manage your digital empire with world-class tools and insights
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Core Pages */}
                <NavCard 
                  href="/dashboard"
                  icon="🎯"
                  title="Dashboard"
                  description="Main control center"
                  color="royal"
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
                
              </div>
            </div>

            {/* Stats Section */}
            <section className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
                Empire Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <StatCard icon="👥" title="Active Users" value="1,234" trend="+12%" />
                <StatCard icon="💰" title="Revenue" value="$8,432" trend="+23%" />
                <StatCard icon="📈" title="Growth" value="+45%" trend="+8%" />
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
                Luxury Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <FeatureCard 
                  icon="⚡" 
                  title="Lightning Fast" 
                  description="Built with Next.js 14 for optimal performance and speed"
                />
                <FeatureCard 
                  icon="🔐" 
                  title="Enterprise Security" 
                  description="Bank-grade security with end-to-end encryption"
                />
                <FeatureCard 
                  icon="📱" 
                  title="Mobile First" 
                  description="Responsive design that works perfectly on all devices"
                />
              </div>
            </section>
          </div>
        </section>
      </main>

      <LuxuryFooter />
    </div>
  )
}

function NavCard({ href, icon, title, description, color }) {
  const colorClasses = {
    royal: "bg-royal-gradient hover:shadow-royal",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600 hover:shadow-blue-500/25",
    purple: "bg-gradient-to-br from-purple-500 to-purple-600 hover:shadow-purple-500/25", 
    indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600 hover:shadow-indigo-500/25",
    gray: "bg-gradient-to-br from-gray-500 to-gray-600 hover:shadow-gray-500/25",
    orange: "bg-gradient-to-br from-orange-500 to-orange-600 hover:shadow-orange-500/25",
    pink: "bg-gradient-to-br from-pink-500 to-pink-600 hover:shadow-pink-500/25",
    teal: "bg-gradient-to-br from-teal-500 to-teal-600 hover:shadow-teal-500/25",
    green: "bg-gradient-to-br from-green-500 to-green-600 hover:shadow-green-500/25"
  };

  return (
    <a href={href} className={`block p-6 ${colorClasses[color]} text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group`}>
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </a>
  );
}

function StatCard({ icon, title, value, trend }) {
  return (
    <div className="card-glass text-center p-8 animate-slide-up">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gold-400 mb-2">{value}</div>
      <div className="text-green-400 text-sm font-medium">
        {trend} from last month
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="card-glass text-center p-8 group hover:bg-white/10 transition-all duration-300">
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
      <p className="text-platinum-300 leading-relaxed">{description}</p>
    </div>
  );
}
