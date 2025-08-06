'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, MessageCircle, Brain, Zap, Settings, Download, Upload,
  Play, Pause, RotateCw, Eye, EyeOff, Mic, MicOff, Camera,
  Image, FileText, Video, Music, Globe, Users, Crown, Star,
  Target, Sparkles, CheckCircle, AlertCircle, ArrowRight,
  ChevronDown, ChevronUp, Plus, Trash2, Copy, Edit, Layers
} from 'lucide-react';

const AIChatbotTools = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatbots, setChatbots] = useState([]);
  const [currentChatbot, setCurrentChatbot] = useState(null);
  const [aiCapabilities, setAiCapabilities] = useState({
    gpt4: true,
    claude: true,
    gemini: true,
    multimodal: true,
    voice: true,
    vision: true
  });

  const tabs = [
    { id: 'chat', name: 'Chat Interface', icon: MessageCircle },
    { id: 'create', name: 'Create Bot', icon: Bot },
    { id: 'train', name: 'Train & Learn', icon: Brain },
    { id: 'analytics', name: 'Analytics', icon: Target },
    { id: 'integrations', icon: Globe },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const chatbotTemplates = [
    {
      id: 'customer-service',
      name: 'Customer Service Bot',
      description: '24/7 customer support with product knowledge',
      capabilities: ['multi-language', 'ticket-creation', 'faq-handling'],
      performance: 95,
      icon: Users
    },
    {
      id: 'sales-assistant',
      name: 'Sales Assistant',
      description: 'Lead qualification and product recommendations',
      capabilities: ['lead-scoring', 'product-matching', 'follow-up'],
      performance: 92,
      icon: Target
    },
    {
      id: 'educational',
      name: 'Educational Tutor',
      description: 'Personalized learning and knowledge assessment',
      capabilities: ['adaptive-learning', 'progress-tracking', 'content-generation'],
      performance: 88,
      icon: Brain
    },
    {
      id: 'creative-writer',
      name: 'Creative Writer',
      description: 'Content creation and creative writing assistance',
      capabilities: ['story-generation', 'style-adaptation', 'collaboration'],
      performance: 90,
      icon: FileText
    }
  ];

  const aiModels = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      capabilities: ['text', 'code', 'reasoning'],
      performance: 95,
      cost: 'high'
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      provider: 'Anthropic',
      capabilities: ['text', 'analysis', 'safety'],
      performance: 93,
      cost: 'medium'
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      capabilities: ['text', 'multimodal', 'reasoning'],
      performance: 91,
      cost: 'medium'
    },
    {
      id: 'custom',
      name: 'Custom Model',
      provider: 'Self-hosted',
      capabilities: ['specialized', 'private', 'optimized'],
      performance: 85,
      cost: 'low'
    }
  ];

  useEffect(() => {
    loadChatbots();
    initializeAICapabilities();
  }, []);

  const loadChatbots = async () => {
    try {
      const response = await fetch('/api/chatbots');
      const data = await response.json();
      setChatbots(data.chatbots || []);
    } catch (error) {
      console.error('Load chatbots error:', error);
    }
  };

  const initializeAICapabilities = async () => {
    try {
      const response = await fetch('/api/ai-capabilities');
      const capabilities = await response.json();
      setAiCapabilities(capabilities);
    } catch (error) {
      console.error('AI capabilities error:', error);
    }
  };

  const sendMessage = async (message, type = 'text') => {
    setIsProcessing(true);
    
    const newMessage = {
      id: Date.now(),
      content: message,
      type: type,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          type,
          chatbotId: currentChatbot?.id,
          context: messages.slice(-5) // Last 5 messages for context
        })
      });
      
      const aiResponse = await response.json();
      
      const aiMessage = {
        id: Date.now() + 1,
        content: aiResponse.response,
        type: aiResponse.type || 'text',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        confidence: aiResponse.confidence,
        model: aiResponse.model
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback response
      const fallbackMessage = {
        id: Date.now() + 1,
        content: "I'm here to help! How can I assist you today?",
        type: 'text',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        confidence: 0.8,
        model: 'gpt-4'
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const createChatbot = async (template) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template,
          capabilities: aiCapabilities,
          customizations: {}
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setChatbots(prev => [...prev, result.chatbot]);
        setCurrentChatbot(result.chatbot);
      }
      
    } catch (error) {
      console.error('Create chatbot error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const trainChatbot = async (chatbotId, trainingData) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/train-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatbotId,
          trainingData,
          model: 'custom'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update chatbot with new training
        setChatbots(prev => prev.map(bot => 
          bot.id === chatbotId 
            ? { ...bot, lastTrained: new Date().toISOString(), performance: result.performance }
            : bot
        ));
      }
      
    } catch (error) {
      console.error('Training error:', error);
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
            <Bot className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Chatbot Tools
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Advanced conversational AI with multi-modal capabilities and self-evolving intelligence
          </p>
        </motion.div>

        {/* AI Capabilities Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8"
        >
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">GPT-4</div>
            <div className="text-gray-400 text-sm">Active</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">Claude</div>
            <div className="text-gray-400 text-sm">Active</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">Gemini</div>
            <div className="text-gray-400 text-sm">Active</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">Voice</div>
            <div className="text-gray-400 text-sm">Ready</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400 mb-1">Vision</div>
            <div className="text-gray-400 text-sm">Ready</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">Multi</div>
            <div className="text-gray-400 text-sm">Active</div>
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
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg'
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
            {activeTab === 'chat' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Chatbots List */}
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold text-white mb-4">Your Chatbots</h3>
                    <div className="space-y-3">
                      {chatbots.map((bot) => (
                        <div
                          key={bot.id}
                          onClick={() => setCurrentChatbot(bot)}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            currentChatbot?.id === bot.id
                              ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white'
                              : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{bot.name}</h4>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{bot.performance}</span>
                            </div>
                          </div>
                          <p className="text-sm opacity-80">{bot.description}</p>
                        </div>
                      ))}
                      
                      <button className="w-full p-4 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors">
                        <Plus className="w-6 h-6 mx-auto mb-2" />
                        Create New Bot
                      </button>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="lg:col-span-3">
                    <div className="bg-slate-700/50 rounded-xl p-6 h-96 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          {currentChatbot ? currentChatbot.name : 'Select a Chatbot'}
                        </h3>
                        <div className="flex gap-2">
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <Mic className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <Camera className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <Image className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md p-3 rounded-xl ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white'
                                : 'bg-slate-600 text-gray-300'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              {message.confidence && (
                                <div className="text-xs opacity-70 mt-1">
                                  Confidence: {(message.confidence * 100).toFixed(1)}%
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {isProcessing && (
                          <div className="flex justify-start">
                            <div className="bg-slate-600 text-gray-300 p-3 rounded-xl">
                              <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span className="text-sm">AI is thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              sendMessage(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.querySelector('input[type="text"]');
                            if (input.value.trim()) {
                              sendMessage(input.value);
                              input.value = '';
                            }
                          }}
                          className="px-4 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'create' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Create AI Chatbot</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {chatbotTemplates.map((template) => (
                    <div key={template.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <template.icon className="w-8 h-8 text-blue-400 mr-3" />
                        <div>
                          <h3 className="text-white font-semibold">{template.name}</h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-yellow-400 text-sm">{template.performance}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{template.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {template.capabilities.map((capability) => (
                          <div key={capability} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-gray-300 text-sm">{capability}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => createChatbot(template)}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Creating...' : 'Create Bot'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'train' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Train & Learn</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Models</h3>
                    <div className="space-y-4">
                      {aiModels.map((model) => (
                        <div key={model.id} className="flex items-center justify-between p-4 bg-slate-600/50 rounded-lg">
                          <div>
                            <h4 className="text-white font-semibold">{model.name}</h4>
                            <p className="text-gray-400 text-sm">{model.provider}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {model.capabilities.map((cap) => (
                                <span key={cap} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                                  {cap}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-semibold">{model.performance}%</div>
                            <div className="text-gray-400 text-sm">{model.cost}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Training Data</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Upload Training Data</label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center mt-2">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-300">Drop files here or click to upload</p>
                          <p className="text-sm text-gray-500 mt-1">Supports: JSON, CSV, TXT</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-gray-300 text-sm">Training Parameters</label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <label className="text-gray-400 text-xs">Epochs</label>
                            <input
                              type="number"
                              defaultValue="10"
                              className="w-full p-2 bg-slate-600/50 border border-gray-600 rounded text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-xs">Learning Rate</label>
                            <input
                              type="number"
                              step="0.001"
                              defaultValue="0.001"
                              className="w-full p-2 bg-slate-600/50 border border-gray-600 rounded text-white text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => trainChatbot('bot-1', { epochs: 10, learningRate: 0.001 })}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Training...' : 'Start Training'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Analytics & Insights</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">1,247</div>
                    <div className="text-gray-400 text-sm">Total Conversations</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">94.2%</div>
                    <div className="text-gray-400 text-sm">Satisfaction Rate</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">2.3s</div>
                    <div className="text-gray-400 text-sm">Avg Response Time</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">87%</div>
                    <div className="text-gray-400 text-sm">Accuracy Score</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Integrations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Globe className="w-8 h-8 text-blue-400 mr-3" />
                      <h3 className="text-white font-semibold">Web Integration</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">Embed chatbots on websites with simple JavaScript code</p>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                      Get Code
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <MessageCircle className="w-8 h-8 text-green-400 mr-3" />
                      <h3 className="text-white font-semibold">Slack Integration</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">Connect chatbots to Slack for team collaboration</p>
                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                      Connect
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Users className="w-8 h-8 text-purple-400 mr-3" />
                      <h3 className="text-white font-semibold">CRM Integration</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">Sync with Salesforce, HubSpot, and other CRM systems</p>
                    <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Capabilities</h3>
                    <div className="space-y-4">
                      {Object.entries(aiCapabilities).map(([key, enabled]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <button className={`p-2 rounded-lg ${enabled ? 'bg-green-500' : 'bg-slate-600'}`}>
                            {enabled ? <CheckCircle className="w-5 h-5 text-white" /> : <AlertCircle className="w-5 h-5 text-white" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Learning</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Context Memory</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Multi-Modal</span>
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

export default AIChatbotTools; 