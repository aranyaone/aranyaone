import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';

export default function AIVideoCreator() {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [videoSettings, setVideoSettings] = useState({
    duration: '60',
    resolution: '1080p',
    style: 'professional',
    voice: 'female-ai'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(null);

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    videosCreated: 1247,
    totalViews: 2340000,
    avgEngagement: 8.7,
    renderingQueue: 12,
    successRate: 98.3
  });

  const videoTemplates = [
    {
      id: 'product-demo',
      name: 'Product Demo',
      icon: '📱',
      category: 'Marketing',
      description: 'Showcase products with AI-generated demonstrations and explanations',
      features: ['3D product renders', 'Voice narration', 'Feature highlights', 'Call-to-action'],
      estimatedTime: '45-60 seconds',
      complexity: 'Medium',
      color: 'blue'
    },
    {
      id: 'explainer-video',
      name: 'Explainer Video',
      icon: '🎓',
      category: 'Educational',
      description: 'Break down complex concepts with animated visuals and clear narration',
      features: ['Animated graphics', 'Step-by-step breakdown', 'Visual metaphors', 'Knowledge retention'],
      estimatedTime: '90-120 seconds',
      complexity: 'High',
      color: 'green'
    },
    {
      id: 'social-media',
      name: 'Social Media Clip',
      icon: '📺',
      category: 'Social',
      description: 'Viral-ready content optimized for social media platforms',
      features: ['Platform optimization', 'Trending elements', 'Hook openers', 'Share triggers'],
      estimatedTime: '15-30 seconds',
      complexity: 'Low',
      color: 'pink'
    },
    {
      id: 'testimonial',
      name: 'Customer Testimonial',
      icon: '⭐',
      category: 'Trust',
      description: 'AI-generated testimonials with realistic avatars and authentic stories',
      features: ['AI avatars', 'Authentic scripts', 'Emotional appeal', 'Credibility boost'],
      estimatedTime: '30-45 seconds',
      complexity: 'Medium',
      color: 'orange'
    },
    {
      id: 'training',
      name: 'Training Video',
      icon: '🎯',
      category: 'Corporate',
      description: 'Professional training content with interactive elements',
      features: ['Screen recordings', 'Interactive quizzes', 'Progress tracking', 'Certificates'],
      estimatedTime: '300-600 seconds',
      complexity: 'High',
      color: 'purple'
    },
    {
      id: 'news-update',
      name: 'News Update',
      icon: '📰',
      category: 'News',
      description: 'Professional news-style videos with anchors and graphics',
      features: ['News anchor AI', 'Breaking news graphics', 'Data visualizations', 'Professional tone'],
      estimatedTime: '60-90 seconds',
      complexity: 'Medium',
      color: 'red'
    }
  ];

  const aiCapabilities = [
    {
      name: 'Script Generation',
      icon: '✍️',
      description: 'Stanford NLP algorithms create compelling scripts tailored to your audience',
      technology: 'Stanford Natural Language Processing',
      accuracy: '96.8%'
    },
    {
      name: 'Voice Synthesis',
      icon: '🗣️',
      description: 'MIT voice technology generates human-like narration in multiple languages',
      technology: 'MIT Voice Synthesis',
      accuracy: '98.2%'
    },
    {
      name: 'Visual Generation',
      icon: '🎨',
      description: 'Harvard creativity algorithms design stunning visuals and animations',
      technology: 'Harvard Creative AI',
      accuracy: '94.5%'
    },
    {
      name: 'Scene Composition',
      icon: '🎬',
      description: 'NASA precision systems ensure perfect timing and transitions',
      technology: 'NASA Timing Algorithms',
      accuracy: '99.1%'
    }
  ];

  const videoStyles = [
    { id: 'professional', name: 'Professional', description: 'Clean, corporate aesthetic', preview: '💼' },
    { id: 'creative', name: 'Creative', description: 'Artistic and vibrant', preview: '🎨' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant', preview: '✨' },
    { id: 'dynamic', name: 'Dynamic', description: 'High energy and motion', preview: '⚡' },
    { id: 'luxury', name: 'Luxury', description: 'Premium and sophisticated', preview: '💎' },
    { id: 'tech', name: 'Tech', description: 'Futuristic and digital', preview: '🤖' }
  ];

  const voiceOptions = [
    { id: 'female-ai', name: 'Emma AI', description: 'Professional female voice', accent: 'American' },
    { id: 'male-ai', name: 'David AI', description: 'Authoritative male voice', accent: 'British' },
    { id: 'narrator-ai', name: 'Morgan AI', description: 'Documentary style voice', accent: 'Neutral' },
    { id: 'young-ai', name: 'Alex AI', description: 'Energetic young voice', accent: 'Australian' }
  ];

  const recentVideos = [
    {
      id: 'VID-001',
      title: 'Product Launch Announcement',
      template: 'Product Demo',
      duration: '45s',
      views: 15400,
      engagement: '9.2%',
      status: 'Published',
      thumbnail: '📱'
    },
    {
      id: 'VID-002',
      title: 'How Our AI Works',
      template: 'Explainer Video',
      duration: '105s',
      views: 28900,
      engagement: '12.1%',
      status: 'Published',
      thumbnail: '🧠'
    },
    {
      id: 'VID-003',
      title: 'Customer Success Story',
      template: 'Customer Testimonial',
      duration: '38s',
      views: 8700,
      engagement: '15.3%',
      status: 'Processing',
      thumbnail: '⭐'
    },
    {
      id: 'VID-004',
      title: 'Social Media Promo',
      template: 'Social Media Clip',
      duration: '22s',
      views: 45200,
      engagement: '18.7%',
      status: 'Published',
      thumbnail: '🔥'
    }
  ];

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        videosCreated: prev.videosCreated + Math.floor(Math.random() * 3),
        totalViews: prev.totalViews + Math.floor(Math.random() * 100 + 50),
        avgEngagement: Math.max(0, prev.avgEngagement + (Math.random() - 0.5) * 0.3),
        renderingQueue: Math.max(0, prev.renderingQueue + Math.floor(Math.random() * 6 - 3)),
        successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() - 0.5) * 0.5))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateVideo = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);

    const steps = [
      { step: 'analyzing', message: 'Analyzing template requirements with Stanford algorithms...', progress: 10 },
      { step: 'script', message: 'Generating compelling script with MIT language models...', progress: 25 },
      { step: 'voice', message: 'Synthesizing professional voice narration...', progress: 40 },
      { step: 'visuals', message: 'Creating stunning visuals with Harvard creativity AI...', progress: 60 },
      { step: 'composition', message: 'Composing scenes with NASA precision timing...', progress: 80 },
      { step: 'rendering', message: 'Rendering final video with IIT optimization...', progress: 95 },
      { step: 'complete', message: 'Video generation complete!', progress: 100 }
    ];

    for (const stepData of steps) {
      setGenerationStep(stepData.step);
      setGenerationProgress(stepData.progress);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Generate video result
    setGeneratedVideo({
      id: `VID-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title: `AI Generated ${selectedTemplate.name}`,
      duration: videoSettings.duration + 's',
      resolution: videoSettings.resolution,
      style: videoSettings.style,
      voice: videoSettings.voice,
      estimatedViews: Math.floor(Math.random() * 50000 + 10000),
      estimatedEngagement: (Math.random() * 10 + 5).toFixed(1),
      fileSize: '24.7 MB',
      formats: ['MP4', 'MOV', 'WebM'],
      thumbnail: selectedTemplate.icon
    });

    setIsGenerating(false);
  };

  const TemplateCard = ({ template, isSelected, onSelect }) => (
    <div 
      onClick={() => onSelect(template)}
      className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
        isSelected ? `border-${template.color}-500 bg-${template.color}-50` : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{template.icon}</div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${template.color}-100 text-${template.color}-800`}>
          {template.category}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
      
      <div className="space-y-2 mb-4">
        {template.features.map((feature, index) => (
          <div key={index} className="text-xs text-gray-500 flex items-center">
            <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            {feature}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-sm">
        <div>
          <div className="font-medium text-gray-700">Duration</div>
          <div className="text-blue-600">{template.estimatedTime}</div>
        </div>
        <div>
          <div className="font-medium text-gray-700">Complexity</div>
          <div className={`${
            template.complexity === 'High' ? 'text-red-600' :
            template.complexity === 'Medium' ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {template.complexity}
          </div>
        </div>
      </div>
    </div>
  );

  const VideoCard = ({ video }) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{video.thumbnail}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.id} • {video.template}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          video.status === 'Published' ? 'bg-green-100 text-green-800' :
          video.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {video.status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <div className="text-gray-600">Duration</div>
          <div className="font-medium">{video.duration}</div>
        </div>
        <div>
          <div className="text-gray-600">Views</div>
          <div className="font-medium text-blue-600">{video.views.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-600">Engagement</div>
          <div className="font-medium text-green-600">{video.engagement}</div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
          📺 Preview
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
          📥 Download
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
          📊 Analytics
        </button>
      </div>
    </div>
  );

  const MetricCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`text-3xl ${color}`}>{icon}</div>
        {change && (
          <div className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>🎬 AI Video Creator - Professional Video Generation | Aranya One</title>
        <meta name="description" content="Create professional videos with AI using Stanford algorithms and Hollywood-level production" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  🎬 AI Video Creator
                  <span className="ml-3 text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                    Hollywood-Level AI
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">Professional video generation with Stanford AI and MIT voice synthesis</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  🎬 Create Video
                </button>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                  📚 Templates
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Metrics Bar */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex space-x-6">
                <span>🎬 Videos Created: {realTimeMetrics.videosCreated.toLocaleString()}</span>
                <span>👁️ Total Views: {realTimeMetrics.totalViews.toLocaleString()}</span>
                <span>💖 Avg Engagement: {realTimeMetrics.avgEngagement.toFixed(1)}%</span>
                <span>⏳ Queue: {realTimeMetrics.renderingQueue}</span>
                <span>✅ Success Rate: {realTimeMetrics.successRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🟢 AI Studio Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">

          {/* Video Generation Process */}
          {isGenerating && (
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">🎬</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  AI Video Generation in Progress
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {generationStep === 'analyzing' && 'Analyzing template requirements with Stanford algorithms...'}
                  {generationStep === 'script' && 'Generating compelling script with MIT language models...'}
                  {generationStep === 'voice' && 'Synthesizing professional voice narration...'}
                  {generationStep === 'visuals' && 'Creating stunning visuals with Harvard creativity AI...'}
                  {generationStep === 'composition' && 'Composing scenes with NASA precision timing...'}
                  {generationStep === 'rendering' && 'Rendering final video with IIT optimization...'}
                  {generationStep === 'complete' && 'Video generation complete!'}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div 
                    className="bg-purple-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  {aiCapabilities.map((capability, index) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="text-2xl mb-2">{capability.icon}</div>
                      <div className="font-semibold text-purple-800 mb-1">{capability.name}</div>
                      <div className="text-purple-600 text-xs">{capability.technology}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Generated Video Result */}
          {generatedVideo && !isGenerating && (
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your AI Video is Ready!
                </h2>
                <p className="text-lg text-gray-600">
                  Professional-quality video generated with Hollywood-level AI
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600">{generatedVideo.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="text-xs text-purple-600 mt-1">{generatedVideo.resolution}</div>
                </div>
                <div className="text-center p-6 bg-pink-50 rounded-xl border border-pink-200">
                  <div className="text-3xl font-bold text-pink-600">{generatedVideo.estimatedViews.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Estimated Views</div>
                  <div className="text-xs text-pink-600 mt-1">First 30 days</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">{generatedVideo.estimatedEngagement}%</div>
                  <div className="text-sm text-gray-600">Est. Engagement</div>
                  <div className="text-xs text-blue-600 mt-1">Above average</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Video Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ID:</span>
                    <span className="font-medium ml-2">{generatedVideo.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Style:</span>
                    <span className="font-medium ml-2 capitalize">{generatedVideo.style}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Voice:</span>
                    <span className="font-medium ml-2">{voiceOptions.find(v => v.id === generatedVideo.voice)?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium ml-2">{generatedVideo.fileSize}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  📥 Download Video
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  📺 Preview
                </button>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  📤 Share
                </button>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                  🔄 Generate Another
                </button>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'create', name: 'Create Video', icon: '🎬' },
                  { id: 'gallery', name: 'Video Gallery', icon: '📚' },
                  { id: 'analytics', name: 'Analytics', icon: '📊' },
                  { id: 'settings', name: 'Studio Settings', icon: '⚙️' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'create' && !isGenerating && !generatedVideo && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <MetricCard 
                  title="Videos Created" 
                  value={realTimeMetrics.videosCreated.toLocaleString()} 
                  change="+47" 
                  icon="🎬" 
                  color="text-purple-600"
                />
                <MetricCard 
                  title="Total Views" 
                  value={`${(realTimeMetrics.totalViews / 1000000).toFixed(1)}M`} 
                  change="+12%" 
                  icon="👁️" 
                  color="text-blue-600"
                />
                <MetricCard 
                  title="Avg Engagement" 
                  value={`${realTimeMetrics.avgEngagement.toFixed(1)}%`} 
                  change="+2.3%" 
                  icon="💖" 
                  color="text-pink-600"
                />
                <MetricCard 
                  title="Rendering Queue" 
                  value={realTimeMetrics.renderingQueue.toString()} 
                  change="-5" 
                  icon="⏳" 
                  color="text-orange-600"
                />
                <MetricCard 
                  title="Success Rate" 
                  value={`${realTimeMetrics.successRate.toFixed(1)}%`} 
                  change="+0.8%" 
                  icon="✅" 
                  color="text-green-600"
                />
              </div>

              {/* Template Selection */}
              <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  🎭 Choose Video Template
                  <span className="ml-3 text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    AI-Optimized
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoTemplates.map(template => (
                    <TemplateCard 
                      key={template.id}
                      template={template}
                      isSelected={selectedTemplate?.id === template.id}
                      onSelect={setSelectedTemplate}
                    />
                  ))}
                </div>
              </div>

              {/* Video Settings */}
              {selectedTemplate && (
                <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">⚙️ Video Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (seconds)</label>
                      <select 
                        value={videoSettings.duration}
                        onChange={(e) => setVideoSettings(prev => ({...prev, duration: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="15">15 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="60">60 seconds</option>
                        <option value="90">90 seconds</option>
                        <option value="120">2 minutes</option>
                        <option value="300">5 minutes</option>
                      </select>
                    </div>

                    {/* Resolution */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
                      <select 
                        value={videoSettings.resolution}
                        onChange={(e) => setVideoSettings(prev => ({...prev, resolution: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="720p">720p HD</option>
                        <option value="1080p">1080p Full HD</option>
                        <option value="4k">4K Ultra HD</option>
                      </select>
                    </div>

                    {/* Style */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Visual Style</label>
                      <select 
                        value={videoSettings.style}
                        onChange={(e) => setVideoSettings(prev => ({...prev, style: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        {videoStyles.map(style => (
                          <option key={style.id} value={style.id}>
                            {style.preview} {style.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Voice */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Voice Narrator</label>
                      <select 
                        value={videoSettings.voice}
                        onChange={(e) => setVideoSettings(prev => ({...prev, voice: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        {voiceOptions.map(voice => (
                          <option key={voice.id} value={voice.id}>
                            {voice.name} ({voice.accent})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <div className="text-center">
                <button 
                  onClick={handleGenerateVideo}
                  disabled={!selectedTemplate}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  🎬 Generate AI Video
                </button>
                <p className="text-sm text-gray-600 mt-3">
                  Stanford AI • MIT voice • Harvard creativity • NASA precision
                </p>
              </div>
            </>
          )}

          {activeTab === 'gallery' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Video Gallery</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recentVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Video Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-800 mb-4">🎬 Production Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Videos This Month:</span>
                      <span className="font-medium">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Production Time:</span>
                      <span className="font-medium">3.2 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Most Popular Template:</span>
                      <span className="font-medium">Product Demo</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-4">👁️ Engagement Metrics</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Total Views:</span>
                      <span className="font-medium">{realTimeMetrics.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Watch Time:</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Share Rate:</span>
                      <span className="font-medium">12.4%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-4">💰 Performance ROI</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Cost Per Video:</span>
                      <span className="font-medium">$2.40</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Generated:</span>
                      <span className="font-medium">$45,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className="font-medium text-green-600">1,900%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🏛️ World-Class AI Video Production Studio
              </h3>
              <p className="text-gray-600 mb-4">
                Hollywood-level video creation with Stanford AI, MIT voice synthesis, Harvard creativity, and NASA precision
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>🎬 AI Video Generation</span>
                <span>🗣️ Voice Synthesis</span>
                <span>🎨 Visual Creation</span>
                <span>📊 Performance Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
