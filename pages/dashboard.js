import { memo, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { mockAnalyticsData } from '../data/mockData';
import { formatCurrency, formatNumber, formatRelativeTime } from '../utils';

const MetricCard = memo(function MetricCard({ title, value, change, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
  };
  
  return (
    <Card className="text-center">
      <div className={`text-3xl mb-2 ${colorClasses[color]}`}>{icon}</div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      {change && (
        <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
        </p>
      )}
    </Card>
  );
});

const ActivityItem = memo(function ActivityItem({ activity }) {
  const typeIcons = {
    user_signup: '👤',
    service_deployed: '🚀',
    payment_received: '💰',
    system_update: '🔄',
  };
  
  return (
    <div className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
      <div className="text-2xl">{typeIcons[activity.type] || '📝'}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
        <p className="text-xs text-gray-500">{formatRelativeTime(activity.timestamp)}</p>
      </div>
    </div>
  );
});

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    // Simulate API calls with mock data
    setMetrics(mockAnalyticsData.metrics);
    setChartData(mockAnalyticsData.chartData);
    setActivities(mockAnalyticsData.recentActivity);
  }, []);
  
  if (!metrics) {
    return (
      <Layout title="Dashboard - Aranya One">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading dashboard...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Dashboard - Aranya One">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your digital empire control center</p>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Users"
            value={formatNumber(metrics.totalUsers)}
            change={metrics.growth}
            icon="👥"
            color="blue"
          />
          <MetricCard
            title="Active Users"
            value={formatNumber(metrics.activeUsers)}
            change={15.2}
            icon="✅"
            color="green"
          />
          <MetricCard
            title="Revenue"
            value={formatCurrency(metrics.revenue)}
            change={23.5}
            icon="💰"
            color="yellow"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change={-1.2}
            icon="📈"
            color="purple"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Card.Header>
              <Card.Title>User Growth</Card.Title>
            </Card.Header>
            <Card.Content>
              <LineChart
                data={chartData?.userGrowth || []}
                width={450}
                height={300}
                color="#3b82f6"
              />
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>Service Usage</Card.Title>
            </Card.Header>
            <Card.Content>
              <BarChart
                data={chartData?.serviceUsage || []}
                width={450}
                height={300}
                color="#10b981"
              />
            </Card.Content>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <Card.Title>Revenue Trend</Card.Title>
              </Card.Header>
              <Card.Content>
                <LineChart
                  data={chartData?.revenue || []}
                  width={600}
                  height={300}
                  color="#f59e0b"
                />
              </Card.Content>
            </Card>
          </div>
          
          <Card>
            <Card.Header>
              <Card.Title>Recent Activity</Card.Title>
            </Card.Header>
            <Card.Content className="max-h-64 overflow-y-auto">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </Card.Content>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
