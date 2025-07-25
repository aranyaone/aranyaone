import Head from 'next/head';
import { memo, useState } from 'react';
import Loading from '../components/Loading';
import AlertBar from '../components/AlertBar';

const PluginCard = memo(function PluginCard({ plugin, onDeploy, onDelete, isDeploying }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{plugin.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{plugin.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Version: {plugin.version}</span>
            <span>•</span>
            <span>Status: 
              <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                plugin.status === 'active' ? 'bg-green-100 text-green-800' :
                plugin.status === 'deploying' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {plugin.status}
              </span>
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onDeploy(plugin.id)}
            disabled={isDeploying === plugin.id || plugin.status === 'deploying'}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeploying === plugin.id ? 'Deploying...' : 'Deploy'}
          </button>
          
          <button
            onClick={() => onDelete(plugin.id)}
            disabled={isDeploying === plugin.id}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

export default function PluginDeploy() {
  const [plugins, setPlugins] = useState([
    {
      id: 1,
      name: 'Analytics Dashboard Plugin',
      description: 'Advanced analytics and reporting dashboard with real-time metrics',
      version: '1.2.0',
      status: 'active'
    },
    {
      id: 2,
      name: 'User Management Extension',
      description: 'Extended user management capabilities with role-based access control',
      version: '2.1.0',
      status: 'inactive'
    },
    {
      id: 3,
      name: 'Payment Gateway Integration',
      description: 'Secure payment processing with multiple gateway support',
      version: '1.0.0',
      status: 'deploying'
    }
  ]);

  const [isDeploying, setIsDeploying] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addAlert = (message, type) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 5000);
  };

  const handleDeploy = async (pluginId) => {
    setIsDeploying(pluginId);
    setIsLoading(true);
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setPlugins(prev => prev.map(plugin => 
        plugin.id === pluginId 
          ? { ...plugin, status: 'active' }
          : plugin
      ));
      
      addAlert('Plugin deployed successfully!', 'success');
    } catch (error) {
      addAlert('Failed to deploy plugin. Please try again.', 'error');
    } finally {
      setIsDeploying(null);
      setIsLoading(false);
    }
  };

  const handleDelete = async (pluginId) => {
    if (!confirm('Are you sure you want to delete this plugin?')) return;
    
    setIsLoading(true);
    
    try {
      // Simulate deletion process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPlugins(prev => prev.filter(plugin => plugin.id !== pluginId));
      addAlert('Plugin deleted successfully!', 'success');
    } catch (error) {
      addAlert('Failed to delete plugin. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = () => {
    addAlert('Plugin upload feature coming soon!', 'info');
  };

  return (
    <div>
      <Head>
        <title>Plugin Deploy - Aranya One</title>
        <meta name="description" content="Deploy and manage plugins for your Aranya One platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          {/* Alert Messages */}
          <div className="mb-6">
            {alerts.map(alert => (
              <AlertBar
                key={alert.id}
                message={alert.message}
                type={alert.type}
                dismissible={true}
                onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
              />
            ))}
          </div>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">🔌 Plugin Deployment Panel</h1>
                <p className="text-gray-600">Deploy, manage, and monitor your platform plugins</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  📁 Upload Plugin
                </button>
                
                <a
                  href="/dashboard"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Back to Dashboard
                </a>
              </div>
            </div>
          </div>

          {/* Admin Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <span className="text-yellow-600 text-lg mr-3">⚠️</span>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Admin Access Required</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This is an administrative feature. Plugin deployment requires proper permissions and should only be performed by authorized personnel.
                </p>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <Loading overlay={true} text="Processing..." color="blue" />
          )}

          {/* Plugin Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {plugins.filter(p => p.status === 'active').length}
              </div>
              <div className="text-gray-600">Active Plugins</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">
                {plugins.filter(p => p.status === 'deploying').length}
              </div>
              <div className="text-gray-600">Deploying</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">
                {plugins.length}
              </div>
              <div className="text-gray-600">Total Plugins</div>
            </div>
          </div>

          {/* Plugin List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Installed Plugins</h2>
            
            {plugins.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 text-4xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Plugins Installed</h3>
                <p className="text-gray-600 mb-4">Get started by uploading your first plugin</p>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Plugin
                </button>
              </div>
            ) : (
              plugins.map(plugin => (
                <PluginCard
                  key={plugin.id}
                  plugin={plugin}
                  onDeploy={handleDeploy}
                  onDelete={handleDelete}
                  isDeploying={isDeploying}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-600">
            <p>🔧 Plugin management system for Aranya One platform</p>
            <p className="text-sm mt-2">Always test plugins in a development environment first</p>
          </div>
        </div>
      </main>
    </div>
  );
}