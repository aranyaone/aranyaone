import Head from 'next/head'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')

  return (
    <div>
      <Head>
        <title>Settings - Aranya One</title>
        <meta name="description" content="Configure your empire settings" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">⚙️ Settings</h1>
            <p className="text-gray-600">Configure your digital empire preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <SettingsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'account' && <AccountSettings />}
              {activeTab === 'empire' && <EmpireSettings />}
              {activeTab === 'api' && <APIKeyManagement />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'billing' && <BillingSettings />}
              {activeTab === 'enterprise' && <EnterpriseSettings />}
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsNavigation({ activeTab, setActiveTab }) {
  const sections = [
    { id: 'account', icon: "👤", label: "Account" },
    { id: 'empire', icon: "👑", label: "Empire" },
    { id: 'api', icon: "🔑", label: "API Keys" },
    { id: 'notifications', icon: "🔔", label: "Notifications" },
    { id: 'security', icon: "🔐", label: "Security" },
    { id: 'billing', icon: "💳", label: "Billing" },
    { id: 'enterprise', icon: "🏢", label: "Enterprise" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 sticky top-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Settings Menu</h2>
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
              activeTab === section.id 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{section.icon}</span>
            <span className="font-medium">{section.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function AccountSettings() {
  return (
    <SettingsCard icon="👤" title="Account Settings" description="Manage your personal account information">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Full Name" value="Srinivas Makam" />
          <InputField label="Email" value="srinivas@aranyaone.com" />
          <InputField label="Phone" value="+91 98765 43210" />
          <InputField label="Location" value="India" />
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800 mb-4">Profile Picture</h4>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
              SM
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mr-2">
                Upload New
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

function EmpireSettings() {
  return (
    <SettingsCard icon="👑" title="Empire Settings" description="Configure your digital empire preferences">
      <div className="space-y-6">
        <InputField label="Empire Name" value="AranyaOne Digital Empire" />
        <InputField label="Empire Tagline" value="Building the Future, One Service at a Time" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Empire Theme</label>
          <div className="flex gap-4">
            <ThemeOption color="blue" name="Ocean Blue" active />
            <ThemeOption color="purple" name="Royal Purple" />
            <ThemeOption color="green" name="Forest Green" />
            <ThemeOption color="orange" name="Sunset Orange" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Asia/Kolkata (IST)</option>
            <option>America/New_York (EST)</option>
            <option>Europe/London (GMT)</option>
            <option>Asia/Tokyo (JST)</option>
          </select>
        </div>
      </div>
    </SettingsCard>
  );
}

function NotificationSettings() {
  const notifications = [
    { label: "Service Status Updates", desc: "Get notified when services start, stop, or encounter issues", enabled: true },
    { label: "Usage Alerts", desc: "Receive alerts when usage exceeds thresholds", enabled: true },
    { label: "Billing Notifications", desc: "Get notified about billing, renewals, and payments", enabled: true },
    { label: "Marketing Updates", desc: "Receive updates about new features and services", enabled: false },
    { label: "Security Alerts", desc: "Get notified about security events and login attempts", enabled: true },
  ];

  return (
    <SettingsCard icon="🔔" title="Notification Settings" description="Manage how you receive notifications">
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{notification.label}</h4>
              <p className="text-sm text-gray-600 mt-1">{notification.desc}</p>
            </div>
            <ToggleSwitch enabled={notification.enabled} />
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}

function SecuritySettings() {
  return (
    <SettingsCard icon="🔐" title="Security Settings" description="Manage your account security and privacy">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-left hover:bg-blue-100 transition-colors">
            <div className="text-2xl mb-2">🔑</div>
            <h4 className="font-semibold text-gray-800">Change Password</h4>
            <p className="text-sm text-gray-600">Update your account password</p>
          </button>
          
          <button className="p-4 bg-green-50 border-2 border-green-200 rounded-lg text-left hover:bg-green-100 transition-colors">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-semibold text-gray-800">Two-Factor Auth</h4>
            <p className="text-sm text-gray-600">Enable 2FA for extra security</p>
          </button>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800 mb-4">Active Sessions</h4>
          <div className="space-y-3">
            <SessionItem device="Chrome on Windows" location="Mumbai, India" time="Current session" current />
            <SessionItem device="Mobile App" location="Delhi, India" time="2 hours ago" />
            <SessionItem device="Safari on MacBook" location="Bangalore, India" time="1 day ago" />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

function BillingSettings() {
  return (
    <SettingsCard icon="💳" title="Billing Settings" description="Manage your subscription and payment methods">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">👑 Empire Pro Plan</h3>
              <p className="text-gray-600">All services included</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">₹299/month</div>
              <div className="text-sm text-gray-500">Next billing: Jan 15, 2025</div>
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Manage Subscription
          </button>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Payment Methods</h4>
          <div className="space-y-3">
            <PaymentMethod type="card" last4="4242" brand="Visa" expiry="12/25" primary />
            <PaymentMethod type="upi" id="srinivas@paytm" primary={false} />
          </div>
          <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            + Add Payment Method
          </button>
        </div>
      </div>
    </SettingsCard>
  );
}

// Helper Components
function SettingsCard({ icon, title, description, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{icon}</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      {children}
      <div className="mt-6 pt-6 border-t">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mr-3">
          Save Changes
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

function InputField({ label, value, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

function ThemeOption({ color, name, active }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500'
  };
  
  return (
    <button 
      className={`w-16 h-16 rounded-lg border-2 ${active ? 'border-gray-800' : 'border-gray-300'} ${colorClasses[color] || 'bg-blue-500'} hover:scale-105 transition-transform`} 
      title={name}
    >
    </button>
  );
}

function ToggleSwitch({ enabled }) {
  return (
    <button className={`w-12 h-6 rounded-full ${enabled ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}>
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
    </button>
  );
}

function SessionItem({ device, location, time, current }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="font-medium text-gray-800">{device}</div>
        <div className="text-sm text-gray-600">{location} • {time}</div>
      </div>
      {current ? (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Current</span>
      ) : (
        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium hover:bg-red-200">
          Revoke
        </button>
      )}
    </div>
  );
}

function PaymentMethod({ type, last4, brand, expiry, id, primary }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{type === 'card' ? '💳' : '📱'}</div>
        <div>
          <div className="font-medium text-gray-800">
            {type === 'card' ? `${brand} ending in ${last4}` : id}
          </div>
          {expiry && <div className="text-sm text-gray-600">Expires {expiry}</div>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {primary && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">Primary</span>}
        <button className="text-gray-500 hover:text-gray-700">⋮</button>
      </div>
    </div>
  );
}

function APIKeyManagement() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production API',
      key: 'ak_live_abc123...def456',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      permissions: ['read', 'write'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Development API',
      key: 'ak_test_xyz789...uvw012',
      created: '2024-01-10',
      lastUsed: '1 day ago',
      permissions: ['read'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Analytics Only',
      key: 'ak_live_mno345...pqr678',
      created: '2024-01-05',
      lastUsed: '5 days ago',
      permissions: ['read'],
      status: 'inactive'
    }
  ])

  const handleCreateKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: 'New API Key',
      key: `ak_live_${Math.random().toString(36).substring(2)}...${Math.random().toString(36).substring(2)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: ['read'],
      status: 'active'
    }
    setApiKeys([...apiKeys, newKey])
  }

  const handleRevokeKey = (id) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, status: 'revoked' } : key
    ))
  }

  return (
    <SettingsCard icon="🔑" title="API Key Management" description="Manage your API keys for service integration">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">API Keys</h4>
          <button 
            onClick={handleCreateKey}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            🔑 Create New Key
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-medium text-gray-800">{key.name}</h5>
                  <div className="text-sm text-gray-600 mt-1">
                    Created: {key.created} • Last used: {key.lastUsed}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  key.status === 'active' ? 'bg-green-100 text-green-800' :
                  key.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {key.status}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={key.key}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono"
                />
                <button className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm">
                  📋 Copy
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Permissions:</span>
                  {key.permissions.map((perm, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {perm}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleRevokeKey(key.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h5 className="font-semibold text-yellow-800">Important Security Notes</h5>
              <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                <li>• Never share your API keys publicly or in client-side code</li>
                <li>• Rotate keys regularly for better security</li>
                <li>• Use read-only keys when possible</li>
                <li>• Monitor API usage for suspicious activity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  )
}

function EnterpriseSettings() {
  const [enterprisePlan, setEnterprisePlan] = useState('professional')

  const plans = [
    {
      id: 'professional',
      name: 'Professional',
      price: '₹2,999/month',
      features: ['Up to 10 services', '100K API calls/month', 'Standard support', 'Basic analytics'],
      current: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '₹9,999/month',
      features: ['Unlimited services', 'Unlimited API calls', 'Priority support', 'Advanced analytics', 'Custom integrations', 'Dedicated manager'],
      recommended: true
    },
    {
      id: 'enterprise-plus',
      name: 'Enterprise Plus',
      price: 'Custom pricing',
      features: ['Everything in Enterprise', 'White-label solutions', 'Custom development', 'SLA guarantees', 'On-premise deployment']
    }
  ]

  return (
    <SettingsCard icon="🏢" title="Enterprise Settings" description="Upgrade to enterprise tier for advanced features">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className={`p-6 rounded-xl border-2 ${
              plan.current ? 'border-green-500 bg-green-50' :
              plan.recommended ? 'border-blue-500 bg-blue-50' :
              'border-gray-200 bg-white'
            }`}>
              <div className="text-center mb-4">
                {plan.recommended && (
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-2">
                    Recommended
                  </span>
                )}
                {plan.current && (
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm rounded-full mb-2">
                    Current Plan
                  </span>
                )}
                <h4 className="text-xl font-bold text-gray-800">{plan.name}</h4>
                <div className="text-2xl font-bold text-gray-900 mt-2">{plan.price}</div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                plan.current 
                  ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}>
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
          <h4 className="text-lg font-bold text-gray-800 mb-2">🚀 Enterprise Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Advanced Analytics</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time performance monitoring</li>
                <li>• Custom dashboard creation</li>
                <li>• Predictive analytics with AI</li>
                <li>• Export capabilities</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Enterprise Support</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 24/7 priority support</li>
                <li>• Dedicated account manager</li>
                <li>• Custom integration assistance</li>
                <li>• Training and onboarding</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 flex gap-3">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              📞 Contact Sales
            </button>
            <button className="px-6 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 font-medium">
              📊 View Demo
            </button>
          </div>
        </div>
      </div>
    </SettingsCard>
  )
}
