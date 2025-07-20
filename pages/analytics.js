import Head from "next/head"
import { useState } from 'react'
import { LineChart, BarChart, PieChart, AreaChart, ChartContainer, sampleData } from '../components/Charts'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from '../components/SmartNotification'

export default function AnalyticsPage() {
  const { user } = useAuth()
  const { info } = useNotifications()
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ]

  const metrics = [
    { value: 'revenue', label: 'Revenue', icon: '💰' },
    { value: 'users', label: 'Users', icon: '👥' },
    { value: 'conversions', label: 'Conversions', icon: '🎯' },
    { value: 'engagement', label: 'Engagement', icon: '❤️' }
  ]

  const handleExport = () => {
    info('Analytics data exported successfully!', {
      title: 'Export Complete',
      duration: 3000
    })
  }

  return (
    <div>
      <Head>
        <title>Analytics Dashboard - Aranya One</title>
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Analytics Dashboard</h1>
              <p className="text-gray-600">Deep insights into your empire's performance and growth</p>
            </div>
            <button 
              onClick={handleExport}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              📥 Export Data
            </button>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 mb-8">
            <div className="flex flex-wrap items-center gap-6">
              
              {/* Time Range Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Metric Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Metric</label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {metrics.map(metric => (
                    <option key={metric.value} value={metric.value}>
                      {metric.icon} {metric.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Real-time Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Real-time Updates</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-600">Auto-refresh</span>
                </label>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="Total Revenue" 
              value="₹2,45,890" 
              change="+23.5%" 
              trend="up"
              icon="💰"
            />
            <MetricCard 
              title="Active Users" 
              value="12,847" 
              change="+18.2%" 
              trend="up"
              icon="👥"
            />
            <MetricCard 
              title="Conversion Rate" 
              value="3.24%" 
              change="+5.1%" 
              trend="up"
              icon="🎯"
            />
            <MetricCard 
              title="Avg. Session" 
              value="4m 32s" 
              change="-2.1%" 
              trend="down"
              icon="⏱️"
            />
          </div>

          {/* Main Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Primary Trend Chart */}
            <div className="lg:col-span-2">
              <ChartContainer title={`📈 ${metrics.find(m => m.value === selectedMetric)?.label} Trend (${selectedTimeRange})`}>
                <AreaChart 
                  data={sampleData.revenue} 
                  width={800} 
                  height={300} 
                  color="#3B82F6" 
                />
              </ChartContainer>
            </div>

            {/* Service Performance */}
            <ChartContainer title="🛠️ Service Performance">
              <PieChart 
                data={sampleData.services} 
                size={300} 
              />
            </ChartContainer>

            {/* User Acquisition */}
            <ChartContainer title="📈 User Acquisition">
              <BarChart 
                data={sampleData.users} 
                width={400} 
                height={250} 
                color="#10B981" 
              />
            </ChartContainer>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            {/* Traffic Sources */}
            <TrafficSources />
            
            {/* Top Performing Content */}
            <TopContent />
            
            {/* Conversion Funnel */}
            <ConversionFunnel />
          </div>

          {/* Advanced Analytics */}
          <AdvancedAnalytics />

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, change, trend, icon }) {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600'
  const trendIcon = trend === 'up' ? '↗️' : '↘️'

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl">{icon}</div>
        <span className={`text-sm font-medium ${trendColor}`}>
          {trendIcon} {change}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  )
}

function TrafficSources() {
  const sources = [
    { name: 'Direct', value: '45.2%', color: 'bg-blue-500' },
    { name: 'Google', value: '28.1%', color: 'bg-green-500' },
    { name: 'Social Media', value: '16.7%', color: 'bg-purple-500' },
    { name: 'Referrals', value: '10.0%', color: 'bg-yellow-500' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">🌐 Traffic Sources</h3>
      <div className="space-y-3">
        {sources.map((source, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
              <span className="text-sm text-gray-700">{source.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{source.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopContent() {
  const content = [
    { title: 'AI Chat Guide', views: '12.4K', engagement: '89%' },
    { title: 'SEO Best Practices', views: '8.9K', engagement: '76%' },
    { title: 'Dashboard Tutorial', views: '7.2K', engagement: '82%' },
    { title: 'API Documentation', views: '5.8K', engagement: '71%' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">🔥 Top Performing Content</h3>
      <div className="space-y-3">
        {content.map((item, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-800 mb-1">{item.title}</h4>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>👁️ {item.views} views</span>
              <span>❤️ {item.engagement} engagement</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConversionFunnel() {
  const funnelData = [
    { stage: 'Visitors', count: '10,000', percentage: '100%' },
    { stage: 'Sign-ups', count: '2,500', percentage: '25%' },
    { stage: 'Trial Users', count: '1,800', percentage: '18%' },
    { stage: 'Paid Users', count: '540', percentage: '5.4%' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Conversion Funnel</h3>
      <div className="space-y-3">
        {funnelData.map((stage, i) => (
          <div key={i} className="relative">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
              <span className="text-sm text-gray-600">{stage.percentage}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: stage.percentage }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{stage.count} users</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdvancedAnalytics() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🔬 Advanced Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdvancedMetric 
          title="Customer Lifetime Value" 
          value="₹15,420" 
          subtitle="Avg. per customer"
          icon="💎"
        />
        <AdvancedMetric 
          title="Churn Rate" 
          value="2.3%" 
          subtitle="Monthly churn"
          icon="📉"
        />
        <AdvancedMetric 
          title="Revenue per User" 
          value="₹1,847" 
          subtitle="Monthly ARPU"
          icon="👤"
        />
        <AdvancedMetric 
          title="Growth Rate" 
          value="23.5%" 
          subtitle="Month over month"
          icon="🚀"
        />
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💡</span>
          <h4 className="font-semibold text-blue-800">AI Insights</h4>
        </div>
        <p className="text-blue-700 text-sm">
          Your conversion rate increased by 15% this week. Consider scaling your successful marketing campaigns.
          User engagement is highest on Tuesdays and Fridays between 2-4 PM.
        </p>
      </div>
    </div>
  )
}

function AdvancedMetric({ title, value, subtitle, icon }) {
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  )
}
