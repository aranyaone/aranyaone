import Head from 'next/head'
import { useState } from 'react'

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'general', name: 'General Help', icon: '❓' },
    { id: 'billing', name: 'Billing & Plans', icon: '💳' },
    { id: 'technical', name: 'Technical Issues', icon: '🔧' },
    { id: 'services', name: 'Service Setup', icon: '⚙️' },
  ]

  const faqData = {
    general: [
      { q: 'How do I get started with Aranya One?', a: 'Simply sign up for an account, choose your plan, and follow our guided setup process. Our dashboard will walk you through connecting your first services.' },
      { q: 'What services are included in my plan?', a: 'Each plan includes different service tiers. Check your dashboard for available services or upgrade your plan to access premium features.' },
      { q: 'How can I track my usage and analytics?', a: 'Visit your Dashboard to see real-time analytics, usage metrics, and performance data for all your connected services.' },
    ],
    billing: [
      { q: 'How does billing work?', a: 'We charge monthly based on your selected plan and active services. You can view and manage billing in your Settings page.' },
      { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change your plan anytime. Changes take effect immediately, and billing is prorated.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.' },
    ],
    technical: [
      { q: 'My service is not working properly', a: 'First, check the Status page for any known issues. If the problem persists, try restarting the service or contact our technical team.' },
      { q: 'How do I integrate with my existing tools?', a: 'Most services offer API integrations and webhooks. Check the documentation for specific integration guides.' },
      { q: 'Can I get help with custom configurations?', a: 'Yes! Our premium support includes custom configuration assistance. Contact us for personalized setup help.' },
    ],
    services: [
      { q: 'How do I add a new service?', a: 'Go to the Services page, browse available services, and click "Try Free" to start. Most services include a free trial period.' },
      { q: 'Can I pause or cancel services?', a: 'Yes, you can pause or cancel services anytime from the Services page. Paused services retain your data but stop billing.' },
      { q: 'How do I configure service settings?', a: 'Each service has its own settings panel accessible from the Services page. Click "Settings" next to any service to configure it.' },
    ],
  }

  const contactMethods = [
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'blue'
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 2 hours',
      action: 'Send Email',
      color: 'green'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: 'Mon-Fri, 9 AM - 6 PM',
      action: 'Call Now',
      color: 'purple'
    },
    {
      icon: '📚',
      title: 'Documentation',
      description: 'Browse comprehensive guides',
      availability: 'Always available',
      action: 'View Docs',
      color: 'orange'
    },
  ]

  const filteredFAQs = faqData[selectedCategory].filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Support Center - Aranya One</title>
        <meta name="description" content="Get help and support for your digital empire" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-heading font-bold text-5xl text-gray-900 mb-4">
            💬 Support Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help, find answers, and contact our support team for your digital empire
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent shadow-soft"
            />
            <div className="absolute right-4 top-4 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <ContactCard key={index} method={method} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-100 mb-8">
          <h2 className="font-heading font-bold text-3xl text-gray-900 mb-8 text-center">
            🔍 Frequently Asked Questions
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-royal-purple-500 text-white shadow-soft-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-soft'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.q} answer={faq.a} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No FAQs found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-gray-900">All Systems Operational</h3>
                <p className="text-gray-600">All services are running smoothly</p>
              </div>
            </div>
            <Link 
              href="/status" 
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              View Status Page
            </Link>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResourceCard
            icon="📖"
            title="User Guide"
            description="Complete guide to using Aranya One"
            link="/docs"
            color="blue"
          />
          <ResourceCard
            icon="🎥"
            title="Video Tutorials"
            description="Step-by-step video walkthroughs"
            link="/docs"
            color="purple"
          />
          <ResourceCard
            icon="🚀"
            title="Best Practices"
            description="Tips to maximize your empire's growth"
            link="/docs"
            color="green"
          />
        </div>
      </div>
    </div>
  )
}

function ContactCard({ method }) {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 text-center">
      <div className="text-4xl mb-4">{method.icon}</div>
      <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{method.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{method.description}</p>
      <p className="text-xs text-gray-500 mb-4">{method.availability}</p>
      <button className={`w-full py-2 px-4 ${colorClasses[method.color]} text-white rounded-lg font-medium transition-colors`}>
        {method.action}
      </button>
    </div>
  )
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 leading-relaxed animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  )
}

function ResourceCard({ icon, title, description, link, color }) {
  const colorClasses = {
    blue: 'border-blue-200 hover:border-blue-300',
    purple: 'border-purple-200 hover:border-purple-300',
    green: 'border-green-200 hover:border-green-300',
  }

  return (
    <a 
      href={link}
      className={`block bg-white rounded-2xl shadow-soft p-6 border ${colorClasses[color]} hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </a>
  )
}