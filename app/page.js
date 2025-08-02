'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain, Zap, Globe, Users, Star, ArrowRight, Play, Award, 
  Target, Rocket, Sparkles, TrendingUp, Shield, Code, 
  Palette, MessageSquare, BarChart, Camera, Mic, Bot
} from 'lucide-react';
import { HeroSection, GlassCard, AdvancedButton, StatsCard, ServiceCard } from '../components/ui/AdvancedDesignSystem';

export default function HomePage() {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { title: 'AI Services', value: '10+', icon: Brain },
    { title: 'Active Users', value: '50K+', icon: Users },
    { title: 'Success Rate', value: '99.9%', icon: Target },
    { title: 'Countries', value: '180+', icon: Globe }
  ];

  const ultimateServices = [
    {
      id: 'ai-chatbot',
      title: 'AI Chatbot Pro',
      description: 'Advanced conversational AI with natural language processing and emotional intelligence',
      icon: MessageSquare,
      status: 'running',
      metrics: [
        { label: 'Uptime', value: '99.9%' },
        { label: 'Response', value: '0.3s' }
      ]
    },
    {
      id: 'content-generator',
      title: 'Content Creator AI',
      description: 'Generate high-quality content, blogs, and marketing materials with AI precision',
      icon: Palette,
      status: 'running',
      metrics: [
        { label: 'Generated', value: '125K+' },
        { label: 'Quality', value: '98%' }
      ]
    },
    {
      id: 'analytics-engine',
      title: 'Analytics Engine',
      description: 'Real-time data processing and business intelligence with predictive insights',
      icon: BarChart,
      status: 'running',
      metrics: [
        { label: 'Data Points', value: '1M+' },
        { label: 'Accuracy', value: '96%' }
      ]
    },
    {
      id: 'code-generator',
      title: 'Code Generator Pro',
      description: 'AI-powered code generation for multiple programming languages and frameworks',
      icon: Code,
      status: 'running',
      metrics: [
        { label: 'Languages', value: '25+' },
        { label: 'Success', value: '94%' }
      ]
    },
    {
      id: 'image-ai',
      title: 'Image AI Studio',
      description: 'Advanced image processing, generation, and enhancement using cutting-edge AI',
      icon: Camera,
      status: 'running',
      metrics: [
        { label: 'Processed', value: '500K+' },
        { label: 'Quality', value: '99%' }
      ]
    },
    {
      id: 'voice-ai',
      title: 'Voice AI Assistant',
      description: 'Natural voice synthesis and recognition with multilingual support',
      icon: Mic,
      status: 'running',
      metrics: [
        { label: 'Languages', value: '50+' },
        { label: 'Accuracy', value: '97%' }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center"
    >
      {/* Hero Section */}
      <HeroSection
        title="Aranya One"
        subtitle="Ultimate AI Platform"
        description="Revolutionizing the digital world with 10+ advanced AI services, cutting-edge technology, and world-class performance. Experience the future of artificial intelligence today."
        actions={[
          {
            label: 'Explore Services',
            icon: Rocket,
            variant: 'primary',
            onClick: () => window.location.href = '/services'
          },
          {
            label: 'Watch Demo',
            icon: Play,
            variant: 'outline',
            onClick: () => window.location.href = '/about'
          }
        ]}
        className="text-center text-white"
      />

      {/* Animated Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powering Innovation Worldwide
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Join millions of users who trust Aranya One for their AI-powered solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatsCard
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  change={index === currentStat ? '+12%' : undefined}
                  className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate Services Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ultimate AI Services
              </h2>
              <Sparkles className="w-8 h-8 text-yellow-400 ml-3" />
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the next generation of AI-powered tools designed for professionals and enterprises
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ultimateServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  status={service.status}
                  metrics={service.metrics}
                  icon={service.icon}
                  onAction={() => window.location.href = `/services/${service.id}`}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <AdvancedButton 
              size="lg" 
              icon={ArrowRight}
              onClick={() => window.location.href = '/services'}
              className="mt-10 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
            >
              View All Services
            </AdvancedButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Aranya One?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Built with cutting-edge technology and designed for the future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level security with end-to-end encryption and compliance with global standards'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized performance with sub-second response times and 99.9% uptime guarantee'
              },
              {
                icon: Brain,
                title: 'AI-Powered',
                description: 'Advanced machine learning algorithms that continuously improve and adapt to your needs'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <GlassCard className="p-8 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Join thousands of companies already using Aranya One to power their AI initiatives
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <AdvancedButton 
                  size="lg" 
                  icon={Rocket}
                  onClick={() => window.location.href = '/pricing'}
                >
                  Get Started Today
                </AdvancedButton>
                <AdvancedButton 
                  size="lg" 
                  variant="outline"
                  icon={MessageSquare}
                  onClick={() => window.location.href = '/contact'}
                >
                  Talk to Sales
                </AdvancedButton>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Aranya One</h3>
              <p className="text-white/70">
                The ultimate AI platform for the next generation of digital innovation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/services" className="hover:text-white transition-colors">AI Services</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
                <li><Link href="/ai-tools" className="hover:text-white transition-colors">AI Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/founder" className="hover:text-white transition-colors">Founder</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            <p>© 2025 Aranya One. All rights reserved. Built with ❤️ for the future.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
