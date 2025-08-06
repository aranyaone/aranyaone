import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';

export default function CustomerSupportAI() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isProcessingTicket, setIsProcessingTicket] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeTickets: 24,
    avgResponseTime: '2m 34s',
    satisfactionScore: 4.8,
    resolutionRate: 94.2,
    aiAccuracy: 96.7
  });

  const [ticketQueue, setTicketQueue] = useState([
    {
      id: 'TK-001',
      customer: 'Sarah Johnson',
      subject: 'Payment Processing Issue',
      priority: 'High',
      category: 'Billing',
      status: 'Open',
      created: '2 minutes ago',
      sentiment: 'Frustrated',
      aiPrediction: 'Payment gateway error - 89% confidence',
      suggestedAction: 'Refund & retry payment',
      avatar: '👩‍💼'
    },
    {
      id: 'TK-002',
      customer: 'Michael Chen',
      subject: 'Feature Request: Dark Mode',
      priority: 'Medium',
      category: 'Feature',
      status: 'In Progress',
      created: '15 minutes ago',
      sentiment: 'Neutral',
      aiPrediction: 'Feature enhancement request - 95% confidence',
      suggestedAction: 'Forward to product team',
      avatar: '👨‍💻'
    },
    {
      id: 'TK-003',
      customer: 'Emily Davis',
      subject: 'Account Access Problem',
      priority: 'High',
      category: 'Technical',
      status: 'Open',
      created: '32 minutes ago',
      sentiment: 'Concerned',
      aiPrediction: 'Authentication issue - 92% confidence',
      suggestedAction: 'Password reset & 2FA setup',
      avatar: '👩‍🎨'
    },
    {
      id: 'TK-004',
      customer: 'Robert Wilson',
      subject: 'Billing Inquiry',
      priority: 'Low',
      category: 'Billing',
      status: 'Resolved',
      created: '1 hour ago',
      sentiment: 'Satisfied',
      aiPrediction: 'Invoice clarification - 98% confidence',
      suggestedAction: 'Send detailed invoice breakdown',
      avatar: '👨‍💼'
    }
  ]);

  const aiCapabilities = [
    {
      name: 'Sentiment Analysis',
      icon: '😊',
      description: 'Real-time emotion detection using Stanford NLP for empathetic responses',
      accuracy: '96.8%',
      technology: 'Stanford NLP + Harvard Psychology'
    },
    {
      name: 'Intent Recognition',
      icon: '🎯',
      description: 'Automatically categorize and route tickets with MIT machine learning',
      accuracy: '94.2%',
      technology: 'MIT Machine Learning'
    },
    {
      name: 'Solution Prediction',
      icon: '🔮',
      description: 'Predict optimal solutions based on historical data and patterns',
      accuracy: '92.5%',
      technology: 'NASA Predictive Analytics'
    },
    {
      name: 'Auto-Response Generation',
      icon: '✍️',
      description: 'Generate contextual responses with IIT language optimization',
      accuracy: '95.3%',
      technology: 'IIT Natural Language Generation'
    }
  ];

  const supportCategories = [
    { name: 'Technical Issues', count: 12, color: 'red', percentage: 35 },
    { name: 'Billing Questions', count: 8, color: 'orange', percentage: 24 },
    { name: 'Feature Requests', count: 6, color: 'blue', percentage: 18 },
    { name: 'Account Support', count: 5, color: 'green', percentage: 15 },
    { name: 'General Inquiry', count: 3, color: 'purple', percentage: 8 }
  ];

  const satisfactionTrends = [
    { period: 'This Week', score: 4.8, change: '+0.3' },
    { period: 'Last Week', score: 4.5, change: '+0.2' },
    { period: 'This Month', score: 4.7, change: '+0.4' },
    { period: 'Last Month', score: 4.3, change: '+0.1' }
  ];

  const knowledgeBase = [
    {
      title: 'Password Reset Instructions',
      category: 'Account',
      views: 1245,
      helpfulness: '98%',
      lastUpdated: '2 days ago'
    },
    {
      title: 'Payment Methods & Billing',
      category: 'Billing',
      views: 987,
      helpfulness: '96%',
      lastUpdated: '1 week ago'
    },
    {
      title: 'Feature Tutorial Videos',
      category: 'Tutorial',
      views: 2341,
      helpfulness: '94%',
      lastUpdated: '3 days ago'
    },
    {
      title: 'API Documentation',
      category: 'Technical',
      views: 567,
      helpfulness: '92%',
      lastUpdated: '5 days ago'
    }
  ];

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        activeTickets: Math.max(0, prev.activeTickets + Math.floor(Math.random() * 6 - 3)),
        avgResponseTime: `${Math.floor(Math.random() * 3 + 1)}m ${Math.floor(Math.random() * 60)}s`,
        satisfactionScore: Math.max(1, Math.min(5, prev.satisfactionScore + (Math.random() - 0.5) * 0.2)),
        resolutionRate: Math.max(80, Math.min(100, prev.resolutionRate + (Math.random() - 0.5) * 2)),
        aiAccuracy: Math.max(90, Math.min(100, prev.aiAccuracy + (Math.random() - 0.5) * 1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleProcessTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setIsProcessingTicket(true);
    setAiResponse('');

    const responses = [
      'Analyzing customer sentiment with Stanford NLP algorithms...',
      'Identifying issue category with MIT pattern recognition...',
      'Searching knowledge base with Harvard information science...',
      'Generating optimal solution with NASA precision systems...',
      'Preparing empathetic response with IIT communication protocols...'
    ];

    for (let i = 0; i < responses.length; i++) {
      setAiResponse(responses[i]);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Generate final AI response
    const finalResponse = ticket.category === 'Billing' 
      ? `Hi ${ticket.customer.split(' ')[0]},\n\nI understand your concern about the payment processing issue. I've reviewed your account and identified that this appears to be a temporary gateway error.\n\nI've already initiated a refund for the failed transaction, and you should see it reflected in your account within 2-3 business days. I've also set up your account to automatically retry the payment with our backup processor.\n\nIs there anything else I can help you with today?\n\nBest regards,\nAI Support Assistant`
      : `Hi ${ticket.customer.split(' ')[0]},\n\nThank you for reaching out regarding "${ticket.subject}". I've analyzed your request and prepared a comprehensive solution.\n\nBased on our analysis, this appears to be ${ticket.aiPrediction.toLowerCase()}. I recommend: ${ticket.suggestedAction.toLowerCase()}.\n\nI've also attached relevant documentation that should help resolve this quickly. Please let me know if you need any clarification!\n\nBest regards,\nAI Support Assistant`;
    
    setAiResponse(finalResponse);
    setIsProcessingTicket(false);
  };

  const TicketCard = ({ ticket }) => (
    <div 
      onClick={() => handleProcessTicket(ticket)}
      className={`cursor-pointer p-4 rounded-lg border-2 transition-all hover:shadow-md ${
        ticket.priority === 'High' ? 'border-red-200 bg-red-50' :
        ticket.priority === 'Medium' ? 'border-yellow-200 bg-yellow-50' :
        'border-green-200 bg-green-50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{ticket.avatar}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{ticket.customer}</h3>
            <p className="text-sm text-gray-600">{ticket.id}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
            ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {ticket.priority}
          </span>
          <div className="text-xs text-gray-500 mt-1">{ticket.created}</div>
        </div>
      </div>
      
      <h4 className="font-medium text-gray-900 mb-2">{ticket.subject}</h4>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex space-x-4">
          <span className="text-gray-600">📁 {ticket.category}</span>
          <span className={`${
            ticket.sentiment === 'Frustrated' ? 'text-red-600' :
            ticket.sentiment === 'Concerned' ? 'text-yellow-600' :
            ticket.sentiment === 'Satisfied' ? 'text-green-600' :
            'text-gray-600'
          }`}>
            😊 {ticket.sentiment}
          </span>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${
          ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
          ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {ticket.status}
        </span>
      </div>
      
      <div className="mt-3 p-3 bg-white rounded border border-gray-200">
        <div className="text-xs font-medium text-blue-600 mb-1">AI Prediction:</div>
        <div className="text-sm text-gray-700">{ticket.aiPrediction}</div>
        <div className="text-xs font-medium text-green-600 mt-2 mb-1">Suggested Action:</div>
        <div className="text-sm text-gray-700">{ticket.suggestedAction}</div>
      </div>
    </div>
  );

  const MetricCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`text-3xl ${color}`}>{icon}</div>
        {change && (
          <div className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>🤖 Customer Support AI - Intelligent Ticket Management | Aranya One</title>
        <meta name="description" content="AI-powered customer support with sentiment analysis and Stanford-level automation" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  🤖 Customer Support AI
                  <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    Intelligent Assistant
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">AI-powered support with sentiment analysis and auto-resolution</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  🎫 New Ticket
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  📚 Knowledge Base
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Metrics Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex space-x-6">
                <span>🎫 Active Tickets: {realTimeMetrics.activeTickets}</span>
                <span>⏱️ Avg Response: {realTimeMetrics.avgResponseTime}</span>
                <span>⭐ Satisfaction: {realTimeMetrics.satisfactionScore.toFixed(1)}/5</span>
                <span>✅ Resolution Rate: {realTimeMetrics.resolutionRate.toFixed(1)}%</span>
                <span>🤖 AI Accuracy: {realTimeMetrics.aiAccuracy.toFixed(1)}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🟢 AI Assistant Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                  { id: 'tickets', name: 'Ticket Queue', icon: '🎫' },
                  { id: 'ai-assistant', name: 'AI Assistant', icon: '🤖' },
                  { id: 'knowledge', name: 'Knowledge Base', icon: '📚' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* AI Processing Modal */}
          {isProcessingTicket && selectedTicket && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 animate-pulse">🤖</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    AI Processing Ticket: {selectedTicket.id}
                  </h2>
                  <p className="text-gray-600">Customer: {selectedTicket.customer}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">Current Process:</div>
                  <div className="text-blue-600">{aiResponse}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-800">📊 Sentiment Analysis</div>
                    <div className="text-blue-600">Stanford NLP</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-800">🎯 Intent Recognition</div>
                    <div className="text-purple-600">MIT ML</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-semibold text-green-800">🔮 Solution Prediction</div>
                    <div className="text-green-600">NASA Analytics</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="font-semibold text-orange-800">✍️ Response Generation</div>
                    <div className="text-orange-600">IIT Language</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Response Modal */}
          {!isProcessingTicket && selectedTicket && aiResponse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      AI-Generated Response: {selectedTicket.id}
                    </h2>
                    <p className="text-gray-600">Customer: {selectedTicket.customer} • Subject: {selectedTicket.subject}</p>
                  </div>
                  <button 
                    onClick={() => {setSelectedTicket(null); setAiResponse('');}}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">🎯 AI Analysis</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Category:</span> {selectedTicket.category}</div>
                      <div><span className="font-medium">Priority:</span> {selectedTicket.priority}</div>
                      <div><span className="font-medium">Sentiment:</span> {selectedTicket.sentiment}</div>
                      <div><span className="font-medium">Prediction:</span> {selectedTicket.aiPrediction}</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">🎯 Recommended Actions</h3>
                    <div className="space-y-2 text-sm">
                      <div>• {selectedTicket.suggestedAction}</div>
                      <div>• Follow up within 24 hours</div>
                      <div>• Add to satisfaction survey</div>
                      <div>• Update knowledge base if needed</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">📝 AI-Generated Response:</h3>
                  <div className="bg-white rounded border p-4 whitespace-pre-line text-gray-700">
                    {aiResponse}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    ✅ Send Response
                  </button>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    ✏️ Edit Response
                  </button>
                  <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                    📋 Save Template
                  </button>
                  <button 
                    onClick={() => {setSelectedTicket(null); setAiResponse('');}}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'dashboard' && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <MetricCard 
                  title="Active Tickets" 
                  value={realTimeMetrics.activeTickets.toString()} 
                  change="-3" 
                  icon="🎫" 
                  color="text-blue-600"
                />
                <MetricCard 
                  title="Avg Response Time" 
                  value={realTimeMetrics.avgResponseTime} 
                  change="-15%" 
                  icon="⏱️" 
                  color="text-green-600"
                />
                <MetricCard 
                  title="Satisfaction Score" 
                  value={`${realTimeMetrics.satisfactionScore.toFixed(1)}/5`} 
                  change="+0.3" 
                  icon="⭐" 
                  color="text-yellow-600"
                />
                <MetricCard 
                  title="Resolution Rate" 
                  value={`${realTimeMetrics.resolutionRate.toFixed(1)}%`} 
                  change="+2.1%" 
                  icon="✅" 
                  color="text-purple-600"
                />
                <MetricCard 
                  title="AI Accuracy" 
                  value={`${realTimeMetrics.aiAccuracy.toFixed(1)}%`} 
                  change="+1.2%" 
                  icon="🤖" 
                  color="text-orange-600"
                />
              </div>

              {/* Support Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Ticket Categories</h3>
                  <div className="space-y-4">
                    {supportCategories.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">{category.name}</span>
                          <span className="font-medium">{category.count} tickets</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${category.color}-500 h-2 rounded-full`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Satisfaction Trends</h3>
                  <div className="space-y-4">
                    {satisfactionTrends.map((trend, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{trend.period}</div>
                          <div className="text-2xl font-bold text-blue-600">{trend.score}/5</div>
                        </div>
                        <div className={`text-sm font-medium ${
                          trend.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {trend.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'tickets' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ticketQueue.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}

          {activeTab === 'ai-assistant' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI Assistant Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-4">{capability.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{capability.name}</h3>
                        <p className="text-sm text-blue-600 font-medium">{capability.technology}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{capability.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Accuracy:</span>
                      <span className="font-semibold text-green-600">{capability.accuracy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Knowledge Base</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {knowledgeBase.map((article, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>📁 {article.category}</span>
                      <span>👁️ {article.views} views</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Helpful: <span className="text-green-600 font-medium">{article.helpfulness}</span></span>
                      <span className="text-gray-500">Updated {article.lastUpdated}</span>
                    </div>
                    <div className="mt-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        View Article
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🏛️ World-Class Customer Support AI Platform
              </h3>
              <p className="text-gray-600 mb-4">
                Intelligent support automation with Stanford NLP, Harvard psychology, MIT ML, and NASA precision
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>🤖 AI-Powered Responses</span>
                <span>😊 Sentiment Analysis</span>
                <span>🎯 Intent Recognition</span>
                <span>📊 Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
