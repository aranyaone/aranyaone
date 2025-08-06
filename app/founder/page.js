'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, Star, Users, Globe, Linkedin, Twitter, Github, 
  Mail, MapPin, Calendar, Briefcase, GraduationCap,
  Lightbulb, Target, Heart, Zap, Crown, Quote
} from 'lucide-react';
import { GlassCard, AdvancedButton } from '../../components/ui/AdvancedDesignSystem';
import { companyInfo, testimonials } from '../../data/company-info';

export default function FounderPage() {
  const { founder, statistics } = companyInfo;

  const timeline = [
    { year: '2015', event: 'Started journey in AI research at Stanford', icon: GraduationCap },
    { year: '2018', event: 'Led AI team at Fortune 500 company', icon: Briefcase },
    { year: '2021', event: 'Founded Aranya One AI with vision to democratize AI', icon: Lightbulb },
    { year: '2023', event: 'Launched revolutionary Multi-LLM platform', icon: Zap },
    { year: '2024', event: 'Reached 50,000+ users globally', icon: Crown }
  ];

  const achievements = [
    { number: statistics.activeUsers, label: 'Users Empowered', icon: Users },
    { number: statistics.aiServices, label: 'AI Services Built', icon: Target },
    { number: statistics.countriesServed, label: 'Countries Reached', icon: Globe },
    { number: statistics.customerSatisfaction, label: 'Satisfaction Rate', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30"></div>
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="relative inline-block">
                <div className="w-80 h-80 mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-white/20">
                  <Image
                    src="/founder.svg"
                    alt="Shubham Mishra - CEO & Founder"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Professional Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Founder Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                {founder.name}
              </h1>
              <h2 className="text-2xl md:text-3xl text-white mb-6 font-light">
                {founder.title}
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {founder.bio}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                {founder.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-white border border-white/20 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <AdvancedButton
                  size="sm"
                  icon={Linkedin}
                  onClick={() => window.open(companyInfo.social.linkedin, '_blank')}
                >
                  LinkedIn
                </AdvancedButton>
                <AdvancedButton
                  size="sm"
                  variant="outline"
                  icon={Twitter}
                  onClick={() => window.open(companyInfo.social.twitter, '_blank')}
                >
                  Twitter
                </AdvancedButton>
                <AdvancedButton
                  size="sm"
                  variant="outline"
                  icon={Mail}
                  onClick={() => window.location.href = `mailto:${companyInfo.contact.email}`}
                >
                  Email
                </AdvancedButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Founder's Journey
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From AI research to building a global platform that empowers thousands
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-6 h-6 text-blue-400" />
                      <span className="text-blue-400 font-bold text-lg">{item.year}</span>
                    </div>
                    <p className="text-white">{item.event}</p>
                  </GlassCard>
                </div>
                
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900"></div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Impact & Achievements
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Building solutions that make a real difference in people's lives and businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <achievement.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{achievement.number}</div>
                  <div className="text-white/70">{achievement.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Leaders Say
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Trusted by industry leaders and innovators worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <GlassCard className="p-8 h-full">
                  <Quote className="w-12 h-12 text-blue-400 mb-6" />
                  <p className="text-white/90 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-white font-bold">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
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
                Join thousands of businesses already using Aranya One AI to revolutionize their operations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <AdvancedButton 
                  size="lg" 
                  icon={Zap}
                  onClick={() => window.location.href = '/pricing'}
                >
                  Start Your AI Journey
                </AdvancedButton>
                <AdvancedButton 
                  size="lg" 
                  variant="outline"
                  icon={Mail}
                  onClick={() => window.location.href = '/contact'}
                >
                  Schedule a Call
                </AdvancedButton>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
