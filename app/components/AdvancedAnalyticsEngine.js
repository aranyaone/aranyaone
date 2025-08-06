'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Database,
  Target,
  Users,
  DollarSign,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';

const AdvancedAnalyticsEngine = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  const analyticsData = {
    overview: {
      totalUsers: 45678,
      revenue: 234567,
      conversionRate: 3.24,
      growth: 12.5
    },
    userMetrics: {
      activeUsers: 12345,
      newUsers: 2345,
      returningUsers: 10000,
      avgSessionDuration: '4:32'
    },
    revenueMetrics: {
      totalRevenue: 234567,
      monthlyRecurring: 45678,
      averageOrderValue: 127.50,
      churnRate: 2.1
    }
  };

  const chartData = [
    { name: 'Jan', users: 4000, revenue: 12000, conversion: 2.4 },
    { name: 'Feb', users: 3000, revenue: 15000, conversion: 2.8 },
    { name: 'Mar', users: 5000, revenue: 18000, conversion: 3.2 },
    { name: 'Apr', users: 4500, revenue: 22000, conversion: 3.1 },
    { name: 'May', users: 6000, revenue: 25000, conversion: 3.5 },
    { name: 'Jun', users: 5500, revenue: 28000, conversion: 3.7 },
    { name: 'Jul', users: 7000, revenue: 32000, conversion: 4.2 }
  ];

  const analyticsModules = [
    {
      title: 'Real-time Analytics',
      description: 'Live data streaming and instant insights',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      metrics: ['Live visitors', 'Real-time events', 'Active sessions']
    },
    {
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting and predictions',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      metrics: ['Revenue forecasts', 'User behavior prediction', 'Trend analysis']
    },
    {
      title: 'Custom Dashboards',
      description: 'Personalized analytics views',
      icon: BarChart,
      color: 'from-green-500 to-teal-500',
      metrics: ['Drag & drop widgets', 'Custom KPIs', 'Automated reports']
    },
    {
      title: 'Advanced Segmentation',
      description: 'Deep user and behavior analysis',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      metrics: ['User cohorts', 'Behavioral segments', 'Custom attributes']
    }
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                <BarChart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Advanced Analytics Engine
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your data into actionable insights with our enterprise-grade analytics platform. 
              Real-time tracking, predictive modeling, and intelligent reporting.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshData}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: 'Total Users',
              value: analyticsData.overview.totalUsers.toLocaleString(),
              change: '+12.5%',
              icon: Users,
              color: 'text-blue-400'
            },
            {
              title: 'Revenue',
              value: `$${analyticsData.overview.revenue.toLocaleString()}`,
              change: '+8.2%',
              icon: DollarSign,
              color: 'text-green-400'
            },
            {
              title: 'Conversion Rate',
              value: `${analyticsData.overview.conversionRate}%`,
              change: '+0.3%',
              icon: Target,
              color: 'text-purple-400'
            },
            {
              title: 'Growth',
              value: `${analyticsData.overview.growth}%`,
              change: '+2.1%',
              icon: TrendingUp,
              color: 'text-orange-400'
            }
          ].map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className={`w-8 h-8 ${metric.color}`} />
                  <span className="text-green-400 text-sm font-semibold">{metric.change}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-gray-400 text-sm">{metric.title}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Performance Overview</h3>
            <div className="flex gap-2">
              {['Users', 'Revenue', 'Conversion'].map((type) => (
                <button
                  key={type}
                  className="px-3 py-1 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          {/* Simulated Chart */}
          <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-300">Advanced Chart Visualization</p>
              <p className="text-gray-500 text-sm">Real-time data visualization with interactive charts</p>
            </div>
          </div>
        </motion.div>

        {/* Analytics Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Analytics Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {analyticsModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-gradient-to-r ${module.color} rounded-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                      <p className="text-gray-400 text-sm">{module.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {module.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Advanced Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Enterprise Analytics
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Unlock the full potential of your data with our enterprise-grade analytics platform. 
            Get insights that drive growth and optimization.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Upgrade to Enterprise
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsEngine;
