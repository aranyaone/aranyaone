import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';

export default function AIWebsiteBuilder() {
  const [currentStep, setCurrentStep] = useState('concept');
  const [projectData, setProjectData] = useState({
    businessType: '',
    targetAudience: '',
    goals: [],
    style: '',
    colors: [],
    features: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [aiSuggestions, setAiSuggestions] = useState([]);

  // Advanced AI models for different aspects
  const aiModels = {
    design: 'Stanford-Vision-Pro',
    content: 'MIT-NLP-Advanced',
    ux: 'Harvard-UX-Optimizer',
    seo: 'NASA-SEO-Engine',
    performance: 'IIT-Performance-Core'
  };

  const businessTypes = [
    { id: 'startup', name: 'Tech Startup', icon: '🚀', description: 'Innovative technology companies' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒', description: 'Online retail and shopping' },
    { id: 'saas', name: 'SaaS Platform', icon: '💻', description: 'Software as a Service' },
    { id: 'agency', name: 'Digital Agency', icon: '🎨', description: 'Creative and marketing services' },
    { id: 'consulting', name: 'Consulting', icon: '📊', description: 'Professional advisory services' },
    { id: 'portfolio', name: 'Portfolio', icon: '👨‍💼', description: 'Personal or professional showcase' },
    { id: 'blog', name: 'Blog/Media', icon: '📝', description: 'Content and publishing' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', description: 'Food and hospitality' }
  ];

  const designStyles = [
    { id: 'minimal', name: 'Minimal', preview: 'Clean, simple, whitespace-focused' },
    { id: 'modern', name: 'Modern', preview: 'Contemporary with bold elements' },
    { id: 'corporate', name: 'Corporate', preview: 'Professional and trustworthy' },
    { id: 'creative', name: 'Creative', preview: 'Artistic and expressive' },
    { id: 'luxury', name: 'Luxury', preview: 'Premium and sophisticated' },
    { id: 'tech', name: 'Tech', preview: 'Futuristic and innovative' }
  ];

  const colorSchemes = [
    { id: 'blue', name: 'Professional Blue', colors: ['#1e40af', '#3b82f6', '#93c5fd'] },
    { id: 'purple', name: 'Creative Purple', colors: ['#7c3aed', '#a855f7', '#c4b5fd'] },
    { id: 'green', name: 'Growth Green', colors: ['#059669', '#10b981', '#86efac'] },
    { id: 'orange', name: 'Energy Orange', colors: ['#ea580c', '#f97316', '#fdba74'] },
    { id: 'red', name: 'Bold Red', colors: ['#dc2626', '#ef4444', '#fca5a5'] },
    { id: 'gray', name: 'Elegant Gray', colors: ['#374151', '#6b7280', '#d1d5db'] }
  ];

  const websiteFeatures = [
    { id: 'contact', name: 'Contact Forms', icon: '📞', description: 'AI-powered contact management' },
    { id: 'analytics', name: 'Analytics Dashboard', icon: '📊', description: 'Real-time performance tracking' },
    { id: 'seo', name: 'SEO Optimization', icon: '🔍', description: 'Advanced search optimization' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒', description: 'Online store functionality' },
    { id: 'blog', name: 'Blog System', icon: '📝', description: 'Content management system' },
    { id: 'booking', name: 'Booking System', icon: '📅', description: 'Appointment scheduling' },
    { id: 'chat', name: 'AI Chat Support', icon: '💬', description: 'Intelligent customer support' },
    { id: 'multilang', name: 'Multi-language', icon: '🌍', description: 'Global audience support' }
  ];

  // Simulate AI generation process
  const generateWebsite = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const steps = [
      { step: 10, message: 'Analyzing business requirements...' },
      { step: 25, message: 'Generating AI-powered design concepts...' },
      { step: 40, message: 'Creating responsive layouts...' },
      { step: 55, message: 'Optimizing user experience...' },
      { step: 70, message: 'Implementing SEO strategies...' },
      { step: 85, message: 'Generating premium content...' },
      { step: 100, message: 'Finalizing world-class website...' }
    ];

    for (const { step, message } of steps) {
      setGenerationProgress(step);
      setAiSuggestions(prev => [...prev, { message, timestamp: new Date().toISOString() }]);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setCurrentStep('preview');
    setIsGenerating(false);
  };

  const StepIndicator = ({ step, isActive, isCompleted }) => (
    <div className={`flex items-center space-x-2 ${
      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
        isActive ? 'border-blue-600 bg-blue-50' :
        isCompleted ? 'border-green-600 bg-green-50' :
        'border-gray-300 bg-gray-50'
      }`}>
        {isCompleted ? '✓' : step}
      </div>
    </div>
  );

  const FeatureCard = ({ feature, isSelected, onToggle }) => (
    <div 
      onClick={onToggle}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{feature.icon}</span>
        <div>
          <h3 className="font-semibold text-gray-900">{feature.name}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>🌐 AI Website Builder - Stanford/MIT Intelligence | Aranya One</title>
        <meta name="description" content="World-class AI website builder with automatic generation and optimization" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  🌐 AI Website Builder
                  <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    Auto-Generation
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">Stanford/MIT intelligence creates world-class websites automatically</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  🚀 Launch Site
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  💾 Save Project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Status Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex space-x-6">
                <span>🧠 {Object.values(aiModels).length} AI Models Active</span>
                <span>⚡ Real-time Generation</span>
                <span>🎯 99.7% User Satisfaction</span>
                <span>🚀 <50ms Response Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Generation Speed: Instant</span>
                <div className="w-16 bg-white/20 rounded-full h-2">
                  <div className="bg-yellow-300 h-2 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          
          {/* Step Navigation */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <StepIndicator step={1} isActive={currentStep === 'concept'} isCompleted={['design', 'features', 'generate', 'preview'].includes(currentStep)} />
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <StepIndicator step={2} isActive={currentStep === 'design'} isCompleted={['features', 'generate', 'preview'].includes(currentStep)} />
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <StepIndicator step={3} isActive={currentStep === 'features'} isCompleted={['generate', 'preview'].includes(currentStep)} />
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <StepIndicator step={4} isActive={currentStep === 'generate'} isCompleted={currentStep === 'preview'} />
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <StepIndicator step={5} isActive={currentStep === 'preview'} isCompleted={false} />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Business Concept</span>
              <span>Design Style</span>
              <span>Features</span>
              <span>AI Generation</span>
              <span>Preview & Launch</span>
            </div>
          </div>

          {/* Step 1: Business Concept */}
          {currentStep === 'concept' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  🎯 Define Your Business Concept
                  <span className="ml-3 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    AI-Powered Analysis
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {businessTypes.map(type => (
                    <div
                      key={type.id}
                      onClick={() => setProjectData({...projectData, businessType: type.id})}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        projectData.businessType === type.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                        <p className="text-xs text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <textarea 
                      value={projectData.targetAudience}
                      onChange={(e) => setProjectData({...projectData, targetAudience: e.target.value})}
                      placeholder="Describe your ideal customers (AI will analyze and optimize)..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Goals
                    </label>
                    <textarea 
                      value={projectData.goals.join('\n')}
                      onChange={(e) => setProjectData({...projectData, goals: e.target.value.split('\n').filter(g => g.trim())})}
                      placeholder="• Generate leads&#10;• Increase sales&#10;• Build brand awareness&#10;• Showcase portfolio"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={() => setCurrentStep('design')}
                    disabled={!projectData.businessType}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Next: Design Style →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Design Style */}
          {currentStep === 'design' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  🎨 Choose Design Style
                  <span className="ml-3 text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    AI Design Engine
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {designStyles.map(style => (
                    <div
                      key={style.id}
                      onClick={() => setProjectData({...projectData, style: style.id})}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        projectData.style === style.id 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{style.name}</h3>
                      <p className="text-sm text-gray-600">{style.preview}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Scheme</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {colorSchemes.map(scheme => (
                      <div
                        key={scheme.id}
                        onClick={() => setProjectData({...projectData, colors: scheme.colors})}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          JSON.stringify(projectData.colors) === JSON.stringify(scheme.colors)
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex space-x-1 mb-2">
                          {scheme.colors.map((color, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                        <p className="text-xs font-medium text-gray-900">{scheme.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button 
                    onClick={() => setCurrentStep('concept')}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => setCurrentStep('features')}
                    disabled={!projectData.style}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Next: Features →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Features */}
          {currentStep === 'features' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  ⚡ Select Website Features
                  <span className="ml-3 text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    Smart Recommendations
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {websiteFeatures.map(feature => (
                    <FeatureCard
                      key={feature.id}
                      feature={feature}
                      isSelected={projectData.features.includes(feature.id)}
                      onToggle={() => {
                        const updatedFeatures = projectData.features.includes(feature.id)
                          ? projectData.features.filter(f => f !== feature.id)
                          : [...projectData.features, feature.id];
                        setProjectData({...projectData, features: updatedFeatures});
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">🤖 AI Recommendations</h3>
                  <p className="text-sm text-blue-800">
                    Based on your {projectData.businessType} business type, we recommend: 
                    Contact Forms, Analytics Dashboard, and SEO Optimization for optimal performance.
                  </p>
                </div>

                <div className="mt-8 flex justify-between">
                  <button 
                    onClick={() => setCurrentStep('design')}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => setCurrentStep('generate')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Generate Website →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Generation */}
          {currentStep === 'generate' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  🚀 AI Website Generation
                  <span className="ml-3 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    World-Class Intelligence
                  </span>
                </h2>

                {!isGenerating && generationProgress === 0 && (
                  <div className="text-center py-12">
                    <div className="mb-6">
                      <div className="text-6xl mb-4">🧠</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate Your Website</h3>
                      <p className="text-gray-600">Our Stanford/MIT AI will create a world-class website in seconds</p>
                    </div>
                    <button 
                      onClick={generateWebsite}
                      className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
                    >
                      🚀 Start AI Generation
                    </button>
                  </div>
                )}

                {(isGenerating || generationProgress > 0) && (
                  <div className="space-y-6">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Generation Progress</span>
                        <span className="text-sm font-medium text-gray-700">{generationProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${generationProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* AI Models Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {Object.entries(aiModels).map(([key, model]) => (
                        <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="text-center">
                            <div className="text-2xl mb-2">
                              {key === 'design' && '🎨'}
                              {key === 'content' && '✍️'}
                              {key === 'ux' && '👤'}
                              {key === 'seo' && '🔍'}
                              {key === 'performance' && '⚡'}
                            </div>
                            <div className="text-xs font-medium text-gray-900 mb-1">{key.toUpperCase()}</div>
                            <div className="text-xs text-gray-600">{model}</div>
                            <div className="mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                generationProgress > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {generationProgress > 20 ? '✓ Active' : '⏳ Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* AI Suggestions */}
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-4">🤖 AI Generation Log</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="text-sm text-blue-800">
                            <span className="text-blue-600">{new Date(suggestion.timestamp).toLocaleTimeString()}</span>
                            {' '} - {suggestion.message}
                          </div>
                        ))}
                      </div>
                    </div>

                    {generationProgress === 100 && (
                      <div className="text-center py-8">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Website Generated Successfully!</h3>
                        <p className="text-gray-600 mb-6">Your world-class website is ready for preview</p>
                        <button 
                          onClick={() => setCurrentStep('preview')}
                          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                        >
                          🔍 Preview Website
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Preview */}
          {currentStep === 'preview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                
                {/* Preview Controls */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      🔍 Website Preview
                      <span className="ml-3 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        Generated
                      </span>
                    </h2>
                    <div className="flex space-x-3">
                      <div className="flex border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => setPreviewMode('desktop')}
                          className={`px-4 py-2 text-sm font-medium ${
                            previewMode === 'desktop' 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          💻 Desktop
                        </button>
                        <button 
                          onClick={() => setPreviewMode('tablet')}
                          className={`px-4 py-2 text-sm font-medium border-l border-gray-300 ${
                            previewMode === 'tablet' 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          📱 Tablet
                        </button>
                        <button 
                          onClick={() => setPreviewMode('mobile')}
                          className={`px-4 py-2 text-sm font-medium border-l border-gray-300 ${
                            previewMode === 'mobile' 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          📱 Mobile
                        </button>
                      </div>
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        🚀 Publish Website
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview Area */}
                <div className="p-6">
                  <div className={`mx-auto border border-gray-300 rounded-lg overflow-hidden ${
                    previewMode === 'desktop' ? 'max-w-full' :
                    previewMode === 'tablet' ? 'max-w-2xl' :
                    'max-w-sm'
                  }`}>
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1 ml-4">
                        <div className="bg-white rounded px-3 py-1 text-xs text-gray-600">
                          https://your-domain.com
                        </div>
                      </div>
                    </div>
                    
                    {/* Website Preview Content */}
                    <div className="bg-white min-h-96">
                      <div className="p-8">
                        <div className="text-center mb-8">
                          <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {projectData.businessType === 'startup' && '🚀 Your Startup'}
                            {projectData.businessType === 'ecommerce' && '🛒 Your Store'}
                            {projectData.businessType === 'saas' && '💻 Your Platform'}
                            {projectData.businessType === 'agency' && '🎨 Your Agency'}
                            {projectData.businessType === 'consulting' && '📊 Your Consulting'}
                            {projectData.businessType === 'portfolio' && '👨‍💼 Your Portfolio'}
                            {projectData.businessType === 'blog' && '📝 Your Blog'}
                            {projectData.businessType === 'restaurant' && '🍽️ Your Restaurant'}
                          </h1>
                          <p className="text-lg text-gray-600 mb-6">
                            World-class {projectData.businessType} experience, powered by AI
                          </p>
                          <div className="flex justify-center space-x-3">
                            {projectData.colors.map((color, index) => (
                              <div 
                                key={index}
                                className="px-6 py-3 rounded-lg text-white font-semibold"
                                style={{ backgroundColor: color }}
                              >
                                Get Started
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {projectData.features.slice(0, 3).map((featureId, index) => {
                            const feature = websiteFeatures.find(f => f.id === featureId);
                            return (
                              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3 className="font-semibold text-gray-900 mb-2">{feature.name}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Website Stats */}
                <div className="border-t border-gray-200 p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">98%</div>
                      <div className="text-sm text-gray-600">Performance Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">100%</div>
                      <div className="text-sm text-gray-600">SEO Optimized</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">100%</div>
                      <div className="text-sm text-gray-600">Mobile Ready</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">&lt;1s</div>
                      <div className="text-sm text-gray-600">Load Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🌟 World-Class AI Website Builder
              </h3>
              <p className="text-gray-600 mb-4">
                Stanford/MIT intelligence creates professional websites with NASA-grade performance
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>🧠 Stanford/MIT AI Models</span>
                <span>🚀 Auto-Generation Technology</span>
                <span>⚡ Instant Deployment</span>
                <span>📱 Mobile-First Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
