import Head from 'next/head'

export default function ServicesPage() {
  return (
    <div>
      <Head>
        <title>Services - Aranya One</title>
        <meta name="description" content="Manage all your empire services" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🛠️ Service Manager</h1>
            <p className="text-gray-600">Control and monitor all your digital empire services</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon="✅" title="Active Services" count="8" status="Currently Running" border="green" />
            <StatCard icon="⏸️" title="Paused Services" count="3" status="Temporarily Stopped" border="yellow" />
            <StatCard icon="❌" title="Cancelled Services" count="2" status="Stopped Services" border="red" />
            <StatCard icon="📊" title="Total Usage" count="75%" status="Average Usage" border="blue" />
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            {/* Core Services */}
            <ServiceCategory 
              title="Core Services" 
              color="green" 
              services={[
                { icon: "🤖", name: "AI Chat Service", status: "Active", usage: "75%", price: "₹29/month" },
                { icon: "📊", name: "Analytics Dashboard", status: "Active", usage: "60%", price: "₹39/month" },
                { icon: "🔐", name: "Security Manager", status: "Active", usage: "90%", price: "₹49/month" },
              ]} 
            />

            {/* Marketing Services */}
            <ServiceCategory 
              title="Marketing Services" 
              color="blue" 
              services={[
                { icon: "🔍", name: "SEO Optimizer", status: "Active", usage: "45%", price: "₹35/month" },
                { icon: "📱", name: "Social Media Manager", status: "Paused", usage: "0%", price: "₹25/month" },
                { icon: "📧", name: "Email Marketing", status: "Active", usage: "55%", price: "₹30/month" },
              ]} 
            />

            {/* Advanced Services */}
            <ServiceCategory 
              title="Advanced Services" 
              color="purple" 
              services={[
                { icon: "🎨", name: "Design Studio", status: "Active", usage: "30%", price: "₹45/month" },
                { icon: "🎯", name: "Content Optimizer", status: "Cancelled", usage: "0%", price: "₹40/month" },
                { icon: "📈", name: "Growth Analytics", status: "Paused", usage: "0%", price: "₹55/month" },
              ]} 
            />
          </div>

          {/* Recommended Services */}
          <RecommendedServices />

          {/* Affiliate Leaderboard */}
          <AffiliateLeaderboard />

          {/* Quick Actions */}
          <QuickActions />

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, count, status, border }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 border-2 border-${border}-200`}>
      <div className="text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className={`text-3xl font-bold text-${border}-600 mt-2`}>{count}</div>
        <p className="text-sm text-gray-500 mt-1">{status}</p>
      </div>
    </div>
  );
}

function ServiceCategory({ title, color, services }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 border-2 border-${color}-200`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="space-y-4">
        {services.map((service, idx) => (
          <div key={idx} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{service.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.usage} usage</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                {service.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">{service.price}</span>
              <div className="flex gap-2">
                <button className={`px-3 py-1 text-xs font-medium rounded-lg ${
                  service.status === 'Active' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}>
                  {service.status === 'Active' ? 'Pause' : 'Start'}
                </button>
                <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Settings
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch(status) {
    case 'Active': return 'text-green-700 bg-green-100';
    case 'Paused': return 'text-yellow-700 bg-yellow-100';
    case 'Cancelled': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

function RecommendedServices() {
  const services = [
    { icon: "🎯", name: "Content Optimizer", desc: "AI-powered content optimization", price: "₹25/month", color: "blue" },
    { icon: "📧", name: "Advanced Email Marketing", desc: "Automated email campaigns with AI", price: "₹35/month", color: "green" },
    { icon: "🎨", name: "Pro Design Studio", desc: "Premium AI-generated designs", price: "₹40/month", color: "purple" },
    { icon: "🚀", name: "Growth Accelerator", desc: "Boost your empire's growth", price: "₹60/month", color: "orange" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🌟 Recommended Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <div key={i} className={`p-6 bg-gradient-to-br from-${service.color}-50 to-${service.color}-100 rounded-xl border border-${service.color}-200`}>
            <div className="text-3xl mb-4">{service.icon}</div>
            <h3 className="font-bold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">{service.price}</span>
              <button className={`px-4 py-2 bg-${service.color}-500 text-white rounded-lg text-sm hover:bg-${service.color}-600 transition-colors`}>
                Try Free
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { icon: "➕", label: "Add New Service", desc: "Browse available services", bg: "blue" },
    { icon: "📈", label: "View Analytics", desc: "Service performance", bg: "green", link: "/analytics" },
    { icon: "⚙️", label: "Global Settings", desc: "Configure preferences", bg: "purple", link: "/settings" },
    { icon: "💬", label: "Support Center", desc: "Get help", bg: "orange", link: "/support" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⚡ Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <button 
            key={i} 
            onClick={() => action.link && (window.location.href = action.link)}
            className={`p-4 bg-${action.bg}-500 text-white rounded-xl hover:bg-${action.bg}-600 transition-colors text-left`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">{action.icon}</div>
              <div className="font-semibold">{action.label}</div>
            </div>
            <div className="text-sm opacity-90">{action.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AffiliateLeaderboard() {
  const affiliates = [
    { 
      rank: 1, 
      name: "Digital Empire Pro", 
      avatar: "🏆", 
      referrals: 87, 
      earnings: "₹43,500", 
      growth: "+25%",
      badge: "Top Performer"
    },
    { 
      rank: 2, 
      name: "Tech Solutions Inc", 
      avatar: "🥈", 
      referrals: 72, 
      earnings: "₹36,200", 
      growth: "+18%",
      badge: "Rising Star"
    },
    { 
      rank: 3, 
      name: "Growth Hackers", 
      avatar: "🥉", 
      referrals: 65, 
      earnings: "₹32,800", 
      growth: "+22%",
      badge: "Consistent"
    },
    { 
      rank: 4, 
      name: "Marketing Masters", 
      avatar: "🚀", 
      referrals: 58, 
      earnings: "₹29,100", 
      growth: "+15%",
      badge: "Reliable"
    },
    { 
      rank: 5, 
      name: "Innovation Labs", 
      avatar: "⭐", 
      referrals: 52, 
      earnings: "₹26,400", 
      growth: "+28%",
      badge: "Trending"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-200 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🏆 Affiliate Leaderboard</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">This Month</span>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All →</button>
        </div>
      </div>
      
      <div className="space-y-4">
        {affiliates.map((affiliate, index) => (
          <div key={index} className={`flex items-center justify-between p-4 rounded-xl border-2 ${
            affiliate.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' :
            affiliate.rank === 2 ? 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200' :
            affiliate.rank === 3 ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' :
            'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                affiliate.rank <= 3 ? 'bg-white shadow-md' : 'bg-white/50'
              }`}>
                {affiliate.avatar}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-gray-800">{affiliate.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    affiliate.badge === 'Top Performer' ? 'bg-yellow-100 text-yellow-800' :
                    affiliate.badge === 'Rising Star' ? 'bg-blue-100 text-blue-800' :
                    affiliate.badge === 'Trending' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {affiliate.badge}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>👥 {affiliate.referrals} referrals</span>
                  <span>📈 {affiliate.growth}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">{affiliate.earnings}</div>
              <div className="text-sm text-gray-500">Total earnings</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800 mb-1">🎯 Your Affiliate Progress</h3>
            <p className="text-sm text-gray-600">Rank #8 • 42 referrals • ₹21,600 earned</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            🚀 Boost Referrals
          </button>
        </div>
      </div>
    </div>
  );
}
