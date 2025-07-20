import Head from 'next/head'
import Link from 'next/link'
import { useNotifications } from '../components/SmartNotification'

export default function ServicesPage() {
  const { success, info } = useNotifications()

  const handleServiceAction = (action, serviceName) => {
    success(`${action} completed for ${serviceName}!`, {
      title: 'Service Action',
      duration: 3000
    })
  }

  const handleViewDetails = (serviceId, serviceName) => {
    info(`Opening ${serviceName} details...`, {
      title: 'Navigation',
      duration: 2000
    })
  }

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

          {/* Featured Services with Detail Links */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🌟 Featured Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeaturedServiceCard 
                id="ai-chat"
                icon="🤖"
                name="AI Chat Service"
                description="Intelligent conversations powered by AI"
                price="₹29/month"
                rating="4.9"
                onViewDetails={handleViewDetails}
              />
              <FeaturedServiceCard 
                id="analytics"
                icon="📊"
                name="Analytics Dashboard"
                description="Data-driven insights for your business"
                price="₹39/month"
                rating="4.8"
                onViewDetails={handleViewDetails}
              />
              <FeaturedServiceCard 
                id="seo-tools"
                icon="🔍"
                name="SEO Optimizer"
                description="Boost your search engine rankings"
                price="₹35/month"
                rating="4.7"
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            {/* Core Services */}
            <ServiceCategory 
              title="Core Services" 
              color="green" 
              services={[
                { icon: "🤖", name: "AI Chat Service", status: "Active", usage: "75%", price: "₹29/month", id: "ai-chat" },
                { icon: "📊", name: "Analytics Dashboard", status: "Active", usage: "60%", price: "₹39/month", id: "analytics" },
                { icon: "🔐", name: "Security Manager", status: "Active", usage: "90%", price: "₹49/month", id: "security" },
              ]} 
              onServiceAction={handleServiceAction}
              onViewDetails={handleViewDetails}
            />

            {/* Marketing Services */}
            <ServiceCategory 
              title="Marketing Services" 
              color="blue" 
              services={[
                { icon: "🔍", name: "SEO Optimizer", status: "Active", usage: "45%", price: "₹35/month", id: "seo-tools" },
                { icon: "📱", name: "Social Media Manager", status: "Paused", usage: "0%", price: "₹25/month", id: "social-media" },
                { icon: "📧", name: "Email Marketing", status: "Active", usage: "55%", price: "₹30/month", id: "email-marketing" },
              ]} 
              onServiceAction={handleServiceAction}
              onViewDetails={handleViewDetails}
            />

            {/* Advanced Services */}
            <ServiceCategory 
              title="Advanced Services" 
              color="purple" 
              services={[
                { icon: "🎨", name: "Design Studio", status: "Active", usage: "30%", price: "₹45/month", id: "design-studio" },
                { icon: "🎯", name: "Content Optimizer", status: "Cancelled", usage: "0%", price: "₹40/month", id: "content-optimizer" },
                { icon: "📈", name: "Growth Analytics", status: "Paused", usage: "0%", price: "₹55/month", id: "growth-analytics" },
              ]} 
              onServiceAction={handleServiceAction}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Recommended Services */}
          <RecommendedServices onViewDetails={handleViewDetails} />

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

function FeaturedServiceCard({ id, icon, name, description, price, rating, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200 hover:border-blue-300 transition-colors">
      <div className="text-center mb-4">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm font-medium text-gray-700">{rating}</span>
          <span className="text-sm text-gray-500">(200+ reviews)</span>
        </div>
        <div className="text-2xl font-bold text-blue-600 mb-4">{price}</div>
      </div>
      
      <div className="space-y-2">
        <Link href={`/services/${id}`}>
          <button 
            onClick={() => onViewDetails(id, name)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            📖 View Details
          </button>
        </Link>
        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
          🚀 Start Trial
        </button>
      </div>
    </div>
  )
}

function ServiceCategory({ title, color, services, onServiceAction, onViewDetails }) {
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
                {service.id && (
                  <Link href={`/services/${service.id}`}>
                    <button 
                      onClick={() => onViewDetails(service.id, service.name)}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      📖 Details
                    </button>
                  </Link>
                )}
                <button 
                  onClick={() => onServiceAction(service.status === 'Active' ? 'Pause' : 'Start', service.name)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg ${
                    service.status === 'Active' 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
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

function RecommendedServices({ onViewDetails }) {
  const services = [
    { icon: "🎯", name: "Content Optimizer", desc: "AI-powered content optimization", price: "₹25/month", color: "blue", id: "content-optimizer" },
    { icon: "📧", name: "Advanced Email Marketing", desc: "Automated email campaigns with AI", price: "₹35/month", color: "green", id: "email-marketing" },
    { icon: "🎨", name: "Pro Design Studio", desc: "Premium AI-generated designs", price: "₹40/month", color: "purple", id: "design-studio" },
    { icon: "🚀", name: "Growth Accelerator", desc: "Boost your empire's growth", price: "₹60/month", color: "orange", id: "growth-accelerator" },
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
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-gray-800">{service.price}</span>
            </div>
            <div className="space-y-2">
              {service.id && (
                <Link href={`/services/${service.id}`}>
                  <button 
                    onClick={() => onViewDetails(service.id, service.name)}
                    className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
                  >
                    📖 Learn More
                  </button>
                </Link>
              )}
              <button className={`w-full px-4 py-2 bg-${service.color}-500 text-white rounded-lg text-sm hover:bg-${service.color}-600 transition-colors`}>
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
