import Head from 'next/head'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const monthlyData = [
  { name: 'Jan', revenue: 4000, users: 2400, growth: 2.4 },
  { name: 'Feb', revenue: 3000, users: 1398, growth: 1.8 },
  { name: 'Mar', revenue: 2000, users: 9800, growth: 3.2 },
  { name: 'Apr', revenue: 2780, users: 3908, growth: 2.8 },
  { name: 'May', revenue: 1890, users: 4800, growth: 1.9 },
  { name: 'Jun', revenue: 2390, users: 3800, growth: 2.4 },
  { name: 'Jul', revenue: 3490, users: 4300, growth: 3.1 },
]

const serviceData = [
  { name: 'AI Chat', value: 35, color: '#9333ea' },
  { name: 'Analytics', value: 25, color: '#3b82f6' },
  { name: 'SEO Tools', value: 20, color: '#10b981' },
  { name: 'Design Studio', value: 15, color: '#f59e0b' },
  { name: 'Others', value: 5, color: '#6b7280' },
]

export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Dashboard - Aranya One</title>
        <meta name="description" content="Your digital empire control center" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🎯 Dashboard Control Center
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor your digital empire's performance and growth metrics
          </p>
        </div>

        {/* Real-time Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon="👥"
            title="Active Users"
            value="2,847"
            change="+12.5%"
            changeType="positive"
            subtitle="vs last month"
          />
          <MetricCard
            icon="💰"
            title="Revenue"
            value="$12,430"
            change="+23.1%"
            changeType="positive"
            subtitle="vs last month"
          />
          <MetricCard
            icon="📊"
            title="Conversion Rate"
            value="3.24%"
            change="+0.5%"
            changeType="positive"
            subtitle="vs last month"
          />
          <MetricCard
            icon="⚡"
            title="Active Services"
            value="8"
            change="+2"
            changeType="positive"
            subtitle="new this month"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-xl text-gray-900">
                📈 Revenue Growth
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-royal-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#9333ea"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  className="animate-fade-in"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* User Analytics */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-xl text-gray-900">
                👥 User Analytics
              </h2>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-royal-purple-500">
                <option>Last 7 months</option>
                <option>Last 3 months</option>
                <option>Last month</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Usage and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Usage Pie Chart */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              ⚙️ Service Usage
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {serviceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
                ⚡ Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickActionButton
                  icon="➕"
                  label="Add Service"
                  href="/services"
                  color="royal-purple"
                />
                <QuickActionButton
                  icon="📊"
                  label="View Reports"
                  href="/analytics"
                  color="blue"
                />
                <QuickActionButton
                  icon="⚙️"
                  label="Settings"
                  href="/settings"
                  color="gray"
                />
                <QuickActionButton
                  icon="💬"
                  label="Support"
                  href="/support"
                  color="green"
                />
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
                ✅ System Status
              </h2>
              <div className="space-y-4">
                <StatusItem
                  service="API Services"
                  status="operational"
                  uptime="99.9%"
                />
                <StatusItem
                  service="Database"
                  status="operational"
                  uptime="99.8%"
                />
                <StatusItem
                  service="CDN"
                  status="operational"
                  uptime="100%"
                />
                <StatusItem
                  service="Analytics"
                  status="maintenance"
                  uptime="99.7%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon, title, value, change, changeType, subtitle }) {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-red-600'
  
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <div className={`text-sm font-medium ${changeColor} bg-opacity-10 px-2 py-1 rounded-lg ${changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'}`}>
          {change}
        </div>
      </div>
      <h3 className="font-heading font-semibold text-gray-700 text-sm mb-1">{title}</h3>
      <div className="font-heading font-bold text-2xl text-gray-900 mb-1">{value}</div>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  )
}

function QuickActionButton({ icon, label, href, color }) {
  const colorClasses = {
    'royal-purple': 'bg-royal-purple-500 hover:bg-royal-purple-600',
    'blue': 'bg-blue-500 hover:bg-blue-600',
    'gray': 'bg-gray-500 hover:bg-gray-600',
    'green': 'bg-green-500 hover:bg-green-600',
  }

  return (
    <a
      href={href}
      className={`${colorClasses[color]} text-white p-4 rounded-xl text-center hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group`}
    >
      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </a>
  )
}

function StatusItem({ service, status, uptime }) {
  const statusColors = {
    operational: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    down: 'bg-red-100 text-red-800',
  }

  const statusDots = {
    operational: 'bg-green-500',
    maintenance: 'bg-yellow-500',
    down: 'bg-red-500',
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className={`w-2 h-2 rounded-full ${statusDots[status]} ${status === 'operational' ? 'animate-pulse' : ''}`}></div>
        <span className="font-medium text-gray-900">{service}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">{uptime}</span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>
    </div>
  )
}
