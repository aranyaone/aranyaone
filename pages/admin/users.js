import Head from 'next/head';
import { useState, useEffect } from 'react';
import AdminProtection from '../../components/admin/AdminProtection';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

// Mock user data - replace with real API calls in production
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    subscription: 'premium',
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '2024-01-16',
    totalSpent: 250
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    subscription: 'basic',
    status: 'active',
    joinDate: '2024-01-05',
    lastActive: '2024-01-15',
    totalSpent: 50
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    subscription: 'premium',
    status: 'suspended',
    joinDate: '2023-12-20',
    lastActive: '2024-01-10',
    totalSpent: 180
  },
  {
    id: 4,
    name: 'Admin User',
    email: 'admin@aranyaone.com',
    role: 'admin',
    subscription: 'admin',
    status: 'active',
    joinDate: '2023-01-01',
    lastActive: '2024-01-16',
    totalSpent: 0
  }
];

export default function AdminUsers() {
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => {
    const matchesFilter = filter === 'all' || u.status === filter || u.subscription === filter;
    const matchesSearch = searchTerm === '' || 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (userId, newStatus) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ));
    showSuccess(`User status updated to ${newStatus}`);
  };

  const handleSubscriptionChange = (userId, newSubscription) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, subscription: newSubscription } : u
    ));
    showSuccess(`Subscription updated to ${newSubscription}`);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.inactive;
  };

  const getSubscriptionColor = (subscription) => {
    const colors = {
      basic: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800',
      admin: 'bg-yellow-100 text-yellow-800'
    };
    return colors[subscription] || colors.basic;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Admin Users - Aranya One</title>
          <meta name="description" content="Admin user management panel" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  👥 Admin Panel - Users
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage users and subscriptions
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
                className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 text-sm font-medium"
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
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
              >
                🔧 Toggles
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Filter:</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Users</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="basic">Basic Plan</option>
                    <option value="premium">Premium Plan</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    {filteredUsers.length} users
                  </span>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSubscriptionColor(user.subscription)}`}>
                            {user.subscription}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div>Joined: {formatDate(user.joinDate)}</div>
                            <div>Last: {formatDate(user.lastActive)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${user.totalSpent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user.role !== 'admin' && (
                            <div className="flex flex-col space-y-2">
                              <div className="flex space-x-2">
                                <select
                                  value={user.status}
                                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                  className="border border-gray-300 rounded text-xs px-2 py-1"
                                >
                                  <option value="active">Active</option>
                                  <option value="suspended">Suspended</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                              </div>
                              <div className="flex space-x-2">
                                <select
                                  value={user.subscription}
                                  onChange={(e) => handleSubscriptionChange(user.id, e.target.value)}
                                  className="border border-gray-300 rounded text-xs px-2 py-1"
                                >
                                  <option value="basic">Basic</option>
                                  <option value="premium">Premium</option>
                                </select>
                              </div>
                            </div>
                          )}
                          {user.role === 'admin' && (
                            <span className="text-xs text-gray-500">Admin user</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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