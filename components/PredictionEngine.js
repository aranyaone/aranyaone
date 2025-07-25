import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

export default function PredictionEngine() {
  const [predictions, setPredictions] = useState([])
  const [timeframe, setTimeframe] = useState('week')
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    generatePredictions()
  }, [timeframe]) // eslint-disable-line react-hooks/exhaustive-deps

  const generatePredictions = () => {
    setIsCalculating(true)
    
    // Simulate AI calculation delay
    setTimeout(() => {
      const baseDays = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 90
      const predictions = []
      
      for (let i = 1; i <= baseDays; i++) {
        const baseRevenue = 1000 + Math.sin(i / 7) * 200
        const baseUsers = 100 + Math.cos(i / 5) * 30
        const growth = 1 + (i / baseDays) * 0.3
        
        predictions.push({
          day: `Day ${i}`,
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          predictedRevenue: Math.floor(baseRevenue * growth),
          predictedUsers: Math.floor(baseUsers * growth),
          confidence: Math.max(60, 95 - i * 0.5),
          scenario: i % 10 === 0 ? 'optimistic' : i % 5 === 0 ? 'pessimistic' : 'realistic'
        })
      }
      
      setPredictions(predictions)
      setIsCalculating(false)
    }, 1500)
  }

  const currentPrediction = predictions[0] || {}
  const weeklyGrowth = predictions.length > 7 ? 
    ((predictions[6].predictedRevenue - predictions[0].predictedRevenue) / predictions[0].predictedRevenue * 100).toFixed(1) : 0

  return (
    <div className="bg-white rounded-xl shadow-soft-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🔮</span>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-900">
              AI Prediction Engine
            </h3>
            <p className="text-sm text-gray-500">
              Machine learning powered forecasts
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isCalculating}
          >
            <option value="week">Next Week</option>
            <option value="month">Next Month</option>
            <option value="quarter">Next Quarter</option>
          </select>
          <button
            onClick={generatePredictions}
            disabled={isCalculating}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isCalculating ? '🔄 Calculating...' : '🔄 Refresh'}
          </button>
        </div>
      </div>

      {isCalculating ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center py-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs">🧠</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-2">AI is analyzing patterns...</p>
            <div className="bg-gray-200 rounded-full h-2 w-full max-w-xs mx-auto">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Key Predictions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 font-semibold text-sm">Revenue Forecast</p>
                  <p className="text-2xl font-bold text-green-900">
                    ${currentPrediction.predictedRevenue?.toLocaleString()}
                  </p>
                  <p className="text-green-600 text-xs">+{weeklyGrowth}% projected growth</p>
                </div>
                <div className="text-2xl">💰</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 font-semibold text-sm">User Growth</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {currentPrediction.predictedUsers?.toLocaleString()}
                  </p>
                  <p className="text-blue-600 text-xs">New users expected</p>
                </div>
                <div className="text-2xl">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-800 font-semibold text-sm">Confidence</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {currentPrediction.confidence?.toFixed(0)}%
                  </p>
                  <p className="text-purple-600 text-xs">Model accuracy</p>
                </div>
                <div className="text-2xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Prediction Chart */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Revenue Prediction Trend</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictions.slice(0, 14)}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => [
                      `$${value.toLocaleString()}`,
                      'Predicted Revenue'
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predictedRevenue" 
                    stroke="url(#gradient)"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scenario Analysis */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-semibold text-gray-900 mb-4">Scenario Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-red-500">📉</span>
                  <span className="font-medium text-red-800">Pessimistic</span>
                </div>
                <p className="text-red-700">-15% from forecast</p>
                <p className="text-red-600 text-xs">Market downturn scenario</p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-500">📊</span>
                  <span className="font-medium text-yellow-800">Realistic</span>
                </div>
                <p className="text-yellow-700">Base forecast</p>
                <p className="text-yellow-600 text-xs">Current trend continuation</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-500">📈</span>
                  <span className="font-medium text-green-800">Optimistic</span>
                </div>
                <p className="text-green-700">+25% from forecast</p>
                <p className="text-green-600 text-xs">Growth acceleration scenario</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}