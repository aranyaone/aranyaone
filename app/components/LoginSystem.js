'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Lock, Unlock, Key, Fingerprint, Eye, EyeOff, User, Mail,
  Phone, Camera, Video, Music, FileText, Image, Archive, Folder,
  File, Download, Upload, Share, Link, ExternalLink, Mail as MailIcon,
  MessageSquare, Phone as PhoneIcon, Video as VideoIcon, Calendar,
  Clock, Map, Navigation, Compass, Target, Crosshair, Aim, Scope,
  Binoculars, Telescope, Satellite, Rocket, Plane, Car, Train, Bus,
  Ship, Bicycle, Motorcycle, Truck, Van, Helicopter, Drone, Submarine,
  Spaceship, UFO, Robot, Android, Iphone, Apple, Windows, Linux,
  Chrome, Firefox, Safari, Edge, Opera, Brave, Tor, Vpn, Shield as ShieldIcon,
  Lock as LockIcon, Unlock as UnlockIcon, Key as KeyIcon, Fingerprint as FingerprintIcon,
  Face, Eye as EyeIcon, EyeOff as EyeOffIcon, Ear, Mouth, Nose, Hand,
  ThumbsUp, ThumbsDown, Heart, HeartOff, Star, StarOff, Bookmark,
  BookmarkOff, Flag, FlagOff, Bell, BellOff, Volume, VolumeOff,
  Volume1, Volume2, VolumeX, Mic, MicOff, Headphones, HeadphonesOff,
  Speaker, SpeakerOff, Radio, Tv, Monitor, Smartphone, Tablet, Watch,
  Headphones as HeadphonesIcon, Printer, Scanner, CreditCard, Wallet,
  Gift, Award, Trophy, Medal, Diamond, Crown, Star as StarIcon2,
  Sparkles, TrendingUp, Lightbulb, Rocket as RocketIcon, Crown as CrownIcon2,
  CheckCircle, AlertCircle, ArrowRight, ChevronDown, ChevronUp, Plus,
  Trash2, Copy, Edit, Layers, Search, Filter, BarChart3, LineChart,
  PieChart, Activity, News, Newspaper, Radio as RadioIcon, Tv as TvIcon,
  Monitor as MonitorIcon, Smartphone as SmartphoneIcon, Tablet as TabletIcon,
  Watch as WatchIcon, Headphones as HeadphonesIcon2, Printer as PrinterIcon,
  Scanner as ScannerIcon, CreditCard as CreditCardIcon, Wallet as WalletIcon,
  Gift as GiftIcon, Award as AwardIcon, Trophy as TrophyIcon, Medal as MedalIcon,
  Diamond as DiamondIcon, Crown as CrownIcon, Star as StarIcon3,
  Sparkles as SparklesIcon
} from 'lucide-react';

const LoginSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [authMethod, setAuthMethod] = useState('password');
  const [securityLevel, setSecurityLevel] = useState('high');

  const authMethods = [
    {
      id: 'password',
      name: 'Password',
      icon: Lock,
      description: 'Traditional password authentication',
      security: 'medium'
    },
    {
      id: '2fa',
      name: 'Two-Factor Authentication',
      icon: Shield,
      description: 'Password + SMS/App code',
      security: 'high'
    },
    {
      id: 'biometric',
      name: 'Biometric',
      icon: Fingerprint,
      description: 'Fingerprint or face recognition',
      security: 'high'
    },
    {
      id: 'hardware-key',
      name: 'Hardware Key',
      icon: Key,
      description: 'Physical security key',
      security: 'very-high'
    }
  ];

  const securityFeatures = [
    {
      id: 'encryption',
      name: 'End-to-End Encryption',
      status: 'active',
      description: 'All data encrypted in transit and at rest'
    },
    {
      id: 'rate-limiting',
      name: 'Rate Limiting',
      status: 'active',
      description: 'Prevent brute force attacks'
    },
    {
      id: 'session-management',
      name: 'Session Management',
      status: 'active',
      description: 'Secure session handling and timeout'
    },
    {
      id: 'audit-logging',
      name: 'Audit Logging',
      status: 'active',
      description: 'Complete login activity tracking'
    }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          method: authMethod
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Handle successful login
        console.log('Login successful');
      }
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          name: e.target.name.value,
          method: authMethod
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Handle successful registration
        console.log('Registration successful');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-indigo-400 mr-4" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Secure Login
            </h1>
          </div>
          <p className="text-gray-300">World-class security with advanced authentication</p>
        </motion.div>

        {/* Auth Method Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Authentication Method</h3>
            <div className="grid grid-cols-2 gap-4">
              {authMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setAuthMethod(method.id)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    authMethod === method.id
                      ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-lg'
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                  }`}
                >
                  <method.icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-semibold">{method.name}</div>
                  <div className="text-xs opacity-75">{method.description}</div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Login/Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-lg'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ml-4 ${
                !isLogin
                  ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-lg'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
              }`}
            >
              Register
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={isLogin ? handleLogin : handleRegister}
              className="space-y-6"
            >
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {authMethod === '2fa' && (
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Two-Factor Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>

              {isLogin && (
                <div className="text-center">
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm">
                    Forgot your password?
                  </a>
                </div>
              )}
            </motion.form>
          </AnimatePresence>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Security Features</h3>
            <div className="space-y-3">
              {securityFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{feature.name}</div>
                    <div className="text-gray-300 text-sm">{feature.description}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-green-400 text-sm font-semibold">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Security Level Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Security Level</h3>
                <p className="text-gray-300 text-sm">Current authentication security</p>
              </div>
              <div className={`px-4 py-2 rounded-xl font-semibold ${
                securityLevel === 'very-high' ? 'bg-green-500 text-white' :
                securityLevel === 'high' ? 'bg-blue-500 text-white' :
                securityLevel === 'medium' ? 'bg-yellow-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {securityLevel.toUpperCase()}
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  securityLevel === 'very-high' ? 'bg-green-400' :
                  securityLevel === 'high' ? 'bg-blue-400' :
                  securityLevel === 'medium' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}
                style={{ 
                  width: securityLevel === 'very-high' ? '100%' :
                          securityLevel === 'high' ? '85%' :
                          securityLevel === 'medium' ? '65%' : '45%'
                }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSystem; 