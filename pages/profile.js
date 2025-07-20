import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  })
  const router = useRouter()

  const handleLogout = () => {
    // Clear auth (if any)
    localStorage.removeItem('aranya_auth')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Head>
        <title>Profile - Aranya One</title>
        <meta name="description" content="Manage your empire profile and personal settings" />
      </Head>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">👤 Empire Profile</h1>
                <p className="text-gray-600">Manage your personal information and empire achievements</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 bg-white rounded-lg p-2 shadow-sm border">
            {[
              { id: 'profile', label: '👤 Profile', icon: '👤' },
              { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
              { id: 'security', label: '🔐 Security', icon: '🔐' },
              { id: 'preferences', label: '🎨 Preferences', icon: '🎨' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'settings' && <SettingsTab notifications={notifications} setNotifications={setNotifications} />}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'preferences' && <PreferencesTab />}
      </div>
    </div>
  );
}

function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Aranya One',
    email: 'hello@aranyaone.com',
    phone: '+1 (555) 123-4567',
    location: 'Digital Realm',
    timezone: 'UTC+5:30',
    language: 'English',
    company: 'Aranya One Digital Empire',
    website: 'aranyaone.com',
    bio: 'Building the future of digital empires with AI-powered tools and innovative solutions. Passionate about technology, automation, and helping businesses grow their online presence.'
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Profile Card */}
      <div className="lg:col-span-1 space-y-6">
        <ProfileCard isEditing={isEditing} setIsEditing={setIsEditing} />
        <AchievementsBadges />
        <QuickStats />
      </div>
      
      {/* Main Profile Content */}
      <div className="lg:col-span-2 space-y-8">
        <PersonalInformation 
          profileData={profileData} 
          setProfileData={setProfileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <EmpireStats />
        <ActivityTimeline />
      </div>
    </div>
  )
}

function SettingsTab({ notifications, setNotifications }) {
  return (
    <div className="space-y-8">
      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🔔 Notification Settings</h3>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800 capitalize">{key} Notifications</h4>
                <p className="text-sm text-gray-600">
                  {key === 'email' && 'Receive updates via email'}
                  {key === 'push' && 'Browser push notifications'}
                  {key === 'sms' && 'SMS alerts for important updates'}
                  {key === 'marketing' && 'Marketing and promotional content'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <AccountSettings />
      
      {/* Privacy Settings */}
      <PrivacySettings />
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-8">
      {/* Password Change */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🔐 Change Password</h3>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
          
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            🔄 Update Password
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <TwoFactorAuth />
      
      {/* Active Sessions */}
      <ActiveSessions />
    </div>
  )
}

function PreferencesTab() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC+5:30',
    dateFormat: 'MM/DD/YYYY',
    notifications: true
  })

  return (
    <div className="space-y-8">
      {/* Theme Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🎨 Appearance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['light', 'dark', 'auto'].map(theme => (
            <button
              key={theme}
              onClick={() => setPreferences(prev => ({ ...prev, theme }))}
              className={`p-4 rounded-lg border-2 transition-colors ${
                preferences.theme === theme
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">
                  {theme === 'light' && '☀️'}
                  {theme === 'dark' && '🌙'}
                  {theme === 'auto' && '🔄'}
                </div>
                <div className="font-medium capitalize">{theme} Mode</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Language & Region */}
      <LanguageRegionSettings preferences={preferences} setPreferences={setPreferences} />
    </div>
  )
}

function ProfileCard({ isEditing, setIsEditing }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
          <span className="text-3xl font-bold text-white">AO</span>
        </div>
        <button className="absolute bottom-0 right-1/2 transform translate-x-6 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600 transition-colors">
          📷
        </button>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Aranya One Empire</h2>
      <p className="text-gray-600 mb-4">Digital Empire Builder</p>
      
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">127</div>
          <div className="text-xs text-gray-500">Days Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">15</div>
          <div className="text-xs text-gray-500">Services</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">8.4K</div>
          <div className="text-xs text-gray-500">Revenue</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {isEditing ? '💾 Save Profile' : '📝 Edit Profile'}
        </button>
        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
          📤 Share Profile
        </button>
      </div>
    </div>
  );
}

