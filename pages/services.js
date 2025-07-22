import { memo, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { mockServiceData } from '../data/mockData';
import { formatRelativeTime } from '../utils';

const ServiceCard = memo(function ServiceCard({ service, onDeploy, onViewLogs }) {
  const statusColors = {
    running: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    stopped: 'bg-gray-100 text-gray-800',
  };
  
  const statusIcons = {
    running: '✅',
    warning: '⚠️',
    error: '❌',
    stopped: '⏹️',
  };
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">⚙️</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-500">v{service.version}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[service.status]}`}>
          {statusIcons[service.status]} {service.status}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Health</span>
          <div className="flex items-center space-x-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${service.health}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{service.health}%</span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Requests</span>
          <span className="text-sm font-medium">{service.requests.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Last Deployed</span>
          <span className="text-sm font-medium">{formatRelativeTime(service.lastDeployed)}</span>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <Button size="sm" onClick={() => onDeploy(service)}>
          🚀 Deploy
        </Button>
        <Button variant="outline" size="sm" onClick={() => onViewLogs(service)}>
          📋 Logs
        </Button>
      </div>
    </Card>
  );
});

const DeploymentItem = memo(function DeploymentItem({ deployment }) {
  const statusColors = {
    success: 'text-green-600',
    failed: 'text-red-600',
    pending: 'text-yellow-600',
  };
  
  const statusIcons = {
    success: '✅',
    failed: '❌',
    pending: '⏳',
  };
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <div className={`text-lg ${statusColors[deployment.status]}`}>
          {statusIcons[deployment.status]}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{deployment.service}</p>
          <p className="text-xs text-gray-500">v{deployment.version} • {formatRelativeTime(deployment.timestamp)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{deployment.duration}</p>
        {deployment.error && (
          <p className="text-xs text-red-600">{deployment.error}</p>
        )}
      </div>
    </div>
  );
});

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  
  useEffect(() => {
    // Simulate API calls with mock data
    setServices(mockServiceData.services);
    setDeployments(mockServiceData.deployments);
  }, []);
  
  const handleDeploy = (service) => {
    setSelectedService(service);
    setShowDeployModal(true);
  };
  
  const handleViewLogs = (service) => {
    setSelectedService(service);
    setShowLogsModal(true);
  };
  
  const confirmDeploy = () => {
    // Simulate deployment
    console.log('Deploying service:', selectedService.name);
    setShowDeployModal(false);
    setSelectedService(null);
  };
  
  return (
    <Layout title="Services - Aranya One">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">⚙️ Services</h1>
            <p className="text-gray-600">Manage and monitor your digital empire services</p>
          </div>
          
          <Button>
            ➕ Add Service
          </Button>
        </div>
        
        {/* Service Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-3xl mb-2 text-green-600">✅</div>
            <h3 className="text-sm font-medium text-gray-500">Running</h3>
            <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.status === 'running').length}</p>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2 text-yellow-600">⚠️</div>
            <h3 className="text-sm font-medium text-gray-500">Warning</h3>
            <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.status === 'warning').length}</p>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2 text-blue-600">📊</div>
            <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
            <p className="text-2xl font-bold text-gray-900">{services.reduce((sum, s) => sum + s.requests, 0).toLocaleString()}</p>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2 text-purple-600">⚡</div>
            <h3 className="text-sm font-medium text-gray-500">Avg Health</h3>
            <p className="text-2xl font-bold text-gray-900">{Math.round(services.reduce((sum, s) => sum + s.health, 0) / services.length)}%</p>
          </Card>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDeploy={handleDeploy}
              onViewLogs={handleViewLogs}
            />
          ))}
        </div>
        
        {/* Recent Deployments */}
        <Card>
          <Card.Header>
            <Card.Title>Recent Deployments</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="max-h-64 overflow-y-auto">
              {deployments.map((deployment) => (
                <DeploymentItem key={deployment.id} deployment={deployment} />
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
      
      {/* Deploy Modal */}
      <Modal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        title="Deploy Service"
        footer={
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowDeployModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDeploy}>
              Deploy
            </Button>
          </div>
        }
      >
        {selectedService && (
          <div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to deploy <strong>{selectedService.name}</strong>?
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Current version: v{selectedService.version}</p>
              <p className="text-sm text-gray-600">Status: {selectedService.status}</p>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Logs Modal */}
      <Modal
        isOpen={showLogsModal}
        onClose={() => setShowLogsModal(false)}
        title={`Logs - ${selectedService?.name}`}
        size="lg"
      >
        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
          <div>2024-01-15 10:30:15 [INFO] Service started successfully</div>
          <div>2024-01-15 10:30:16 [INFO] Listening on port 8080</div>
          <div>2024-01-15 10:31:22 [INFO] Health check passed</div>
          <div>2024-01-15 10:32:45 [INFO] Request processed: GET /api/users</div>
          <div>2024-01-15 10:33:12 [INFO] Database connection established</div>
          <div>2024-01-15 10:34:01 [WARN] High memory usage detected: 85%</div>
          <div>2024-01-15 10:35:15 [INFO] Request processed: POST /api/orders</div>
          <div>2024-01-15 10:36:22 [INFO] Cache cleared successfully</div>
        </div>
      </Modal>
    </Layout>
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
