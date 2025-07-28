'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  LineChart, 
  Target, 
  Brain, 
  Database, 
  Globe,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Award,
  Zap,
  Eye,
  Download,
  Share2,
  Filter,
  Search,
  Settings,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Grid,
  Map,
  Gauge,
  AlertCircle,
  CheckCircle,
  Info,
  Sparkles,
  Building,
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  Star,
  ThumbsUp,
  MessageSquare,
  Phone
} from 'lucide-react'

const BusinessIntelligence = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [isLoading, setIsLoading] = useState(false)

  // Key Performance Indicators
  const kpis = [
    {
      id: 'revenue',
      name: 'Total Revenue',
      value: '$847,294',
      change: '+12.5%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: DollarSign
    },
    {
      id: 'customers',
      name: 'Active Customers',
      value: '12,847',
      change: '+8.7%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: Users
    },
    {
      id: 'orders',
      name: 'Total Orders',
      value: '3,294',
      change: '+15.2%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: ShoppingCart
    },
    {
      id: 'conversion',
      name: 'Conversion Rate',
      value: '3.87%',
      change: '-2.1%',
      trend: 'down',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: Target
    },
    {
      id: 'retention',
      name: 'Customer Retention',
      value: '89.4%',
      change: '+4.3%',
      trend: 'up',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      icon: Award
    },
    {
      id: 'satisfaction',
      name: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: Star
    }
  ]

  // Sales data for charts
  const salesData = [
    { month: 'Jan', revenue: 65000, orders: 450, customers: 890 },
    { month: 'Feb', revenue: 72000, orders: 520, customers: 920 },
    { month: 'Mar', revenue: 68000, orders: 480, customers: 850 },
    { month: 'Apr', revenue: 89000, orders: 650, customers: 1100 },
    { month: 'May', revenue: 94000, orders: 720, customers: 1250 },
    { month: 'Jun', revenue: 102000, orders: 800, customers: 1400 },
    { month: 'Jul', revenue: 118000, orders: 920, customers: 1600 }
  ]

  // Customer segments
  const customerSegments = [
    { name: 'Enterprise', value: 35, color: 'bg-blue-500', customers: 1250, revenue: 425000 },
    { name: 'SMB', value: 28, color: 'bg-green-500', customers: 3200, revenue: 280000 },
    { name: 'Startup', value: 22, color: 'bg-purple-500', customers: 2800, revenue: 180000 },
    { name: 'Individual', value: 15, color: 'bg-orange-500', customers: 5600, revenue: 95000 }
  ]

  // Top products
  const topProducts = [
    { name: 'AI Analytics Pro', sales: 1250, revenue: 125000, growth: '+22%' },
    { name: 'Business Intelligence Suite', sales: 890, revenue: 89000, growth: '+18%' },
    { name: 'Performance Optimizer', sales: 760, revenue: 76000, growth: '+15%' },
    { name: 'Customer Insights Platform', sales: 620, revenue: 62000, growth: '+28%' },
    { name: 'Marketing Automation', sales: 540, revenue: 54000, growth: '+12%' }
  ]

  // Regional performance
  const regionalData = [
    { region: 'North America', revenue: 380000, growth: '+15%', customers: 5200 },
    { region: 'Europe', revenue: 290000, growth: '+12%', customers: 3800 },
    { region: 'Asia Pacific', revenue: 180000, growth: '+25%', customers: 2900 },
    { region: 'Latin America', revenue: 95000, growth: '+18%', customers: 1200 }
  ]

  // Predictive insights
  const predictions = [
    {
      title: 'Revenue Forecast',
      prediction: '+18% growth expected next quarter',
      confidence: '92%',
      impact: 'High',
      recommendation: 'Increase marketing spend in high-performing segments'
    },
    {
      title: 'Customer Churn Risk',
      prediction: '8.5% of customers at risk in next 30 days',
      confidence: '87%',
      impact: 'Medium',
      recommendation: 'Launch retention campaign for at-risk customers'
    },
    {
      title: 'Market Opportunity',
      prediction: 'New market segment identified with $2M potential',
      confidence: '79%',
      impact: 'High',
      recommendation: 'Develop targeted product offering for identified segment'
    }
  ]

  const tabs = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
    { id: 'analytics', label: 'Advanced Analytics', icon: TrendingUp },
    { id: 'customers', label: 'Customer Intelligence', icon: Users },
    { id: 'products', label: 'Product Performance', icon: Package },
    { id: 'predictions', label: 'Predictive Insights', icon: Brain },
    { id: 'reports', label: 'Reports', icon: FileText }
  ]

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ]

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <motion.div
            key={kpi.id}
            whileHover={{ y: -2 }}
            className={`${kpi.bgColor} rounded-xl p-6 border border-gray-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
              <div className={`flex items-center text-sm ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {kpi.change}
              </div>
            </div>
            <div className={`text-2xl font-bold ${kpi.color} mb-2`}>
              {kpi.value}
            </div>
            <div className="text-sm text-gray-600">
              {kpi.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Revenue Trend</h3>
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <LineChart className="w-16 h-16 mx-auto text-blue-400 mb-4" />
            <p className="text-gray-600">Interactive revenue chart</p>
            <p className="text-sm text-gray-500">Showing 7-month revenue trend</p>
          </div>
        </div>
      </div>

      {/* Customer Segments & Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Segments */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Customer Segments</h3>
          <div className="space-y-4">
            {customerSegments.map((segment, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 ${segment.color} rounded-full mr-4`} />
                  <div>
                    <h4 className="font-semibold">{segment.name}</h4>
                    <p className="text-sm text-gray-600">{segment.customers.toLocaleString()} customers</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${segment.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{segment.value}%</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Regional Performance</h3>
          <div className="space-y-4">
            {regionalData.map((region, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold">{region.region}</h4>
                  <p className="text-sm text-gray-600">{region.customers.toLocaleString()} customers</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${region.revenue.toLocaleString()}</div>
                  <div className="text-sm text-green-600">{region.growth}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPredictions = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-blue-600" />
          AI-Powered Predictive Insights
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {predictions.map((prediction, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">{prediction.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  prediction.impact === 'High' ? 'bg-red-100 text-red-800' :
                  prediction.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {prediction.impact} Impact
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{prediction.prediction}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  Confidence: <span className="font-medium">{prediction.confidence}</span>
                </div>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: prediction.confidence }}
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-800 mb-2">Recommendation:</h5>
                <p className="text-sm text-blue-700">{prediction.recommendation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6">Revenue Forecast</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 mx-auto text-green-400 mb-4" />
            <p className="text-gray-600">Predictive revenue model</p>
            <p className="text-sm text-gray-500">AI-powered 12-month forecast</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCustomers = () => (
    <div className="space-y-8">
      {/* Customer Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <Users className="w-8 h-8 text-blue-600 mb-4" />
          <div className="text-2xl font-bold text-blue-600 mb-2">12,847</div>
          <div className="text-sm text-gray-600">Total Customers</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
          <div className="text-2xl font-bold text-green-600 mb-2">89.4%</div>
          <div className="text-sm text-gray-600">Retention Rate</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <DollarSign className="w-8 h-8 text-purple-600 mb-4" />
          <div className="text-2xl font-bold text-purple-600 mb-2">$847</div>
          <div className="text-sm text-gray-600">Avg Order Value</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <Star className="w-8 h-8 text-yellow-600 mb-4" />
          <div className="text-2xl font-bold text-yellow-600 mb-2">4.8/5</div>
          <div className="text-sm text-gray-600">Satisfaction Score</div>
        </motion.div>
      </div>

      {/* Customer Behavior Analysis */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6">Customer Behavior Analysis</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-16 h-16 mx-auto text-purple-400 mb-4" />
            <p className="text-gray-600">Customer journey analytics</p>
            <p className="text-sm text-gray-500">Behavioral patterns and insights</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4"
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Business Intelligence
                </h1>
                <p className="text-gray-600">Advanced analytics & predictive insights platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center"
              >
                <Brain className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI Active</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg transition-all"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                className={`flex items-center px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'predictions' && renderPredictions()}
            {activeTab === 'customers' && renderCustomers()}
            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Analytics</h3>
                <p className="text-gray-600">Deep dive analytics and custom reports</p>
              </div>
            )}
            {activeTab === 'products' && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Product Performance</h3>
                <p className="text-gray-600">Product analytics and optimization insights</p>
              </div>
            )}
            {activeTab === 'reports' && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Reports</h3>
                <p className="text-gray-600">Automated reporting and data exports</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BusinessIntelligence
