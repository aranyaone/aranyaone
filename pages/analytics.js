import Head from "next/head"
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

// Sample data - in production this would come from your API
const revenueData = [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { month: 'Mar', revenue: 5000, expenses: 2800, profit: 2200 },
  { month: 'Apr', revenue: 4500, expenses: 2908, profit: 1592 },
  { month: 'May', revenue: 6000, expenses: 3800, profit: 2200 },
  { month: 'Jun', revenue: 7500, expenses: 4300, profit: 3200 },
]

const userActivityData = [
  { day: 'Mon', users: 120, sessions: 180 },
  { day: 'Tue', users: 190, sessions: 250 },
  { day: 'Wed', users: 300, sessions: 420 },
  { day: 'Thu', users: 250, sessions: 380 },
  { day: 'Fri', users: 180, sessions: 290 },
  { day: 'Sat', users: 160, sessions: 240 },
  { day: 'Sun', users: 140, sessions: 210 },
]

const serviceUsageData = [
  { name: 'AI Chat', value: 35, color: '#0088FE' },
  { name: 'Analytics', value: 25, color: '#00C49F' },
  { name: 'SEO Tools', value: 20, color: '#FFBB28' },
  { name: 'Social Media', value: 12, color: '#FF8042' },
  { name: 'Others', value: 8, color: '#8884d8' },
]

const performanceData = [
  { time: '00:00', cpu: 45, memory: 60, network: 30 },
  { time: '04:00', cpu: 35, memory: 55, network: 25 },
  { time: '08:00', cpu: 78, memory: 75, network: 68 },
  { time: '12:00', cpu: 85, memory: 80, network: 75 },
  { time: '16:00', cpu: 90, memory: 85, network: 80 },
  { time: '20:00', cpu: 65, memory: 70, network: 45 },
]

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 847,
    apiCalls: 12453,
    revenue: 47582,
    uptime: 99.2
  })

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1000)
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 50),
        revenue: prev.revenue + Math.floor(Math.random() * 100),
        uptime: 99.2 + Math.random() * 0.8
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Analytics Dashboard - Aranya One</title>
        <meta name="description" content="Real-time analytics and performance metrics" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Analytics Dashboard</h1>
              <p className="text-gray-600">Real-time insights into your digital empire performance</p>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                📤 Export Report
              </button>
            </div>
          </div>

          {/* Real-time Metrics */}
          <RealTimeMetrics data={realTimeData} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            
            {/* Revenue Trends */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">💰 Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, '']} />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="expenses" stackId="1" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* User Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">👥 User Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#00C49F" name="Users" />
                  <Bar dataKey="sessions" fill="#0088FE" name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Service Usage */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🛠️ Service Usage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* System Performance */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">⚡ System Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Line type="monotone" dataKey="cpu" stroke="#FF8042" strokeWidth={2} name="CPU" />
                  <Line type="monotone" dataKey="memory" stroke="#00C49F" strokeWidth={2} name="Memory" />
                  <Line type="monotone" dataKey="network" stroke="#0088FE" strokeWidth={2} name="Network" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Tables */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TopPerformingServices />
            <RecentTransactions />
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <a href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function RealTimeMetrics({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon="👥"
        title="Active Users"
        value={data.activeUsers.toLocaleString()}
        change="+5.2%"
        changeType="positive"
        realTime
      />
      <MetricCard
        icon="🔗"
        title="API Calls"
        value={data.apiCalls.toLocaleString()}
        change="+12.8%"
        changeType="positive"
        realTime
      />
      <MetricCard
        icon="💰"
        title="Revenue"
        value={`₹${data.revenue.toLocaleString()}`}
        change="+8.4%"
        changeType="positive"
        realTime
      />
      <MetricCard
        icon="🟢"
        title="Uptime"
        value={`${data.uptime.toFixed(1)}%`}
        change="+0.1%"
        changeType="positive"
        realTime
      />
    </div>
  )
}

function MetricCard({ icon, title, value, change, changeType, realTime }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 relative">
      {realTime && (
        <div className="absolute top-4 right-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change} from yesterday
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}

function TopPerformingServices() {
  const services = [
    { name: 'AI Chat Service', revenue: '₹18,500', growth: '+23%', status: 'growing' },
    { name: 'Analytics Dashboard', revenue: '₹12,800', growth: '+15%', status: 'growing' },
    { name: 'SEO Optimizer', revenue: '₹8,900', growth: '+8%', status: 'stable' },
    { name: 'Social Media Manager', revenue: '₹6,200', growth: '-3%', status: 'declining' },
    { name: 'Design Studio', revenue: '₹4,100', growth: '+45%', status: 'growing' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">🏆 Top Performing Services</h3>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{service.name}</p>
              <p className="text-sm text-gray-600">{service.revenue}</p>
            </div>
            <div className="text-right">
              <span className={`text-sm font-medium ${
                service.status === 'growing' ? 'text-green-600' :
                service.status === 'declining' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {service.growth}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentTransactions() {
  const transactions = [
    { id: '#TXN-001', amount: '₹2,500', type: 'Payment Received', time: '2 min ago', status: 'completed' },
    { id: '#TXN-002', amount: '₹890', type: 'Service Fee', time: '15 min ago', status: 'completed' },
    { id: '#TXN-003', amount: '₹3,200', type: 'Payment Received', time: '1 hour ago', status: 'completed' },
    { id: '#TXN-004', amount: '₹1,100', type: 'Refund', time: '2 hours ago', status: 'pending' },
    { id: '#TXN-005', amount: '₹750', type: 'Service Fee', time: '3 hours ago', status: 'completed' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">💳 Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{transaction.id}</p>
              <p className="text-sm text-gray-600">{transaction.type}</p>
              <p className="text-xs text-gray-500">{transaction.time}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{transaction.amount}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                transaction.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
