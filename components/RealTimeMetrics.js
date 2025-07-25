import { useState, useEffect } from 'react'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export default function RealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    pageViews: 0,
    apiCalls: 0,
    conversionRate: 0
  })

  const [chartData, setChartData] = useState([])
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Simulate real-time data updates
    const updateMetrics = () => {
      const now = new Date()
      const timeStamp = now.toLocaleTimeString()
      
      setMetrics(prev => ({
        activeUsers: Math.max(50, prev.activeUsers + Math.floor(Math.random() * 21) - 10),
        pageViews: prev.pageViews + Math.floor(Math.random() * 50) + 10,
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 30) + 5,
        conversionRate: Math.max(0, Math.min(100, prev.conversionRate + (Math.random() - 0.5) * 2))
      }))

      setChartData(prev => {
        const newData = [...prev, {
          time: timeStamp,
          users: Math.floor(Math.random() * 100) + 200,
          pageViews: Math.floor(Math.random() * 300) + 400,
          apiCalls: Math.floor(Math.random() * 150) + 100
        }].slice(-20) // Keep last 20 data points
        return newData
      })
    }

    // Initial data
    setMetrics({
      activeUsers: 847,
      pageViews: 12654,
      apiCalls: 4821,
      conversionRate: 3.4
    })

    const interval = setInterval(updateMetrics, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const MetricCard = ({ icon, label, value, change, isPositive, suffix = '' }) => (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:border-royal-purple-200 transition-all duration-300 hover:shadow-soft">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl">{icon}</div>
        <div className={`text-xs px-2 py-1 rounded-full font-medium ${
          isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {isPositive ? '↗' : '↘'} {change}%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Live Status */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-xl text-gray-900">
          📊 Real-Time Analytics
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className={`text-sm font-medium ${isLive ? 'text-green-600' : 'text-gray-600'}`}>
            {isLive ? 'Live' : 'Offline'}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            className="ml-2 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon="👥"
          label="Active Users"
          value={metrics.activeUsers}
          change={12.5}
          isPositive={true}
        />
        <MetricCard
          icon="👀"
          label="Page Views"
          value={metrics.pageViews}
          change={8.3}
          isPositive={true}
        />
        <MetricCard
          icon="🔌"
          label="API Calls"
          value={metrics.apiCalls}
          change={-2.1}
          isPositive={false}
        />
        <MetricCard
          icon="💰"
          label="Conversion Rate"
          value={metrics.conversionRate.toFixed(1)}
          change={15.7}
          isPositive={true}
          suffix="%"
        />
      </div>

      {/* Real-time Chart */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-semibold text-lg text-gray-900">Live Traffic</h4>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Page Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>API Calls</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
              <Line 
                type="monotone" 
                dataKey="apiCalls" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <div>
              <p className="text-green-800 font-semibold">System Status</p>
              <p className="text-green-600 text-sm">All systems operational</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🚀</span>
            </div>
            <div>
              <p className="text-blue-800 font-semibold">Response Time</p>
              <p className="text-blue-600 text-sm">127ms average</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🎯</span>
            </div>
            <div>
              <p className="text-purple-800 font-semibold">Uptime</p>
              <p className="text-purple-600 text-sm">99.97% this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}