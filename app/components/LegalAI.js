'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale, FileText, Shield, AlertTriangle, CheckCircle, Clock, Search,
  BookOpen, Gavel, Balance, Law, Eye, Edit, Download, Upload, Plus,
  Trash2, Copy, Share, Lock, Unlock, Key, Fingerprint, Database,
  Server, Network, Cpu, Memory, HardDrive, Wifi, Signal, MapPin,
  Calendar, Users, UserCheck, UserX, Building, Home, Office, Factory,
  Store, Bank, University, School, GraduationCap, Microscope, Flask,
  TestTube, Atom, Dna, Code, Terminal, Laptop, Desktop, Smartphone,
  Camera, Video, Music, Archive, Folder, File, Download as DownloadIcon,
  Upload as UploadIcon, Share as ShareIcon, Link, ExternalLink, Mail,
  MessageSquare, Phone, Video as VideoIcon, Calendar as CalendarIcon,
  Clock as ClockIcon, Map, Navigation, Compass, Target, Crosshair,
  Aim, Scope, Binoculars, Telescope, Satellite, Rocket, Plane, Car,
  Train, Bus, Ship, Bicycle, Motorcycle, Truck, Van, Helicopter,
  Drone, Submarine, Spaceship, UFO, Robot, Android, Iphone, Apple,
  Windows, Linux, Chrome, Firefox, Safari, Edge, Opera, Brave, Tor,
  Vpn, Shield as ShieldIcon, Lock as LockIcon, Unlock as UnlockIcon,
  Key as KeyIcon, Fingerprint as FingerprintIcon, Face, Eye as EyeIcon,
  EyeOff, Ear, Mouth, Nose, Hand, ThumbsUp, ThumbsDown, Heart,
  HeartOff, Star, StarOff, Bookmark, BookmarkOff, Flag, FlagOff,
  Bell, BellOff, Volume, VolumeOff, Volume1, Volume2, VolumeX,
  Mic, MicOff, Headphones, HeadphonesOff, Speaker, SpeakerOff,
  Radio, Tv, Monitor, Smartphone as SmartphoneIcon, Tablet, Watch,
  Headphones as HeadphonesIcon, Printer, Scanner, CreditCard, Wallet,
  Gift, Award, Trophy, Medal, Diamond, Crown, Sparkles, Database as DatabaseIcon,
  Server as ServerIcon, Network as NetworkIcon, Cpu as CpuIcon, Memory as MemoryIcon,
  HardDrive as HardDriveIcon, Wifi as WifiIcon, Signal as SignalIcon
} from 'lucide-react';

