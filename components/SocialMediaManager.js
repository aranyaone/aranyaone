'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Share2, 
  BarChart3, 
  Calendar, 
  Users, 
  Heart, 
  MessageCircle, 
  Repeat2, 
  TrendingUp,
  Clock,
  Globe,
  Camera,
  Zap,
  Target,
  Award,
  Eye,
  User,
  Plus,
  Send,
  Download,
  Settings,
  Bell,
  Shield,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react'

const SocialMediaManager = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [connectedPlatforms, setConnectedPlatforms] = useState([])
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [scheduleMode, setScheduleMode] = useState(false)
  const [analyticsData, setAnalyticsData] = useState({})

  // Sample social media platforms
  const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      color: 'from-blue-500 to-blue-600',
      icon: '📘',
      followers: '125.4K',
      engagement: '8.9%',
      posts: 45
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      color: 'from-pink-500 to-purple-600',
      icon: '📸',
      followers: '89.2K',
      engagement: '12.3%',
      posts: 38
    },
    { 
      id: 'twitter', 
      name: 'Twitter', 
      color: 'from-blue-400 to-blue-500',
      icon: '🐦',
      followers: '67.8K',
      engagement: '15.7%',
      posts: 62
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      color: 'from-blue-600 to-blue-700',
      icon: '💼',
      followers: '34.5K',
      engagement: '7.2%',
      posts: 28
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      color: 'from-red-500 to-red-600',
      icon: '🎥',
      followers: '156.7K',
      engagement: '22.1%',
      posts: 15
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      color: 'from-gray-800 to-pink-500',
      icon: '🎵',
      followers: '234.8K',
      engagement: '28.4%',
      posts: 52
    }
  ]

  // Sample analytics data
  const weeklyData = [
    { day: 'Mon', reach: 12500, engagement: 890, clicks: 245 },
    { day: 'Tue', reach: 15800, engagement: 1240, clicks: 380 },
    { day: 'Wed', reach: 13200, engagement: 970, clicks: 290 },
    { day: 'Thu', reach: 18500, engagement: 1560, clicks: 450 },
    { day: 'Fri', reach: 22100, engagement: 1890, clicks: 620 },
    { day: 'Sat', reach: 19800, engagement: 1650, clicks: 540 },
    { day: 'Sun', reach: 16400, engagement: 1320, clicks: 410 }
  ]

  // Sample scheduled posts
  const scheduledPosts = [
    {
      id: 1,
      content: "🚀 Exciting product launch coming tomorrow! Stay tuned for revolutionary AI features.",
      platforms: ['facebook', 'twitter', 'linkedin'],
      scheduledTime: "2024-01-15 09:00",
      status: "scheduled"
    },
    {
      id: 2,
      content: "📈 Check out our latest growth metrics and success stories from this quarter!",
      platforms: ['linkedin', 'twitter'],
      scheduledTime: "2024-01-15 14:30",
      status: "scheduled"
    },
    {
      id: 3,
      content: "🎯 Master social media automation with our comprehensive guide. Link in bio!",
      platforms: ['instagram', 'facebook'],
      scheduledTime: "2024-01-16 11:00",
      status: "scheduled"
    }
  ]

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'create', label: 'Create Post', icon: Plus },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'platforms', label: 'Platforms', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8" />
            <div className="text-right">
              <p className="text-blue-100 text-sm">Total Reach</p>
              <p className="text-2xl font-bold">847.2K</p>
            </div>
          </div>
          <div className="flex items-center text-blue-100">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+12.5% this week</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8" />
            <div className="text-right">
              <p className="text-green-100 text-sm">Engagement</p>
              <p className="text-2xl font-bold">156.3K</p>
            </div>
          </div>
          <div className="flex items-center text-green-100">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+18.7% this week</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8" />
            <div className="text-right">
              <p className="text-purple-100 text-sm">New Followers</p>
              <p className="text-2xl font-bold">12.8K</p>
            </div>
          </div>
          <div className="flex items-center text-purple-100">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+25.3% this week</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8" />
            <div className="text-right">
              <p className="text-orange-100 text-sm">Click-through</p>
              <p className="text-2xl font-bold">8.9%</p>
            </div>
          </div>
          <div className="flex items-center text-orange-100">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+5.2% this week</span>
          </div>
        </motion.div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-blue-600" />
          Platform Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              whileHover={{ y: -2 }}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{platform.icon}</span>
                <div>
                  <h4 className="font-semibold">{platform.name}</h4>
                  <p className="text-sm text-gray-600">{platform.followers} followers</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Engagement:</span>
                  <span className="font-medium text-green-600">{platform.engagement}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Posts this month:</span>
                  <span className="font-medium">{platform.posts}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-blue-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('create')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-all"
          >
            <Plus className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">Create Post</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('schedule')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-all"
          >
            <Calendar className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">Schedule Posts</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('analytics')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-all"
          >
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">View Analytics</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 text-center hover:shadow-lg transition-all"
          >
            <Download className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">Export Data</span>
          </motion.button>
        </div>
      </div>
    </div>
  )

  const renderCreatePost = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Plus className="w-8 h-8 mr-3 text-blue-600" />
          Create New Post
        </h3>

        <div className="space-y-6">
          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <textarea
              rows={6}
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What's on your mind? Share your thoughts with the world..."
            />
            <p className="text-sm text-gray-500 mt-2">280 characters remaining</p>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select Platforms
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <motion.label
                  key={platform.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-2xl ml-3 mr-2">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Add Media
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop images or videos here</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Browse Files
              </button>
            </div>
          </div>

          {/* Scheduling Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="schedule"
                checked={scheduleMode}
                onChange={(e) => setScheduleMode(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="schedule" className="ml-2 text-sm font-medium text-gray-700">
                Schedule for later
              </label>
            </div>
            {scheduleMode && (
              <div className="flex items-center space-x-4">
                <input
                  type="datetime-local"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center"
            >
              <Send className="w-5 h-5 mr-2" />
              {scheduleMode ? 'Schedule Post' : 'Post Now'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSchedule = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-600" />
            Scheduled Posts
          </h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('create')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </motion.button>
        </div>

        <div className="space-y-4">
          {scheduledPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -2 }}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{new Date(post.scheduledTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                      <span className="capitalize">{post.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <AlertCircle className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Platforms:</span>
                {post.platforms.map((platformId) => {
                  const platform = platforms.find(p => p.id === platformId)
                  return (
                    <span key={platformId} className="text-lg">{platform?.icon}</span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
          Analytics Dashboard
        </h3>

        {/* Weekly Performance Chart */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4">Weekly Performance</h4>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-end justify-between h-40 space-x-2">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.reach / 25000) * 100}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-full mb-2"
                  />
                  <span className="text-sm text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Reach</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Engagement</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span>Clicks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-blue-600" />
              <div className="text-right">
                <p className="text-blue-600 text-sm font-medium">Best Performing Post</p>
                <p className="text-2xl font-bold text-blue-800">89.2K</p>
              </div>
            </div>
            <p className="text-blue-700 text-sm">Product launch announcement</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div className="text-right">
                <p className="text-green-600 text-sm font-medium">Growth Rate</p>
                <p className="text-2xl font-bold text-green-800">+24.7%</p>
              </div>
            </div>
            <p className="text-green-700 text-sm">Compared to last month</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-purple-600" />
              <div className="text-right">
                <p className="text-purple-600 text-sm font-medium">Engagement Score</p>
                <p className="text-2xl font-bold text-purple-800">94/100</p>
              </div>
            </div>
            <p className="text-purple-700 text-sm">Excellent performance</p>
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
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4"
              >
                <Share2 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Social Media Manager
                </h1>
                <p className="text-gray-600">Multi-platform automation & analytics suite</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">All Platforms Active</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg transition-all"
              >
                <Bell className="w-5 h-5" />
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
            {activeTab === 'create' && renderCreatePost()}
            {activeTab === 'schedule' && renderSchedule()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'platforms' && (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Platform Management</h3>
                <p className="text-gray-600">Connect and manage all your social media platforms</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Settings & Preferences</h3>
                <p className="text-gray-600">Customize your social media automation experience</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SocialMediaManager
