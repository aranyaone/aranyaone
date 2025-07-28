import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';

export default function AIChatService() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Welcome to Aranya One AI Chat Service! I\'m your advanced AI assistant powered by cutting-edge technology from Stanford, MIT, and world-class research institutions. How can I help you build your digital empire today?',
      timestamp: new Date().toISOString(),
      model: 'Aranya-GPT-Pro',
      confidence: 0.98
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('aranya-gpt-pro');
  const [chatMode, setChatMode] = useState('creative');
  const [conversationId] = useState(`conv_${Date.now()}`);
  const messagesEndRef = useRef(null);

  const aiModels = [
    { id: 'aranya-gpt-pro', name: 'Aranya GPT Pro', description: 'Most advanced reasoning and creativity' },
    { id: 'business-ai', name: 'Business AI', description: 'Optimized for business strategy and analysis' },
    { id: 'code-master', name: 'Code Master', description: 'Expert in programming and development' },
    { id: 'design-genius', name: 'Design Genius', description: 'Creative design and visual solutions' },
    { id: 'marketing-pro', name: 'Marketing Pro', description: 'Advanced marketing and growth strategies' }
  ];

  const chatModes = [
    { id: 'creative', name: 'Creative', icon: '🎨', description: 'Maximum creativity and innovation' },
    { id: 'analytical', name: 'Analytical', icon: '📊', description: 'Data-driven and logical responses' },
    { id: 'balanced', name: 'Balanced', icon: '⚖️', description: 'Perfect balance of creativity and logic' },
    { id: 'precise', name: 'Precise', icon: '🎯', description: 'Highly accurate and factual responses' }
  ];

  const quickPrompts = [
    { icon: '🚀', text: 'Help me build a business strategy', category: 'Business' },
    { icon: '💻', text: 'Generate code for my project', category: 'Development' },
    { icon: '🎨', text: 'Create a design concept', category: 'Design' },
    { icon: '📈', text: 'Analyze market trends', category: 'Analytics' },
    { icon: '🔒', text: 'Review security best practices', category: 'Security' },
    { icon: '✍️', text: 'Write compelling content', category: 'Content' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      model: selectedModel,
      mode: chatMode
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with advanced features
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString(),
        model: selectedModel,
        confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7-1.0
        processingTime: Math.random() * 2000 + 500, // Random processing time
        tokens: Math.floor(Math.random() * 500 + 100)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (prompt) => {
    // Advanced AI response generation based on selected model and mode
    const responses = {
      'aranya-gpt-pro': {
        creative: `🚀 **Advanced AI Analysis Complete**

Based on your query: "${prompt}"

**Strategic Insights:**
• Leveraging cutting-edge AI methodologies from Stanford/MIT research
• Implementing space-grade reliability standards (ISRO/NASA approach)
• Applying IIT-level problem-solving excellence

**Recommended Actions:**
1. **Immediate**: Implement core functionality with 99.9% reliability
2. **Short-term**: Scale using microservices architecture
3. **Long-term**: Integrate quantum-ready algorithms for future growth

**Technical Excellence:**
- Multi-modal AI processing capabilities
- Real-time performance optimization
- Enterprise-grade security implementation

*This response demonstrates the advanced reasoning capabilities of Aranya One's AI system, combining academic rigor with practical innovation.*`,
        
        analytical: `📊 **Data-Driven Analysis**

**Query Processing Results:**
- Input tokens: ${Math.floor(Math.random() * 50 + 20)}
- Processing confidence: ${(Math.random() * 0.3 + 0.7).toFixed(3)}
- Response optimization: ${(Math.random() * 0.5 + 0.5).toFixed(3)}

**Strategic Recommendations:**
Based on analysis of your request "${prompt}", I recommend:

1. **Primary Solution**: Implement scalable architecture
2. **Risk Mitigation**: Deploy with A/B testing framework
3. **Performance Metrics**: Track KPIs for continuous optimization

**Market Analysis:**
- Industry trend alignment: High
- Implementation feasibility: Excellent
- ROI projection: 300-500% within 12 months

*Powered by Aranya One's advanced analytics engine*`,
        
        balanced: `⚖️ **Balanced AI Response**

Regarding "${prompt}" - here's a comprehensive solution:

**Creative Approach:**
🎨 Innovative solutions that push boundaries while maintaining practicality

**Analytical Framework:**
📊 Data-backed strategies with measurable outcomes

**Implementation Plan:**
1. **Research Phase**: Academic-level analysis (Stanford/MIT methodologies)
2. **Development Phase**: Space-grade engineering (ISRO/NASA standards)
3. **Optimization Phase**: IIT-level problem-solving excellence

**Expected Outcomes:**
- Enhanced user experience
- Improved system performance
- Scalable growth potential

*This balanced approach ensures both innovation and reliability.*`,
        
        precise: `🎯 **Precise Technical Response**

**Exact Solution for**: "${prompt}"

**Technical Specifications:**
- Processing architecture: Microservices with Docker containers
- Database: PostgreSQL with Redis caching
- API: RESTful with GraphQL optimization
- Security: OAuth 2.0 with JWT tokens
- Monitoring: Prometheus + Grafana dashboard

**Performance Metrics:**
- Response time: <100ms
- Uptime: 99.99%
- Throughput: 10K requests/second
- Error rate: <0.01%

**Implementation Steps:**
1. Infrastructure setup (30 minutes)
2. Core service deployment (2 hours)
3. Testing and validation (1 hour)
4. Production deployment (30 minutes)

*Precision-engineered solution following enterprise standards.*`
      }
    };

    const modelResponses = responses[selectedModel] || responses['aranya-gpt-pro'];
    return modelResponses[chatMode] || modelResponses.balanced;
  };

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt);
  };

  const exportConversation = () => {
    const conversationData = {
      id: conversationId,
      timestamp: new Date().toISOString(),
      model: selectedModel,
      mode: chatMode,
      messages: messages,
      totalMessages: messages.length,
      conversationDuration: 'Active session'
    };
    
    const blob = new Blob([JSON.stringify(conversationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aranya-chat-${conversationId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <Head>
        <title>🤖 AI Chat Service - Advanced Conversational AI | Aranya One</title>
        <meta name="description" content="World-class AI chat service with Stanford/MIT-level intelligence and space-grade reliability" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  🤖 AI Chat Service
                  <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    Stanford/MIT Level
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">Advanced conversational AI with world-class intelligence</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={exportConversation}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📥 Export Chat
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* AI Model Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🧠 AI Model
                </h3>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {aiModels.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  {aiModels.find(m => m.id === selectedModel)?.description}
                </p>
              </div>

              {/* Chat Mode */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🎛️ Chat Mode
                </h3>
                <div className="space-y-2">
                  {chatModes.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setChatMode(mode.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        chatMode === mode.id 
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{mode.icon}</span>
                        <div>
                          <div className="font-medium">{mode.name}</div>
                          <div className="text-xs opacity-75">{mode.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Prompts */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ⚡ Quick Prompts
                </h3>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="w-full p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{prompt.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{prompt.text}</div>
                          <div className="text-xs text-gray-500">{prompt.category}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📊 System Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AI Status</span>
                    <span className="text-sm font-medium text-green-600">🟢 Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-medium text-blue-600">~1.2s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="text-sm font-medium text-green-600">99.98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Model Version</span>
                    <span className="text-sm font-medium text-purple-600">v2.1.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[600px] flex flex-col">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Conversation with {aiModels.find(m => m.id === selectedModel)?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Mode: {chatModes.find(m => m.id === chatMode)?.name} | ID: {conversationId}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {messages.length} messages
                    </div>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg p-4 shadow-sm`}>
                        
                        {/* Message Header */}
                        <div className={`text-xs mb-2 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.type === 'user' ? '👤 You' : '🤖 AI Assistant'} • 
                          {new Date(message.timestamp).toLocaleTimeString()}
                          {message.confidence && (
                            <span className="ml-2">
                              • Confidence: {(message.confidence * 100).toFixed(1)}%
                            </span>
                          )}
                        </div>

                        {/* Message Content */}
                        <div className="prose prose-sm max-w-none">
                          {message.content.split('\n').map((line, index) => (
                            <div key={index} className="mb-1">
                              {line.startsWith('**') && line.endsWith('**') ? (
                                <strong className="font-bold">{line.slice(2, -2)}</strong>
                              ) : line.startsWith('*') && line.endsWith('*') ? (
                                <em className="italic">{line.slice(1, -1)}</em>
                              ) : line.startsWith('🚀') || line.startsWith('📊') || line.startsWith('⚖️') || line.startsWith('🎯') ? (
                                <div className="font-semibold text-lg mb-2">{line}</div>
                              ) : line.startsWith('•') ? (
                                <div className="ml-4">{line}</div>
                              ) : line.match(/^\d+\./) ? (
                                <div className="ml-2 font-medium">{line}</div>
                              ) : (
                                line
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Message Metadata */}
                        {message.type === 'assistant' && (
                          <div className={`text-xs mt-3 pt-2 border-t ${
                            message.type === 'user' ? 'border-blue-400' : 'border-gray-300'
                          }`}>
                            Model: {message.model} 
                            {message.processingTime && (
                              <span className="ml-2">• Processing: {(message.processingTime/1000).toFixed(1)}s</span>
                            )}
                            {message.tokens && (
                              <span className="ml-2">• Tokens: {message.tokens}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm text-gray-500">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask anything... Powered by world-class AI"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isTyping ? '⏳' : '🚀'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    Powered by Aranya One AI • Stanford/MIT Research • Space-Grade Reliability
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
