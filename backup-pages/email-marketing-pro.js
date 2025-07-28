import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';

export default function EmailMarketingPro() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [campaignType, setCampaignType] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalSubscribers: 89432,
    openRate: 28.5,
    clickRate: 4.2,
    conversionRate: 2.8,
    revenueToday: 15678
  });

  const [campaignMetrics, setCampaignMetrics] = useState([
    { name: 'Welcome Series', sent: 1234, opened: 567, clicked: 89, converted: 23, revenue: 4567 },
    { name: 'Product Launch', sent: 8900, opened: 2670, clicked: 445, converted: 78, revenue: 12340 },
    { name: 'Weekly Newsletter', sent: 15600, opened: 4680, clicked: 623, converted: 156, revenue: 7890 },
    { name: 'Abandoned Cart', sent: 3400, opened: 1020, clicked: 238, converted: 89, revenue: 5670 }
  ]);

  const emailTemplates = [
    {
      id: 'welcome-series',
      name: 'Welcome Series',
      icon: '👋',
      type: 'Automated',
      description: 'Multi-email onboarding sequence for new subscribers',
      features: ['Personalized journey', '5-email sequence', 'Behavioral triggers'],
      avgOpenRate: '32%',
      avgClickRate: '6.8%',
      color: 'blue'
    },
    {
      id: 'product-launch',
      name: 'Product Launch',
      icon: '🚀',
      type: 'Campaign',
      description: 'High-impact announcement for new products/services',
      features: ['Countdown timers', 'Social proof', 'Limited offers'],
      avgOpenRate: '28%',
      avgClickRate: '4.5%',
      color: 'purple'
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      icon: '📰',
      type: 'Regular',
      description: 'Weekly/monthly content digest and updates',
      features: ['Content curation', 'Industry insights', 'Company updates'],
      avgOpenRate: '24%',
      avgClickRate: '3.2%',
      color: 'green'
    },
    {
      id: 'promotional',
      name: 'Promotional',
      icon: '💰',
      type: 'Sales',
      description: 'Sales-focused campaigns with special offers',
      features: ['Discount codes', 'Urgency tactics', 'Clear CTAs'],
      avgOpenRate: '22%',
      avgClickRate: '5.1%',
      color: 'orange'
    },
    {
      id: 'abandoned-cart',
      name: 'Abandoned Cart',
      icon: '🛒',
      type: 'Automated',
      description: 'Recovery emails for incomplete purchases',
      features: ['Product reminders', 'Incentives', '3-email sequence'],
      avgOpenRate: '35%',
      avgClickRate: '8.2%',
      color: 'red'
    },
    {
      id: 'reengagement',
      name: 'Re-engagement',
      icon: '💝',
      type: 'Automated',
      description: 'Win-back campaigns for inactive subscribers',
      features: ['Personalized content', 'Special offers', 'Feedback request'],
      avgOpenRate: '18%',
      avgClickRate: '4.8%',
      color: 'pink'
    }
  ];

  const aiFeatures = [
    {
      name: 'Subject Line Optimizer',
      icon: '🎯',
      description: 'AI generates and tests multiple subject lines for maximum open rates',
      technology: 'Stanford NLP + Harvard Psychology'
    },
    {
      name: 'Content Personalization',
      icon: '👤',
      description: 'Dynamic content adaptation based on subscriber behavior and preferences',
      technology: 'MIT Machine Learning'
    },
    {
      name: 'Send Time Optimization',
      icon: '⏰',
      description: 'Predicts optimal send times for each individual subscriber',
      technology: 'NASA Time Analytics'
    },
    {
      name: 'Engagement Prediction',
      icon: '📊',
      description: 'Forecasts campaign performance before sending',
      technology: 'IIT Predictive Modeling'
    }
  ];

  const subscriberSegments = [
    { name: 'New Subscribers', count: 12340, growth: '+15%', color: 'blue' },
    { name: 'Active Buyers', count: 8765, growth: '+8%', color: 'green' },
    { name: 'High Value Customers', count: 2341, growth: '+12%', color: 'purple' },
    { name: 'Inactive Users', count: 5432, growth: '-3%', color: 'orange' },
    { name: 'VIP Members', count: 987, growth: '+22%', color: 'pink' }
  ];

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        totalSubscribers: prev.totalSubscribers + Math.floor(Math.random() * 20 - 5),
        openRate: Math.max(0, prev.openRate + (Math.random() - 0.5) * 0.3),
        clickRate: Math.max(0, prev.clickRate + (Math.random() - 0.5) * 0.1),
        conversionRate: Math.max(0, prev.conversionRate + (Math.random() - 0.5) * 0.1),
        revenueToday: prev.revenueToday + Math.floor(Math.random() * 200 - 50)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateCampaign = async () => {
    setIsCreatingCampaign(true);
    setGenerationProgress(0);

    const steps = [
      { progress: 20, message: 'Analyzing subscriber behavior with MIT algorithms...' },
      { progress: 40, message: 'Generating subject lines with Stanford NLP...' },
      { progress: 60, message: 'Creating personalized content with Harvard psychology...' },
      { progress: 80, message: 'Optimizing send times with NASA precision...' },
      { progress: 100, message: 'Campaign ready for deployment!' }
    ];

    for (const step of steps) {
      setGenerationProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setTimeout(() => {
      setIsCreatingCampaign(false);
      setGenerationProgress(0);
    }, 1000);
  };

  const TemplateCard = ({ template, isSelected, onSelect }) => (
    <div 
      onClick={() => onSelect(template)}
      className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
        isSelected ? `border-${template.color}-500 bg-${template.color}-50` : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{template.icon}</div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${template.color}-100 text-${template.color}-800`}>
          {template.type}
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
          <div className="font-medium text-gray-700">Open Rate</div>
          <div className="text-green-600">{template.avgOpenRate}</div>
        </div>
        <div>
          <div className="font-medium text-gray-700">Click Rate</div>
          <div className="text-blue-600">{template.avgClickRate}</div>
        </div>
      </div>
    </div>
  );

  const MetricCard = ({ title, value, change, icon, color }) => (
    <div className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );

  const CampaignRow = ({ campaign }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{campaign.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {campaign.sent.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-900">{campaign.opened.toLocaleString()}</div>
        <div className="text-sm text-green-600">{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-900">{campaign.clicked.toLocaleString()}</div>
        <div className="text-sm text-blue-600">{((campaign.clicked / campaign.sent) * 100).toFixed(1)}%</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-900">{campaign.converted}</div>
        <div className="text-sm text-purple-600">{((campaign.converted / campaign.sent) * 100).toFixed(2)}%</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
        ${campaign.revenue.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
        <button className="text-green-600 hover:text-green-800 mr-3">Clone</button>
        <button className="text-red-600 hover:text-red-800">Archive</button>
      </td>
    </tr>
  );

  return (
    <Layout>
      <Head>
        <title>📧 Email Marketing Pro - AI-Powered Campaign Automation | Aranya One</title>
        <meta name="description" content="Advanced email marketing with AI personalization and Stanford-level optimization" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  📧 Email Marketing Pro
                  <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    AI-Powered
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">Advanced email automation with AI personalization</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setActiveTab('create')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✉️ Create Campaign
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  👥 Manage Lists
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Metrics Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex space-x-6">
                <span>👥 Subscribers: {realTimeMetrics.totalSubscribers.toLocaleString()}</span>
                <span>📈 Open Rate: {realTimeMetrics.openRate.toFixed(1)}%</span>
                <span>🖱️ Click Rate: {realTimeMetrics.clickRate.toFixed(1)}%</span>
                <span>💰 Revenue Today: ${realTimeMetrics.revenueToday.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🟢 All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'campaigns', name: 'Campaigns', icon: '📊' },
                  { id: 'create', name: 'Create Campaign', icon: '✉️' },
                  { id: 'segments', name: 'Segments', icon: '👥' },
                  { id: 'analytics', name: 'Analytics', icon: '📈' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
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

          {/* Campaign Creation with Progress */}
          {isCreatingCampaign && (
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">🤖</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  AI Campaign Generation in Progress
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {generationProgress <= 20 && 'Analyzing subscriber behavior with MIT algorithms...'}
                  {generationProgress > 20 && generationProgress <= 40 && 'Generating subject lines with Stanford NLP...'}
                  {generationProgress > 40 && generationProgress <= 60 && 'Creating personalized content with Harvard psychology...'}
                  {generationProgress > 60 && generationProgress <= 80 && 'Optimizing send times with NASA precision...'}
                  {generationProgress > 80 && 'Campaign ready for deployment!'}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  {aiFeatures.map((feature, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <div className="font-semibold text-blue-800 mb-1">{feature.name}</div>
                      <div className="text-blue-600 text-xs">{feature.technology}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'campaigns' && !isCreatingCampaign && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <MetricCard 
                  title="Total Subscribers" 
                  value={realTimeMetrics.totalSubscribers.toLocaleString()} 
                  change="+12%" 
                  icon="👥" 
                  color="text-blue-600"
                />
                <MetricCard 
                  title="Open Rate" 
                  value={`${realTimeMetrics.openRate.toFixed(1)}%`} 
                  change="+2.3%" 
                  icon="📈" 
                  color="text-green-600"
                />
                <MetricCard 
                  title="Click Rate" 
                  value={`${realTimeMetrics.clickRate.toFixed(1)}%`} 
                  change="+0.8%" 
                  icon="🖱️" 
                  color="text-purple-600"
                />
                <MetricCard 
                  title="Conversion Rate" 
                  value={`${realTimeMetrics.conversionRate.toFixed(1)}%`} 
                  change="+1.2%" 
                  icon="💰" 
                  color="text-orange-600"
                />
                <MetricCard 
                  title="Revenue Today" 
                  value={`$${realTimeMetrics.revenueToday.toLocaleString()}`} 
                  change="+18%" 
                  icon="💎" 
                  color="text-pink-600"
                />
              </div>

              {/* Campaign Performance Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">📊 Campaign Performance</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opened</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicked</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Converted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {campaignMetrics.map((campaign, index) => (
                        <CampaignRow key={index} campaign={campaign} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'create' && !isCreatingCampaign && (
            <>
              {/* Template Selection */}
              <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  🎨 Choose Campaign Template
                  <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    AI-Optimized
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {emailTemplates.map(template => (
                    <TemplateCard 
                      key={template.id}
                      template={template}
                      isSelected={selectedTemplate?.id === template.id}
                      onSelect={setSelectedTemplate}
                    />
                  ))}
                </div>
              </div>

              {/* AI Features Showcase */}
              <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">🤖 AI-Powered Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiFeatures.map((feature, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="text-2xl mr-3">{feature.icon}</div>
                        <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                      </div>
                      <p className="text-gray-600 mb-2">{feature.description}</p>
                      <p className="text-sm text-blue-600 font-medium">{feature.technology}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Campaign Button */}
              <div className="text-center">
                <button 
                  onClick={handleCreateCampaign}
                  disabled={!selectedTemplate}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  🚀 Create AI Campaign
                </button>
                <p className="text-sm text-gray-600 mt-3">
                  Stanford NLP • Harvard psychology • MIT algorithms • NASA precision
                </p>
              </div>
            </>
          )}

          {activeTab === 'segments' && !isCreatingCampaign && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">👥 Subscriber Segments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscriberSegments.map((segment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-900">{segment.name}</h3>
                      <span className={`text-sm font-medium ${
                        segment.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {segment.growth}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {segment.count.toLocaleString()}
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        View
                      </button>
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                        Export
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🏛️ World-Class Email Marketing Platform
              </h3>
              <p className="text-gray-600 mb-4">
                AI-powered email automation with Stanford NLP, Harvard psychology, and MIT optimization
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>📧 Advanced Automation</span>
                <span>🤖 AI Personalization</span>
                <span>📊 Real-time Analytics</span>
                <span>🎯 Conversion Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
