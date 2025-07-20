import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react'
import { useNotifications } from '../../components/SmartNotification'

// Service data - in a real app, this would come from an API
const SERVICES = {
  'ai-chat': {
    id: 'ai-chat',
    name: 'AI Chat Service',
    icon: '🤖',
    tagline: 'Intelligent conversations, powered by AI',
    description: 'Transform your customer support with our advanced AI chat system. Provide 24/7 assistance, answer queries instantly, and scale your support without limits.',
    price: {
      monthly: 29,
      yearly: 290
    },
    features: [
      'Natural Language Processing',
      '24/7 Automated Support', 
      'Multi-language Support',
      'Custom Training Data',
      'Advanced Analytics',
      'API Integration',
      'Real-time Responses',
      'Conversation History'
    ],
    screenshots: [
      '/api/placeholder/600/400?text=AI+Chat+Interface',
      '/api/placeholder/600/400?text=Analytics+Dashboard', 
      '/api/placeholder/600/400?text=Configuration+Panel'
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        company: 'TechCorp',
        text: 'Reduced our support costs by 70% while improving response times.'
      },
      {
        name: 'Mike Chen',
        company: 'StartupXYZ',
        text: 'The AI understands context better than any solution we tried before.'
      }
    ],
    stats: {
      '99.9%': 'Uptime',
      '< 200ms': 'Response Time',
      '500+': 'Happy Customers',
      '50+': 'Languages'
    }
  },
  'analytics': {
    id: 'analytics',
    name: 'Analytics Dashboard',
    icon: '📊',
    tagline: 'Data-driven insights for smarter decisions',
    description: 'Get comprehensive analytics and insights into your business performance. Track KPIs, visualize trends, and make data-driven decisions with powerful reporting tools.',
    price: {
      monthly: 39,
      yearly: 390
    },
    features: [
      'Real-time Data Processing',
      'Custom Dashboards',
      'Advanced Reporting',
      'Data Visualization',
      'Export Capabilities',
      'Alert Systems',
      'Team Collaboration',
      'API Access'
    ],
    screenshots: [
      '/api/placeholder/600/400?text=Main+Dashboard',
      '/api/placeholder/600/400?text=Custom+Reports',
      '/api/placeholder/600/400?text=Data+Visualization'
    ],
    testimonials: [
      {
        name: 'Emily Davis',
        company: 'DataCorp',
        text: 'The insights helped us increase revenue by 35% in just 3 months.'
      }
    ],
    stats: {
      '1M+': 'Data Points',
      '< 1s': 'Query Time',
      '99.99%': 'Accuracy',
      '24/7': 'Monitoring'
    }
  },
  'seo-tools': {
    id: 'seo-tools',
    name: 'SEO Optimizer',
    icon: '🔍',
    tagline: 'Boost your search engine rankings',
    description: 'Optimize your website for search engines with our comprehensive SEO toolkit. Analyze keywords, track rankings, and improve your organic visibility.',
    price: {
      monthly: 35,
      yearly: 350
    },
    features: [
      'Keyword Research',
      'Rank Tracking',
      'Site Audits',
      'Competitor Analysis',
      'Backlink Monitoring',
      'Content Optimization',
      'Local SEO',
      'Performance Reports'
    ],
    screenshots: [
      '/api/placeholder/600/400?text=SEO+Dashboard',
      '/api/placeholder/600/400?text=Keyword+Research',
      '/api/placeholder/600/400?text=Site+Audit'
    ],
    testimonials: [
      {
        name: 'David Wilson',
        company: 'GrowthAgency',
        text: 'Our clients saw 150% improvement in organic traffic within 6 months.'
      }
    ],
    stats: {
      '10M+': 'Keywords',
      '500+': 'Search Engines',
      '100+': 'Countries',
      '24/7': 'Monitoring'
    }
  }
}

export default function ServiceDetail() {
  const router = useRouter()
  const { id } = router.query
  const { success } = useNotifications()
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  const service = SERVICES[id]

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h1>
          <p className="text-gray-600 mb-4">The service you're looking for doesn't exist.</p>
          <a href="/services" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Services
          </a>
        </div>
      </div>
    )
  }

  const handleStartTrial = () => {
    success(`Started free trial for ${service.name}!`, {
      title: 'Trial Started',
      duration: 5000
    })
  }

  const handlePurchase = () => {
    success(`Subscribed to ${service.name} ${selectedPlan} plan!`, {
      title: 'Subscription Active',
      duration: 5000
    })
  }

  return (
    <div>
      <Head>
        <title>{service.name} - Aranya One</title>
        <meta name="description" content={service.description} />
      </Head>

      <main className="bg-gray-50 min-h-screen">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-6xl mb-4">{service.icon}</div>
                <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
                <p className="text-xl mb-6 opacity-90">{service.tagline}</p>
                <p className="text-lg mb-8 opacity-80">{service.description}</p>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleStartTrial}
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    🚀 Start Free Trial
                  </button>
                  <button
                    onClick={() => document.getElementById('pricing').scrollIntoView()}
                    className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    💰 View Pricing
                  </button>
                </div>
              </div>
              
              <div>
                <img 
                  src={service.screenshots[0]} 
                  alt={`${service.name} Screenshot`}
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(service.stats).map(([value, label], i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
                  <div className="text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">✨ Key Features</h2>
              <p className="text-gray-600 text-lg">Everything you need to succeed with {service.name}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.features.map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="text-2xl mb-3">✅</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature}</h3>
                  <p className="text-gray-600 text-sm">Advanced functionality to enhance your workflow</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        <div className="bg-white py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">📱 Screenshots</h2>
              <p className="text-gray-600 text-lg">See {service.name} in action</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.screenshots.map((screenshot, i) => (
                <div key={i} className="relative">
                  <img 
                    src={screenshot} 
                    alt={`${service.name} Screenshot ${i + 1}`}
                    className="w-full rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">💬 What Our Customers Say</h2>
              <p className="text-gray-600 text-lg">Real feedback from real users</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <div className="text-4xl mb-4">⭐</div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="bg-white py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">💰 Simple Pricing</h2>
              <p className="text-gray-600 text-lg">Choose the plan that works for you</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              {/* Plan Toggle */}
              <div className="flex items-center justify-center mb-8">
                <span className={`mr-3 ${selectedPlan === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setSelectedPlan(selectedPlan === 'monthly' ? 'yearly' : 'monthly')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    selectedPlan === 'yearly' ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      selectedPlan === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`ml-3 ${selectedPlan === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Yearly
                  <span className="ml-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Save 17%
                  </span>
                </span>
              </div>

              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-xl border-2 border-blue-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ₹{service.price[selectedPlan]}
                    <span className="text-lg text-gray-600">/{selectedPlan === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  {selectedPlan === 'yearly' && (
                    <div className="text-green-600 text-sm mb-4">
                      Save ₹{(service.price.monthly * 12) - service.price.yearly} per year
                    </div>
                  )}
                  
                  <button
                    onClick={handlePurchase}
                    className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
                  >
                    🚀 Get Started Now
                  </button>
                  
                  <div className="text-sm text-gray-600">
                    14-day free trial • No credit card required • Cancel anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers using {service.name}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartTrial}
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🚀 Start Free Trial
              </button>
              <a
                href="/support"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                💬 Contact Sales
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white py-8">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <a href="/services" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to All Services
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = Object.keys(SERVICES).map((id) => ({
    params: { id }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      serviceId: params.id
    }
  }
}