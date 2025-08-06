'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Scan,
  Zap,
  Globe,
  Server,
  Database,
  Key,
  Fingerprint,
  Bug,
  Activity,
  TrendingUp,
  BarChart3,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Users,
  Clock,
  MapPin
} from 'lucide-react';

const SecurityManager = () => {
  const [securityStatus, setSecurityStatus] = useState('secure');
  const [isScanning, setIsScanning] = useState(false);
  const [activeThreats, setActiveThreats] = useState(0);
  const [blockedAttacks, setBlockedAttacks] = useState(1247);
  const [securityScore, setSecurityScore] = useState(98);

  const securityModules = [
    {
      id: 'firewall',
      name: 'Advanced Firewall',
      description: 'Military-grade network protection',
      status: 'active',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      threats: 0,
      blocked: 342
    },
    {
      id: 'malware',
      name: 'Malware Detection',
      description: 'Real-time malware scanning',
      status: 'active',
      icon: Bug,
      color: 'from-blue-500 to-cyan-500',
      threats: 0,
      blocked: 156
    },
    {
      id: 'intrusion',
      name: 'Intrusion Prevention',
      description: 'AI-powered intrusion detection',
      status: 'active',
      icon: Eye,
      color: 'from-purple-500 to-indigo-500',
      threats: 0,
      blocked: 89
    },
    {
      id: 'encryption',
      name: 'Data Encryption',
      description: 'Military-grade encryption',
      status: 'active',
      icon: Lock,
      color: 'from-orange-500 to-red-500',
      threats: 0,
      blocked: 234
    },
    {
      id: 'authentication',
      name: 'Multi-Factor Auth',
      description: 'Biometric authentication',
      status: 'active',
      icon: Fingerprint,
      color: 'from-pink-500 to-rose-500',
      threats: 0,
      blocked: 67
    },
    {
      id: 'monitoring',
      name: 'Security Monitoring',
      description: '24/7 threat monitoring',
      status: 'active',
      icon: Activity,
      color: 'from-teal-500 to-green-500',
      threats: 0,
      blocked: 359
    }
  ];

  const recentThreats = [
    {
      id: 1,
      type: 'Malware',
      severity: 'high',
      source: '192.168.1.100',
      time: '2 minutes ago',
      status: 'blocked',
      location: 'Russia'
    },
    {
      id: 2,
      type: 'Brute Force',
      severity: 'medium',
      source: '10.0.0.15',
      time: '5 minutes ago',
      status: 'blocked',
      location: 'China'
    },
    {
      id: 3,
      type: 'SQL Injection',
      severity: 'high',
      source: '203.0.113.45',
      time: '8 minutes ago',
      status: 'blocked',
      location: 'North Korea'
    },
    {
      id: 4,
      type: 'DDoS Attempt',
      severity: 'critical',
      source: '198.51.100.32',
      time: '12 minutes ago',
      status: 'blocked',
      location: 'Iran'
    }
  ];

  const securityMetrics = [
    { label: 'Threats Blocked Today', value: blockedAttacks, icon: ShieldCheck, color: 'text-green-400' },
    { label: 'Active Threats', value: activeThreats, icon: AlertTriangle, color: 'text-red-400' },
    { label: 'Security Score', value: `${securityScore}%`, icon: TrendingUp, color: 'text-blue-400' },
    { label: 'System Uptime', value: '99.99%', icon: Activity, color: 'text-purple-400' }
  ];

  const performSecurityScan = async () => {
    setIsScanning(true);
    
    // Simulate comprehensive security scan
    setTimeout(() => {
      setIsScanning(false);
      setSecurityScore(Math.min(100, securityScore + Math.floor(Math.random() * 3)));
      setBlockedAttacks(prev => prev + Math.floor(Math.random() * 10));
    }, 5000);
  };

  useEffect(() => {
    // Real-time threat simulation
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance of new threat
        setBlockedAttacks(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Security Manager
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Military-grade cybersecurity platform with AI-powered threat detection, 
              real-time monitoring, and advanced protection systems.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Security Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Security Dashboard</h3>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                securityStatus === 'secure' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {securityStatus === 'secure' ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                <span className="font-semibold">
                  {securityStatus === 'secure' ? 'SECURE' : 'THREAT DETECTED'}
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={performSecurityScan}
                disabled={isScanning}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isScanning ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Scan className="w-5 h-5" />
                    </motion.div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5" />
                    Full Security Scan
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {securityMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-slate-700 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Security Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Security Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-gradient-to-r ${module.color} rounded-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{module.name}</h4>
                      <p className="text-gray-400 text-sm">{module.description}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${
                      module.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {module.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{module.threats}</div>
                      <div className="text-gray-400 text-xs">Active Threats</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{module.blocked}</div>
                      <div className="text-gray-400 text-xs">Blocked Today</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Threat Intelligence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Recent Threat Activity</h3>
          
          <div className="space-y-4">
            {recentThreats.map((threat) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg"
              >
                <div className={`p-2 rounded ${getSeverityColor(threat.severity)}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white">{threat.type}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Source: {threat.source}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {threat.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {threat.time}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">BLOCKED</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advanced Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Military-Grade Security
          </h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Protect your digital empire with advanced cybersecurity. Real-time threat detection, 
            AI-powered defense systems, and enterprise-grade protection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Advanced Settings
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityManager;
