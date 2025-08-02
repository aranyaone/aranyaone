'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Play, Pause, RotateCcw, CheckCircle, 
  AlertTriangle, Activity, Zap, Database, Network,
  Monitor, Cpu, MemoryStick, Globe2, Shield
} from 'lucide-react';

export default function ServiceManager() {
  const [services, setServices] = useState([
    {
      id: 'ai-chatbot',
      name: 'AI Chatbot Service',
      status: 'running',
      uptime: '99.9%',
      requests: '125,432',
      latency: '45ms',
      memory: '2.3GB',
      description: 'Advanced conversational AI with natural language processing'
    },
    {
      id: 'content-generator',
      name: 'Content Generator',
      status: 'running',
      uptime: '99.7%',
      requests: '89,234',
      latency: '67ms',
      memory: '1.8GB',
      description: 'AI-powered content creation and optimization'
    },
    {
      id: 'data-analytics',
      name: 'Data Analytics Engine',
      status: 'running',
      uptime: '99.8%',
      requests: '234,567',
      latency: '23ms',
      memory: '4.2GB',
      description: 'Real-time data processing and business intelligence'
    },
    {
      id: 'image-processor',
      name: 'Image Processing API',
      status: 'maintenance',
      uptime: '98.9%',
      requests: '56,789',
      latency: '120ms',
      memory: '3.1GB',
      description: 'AI-enhanced image processing and optimization'
    },
    {
      id: 'voice-synthesis',
      name: 'Voice Synthesis',
      status: 'stopped',
      uptime: '95.2%',
      requests: '23,456',
      latency: '89ms',
      memory: '1.5GB',
      description: 'Text-to-speech and voice generation service'
    },
    {
      id: 'security-scanner',
      name: 'Security Scanner',
      status: 'running',
      uptime: '99.9%',
      requests: '178,234',
      latency: '12ms',
      memory: '2.7GB',
      description: 'Real-time security monitoring and threat detection'
    }
  ]);

  const [selectedService, setSelectedService] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-50 border-green-200';
      case 'stopped': return 'text-red-600 bg-red-50 border-red-200';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'stopped': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'maintenance': return <Settings className="w-5 h-5 text-yellow-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleServiceAction = (serviceId, action) => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        let newStatus = service.status;
        switch (action) {
          case 'start':
            newStatus = 'running';
            break;
          case 'stop':
            newStatus = 'stopped';
            break;
          case 'restart':
            newStatus = 'running';
            break;
          case 'maintenance':
            newStatus = 'maintenance';
            break;
        }
        return { ...service, status: newStatus };
      }
      return service;
    }));
  };

  const ServiceCard = ({ service }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-xl p-6 transition-all hover:shadow-lg cursor-pointer ${getStatusColor(service.status)}`}
      onClick={() => setSelectedService(service)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(service.status)}
          <div>
            <h3 className="font-semibold text-lg">{service.name}</h3>
            <p className="text-sm opacity-75 capitalize">{service.status}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {service.status === 'stopped' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleServiceAction(service.id, 'start');
              }}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
          {service.status === 'running' && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleServiceAction(service.id, 'restart');
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleServiceAction(service.id, 'stop');
                }}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Pause className="w-4 h-4" />
              </button>
            </>
          )}
          {service.status === 'maintenance' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleServiceAction(service.id, 'start');
              }}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <p className="text-sm opacity-75 mb-4">{service.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Activity className="w-4 h-4 mr-1" />
          </div>
          <div className="font-semibold">{service.uptime}</div>
          <div className="text-xs opacity-75">Uptime</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Network className="w-4 h-4 mr-1" />
          </div>
          <div className="font-semibold">{service.requests}</div>
          <div className="text-xs opacity-75">Requests</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-4 h-4 mr-1" />
          </div>
          <div className="font-semibold">{service.latency}</div>
          <div className="text-xs opacity-75">Latency</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <MemoryStick className="w-4 h-4 mr-1" />
          </div>
          <div className="font-semibold">{service.memory}</div>
          <div className="text-xs opacity-75">Memory</div>
        </div>
      </div>
    </motion.div>
  );

  const runningServices = services.filter(s => s.status === 'running').length;
  const totalServices = services.length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{runningServices}</div>
              <div className="text-sm text-gray-600">Running Services</div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{totalServices}</div>
              <div className="text-sm text-gray-600">Total Services</div>
            </div>
            <Database className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">99.7%</div>
              <div className="text-sm text-gray-600">Avg Uptime</div>
            </div>
            <Monitor className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">42ms</div>
              <div className="text-sm text-gray-600">Avg Latency</div>
            </div>
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedService.name}</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedService.status)}`}>
                {selectedService.status}
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedService.description}</p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3">Performance Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="font-semibold">{selectedService.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Requests:</span>
                    <span className="font-semibold">{selectedService.requests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latency:</span>
                    <span className="font-semibold">{selectedService.latency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="font-semibold">{selectedService.memory}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleServiceAction(selectedService.id, 'restart')}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart Service
                  </button>
                  {selectedService.status === 'running' ? (
                    <button
                      onClick={() => handleServiceAction(selectedService.id, 'stop')}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Stop Service
                    </button>
                  ) : (
                    <button
                      onClick={() => handleServiceAction(selectedService.id, 'start')}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Service
                    </button>
                  )}
                  <button
                    onClick={() => handleServiceAction(selectedService.id, 'maintenance')}
                    className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Maintenance Mode
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedService(null)}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
