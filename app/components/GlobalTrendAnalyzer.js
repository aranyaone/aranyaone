'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Globe, Brain, Zap, Eye, Target, Settings, Download, Upload,
  Play, Pause, RotateCw, Clock, CheckCircle, AlertCircle, ArrowRight, ChevronDown,
  ChevronUp, Plus, Trash2, Copy, Edit, Layers, Search, Filter, BarChart3,
  LineChart, PieChart, Activity, News, Newspaper, Radio, Tv, Monitor,
  Smartphone, Tablet, Watch, Headphones, Printer, Scanner, CreditCard,
  Wallet, Gift, Award, Trophy, Medal, Diamond, Crown, Star, Sparkles,
  Database, Server, Network, Cpu, Memory, HardDrive, Wifi, Signal,
  MapPin, Calendar, Clock as ClockIcon, Users, UserCheck, UserX,
  Building, Home, Office, Factory, Store, Bank, University, School,
  GraduationCap, BookOpen, Microscope, Flask, TestTube, Atom, Dna,
  Code, Terminal, Laptop, Desktop, Smartphone as Phone, Camera,
  Video, Music, FileText, Image, Archive, Folder, File, Download as DownloadIcon,
  Upload as UploadIcon, Share, Link, ExternalLink, Mail, MessageSquare,
  Phone as PhoneIcon, Video as VideoIcon, Calendar as CalendarIcon,
  Clock as ClockIcon2, Map, Navigation, Compass, Target as TargetIcon,
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
  Diamond as DiamondIcon, Crown as CrownIcon, Star as StarIcon2, Sparkles as SparklesIcon
} from 'lucide-react';

