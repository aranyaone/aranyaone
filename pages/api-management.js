import Head from 'next/head'
import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function APIManagement() {
  const [apiKeys, setApiKeys] = useState([])
  const [endpoints, setEndpoints] = useState([])
  const [selectedTab, setSelectedTab] = useState('overview')
  const [newKeyName, setNewKeyName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState([])

  useEffect(() => {
    // Simulate API data
    setApiKeys([
      {
        id: 1,
        name: 'Production API',
        key: 'ak_prod_1234567890abcdef',
        created: '2024-01-15',
        lastUsed: '5 minutes ago',
        requests: 45230,
        status: 'active',
        permissions: ['read', 'write', 'admin']
      },
      {
        id: 2,
        name: 'Development API',
        key: 'ak_dev_abcdef1234567890',
        created: '2024-01-10',
        lastUsed: '2 hours ago',
        requests: 12456,
        status: 'active',
        permissions: ['read', 'write']
      },
      {
        id: 3,
        name: 'Test Integration',
        key: 'ak_test_567890abcdef1234',
        created: '2024-01-08',
        lastUsed: '1 day ago',
        requests: 3421,
        status: 'inactive',
        permissions: ['read']
      }
    ])

    setEndpoints([
      {
        id: 1,
        path: '/api/v1/analytics',
        method: 'GET',
        description: 'Retrieve analytics data',
        requests: 15420,
        avgResponse: '120ms',
        status: 'healthy',
        rateLimit: '1000/hour'
      },
      {
        id: 2,
        path: '/api/v1/users',
        method: 'POST',
        description: 'Create new user',
        requests: 8934,
        avgResponse: '89ms',
        status: 'healthy',
        rateLimit: '100/hour'
      },
      {
        id: 3,
        path: '/api/v1/ai/generate',
        method: 'POST',
        description: 'AI content generation',
        requests: 5672,
        avgResponse: '2.3s',
        status: 'warning',
        rateLimit: '50/hour'
      },
      {
        id: 4,
        path: '/api/v1/webhooks',
        method: 'POST',
        description: 'Webhook endpoint',
        requests: 2341,
        avgResponse: '45ms',
        status: 'healthy',
        rateLimit: '500/hour'
      }
    ])
  }, [])

  const apiUsageData = [
    { time: '00:00', requests: 120, errors: 2 },
    { time: '04:00', requests: 89, errors: 1 },
    { time: '08:00', requests: 234, errors: 3 },
    { time: '12:00', requests: 456, errors: 5 },
    { time: '16:00', requests: 389, errors: 2 },
    { time: '20:00', requests: 234, errors: 1 },
  ]

  const endpointPerformanceData = [
    { endpoint: '/analytics', requests: 15420, avgTime: 120 },
    { endpoint: '/users', requests: 8934, avgTime: 89 },
    { endpoint: '/ai/generate', requests: 5672, avgTime: 2300 },
    { endpoint: '/webhooks', requests: 2341, avgTime: 45 },
  ]

  const permissions = [
    { id: 'read', label: 'Read', description: 'View data and analytics' },
    { id: 'write', label: 'Write', description: 'Create and update resources' },
    { id: 'delete', label: 'Delete', description: 'Remove resources' },
    { id: 'admin', label: 'Admin', description: 'Full system access' },
    { id: 'ai', label: 'AI Tools', description: 'Access AI generation features' },
    { id: 'analytics', label: 'Analytics', description: 'Access analytics data' },
  ]

  const createApiKey = () => {
    if (!newKeyName.trim()) return

    const newKey = {
      id: Date.now(),
      name: newKeyName,
      key: `ak_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      requests: 0,
      status: 'active',
      permissions: selectedPermissions
    }

    setApiKeys(prev => [newKey, ...prev])
    setNewKeyName('')
    setSelectedPermissions([])
  }

  const togglePermission = (permissionId) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const revokeApiKey = (keyId) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId))
  }

  const getStatusColor = (status) => {
    const colors = {
      healthy: 'text-green-600 bg-green-100',
      warning: 'text-yellow-600 bg-yellow-100',
      error: 'text-red-600 bg-red-100',
      active: 'text-green-600 bg-green-100',
      inactive: 'text-gray-600 bg-gray-100'
    }
    return colors[status] || 'text-gray-600 bg-gray-100'
  }

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'keys', label: '🔑 API Keys', icon: '🔑' },
    { id: 'endpoints', label: '🔗 Endpoints', icon: '🔗' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
    { id: 'webhooks', label: '🔔 Webhooks', icon: '🔔' },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>API Management - Aranya One</title>
        <meta name="description" content="Comprehensive API management dashboard with analytics and security" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🔗 API Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage API keys, monitor usage, and configure endpoints for your digital empire
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total API Calls</p>
                <p className="text-3xl font-bold text-gray-900">61.1K</p>
                <p className="text-sm text-green-600">+23% this month</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Keys</p>
                <p className="text-3xl font-bold text-gray-900">{apiKeys.filter(key => key.status === 'active').length}</p>
                <p className="text-sm text-blue-600">2 new this week</p>
              </div>
              <div className="text-4xl">🔑</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">99.2%</p>
                <p className="text-sm text-green-600">+0.3% this month</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Response</p>
                <p className="text-3xl font-bold text-gray-900">89ms</p>
                <p className="text-sm text-green-600">-12ms this month</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
                    selectedTab === tab.id
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

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* API Usage Chart */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">
                      📈 API Usage (Last 24 Hours)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={apiUsageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="requests" stroke="#9333ea" strokeWidth={3} />
                        <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Endpoint Performance */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">
                      ⚡ Endpoint Performance
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={endpointPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="endpoint" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="avgTime" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'keys' && (
              <div className="space-y-6">
                {/* Create New API Key */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
                  <h3 className="font-heading font-semibold text-lg mb-4">🔑 Create New API Key</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Key Name</label>
                      <input
                        type="text"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="e.g., Mobile App API"
                        className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Permissions</label>
                      <div className="grid grid-cols-2 gap-2">
                        {permissions.slice(0, 4).map((permission) => (
                          <label key={permission.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedPermissions.includes(permission.id)}
                              onChange={() => togglePermission(permission.id)}
                              className="rounded border-white/20 text-white focus:ring-white/50"
                            />
                            <span className="text-sm">{permission.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={createApiKey}
                    disabled={!newKeyName.trim()}
                    className="mt-4 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Create API Key
                  </button>
                </div>

                {/* API Keys List */}
                <div className="space-y-4">
                  <h3 className="font-heading font-semibold text-xl text-gray-900">Existing API Keys</h3>
                  {apiKeys.map((key) => (
                    <div key={key.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="font-semibold text-lg text-gray-900">{key.name}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(key.status)}`}>
                              {key.status}
                            </span>
                          </div>
                          <div className="bg-gray-900 text-green-400 px-4 py-2 rounded-lg font-mono text-sm mb-3">
                            {key.key}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Created:</span>
                              <div className="font-medium">{key.created}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Last Used:</span>
                              <div className="font-medium">{key.lastUsed}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Requests:</span>
                              <div className="font-medium">{key.requests.toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Permissions:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {key.permissions.map((perm) => (
                                  <span key={perm} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                    {perm}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                          <button 
                            onClick={() => revokeApiKey(key.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'endpoints' && (
              <div className="space-y-6">
                <h3 className="font-heading font-semibold text-xl text-gray-900">API Endpoints</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Endpoint</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Method</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Requests</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Avg Response</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Rate Limit</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoints.map((endpoint) => (
                        <tr key={endpoint.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{endpoint.path}</div>
                              <div className="text-sm text-gray-500">{endpoint.description}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {endpoint.method}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-medium text-gray-900">
                            {endpoint.requests.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 font-medium text-gray-900">
                            {endpoint.avgResponse}
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {endpoint.rateLimit}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(endpoint.status)}`}>
                              {endpoint.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'analytics' && (
              <div className="space-y-8">
                <h3 className="font-heading font-semibold text-xl text-gray-900">API Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white">
                    <h4 className="font-semibold mb-2">🎯 Response Time</h4>
                    <div className="text-3xl font-bold mb-1">89ms</div>
                    <p className="text-sm opacity-90">Average across all endpoints</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl p-6 text-white">
                    <h4 className="font-semibold mb-2">📊 Throughput</h4>
                    <div className="text-3xl font-bold mb-1">2.4K</div>
                    <p className="text-sm opacity-90">Requests per hour</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-6 text-white">
                    <h4 className="font-semibold mb-2">🔒 Security</h4>
                    <div className="text-3xl font-bold mb-1">100%</div>
                    <p className="text-sm opacity-90">Authenticated requests</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-heading font-semibold text-lg text-gray-900 mb-4">
                    📈 Request Volume Trends
                  </h4>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={apiUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="requests" stroke="#9333ea" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {selectedTab === 'webhooks' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-semibold text-xl text-gray-900">Webhook Configuration</h3>
                  <button className="bg-royal-purple-500 hover:bg-royal-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                    + Add Webhook
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <h4 className="font-semibold text-lg mb-2">🔔 Webhook Events</h4>
                  <p className="mb-4">Configure real-time notifications for important events in your system.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">👤</div>
                      <div className="text-sm">User Events</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">💰</div>
                      <div className="text-sm">Payment Events</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🚀</div>
                      <div className="text-sm">Deployment Events</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">⚠️</div>
                      <div className="text-sm">Error Events</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">🔔</div>
                  <p>No webhooks configured yet. Add your first webhook to get started.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}