'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Sparkles, Zap, Users, Share2, Download,
  Play, Eye, Settings, Crown, Star, Heart,
  GitBranch, Lightbulb, Target, Rocket, Globe
} from 'lucide-react';
import VisualMindMap from '../../components/VisualMindMap';

export default function VisualMindMapPage() {
  const [showMindMap, setShowMindMap] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'business',
      name: 'Business Strategy',
      description: 'Plan your business goals and strategies',
      icon: Target,
      color: 'from-blue-500 to-purple-600',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'learning',
      name: 'Learning Path',
      description: 'Organize your learning journey',
      icon: Brain,
      color: 'from-green-500 to-teal-600',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'project',
      name: 'Project Planning',
      description: 'Break down complex projects',
      icon: Rocket,
      color: 'from-orange-500 to-red-600',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'creative',
      name: 'Creative Ideas',
      description: 'Brainstorm and visualize concepts',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-600',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'team',
      name: 'Team Structure',
      description: 'Organize team roles and responsibilities',
      icon: Users,
      color: 'from-pink-500 to-purple-600',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'goals',
      name: 'Goal Setting',
      description: 'Map out your objectives and milestones',
      icon: Star,
      color: 'from-indigo-500 to-blue-600',
      preview: '/api/placeholder/300/200'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Mind Maps',
      description: 'Generate intelligent mind maps with AI assistance for any topic'
    },
    {
      icon: Zap,
      title: '10x Faster Learning',
      description: 'Visual learning accelerates comprehension and retention'
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Work together with your team in real-time on shared mind maps'
    },
    {
      icon: Share2,
      title: 'Easy Sharing & Publishing',
      description: 'Share your mind maps with anyone or publish them publicly'
    },
    {
      icon: Download,
      title: 'Multiple Export Options',
      description: 'Export as PDF, PNG, SVG, or integrate with Google Drive'
    },
    {
      icon: Settings,
      title: 'Advanced Customization',
      description: 'Customize colors, shapes, themes, and layouts to match your style'
    }
  ];

  if (showMindMap) {
    return <VisualMindMap />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-6">
              <Crown className="w-4 h-4 mr-2" />
              Revolutionary Visual Learning Platform
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Visual Mind Mapping
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform your ideas into powerful visual mind maps. Create, collaborate, and learn 10x faster 
              with AI-powered mind mapping that turns complex concepts into clear, visual stories.
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                onClick={() => setShowMindMap(true)}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center"
              >
                <Brain className="w-6 h-6 mr-2" />
                Start Creating Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center"
              >
                <Play className="w-6 h-6 mr-2" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-300 text-lg">Everything you need for visual thinking and collaboration</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">AI Mind Map Templates</h2>
            <p className="text-gray-300 text-lg">Get started instantly with our intelligent templates</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => {
                  setSelectedTemplate(template);
                  setShowMindMap(true);
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className={`w-full h-40 bg-gradient-to-br ${template.color} rounded-xl mb-6 flex items-center justify-center`}>
                    <template.icon className="w-16 h-16 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                  <p className="text-gray-300 text-sm">{template.description}</p>
                  
                  <div className="mt-4 flex items-center text-purple-400 text-sm">
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Enhanced
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Why Visual Mind Mapping?</h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Brain,
                    title: 'Accelerated Learning',
                    description: 'Visual representation helps you understand and remember information 10x faster than traditional note-taking.'
                  },
                  {
                    icon: GitBranch,
                    title: 'Connected Thinking',
                    description: 'See relationships between ideas and concepts that you might miss with linear thinking.'
                  },
                  {
                    icon: Users,
                    title: 'Team Collaboration',
                    description: 'Work together in real-time, share ideas instantly, and build collective understanding.'
                  },
                  {
                    icon: Globe,
                    title: 'Universal Access',
                    description: 'Access your mind maps anywhere, anytime, with seamless cloud synchronization.'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-purple-600/20 rounded-lg p-3 mr-4">
                      <benefit.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Loved by 50,000+ Users</h3>
                  <p className="text-gray-300 mb-6">
                    "Visual mind mapping has transformed how I learn and organize my thoughts. 
                    It's like having a superpower for my brain!"
                  </p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-400 text-sm">Sarah Johnson, Product Manager</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-12 border border-purple-500/30"
          >
            <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Think Visually?</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Join thousands of learners, professionals, and teams who've transformed their thinking 
              with visual mind mapping. Start creating your first AI-powered mind map today.
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                onClick={() => setShowMindMap(true)}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center"
              >
                <Brain className="w-6 h-6 mr-2" />
                Create Your First Mind Map
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
