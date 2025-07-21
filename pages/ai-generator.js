import Head from 'next/head'
import { useState } from 'react'

export default function AIContentGenerator() {
  const [selectedTool, setSelectedTool] = useState('website')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [prompt, setPrompt] = useState('')

  const tools = [
    {
      id: 'website',
      name: 'Website Builder',
      icon: '🌐',
      description: 'Generate complete responsive websites with AI',
      placeholder: 'Describe your website idea (e.g., modern restaurant website with online booking)'
    },
    {
      id: 'component',
      name: 'React Components',
      icon: '⚛️',
      description: 'Create custom React components instantly',
      placeholder: 'Describe the component (e.g., animated pricing card with hover effects)'
    },
    {
      id: 'api',
      name: 'API Builder',
      icon: '🔌',
      description: 'Generate REST APIs and database schemas',
      placeholder: 'Describe your API (e.g., user management system with JWT authentication)'
    },
    {
      id: 'design',
      name: 'UI/UX Design',
      icon: '🎨',
      description: 'Create design systems and style guides',
      placeholder: 'Describe your design needs (e.g., dark theme dashboard with purple accents)'
    },
    {
      id: 'content',
      name: 'Content Writing',
      icon: '✍️',
      description: 'Generate SEO-optimized content and copy',
      placeholder: 'Describe content needed (e.g., landing page copy for AI startup)'
    },
    {
      id: 'automation',
      name: 'Workflow Automation',
      icon: '🤖',
      description: 'Create automated workflows and scripts',
      placeholder: 'Describe the automation (e.g., email marketing sequence for new users)'
    }
  ]

  const generateContent = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const responses = {
        website: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Generated Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <header class="bg-white shadow-sm">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="font-bold text-xl text-purple-600">YourBrand</div>
                <div class="hidden md:flex space-x-8">
                    <a href="#" class="text-gray-600 hover:text-purple-600">Home</a>
                    <a href="#" class="text-gray-600 hover:text-purple-600">About</a>
                    <a href="#" class="text-gray-600 hover:text-purple-600">Services</a>
                    <a href="#" class="text-gray-600 hover:text-purple-600">Contact</a>
                </div>
            </div>
        </nav>
    </header>
    
    <main>
        <section class="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
            <div class="max-w-7xl mx-auto px-4 text-center text-white">
                <h1 class="text-5xl font-bold mb-6">Welcome to the Future</h1>
                <p class="text-xl mb-8">AI-powered solutions for modern businesses</p>
                <button class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Get Started
                </button>
            </div>
        </section>
    </main>
</body>
</html>`,
        component: `
import React, { useState } from 'react';

const PricingCard = ({ title, price, features, highlighted = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={\`relative p-8 rounded-2xl transition-all duration-300 transform \${
        highlighted 
          ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white scale-105' 
          : 'bg-white text-gray-900 hover:scale-105'
      } \${isHovered ? 'shadow-2xl' : 'shadow-lg'}\`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-lg opacity-75">/month</span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        <button className={\`w-full py-3 px-6 rounded-lg font-semibold transition-colors \${
          highlighted 
            ? 'bg-white text-purple-600 hover:bg-gray-100' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }\`}>
          Choose Plan
        </button>
      </div>
    </div>
  );
};

export default PricingCard;`,
        api: `
// Express.js API with JWT Authentication
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = app;`
      }

      setGeneratedContent(responses[selectedTool] || `Generated ${selectedTool} content based on: "${prompt}"`)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    alert('Code copied to clipboard!')
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>AI Content Generator - Aranya One</title>
        <meta name="description" content="Generate websites, components, APIs and more with AI" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🚀 AI Content Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Generate world-class websites, components, APIs, and content with advanced AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 sticky top-8">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
                🛠️ AI Tools
              </h2>
              <div className="space-y-3">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedTool === tool.id
                        ? 'bg-royal-purple-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className={`text-sm ${
                          selectedTool === tool.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Generation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                {tools.find(t => t.id === selectedTool)?.icon} {tools.find(t => t.id === selectedTool)?.name}
              </h2>
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={tools.find(t => t.id === selectedTool)?.placeholder}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={generateContent}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-royal-purple-500 hover:bg-royal-purple-600 disabled:bg-gray-300 text-white py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Generate with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Section */}
            {generatedContent && (
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="font-heading font-semibold text-xl text-gray-900">
                      ✨ Generated Content
                    </h2>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span>Copy Code</span>
                    </button>
                  </div>
                </div>
                <div className="p-0">
                  <pre className="p-6 bg-gray-900 text-green-400 text-sm overflow-x-auto">
                    <code>{generatedContent}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}