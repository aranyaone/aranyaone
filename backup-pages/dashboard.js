import Head from 'next/head';
import { useState, useEffect, memo } from 'react';

// Mock data for demonstration
const mockAnalyticsData = {
  metrics: {
    totalUsers: 2847,
    revenue: 84923,
    conversionRate: 3.2,
    activeServices: 12
  },
  recentActivity: [
    { id: 1, type: 'user_signup', message: 'New user registered', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
    { id: 2, type: 'service_deployed', message: 'Service deployed successfully', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
    { id: 3, type: 'payment_received', message: 'Payment received $299', timestamp: new Date(Date.now() - 30 * 60 * 1000) }
  ]
};

function formatRelativeTime(date) {
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

const ActivityItem = memo(function ActivityItem({ activity }) {
  const typeIcons = {
    user_signup: '👤',
    service_deployed: '🚀',
    payment_received: '💰',
    system_update: '🔄',
  };
  
  return (
    <div className="flex items-center space-x-3 py-3 border-b border-white/10 last:border-b-0">
      <div className="text-2xl">{typeIcons[activity.type] || '📝'}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{activity.message}</p>
        <p className="text-xs text-white/60">{formatRelativeTime(activity.timestamp)}</p>
      </div>
    </div>
  );
});

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    // Load mock data
    setMetrics(mockAnalyticsData.metrics);
    setActivities(mockAnalyticsData.recentActivity);
  }, []);
  
  if (!metrics) {
    return (
      <>
        <Head>
          <title>Dashboard - Aranya One</title>
          <meta name="description" content="Premium Analytics Dashboard" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Dashboard...</p>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Head>
        <title>Dashboard - Aranya One</title>
        <meta name="description" content="Premium Analytics Dashboard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <header className="glass-card m-6 p-6">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Dashboard - Aranya One
          </h1>
          <p className="text-white/60">
            Token: Mn7HYW5eZVBMIX2ea73uXwNG | Premium Analytics
          </p>
        </header>

        {/* Main Content */}
        <main className="px-6 pb-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 metric-card">
              <h3 className="text-white/60 text-sm font-medium mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-white">{metrics.totalUsers.toLocaleString()}</p>
              <span className="text-green-400 text-sm">↗ +12%</span>
            </div>
            
            <div className="glass-card p-6 metric-card">
              <h3 className="text-white/60 text-sm font-medium mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-white">${metrics.revenue.toLocaleString()}</p>
              <span className="text-green-400 text-sm">↗ +8%</span>
            </div>
            
            <div className="glass-card p-6 metric-card">
              <h3 className="text-white/60 text-sm font-medium mb-2">Conversion Rate</h3>
              <p className="text-3xl font-bold text-white">{metrics.conversionRate}%</p>
              <span className="text-yellow-400 text-sm">→ 0%</span>
            </div>
            
            <div className="glass-card p-6 metric-card">
              <h3 className="text-white/60 text-sm font-medium mb-2">Active Services</h3>
              <p className="text-3xl font-bold text-white">{metrics.activeServices}</p>
              <span className="text-green-400 text-sm">↗ +2</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
