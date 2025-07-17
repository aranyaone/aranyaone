import Head from 'next/head'

// Pages Router version - fixed deployment
export default function Home() {
  return (
    <div>
      <Head>
        <title>Aranya One - Digital Empire Dashboard</title>
        <meta name="description" content="Your complete digital empire management platform" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">🌟 Aranya One</h1>
            <p className="text-2xl text-gray-600 mb-6">Your Digital Empire Starts Here</p>
            <p className="text-lg text-green-600 font-semibold">🚀 Pages Router Version - July 17, 2025 - WORKING!</p>
          </div>

          {/* Main Navigation Dashboard */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-green-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🎯 Empire Control Center</h2>
            
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

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon="👥" title="Active Users" value="1,234" />
            <StatCard icon="💰" title="Revenue" value="$8,432" />
            <StatCard icon="📈" title="Growth" value="+23%" />
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-600">
            <p>🏗️ Built with Next.js & Tailwind CSS | Deployed on Vercel</p>
            <p className="text-sm mt-2">🌟 Aranya One Digital Empire Platform</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function NavCard({ href, icon, title, description, color }) {
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
    <a href={href} className={`block p-6 ${colorClasses[color]} text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 group`}>
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </a>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-100">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-blue-600">{value}</div>
    </div>
  );
}
