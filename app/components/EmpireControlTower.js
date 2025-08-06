'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, Settings, Users, Database, Shield, Activity, BarChart3, Globe,
  Cpu, Brain, Zap, Eye, Target, Download, Upload, Plus, Trash2, Copy,
  Edit, Layers, Search, Filter, LineChart, PieChart, TrendingUp, Lightbulb,
  Rocket, Star, Sparkles, Server, Network, Memory, HardDrive, Wifi, Signal,
  MapPin, Calendar, UserCheck, UserX, Building, Home, Office, Factory, Store,
  Bank, University, School, GraduationCap, BookOpen, Microscope, Flask, TestTube,
  Atom, Dna, Code, Terminal, Laptop, Desktop, Smartphone, Camera, Video, Music,
  FileText, Image, Archive, Folder, File, Download as DownloadIcon, Upload as UploadIcon,
  Share, Link, ExternalLink, Mail, MessageSquare, Phone, Video as VideoIcon,
  Calendar as CalendarIcon, Clock as ClockIcon, Map, Navigation, Compass,
  Target as TargetIcon, Crosshair, Aim, Scope, Binoculars, Telescope, Satellite,
  Rocket as RocketIcon, Plane, Car, Train, Bus, Ship, Bicycle, Motorcycle, Truck,
  Van, Helicopter, Drone, Submarine, Spaceship, UFO, Robot, Android, Iphone,
  Apple, Windows, Linux, Chrome, Firefox, Safari, Edge, Opera, Brave, Tor, Vpn,
  Shield as ShieldIcon, Lock, Unlock, Key, Fingerprint, Face, Eye as EyeIcon,
  EyeOff, Ear, Mouth, Nose, Hand, ThumbsUp, ThumbsDown, Heart, HeartOff,
  Star as StarIcon, StarOff, Bookmark, BookmarkOff, Flag, FlagOff, Bell, BellOff,
  Volume, VolumeOff, Volume1, Volume2, VolumeX, Mic, MicOff, Headphones,
  HeadphonesOff, Speaker, SpeakerOff, Radio, Tv, Monitor, Smartphone as SmartphoneIcon,
  Tablet, Watch, Headphones as HeadphonesIcon, Printer, Scanner, CreditCard, Wallet,
  Gift, Award, Trophy, Medal, Diamond, Crown as CrownIcon, Star as StarIcon2,
  Sparkles as SparklesIcon, TrendingUp as TrendingUpIcon, Crown as CrownIcon2,
  CheckCircle
} from 'lucide-react';

