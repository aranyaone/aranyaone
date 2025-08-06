'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Shield,
  Lock,
  Unlock,
  Settings,
  Filter,
  Search,
  Calendar,
  DollarSign,
  CreditCard,
  Building,
  Bitcoin,
  Ethereum,
  Globe,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Award,
  Zap,
  Star,
  Users,
  Briefcase,
  PiggyBank,
  Coins,
  Smartphone,
  Tablet,
  Monitor,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Share2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  FileText,
  Receipt,
  Wallet,
  Key,
  Fingerprint,
  Smartphone as PhoneIcon,
  Mail,
  MessageSquare,
  Bell,
  BellOff,
  Wifi,
  WifiOff,
  Shield as SecurityIcon,
  AlertTriangle,
  Info,
  HelpCircle,
  ExternalLink,
  Link,
  Unlink,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Key as KeyIcon,
  Shield as ShieldIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Copy as CopyIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Trash2,
  Edit,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle as AlertIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Wifi as WifiIcon,
  Shield as ShieldCheckIcon,
  AlertTriangle as AlertTriangleIcon,
  Info as InfoIcon,
  HelpCircle as HelpIcon,
  ExternalLink as ExternalLinkIcon,
  Link as LinkIcon,
  Unlink as UnlinkIcon
} from 'lucide-react';

