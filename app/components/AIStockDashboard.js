'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  DollarSign,
  LineChart,
  Search,
  Star,
  Sparkles,
  Brain,
  ArrowUpRight,
  ArrowDownLeft,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Globe,
  BookOpen,
  MessageCircle,
  News,
  ChartBar,
  ChartLine,
  ChartPie,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Settings,
  Bell,
  BellOff,
  Filter,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Copy,
  Share2,
  Download,
  Upload
} from 'lucide-react';

const sampleStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 192.32,
    change: +1.23,
    percent: +0.64,
    aiSignal: 'buy',
    aiConfidence: 92,
    sentiment: 'positive',
    sector: 'Technology',
    country: 'US',
    chart: '/sample-aapl-chart.svg'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 812.45,
    change: -5.12,
    percent: -0.63,
    aiSignal: 'hold',
    aiConfidence: 78,
    sentiment: 'neutral',
    sector: 'Automotive',
    country: 'US',
    chart: '/sample-tsla-chart.svg'
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    price: 1680.10,
    change: +12.45,
    percent: +0.75,
    aiSignal: 'buy',
    aiConfidence: 88,
    sentiment: 'positive',
    sector: 'IT Services',
    country: 'IN',
    chart: '/sample-infy-chart.svg'
  },
  {
    symbol: 'BABA',
    name: 'Alibaba Group',
    price: 85.23,
    change: -0.98,
    percent: -1.14,
    aiSignal: 'sell',
    aiConfidence: 81,
    sentiment: 'negative',
    sector: 'E-Commerce',
    country: 'CN',
    chart: '/sample-baba-chart.svg'
  }
];

const AIStockDashboard = () => {
  const [search, setSearch] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);

  const filteredStocks = sampleStocks.filter(
    s =>
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="w-12 h-12 text-green-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Stock Dashboard
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            World-class AI-powered stock analysis, trading signals, and portfolio insights
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks (AAPL, TSLA, INFY, BABA...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all duration-300 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
            <button className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl text-white font-semibold transition-all duration-300 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </button>
          </div>
        </motion.div>

        {/* Stocks Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredStocks.map(stock => (
            <motion.div
              key={stock.symbol}
              whileHover={{ scale: 1.03 }}
              className={`relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-1 rounded-3xl shadow-xl transition-all duration-300 cursor-pointer`}
              onClick={() => setSelectedStock(stock)}
            >
              <div className="bg-slate-900/80 backdrop-blur-lg rounded-3xl p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-white mr-3">{stock.symbol}</span>
                    <span className="text-gray-400 text-lg">{stock.name}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-3xl font-bold text-white mr-3">${stock.price.toFixed(2)}</span>
                    <span className={`text-lg font-semibold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.percent >= 0 ? '+' : ''}{stock.percent.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      stock.aiSignal === 'buy' ? 'bg-green-500/20 text-green-400' :
                      stock.aiSignal === 'sell' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      <Brain className="w-4 h-4 mr-1" />
                      {stock.aiSignal.toUpperCase()} ({stock.aiConfidence}%)
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      stock.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                      stock.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      <Sparkles className="w-4 h-4 mr-1" />
                      {stock.sentiment.charAt(0).toUpperCase() + stock.sentiment.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{stock.sector}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{stock.country}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <img src={stock.chart} alt="Stock chart" className="w-full h-24 object-contain rounded-xl bg-slate-800" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stock Details Modal */}
        {selectedStock && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-3xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="w-6 h-6 text-green-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">{selectedStock.symbol} - {selectedStock.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedStock(null)}
                  className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-bold text-white">${selectedStock.price.toFixed(2)}</span>
                  <span className={`text-lg font-semibold ${selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.percent >= 0 ? '+' : ''}{selectedStock.percent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedStock.aiSignal === 'buy' ? 'bg-green-500/20 text-green-400' :
                    selectedStock.aiSignal === 'sell' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    <Brain className="w-4 h-4 mr-1" />
                    {selectedStock.aiSignal.toUpperCase()} ({selectedStock.aiConfidence}%)
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedStock.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                    selectedStock.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    <Sparkles className="w-4 h-4 mr-1" />
                    {selectedStock.sentiment.charAt(0).toUpperCase() + selectedStock.sentiment.slice(1)}
                  </span>
                  <span className="text-xs text-gray-400">{selectedStock.sector}</span>
                  <span className="text-xs text-gray-400">{selectedStock.country}</span>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">AI Insights</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <b>AI Signal:</b> {selectedStock.aiSignal.toUpperCase()} ({selectedStock.aiConfidence}% confidence)</li>
                    <li>• <b>Sentiment:</b> {selectedStock.sentiment.charAt(0).toUpperCase() + selectedStock.sentiment.slice(1)}</li>
                    <li>• <b>Sector:</b> {selectedStock.sector}</li>
                    <li>• <b>Country:</b> {selectedStock.country}</li>
                  </ul>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Portfolio Advisor</h4>
                  <p className="text-gray-300 text-sm mb-2">This stock is <b>{selectedStock.aiSignal === 'buy' ? 'recommended for purchase' : selectedStock.aiSignal === 'sell' ? 'not recommended' : 'neutral'}</b> by our AI model. Confidence: <b>{selectedStock.aiConfidence}%</b>.</p>
                  <p className="text-gray-400 text-xs">(AI signals are for informational purposes only. Please do your own research.)</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Stock Chart</h4>
                  <img src={selectedStock.chart} alt="Stock chart" className="w-full h-40 object-contain rounded-xl bg-slate-800" />
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-colors">
                    <Download className="w-4 h-4 inline mr-2" />
                    Download Report
                  </button>
                  <button className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-colors">
                    <Share2 className="w-4 h-4 inline mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStockDashboard; 