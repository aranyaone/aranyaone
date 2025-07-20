import Head from 'next/head';
import { memo, useState, useEffect } from 'react';
import Loading from '../components/Loading';

const BrainRoom = memo(function BrainRoom() {
  const [isLoading, setIsLoading] = useState(true);
  const [roomState, setRoomState] = useState('initializing');
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    // Simulate loading and initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
      setRoomState('ready');
      setConnections(Math.floor(Math.random() * 10) + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: '🧠',
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms analyze your data patterns in real-time'
    },
    {
      icon: '🔮',
      title: 'Predictive Insights',
      description: 'Forecast trends and identify opportunities before they become obvious'
    },
    {
      icon: '🌐',
      title: 'Connected Intelligence',
      description: 'Link multiple data sources for comprehensive business intelligence'
    },
    {
      icon: '⚡',
      title: 'Real-Time Processing',
      description: 'Instant data processing with sub-second response times'
    },
    {
      icon: '🎯',
      title: 'Smart Recommendations',
      description: 'Personalized suggestions based on your business context and goals'
    },
    {
      icon: '🔒',
      title: 'Secure by Design',
      description: 'Enterprise-grade security with end-to-end encryption'
    }
  ];

  const stats = [
    { label: 'Neural Networks', value: '847', unit: 'models' },
    { label: 'Data Points', value: '1.2M', unit: 'processed' },
    { label: 'Accuracy Rate', value: '94.7', unit: '%' },
    { label: 'Response Time', value: '<100', unit: 'ms' }
  ];

  if (isLoading) {
    return (
      <div>
        <Head>
          <title>Brain Room - Aranya One</title>
          <meta name="description" content="AI-powered intelligence center for advanced analytics and insights" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Loading overlay={true} text="Initializing Brain Room..." color="purple" />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Brain Room - Aranya One</title>
        <meta name="description" content="AI-powered intelligence center for advanced analytics and insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
              <span className="text-4xl text-white">🧠</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Brain Room</h1>
            <p className="text-xl text-gray-600 mb-2">AI-Powered Intelligence Center</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className={`px-3 py-1 rounded-full ${
                roomState === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                Status: {roomState}
              </span>
              <span>•</span>
              <span>{connections} active connections</span>
            </div>
          </div>

          {/* Coming Soon Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">🚀 Coming Soon</h2>
            <p className="text-lg mb-6 opacity-90">
              The Brain Room is currently in development. Get ready for the most advanced AI-powered analytics platform.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Waitlist
              </button>
              <button className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Planned Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Projected Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">{stat.unit}</div>
                  <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Progress */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Development Progress</h3>
            
            <div className="space-y-4">
              {[
                { phase: 'Core AI Engine', progress: 75, status: 'In Progress' },
                { phase: 'Data Pipeline', progress: 60, status: 'In Progress' },
                { phase: 'User Interface', progress: 40, status: 'Planning' },
                { phase: 'Security Layer', progress: 85, status: 'Testing' },
                { phase: 'API Integration', progress: 30, status: 'Planning' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.phase}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'Testing' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{item.progress}% complete</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <a
              href="/dashboard"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back to Dashboard
            </a>
            
            <a
              href="/analytics"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Current Analytics →
            </a>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-600">
            <p>🔬 Brain Room - Where AI meets intelligence</p>
            <p className="text-sm mt-2">Stay tuned for the future of data analytics</p>
          </div>
        </div>
      </main>
    </div>
  );
});

export default BrainRoom;