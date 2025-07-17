import Head from 'next/head'

export default function AnalyticsPage() {
  return (
    <div>
      <Head>
        <title>Analytics - Aranya One</title>
        <meta name="description" content="Analytics dashboard for your digital empire" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Analytics Dashboard</h1>
            <p className="text-gray-600">Monitor your empire's performance and growth</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard icon="👥" title="Total Users" value="1,247" change="+12%" color="blue" />
            <MetricCard icon="💰" title="Revenue" value="₹45,680" change="+8%" color="green" />
            <MetricCard icon="🚀" title="Active Services" value="8" change="+2" color="purple" />
            <MetricCard icon="⚡" title="Performance" value="98.5%" change="+0.3%" color="orange" />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Usage Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Usage Trends</h2>
              <div className="space-y-4">
                <UsageBar label="AI Chat Service" percentage="75" color="blue" />
                <UsageBar label="Analytics Dashboard" percentage="45" color="green" />
                <UsageBar label="SEO Optimizer" percentage="60" color="purple" />
                <UsageBar label="Social Media Manager" percentage="30" color="orange" />
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">⚡ Performance Overview</h2>
              <div className="space-y-6">
                <PerformanceItem title="Server Uptime" value="99.9%" status="excellent" />
                <PerformanceItem title="Response Time" value="0.3s" status="good" />
                <PerformanceItem title="Error Rate" value="0.1%" status="excellent" />
                <PerformanceItem title="User Satisfaction" value="4.8/5" status="excellent" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <RecentActivity />

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, title, value, change, color }) {
  const isPositive = change.startsWith('+');
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 border-2 border-${color}-100`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          isPositive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );
}

function UsageBar({ label, percentage, color }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-800">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`bg-${color}-500 h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function PerformanceItem({ title, value, status }) {
  const statusColors = {
    excellent: 'text-green-600 bg-green-100',
    good: 'text-blue-600 bg-blue-100',
    warning: 'text-orange-600 bg-orange-100'
  };
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700 font-medium">{title}</span>
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-gray-800">{value}</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function RecentActivity() {
  const activities = [
    { icon: "🚀", action: "New service activated", service: "AI Chat Service", time: "2 hours ago" },
    { icon: "📊", action: "Analytics report generated", service: "Dashboard", time: "4 hours ago" },
    { icon: "⚙️", action: "Settings updated", service: "SEO Optimizer", time: "1 day ago" },
    { icon: "👥", action: "New user registered", service: "User Management", time: "2 days ago" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🕒 Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl">{activity.icon}</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{activity.action}</p>
              <p className="text-sm text-gray-600">{activity.service}</p>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
