"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Search, Filter, Calendar, User, 
  Eye, Heart, Share2, ArrowRight, TrendingUp,
  Zap, Brain, Globe, Star, Clock, Tag
} from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen },
    { id: 'ai-news', name: 'AI News', icon: Brain },
    { id: 'tutorials', name: 'Tutorials', icon: Zap },
    { id: 'updates', name: 'Updates', icon: TrendingUp },
    { id: 'insights', name: 'Insights', icon: Globe },
    { id: 'community', name: 'Community', icon: User }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Emotional AI: How Bujji Chat is Revolutionizing Human-AI Interaction",
      excerpt: "Discover how our advanced emotional intelligence algorithms are creating more human-like AI conversations that understand context, emotions, and personality.",
      author: "King Srinivas",
      date: "2024-01-15",
      category: "ai-news",
      readTime: "8 min read",
      views: 12450,
      likes: 892,
      featured: true,
      tags: ["AI", "Emotional Intelligence", "Technology"]
    },
    {
      id: 2,
      title: "Building Your Empire with AI: A Complete Guide to Business Automation",
      excerpt: "Learn how to leverage Bujji Chat's AI tools to automate your business processes, increase productivity, and scale your operations efficiently.",
      author: "Dr. Sarah Chen",
      date: "2024-01-12",
      category: "tutorials",
      readTime: "12 min read",
      views: 8920,
      likes: 567,
      featured: false,
      tags: ["Business", "Automation", "Productivity"]
    },
    {
      id: 3,
      title: "New Features Alert: Advanced Voice Recognition and Multi-Modal AI",
      excerpt: "We're excited to announce our latest features including advanced voice recognition, multi-modal AI capabilities, and enhanced security protocols.",
      author: "Alex Rodriguez",
      date: "2024-01-10",
      category: "updates",
      readTime: "5 min read",
      views: 15670,
      likes: 1234,
      featured: true,
      tags: ["Updates", "Voice AI", "Security"]
    },
    {
      id: 4,
      title: "The Psychology Behind AI Conversations: Why Emotional Intelligence Matters",
      excerpt: "Explore the psychological aspects of human-AI interaction and why emotional intelligence is crucial for creating meaningful AI experiences.",
      author: "Dr. Sarah Chen",
      date: "2024-01-08",
      category: "insights",
      readTime: "10 min read",
      views: 7430,
      likes: 445,
      featured: false,
      tags: ["Psychology", "AI Ethics", "Research"]
    },
    {
      id: 5,
      title: "Community Spotlight: How Our Users Are Building Amazing AI Solutions",
      excerpt: "Meet some of our incredible users who are creating innovative solutions using Bujji Chat's AI platform and learn from their success stories.",
      author: "Community Team",
      date: "2024-01-05",
      category: "community",
      readTime: "7 min read",
      views: 6230,
      likes: 334,
      featured: false,
      tags: ["Community", "Success Stories", "Innovation"]
    },
    {
      id: 6,
      title: "AI Ethics and Responsibility: Our Commitment to Safe AI Development",
      excerpt: "Learn about our approach to responsible AI development, ethical considerations, and how we ensure our AI systems benefit humanity.",
      author: "King Srinivas",
      date: "2024-01-03",
      category: "ai-news",
      readTime: "9 min read",
      views: 11200,
      likes: 789,
      featured: false,
      tags: ["AI Ethics", "Responsibility", "Safety"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'popular') return b.views - a.views;
    if (sortBy === 'likes') return b.likes - a.likes;
    return 0;
  });

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
              <BookOpen className="w-16 h-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bujji Blog
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Insights, updates, and stories from the world of AI and emotional intelligence
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-lg border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500/20 border-2 border-blue-400'
                    : 'bg-white/10 backdrop-blur-lg hover:bg-white/20'
                }`}
              >
                <category.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-white text-xs font-medium">{category.name}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Featured Articles
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedPosts.filter(post => post.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                    {post.category.replace('-', ' ').toUpperCase()}
                  </span>
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{post.title}</h3>
                <p className="text-gray-300 mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Latest Articles
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.filter(post => !post.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                    {post.category.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{post.title}</h3>
                <p className="text-gray-300 mb-6 text-sm">{post.excerpt}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition text-sm">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/30"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-gray-300 mb-8">
                Get the latest AI insights, updates, and exclusive content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold rounded-xl hover:scale-105 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Auto-Pilot Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              AI-Powered Content
            </h2>
            <p className="text-xl text-gray-300">
              Our content is generated and curated by advanced AI systems
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
            >
              <Brain className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">AI-Generated Content</h3>
              <p className="text-gray-300 mb-6">Our AI systems create engaging, informative content based on trending topics and user interests.</p>
              <div className="text-sm text-blue-400">Automated Creation</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
            >
              <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Trend Analysis</h3>
              <p className="text-gray-300 mb-6">AI analyzes trending topics and creates content that resonates with our audience.</p>
              <div className="text-sm text-green-400">Smart Curation</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
            >
              <Zap className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Personalized Experience</h3>
              <p className="text-gray-300 mb-6">Content is personalized based on your interests, reading history, and preferences.</p>
              <div className="text-sm text-purple-400">Smart Recommendations</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 