const GlobalTrendAnalyzer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [trends, setTrends] = useState([]);
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [aiInsights, setAiInsights] = useState([]);
  const [sources, setSources] = useState([]);
  const [realTimeData, setRealTimeData] = useState({
    globalMarkets: {},
    techTrends: {},
    newsSentiment: {},
    socialMedia: {},
    academicResearch: {},
    bankingData: {},
    universityResearch: {},
    labInnovations: {}
  });

  const tabs = [
    { id: 'dashboard', name: 'Global Dashboard', icon: Globe },
    { id: 'trends', name: 'Trend Analysis', icon: TrendingUp },
    { id: 'news', name: 'News Intelligence', icon: Newspaper },
    { id: 'markets', name: 'Market Data', icon: BarChart3 },
    { id: 'research', name: 'Research Hub', icon: BookOpen },
    { id: 'ai-insights', name: 'AI Insights', icon: Brain },
    { id: 'content', name: 'Content Creator', icon: Edit },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const dataSources = [
    {
      id: 'news-channels',
      name: 'Global News Channels',
      icon: Tv,
      sources: ['CNN', 'BBC', 'Reuters', 'AP', 'Bloomberg', 'CNBC', 'Fox News', 'Al Jazeera'],
      status: 'active',
      lastUpdate: '2 minutes ago'
    },
    {
      id: 'social-media',
      name: 'Social Media Platforms',
      icon: Users,
      sources: ['Twitter', 'Facebook', 'LinkedIn', 'Reddit', 'Instagram', 'TikTok', 'YouTube'],
      status: 'active',
      lastUpdate: '1 minute ago'
    },
    {
      id: 'financial-markets',
      name: 'Financial Markets',
      icon: TrendingUp,
      sources: ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKEX', 'SGX', 'ASX', 'BSE'],
      status: 'active',
      lastUpdate: '30 seconds ago'
    },
    {
      id: 'universities',
      name: 'Global Universities',
      icon: GraduationCap,
      sources: ['MIT', 'Stanford', 'Harvard', 'Oxford', 'Cambridge', 'ETH Zurich', 'Tokyo University'],
      status: 'active',
      lastUpdate: '5 minutes ago'
    },
    {
      id: 'research-labs',
      name: 'Research Laboratories',
      icon: Microscope,
      sources: ['CERN', 'NASA', 'Max Planck Institute', 'Bell Labs', 'IBM Research', 'Google Research'],
      status: 'active',
      lastUpdate: '10 minutes ago'
    },
    {
      id: 'banks',
      name: 'Global Banking',
      icon: Bank,
      sources: ['JPMorgan', 'Goldman Sachs', 'Morgan Stanley', 'Citigroup', 'Bank of America', 'HSBC'],
      status: 'active',
      lastUpdate: '2 minutes ago'
    },
    {
      id: 'tech-companies',
      name: 'Tech Companies',
      icon: Cpu,
      sources: ['Apple', 'Google', 'Microsoft', 'Amazon', 'Meta', 'Tesla', 'NVIDIA', 'Intel'],
      status: 'active',
      lastUpdate: '1 minute ago'
    },
    {
      id: 'government',
      name: 'Government Data',
      icon: Building,
      sources: ['US Federal Reserve', 'ECB', 'Bank of Japan', 'Bank of England', 'IMF', 'World Bank'],
      status: 'active',
      lastUpdate: '3 minutes ago'
    }
  ];

  const trendCategories = [
    {
      id: 'technology',
      name: 'Technology Trends',
      icon: Cpu,
      color: 'from-blue-400 to-purple-400',
      trends: [
        { name: 'AI/ML Adoption', change: 15.2, impact: 'high' },
        { name: 'Quantum Computing', change: 8.7, impact: 'medium' },
        { name: '5G/6G Networks', change: 12.3, impact: 'high' },
        { name: 'Blockchain/Crypto', change: -2.1, impact: 'medium' }
      ]
    },
    {
      id: 'finance',
      name: 'Financial Markets',
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-400',
      trends: [
        { name: 'ESG Investing', change: 18.5, impact: 'high' },
        { name: 'Digital Banking', change: 22.1, impact: 'high' },
        { name: 'Cryptocurrency', change: -5.3, impact: 'medium' },
        { name: 'Fintech Innovation', change: 14.8, impact: 'high' }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Biotech',
      icon: Heart,
      color: 'from-red-400 to-pink-400',
      trends: [
        { name: 'mRNA Technology', change: 25.4, impact: 'high' },
        { name: 'Telemedicine', change: 19.2, impact: 'high' },
        { name: 'AI in Healthcare', change: 16.7, impact: 'high' },
        { name: 'Personalized Medicine', change: 13.9, impact: 'medium' }
      ]
    },
    {
      id: 'energy',
      name: 'Energy & Environment',
      icon: Zap,
      color: 'from-yellow-400 to-orange-400',
      trends: [
        { name: 'Renewable Energy', change: 28.3, impact: 'high' },
        { name: 'Electric Vehicles', change: 31.7, impact: 'high' },
        { name: 'Carbon Trading', change: 12.4, impact: 'medium' },
        { name: 'Nuclear Fusion', change: 7.8, impact: 'medium' }
      ]
    }
  ];

  useEffect(() => {
    initializeTrendAnalyzer();
    startRealTimeMonitoring();
  }, []);

  const initializeTrendAnalyzer = async () => {
    setIsProcessing(true);
    
    try {
      // Initialize all data sources
      const response = await fetch('/api/trend-analyzer/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sources: dataSources,
          categories: trendCategories
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTrends(data.trends || []);
        setNews(data.news || []);
        setMarketData(data.marketData || {});
        setAiInsights(data.aiInsights || []);
        setSources(dataSources);
      }
      
    } catch (error) {
      console.error('Trend analyzer initialization error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const startRealTimeMonitoring = () => {
    // Real-time data monitoring
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/trend-analyzer/realtime');
        const data = await response.json();
        
        setRealTimeData(prev => ({
          ...prev,
          globalMarkets: data.globalMarkets || prev.globalMarkets,
          techTrends: data.techTrends || prev.techTrends,
          newsSentiment: data.newsSentiment || prev.newsSentiment,
          socialMedia: data.socialMedia || prev.socialMedia,
          academicResearch: data.academicResearch || prev.academicResearch,
          bankingData: data.bankingData || prev.bankingData,
          universityResearch: data.universityResearch || prev.universityResearch,
          labInnovations: data.labInnovations || prev.labInnovations
        }));
        
      } catch (error) {
        console.error('Real-time monitoring error:', error);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  };

  const analyzeTrend = async (trendData) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/trend-analyzer/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trendData,
          sources: sources,
          realTimeData
        })
      });
      
      const analysis = await response.json();
      
      if (analysis.success) {
        setAiInsights(prev => [...prev, analysis.insight]);
      }
      
    } catch (error) {
      console.error('Trend analysis error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateContent = async (insight) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/content-creator/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          insight,
          type: 'trend-analysis',
          platforms: ['blog', 'social-media', 'newsletter']
        })
      });
      
      const content = await response.json();
      
      if (content.success) {
        // Handle generated content
        console.log('Generated content:', content);
      }
      
    } catch (error) {
      console.error('Content generation error:', error);
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
            <Globe className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Global Trend Analyzer
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            World-class AI-powered global trend analysis with real-time data from all major sources
          </p>
        </motion.div>

        {/* Real-Time Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8"
        >
          {dataSources.map((source) => (
            <div key={source.id} className="bg-slate-800/50 rounded-xl p-4 text-center">
              <source.icon className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white mb-1">{source.name}</div>
              <div className="text-xs text-gray-400">{source.lastUpdate}</div>
              <div className={`w-2 h-2 rounded-full mx-auto mt-2 ${
                source.status === 'active' ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
            </div>
          ))}
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
                <h2 className="text-3xl font-bold text-white mb-6">Global Dashboard</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Real-Time Market Data</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Global Markets</span>
                        <span className="text-green-400 font-semibold">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">News Sources</span>
                        <span className="text-blue-400 font-semibold">1,247 articles</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Social Media</span>
                        <span className="text-purple-400 font-semibold">2.3M mentions</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Research Papers</span>
                        <span className="text-yellow-400 font-semibold">156 new</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
                    <div className="space-y-4">
                      {aiInsights.slice(0, 4).map((insight, index) => (
                        <div key={index} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="text-white font-semibold mb-1">{insight.title}</div>
                          <div className="text-gray-300 text-sm">{insight.description}</div>
                          <div className="text-blue-400 text-xs mt-2">{insight.confidence}% confidence</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Trend Analysis</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendCategories.map((category) => (
                    <div key={category.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <category.icon className="w-8 h-8 text-blue-400 mr-3" />
                        <h3 className="text-white font-semibold">{category.name}</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {category.trends.map((trend, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-600/50 rounded">
                            <div>
                              <div className="text-white font-semibold text-sm">{trend.name}</div>
                              <div className={`text-xs ${
                                trend.impact === 'high' ? 'text-red-400' :
                                trend.impact === 'medium' ? 'text-yellow-400' :
                                'text-green-400'
                              }`}>
                                {trend.impact} impact
                              </div>
                            </div>
                            <div className={`font-semibold ${
                              trend.change >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {trend.change >= 0 ? '+' : ''}{trend.change}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">News Intelligence</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Top Headlines</h3>
                    <div className="space-y-4">
                      {news.slice(0, 5).map((item, index) => (
                        <div key={index} className="border-b border-gray-600 pb-3">
                          <div className="text-white font-semibold mb-1">{item.title}</div>
                          <div className="text-gray-300 text-sm mb-2">{item.summary}</div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{item.source}</span>
                            <span>{item.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Sentiment Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Positive</span>
                        <span className="text-green-400 font-semibold">65%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Neutral</span>
                        <span className="text-yellow-400 font-semibold">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Negative</span>
                        <span className="text-red-400 font-semibold">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'markets' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Market Data</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">$48.2T</div>
                    <div className="text-gray-400 text-sm">Global Market Cap</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">$2.1T</div>
                    <div className="text-gray-400 text-sm">Daily Trading Volume</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">156</div>
                    <div className="text-gray-400 text-sm">Active Markets</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                    <div className="text-gray-400 text-sm">Real-Time Monitoring</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'research' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Research Hub</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Academic Research</h3>
                    <div className="space-y-4">
                      {dataSources.filter(s => s.id === 'universities' || s.id === 'research-labs').map((source) => (
                        <div key={source.id} className="p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center mb-2">
                            <source.icon className="w-5 h-5 text-blue-400 mr-2" />
                            <span className="text-white font-semibold">{source.name}</span>
                          </div>
                          <div className="text-gray-300 text-sm mb-2">
                            {source.sources.join(', ')}
                          </div>
                          <div className="text-green-400 text-xs">Active - {source.lastUpdate}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Latest Publications</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Quantum Computing Breakthrough</div>
                        <div className="text-gray-300 text-sm mb-2">MIT Research Lab</div>
                        <div className="text-blue-400 text-xs">Published 2 hours ago</div>
                      </div>
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">AI Ethics Framework</div>
                        <div className="text-gray-300 text-sm mb-2">Stanford University</div>
                        <div className="text-blue-400 text-xs">Published 4 hours ago</div>
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
                    <h3 className="text-lg font-semibold text-white mb-4">Predictive Analytics</h3>
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
                    <h3 className="text-lg font-semibold text-white mb-4">Trend Predictions</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">AI Adoption Surge</div>
                        <div className="text-gray-300 text-sm mb-2">Expected 40% increase in AI adoption across industries</div>
                        <div className="text-green-400 text-xs">High confidence (92%)</div>
                      </div>
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="text-white font-semibold mb-1">Green Energy Boom</div>
                        <div className="text-gray-300 text-sm mb-2">Renewable energy investments to reach $2.5T by 2025</div>
                        <div className="text-green-400 text-xs">High confidence (88%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Content Creator Integration</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Trend-Based Content</h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => generateContent(aiInsights[0])}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Generating...' : 'Generate Trend Report'}
                      </button>
                      <button
                        onClick={() => generateContent(aiInsights[1])}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Generating...' : 'Create Market Analysis'}
                      </button>
                      <button
                        onClick={() => generateContent(aiInsights[2])}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Generating...' : 'Write Tech Newsletter'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Content Analytics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Articles Generated</span>
                        <span className="text-white font-semibold">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Average Engagement</span>
                        <span className="text-green-400 font-semibold">+45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Trend Accuracy</span>
                        <span className="text-blue-400 font-semibold">94%</span>
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
                    <h3 className="text-lg font-semibold text-white mb-4">Data Sources</h3>
                    <div className="space-y-4">
                      {dataSources.map((source) => (
                        <div key={source.id} className="flex items-center justify-between">
                          <span className="text-gray-300">{source.name}</span>
                          <button className="p-2 bg-green-500 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Self-Learning</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Update</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Predictive Analytics</span>
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

export default GlobalTrendAnalyzer; 