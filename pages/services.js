import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const services = [
    // Core Services
    { 
      id: 1, icon: "🤖", name: "AI Chat Service", category: "core",
      status: "Active", usage: "75%", price: "₹29/month", 
      description: "Advanced AI-powered chat assistance for customer support and engagement",
      features: ["24/7 Support", "Multi-language", "Custom Training"]
    },
    { 
      id: 2, icon: "📊", name: "Analytics Dashboard", category: "core",
      status: "Active", usage: "60%", price: "₹39/month",
      description: "Comprehensive analytics and insights for your digital presence",
      features: ["Real-time Data", "Custom Reports", "API Access"]
    },
    { 
      id: 3, icon: "🔐", name: "Security Manager", category: "core",
      status: "Active", usage: "90%", price: "₹49/month",
      description: "Enterprise-grade security monitoring and threat protection",
      features: ["SSL Monitoring", "Threat Detection", "Compliance Reports"]
    },
    
    // Marketing Services
    { 
      id: 4, icon: "🔍", name: "SEO Optimizer", category: "marketing",
      status: "Active", usage: "45%", price: "₹35/month",
      description: "Boost your search engine rankings with AI-powered SEO tools",
      features: ["Keyword Research", "Content Analysis", "Rank Tracking"]
    },
    { 
      id: 5, icon: "📱", name: "Social Media Manager", category: "marketing",
      status: "Paused", usage: "0%", price: "₹25/month",
      description: "Automate and optimize your social media presence across platforms",
      features: ["Auto Posting", "Engagement Analytics", "Content Calendar"]
    },
    { 
      id: 6, icon: "📧", name: "Email Marketing", category: "marketing",
      status: "Active", usage: "55%", price: "₹30/month",
      description: "Create and manage effective email campaigns with automation",
      features: ["Drag & Drop Editor", "A/B Testing", "Automation Workflows"]
    },
    
    // Advanced Services
    { 
      id: 7, icon: "🎨", name: "Design Studio", category: "advanced",
      status: "Active", usage: "30%", price: "₹45/month",
      description: "AI-powered design tools for creating stunning visuals and graphics",
      features: ["Template Library", "Brand Kit", "Collaboration Tools"]
    },
    { 
      id: 8, icon: "🎯", name: "Content Optimizer", category: "advanced",
      status: "Cancelled", usage: "0%", price: "₹40/month",
      description: "Optimize your content strategy with AI-driven insights and suggestions",
      features: ["Content Scoring", "SEO Suggestions", "Performance Tracking"]
    },
    { 
      id: 9, icon: "📈", name: "Growth Analytics", category: "advanced",
      status: "Paused", usage: "0%", price: "₹55/month",
      description: "Advanced growth metrics and predictive analytics for scaling",
      features: ["Predictive Models", "Cohort Analysis", "Custom Dashboards"]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Services', count: services.length },
    { id: 'core', name: 'Core Services', count: services.filter(s => s.category === 'core').length },
    { id: 'marketing', name: 'Marketing', count: services.filter(s => s.category === 'marketing').length },
    { id: 'advanced', name: 'Advanced', count: services.filter(s => s.category === 'advanced').length },
  ]

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  const activeServices = services.filter(s => s.status === 'Active').length
  const pausedServices = services.filter(s => s.status === 'Paused').length
  const cancelledServices = services.filter(s => s.status === 'Cancelled').length
  const totalUsage = Math.round(services.reduce((acc, s) => acc + parseInt(s.usage), 0) / services.length)

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Services - Aranya One</title>
        <meta name="description" content="Manage all your digital empire services" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🛠️ Service Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Control and monitor all your digital empire services with advanced management tools
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <StatCard icon="✅" title="Active Services" count={activeServices} status="Running Smoothly" color="green" />
          <StatCard icon="⏸️" title="Paused Services" count={pausedServices} status="Temporarily Stopped" color="yellow" />
          <StatCard icon="❌" title="Cancelled Services" count={cancelledServices} status="Inactive Services" color="red" />
          <StatCard icon="📊" title="Average Usage" count={`${totalUsage}%`} status="Overall Performance" color="blue" />
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-gray-100">
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-4">Filter Services</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-royal-purple-500 text-white shadow-soft-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-soft'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Recommended Services */}
        <RecommendedServices />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}

function StatCard({ icon, title, count, status, color }) {
  const colorClasses = {
    green: 'border-green-200 bg-green-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    red: 'border-red-200 bg-red-50',
    blue: 'border-blue-200 bg-blue-50',
  }

  const iconColors = {
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    blue: 'text-blue-600',
  }

  return (
    <div className={`bg-white rounded-2xl shadow-soft p-6 border-2 ${colorClasses[color]} hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 metric-card`}>
      <div className="text-center">
        <div className={`text-4xl mb-3 ${iconColors[color]}`}>{icon}</div>
        <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">{title}</h3>
        <div className={`text-3xl font-bold mb-2 ${iconColors[color]}`}>{count}</div>
        <p className="text-sm text-gray-600">{status}</p>
      </div>
    </div>
  );
}

