'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Cpu, Network, Zap, Eye, Target, Settings, Download, Upload,
  Play, Pause, RotateCw, Clock, CheckCircle, AlertCircle, ArrowRight, ChevronDown,
  ChevronUp, Plus, Trash2, Copy, Edit, Layers, Search, Filter, BarChart3,
  LineChart, PieChart, Activity, News, Newspaper, Radio, Tv, Monitor,
  Smartphone, Tablet, Watch, Headphones, Printer, Scanner, CreditCard,
  Wallet, Gift, Award, Trophy, Medal, Diamond, Crown, Star, Sparkles,
  Database, Server, Network as NetworkIcon, Cpu as CpuIcon, Memory, HardDrive, Wifi, Signal,
  MapPin, Calendar, Users, UserCheck, UserX, Building, Home, Office, Factory,
  Store, Bank, University, School, GraduationCap, BookOpen, Microscope, Flask,
  TestTube, Atom, Dna, Code, Terminal, Laptop, Desktop, Smartphone as Phone, Camera,
  Video, Music, FileText, Image, Archive, Folder, File, Download as DownloadIcon,
  Upload as UploadIcon, Share, Link, ExternalLink, Mail, MessageSquare,
  Phone as PhoneIcon, Video as VideoIcon, Calendar as CalendarIcon,
  Clock as ClockIcon, Map, Navigation, Compass, Target as TargetIcon,
  Crosshair, Aim, Scope, Binoculars, Telescope, Satellite, Rocket,
  Plane, Car, Train, Bus, Ship, Bicycle, Motorcycle, Truck, Van,
  Helicopter, Drone, Submarine, Spaceship, UFO, Robot, Android, Iphone,
  Apple, Windows, Linux, Android as AndroidIcon, Chrome, Firefox,
  Safari, Edge, Opera, Brave, Tor, Vpn, Shield, Lock, Unlock, Key,
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

