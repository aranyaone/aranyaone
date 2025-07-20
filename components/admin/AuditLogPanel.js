import { useState, useEffect } from 'react';

// Mock audit log data - replace with real API calls in production
const mockAuditLogs = [
  {
    id: 1,
    timestamp: '2024-01-16T15:30:00.000Z',
    adminUser: 'admin@aranyaone.com',
    action: 'feedback_approved',
    target: 'Feedback #15',
    details: 'Approved feedback for Analytics Dashboard',
    ipAddress: '192.168.1.100'
  },
  {
    id: 2,
    timestamp: '2024-01-16T14:25:00.000Z',
    adminUser: 'admin@aranyaone.com',
    action: 'user_suspended',
    target: 'User: mike@example.com',
    details: 'Suspended user account for policy violation',
    ipAddress: '192.168.1.100'
  },
  {
    id: 3,
    timestamp: '2024-01-16T13:15:00.000Z',
    adminUser: 'admin@aranyaone.com',
    action: 'feature_toggle',
    target: 'Payment Gateway',
    details: 'Disabled payment gateway for maintenance',
    ipAddress: '192.168.1.100'
  },
  {
    id: 4,
    timestamp: '2024-01-16T12:05:00.000Z',
    adminUser: 'admin@aranyaone.com',
    action: 'push_alert_sent',
    target: 'All Users',
    details: 'Sent maintenance notification to all users',
    ipAddress: '192.168.1.100'
  },
  {
    id: 5,
    timestamp: '2024-01-16T11:30:00.000Z',
    adminUser: 'admin@aranyaone.com',
    action: 'subscription_updated',
    target: 'User: jane@example.com',
    details: 'Upgraded subscription from basic to premium',
    ipAddress: '192.168.1.100'
  }
];

const AuditLogPanel = ({ limit = 50 }) => {
  const [logs, setLogs] = useState(mockAuditLogs);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.action.includes(filter));

  const refreshLogs = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLogs(mockAuditLogs);
      setLoading(false);
    }, 1000);
  };

  const getActionIcon = (action) => {
    const icons = {
      feedback_approved: '✅',
      feedback_rejected: '❌',
      user_suspended: '🚫',
      user_activated: '✨',
      feature_toggle: '🔧',
      push_alert_sent: '📢',
      subscription_updated: '💳',
      login: '🔑',
      logout: '🚪'
    };
    return icons[action] || '📝';
  };

  const getActionColor = (action) => {
    const colors = {
      feedback_approved: 'text-green-600',
      feedback_rejected: 'text-red-600',
      user_suspended: 'text-red-600',
      user_activated: 'text-green-600',
      feature_toggle: 'text-blue-600',
      push_alert_sent: 'text-purple-600',
      subscription_updated: 'text-indigo-600',
      login: 'text-gray-600',
      logout: 'text-gray-600'
    };
    return colors[action] || 'text-gray-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const actionTypes = ['all', 'feedback', 'user', 'feature', 'push', 'subscription'];

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            📋 Admin Audit Log
          </h3>
          
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {actionTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Actions' : `${type.charAt(0).toUpperCase()}${type.slice(1)} Actions`}
                </option>
              ))}
            </select>
            
            <button
              onClick={refreshLogs}
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '🔄 Loading...' : '🔄 Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Log Entries */}
      <div className="max-h-96 overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No audit logs found
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredLogs.slice(0, limit).map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <span className={`text-lg ${getActionColor(log.action)}`}>
                    {getActionIcon(log.action)}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {log.adminUser}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(log.timestamp)}
                      </p>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">{log.action.replace('_', ' ')}</span>
                      {' → '}
                      <span className="text-gray-800">{log.target}</span>
                    </p>
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {log.details}
                    </p>
                    
                    <p className="text-xs text-gray-400 mt-1">
                      IP: {log.ipAddress}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {Math.min(filteredLogs.length, limit)} of {filteredLogs.length} entries</span>
          <span>Real-time audit logging enabled</span>
        </div>
      </div>
    </div>
  );
};

export default AuditLogPanel;