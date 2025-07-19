import SEOHead from '../components/SEOHead'
import LuxuryFooter from '../components/LuxuryFooter'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-platinum-950 via-platinum-900 to-royal-950">
      <SEOHead 
        title="Dashboard - Empire Control Center"
        description="Monitor and manage your digital empire with real-time analytics, performance metrics, and powerful control tools."
        url="/dashboard"
      />
      
      <main className="relative">
        {/* Header Navigation */}
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <a href="/" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-royal-gradient rounded-xl flex items-center justify-center shadow-royal">
                    <span className="text-xl">👑</span>
                  </div>
                  <span className="text-xl font-bold text-gradient">Aranya One</span>
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="nav-link">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                  <span className="text-white text-sm">Live</span>
                </div>
                <a href="/" className="nav-link text-platinum-300">← Back to Home</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              📊 Empire Control Center
            </h1>
            <p className="text-xl text-platinum-300">
              Monitor everything in your digital empire
            </p>
          </div>

          {/* Key Metrics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Key Performance Indicators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard 
                icon="👥" 
                title="Active Users" 
                value="1,247" 
                change="+12.5%" 
                trend="up"
                color="blue"
              />
              <MetricCard 
                icon="💰" 
                title="Revenue" 
                value="$8,432" 
                change="+23.8%" 
                trend="up"
                color="green"
              />
              <MetricCard 
                icon="📈" 
                title="Growth Rate" 
                value="45.2%" 
                change="+8.1%" 
                trend="up"
                color="purple"
              />
              <MetricCard 
                icon="⚡" 
                title="Performance" 
                value="98.5%" 
                change="+2.3%" 
                trend="up"
                color="orange"
              />
            </div>
          </section>

          {/* Real-time Activities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Real-time Activity</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Activity Feed */}
              <div className="card-glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></span>
                  Live Activity Feed
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: "👤", action: "New user registration", time: "2 min ago", color: "green" },
                    { icon: "💳", action: "Payment processed", time: "5 min ago", color: "blue" },
                    { icon: "📊", action: "Analytics report generated", time: "8 min ago", color: "purple" },
                    { icon: "🔧", action: "Service configuration updated", time: "12 min ago", color: "orange" },
                    { icon: "📧", action: "Email campaign sent", time: "15 min ago", color: "pink" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <span className="text-2xl">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-platinum-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "📊", label: "View Analytics", href: "/analytics", color: "blue" },
                    { icon: "⚙️", label: "Manage Services", href: "/services", color: "purple" },
                    { icon: "👤", label: "Edit Profile", href: "/profile", color: "orange" },
                    { icon: "💬", label: "Get Support", href: "/support", color: "pink" }
                  ].map((action, i) => (
                    <a 
                      key={i}
                      href={action.href}
                      className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-center group"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
                      <div className="text-white text-sm font-medium">{action.label}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* System Status */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">System Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard title="API Status" status="operational" uptime="99.98%" />
              <StatusCard title="Database" status="operational" uptime="99.95%" />
              <StatusCard title="CDN" status="operational" uptime="99.99%" />
            </div>
          </section>
        </div>
      </main>

      <LuxuryFooter />
    </div>
  )
}

function MetricCard({ icon, title, value, change, trend, color }) {
  const colorClasses = {
    blue: "border-blue-400/30 bg-blue-500/10",
    green: "border-green-400/30 bg-green-500/10",
    purple: "border-purple-400/30 bg-purple-500/10",
    orange: "border-orange-400/30 bg-orange-500/10"
  };

  return (
    <div className={`p-6 rounded-xl border backdrop-blur-sm ${colorClasses[color]} transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-platinum-300 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function StatusCard({ title, status, uptime }) {
  return (
    <div className="card-glass p-6 text-center">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      <div className="flex items-center justify-center space-x-2 mb-3">
        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-green-400 font-medium">Operational</span>
      </div>
      <div className="text-platinum-300 text-sm">Uptime: {uptime}</div>
    </div>
  );
}