const EmpireControlTower = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [systemStatus, setSystemStatus] = useState({});
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [security, setSecurity] = useState({});
  const [aiInsights, setAiInsights] = useState([]);

  const tabs = [
    { id: 'dashboard', name: 'Empire Dashboard', icon: Crown },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'system', name: 'System Control', icon: Settings },
    { id: 'security', name: 'Security Center', icon: Shield },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'ai-control', name: 'AI Control', icon: Brain },
    { id: 'monitoring', name: 'Monitoring', icon: Activity },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const systemModules = [
    {
      id: 'global-trend-analyzer',
      name: 'Global Trend Analyzer',
      status: 'active',
      performance: 98,
      users: 1247,
      lastUpdate: '2 minutes ago'
    },
    {
      id: 'legal-ai',
      name: 'Legal AI System',
      status: 'active',
      performance: 95,
      users: 892,
      lastUpdate: '1 minute ago'
    },
    {
      id: 'api-sync-study',
      name: 'API Sync & Study AI',
      status: 'active',
      performance: 97,
      users: 1567,
      lastUpdate: '30 seconds ago'
    },
    {
      id: 'fraud-detection',
      name: 'Fraud Detection AI',
      status: 'active',
      performance: 99,
      users: 2341,
      lastUpdate: '1 minute ago'
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      status: 'active',
      performance: 94,
      users: 3456,
      lastUpdate: '3 minutes ago'
    },
    {
      id: 'financial-tools',
      name: 'Financial Tools',
      status: 'active',
      performance: 96,
      users: 1892,
      lastUpdate: '2 minutes ago'
    }
  ];

  const userRoles = [
    {
      id: 'admin',
      name: 'Administrators',
      count: 12,
      permissions: ['Full Access', 'User Management', 'System Control'],
      color: 'from-red-400 to-pink-400'
    },
    {
      id: 'moderator',
      name: 'Moderators',
      count: 45,
      permissions: ['Content Moderation', 'User Support', 'Analytics'],
      color: 'from-blue-400 to-purple-400'
    },
    {
      id: 'analyst',
      name: 'Analysts',
      count: 89,
      permissions: ['Data Analysis', 'Reports', 'Insights'],
      color: 'from-green-400 to-teal-400'
    },
    {
      id: 'user',
      name: 'Regular Users',
      count: 12456,
      permissions: ['Basic Access', 'Tool Usage', 'Support'],
      color: 'from-gray-400 to-slate-400'
    }
  ];

  const securityAlerts = [
    {
      id: 'alert-1',
      type: 'high',
      title: 'Suspicious Login Attempt',
      description: 'Multiple failed login attempts from IP 192.168.1.100',
      timestamp: '2 minutes ago',
      status: 'investigating'
    },
    {
      id: 'alert-2',
      type: 'medium',
      title: 'API Rate Limit Exceeded',
      description: 'User ID 12345 exceeded API rate limits',
      timestamp: '5 minutes ago',
      status: 'resolved'
    },
    {
      id: 'alert-3',
      type: 'low',
      title: 'System Update Available',
      description: 'New security patch available for deployment',
      timestamp: '10 minutes ago',
      status: 'pending'
    }
  ];

  useEffect(() => {
    initializeEmpireControlTower();
  }, []);

  const initializeEmpireControlTower = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/empire-control/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modules: systemModules,
          roles: userRoles,
          alerts: securityAlerts
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSystemStatus(data.systemStatus || {});
        setUsers(data.users || []);
        setAnalytics(data.analytics || {});
        setSecurity(data.security || {});
        setAiInsights(data.aiInsights || []);
      }
      
    } catch (error) {
      console.error('Empire Control Tower initialization error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const controlSystem = async (moduleId, action) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/empire-control/system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, action })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSystemStatus(prev => ({
          ...prev,
          [moduleId]: data.status
        }));
      }
      
    } catch (error) {
      console.error('System control error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const manageUser = async (userId, action) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/empire-control/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status: data.status } : user
        ));
      }
      
    } catch (error) {
      console.error('User management error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Empire Control Tower
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            World-class admin panel for comprehensive empire management and control
          </p>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">System Status</h3>
                <p className="text-gray-300">All systems operational</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">13,456</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">6</div>
                  <div className="text-gray-400 text-sm">Active Modules</div>
                </div>
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
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
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
                <h2 className="text-3xl font-bold text-white mb-6">Empire Dashboard</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">System Modules</h3>
                    <div className="space-y-4">
                      {systemModules.map((module) => (
                        <div key={module.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{module.name}</div>
                            <div className={`w-3 h-3 rounded-full ${
                              module.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                            }`}></div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Performance: {module.performance}%</span>
                            <span className="text-gray-400">{module.users} users</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                            <span>Last update: {module.lastUpdate}</span>
                            <button
                              onClick={() => controlSystem(module.id, 'restart')}
                              disabled={isProcessing}
                              className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded text-xs font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                            >
                              {isProcessing ? 'Processing...' : 'Restart'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">User Roles</h3>
                    <div className="space-y-4">
                      {userRoles.map((role) => (
                        <div key={role.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{role.name}</div>
                            <span className="text-gray-400">{role.count} users</span>
                          </div>
                          <div className="space-y-1">
                            {role.permissions.map((permission, index) => (
                              <div key={index} className="text-gray-300 text-sm">• {permission}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">User Management</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">User Statistics</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-600/50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-400">13,456</div>
                          <div className="text-gray-400 text-sm">Total Users</div>
                        </div>
                        <div className="p-4 bg-slate-600/50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-400">1,234</div>
                          <div className="text-gray-400 text-sm">Active Today</div>
                        </div>
                        <div className="p-4 bg-slate-600/50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-400">567</div>
                          <div className="text-gray-400 text-sm">New This Week</div>
                        </div>
                        <div className="p-4 bg-slate-600/50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-yellow-400">89</div>
                          <div className="text-gray-400 text-sm">Premium Users</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Users</h3>
                    <div className="space-y-4">
                      {users.slice(0, 5).map((user, index) => (
                        <div key={index} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{user.name}</div>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {user.status}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{user.role}</span>
                            <span className="text-gray-400">{user.lastLogin}</span>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => manageUser(user.id, 'suspend')}
                              disabled={isProcessing}
                              className="px-3 py-1 bg-red-500 text-white rounded text-xs font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                            >
                              Suspend
                            </button>
                            <button
                              onClick={() => manageUser(user.id, 'promote')}
                              disabled={isProcessing}
                              className="px-3 py-1 bg-green-500 text-white rounded text-xs font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                            >
                              Promote
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">System Control</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {systemModules.map((module) => (
                    <div key={module.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{module.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          module.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Performance</span>
                          <span className="text-white font-semibold">{module.performance}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Users</span>
                          <span className="text-white font-semibold">{module.users}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Last Update</span>
                          <span className="text-gray-400 text-sm">{module.lastUpdate}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button
                          onClick={() => controlSystem(module.id, 'restart')}
                          disabled={isProcessing}
                          className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                        >
                          {isProcessing ? 'Processing...' : 'Restart Module'}
                        </button>
                        <button
                          onClick={() => controlSystem(module.id, 'update')}
                          disabled={isProcessing}
                          className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                        >
                          {isProcessing ? 'Processing...' : 'Update Module'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Security Center</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Security Alerts</h3>
                    <div className="space-y-4">
                      {securityAlerts.map((alert) => (
                        <div key={alert.id} className={`p-3 rounded-lg border ${
                          alert.type === 'high' ? 'bg-red-500/20 border-red-500/30' :
                          alert.type === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30' :
                          'bg-blue-500/20 border-blue-500/30'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{alert.title}</div>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              alert.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                              alert.status === 'investigating' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {alert.status}
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm mb-2">{alert.description}</div>
                          <div className="text-gray-400 text-xs">{alert.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Security Metrics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Threat Detection</span>
                          <span className="text-green-400 font-semibold">99.9%</span>
                        </div>
                        <div className="text-gray-300 text-sm">Successfully blocked threats</div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Data Encryption</span>
                          <span className="text-blue-400 font-semibold">100%</span>
                        </div>
                        <div className="text-gray-300 text-sm">All data encrypted at rest</div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Access Control</span>
                          <span className="text-purple-400 font-semibold">Active</span>
                        </div>
                        <div className="text-gray-300 text-sm">Multi-factor authentication enabled</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">2.3M</div>
                    <div className="text-gray-400 text-sm">API Calls/Day</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">156</div>
                    <div className="text-gray-400 text-sm">Active APIs</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">94%</div>
                    <div className="text-gray-400 text-sm">Success Rate</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">45</div>
                    <div className="text-gray-400 text-sm">Integrations</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-control' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">AI Control</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Models</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">GPT-4 Integration</div>
                        <div className="text-gray-300 text-sm mb-2">Advanced language processing</div>
                        <div className="text-green-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Custom ML Models</div>
                        <div className="text-gray-300 text-sm mb-2">Specialized AI for specific tasks</div>
                        <div className="text-green-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Neural Networks</div>
                        <div className="text-gray-300 text-sm mb-2">Deep learning for pattern recognition</div>
                        <div className="text-green-400 text-xs">Status: Active</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
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
                </div>
              </div>
            )}

            {activeTab === 'monitoring' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">System Monitoring</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">CPU Usage</span>
                          <span className="text-green-400 font-semibold">45%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Memory Usage</span>
                          <span className="text-blue-400 font-semibold">67%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Network Traffic</span>
                          <span className="text-purple-400 font-semibold">23%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '23%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">Database</span>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">API Gateway</span>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">Load Balancer</span>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">Cache Server</span>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                      </div>
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
                    <h3 className="text-lg font-semibold text-white mb-4">System Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Updates</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Backup System</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Monitoring</span>
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
                        <span className="text-gray-300">Firewall</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
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

export default EmpireControlTower; 