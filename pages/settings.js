import Head from 'next/head'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')

  const sections = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'empire', name: 'Empire', icon: '🏰' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔐' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Settings - Aranya One</title>
        <meta name="description" content="Configure your empire settings and preferences" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            ⚙️ Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Configure your digital empire preferences and manage your account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 sticky top-6">
              <h2 className="font-heading font-semibold text-lg text-gray-900 mb-4">Settings Menu</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-royal-purple-500 text-white shadow-soft'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100">
              {activeSection === 'general' && <GeneralSettings />}
              {activeSection === 'empire' && <EmpireSettings />}
              {activeSection === 'notifications' && <NotificationSettings />}
              {activeSection === 'security' && <SecuritySettings />}
              {activeSection === 'billing' && <BillingSettings />}
              {activeSection === 'integrations' && <IntegrationsSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GeneralSettings() {
  return (
    <div className="p-8">
      <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">General Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Dashboard Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500">
                <option>Dashboard Overview</option>
                <option>Analytics</option>
                <option>Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Language & Region</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500">
                <option>UTC-8 (Pacific)</option>
                <option>UTC-5 (Eastern)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+5:30 (IST)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <h4 className="font-medium text-gray-900">Auto-save Settings</h4>
            <p className="text-sm text-gray-600">Automatically save your changes</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-royal-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-purple-500"></div>
          </label>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="px-6 py-2 bg-royal-purple-500 text-white rounded-lg font-medium hover:bg-royal-purple-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
}

function EmpireSettings() {
  return (
    <div className="p-8">
      <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Empire Configuration</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Empire Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Empire Name</label>
              <input type="text" defaultValue="Aranya Digital Empire" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Empire Description</label>
              <textarea rows={3} defaultValue="Building and scaling digital solutions for the modern world." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500"></textarea>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Service Limits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Active Services</label>
              <input type="number" defaultValue="10" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auto-scaling</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500">
                <option>Enabled</option>
                <option>Disabled</option>
                <option>Conservative</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-green-200 rounded-xl bg-green-50">
            <h4 className="font-medium text-green-900 mb-2">Backup & Recovery</h4>
            <p className="text-sm text-green-700 mb-3">Automatic daily backups enabled</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
              Manage Backups
            </button>
          </div>
          
          <div className="p-4 border border-blue-200 rounded-xl bg-blue-50">
            <h4 className="font-medium text-blue-900 mb-2">Performance Monitoring</h4>
            <p className="text-sm text-blue-700 mb-3">Real-time performance tracking</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
              View Metrics
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="px-6 py-2 bg-royal-purple-500 text-white rounded-lg font-medium hover:bg-royal-purple-600 transition-colors">
          Update Empire Settings
        </button>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const notifications = [
    { id: 'system', label: 'System Alerts', description: 'Important system notifications and updates' },
    { id: 'billing', label: 'Billing Notifications', description: 'Payment reminders and billing updates' },
    { id: 'services', label: 'Service Updates', description: 'Service status changes and updates' },
    { id: 'marketing', label: 'Marketing Communications', description: 'Product updates and promotions' },
    { id: 'security', label: 'Security Alerts', description: 'Security-related notifications' },
  ]

  return (
    <div className="p-8">
      <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Notification Preferences</h2>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">{notification.label}</h4>
              <p className="text-sm text-gray-600">{notification.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-royal-purple-500 focus:ring-royal-purple-500" />
                <span className="text-sm text-gray-600">Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300 text-royal-purple-500 focus:ring-royal-purple-500" />
                <span className="text-sm text-gray-600">SMS</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="px-6 py-2 bg-royal-purple-500 text-white rounded-lg font-medium hover:bg-royal-purple-600 transition-colors">
          Save Notification Settings
        </button>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="p-8">
      <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        <div className="p-4 border border-green-200 rounded-xl bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-green-900">Two-Factor Authentication</h4>
              <p className="text-sm text-green-700">Currently enabled via authenticator app</p>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
              Manage 2FA
            </button>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-xl">
          <h4 className="font-medium text-gray-900 mb-3">Active Sessions</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">Current session</span>
                <span className="text-gray-600 ml-2">Chrome on MacOS</span>
              </div>
              <span className="text-green-600">Active now</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">Mobile session</span>
                <span className="text-gray-600 ml-2">Safari on iOS</span>
              </div>
              <button className="text-red-600 hover:text-red-800">Revoke</button>
            </div>
          </div>
        </div>

        <div className="p-4 border border-yellow-200 rounded-xl bg-yellow-50">
          <h4 className="font-medium text-yellow-900 mb-2">API Keys</h4>
          <p className="text-sm text-yellow-800 mb-3">Manage your API access keys</p>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors">
            Manage API Keys
          </button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="px-6 py-2 bg-royal-purple-500 text-white rounded-lg font-medium hover:bg-royal-purple-600 transition-colors">
          Update Security Settings
        </button>
      </div>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="p-8">
      <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Billing & Subscription</h2>
      
      <div className="space-y-6">
        <div className="p-6 border border-royal-purple-200 rounded-xl bg-royal-purple-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-xl text-royal-purple-900">Premium Plan</h3>
              <p className="text-royal-purple-700">$99/month • Auto-renewal enabled</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-royal-purple-900">$99</p>
              <p className="text-sm text-royal-purple-700">per month</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-royal-purple-500 text-white rounded-lg text-sm hover:bg-royal-purple-600 transition-colors">
              Change Plan
            </button>
            <button className="px-4 py-2 border border-royal-purple-300 text-royal-purple-700 rounded-lg text-sm hover:bg-royal-purple-100 transition-colors">
              View Invoice
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Payment Method</h3>
          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/26</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Billing History</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">February 2024</p>
                <p className="text-sm text-gray-600">Premium Plan</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.00</p>
                <a href="#" className="text-sm text-royal-purple-600 hover:text-royal-purple-800">Download</a>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">January 2024</p>
                <p className="text-sm text-gray-600">Premium Plan</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.00</p>
                <a href="#" className="text-sm text-royal-purple-600 hover:text-royal-purple-800">Download</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IntegrationsSettings() {
  const integrations = [
    { name: 'Google Analytics', icon: '📊', status: 'Connected', color: 'green' },
    { name: 'Slack', icon: '💬', status: 'Not Connected', color: 'gray' },
    { name: 'Zapier', icon: '⚡', status: 'Connected', color: 'green' },
    { name: 'GitHub', icon: '🐙', status: 'Connected', color: 'green' },
    { name: 'Stripe', icon: '💳', status: 'Not Connected', color: 'gray' },
    { name: 'Mailchimp', icon: '📧', status: 'Connected', color: 'green' },
  ]

  return (
    <div className="p-8">
      <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Integrations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-soft transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{integration.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{integration.name}</h4>
                  <p className={`text-sm ${integration.color === 'green' ? 'text-green-600' : 'text-gray-500'}`}>
                    {integration.status}
                  </p>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                integration.status === 'Connected'
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-royal-purple-500 text-white hover:bg-royal-purple-600'
              }`}>
                {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="px-6 py-2 bg-royal-purple-500 text-white rounded-lg font-medium hover:bg-royal-purple-600 transition-colors">
          Save Integration Settings
        </button>
      </div>
    </div>
  )
}