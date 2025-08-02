import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';

export default function GrowthAnalytics() {
  const [activeTimeframe, setActiveTimeframe] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('users');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);

  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 2847,
    revenue: 45670,
    conversionRate: 3.2,
    growthRate: 15.8,
    churnRate: 2.1
  });

  const [trendingMetrics, setTrendingMetrics] = useState([
    { metric: 'User Acquisition', value: '+18%', trend: 'up', color: 'green' },
    { metric: 'Revenue Growth', value: '+24%', trend: 'up', color: 'blue' },
    { metric: 'Engagement Rate', value: '+12%', trend: 'up', color: 'purple' },
    { metric: 'Churn Rate', value: '-8%', trend: 'down', color: 'red' },
    { metric: 'Customer LTV', value: '+31%', trend: 'up', color: 'orange' }
  ]);

  const growthMetrics = [
    {
      id: 'users',
      name: 'User Growth',
      icon: '👥',
      description: 'Track user acquisition, activation, and retention patterns',
      color: 'blue',
      value: '2,847',
      change: '+18%',
      chartData: [120, 145, 167, 189, 234, 278, 312, 356, 401, 445, 498, 567]
    },
    {
      id: 'revenue',
      name: 'Revenue Analytics',
      icon: '💰',
      description: 'Monitor revenue streams, trends, and forecasting',
      color: 'green',
      value: '$45.6K',
      change: '+24%',
      chartData: [2100, 2300, 2800, 3200, 3800, 4200, 4800, 5400, 6100, 6800, 7500, 8300]
    },
    {
      id: 'engagement',
      name: 'Engagement Metrics',
      icon: '📈',
      description: 'Analyze user behavior, session time, and interaction rates',
      color: 'purple',
      value: '68.5%',
      change: '+12%',
      chartData: [45, 48, 52, 55, 59, 62, 64, 67, 69, 71, 74, 76]
    },
    {
      id: 'conversion',
      name: 'Conversion Funnels',
      icon: '🎯',
      description: 'Optimize conversion rates across all customer touchpoints',
      color: 'orange',
      value: '3.2%',
      change: '+8%',
      chartData: [2.1, 2.3, 2.5, 2.7, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6]
    }
  ];

  const analyticsModules = [
    {
      name: 'Predictive Modeling',
      icon: '🔮',
      description: 'AI-powered forecasting using Stanford machine learning algorithms',
      features: ['Revenue prediction', 'User growth forecasting', 'Churn prediction', 'Market trends'],
      technology: 'Stanford ML + MIT Algorithms'
    },
    {
      name: 'Cohort Analysis',
      icon: '📊',
      description: 'Deep dive into user behavior patterns and retention analytics',
      features: ['User cohorts', 'Retention curves', 'Behavioral segmentation', 'LTV analysis'],
      technology: 'Harvard Behavioral Science'
    },
    {
      name: 'Real-time Insights',
      icon: '⚡',
      description: 'Live data processing with NASA-level precision and reliability',
      features: ['Live dashboards', 'Instant alerts', 'Real-time metrics', 'Event tracking'],
      technology: 'NASA Real-time Systems'
    },
    {
      name: 'Growth Optimization',
      icon: '🚀',
      description: 'IIT-developed optimization strategies for sustainable growth',
      features: ['A/B testing', 'Feature impact', 'Growth experiments', 'ROI analysis'],
      technology: 'IIT Innovation Methods'
    }
  ];

  const timeframeOptions = [
    { id: '1d', name: '24 Hours', shortName: '1D' },
    { id: '7d', name: '7 Days', shortName: '7D' },
    { id: '30d', name: '30 Days', shortName: '30D' },
    { id: '90d', name: '90 Days', shortName: '90D' },
    { id: '1y', name: '1 Year', shortName: '1Y' }
  ];

  const insightCards = [
    {
      title: 'User Acquisition Surge',
      type: 'Opportunity',
      icon: '🚀',
      description: 'Social media campaigns driving 40% increase in new users',
      impact: 'High',
      color: 'green'
    },
    {
      title: 'Revenue Optimization',
      type: 'Trend',
      icon: '💎',
      description: 'Premium features showing 65% higher conversion rates',
      impact: 'Medium',
      color: 'blue'
    },
    {
      title: 'Engagement Patterns',
      type: 'Insight',
      icon: '📱',
      description: 'Mobile users spending 38% more time on platform',
      impact: 'Medium',
      color: 'purple'
    },
    {
      title: 'Churn Prevention Alert',
      type: 'Warning',
      icon: '⚠️',
      description: '12% of premium users showing disengagement signals',
      impact: 'High',
      color: 'orange'
    }
  ];

  const kpiCategories = [
    {
      name: 'Growth KPIs',
      metrics: [
        { name: 'Monthly Active Users', value: '28.4K', change: '+15%' },
        { name: 'New User Acquisition', value: '1.2K', change: '+22%' },
        { name: 'User Retention (30d)', value: '78%', change: '+5%' },
        { name: 'Viral Coefficient', value: '1.8', change: '+12%' }
      ]
    },
    {
      name: 'Revenue KPIs',
      metrics: [
        { name: 'Monthly Recurring Revenue', value: '$45.6K', change: '+18%' },
        { name: 'Customer LTV', value: '$1,234', change: '+24%' },
        { name: 'Average Revenue Per User', value: '$56', change: '+8%' },
        { name: 'Revenue Growth Rate', value: '24%', change: '+6%' }
      ]
    },
    {
      name: 'Engagement KPIs',
      metrics: [
        { name: 'Session Duration', value: '12m 34s', change: '+14%' },
        { name: 'Pages Per Session', value: '4.2', change: '+9%' },
        { name: 'Bounce Rate', value: '32%', change: '-11%' },
        { name: 'Feature Adoption', value: '67%', change: '+19%' }
      ]
    }
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 8),
        revenue: prev.revenue + Math.floor(Math.random() * 500 - 200),
        conversionRate: Math.max(0, prev.conversionRate + (Math.random() - 0.5) * 0.1),
        growthRate: Math.max(0, prev.growthRate + (Math.random() - 0.5) * 0.5),
        churnRate: Math.max(0, prev.churnRate + (Math.random() - 0.5) * 0.1)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    setReportProgress(0);

    const steps = [
      { progress: 15, message: 'Collecting data from all touchpoints...' },
      { progress: 30, message: 'Analyzing user behavior patterns with MIT algorithms...' },
      { progress: 50, message: 'Running predictive models with Stanford ML...' },
      { progress: 70, message: 'Generating insights with Harvard behavioral science...' },
      { progress: 85, message: 'Optimizing growth strategies with IIT methods...' },
      { progress: 100, message: 'Comprehensive growth report ready!' }
    ];

    for (const step of steps) {
      setReportProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 1800));
    }

    setTimeout(() => {
      setIsGeneratingReport(false);
      setReportProgress(0);
    }, 1500);
  };

  const MetricCard = ({ metric, isSelected, onSelect }) => (
    <div 
      onClick={() => onSelect(metric.id)}
      className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
        isSelected ? `border-${metric.color}-500 bg-${metric.color}-50` : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{metric.icon}</div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
          <div className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {metric.change}
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{metric.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{metric.description}</p>
      
      {/* Mini Chart */}
      <div className="flex items-end space-x-1 h-8">
        {metric.chartData.map((value, index) => (
          <div 
            key={index}
            className={`bg-${metric.color}-400 rounded-sm flex-1`}
            style={{ height: `${(value / Math.max(...metric.chartData)) * 100}%` }}
          ></div>
        ))}
      </div>
    </div>
  );

  const InsightCard = ({ insight }) => (
    <div className={`bg-white rounded-lg p-6 border-l-4 border-${insight.color}-500 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{insight.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{insight.title}</h3>
            <p className="text-sm text-gray-600">{insight.type}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          insight.impact === 'High' ? 'bg-red-100 text-red-800' :
          insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {insight.impact} Impact
        </span>
      </div>
      <p className="text-gray-700">{insight.description}</p>
      <div className="mt-4 flex space-x-3">
        <button className={`bg-${insight.color}-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-${insight.color}-700 transition-colors`}>
          View Details
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          Take Action
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>📊 Growth Analytics Dashboard - AI-Powered Business Intelligence | Aranya One</title>
        <meta name="description" content="Advanced growth analytics with AI insights and Stanford-level data science" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  📊 Growth Analytics
                  <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    AI-Powered BI
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">Advanced business intelligence with predictive analytics</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleGenerateReport}
                  disabled={isGeneratingReport}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {isGeneratingReport ? '⏳ Generating...' : '📋 Generate Report'}
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  📈 Forecasting
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Metrics Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex space-x-6">
                <span>👥 Active Users: {realTimeData.activeUsers.toLocaleString()}</span>
                <span>💰 Revenue: ${realTimeData.revenue.toLocaleString()}</span>
                <span>🎯 Conversion: {realTimeData.conversionRate.toFixed(1)}%</span>
                <span>📈 Growth Rate: {realTimeData.growthRate.toFixed(1)}%</span>
                <span>📉 Churn: {realTimeData.churnRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🟢 Real-time Data Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">

          {/* Report Generation Progress */}
          {isGeneratingReport && (
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">🤖</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  AI Growth Analysis in Progress
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {reportProgress <= 15 && 'Collecting data from all touchpoints...'}
                  {reportProgress > 15 && reportProgress <= 30 && 'Analyzing user behavior patterns with MIT algorithms...'}
                  {reportProgress > 30 && reportProgress <= 50 && 'Running predictive models with Stanford ML...'}
                  {reportProgress > 50 && reportProgress <= 70 && 'Generating insights with Harvard behavioral science...'}
                  {reportProgress > 70 && reportProgress <= 85 && 'Optimizing growth strategies with IIT methods...'}
                  {reportProgress > 85 && 'Comprehensive growth report ready!'}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${reportProgress}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  {analyticsModules.map((module, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-2xl mb-2">{module.icon}</div>
                      <div className="font-semibold text-blue-800 mb-1">{module.name}</div>
                      <div className="text-blue-600 text-xs">{module.technology}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Timeframe Selector */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
              <div className="flex space-x-1">
                {timeframeOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setActiveTimeframe(option.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTimeframe === option.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {option.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Metrics */}
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              🔥 Trending Metrics
              <span className="ml-3 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Real-time
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {trendingMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'purple' ? 'text-purple-600' :
                    metric.color === 'red' ? 'text-red-600' :
                    'text-orange-600'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.metric}</div>
                  <div className={`text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.trend === 'up' ? '↗️' : '↘️'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Growth Metrics */}
          <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Core Growth Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {growthMetrics.map(metric => (
                <MetricCard 
                  key={metric.id}
                  metric={metric}
                  isSelected={selectedMetric === metric.id}
                  onSelect={setSelectedMetric}
                />
              ))}
            </div>
          </div>

          {/* KPI Grid */}
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {kpiCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{category.name}</h3>
                <div className="space-y-4">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{metric.name}</div>
                        <div className="text-lg font-bold text-blue-600">{metric.value}</div>
                      </div>
                      <div className={`text-sm font-medium ${
                        metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              🤖 AI-Powered Insights
              <span className="ml-3 text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                Auto-Generated
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insightCards.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </div>
          </div>

          {/* Analytics Modules */}
          <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔬 Advanced Analytics Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analyticsModules.map((module, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{module.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{module.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{module.technology}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {module.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-sm text-gray-500 flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Activate Module
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🏛️ World-Class Growth Analytics Platform
              </h3>
              <p className="text-gray-600 mb-4">
                AI-powered business intelligence with Stanford ML, Harvard psychology, MIT algorithms, and NASA precision
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>📊 Real-time Analytics</span>
                <span>🔮 Predictive Modeling</span>
                <span>🎯 Growth Optimization</span>
                <span>🤖 AI-Powered Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
