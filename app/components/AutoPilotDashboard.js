"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, Brain, Database, Clock, AlertTriangle,
  CheckCircle, TrendingUp, Settings, Play, Pause, 
  RefreshCw, Activity, BarChart3, Globe, Users,
  Cpu, HardDrive, Wifi, Battery, Thermometer
} from 'lucide-react';

export default function AutoPilotDashboard() {
  const [isActive, setIsActive] = useState(true);
  const [systemStatus, setSystemStatus] = useState('optimal');
  const [metrics, setMetrics] = useState({
    uptime: '99.9%',
    responseTime: '120ms',
    activeUsers: 12450,
    errorRate: '0.1%',
    cpuUsage: '45%',
    memoryUsage: '65%',
    diskUsage: '78%'
  });

  const [autoPilotFeatures, setAutoPilotFeatures] = useState([
    {
      id: 'performance_optimization',
      name: 'Performance Optimization',
      status: 'active',
      icon: Zap,
      description: 'Automatically optimizes system performance',
      lastRun: '2 hours ago',
      nextRun: '4 hours'
    },
    {
      id: 'security_monitoring',
      name: 'Security Monitoring',
      status: 'active',
      icon: Shield,
      description: '24/7 security threat detection',
      lastRun: '5 minutes ago',
      nextRun: '10 minutes'
    },
    {
      id: 'ai_optimization',
      name: 'AI Model Optimization',
      status: 'active',
      icon: Brain,
      description: 'Continuously improves AI models',
      lastRun: '1 hour ago',
      nextRun: '6 hours'
    },
    {
      id: 'database_optimization',
      name: 'Database Optimization',
      status: 'active',
      icon: Database,
      description: 'Automated database maintenance',
      lastRun: '3 hours ago',
      nextRun: '12 hours'
    },
    {
      id: 'backup_management',
      name: 'Backup Management',
      status: 'active',
      icon: HardDrive,
      description: 'Automated backup and recovery',
      lastRun: '6 hours ago',
      nextRun: '18 hours'
    },
    {
      id: 'error_monitoring',
      name: 'Error Monitoring',
      status: 'active',
      icon: AlertTriangle,
      description: 'Real-time error detection and resolution',
      lastRun: '1 minute ago',
      nextRun: '5 minutes'
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: 'Performance optimization completed',
      status: 'success',
      timestamp: '2 hours ago',
      details: 'System performance improved by 23%'
    },
    {
      id: 2,
      action: 'Security scan completed',
      status: 'success',
      timestamp: '5 minutes ago',
      details: 'No threats detected'
    },
    {
      id: 3,
      action: 'AI model updated',
      status: 'success',
      timestamp: '1 hour ago',
      details: 'Model accuracy improved to 94.2%'
    },
    {
      id: 4,
      action: 'Database backup completed',
      status: 'success',
      timestamp: '6 hours ago',
      details: '2.4 GB backup created successfully'
    },
    {
      id: 5,
      action: 'Error resolved',
      status: 'warning',
      timestamp: '10 minutes ago',
      details: 'API timeout issue resolved'
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        cpuUsage: Math.max(30, Math.min(80, prev.cpuUsage + Math.random() * 10 - 5)) + '%',
        memoryUsage: Math.max(50, Math.min(90, prev.memoryUsage + Math.random() * 10 - 5)) + '%'
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleAutoPilot = () => {
    setIsActive(!isActive);
  };

  const handleRunOptimization = async (featureId) => {
    // Simulate API call
    console.log(`Running optimization for ${featureId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Auto-Pilot Dashboard
</h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mb-6">
            Intelligent system management and optimization running 24/7
          </p>
          
          {/* Auto-Pilot Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={handleToggleAutoPilot}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center ${
                isActive 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isActive ? (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Auto-Pilot Active
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Auto-Pilot Paused
                </>
              )}
            </button>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition flex items-center">
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-400" />
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                systemStatus === 'optimal' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {systemStatus.toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{metrics.uptime}</h3>
            <p className="text-gray-400">Uptime</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Cpu className="w-8 h-8 text-blue-400" />
              <span className="text-xs text-gray-400">CPU</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{metrics.cpuUsage}</h3>
            <p className="text-gray-400">Usage</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <HardDrive className="w-8 h-8 text-purple-400" />
              <span className="text-xs text-gray-400">Memory</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{metrics.memoryUsage}</h3>
            <p className="text-gray-400">Usage</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-pink-400" />
              <span className="text-xs text-gray-400">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{metrics.activeUsers.toLocaleString()}</h3>
            <p className="text-gray-400">Users</p>
          </div>
        </motion.div>

        {/* Auto-Pilot Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Auto-Pilot Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {autoPilotFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    feature.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {feature.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div>Last run: {feature.lastRun}</div>
                  <div>Next run: {feature.nextRun}</div>
                </div>
                <button
                  onClick={() => handleRunOptimization(feature.id)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                >
                  Run Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{activity.action}</h4>
                    <p className="text-gray-400 text-sm">{activity.details}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">System Analytics</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Response Time</span>
                  <span className="text-white font-semibold">{metrics.responseTime}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Error Rate</span>
                  <span className="text-white font-semibold">{metrics.errorRate}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Disk Usage</span>
                  <span className="text-white font-semibold">{metrics.diskUsage}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">System Health</span>
                  <span className="text-green-400 font-semibold">Excellent</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 