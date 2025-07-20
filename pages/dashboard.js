import Head from 'next/head'
import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

  const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value)

  const getChangeColor = (change) => change >= 0 ? '#10b981' : '#ef4444'
  const getChangeIcon = (change) => change >= 0 ? '↗' : '↘'

  const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Dashboard - Aranya One</title>
          <meta name="description" content="Dashboard control room with live statistics and analytics" />
          <link rel="preload" href="/api/stats" as="fetch" crossOrigin="anonymous" />
        </Head>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" aria-label="Loading dashboard"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Dashboard - Aranya One</title>
          <meta name="description" content="Dashboard control room" />
        </Head>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Dashboard</h1>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Reload dashboard"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard - Aranya One</title>
        <meta name="description" content="Dashboard control room with live statistics and analytics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" href="/api/stats" as="fetch" crossOrigin="anonymous" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📊 Aranya Dashboard</h1>
              <p className="text-gray-600">Welcome to your empire's control room</p>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date(stats.quickStats.lastUpdate).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Earnings Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.earnings.current)}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span 
                className="text-sm font-medium"
                style={{ color: getChangeColor(stats.earnings.change) }}
              >
                {getChangeIcon(stats.earnings.change)} {Math.abs(stats.earnings.change)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          {/* Visitors Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visitors</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.visitors.current)}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span 
                className="text-sm font-medium"
                style={{ color: getChangeColor(stats.visitors.change) }}
              >
                {getChangeIcon(stats.visitors.change)} {Math.abs(stats.visitors.change)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          {/* Signups Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Signups</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.signups.current)}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">🎯</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span 
                className="text-sm font-medium"
                style={{ color: getChangeColor(stats.signups.change) }}
              >
                {getChangeIcon(stats.signups.change)} {Math.abs(stats.signups.change)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          {/* Conversion Rate Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate.current}%</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xl">📈</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span 
                className="text-sm font-medium"
                style={{ color: getChangeColor(stats.conversionRate.change) }}
              >
                {getChangeIcon(stats.conversionRate.change)} {Math.abs(stats.conversionRate.change)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [formatCurrency(value), 'Earnings']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Visitors & Signups Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Visitors & Signups</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visitors" fill="#10b981" name="Visitors" />
                  <Bar dataKey="signups" fill="#f59e0b" name="Signups" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Actions & Admin Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">📊</span>
                  <span className="font-medium">View Analytics</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded bg-green-50 hover:bg-green-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-green-600 mr-3">💰</span>
                  <span className="font-medium">Generate Report</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded bg-purple-50 hover:bg-purple-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-purple-600 mr-3">⚙️</span>
                  <span className="font-medium">Manage Settings</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded bg-orange-50 hover:bg-orange-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-orange-600 mr-3">👤</span>
                  <span className="font-medium">User Management</span>
                </div>
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Users</span>
                <span className="font-bold text-green-600">{formatNumber(stats.quickStats.activeUsers)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-bold text-orange-600">{stats.quickStats.pendingOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">System Health</span>
                <span className="font-bold text-green-600">{stats.quickStats.systemHealth}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.quickStats.systemHealth}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Admin Tools */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Tools</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded bg-red-50 hover:bg-red-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-red-600 mr-3">🛡️</span>
                  <span className="font-medium">Security Center</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">📋</span>
                  <span className="font-medium">Audit Logs</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-3">🔧</span>
                  <span className="font-medium">System Config</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded bg-yellow-50 hover:bg-yellow-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-3">📤</span>
                  <span className="font-medium">Export Data</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go back to homepage"
          >
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  )
}
