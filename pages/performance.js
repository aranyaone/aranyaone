import Head from 'next/head'
import { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const performanceData = [
  { time: '00:00', cpu: 45, memory: 62, network: 34, disk: 23 },
  { time: '04:00', cpu: 32, memory: 58, network: 28, disk: 19 },
  { time: '08:00', cpu: 78, memory: 84, network: 67, disk: 45 },
  { time: '12:00', cpu: 89, memory: 91, network: 78, disk: 56 },
  { time: '16:00', cpu: 72, memory: 76, network: 65, disk: 43 },
  { time: '20:00', cpu: 55, memory: 68, network: 45, disk: 32 },
]

const webVitalsData = [
  { metric: 'LCP', value: 1.2, benchmark: 2.5, unit: 's' },
  { metric: 'FID', value: 45, benchmark: 100, unit: 'ms' },
  { metric: 'CLS', value: 0.08, benchmark: 0.1, unit: '' },
  { metric: 'FCP', value: 0.9, benchmark: 1.8, unit: 's' },
  { metric: 'TTFB', value: 0.3, benchmark: 0.6, unit: 's' },
]

export default function Performance() {
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    uptime: '99.97%',
    responseTime: '245ms',
    throughput: '1.2k req/s',
    errorRate: '0.02%'
  })

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'High CPU usage detected on server-2', time: '2 minutes ago' },
    { id: 2, type: 'info', message: 'Database optimization completed', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'All services healthy', time: '2 hours ago' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        uptime: '99.97%',
        responseTime: `${Math.floor(Math.random() * 100 + 200)}ms`,
        throughput: `${(Math.random() * 0.5 + 1).toFixed(1)}k req/s`,
        errorRate: `${(Math.random() * 0.05).toFixed(3)}%`
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Performance Monitor - Aranya One</title>
        <meta name="description" content="Real-time performance monitoring and optimization" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            ⚡ Performance Monitor
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time system monitoring, optimization insights, and performance analytics
          </p>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">⏰</div>
              <div className="flex items-center text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </div>
            </div>
            <h3 className="font-heading font-semibold text-gray-700 text-sm mb-1">Uptime</h3>
            <div className="font-heading font-bold text-2xl text-gray-900 mb-1">{realTimeMetrics.uptime}</div>
            <div className="text-xs text-green-600 font-medium">Excellent</div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">🚀</div>
              <div className="flex items-center text-blue-600 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </div>
            </div>
            <h3 className="font-heading font-semibold text-gray-700 text-sm mb-1">Response Time</h3>
            <div className="font-heading font-bold text-2xl text-gray-900 mb-1">{realTimeMetrics.responseTime}</div>
            <div className="text-xs text-green-600 font-medium">Fast</div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📊</div>
              <div className="flex items-center text-purple-600 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </div>
            </div>
            <h3 className="font-heading font-semibold text-gray-700 text-sm mb-1">Throughput</h3>
            <div className="font-heading font-bold text-2xl text-gray-900 mb-1">{realTimeMetrics.throughput}</div>
            <div className="text-xs text-blue-600 font-medium">Optimal</div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">🎯</div>
              <div className="flex items-center text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </div>
            </div>
            <h3 className="font-heading font-semibold text-gray-700 text-sm mb-1">Error Rate</h3>
            <div className="font-heading font-bold text-2xl text-gray-900 mb-1">{realTimeMetrics.errorRate}</div>
            <div className="text-xs text-green-600 font-medium">Excellent</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* System Performance */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              🖥️ System Performance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cpu" stackId="1" stroke="#ef4444" fill="url(#cpuGradient)" />
                <Area type="monotone" dataKey="memory" stackId="2" stroke="#3b82f6" fill="url(#memoryGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Web Vitals */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              🌐 Core Web Vitals
            </h2>
            <div className="space-y-4">
              {webVitalsData.map((vital, index) => {
                const percentage = (vital.value / vital.benchmark) * 100
                const isGood = percentage <= 100
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{vital.metric}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isGood ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isGood ? 'Good' : 'Needs Work'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {vital.value}{vital.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${isGood ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Alerts and Optimization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Real-time Alerts */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              🚨 System Alerts
            </h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'success' ? 'bg-green-50 border-green-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`text-xl ${
                      alert.type === 'warning' ? 'text-yellow-600' :
                      alert.type === 'success' ? 'text-green-600' :
                      'text-blue-600'
                    }`}>
                      {alert.type === 'warning' ? '⚠️' : 
                       alert.type === 'success' ? '✅' : 'ℹ️'}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Optimization Suggestions */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              🤖 AI Optimization
            </h2>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="text-purple-600 text-xl">💡</div>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Image Optimization</h3>
                    <p className="text-purple-800 text-sm mb-3">
                      Converting images to WebP format could reduce load time by 35%.
                    </p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                      Auto-Optimize
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-600 text-xl">🔧</div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Database Query Optimization</h3>
                    <p className="text-blue-800 text-sm mb-3">
                      3 slow queries detected. AI suggests adding composite indexes.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Apply Fix
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="text-green-600 text-xl">⚡</div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">CDN Configuration</h3>
                    <p className="text-green-800 text-sm mb-3">
                      Enable smart caching for static assets to improve global performance.
                    </p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                      Enable CDN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}