const LegalAI = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [legalDocuments, setLegalDocuments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [complianceIssues, setComplianceIssues] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [riskLevel, setRiskLevel] = useState('low');

  const tabs = [
    { id: 'dashboard', name: 'Legal Dashboard', icon: Scale },
    { id: 'contracts', name: 'Contract Analysis', icon: FileText },
    { id: 'compliance', name: 'Compliance Monitor', icon: Shield },
    { id: 'risk-assessment', name: 'Risk Assessment', icon: AlertTriangle },
    { id: 'legal-research', name: 'Legal Research', icon: BookOpen },
    { id: 'ai-insights', name: 'AI Insights', icon: Cpu },
    { id: 'documents', name: 'Document Manager', icon: Folder },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const legalCategories = [
    {
      id: 'contract-law',
      name: 'Contract Law',
      icon: FileText,
      color: 'from-blue-400 to-purple-400',
      documents: 156,
      riskLevel: 'medium'
    },
    {
      id: 'corporate-law',
      name: 'Corporate Law',
      icon: Building,
      color: 'from-green-400 to-teal-400',
      documents: 89,
      riskLevel: 'low'
    },
    {
      id: 'intellectual-property',
      name: 'Intellectual Property',
      icon: Lock,
      color: 'from-yellow-400 to-orange-400',
      documents: 234,
      riskLevel: 'high'
    },
    {
      id: 'employment-law',
      name: 'Employment Law',
      icon: Users,
      color: 'from-red-400 to-pink-400',
      documents: 67,
      riskLevel: 'medium'
    },
    {
      id: 'tax-law',
      name: 'Tax Law',
      icon: DollarSign,
      color: 'from-emerald-400 to-green-400',
      documents: 123,
      riskLevel: 'high'
    },
    {
      id: 'regulatory-compliance',
      name: 'Regulatory Compliance',
      icon: Shield,
      color: 'from-indigo-400 to-purple-400',
      documents: 445,
      riskLevel: 'high'
    }
  ];

  const complianceFrameworks = [
    {
      id: 'gdpr',
      name: 'GDPR Compliance',
      status: 'compliant',
      lastAudit: '2024-01-15',
      nextAudit: '2024-07-15',
      score: 95
    },
    {
      id: 'sox',
      name: 'SOX Compliance',
      status: 'compliant',
      lastAudit: '2024-02-01',
      nextAudit: '2024-08-01',
      score: 92
    },
    {
      id: 'hipaa',
      name: 'HIPAA Compliance',
      status: 'compliant',
      lastAudit: '2024-01-20',
      nextAudit: '2024-07-20',
      score: 98
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      status: 'compliant',
      lastAudit: '2024-02-10',
      nextAudit: '2024-08-10',
      score: 94
    },
    {
      id: 'pci-dss',
      name: 'PCI DSS',
      status: 'review',
      lastAudit: '2024-01-30',
      nextAudit: '2024-07-30',
      score: 87
    }
  ];

  useEffect(() => {
    initializeLegalAI();
  }, []);

  const initializeLegalAI = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/legal-ai/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: legalCategories,
          frameworks: complianceFrameworks
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLegalDocuments(data.documents || []);
        setContracts(data.contracts || []);
        setComplianceIssues(data.complianceIssues || []);
        setAiInsights(data.aiInsights || []);
      }
      
    } catch (error) {
      console.error('Legal AI initialization error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeDocument = async (document) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/legal-ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document })
      });
      
      const analysis = await response.json();
      
      if (analysis.success) {
        setAiInsights(prev => [...prev, analysis.insight]);
      }
      
    } catch (error) {
      console.error('Document analysis error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateContract = async (type, terms) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/legal-ai/generate-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, terms })
      });
      
      const contract = await response.json();
      
      if (contract.success) {
        setContracts(prev => [...prev, contract.data]);
      }
      
    } catch (error) {
      console.error('Contract generation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Legal AI System
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            World-class AI-powered legal analysis, contract review, and compliance monitoring
          </p>
        </motion.div>

        {/* Risk Level Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Overall Risk Level</h3>
                <p className="text-gray-300">Based on comprehensive legal analysis</p>
              </div>
              <div className={`px-6 py-3 rounded-xl font-bold text-white ${
                riskLevel === 'low' ? 'bg-green-500' :
                riskLevel === 'medium' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}>
                {riskLevel.toUpperCase()} RISK
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
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg'
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
                <h2 className="text-3xl font-bold text-white mb-6">Legal Dashboard</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Legal Categories</h3>
                    <div className="space-y-4">
                      {legalCategories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center">
                            <category.icon className="w-6 h-6 text-blue-400 mr-3" />
                            <div>
                              <div className="text-white font-semibold">{category.name}</div>
                              <div className="text-gray-400 text-sm">{category.documents} documents</div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            category.riskLevel === 'low' ? 'bg-green-500/20 text-green-400' :
                            category.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {category.riskLevel} risk
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Compliance Status</h3>
                    <div className="space-y-4">
                      {complianceFrameworks.map((framework) => (
                        <div key={framework.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{framework.name}</div>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              framework.status === 'compliant' ? 'bg-green-500/20 text-green-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {framework.status}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Score: {framework.score}%</span>
                            <span className="text-gray-400">Next audit: {framework.nextAudit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Contract Analysis</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Contract Templates</h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => generateContract('employment', {})}
                        disabled={isProcessing}
                        className="w-full p-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        Employment Contract
                      </button>
                      <button
                        onClick={() => generateContract('nda', {})}
                        disabled={isProcessing}
                        className="w-full p-4 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        Non-Disclosure Agreement
                      </button>
                      <button
                        onClick={() => generateContract('service', {})}
                        disabled={isProcessing}
                        className="w-full p-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        Service Agreement
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Contracts</h3>
                    <div className="space-y-4">
                      {contracts.slice(0, 5).map((contract, index) => (
                        <div key={index} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="text-white font-semibold mb-1">{contract.title}</div>
                          <div className="text-gray-300 text-sm mb-2">{contract.description}</div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{contract.type}</span>
                            <span>{contract.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Compliance Monitor</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {complianceFrameworks.map((framework) => (
                    <div key={framework.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{framework.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          framework.status === 'compliant' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Compliance Score</span>
                          <span className="text-white font-semibold">{framework.score}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Last Audit</span>
                          <span className="text-gray-400 text-sm">{framework.lastAudit}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Next Audit</span>
                          <span className="text-gray-400 text-sm">{framework.nextAudit}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                            style={{ width: `${framework.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'risk-assessment' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Risk Assessment</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Risk Categories</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">High Risk</span>
                          <span className="text-red-400 font-bold">12 items</span>
                        </div>
                        <div className="text-gray-300 text-sm">Requires immediate attention</div>
                      </div>
                      
                      <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Medium Risk</span>
                          <span className="text-yellow-400 font-bold">28 items</span>
                        </div>
                        <div className="text-gray-300 text-sm">Monitor closely</div>
                      </div>
                      
                      <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Low Risk</span>
                          <span className="text-green-400 font-bold">156 items</span>
                        </div>
                        <div className="text-gray-300 text-sm">Under control</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Risk Mitigation</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Data Privacy Compliance</div>
                        <div className="text-gray-300 text-sm mb-2">Implement GDPR-compliant data handling</div>
                        <div className="text-green-400 text-xs">Priority: High</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Contract Review Process</div>
                        <div className="text-gray-300 text-sm mb-2">Automate contract analysis and approval</div>
                        <div className="text-yellow-400 text-xs">Priority: Medium</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">IP Protection</div>
                        <div className="text-gray-300 text-sm mb-2">Strengthen intellectual property safeguards</div>
                        <div className="text-red-400 text-xs">Priority: High</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'legal-research' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Legal Research</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Case Law Database</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Supreme Court Cases</div>
                        <div className="text-gray-300 text-sm">Latest rulings and precedents</div>
                        <div className="text-blue-400 text-xs mt-2">Updated: 2 hours ago</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Federal Regulations</div>
                        <div className="text-gray-300 text-sm">Current regulatory framework</div>
                        <div className="text-blue-400 text-xs mt-2">Updated: 1 day ago</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">International Law</div>
                        <div className="text-gray-300 text-sm">Global legal precedents</div>
                        <div className="text-blue-400 text-xs mt-2">Updated: 3 days ago</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Research Tools</h3>
                    <div className="space-y-4">
                      <button className="w-full p-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        Case Law Search
                      </button>
                      <button className="w-full p-4 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        Statute Analysis
                      </button>
                      <button className="w-full p-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        Precedent Research
                      </button>
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
                    <h3 className="text-lg font-semibold text-white mb-4">Legal Predictions</h3>
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="text-white font-semibold mb-1">{insight.title}</div>
                          <div className="text-gray-300 text-sm mb-2">{insight.description}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-400 text-xs">{insight.confidence}% confidence</span>
                            <span className="text-gray-400 text-xs">{insight.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Risk Alerts</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                        <div className="text-white font-semibold mb-1">High Priority Alert</div>
                        <div className="text-gray-300 text-sm">Contract expiration in 7 days</div>
                        <div className="text-red-400 text-xs mt-2">Action required</div>
                      </div>
                      
                      <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                        <div className="text-white font-semibold mb-1">Medium Priority Alert</div>
                        <div className="text-gray-300 text-sm">Compliance audit due in 30 days</div>
                        <div className="text-yellow-400 text-xs mt-2">Monitor closely</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Document Manager</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Document Categories</h3>
                    <div className="space-y-4">
                      {legalCategories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center">
                            <category.icon className="w-6 h-6 text-blue-400 mr-3" />
                            <span className="text-white font-semibold">{category.name}</span>
                          </div>
                          <span className="text-gray-400">{category.documents} docs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Documents</h3>
                    <div className="space-y-4">
                      {legalDocuments.slice(0, 5).map((doc, index) => (
                        <div key={index} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="text-white font-semibold mb-1">{doc.title}</div>
                          <div className="text-gray-300 text-sm mb-2">{doc.description}</div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{doc.category}</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Configuration</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Analysis</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Risk Alerts</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Compliance Monitoring</span>
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
                        <span className="text-gray-300">Document Encryption</span>
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

export default LegalAI; 