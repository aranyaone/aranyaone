'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Download,
  Upload,
  CreditCard,
  CreditCard,
  Globe,
  Shield,
  Lock,
  Unlock,
  Settings,
  History,
  BarChart3,
  PieChart,
  Target,
  Award,
  Zap,
  Star,
  Users,
  Building,
  Briefcase,
  PiggyBank,
  Coins,
  Bitcoin,
  Ethereum,
  CreditCard as CardIcon,
  Smartphone,
  Tablet,
  Monitor,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Calendar,
  Filter,
  Search,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Copy,
  Share2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const KingWallet = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
  const [withdrawalCurrency, setWithdrawalCurrency] = useState('USD');
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  // King Wallet Data
  const [walletData, setWalletData] = useState({
    totalBalance: 125000.50,
    currencies: {
      USD: { balance: 75000.25, rate: 1.0, symbol: '$' },
      EUR: { balance: 45000.75, rate: 0.85, symbol: '€' },
      GBP: { balance: 38000.50, rate: 0.73, symbol: '£' },
      INR: { balance: 6250000.00, rate: 83.25, symbol: '₹' },
      JPY: { balance: 11250000.00, rate: 150.00, symbol: '¥' },
      CNY: { balance: 540000.00, rate: 7.20, symbol: '¥' },
      SGD: { balance: 102000.00, rate: 1.36, symbol: 'S$' },
      AUD: { balance: 115000.00, rate: 1.53, symbol: 'A$' },
      CAD: { balance: 102500.00, rate: 1.37, symbol: 'C$' },
      BRL: { balance: 625000.00, rate: 5.00, symbol: 'R$' }
    },
    transactions: [
      {
        id: 'TXN-001',
        type: 'deposit',
        amount: 50000,
        currency: 'USD',
        method: 'Bank Transfer',
        status: 'completed',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        description: 'Revenue from Premium Subscriptions'
      },
      {
        id: 'TXN-002',
        type: 'withdrawal',
        amount: 25000,
        currency: 'USD',
        method: 'Wire Transfer',
        status: 'completed',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        description: 'Business Expansion Investment'
      },
      {
        id: 'TXN-003',
        type: 'deposit',
        amount: 30000,
        currency: 'EUR',
        method: 'PayPal',
        status: 'completed',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'European Market Revenue'
      },
      {
        id: 'TXN-004',
        type: 'withdrawal',
        amount: 15000,
        currency: 'GBP',
        method: 'Bank Transfer',
        status: 'pending',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'UK Office Setup'
      },
      {
        id: 'TXN-005',
        type: 'deposit',
        amount: 75000,
        currency: 'INR',
        method: 'UPI',
        status: 'completed',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Indian Market Revenue'
      }
    ],
    analytics: {
      monthlyRevenue: 450000,
      monthlyExpenses: 180000,
      profitMargin: 60,
      growthRate: 25,
      activeUsers: 150000,
      totalTransactions: 2500,
      averageTransaction: 180,
      topCurrencies: ['USD', 'EUR', 'INR', 'GBP', 'JPY']
    },
    security: {
      twoFactorEnabled: true,
      biometricEnabled: true,
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      loginLocation: 'New York, US',
      deviceType: 'Desktop',
      riskLevel: 'Low'
    }
  });

  const [withdrawalMethods] = useState([
    { id: 'bank', name: 'Bank Transfer', icon: CreditCard, fee: 0.25, time: '1-3 business days' },
    { id: 'wire', name: 'Wire Transfer', icon: Building, fee: 0.50, time: 'Same day' },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, fee: 0.30, time: 'Instant' },
    { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, fee: 0.10, time: '10-30 minutes' },
    { id: 'card', name: 'Credit Card', icon: CardIcon, fee: 0.35, time: '2-5 business days' }
  ]);

  const formatCurrency = (amount, currency) => {
    const symbol = walletData.currencies[currency]?.symbol || '$';
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getTotalBalanceUSD = () => {
    return Object.entries(walletData.currencies).reduce((total, [currency, data]) => {
      return total + (data.balance * data.rate);
    }, 0);
  };

  const handleWithdrawal = async () => {
    if (!withdrawalAmount || withdrawalAmount <= 0) return;
    
    setIsLoading(true);
    
    // Simulate withdrawal processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newTransaction = {
      id: `TXN-${Date.now()}`,
      type: 'withdrawal',
      amount: parseFloat(withdrawalAmount),
      currency: withdrawalCurrency,
      method: withdrawalMethods.find(m => m.id === withdrawalMethod)?.name || 'Bank Transfer',
      status: 'pending',
      timestamp: new Date().toISOString(),
      description: 'King Wallet Withdrawal'
    };
    
    setWalletData(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      currencies: {
        ...prev.currencies,
        [withdrawalCurrency]: {
          ...prev.currencies[withdrawalCurrency],
          balance: prev.currencies[withdrawalCurrency].balance - parseFloat(withdrawalAmount)
        }
      }
    }));
    
    setWithdrawalAmount('');
    setShowWithdrawalModal(false);
    setIsLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'failed': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              King Wallet
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Advanced wallet system for founders and kings - Manage your empire's finances
          </p>
        </motion.div>

        {/* Balance Overview */}
        <motion.div 
          className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Total Balance</h2>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
            >
              {showBalance ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {showBalance ? formatCurrency(getTotalBalanceUSD(), 'USD') : '******'}
              </div>
              <div className="text-gray-400">Total Value (USD)</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">
                +{walletData.analytics.growthRate}%
              </div>
              <div className="text-gray-400">Monthly Growth</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {walletData.analytics.profitMargin}%
              </div>
              <div className="text-gray-400">Profit Margin</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700">
            <div className="flex space-x-2">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'currencies', name: 'Currencies', icon: Globe },
                { id: 'transactions', name: 'Transactions', icon: History },
                { id: 'analytics', name: 'Analytics', icon: PieChart },
                { id: 'security', name: 'Security', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center cursor-pointer hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowDepositModal(true)}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">Deposit</h3>
                  <p className="text-gray-400 text-sm">Add funds to your wallet</p>
                </motion.div>

                <motion.div 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center cursor-pointer hover:border-red-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowWithdrawalModal(true)}
                >
                  <Download className="w-12 h-12 mx-auto mb-4 text-red-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">Withdraw</h3>
                  <p className="text-gray-400 text-sm">Transfer funds out</p>
                </motion.div>

                <motion.div 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowSecurityModal(true)}
                >
                  <Shield className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">Security</h3>
                  <p className="text-gray-400 text-sm">Manage security settings</p>
                </motion.div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <History className="w-6 h-6 mr-3 text-blue-400" />
                  Recent Transactions
                </h3>
                <div className="space-y-4">
                  {walletData.transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-4 ${
                          transaction.type === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {transaction.type === 'deposit' ? 
                            <ArrowDownLeft className="w-5 h-5 text-green-400" /> : 
                            <ArrowUpRight className="w-5 h-5 text-red-400" />
                          }
                        </div>
                        <div>
                          <div className="text-white font-semibold">{transaction.description}</div>
                          <div className="text-gray-400 text-sm">{transaction.method}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full border text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'currencies' && (
            <motion.div
              key="currencies"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Object.entries(walletData.currencies).map(([currency, data]) => (
                  <motion.div
                    key={currency}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Globe className="w-6 h-6 mr-2 text-blue-400" />
                        <span className="text-white font-semibold">{currency}</span>
                      </div>
                      <div className="text-gray-400 text-sm">Rate: {data.rate}</div>
                    </div>
                    
                    <div className="text-2xl font-bold text-white mb-2">
                      {showBalance ? formatCurrency(data.balance, currency) : '******'}
                    </div>
                    
                    <div className="text-gray-400 text-sm mb-4">
                      {formatCurrency(data.balance * data.rate, 'USD')} USD
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-semibold transition-colors">
                        Deposit
                      </button>
                      <button className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-semibold transition-colors">
                        Withdraw
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'transactions' && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Type</label>
                    <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                      <option value="all">All Types</option>
                      <option value="deposit">Deposits</option>
                      <option value="withdrawal">Withdrawals</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
                    <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Currency</label>
                    <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                      <option value="all">All Currencies</option>
                      {Object.keys(walletData.currencies).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <div className="space-y-4">
                  {walletData.transactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg mr-4 ${
                          transaction.type === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {transaction.type === 'deposit' ? 
                            <ArrowDownLeft className="w-6 h-6 text-green-400" /> : 
                            <ArrowUpRight className="w-6 h-6 text-red-400" />
                          }
                        </div>
                        <div>
                          <div className="text-white font-semibold">{transaction.description}</div>
                          <div className="text-gray-400 text-sm">{transaction.method} • {new Date(transaction.timestamp).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-semibold ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">+{walletData.analytics.growthRate}%</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {formatCurrency(walletData.analytics.monthlyRevenue, 'USD')}
                  </div>
                  <div className="text-gray-400 text-sm">Monthly Revenue</div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingDown className="w-8 h-8 text-red-400" />
                    <span className="text-red-400 text-sm font-semibold">-{walletData.analytics.monthlyExpenses / 1000}k</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {formatCurrency(walletData.analytics.monthlyExpenses, 'USD')}
                  </div>
                  <div className="text-gray-400 text-sm">Monthly Expenses</div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-400" />
                    <span className="text-blue-400 text-sm font-semibold">Active</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {walletData.analytics.activeUsers.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-purple-400" />
                    <span className="text-purple-400 text-sm font-semibold">Avg</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {formatCurrency(walletData.analytics.averageTransaction, 'USD')}
                  </div>
                  <div className="text-gray-400 text-sm">Avg Transaction</div>
                </div>
              </div>

              {/* Currency Distribution */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <PieChart className="w-6 h-6 mr-3 text-blue-400" />
                  Currency Distribution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {walletData.analytics.topCurrencies.map((currency, index) => {
                    const data = walletData.currencies[currency];
                    const percentage = ((data.balance * data.rate) / getTotalBalanceUSD()) * 100;
                    return (
                      <div key={currency} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-3 ${
                            index === 0 ? 'bg-yellow-400' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-400' : 'bg-blue-400'
                          }`}></div>
                          <div>
                            <div className="text-white font-semibold">{currency}</div>
                            <div className="text-gray-400 text-sm">{formatCurrency(data.balance, currency)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{percentage.toFixed(1)}%</div>
                          <div className="text-gray-400 text-sm">{formatCurrency(data.balance * data.rate, 'USD')}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Security Status */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-400" />
                  Security Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                      <div className="flex items-center">
                        <Lock className="w-5 h-5 mr-3 text-green-400" />
                        <span className="text-white">Two-Factor Authentication</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-green-400 text-sm font-semibold">Enabled</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 mr-3 text-green-400" />
                        <span className="text-white">Biometric Authentication</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-green-400 text-sm font-semibold">Enabled</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/30 rounded-xl">
                      <div className="text-white font-semibold mb-2">Last Login</div>
                      <div className="text-gray-400 text-sm">{new Date(walletData.security.lastLogin).toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">{walletData.security.loginLocation}</div>
                    </div>
                    
                    <div className="p-4 bg-slate-700/30 rounded-xl">
                      <div className="text-white font-semibold mb-2">Risk Level</div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-green-400 text-sm font-semibold">{walletData.security.riskLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Security Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl font-semibold transition-colors">
                      Change Password
                    </button>
                    <button className="w-full py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl font-semibold transition-colors">
                      Update 2FA Settings
                    </button>
                    <button className="w-full py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-xl font-semibold transition-colors">
                      View Login History
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Emergency Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold transition-colors">
                      Freeze Account
                    </button>
                    <button className="w-full py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-xl font-semibold transition-colors">
                      Report Suspicious Activity
                    </button>
                    <button className="w-full py-3 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded-xl font-semibold transition-colors">
                      Export Security Log
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Withdrawal Modal */}
        <AnimatePresence>
          {showWithdrawalModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 rounded-3xl border border-slate-700 max-w-md w-full"
              >
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Withdraw Funds</h3>
                    <button
                      onClick={() => setShowWithdrawalModal(false)}
                      className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <XCircle className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">Amount</label>
                    <input
                      type="number"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">Currency</label>
                    <select
                      value={withdrawalCurrency}
                      onChange={(e) => setWithdrawalCurrency(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      {Object.keys(walletData.currencies).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">Method</label>
                    <select
                      value={withdrawalMethod}
                      onChange={(e) => setWithdrawalMethod(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      {withdrawalMethods.map(method => (
                        <option key={method.id} value={method.id}>{method.name}</option>
                      ))}
                    </select>
                  </div>

                  {withdrawalMethod && (
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Fee:</span>
                        <span className="text-white">{withdrawalMethods.find(m => m.id === withdrawalMethod)?.fee}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Processing Time:</span>
                        <span className="text-white">{withdrawalMethods.find(m => m.id === withdrawalMethod)?.time}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowWithdrawalModal(false)}
                      className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleWithdrawal}
                      disabled={!withdrawalAmount || isLoading}
                      className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-colors flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Withdraw'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default KingWallet; 