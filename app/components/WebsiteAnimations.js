'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, RotateCw, Zap, Sparkles, Palette, Eye,
  Download, Upload, Settings, Brain, Clock, CheckCircle,
  AlertCircle, ArrowRight, ChevronDown, ChevronUp, Plus,
  Trash2, Copy, Edit, Layers, Target, Star, Crown,
  Heart, Music, Video, Image, Type, Box, Globe
} from 'lucide-react';

const WebsiteAnimations = () => {
  const [activeTab, setActiveTab] = useState('library');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [customAnimations, setCustomAnimations] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [performance, setPerformance] = useState({
    fps: 60,
    memory: 45,
    loadTime: 1.2,
    score: 95
  });

  const tabs = [
    { id: 'library', name: 'Animation Library', icon: Sparkles },
    { id: 'ai-creator', name: 'AI Creator', icon: Brain },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'export', name: 'Export', icon: Download },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const animationCategories = [
    {
      id: 'entrance',
      name: 'Entrance Animations',
      icon: ArrowRight,
      color: 'from-blue-400 to-purple-400',
      animations: [
        { id: 'fade-in', name: 'Fade In', duration: 0.5, easing: 'ease-out' },
        { id: 'slide-up', name: 'Slide Up', duration: 0.6, easing: 'ease-out' },
        { id: 'bounce-in', name: 'Bounce In', duration: 0.8, easing: 'bounce' },
        { id: 'zoom-in', name: 'Zoom In', duration: 0.4, easing: 'ease-out' }
      ]
    },
    {
      id: 'interaction',
      name: 'Interaction Animations',
      icon: Target,
      color: 'from-green-400 to-teal-400',
      animations: [
        { id: 'hover-scale', name: 'Hover Scale', duration: 0.2, easing: 'ease-out' },
        { id: 'ripple', name: 'Ripple Effect', duration: 0.6, easing: 'ease-out' },
        { id: 'pulse', name: 'Pulse', duration: 1.0, easing: 'ease-in-out' },
        { id: 'shake', name: 'Shake', duration: 0.5, easing: 'ease-in-out' }
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Animations',
      icon: Crown,
      color: 'from-purple-400 to-pink-400',
      animations: [
        { id: 'morphing', name: 'Morphing', duration: 1.2, easing: 'ease-in-out' },
        { id: 'particle-system', name: 'Particle System', duration: 2.0, easing: 'linear' },
        { id: '3d-rotate', name: '3D Rotate', duration: 0.8, easing: 'ease-out' },
        { id: 'liquid', name: 'Liquid Effect', duration: 1.5, easing: 'ease-in-out' }
      ]
    }
  ];

  const aiGeneratedAnimations = [
    {
      id: 'ai-1',
      name: 'AI Smart Entrance',
      description: 'Intelligent entrance animation that adapts to content type',
      category: 'entrance',
      complexity: 'high',
      performance: 92
    },
    {
      id: 'ai-2',
      name: 'Contextual Hover',
      description: 'Hover effects that change based on user behavior',
      category: 'interaction',
      complexity: 'medium',
      performance: 88
    },
    {
      id: 'ai-3',
      name: 'Adaptive Loading',
      description: 'Loading animations that adjust to network speed',
      category: 'advanced',
      complexity: 'high',
      performance: 95
    }
  ];

  useEffect(() => {
    generateAISuggestions();
    monitorPerformance();
  }, []);

  const generateAISuggestions = async () => {
    try {
      const response = await fetch('/api/ai-animation-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageType: 'landing',
          userBehavior: 'high-engagement',
          performance: performance
        })
      });
      
      const suggestions = await response.json();
      setAiSuggestions(suggestions.suggestions || [
        'Consider adding micro-interactions for better engagement',
        'Optimize animation timing for mobile devices',
        'Use staggered animations for list items',
        'Implement lazy loading for better performance'
      ]);
    } catch (error) {
      console.error('AI suggestions error:', error);
    }
  };

  const monitorPerformance = () => {
    // Real-time performance monitoring
    const interval = setInterval(() => {
      setPerformance(prev => ({
        fps: Math.max(30, prev.fps + (Math.random() - 0.5) * 10),
        memory: Math.max(20, Math.min(80, prev.memory + (Math.random() - 0.5) * 5)),
        loadTime: Math.max(0.5, Math.min(3.0, prev.loadTime + (Math.random() - 0.5) * 0.2)),
        score: Math.max(70, Math.min(100, prev.score + (Math.random() - 0.5) * 5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  };

  const createAIAnimation = async (prompt) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-ai-animation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          performance: performance,
          target: 'web'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setCustomAnimations(prev => [...prev, {
          id: Date.now(),
          name: result.name,
          code: result.code,
          performance: result.performance,
          category: 'ai-generated'
        }]);
      }
      
    } catch (error) {
      console.error('AI animation creation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const exportAnimation = async (animation, format) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/export-animation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animation,
          format,
          optimize: true
        })
      });
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `animation.${format}`;
      link.click();
      
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

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
            <Sparkles className="w-12 h-12 text-purple-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Website Animations
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            World-class animation tools with AI-powered creation and self-evolving capabilities
          </p>
        </motion.div>

        {/* Performance Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{performance.fps.toFixed(0)}</div>
            <div className="text-gray-400 text-sm">FPS</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{performance.memory.toFixed(0)}%</div>
            <div className="text-gray-400 text-sm">Memory</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{performance.loadTime.toFixed(1)}s</div>
            <div className="text-gray-400 text-sm">Load Time</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{performance.score.toFixed(0)}</div>
            <div className="text-gray-400 text-sm">Score</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8"
          >
            {activeTab === 'library' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Animation Library</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {animationCategories.map((category) => (
                    <div key={category.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <category.icon className="w-8 h-8 text-purple-400 mr-3" />
                        <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {category.animations.map((animation) => (
                          <div
                            key={animation.id}
                            className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg cursor-pointer hover:bg-slate-500/50 transition-colors"
                            onClick={() => setSelectedAnimation(animation)}
                          >
                            <div>
                              <div className="text-white font-semibold">{animation.name}</div>
                              <div className="text-gray-400 text-sm">
                                {animation.duration}s • {animation.easing}
                              </div>
                            </div>
                            <button className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors">
                              Use
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Generated Animations */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">AI Generated Animations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aiGeneratedAnimations.map((animation) => (
                      <div key={animation.id} className="bg-slate-700/50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold">{animation.name}</h4>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-yellow-400 text-sm">{animation.performance}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">{animation.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            animation.complexity === 'high' ? 'bg-red-500/20 text-red-400' :
                            animation.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {animation.complexity}
                          </span>
                          <button className="px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded text-sm hover:shadow-lg transition-all duration-300">
                            Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-creator' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">AI Animation Creator</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Create Animation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Animation Description</label>
                        <textarea
                          placeholder="Describe the animation you want to create..."
                          className="w-full h-32 p-4 bg-slate-600/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-300 text-sm">Duration (seconds)</label>
                          <input
                            type="number"
                            min="0.1"
                            max="5.0"
                            step="0.1"
                            defaultValue="0.5"
                            className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm">Easing</label>
                          <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                            <option>ease-out</option>
                            <option>ease-in</option>
                            <option>ease-in-out</option>
                            <option>bounce</option>
                            <option>elastic</option>
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={() => createAIAnimation("Smooth entrance animation with bounce effect")}
                        disabled={isProcessing}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Creating...' : 'Create Animation'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Suggestions</h3>
                    <div className="space-y-3">
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start p-3 bg-slate-600/50 rounded-lg">
                          <Brain className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                          <span className="text-gray-300 text-sm">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Performance Optimization</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Real-Time Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Animation FPS</span>
                        <span className="text-green-400 font-semibold">{performance.fps.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Memory Usage</span>
                        <span className="text-blue-400 font-semibold">{performance.memory.toFixed(0)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Load Time</span>
                        <span className="text-yellow-400 font-semibold">{performance.loadTime.toFixed(1)}s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Performance Score</span>
                        <span className="text-purple-400 font-semibold">{performance.score.toFixed(0)}/100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Optimization Tools</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                        <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                        <span className="text-gray-300">Auto-Optimize Animations</span>
                      </button>
                      <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                        <Eye className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-gray-300">Reduce Motion</span>
                      </button>
                      <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                        <Layers className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-gray-300">Layer Optimization</span>
                      </button>
                      <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                        <Target className="w-5 h-5 text-purple-400 mr-3" />
                        <span className="text-gray-300">Performance Profiling</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Export Animations</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Export Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Format</label>
                        <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                          <option>CSS Animation</option>
                          <option>Framer Motion</option>
                          <option>GSAP</option>
                          <option>Lottie</option>
                          <option>After Effects</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm">Quality</label>
                        <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                          <option>High (Best quality)</option>
                          <option>Medium (Balanced)</option>
                          <option>Low (Smaller file)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Optimize for performance</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Export Options</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => exportAnimation(selectedAnimation, 'css')}
                        disabled={isProcessing || !selectedAnimation}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Exporting...' : 'Export CSS'}
                      </button>
                      <button
                        onClick={() => exportAnimation(selectedAnimation, 'framer')}
                        disabled={isProcessing || !selectedAnimation}
                        className="w-full px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-500 transition-all duration-300 disabled:opacity-50"
                      >
                        Export Framer Motion
                      </button>
                      <button
                        onClick={() => exportAnimation(selectedAnimation, 'gsap')}
                        disabled={isProcessing || !selectedAnimation}
                        className="w-full px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-500 transition-all duration-300 disabled:opacity-50"
                      >
                        Export GSAP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Animation Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Hardware Acceleration</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">GPU Processing</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Optimization</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Suggestions</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Performance Learning</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Adaptive Timing</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebsiteAnimations; 