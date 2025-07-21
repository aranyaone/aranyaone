import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

// Service data - in production this would come from your API
const servicesData = {
  'ai-chat': {
    name: 'AI Chat Service',
    icon: '🤖',
    description: 'Advanced AI-powered chat service for customer support and engagement',
    features: ['24/7 Availability', 'Multi-language Support', 'Custom Training', 'API Integration'],
    pricing: '₹29/month',
    status: 'Active',
    usage: 75,
    users: 145,
    revenue: '₹18,500',
    category: 'AI Services'
  },
  'analytics': {
    name: 'Analytics Dashboard',
    icon: '📊',
    description: 'Comprehensive analytics and insights for your digital empire',
    features: ['Real-time Data', 'Custom Reports', 'Data Export', 'Visual Charts'],
    pricing: '₹39/month',
    status: 'Active',
    usage: 89,
    users: 89,
    revenue: '₹12,800',
    category: 'Analytics'
  },
  'seo-optimizer': {
    name: 'SEO Optimizer',
    icon: '🔍',
    description: 'Boost your search engine rankings with AI-powered SEO tools',
    features: ['Keyword Research', 'Content Optimization', 'Rank Tracking', 'Competitor Analysis'],
    pricing: '₹35/month',
    status: 'Active',
    usage: 45,
    users: 67,
    revenue: '₹8,900',
    category: 'Marketing'
  },
  'social-media': {
    name: 'Social Media Manager',
    icon: '📱',
    description: 'Automate and optimize your social media presence across all platforms',
    features: ['Auto Posting', 'Content Scheduling', 'Analytics', 'Multi-platform Support'],
    pricing: '₹25/month',
    status: 'Paused',
    usage: 0,
    users: 34,
    revenue: '₹6,200',
    category: 'Marketing'
  },
  'design-studio': {
    name: 'Design Studio',
    icon: '🎨',
    description: 'AI-powered design tools for creating stunning visuals and graphics',
    features: ['Template Library', 'AI Generation', 'Brand Kit', 'Export Options'],
    pricing: '₹45/month',
    status: 'Active',
    usage: 30,
    users: 28,
    revenue: '₹4,100',
    category: 'Design'
  },
  'email-marketing': {
    name: 'Email Marketing',
    icon: '📧',
    description: 'Powerful email marketing automation and campaign management',
    features: ['Email Templates', 'Automation Flows', 'A/B Testing', 'Analytics'],
    pricing: '₹30/month',
    status: 'Active',
    usage: 55,
    users: 52,
    revenue: '₹5,600',
    category: 'Marketing'
  }
}

export default function ServicePage() {
  const router = useRouter()
  const { slug } = router.query
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (slug && servicesData[slug]) {
      setService(servicesData[slug])
      setLoading(false)
    } else if (slug) {
      // Service not found
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Service...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <a
            href="/services"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Services
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>{service.name} - Aranya One</title>
        <meta name="description" content={service.description} />
      </Head>

      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <ServiceHeader service={service} />

          {/* Service Stats */}
          <ServiceStats service={service} />

          {/* Tab Navigation */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'settings', 'analytics', 'billing'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'overview' && <OverviewTab service={service} />}
            {activeTab === 'settings' && <SettingsTab service={service} />}
            {activeTab === 'analytics' && <AnalyticsTab service={service} />}
            {activeTab === 'billing' && <BillingTab service={service} />}
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <a href="/services" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Services</a>
          </div>
        </div>
      </main>
    </div>
  )
}

function ServiceHeader({ service }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Paused': return 'bg-yellow-100 text-yellow-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="text-6xl">{service.icon}</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{service.name}</h1>
            <p className="text-gray-600 mb-4 max-w-2xl">{service.description}</p>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                {service.status}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{service.category}</span>
              <span className="text-gray-500">•</span>
              <span className="font-semibold text-gray-800">{service.pricing}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            service.status === 'Active' 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}>
            {service.status === 'Active' ? '⏸️ Pause' : '▶️ Start'}
          </button>
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium">
            ⚙️ Settings
          </button>
        </div>
      </div>
    </div>
  )
}

