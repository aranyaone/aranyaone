import Head from 'next/head'
import { useState, useRef } from 'react'

export default function ClientChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Aranya One support. How can I help you today?",
      sender: "support",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      avatar: "🤖"
    },
    {
      id: 2,
      text: "Hi! I'm interested in your AI automation services. Can you tell me more?",
      sender: "user",
      timestamp: new Date(Date.now() - 240000).toISOString(),
      avatar: "👤"
    },
    {
      id: 3,
      text: "Absolutely! Our AI automation can help streamline your business processes. What industry are you in?",
      sender: "support",
      timestamp: new Date(Date.now() - 180000).toISOString(),
      avatar: "🤖"
    }
  ])
  
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
      avatar: "👤"
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)
    
    // Simulate support response
    setTimeout(() => {
      setIsTyping(false)
      const supportMessage = {
        id: messages.length + 2,
        text: "Thanks for your message! Let me connect you with a specialist who can provide more details.",
        sender: "support",
        timestamp: new Date().toISOString(),
        avatar: "🤖"
      }
      setMessages(prev => [...prev, supportMessage])
      scrollToBottom()
    }, 2000)
    
    scrollToBottom()
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileMessage = {
        id: messages.length + 1,
        text: `📎 Uploaded file: ${file.name}`,
        sender: "user",
        timestamp: new Date().toISOString(),
        avatar: "👤",
        isFile: true
      }
      setMessages(prev => [...prev, fileMessage])
      scrollToBottom()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div>
      <Head>
        <title>Client Chat - Aranya One</title>
        <meta name="description" content="Chat with our support team" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-800">← Back</a>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AO</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Aranya One Support</h1>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online - Typically replies in minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                📞
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                📹
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>🤖</span>
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border max-w-xs">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t px-6 py-4">
            <div className="flex items-end gap-3">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,application/pdf,.doc,.docx,.txt"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Upload file"
              >
                📎
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  rows="1"
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                ➤
              </button>
            </div>
            
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <span>💡 Tip: Press Enter to send, Shift+Enter for new line</span>
              <span>•</span>
              <span>📁 Supported files: Images, PDF, Documents</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.sender === 'user'
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}>
        <span>{message.avatar}</span>
      </div>
      
      <div className={`flex flex-col max-w-xs lg:max-w-md ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl shadow-sm border ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-white text-gray-800 rounded-bl-md'
        } ${message.isFile ? 'border-dashed border-blue-300' : ''}`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        
        <span className={`text-xs text-gray-500 mt-1 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}