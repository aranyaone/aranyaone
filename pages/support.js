import Head from 'next/head'

export default function SupportPage() {
  return (
    <div>
      <Head>
        <title>Support Center - Aranya One</title>
        <meta name="description" content="Get help and support for your digital empire" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">💬 Support Center</h1>
            <p className="text-gray-600">Get help, find answers, and contact our support team</p>
          </div>

          {/* Quick Help */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <QuickHelpCard 
              icon="📚" 
              title="Knowledge Base" 
              description="Find answers to common questions"
              link="/docs"
            />
            <QuickHelpCard 
              icon="💬" 
              title="Live Chat" 
              description="Chat with our support team"
              link="#chat"
            />
            <QuickHelpCard 
              icon="📧" 
              title="Email Support" 
              description="Send us an email for detailed help"
              link="mailto:support@aranyaone.com"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Contact Form */}
            <ContactForm />
            
            {/* FAQ and Status */}
            <div className="space-y-8">
              <SystemStatus />
              <PopularQuestions />
            </div>
          </div>

          {/* Support Categories */}
          <SupportCategories />

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickHelpCard({ icon, title, description, link }) {
  return (
    <a href={link} className="block bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-colors group">
      <div className="text-center">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </a>
  );
}

function ContactForm() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Contact Support</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Your Name" placeholder="Enter your name" />
          <InputField label="Email" placeholder="your@email.com" type="email" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>🔴 High - Service Down</option>
            <option>🟡 Medium - Feature Issue</option>
            <option>🟢 Low - General Question</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>🤖 AI Chat Service</option>
            <option>📊 Analytics Dashboard</option>
            <option>🔍 SEO Optimizer</option>
            <option>📱 Social Media Manager</option>
            <option>⚙️ General/Account</option>
          </select>
        </div>
        
        <InputField label="Subject" placeholder="Brief description of your issue" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea 
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Please describe your issue in detail..."
          ></textarea>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Send Message
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
            📞 Request Call
          </button>
        </div>
      </form>
    </div>
  );
}

function SystemStatus() {
  const services = [
    { name: "AI Chat Service", status: "operational", uptime: "99.9%" },
    { name: "Analytics Dashboard", status: "operational", uptime: "99.8%" },
    { name: "SEO Optimizer", status: "maintenance", uptime: "99.5%" },
    { name: "Payment System", status: "operational", uptime: "100%" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🛡️ System Status</h2>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">{service.name}</h4>
              <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
              {service.status === 'operational' ? '✅ Operational' : 
               service.status === 'maintenance' ? '🔧 Maintenance' : '❌ Down'}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a href="#status" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Full Status Page →
        </a>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch(status) {
    case 'operational': return 'text-green-700 bg-green-100';
    case 'maintenance': return 'text-yellow-700 bg-yellow-100';
    case 'down': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

function PopularQuestions() {
  const faqs = [
    { question: "How do I reset my password?", category: "Account" },
    { question: "Why is my service showing as paused?", category: "Services" },
    { question: "How do I upgrade my plan?", category: "Billing" },
    { question: "Can I integrate with third-party tools?", category: "Technical" },
    { question: "How do I contact billing support?", category: "Billing" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">❓ Popular Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <button key={index} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800 group-hover:text-blue-600">{faq.question}</span>
              <span className="text-gray-400 group-hover:text-blue-500">→</span>
            </div>
            <span className="text-sm text-gray-500">{faq.category}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a href="#faq" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All FAQs →
        </a>
      </div>
    </div>
  );
}

function SupportCategories() {
  const categories = [
    { 
      icon: "🚀", 
      title: "Getting Started", 
      description: "Setup guides and onboarding help",
      articles: ["First Steps", "Account Setup", "Service Activation", "Basic Configuration"]
    },
    { 
      icon: "🔧", 
      title: "Technical Support", 
      description: "API documentation and troubleshooting",
      articles: ["API Reference", "Integration Guide", "Error Codes", "Performance Optimization"]
    },
    { 
      icon: "💳", 
      title: "Billing & Plans", 
      description: "Subscription management and billing",
      articles: ["Plan Comparison", "Payment Methods", "Billing Cycle", "Refund Policy"]
    },
    { 
      icon: "📱", 
      title: "Mobile App", 
      description: "Mobile app features and support",
      articles: ["Download App", "Push Notifications", "Offline Mode", "Sync Issues"]
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">📚 Help Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:border-blue-300 transition-colors group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="space-y-2">
              {category.articles.map((article, i) => (
                <a key={i} href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                  • {article}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputField({ label, placeholder, type = "text" }) {
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
        aria-describedby={`${fieldId}-desc`}
      />
    </div>
  );
}
