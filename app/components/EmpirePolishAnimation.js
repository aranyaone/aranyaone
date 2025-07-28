'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, Sparkles, Star, Diamond, Trophy, Award, Medal, Gift,
  Zap, Eye, Target, Settings, Download, Upload, Play, Pause,
  RotateCw, Clock, CheckCircle, AlertCircle, ArrowRight, ChevronDown,
  ChevronUp, Plus, Trash2, Copy, Edit, Layers, Search, Filter,
  BarChart3, LineChart, PieChart, Activity, News, Newspaper, Radio,
  Tv, Monitor, Smartphone, Tablet, Watch, Headphones, Printer,
  Scanner, CreditCard, Wallet, Gift as GiftIcon, Award as AwardIcon,
  Trophy as TrophyIcon, Medal as MedalIcon, Diamond as DiamondIcon,
  Crown as CrownIcon, Star as StarIcon, Sparkles as SparklesIcon,
  TrendingUp, Lightbulb, Rocket, Database, Server, Network, Cpu,
  Memory, HardDrive, Wifi, Signal, MapPin, Calendar, Users, UserCheck,
  UserX, Building, Home, Office, Factory, Store, Bank, University,
  School, GraduationCap, BookOpen, Microscope, Flask, TestTube, Atom,
  Dna, Code, Terminal, Laptop, Desktop, Smartphone as Phone, Camera,
  Video, Music, FileText, Image, Archive, Folder, File, Download as DownloadIcon,
  Upload as UploadIcon, Share, Link, ExternalLink, Mail, MessageSquare,
  Phone as PhoneIcon, Video as VideoIcon, Calendar as CalendarIcon,
  Clock as ClockIcon, Map, Navigation, Compass, Target as TargetIcon,
  Crosshair, Aim, Scope, Binoculars, Telescope, Satellite, Rocket as RocketIcon,
  Plane, Car, Train, Bus, Ship, Bicycle, Motorcycle, Truck, Van,
  Helicopter, Drone, Submarine, Spaceship, UFO, Robot, Android, Iphone,
  Apple, Windows, Linux, Chrome, Firefox, Safari, Edge, Opera, Brave,
  Tor, Vpn, Shield, Lock, Unlock, Key, Fingerprint, Face, Eye as EyeIcon,
  EyeOff, Ear, Mouth, Nose, Hand, ThumbsUp, ThumbsDown, Heart, HeartOff,
  Star as StarIcon2, StarOff, Bookmark, BookmarkOff, Flag, FlagOff, Bell,
  BellOff, Volume, VolumeOff, Volume1, Volume2, VolumeX, Mic, MicOff,
  Headphones as HeadphonesIcon, HeadphonesOff, Speaker, SpeakerOff, Radio as RadioIcon,
  Tv as TvIcon, Monitor as MonitorIcon, Smartphone as SmartphoneIcon, Tablet as TabletIcon,
  Watch as WatchIcon, Headphones as HeadphonesIcon2, Printer as PrinterIcon,
  Scanner as ScannerIcon, CreditCard as CreditCardIcon, Wallet as WalletIcon,
  Gift as GiftIcon2, Award as AwardIcon2, Trophy as TrophyIcon2, Medal as MedalIcon2,
  Diamond as DiamondIcon2, Crown as CrownIcon2, Star as StarIcon3,
  Sparkles as SparklesIcon2
} from 'lucide-react';

