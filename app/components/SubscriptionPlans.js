'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Star, Crown, Zap, Shield, Globe, Users, Clock,
  DollarSign, Gift, Award, Trophy, Medal, Diamond, Sparkles,
  Brain, Bot, Camera, Video, FileText, BarChart3, PieChart,
  Calculator, Workflow, Automation, Terminal, MessageCircle,
  TrendingUp, Eye, Target, Settings, Download, Upload, Edit3, Mic
} from 'lucide-react';

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      color: 'from-gray-400 to-gray-600',
      icon: Gift,
      features: [
        'Access to 3 AI tools',
        'Basic analytics',
        'Community support',
        '1GB storage',
        'Standard processing speed',
        'Basic templates'
      ],
      limitations: [
        'Limited to 10 requests/day',
        'No advanced features',
        'Watermarked exports',
        'Basic support only'
      ],
      tools: ['AI Chat', 'PDF Creator', 'Basic Analytics']
    },
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 29 : 290,
      description: 'Great for individuals and small teams',
      color: 'from-blue-400 to-purple-400',
      icon: Star,
      features: [
        'Access to 8 AI tools',
        'Advanced analytics',
        'Priority support',
        '10GB storage',
        'Fast processing speed',
        'Premium templates',
        'Export without watermark',
        'API access (limited)'
      ],
      limitations: [
        '100 requests/day',
        'No custom branding',
        'Standard integrations'
      ],
      tools: ['AI Chat', 'PDF Creator', 'Content Creator', 'Video Creator', 'Photo Editor', 'Financial Tools', 'Dashboard Tools', 'AI Agents']
    },
    {
      id: 'pro',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 79 : 790,
      description: 'Perfect for professionals and growing businesses',
      color: 'from-purple-400 to-pink-400',
      icon: Crown,
      features: [
        'Access to ALL AI tools',
        'Advanced analytics & insights',
        'Priority support 24/7',
        '100GB storage',
        'Ultra-fast processing',
        'Custom templates',
        'No watermarks',
        'Full API access',
        'Custom integrations',
        'White-label options',
        'Advanced security',
        'Team collaboration'
      ],
      limitations: [
        'Unlimited requests',
        'Custom branding available',
        'Advanced integrations'
      ],
      tools: ['All 20+ AI Tools', 'Custom Solutions', 'Enterprise Features']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with custom needs',
      color: 'from-yellow-400 to-orange-400',
      icon: Diamond,
      features: [
        'Everything in Professional',
        'Custom AI model training',
        'Dedicated support team',
        'Unlimited storage',
        'On-premise deployment',
        'Custom integrations',
        'SLA guarantees',
        'Advanced security',
        'Compliance features',
        'Custom development',
        'Training & onboarding',
        'Dedicated account manager'
      ],
      limitations: [
        'Custom pricing',
        'Annual contracts',
        'Enterprise requirements'
      ],
      tools: ['All Tools + Custom Development', 'Dedicated Infrastructure', 'Enterprise Solutions']
    }
  ];

  const tools = [
    {
      id: 'ai-chat',
      name: 'AI Chat',
      description: 'Advanced conversational AI with memory and context',
      icon: MessageCircle,
      category: 'Core AI',
      free: true,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'ai-agents',
      name: 'AI Agents',
      description: 'Autonomous AI agents with self-evolving capabilities',
      icon: Bot,
      category: 'Core AI',
      free: false,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'website-animations',
      name: 'Website Animations',
      description: 'AI-powered animation tools with performance optimization',
      icon: Sparkles,
      category: 'Design',
      free: false,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'financial-tools',
      name: 'Financial Tools',
      description: 'Advanced financial management with AI insights',
      icon: DollarSign,
      category: 'Finance',
      free: false,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'pdf-creator',
      name: 'PDF Creator',
      description: 'Advanced PDF creation and editing with AI',
      icon: FileText,
      category: 'Productivity',
      free: true,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      description: 'AI-powered content generation for all platforms',
      icon: Edit3,
      category: 'Content',
      free: false,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'video-creator',
      name: 'Video Creator',
      description: 'Advanced video editing and creation with AI',
      icon: Video,
      category: 'Media',
      free: false,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'photo-editor',
      name: 'Photo Editor',
      description: 'AI-powered photo editing and enhancement',
      icon: Camera,
      category: 'Media',
      free: false,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'dashboard-tools',
      name: 'Dashboard Tools',
      description: 'Interactive dashboards with real-time data',
      icon: BarChart3,
      category: 'Analytics',
      free: false,
      starter: true,
      pro: true,
      enterprise: true
    },
    {
      id: 'power-bi-tools',
      name: 'Power BI Tools',
      description: 'Advanced business intelligence with AI',
      icon: PieChart,
      category: 'Analytics',
      free: false,
      starter: false,
      pro: true,
      enterprise: true
    },
    {
      id: 'affiliate-tools',
      name: 'Affiliate Tools',
      description: 'Comprehensive affiliate marketing with AI',
      icon: Gift,
      category: 'Marketing',
      free: false,
      starter: false,
      pro: true,
      enterprise: true
    },
    {
      id: 'plugin-monetization',
      name: 'Plugin Monetization',
      description: 'Monetize plugins with AI optimization',
      icon: DollarSign,
      category: 'Development',
      free: false,
      starter: false,
      pro: true,
      enterprise: true
    },
    {
      id: 'voice-tools',
      name: 'Voice Tools',
      description: 'Advanced voice processing and synthesis',
      icon: Mic,
      category: 'Media',
      free: false,
      starter: false,
      pro: true,
      enterprise: true
    },
    {
      id: 'market-predictor',
      name: 'AI Market Predictor',
      description: 'Predict market trends with ML',
      icon: TrendingUp,
      category: 'Finance',
      free: false,
      starter: false,
      pro: true,
      enterprise: true
    },
    {
      id: 'self-repair',
      name: 'Self-Repair System',
      description: 'Auto-diagnosis and self-healing',
      icon: Shield,
      category: 'Infrastructure',
      free: false,
      starter: false,
      pro: true,
      enterprise: true
    },
    {
      id: 'trend-analyzer',
      name: 'Global Trend Analyzer',
      description: 'Real-time trend monitoring and analysis',
      icon: Globe,
      category: 'Analytics',
      free: false,
      starter: false,
      pro: true,
      enterprise: true
    }
  ];

  const categories = [
    { id: 'Core AI', name: 'Core AI', color: 'from-blue-400 to-purple-400' },
    { id: 'Design', name: 'Design', color: 'from-purple-400 to-pink-400' },
    { id: 'Finance', name: 'Finance', color: 'from-green-400 to-emerald-400' },
    { id: 'Productivity', name: 'Productivity', color: 'from-orange-400 to-red-400' },
    { id: 'Content', name: 'Content', color: 'from-yellow-400 to-orange-400' },
    { id: 'Media', name: 'Media', color: 'from-pink-400 to-red-400' },
    { id: 'Analytics', name: 'Analytics', color: 'from-indigo-400 to-purple-400' },
    { id: 'Marketing', name: 'Marketing', color: 'from-teal-400 to-blue-400' },
    { id: 'Development', name: 'Development', color: 'from-gray-400 to-slate-400' },
    { id: 'Infrastructure', name: 'Infrastructure', color: 'from-emerald-400 to-green-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mb-8">
            Unlock the full potential of our world-class AI tools suite
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-gray-300">Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-gray-300">Yearly</span>
            {billingCycle === 'yearly' && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-gradient-to-br ${plan.color} p-1 rounded-3xl shadow-xl transition-all duration-300 ${
                selectedPlan === plan.id ? 'ring-4 ring-yellow-400' : ''
              }`}
            >
              <div className="bg-slate-900/90 backdrop-blur-lg rounded-3xl p-6 h-full flex flex-col">
                <div className="text-center mb-6">
                  <plan.icon className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price === 0 ? 'Free' : plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}
                  </div>
                  {plan.price !== 0 && plan.price !== 'Custom' && (
                    <div className="text-gray-400 text-sm">
                      per {billingCycle === 'monthly' ? 'month' : 'year'}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-3">Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300 text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="text-white font-semibold mb-3">Limitations:</h4>
                      <ul className="space-y-2 mb-6">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-center text-gray-400 text-sm">
                            <span className="w-4 h-4 text-red-400 mr-2 flex-shrink-0">×</span>
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.id === 'free'
                      ? 'bg-gray-600 text-white hover:bg-gray-500'
                      : `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                  }`}
                >
                  {plan.id === 'enterprise' ? 'Contact Sales' : 'Choose Plan'}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Tools Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-white font-semibold">Tool</th>
                  <th className="text-center p-4 text-white font-semibold">Free</th>
                  <th className="text-center p-4 text-white font-semibold">Starter</th>
                  <th className="text-center p-4 text-white font-semibold">Professional</th>
                  <th className="text-center p-4 text-white font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <React.Fragment key={category.id}>
                    <tr key={category.id} className="border-b border-gray-700/50">
                      <td className="p-4">
                        <div className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-gray-200 text-xs font-semibold">
                          {category.name}
                        </div>
                      </td>
                      {tools.filter(tool => tool.category === category.id).map((tool) => (
                        <>
                          <td key={tool.id} className="text-center p-4">
                            {tool.free ? (
                              <Check className="w-6 h-6 text-green-400 mx-auto" />
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </td>
                          <td className="text-center p-4">
                            {tool.starter ? (
                              <Check className="w-6 h-6 text-green-400 mx-auto" />
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </td>
                          <td className="text-center p-4">
                            {tool.pro ? (
                              <Check className="w-6 h-6 text-green-400 mx-auto" />
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </td>
                          <td className="text-center p-4">
                            {tool.enterprise ? (
                              <Check className="w-6 h-6 text-green-400 mx-auto" />
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </td>
                        </>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
            <p className="text-gray-300 text-sm">Bank-level encryption and compliance with GDPR, CCPA, and SOC 2</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">10,000+ Users</h3>
            <p className="text-gray-300 text-sm">Trusted by professionals and businesses worldwide</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">99.9% Uptime</h3>
            <p className="text-gray-300 text-sm">Reliable service with guaranteed SLA and 24/7 support</p>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-300 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-300 text-sm">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-300 text-sm">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-gray-300 text-sm">Yes, we offer a 30-day money-back guarantee for all plans.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Is my data secure?</h3>
                <p className="text-gray-300 text-sm">Absolutely. We use bank-level encryption and comply with all major security standards.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">What support do you provide?</h3>
                <p className="text-gray-300 text-sm">Free users get community support, while paid plans include priority support and dedicated assistance.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionPlans; 