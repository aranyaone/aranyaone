'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain, MessageSquare, Palette, BarChart, Code, Camera, 
  Mic, Shield, Zap, Globe, Star, ArrowRight, Play,
  TrendingUp, Users, Target, CheckCircle, Sparkles,
  Rocket, Award, Heart, Monitor
} from 'lucide-react';
import { HeroSection, GlassCard, AdvancedButton, ServiceCard } from '../../components/ui/AdvancedDesignSystem';

export default function ServicesPage() {
  const categories = [
    { id: 'ai-intelligence', name: 'AI Intelligence', icon: Brain, color: 'from-blue-500 to-cyan-500' },
    { id: 'content-creation', name: 'Content Creation', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { id: 'analytics', name: 'Analytics & Data', icon: BarChart, color: 'from-green-500 to-emerald-500' },
    { id: 'automation', name: 'Automation', icon: Zap, color: 'from-orange-500 to-red-500' }
  ];

  const premiumServices = [
    {
      id: 'visual-mind-map',
      title: 'Visual Mind Mapping',
      description: 'AI-powered visual mind mapping tool for 10x faster learning, collaboration, and idea visualization',
      category: 'productivity',
      icon: Brain,
      status: 'running',
      tier: 'premium',
      metrics: [
        { label: 'Active Maps', value: '50K+' },
        { label: 'Learning Speed', value: '10x Faster' },
        { label: 'Collaboration', value: 'Real-time' },
        { label: 'Templates', value: '100+' }
      ],
      features: [
        'AI-Powered Generation',
        'Real-time Collaboration',
        'Visual Learning',
        'Custom Templates',
        'Export Options',
        'Google Drive Integration'
      ],
      pricing: {
        starter: '$19/month',
        pro: '$49/month',
        enterprise: 'Custom'
      }
    },
    {
      id: 'ai-chatbot',
      title: 'AI Chatbot Pro',
      description: 'Advanced conversational AI with natural language processing, emotional intelligence, and multi-language support',
      category: 'ai-intelligence',
      icon: MessageSquare,
      status: 'running',
      tier: 'premium',
      metrics: [
        { label: 'Uptime', value: '99.9%' },
        { label: 'Response Time', value: '0.3s' },
        { label: 'Languages', value: '50+' },
        { label: 'Conversations', value: '2M+' }
      ],
      features: [
        'Natural Language Understanding',
        'Emotional Intelligence',
        'Multi-language Support',
        'Custom Training',
        '24/7 Availability',
        'API Integration'
      ],
      pricing: {
        starter: '$29/month',
        pro: '$99/month',
        enterprise: 'Custom'
      }
    },
    {
      id: 'content-generator',
      title: 'Content Creator AI',
      description: 'Generate high-quality content, blogs, marketing materials, and social media posts with AI precision',
      category: 'content-creation',
      icon: Palette,
      status: 'running',
      tier: 'premium',
      metrics: [
        { label: 'Content Generated', value: '125K+' },
        { label: 'Quality Score', value: '98%' },
        { label: 'Templates', value: '500+' },
        { label: 'Users', value: '25K+' }
      ],
      features: [
        'Blog Post Generation',
        'Social Media Content',
        'Marketing Copy',
        'SEO Optimization',
        'Multiple Formats',
        'Brand Voice Training'
      ],
      pricing: {
        starter: '$19/month',
        pro: '$69/month',
        enterprise: 'Custom'
      }
    },
    {
      id: 'analytics-engine',
      title: 'Analytics Engine Pro',
      description: 'Real-time data processing, business intelligence, and predictive analytics with advanced visualization',
      category: 'analytics',
      icon: BarChart,
      status: 'running',
      tier: 'premium',
      metrics: [
        { label: 'Data Points', value: '1M+' },
        { label: 'Accuracy', value: '96%' },
        { label: 'Reports', value: '10K+' },
        { label: 'Dashboards', value: '500+' }
      ],
      features: [
        'Real-time Analytics',
        'Predictive Modeling',
        'Custom Dashboards',
        'Data Visualization',
        'API Access',
        'Export Capabilities'
      ],
      pricing: {
        starter: '$39/month',
        pro: '$149/month',
        enterprise: 'Custom'
      }
    },
    {
      id: 'code-generator',
      title: 'Code Generator Pro',
      description: 'AI-powered code generation for multiple programming languages, frameworks, and development workflows',
      category: 'automation',
      icon: Code,
      status: 'running',
      tier: 'premium',
      metrics: [
        { label: 'Languages', value: '25+' },
        { label: 'Success Rate', value: '94%' },
        { label: 'Code Generated', value: '500K+' },
        { label: 'Developers', value: '15K+' }
      ],
      features: [
        'Multi-language Support',
        'Framework Integration',
        'Code Optimization',
        'Documentation Generation',
        'Testing Automation',
        'Version Control'
      ],
      pricing: {
        starter: '$49/month',
        pro: '$129/month',
        enterprise: 'Custom'
      }
    },
    {
      id: 'image-ai',
      title: 'Image AI Studio',
      description: 'Advanced image processing, generation, enhancement, and creative tools using cutting-edge AI technology',
      category: 'content-creation',
      icon: Camera,
      status: 'running',
      tier: 'premium',
      metrics: [
        { label: 'Images Processed', value: '500K+' },
        { label: 'Quality Score', value: '99%' },
        { label: 'Formats', value: '20+' },
        { label: 'Artists', value: '12K+' }
      ],
      features: [
        'Image Generation',
        'Style Transfer',
        'Enhancement Tools',
        'Background Removal',
        'Batch Processing',
        'API Integration'
      ],
      pricing: {
        starter: '$24/month',
        pro: '$79/month',
        enterprise: 'Custom'
      }
    },
    {
      id: 'voice-ai',
      title: 'Voice AI Assistant',
      description: 'Natural voice synthesis, recognition, and processing with multilingual support and emotional intelligence',
      category: 'ai-intelligence',
      icon: Mic,
      status: 'running',
      tier: 'premium',
      metrics: [
        { label: 'Languages', value: '50+' },
        { label: 'Accuracy', value: '97%' },
        { label: 'Voice Hours', value: '100K+' },
        { label: 'Applications', value: '1K+' }
      ],
      features: [
        'Speech Recognition',
        'Voice Synthesis',
        'Emotion Detection',
        'Multi-language',
        'Real-time Processing',
        'Custom Voices'
      ],
      pricing: {
        starter: '$34/month',
        pro: '$99/month',
        enterprise: 'Custom'
      }
    }
  ];

  const serviceStats = [
    { number: '10+', label: 'AI Services', icon: Brain },
    { number: '600+', label: 'AI Mechanisms', icon: Zap },
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '99.9%', label: 'Uptime', icon: Target }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex flex-col items-center justify-center"
    >
      {/* Hero Section */}
      <HeroSection
        title="Ultimate AI Services"
        subtitle="Experience the next generation of AI-powered tools designed for professionals and enterprises"
        className="text-center text-white"
      />

      {/* Service Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Service Categories
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Organized solutions for every business need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <GlassCard className="p-8 text-center h-full cursor-pointer">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{category.name}</h3>
                  <p className="text-white/70 text-sm">
                    Advanced {category.name.toLowerCase()} solutions powered by cutting-edge AI technology
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services Grid */}
      <section id="services-grid" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium AI Services
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Enterprise-grade AI solutions with professional support and advanced features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <GlassCard className="p-8 h-full hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300">
                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {service.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-sm capitalize">{service.status}</span>
                          <span className="text-purple-400 text-sm ml-2 px-2 py-1 bg-purple-500/20 rounded-lg">
                            {service.tier}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-white/70 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {service.metrics.slice(0, 4).map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="text-blue-400 font-bold text-lg">{metric.value}</div>
                        <div className="text-white/60 text-xs">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="text-white/70 text-sm mb-2">Starting from</div>
                    <div className="text-2xl font-bold text-white">{service.pricing.starter}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <AdvancedButton 
                      size="sm" 
                      icon={ArrowRight}
                      onClick={() => window.location.href = `/${service.id}`}
                      className="flex-1"
                    >
                      Try Now
                    </AdvancedButton>
                    <AdvancedButton 
                      size="sm" 
                      variant="outline"
                      icon={Monitor}
                      onClick={() => window.location.href = `/services/${service.id}`}
                    >
                      Demo
                    </AdvancedButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Statistics */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Platform Statistics
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Real-time metrics from our AI services ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {serviceStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Choose the perfect AI solution for your business needs and start transforming your operations today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <AdvancedButton 
                  size="lg" 
                  icon={Rocket}
                  onClick={() => window.location.href = '/pricing'}
                >
                  View All Plans
                </AdvancedButton>
                <AdvancedButton 
                  size="lg" 
                  variant="outline"
                  icon={Heart}
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Custom Quote
                </AdvancedButton>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </motion.div>
  );
}