const EmpirePolishAnimation = () => {
  const [activeTab, setActiveTab] = useState('animations');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('crown');
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [particleCount, setParticleCount] = useState(100);
  const canvasRef = useRef(null);

  const tabs = [
    { id: 'animations', name: 'Animations', icon: Play },
    { id: 'particles', name: 'Particles', icon: Sparkles },
    { id: 'effects', name: 'Effects', icon: Zap },
    { id: '3d', name: '3D Objects', icon: Cube },
    { id: '4d', name: '4D Effects', icon: Eye },
    { id: 'polish', name: 'Polish', icon: Crown },
    { id: 'preview', name: 'Preview', icon: Eye },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const animations = [
    {
      id: 'crown',
      name: 'Crown Animation',
      description: 'Majestic crown with rotating gems',
      duration: '3s',
      complexity: 'high',
      status: 'active'
    },
    {
      id: 'empire',
      name: 'Empire Rise',
      description: 'Building construction with particle effects',
      duration: '5s',
      complexity: 'very-high',
      status: 'active'
    },
    {
      id: 'polish',
      name: 'Polish Shine',
      description: 'Smooth polishing animation with reflections',
      duration: '2s',
      complexity: 'medium',
      status: 'active'
    },
    {
      id: 'victory',
      name: 'Victory Celebration',
      description: 'Trophy and confetti celebration',
      duration: '4s',
      complexity: 'high',
      status: 'inactive'
    },
    {
      id: 'conquest',
      name: 'Conquest March',
      description: 'Marching army with flag animations',
      duration: '6s',
      complexity: 'very-high',
      status: 'inactive'
    },
    {
      id: 'glory',
      name: 'Glory Aura',
      description: 'Radiant aura with light effects',
      duration: '3s',
      complexity: 'medium',
      status: 'inactive'
    }
  ];

  const particleEffects = [
    {
      id: 'sparkles',
      name: 'Sparkles',
      description: 'Twinkling star particles',
      count: 150,
      color: '#fbbf24',
      status: 'active'
    },
    {
      id: 'dust',
      name: 'Dust',
      description: 'Floating dust particles',
      count: 200,
      color: '#9ca3af',
      status: 'active'
    },
    {
      id: 'fire',
      name: 'Fire',
      description: 'Flaming particle effects',
      count: 100,
      color: '#ef4444',
      status: 'inactive'
    },
    {
      id: 'smoke',
      name: 'Smoke',
      description: 'Smoke trail effects',
      count: 80,
      color: '#6b7280',
      status: 'inactive'
    },
    {
      id: 'magic',
      name: 'Magic',
      description: 'Magical sparkle effects',
      count: 120,
      color: '#8b5cf6',
      status: 'active'
    },
    {
      id: 'gold',
      name: 'Gold',
      description: 'Golden glitter particles',
      count: 90,
      color: '#f59e0b',
      status: 'inactive'
    }
  ];

  const visualEffects = [
    {
      id: 'blur',
      name: 'Motion Blur',
      description: 'Dynamic motion blur effects',
      intensity: 0.8,
      status: 'active'
    },
    {
      id: 'glow',
      name: 'Glow Effect',
      description: 'Radiant glow around objects',
      intensity: 0.6,
      status: 'active'
    },
    {
      id: 'shadow',
      name: 'Dynamic Shadows',
      description: 'Real-time shadow casting',
      intensity: 0.9,
      status: 'active'
    },
    {
      id: 'reflection',
      name: 'Reflections',
      description: 'Surface reflection effects',
      intensity: 0.7,
      status: 'inactive'
    },
    {
      id: 'refraction',
      name: 'Refraction',
      description: 'Light refraction through objects',
      intensity: 0.5,
      status: 'inactive'
    },
    {
      id: 'caustics',
      name: 'Caustics',
      description: 'Underwater light patterns',
      intensity: 0.4,
      status: 'inactive'
    }
  ];

  const threeDObjects = [
    {
      id: 'crown-3d',
      name: '3D Crown',
      description: 'Detailed 3D crown model',
      vertices: 25000,
      textures: 8,
      status: 'active'
    },
    {
      id: 'trophy-3d',
      name: '3D Trophy',
      description: 'Victory trophy with engravings',
      vertices: 18000,
      textures: 6,
      status: 'active'
    },
    {
      id: 'castle-3d',
      name: '3D Castle',
      description: 'Majestic castle architecture',
      vertices: 50000,
      textures: 12,
      status: 'inactive'
    },
    {
      id: 'sword-3d',
      name: '3D Sword',
      description: 'Ornate ceremonial sword',
      vertices: 15000,
      textures: 4,
      status: 'inactive'
    },
    {
      id: 'shield-3d',
      name: '3D Shield',
      description: 'Heraldic shield with emblems',
      vertices: 12000,
      textures: 5,
      status: 'inactive'
    },
    {
      id: 'throne-3d',
      name: '3D Throne',
      description: 'Royal throne with jewels',
      vertices: 30000,
      textures: 10,
      status: 'inactive'
    }
  ];

  useEffect(() => {
    initializeEmpirePolishAnimation();
    startParticleSystem();
  }, []);

  const initializeEmpirePolishAnimation = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/empire-polish/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animations,
          particles: particleEffects,
          effects: visualEffects,
          objects: threeDObjects
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCurrentAnimation(data.currentAnimation || 'crown');
        setAnimationSpeed(data.animationSpeed || 1);
        setParticleCount(data.particleCount || 100);
      }
      
    } catch (error) {
      console.error('Empire Polish Animation initialization error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const startParticleSystem = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 40}, 70%, 60%)`,
        life: Math.random() * 100 + 50
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Reset particle if life is over
        if (particle.life <= 0) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 60 + 40}, 70%, 60%)`,
            life: Math.random() * 100 + 50
          };
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  };

  const playAnimation = async (animationId) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/empire-polish/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animationId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCurrentAnimation(animationId);
      }
      
    } catch (error) {
      console.error('Animation play error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
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
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Empire Polish Animation
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            World-class 3D/4D animations with advanced particle effects and polish
          </p>
        </motion.div>

        {/* Animation Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Current Animation</h3>
                <p className="text-gray-300">Active animation and effects</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{animations.find(a => a.id === currentAnimation)?.name}</div>
                  <div className="text-gray-400 text-sm">Active Animation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{particleEffects.filter(p => p.status === 'active').length}</div>
                  <div className="text-gray-400 text-sm">Active Particles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{visualEffects.filter(e => e.status === 'active').length}</div>
                  <div className="text-gray-400 text-sm">Active Effects</div>
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
            {activeTab === 'animations' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Animations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {animations.map((animation) => (
                    <div key={animation.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{animation.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          animation.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div className="text-gray-300 text-sm mb-4">{animation.description}</div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-white">{animation.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Complexity</span>
                          <span className="text-white">{animation.complexity}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => playAnimation(animation.id)}
                        disabled={isProcessing}
                        className={`w-full px-4 py-2 rounded font-semibold transition-all duration-300 disabled:opacity-50 ${
                          animation.status === 'active'
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? 'Playing...' : animation.status === 'active' ? 'Active' : 'Play Animation'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'particles' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Particle Effects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {particleEffects.map((particle) => (
                    <div key={particle.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{particle.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          particle.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div className="text-gray-300 text-sm mb-4">{particle.description}</div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Count</span>
                          <span className="text-white">{particle.count}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Color</span>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: particle.color }}></div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleAnimation(particle.id)}
                        disabled={isProcessing}
                        className={`w-full px-4 py-2 rounded font-semibold transition-all duration-300 disabled:opacity-50 ${
                          particle.status === 'active'
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? 'Toggling...' : particle.status === 'active' ? 'Active' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'effects' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Visual Effects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visualEffects.map((effect) => (
                    <div key={effect.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{effect.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          effect.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div className="text-gray-300 text-sm mb-4">{effect.description}</div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Intensity</span>
                          <span className="text-white">{effect.intensity}</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                            style={{ width: `${effect.intensity * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleAnimation(effect.id)}
                        disabled={isProcessing}
                        className={`w-full px-4 py-2 rounded font-semibold transition-all duration-300 disabled:opacity-50 ${
                          effect.status === 'active'
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? 'Toggling...' : effect.status === 'active' ? 'Active' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === '3d' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">3D Objects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {threeDObjects.map((object) => (
                    <div key={object.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{object.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          object.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div className="text-gray-300 text-sm mb-4">{object.description}</div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Vertices</span>
                          <span className="text-white">{object.vertices.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Textures</span>
                          <span className="text-white">{object.textures}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleAnimation(object.id)}
                        disabled={isProcessing}
                        className={`w-full px-4 py-2 rounded font-semibold transition-all duration-300 disabled:opacity-50 ${
                          object.status === 'active'
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? 'Toggling...' : object.status === 'active' ? 'Active' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === '4d' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">4D Effects</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Time Dimension</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Temporal Blur</div>
                        <div className="text-gray-300 text-sm mb-2">Motion through time dimension</div>
                        <div className="text-yellow-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Time Warp</div>
                        <div className="text-gray-300 text-sm mb-2">Time dilation effects</div>
                        <div className="text-orange-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Chronological Flow</div>
                        <div className="text-gray-300 text-sm mb-2">Time-based animations</div>
                        <div className="text-red-400 text-xs">Status: Active</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Spatial Effects</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Dimensional Shift</div>
                        <div className="text-gray-300 text-sm mb-2">Multi-dimensional transitions</div>
                        <div className="text-purple-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Quantum Effects</div>
                        <div className="text-gray-300 text-sm mb-2">Quantum superposition visuals</div>
                        <div className="text-blue-400 text-xs">Status: Active</div>
                      </div>
                      
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Reality Distortion</div>
                        <div className="text-gray-300 text-sm mb-2">Space-time manipulation</div>
                        <div className="text-green-400 text-xs">Status: Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'polish' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Polish Effects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Smooth Transitions</h3>
                    <div className="text-gray-300 text-sm mb-4">Seamless animation blending</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Polish
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Anti-aliasing</h3>
                    <div className="text-gray-300 text-sm mb-4">Smooth edge rendering</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Polish
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Motion Blur</h3>
                    <div className="text-gray-300 text-sm mb-4">Realistic motion effects</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Polish
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Depth of Field</h3>
                    <div className="text-gray-300 text-sm mb-4">Cinematic focus effects</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Polish
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Bloom Effect</h3>
                    <div className="text-gray-300 text-sm mb-4">Glowing light effects</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Polish
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Chromatic Aberration</h3>
                    <div className="text-gray-300 text-sm mb-4">Color fringe effects</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Polish
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Animation Preview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
                    <div className="bg-slate-600/50 rounded-lg p-4 mb-4 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                        <div className="text-white font-semibold">Animation Preview</div>
                        <div className="text-gray-300 text-sm">Real-time animation rendering</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">FPS</span>
                          <span className="text-green-400 font-semibold">60</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Render Time</span>
                          <span className="text-blue-400 font-semibold">16ms</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Memory Usage</span>
                          <span className="text-purple-400 font-semibold">128MB</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: '65%' }}></div>
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
                    <h3 className="text-lg font-semibold text-white mb-4">Animation Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-play</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Loop animations</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">High quality</span>
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
                        <span className="text-gray-300">GPU acceleration</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Optimization</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Caching</span>
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

export default EmpirePolishAnimation; 