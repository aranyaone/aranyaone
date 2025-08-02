'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Zap, 
  Download, 
  Copy, 
  Play, 
  FileText, 
  Settings, 
  Cpu, 
  Database,
  Globe,
  Smartphone,
  Terminal,
  GitBranch,
  Bug,
  Lightbulb,
  Brain,
  Rocket,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BookOpen,
  Search,
  Filter,
  RefreshCw,
  Save,
  Share2,
  Eye,
  User,
  Clock,
  TrendingUp
} from 'lucide-react'

const CodeGeneratorPro = () => {
  const [activeTab, setActiveTab] = useState('generator')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedFramework, setSelectedFramework] = useState('react')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [codeHistory, setCodeHistory] = useState([])
  const [activeTemplate, setActiveTemplate] = useState(null)

  // Programming languages
  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨', color: 'from-yellow-400 to-yellow-500' },
    { id: 'python', name: 'Python', icon: '🐍', color: 'from-blue-400 to-green-400' },
    { id: 'typescript', name: 'TypeScript', icon: '🔷', color: 'from-blue-500 to-blue-600' },
    { id: 'react', name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { id: 'vue', name: 'Vue.js', icon: '💚', color: 'from-green-400 to-green-500' },
    { id: 'angular', name: 'Angular', icon: '🅰️', color: 'from-red-500 to-red-600' },
    { id: 'node', name: 'Node.js', icon: '🟢', color: 'from-green-500 to-green-600' },
    { id: 'php', name: 'PHP', icon: '🐘', color: 'from-purple-500 to-purple-600' },
    { id: 'java', name: 'Java', icon: '☕', color: 'from-orange-500 to-red-500' },
    { id: 'csharp', name: 'C#', icon: '#️⃣', color: 'from-purple-600 to-blue-600' },
    { id: 'swift', name: 'Swift', icon: '🍎', color: 'from-orange-400 to-red-500' },
    { id: 'kotlin', name: 'Kotlin', icon: '🎯', color: 'from-purple-500 to-orange-500' }
  ]

  // Code templates
  const templates = [
    {
      id: 'react-component',
      name: 'React Component',
      category: 'Frontend',
      description: 'Modern React functional component with hooks',
      icon: '⚛️',
      difficulty: 'Beginner',
      code: `import React, { useState, useEffect } from 'react'

const MyComponent = ({ title, children }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    console.log('Component mounted')
    return () => console.log('Component unmounted')
  }, [])
  
  const handleClick = () => {
    setCount(prev => prev + 1)
  }
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p>Count: {count}</p>
      <button 
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Increment
      </button>
      {children}
    </div>
  )
}

export default MyComponent`
    },
    {
      id: 'api-endpoint',
      name: 'REST API Endpoint',
      category: 'Backend',
      description: 'Express.js API route with validation',
      icon: '🌐',
      difficulty: 'Intermediate',
      code: `const express = require('express')
const router = express.Router()
const joi = require('joi')

// Validation schema
const userSchema = joi.object({
  name: joi.string().min(2).max(50).required(),
  email: joi.string().email().required(),
  age: joi.number().integer().min(18).max(120)
})

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
})

// POST new user
router.post('/users', async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      })
    }
    
    const user = new User(value)
    await user.save()
    
    res.status(201).json({ 
      success: true, 
      data: user 
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
})

module.exports = router`
    },
    {
      id: 'python-class',
      name: 'Python Class',
      category: 'Object-Oriented',
      description: 'Python class with methods and properties',
      icon: '🐍',
      difficulty: 'Beginner',
      code: `class User:
    def __init__(self, name, email, age=None):
        self.name = name
        self.email = email
        self.age = age
        self._is_active = True
    
    @property
    def is_active(self):
        return self._is_active
    
    @is_active.setter
    def is_active(self, value):
        if not isinstance(value, bool):
            raise ValueError("is_active must be a boolean")
        self._is_active = value
    
    def get_info(self):
        info = f"Name: {self.name}, Email: {self.email}"
        if self.age:
            info += f", Age: {self.age}"
        return info
    
    def deactivate(self):
        self.is_active = False
        print(f"User {self.name} has been deactivated")
    
    def __str__(self):
        return f"User({self.name}, {self.email})"
    
    def __repr__(self):
        return f"User(name='{self.name}', email='{self.email}', age={self.age})"

# Usage example
user = User("John Doe", "john@example.com", 30)
print(user.get_info())
print(f"Active: {user.is_active}")`
    },
    {
      id: 'database-model',
      name: 'Database Model',
      category: 'Database',
      description: 'Mongoose schema with validation',
      icon: '🗄️',
      difficulty: 'Intermediate',
      code: `const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
      },
      message: 'Please provide a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Virtual for full name
userSchema.virtual('displayName').get(function() {
  return this.name.charAt(0).toUpperCase() + this.name.slice(1)
})

module.exports = mongoose.model('User', userSchema)`
    }
  ]

  // Sample generated code
  const sampleCode = `// AI-Generated React Component
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AIComponent = ({ title, data, onUpdate }) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  
  useEffect(() => {
    if (data) {
      setItems(data)
    }
  }, [data])
  
  const handleAction = async (id) => {
    setLoading(true)
    try {
      await onUpdate(id)
      setItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {loading && <div className="loading-spinner">Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="border p-4 rounded">
            <h3>{item.name}</h3>
            <button onClick={() => handleAction(item.id)}>
              Action
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default AIComponent`

  const tabs = [
    { id: 'generator', label: 'Code Generator', icon: Code },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'debugging', label: 'AI Debugger', icon: Bug },
    { id: 'optimization', label: 'Optimizer', icon: Zap },
    { id: 'documentation', label: 'Docs Generator', icon: BookOpen }
  ]

  const generateCode = async () => {
    setIsGenerating(true)
    // Simulate AI code generation
    setTimeout(() => {
      setGeneratedCode(sampleCode)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  const renderGenerator = () => (
    <div className="space-y-8">
      {/* Code Configuration */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-blue-600" />
          AI Code Generator
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Programming Language
              </label>
              <div className="grid grid-cols-2 gap-3">
                {languages.slice(0, 6).map((lang) => (
                  <motion.button
                    key={lang.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedLanguage === lang.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{lang.icon}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Code Description
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your development needs in detail... Examples: 'Build a React dashboard with real-time charts, user authentication, and data export features' or 'Create a Node.js API with MongoDB integration, JWT authentication, and email notifications' or 'Design a responsive landing page with animations and contact forms'..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complexity Level
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code Style
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500">
                  <option>Clean & Modern</option>
                  <option>Functional</option>
                  <option>Object-Oriented</option>
                  <option>Minimal</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateCode}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating AI Code...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Code
                </>
              )}
            </motion.button>
          </div>

          {/* Code Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Generated Code</h4>
              {generatedCode && (
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 min-h-96">
              {generatedCode ? (
                <pre className="text-green-400 text-sm overflow-auto">
                  <code>{generatedCode}</code>
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Generated code will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6"
        >
          <Brain className="w-10 h-10 text-blue-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">AI-Powered</h4>
          <p className="text-gray-600 text-sm">Advanced AI algorithms generate production-ready code</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6"
        >
          <Zap className="w-10 h-10 text-green-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">Lightning Fast</h4>
          <p className="text-gray-600 text-sm">Generate complex code in seconds, not hours</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6"
        >
          <Award className="w-10 h-10 text-purple-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">Best Practices</h4>
          <p className="text-gray-600 text-sm">Code follows industry standards and patterns</p>
        </motion.div>
      </div>
    </div>
  )

  const renderTemplates = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <FileText className="w-8 h-8 mr-3 text-blue-600" />
          Code Templates Library
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -2 }}
              onClick={() => setActiveTemplate(template)}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 cursor-pointer hover:border-blue-500 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{template.icon}</span>
                  <div>
                    <h4 className="text-lg font-semibold">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  template.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  template.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {template.difficulty}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-4">{template.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Use Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Template Preview */}
      {activeTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-semibold flex items-center">
              <span className="text-2xl mr-3">{activeTemplate.icon}</span>
              {activeTemplate.name}
            </h4>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
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
          
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-sm overflow-auto">
              <code>{activeTemplate.code}</code>
            </pre>
          </div>
        </motion.div>
      )}
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
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4"
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Code Generator Pro
                </h1>
                <p className="text-gray-600">AI-powered code generation & development tools</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI Ready</span>
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
            {activeTab === 'generator' && renderGenerator()}
            {activeTab === 'templates' && renderTemplates()}
            {activeTab === 'history' && (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Code History</h3>
                <p className="text-gray-600">View and manage your generated code history</p>
              </div>
            )}
            {activeTab === 'debugging' && (
              <div className="text-center py-12">
                <Bug className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Debugger</h3>
                <p className="text-gray-600">Intelligent code debugging and error detection</p>
              </div>
            )}
            {activeTab === 'optimization' && (
              <div className="text-center py-12">
                <Zap className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Code Optimizer</h3>
                <p className="text-gray-600">AI-powered code optimization and performance enhancement</p>
              </div>
            )}
            {activeTab === 'documentation' && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Documentation Generator</h3>
                <p className="text-gray-600">Automatic documentation generation for your code</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CodeGeneratorPro
