import Head from 'next/head';
import { useState } from 'react';
import AdminProtection from '../../components/admin/AdminProtection';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

// Mock feature toggles - replace with real API calls in production
const initialToggles = [
  {
    id: 'analytics_dashboard',
    name: 'Analytics Dashboard',
    description: 'Enable/disable the analytics dashboard for users',
    enabled: true,
    category: 'Features'
  },
  {
    id: 'feedback_system',
    name: 'Feedback System',
    description: 'Allow users to submit and view feedback',
    enabled: true,
    category: 'Features'
  },
  {
    id: 'payment_gateway',
    name: 'Payment Gateway',
    description: 'Enable Stripe/Razorpay payment processing',
    enabled: false,
    category: 'Payments'
  },
  {
    id: 'email_notifications',
    name: 'Email Notifications',
    description: 'Send email notifications to users',
    enabled: true,
    category: 'Notifications'
  },
  {
    id: 'maintenance_mode',
    name: 'Maintenance Mode',
    description: 'Put the site in maintenance mode',
    enabled: false,
    category: 'System'
  },
  {
    id: 'new_registrations',
    name: 'New Registrations',
    description: 'Allow new user registrations',
    enabled: true,
    category: 'System'
  },
  {
    id: 'affiliate_program',
    name: 'Affiliate Program',
    description: 'Enable the affiliate referral system',
    enabled: false,
    category: 'Marketing'
  },
  {
    id: 'api_access',
    name: 'API Access',
    description: 'Enable API access for users',
    enabled: true,
    category: 'API'
  }
];

export default function AdminToggles() {
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [toggles, setToggles] = useState(initialToggles);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(toggles.map(t => t.category))];
  
  const filteredToggles = filter === 'all' 
    ? toggles 
    : toggles.filter(t => t.category === filter);

  const handleToggleChange = (toggleId, enabled) => {
    setToggles(prev => prev.map(t => 
      t.id === toggleId ? { ...t, enabled } : t
    ));
    
    const toggle = toggles.find(t => t.id === toggleId);
    showSuccess(`${toggle?.name} ${enabled ? 'enabled' : 'disabled'}`);
    
    // In production, make API call to update toggle
    // await updateToggle(toggleId, enabled);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Features: 'bg-blue-100 text-blue-800',
      Payments: 'bg-green-100 text-green-800',
      Notifications: 'bg-yellow-100 text-yellow-800',
      System: 'bg-red-100 text-red-800',
      Marketing: 'bg-purple-100 text-purple-800',
      API: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const ToggleSwitch = ({ enabled, onChange }) => {
    return (
      <button
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${enabled ? 'bg-blue-600' : 'bg-gray-200'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    );
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Admin Toggles - Aranya One</title>
          <meta name="description" content="Admin feature toggles panel" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  🔧 Admin Panel - Feature Toggles
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Enable or disable features and services
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <a
                href="/admin/metrics"
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
              >
                📊 Metrics
              </a>
              <a
                href="/admin/users"
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
              >
                👥 Users
              </a>
              <a
                href="/admin/feedback"
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
              >
                📝 Feedback
              </a>
              <a
                href="/admin/toggles"
                className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 text-sm font-medium"
              >
                🔧 Toggles
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            
            {/* Filter */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Category:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">
                  {filteredToggles.length} toggles
                </span>
              </div>
            </div>

            {/* Toggles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredToggles.map((toggle) => (
                <div key={toggle.id} className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {toggle.name}
                        </h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(toggle.category)}`}>
                          {toggle.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {toggle.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${toggle.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                      {toggle.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <ToggleSwitch
                      enabled={toggle.enabled}
                      onChange={(enabled) => handleToggleChange(toggle.id, enabled)}
                    />
                  </div>
                  
                  {/* Special warnings */}
                  {toggle.id === 'maintenance_mode' && toggle.enabled && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                      ⚠️ Site is in maintenance mode
                    </div>
                  )}
                  
                  {toggle.id === 'new_registrations' && !toggle.enabled && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                      ⚠️ New registrations are disabled
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Toggle Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {toggles.filter(t => t.enabled).length}
                  </div>
                  <div className="text-sm text-gray-600">Enabled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {toggles.filter(t => !t.enabled).length}
                  </div>
                  <div className="text-sm text-gray-600">Disabled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {categories.length - 1}
                  </div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {toggles.length}
                  </div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Quick Actions */}
        <div className="fixed bottom-4 right-4">
          <a
            href="/"
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="Back to Home"
          >
            🏠
          </a>
        </div>
      </div>
    </AdminProtection>
  );
}