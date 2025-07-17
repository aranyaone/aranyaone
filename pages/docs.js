import Head from 'next/head'

export default function DocumentationPage() {
  return (
    <div>
      <Head>
        <title>Documentation - Aranya One</title>
        <meta name="description" content="Complete documentation and guides for your digital empire" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 Documentation</h1>
            <p className="text-gray-600">Complete guides, API references, and tutorials for your empire</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <DocNavigation />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <QuickStartGuide />
              <ApiDocumentation />
              <TutorialsSection />
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function DocNavigation() {
  const sections = [
    {
      title: "🚀 Getting Started",
      items: ["Quick Start", "Installation", "First Project", "Configuration"]
    },
    {
      title: "🔧 API Reference",
      items: ["Authentication", "Endpoints", "Rate Limits", "Error Codes"]
    },
    {
      title: "📱 Services",
      items: ["AI Chat Bot", "SEO Optimizer", "Analytics", "Social Media"]
    },
    {
      title: "💡 Tutorials",
      items: ["Basic Setup", "Advanced Features", "Integrations", "Best Practices"]
    },
    {
      title: "🔐 Security",
      items: ["API Keys", "Permissions", "Data Privacy", "Compliance"]
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">📋 Table of Contents</h3>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            <h4 className="font-semibold text-gray-800 mb-2">{section.title}</h4>
            <ul className="space-y-1 ml-4">
              {section.items.map((item, i) => (
                <li key={i}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
          📥 Download PDF
        </button>
      </div>
    </div>
  );
}

function QuickStartGuide() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🚀 Quick Start Guide</h2>
      
      <div className="space-y-6">
        <StepCard 
          number="1"
          title="Create Your Account"
          description="Sign up for Aranya One and verify your email address"
          code="// No code required - use the web interface"
          highlight={true}
        />
        
        <StepCard 
          number="2"
          title="Generate API Key"
          description="Get your authentication token from the settings panel"
          code={`// Go to Settings > API Keys > Generate New Key
const apiKey = "your-api-key-here";`}
        />
        
        <StepCard 
          number="3"
          title="Make Your First Request"
          description="Test the connection with a simple API call"
          code={`fetch('https://api.aranyaone.com/v1/status', {
  headers: {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
        />
        
        <StepCard 
          number="4"
          title="Activate Services"
          description="Enable the services you want to use for your empire"
          code={`// Available services:
// - AI Chat Bot
// - SEO Optimizer  
// - Analytics Dashboard
// - Social Media Manager`}
        />
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-bold text-blue-800 mb-2">💡 Pro Tip</h4>
        <p className="text-blue-700">Start with the AI Chat Bot service - it's the easiest to set up and provides immediate value for your website visitors!</p>
      </div>
    </div>
  );
}

function ApiDocumentation() {
  const endpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/status",
      description: "Check service status",
      response: "{ status: 'operational', uptime: '99.9%' }"
    },
    {
      method: "POST",
      endpoint: "/api/v1/chat",
      description: "Send message to AI chat bot",
      response: "{ message: 'AI response', confidence: 0.95 }"
    },
    {
      method: "GET",
      endpoint: "/api/v1/analytics",
      description: "Get analytics data",
      response: "{ visitors: 1234, pageviews: 5678, ... }"
    },
    {
      method: "POST",
      endpoint: "/api/v1/seo/analyze",
      description: "Analyze SEO for a URL",
      response: "{ score: 85, recommendations: [...] }"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🔧 API Reference</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Authentication</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <code className="text-sm text-gray-800">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Endpoints</h3>
        {endpoints.map((endpoint, index) => (
          <EndpointCard key={index} {...endpoint} />
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
        <h4 className="font-bold text-yellow-800 mb-2">⚠️ Rate Limits</h4>
        <p className="text-yellow-700">Free Plan: 100 requests/hour | Pro Plan: 1,000 requests/hour | Enterprise: Unlimited</p>
      </div>
    </div>
  );
}

function TutorialsSection() {
  const tutorials = [
    {
      title: "🤖 Setting Up AI Chat Bot",
      description: "Complete guide to integrating AI chat on your website",
      difficulty: "Beginner",
      time: "15 min",
      tags: ["AI", "Integration", "JavaScript"]
    },
    {
      title: "📊 Analytics Dashboard Integration",
      description: "Connect your website analytics to Aranya One dashboard",
      difficulty: "Intermediate",
      time: "30 min",
      tags: ["Analytics", "API", "Dashboard"]
    },
    {
      title: "🔍 Advanced SEO Optimization",
      description: "Use AI-powered SEO tools to boost your rankings",
      difficulty: "Advanced",
      time: "45 min",
      tags: ["SEO", "AI", "Optimization"]
    },
    {
      title: "📱 Social Media Automation",
      description: "Automate your social media posting and engagement",
      difficulty: "Intermediate",
      time: "25 min",
      tags: ["Social Media", "Automation", "Scheduling"]
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">💡 Tutorials & Guides</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={index} {...tutorial} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
          📚 View All Tutorials
        </button>
      </div>
    </div>
  );
}

function StepCard({ number, title, description, code, highlight = false }) {
  return (
    <div className={`p-6 rounded-lg border-l-4 ${highlight ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-blue-500'}`}>
      <div className="flex items-start gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${highlight ? 'bg-green-500' : 'bg-blue-500'}`}>
          {number}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
          <p className="text-gray-600 mb-4">{description}</p>
          {code && (
            <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm whitespace-pre">{code}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EndpointCard({ method, endpoint, description, response }) {
  const methodColor = {
    'GET': 'bg-green-100 text-green-800',
    'POST': 'bg-blue-100 text-blue-800',
    'PUT': 'bg-yellow-100 text-yellow-800',
    'DELETE': 'bg-red-100 text-red-800'
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${methodColor[method]}`}>
          {method}
        </span>
        <code className="text-lg font-mono text-gray-800">{endpoint}</code>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="bg-gray-50 rounded p-3">
        <h5 className="text-sm font-semibold text-gray-700 mb-1">Example Response:</h5>
        <code className="text-sm text-gray-600">{response}</code>
      </div>
    </div>
  );
}

function TutorialCard({ title, description, difficulty, time, tags }) {
  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor[difficulty]}`}>
          {difficulty}
        </span>
        <span className="text-sm text-gray-500">⏱️ {time}</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
