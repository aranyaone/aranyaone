import Head from 'next/head'
import { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Head>
        <title>Dashboard - Aranya One</title>
        <meta name="description" content="Dashboard control room - Monitor your digital empire" />
      </Head>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-800">← Home</a>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">📊 Aranya Dashboard</h1>
                <p className="text-gray-600">Welcome to your empire's control room</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <div>{currentTime.toLocaleDateString()}</div>
                <div className="font-mono">{currentTime.toLocaleTimeString()}</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 bg-white rounded-lg p-2 shadow-sm border">
            {[
              { id: 'overview', label: '📈 Overview', icon: '📈' },
              { id: 'analytics', label: '📊 Analytics', icon: '📊' },
              { id: 'tasks', label: '✅ Tasks', icon: '✅' },
              { id: 'users', label: '👥 Users', icon: '👥' }
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

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'tasks' && <TasksTab />}
        {activeTab === 'users' && <UsersTab />}
      </div>
    </div>
  )
}

function OverviewTab() {
  const stats = [
    { title: 'Total Revenue', value: '₹45,231', change: '+12.5%', color: 'green', icon: '💰' },
    { title: 'Active Users', value: '1,234', change: '+8.2%', color: 'blue', icon: '👥' },
    { title: 'Services Running', value: '15', change: '+2', color: 'purple', icon: '⚙️' },
    { title: 'Tasks Completed', value: '87', change: '+15%', color: 'orange', icon: '✅' }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 4000, users: 240 },
    { month: 'Feb', revenue: 3000, users: 198 },
    { month: 'Mar', revenue: 5000, users: 300 },
    { month: 'Apr', revenue: 4500, users: 278 },
    { month: 'May', revenue: 6000, users: 400 },
    { month: 'Jun', revenue: 5500, users: 380 }
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">👥 User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Users']} />
              <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  )
}

function AnalyticsTab() {
  const sessionData = [
    { hour: '00:00', sessions: 12, pageViews: 45 },
    { hour: '06:00', sessions: 25, pageViews: 89 },
    { hour: '12:00', sessions: 67, pageViews: 234 },
    { hour: '18:00', sessions: 89, pageViews: 312 },
    { hour: '23:59', sessions: 34, pageViews: 123 }
  ]

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Tablet', value: 20, color: '#F59E0B' }
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Session Analytics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Session Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessions" fill="#8884d8" />
              <Bar dataKey="pageViews" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device Usage */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📱 Device Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics />
    </div>
  )
}

function TasksTab() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Update website content', status: 'completed', priority: 'high', assignee: 'John' },
    { id: 2, title: 'Fix mobile responsiveness', status: 'in-progress', priority: 'medium', assignee: 'Sarah' },
    { id: 3, title: 'SEO optimization', status: 'pending', priority: 'high', assignee: 'Mike' },
    { id: 4, title: 'Database backup', status: 'completed', priority: 'low', assignee: 'System' },
    { id: 5, title: 'Security audit', status: 'pending', priority: 'high', assignee: 'Alex' }
  ])

  const statusCounts = {
    completed: tasks.filter(t => t.status === 'completed').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  }

  return (
    <div className="space-y-8">
      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
          <h3 className="text-lg font-bold text-gray-800 mb-2">✅ Completed</h3>
          <div className="text-3xl font-bold text-green-600">{statusCounts.completed}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-800 mb-2">🔄 In Progress</h3>
          <div className="text-3xl font-bold text-blue-600">{statusCounts['in-progress']}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-200">
          <h3 className="text-lg font-bold text-gray-800 mb-2">📋 Pending</h3>
          <div className="text-3xl font-bold text-orange-600">{statusCounts.pending}</div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">📝 Task Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function UsersTab() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', lastLogin: '2 hours ago', avatar: '👨' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'active', lastLogin: '1 day ago', avatar: '👩' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', lastLogin: '1 week ago', avatar: '👨‍💼' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'active', lastLogin: '3 hours ago', avatar: '👩‍💻' }
  ]

  const userStats = [
    { title: 'Total Users', value: '1,234', icon: '👥' },
    { title: 'Active Today', value: '456', icon: '🟢' },
    { title: 'New This Week', value: '78', icon: '📈' },
    { title: 'Premium Users', value: '234', icon: '💎' }
  ]

  return (
    <div className="space-y-8">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{stat.title}</h3>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">👥 User Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, color, icon }) {
  const colorClasses = {
    green: 'border-green-200 text-green-600',
    blue: 'border-blue-200 text-blue-600',
    purple: 'border-purple-200 text-purple-600',
    orange: 'border-orange-200 text-orange-600'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
      <div className={`text-sm font-medium ${colorClasses[color]}`}>
        {change}
      </div>
    </div>
  )
}

function QuickActions() {
  const actions = [
    { title: 'Add New Service', icon: '➕', color: 'blue' },
    { title: 'View Analytics', icon: '📊', color: 'green' },
    { title: 'Manage Users', icon: '👥', color: 'purple' },
    { title: 'Settings', icon: '⚙️', color: 'orange' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">⚡ Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
            <div className="text-sm font-medium text-gray-800">{action.title}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function PerformanceMetrics() {
  const metrics = [
    { title: 'Page Load Time', value: '1.2s', status: 'good', icon: '⚡' },
    { title: 'Uptime', value: '99.9%', status: 'excellent', icon: '🟢' },
    { title: 'Error Rate', value: '0.1%', status: 'good', icon: '🛡️' },
    { title: 'Response Time', value: '150ms', status: 'excellent', icon: '🚀' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">⚡ Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl mb-2">{metric.icon}</div>
            <h4 className="text-lg font-semibold text-gray-800">{metric.title}</h4>
            <div className="text-2xl font-bold text-blue-600 mb-1">{metric.value}</div>
            <div className={`text-sm px-2 py-1 rounded-full ${
              metric.status === 'excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {metric.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TaskItem({ task }) {
  const statusColors = {
    completed: 'bg-green-100 text-green-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    pending: 'bg-orange-100 text-orange-700'
  }

  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-gray-600'
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{task.title}</h4>
          <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
        </div>
      </div>
      <div className={`text-sm font-medium ${priorityColors[task.priority]}`}>
        {task.priority} priority
      </div>
    </div>
  )
}

function UserItem({ user }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-lg">{user.avatar}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{user.name}</h4>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="text-right">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {user.status}
        </div>
        <p className="text-xs text-gray-500 mt-1">{user.lastLogin}</p>
      </div>
    </div>
  )
}
