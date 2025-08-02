'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette, Settings, Eye, Download, Upload, Play, Pause, RotateCw,
  Clock, CheckCircle, AlertCircle, ArrowRight, ChevronDown, ChevronUp,
  Plus, Trash2, Copy, Edit, Layers, Search, Filter, BarChart3,
  LineChart, PieChart, Activity, News, Newspaper, Radio, Tv, Monitor,
  Smartphone, Tablet, Watch, Headphones, Printer, Scanner, CreditCard,
  Wallet, Gift, Award, Trophy, Medal, Diamond, Crown, Star, Sparkles,
  Database, Server, Network, Cpu, Memory, HardDrive, Wifi, Signal,
  MapPin, Calendar, Users, UserCheck, UserX, Building, Home, Office,
  Factory, Store, Bank, University, School, GraduationCap, BookOpen,
  Microscope, Flask, TestTube, Atom, Dna, Code, Terminal, Laptop,
  Desktop, Smartphone as Phone, Camera, Video, Music, FileText, Image,
  Archive, Folder, File, Download as DownloadIcon, Upload as UploadIcon,
  Share, Link, ExternalLink, Mail, MessageSquare, Phone as PhoneIcon,
  Video as VideoIcon, Calendar as CalendarIcon, Clock as ClockIcon,
  Map, Navigation, Compass, Target, Crosshair, Aim, Scope, Binoculars,
  Telescope, Satellite, Rocket, Plane, Car, Train, Bus, Ship, Bicycle,
  Motorcycle, Truck, Van, Helicopter, Drone, Submarine, Spaceship, UFO,
  Robot, Android, Iphone, Apple, Windows, Linux, Chrome, Firefox,
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
  Diamond as DiamondIcon, Crown as CrownIcon, Star as StarIcon2,
  Sparkles as SparklesIcon, TrendingUp, Lightbulb, Rocket as RocketIcon,
  Crown as CrownIcon2
} from 'lucide-react';

