'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart,
  Target, Settings, Download, Upload, Eye, EyeOff, Shield,
  Clock, CheckCircle, AlertCircle, ArrowRight, ChevronDown,
  ChevronUp, Plus, Trash2, Copy, Edit, Layers, Globe,
  Calculator, ChartBar, LineChart, Activity, Zap, Brain
} from 'lucide-react';

const FinancialTools = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [financialData, setFinancialData] = useState({
    totalAssets: 125000,
    totalLiabilities: 45000,
    netWorth: 80000,
    monthlyIncome: 8500,
    monthlyExpenses: 5200,
    savingsRate: 38.8
  });
  const [portfolios, setPortfolios] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [marketData, setMarketData] = useState({
    sp500: 4850.43,
    nasdaq: 15234.12,
    dow: 37592.98,
    bitcoin: 43250.67
  });

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'portfolio', name: 'Portfolio', icon: PieChart },
    { id: 'budgeting', name: 'Budgeting', icon: Calculator },
    { id: 'investing', name: 'Investing', icon: TrendingUp },
    { id: 'ai-insights', name: 'AI Insights', icon: Brain },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const portfolioCategories = [
    {
      id: 'stocks',
      name: 'Stocks',
      value: 45000,
      percentage: 36,
      change: 2.4,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'bonds',
      name: 'Bonds',
      value: 25000,
      percentage: 20,
      change: -0.8,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      value: 35000,
      percentage: 28,
      change: 1.2,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      value: 15000,
      percentage: 12,
      change: 5.7,
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'cash',
      name: 'Cash',
      value: 5000,
      percentage: 4,
      change: 0.0,
      color: 'from-gray-400 to-gray-600'
    }
  ];

  const aiRecommendations = [
    {
      id: 'rebalance',
      type: 'Portfolio Rebalancing',
      description: 'Consider rebalancing your portfolio to maintain target allocations',
      priority: 'high',
      impact: '+2.3% potential return',
      confidence: 87
    },
    {
      id: 'diversify',
      type: 'Diversification',
      description: 'Add international exposure to reduce portfolio risk',
      priority: 'medium',
      impact: '+1.8% risk reduction',
      confidence: 92
    },
    {
      id: 'tax-loss',
      type: 'Tax Loss Harvesting',
      description: 'Opportunity to harvest tax losses in your crypto position',
      priority: 'high',
      impact: '-$1,200 tax savings',
      confidence: 95
    }
  ];

  useEffect(() => {
    loadFinancialData();
    startMarketUpdates();
    generateAIInsights();
  }, []);

  const loadFinancialData = async () => {
    try {
      const response = await fetch('/api/financial-data');
      const data = await response.json();
      setFinancialData(data);
      setPortfolios(data.portfolios || portfolioCategories);
    } catch (error) {
      console.error('Load financial data error:', error);
    }
  };

  const startMarketUpdates = () => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        sp500: prev.sp500 + (Math.random() - 0.5) * 10,
        nasdaq: prev.nasdaq + (Math.random() - 0.5) * 20,
        dow: prev.dow + (Math.random() - 0.5) * 15,
        bitcoin: prev.bitcoin + (Math.random() - 0.5) * 500
      }));
    }, 5000);

    return () => clearInterval(interval);
  };

  const generateAIInsights = async () => {
    try {
      const response = await fetch('/api/financial-ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          financialData,
          portfolios,
          marketData
        })
      });
      
      const insights = await response.json();
      setAiInsights(insights.recommendations || aiRecommendations);
    } catch (error) {
      console.error('AI insights error:', error);
    }
  };

  const rebalancePortfolio = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/rebalance-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPortfolio: portfolios,
          targetAllocation: {
            stocks: 40,
            bonds: 25,
            realEstate: 25,
            crypto: 8,
            cash: 2
          }
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPortfolios(result.newPortfolio);
      }
      
    } catch (error) {
      console.error('Rebalance error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const createBudget = async (budgetData) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(budgetData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update budget data
        setFinancialData(prev => ({
          ...prev,
          monthlyExpenses: result.newBudget.totalExpenses
        }));
      }
      
    } catch (error) {
      console.error('Create budget error:', error);
    } finally {
      setIsProcessing(false);
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
            <DollarSign className="w-12 h-12 text-green-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Financial Tools
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Advanced financial management with AI-powered insights and comprehensive analytics
          </p>
        </motion.div>

        {/* Market Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">${marketData.sp500.toFixed(2)}</div>
            <div className="text-gray-400 text-sm">S&P 500</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">${marketData.nasdaq.toFixed(2)}</div>
            <div className="text-gray-400 text-sm">NASDAQ</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">${marketData.dow.toFixed(2)}</div>
            <div className="text-gray-400 text-sm">DOW</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">${marketData.bitcoin.toFixed(2)}</div>
            <div className="text-gray-400 text-sm">Bitcoin</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-400 to-teal-400 text-white shadow-lg'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8"
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Financial Dashboard</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">${financialData.netWorth.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Net Worth</div>
                    <div className="text-green-400 text-xs mt-1">+12.5% this year</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">${financialData.totalAssets.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Total Assets</div>
                    <div className="text-blue-400 text-xs mt-1">+8.2% this month</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">${financialData.totalLiabilities.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Total Liabilities</div>
                    <div className="text-red-400 text-xs mt-1">-5.1% this month</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{financialData.savingsRate}%</div>
                    <div className="text-gray-400 text-sm">Savings Rate</div>
                    <div className="text-purple-400 text-xs mt-1">+2.3% vs last month</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Monthly Cash Flow</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Income</span>
                        <span className="text-green-400 font-semibold">${financialData.monthlyIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Expenses</span>
                        <span className="text-red-400 font-semibold">${financialData.monthlyExpenses.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Net Cash Flow</span>
                          <span className="text-blue-400 font-semibold">
                            ${(financialData.monthlyIncome - financialData.monthlyExpenses).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                        <TrendingUp className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-gray-300">Rebalance Portfolio</span>
                      </button>
                      <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                        <Calculator className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-gray-300">Update Budget</span>
                      </button>
                      <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                        <Brain className="w-5 h-5 text-purple-400 mr-3" />
                        <span className="text-gray-300">Get AI Insights</span>
                      </button>
                      <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                        <Download className="w-5 h-5 text-yellow-400 mr-3" />
                        <span className="text-gray-300">Export Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Portfolio Management</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Portfolio Allocation</h3>
                    <div className="space-y-4">
                      {portfolioCategories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
                            <div>
                              <div className="text-white font-semibold">{category.name}</div>
                              <div className="text-gray-400 text-sm">{category.percentage}%</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">${category.value.toLocaleString()}</div>
                            <div className={`text-sm ${category.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {category.change >= 0 ? '+' : ''}{category.change}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={rebalancePortfolio}
                      disabled={isProcessing}
                      className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isProcessing ? 'Rebalancing...' : 'Rebalance Portfolio'}
                    </button>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Total Return</span>
                        <span className="text-green-400 font-semibold">+15.3%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Annualized Return</span>
                        <span className="text-blue-400 font-semibold">+12.7%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Volatility</span>
                        <span className="text-yellow-400 font-semibold">14.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Sharpe Ratio</span>
                        <span className="text-purple-400 font-semibold">1.24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Max Drawdown</span>
                        <span className="text-red-400 font-semibold">-8.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'budgeting' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Budget Management</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Create Budget</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Monthly Income</label>
                        <input
                          type="number"
                          defaultValue={financialData.monthlyIncome}
                          className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-gray-300 text-sm">Expense Categories</label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="Category"
                              className="flex-1 p-2 bg-slate-600/50 border border-gray-600 rounded text-white text-sm"
                            />
                            <input
                              type="number"
                              placeholder="Amount"
                              className="w-24 p-2 bg-slate-600/50 border border-gray-600 rounded text-white text-sm"
                            />
                            <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <button className="w-full p-2 border-2 border-dashed border-gray-600 rounded text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors">
                            <Plus className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => createBudget({ income: 8500, expenses: [] })}
                        disabled={isProcessing}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Creating...' : 'Create Budget'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Budget Overview</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Housing</span>
                        <span className="text-white font-semibold">$2,100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Transportation</span>
                        <span className="text-white font-semibold">$800</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Food</span>
                        <span className="text-white font-semibold">$600</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Utilities</span>
                        <span className="text-white font-semibold">$400</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Entertainment</span>
                        <span className="text-white font-semibold">$300</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Total Expenses</span>
                          <span className="text-red-400 font-semibold">$4,200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'investing' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Investment Tools</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Stock Screener</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Market Cap</label>
                        <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                          <option>Large Cap (&gt;$10B)</option>
                          <option>Mid Cap ($2B-$10B)</option>
                          <option>Small Cap (&lt;$2B)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm">Sector</label>
                        <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                          <option>Technology</option>
                          <option>Healthcare</option>
                          <option>Finance</option>
                          <option>Energy</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm">P/E Ratio</label>
                        <input
                          type="number"
                          placeholder="Max P/E"
                          className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white"
                        />
                      </div>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        Screen Stocks
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Investment Ideas</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-semibold">AAPL</h4>
                          <span className="text-green-400 text-sm">+2.4%</span>
                        </div>
                        <p className="text-gray-300 text-sm">Strong fundamentals, AI integration potential</p>
                      </div>
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-semibold">TSLA</h4>
                          <span className="text-red-400 text-sm">-1.2%</span>
                        </div>
                        <p className="text-gray-300 text-sm">EV market leader, growth potential</p>
                      </div>
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-semibold">NVDA</h4>
                          <span className="text-green-400 text-sm">+5.7%</span>
                        </div>
                        <p className="text-gray-300 text-sm">AI chip leader, strong growth</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-insights' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">AI Financial Insights</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Recommendations</h3>
                    <div className="space-y-4">
                      {aiInsights.map((insight) => (
                        <div key={insight.id} className="border border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-semibold">{insight.type}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              insight.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                              insight.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {insight.priority}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{insight.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-green-400 text-sm font-semibold">{insight.impact}</span>
                            <span className="text-blue-400 text-sm">{insight.confidence}% confidence</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Market Analysis</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <h4 className="text-white font-semibold mb-2">Market Sentiment</h4>
                        <p className="text-gray-300 text-sm">Bullish sentiment detected in tech sector</p>
                      </div>
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <h4 className="text-white font-semibold mb-2">Risk Assessment</h4>
                        <p className="text-gray-300 text-sm">Portfolio risk level: Moderate (7.2/10)</p>
                      </div>
                      <div className="p-3 bg-slate-600/50 rounded-lg">
                        <h4 className="text-white font-semibold mb-2">Opportunity Alert</h4>
                        <p className="text-gray-300 text-sm">Emerging markets showing strong growth potential</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Financial Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Privacy & Security</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Data Encryption</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Two-Factor Auth</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Backup</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Rebalancing</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Smart Alerts</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Predictive Analytics</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinancialTools; 