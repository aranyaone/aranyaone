"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle,
  Zap, Brain, Globe, Users, Database, Network, 
  Activity, BarChart3, Settings, RefreshCw, Play, Pause,
  Layers, Cpu, HardDrive, Wifi, Battery, Thermometer,
  Target, Crosshair, Radar, Satellite, Shield as ShieldIcon
} from 'lucide-react';

export default function CybersecurityPage() {
  const [securityStatus, setSecurityStatus] = useState('secure');
  const [threatLevel, setThreatLevel] = useState('low');
  const [activeThreats, setActiveThreats] = useState(0);
  const [protectionLayers, setProtectionLayers] = useState(100000);
  const [aiLearningStatus, setAiLearningStatus] = useState('active');

  const [securityMetrics, setSecurityMetrics] = useState({
    blockedAttacks: 156789,
    preventedBreaches: 2345,
    activeProtection: 100000,
    responseTime: '0.001ms',
    uptime: '99.999%',
    encryptionStrength: 'AES-512',
    aiAccuracy: '99.99%'
  });

  const [threatIntelligence, setThreatIntelligence] = useState({
    knownThreats: 1567890,
    newThreats: 234,
    threatTypes: ['Malware', 'Phishing', 'DDoS', 'SQL Injection', 'XSS', 'Zero-Day'],
    aiPredictions: 9876,
    accuracy: '99.99%'
  });

  const [protectionLayersData] = useState([
    {
      id: 1,
      name: "Quantum Encryption Layer",
      status: 'active',
      strength: 'AES-512',
      description: 'Advanced quantum-resistant encryption',
      icon: Lock
    },
    {
      id: 2,
      name: "AI Threat Detection",
      status: 'active',
      strength: '99.99%',
      description: 'Self-learning AI threat detection',
      icon: Brain
    },
    {
      id: 3,
      name: "Behavioral Analysis",
      status: 'active',
      strength: 'Real-time',
      description: 'User behavior pattern analysis',
      icon: Eye
    },
    {
      id: 4,
      name: "Network Security",
      status: 'active',
      strength: 'Multi-layer',
      description: 'Advanced network protection',
      icon: Network
    },
    {
      id: 5,
      name: "Application Security",
      status: 'active',
      strength: 'OWASP Top 10',
      description: 'Comprehensive app security',
      icon: Shield
    },
    {
      id: 6,
      name: "Data Protection",
      status: 'active',
      strength: 'GDPR Compliant',
      description: 'End-to-end data encryption',
      icon: Database
    }
  ]);

  const [aiTools] = useState([
    {
      id: 'threat-analyzer',
      name: 'AI Threat Analyzer',
      description: 'Advanced AI-powered threat detection and analysis',
      status: 'active',
      learning: 'continuous',
      accuracy: '99.99%'
    },
    {
      id: 'behavior-monitor',
      name: 'Behavioral Monitor',
      description: 'Real-time user behavior analysis and anomaly detection',
      status: 'active',
      learning: 'adaptive',
      accuracy: '99.8%'
    },
    {
      id: 'network-protector',
      name: 'Network Protector',
      description: 'AI-powered network security and DDoS protection',
      status: 'active',
      learning: 'real-time',
      accuracy: '99.95%'
    },
    {
      id: 'vulnerability-scanner',
      name: 'Vulnerability Scanner',
      description: 'Automated vulnerability detection and patching',
      status: 'active',
      learning: 'continuous',
      accuracy: '99.9%'
    },
    {
      id: 'incident-response',
      name: 'Incident Response AI',
      description: 'Automated incident response and threat mitigation',
      status: 'active',
      learning: 'adaptive',
      accuracy: '99.7%'
    },
    {
      id: 'forensic-analyzer',
      name: 'Forensic Analyzer',
      description: 'AI-powered digital forensics and evidence analysis',
      status: 'active',
      learning: 'continuous',
      accuracy: '99.8%'
    }
  ]);

  useEffect(() => {
    // Simulate real-time security monitoring
    const interval = setInterval(() => {
      setActiveThreats(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      setSecurityMetrics(prev => ({
        ...prev,
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 10),
        preventedBreaches: prev.preventedBreaches + Math.floor(Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-green-400 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Cybersecurity Empire
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              World's most advanced cybersecurity system with 100,000 layers of protection and self-learning AI
            </p>
            
            {/* Security Status */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${
                  securityStatus === 'secure' ? 'bg-green-400' : 'bg-red-400'
                } animate-pulse`} />
                <span className="text-white font-semibold">System: {securityStatus.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${
                  threatLevel === 'low' ? 'bg-green-400' : threatLevel === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span className="text-white font-semibold">Threat Level: {threatLevel.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldIcon className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">{protectionLayers.toLocaleString()} Layers Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Metrics */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8 text-green-400" />
                <span className="text-xs text-green-400 font-semibold">PROTECTED</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{securityMetrics.blockedAttacks.toLocaleString()}</h3>
              <p className="text-gray-400">Attacks Blocked</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Lock className="w-8 h-8 text-blue-400" />
                <span className="text-xs text-blue-400 font-semibold">SECURE</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{securityMetrics.preventedBreaches.toLocaleString()}</h3>
              <p className="text-gray-400">Breaches Prevented</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-xs text-purple-400 font-semibold">AI ACTIVE</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{securityMetrics.aiAccuracy}</h3>
              <p className="text-gray-400">AI Accuracy</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-pink-400" />
                <span className="text-xs text-pink-400 font-semibold">RESPONSE</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{securityMetrics.responseTime}</h3>
              <p className="text-gray-400">Response Time</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Protection Layers */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              100,000 Protection Layers
            </h2>
            <p className="text-xl text-gray-300">
              Multi-layered security system with quantum encryption and AI-powered protection
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {protectionLayersData.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <layer.icon className="w-10 h-10 text-green-400" />
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                    {layer.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{layer.name}</h3>
                <p className="text-gray-300 mb-4">{layer.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Strength:</span>
                  <span className="text-green-400 font-semibold">{layer.strength}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Security Tools */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Self-Learning AI Security Tools
            </h2>
            <p className="text-xl text-gray-300">
              Advanced AI tools that learn, adapt, and protect autonomously
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <Brain className="w-10 h-10 text-blue-400" />
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tool.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {tool.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{tool.name}</h3>
                <p className="text-gray-300 mb-6">{tool.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Learning Mode:</span>
                    <span className="text-blue-400 font-semibold">{tool.learning}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Accuracy:</span>
                    <span className="text-green-400 font-semibold">{tool.accuracy}</span>
                  </div>
                </div>
                <button className="mt-6 w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
                  Configure Tool
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Intelligence */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8"
          >
            <div className="text-center mb-8">
              <Radar className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">Threat Intelligence</h2>
              <p className="text-gray-300">Real-time threat monitoring and AI-powered analysis</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{threatIntelligence.knownThreats.toLocaleString()}</h3>
                <p className="text-gray-400">Known Threats</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{threatIntelligence.newThreats}</h3>
                <p className="text-gray-400">New Threats Today</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{threatIntelligence.aiPredictions.toLocaleString()}</h3>
                <p className="text-gray-400">AI Predictions</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-bold text-white mb-4">Threat Types Monitored</h4>
              <div className="flex flex-wrap gap-2">
                {threatIntelligence.threatTypes.map((threat, index) => (
                  <span key={index} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                    {threat}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real-time Monitoring */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Real-time Security Monitoring
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Active Threats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <div>
                      <h4 className="text-white font-semibold">DDoS Attack</h4>
                      <p className="text-gray-400 text-sm">Blocked 1,234 requests</p>
                    </div>
                  </div>
                  <span className="text-red-400 font-semibold">BLOCKED</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-yellow-400" />
                    <div>
                      <h4 className="text-white font-semibold">Suspicious Activity</h4>
                      <p className="text-gray-400 text-sm">Under investigation</p>
                    </div>
                  </div>
                  <span className="text-yellow-400 font-semibold">MONITORING</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Firewall</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 font-semibold">ACTIVE</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Intrusion Detection</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 font-semibold">ACTIVE</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">AI Learning</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-semibold">LEARNING</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Encryption</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 font-semibold">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Your Empire is Protected
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              With 100,000 layers of protection and self-learning AI, your platform is secured by the world's most advanced cybersecurity system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold rounded-xl hover:scale-105 transition">
                View Security Dashboard
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-xl hover:bg-white/20 transition">
                Configure Security
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 