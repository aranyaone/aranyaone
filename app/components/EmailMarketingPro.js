'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, TrendingUp, Target, Send, Eye, MousePointer, DollarSign, Calendar, BarChart3 } from 'lucide-react';

export default function EmailMarketingPro() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalSubscribers: 89432,
    openRate: 28.5,
    clickRate: 4.2,
    conversionRate: 2.8,
    revenueToday: 15678
  });

  const emailTemplates = [
    {
      id: 'welcome-series',
      name: 'Welcome Series',
      icon: '👋',
      type: 'Automated',
      description: 'Multi-email onboarding sequence for new subscribers',
      features: ['Personalized journey', '5-email sequence', 'Behavioral triggers'],
      avgOpenRate: '32%',
      avgClickRate: '6.8%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'product-launch',
      name: 'Product Launch',
      icon: '🚀',
      type: 'Campaign',
      description: 'High-impact announcement for new products/services',
      features: ['Countdown timers', 'Social proof', 'Limited offers'],
      avgOpenRate: '28%',
      avgClickRate: '4.5%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      icon: '📰',
      type: 'Regular',
      description: 'Weekly/monthly content digest and updates',
      features: ['Content curation', 'Industry insights', 'Company updates'],
      avgOpenRate: '24%',
      avgClickRate: '3.2%',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'promotional',
      name: 'Promotional',
      icon: '💰',
      type: 'Sales',
      description: 'Sales-focused campaigns with special offers',
      features: ['Discount codes', 'Urgency tactics', 'Clear CTAs'],
      avgOpenRate: '22%',
      avgClickRate: '5.1%',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'abandoned-cart',
      name: 'Abandoned Cart',
      icon: '🛒',
      type: 'Automated',
      description: 'Recovery emails for incomplete purchases',
      features: ['Product reminders', 'Incentives', '3-email sequence'],
      avgOpenRate: '35%',
      avgClickRate: '8.2%',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'reengagement',
      name: 'Re-engagement',
      icon: '💝',
      type: 'Automated',
      description: 'Win-back campaigns for inactive subscribers',
      features: ['Personalized content', 'Special offers', 'Feedback request'],
      avgOpenRate: '18%',
      avgClickRate: '4.8%',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: 'Summer Sale 2025',
      status: 'Sent',
      sent: 15400,
      opened: 4620,
      clicked: 785,
      revenue: '$12,340',
      sentDate: '2 hours ago'
    },
    {
      id: 2,
      name: 'Welcome Automation',
      status: 'Active',
      sent: 892,
      opened: 321,
      clicked: 67,
      revenue: '$2,450',
      sentDate: 'Ongoing'
    },
    {
      id: 3,
      name: 'Product Update Newsletter',
      status: 'Scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      revenue: '$0',
      sentDate: 'Tomorrow 9 AM'
    }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'campaigns', label: 'Campaigns', icon: Mail },
    { id: 'automation', label: 'Automation', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            📧 Email Marketing Pro
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            AI-Powered Email Marketing with MIT-Level Intelligence
          </p>
          
          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
              <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{realTimeMetrics.totalSubscribers.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Subscribers</div>
            </div>
            <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
              <Eye className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{realTimeMetrics.openRate}%</div>
              <div className="text-sm text-gray-300">Open Rate</div>
            </div>
            <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-500/30">
              <MousePointer className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{realTimeMetrics.clickRate}%</div>
              <div className="text-sm text-gray-300">Click Rate</div>
            </div>
            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
              <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{realTimeMetrics.conversionRate}%</div>
              <div className="text-sm text-gray-300">Conversion</div>
            </div>
            <div className="bg-pink-500/20 rounded-xl p-4 border border-pink-500/30">
              <DollarSign className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-400">${realTimeMetrics.revenueToday.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Today's Revenue</div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Recent Campaigns */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Campaigns</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                  <Send className="w-4 h-4 inline mr-2" />
                  Create Campaign
                </button>
              </div>
              
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-slate-700/50 rounded-xl p-6 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{campaign.name}</h3>
                        <p className="text-gray-400 text-sm">{campaign.sentDate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'Sent' ? 'bg-green-500/20 text-green-400' :
                        campaign.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{campaign.sent.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Sent</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-400">{campaign.opened.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Opened</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-400">{campaign.clicked.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Clicked</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-400">{campaign.revenue}</div>
                        <div className="text-xs text-gray-400">Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-400">
                          {campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%
                        </div>
                        <div className="text-xs text-gray-400">Open Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'campaigns' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Email Templates</h2>
              <p className="text-gray-400">Choose from AI-optimized templates designed for maximum engagement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emailTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${template.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <div className="text-2xl">{template.icon}</div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{template.name}</h3>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                      {template.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-sm">{template.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {template.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <div className="text-center">
                      <div className="text-green-400 font-bold">{template.avgOpenRate}</div>
                      <div className="text-gray-500">Open Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">{template.avgClickRate}</div>
                      <div className="text-gray-500">Click Rate</div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                    Use Template
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'automation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Email Automation</h2>
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Automation</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Set up intelligent email sequences that respond to user behavior, preferences, and engagement patterns. 
                Our AI optimizes timing, content, and delivery for maximum impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-white font-bold mb-2">Trigger-Based</h3>
                <p className="text-gray-400 text-sm">Automatically send emails based on user actions and behaviors</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-white font-bold mb-2">Personalized</h3>
                <p className="text-gray-400 text-sm">AI personalizes content for each subscriber's preferences</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-white font-bold mb-2">Optimized</h3>
                <p className="text-gray-400 text-sm">Continuous learning improves performance over time</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold text-lg hover:scale-105 transition-transform">
                🚀 Set Up Automation
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Performance Analytics</h2>
              <p className="text-gray-400">Deep insights into your email marketing performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
                <div className="text-3xl mb-3">📈</div>
                <div className="text-2xl font-bold text-blue-400 mb-1">+24.5%</div>
                <div className="text-gray-300">Open Rate Growth</div>
                <div className="text-xs text-gray-400">vs last month</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-6 border border-green-500/30">
                <div className="text-3xl mb-3">💰</div>
                <div className="text-2xl font-bold text-green-400 mb-1">$45,600</div>
                <div className="text-gray-300">Revenue This Month</div>
                <div className="text-xs text-gray-400">+18% growth</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
                <div className="text-3xl mb-3">👥</div>
                <div className="text-2xl font-bold text-purple-400 mb-1">12,340</div>
                <div className="text-gray-300">New Subscribers</div>
                <div className="text-xs text-gray-400">this month</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30">
                <div className="text-3xl mb-3">⚡</div>
                <div className="text-2xl font-bold text-orange-400 mb-1">98.7%</div>
                <div className="text-gray-300">Delivery Rate</div>
                <div className="text-xs text-gray-400">industry leading</div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Campaign Performance Comparison</h3>
              <div className="space-y-4">
                {emailTemplates.slice(0, 4).map((template, index) => (
                  <div key={template.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="text-2xl mr-4">{template.icon}</div>
                      <div>
                        <div className="text-white font-semibold">{template.name}</div>
                        <div className="text-gray-400 text-sm">{template.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{template.avgOpenRate}</div>
                      <div className="text-blue-400 text-sm">{template.avgClickRate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
