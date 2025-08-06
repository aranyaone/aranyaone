'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, Eye, Target, Settings, Download, Upload,
  Play, Pause, RotateCw, Clock, CheckCircle, AlertCircle, ArrowRight, ChevronDown,
  ChevronUp, Plus, Trash2, Copy, Edit, Layers, Search, Filter, BarChart3,
  LineChart, PieChart, Activity, News, Newspaper, Radio, Tv, Monitor,
  Smartphone, Tablet, Watch, Headphones, Printer, Scanner, CreditCard,
  Wallet, Gift, Award, Trophy, Medal, Diamond, Crown, Star, Sparkles,
  Database, Server, Network, Cpu, Memory, HardDrive, Wifi, Signal, MapPin,
  Calendar, Users, UserCheck, UserX, Building, Home, Office, Factory, Store,
  Bank, University, School, GraduationCap, BookOpen, Microscope, Flask, TestTube,
  Atom, Dna, Code, Terminal, Laptop, Desktop, Smartphone as Phone, Camera,
  Video, Music, FileText, Image, Archive, Folder, File, Download as DownloadIcon,
  Upload as UploadIcon, Share, Link, ExternalLink, Mail, MessageSquare,
  Phone as PhoneIcon, Video as VideoIcon, Calendar as CalendarIcon,
  Clock as ClockIcon, Map, Navigation, Compass, Target as TargetIcon,
  Crosshair, Aim, Scope, Binoculars, Telescope, Satellite, Rocket,
  Plane, Car, Train, Bus, Ship, Bicycle, Motorcycle, Truck, Van,
  Helicopter, Drone, Submarine, Spaceship, UFO, Robot, Android, Iphone,
  Apple, Windows, Linux, Android as AndroidIcon, Chrome, Firefox,
  Safari, Edge, Opera, Brave, Tor, Vpn, Shield as ShieldIcon, Lock, Unlock, Key,
  Fingerprint, Face, Eye as EyeIcon, EyeOff, Ear, Mouth, Nose, Hand,
  ThumbsUp, ThumbsDown, Heart, HeartOff, Star as StarIcon, StarOff,
  Bookmark, BookmarkOff, Flag, FlagOff, Bell, BellOff, Volume, VolumeOff,
  Volume1, Volume2, VolumeX, Mic, MicOff, Headphones as HeadphonesIcon,
  HeadphonesOff, Speaker, SpeakerOff, Radio as RadioIcon, Tv as TvIcon,
  Monitor as MonitorIcon, Smartphone as SmartphoneIcon, Tablet as TabletIcon,
  Watch as WatchIcon, Headphones as HeadphonesIcon2, Printer as PrinterIcon,
  Scanner as ScannerIcon, CreditCard as CreditCardIcon, Wallet as WalletIcon,
  Gift as GiftIcon, Award as AwardIcon, Trophy as TrophyIcon, Medal as MedalIcon,
  Diamond as DiamondIcon, Crown as CrownIcon, Star as StarIcon2, Sparkles as SparklesIcon,
  TrendingUp, Lightbulb, Rocket as RocketIcon, Crown as CrownIcon2
} from 'lucide-react';

