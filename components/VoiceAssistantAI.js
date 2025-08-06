'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Settings, 
  Play, 
  Pause, 
  Square,
  RotateCcw,
  Send,
  Copy,
  Download,
  Upload,
  Brain,
  Zap,
  Globe,
  Users,
  Clock,
  Star,
  Award,
  Shield,
  Smartphone,
  Headphones,
  Radio,
  Waves,
  Activity,
  Target,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Languages,
  Command,
  Eye,
  Heart,
  TrendingUp,
  BarChart3,
  Sliders,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react'

const VoiceAssistantAI = () => {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [activeTab, setActiveTab] = useState('assistant')
  const [selectedVoice, setSelectedVoice] = useState('aria')
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8
  })

  // Voice personalities
  const voicePersonalities = [
    {
      id: 'aria',
      name: 'Aria',
      description: 'Professional & Friendly',
      accent: 'American',
      gender: 'Female',
      specialty: 'Business Assistant',
      icon: '👩‍💼',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'marcus',
      name: 'Marcus',
      description: 'Technical & Precise',
      accent: 'British',
      gender: 'Male',
      specialty: 'Tech Support',
      icon: '👨‍💻',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'luna',
      name: 'Luna',
      description: 'Creative & Inspiring',
      accent: 'Australian',
      gender: 'Female',
      specialty: 'Creative Assistant',
      icon: '👩‍🎨',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'alex',
      name: 'Alex',
      description: 'Casual & Conversational',
      accent: 'Canadian',
      gender: 'Neutral',
      specialty: 'General Assistant',
      icon: '🤖',
      color: 'from-orange-500 to-red-600'
    }
  ]

  // Sample conversation
  const sampleConversation = [
    {
      id: 1,
      type: 'user',
      content: 'Hello, can you help me with my schedule today?',
      timestamp: '10:30 AM',
      duration: '2.3s'
    },
    {
      id: 2,
      type: 'assistant',
      content: 'Good morning! I\'d be happy to help you with your schedule. You have 3 meetings today: Team standup at 11 AM, Client presentation at 2 PM, and Project review at 4 PM. Would you like me to provide more details about any of these?',
      timestamp: '10:30 AM',
      duration: '4.7s',
      voice: 'aria'
    },
    {
      id: 3,
      type: 'user',
      content: 'Yes, tell me about the client presentation.',
      timestamp: '10:31 AM',
      duration: '1.8s'
    },
    {
      id: 4,
      type: 'assistant',
      content: 'Your client presentation is scheduled for 2 PM in Conference Room A. The topic is "Q4 Marketing Strategy Review" with ABC Corp. You have 45 minutes allocated, and I\'ve prepared your presentation materials. Should I remind you 15 minutes before?',
      timestamp: '10:31 AM',
      duration: '5.2s',
      voice: 'aria'
    }
  ]

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
  ]

  // Analytics data
  const analyticsData = [
    { metric: 'Daily Interactions', value: '127', change: '+12%', icon: MessageCircle },
    { metric: 'Average Response Time', value: '0.8s', change: '-5%', icon: Zap },
    { metric: 'Accuracy Rate', value: '98.7%', change: '+2%', icon: Target },
    { metric: 'User Satisfaction', value: '4.9/5', change: '+0.2', icon: Star }
  ]

  const tabs = [
    { id: 'assistant', label: 'Voice Assistant', icon: Mic },
    { id: 'conversations', label: 'Conversations', icon: MessageCircle },
    { id: 'voices', label: 'Voice Gallery', icon: Users },
    { id: 'commands', label: 'Commands', icon: Command },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const startListening = () => {
    setIsListening(true)
    setIsProcessing(false)
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        // Add to conversation
        const newMessage = {
          id: Date.now(),
          type: 'user',
          content: 'Sample voice input recognized',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          duration: '2.3s'
        }
        setConversation(prev => [...prev, newMessage])
      }, 2000)
    }, 3000)
  }

  const stopListening = () => {
    setIsListening(false)
    setIsProcessing(false)
  }

  const renderAssistant = () => (
    <div className="space-y-8">
      {/* Main Voice Interface */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <motion.div
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
            className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 ${
              isListening 
                ? 'bg-gradient-to-r from-red-500 to-pink-600 shadow-lg' 
                : isProcessing
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}
          >
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Mic className="w-16 h-16 text-white" />
              </motion.div>
            ) : isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-16 h-16 text-white" />
              </motion.div>
            ) : (
              <MicOff className="w-16 h-16 text-white" />
            )}
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-2">
            {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Ready to Help'}
          </h3>
          <p className="text-gray-600">
            {isListening 
              ? 'Speak clearly, I\'m listening to your command' 
              : isProcessing 
              ? 'Analyzing your request with AI intelligence'
              : 'Click the microphone or say "Hey Assistant" to start'}
          </p>
        </div>

        {/* Voice Controls */}
        <div className="flex justify-center space-x-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`p-4 rounded-full text-white font-medium flex items-center ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? (
              <>
                <Square className="w-5 h-5 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Start Listening
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center"
          >
            <Volume2 className="w-5 h-5 mr-2" />
            Test Voice
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </motion.button>
        </div>

        {/* Voice Settings Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Voice Speed</span>
              <span className="text-sm text-gray-600">{voiceSettings.speed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={voiceSettings.speed}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Voice Pitch</span>
              <span className="text-sm text-gray-600">{voiceSettings.pitch}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={voiceSettings.pitch}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Volume</span>
              <span className="text-sm text-gray-600">{Math.round(voiceSettings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={voiceSettings.volume}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Current Voice Assistant */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Current Voice Assistant
        </h4>
        {voicePersonalities.find(v => v.id === selectedVoice) && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${voicePersonalities.find(v => v.id === selectedVoice).color} flex items-center justify-center mr-4`}>
                <span className="text-white text-xl">{voicePersonalities.find(v => v.id === selectedVoice).icon}</span>
              </div>
              <div>
                <h5 className="font-semibold">{voicePersonalities.find(v => v.id === selectedVoice).name}</h5>
                <p className="text-sm text-gray-600">{voicePersonalities.find(v => v.id === selectedVoice).description}</p>
                <p className="text-xs text-gray-500">{voicePersonalities.find(v => v.id === selectedVoice).accent} • {voicePersonalities.find(v => v.id === selectedVoice).specialty}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('voices')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Change Voice
            </motion.button>
          </div>
        )}
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <item.icon className="w-8 h-8 text-blue-600" />
              <div className="text-right">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-gray-600">{item.metric}</p>
              </div>
            </div>
            <div className={`flex items-center text-sm ${
              item.change.startsWith('+') ? 'text-green-600' : 'text-blue-600'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{item.change} this week</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderConversations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
            Recent Conversations
          </h3>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {[...sampleConversation, ...conversation].map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                  <span>{message.timestamp}</span>
                  <span>{message.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVoices = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-600" />
          Voice Personality Gallery
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {voicePersonalities.map((voice) => (
            <motion.div
              key={voice.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedVoice(voice.id)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                selectedVoice === voice.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${voice.color} flex items-center justify-center mr-4`}>
                  <span className="text-white text-2xl">{voice.icon}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{voice.name}</h4>
                  <p className="text-sm text-gray-600">{voice.description}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Accent:</span>
                  <span className="font-medium">{voice.accent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gender:</span>
                  <span className="font-medium">{voice.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialty:</span>
                  <span className="font-medium">{voice.specialty}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedVoice === voice.id
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {selectedVoice === voice.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    'Select'
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
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
                animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4"
              >
                <Mic className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Voice Assistant AI
                </h1>
                <p className="text-gray-600">Advanced speech recognition & natural language processing</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-full flex items-center ${
                  isListening 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  isListening ? 'bg-red-500' : 'bg-green-500'
                }`} />
                <span className="text-sm font-medium">
                  {isListening ? 'Listening' : 'Ready'}
                </span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg transition-all"
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
            {activeTab === 'assistant' && renderAssistant()}
            {activeTab === 'conversations' && renderConversations()}
            {activeTab === 'voices' && renderVoices()}
            {activeTab === 'commands' && (
              <div className="text-center py-12">
                <Command className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Voice Commands</h3>
                <p className="text-gray-600">Manage and customize voice commands</p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Voice Analytics</h3>
                <p className="text-gray-600">Detailed analytics and usage insights</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Assistant Settings</h3>
                <p className="text-gray-600">Configure your voice assistant preferences</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default VoiceAssistantAI
