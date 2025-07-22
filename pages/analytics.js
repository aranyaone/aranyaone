import { memo, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { mockAnalyticsData } from '../data/mockData';
import { formatNumber, formatCurrency, formatDate } from '../utils';

const StatCard = memo(function StatCard({ title, value, trend, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };
  
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-16 h-16 ${colorClasses[color]} opacity-10 rounded-bl-full`}></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]} text-white`}>
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
        {trend && (
          <div className="mt-2 flex items-center">
            <span className={`text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '↗' : '↘'} {trend.value}%
            </span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  );
});

const TopPageItem = memo(function TopPageItem({ page, index }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{page.path}</p>
          <p className="text-xs text-gray-500">{formatNumber(page.uniqueViews)} unique views</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-gray-900">{formatNumber(page.views)}</p>
        <p className="text-xs text-gray-500">total views</p>
      </div>
    </div>
  );
});

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  
  useEffect(() => {
    // Simulate API call with mock data
    setData(mockAnalyticsData);
  }, [selectedTimeRange]);
  
  if (!data) {
    return (
      <Layout title="Analytics - Aranya One">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading analytics...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Analytics - Aranya One">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📊 Analytics Dashboard</h1>
            <p className="text-gray-600">Track your digital empire's performance</p>
          </div>
          
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <Button
                key={range}
                variant={selectedTimeRange === range ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={formatNumber(data.metrics.totalUsers)}
            trend={{ positive: true, value: 12.5 }}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="Active Users"
            value={formatNumber(data.metrics.activeUsers)}
            trend={{ positive: true, value: 8.3 }}
            icon="✅"
            color="green"
          />
          <StatCard
            title="Revenue"
            value={formatCurrency(data.metrics.revenue)}
            trend={{ positive: true, value: 23.1 }}
            icon="💰"
            color="yellow"
          />
          <StatCard
            title="Conversion Rate"
            value={`${data.metrics.conversionRate}%`}
            trend={{ positive: false, value: 2.1 }}
            icon="📈"
            color="purple"
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Card.Header>
              <Card.Title>User Growth Trend</Card.Title>
            </Card.Header>
            <Card.Content>
              <LineChart
                data={data.chartData.userGrowth}
                width={500}
                height={300}
                color="#3b82f6"
              />
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>Revenue Growth</Card.Title>
            </Card.Header>
            <Card.Content>
              <LineChart
                data={data.chartData.revenue}
                width={500}
                height={300}
                color="#10b981"
              />
            </Card.Content>
          </Card>
        </div>
        
        {/* Service Usage and Top Pages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Card.Header>
              <Card.Title>Service Usage</Card.Title>
            </Card.Header>
            <Card.Content>
              <BarChart
                data={data.chartData.serviceUsage}
                width={500}
                height={300}
                color="#f59e0b"
              />
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>Top Pages</Card.Title>
            </Card.Header>
            <Card.Content className="max-h-80 overflow-y-auto">
              {data.topPages.map((page, index) => (
                <TopPageItem key={page.path} page={page} index={index} />
              ))}
            </Card.Content>
          </Card>
        </div>
        
        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <Card.Content>
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900">Bounce Rate</h3>
              <p className="text-2xl font-bold text-red-600">{data.metrics.bounceRate}%</p>
              <p className="text-sm text-gray-500 mt-1">2.3% improvement</p>
            </Card.Content>
          </Card>
          
          <Card className="text-center">
            <Card.Content>
              <div className="text-4xl mb-2">⏱️</div>
              <h3 className="text-lg font-semibold text-gray-900">Avg. Session</h3>
              <p className="text-2xl font-bold text-blue-600">4m 32s</p>
              <p className="text-sm text-gray-500 mt-1">15s increase</p>
            </Card.Content>
          </Card>
          
          <Card className="text-center">
            <Card.Content>
              <div className="text-4xl mb-2">🌍</div>
              <h3 className="text-lg font-semibold text-gray-900">Countries</h3>
              <p className="text-2xl font-bold text-green-600">47</p>
              <p className="text-sm text-gray-500 mt-1">3 new this month</p>
            </Card.Content>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
