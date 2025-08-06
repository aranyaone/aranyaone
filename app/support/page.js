"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MessageCircle, BookOpen, Video, FileText,
  Zap, Brain, Users, Clock, Star, CheckCircle,
  ArrowRight, ChevronDown, ChevronUp, PlayCircle
} from 'lucide-react';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'getting-started', name: 'Getting Started', icon: PlayCircle },
    { id: 'ai-features', name: 'AI Features', icon: Brain },
    { id: 'billing', name: 'Billing & Payments', icon: FileText },
    { id: 'technical', name: 'Technical Issues', icon: Zap },
    { id: 'account', name: 'Account Management', icon: Users }
  ];

  const knowledgeBase = [
    {
      id: 'getting-started',
      title: 'Getting Started with Bujji Chat',
      description: 'Learn how to set up your account and start your first conversation',
      articles: [
        { title: 'Creating Your Account', time: '5 min read', difficulty: 'Beginner' },
        { title: 'Your First AI Conversation', time: '3 min read', difficulty: 'Beginner' },
        { title: 'Understanding AI Responses', time: '7 min read', difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'ai-features',
      title: 'Advanced AI Features',
      description: 'Master the powerful AI capabilities of Bujji Chat',
      articles: [
        { title: 'Emotional Intelligence', time: '8 min read', difficulty: 'Intermediate' },
        { title: 'Context Memory', time: '6 min read', difficulty: 'Intermediate' },
        { title: 'Multi-modal Conversations', time: '10 min read', difficulty: 'Advanced' }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      description: 'Everything about payments, subscriptions, and billing',
      articles: [
        { title: 'Subscription Plans', time: '4 min read', difficulty: 'Beginner' },
        { title: 'Payment Methods', time: '3 min read', difficulty: 'Beginner' },
        { title: 'Billing History', time: '5 min read', difficulty: 'Intermediate' }
      ]
    }
  ];

  const faqs = [
    {
      question: "How does Bujji Chat's emotional intelligence work?",
      answer: "Bujji Chat uses advanced natural language processing and sentiment analysis to understand the emotional context of your messages. It can detect emotions like happiness, sadness, frustration, or excitement and responds appropriately with empathy and understanding."
    },
    {
      question: "Is my conversation data secure and private?",
      answer: "Yes, we take your privacy seriously. All conversations are encrypted end-to-end, and we never share your data with third parties. You can also delete your conversation history at any time from your account settings."
    },
    {
      question: "Can I use Bujji Chat for business purposes?",
      answer: "Absolutely! Bujji Chat offers business plans with advanced features like team collaboration, analytics, and API access. Our AI can help with customer support, content creation, and business analysis."
    },
    {
      question: "What makes Bujji Chat different from other AI platforms?",
      answer: "Bujji Chat focuses specifically on emotional intelligence and human-like conversations. Unlike other AI platforms that are purely functional, Bujji Chat understands context, remembers conversations, and responds with genuine empathy and personality."
    },
    {
      question: "How do I upgrade my subscription plan?",
      answer: "You can upgrade your plan anytime from your account dashboard. Simply go to Settings > Subscription and choose the plan that best fits your needs. Changes take effect immediately."
    }
  ];

  const videoTutorials = [
    {
      title: "Getting Started Guide",
      duration: "5:32",
      thumbnail: "/tutorial-1.jpg",
      description: "Complete walkthrough of setting up your account"
    },
    {
      title: "Advanced AI Features",
      duration: "8:15",
      thumbnail: "/tutorial-2.jpg",
      description: "Learn to use emotional intelligence features"
    },
    {
      title: "Business Integration",
      duration: "12:45",
      thumbnail: "/tutorial-3.jpg",
      description: "How to integrate Bujji Chat into your business"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <MessageCircle className="w-16 h-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Support Center
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Find answers, learn features, and get help with our comprehensive support system
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for help articles, tutorials, or FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse by Category</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500/20 border-2 border-blue-400'
                    : 'bg-white/10 backdrop-blur-lg hover:bg-white/20'
                }`}
              >
                <category.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-white text-sm font-medium">{category.name}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Knowledge Base</h2>
            <p className="text-gray-300">Comprehensive guides and tutorials to help you master Bujji Chat</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {knowledgeBase.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                <p className="text-gray-300 mb-6">{section.description}</p>
                
                <div className="space-y-4">
                  {section.articles.map((article, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{article.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{article.time}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            article.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            article.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {article.difficulty}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-400" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Video Tutorials</h2>
            <p className="text-gray-300">Watch step-by-step guides to master Bujji Chat</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTutorials.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white" />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-300">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300">Quick answers to common questions</p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-blue-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-Pilot Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI-Powered Support</h2>
            <p className="text-gray-300">Our intelligent support system learns and improves automatically</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
            >
              <Brain className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Smart Suggestions</h3>
              <p className="text-gray-300 mb-6">AI analyzes your issue and suggests the most relevant solutions instantly.</p>
              <div className="text-sm text-blue-400">Instant Help</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
            >
              <Zap className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Auto-Learning</h3>
              <p className="text-gray-300 mb-6">Our support system learns from every interaction to provide better help.</p>
              <div className="text-sm text-green-400">Always Improving</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
            >
              <Clock className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">24/7 Availability</h3>
              <p className="text-gray-300 mb-6">Get help anytime, anywhere with our always-on AI support system.</p>
              <div className="text-sm text-purple-400">Always Available</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our human support team is here to help with complex issues and personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold rounded-xl hover:scale-105 transition">
                Contact Support
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-xl hover:bg-white/20 transition">
                Live Chat
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 