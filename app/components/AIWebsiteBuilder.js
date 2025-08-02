'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Palette, 
  Type, 
  Image, 
  Code, 
  Smartphone,
  Monitor,
  Tablet,
  Wand2,
  Sparkles,
  Download,
  Eye,
  Save,
  Share,
  Settings,
  Layers,
  MousePointer
} from 'lucide-react';

const AIWebsiteBuilder = () => {
  const [activeTemplate, setActiveTemplate] = useState('business');
  const [builderMode, setBuilderMode] = useState('ai');
  const [isGenerating, setIsGenerating] = useState(false);
  const [deviceView, setDeviceView] = useState('desktop');

  const templates = [
    {
      id: 'business',
      name: 'Business Pro',
      description: 'Professional business website',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxRjI5MzciLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNDAiIGZpbGw9IiMzQjgyRjYiLz48dGV4dCB4PSIxNTAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5CdXNpbmVzcyBQcm88L3RleHQ+PHJlY3QgeD0iMjAiIHk9IjgwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNEI1NTYzIi8+PHJlY3QgeD0iMTYwIiB5PSI4MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzQ5NzMxNiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPlByb2Zlc3Npb25hbCBMYXlvdXQ8L3RleHQ+PC9zdmc+',
      category: 'Business'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Online shopping platform',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxMTE4MjciLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNFRjQ0NDQiLz48dGV4dCB4PSIxNTAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5TaG9wIE5vdzwvdGV4dD48cmVjdCB4PSIyMCIgeT0iODAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzM3NDE1MSIvPjxyZWN0IHg9IjExMCIgeT0iODAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzM3NDE1MSIvPjxyZWN0IHg9IjIwMCIgeT0iODAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPlByb2R1Y3QgR3JpZDwvdGV4dD48L3N2Zz4=',
      category: 'E-commerce'
    },
    {
      id: 'portfolio',
      name: 'Creative Portfolio',
      description: 'Showcase your work',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwRjE0MjkiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSI2MCIgcj0iMzAiIGZpbGw9IiM4QjVDRjYiLz48cmVjdCB4PSI1MCIgeT0iMTEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNGNTlFMEIiLz48cmVjdCB4PSIxMjAiIHk9IjExMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMTA5OTMzIi8+PHJlY3QgeD0iMTkwIiB5PSIxMTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0VGNDQ0NCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkNyZWF0aXZlIERlc2lnbjwvdGV4dD48L3N2Zz4=',
      category: 'Portfolio'
    },
    {
      id: 'blog',
      name: 'Modern Blog',
      description: 'Content publishing platform',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRkZGRkYiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iMzAiIGZpbGw9IiMxRjI5MzciLz48dGV4dCB4PSIxNTAiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5Nb2Rlcm4gQmxvZzwvdGV4dD48cmVjdCB4PSIyMCIgeT0iNjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iMTAiIGZpbGw9IiNFNUU3RUIiLz48cmVjdCB4PSIyMCIgeT0iODAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAiIGZpbGw9IiNFNUU3RUIiLz48cmVjdCB4PSIyMCIgeT0iMTAwIiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRTVFN0VCIi8+PHJlY3QgeD0iMjAiIHk9IjEyMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMCIgZmlsbD0iI0U1RTdFQiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM3MzRGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiPkNvbnRlbnQgTGF5b3V0PC90ZXh0Pjwvc3ZnPg==',
      category: 'Blog'
    }
  ];

  const aiFeatures = [
    {
      title: 'AI Content Generation',
      description: 'Generate website content automatically',
      icon: Type,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Smart Design AI',
      description: 'AI-powered layout and design optimization',
      icon: Palette,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Code Generation',
      description: 'Automatic code generation and optimization',
      icon: Code,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Image AI',
      description: 'AI image generation and optimization',
      icon: Image,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const generateWebsite = async () => {
    setIsGenerating(true);
    
    // Simulate AI website generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl">
                <Layout className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              AI Website Builder
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create stunning websites in minutes with AI-powered design, content generation, 
              and automatic optimization. No coding required.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Builder Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setBuilderMode('ai')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    builderMode === 'ai'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Wand2 className="w-4 h-4 inline mr-2" />
                  AI Mode
                </button>
                <button
                  onClick={() => setBuilderMode('manual')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    builderMode === 'manual'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <MousePointer className="w-4 h-4 inline mr-2" />
                  Manual
                </button>
              </div>

              <div className="flex bg-slate-700 rounded-lg p-1">
                {[
                  { id: 'desktop', icon: Monitor },
                  { id: 'tablet', icon: Tablet },
                  { id: 'mobile', icon: Smartphone }
                ].map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setDeviceView(id)}
                    className={`p-2 rounded-lg transition-colors ${
                      deviceView === id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Generation Section */}
        {builderMode === 'ai' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 rounded-2xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">AI Website Generation</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-300 mb-2">Describe your website:</label>
                <textarea
                  placeholder="Describe your vision: 'A cutting-edge SaaS platform for financial services with modern dashboard, user analytics, secure payment integration, and mobile-responsive design that converts visitors into customers...'"
                  className="w-full h-32 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:outline-none resize-none"
                />
                
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-gray-300 mb-2">Industry:</label>
                    <select className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:outline-none">
                      <option>Technology</option>
                      <option>E-commerce</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Finance</option>
                      <option>Creative</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Style Preference:</label>
                    <select className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:outline-none">
                      <option>Modern & Minimal</option>
                      <option>Bold & Colorful</option>
                      <option>Professional</option>
                      <option>Creative & Artistic</option>
                      <option>Corporate</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateWebsite}
                  disabled={isGenerating}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Website with AI
                    </>
                  )}
                </motion.button>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">AI Features</h4>
                {aiFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg"
                    >
                      <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-lg`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-white">{feature.title}</h5>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Template Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Choose a Template
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => setActiveTemplate(template.id)}
                className={`bg-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                  activeTemplate === template.id ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div className="h-48 bg-slate-700 flex items-center justify-center">
                  <Layout className="w-16 h-16 text-gray-400" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-1">{template.name}</h4>
                  <p className="text-gray-400 text-sm mb-2">{template.description}</p>
                  <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded">
                    {template.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Website Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Website Preview</h3>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Device: </span>
              <span className="text-white capitalize">{deviceView}</span>
            </div>
          </div>
          
          <div className={`bg-slate-700 rounded-lg flex items-center justify-center ${
            deviceView === 'desktop' ? 'h-96' : 
            deviceView === 'tablet' ? 'h-80 max-w-2xl mx-auto' : 
            'h-96 max-w-sm mx-auto'
          }`}>
            <div className="text-center">
              <Layout className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Website Preview</p>
              <p className="text-gray-500 text-sm">Your generated website will appear here</p>
            </div>
          </div>
        </motion.div>

        {/* Pro Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Professional Website Builder
          </h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Take your website to the next level with advanced AI features, custom domains, 
            e-commerce integration, and professional hosting.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Upgrade to Pro
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              View Features
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIWebsiteBuilder;
