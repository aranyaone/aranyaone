import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image, Type, Layout, Smartphone, Crown, Sparkles, Target, Wand2, Download, Share } from 'lucide-react';

export default function SmartDesignAssistant() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const designTools = [
    {
      id: 'logo-generator',
      name: 'AI Logo Generator',
      icon: Crown,
      description: 'Create stunning logos with AI',
      features: ['Vector output', 'Multiple variations', 'Brand consistency', 'Commercial license'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'brand-kit',
      name: 'Brand Kit Creator',
      icon: Palette,
      description: 'Complete brand identity design',
      features: ['Logo variations', 'Color palettes', 'Typography', 'Brand guidelines'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'color-intelligence',
      name: 'Color Intelligence',
      icon: Sparkles,
      description: 'Psychology-based color selection',
      features: ['Emotion mapping', 'Industry analysis', 'Accessibility check', 'Color harmony'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'typography-ai',
      name: 'Typography AI',
      icon: Type,
      description: 'Perfect font combinations',
      features: ['Font pairing', 'Readability optimization', 'Brand alignment', 'Web fonts'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'layout-optimizer',
      name: 'Layout Optimizer',
      icon: Layout,
      description: 'AI-powered layout design',
      features: ['Grid systems', 'Visual hierarchy', 'Responsive design', 'User experience'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'social-designer',
      name: 'Social Media Designer',
      icon: Smartphone,
      description: 'Platform-optimized designs',
      features: ['Multi-platform', 'Template library', 'Auto-resize', 'Trend analysis'],
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'TechCorp Rebrand',
      type: 'Complete Brand Identity',
      status: 'Completed',
      thumbnail: '🚀',
      created: '2 hours ago'
    },
    {
      id: 2,
      name: 'Startup Logo Series',
      type: 'Logo Variations',
      status: 'In Progress',
      thumbnail: '💡',
      created: '5 hours ago'
    },
    {
      id: 3,
      name: 'E-commerce Design Kit',
      type: 'Social Media Pack',
      status: 'Completed',
      thumbnail: '🛍️',
      created: '1 day ago'
    }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'create', label: 'Create', icon: Wand2 },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'analytics', label: 'Analytics', icon: Sparkles }
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
            🎨 Smart Design Assistant
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            AI-Powered Creative Design Studio with Stanford Intelligence
          </p>
          
          {/* AI Status */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <span className="text-green-400 text-sm">🧠 Design AI: Active</span>
            </div>
            <div className="bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
              <span className="text-blue-400 text-sm">⚡ Creative Engine: Online</span>
            </div>
            <div className="bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
              <span className="text-purple-400 text-sm">🎯 Brand Analysis: Ready</span>
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
            {/* Design Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => setActiveTab('create')}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-gray-400 mb-4">{tool.description}</p>
                  
                  <div className="space-y-2">
                    {tool.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                    Launch Tool
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Recent Projects */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <div key={project.id} className="bg-slate-700/50 rounded-xl p-6 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{project.thumbnail}</div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{project.type}</p>
                    <p className="text-gray-500 text-xs">{project.created}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Create New Design</h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Project Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {designTools.map((tool) => (
                      <button
                        key={tool.id}
                        className="p-4 bg-slate-700/50 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all text-center"
                      >
                        <tool.icon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                        <div className="text-white text-sm font-medium">{tool.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Brand Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="Enter your brand name..."
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Industry</label>
                  <select className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500">
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>E-commerce</option>
                    <option>Creative Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Design Style</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Minimal', 'Modern', 'Creative', 'Corporate', 'Playful', 'Luxury', 'Tech', 'Organic'].map((style) => (
                      <button
                        key={style}
                        className="p-3 bg-slate-700/50 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all text-white text-sm"
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold text-lg hover:scale-105 transition-transform">
                  🎨 Generate Design with AI
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Design Gallery</h2>
              <p className="text-gray-400">Explore AI-generated designs and templates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all group cursor-pointer">
                  <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="text-4xl">🎨</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">Design Template {i + 1}</h3>
                    <p className="text-gray-400 text-sm mb-3">AI-generated design concept</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-purple-500 rounded-lg text-white text-sm hover:bg-purple-600 transition-colors">
                        <Download className="w-4 h-4 inline mr-1" />
                        Download
                      </button>
                      <button className="px-3 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Design Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-purple-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">247</div>
                <div className="text-gray-300">Designs Created</div>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">98.5%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div className="bg-green-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">4.9</div>
                <div className="text-gray-300">Average Rating</div>
              </div>
              <div className="bg-orange-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">2.3min</div>
                <div className="text-gray-300">Avg. Creation Time</div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Popular Design Styles</h3>
              <div className="flex justify-center space-x-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="text-white font-semibold">Modern</div>
                  <div className="text-gray-400 text-sm">35%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-2xl mb-2">✨</div>
                  <div className="text-white font-semibold">Minimal</div>
                  <div className="text-gray-400 text-sm">28%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="text-white font-semibold">Tech</div>
                  <div className="text-gray-400 text-sm">22%</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
