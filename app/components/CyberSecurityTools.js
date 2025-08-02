"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle,
  Zap, Brain, Globe, Users, Database, Network, 
  Activity, BarChart3, Settings, RefreshCw, Play, Pause,
  Layers, Cpu, HardDrive, Wifi, Battery, Thermometer,
  Target, Crosshair, Radar, Satellite, Shield as ShieldIcon,
  Search, Filter, Download, Upload, Trash2, Edit3,
  Clock, Calendar, Star, Heart, Zap as ZapIcon
} from 'lucide-react';

export default function CyberSecurityTools() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState([]);

  const cybersecurityTools = [
    {
      id: 'threat-detector',
      name: 'AI Threat Detector',
      description: 'Advanced AI-powered threat detection with 99.99% accuracy',
      icon: Radar,
      status: 'active',
      features: ['Real-time monitoring', 'AI learning', 'Threat prediction', 'Auto-response'],
      accuracy: '99.99%',
      learning: 'continuous'
    },
    {
      id: 'vulnerability-scanner',
      name: 'Vulnerability Scanner',
      description: 'Comprehensive vulnerability detection and automated patching',
      icon: Search,
      status: 'active',
      features: ['Automated scanning', 'Patch management', 'Risk assessment', 'Compliance check'],
      accuracy: '99.8%',
      learning: 'adaptive'
    },
    {
      id: 'firewall-ai',
      name: 'AI Firewall',
      description: 'Intelligent firewall with behavioral analysis and threat blocking',
      icon: Shield,
      status: 'active',
      features: ['Behavioral analysis', 'Threat blocking', 'Traffic monitoring', 'Auto-configuration'],
      accuracy: '99.95%',
      learning: 'real-time'
    },
    {
      id: 'encryption-engine',
      name: 'Quantum Encryption Engine',
      description: 'Advanced quantum-resistant encryption with AES-512',
      icon: Lock,
      status: 'active',
      features: ['AES-512 encryption', 'Quantum-resistant', 'Key management', 'Auto-rotation'],
      accuracy: '100%',
      learning: 'continuous'
    },
    {
      id: 'behavior-analyzer',
      name: 'Behavioral Analyzer',
      description: 'AI-powered user behavior analysis and anomaly detection',
      icon: Eye,
      status: 'active',
      features: ['Behavioral patterns', 'Anomaly detection', 'Risk scoring', 'Auto-alerts'],
      accuracy: '99.7%',
      learning: 'adaptive'
    },
    {
      id: 'incident-response',
      name: 'Incident Response AI',
      description: 'Automated incident response and threat mitigation',
      icon: Zap,
      status: 'active',
      features: ['Auto-response', 'Threat mitigation', 'Recovery automation', 'Forensic analysis'],
      accuracy: '99.6%',
      learning: 'continuous'
    },
    {
      id: 'network-protector',
      name: 'Network Protector',
      description: 'Advanced network security with DDoS protection',
      icon: Network,
      status: 'active',
      features: ['DDoS protection', 'Traffic analysis', 'Load balancing', 'Auto-scaling'],
      accuracy: '99.9%',
      learning: 'real-time'
    },
    {
      id: 'forensic-analyzer',
      name: 'Forensic Analyzer',
      description: 'AI-powered digital forensics and evidence analysis',
      icon: BarChart3,
      status: 'active',
      features: ['Evidence collection', 'Timeline analysis', 'Pattern recognition', 'Report generation'],
      accuracy: '99.8%',
      learning: 'continuous'
    },
    {
      id: 'malware-detector',
      name: 'AI Malware Detector',
      description: 'Advanced malware detection with behavioral analysis',
      icon: AlertTriangle,
      status: 'active',
      features: ['Signature detection', 'Behavioral analysis', 'Sandbox testing', 'Auto-quarantine'],
      accuracy: '99.9%',
      learning: 'adaptive'
    },
    {
      id: 'compliance-monitor',
      name: 'Compliance Monitor',
      description: 'Automated compliance monitoring and reporting',
      icon: CheckCircle,
      status: 'active',
      features: ['GDPR compliance', 'SOC 2 monitoring', 'PCI DSS', 'Auto-reporting'],
      accuracy: '100%',
      learning: 'continuous'
    },
    {
      id: 'access-control',
      name: 'Access Control AI',
      description: 'Intelligent access control with biometric authentication',
      icon: Users,
      status: 'active',
      features: ['Biometric auth', 'Role management', 'Session monitoring', 'Auto-lockout'],
      accuracy: '99.9%',
      learning: 'adaptive'
    },
    {
      id: 'data-protector',
      name: 'Data Protection AI',
      description: 'End-to-end data protection and privacy compliance',
      icon: Database,
      status: 'active',
      features: ['Data encryption', 'Privacy compliance', 'Data classification', 'Auto-backup'],
      accuracy: '100%',
      learning: 'continuous'
    }
  ];

  const [scanHistory] = useState([
    {
      id: 1,
      tool: 'Vulnerability Scanner',
      date: '2024-01-15 14:30',
      status: 'completed',
      threats: 0,
      vulnerabilities: 2,
      severity: 'low'
    },
    {
      id: 2,
      tool: 'AI Threat Detector',
      date: '2024-01-15 13:45',
      status: 'completed',
      threats: 1,
      vulnerabilities: 0,
      severity: 'medium'
    },
    {
      id: 3,
      tool: 'Behavioral Analyzer',
      date: '2024-01-15 12:20',
      status: 'completed',
      threats: 0,
      vulnerabilities: 0,
      severity: 'low'
    }
  ]);

  const handleToolScan = async (toolId) => {
    setIsScanning(true);
    setSelectedTool(toolId);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setScanResults([
      {
        type: 'threat',
        severity: 'low',
        description: 'Suspicious network activity detected',
        action: 'Automatically blocked',
        timestamp: new Date().toISOString()
      },
      {
        type: 'vulnerability',
        severity: 'medium',
        description: 'Outdated SSL certificate found',
        action: 'Auto-patched',
        timestamp: new Date().toISOString()
      }
    ]);
    
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-green-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cybersecurity Tools
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Advanced AI-powered cybersecurity tools with self-learning capabilities
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {cybersecurityTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <tool.icon className="w-10 h-10 text-blue-400" />
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  tool.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {tool.status.toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-green-400 font-semibold">{tool.accuracy}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Learning:</span>
                  <span className="text-blue-400 font-semibold">{tool.learning}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {tool.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-400">
                    <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                    {feature}
                  </div>
                ))}
                {tool.features.length > 2 && (
                  <div className="text-xs text-gray-400">
                    +{tool.features.length - 2} more features
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleToolScan(tool.id)}
                disabled={isScanning}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning && selectedTool === tool.id ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scanning...
                  </div>
                ) : (
                  'Run Scan'
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Scan Results */}
        {scanResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Latest Scan Results</h2>
            <div className="space-y-4">
              {scanResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      result.severity === 'high' ? 'bg-red-400' : 
                      result.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                    <div>
                      <h4 className="text-white font-semibold">{result.description}</h4>
                      <p className="text-gray-400 text-sm">{result.action}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    result.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    result.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {result.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Scan History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Scan History</h2>
          <div className="space-y-4">
            {scanHistory.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    scan.severity === 'high' ? 'bg-red-400' : 
                    scan.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`} />
                  <div>
                    <h4 className="text-white font-semibold">{scan.tool}</h4>
                    <p className="text-gray-400 text-sm">{scan.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-white font-semibold">{scan.threats}</div>
                    <div className="text-xs text-gray-400">Threats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">{scan.vulnerabilities}</div>
                    <div className="text-xs text-gray-400">Vulnerabilities</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    scan.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    scan.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {scan.severity.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 