import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

export default function BujjiAI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '🤖 Hello! I\'m Bujji AI, your advanced digital assistant. I can help you build websites, analyze data, generate content, and manage your digital empire. What would you like to work on today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [aiMemory, setAiMemory] = useState({
    totalInteractions: 1247,
    projectsCreated: 23,
    codeGenerated: '12.4k lines',
    lastActive: 'Just now'
  })
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined') {
      setVoiceSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startVoiceRecognition = () => {
    if (!voiceSupported) {
      alert('Voice recognition not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInputMessage(transcript)
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      setAiMemory(prev => ({
        ...prev,
        totalInteractions: prev.totalInteractions + 1,
        lastActive: 'Just now'
      }))
    }, 1500)
  }

  const generateAIResponse = (input) => {
    const responses = {
      'website': '🌐 I can help you build a world-class website! I suggest using React/Next.js with AI-powered components. Would you like me to generate a modern landing page with interactive elements?',
      'dashboard': '📊 Let me create an advanced dashboard with real-time analytics, ML insights, and predictive charts. I can integrate multiple data sources and add interactive visualizations.',
      'ai': '🤖 I can implement various AI features: chatbots, content generation, image analysis, voice recognition, and machine learning models. What specific AI capability interests you?',
      'analyze': '📈 I\'ll analyze your data using advanced algorithms. I can provide insights on user behavior, performance metrics, growth predictions, and optimization recommendations.',
      'code': '💻 I can generate clean, efficient code in multiple languages. Whether it\'s React components, API endpoints, database schemas, or complex algorithms - just tell me what you need!',
      'design': '🎨 I can create modern UI designs with beautiful animations, responsive layouts, and accessibility features. I follow the latest design trends and best practices.',
      'seo': '🔍 I can optimize your site for search engines with advanced SEO strategies, meta optimization, schema markup, and performance improvements.',
      'security': '🔒 I can implement robust security measures: authentication, encryption, API security, and vulnerability scanning to protect your digital assets.'
    }

    const inputLower = input.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (inputLower.includes(key)) {
        return response
      }
    }

    return `🤔 Interesting question! Based on current trends, I recommend focusing on AI integration, real-time features, and user experience optimization. I can help you implement cutting-edge technologies like WebGL, WebAssembly, or advanced ML models. What's your main goal?`
  }

  const quickActions = [
    { icon: '🌐', label: 'Build Website', action: 'Create a modern AI-powered website' },
    { icon: '📊', label: 'Analytics Dashboard', action: 'Generate advanced analytics dashboard' },
    { icon: '🤖', label: 'AI Integration', action: 'Add AI features to my project' },
    { icon: '🎨', label: 'UI Design', action: 'Design modern user interface' },
    { icon: '💻', label: 'Generate Code', action: 'Write clean, efficient code' },
    { icon: '🔍', label: 'SEO Optimize', action: 'Optimize for search engines' }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Bujji AI Panel - Aranya One</title>
        <meta name="description" content="Advanced AI assistant for digital empire management" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🤖 Bujji AI Panel
          </h1>
          <p className="text-gray-600 text-lg">
            Your advanced AI assistant for building world-class digital solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* AI Memory & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
                🧠 AI Memory
              </h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-royal-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-royal-purple-600">{aiMemory.totalInteractions}</div>
                  <div className="text-sm text-gray-600">Total Interactions</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{aiMemory.projectsCreated}</div>
                  <div className="text-sm text-gray-600">Projects Created</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{aiMemory.codeGenerated}</div>
                  <div className="text-sm text-gray-600">Code Generated</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-lg font-semibold text-orange-600">{aiMemory.lastActive}</div>
                  <div className="text-sm text-gray-600">Last Active</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
                ⚡ Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(action.action)}
                    className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-royal-purple-50 hover:border-royal-purple-200 border border-gray-200 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{action.icon}</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-royal-purple-700">{action.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-royal-gradient rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-gray-900">Bujji AI</h3>
                      <p className="text-sm text-green-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Online & Ready
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-royal-purple-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-royal-purple-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask Bujji AI anything about building advanced websites, AI features, or digital strategies..."
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent"
                    />
                    {voiceSupported && (
                      <button
                        onClick={startVoiceRecognition}
                        disabled={isListening}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title="Voice input"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-royal-purple-500 hover:bg-royal-purple-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl transition-colors duration-300 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send</span>
                  </button>
                </div>
                {isListening && (
                  <div className="mt-2 text-center text-sm text-red-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    Listening... Speak now
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}