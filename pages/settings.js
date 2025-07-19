import Head from 'next/head'

export default function SettingsPage() {
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
              <SettingsNavigation />
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Account Settings */}
              <AccountSettings />
              
              {/* Empire Settings */}
              <EmpireSettings />
              
              {/* Notification Settings */}
              <NotificationSettings />
              
              {/* Security Settings */}
              <SecuritySettings />
              
              {/* Billing Settings */}
              <BillingSettings />
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsNavigation() {
  const sections = [
    { icon: "👤", label: "Account", active: true },
    { icon: "👑", label: "Empire" },
    { icon: "🔔", label: "Notifications" },
    { icon: "🔐", label: "Security" },
    { icon: "💳", label: "Billing" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 sticky top-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Settings Menu</h2>
      <nav className="space-y-2">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
              section.active 
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
