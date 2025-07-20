import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Wallet() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const router = useRouter()

  // Simulate authentication check
  useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in (simulated with localStorage)
      const authStatus = localStorage.getItem('aranya_auth')
      setIsAuthenticated(authStatus === 'true')
      setIsLoading(false)
    }
    
    // Add small delay to simulate auth check
    setTimeout(checkAuth, 500)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Simple demo authentication
    if (credentials.email && credentials.password) {
      localStorage.setItem('aranya_auth', 'true')
      setIsAuthenticated(true)
      setShowLogin(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('aranya_auth')
    setIsAuthenticated(false)
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Securing your wallet...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Head>
          <title>Secure Login - Aranya One Wallet</title>
          <meta name="description" content="Secure access to your digital wallet" />
        </Head>
        
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🔐</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Secure Wallet Access</h1>
              <p className="text-gray-600">Please authenticate to access your digital wallet</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                🔓 Access Wallet
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Demo credentials: Any email and password will work
              </p>
            </div>

            <div className="mt-6 text-center">
              <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Head>
        <title>Digital Wallet - Aranya One</title>
        <meta name="description" content="Manage your digital assets and payments" />
      </Head>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-blue-600 hover:text-blue-800">← Dashboard</a>
            <h1 className="text-2xl font-bold text-gray-800">💰 Digital Wallet</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BalanceCard
            title="Main Balance"
            amount="₹15,432.50"
            change="+₹2,340 this month"
            color="blue"
            icon="💰"
          />
          <BalanceCard
            title="Savings Wallet"
            amount="₹8,750.00"
            change="+5.2% APY"
            color="green"
            icon="🏦"
          />
          <BalanceCard
            title="Crypto Holdings"
            amount="₹3,125.75"
            change="+12.3% this week"
            color="purple"
            icon="₿"
          />
        </div>

        {/* UPI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UPISection />
          <QuickActions />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </div>
  )
}

function BalanceCard({ title, amount, change, color, icon }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 border-blue-200',
    green: 'from-green-500 to-green-600 border-green-200',
    purple: 'from-purple-500 to-purple-600 border-purple-200'
  }

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium opacity-90">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold mb-2">{amount}</div>
      <div className="text-sm opacity-80">{change}</div>
    </div>
  )
}

function UPISection() {
  const [upiId] = useState('aranyaone@paytm')
  const [copied, setCopied] = useState(false)

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📱 UPI Details
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your UPI ID</label>
          <div className="flex items-center justify-between">
            <span className="text-lg font-mono text-gray-800">{upiId}</span>
            <button
              onClick={copyUPI}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                copied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">127</div>
            <div className="text-sm text-gray-600">Successful Payments</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">₹45.2K</div>
            <div className="text-sm text-gray-600">Total Received</div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">🎯 Payment Limits</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Daily Limit:</span>
              <span className="font-medium">₹1,00,000</span>
            </div>
            <div className="flex justify-between">
              <span>Used Today:</span>
              <span className="font-medium text-green-600">₹12,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActions() {
  const actions = [
    { icon: '💸', title: 'Send Money', desc: 'Transfer to any UPI ID' },
    { icon: '💰', title: 'Request Payment', desc: 'Generate payment link' },
    { icon: '📱', title: 'Mobile Recharge', desc: 'Top up your phone' },
    { icon: '💡', title: 'Pay Bills', desc: 'Electricity, gas, water' },
    { icon: '🛒', title: 'Online Shopping', desc: 'Shop with wallet' },
    { icon: '📊', title: 'Invest', desc: 'Mutual funds & stocks' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        ⚡ Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <h4 className="font-semibold text-gray-800 text-sm">{action.title}</h4>
            <p className="text-xs text-gray-600">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      type: 'received',
      amount: '₹2,500.00',
      from: 'Client Payment - Web Design',
      time: '2 hours ago',
      icon: '⬇️'
    },
    {
      id: 2,
      type: 'sent',
      amount: '₹850.00',
      from: 'Domain Renewal - GoDaddy',
      time: '1 day ago',
      icon: '⬆️'
    },
    {
      id: 3,
      type: 'received',
      amount: '₹5,000.00',
      from: 'Aranya One - Monthly Subscription',
      time: '3 days ago',
      icon: '⬇️'
    },
    {
      id: 4,
      type: 'sent',
      amount: '₹1,200.00',
      from: 'AWS Cloud Services',
      time: '1 week ago',
      icon: '⬆️'
    },
    {
      id: 5,
      type: 'received',
      amount: '₹3,750.00',
      from: 'Freelance Project - Mobile App',
      time: '1 week ago',
      icon: '⬇️'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📋 Recent Transactions
        </h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          View All →
        </button>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                transaction.type === 'received' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                <span className="text-xl">{transaction.icon}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{transaction.from}</h4>
                <p className="text-sm text-gray-600">{transaction.time}</p>
              </div>
            </div>
            <div className={`text-lg font-bold ${
              transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'received' ? '+' : '-'}{transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}