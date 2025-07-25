import { useState, useEffect } from 'react'

// Advanced AI Insights Component
export default function AIInsights({ data }) {
  const [insights, setInsights] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI analysis with realistic insights
    const generateAIInsights = () => {
      const mockInsights = [
        {
          id: 1,
          type: 'trend',
          icon: '📈',
          title: 'Revenue Growth Acceleration',
          description: 'AI detected a 34% uptick in revenue velocity based on the last 30 days.',
          confidence: 92,
          action: 'Consider scaling marketing campaigns',
          priority: 'high'
        },
        {
          id: 2,
          type: 'opportunity',
          icon: '🎯',
          title: 'User Engagement Peak',
          description: 'Optimal engagement window identified: 2-4 PM EST shows 67% higher interaction.',
          confidence: 88,
          action: 'Schedule content releases during peak hours',
          priority: 'medium'
        },
        {
          id: 3,
          type: 'prediction',
          icon: '🔮',
          title: 'Next Month Forecast',
          description: 'ML models predict 28% user growth and $45K revenue increase next month.',
          confidence: 85,
          action: 'Prepare infrastructure scaling',
          priority: 'high'
        },
        {
          id: 4,
          type: 'anomaly',
          icon: '⚠️',
          title: 'Service Usage Spike',
          description: 'AI Chatbot usage increased 156% - monitor server capacity.',
          confidence: 94,
          action: 'Review auto-scaling policies',
          priority: 'urgent'
        }
      ]

      setTimeout(() => {
        setInsights(mockInsights)
        setIsLoading(false)
      }, 1500)
    }

    generateAIInsights()
  }, [data])

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    }
    return colors[priority] || colors.medium
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center mb-4">
          <div className="animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-royal-gradient rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🤖</span>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900">
                AI Insights Engine
              </h3>
              <p className="text-sm text-gray-500">
                Real-time analysis and predictions
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 border border-gray-100 rounded-lg hover:border-royal-purple-200 transition-colors duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{insight.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(insight.priority)}`}>
                        {insight.priority.toUpperCase()}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-royal-purple-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-royal-purple-600 font-medium">
                      💡 {insight.action}
                    </span>
                    <button className="text-xs text-gray-400 hover:text-royal-purple-600 transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
            <button className="bg-royal-gradient text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              🚀 Auto-Optimize
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}