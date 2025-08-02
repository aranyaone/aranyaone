'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, 
  TrendingUp, 
  BarChart3, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Eye,
  Brain,
  Activity,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  Zap,
  Target,
  Users,
  DollarSign,
  ShoppingCart,
  Building,
  Smartphone,
  Wifi,
  Car,
  Home,
  Heart,
  BookOpen,
  Music,
  Camera,
  Coffee,
  Plane,
  Star,
  ThumbsUp,
  MessageSquare,
  Settings,
  RefreshCw,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  MoreHorizontal,
  ChevronRight,
  ExternalLink,
  Bookmark,
  Flag,
  MapPin,
  Layers,
  PieChart,
  LineChart,
  Gauge,
  Sparkles,
  Compass,
  Navigation,
  Radar
} from 'lucide-react'

const GlobalTrendAnalyzer = () => {
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [timeframe, setTimeframe] = useState('7d')
  const [viewMode, setViewMode] = useState('trends')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Global trending topics
  const globalTrends = [
    {
      id: 1,
      title: 'Artificial Intelligence Revolution',
      category: 'Technology',
      score: 98,
      change: '+245%',
      region: 'Global',
      volume: '12.5M',
      sentiment: 'positive',
      keywords: ['AI', 'Machine Learning', 'ChatGPT', 'Automation'],
      description: 'AI adoption accelerating across industries worldwide'
    },
    {
      id: 2,
      title: 'Sustainable Energy Transition',
      category: 'Environment',
      score: 94,
      change: '+189%',
      region: 'Global',
      volume: '8.7M',
      sentiment: 'positive',
      keywords: ['Solar', 'Wind', 'Electric Vehicles', 'Green Tech'],
      description: 'Renewable energy adoption reaching new milestones'
    },
    {
      id: 3,
      title: 'Remote Work Evolution',
      category: 'Business',
      score: 91,
      change: '+156%',
      region: 'Global',
      volume: '6.3M',
      sentiment: 'neutral',
      keywords: ['Remote Work', 'Hybrid', 'Digital Nomad', 'Productivity'],
      description: 'Workplace transformation continues post-pandemic'
    },
    {
      id: 4,
      title: 'Cryptocurrency Regulation',
      category: 'Finance',
      score: 88,
      change: '+134%',
      region: 'Global',
      volume: '5.9M',
      sentiment: 'mixed',
      keywords: ['Bitcoin', 'Ethereum', 'Regulation', 'DeFi'],
      description: 'Government policies shaping crypto landscape'
    },
    {
      id: 5,
      title: 'Mental Health Awareness',
      category: 'Health',
      score: 85,
      change: '+167%',
      region: 'Global',
      volume: '4.8M',
      sentiment: 'positive',
      keywords: ['Mental Health', 'Wellness', 'Therapy', 'Mindfulness'],
      description: 'Growing focus on psychological wellbeing globally'
    }
  ]

  // Regional data
  const regionalData = [
    {
      region: 'North America',
      growth: '+15.8%',
      volume: '45.2M',
      topTrend: 'AI & Tech Innovation',
      sentiment: 'Optimistic'
    },
    {
      region: 'Europe',
      growth: '+12.4%',
      volume: '38.7M',
      topTrend: 'Sustainable Development',
      sentiment: 'Cautious'
    },
    {
      region: 'Asia Pacific',
      growth: '+22.6%',
      volume: '67.3M',
      topTrend: 'Digital Transformation',
      sentiment: 'Positive'
    },
    {
      region: 'Latin America',
      growth: '+18.9%',
      volume: '28.4M',
      topTrend: 'Economic Recovery',
      sentiment: 'Hopeful'
    },
    {
      region: 'Middle East',
      growth: '+25.3%',
      volume: '19.8M',
      topTrend: 'Energy Transition',
      sentiment: 'Progressive'
    },
    {
      region: 'Africa',
      growth: '+31.7%',
      volume: '24.6M',
      topTrend: 'Mobile Innovation',
      sentiment: 'Emerging'
    }
  ]

  // Industry insights
  const industryInsights = [
    {
      industry: 'Technology',
      growth: '+28.5%',
      volume: '156.7M',
      hotTopics: ['AI/ML', 'Cloud Computing', 'Cybersecurity', 'IoT'],
      sentiment: 0.82,
      forecast: 'Bullish'
    },
    {
      industry: 'Healthcare',
      growth: '+19.3%',
      volume: '98.4M',
      hotTopics: ['Telemedicine', 'Gene Therapy', 'Digital Health', 'Biotech'],
      sentiment: 0.76,
      forecast: 'Positive'
    },
    {
      industry: 'Finance',
      growth: '+15.7%',
      volume: '89.2M',
      hotTopics: ['FinTech', 'DeFi', 'Digital Banking', 'RegTech'],
      sentiment: 0.68,
      forecast: 'Cautious'
    },
    {
      industry: 'Entertainment',
      growth: '+23.1%',
      volume: '127.5M',
      hotTopics: ['Streaming', 'Gaming', 'VR/AR', 'Creator Economy'],
      sentiment: 0.79,
      forecast: 'Strong'
    },
    {
      industry: 'Retail',
      growth: '+12.9%',
      volume: '76.8M',
      hotTopics: ['E-commerce', 'Social Commerce', 'Sustainability', 'Personalization'],
      sentiment: 0.71,
      forecast: 'Stable'
    }
  ]

  // Emerging topics
  const emergingTopics = [
    {
      topic: 'Quantum Computing Breakthroughs',
      momentum: 95,
      timeToTrend: '2-3 weeks',
      potential: 'High',
      sectors: ['Tech', 'Research', 'Defense']
    },
    {
      topic: 'Vertical Farming Revolution',
      momentum: 87,
      timeToTrend: '3-4 weeks',
      potential: 'Medium',
      sectors: ['Agriculture', 'Sustainability', 'Food']
    },
    {
      topic: 'Brain-Computer Interfaces',
      momentum: 82,
      timeToTrend: '4-6 weeks',
      potential: 'High',
      sectors: ['Healthcare', 'Tech', 'Research']
    },
    {
      topic: 'Space Tourism Expansion',
      momentum: 78,
      timeToTrend: '2-3 weeks',
      potential: 'Medium',
      sectors: ['Aerospace', 'Tourism', 'Tech']
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'health', label: 'Health' },
    { value: 'environment', label: 'Environment' },
    { value: 'finance', label: 'Finance' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' }
  ]

  const regions = [
    { value: 'global', label: 'Global' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east', label: 'Middle East' },
    { value: 'africa', label: 'Africa' }
  ]

  const timeframes = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ]

  const getSentimentColor = (sentiment) => {
    if (typeof sentiment === 'number') {
      if (sentiment >= 0.7) return 'text-green-600'
      if (sentiment >= 0.5) return 'text-yellow-600'
      return 'text-red-600'
    }
    
    switch(sentiment) {
      case 'positive': return 'text-green-600'
      case 'neutral': case 'mixed': return 'text-yellow-600'
      case 'negative': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getSentimentBg = (sentiment) => {
    if (typeof sentiment === 'number') {
      if (sentiment >= 0.7) return 'bg-green-100'
      if (sentiment >= 0.5) return 'bg-yellow-100'
      return 'bg-red-100'
    }
    
    switch(sentiment) {
      case 'positive': return 'bg-green-100'
      case 'neutral': case 'mixed': return 'bg-yellow-100'
      case 'negative': return 'bg-red-100'
      default: return 'bg-gray-100'
    }
  }

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  const renderTrendsView = () => (
    <div className="space-y-8">
      {/* Global Trends */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center">
            <Globe className="w-8 h-8 mr-3 text-blue-600" />
            Global Trending Topics
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startAnalysis}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center"
          >
            <Radar className="w-4 h-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
          </motion.button>
        </div>

        <div className="space-y-4">
          {globalTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">{trend.title}</h4>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getSentimentBg(trend.sentiment)} ${getSentimentColor(trend.sentiment)}`}>
                      {trend.sentiment}
                    </span>
                    <span className="text-green-600 font-medium flex items-center">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      {trend.change}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">{trend.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Volume: {trend.volume}</span>
                    <span>Category: {trend.category}</span>
                    <span>Score: {trend.score}/100</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {trend.keywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Regional Overview */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <MapPin className="w-8 h-8 mr-3 text-green-600" />
          Regional Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionalData.map((region, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">{region.region}</h4>
                <span className="text-green-600 font-medium">{region.growth}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Volume:</span>
                  <span className="text-sm font-medium">{region.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Top Trend:</span>
                  <span className="text-sm font-medium">{region.topTrend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sentiment:</span>
                  <span className="text-sm font-medium text-blue-600">{region.sentiment}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderIndustryView = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Building className="w-8 h-8 mr-3 text-purple-600" />
          Industry Analysis
        </h3>

        <div className="space-y-6">
          {industryInsights.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold">{industry.industry}</h4>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    industry.forecast === 'Bullish' ? 'bg-green-100 text-green-800' :
                    industry.forecast === 'Positive' || industry.forecast === 'Strong' ? 'bg-blue-100 text-blue-800' :
                    industry.forecast === 'Stable' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {industry.forecast}
                  </span>
                  <span className="text-green-600 font-medium">{industry.growth}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Hot Topics</h5>
                  <div className="flex flex-wrap gap-2">
                    {industry.hotTopics.map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white text-gray-700 text-sm rounded border">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Sentiment Score</h5>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className={`h-2 rounded-full ${getSentimentColor(industry.sentiment).replace('text-', 'bg-')}`}
                        style={{ width: `${industry.sentiment * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{(industry.sentiment * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Discussion Volume</h5>
                  <p className="text-lg font-semibold text-blue-600">{industry.volume}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEmergingView = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Sparkles className="w-8 h-8 mr-3 text-yellow-600" />
          Emerging Trends
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {emergingTopics.map((topic, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">{topic.topic}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  topic.potential === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {topic.potential} Potential
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Momentum</span>
                    <span>{topic.momentum}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{ width: `${topic.momentum}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Time to Trend:</span>
                  <span className="text-sm font-medium">{topic.timeToTrend}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Key Sectors:</span>
                  <div className="flex space-x-2 mt-1">
                    {topic.sectors.map((sector, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white text-gray-700 text-xs rounded border">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Predictions */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-blue-600" />
          AI Trend Predictions
        </h3>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <div className="text-center">
            <Activity className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Advanced Predictive Analytics</h4>
            <p className="text-gray-600 mb-4">AI-powered trend forecasting and anomaly detection</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">94.7%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">48h</div>
                <div className="text-sm text-gray-600">Lead Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">150+</div>
                <div className="text-sm text-gray-600">Data Sources</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4"
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Global Trend Analyzer
                </h1>
                <p className="text-gray-600">Advanced market intelligence & trend prediction platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center"
              >
                <Activity className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Live Analysis</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex space-x-2">
                {['trends', 'industry', 'emerging'].map((mode) => (
                  <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === mode
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {mode === 'trends' && 'Global Trends'}
                    {mode === 'industry' && 'Industry Analysis'}
                    {mode === 'emerging' && 'Emerging Topics'}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {regions.map(region => (
                  <option key={region.value} value={region.value}>{region.label}</option>
                ))}
              </select>

              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {timeframes.map(tf => (
                  <option key={tf.value} value={tf.value}>{tf.label}</option>
                ))}
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'trends' && renderTrendsView()}
            {viewMode === 'industry' && renderIndustryView()}
            {viewMode === 'emerging' && renderEmergingView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default GlobalTrendAnalyzer
