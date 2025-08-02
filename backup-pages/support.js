import { memo, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Form from '../components/forms/Form';
import { TabNavigation } from '../components/navigation';

const FAQItem = memo(function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
});

const ContactForm = memo(function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting support ticket:', formData);
    // Here you would typically send the data to your API
    alert('Support ticket submitted successfully!');
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <Card>
      <Card.Header>
        <Card.Title>📝 Contact Support</Card.Title>
      </Card.Header>
      <Card.Content>
        <Form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group>
              <Form.Label htmlFor="name" required>Full Name</Form.Label>
              <Form.Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label htmlFor="email" required>Email Address</Form.Label>
              <Form.Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </Form.Group>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group>
              <Form.Label htmlFor="subject" required>Subject</Form.Label>
              <Form.Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label htmlFor="priority">Priority</Form.Label>
              <Form.Select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'urgent', label: 'Urgent' }
                ]}
              />
            </Form.Group>
          </div>
          
          <Form.Group>
            <Form.Label htmlFor="message" required>Message</Form.Label>
            <Form.Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={6}
              placeholder="Please describe your issue in detail..."
              required
            />
          </Form.Group>
          
          <Button type="submit">Send Message</Button>
        </Form>
      </Card.Content>
    </Card>
  );
});

const ResourceCard = memo(function ResourceCard({ icon, title, description, link }) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <Card.Content className="text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline" size="sm">
          {link}
        </Button>
      </Card.Content>
    </Card>
  );
});

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('faq');
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const tabs = [
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'resources', label: 'Resources', icon: '📚' },
    { id: 'status', label: 'System Status', icon: '🟢' }
  ];
  
  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'You can reset your password by going to Settings > Security > Change Password, or by clicking the "Forgot Password" link on the login page.'
    },
    {
      id: 2,
      question: 'How do I deploy a new service?',
      answer: 'Navigate to the Services page, click "Add Service", fill in the required information, and click "Deploy". The deployment process typically takes 2-5 minutes.'
    },
    {
      id: 3,
      question: 'Can I export my analytics data?',
      answer: 'Yes! Go to the Analytics page and click the "Export" button in the top right corner. You can export data in CSV, JSON, or PDF formats.'
    },
    {
      id: 4,
      question: 'How do I upgrade my plan?',
      answer: 'Visit Settings > Billing to view available plans and upgrade options. All upgrades are prorated and take effect immediately.'
    },
    {
      id: 5,
      question: 'What are the API rate limits?',
      answer: 'Free tier: 1,000 requests/hour. Pro tier: 10,000 requests/hour. Enterprise: Custom limits. You can view your current usage in Settings > API.'
    }
  ];
  
  const resources = [
    {
      icon: '📖',
      title: 'Documentation',
      description: 'Complete guides and API reference',
      link: 'Browse Docs'
    },
    {
      icon: '🎥',
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: 'Watch Videos'
    },
    {
      icon: '💬',
      title: 'Community Forum',
      description: 'Connect with other users',
      link: 'Join Forum'
    },
    {
      icon: '🔧',
      title: 'API Reference',
      description: 'Complete API documentation',
      link: 'View API Docs'
    }
  ];
  
  return (
    <Layout title="Support - Aranya One">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">💬 Support Center</h1>
          <p className="text-gray-600">Get help and find answers to your questions</p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-3xl mb-2 text-green-600">⚡</div>
            <h3 className="text-sm font-medium text-gray-500">Avg Response Time</h3>
            <p className="text-2xl font-bold text-gray-900">&lt; 2 hours</p>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2 text-blue-600">🎯</div>
            <h3 className="text-sm font-medium text-gray-500">Resolution Rate</h3>
            <p className="text-2xl font-bold text-gray-900">98.5%</p>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2 text-purple-600">📚</div>
            <h3 className="text-sm font-medium text-gray-500">Help Articles</h3>
            <p className="text-2xl font-bold text-gray-900">150+</p>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2 text-yellow-600">⭐</div>
            <h3 className="text-sm font-medium text-gray-500">Satisfaction</h3>
            <p className="text-2xl font-bold text-gray-900">4.9/5</p>
          </Card>
        </div>
        
        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        {/* Tab Content */}
        <div>
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <Card>
                <Card.Header>
                  <Card.Title>❓ Frequently Asked Questions</Card.Title>
                </Card.Header>
                <Card.Content className="space-y-4">
                  {faqs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFAQ === faq.id}
                      onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                    />
                  ))}
                </Card.Content>
              </Card>
            </div>
          )}
          
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              
              <div className="space-y-4">
                <Card>
                  <Card.Header>
                    <Card.Title>📞 Other Ways to Reach Us</Card.Title>
                  </Card.Header>
                  <Card.Content className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Support</h4>
                      <p className="text-sm text-gray-600">support@aranyaone.com</p>
                      <p className="text-xs text-gray-500">Response within 2 hours</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">Live Chat</h4>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                      <Button size="sm" className="mt-2">Start Chat</Button>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">Phone Support</h4>
                      <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-xs text-gray-500">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </Card.Content>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  icon={resource.icon}
                  title={resource.title}
                  description={resource.description}
                  link={resource.link}
                />
              ))}
            </div>
          )}
          
          {activeTab === 'status' && (
            <Card>
              <Card.Header>
                <Card.Title>🟢 System Status</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-900">All Systems Operational</span>
                    </div>
                    <span className="text-sm text-green-700">Last updated: 5 minutes ago</span>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'API Gateway', status: 'operational', uptime: '99.98%' },
                      { name: 'Dashboard', status: 'operational', uptime: '99.95%' },
                      { name: 'Analytics Engine', status: 'operational', uptime: '99.99%' },
                      { name: 'Service Deployments', status: 'operational', uptime: '99.92%' },
                      { name: 'Database', status: 'operational', uptime: '99.97%' },
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">{service.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="text-green-600 font-medium">{service.uptime}</span> uptime
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Content>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}