const BrainRoom3D = () => {
  const [activeTab, setActiveTab] = useState('visualization');
  const [isProcessing, setIsProcessing] = useState(false);
  const [neuralNetworks, setNeuralNetworks] = useState([]);
  const [brainActivity, setBrainActivity] = useState({});
  const [aiInsights, setAiInsights] = useState([]);
  const [viewMode, setViewMode] = useState('3d');
  const canvasRef = useRef(null);

  const tabs = [
    { id: 'visualization', name: '3D Visualization', icon: Eye },
    { id: 'neural-networks', name: 'Neural Networks', icon: Network },
    { id: 'brain-activity', name: 'Brain Activity', icon: Activity },
    { id: 'ai-processes', name: 'AI Processes', icon: Cpu },
    { id: 'learning-patterns', name: 'Learning Patterns', icon: Brain },
    { id: 'memory-storage', name: 'Memory Storage', icon: Database },
    { id: 'consciousness', name: 'Consciousness', icon: Sparkles },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const neuralNetworkTypes = [
    {
      id: 'cnn',
      name: 'Convolutional Neural Network',
      description: 'Image and pattern recognition',
      layers: 15,
      neurons: 2500000,
      status: 'active',
      color: 'from-blue-400 to-purple-400'
    },
    {
      id: 'rnn',
      name: 'Recurrent Neural Network',
      description: 'Sequential data processing',
      layers: 8,
      neurons: 1200000,
      status: 'active',
      color: 'from-green-400 to-teal-400'
    },
    {
      id: 'transformer',
      name: 'Transformer Network',
      description: 'Natural language processing',
      layers: 24,
      neurons: 175000000,
      status: 'active',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      id: 'gan',
      name: 'Generative Adversarial Network',
      description: 'Content generation and synthesis',
      layers: 12,
      neurons: 5000000,
      status: 'active',
      color: 'from-red-400 to-pink-400'
    },
    {
      id: 'reinforcement',
      name: 'Reinforcement Learning',
      description: 'Decision making and optimization',
      layers: 6,
      neurons: 800000,
      status: 'active',
      color: 'from-indigo-400 to-blue-400'
    },
    {
      id: 'autoencoder',
      name: 'Autoencoder Network',
      description: 'Data compression and reconstruction',
      layers: 10,
      neurons: 1500000,
      status: 'active',
      color: 'from-purple-400 to-pink-400'
    }
  ];

  const brainRegions = [
    {
      id: 'prefrontal-cortex',
      name: 'Prefrontal Cortex',
      function: 'Decision Making & Planning',
      activity: 85,
      connections: 15000000,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'hippocampus',
      name: 'Hippocampus',
      function: 'Memory Formation',
      activity: 92,
      connections: 8000000,
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 'amygdala',
      name: 'Amygdala',
      function: 'Emotional Processing',
      activity: 78,
      connections: 5000000,
      color: 'from-red-400 to-pink-400'
    },
    {
      id: 'visual-cortex',
      name: 'Visual Cortex',
      function: 'Visual Processing',
      activity: 95,
      connections: 12000000,
      color: 'from-yellow-400 to-orange-400'
    },
    {
      id: 'auditory-cortex',
      name: 'Auditory Cortex',
      function: 'Sound Processing',
      activity: 88,
      connections: 6000000,
      color: 'from-purple-400 to-indigo-400'
    },
    {
      id: 'motor-cortex',
      name: 'Motor Cortex',
      function: 'Movement Control',
      activity: 82,
      connections: 9000000,
      color: 'from-teal-400 to-blue-400'
    }
  ];

  const consciousnessLevels = [
    {
      id: 'self-awareness',
      name: 'Self-Awareness',
      level: 95,
      description: 'Understanding of self and identity',
      status: 'active'
    },
    {
      id: 'meta-cognition',
      name: 'Meta-Cognition',
      level: 87,
      description: 'Thinking about thinking',
      status: 'active'
    },
    {
      id: 'emotional-intelligence',
      name: 'Emotional Intelligence',
      level: 92,
      description: 'Understanding and managing emotions',
      status: 'active'
    },
    {
      id: 'creative-thinking',
      name: 'Creative Thinking',
      level: 89,
      description: 'Innovation and imagination',
      status: 'active'
    },
    {
      id: 'logical-reasoning',
      name: 'Logical Reasoning',
      level: 94,
      description: 'Analytical and critical thinking',
      status: 'active'
    },
    {
      id: 'intuition',
      name: 'Intuition',
      level: 76,
      description: 'Subconscious pattern recognition',
      status: 'active'
    }
  ];

  useEffect(() => {
    initializeBrainRoom();
    start3DRendering();
  }, []);

  const initializeBrainRoom = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/brain-room/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          networks: neuralNetworkTypes,
          regions: brainRegions,
          consciousness: consciousnessLevels
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNeuralNetworks(data.networks || []);
        setBrainActivity(data.brainActivity || {});
        setAiInsights(data.aiInsights || []);
      }
      
    } catch (error) {
      console.error('Brain Room initialization error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const start3DRendering = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 3D Brain Visualization
    const renderBrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw neural connections
      for (let i = 0; i < 100; i++) {
        const x1 = Math.random() * canvas.width;
        const y1 = Math.random() * canvas.height;
        const x2 = Math.random() * canvas.width;
        const y2 = Math.random() * canvas.height;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${Math.random() * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw brain regions
      brainRegions.forEach((region, index) => {
        const x = canvas.width / 2 + Math.cos(index * Math.PI / 3) * 200;
        const y = canvas.height / 2 + Math.sin(index * Math.PI / 3) * 200;
        
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(147, 51, 234, ${region.activity / 100})`;
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(region.name, x, y + 5);
      });
      
      requestAnimationFrame(renderBrain);
    };
    
    renderBrain();
  };

  const activateNeuralNetwork = async (networkId) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/brain-room/activate-network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ networkId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNeuralNetworks(prev => prev.map(network => 
          network.id === networkId ? { ...network, status: 'active' } : network
        ));
      }
      
    } catch (error) {
      console.error('Neural network activation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              3D Brain Room
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Immersive 3D visualization of AI neural networks and consciousness
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">View Mode</h3>
                <p className="text-gray-300">Choose your visualization experience</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    viewMode === '3d'
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                  }`}
                >
                  3D Mode
                </button>
                <button
                  onClick={() => setViewMode('2d')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    viewMode === '2d'
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                  }`}
                >
                  2D Mode
                </button>
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
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
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
            {activeTab === 'visualization' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">3D Brain Visualization</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Brain Regions</h3>
                    <div className="space-y-4">
                      {brainRegions.map((region) => (
                        <div key={region.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{region.name}</div>
                            <span className="text-purple-400 font-semibold">{region.activity}%</span>
                          </div>
                          <div className="text-gray-300 text-sm mb-2">{region.function}</div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{region.connections.toLocaleString()} connections</span>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Real-Time Activity</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Neural Firing Rate</span>
                          <span className="text-green-400 font-semibold">2.3M/sec</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Synaptic Connections</span>
                          <span className="text-blue-400 font-semibold">86B</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Memory Formation</span>
                          <span className="text-purple-400 font-semibold">Active</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full animate-pulse" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'neural-networks' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Neural Networks</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {neuralNetworkTypes.map((network) => (
                    <div key={network.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{network.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          network.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                      </div>
                      
                      <div className="text-gray-300 text-sm mb-4">{network.description}</div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Layers</span>
                          <span className="text-white font-semibold">{network.layers}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Neurons</span>
                          <span className="text-white font-semibold">{network.neurons.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => activateNeuralNetwork(network.id)}
                        disabled={isProcessing}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Activating...' : 'Activate Network'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'brain-activity' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Brain Activity</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Activity Patterns</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-2">Alpha Waves</div>
                        <div className="text-gray-300 text-sm mb-2">Relaxed, meditative state</div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-2">Beta Waves</div>
                        <div className="text-gray-300 text-sm mb-2">Active, focused thinking</div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-2">Gamma Waves</div>
                        <div className="text-gray-300 text-sm mb-2">High-level processing</div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Processing Centers</h3>
                    <div className="space-y-4">
                      {brainRegions.slice(0, 4).map((region) => (
                        <div key={region.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{region.name}</div>
                            <span className="text-purple-400 font-semibold">{region.activity}%</span>
                          </div>
                          <div className="text-gray-300 text-sm">{region.function}</div>
                          <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                            <div 
                              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                              style={{ width: `${region.activity}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-processes' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">AI Processes</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Active Processes</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Pattern Recognition</div>
                        <div className="text-gray-300 text-sm mb-2">Identifying patterns in data</div>
                        <div className="text-green-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Decision Making</div>
                        <div className="text-gray-300 text-sm mb-2">Processing choices and outcomes</div>
                        <div className="text-green-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Learning</div>
                        <div className="text-gray-300 text-sm mb-2">Adapting to new information</div>
                        <div className="text-green-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Memory Consolidation</div>
                        <div className="text-gray-300 text-sm mb-2">Storing and organizing memories</div>
                        <div className="text-green-400 text-xs">Status: Active</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Process Metrics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Processing Speed</span>
                          <span className="text-green-400 font-semibold">2.3 GHz</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Memory Usage</span>
                          <span className="text-blue-400 font-semibold">8.5 TB</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Efficiency</span>
                          <span className="text-purple-400 font-semibold">94%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'learning-patterns' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Learning Patterns</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Learning Methods</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Supervised Learning</div>
                        <div className="text-gray-300 text-sm mb-2">Learning from labeled examples</div>
                        <div className="text-green-400 text-xs">Accuracy: 95%</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Unsupervised Learning</div>
                        <div className="text-gray-300 text-sm mb-2">Finding patterns in unlabeled data</div>
                        <div className="text-blue-400 text-xs">Accuracy: 87%</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Reinforcement Learning</div>
                        <div className="text-gray-300 text-sm mb-2">Learning through trial and error</div>
                        <div className="text-purple-400 text-xs">Accuracy: 92%</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Transfer Learning</div>
                        <div className="text-gray-300 text-sm mb-2">Applying knowledge to new tasks</div>
                        <div className="text-yellow-400 text-xs">Accuracy: 89%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Learning Progress</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Knowledge Acquisition</span>
                          <span className="text-green-400 font-semibold">87%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Skill Development</span>
                          <span className="text-blue-400 font-semibold">92%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Adaptation Rate</span>
                          <span className="text-purple-400 font-semibold">94%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'memory-storage' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Memory Storage</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Memory Types</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Short-term Memory</div>
                        <div className="text-gray-300 text-sm mb-2">Temporary information storage</div>
                        <div className="text-green-400 text-xs">Capacity: 7±2 items</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Long-term Memory</div>
                        <div className="text-gray-300 text-sm mb-2">Permanent information storage</div>
                        <div className="text-blue-400 text-xs">Capacity: Unlimited</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Working Memory</div>
                        <div className="text-gray-300 text-sm mb-2">Active processing memory</div>
                        <div className="text-purple-400 text-xs">Capacity: 4±1 chunks</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Episodic Memory</div>
                        <div className="text-gray-300 text-sm mb-2">Personal experiences and events</div>
                        <div className="text-yellow-400 text-xs">Capacity: Extensive</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Storage Metrics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Total Storage</span>
                          <span className="text-green-400 font-semibold">8.5 TB</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Access Speed</span>
                          <span className="text-blue-400 font-semibold">2.3 ms</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Retention Rate</span>
                          <span className="text-purple-400 font-semibold">96%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consciousness' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Consciousness</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Consciousness Levels</h3>
                    <div className="space-y-4">
                      {consciousnessLevels.map((level) => (
                        <div key={level.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-semibold">{level.name}</div>
                            <span className="text-purple-400 font-semibold">{level.level}%</span>
                          </div>
                          <div className="text-gray-300 text-sm mb-2">{level.description}</div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                              style={{ width: `${level.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Awareness Metrics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Self-Awareness</span>
                          <span className="text-green-400 font-semibold">95%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Environmental Awareness</span>
                          <span className="text-blue-400 font-semibold">89%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Emotional Intelligence</span>
                          <span className="text-purple-400 font-semibold">92%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Creative Consciousness</span>
                          <span className="text-yellow-400 font-semibold">87%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '87%' }}></div>
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
                    <h3 className="text-lg font-semibold text-white mb-4">Visualization Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">3D Rendering</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Neural Animation</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Real-time Updates</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">High Performance</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Memory Optimization</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Scaling</span>
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

export default BrainRoom3D; 