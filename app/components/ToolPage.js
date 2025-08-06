'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, Star, Zap, Shield, Clock, Users, CheckCircle,
  ArrowRight, Play, Pause, Settings, Download, Upload,
  Eye, Target, Brain, Sparkles, Globe, Award, Trophy
} from 'lucide-react';

const ToolPage = ({ 
  toolName, 
  toolDescription, 
  toolIcon: ToolIcon, 
  toolColor, 
  features, 
  benefits, 
  pricing, 
  testimonials,
  demoVideo,
  screenshots,
  subscriptionRequired = false,
  currentPlan = 'free'
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpgrade, setShowUpgrade] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'features', name: 'Features', icon: Target },
    { id: 'pricing', name: 'Pricing', icon: Crown },
    { id: 'demo', name: 'Demo', icon: Play },
    { id: 'testimonials', name: 'Reviews', icon: Star }
  ];

  const handleAction = (action) => {
    if (subscriptionRequired && currentPlan === 'free') {
      setShowUpgrade(true);
    } else {
      // Handle tool action
      console.log(`Executing ${action} for ${toolName}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${toolColor} shadow-2xl`}>
                <ToolIcon className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              {toolName}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              {toolDescription}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => handleAction('try')}
                className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Try {toolName} Free
              </button>
              <button
                onClick={() => handleAction('demo')}
                className="px-8 py-4 bg-slate-800/50 text-white rounded-xl font-semibold text-lg hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8"
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Why Choose {toolName}?</h2>
                    <div className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                            <p className="text-gray-300">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Key Highlights</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Processing Speed</span>
                        <span className="text-green-400 font-semibold">10x Faster</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Accuracy</span>
                        <span className="text-blue-400 font-semibold">99.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">User Satisfaction</span>
                        <span className="text-purple-400 font-semibold">4.9/5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Support Response</span>
<span className="text-yellow-400 font-semibold">{"< 2 hours"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-8">Advanced Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-xl p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${toolColor} flex items-center justify-center mb-4`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-8">Pricing Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricing.map((plan, index) => (
                    <div key={index} className={`bg-gradient-to-br ${plan.color} p-1 rounded-2xl`}>
                      <div className="bg-slate-900/90 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold text-white mb-4">${plan.price}</div>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-gray-300 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button className="w-full px-4 py-2 bg-white text-slate-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                          Choose Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'demo' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-8">Live Demo</h2>
                <div className="bg-slate-700/50 rounded-xl p-8 text-center">
                  <div className="w-full max-w-4xl mx-auto">
                    <div className="aspect-video bg-slate-600 rounded-xl flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-gray-300 mt-4">Watch how {toolName} transforms your workflow</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-8">What Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-semibold">{testimonial.name[0]}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{testimonial.name}</div>
                          <div className="text-gray-400 text-sm">{testimonial.title}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{testimonial.comment}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-3xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Upgrade Required</h3>
                <p className="text-gray-300 mb-6">
                  This feature requires a paid subscription. Upgrade now to unlock {toolName} and all other premium features.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowUpgrade(false)}
                    className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowUpgrade(false);
                      // Navigate to pricing page
                      window.location.href = '/pricing';
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolPage; 