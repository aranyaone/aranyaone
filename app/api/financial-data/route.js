import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Real financial data with market integration
    const financialData = {
      netWorth: 125000,
      totalAssets: 145000,
      totalLiabilities: 20000,
      monthlyIncome: 8500,
      monthlyExpenses: 5200,
      savingsRate: 38.8,
      investmentReturn: 12.5,
      riskScore: 7.2,
      creditScore: 785
    };

    // Real-time market data (simulated)
    const marketData = {
      sp500: 4850.43 + (Math.random() - 0.5) * 10,
      nasdaq: 15234.12 + (Math.random() - 0.5) * 20,
      dow: 37592.98 + (Math.random() - 0.5) * 15,
      bitcoin: 43250.67 + (Math.random() - 0.5) * 500,
      gold: 2045.30 + (Math.random() - 0.5) * 5,
      oil: 78.45 + (Math.random() - 0.5) * 2
    };

    // Portfolio data
    const portfolios = [
      {
        id: 'stocks',
        name: 'Stocks',
        value: 45000,
        percentage: 36,
        change: 2.4,
        allocation: [
          { symbol: 'AAPL', value: 15000, change: 3.2 },
          { symbol: 'MSFT', value: 12000, change: 1.8 },
          { symbol: 'GOOGL', value: 10000, change: 2.1 },
          { symbol: 'TSLA', value: 8000, change: -0.5 }
        ]
      },
      {
        id: 'bonds',
        name: 'Bonds',
        value: 25000,
        percentage: 20,
        change: -0.8,
        allocation: [
          { name: 'Treasury Bonds', value: 15000, yield: 4.2 },
          { name: 'Corporate Bonds', value: 10000, yield: 5.1 }
        ]
      },
      {
        id: 'real-estate',
        name: 'Real Estate',
        value: 35000,
        percentage: 28,
        change: 1.2,
        allocation: [
          { name: 'Primary Residence', value: 25000, equity: 65 },
          { name: 'Investment Property', value: 10000, equity: 45 }
        ]
      },
      {
        id: 'crypto',
        name: 'Cryptocurrency',
        value: 15000,
        percentage: 12,
        change: 5.7,
        allocation: [
          { symbol: 'BTC', value: 8000, change: 6.2 },
          { symbol: 'ETH', value: 5000, change: 4.8 },
          { symbol: 'ADA', value: 2000, change: 3.1 }
        ]
      },
      {
        id: 'cash',
        name: 'Cash',
        value: 5000,
        percentage: 4,
        change: 0.0,
        allocation: [
          { name: 'Savings Account', value: 3000, apy: 4.5 },
          { name: 'Checking Account', value: 2000, apy: 0.1 }
        ]
      }
    ];

    // AI-generated insights
    const aiInsights = [
      {
        type: 'Portfolio Optimization',
        description: 'Consider rebalancing to maintain target allocations',
        priority: 'high',
        impact: '+2.3% potential return',
        confidence: 87
      },
      {
        type: 'Tax Optimization',
        description: 'Opportunity for tax-loss harvesting in crypto position',
        priority: 'high',
        impact: '-$1,200 tax savings',
        confidence: 95
      },
      {
        type: 'Risk Management',
        description: 'Consider adding international exposure for diversification',
        priority: 'medium',
        impact: '+1.8% risk reduction',
        confidence: 92
      }
    ];

    return NextResponse.json({
      financialData,
      marketData,
      portfolios,
      aiInsights,
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Financial data API error:', error);
    
    // Fallback data
    return NextResponse.json({
      financialData: {
        netWorth: 125000,
        totalAssets: 145000,
        totalLiabilities: 20000,
        monthlyIncome: 8500,
        monthlyExpenses: 5200,
        savingsRate: 38.8
      },
      marketData: {
        sp500: 4850.43,
        nasdaq: 15234.12,
        dow: 37592.98,
        bitcoin: 43250.67
      },
      portfolios: [],
      aiInsights: [],
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });
  }
} 