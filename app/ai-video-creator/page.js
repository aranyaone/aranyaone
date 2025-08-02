'use client';

import { motion } from 'framer-motion';
import { Video, Sparkles, Crown, Zap } from 'lucide-react';
import VideoCreator from '../components/VideoCreator';

export default function AIVideoCreatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Header */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Video className="w-12 h-12 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI Video Creator
              </h1>
              <Sparkles className="w-12 h-12 text-purple-400 ml-4" />
            </div>
            
            <h2 className="text-2xl md:text-4xl text-white mb-6 font-light">
              Professional Video Creation with AI Intelligence
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Create stunning videos with advanced AI tools, professional templates, smart editing features, 
              and automated enhancements. Transform your ideas into compelling visual stories.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/20">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">Professional Quality</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-white/20">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-white text-sm font-medium">Smart Automation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Creator Component */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VideoCreator />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
