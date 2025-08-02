'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Bot, 
  User, 
  Send, 
  Phone, 
  Mail, 
  Clock, 
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  Settings,
  Download,
  Users,
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Brain,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
  Plus,
  Minus,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Headphones,
  Mic,
  Video,
  FileText,
  Image,
  Paperclip,
  Smile,
  Heart,
  Coffee,
  Globe,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Bookmark,
  Flag,
  Share2,
  Copy,
  Archive,
  Trash2,
  Edit,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  Minimize,
  Maximize,
  X
} from 'lucide-react'

const CustomerSupportAI = () => {
  const [activeTab, setActiveTab] = useState('chat')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [chatMessage, setChatMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiMode, setAiMode] = useState('auto')

  // Support metrics
  const supportMetrics = [
    {
      label: 'Response Time',
      value: '0.8s',
      change: '-45%',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: Clock
    },
    {
      label: 'Resolution Rate',
      value: '94.7%',
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: CheckCircle
    },
    {
      label: 'Customer Satisfaction',
      value: '4.9/5',
      change: '+8%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Star
    },
    {
      label: 'Active Tickets',
      value: '127',
      change: '-23%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: MessageSquare
    }
  ]

  // Support tickets
  const supportTickets = [
    {
      id: 'TK-001',
      customer: 'Sarah Johnson',
      subject: 'Login Issues with Mobile App',
      category: 'Technical',
      priority: 'High',
      status: 'Open',
      agent: 'AI Assistant',
      created: '2 hours ago',
      lastUpdate: '15 minutes ago',
      satisfaction: 5,
      messages: 8
    },
    {
      id: 'TK-002',
      customer: 'Mike Chen',
      subject: 'Billing Question - Pro Plan',
      category: 'Billing',
      priority: 'Medium',
      status: 'In Progress',
      agent: 'Human Agent',
      created: '4 hours ago',
      lastUpdate: '1 hour ago',
      satisfaction: 4,
      messages: 12
    },
    {
      id: 'TK-003',
      customer: 'Emily Davis',
      subject: 'Feature Request - Export Options',
      category: 'Feature',
      priority: 'Low',
      status: 'Resolved',
      agent: 'AI Assistant',
      created: '1 day ago',
      lastUpdate: '3 hours ago',
      satisfaction: 5,
      messages: 6
    },
    {
      id: 'TK-004',
      customer: 'Alex Rodriguez',
      subject: 'Performance Issues on Dashboard',
      category: 'Technical',
      priority: 'High',
      status: 'Escalated',
      agent: 'Senior Agent',
      created: '6 hours ago',
      lastUpdate: '30 minutes ago',
      satisfaction: 3,
      messages: 15
    }
  ]

  // Chat conversation
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'ai',
      message: 'Hello! I\'m your AI support assistant. How can I help you today?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'user',
      message: 'I\'m having trouble accessing my dashboard. It keeps showing a loading screen.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'ai',
      message: 'I understand you\'re experiencing issues with the dashboard loading. Let me help you troubleshoot this. Can you please tell me which browser you\'re using?',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'user',
      message: 'I\'m using Chrome on Windows 11.',
      timestamp: '10:33 AM',
      type: 'text'
    },
    {
      id: 5,
      sender: 'ai',
      message: 'Thank you for that information. Chrome on Windows 11 should work perfectly. Let\'s try these steps:\n\n1. Clear your browser cache and cookies\n2. Disable browser extensions temporarily\n3. Try accessing in incognito mode\n\nWould you like me to guide you through clearing the cache first?',
      timestamp: '10:33 AM',
      type: 'text'
    }
  ])

  // AI capabilities
  const aiCapabilities = [
    {
      name: 'Natural Language Processing',
      description: 'Understands complex customer queries',
      accuracy: '96.8%',
      icon: Brain
    },
    {
      name: 'Sentiment Analysis',
      description: 'Detects customer emotions and urgency',
      accuracy: '94.2%',
      icon: Heart
    },
    {
      name: 'Auto-Resolution',
      description: 'Resolves common issues automatically',
      accuracy: '89.5%',
      icon: Zap
    },
    {
      name: 'Knowledge Mining',
      description: 'Learns from previous conversations',
      accuracy: '92.1%',
      icon: Search
    }
  ]

  // Knowledge base topics
  const knowledgeBase = [
    {
      category: 'Account & Billing',
      articles: 45,
      views: '12.5K',
      topics: ['Payment Issues', 'Plan Upgrades', 'Refunds', 'Invoices']
    },
    {
      category: 'Technical Support',
      articles: 78,
      views: '28.3K',
      topics: ['Login Problems', 'Performance', 'Integrations', 'Mobile App']
    },
    {
      category: 'Features & How-to',
      articles: 92,
      views: '35.7K',
      topics: ['Getting Started', 'Advanced Features', 'Customization', 'Exports']
    },
    {
      category: 'Security & Privacy',
      articles: 23,
      views: '8.9K',
      topics: ['Data Protection', 'SSL Certificates', 'Compliance', 'Two-Factor Auth']
    }
  ]

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    }

    setChatHistory([...chatHistory, newMessage])
    setChatMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        sender: 'ai',
        message: 'I understand your concern. Let me analyze this and provide you with the best solution. Please give me a moment to process your request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      }
      setChatHistory(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'text-blue-600 bg-blue-100'
      case 'In Progress': return 'text-yellow-600 bg-yellow-100'
      case 'Resolved': return 'text-green-600 bg-green-100'
      case 'Escalated': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportMetrics.map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2 }}
            className={`${metric.bgColor} rounded-xl p-6 border border-gray-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
              <span className="text-green-600 text-sm font-medium">{metric.change}</span>
            </div>
            <div className={`text-2xl font-bold ${metric.color} mb-2`}>
              {metric.value}
            </div>
            <div className="text-sm text-gray-600">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Support Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tickets */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Recent Support Tickets</h3>
          <div className="space-y-4">
            {supportTickets.slice(0, 4).map((ticket, index) => (
              <motion.div
                key={ticket.id}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{ticket.subject}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{ticket.customer}</span>
                    <span className="mx-2">•</span>
                    <span>{ticket.created}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-6">AI Assistant Capabilities</h3>
          <div className="space-y-4">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <capability.icon className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{capability.name}</h4>
                    <p className="text-sm text-gray-600">{capability.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{capability.accuracy}</div>
                  <div className="text-xs text-gray-500">Accuracy</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderChat = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">AI Support Assistant</h3>
            <div className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Online & Ready to Help
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <Phone className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <Video className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatHistory.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="whitespace-pre-line">{message.message}</p>
              <div className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Describe your issue, question, or concern in detail. Our AI will analyze your request and provide personalized assistance or connect you with the right specialist..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Paperclip className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Smile className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )

  const renderTickets = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Escalated</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Technical</option>
              <option>Billing</option>
              <option>Feature</option>
            </select>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets by ID, customer name, issue type, priority level, status, or date range..."
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold">Support Tickets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {supportTickets.map((ticket) => (
                <motion.tr
                  key={ticket.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className="cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.agent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.lastUpdate}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderKnowledge = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6">Knowledge Base</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {knowledgeBase.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-gray-200"
            >
              <h4 className="font-semibold text-gray-800 mb-4">{category.category}</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">{category.articles} articles</span>
                <span className="text-sm text-gray-600">{category.views} views</span>
              </div>
              <div className="space-y-2">
                {category.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <ArrowRight className="w-3 h-3 mr-2" />
                    {topic}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4"
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Customer Support AI
                </h1>
                <p className="text-gray-600">Intelligent support platform with AI-powered assistance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center"
              >
                <Bot className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI Active</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'chat', label: 'AI Chat', icon: MessageSquare },
              { id: 'tickets', label: 'Support Tickets', icon: FileText },
              { id: 'knowledge', label: 'Knowledge Base', icon: Brain }
            ].map((tab) => (
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
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'chat' && renderChat()}
            {activeTab === 'tickets' && renderTickets()}
            {activeTab === 'knowledge' && renderKnowledge()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CustomerSupportAI
