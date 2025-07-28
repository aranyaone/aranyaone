'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Camera, 
  Film, 
  Play, 
  Pause, 
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Download,
  Upload,
  Scissors,
  Layers,
  Palette,
  Music,
  Type,
  Sparkles,
  Zap,
  Eye,
  Share
} from 'lucide-react';

const AdvancedVideoStudio = () => {
  const [currentProject, setCurrentProject] = useState('untitled');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTool, setSelectedTool] = useState('select');
  const [timeline, setTimeline] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoTools = [
    {
      id: 'select',
      name: 'Selection Tool',
      icon: Eye,
      description: 'Select and move elements',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'cut',
      name: 'Cut & Trim',
      icon: Scissors,
      description: 'Precision video cutting',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'effects',
      name: 'Visual Effects',
      icon: Sparkles,
      description: 'Advanced VFX library',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'color',
      name: 'Color Grading',
      icon: Palette,
      description: 'Professional color correction',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'audio',
      name: 'Audio Mixer',
      icon: Music,
      description: 'Multi-track audio editing',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 'text',
      name: 'Text & Titles',
      icon: Type,
      description: 'Advanced typography',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const videoFormats = [
    { name: '4K Ultra HD', resolution: '3840x2160', fps: '60fps' },
    { name: 'Full HD', resolution: '1920x1080', fps: '60fps' },
    { name: 'HD Ready', resolution: '1280x720', fps: '30fps' },
    { name: 'Cinema 4K', resolution: '4096x2160', fps: '24fps' }
  ];

  const aiFeatures = [
    {
      title: 'AI Auto-Edit',
      description: 'Intelligent scene detection and automatic cutting',
      icon: Zap,
      enabled: true
    },
    {
      title: 'Background Removal',
      description: 'AI-powered green screen replacement',
      icon: Layers,
      enabled: true
    },
    {
      title: 'Voice Enhancement',
      description: 'Audio cleanup and voice optimization',
      icon: Volume2,
      enabled: true
    },
    {
      title: 'Smart Transitions',
      description: 'Context-aware transition suggestions',
      icon: Film,
      enabled: false
    }
  ];

  const renderVideo = async () => {
    setIsProcessing(true);
    
    // Simulate video rendering process
    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                <Film className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Advanced Video Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional video editing with AI-powered tools. Create Hollywood-quality content 
              with advanced effects, color grading, and intelligent automation.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Studio Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Project Name:</label>
                <input
                  type="text"
                  value={currentProject}
                  onChange={(e) => setCurrentProject(e.target.value)}
                  className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter project name"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Import
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={renderVideo}
                disabled={isProcessing}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Settings className="w-5 h-5" />
                    </motion.div>
                    Rendering...
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5" />
                    Render Video
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Studio Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Tool Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Video Tools</h3>
            <div className="space-y-3">
              {videoTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <motion.button
                    key={tool.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedTool === tool.id
                        ? `bg-gradient-to-r ${tool.color} text-white`
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs opacity-75">{tool.description}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-slate-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Video Preview</h3>
            
            {/* Video Player */}
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400">Video Preview Area</p>
                <p className="text-gray-500 text-sm">Import video or start recording</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <Square className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline */}
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-2">Timeline</div>
              <div className="h-16 bg-slate-600 rounded border-2 border-dashed border-slate-500 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Drag video clips here</span>
              </div>
            </div>
          </motion.div>

          {/* Properties Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Properties</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Output Format</label>
                <select className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none">
                  {videoFormats.map((format, index) => (
                    <option key={index} value={format.name}>
                      {format.name} ({format.resolution})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Quality</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  defaultValue="85"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Duration</label>
                <div className="text-2xl font-mono text-white">00:00:00</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            AI-Powered Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`p-6 rounded-xl transition-all ${
                    feature.enabled 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                      : 'bg-slate-700 text-gray-300'
                  }`}
                >
                  <IconComponent className="w-8 h-8 mb-3" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm opacity-90">{feature.description}</p>
                  <div className="mt-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      feature.enabled ? 'bg-white/20' : 'bg-gray-600'
                    }`}>
                      {feature.enabled ? 'ACTIVE' : 'COMING SOON'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Professional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Professional Video Studio
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Create professional videos with advanced editing tools, AI-powered features, 
            and Hollywood-quality effects. Export in 4K and share anywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Share className="w-5 h-5" />
              Export & Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              View Tutorials
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedVideoStudio;