function AchievementsBadges() {
  const achievements = [
    { icon: "🏆", title: "Empire Founder", description: "Created your first empire" },
    { icon: "💎", title: "Pro User", description: "Upgraded to Pro plan" },
    { icon: "🚀", title: "Launch Master", description: "Launched 5+ services" },
    { icon: "💰", title: "Revenue Generator", description: "Earned first $1000" },
    { icon: "🔥", title: "Streak Master", description: "30 day activity streak" },
    { icon: "⭐", title: "Top Performer", description: "Top 10% this month" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-yellow-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🏅 Achievements</h3>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, index) => (
          <button key={index} className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group w-full">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{achievement.icon}</div>
            <div className="text-xs font-semibold text-gray-800">{achievement.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuickStats() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Quick Stats</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Profile Views</span>
          <span className="font-bold text-blue-600">2,341</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Connections</span>
          <span className="font-bold text-green-600">156</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Rating</span>
          <span className="font-bold text-yellow-600">4.9/5</span>
        </div>
      </div>
    </div>
  )
}

function PersonalInformation({ profileData, setProfileData, isEditing, setIsEditing }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📋 Personal Information</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          {isEditing ? '❌ Cancel' : '✏️ Edit'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField label="Full Name" value={profileData.name} isEditing={isEditing} />
        <InfoField label="Email" value={profileData.email} isEditing={isEditing} />
        <InfoField label="Phone" value={profileData.phone} isEditing={isEditing} />
        <InfoField label="Location" value={profileData.location} isEditing={isEditing} />
        <InfoField label="Time Zone" value={profileData.timezone} isEditing={isEditing} />
        <InfoField label="Language" value={profileData.language} isEditing={isEditing} />
        <InfoField label="Company" value={profileData.company} isEditing={isEditing} />
        <InfoField label="Website" value={profileData.website} isEditing={isEditing} />
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        {isEditing ? (
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
          />
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-800">{profileData.bio}</p>
          </div>
        )}
      </div>
      
      {isEditing && (
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            💾 Save Changes
          </button>
          <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
            🔐 Change Password
          </button>
        </div>
      )}
    </div>
  );
}

function EmpireStats() {
  const stats = [
    { icon: "👥", title: "Total Users", value: "1,234", change: "+12%" },
    { icon: "💰", title: "Revenue", value: "$8,432", change: "+23%" },
    { icon: "📈", title: "Growth Rate", value: "15.3%", change: "+5%" },
    { icon: "⭐", title: "Rating", value: "4.9/5", change: "+0.2" },
    { icon: "🌐", title: "Website Visits", value: "45.2K", change: "+18%" },
    { icon: "🔗", title: "API Calls", value: "892K", change: "+31%" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Empire Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-lg text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-sm text-green-600 font-medium">{stat.change}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <a href="/analytics" className="text-blue-600 hover:text-blue-800 font-medium">
          📈 View Detailed Analytics →
        </a>
      </div>
    </div>
  );
}

function ActivityTimeline() {
  const activities = [
    {
      time: "2 hours ago",
      action: "Launched new AI Chat service",
      icon: "🤖",
      color: "blue"
    },
    {
      time: "1 day ago",
      action: "Updated SEO settings for 3 websites",
      icon: "🔍",
      color: "green"
    },
    {
      time: "3 days ago",
      action: "Reached 1000+ monthly users milestone",
      icon: "🎯",
      color: "purple"
    },
    {
      time: "1 week ago",
      action: "Integrated social media automation",
      icon: "📱",
      color: "orange"
    },
    {
      time: "2 weeks ago",
      action: "Upgraded to Pro plan",
      icon: "💎",
      color: "yellow"
    },
    {
      time: "1 month ago",
      action: "Created Aranya One empire",
      icon: "🏗️",
      color: "gray"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⏰ Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
          📋 View Full History
        </button>
      </div>
    </div>
  );
}

function InfoField({ label, value, isEditing = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {isEditing ? (
        <input
          type="text"
          defaultValue={value}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <div className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium">
          {value}
        </div>
      )}
    </div>
  );
}

function ActivityItem({ time, action, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    yellow: "bg-yellow-100 text-yellow-600",
    gray: "bg-gray-100 text-gray-600"
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{action}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}

function AccountSettings() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">⚙️ Account Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-semibold text-gray-800">Account Visibility</h4>
            <p className="text-sm text-gray-600">Make your profile visible to others</p>
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>Public</option>
            <option>Private</option>
            <option>Friends Only</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-semibold text-gray-800">Data Export</h4>
            <p className="text-sm text-gray-600">Download your account data</p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            📥 Export
          </button>
        </div>
      </div>
    </div>
  )
}

function PrivacySettings() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">🔒 Privacy Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Data Collection</h4>
          <p className="text-sm text-gray-600 mb-3">Control how we collect and use your data</p>
          <div className="space-y-2">
            {['Analytics tracking', 'Performance monitoring', 'Feature usage'].map(item => (
              <label key={item} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TwoFactorAuth() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">📱 Two-Factor Authentication</h3>
      
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-semibold text-gray-800">2FA Status</h4>
          <p className="text-sm text-gray-600">Add an extra layer of security</p>
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          🔐 Enable 2FA
        </button>
      </div>
    </div>
  )
}

function ActiveSessions() {
  const sessions = [
    { device: 'Chrome on Mac', location: 'New York, USA', lastActive: '2 minutes ago', current: true },
    { device: 'Safari on iPhone', location: 'New York, USA', lastActive: '1 hour ago', current: false },
    { device: 'Firefox on Windows', location: 'London, UK', lastActive: '2 days ago', current: false }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">💻 Active Sessions</h3>
      
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">{session.device}</h4>
              <p className="text-sm text-gray-600">{session.location} • {session.lastActive}</p>
              {session.current && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Current Session</span>}
            </div>
            {!session.current && (
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function LanguageRegionSettings({ preferences, setPreferences }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">🌐 Language & Region</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select 
            value={preferences.language}
            onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
          <select 
            value={preferences.timezone}
            onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="UTC+5:30">UTC+5:30 (India)</option>
            <option value="UTC-5">UTC-5 (Eastern)</option>
            <option value="UTC-8">UTC-8 (Pacific)</option>
            <option value="UTC+0">UTC+0 (London)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
          <select 
            value={preferences.dateFormat}
            onChange={(e) => setPreferences(prev => ({ ...prev, dateFormat: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  )
}
