import Head from 'next/head'
import Link from 'next/link'

// Pages Router version - Enhanced UI with Royal Purple theme
export default function Home() {
  return (
    <div>
      <Head>
        <title>Aranya One - Digital Empire Dashboard</title>
        <meta name="description" content="Your complete digital empire management platform" />
      </Head>
      
      {/* Hero Section */}
      <section className="relative bg-royal-gradient min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-white bg-opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="text-8xl md:text-9xl mb-6 animate-pulse-slow">🌟</div>
            <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 animate-slide-up">
              Aranya One
            </h1>
            <p className="font-sans text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 animate-slide-up">
              Your Digital Empire Starts Here
            </p>
            <p className="font-sans text-lg text-white/80 mb-12 max-w-2xl mx-auto animate-slide-up">
              Build, manage, and scale your digital presence with our comprehensive platform. From analytics to automation, everything you need in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link 
                href="/dashboard"
                className="bg-white text-royal-purple-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-soft-lg"
              >
                🎯 Get Started
              </Link>
              <Link 
                href="/services"
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 hover:scale-105 transition-all duration-300"
              >
                ⚙️ Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Main Navigation Dashboard */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-900 mb-6">
              🎯 Empire Control Center
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Access all your digital tools and insights from one powerful dashboard. Monitor performance, manage services, and grow your empire.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* Core Pages */}
              <NavCard 
                href="/dashboard"
                icon="🎯"
                title="Dashboard"
                description="Main control center"
                color="royal-purple"
              />
              
              <NavCard 
                href="/analytics"
                icon="📊"
                title="Analytics"
                description="Performance metrics"
                color="blue"
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
                href="/ai-website-builder"
                icon="🚀"
                title="AI Website Builder"
                description="Generate websites with AI"
                color="purple"
              />
              
              <NavCard 
                href="/collaboration"
                icon="🤝"
                title="Collaboration"
                description="Real-time team workspace"
                color="blue"
              />
              
              <NavCard 
                href="/notifications"
                icon="🔔"
                title="Notifications"
                description="Smart alert system"
                color="orange"
              />
              
              <NavCard 
                href="/status"
                icon="✅"
                title="Status"
                description="System health"
                color="green"
              />
              
              <NavCard 
                href="/api-management"
                icon="🔗"
                title="API Management"
                description="Manage APIs & webhooks"
                color="indigo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-gray-900 mb-6">
              📈 Empire Analytics
            </h2>
            <p className="font-sans text-xl text-gray-600">
              Real-time insights into your digital empire&apos;s performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon="👥" title="Active Users" value="1,234" change="+12%" />
            <StatCard icon="💰" title="Revenue" value="$8,432" change="+23%" />
            <StatCard icon="📈" title="Growth" value="156%" change="+8%" />
          </div>
        </div>
      </section>
    </div>
  )
}

function NavCard({ href, icon, title, description, color }) {
  const colorClasses = {
    'royal-purple': "bg-royal-purple-500 hover:bg-royal-purple-600 border-royal-purple-200",
    blue: "bg-blue-500 hover:bg-blue-600 border-blue-200", 
    indigo: "bg-indigo-500 hover:bg-indigo-600 border-indigo-200",
    gray: "bg-gray-500 hover:bg-gray-600 border-gray-200",
    orange: "bg-orange-500 hover:bg-orange-600 border-orange-200",
    pink: "bg-pink-500 hover:bg-pink-600 border-pink-200",
    teal: "bg-teal-500 hover:bg-teal-600 border-teal-200",
    green: "bg-green-500 hover:bg-green-600 border-green-200",
    purple: "bg-purple-500 hover:bg-purple-600 border-purple-200",
    yellow: "bg-yellow-500 hover:bg-yellow-600 border-yellow-200"
  };

  return (
    <Link href={href} className={`block p-6 ${colorClasses[color]} text-white rounded-2xl hover:shadow-soft-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group`}>
      <div className="text-center">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="font-heading font-bold text-xl mb-2">{title}</h3>
        <p className="font-sans text-sm opacity-90">{description}</p>
      </div>
    </Link>
  );
}

function StatCard({ icon, title, value, change }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 text-center hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-heading font-semibold text-lg text-gray-700 mb-2">{title}</h3>
      <div className="font-heading font-bold text-3xl text-royal-purple-600 mb-2">{value}</div>
      <div className="text-sm text-green-600 font-medium">{change} from last month</div>
    </div>
  );
}
