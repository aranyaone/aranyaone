import Head from 'next/head'
import { useState } from 'react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔐' },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Profile - Aranya One</title>
        <meta name="description" content="Manage your empire profile and personal settings" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            👤 Empire Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your personal information and empire achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard />
            <AchievementsBadges />
            <QuickStats />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 mb-6">
              <div className="flex flex-wrap border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-royal-purple-600 border-b-2 border-royal-purple-600 bg-royal-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'profile' && <ProfileSettings />}
                {activeTab === 'billing' && <BillingSettings />}
                {activeTab === 'notifications' && <NotificationSettings />}
                {activeTab === 'security' && <SecuritySettings />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 text-center">
      <div className="relative inline-block mb-4">
        <div className="w-24 h-24 bg-royal-gradient rounded-full flex items-center justify-center text-3xl text-white font-bold">
          AO
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      <h2 className="font-heading font-bold text-xl text-gray-900 mb-1">Aranya Owner</h2>
      <p className="text-gray-600 text-sm mb-4">Empire Founder</p>
      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <span>📅</span>
          <span>Joined Jan 2024</span>
        </div>
      </div>
      <button className="w-full py-2 bg-royal-purple-500 text-white rounded-lg font-medium hover:bg-royal-purple-600 transition-colors">
        Edit Profile
      </button>
    </div>
  )
}

function AchievementsBadges() {
  const achievements = [
    { icon: '🏆', name: 'Empire Builder', desc: 'Created your digital empire' },
    { icon: '🚀', name: 'Growth Master', desc: '10+ active services' },
    { icon: '📈', name: 'Analytics Pro', desc: '90% dashboard usage' },
    { icon: '💎', name: 'Premium Member', desc: 'Upgraded to premium' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
      <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">🏅 Achievements</h3>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-xl hover:bg-royal-purple-50 transition-colors group">
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{achievement.icon}</div>
            <div className="text-xs font-medium text-gray-900 mb-1">{achievement.name}</div>
            <div className="text-xs text-gray-600">{achievement.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickStats() {
  const stats = [
    { label: 'Services Active', value: '8', color: 'green' },
    { label: 'Total Revenue', value: '$2,430', color: 'blue' },
    { label: 'Growth Rate', value: '+23%', color: 'purple' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
      <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">📊 Quick Stats</h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{stat.label}</span>
            <span className={`font-bold text-${stat.color}-600`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input type="text" defaultValue="Aranya" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input type="text" defaultValue="Owner" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" defaultValue="owner@aranyaone.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500" />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea rows={4} defaultValue="Building and scaling digital empires with innovative tools and strategies." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500"></textarea>
      </div>

      <button className="px-6 py-2 bg-royal-purple-500 text-white rounded-lg font-medium hover:bg-royal-purple-600 transition-colors">
        Save Changes
      </button>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">Billing Information</h3>
        <div className="bg-royal-purple-50 border border-royal-purple-200 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-royal-purple-900">Premium Plan</h4>
              <p className="text-royal-purple-700 text-sm">$99/month • Next billing: Feb 15, 2024</p>
            </div>
            <button className="px-4 py-2 bg-royal-purple-500 text-white rounded-lg text-sm hover:bg-royal-purple-600 transition-colors">
              Manage Plan
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Payment Methods</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/26</p>
              </div>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const notifications = [
    { id: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
    { id: 'sms', label: 'SMS Alerts', description: 'Get important alerts via SMS' },
    { id: 'push', label: 'Push Notifications', description: 'Browser push notifications' },
    { id: 'marketing', label: 'Marketing Updates', description: 'Product updates and promotions' },
  ]

  return (
    <div className="space-y-6">
      <h3 className="font-heading font-semibold text-xl text-gray-900">Notification Preferences</h3>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">{notification.label}</h4>
              <p className="text-sm text-gray-600">{notification.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-royal-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-purple-500"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h3 className="font-heading font-semibold text-xl text-gray-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-xl">
          <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
            Enable 2FA
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-xl">
          <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
          <p className="text-sm text-gray-600 mb-3">Update your account password</p>
          <button className="px-4 py-2 bg-royal-purple-500 text-white rounded-lg text-sm hover:bg-royal-purple-600 transition-colors">
            Change Password
          </button>
        </div>

        <div className="p-4 border border-red-200 rounded-xl bg-red-50">
          <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
          <p className="text-sm text-red-700 mb-3">Permanently delete your account and all data</p>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}