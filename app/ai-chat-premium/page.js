"use client";
import React from 'react';
import ToolPage from '../components/ToolPage';
import { MessageCircle, Brain, Zap, Shield, Globe, Users, Clock, Target, Sparkles, Crown } from 'lucide-react';

const AIChatPremiumPage = () => {
  const toolData = {
    toolName: "Super AI Chat",
    toolDescription: "Advanced conversational AI with memory, context, and multi-modal capabilities that evolves with every conversation.",
    toolIcon: MessageCircle,
    toolColor: "from-blue-400 to-purple-400",
    features: [
      {
        icon: Brain,
        title: "Context Memory",
        description: "Intelligent conversation flow with long-term memory and context understanding"
      },
      {
        icon: Globe,
        title: "Multi-Language",
        description: "Support for 50+ languages with real-time translation"
      },
      {
        icon: Zap,
        title: "Real-Time Learning",
        description: "Continuously improves responses based on user interactions"
      },
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-level encryption and compliance with all major standards"
      },
      {
        icon: Users,
        title: "Team Collaboration",
        description: "Share conversations and collaborate with team members"
      },
      {
        icon: Clock,
        title: "24/7 Availability",
        description: "Always available with 99.9% uptime guarantee"
      }
    ],
    benefits: [
      {
        title: "10x Faster Responses",
        description: "Advanced AI models provide instant, intelligent responses"
      },
      {
        title: "Context-Aware Conversations",
        description: "Remembers previous conversations and maintains context"
      },
      {
        title: "Multi-Modal Support",
        description: "Handle text, voice, images, and documents seamlessly"
      },
      {
        title: "Custom Training",
        description: "Train the AI on your specific domain and requirements"
      }
    ],
    pricing: [
      {
        name: "Free",
        price: 0,
        color: "from-gray-400 to-gray-600",
        features: [
          "100 messages/month",
          "Basic AI models",
          "Community support",
          "Standard response time"
        ]
      },
      {
        name: "Starter",
        price: 29,
        color: "from-blue-400 to-purple-400",
        features: [
          "1,000 messages/month",
          "Advanced AI models",
          "Priority support",
          "Fast response time",
          "Custom training"
        ]
      },
      {
        name: "Professional",
        price: 79,
        color: "from-purple-400 to-pink-400",
        features: [
          "Unlimited messages",
          "All AI models",
          "24/7 support",
          "Instant responses",
          "Advanced customization",
          "Team collaboration"
        ]
      }
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        title: "Product Manager",
        comment: "The AI Chat has transformed how we handle customer support. It's incredibly intelligent and learns from every interaction.",
        rating: 5
      },
      {
        name: "Michael Chen",
        title: "Software Engineer",
        comment: "The context memory feature is amazing. It remembers our entire conversation history and provides relevant responses.",
        rating: 5
      },
      {
        name: "Emily Rodriguez",
        title: "Marketing Director",
        comment: "We use it for content creation and customer engagement. The multi-language support is a game-changer.",
        rating: 5
      }
    ],
    subscriptionRequired: true,
    currentPlan: "free"
  };

  return <ToolPage {...toolData} />;
};

export default AIChatPremiumPage; 