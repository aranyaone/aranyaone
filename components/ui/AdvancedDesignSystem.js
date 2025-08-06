'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Hero Section Component
export const HeroSection = ({ children, className = "" }) => {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden animate-gradient ${className}`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30"></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
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
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
};

// Glass Card Component
export const GlassCard = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
      className={`glass-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Advanced Button Component
export const AdvancedButton = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon: Icon,
  className = "",
  onClick,
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 justify-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl",
    outline: "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50",
    ghost: "text-white hover:bg-white/10"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

// Stats Card Component
export const StatsCard = ({ title, value, icon: Icon, className = "" }) => {
  return (
    <GlassCard className={`p-6 text-center ${className}`}>
      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
        {Icon && <Icon className="w-6 h-6 text-blue-400" />}
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-white/70 text-sm">{title}</div>
    </GlassCard>
  );
};

// Service Card Component
export const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  status = "active",
  className = "" 
}) => {
  return (
    <GlassCard className={`p-6 h-full group cursor-pointer ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          {Icon && <Icon className="w-6 h-6 text-blue-400" />}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'active' ? 'bg-green-500/20 text-green-400' : 
          status === 'beta' ? 'bg-yellow-500/20 text-yellow-400' : 
          'bg-gray-500/20 text-gray-400'
        }`}>
          {status}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      
      <p className="text-white/70 mb-4 flex-grow">
        {description}
      </p>
      
      <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
        <span className="text-sm font-medium">Explore Service</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </GlassCard>
  );
};

// Feature Card Component
export const FeatureCard = ({ title, description, icon: Icon, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 ${className}`}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
        {Icon && <Icon className="w-6 h-6 text-blue-400" />}
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </motion.div>
  );
};

// Gradient Text Component
export const GradientText = ({ children, className = "" }) => {
  return (
    <span className={`bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`${sizes[size]} border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin ${className}`}></div>
  );
};

export default {
  HeroSection,
  GlassCard,
  AdvancedButton,
  StatsCard,
  ServiceCard,
  FeatureCard,
  GradientText,
  LoadingSpinner
};