function ServiceCard({ service }) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'text-green-700 bg-green-100 border-green-200';
      case 'Paused': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Cancelled': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  }

  const getActionButton = (status) => {
    switch(status) {
      case 'Active':
        return { text: 'Pause', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' }
      case 'Paused':
        return { text: 'Resume', color: 'bg-green-100 text-green-700 hover:bg-green-200' }
      case 'Cancelled':
        return { text: 'Reactivate', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' }
      default:
        return { text: 'Manage', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' }
    }
  }

  const actionButton = getActionButton(service.status)

  return (
    <div 
      className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`text-3xl group-hover:scale-110 transition-transform duration-300 ${isHovered ? 'animate-pulse-slow' : ''}`}>
            {service.icon}
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-900 group-hover:text-royal-purple-700 transition-colors">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600">{service.usage} usage this month</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(service.status)}`}>
          {service.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {service.description}
      </p>

      {/* Features */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-royal-purple-50 text-royal-purple-700 text-xs rounded-lg border border-royal-purple-100"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Usage Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Usage</span>
          <span>{service.usage}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-royal-gradient h-2 rounded-full transition-all duration-500"
            style={{ width: service.usage }}
          ></div>
        </div>
      </div>

      {/* Price and Actions */}
      <div className="flex items-center justify-between">
        <span className="font-heading font-bold text-2xl text-gray-900">
          {service.price}
        </span>
        <div className="flex gap-2">
          <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${actionButton.color}`}>
            {actionButton.text}
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200">
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}

function RecommendedServices() {
  const recommendedServices = [
    { 
      icon: "🎯", name: "Content Optimizer Pro", 
      desc: "Advanced AI-powered content optimization with sentiment analysis", 
      price: "₹35/month", color: "blue",
      features: ["AI Content Score", "Competitor Analysis", "Trending Topics"]
    },
    { 
      icon: "📧", name: "Advanced Email Marketing", 
      desc: "Enterprise email marketing with advanced automation and segmentation", 
      price: "₹45/month", color: "green",
      features: ["Advanced Segmentation", "Predictive Analytics", "Deliverability Tools"]
    },
    { 
      icon: "🎨", name: "Pro Design Studio", 
      desc: "Professional design suite with brand management and collaboration", 
      price: "₹55/month", color: "purple",
      features: ["Brand Management", "Team Collaboration", "Asset Library"]
    },
    { 
      icon: "🚀", name: "Growth Accelerator", 
      desc: "Comprehensive growth platform with predictive insights", 
      price: "₹75/month", color: "orange",
      features: ["Growth Experiments", "Conversion Optimization", "Performance Prediction"]
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-100 mb-8">
      <h2 className="font-heading font-bold text-2xl text-gray-900 mb-2">
        🌟 Recommended Services
      </h2>
      <p className="text-gray-600 mb-6">
        Boost your empire with these premium services tailored to your growth
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedServices.map((service, i) => (
          <div key={i} className="group">
            <div className={`p-6 bg-gradient-to-br from-${service.color}-50 to-${service.color}-100 rounded-2xl border border-${service.color}-200 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1`}>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{service.desc}</p>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-white/50 text-gray-700 text-xs rounded border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-xl text-gray-900">{service.price}</span>
                <button className={`px-4 py-2 bg-${service.color}-500 text-white rounded-xl text-sm font-medium hover:bg-${service.color}-600 transition-all duration-200 hover:scale-105`}>
                  Try Free
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { icon: "➕", label: "Add New Service", desc: "Browse marketplace", bg: "royal-purple", link: "#" },
    { icon: "📈", label: "View Analytics", desc: "Service performance", bg: "blue", link: "/analytics" },
    { icon: "⚙️", label: "Global Settings", desc: "Configure preferences", bg: "gray", link: "/settings" },
    { icon: "💬", label: "Support Center", desc: "Get expert help", bg: "green", link: "/support" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-100">
      <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">
        ⚡ Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <Link 
            key={i} 
            href={action.link}
            className={`p-6 bg-${action.bg === 'royal-purple' ? 'royal-purple' : action.bg}-500 text-white rounded-2xl hover:bg-${action.bg === 'royal-purple' ? 'royal-purple' : action.bg}-600 transition-all duration-300 text-center hover:shadow-soft-lg hover:-translate-y-1 group`}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{action.icon}</div>
            <div className="font-heading font-semibold text-lg mb-1">{action.label}</div>
            <div className="text-sm opacity-90">{action.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
