import SEOHead from '../components/SEOHead'
import LuxuryFooter from '../components/LuxuryFooter'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-platinum-950 via-platinum-900 to-royal-950">
      <SEOHead 
        title="Analytics - Performance Insights"
        description="Comprehensive analytics and performance insights for your digital empire. Track metrics, monitor growth, and make data-driven decisions."
        url="/analytics"
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
                  <span className="text-white text-sm">Real-time</span>
                </div>
                <a href="/" className="nav-link text-platinum-300">← Back to Home</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              📊 Analytics Dashboard
            </h1>
            <p className="text-xl text-platinum-300">
              Real-time insights and performance metrics for your empire
            </p>
          </div>

          {/* Quick Stats Overview */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <AnalyticsCard 
                icon="👁️" 
                title="Page Views" 
                value="125,847" 
                change="+18.2%" 
                trend="up"
                period="last 30 days"
              />
              <AnalyticsCard 
                icon="🎯" 
                title="Conversion Rate" 
                value="3.24%" 
                change="+0.8%" 
                trend="up"
                period="this month"
              />
              <AnalyticsCard 
                icon="⏱️" 
                title="Avg Session" 
                value="4m 32s" 
                change="+22s" 
                trend="up"
                period="per visit"
              />
              <AnalyticsCard 
                icon="🌍" 
                title="Global Reach" 
                value="89 Countries" 
                change="+5" 
                trend="up"
                period="active markets"
              />
            </div>
          </section>

          {/* Charts Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Traffic Chart */}
              <div className="card-glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Traffic Overview</h3>
                <div className="space-y-4">
                  <TrafficBar label="Organic Search" value={45} color="green" />
                  <TrafficBar label="Direct Traffic" value={32} color="blue" />
                  <TrafficBar label="Social Media" value={15} color="purple" />
                  <TrafficBar label="Referrals" value={8} color="orange" />
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="card-glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Top Locations</h3>
                <div className="space-y-4">
                  {[
                    { country: "🇺🇸 United States", visits: "45,678", percentage: 36 },
                    { country: "🇮🇳 India", visits: "28,924", percentage: 23 },
                    { country: "🇬🇧 United Kingdom", visits: "15,432", percentage: 12 },
                    { country: "🇩🇪 Germany", visits: "12,567", percentage: 10 },
                    { country: "🇨🇦 Canada", visits: "8,934", percentage: 7 }
                  ].map((location, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{location.country}</span>
                        <div className="w-32 bg-platinum-700 rounded-full h-2">
                          <div 
                            className="bg-royal-gradient h-2 rounded-full" 
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-white font-medium">{location.visits}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <PerformanceCard 
                title="Core Web Vitals"
                metrics={[
                  { label: "LCP", value: "1.2s", status: "good" },
                  { label: "FID", value: "8ms", status: "good" },
                  { label: "CLS", value: "0.05", status: "good" }
                ]}
              />
              
              <PerformanceCard 
                title="User Experience"
                metrics={[
                  { label: "Bounce Rate", value: "24.5%", status: "good" },
                  { label: "Pages/Session", value: "4.2", status: "excellent" },
                  { label: "Return Visitors", value: "68%", status: "excellent" }
                ]}
              />
              
              <PerformanceCard 
                title="Technical Health"
                metrics={[
                  { label: "Uptime", value: "99.98%", status: "excellent" },
                  { label: "Response Time", value: "145ms", status: "good" },
                  { label: "Error Rate", value: "0.02%", status: "excellent" }
                ]}
              />
            </div>
          </section>

          {/* Recent Activity */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="card-glass p-6">
              <div className="space-y-4">
                {[
                  { icon: "📈", event: "Traffic spike detected", details: "+45% increase in organic traffic", time: "2 hours ago", type: "positive" },
                  { icon: "🎯", event: "Conversion goal achieved", details: "Monthly target reached 5 days early", time: "4 hours ago", type: "success" },
                  { icon: "⚡", event: "Performance optimization", details: "Page load time improved by 0.3s", time: "6 hours ago", type: "improvement" },
                  { icon: "🌍", event: "New market expansion", details: "First visitors from 3 new countries", time: "1 day ago", type: "growth" },
                  { icon: "📊", event: "Weekly report generated", details: "Analytics summary sent to team", time: "2 days ago", type: "info" }
                ].map((activity, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
                    <span className="text-2xl mt-1">{activity.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{activity.event}</h4>
                      <p className="text-platinum-300 text-sm">{activity.details}</p>
                      <span className="text-platinum-400 text-xs">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <LuxuryFooter />
    </div>
  )
}

function AnalyticsCard({ icon, title, value, change, trend, period }) {
  return (
    <div className="card-glass p-6 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-platinum-300 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-platinum-400 text-xs">{period}</div>
    </div>
  );
}

function TrafficBar({ label, value, color }) {
  const colorClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500", 
    purple: "bg-purple-500",
    orange: "bg-orange-500"
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white">{label}</span>
        <span className="text-platinum-300">{value}%</span>
      </div>
      <div className="w-full bg-platinum-700 rounded-full h-2">
        <div 
          className={`${colorClasses[color]} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function PerformanceCard({ title, metrics }) {
  return (
    <div className="card-glass p-6">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {metrics.map((metric, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-platinum-300 text-sm">{metric.label}</span>
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium">{metric.value}</span>
              <div className={`w-2 h-2 rounded-full ${
                metric.status === 'excellent' ? 'bg-green-400' :
                metric.status === 'good' ? 'bg-blue-400' : 'bg-yellow-400'
              }`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
