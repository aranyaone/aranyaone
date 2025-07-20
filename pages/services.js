import Head from 'next/head'
import { useState, useEffect } from 'react'
import FeedbackCard from '../components/feedback/FeedbackCard'

export default function ServicesPage() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  useEffect(() => {
    fetchServiceFeedback();
  }, []);

  const fetchServiceFeedback = async () => {
    try {
      const response = await fetch('/api/feedback?serviceId=services&limit=3');
      if (response.ok) {
        const data = await response.json();
        setFeedbackData(data.feedback || []);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoadingFeedback(false);
    }
  };
  return (
    <div>
      <Head>
        <title>Services - Aranya One</title>
        <meta name="description" content="Manage all your empire services" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🛠️ Service Manager</h1>
            <p className="text-gray-600">Control and monitor all your digital empire services</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon="✅" title="Active Services" count="8" status="Currently Running" border="green" />
            <StatCard icon="⏸️" title="Paused Services" count="3" status="Temporarily Stopped" border="yellow" />
            <StatCard icon="❌" title="Cancelled Services" count="2" status="Stopped Services" border="red" />
            <StatCard icon="📊" title="Total Usage" count="75%" status="Average Usage" border="blue" />
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            {/* Core Services */}
            <ServiceCategory 
              title="Core Services" 
              color="green" 
              services={[
                { icon: "🤖", name: "AI Chat Service", status: "Active", usage: "75%", price: "₹29/month" },
                { icon: "📊", name: "Analytics Dashboard", status: "Active", usage: "60%", price: "₹39/month" },
                { icon: "🔐", name: "Security Manager", status: "Active", usage: "90%", price: "₹49/month" },
              ]} 
            />

            {/* Marketing Services */}
            <ServiceCategory 
              title="Marketing Services" 
              color="blue" 
              services={[
                { icon: "🔍", name: "SEO Optimizer", status: "Active", usage: "45%", price: "₹35/month" },
                { icon: "📱", name: "Social Media Manager", status: "Paused", usage: "0%", price: "₹25/month" },
                { icon: "📧", name: "Email Marketing", status: "Active", usage: "55%", price: "₹30/month" },
              ]} 
            />

            {/* Advanced Services */}
            <ServiceCategory 
              title="Advanced Services" 
              color="purple" 
              services={[
                { icon: "🎨", name: "Design Studio", status: "Active", usage: "30%", price: "₹45/month" },
                { icon: "🎯", name: "Content Optimizer", status: "Cancelled", usage: "0%", price: "₹40/month" },
                { icon: "📈", name: "Growth Analytics", status: "Paused", usage: "0%", price: "₹55/month" },
              ]} 
            />
          </div>

          {/* Recommended Services */}
          <RecommendedServices />

          {/* Quick Actions */}
          <QuickActions />

          {/* Customer Feedback Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💬 Customer Feedback</h2>
            
            {loadingFeedback ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading feedback...</p>
              </div>
            ) : feedbackData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbackData.map((feedback) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No feedback available yet.</p>
                <p className="text-sm mt-1">Be the first to share your experience!</p>
              </div>
            )}
            
            <div className="text-center mt-6">
              <a
                href="#feedback-form"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                📝 Share Your Feedback
              </a>
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

function StatCard({ icon, title, count, status, border }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 border-2 border-${border}-200`}>
      <div className="text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className={`text-3xl font-bold text-${border}-600 mt-2`}>{count}</div>
        <p className="text-sm text-gray-500 mt-1">{status}</p>
      </div>
    </div>
  );
}

function ServiceCategory({ title, color, services }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 border-2 border-${color}-200`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="space-y-4">
        {services.map((service, idx) => (
          <div key={idx} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{service.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.usage} usage</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                {service.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">{service.price}</span>
              <div className="flex gap-2">
                <button className={`px-3 py-1 text-xs font-medium rounded-lg ${
                  service.status === 'Active' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}>
                  {service.status === 'Active' ? 'Pause' : 'Start'}
                </button>
                <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Settings
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch(status) {
    case 'Active': return 'text-green-700 bg-green-100';
    case 'Paused': return 'text-yellow-700 bg-yellow-100';
    case 'Cancelled': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

function RecommendedServices() {
  const services = [
    { icon: "🎯", name: "Content Optimizer", desc: "AI-powered content optimization", price: "₹25/month", color: "blue" },
    { icon: "📧", name: "Advanced Email Marketing", desc: "Automated email campaigns with AI", price: "₹35/month", color: "green" },
    { icon: "🎨", name: "Pro Design Studio", desc: "Premium AI-generated designs", price: "₹40/month", color: "purple" },
    { icon: "🚀", name: "Growth Accelerator", desc: "Boost your empire's growth", price: "₹60/month", color: "orange" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🌟 Recommended Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <div key={i} className={`p-6 bg-gradient-to-br from-${service.color}-50 to-${service.color}-100 rounded-xl border border-${service.color}-200`}>
            <div className="text-3xl mb-4">{service.icon}</div>
            <h3 className="font-bold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">{service.price}</span>
              <button className={`px-4 py-2 bg-${service.color}-500 text-white rounded-lg text-sm hover:bg-${service.color}-600 transition-colors`}>
                Try Free
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { icon: "➕", label: "Add New Service", desc: "Browse available services", bg: "blue" },
    { icon: "📈", label: "View Analytics", desc: "Service performance", bg: "green", link: "/analytics" },
    { icon: "⚙️", label: "Global Settings", desc: "Configure preferences", bg: "purple", link: "/settings" },
    { icon: "💬", label: "Support Center", desc: "Get help", bg: "orange", link: "/support" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⚡ Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <button 
            key={i} 
            onClick={() => action.link && (window.location.href = action.link)}
            className={`p-4 bg-${action.bg}-500 text-white rounded-xl hover:bg-${action.bg}-600 transition-colors text-left`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">{action.icon}</div>
              <div className="font-semibold">{action.label}</div>
            </div>
            <div className="text-sm opacity-90">{action.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
