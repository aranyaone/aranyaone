'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  TrendingUp, 
  Target, 
  Globe, 
  BarChart3,
  Eye,
  MousePointer,
  Zap,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Link,
  FileText,
  Image,
  Video,
  Smartphone,
  Monitor,
  Tablet,
  Star,
  Users,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
  RefreshCw,
  Download,
  Settings,
  Lightbulb,
  Rocket,
  Crown
} from 'lucide-react';

const SEOAIOptimizer = () => {
  const [seoScore, setSeoScore] = useState(87);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [currentUrl, setCurrentUrl] = useState('https://aranyaone.com');

  const seoMetrics = [
    { 
      label: 'SEO Score', 
      value: seoScore, 
      max: 100, 
      icon: TrendingUp, 
      color: 'text-green-400',
      trend: '+12%'
    },
    { 
      label: 'Organic Traffic', 
      value: '45.2K', 
      icon: Users, 
      color: 'text-blue-400',
      trend: '+28%'
    },
    { 
      label: 'Keywords Ranking', 
      value: '1,247', 
      icon: Target, 
      color: 'text-purple-400',
      trend: '+156'
    },
    { 
      label: 'Page Speed', 
      value: '94/100', 
      icon: Zap, 
      color: 'text-orange-400',
      trend: '+8'
    }
  ];

  const seoAudits = [
    {
      category: 'Technical SEO',
      score: 92,
      icon: Settings,
      color: 'from-blue-500 to-cyan-500',
      issues: [
        { type: 'pass', text: 'Page load speed optimized' },
        { type: 'pass', text: 'Mobile-friendly design' },
        { type: 'warning', text: 'Optimize images with alt text for better accessibility and SEO rankings' },
        { type: 'pass', text: 'HTTPS enabled' }
      ]
    },
    {
      category: 'Content Quality',
      score: 88,
      icon: FileText,
      color: 'from-green-500 to-teal-500',
      issues: [
        { type: 'pass', text: 'Unique, high-quality content' },
        { type: 'pass', text: 'Proper heading structure' },
        { type: 'error', text: 'Meta descriptions too short' },
        { type: 'pass', text: 'Internal linking optimized' }
      ]
    },
    {
      category: 'Keywords',
      score: 85,
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      issues: [
        { type: 'pass', text: 'Target keywords identified' },
        { type: 'warning', text: 'Keyword density could improve' },
        { type: 'pass', text: 'Long-tail keywords present' },
        { type: 'pass', text: 'Competitor analysis complete' }
      ]
    },
    {
      category: 'User Experience',
      score: 90,
      icon: Eye,
      color: 'from-orange-500 to-red-500',
      issues: [
        { type: 'pass', text: 'Responsive design' },
        { type: 'pass', text: 'Fast loading times' },
        { type: 'pass', text: 'Clear navigation' },
        { type: 'warning', text: 'Some buttons too small' }
      ]
    }
  ];

  const keywordRankings = [
    { keyword: 'AI tools', position: 3, change: 'up', volume: '22.5K', difficulty: 'medium' },
    { keyword: 'digital marketing', position: 7, change: 'up', volume: '18.3K', difficulty: 'high' },
    { keyword: 'website builder', position: 12, change: 'down', volume: '15.7K', difficulty: 'medium' },
    { keyword: 'video creator', position: 5, change: 'up', volume: '12.4K', difficulty: 'low' },
    { keyword: 'design assistant', position: 8, change: 'same', volume: '9.8K', difficulty: 'low' }
  ];

  const competitorAnalysis = [
    { name: 'Competitor A', score: 78, traffic: '32.1K', keywords: 892 },
    { name: 'Competitor B', score: 82, traffic: '28.7K', keywords: 1156 },
    { name: 'Your Site', score: seoScore, traffic: '45.2K', keywords: 1247 },
    { name: 'Competitor C', score: 75, traffic: '19.3K', keywords: 743 }
  ];

  const aiRecommendations = [
    {
      priority: 'high',
      title: 'Optimize Meta Descriptions',
      description: 'Add compelling meta descriptions to 12 pages',
      impact: '+8% CTR',
      effort: 'Low',
      icon: FileText
    },
    {
      priority: 'high',
      title: 'Improve Core Web Vitals',
      description: 'Optimize largest contentful paint',
      impact: '+15% ranking',
      effort: 'Medium',
      icon: Zap
    },
    {
      priority: 'medium',
      title: 'Add Schema Markup',
      description: 'Implement structured data for better SERP features',
      impact: '+12% visibility',
      effort: 'Medium',
      icon: Target
    },
    {
      priority: 'low',
      title: 'Internal Link Optimization',
      description: 'Add relevant internal links to boost page authority',
      impact: '+5% ranking',
      effort: 'Low',
      icon: Link
    }
  ];

  const performSEOAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI SEO analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setSeoScore(Math.min(100, seoScore + Math.floor(Math.random() * 5)));
    }, 4000);
  };

  const getIssueIcon = (type) => {
    switch (type) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getChangeIcon = (change) => {
    switch (change) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl">
                <Search className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              SEO AI Optimizer
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dominate search engines with AI-powered SEO optimization. Advanced analytics, 
              keyword research, and intelligent recommendations for maximum visibility.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* SEO Analysis Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">SEO Analysis Dashboard</h3>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-96">
              <label className="block text-gray-300 mb-2">Website URL:</label>
              <input
                type="url"
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your website URL for comprehensive SEO analysis (e.g., https://yourcompany.com)"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={performSEOAnalysis}
              disabled={isAnalyzing}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze SEO
                </>
              )}
            </motion.button>
          </div>

          {/* SEO Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seoMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-slate-700 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${metric.color}`} />
                    <span className="text-green-400 text-sm font-semibold">{metric.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                  {metric.max && (
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`bg-gradient-to-r ${
                          metric.value >= 90 ? 'from-green-500 to-emerald-500' :
                          metric.value >= 70 ? 'from-yellow-500 to-orange-500' :
                          'from-red-500 to-pink-500'
                        } h-2 rounded-full`}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* SEO Audits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            SEO Audit Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seoAudits.map((audit, index) => {
              const IconComponent = audit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-slate-800 rounded-xl p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-gradient-to-r ${audit.color} rounded-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{audit.category}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{audit.score}</span>
                        <span className="text-gray-400">/100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {audit.issues.map((issue, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-slate-700 rounded">
                        {getIssueIcon(issue.type)}
                        <span className="text-gray-300 text-sm">{issue.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Keyword Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Keyword Rankings</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-gray-300 py-3">Keyword</th>
                  <th className="text-center text-gray-300 py-3">Position</th>
                  <th className="text-center text-gray-300 py-3">Change</th>
                  <th className="text-center text-gray-300 py-3">Volume</th>
                  <th className="text-center text-gray-300 py-3">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {keywordRankings.map((keyword, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="border-b border-slate-700/50"
                  >
                    <td className="py-4 text-white font-medium">{keyword.keyword}</td>
                    <td className="py-4 text-center">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        #{keyword.position}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      {getChangeIcon(keyword.change)}
                    </td>
                    <td className="py-4 text-center text-gray-300">{keyword.volume}</td>
                    <td className="py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        keyword.difficulty === 'high' ? 'bg-red-500/20 text-red-400' :
                        keyword.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {keyword.difficulty.toUpperCase()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">AI-Powered Recommendations</h3>
          
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => {
              const IconComponent = rec.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg"
                >
                  <div className="p-2 bg-blue-500/20 rounded">
                    <IconComponent className="w-5 h-5 text-blue-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{rec.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{rec.impact}</div>
                    <div className="text-gray-400 text-sm">{rec.effort} effort</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Search Engine Domination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Search Engine Domination
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Achieve top rankings with AI-powered SEO optimization. Advanced keyword research, 
            competitor analysis, and intelligent recommendations for maximum search visibility.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Pro
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Report
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SEOAIOptimizer;
