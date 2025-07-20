import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';

export default function AffiliateDashboard() {
  const [affiliateData, setAffiliateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    // Mock user ID - in production, get from auth context
    const mockUserId = 2;
    fetchAffiliateDashboard(mockUserId);
    fetchReferrals(mockUserId);
  }, []);

  const fetchAffiliateDashboard = async (userId) => {
    try {
      const response = await fetch(`/api/affiliate?action=dashboard&userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAffiliateData(data);
      } else {
        throw new Error('Failed to fetch affiliate data');
      }
    } catch (error) {
      console.error('Error fetching affiliate dashboard:', error);
      showError('Failed to load affiliate dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchReferrals = async (userId) => {
    try {
      const response = await fetch(`/api/affiliate?action=referrals&userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setReferrals(data.referrals || []);
      }
    } catch (error) {
      console.error('Error fetching referrals:', error);
    }
  };

  const copyReferralCode = () => {
    if (affiliateData?.affiliate?.referralCode) {
      navigator.clipboard.writeText(affiliateData.affiliate.referralCode);
      showSuccess('Referral code copied to clipboard!');
    }
  };

  const copyReferralLink = () => {
    if (affiliateData?.affiliate?.referralCode) {
      const link = `${window.location.origin}?ref=${affiliateData.affiliate.referralCode}`;
      navigator.clipboard.writeText(link);
      showSuccess('Referral link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading affiliate dashboard...</p>
        </div>
      </div>
    );
  }

  if (!affiliateData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🤝 Join Our Affiliate Program</h1>
          <p className="text-gray-600 mb-6">Start earning money by referring new users to Aranya One!</p>
          <button
            onClick={() => showError('Registration feature coming soon!')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Register as Affiliate
          </button>
          <div className="mt-4">
            <a href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  const { affiliate, stats } = affiliateData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Affiliate Dashboard - Aranya One</title>
        <meta name="description" content="Affiliate program dashboard and referral tracking" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🤝 Affiliate Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {affiliate.userName}!
              </p>
            </div>
            <div className="text-sm text-gray-600">
              Member since {new Date(affiliate.joinedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Referrals"
              value={stats.totalReferrals}
              icon="👥"
              color="blue"
            />
            <StatCard
              title="Total Earnings"
              value={`$${stats.totalEarnings.toFixed(2)}`}
              icon="💰"
              color="green"
            />
            <StatCard
              title="Pending Earnings"
              value={`$${stats.pendingEarnings.toFixed(2)}`}
              icon="⏳"
              color="yellow"
            />
            <StatCard
              title="Conversion Rate"
              value={`${(stats.conversionRate * 100).toFixed(1)}%`}
              icon="📈"
              color="purple"
            />
          </div>

          {/* Referral Tools */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              🔗 Your Referral Tools
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={affiliate.referralCode}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-l-md bg-gray-50 text-gray-900"
                  />
                  <button
                    onClick={copyReferralCode}
                    className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${affiliate.referralCode}`}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-l-md bg-gray-50 text-gray-900 text-sm"
                  />
                  <button
                    onClick={copyReferralLink}
                    className="bg-green-600 text-white px-4 py-3 rounded-r-md hover:bg-green-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="font-medium text-blue-900 mb-2">💡 How it works:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Share your referral code or link with friends</li>
                <li>• They get 10% off their first month</li>
                <li>• You earn $30 commission for each successful referral</li>
                <li>• Payments are processed monthly</li>
              </ul>
            </div>
          </div>

          {/* Recent Referrals */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              📊 Recent Referrals
            </h3>
            
            {referrals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No referrals yet. Start sharing your referral code!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referred User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referrals.map((referral) => (
                      <tr key={referral.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {referral.referredUserEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${referral.commission.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            referral.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {referral.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(referral.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
  );
}

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'border-blue-200 text-blue-600',
    green: 'border-green-200 text-green-600',
    yellow: 'border-yellow-200 text-yellow-600',
    purple: 'border-purple-200 text-purple-600'
  };

  return (
    <div className={`bg-white rounded-lg shadow border-2 ${colorClasses[color]} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${colorClasses[color].split(' ')[1]}`}>{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};