const WithdrawalManager = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [amountFilter, setAmountFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Withdrawal Data
  const [withdrawals, setWithdrawals] = useState([
    {
      id: 'WD-001',
      userId: 'USER-001',
      userName: 'John Doe',
      userEmail: 'john@bujji-chat.com',
      amount: 50000,
      currency: 'USD',
      method: 'bank',
      methodName: 'Bank Transfer',
      status: 'pending',
      priority: 'high',
      reason: 'Business expansion investment',
      bankDetails: {
        accountNumber: '****1234',
        bankName: 'Chase Bank',
        routingNumber: '021000021',
        accountType: 'Business Checking'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      estimatedTime: '1-3 business days',
      fee: 25,
      netAmount: 49975,
      securityChecks: {
        identityVerified: true,
        fraudCheck: 'passed',
        riskScore: 15,
        locationMatch: true,
        deviceTrusted: true
      },
      documents: [
        { name: 'ID Verification', status: 'verified' },
        { name: 'Bank Statement', status: 'verified' },
        { name: 'Business License', status: 'pending' }
      ]
    },
    {
      id: 'WD-002',
      userId: 'USER-002',
      userName: 'Sarah Smith',
      userEmail: 'sarah@bujji-chat.com',
      amount: 25000,
      currency: 'EUR',
      method: 'wire',
      methodName: 'Wire Transfer',
      status: 'approved',
      priority: 'medium',
      reason: 'Equipment purchase',
      bankDetails: {
        accountNumber: '****5678',
        bankName: 'Deutsche Bank',
        iban: 'DE89370400440532013000',
        swift: 'COBADEFFXXX'
      },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      estimatedTime: 'Same day',
      fee: 50,
      netAmount: 24950,
      securityChecks: {
        identityVerified: true,
        fraudCheck: 'passed',
        riskScore: 8,
        locationMatch: true,
        deviceTrusted: true
      },
      documents: [
        { name: 'ID Verification', status: 'verified' },
        { name: 'Bank Statement', status: 'verified' },
        { name: 'Invoice', status: 'verified' }
      ]
    },
    {
      id: 'WD-003',
      userId: 'USER-003',
      userName: 'Mike Johnson',
      userEmail: 'mike@bujji-chat.com',
      amount: 75000,
      currency: 'INR',
      method: 'upi',
      methodName: 'UPI Transfer',
      status: 'completed',
      priority: 'low',
      reason: 'Salary payment',
      bankDetails: {
        accountNumber: '****9012',
        bankName: 'HDFC Bank',
        ifsc: 'HDFC0001234',
        upiId: 'mike@hdfc'
      },
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedTime: 'Instant',
      fee: 0,
      netAmount: 75000,
      securityChecks: {
        identityVerified: true,
        fraudCheck: 'passed',
        riskScore: 5,
        locationMatch: true,
        deviceTrusted: true
      },
      documents: [
        { name: 'ID Verification', status: 'verified' },
        { name: 'Bank Statement', status: 'verified' },
        { name: 'Employment Letter', status: 'verified' }
      ]
    },
    {
      id: 'WD-004',
      userId: 'USER-004',
      userName: 'Lisa Chen',
      userEmail: 'lisa@bujji-chat.com',
      amount: 15000,
      currency: 'SGD',
      method: 'paynow',
      methodName: 'PayNow',
      status: 'rejected',
      priority: 'high',
      reason: 'Office rent',
      bankDetails: {
        accountNumber: '****3456',
        bankName: 'DBS Bank',
        paynowId: 'lisa@dbs'
      },
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedTime: 'Instant',
      fee: 0,
      netAmount: 15000,
      securityChecks: {
        identityVerified: false,
        fraudCheck: 'failed',
        riskScore: 85,
        locationMatch: false,
        deviceTrusted: false
      },
      documents: [
        { name: 'ID Verification', status: 'failed' },
        { name: 'Bank Statement', status: 'pending' },
        { name: 'Rental Agreement', status: 'pending' }
      ],
      rejectionReason: 'Identity verification failed. Please provide valid government-issued ID.'
    }
  ]);

  const [withdrawalMethods] = useState([
    { id: 'bank', name: 'Bank Transfer', icon: CreditCard, fee: 0.25, time: '1-3 business days', minAmount: 100, maxAmount: 100000 },
    { id: 'wire', name: 'Wire Transfer', icon: Building, fee: 0.50, time: 'Same day', minAmount: 1000, maxAmount: 500000 },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, fee: 0.30, time: 'Instant', minAmount: 10, maxAmount: 10000 },
    { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, fee: 0.10, time: '10-30 minutes', minAmount: 50, maxAmount: 100000 },
    { id: 'card', name: 'Credit Card', icon: CreditCard, fee: 0.35, time: '2-5 business days', minAmount: 100, maxAmount: 50000 },
    { id: 'upi', name: 'UPI Transfer', icon: Smartphone, fee: 0, time: 'Instant', minAmount: 1, maxAmount: 100000 },
    { id: 'paynow', name: 'PayNow', icon: Smartphone, fee: 0, time: 'Instant', minAmount: 1, maxAmount: 100000 }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'approved': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'rejected': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRiskColor = (riskScore) => {
    if (riskScore <= 20) return 'text-green-400';
    if (riskScore <= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatCurrency = (amount, currency) => {
    const symbols = { USD: '$', EUR: '€', INR: '₹', SGD: 'S$', GBP: '£' };
    const symbol = symbols[currency] || '$';
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleApproval = async (withdrawalId, approved) => {
    setWithdrawals(prev => prev.map(w => 
      w.id === withdrawalId 
        ? { ...w, status: approved ? 'approved' : 'rejected' }
        : w
    ));
    setShowApprovalModal(false);
    setSelectedWithdrawal(null);
  };

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = withdrawal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         withdrawal.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || withdrawal.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || withdrawal.method === methodFilter;
    const matchesAmount = amountFilter === 'all' || 
                         (amountFilter === 'low' && withdrawal.amount < 10000) ||
                         (amountFilter === 'medium' && withdrawal.amount >= 10000 && withdrawal.amount < 50000) ||
                         (amountFilter === 'high' && withdrawal.amount >= 50000);
    
    return matchesSearch && matchesStatus && matchesMethod && matchesAmount;
  });

  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
  const approvedWithdrawals = withdrawals.filter(w => w.status === 'approved');
  const completedWithdrawals = withdrawals.filter(w => w.status === 'completed');
  const rejectedWithdrawals = withdrawals.filter(w => w.status === 'rejected');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Withdrawal Manager
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Advanced withdrawal management system with security checks and approval workflows
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingWithdrawals.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-blue-400">{approvedWithdrawals.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400">{completedWithdrawals.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-400">{rejectedWithdrawals.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700">
            <div className="flex space-x-2">
              {[
                { id: 'pending', name: 'Pending', count: pendingWithdrawals.length },
                { id: 'approved', name: 'Approved', count: approvedWithdrawals.length },
                { id: 'completed', name: 'Completed', count: completedWithdrawals.length },
                { id: 'rejected', name: 'Rejected', count: rejectedWithdrawals.length }
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
                  {tab.name}
                  <span className="ml-2 px-2 py-1 bg-slate-700/50 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <motion.div 
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search withdrawals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Method</label>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Methods</option>
                {withdrawalMethods.map(method => (
                  <option key={method.id} value={method.id}>{method.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Amount</label>
              <select
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Amounts</option>
                <option value="low">&lt; $10,000</option>
                <option value="medium">$10,000 - $50,000</option>
                <option value="high">&gt; $50,000</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="priority">Priority</option>
                <option value="risk">Risk Score</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Withdrawals List */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredWithdrawals.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400 text-lg">No withdrawals found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            filteredWithdrawals.map((withdrawal) => (
              <motion.div
                key={withdrawal.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {withdrawal.userName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{withdrawal.userName}</div>
                      <div className="text-gray-400 text-sm">{withdrawal.userEmail}</div>
                      <div className="text-gray-500 text-xs">{withdrawal.id}</div>
                    </div>
                  </div>

                  {/* Amount & Method */}
                  <div className="text-center lg:text-right">
                    <div className="text-2xl font-bold text-white mb-1">
                      {formatCurrency(withdrawal.amount, withdrawal.currency)}
                    </div>
                    <div className="text-gray-400 text-sm mb-2">{withdrawal.methodName}</div>
                    <div className="flex items-center justify-center lg:justify-end space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full border text-xs font-semibold ${getStatusColor(withdrawal.status)}`}>
                        {getStatusIcon(withdrawal.status)}
                        <span className="ml-1 capitalize">{withdrawal.status}</span>
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(withdrawal.priority)}`}>
                        {withdrawal.priority}
                      </span>
                    </div>
                  </div>

                  {/* Security & Actions */}
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${getRiskColor(withdrawal.securityChecks.riskScore)}`}>
                        Risk: {withdrawal.securityChecks.riskScore}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {withdrawal.securityChecks.fraudCheck === 'passed' ? 'Verified' : 'Failed'}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedWithdrawal(withdrawal);
                          setShowDetailsModal(true);
                        }}
                        className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {withdrawal.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setShowApprovalModal(true);
                            }}
                            className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </button>
                          
                          <button
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setShowRejectionModal(true);
                            }}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Reason:</span>
                      <span className="text-white ml-2">{withdrawal.reason}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Fee:</span>
                      <span className="text-white ml-2">{formatCurrency(withdrawal.fee, withdrawal.currency)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Net Amount:</span>
                      <span className="text-white ml-2">{formatCurrency(withdrawal.netAmount, withdrawal.currency)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white ml-2">{withdrawal.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Approval Modal */}
        <AnimatePresence>
          {showApprovalModal && selectedWithdrawal && (
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
                className="bg-slate-900 rounded-3xl border border-slate-700 max-w-2xl w-full"
              >
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Approve Withdrawal</h3>
                    <button
                      onClick={() => setShowApprovalModal(false)}
                      className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-4">Withdrawal Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">User:</span>
                        <span className="text-white ml-2">{selectedWithdrawal.userName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-white ml-2">{formatCurrency(selectedWithdrawal.amount, selectedWithdrawal.currency)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Method:</span>
                        <span className="text-white ml-2">{selectedWithdrawal.methodName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Risk Score:</span>
                        <span className={`ml-2 font-semibold ${getRiskColor(selectedWithdrawal.securityChecks.riskScore)}`}>
                          {selectedWithdrawal.securityChecks.riskScore}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-4">Security Checks</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedWithdrawal.securityChecks).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className={`font-semibold ${
                            typeof value === 'boolean' 
                              ? (value ? 'text-green-400' : 'text-red-400')
                              : (key === 'fraudCheck' && value === 'passed' ? 'text-green-400' : 'text-red-400')
                          }`}>
                            {typeof value === 'boolean' ? (value ? 'Passed' : 'Failed') : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowApprovalModal(false)}
                      className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleApproval(selectedWithdrawal.id, true)}
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 rounded-xl text-white font-semibold transition-colors"
                    >
                      Approve Withdrawal
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rejection Modal */}
        <AnimatePresence>
          {showRejectionModal && selectedWithdrawal && (
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
                className="bg-slate-900 rounded-3xl border border-slate-700 max-w-2xl w-full"
              >
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Reject Withdrawal</h3>
                    <button
                      onClick={() => setShowRejectionModal(false)}
                      className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-red-400 mb-2">Security Concerns</h4>
                    <ul className="text-red-300 text-sm space-y-1">
                      <li>• Identity verification failed</li>
                      <li>• High risk score detected</li>
                      <li>• Location mismatch</li>
                      <li>• Suspicious activity patterns</li>
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowRejectionModal(false)}
                      className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleApproval(selectedWithdrawal.id, false)}
                      className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition-colors"
                    >
                      Reject Withdrawal
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

export default WithdrawalManager; 