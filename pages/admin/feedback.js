import Head from 'next/head';
import AdminProtection from '../../components/admin/AdminProtection';
import FeedbackModerationTable from '../../components/admin/FeedbackModerationTable';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminFeedback() {
  const { user, logout } = useAuth();

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Admin Feedback - Aranya One</title>
          <meta name="description" content="Admin feedback moderation panel" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  🛠️ Admin Panel - Feedback
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Moderate and manage user feedback
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
                className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 text-sm font-medium"
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
            <FeedbackModerationTable />
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