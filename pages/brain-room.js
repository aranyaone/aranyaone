import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function BrainRoomPage() {
  const [syncStatus, setSyncStatus] = useState('connected')
  const [modules, setModules] = useState([])
  const [aiInsights, setAiInsights] = useState([])

  useEffect(() => {
    // Simulate loading modules and AI insights
    setModules([
      {
        id: 1,
        name: 'Analytics Engine',
        status: 'active',
        lastSync: '2 minutes ago',
        performance: 98.2,
        connections: 15
      },
      {
        id: 2,
        name: 'AI Chat Integration',
        status: 'active',
        lastSync: '5 minutes ago',
        performance: 99.1,
        connections: 23
      },
      {
        id: 3,
        name: 'Service Orchestrator',
        status: 'syncing',
        lastSync: 'Syncing...',
        performance: 96.7,
        connections: 8
      },
      {
        id: 4,
        name: 'User Context Manager',
        status: 'active',
        lastSync: '1 minute ago',
        performance: 97.5,
        connections: 42
      },
      {
        id: 5,
        name: 'Notification System',
        status: 'active',
        lastSync: '30 seconds ago',
        performance: 99.8,
        connections: 12
      }
    ])

    setAiInsights([
      {
        type: 'recommendation',
        title: 'Optimize API Response Times',
        description: 'Analytics suggest 15% improvement possible by implementing caching',
        priority: 'high',
        impact: '+15% performance'
      },
      {
        type: 'alert',
        title: 'Unusual Traffic Pattern Detected',
        description: 'AI Chat service showing 3x normal usage in Asia region',
        priority: 'medium',
        impact: 'Monitor scaling'
      },
      {
        type: 'insight',
        title: 'User Engagement Trending Up',
        description: 'Session duration increased 22% after recent UX improvements',
        priority: 'low',
        impact: '+22% engagement'
      }
    ])
  }, [])

  return (
    <div>
      <Head>
        <title>Brain Room - Aranya One</title>
        <meta name="description" content="AI-powered coordination center for your digital empire" />
      </Head>

      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🧠 Brain Room</h1>
            <p className="text-gray-600">AI-powered coordination center synchronizing all empire modules</p>
          </div>

          {/* Sync Status */}
          <SyncStatusPanel status={syncStatus} />

          {/* AI Insights */}
          <AIInsightsPanel insights={aiInsights} />

          {/* Module Grid */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔧 Connected Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>

          {/* Brain Room Controls */}
          <BrainRoomControls />

          {/* Navigation */}
          <div className="mt-8 text-center">
            <a href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  )
}

function SyncStatusPanel({ status }) {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'connected':
        return {
          color: 'green',
          icon: '🟢',
          text: 'All Systems Connected',
          description: 'Brain Room is fully operational and all modules are synchronized'
        }
      case 'syncing':
        return {
          color: 'yellow',
          icon: '🟡',
          text: 'Synchronizing',
          description: 'Some modules are updating, synchronization in progress'
        }
      case 'error':
        return {
          color: 'red',
          icon: '🔴',
          text: 'Connection Issues',
          description: 'Some modules are experiencing connectivity problems'
        }
      default:
        return {
          color: 'gray',
          icon: '⚪',
          text: 'Unknown Status',
          description: 'Status cannot be determined'
        }
    }
  }

  const statusInfo = getStatusInfo(status)

  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 border-2 border-${statusInfo.color}-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{statusInfo.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{statusInfo.text}</h3>
            <p className="text-gray-600">{statusInfo.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">5/5</div>
          <div className="text-sm text-gray-500">Modules Online</div>
        </div>
      </div>
    </div>
  )
}

function AIInsightsPanel({ insights }) {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🤖 AI Insights & Recommendations</h2>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className={`p-4 rounded-xl border-l-4 ${
            insight.priority === 'high' ? 'border-red-500 bg-red-50' :
            insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
            'border-blue-500 bg-blue-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xl ${
                    insight.type === 'recommendation' ? '💡' :
                    insight.type === 'alert' ? '⚠️' : '📊'
                  }`}>
                    {insight.type === 'recommendation' ? '💡' :
                     insight.type === 'alert' ? '⚠️' : '📊'}
                  </span>
                  <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                    insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {insight.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{insight.description}</p>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-medium text-green-600">{insight.impact}</div>
                <button className="mt-2 px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModuleCard({ module }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green'
      case 'syncing': return 'yellow'
      case 'error': return 'red'
      default: return 'gray'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '✅'
      case 'syncing': return '🔄'
      case 'error': return '❌'
      default: return '⚪'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-800 mb-1">{module.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm">{getStatusIcon(module.status)}</span>
            <span className={`text-sm font-medium text-${getStatusColor(module.status)}-600`}>
              {module.status.charAt(0).toUpperCase() + module.status.slice(1)}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">⚙️</button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Performance</span>
          <span className="text-sm font-medium">{module.performance}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`bg-${getStatusColor(module.status)}-500 h-2 rounded-full`}
            style={{ width: `${module.performance}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Connections</span>
          <span className="font-medium">{module.connections}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Last Sync</span>
          <span className="font-medium">{module.lastSync}</span>
        </div>
      </div>
    </div>
  )
}

function BrainRoomControls() {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎛️ Brain Room Controls</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-center">
          <div className="text-2xl mb-2">🔄</div>
          <div className="font-semibold">Sync All</div>
          <div className="text-sm opacity-90">Force sync all modules</div>
        </button>

        <button className="p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-center">
          <div className="text-2xl mb-2">🚀</div>
          <div className="font-semibold">Optimize</div>
          <div className="text-sm opacity-90">Run AI optimization</div>
        </button>

        <button className="p-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-semibold">Analytics</div>
          <div className="text-sm opacity-90">Deep insights report</div>
        </button>

        <button className="p-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors text-center">
          <div className="text-2xl mb-2">⚙️</div>
          <div className="font-semibold">Settings</div>
          <div className="text-sm opacity-90">Configure Brain Room</div>
        </button>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800 mb-1">🧠 AI Learning Mode</h3>
            <p className="text-sm text-gray-600">Brain Room is continuously learning from your empire patterns</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Learning Progress</div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="text-sm font-medium">78%</div>
          </div>
        </div>
      </div>
    </div>
  )
}