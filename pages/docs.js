import Head from 'next/head'
import { useState } from 'react'

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { id: 'getting-started', name: 'Quick Start Guide', icon: '🚀' },
        { id: 'installation', name: 'Installation', icon: '⚙️' },
        { id: 'configuration', name: 'Configuration', icon: '🔧' },
      ]
    },
    {
      title: 'API Reference',
      items: [
        { id: 'authentication', name: 'Authentication', icon: '🔐' },
        { id: 'endpoints', name: 'API Endpoints', icon: '📡' },
        { id: 'webhooks', name: 'Webhooks', icon: '🪝' },
      ]
    },
    {
      title: 'Guides',
      items: [
        { id: 'integrations', name: 'Integrations', icon: '🔗' },
        { id: 'best-practices', name: 'Best Practices', icon: '⭐' },
        { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔍' },
      ]
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Documentation - Aranya One</title>
        <meta name="description" content="Complete documentation and guides for your digital empire" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-heading font-bold text-5xl text-gray-900 mb-4">
            📚 Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete guides, API references, and tutorials to help you build your digital empire
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent shadow-soft"
            />
            <div className="absolute right-4 top-4 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 sticky top-6">
              <h2 className="font-heading font-semibold text-lg text-gray-900 mb-4">Navigation</h2>
              <nav className="space-y-6">
                {navigation.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-medium text-gray-900 mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                              activeSection === item.id
                                ? 'bg-royal-purple-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100">
              {activeSection === 'getting-started' && <GettingStartedContent />}
              {activeSection === 'installation' && <InstallationContent />}
              {activeSection === 'configuration' && <ConfigurationContent />}
              {activeSection === 'authentication' && <AuthenticationContent />}
              {activeSection === 'endpoints' && <EndpointsContent />}
              {activeSection === 'webhooks' && <WebhooksContent />}
              {activeSection === 'integrations' && <IntegrationsContent />}
              {activeSection === 'best-practices' && <BestPracticesContent />}
              {activeSection === 'troubleshooting' && <TroubleshootingContent />}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickLinkCard
            icon="🎯"
            title="Dashboard Guide"
            description="Learn how to use your dashboard effectively"
            link="/dashboard"
          />
          <QuickLinkCard
            icon="⚙️"
            title="Service Setup"
            description="Set up and configure your services"
            link="/services"
          />
          <QuickLinkCard
            icon="💬"
            title="Get Support"
            description="Contact our team for help"
            link="/support"
          />
        </div>
      </div>
    </div>
  )
}

function GettingStartedContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">🚀 Quick Start Guide</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Welcome to Aranya One! This guide will help you get started with your digital empire in just a few minutes.
        </p>

        <div className="bg-royal-purple-50 border border-royal-purple-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-royal-purple-900 mb-3">What You'll Learn</h3>
          <ul className="space-y-2 text-royal-purple-800">
            <li>• How to set up your first service</li>
            <li>• Navigate the dashboard effectively</li>
            <li>• Configure basic settings</li>
            <li>• Monitor your empire's performance</li>
          </ul>
        </div>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Step 1: Access Your Dashboard</h2>
        <p className="text-gray-600 mb-4">
          After logging in, you'll see your main dashboard with an overview of all your services and metrics.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <code className="text-sm text-gray-800">
            Navigate to: Dashboard → Overview
          </code>
        </div>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Step 2: Add Your First Service</h2>
        <p className="text-gray-600 mb-4">
          Choose from our library of services to start building your digital empire.
        </p>

        <ol className="space-y-3 text-gray-600 mb-6">
          <li>1. Go to the Services page</li>
          <li>2. Browse available services</li>
          <li>3. Click "Try Free" on any service</li>
          <li>4. Follow the setup wizard</li>
        </ol>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Step 3: Configure Settings</h2>
        <p className="text-gray-600 mb-4">
          Customize your empire settings to match your preferences and requirements.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
          <p className="text-blue-800">
            Start with our recommended services for the best experience. You can always add more later!
          </p>
        </div>
      </div>
    </div>
  )
}

function InstallationContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">⚙️ Installation</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Learn how to install and set up Aranya One for your specific needs.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">System Requirements</h2>
        <ul className="space-y-2 text-gray-600 mb-6">
          <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
          <li>• Stable internet connection</li>
          <li>• JavaScript enabled</li>
        </ul>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Installation Methods</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Web Application</h3>
            <p className="text-gray-600 mb-3">
              Access Aranya One directly through your web browser. No installation required.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <code className="text-sm text-gray-800">
                https://aranyaone.vercel.app
              </code>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">API Integration</h3>
            <p className="text-gray-600 mb-3">
              Integrate Aranya One into your existing applications using our REST API.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <code className="text-sm text-gray-800">
                curl -X GET https://api.aranyaone.com/v1/status
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfigurationContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">🔧 Configuration</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Configure Aranya One to work perfectly with your workflow and requirements.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Basic Configuration</h2>
        <p className="text-gray-600 mb-4">
          Start with these essential configuration options:
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-royal-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
            <div>
              <h4 className="font-medium text-gray-900">Empire Settings</h4>
              <p className="text-gray-600 text-sm">Configure your empire name, description, and basic preferences.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-royal-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
            <div>
              <h4 className="font-medium text-gray-900">Notification Preferences</h4>
              <p className="text-gray-600 text-sm">Set up how and when you want to receive notifications.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-royal-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
            <div>
              <h4 className="font-medium text-gray-900">Security Settings</h4>
              <p className="text-gray-600 text-sm">Enable two-factor authentication and manage API keys.</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Important</h4>
          <p className="text-yellow-800">
            Make sure to save your configuration changes before navigating away from the settings page.
          </p>
        </div>
      </div>
    </div>
  )
}

function AuthenticationContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">🔐 Authentication</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Learn how to authenticate with the Aranya One API and manage your credentials securely.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">API Keys</h2>
        <p className="text-gray-600 mb-4">
          API keys are used to authenticate your requests to the Aranya One API.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <pre className="text-sm text-gray-800 overflow-x-auto">
{`curl -X GET \\
  https://api.aranyaone.com/v1/services \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">OAuth Integration</h2>
        <p className="text-gray-600 mb-4">
          For third-party integrations, use OAuth 2.0 authentication flow.
        </p>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Authorization URL</h4>
            <code className="text-sm text-gray-600">https://auth.aranyaone.com/oauth/authorize</code>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Token URL</h4>
            <code className="text-sm text-gray-600">https://auth.aranyaone.com/oauth/token</code>
          </div>
        </div>
      </div>
    </div>
  )
}

function EndpointsContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">📡 API Endpoints</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Complete reference for all available API endpoints in the Aranya One platform.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Base URL</h2>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <code className="text-sm text-gray-800">https://api.aranyaone.com/v1</code>
        </div>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Services</h2>
        <div className="space-y-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">GET</span>
              <code className="text-sm">/services</code>
            </div>
            <p className="text-gray-600 text-sm">Get all services for your empire</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">POST</span>
              <code className="text-sm">/services</code>
            </div>
            <p className="text-gray-600 text-sm">Create a new service</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">PUT</span>
              <code className="text-sm">/services/{'{id}'}</code>
            </div>
            <p className="text-gray-600 text-sm">Update an existing service</p>
          </div>
        </div>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Analytics</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">GET</span>
              <code className="text-sm">/analytics/overview</code>
            </div>
            <p className="text-gray-600 text-sm">Get analytics overview for your empire</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function WebhooksContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">🪝 Webhooks</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Set up webhooks to receive real-time notifications about events in your digital empire.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Setting Up Webhooks</h2>
        <ol className="space-y-3 text-gray-600 mb-6">
          <li>1. Go to Settings → Integrations</li>
          <li>2. Click "Add Webhook"</li>
          <li>3. Enter your endpoint URL</li>
          <li>4. Select events to subscribe to</li>
          <li>5. Save the webhook configuration</li>
        </ol>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Webhook Events</h2>
        <div className="space-y-3 mb-6">
          <div className="border border-gray-200 rounded-lg p-3">
            <code className="text-sm font-medium text-gray-900">service.created</code>
            <p className="text-gray-600 text-sm mt-1">Triggered when a new service is created</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <code className="text-sm font-medium text-gray-900">service.updated</code>
            <p className="text-gray-600 text-sm mt-1">Triggered when a service is modified</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <code className="text-sm font-medium text-gray-900">analytics.report</code>
            <p className="text-gray-600 text-sm mt-1">Triggered when new analytics data is available</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-2">📝 Example Payload</h4>
          <pre className="text-sm text-blue-800 overflow-x-auto">
{`{
  "event": "service.created",
  "data": {
    "id": "srv_123",
    "name": "AI Chat Service",
    "status": "active"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

function IntegrationsContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">🔗 Integrations</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Connect Aranya One with your favorite tools and services to create a seamless workflow.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Popular Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">📊</span>
              <h4 className="font-medium text-gray-900">Google Analytics</h4>
            </div>
            <p className="text-gray-600 text-sm">Track website performance and user behavior</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">💬</span>
              <h4 className="font-medium text-gray-900">Slack</h4>
            </div>
            <p className="text-gray-600 text-sm">Receive notifications in your Slack workspace</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">⚡</span>
              <h4 className="font-medium text-gray-900">Zapier</h4>
            </div>
            <p className="text-gray-600 text-sm">Automate workflows with 3000+ apps</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">🐙</span>
              <h4 className="font-medium text-gray-900">GitHub</h4>
            </div>
            <p className="text-gray-600 text-sm">Connect your code repositories and deployments</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h4 className="font-semibold text-green-900 mb-2">🎯 Integration Guide</h4>
          <p className="text-green-800">
            Visit the Settings → Integrations page to set up and manage all your integrations in one place.
          </p>
        </div>
      </div>
    </div>
  )
}

function BestPracticesContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">⭐ Best Practices</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Follow these best practices to get the most out of your Aranya One digital empire.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Service Management</h2>
        <ul className="space-y-3 text-gray-600 mb-6">
          <li>• Start with essential services and add more as needed</li>
          <li>• Regularly monitor service performance and usage</li>
          <li>• Keep service configurations up to date</li>
          <li>• Use service tags for better organization</li>
        </ul>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Security</h2>
        <ul className="space-y-3 text-gray-600 mb-6">
          <li>• Enable two-factor authentication</li>
          <li>• Regularly rotate API keys</li>
          <li>• Use strong, unique passwords</li>
          <li>• Monitor login activity and sessions</li>
        </ul>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Performance</h2>
        <ul className="space-y-3 text-gray-600 mb-6">
          <li>• Monitor dashboard metrics regularly</li>
          <li>• Set up alerts for critical events</li>
          <li>• Optimize service configurations for your use case</li>
          <li>• Use analytics to identify improvement opportunities</li>
        </ul>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h4 className="font-semibold text-purple-900 mb-2">💡 Pro Tips</h4>
          <ul className="space-y-2 text-purple-800">
            <li>• Use webhooks for real-time event processing</li>
            <li>• Leverage integrations to automate repetitive tasks</li>
            <li>• Regularly backup your configuration settings</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function TroubleshootingContent() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-6">🔍 Troubleshooting</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Common issues and their solutions to help you resolve problems quickly.
        </p>

        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Common Issues</h2>
        
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Service Not Starting</h3>
            <p className="text-gray-600 mb-3">
              If your service is not starting properly, try these steps:
            </p>
            <ol className="space-y-2 text-gray-600">
              <li>1. Check the service status on the Status page</li>
              <li>2. Verify your service configuration</li>
              <li>3. Review the service logs</li>
              <li>4. Restart the service if necessary</li>
            </ol>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">API Authentication Errors</h3>
            <p className="text-gray-600 mb-3">
              Authentication issues are usually caused by:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Invalid or expired API keys</li>
              <li>• Incorrect request headers</li>
              <li>• Missing authorization credentials</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Performance Issues</h3>
            <p className="text-gray-600 mb-3">
              To resolve performance problems:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Check your service usage limits</li>
              <li>• Monitor resource consumption</li>
              <li>• Optimize service configurations</li>
              <li>• Consider upgrading your plan</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h4 className="font-semibold text-red-900 mb-2">🆘 Need More Help?</h4>
          <p className="text-red-800">
            If you can't find a solution here, don't hesitate to contact our support team through the Support Center.
          </p>
        </div>
      </div>
    </div>
  )
}

function QuickLinkCard({ icon, title, description, link }) {
  return (
    <a 
      href={link}
      className="block bg-white rounded-2xl shadow-soft p-6 border border-gray-100 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </a>
  )
}
