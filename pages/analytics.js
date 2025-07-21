import Head from 'next/head'
import { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts'

const realtimeData = [
  { time: '09:00', visitors: 45, revenue: 1200, conversion: 3.2 },
  { time: '10:00', visitors: 67, revenue: 1800, conversion: 4.1 },
  { time: '11:00', visitors: 89, revenue: 2400, conversion: 3.8 },
  { time: '12:00', visitors: 123, revenue: 3200, conversion: 4.5 },
  { time: '13:00', visitors: 156, revenue: 4100, conversion: 5.2 },
  { time: '14:00', visitors: 134, revenue: 3600, conversion: 4.8 },
  { time: '15:00', visitors: 178, revenue: 4800, conversion: 5.6 },
]

const geographicData = [
  { country: 'USA', users: 45, color: '#9333ea' },
  { country: 'India', users: 32, color: '#3b82f6' },
  { country: 'UK', users: 18, color: '#10b981' },
  { country: 'Canada', users: 15, color: '#f59e0b' },
  { country: 'Others', users: 25, color: '#6b7280' },
]

const deviceData = [
  { device: 'Mobile', users: 65, sessions: 1240 },
  { device: 'Desktop', users: 45, sessions: 890 },
  { device: 'Tablet', users: 25, sessions: 450 },
]

const performanceData = [
  { metric: 'Speed', value: 85, fullMark: 100 },
  { metric: 'SEO', value: 92, fullMark: 100 },
  { metric: 'Security', value: 88, fullMark: 100 },
  { metric: 'Accessibility', value: 90, fullMark: 100 },
  { metric: 'Best Practices', value: 94, fullMark: 100 },
  { metric: 'PWA', value: 78, fullMark: 100 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('24h')
  const [isRealtime, setIsRealtime] = useState(true)
  const [currentData, setCurrentData] = useState(realtimeData)

  useEffect(() => {
    if (isRealtime) {
      const interval = setInterval(() => {
        setCurrentData(prevData => {
          const newData = [...prevData]
          newData.shift() // Remove first item
          const lastTime = newData[newData.length - 1]?.time || '15:00'
          const newTime = new Date(Date.now()).toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          })
          
          newData.push({
            time: newTime,
            visitors: Math.floor(Math.random() * 200) + 50,
            revenue: Math.floor(Math.random() * 5000) + 1000,
            conversion: (Math.random() * 3 + 3).toFixed(1)
          })
          
          return newData
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isRealtime])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Advanced Analytics - Aranya One</title>
        <meta name="description" content="Comprehensive analytics dashboard with real-time insights" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
              📊 Advanced Analytics
            </h1>
            <p className="text-gray-600 text-lg">
              Real-time insights and predictive analytics for your digital empire
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Real-time:</span>
              <button
                onClick={() => setIsRealtime(!isRealtime)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-royal-purple-500 focus:ring-offset-2 ${
                  isRealtime ? 'bg-royal-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isRealtime ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Live Visitors"
            value="156"
            change="+23%"
            changeType="positive"
            icon="👥"
            realtime={isRealtime}
          />
          <MetricCard
            title="Revenue Today"
            value="$4,892"
            change="+15%"
            changeType="positive"
            icon="💰"
            realtime={isRealtime}
          />
          <MetricCard
            title="Conversion Rate"
            value="5.2%"
            change="+0.8%"
            changeType="positive"
            icon="📈"
            realtime={isRealtime}
          />
          <MetricCard
            title="Avg. Session"
            value="4m 32s"
            change="-12s"
            changeType="negative"
            icon="⏱️"
            realtime={isRealtime}
          />
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Real-time Traffic */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading font-semibold text-xl text-gray-900">
                📈 Real-time Traffic
              </h2>
              {isRealtime && (
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Live
                </div>
              )}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#9333ea" 
                  fillOpacity={1} 
                  fill="url(#visitorGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Analytics */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              💰 Revenue Analytics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic & Device Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Geographic Distribution */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              🌍 Geographic Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={geographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="users"
                >
                  {geographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {geographicData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.country}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.users}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Analytics */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              📱 Device Analytics
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deviceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="device" type="category" width={60} />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Score */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              ⚡ Performance Score
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={performanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#9333ea"
                  fill="#9333ea"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <div className="text-3xl font-bold text-royal-purple-600">87</div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
            🤖 AI-Powered Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="font-semibold text-blue-900">Traffic Prediction</h3>
              </div>
              <p className="text-blue-800 text-sm mb-3">
                Based on current trends, expect 23% increase in traffic next week, with peak hours between 2-4 PM.
              </p>
              <div className="text-xs text-blue-600 font-medium">Confidence: 89%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-xl">💰</span>
                </div>
                <h3 className="font-semibold text-green-900">Revenue Forecast</h3>
              </div>
              <p className="text-green-800 text-sm mb-3">
                Your revenue is projected to reach $45K this month, surpassing last month by 18%.
              </p>
              <div className="text-xs text-green-600 font-medium">Confidence: 92%</div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="font-semibold text-orange-900">Optimization Tip</h3>
              </div>
              <p className="text-orange-800 text-sm mb-3">
                Consider optimizing mobile experience - 67% of users are on mobile with 15% higher bounce rate.
              </p>
              <div className="text-xs text-orange-600 font-medium">Priority: High</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, change, changeType, icon, realtime }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        {realtime && (
          <div className="flex items-center text-green-600 text-xs">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            Live
          </div>
        )}
      </div>
      <h3 className="font-heading font-semibold text-gray-700 text-sm mb-1">{title}</h3>
      <div className="font-heading font-bold text-2xl text-gray-900 mb-1">{value}</div>
      <div className={`text-xs font-medium ${
        changeType === 'positive' ? 'text-green-600' : 'text-red-600'
      }`}>
        {change} vs yesterday
      </div>
    </div>
  )
}
