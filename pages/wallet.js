import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function WalletPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Simulate user context loading
    const loadUserData = () => {
      const userData = {
        name: 'Aranya One',
        email: 'admin@aranyaone.com',
        balance: 47582.50,
        pendingBalance: 2850.00,
        totalEarnings: 125430.75,
        monthlyEarnings: 18750.25,
        walletAddress: '0x742d35...8f12a8'
      }
      setUser(userData)
      setLoading(false)
    }

    setTimeout(loadUserData, 500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Wallet...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Wallet - Aranya One</title>
        <meta name="description" content="Manage your digital empire finances and earnings" />
      </Head>

      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">💰 Digital Wallet</h1>
            <p className="text-gray-600">Manage your empire finances, earnings, and transactions</p>
          </div>

          {/* Balance Overview */}
          <BalanceOverview user={user} />

          {/* Tab Navigation */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'transactions', 'earnings', 'withdraw'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'transactions' && <TransactionsTab />}
            {activeTab === 'earnings' && <EarningsTab />}
            {activeTab === 'withdraw' && <WithdrawTab user={user} />}
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <a href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  )
}

function BalanceOverview({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Main Balance */}
      <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Available Balance</h2>
          <div className="text-3xl">💎</div>
        </div>
        <div className="text-4xl font-bold mb-2">₹{user.balance.toLocaleString()}</div>
        <p className="text-blue-100">Wallet Address: {user.walletAddress}</p>
        
        <div className="flex gap-4 mt-6">
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            💸 Withdraw
          </button>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            📈 Invest
          </button>
        </div>
      </div>

      {/* Pending Balance */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Balance</p>
            <p className="text-2xl font-bold text-gray-900">₹{user.pendingBalance.toLocaleString()}</p>
            <p className="text-sm text-yellow-600 mt-1">Processing...</p>
          </div>
          <div className="text-3xl">⏳</div>
        </div>
      </div>

      {/* Monthly Earnings */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">₹{user.monthlyEarnings.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+23% vs last month</p>
          </div>
          <div className="text-3xl">📈</div>
        </div>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-center">
            <div className="text-2xl mb-2">💸</div>
            <div className="font-medium">Withdraw Funds</div>
          </button>
          <button className="p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">View Report</div>
          </button>
          <button className="p-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors text-center">
            <div className="text-2xl mb-2">🔗</div>
            <div className="font-medium">Add Payment</div>
          </button>
          <button className="p-4 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors text-center">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium">Settings</div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">📋 Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'earning', amount: '+₹2,500', desc: 'AI Chat Service revenue', time: '2 hours ago' },
            { type: 'earning', amount: '+₹1,200', desc: 'Analytics service fee', time: '4 hours ago' },
            { type: 'withdrawal', amount: '-₹5,000', desc: 'Bank transfer', time: '1 day ago' },
            { type: 'earning', amount: '+₹3,800', desc: 'SEO service payment', time: '2 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'earning' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {activity.type === 'earning' ? '💰' : '💸'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.desc}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <div className={`font-bold ${
                activity.type === 'earning' ? 'text-green-600' : 'text-red-600'
              }`}>
                {activity.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TransactionsTab() {
  const transactions = [
    { id: 'TXN-2024-001', type: 'Credit', amount: '+₹2,500', description: 'AI Chat Service - User subscription', date: '2024-01-15', status: 'Completed' },
    { id: 'TXN-2024-002', type: 'Credit', amount: '+₹1,200', description: 'Analytics Dashboard - Premium upgrade', date: '2024-01-14', status: 'Completed' },
    { id: 'TXN-2024-003', type: 'Debit', amount: '-₹5,000', description: 'Withdrawal to Bank Account', date: '2024-01-14', status: 'Completed' },
    { id: 'TXN-2024-004', type: 'Credit', amount: '+₹3,800', description: 'SEO Optimizer - Monthly billing', date: '2024-01-13', status: 'Completed' },
    { id: 'TXN-2024-005', type: 'Credit', amount: '+₹850', description: 'Social Media Manager - User payment', date: '2024-01-13', status: 'Completed' },
    { id: 'TXN-2024-006', type: 'Debit', amount: '-₹2,000', description: 'Platform maintenance fee', date: '2024-01-12', status: 'Completed' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">💳 Transaction History</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">Export CSV</button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'Credit' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.description}</td>
                <td className={`px-6 py-4 text-sm font-medium ${
                  transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EarningsTab() {
  const earningsData = [
    { service: 'AI Chat Service', users: 145, revenue: '₹18,500', growth: '+23%' },
    { service: 'Analytics Dashboard', users: 89, revenue: '₹12,800', growth: '+15%' },
    { service: 'SEO Optimizer', users: 67, revenue: '₹8,900', growth: '+8%' },
    { service: 'Social Media Manager', users: 34, revenue: '₹6,200', growth: '-3%' },
    { service: 'Design Studio', users: 28, revenue: '₹4,100', growth: '+45%' },
  ]

  return (
    <div className="space-y-8">
      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">📊 Total Earnings</h4>
          <p className="text-3xl font-bold text-green-600">₹125,430</p>
          <p className="text-sm text-gray-500 mt-1">All time earnings</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">📈 Monthly Growth</h4>
          <p className="text-3xl font-bold text-blue-600">+18.5%</p>
          <p className="text-sm text-gray-500 mt-1">Compared to last month</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">🎯 Average per Service</h4>
          <p className="text-3xl font-bold text-purple-600">₹10,240</p>
          <p className="text-sm text-gray-500 mt-1">Monthly average</p>
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">🛠️ Earnings by Service</h3>
        <div className="space-y-4">
          {earningsData.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="text-2xl">
                  {index === 0 ? '🤖' : index === 1 ? '📊' : index === 2 ? '🔍' : index === 3 ? '📱' : '🎨'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{service.service}</h4>
                  <p className="text-sm text-gray-600">{service.users} active users</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">{service.revenue}</p>
                <p className={`text-sm font-medium ${
                  service.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {service.growth}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WithdrawTab({ user }) {
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('bank')

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    if (parseFloat(withdrawAmount) > user.balance) {
      alert('Insufficient balance')
      return
    }
    alert(`Withdrawal request for ₹${withdrawAmount} has been submitted!`)
    setWithdrawAmount('')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Withdrawal Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">💸 Withdraw Funds</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                max={user.balance}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Available: ₹{user.balance.toLocaleString()}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="bank"
                  checked={selectedMethod === 'bank'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="mr-3"
                />
                <span>🏦 Bank Transfer (2-3 business days)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="upi"
                  checked={selectedMethod === 'upi'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="mr-3"
                />
                <span>📱 UPI (Instant)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="crypto"
                  checked={selectedMethod === 'crypto'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="mr-3"
                />
                <span>₿ Cryptocurrency</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleWithdraw}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            💸 Request Withdrawal
          </button>
        </div>
      </div>

      {/* Withdrawal Info */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">📋 Withdrawal Information</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Minimum withdrawal:</span>
              <span className="font-medium">₹100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing fee:</span>
              <span className="font-medium">₹25 or 1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing time:</span>
              <span className="font-medium">1-3 business days</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">⏳ Pending Withdrawals</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">₹5,000</p>
                <p className="text-sm text-gray-600">Bank Transfer</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Processing</span>
            </div>
            <div className="text-center text-gray-500 text-sm py-4">
              No other pending withdrawals
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}