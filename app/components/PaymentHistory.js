'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Globe,
  CreditCard,
  Wallet,
  Bank,
  Calendar,
  DollarSign,
  FilterX
} from 'lucide-react';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Sample payment data
  const samplePayments = [
    {
      id: 'PAY-001',
      amount: 100,
      currency: 'INR',
      country: 'IN',
      countryName: 'India',
      status: 'completed',
      method: 'UPI',
      bank: 'HDFC Bank',
      wallet: 'Paytm',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      qrData: '{"type":"UPI","vpa":"bujji-chat@hdfc","amount":100,"currency":"INR"}',
      description: 'Premium Subscription Payment'
    },
    {
      id: 'PAY-002',
      amount: 50,
      currency: 'USD',
      country: 'US',
      countryName: 'United States',
      status: 'pending',
      method: 'EMV',
      bank: 'Chase',
      wallet: 'PayPal',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      qrData: '{"type":"EMV","merchantId":"BUJJI_US_001","amount":50,"currency":"USD"}',
      description: 'Service Upgrade Payment'
    },
    {
      id: 'PAY-003',
      amount: 25,
      currency: 'SGD',
      country: 'SG',
      countryName: 'Singapore',
      status: 'failed',
      method: 'PayNow',
      bank: 'DBS',
      wallet: 'GrabPay',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      qrData: '{"type":"PayNow","uen":"T01SS1234A","amount":25,"currency":"SGD"}',
      description: 'Feature Access Payment'
    },
    {
      id: 'PAY-004',
      amount: 75,
      currency: 'BRL',
      country: 'BR',
      countryName: 'Brazil',
      status: 'completed',
      method: 'Pix',
      bank: 'Itaú',
      wallet: 'Mercado Pago',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      qrData: '{"type":"Pix","pixKey":"bujji-chat@pix.com.br","amount":75,"currency":"BRL"}',
      description: 'Premium Feature Payment'
    },
    {
      id: 'PAY-005',
      amount: 200,
      currency: 'JPY',
      country: 'JP',
      countryName: 'Japan',
      status: 'processing',
      method: 'JPQR',
      bank: 'MUFG',
      wallet: 'PayPay',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      qrData: '{"type":"JPQR","merchantId":"BUJJI_JP_001","amount":200,"currency":"JPY"}',
      description: 'Annual Subscription Payment'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPayments(samplePayments);
      setFilteredPayments(samplePayments);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, statusFilter, currencyFilter, dateFilter, sortBy, sortOrder]);

  const filterPayments = () => {
    let filtered = [...payments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.bank?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.wallet?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Currency filter
    if (currencyFilter !== 'all') {
      filtered = filtered.filter(payment => payment.currency === currencyFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.timestamp);
        switch (dateFilter) {
          case 'today':
            return paymentDate >= today;
          case 'yesterday':
            return paymentDate >= yesterday && paymentDate < today;
          case 'week':
            return paymentDate >= lastWeek;
          case 'month':
            return paymentDate >= lastMonth;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'date':
          aValue = new Date(a.timestamp);
          bValue = new Date(b.timestamp);
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.timestamp);
          bValue = new Date(b.timestamp);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPayments(filtered);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'processing':
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'UPI':
      case 'EMV':
      case 'PayNow':
      case 'Pix':
      case 'JPQR':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrencyFilter('all');
    setDateFilter('all');
    setSortBy('date');
    setSortOrder('desc');
  };

  const exportHistory = () => {
    const csvContent = [
      ['ID', 'Amount', 'Currency', 'Status', 'Method', 'Date', 'Description'],
      ...filteredPayments.map(payment => [
        payment.id,
        payment.amount,
        payment.currency,
        payment.status,
        payment.method,
        formatDate(payment.timestamp),
        payment.description
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading payment history...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Payment History
          </h1>
          <p className="text-gray-300 text-lg">
            Track all your QR payment transactions across different countries and currencies
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Payments</p>
                <p className="text-2xl font-bold text-white">{payments.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400">
                  {payments.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-blue-400">
                  {payments.reduce((sum, p) => sum + p.amount, 0)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Countries</p>
                <p className="text-2xl font-bold text-purple-400">
                  {new Set(payments.map(p => p.country)).size}
                </p>
              </div>
              <Globe className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Currency Filter */}
            <div>
              <select
                value={currencyFilter}
                onChange={(e) => setCurrencyFilter(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Currencies</option>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="SGD">SGD</option>
                <option value="BRL">BRL</option>
                <option value="JPY">JPY</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div>
              <button
                onClick={clearFilters}
                className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-colors flex items-center justify-center"
              >
                <FilterX className="w-4 h-4 mr-2" />
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-gray-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="status">Status</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <button
            onClick={exportHistory}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </motion.div>

        {/* Payment List */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400 text-lg">No payments found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            filteredPayments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPayment(payment)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  {/* Payment Info */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {getMethodIcon(payment.method)}
                      <div>
                        <h3 className="text-lg font-semibold text-white">{payment.id}</h3>
                        <p className="text-gray-400 text-sm">{payment.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Amount and Currency */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {payment.amount} {payment.currency}
                    </div>
                    <div className="text-gray-400 text-sm">{payment.countryName}</div>
                  </div>

                  {/* Status and Date */}
                  <div className="flex flex-col items-end space-y-2">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1 capitalize">{payment.status}</span>
                    </div>
                    <div className="text-gray-400 text-sm">{formatDate(payment.timestamp)}</div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Method:</span>
                      <span className="text-white ml-2">{payment.method}</span>
                    </div>
                    {payment.bank && (
                      <div>
                        <span className="text-gray-400">Bank:</span>
                        <span className="text-white ml-2">{payment.bank}</span>
                      </div>
                    )}
                    {payment.wallet && (
                      <div>
                        <span className="text-gray-400">Wallet:</span>
                        <span className="text-white ml-2">{payment.wallet}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white ml-2">{new Date(payment.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Payment Details Modal */}
        <AnimatePresence>
          {selectedPayment && (
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
                className="bg-slate-900 rounded-3xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Payment Details</h3>
                    <button
                      onClick={() => setSelectedPayment(null)}
                      className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <XCircle className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Payment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Payment Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payment ID:</span>
                          <span className="text-white font-mono">{selectedPayment.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span className="text-white font-semibold">{selectedPayment.amount} {selectedPayment.currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className={`capitalize ${getStatusColor(selectedPayment.status)}`}>
                            {selectedPayment.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Method:</span>
                          <span className="text-white">{selectedPayment.method}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Location & Time</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Country:</span>
                          <span className="text-white">{selectedPayment.countryName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{new Date(selectedPayment.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time:</span>
                          <span className="text-white">{new Date(selectedPayment.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Description:</span>
                          <span className="text-white">{selectedPayment.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Data */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">QR Code Data</h4>
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <pre className="text-sm text-gray-300 overflow-x-auto">{selectedPayment.qrData}</pre>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-colors">
                      <Eye className="w-4 h-4 inline mr-2" />
                      View Receipt
                    </button>
                    <button className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-colors">
                      <Download className="w-4 h-4 inline mr-2" />
                      Download
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

export default PaymentHistory; 