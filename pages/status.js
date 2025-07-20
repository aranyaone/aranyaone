import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Status() {
  const [systemStats, setSystemStats] = useState({
    uptime: '99.98%',
    lastIncident: '7 days ago',
    responseTime: '142ms',
    currentTime: new Date()
  })

  const [services, setServices] = useState([
    { name: 'API Gateway', status: 'operational', uptime: '99.99%', responseTime: '89ms' },
    { name: 'Database', status: 'operational', uptime: '99.95%', responseTime: '12ms' },
    { name: 'CDN', status: 'operational', uptime: '100%', responseTime: '45ms' },
    { name: 'Authentication', status: 'operational', uptime: '99.97%', responseTime: '156ms' },
    { name: 'File Storage', status: 'maintenance', uptime: '99.89%', responseTime: '234ms' },
    { name: 'Email Service', status: 'operational', uptime: '99.92%', responseTime: '167ms' }
  ])

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'File Storage service will undergo maintenance on Dec 25, 2024 from 2:00 AM to 4:00 AM UTC',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'resolved',
      title: 'API Rate Limiting Issue Resolved',
      message: 'Temporary API slowdowns have been resolved. All services are operating normally.',
      time: '1 day ago'
    }
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        currentTime: new Date(),
        responseTime: `${Math.floor(Math.random() * 50) + 120}ms`
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100'
      case 'maintenance': return 'text-yellow-600 bg-yellow-100'
      case 'degraded': return 'text-orange-600 bg-orange-100'
      case 'outage': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'info': return 'border-blue-200 bg-blue-50'
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      case 'error': return 'border-red-200 bg-red-50'
      case 'resolved': return 'border-green-200 bg-green-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'info': return 'ℹ️'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      case 'resolved': return '✅'
      default: return '📢'
    }
  }

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 
                       services.some(s => s.status === 'outage') ? 'outage' : 'degraded'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Head>
        <title>System Status - Aranya One</title>
        <meta name="description" content="Real-time system health and service status" />
      </Head>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">🛡️ System Status</h1>
                <p className="text-gray-600">Real-time system health monitoring</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Last updated</div>
              <div className="font-mono text-sm">{systemStats.currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overall Status Card */}
        <div className={`rounded-2xl shadow-xl p-8 mb-8 border-2 ${
          overallStatus === 'operational' ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-300' :
          overallStatus === 'outage' ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-300' :
          'bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-300'
        } text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {overallStatus === 'operational' ? '✅ All Systems Operational' :
                 overallStatus === 'outage' ? '❌ System Outage' :
                 '⚠️ Partial Service Disruption'}
              </h2>
              <p className="text-lg opacity-90">
                All services are running smoothly. No known issues at this time.
              </p>
            </div>
            <div className="text-6xl opacity-80">
              {overallStatus === 'operational' ? '🟢' :
               overallStatus === 'outage' ? '🔴' : '🟡'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{systemStats.uptime}</div>
              <div className="opacity-90">Uptime (30 days)</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{systemStats.responseTime}</div>
              <div className="opacity-90">Avg Response Time</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{systemStats.lastIncident}</div>
              <div className="opacity-90">Last Incident</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} getStatusColor={getStatusColor} />
          ))}
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SystemMetrics />
          <PerformanceChart />
        </div>

        {/* Alerts and Incidents */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">📢 Recent Alerts & Incidents</h3>
          
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🎉</span>
              <p className="text-gray-600">No recent alerts or incidents to report!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{getAlertIcon(alert.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{alert.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, getStatusColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
          {service.status}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Uptime</span>
          <span className="font-semibold text-gray-800">{service.uptime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Response Time</span>
          <span className="font-semibold text-gray-800">{service.responseTime}</span>
        </div>
        
        {/* Status indicator bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              service.status === 'operational' ? 'bg-green-500' :
              service.status === 'maintenance' ? 'bg-yellow-500' :
              service.status === 'degraded' ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: service.uptime }}
          ></div>
        </div>
      </div>
    </div>
  )
}

function SystemMetrics() {
  const metrics = [
    { name: 'CPU Usage', value: 23, unit: '%', status: 'good' },
    { name: 'Memory Usage', value: 67, unit: '%', status: 'normal' },
    { name: 'Disk Usage', value: 45, unit: '%', status: 'good' },
    { name: 'Network I/O', value: 156, unit: 'MB/s', status: 'good' },
    { name: 'Active Connections', value: 1234, unit: '', status: 'normal' },
    { name: 'Error Rate', value: 0.02, unit: '%', status: 'excellent' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">📊 System Metrics</h3>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">{metric.name}</span>
              <div className={`w-2 h-2 rounded-full ${
                metric.status === 'excellent' ? 'bg-green-500' :
                metric.status === 'good' ? 'bg-blue-500' :
                metric.status === 'normal' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
            </div>
            <span className="font-bold text-gray-800">
              {metric.value}{metric.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PerformanceChart() {
  // Simple mock chart data
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const responseTimeData = hours.map(hour => ({
    hour: `${hour.toString().padStart(2, '0')}:00`,
    responseTime: Math.floor(Math.random() * 100) + 100
  }))

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">📈 24h Performance</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Response Time Trend</span>
          <span className="text-green-600 font-medium">↗️ Improving</span>
        </div>
        
        {/* Simple bar chart representation */}
        <div className="flex items-end gap-1 h-32">
          {responseTimeData.slice(0, 12).map((data, index) => (
            <div
              key={index}
              className="bg-blue-500 rounded-t-sm flex-1 opacity-70 hover:opacity-100 transition-opacity"
              style={{ height: `${(data.responseTime - 100) / 2}%` }}
              title={`${data.hour}: ${data.responseTime}ms`}
            ></div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">142ms</div>
          <div className="text-sm text-gray-600">Average Response Time</div>
        </div>
      </div>
    </div>
  )
}