const FraudDetectionAI = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [aiInsights, setAiInsights] = useState([]);

  const tabs = [
    { id: 'dashboard', name: 'Fraud Dashboard', icon: Shield },
    { id: 'alerts', name: 'Fraud Alerts', icon: AlertTriangle },
    { id: 'patterns', name: 'Pattern Recognition', icon: Eye },
    { id: 'risk-assessment', name: 'Risk Assessment', icon: Target },
    { id: 'monitoring', name: 'Real-time Monitoring', icon: Activity },
    { id: 'ai-insights', name: 'AI Insights', icon: Cpu },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const fraudTypes = [
    {
      id: 'payment-fraud',
      name: 'Payment Fraud',
      icon: CreditCard,
      color: 'from-red-400 to-pink-400',
      cases: 156,
      riskLevel: 'high',
      detectionRate: 98.5
    },
    {
      id: 'identity-theft',
      name: 'Identity Theft',
      icon: UserX,
      color: 'from-orange-400 to-red-400',
      cases: 89,
      riskLevel: 'high',
      detectionRate: 97.2
    },
    {
      id: 'account-takeover',
      name: 'Account Takeover',
      icon: Lock,
      color: 'from-yellow-400 to-orange-400',
      cases: 234,
      riskLevel: 'medium',
      detectionRate: 95.8
    },
    {
      id: 'transaction-fraud',
      name: 'Transaction Fraud',
      icon: DollarSign,
      color: 'from-green-400 to-emerald-400',
      cases: 445,
      riskLevel: 'medium',
      detectionRate: 96.3
    },
    {
      id: 'synthetic-identity',
      name: 'Synthetic Identity',
      icon: UserCheck,
      color: 'from-blue-400 to-purple-400',
      cases: 67,
      riskLevel: 'high',
      detectionRate: 94.7
    },
    {
      id: 'money-laundering',
      name: 'Money Laundering',
      icon: Bank,
      color: 'from-purple-400 to-pink-400',
      cases: 123,
      riskLevel: 'high',
      detectionRate: 99.1
    }
  ];

  const fraudAlertsData = [
    {
      id: 'alert-1',
      type: 'high',
      title: 'Suspicious Payment Pattern',
      description: 'Multiple high-value transactions from new IP address',
      timestamp: '2 minutes ago',
      riskScore: 95,
      status: 'investigating'
    },
    {
      id: 'alert-2',
      type: 'medium',
      title: 'Unusual Login Activity',
      description: 'Login attempt from unrecognized device',
      timestamp: '5 minutes ago',
      riskScore: 78,
      status: 'monitoring'
    },
    {
      id: 'alert-3',
      type: 'high',
      title: 'Identity Verification Failed',
      description: 'Document verification mismatch detected',
      timestamp: '8 minutes ago',
      riskScore: 92,
      status: 'blocked'
    },
    {
      id: 'alert-4',
      type: 'low',
      title: 'Geographic Anomaly',
      description: 'Transaction from unusual location',
      timestamp: '12 minutes ago',
      riskScore: 45,
      status: 'resolved'
    }
  ];

  const riskFactors = [
    {
      id: 'device-fingerprint',
      name: 'Device Fingerprint',
      weight: 25,
      score: 85,
      description: 'Device characteristics analysis'
    },
    {
      id: 'behavioral-analysis',
      name: 'Behavioral Analysis',
      weight: 30,
      score: 92,
      description: 'User behavior pattern recognition'
    },
    {
      id: 'transaction-history',
      name: 'Transaction History',
      weight: 20,
      score: 78,
      description: 'Historical transaction analysis'
    },
    {
      id: 'geographic-location',
      name: 'Geographic Location',
      weight: 15,
      score: 65,
      description: 'Location-based risk assessment'
    },
    {
      id: 'network-analysis',
      name: 'Network Analysis',
      weight: 10,
      score: 88,
      description: 'Network traffic pattern analysis'
    }
  ];

  useEffect(() => {
    initializeFraudDetectionAI();
  }, []);

  const initializeFraudDetectionAI = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/fraud-detection/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          types: fraudTypes,
          alerts: fraudAlertsData,
          factors: riskFactors
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFraudAlerts(data.alerts || []);
        setPatterns(data.patterns || []);
        setRiskScore(data.riskScore || 0);
        setAiInsights(data.aiInsights || []);
      }
      
    } catch (error) {
      console.error('Fraud Detection AI initialization error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeTransaction = async (transactionData) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/fraud-detection/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionData })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setRiskScore(data.riskScore);
        setFraudAlerts(prev => [...prev, data.alert]);
      }
      
    } catch (error) {
      console.error('Transaction analysis error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const blockTransaction = async (transactionId) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/fraud-detection/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFraudAlerts(prev => prev.map(alert => 
          alert.id === transactionId ? { ...alert, status: 'blocked' } : alert
        ));
      }
      
    } catch (error) {
      console.error('Transaction blocking error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-red-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Fraud Detection AI
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            World-class AI-powered fraud detection with advanced pattern recognition
          </p>
        </motion.div>

        {/* Risk Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Overall Risk Score</h3>
                <p className="text-gray-300">Real-time fraud risk assessment</p>
              </div>
              <div className={`px-6 py-3 rounded-xl font-bold text-white ${
                riskScore >= 80 ? 'bg-red-500' :
                riskScore >= 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}>
                {riskScore}% RISK
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-400 to-orange-400 text-white shadow-lg'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8"
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Fraud Dashboard</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Fraud Types</h3>
                    <div className="space-y-4">
                      {fraudTypes.map((type) => (
                        <div key={type.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <type.icon className="w-6 h-6 text-red-400 mr-3" />
                              <span className="text-white font-semibold">{type.name}</span>
                            </div>
                            <span className="text-gray-400">{type.cases} cases</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">Detection Rate: {type.detectionRate}%</span>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              type.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' :
                              type.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {type.riskLevel} risk
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
                    <div className="space-y-4">
                      {fraudAlertsData.slice(0, 4).map((alert) => (
                        <div key={alert.id} className={`p-3 rounded-lg border ${
                          alert.type === 'high' ? 'bg-red-500/20 border-red-500/30' :
                          alert.type === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30' :
                          'bg-blue-500/20 border-blue-500/30'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{alert.title}</div>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              alert.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                              alert.status === 'investigating' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {alert.status}
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm mb-2">{alert.description}</div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Risk: {alert.riskScore}%</span>
                            <span>{alert.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Fraud Alerts</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Active Alerts</h3>
                    <div className="space-y-4">
                      {fraudAlertsData.map((alert) => (
                        <div key={alert.id} className={`p-4 rounded-lg border ${
                          alert.type === 'high' ? 'bg-red-500/20 border-red-500/30' :
                          alert.type === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30' :
                          'bg-blue-500/20 border-blue-500/30'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-white font-semibold">{alert.title}</div>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              alert.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                              alert.status === 'investigating' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {alert.status}
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm mb-3">{alert.description}</div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-400 text-sm">Risk Score: {alert.riskScore}%</span>
                            <span className="text-gray-400 text-sm">{alert.timestamp}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => blockTransaction(alert.id)}
                              disabled={isProcessing}
                              className="px-4 py-2 bg-red-500 text-white rounded text-sm font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                            >
                              {isProcessing ? 'Processing...' : 'Block'}
                            </button>
                            <button
                              onClick={() => analyzeTransaction({ id: alert.id })}
                              disabled={isProcessing}
                              className="px-4 py-2 bg-blue-500 text-white rounded text-sm font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                            >
                              {isProcessing ? 'Analyzing...' : 'Analyze'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Alert Statistics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">High Risk Alerts</span>
                          <span className="text-red-400 font-semibold">12</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-red-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Medium Risk Alerts</span>
                          <span className="text-yellow-400 font-semibold">28</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Low Risk Alerts</span>
                          <span className="text-green-400 font-semibold">156</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'patterns' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Pattern Recognition</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Detected Patterns</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Velocity Pattern</div>
                        <div className="text-gray-300 text-sm mb-2">Multiple transactions in short time period</div>
                        <div className="text-red-400 text-xs">Confidence: 95%</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Geographic Anomaly</div>
                        <div className="text-gray-300 text-sm mb-2">Transaction from unusual location</div>
                        <div className="text-yellow-400 text-xs">Confidence: 87%</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Device Fingerprint</div>
                        <div className="text-gray-300 text-sm mb-2">Suspicious device characteristics</div>
                        <div className="text-red-400 text-xs">Confidence: 92%</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Behavioral Anomaly</div>
                        <div className="text-gray-300 text-sm mb-2">Unusual user behavior pattern</div>
                        <div className="text-blue-400 text-xs">Confidence: 78%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Pattern Analysis</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Pattern Recognition</span>
                          <span className="text-green-400 font-semibold">98.5%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">False Positive Rate</span>
                          <span className="text-blue-400 font-semibold">1.2%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '1.2%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Detection Speed</span>
                          <span className="text-purple-400 font-semibold">2.3ms</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risk-assessment' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Risk Assessment</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Risk Factors</h3>
                    <div className="space-y-4">
                      {riskFactors.map((factor) => (
                        <div key={factor.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{factor.name}</div>
                            <span className="text-red-400 font-semibold">{factor.score}%</span>
                          </div>
                          <div className="text-gray-300 text-sm mb-2">{factor.description}</div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Weight: {factor.weight}%</span>
                            <div className="w-full bg-slate-600 rounded-full h-2 mx-2">
                              <div 
                                className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full"
                                style={{ width: `${factor.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Risk Categories</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">High Risk</span>
                          <span className="text-red-400 font-bold">15 transactions</span>
                        </div>
                        <div className="text-gray-300 text-sm">Immediate action required</div>
                      </div>
                      
                      <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Medium Risk</span>
                          <span className="text-yellow-400 font-bold">42 transactions</span>
                        </div>
                        <div className="text-gray-300 text-sm">Monitor closely</div>
                      </div>
                      
                      <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Low Risk</span>
                          <span className="text-green-400 font-bold">1,247 transactions</span>
                        </div>
                        <div className="text-gray-300 text-sm">Normal processing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'monitoring' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Real-time Monitoring</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Live Transactions</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-semibold">Transaction #12345</div>
                          <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                        </div>
                        <div className="text-gray-300 text-sm mb-2">$2,500 payment to unknown recipient</div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Risk: 85%</span>
                          <span>2 seconds ago</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-semibold">Transaction #12346</div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                        </div>
                        <div className="text-gray-300 text-sm mb-2">Login from new device</div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Risk: 65%</span>
                          <span>5 seconds ago</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-semibold">Transaction #12347</div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="text-gray-300 text-sm mb-2">Regular monthly payment</div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Risk: 15%</span>
                          <span>8 seconds ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Monitoring Metrics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Transactions/Second</span>
                          <span className="text-green-400 font-semibold">1,247</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Detection Rate</span>
                          <span className="text-blue-400 font-semibold">98.5%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Response Time</span>
                          <span className="text-purple-400 font-semibold">2.3ms</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-insights' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">AI Insights</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Fraud Predictions</h3>
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="text-white font-semibold mb-1">{insight.title}</div>
                          <div className="text-gray-300 text-sm mb-2">{insight.description}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-red-400 text-xs">{insight.confidence}% confidence</span>
                            <span className="text-gray-400 text-xs">{insight.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Trend Analysis</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Rising Fraud Patterns</div>
                        <div className="text-gray-300 text-sm mb-2">Identity theft attempts increased by 25%</div>
                        <div className="text-red-400 text-xs">Trend: Upward</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Geographic Hotspots</div>
                        <div className="text-gray-300 text-sm mb-2">High fraud activity in specific regions</div>
                        <div className="text-yellow-400 text-xs">Alert: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Device Fingerprinting</div>
                        <div className="text-gray-300 text-sm mb-2">New suspicious device patterns detected</div>
                        <div className="text-blue-400 text-xs">Monitoring: Enhanced</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Reports</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">1,247</div>
                    <div className="text-gray-400 text-sm">Total Alerts</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">98.5%</div>
                    <div className="text-gray-400 text-sm">Detection Rate</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">2.3ms</div>
                    <div className="text-gray-400 text-sm">Avg Response</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">1.2%</div>
                    <div className="text-gray-400 text-sm">False Positives</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Detection Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Real-time Monitoring</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-blocking</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Pattern Learning</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Encryption</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Access Control</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Audit Logging</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FraudDetectionAI; 