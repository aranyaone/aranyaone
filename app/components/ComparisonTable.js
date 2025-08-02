'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, Crown, Star, Zap, Shield, Globe, Users, Clock,
  Brain, Bot, Camera, Video, FileText, BarChart3, PieChart,
  Calculator, Workflow, Automation, Terminal, MessageCircle,
  TrendingUp, Eye, Target, Settings, Download, Upload,
  DollarSign, Gift, Award, Trophy, Medal, Diamond, Sparkles,
  Edit3, Mic
} from 'lucide-react';

const ComparisonTable = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'All Tools', color: 'from-blue-400 to-purple-400' },
    { id: 'core-ai', name: 'Core AI', color: 'from-green-400 to-teal-400' },
    { id: 'design', name: 'Design', color: 'from-purple-400 to-pink-400' },
    { id: 'finance', name: 'Finance', color: 'from-yellow-400 to-orange-400' },
    { id: 'productivity', name: 'Productivity', color: 'from-red-400 to-pink-400' },
    { id: 'media', name: 'Media', color: 'from-indigo-400 to-purple-400' },
    { id: 'analytics', name: 'Analytics', color: 'from-teal-400 to-blue-400' }
  ];

  const tools = [
    {
      id: 'ai-chat',
      name: 'Super AI Chat',
      category: 'core-ai',
      icon: MessageCircle,
      description: 'Advanced conversational AI with memory and context',
      free: { available: true, limits: '100 messages/month' },
      starter: { available: true, limits: '1,000 messages/month' },
      pro: { available: true, limits: 'Unlimited' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Context Memory', 'Multi-Language', 'Real-Time Learning', 'Team Collaboration']
    },
    {
      id: 'ai-agents',
      name: 'AI Agents',
      category: 'core-ai',
      icon: Bot,
      description: 'Autonomous AI agents with self-evolving capabilities',
      free: { available: false, limits: 'Not available' },
      starter: { available: true, limits: '5 agents' },
      pro: { available: true, limits: 'Unlimited' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Auto-Diagnosis', 'Self-Healing', 'Task Automation', 'Collaboration']
    },
    {
      id: 'website-animations',
      name: 'Website Animations',
      category: 'design',
      icon: Sparkles,
      description: 'AI-powered animation tools with performance optimization',
      free: { available: false, limits: 'Not available' },
      starter: { available: true, limits: '10 animations/month' },
      pro: { available: true, limits: 'Unlimited' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['AI Suggestions', 'Performance Monitoring', 'Auto-Optimization', 'Multi-Format Export']
    },
    {
      id: 'financial-tools',
      name: 'Financial Tools',
      category: 'finance',
      icon: DollarSign,
      description: 'Advanced financial management with AI insights',
      free: { available: false, limits: 'Not available' },
      starter: { available: true, limits: 'Basic features' },
      pro: { available: true, limits: 'Full access' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Portfolio Management', 'AI Insights', 'Risk Analysis', 'Auto-Rebalancing']
    },
    {
      id: 'pdf-creator',
      name: 'PDF Creator',
      category: 'productivity',
      icon: FileText,
      description: 'Advanced PDF creation and editing with AI',
      free: { available: true, limits: '3 PDFs/month' },
      starter: { available: true, limits: '50 PDFs/month' },
      pro: { available: true, limits: 'Unlimited' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['AI Analysis', 'OCR Processing', 'Advanced Editing', 'Batch Processing']
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      category: 'productivity',
      icon: Edit3,
      description: 'AI-powered content generation for all platforms',
      free: { available: false, limits: 'Not available' },
      starter: { available: true, limits: '20 pieces/month' },
      pro: { available: true, limits: 'Unlimited' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Trend Analysis', 'Multi-Platform', 'Auto-Scheduling', 'Viral Prediction']
    },
    {
      id: 'video-creator',
      name: 'Video Creator',
      category: 'media',
      icon: Video,
      description: 'Advanced video editing and creation with AI',
      free: { available: false, limits: 'Not available' },
      starter: { available: true, limits: '5 videos/month' },
      pro: { available: true, limits: 'Unlimited' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Auto-Editing', 'Background Removal', 'Voice Synthesis', 'Advanced Effects']
    },
    {
      id: 'photo-editor',
      name: 'Photo Editor',
      category: 'media',
      icon: Camera,
      description: 'AI-powered photo editing and enhancement',
      free: { available: false, limits: 'Not available' },
      starter: { available: true, limits: '10 photos/month' },
      pro: { available: true, limits: 'Unlimited' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Auto-Enhance', 'Object Removal', 'Style Transfer', 'Face Editing']
    },
    {
      id: 'dashboard-tools',
      name: 'Dashboard Tools',
      category: 'analytics',
      icon: BarChart3,
      description: 'Interactive dashboards with real-time data',
      free: { available: false, limits: 'Not available' },
      starter: { available: true, limits: '3 dashboards' },
      pro: { available: true, limits: 'Unlimited' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Real-Time Data', 'Interactive Charts', 'AI Insights', 'Custom Widgets']
    },
    {
      id: 'power-bi-tools',
      name: 'Power BI Tools',
      category: 'analytics',
      icon: PieChart,
      description: 'Advanced business intelligence with AI',
      free: { available: false, limits: 'Not available' },
      starter: { available: false, limits: 'Not available' },
      pro: { available: true, limits: 'Full access' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Data Modeling', 'AI Insights', 'Automated Reports', 'Predictive Analytics']
    },
    {
      id: 'affiliate-tools',
      name: 'Affiliate Tools',
      category: 'finance',
      icon: Gift,
      description: 'Comprehensive affiliate marketing with AI',
      free: { available: false, limits: 'Not available' },
      starter: { available: false, limits: 'Not available' },
      pro: { available: true, limits: 'Full access' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Commission Tracking', 'Performance Optimization', 'AI Recommendations', 'Auto-Scaling']
    },
    {
      id: 'plugin-monetization',
      name: 'Plugin Monetization',
      category: 'productivity',
      icon: DollarSign,
      description: 'Monetize plugins with AI optimization',
      free: { available: false, limits: 'Not available' },
      starter: { available: false, limits: 'Not available' },
      pro: { available: true, limits: 'Full access' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Revenue Optimization', 'User Analytics', 'Pricing Strategies', 'Auto-Scaling']
    },
    {
      id: 'voice-tools',
      name: 'Voice Tools',
      category: 'media',
      icon: Mic,
      description: 'Advanced voice processing and synthesis',
      free: { available: false, limits: 'Not available' },
      starter: { available: false, limits: 'Not available' },
      pro: { available: true, limits: 'Full access' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Voice Cloning', 'Emotion Detection', 'Multi-Language', 'Real-Time Processing']
    },
    {
      id: 'market-predictor',
      name: 'AI Market Predictor',
      category: 'finance',
      icon: TrendingUp,
      description: 'Predict market trends with ML',
      free: { available: false, limits: 'Not available' },
      starter: { available: false, limits: 'Not available' },
      pro: { available: true, limits: 'Full access' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Real-Time Data', 'ML Predictions', 'Risk Analysis', 'Portfolio Optimization']
    },
    {
      id: 'self-repair',
      name: 'Self-Repair System',
      category: 'core-ai',
      icon: Shield,
      description: 'Auto-diagnosis and self-healing',
      free: { available: false, limits: 'Not available' },
      starter: { available: false, limits: 'Not available' },
      pro: { available: true, limits: 'Full access' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Auto-Diagnosis', 'Self-Healing', 'Performance Optimization', 'Security Monitoring']
    },
    {
      id: 'trend-analyzer',
      name: 'Global Trend Analyzer',
      category: 'analytics',
      icon: Globe,
      description: 'Real-time trend monitoring and analysis',
      free: { available: false, limits: 'Not available' },
      starter: { available: false, limits: 'Not available' },
      pro: { available: true, limits: 'Full access' },
      enterprise: { available: true, limits: 'Custom' },
      features: ['Real-Time Monitoring', 'Sentiment Analysis', 'Trend Prediction', 'Global Insights']
    }
  ];

  const filteredTools = tools.filter(tool => 
    selectedCategory === 'all' || tool.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const plans = [
    { id: 'free', name: 'Free', price: 0, color: 'from-gray-400 to-gray-600' },
    { id: 'starter', name: 'Starter', price: 29, color: 'from-blue-400 to-purple-400' },
    { id: 'pro', name: 'Professional', price: 79, color: 'from-purple-400 to-pink-400' },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', color: 'from-yellow-400 to-orange-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Tools Comparison
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Compare all our world-class AI tools and choose the perfect plan for your needs
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 overflow-x-auto"
        >
          <div className="min-w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-white font-semibold">Tool</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="text-center p-4 text-white font-semibold">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${plan.color} text-white`}>
                        {plan.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTools.map((tool) => (
                  <tr key={tool.id} className="border-b border-gray-700/30">
                    <td className="p-4">
                      <div className="flex items-center">
                        <tool.icon className="w-8 h-8 text-blue-400 mr-3" />
                        <div>
                          <div className="text-white font-semibold">{tool.name}</div>
                          <div className="text-gray-400 text-sm">{tool.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      {tool.free.available ? (
                        <div className="flex flex-col items-center">
                          <Check className="w-6 h-6 text-green-400 mb-1" />
                          <span className="text-gray-300 text-xs">{tool.free.limits}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <X className="w-6 h-6 text-red-400 mb-1" />
                          <span className="text-gray-500 text-xs">Not available</span>
                        </div>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {tool.starter.available ? (
                        <div className="flex flex-col items-center">
                          <Check className="w-6 h-6 text-green-400 mb-1" />
                          <span className="text-gray-300 text-xs">{tool.starter.limits}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <X className="w-6 h-6 text-red-400 mb-1" />
                          <span className="text-gray-500 text-xs">Not available</span>
                        </div>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {tool.pro.available ? (
                        <div className="flex flex-col items-center">
                          <Check className="w-6 h-6 text-green-400 mb-1" />
                          <span className="text-gray-300 text-xs">{tool.pro.limits}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <X className="w-6 h-6 text-red-400 mb-1" />
                          <span className="text-gray-500 text-xs">Not available</span>
                        </div>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {tool.enterprise.available ? (
                        <div className="flex flex-col items-center">
                          <Check className="w-6 h-6 text-green-400 mb-1" />
                          <span className="text-gray-300 text-xs">{tool.enterprise.limits}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <X className="w-6 h-6 text-red-400 mb-1" />
                          <span className="text-gray-500 text-xs">Not available</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
        >
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{tools.length}</div>
            <div className="text-gray-400 text-sm">Total Tools</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {tools.filter(t => t.free.available).length}
            </div>
            <div className="text-gray-400 text-sm">Free Tools</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {tools.filter(t => t.pro.available).length}
            </div>
            <div className="text-gray-400 text-sm">Pro Tools</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {tools.filter(t => t.enterprise.available).length}
            </div>
            <div className="text-gray-400 text-sm">Enterprise Tools</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonTable; 