'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, 
  Image, 
  Wand2, 
  Download, 
  Upload, 
  Share2, 
  Settings, 
  Sparkles, 
  Brush,
  Layers,
  Type,
  Camera,
  Video,
  Music,
  Zap,
  Target,
  Award,
  Clock,
  Eye,
  Heart,
  Star,
  Crown,
  Gem,
  Lightbulb,
  Brain,
  Rocket,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Save,
  Copy,
  Grid,
  Filter,
  Sliders,
  Play,
  Pause,
  Volume2,
  Maximize,
  MoreHorizontal
} from 'lucide-react'

const CreativeAIStudio = () => {
  const [activeTab, setActiveTab] = useState('generator')
  const [selectedStyle, setSelectedStyle] = useState('photorealistic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [creativityMode, setCreativityMode] = useState('balanced')

  // Art styles
  const artStyles = [
    { id: 'photorealistic', name: 'Photorealistic', icon: '📸', color: 'from-blue-500 to-blue-600' },
    { id: 'digital-art', name: 'Digital Art', icon: '🎨', color: 'from-purple-500 to-pink-600' },
    { id: 'oil-painting', name: 'Oil Painting', icon: '🖼️', color: 'from-amber-500 to-orange-600' },
    { id: 'watercolor', name: 'Watercolor', icon: '🌈', color: 'from-cyan-400 to-blue-500' },
    { id: 'anime', name: 'Anime Style', icon: '🎭', color: 'from-pink-500 to-rose-600' },
    { id: 'sketch', name: 'Pencil Sketch', icon: '✏️', color: 'from-gray-500 to-gray-600' },
    { id: 'abstract', name: 'Abstract', icon: '🌀', color: 'from-indigo-500 to-purple-600' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🤖', color: 'from-neon-400 to-cyan-500' },
    { id: 'vintage', name: 'Vintage', icon: '📜', color: 'from-yellow-600 to-amber-600' },
    { id: 'minimalist', name: 'Minimalist', icon: '⚪', color: 'from-slate-400 to-slate-500' }
  ]

  // Sample generated artworks
  const sampleArtworks = [
    {
      id: 1,
      title: "Futuristic Cityscape",
      style: "cyberpunk",
      prompt: "Neon-lit cyberpunk city with flying cars and holographic displays",
      likes: 1247,
      downloads: 523,
      timestamp: "2 hours ago",
      resolution: "4K Ultra HD"
    },
    {
      id: 2,
      title: "Serene Mountain Lake",
      style: "photorealistic",
      prompt: "Crystal clear mountain lake at sunrise with mist and reflection",
      likes: 2156,
      downloads: 892,
      timestamp: "5 hours ago",
      resolution: "8K Professional"
    },
    {
      id: 3,
      title: "Dragon in Clouds",
      style: "digital-art",
      prompt: "Majestic dragon soaring through ethereal clouds with magical lighting",
      likes: 3421,
      downloads: 1204,
      timestamp: "1 day ago",
      resolution: "Ultra Wide"
    },
    {
      id: 4,
      title: "Abstract Energy Flow",
      style: "abstract",
      prompt: "Dynamic energy patterns with vibrant colors and fluid motion",
      likes: 987,
      downloads: 334,
      timestamp: "2 days ago",
      resolution: "Square Format"
    }
  ]

  // Creative tools
  const creativeTools = [
    {
      id: 'logo-maker',
      name: 'AI Logo Maker',
      description: 'Professional logo design with AI',
      icon: '🏷️',
      category: 'Branding',
      features: ['Vector Output', 'Brand Guidelines', 'Multiple Variants']
    },
    {
      id: 'poster-designer',
      name: 'Poster Designer',
      description: 'Create stunning posters and flyers',
      icon: '📋',
      category: 'Marketing',
      features: ['Templates', 'Custom Sizes', 'Print Ready']
    },
    {
      id: 'character-creator',
      name: 'Character Creator',
      description: 'Design unique characters and avatars',
      icon: '👤',
      category: 'Gaming',
      features: ['3D Models', 'Animations', 'Customization']
    },
    {
      id: 'texture-generator',
      name: 'Texture Generator',
      description: 'Generate seamless textures and patterns',
      icon: '🧱',
      category: '3D Design',
      features: ['Seamless Tiles', 'PBR Materials', 'High Resolution']
    }
  ]

  const tabs = [
    { id: 'generator', label: 'AI Art Generator', icon: Wand2 },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'tools', label: 'Creative Tools', icon: Brush },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'templates', label: 'Templates', icon: Grid },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const generateArt = async () => {
    setIsGenerating(true)
    // Simulate AI art generation
    setTimeout(() => {
      const newArtwork = {
        id: Date.now(),
        title: "AI Generated Masterpiece",
        style: selectedStyle,
        prompt: "User's creative vision brought to life",
        likes: 0,
        downloads: 0,
        timestamp: "Just now",
        resolution: "4K Ultra HD"
      }
      setGeneratedImages([newArtwork, ...generatedImages])
      setIsGenerating(false)
    }, 3000)
  }

  const renderGenerator = () => (
    <div className="space-y-8">
      {/* AI Art Generator */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Wand2 className="w-8 h-8 mr-3 text-purple-600" />
          AI Art Generator
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Describe Your Vision
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="A mystical forest with glowing mushrooms and fairy lights, ethereal atmosphere, magical realism style..."
              />
            </div>

            {/* Art Style Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Art Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                {artStyles.slice(0, 6).map((style) => (
                  <motion.button
                    key={style.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedStyle === style.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{style.icon}</span>
                      <span className="font-medium text-sm">{style.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500">
                  <option>1024x1024 (Standard)</option>
                  <option>2048x2048 (High Quality)</option>
                  <option>4096x4096 (Ultra HD)</option>
                  <option>1920x1080 (Landscape)</option>
                  <option>1080x1920 (Portrait)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Creativity Level
                </label>
                <select 
                  value={creativityMode}
                  onChange={(e) => setCreativityMode(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="conservative">Conservative</option>
                  <option value="balanced">Balanced</option>
                  <option value="creative">Creative</option>
                  <option value="experimental">Experimental</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateArt}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Creating AI Masterpiece...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Art
                </>
              )}
            </motion.button>
          </div>

          {/* Preview Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Generated Artwork</h4>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-gray-300">
              {isGenerating ? (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mx-auto mb-4 flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-gray-600">AI is creating your masterpiece...</p>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mx-auto mt-4">
                    <motion.div 
                      className="bg-purple-500 h-2 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Palette className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Your AI-generated artwork will appear here</p>
                  <p className="text-sm mt-2">Use the controls to customize your creation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Style Showcase */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Brush className="w-6 h-6 mr-2 text-purple-600" />
          Art Style Showcase
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {artStyles.map((style) => (
            <motion.div
              key={style.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedStyle === style.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${style.color} flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-white text-xl">{style.icon}</span>
                </div>
                <h4 className="font-medium text-sm">{style.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderGallery = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center">
            <Image className="w-8 h-8 mr-3 text-purple-600" />
            AI Art Gallery
          </h3>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
              <option>All Styles</option>
              <option>Photorealistic</option>
              <option>Digital Art</option>
              <option>Abstract</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
              <option>Most Recent</option>
              <option>Most Liked</option>
              <option>Most Downloaded</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...sampleArtworks, ...generatedImages].map((artwork) => (
            <motion.div
              key={artwork.id}
              whileHover={{ y: -4 }}
              className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <Palette className="w-16 h-16 mx-auto text-purple-400 mb-2" />
                  <p className="text-purple-600 font-medium">{artwork.title}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold truncate">{artwork.title}</h4>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {artwork.style}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 truncate">{artwork.prompt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{artwork.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      <span>{artwork.downloads}</span>
                    </div>
                  </div>
                  <span>{artwork.timestamp}</span>
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-500">{artwork.resolution}</span>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTools = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Brush className="w-8 h-8 mr-3 text-purple-600" />
          Creative AI Tools
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creativeTools.map((tool) => (
            <motion.div
              key={tool.id}
              whileHover={{ y: -4 }}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-purple-500 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-2xl">{tool.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{tool.name}</h4>
                    <p className="text-sm text-gray-600">{tool.category}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{tool.description}</p>
              
              <div className="space-y-2 mb-4">
                {tool.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Launch Tool
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4"
              >
                <Palette className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Creative AI Studio
                </h1>
                <p className="text-gray-600">Professional AI-powered design & art generation suite</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center"
              >
                <Crown className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Pro Studio</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all"
              >
                <Settings className="w-5 h-5" />
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
                    ? 'border-purple-500 text-purple-600'
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
            {activeTab === 'generator' && renderGenerator()}
            {activeTab === 'gallery' && renderGallery()}
            {activeTab === 'tools' && renderTools()}
            {activeTab === 'projects' && (
              <div className="text-center py-12">
                <Layers className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Management</h3>
                <p className="text-gray-600">Organize and manage your creative projects</p>
              </div>
            )}
            {activeTab === 'templates' && (
              <div className="text-center py-12">
                <Grid className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Design Templates</h3>
                <p className="text-gray-600">Professional templates for all your creative needs</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Studio Settings</h3>
                <p className="text-gray-600">Customize your creative workspace and preferences</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CreativeAIStudio
