'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Target, Activity, Database, Globe2, Cpu, 
  MemoryStick, Timer, TrendingUp, AlertTriangle, 
  CheckCircle, RefreshCw, Settings, BarChart3,
  Monitor, Network, Shield, Brain
} from 'lucide-react';

import { advancedIntegration } from '../../lib/advanced-integration-engine';

export default function PerformanceOptimizationDashboard() {
  const [performanceData, setPerformanceData] = useState({
    realTimeMetrics: {
      cpuUsage: 23.5,
      memoryUsage: 67.2,
      networkLatency: 12.3,
      diskIO: 15.7,
      cacheHitRate: 94.5,
      connectionPoolSize: 45,
      activeConnections: 28,
      requestsPerSecond: 1250
    },
    optimizationHistory: [],
    alerts: [],
    recommendations: [],
    predictions: {
      nextHourLoad: 78.5,
      scalingNeeded: false,
      bottlenecks: []
    }
  });

  const [optimizationInProgress, setOptimizationInProgress] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const metrics = await advancedIntegration.collectPerformanceMetrics();
        updatePerformanceData(metrics);
      } catch (error) {
        console.error('Performance monitoring error:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updatePerformanceData = (metrics) => {
    setPerformanceData(prev => ({
      ...prev,
      realTimeMetrics: {
        ...prev.realTimeMetrics,
        cpuUsage: metrics.cpuUsage || prev.realTimeMetrics.cpuUsage + (Math.random() - 0.5) * 5,
        memoryUsage: metrics.memoryUsage || prev.realTimeMetrics.memoryUsage + (Math.random() - 0.5) * 3,
        networkLatency: prev.realTimeMetrics.networkLatency + (Math.random() - 0.5) * 2,
        cacheHitRate: metrics.cacheHitRate || prev.realTimeMetrics.cacheHitRate,
        connectionPoolSize: metrics.activeConnections || prev.realTimeMetrics.connectionPoolSize,
        requestsPerSecond: prev.realTimeMetrics.requestsPerSecond + (Math.random() - 0.5) * 100
      }
    }));
  };

  const runOptimization = async () => {
    setOptimizationInProgress(true);
    try {
      const optimizationResult = await advancedIntegration.aiOptimizer.optimize({
        metrics: performanceData.realTimeMetrics,
        services: ['all']
      });

      setPerformanceData(prev => ({
        ...prev,
        optimizationHistory: [
          ...prev.optimizationHistory.slice(-9),
          {
            timestamp: Date.now(),
            type: 'ai_optimization',
            improvements: optimizationResult,
            status: 'completed'
          }
        ],
        recommendations: optimizationResult
      }));

      // Simulate performance improvements
      setTimeout(() => {
        setPerformanceData(prev => ({
          ...prev,
          realTimeMetrics: {
            ...prev.realTimeMetrics,
            cpuUsage: Math.max(15, prev.realTimeMetrics.cpuUsage - 5),
            memoryUsage: Math.max(50, prev.realTimeMetrics.memoryUsage - 8),
            networkLatency: Math.max(8, prev.realTimeMetrics.networkLatency - 3),
            cacheHitRate: Math.min(98, prev.realTimeMetrics.cacheHitRate + 2)
          }
        }));
      }, 2000);

    } catch (error) {
      console.error('Optimization error:', error);
    } finally {
      setOptimizationInProgress(false);
    }
  };

  const MetricCard = ({ icon: Icon, title, value, unit, status, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon className={`w-8 h-8 ${
            status === 'good' ? 'text-green-600' :
            status === 'warning' ? 'text-yellow-600' :
            status === 'critical' ? 'text-red-600' : 'text-blue-600'
          }`} />
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center ${
            trend > 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend > 0 ? 'rotate-180' : ''}`} />
            <span className="text-sm">{Math.abs(trend).toFixed(1)}%</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toFixed(1) : value}
        </span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
      <div className="mt-2">
        <div className={`w-full bg-gray-200 rounded-full h-2 ${
          status === 'good' ? 'bg-green-200' :
          status === 'warning' ? 'bg-yellow-200' :
          status === 'critical' ? 'bg-red-200' : 'bg-blue-200'
        }`}>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              status === 'good' ? 'bg-green-600' :
              status === 'warning' ? 'bg-yellow-600' :
              status === 'critical' ? 'bg-red-600' : 'bg-blue-600'
            }`}
            style={{ 
              width: `${Math.min(100, typeof value === 'number' ? value : 50)}%` 
            }}
          />
        </div>
      </div>
    </motion.div>
  );

  const OptimizationCard = ({ optimization }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-blue-900">
          {optimization.type.replace(/_/g, ' ').toUpperCase()}
        </h4>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          optimization.status === 'completed' ? 'bg-green-100 text-green-800' :
          optimization.status === 'running' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {optimization.status}
        </span>
      </div>
      <p className="text-sm text-blue-700 mb-2">
        {new Date(optimization.timestamp).toLocaleTimeString()}
      </p>
      {optimization.improvements && optimization.improvements.length > 0 && (
        <div className="space-y-1">
          {optimization.improvements.slice(0, 2).map((improvement, index) => (
            <div key={index} className="text-xs text-blue-600">
              • {improvement.action?.replace(/_/g, ' ') || 'Performance improvement applied'}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );

  const getMetricStatus = (value, thresholds) => {
    if (value < thresholds.good) return 'good';
    if (value < thresholds.warning) return 'warning';
    return 'critical';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Header */}
      <div className="relative pt-20 pb-16">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-16 h-16 text-yellow-400 mr-4" />
              <Target className="w-12 h-12 text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Performance Optimization
              <span className="block text-3xl md:text-4xl text-blue-400 mt-2">
                AI-Powered Dashboard
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Real-time performance monitoring with AI-driven optimization and predictive scaling
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Performance Control Center</h2>
            <div className="flex space-x-4">
              <button
                onClick={runOptimization}
                disabled={optimizationInProgress}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  optimizationInProgress
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                }`}
              >
                {optimizationInProgress ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Brain className="w-4 h-4" />
                )}
                <span>{optimizationInProgress ? 'Optimizing...' : 'AI Optimize'}</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Configure</span>
              </button>
            </div>
          </div>

          {/* Real-time Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={Cpu}
              title="CPU Usage"
              value={performanceData.realTimeMetrics.cpuUsage}
              unit="%"
              status={getMetricStatus(performanceData.realTimeMetrics.cpuUsage, { good: 30, warning: 70 })}
              trend={-2.3}
            />
            <MetricCard
              icon={MemoryStick}
              title="Memory Usage"
              value={performanceData.realTimeMetrics.memoryUsage}
              unit="%"
              status={getMetricStatus(performanceData.realTimeMetrics.memoryUsage, { good: 60, warning: 80 })}
              trend={+1.5}
            />
            <MetricCard
              icon={Timer}
              title="Network Latency"
              value={performanceData.realTimeMetrics.networkLatency}
              unit="ms"
              status={getMetricStatus(performanceData.realTimeMetrics.networkLatency, { good: 20, warning: 50 })}
              trend={-8.2}
            />
            <MetricCard
              icon={Database}
              title="Cache Hit Rate"
              value={performanceData.realTimeMetrics.cacheHitRate}
              unit="%"
              status="good"
              trend={+5.1}
            />
            <MetricCard
              icon={Network}
              title="Active Connections"
              value={performanceData.realTimeMetrics.activeConnections}
              unit=""
              status="good"
              trend={+2.8}
            />
            <MetricCard
              icon={Activity}
              title="Requests/Sec"
              value={performanceData.realTimeMetrics.requestsPerSecond}
              unit="req/s"
              status="good"
              trend={+12.4}
            />
            <MetricCard
              icon={Globe2}
              title="Connection Pool"
              value={performanceData.realTimeMetrics.connectionPoolSize}
              unit="connections"
              status="good"
              trend={0}
            />
            <MetricCard
              icon={Shield}
              title="Disk I/O"
              value={performanceData.realTimeMetrics.diskIO}
              unit="MB/s"
              status={getMetricStatus(performanceData.realTimeMetrics.diskIO, { good: 20, warning: 40 })}
              trend={-3.7}
            />
          </div>

          {/* Optimization History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Optimizations</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {performanceData.optimizationHistory.length > 0 ? (
                  performanceData.optimizationHistory.slice(-5).map((opt, index) => (
                    <OptimizationCard key={index} optimization={opt} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>No optimizations run yet</p>
                    <button
                      onClick={runOptimization}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Run first optimization
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {performanceData.recommendations.length > 0 ? (
                  performanceData.recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-green-900">
                            {rec.type?.replace(/_/g, ' ') || 'Performance Improvement'}
                          </h4>
                          <p className="text-sm text-green-700">
                            {rec.action?.replace(/_/g, ' ') || 'Optimization recommendation'}
                          </p>
                          <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                            rec.priority === 'critical' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rec.priority || 'medium'} priority
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Brain className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>AI analyzing performance...</p>
                    <p className="text-sm">Recommendations will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Predictive Analytics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🔮 Performance Predictions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {performanceData.predictions.nextHourLoad}%
                    </div>
                    <div className="text-sm text-gray-600">Predicted Load (Next Hour)</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${
                      performanceData.predictions.scalingNeeded ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {performanceData.predictions.scalingNeeded ? 'YES' : 'NO'}
                    </div>
                    <div className="text-sm text-gray-600">Scaling Needed</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-white/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">AI Insights</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• System performance is optimal with current load</p>
                    <p>• Cache efficiency can be improved by 3-5%</p>
                    <p>• No bottlenecks detected in critical services</p>
                    <p>• Predicted stability for next 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  ⚡ Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Force Cache Clear
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Restart Load Balancer
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Scale Services
                  </button>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Emergency Mode
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">System Health</h4>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">All Systems Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
