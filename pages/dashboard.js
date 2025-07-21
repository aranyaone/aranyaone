import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } else {
        // For demo purposes, create a default user
        const defaultUser = {
          name: 'Aranya One',
          email: 'admin@aranyaone.com',
          role: 'Admin',
          avatar: 'AO'
        }
        localStorage.setItem('user', JSON.stringify(defaultUser))
        setUser(defaultUser)
        setIsAuthenticated(true)
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <AuthRequired onAuth={() => setIsAuthenticated(true)} />
  }

  return (
    <div>
      <Head>
        <title>Dashboard - Aranya One</title>
        <meta name="description" content="Aranya One Digital Empire Dashboard" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <DashboardHeader user={user} />
        
        {/* Dashboard Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            
            {/* Welcome Section */}
            <WelcomeSection user={user} />
            
            {/* Quick Stats */}
            <QuickStats />
            
            {/* Main Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column - Activity & Services */}
              <div className="lg:col-span-2 space-y-6">
                <RecentActivity />
                <ActiveServices />
              </div>
              
              {/* Right Column - Quick Actions & Notifications */}
              <div className="space-y-6">
                <QuickActions />
                <NotificationCenter />
                <SystemStatus />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Dashboard...</p>
      </div>
    </div>
  )
}

function AuthRequired({ onAuth }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Access Dashboard</h2>
        <button 
          onClick={onAuth}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          🔐 Authenticate
        </button>
      </div>
    </div>
  )
}

function DashboardHeader({ user }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">🏰 Aranya Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              🔔
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.avatar}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function WelcomeSection({ user }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
      <p className="text-blue-100 mb-6">Your digital empire is thriving. Here's what's happening today.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <div className="text-2xl font-bold">₹47,582</div>
          <div className="text-sm text-blue-100">Monthly Revenue</div>
          <div className="text-green-300 text-xs">+15.3% from last month</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-blue-100">Active Services</div>
          <div className="text-green-300 text-xs">3 new this week</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <div className="text-2xl font-bold">98.2%</div>
          <div className="text-sm text-blue-100">System Uptime</div>
          <div className="text-green-300 text-xs">All systems operational</div>
        </div>
      </div>
    </div>
  )
}

function QuickStats() {
  const stats = [
    { icon: '👥', label: 'Total Users', value: '2,847', change: '+12%', color: 'blue' },
    { icon: '💰', label: 'Revenue', value: '₹47,582', change: '+15%', color: 'green' },
    { icon: '📊', label: 'API Calls', value: '1.2M', change: '+8%', color: 'purple' },
    { icon: '⚡', label: 'Performance', value: '99.1%', change: '+2%', color: 'orange' }
  ]

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm text-${stat.color}-600`}>{stat.change}</p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function RecentActivity() {
  const activities = [
    { action: 'New user registration', time: '2 minutes ago', type: 'user' },
    { action: 'Payment received ₹2,500', time: '5 minutes ago', type: 'payment' },
    { action: 'API key generated', time: '10 minutes ago', type: 'api' },
    { action: 'Service deployed', time: '15 minutes ago', type: 'service' },
    { action: 'Backup completed', time: '1 hour ago', type: 'system' }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        View all activity →
      </button>
    </div>
  )
}

function ActiveServices() {
  const services = [
    { name: 'AI Chat Service', status: 'Active', usage: 75, color: 'green' },
    { name: 'Analytics Dashboard', status: 'Active', usage: 89, color: 'green' },
    { name: 'SEO Optimizer', status: 'Maintenance', usage: 0, color: 'yellow' },
    { name: 'Social Media Manager', status: 'Active', usage: 45, color: 'green' }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🛠️ Active Services</h3>
        <a href="/services" className="text-sm text-blue-600 hover:text-blue-800">View all</a>
      </div>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-${service.color}-500`}></div>
              <div>
                <p className="text-sm font-medium text-gray-900">{service.name}</p>
                <p className="text-xs text-gray-500">{service.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{service.usage}%</p>
              <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className={`h-full bg-${service.color}-500 rounded-full`}
                  style={{ width: `${service.usage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickActions() {
  const actions = [
    { icon: '➕', label: 'Add Service', href: '/services' },
    { icon: '📊', label: 'View Analytics', href: '/analytics' },
    { icon: '👤', label: 'Profile', href: '/profile' },
    { icon: '💰', label: 'Wallet', href: '/wallet' },
    { icon: '⚙️', label: 'Settings', href: '/settings' },
    { icon: '💬', label: 'Support', href: '/support' }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span className="text-xl">{action.icon}</span>
            <span className="text-sm font-medium">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function NotificationCenter() {
  const notifications = [
    { message: 'System backup completed', type: 'success', time: '1h ago' },
    { message: 'API rate limit warning', type: 'warning', time: '2h ago' },
    { message: 'New payment received', type: 'info', time: '3h ago' }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 Notifications</h3>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-900">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        View all notifications →
      </button>
    </div>
  )
}

function SystemStatus() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🟢 System Status</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">API Server</span>
          <span className="text-sm text-green-600">✅ Operational</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Database</span>
          <span className="text-sm text-green-600">✅ Operational</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">CDN</span>
          <span className="text-sm text-green-600">✅ Operational</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Monitoring</span>
          <span className="text-sm text-green-600">✅ Operational</span>
        </div>
      </div>
      <a href="/status" className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800 font-medium">
        View detailed status →
      </a>
    </div>
  )
}
