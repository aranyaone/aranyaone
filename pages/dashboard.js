import Head from 'next/head'
import { LineChart, BarChart, PieChart, AreaChart, ChartContainer, sampleData } from '../components/Charts'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from '../components/SmartNotification'
import { NotificationSettings } from '../components/SmartNotification'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { success, info } = useNotifications()

  const handleQuickAction = (action) => {
    success(`${action} initiated successfully!`, {
      title: 'Quick Action',
      duration: 3000
    })
  }

  const earningsData = {
    today: { amount: 1247, change: '+12%' },
    week: { amount: 8934, change: '+23%' },
    month: { amount: 34567, change: '+18%' },
    year: { amount: 245890, change: '+45%' }
  }

  return (
    <div>
      <Head>
        <title>Dashboard - Aranya One</title>
        <meta name="description" content="Dashboard control room" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Aranya Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}! Monitor your empire's performance.</p>
            </div>
            <div className="flex items-center gap-4">
              <NotificationSettings />
              <button 
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Earnings Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <EarningsCard 
              title="Today's Earnings" 
              amount={`₹${earningsData.today.amount.toLocaleString()}`}
              change={earningsData.today.change}
              icon="📈"
              color="green"
            />
            <EarningsCard 
              title="This Week" 
              amount={`₹${earningsData.week.amount.toLocaleString()}`}
              change={earningsData.week.change}
              icon="📊"
              color="blue"
            />
            <EarningsCard 
              title="This Month" 
              amount={`₹${earningsData.month.amount.toLocaleString()}`}
              change={earningsData.month.change}
              icon="💰"
              color="purple"
            />
            <EarningsCard 
              title="This Year" 
              amount={`₹${earningsData.year.amount.toLocaleString()}`}
              change={earningsData.year.change}
              icon="🏆"
              color="yellow"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Revenue Chart */}
            <ChartContainer title="📈 Revenue Trend">
              <LineChart 
                data={sampleData.revenue} 
                width={400} 
                height={200} 
                color="#10B981" 
              />
            </ChartContainer>

            {/* User Growth Chart */}
            <ChartContainer title="👥 User Growth">
              <AreaChart 
                data={sampleData.users} 
                width={400} 
                height={200} 
                color="#3B82F6" 
              />
            </ChartContainer>

            {/* Service Usage Chart */}
            <ChartContainer title="🛠️ Service Usage">
              <PieChart 
                data={sampleData.services} 
                size={280} 
              />
            </ChartContainer>

            {/* Weekly Performance */}
            <ChartContainer title="📊 Weekly Performance">
              <BarChart 
                data={sampleData.growth} 
                width={400} 
                height={200} 
                color="#8B5CF6" 
              />
            </ChartContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">⚡ Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickActionButton 
                icon="🚀" 
                label="Launch Service" 
                onClick={() => handleQuickAction('Service Launch')}
                color="blue"
              />
              <QuickActionButton 
                icon="📊" 
                label="View Analytics" 
                onClick={() => window.location.href = '/analytics'}
                color="green"
              />
              <QuickActionButton 
                icon="⚙️" 
                label="Settings" 
                onClick={() => window.location.href = '/settings'}
                color="purple"
              />
              <QuickActionButton 
                icon="💬" 
                label="Support" 
                onClick={() => handleQuickAction('Support Request')}
                color="orange"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <RecentActivity />

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Home</a>
          </div>
        </div>
      </main>
    </div>
  )
}

function EarningsCard({ title, amount, change, icon, color }) {
  const colorClasses = {
    green: 'border-green-200 text-green-600',
    blue: 'border-blue-200 text-blue-600', 
    purple: 'border-purple-200 text-purple-600',
    yellow: 'border-yellow-200 text-yellow-600'
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 border-2 ${colorClasses[color].split(' ')[0]}`}>
      <div className="text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <div className="text-2xl font-bold text-gray-800 mb-1">{amount}</div>
        <div className={`text-sm font-medium ${colorClasses[color].split(' ')[1]}`}>
          {change}
        </div>
      </div>
    </div>
  )
}

function QuickActionButton({ icon, label, onClick, color }) {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600'
  }

  return (
    <button
      onClick={onClick}
      className={`p-4 ${colorClasses[color]} text-white rounded-xl transition-colors text-center`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </button>
  )
}

function RecentActivity() {
  const activities = [
    { time: '2 min ago', action: 'New user registered', icon: '👤', color: 'green' },
    { time: '5 min ago', action: 'Revenue milestone reached', icon: '💰', color: 'yellow' },
    { time: '10 min ago', action: 'Service deployment completed', icon: '🚀', color: 'blue' },
    { time: '15 min ago', action: 'Analytics report generated', icon: '📊', color: 'purple' },
    { time: '30 min ago', action: 'System backup completed', icon: '💾', color: 'gray' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⏰ Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl">{activity.icon}</div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