const ThemeSystem = () => {
  const [activeTab, setActiveTab] = useState('themes');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [animations, setAnimations] = useState([]);
  const [fonts, setFonts] = useState([]);

  const tabs = [
    { id: 'themes', name: 'Themes', icon: Palette },
    { id: 'animations', name: 'Animations', icon: Play },
    { id: 'fonts', name: 'Fonts', icon: Type },
    { id: 'colors', name: 'Colors', icon: Eye },
    { id: 'effects', name: 'Effects', icon: Sparkles },
    { id: 'preview', name: 'Preview', icon: Eye },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const themes = [
    {
      id: 'dark',
      name: 'Dark Theme',
      description: 'Classic dark theme with deep contrasts',
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc'
      },
      status: 'active'
    },
    {
      id: 'light',
      name: 'Light Theme',
      description: 'Clean light theme with subtle shadows',
      colors: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b'
      },
      status: 'inactive'
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      description: 'Futuristic neon aesthetic',
      colors: {
        primary: '#ff0080',
        secondary: '#00ffff',
        background: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff'
      },
      status: 'inactive'
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'Organic green and earth tones',
      colors: {
        primary: '#10b981',
        secondary: '#059669',
        background: '#f0fdf4',
        surface: '#ecfdf5',
        text: '#064e3b'
      },
      status: 'inactive'
    },
    {
      id: 'ocean',
      name: 'Ocean',
      description: 'Deep blue ocean vibes',
      colors: {
        primary: '#0ea5e9',
        secondary: '#0284c7',
        background: '#0c4a6e',
        surface: '#0e7490',
        text: '#e0f2fe'
      },
      status: 'inactive'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      description: 'Warm orange and purple gradients',
      colors: {
        primary: '#f97316',
        secondary: '#a855f7',
        background: '#1e1b4b',
        surface: '#312e81',
        text: '#fef3c7'
      },
      status: 'inactive'
    }
  ];

  const animationTypes = [
    {
      id: 'fade',
      name: 'Fade',
      description: 'Smooth fade in/out transitions',
      duration: '300ms',
      easing: 'ease-in-out',
      status: 'active'
    },
    {
      id: 'slide',
      name: 'Slide',
      description: 'Sliding motion transitions',
      duration: '400ms',
      easing: 'ease-out',
      status: 'active'
    },
    {
      id: 'scale',
      name: 'Scale',
      description: 'Scaling and zoom effects',
      duration: '250ms',
      easing: 'ease-in-out',
      status: 'active'
    },
    {
      id: 'rotate',
      name: 'Rotate',
      description: 'Rotation animations',
      duration: '500ms',
      easing: 'ease-in-out',
      status: 'inactive'
    },
    {
      id: 'bounce',
      name: 'Bounce',
      description: 'Bouncy elastic animations',
      duration: '600ms',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      status: 'inactive'
    },
    {
      id: 'flip',
      name: 'Flip',
      description: '3D flip animations',
      duration: '450ms',
      easing: 'ease-in-out',
      status: 'inactive'
    }
  ];

  const fontFamilies = [
    {
      id: 'inter',
      name: 'Inter',
      category: 'Sans-serif',
      weight: '400, 500, 600, 700',
      status: 'active'
    },
    {
      id: 'poppins',
      name: 'Poppins',
      category: 'Sans-serif',
      weight: '300, 400, 500, 600, 700',
      status: 'inactive'
    },
    {
      id: 'roboto',
      name: 'Roboto',
      category: 'Sans-serif',
      weight: '300, 400, 500, 700',
      status: 'inactive'
    },
    {
      id: 'opensans',
      name: 'Open Sans',
      category: 'Sans-serif',
      weight: '300, 400, 600, 700',
      status: 'inactive'
    },
    {
      id: 'playfair',
      name: 'Playfair Display',
      category: 'Serif',
      weight: '400, 500, 600, 700',
      status: 'inactive'
    },
    {
      id: 'merriweather',
      name: 'Merriweather',
      category: 'Serif',
      weight: '300, 400, 700',
      status: 'inactive'
    }
  ];

  const colorPalettes = [
    {
      id: 'primary',
      name: 'Primary Colors',
      colors: ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#ef4444', '#f97316']
    },
    {
      id: 'secondary',
      name: 'Secondary Colors',
      colors: ['#3b82f6', '#06b6d4', '#10b981', '#84cc16', '#eab308', '#f59e0b']
    },
    {
      id: 'neutral',
      name: 'Neutral Colors',
      colors: ['#f8fafc', '#e2e8f0', '#cbd5e1', '#64748b', '#334155', '#0f172a']
    },
    {
      id: 'accent',
      name: 'Accent Colors',
      colors: ['#fef3c7', '#fce7f3', '#e0e7ff', '#ecfdf5', '#fef2f2', '#fef5e7']
    }
  ];

  useEffect(() => {
    initializeThemeSystem();
  }, []);

  const initializeThemeSystem = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/theme-system/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          themes,
          animations: animationTypes,
          fonts: fontFamilies,
          colors: colorPalettes
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCurrentTheme(data.currentTheme || 'dark');
        setAnimations(data.animations || []);
        setFonts(data.fonts || []);
      }
      
    } catch (error) {
      console.error('Theme system initialization error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const applyTheme = async (themeId) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/theme-system/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCurrentTheme(themeId);
      }
      
    } catch (error) {
      console.error('Theme application error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleAnimation = async (animationId) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/theme-system/animation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animationId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAnimations(prev => prev.map(anim => 
          anim.id === animationId ? { ...anim, status: anim.status === 'active' ? 'inactive' : 'active' } : anim
        ));
      }
      
    } catch (error) {
      console.error('Animation toggle error:', error);
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
            <Palette className="w-12 h-12 text-purple-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Theme System
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            World-class theme customization with advanced animations and effects
          </p>
        </motion.div>

        {/* Current Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Current Theme</h3>
                <p className="text-gray-300">Active theme and customization</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{themes.find(t => t.id === currentTheme)?.name}</div>
                  <div className="text-gray-400 text-sm">Active Theme</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{animations.filter(a => a.status === 'active').length}</div>
                  <div className="text-gray-400 text-sm">Active Animations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{fonts.filter(f => f.status === 'active').length}</div>
                  <div className="text-gray-400 text-sm">Active Fonts</div>
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
            {activeTab === 'themes' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Themes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {themes.map((theme) => (
                    <div key={theme.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{theme.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          theme.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div className="text-gray-300 text-sm mb-4">{theme.description}</div>
                      
                      <div className="flex space-x-2 mb-4">
                        {Object.values(theme.colors).slice(0, 4).map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => applyTheme(theme.id)}
                        disabled={isProcessing}
                        className={`w-full px-4 py-2 rounded font-semibold transition-all duration-300 disabled:opacity-50 ${
                          theme.status === 'active'
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? 'Applying...' : theme.status === 'active' ? 'Active' : 'Apply Theme'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'animations' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Animations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {animationTypes.map((animation) => (
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
                          <span className="text-gray-400">Easing</span>
                          <span className="text-white">{animation.easing}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleAnimation(animation.id)}
                        disabled={isProcessing}
                        className={`w-full px-4 py-2 rounded font-semibold transition-all duration-300 disabled:opacity-50 ${
                          animation.status === 'active'
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? 'Toggling...' : animation.status === 'active' ? 'Active' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fonts' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Fonts</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fontFamilies.map((font) => (
                    <div key={font.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">{font.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          font.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Category</span>
                          <span className="text-white">{font.category}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Weights</span>
                          <span className="text-white">{font.weight}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-lg font-semibold text-white mb-2" style={{ fontFamily: font.name }}>
                          {font.name} Sample Text
                        </div>
                        <div className="text-sm text-gray-300" style={{ fontFamily: font.name }}>
                          The quick brown fox jumps over the lazy dog
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleAnimation(font.id)}
                        disabled={isProcessing}
                        className={`w-full px-4 py-2 rounded font-semibold transition-all duration-300 disabled:opacity-50 ${
                          font.status === 'active'
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? 'Toggling...' : font.status === 'active' ? 'Active' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Color Palettes</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {colorPalettes.map((palette) => (
                    <div key={palette.id} className="bg-slate-700/50 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">{palette.name}</h3>
                      <div className="flex space-x-2">
                        {palette.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'effects' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Visual Effects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Glassmorphism</h3>
                    <div className="text-gray-300 text-sm mb-4">Frosted glass effect with backdrop blur</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Effect
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Neon Glow</h3>
                    <div className="text-gray-300 text-sm mb-4">Luminous neon lighting effects</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Effect
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Particle System</h3>
                    <div className="text-gray-300 text-sm mb-4">Dynamic particle animations</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Effect
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Gradient Backgrounds</h3>
                    <div className="text-gray-300 text-sm mb-4">Smooth gradient transitions</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Effect
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Shadow Effects</h3>
                    <div className="text-gray-300 text-sm mb-4">Dynamic shadow and depth</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Effect
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Hover Effects</h3>
                    <div className="text-gray-300 text-sm mb-4">Interactive hover animations</div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                      Enable Effect
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Theme Preview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
                    <div className="bg-slate-600/50 rounded-lg p-4 mb-4">
                      <div className="text-white font-semibold mb-2">Sample Component</div>
                      <div className="text-gray-300 text-sm mb-3">This is how your theme will look</div>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded font-semibold hover:shadow-lg transition-all duration-300">
                        Sample Button
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-save</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Live preview</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Animation preview</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
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
                    <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-save themes</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Theme sync</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Custom themes</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Animation Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Performance mode</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Reduced motion</span>
                        <button className="p-2 bg-gray-500 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-play</span>
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

export default ThemeSystem; 