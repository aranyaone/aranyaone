'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield, 
  Rocket,
  Sparkles,
  Bot,
  Code,
  Database,
  Network
} from 'lucide-react';

const AdvancedAI = () => {
  const [activeModel, setActiveModel] = useState('gpt4');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [prompt, setPrompt] = useState('');

  const aiModels = [
    {
      id: 'gpt4',
      name: 'GPT-4 Turbo',
      description: 'Most advanced language model',
      icon: Brain,
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'claude',
      name: 'Claude 3.5 Sonnet',
      description: 'Advanced reasoning & analysis',
      icon: Cpu,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'gemini',
      name: 'Gemini Pro',
      description: 'Google\'s multimodal AI',
      icon: Sparkles,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'quantum',
      name: 'Quantum AI',
      description: 'Next-generation processing',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const aiCapabilities = [
    {
      title: 'Natural Language Processing',
      description: 'Advanced text understanding and generation',
      icon: Bot,
      progress: 98
    },
    {
      title: 'Code Generation',
      description: 'AI-powered programming assistance',
      icon: Code,
      progress: 95
    },
    {
      title: 'Data Analysis',
      description: 'Intelligent insights from complex data',
      icon: Database,
      progress: 92
    },
    {
      title: 'Neural Networks',
      description: 'Deep learning and pattern recognition',
      icon: Network,
      progress: 96
    }
  ];

  const handleAIRequest = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const responses = {
        gpt4: `GPT-4 Analysis: ${prompt}\n\nThis is a sophisticated analysis using advanced natural language processing. The request has been processed with state-of-the-art transformer architecture.`,
        claude: `Claude 3.5 Analysis: ${prompt}\n\nProviding detailed reasoning and analytical insights. This response demonstrates advanced cognitive capabilities and nuanced understanding.`,
        gemini: `Gemini Pro Analysis: ${prompt}\n\nMultimodal AI processing complete. Leveraging Google's advanced machine learning infrastructure for comprehensive analysis.`,
        quantum: `Quantum AI Analysis: ${prompt}\n\nQuantum-enhanced processing utilizing next-generation computational paradigms for unprecedented analytical depth.`
      };
      
      setAiResponse(responses[activeModel]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Advanced AI Engine
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Harness the power of multiple AI models with our advanced intelligence platform. 
              Experience next-generation AI capabilities at your fingertips.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* AI Model Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Choose Your AI Model
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiModels.map((model) => {
              const IconComponent = model.icon;
              return (
                <motion.div
                  key={model.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveModel(model.id)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeModel === model.id
                      ? 'bg-gradient-to-r ' + model.color + ' text-white shadow-lg'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  <IconComponent className="w-8 h-8 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{model.name}</h3>
                  <p className="text-sm opacity-90">{model.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6">AI Command Center</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Enter your prompt:</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything about AI, technology, business strategies, coding solutions, content creation, or any complex problem you need help solving..."
                className="w-full h-32 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAIRequest}
              disabled={isProcessing || !prompt.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-5 h-5" />
                  </motion.div>
                  Processing with AI...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  Execute AI Request
                </>
              )}
            </motion.button>
          </div>

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-6 bg-slate-700 rounded-lg"
            >
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Response
              </h4>
              <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                {aiResponse}
              </pre>
            </motion.div>
          )}
        </motion.div>

        {/* AI Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            AI Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiCapabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-slate-800 rounded-xl p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{capability.title}</h4>
                      <p className="text-gray-400 text-sm">{capability.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300 text-sm">Performance</span>
                      <span className="text-purple-400 font-semibold">{capability.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${capability.progress}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'AI Models', value: '4+', icon: Brain },
            { label: 'Processing Speed', value: '99.9%', icon: Zap },
            { label: 'Accuracy Rate', value: '98.5%', icon: Target },
            { label: 'Uptime', value: '99.99%', icon: Shield }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-slate-800 rounded-xl p-6 text-center">
                <IconComponent className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAI;
