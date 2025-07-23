import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

export default function CollaborationWorkspace() {
  const [activeUsers, setActiveUsers] = useState([])
  const [currentProject, setCurrentProject] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [code, setCode] = useState('')
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isOnline, setIsOnline] = useState(true)
  const [cursorPositions, setCursorPositions] = useState({})
  const editorRef = useRef(null)

  useEffect(() => {
    // Simulate active users in workspace
    const users = [
      { id: 1, name: 'Alice Johnson', avatar: '👩‍💻', status: 'online', cursor: { line: 15, col: 8 }, color: '#9333ea' },
      { id: 2, name: 'Bob Smith', avatar: '👨‍💼', status: 'typing', cursor: { line: 23, col: 12 }, color: '#3b82f6' },
      { id: 3, name: 'You', avatar: '👤', status: 'active', cursor: { line: 1, col: 1 }, color: '#10b981' }
    ]
    setActiveUsers(users)

    // Simulate project data
    const project = {
      id: 1,
      name: 'AI Dashboard v2.0',
      description: 'Next-generation analytics dashboard with AI insights',
      files: [
        { id: 1, name: 'index.js', type: 'javascript', size: '2.4 KB', modified: '2 min ago' },
        { id: 2, name: 'dashboard.css', type: 'css', size: '1.8 KB', modified: '5 min ago' },
        { id: 3, name: 'api.py', type: 'python', size: '3.2 KB', modified: '1 hr ago' },
        { id: 4, name: 'README.md', type: 'markdown', size: '1.1 KB', modified: '2 hr ago' }
      ],
      lastDeployment: '1 hour ago',
      status: 'active'
    }
    setCurrentProject(project)

    // Simulate real-time collaboration
    const interval = setInterval(() => {
      // Simulate user cursor movements
      setCursorPositions(prev => {
        const newPositions = { ...prev }
        users.slice(0, -1).forEach(user => { // Exclude "You"
          newPositions[user.id] = {
            line: Math.floor(Math.random() * 50) + 1,
            col: Math.floor(Math.random() * 80) + 1
          }
        })
        return newPositions
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    // Simulate loading file content
    const sampleCode = {
      javascript: `import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('/api/analytics');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Analytics Dashboard</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#9333ea" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;`,
      css: `.dashboard-container {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.dashboard-container h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.chart-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem 0;
}

.metric-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-5px);
}`,
      python: `import pandas as pd
import numpy as np
from flask import Flask, jsonify, request
from datetime import datetime, timedelta
import sqlite3

app = Flask(__name__)

class AnalyticsEngine:
    def __init__(self):
        self.db_connection = sqlite3.connect('analytics.db', check_same_thread=False)
        self.initialize_database()
    
    def initialize_database(self):
        cursor = self.db_connection.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                event_type TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                metadata TEXT
            )
        ''')
        self.db_connection.commit()
    
    def track_event(self, user_id, event_type, metadata=None):
        cursor = self.db_connection.cursor()
        cursor.execute(
            'INSERT INTO user_events (user_id, event_type, metadata) VALUES (?, ?, ?)',
            (user_id, event_type, metadata)
        )
        self.db_connection.commit()
        return True
    
    def get_analytics_data(self, days=30):
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        cursor = self.db_connection.cursor()
        cursor.execute('''
            SELECT DATE(timestamp) as date, COUNT(*) as events
            FROM user_events 
            WHERE timestamp BETWEEN ? AND ?
            GROUP BY DATE(timestamp)
            ORDER BY date
        ''', (start_date, end_date))
        
        results = cursor.fetchall()
        return [{'date': row[0], 'events': row[1]} for row in results]

analytics = AnalyticsEngine()

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    try:
        data = analytics.get_analytics_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/track', methods=['POST'])
def track_event():
    try:
        data = request.get_json()
        result = analytics.track_event(
            data['user_id'], 
            data['event_type'], 
            data.get('metadata')
        )
        return jsonify({'success': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)`,
      markdown: `# AI Dashboard v2.0

A next-generation analytics dashboard powered by artificial intelligence and real-time data processing.

## 🚀 Features

### Core Functionality
- **Real-time Analytics**: Live data visualization with WebSocket connections
- **AI-Powered Insights**: Machine learning algorithms for predictive analytics
- **Collaborative Workspace**: Multi-user editing and real-time collaboration
- **Advanced Visualizations**: Interactive charts and graphs using Recharts

### Technical Stack
- **Frontend**: React.js, Next.js, TailwindCSS
- **Backend**: Python Flask, Node.js
- **Database**: SQLite, Redis for caching
- **AI/ML**: TensorFlow.js, scikit-learn
- **Deployment**: Vercel, Docker

## 📊 Data Processing Pipeline

1. **Data Collection**: Automated data ingestion from multiple sources
2. **Processing**: Real-time data transformation and cleaning
3. **Analysis**: AI-powered pattern recognition and anomaly detection
4. **Visualization**: Dynamic chart generation and interactive dashboards

## 🔧 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/aranyaone/ai-dashboard.git

# Install dependencies
npm install
pip install -r requirements.txt

# Run the application
npm run dev
python api.py
\`\`\`

## 🎯 Usage

1. Launch the dashboard at \`http://localhost:3000\`
2. Connect your data sources via the API endpoints
3. Configure AI models for your specific use case
4. Start collaborating with your team in real-time

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`
    }
    setCode(sampleCode[file.type] || 'File content loading...')
  }

  const addComment = () => {
    if (!newComment.trim()) return
    
    const comment = {
      id: Date.now(),
      author: 'You',
      avatar: '👤',
      content: newComment,
      timestamp: new Date(),
      line: selectedFile ? Math.floor(Math.random() * 50) + 1 : null
    }
    
    setComments(prev => [comment, ...prev])
    setNewComment('')
  }

  const getFileIcon = (type) => {
    const icons = {
      javascript: '📜',
      css: '🎨',
      python: '🐍',
      markdown: '📝',
      html: '🌐',
      json: '📋'
    }
    return icons[type] || '📄'
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    return `${Math.floor(minutes / 60)}h ago`
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Collaboration Workspace - Aranya One</title>
        <meta name="description" content="Real-time collaborative development environment" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
                🤝 Collaboration Workspace
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time collaborative development with live editing and team chat
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Online Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              
              {/* Active Users */}
              <div className="flex -space-x-2">
                {activeUsers.map((user) => (
                  <div
                    key={user.id}
                    className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-lg flex items-center justify-center text-xl"
                    style={{ borderColor: user.color }}
                    title={`${user.name} - ${user.status}`}
                  >
                    {user.avatar}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        {currentProject && (
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading font-semibold text-xl text-gray-900">{currentProject.name}</h2>
                <p className="text-gray-600">{currentProject.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Last Deployment</div>
                  <div className="font-semibold text-gray-900">{currentProject.lastDeployment}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentProject.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {currentProject.status}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* File Explorer */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-heading font-semibold text-lg text-gray-900">📁 Project Files</h3>
              </div>
              <div className="p-4">
                {currentProject?.files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => handleFileSelect(file)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      selectedFile?.id === file.id
                        ? 'bg-royal-purple-50 border border-royal-purple-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getFileIcon(file.type)}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{file.name}</div>
                        <div className="text-sm text-gray-500">{file.size} • {file.modified}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Users Detail */}
            <div className="mt-6 bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-heading font-semibold text-lg text-gray-900">👥 Active Users</h3>
              </div>
              <div className="p-4 space-y-3">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2"
                      style={{ borderColor: user.color, backgroundColor: `${user.color}20` }}
                    >
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className={`text-xs capitalize ${
                        user.status === 'online' ? 'text-green-600' :
                        user.status === 'typing' ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {user.status}
                      </div>
                    </div>
                    {cursorPositions[user.id] && (
                      <div className="text-xs text-gray-500">
                        Line {cursorPositions[user.id].line}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-heading font-semibold text-lg text-gray-900">
                  {selectedFile ? `💻 ${selectedFile.name}` : '💻 Code Editor'}
                </h3>
                {selectedFile && (
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Save
                    </button>
                    <button className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Deploy
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none focus:outline-none"
                  placeholder={selectedFile ? 'Loading file content...' : 'Select a file to start editing...'}
                  style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                />
                
                {/* Live Cursors */}
                {Object.entries(cursorPositions).map(([userId, position]) => {
                  const user = activeUsers.find(u => u.id === parseInt(userId))
                  if (!user || user.name === 'You') return null
                  
                  return (
                    <div
                      key={userId}
                      className="absolute w-0.5 h-5 animate-pulse"
                      style={{
                        backgroundColor: user.color,
                        top: `${position.line * 1.5}rem`,
                        left: `${position.col * 0.6}rem`
                      }}
                    >
                      <div 
                        className="absolute -top-6 left-0 px-2 py-1 text-xs text-white rounded whitespace-nowrap"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="font-heading font-semibold text-lg mb-3">🤖 AI Code Assistant</h3>
              <div className="space-y-2">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-sm opacity-90">💡 Suggestion: Consider adding error handling to the fetchAnalyticsData function</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-sm opacity-90">🔧 Optimization: Cache API responses to improve performance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments & Chat */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-heading font-semibold text-lg text-gray-900">💬 Team Chat</h3>
              </div>
              
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 rounded-full bg-royal-purple-100 flex items-center justify-center text-sm">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="font-medium text-sm text-gray-900">{comment.author}</div>
                        <div className="text-sm text-gray-700 mt-1">{comment.content}</div>
                        {comment.line && (
                          <div className="text-xs text-blue-600 mt-1">Line {comment.line}</div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{formatTimestamp(comment.timestamp)}</div>
                    </div>
                  </div>
                ))}
                
                {comments.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <p>Start a conversation with your team</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addComment()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={addComment}
                    className="bg-royal-purple-500 hover:bg-royal-purple-600 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Project Stats */}
            <div className="mt-6 bg-white rounded-2xl shadow-soft border border-gray-100 p-4">
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">📊 Project Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Commits</span>
                  <span className="font-semibold">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lines of Code</span>
                  <span className="font-semibold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Code Coverage</span>
                  <span className="font-semibold text-green-600">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Performance Score</span>
                  <span className="font-semibold text-blue-600">A+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}