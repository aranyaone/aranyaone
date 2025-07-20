import Head from "next/head"
import { useState } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [activeMetric, setActiveMetric] = useState('revenue')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Head>
        <title>Analytics Dashboard - Aranya One</title>
        <meta name="description" content="Real-time analytics and performance metrics" />
      </Head>
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">📊 Analytics Dashboard</h1>
                <p className="text-gray-600">Real-time insights and performance metrics</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['24h', '7d', '30d', '90d'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <KeyMetrics />
        
        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueChart timeRange={timeRange} />
          <UserActivityChart timeRange={timeRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <TrafficSourcesChart />
          <DeviceBreakdownChart />
          <GeographicChart />
        </div>

        {/* Performance Metrics */}
        <PerformanceAnalytics />
        
        {/* Real-time Activity */}
        <RealTimeActivity />
      </div>
    </div>
  );
}

function KeyMetrics() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '₹2,34,567',
      change: '+23.5%',
      changeType: 'positive',
      icon: '💰',
      color: 'green'
    },
    {
      title: 'Website Visitors',
      value: '45,678',
      change: '+18.2%',
      changeType: 'positive',
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+0.8%',
      changeType: 'positive',
      icon: '📈',
      color: 'purple'
    },
    {
      title: 'Avg. Session Duration',
      value: '4m 32s',
      change: '-5.2%',
      changeType: 'negative',
      icon: '⏱️',
      color: 'orange'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            <span className="text-2xl">{metric.icon}</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-2">{metric.value}</div>
          <div className={`text-sm font-medium flex items-center gap-1 ${
            metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{metric.changeType === 'positive' ? '↗️' : '↘️'}</span>
            {metric.change} vs last period
          </div>
        </div>
      ))}
    </div>
  )
}

function RevenueChart({ timeRange }) {
  const revenueData = {
    '24h': [
      { time: '00:00', revenue: 1200, orders: 12 },
      { time: '04:00', revenue: 800, orders: 8 },
      { time: '08:00', revenue: 2500, orders: 25 },
      { time: '12:00', revenue: 3200, orders: 32 },
      { time: '16:00', revenue: 2800, orders: 28 },
      { time: '20:00', revenue: 3500, orders: 35 },
      { time: '23:59', revenue: 1500, orders: 15 }
    ],
    '7d': [
      { time: 'Mon', revenue: 12000, orders: 120 },
      { time: 'Tue', revenue: 15000, orders: 150 },
      { time: 'Wed', revenue: 18000, orders: 180 },
      { time: 'Thu', revenue: 16000, orders: 160 },
      { time: 'Fri', revenue: 22000, orders: 220 },
      { time: 'Sat', revenue: 25000, orders: 250 },
      { time: 'Sun', revenue: 20000, orders: 200 }
    ],
    '30d': [
      { time: 'Week 1', revenue: 85000, orders: 850 },
      { time: 'Week 2', revenue: 92000, orders: 920 },
      { time: 'Week 3', revenue: 78000, orders: 780 },
      { time: 'Week 4', revenue: 105000, orders: 1050 }
    ],
    '90d': [
      { time: 'Month 1', revenue: 320000, orders: 3200 },
      { time: 'Month 2', revenue: 380000, orders: 3800 },
      { time: 'Month 3', revenue: 420000, orders: 4200 }
    ]
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">💰 Revenue Analytics</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={revenueData[timeRange]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip formatter={(value, name) => [
            name === 'revenue' ? `₹${value.toLocaleString()}` : value,
            name === 'revenue' ? 'Revenue' : 'Orders'
          ]} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            fill="#3B82F6"
            fillOpacity={0.3}
            stroke="#3B82F6"
            strokeWidth={2}
          />
          <Bar yAxisId="right" dataKey="orders" fill="#10B981" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

function UserActivityChart({ timeRange }) {
  const activityData = {
    '24h': [
      { time: '00:00', activeUsers: 45, pageViews: 120 },
      { time: '04:00', activeUsers: 23, pageViews: 65 },
      { time: '08:00', activeUsers: 89, pageViews: 245 },
      { time: '12:00', activeUsers: 156, pageViews: 420 },
      { time: '16:00', activeUsers: 134, pageViews: 380 },
      { time: '20:00', activeUsers: 178, pageViews: 490 },
      { time: '23:59', activeUsers: 67, pageViews: 180 }
    ],
    '7d': [
      { time: 'Mon', activeUsers: 1200, pageViews: 3400 },
      { time: 'Tue', activeUsers: 1400, pageViews: 3800 },
      { time: 'Wed', activeUsers: 1600, pageViews: 4200 },
      { time: 'Thu', activeUsers: 1300, pageViews: 3600 },
      { time: 'Fri', activeUsers: 1800, pageViews: 4800 },
      { time: 'Sat', activeUsers: 1500, pageViews: 4000 },
      { time: 'Sun', activeUsers: 1100, pageViews: 3000 }
    ]
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">👥 User Activity</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={activityData[timeRange] || activityData['7d']}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#8884d8"
            strokeWidth={3}
            name="Active Users"
          />
          <Line
            type="monotone"
            dataKey="pageViews"
            stroke="#82ca9d"
            strokeWidth={3}
            name="Page Views"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function TrafficSourcesChart() {
  const trafficData = [
    { name: 'Organic Search', value: 45, color: '#3B82F6' },
    { name: 'Direct', value: 25, color: '#10B981' },
    { name: 'Social Media', value: 15, color: '#F59E0B' },
    { name: 'Referral', value: 10, color: '#8B5CF6' },
    { name: 'Email', value: 5, color: '#EF4444' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">🌐 Traffic Sources</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={trafficData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {trafficData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function DeviceBreakdownChart() {
  const deviceData = [
    { device: 'Desktop', users: 2500, sessions: 3200 },
    { device: 'Mobile', users: 3200, sessions: 4100 },
    { device: 'Tablet', users: 800, sessions: 950 }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">📱 Device Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={deviceData} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="device" type="category" />
          <Tooltip />
          <Bar dataKey="users" fill="#3B82F6" />
          <Bar dataKey="sessions" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function GeographicChart() {
  const countryData = [
    { country: 'India', users: 4500, revenue: 125000 },
    { country: 'USA', users: 2800, revenue: 98000 },
    { country: 'UK', users: 1200, revenue: 45000 },
    { country: 'Canada', users: 800, revenue: 32000 },
    { country: 'Australia', users: 600, revenue: 28000 }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">🌍 Geographic Distribution</h3>
      <div className="space-y-4">
        {countryData.map((country, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">{index + 1}</span>
              </div>
              <span className="font-medium text-gray-800">{country.country}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-800">{country.users.toLocaleString()} users</div>
              <div className="text-sm text-gray-600">₹{country.revenue.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PerformanceAnalytics() {
  const performanceData = [
    { metric: 'Page Load Time', current: 1.2, target: 2.0, unit: 's', status: 'excellent' },
    { metric: 'Time to Interactive', current: 2.8, target: 5.0, unit: 's', status: 'good' },
    { metric: 'First Contentful Paint', current: 0.9, target: 1.8, unit: 's', status: 'excellent' },
    { metric: 'Cumulative Layout Shift', current: 0.05, target: 0.1, unit: '', status: 'excellent' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">⚡ Performance Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceData.map((perf, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 mb-2">{perf.metric}</h4>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {perf.current}{perf.unit}
            </div>
            <div className="text-xs text-gray-500 mb-2">
              Target: {perf.target}{perf.unit}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              perf.status === 'excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {perf.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RealTimeActivity() {
  const [realTimeData, setRealTimeData] = useState([
    { id: 1, event: 'New user signed up', user: 'john@example.com', time: '2 seconds ago', type: 'signup' },
    { id: 2, event: 'Purchase completed', user: 'sarah@example.com', time: '15 seconds ago', type: 'purchase' },
    { id: 3, event: 'Page view: /dashboard', user: 'anonymous', time: '30 seconds ago', type: 'pageview' },
    { id: 4, event: 'Form submission', user: 'mike@example.com', time: '1 minute ago', type: 'form' },
    { id: 5, event: 'File download', user: 'emma@example.com', time: '2 minutes ago', type: 'download' }
  ])

  const eventIcons = {
    signup: '👤',
    purchase: '💰',
    pageview: '👁️',
    form: '📝',
    download: '📥'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">🔴 Real-time Activity</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {realTimeData.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span>{eventIcons[activity.type]}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{activity.event}</p>
              <p className="text-sm text-gray-600">{activity.user}</p>
            </div>
            <div className="text-xs text-gray-500">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
