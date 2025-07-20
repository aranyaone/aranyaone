import Head from 'next/head';
import { useState, useEffect } from 'react';
import AdminProtection from '../../components/admin/AdminProtection';
import { useAuth } from '../../contexts/AuthContext';

// Mock metrics data - replace with real API calls in production
const mockMetrics = {
  revenue: {
    current: 15450,
    previous: 12300,
    change: 25.6,
    trend: [8500, 9200, 10100, 11500, 12300, 13800, 15450]
  },
  signups: {
    current: 234,
    previous: 189,
    change: 23.8,
    trend: [145, 156, 167, 178, 189, 212, 234]
  },
  activeUsers: {
    current: 1847,
    previous: 1692,
    change: 9.2,
    trend: [1234, 1345, 1456, 1567, 1692, 1789, 1847]
  },
  feedback: {
    pending: 12,
    approved: 89,
    rejected: 15,
    total: 116
  }
};

const MetricCard = ({ title, value, previousValue, change, icon, format = 'number' }) => {
  const isPositive = change > 0;
  
  const formatValue = (val) => {
    if (format === 'currency') return `$${val.toLocaleString()}`;
    return val.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{formatValue(value)}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
      
      <div className="mt-4 flex items-center">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isPositive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isPositive ? '↗' : '↘'} {Math.abs(change).toFixed(1)}%
        </span>
        <span className="ml-2 text-sm text-gray-600">
          from {formatValue(previousValue)}
        </span>
      </div>
    </div>
  );
};

const SimpleChart = ({ data, title, color = 'blue' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="flex items-end space-x-2 h-32">
        {data.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center"
            >
              <div
                className={`w-full bg-${color}-500 rounded-t transition-all duration-300 hover:bg-${color}-600`}
                style={{ height: `${height}%` }}
                title={`Day ${index + 1}: ${value.toLocaleString()}`}
              />
              <span className="text-xs text-gray-600 mt-1">
                {index + 1}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">
        Last 7 days
      </div>
    </div>
  );
};

export default function AdminMetrics() {
  const { user, logout } = useAuth();
  const [metrics, setMetrics] = useState(mockMetrics);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMetrics(mockMetrics);
      setLoading(false);
    }, 1000);
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Admin Metrics - Aranya One</title>
          <meta name="description" content="Admin metrics dashboard" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  📊 Admin Panel - Metrics
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Monitor key business metrics and performance
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={refreshData}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? '🔄 Loading...' : '🔄 Refresh'}
                </button>
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <a
                href="/admin/metrics"
                className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 text-sm font-medium"
              >
                📊 Metrics
              </a>
              <a
                href="/admin/users"
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
              >
                👥 Users
              </a>
              <a
                href="/admin/feedback"
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
              >
                📝 Feedback
              </a>
              <a
                href="/admin/toggles"
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
              >
                🔧 Toggles
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                title="Monthly Revenue"
                value={metrics.revenue.current}
                previousValue={metrics.revenue.previous}
                change={metrics.revenue.change}
                icon="💰"
                format="currency"
              />
              <MetricCard
                title="New Signups"
                value={metrics.signups.current}
                previousValue={metrics.signups.previous}
                change={metrics.signups.change}
                icon="👥"
              />
              <MetricCard
                title="Active Users"
                value={metrics.activeUsers.current}
                previousValue={metrics.activeUsers.previous}
                change={metrics.activeUsers.change}
                icon="📈"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <SimpleChart
                data={metrics.revenue.trend}
                title="Revenue Trend"
                color="green"
              />
              <SimpleChart
                data={metrics.signups.trend}
                title="Signup Trend"
                color="blue"
              />
            </div>

            {/* Feedback Overview */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">📝 Feedback Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{metrics.feedback.pending}</div>
                  <div className="text-sm text-gray-600">Pending Review</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{metrics.feedback.approved}</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{metrics.feedback.rejected}</div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{metrics.feedback.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="/admin/feedback"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Manage Feedback →
                </a>
              </div>
            </div>

          </div>
        </main>

        {/* Quick Actions */}
        <div className="fixed bottom-4 right-4">
          <a
            href="/"
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="Back to Home"
          >
            🏠
          </a>
        </div>
      </div>
    </AdminProtection>
  );
}