import Head from 'next/head'
import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const userData = [
  { name: 'Jan', users: 400, revenue: 2400, growth: 12 },
  { name: 'Feb', users: 300, revenue: 1398, growth: 8 },
  { name: 'Mar', users: 200, revenue: 9800, growth: 25 },
  { name: 'Apr', users: 278, revenue: 3908, growth: 18 },
  { name: 'May', users: 189, revenue: 4800, growth: 22 },
  { name: 'Jun', users: 239, revenue: 3800, growth: 15 },
]

const revenueData = [
  { name: 'Services', value: 45, color: '#9333ea' },
  { name: 'Subscriptions', value: 30, color: '#3b82f6' },
  { name: 'AI Tools', value: 15, color: '#10b981' },
  { name: 'Consulting', value: 10, color: '#f59e0b' },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview')
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Pro User', status: 'active', revenue: '$1,234' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Enterprise', status: 'active', revenue: '$5,678' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Free User', status: 'inactive', revenue: '$0' },
    { id: 4, name: 'Alice Wilson', email: 'alice@example.com', role: 'Pro User', status: 'active', revenue: '$2,345' },
  ])

  const [feedback] = useState([
    { id: 1, user: 'John Doe', message: 'Great platform! Love the AI features.', rating: 5, date: '2024-01-15' },
    { id: 2, user: 'Jane Smith', message: 'Dashboard could use more customization options.', rating: 4, date: '2024-01-14' },
    { id: 3, user: 'Bob Johnson', message: 'Excellent support team, very responsive.', rating: 5, date: '2024-01-13' },
  ])

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'users', label: '👥 Users', icon: '👥' },
    { id: 'feedback', label: '💬 Feedback', icon: '💬' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
    { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Admin Control Panel - Aranya One</title>
        <meta name="description" content="Advanced admin dashboard for digital empire management" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🔧 Admin Control Panel
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive management dashboard for your digital empire
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-green-600">+12% this month</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-900">$24.5K</p>
                <p className="text-sm text-green-600">+23% this month</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Services</p>
                <p className="text-3xl font-bold text-gray-900">43</p>
                <p className="text-sm text-blue-600">All operational</p>
              </div>
              <div className="text-4xl">⚙️</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">System Health</p>
                <p className="text-3xl font-bold text-gray-900">99.9%</p>
                <p className="text-sm text-green-600">Excellent</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'border-royal-purple-500 text-royal-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Revenue Chart */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">
                      📈 Revenue Trends
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={userData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#9333ea" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Revenue Distribution */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">
                      💰 Revenue Sources
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={revenueData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {revenueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {revenueData.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading font-semibold text-xl text-gray-900">User Management</h3>
                  <button className="bg-royal-purple-500 hover:bg-royal-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                    + Add User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Revenue</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-medium text-gray-900">{user.revenue}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                              <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-6">User Feedback</h3>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.user}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-gray-700">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <h3 className="font-heading font-semibold text-xl text-gray-900">Advanced Analytics</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-heading font-semibold text-lg text-gray-900 mb-4">User Growth</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={userData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#9333ea" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-heading font-semibold text-lg text-gray-900 mb-4">Growth Rate</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={userData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h3 className="font-heading font-semibold text-xl text-gray-900">System Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-lg text-gray-900 mb-4">Security Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Two-Factor Authentication</span>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                          Enabled
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">API Rate Limiting</span>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                          Active
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Audit Logging</span>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                          Enabled
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-lg text-gray-900 mb-4">System Maintenance</h4>
                    <div className="space-y-4">
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                        🔄 Backup Database
                      </button>
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg">
                        🧹 Clear Cache
                      </button>
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                        🔄 Restart Services
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}