function ServiceStats({ service }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">{service.users}</p>
            <p className="text-sm text-green-600 mt-1">+5% this week</p>
          </div>
          <div className="text-3xl">👥</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Usage</p>
            <p className="text-2xl font-bold text-gray-900">{service.usage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${service.usage}%` }}
              ></div>
            </div>
          </div>
          <div className="text-3xl">📊</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{service.revenue}</p>
            <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
          </div>
          <div className="text-3xl">💰</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Uptime</p>
            <p className="text-2xl font-bold text-gray-900">99.8%</p>
            <p className="text-sm text-green-600 mt-1">Last 30 days</p>
          </div>
          <div className="text-3xl">🟢</div>
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ service }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Features */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">✨ Key Features</h3>
        <div className="space-y-4">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">
                ✓
              </div>
              <span className="font-medium text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">📈 Recent Activity</h3>
        <div className="space-y-4">
          {[
            { event: 'New user subscription', time: '2 hours ago', type: 'user' },
            { event: 'API rate limit reached', time: '4 hours ago', type: 'warning' },
            { event: 'Performance optimization', time: '1 day ago', type: 'system' },
            { event: 'Feature update deployed', time: '3 days ago', type: 'update' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.event}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsTab({ service }) {
  return (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">⚙️ General Settings</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
              <input
                type="text"
                defaultValue={service.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>{service.category}</option>
                <option>AI Services</option>
                <option>Analytics</option>
                <option>Marketing</option>
                <option>Design</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              defaultValue={service.description}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* API Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">🔗 API Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={`https://api.aranyaone.com/v1/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                📋 Copy
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <div className="flex gap-2">
              <input
                type="password"
                value="ak_live_xxxxxxxxxxxxxxxxxxxxx"
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                🔄 Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsTab({ service }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Usage Analytics */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">📊 Usage Analytics</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Daily Active Users</span>
            <span className="font-bold text-gray-900">1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">API Calls (24h)</span>
            <span className="font-bold text-gray-900">45,678</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Success Rate</span>
            <span className="font-bold text-green-600">99.7%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Avg Response Time</span>
            <span className="font-bold text-gray-900">142ms</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">⚡ Performance Metrics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">CPU Usage</span>
              <span className="font-bold text-gray-900">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Memory Usage</span>
              <span className="font-bold text-gray-900">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Network I/O</span>
              <span className="font-bold text-gray-900">42%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BillingTab({ service }) {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">💳 Current Plan</h3>
        <div className="flex items-center justify-between p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Professional Plan</h4>
            <p className="text-gray-600">Full access to all features</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">{service.pricing}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Next billing date</p>
            <p className="font-semibold text-gray-800">February 15, 2024</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Change Plan
            </button>
          </div>
        </div>
      </div>

      {/* Usage & Billing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">📊 Usage This Month</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">API Calls</span>
              <span className="font-bold">847,293 / 1,000,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84.7%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Storage</span>
              <span className="font-bold">2.3 GB / 5 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '46%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">💰 Billing History</h4>
          <div className="space-y-3">
            {[
              { date: 'Jan 15, 2024', amount: service.pricing, status: 'Paid' },
              { date: 'Dec 15, 2023', amount: service.pricing, status: 'Paid' },
              { date: 'Nov 15, 2023', amount: service.pricing, status: 'Paid' }
            ].map((bill, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{bill.date}</p>
                  <p className="text-sm text-gray-600">{bill.amount}</p>
                </div>
                <span className="text-sm text-green-600 font-medium">{bill.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  // Define the static paths for all services
  const paths = Object.keys(servicesData).map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false, // Set to true if you want to enable dynamic generation
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params

  // In a real app, you'd fetch the service data from your API here
  if (!servicesData[slug]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      service: servicesData[slug],
      slug,
    },
  }
}