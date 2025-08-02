import { NextResponse } from 'next/server';

// Simulated real-time performance data
const generateRealTimeMetrics = () => {
  const baseMetrics = {
    timestamp: Date.now(),
    server: {
      cpu: Math.floor(Math.random() * 30) + 20, // 20-50%
      memory: Math.floor(Math.random() * 40) + 30, // 30-70%
      disk: Math.floor(Math.random() * 20) + 15, // 15-35%
      network: Math.floor(Math.random() * 100) + 50 // 50-150 Mbps
    },
    platform: {
      activeUsers: 1247 + Math.floor(Math.random() * 200),
      requestsPerSecond: 450 + Math.floor(Math.random() * 100),
      responseTime: Math.floor(Math.random() * 50) + 80, // 80-130ms
      uptime: 99.94 + (Math.random() * 0.05), // 99.94-99.99%
      errorRate: Math.random() * 0.5, // 0-0.5%
      throughput: 2.8 + (Math.random() * 0.4) // 2.8-3.2 GB/s
    },
    services: {
      aiChatbot: {
        status: 'operational',
        responseTime: 180 + Math.floor(Math.random() * 40),
        requests: 8420 + Math.floor(Math.random() * 500),
        successRate: 99.2 + (Math.random() * 0.7)
      },
      videoCreator: {
        status: 'operational', 
        responseTime: 2400 + Math.floor(Math.random() * 300),
        requests: 1240 + Math.floor(Math.random() * 100),
        successRate: 98.8 + (Math.random() * 1.0)
      },
      designAssistant: {
        status: 'operational',
        responseTime: 950 + Math.floor(Math.random() * 150),
        requests: 3420 + Math.floor(Math.random() * 200),
        successRate: 99.5 + (Math.random() * 0.4)
      },
      codeGenerator: {
        status: 'operational',
        responseTime: 1200 + Math.floor(Math.random() * 200),
        requests: 2140 + Math.floor(Math.random() * 150),
        successRate: 99.1 + (Math.random() * 0.8)
      }
    },
    analytics: {
      pageViews: 45230 + Math.floor(Math.random() * 2000),
      uniqueVisitors: 12840 + Math.floor(Math.random() * 500),
      bounceRate: 24.5 + (Math.random() * 5),
      avgSessionDuration: 485 + Math.floor(Math.random() * 60), // seconds
      conversionRate: 3.2 + (Math.random() * 0.8),
      topPages: [
        { path: '/', views: 8420 + Math.floor(Math.random() * 300) },
        { path: '/ai-chatbot', views: 6230 + Math.floor(Math.random() * 200) },
        { path: '/services', views: 4850 + Math.floor(Math.random() * 150) },
        { path: '/ai-video-creator', views: 3940 + Math.floor(Math.random() * 100) },
        { path: '/pricing', views: 2840 + Math.floor(Math.random() * 80) }
      ]
    },
    revenue: {
      todayRevenue: 8420.50 + (Math.random() * 1000),
      monthlyRevenue: 124850.75 + (Math.random() * 5000),
      yearlyRevenue: 1248500 + (Math.random() * 50000),
      subscriptions: {
        active: 3240 + Math.floor(Math.random() * 50),
        newToday: 12 + Math.floor(Math.random() * 5),
        churnRate: 2.1 + (Math.random() * 0.5)
      }
    }
  };

  return baseMetrics;
};

// Generate historical data for charts
const generateHistoricalData = (days = 7) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      users: 1000 + Math.floor(Math.random() * 500),
      revenue: 6000 + Math.floor(Math.random() * 3000),
      requests: 25000 + Math.floor(Math.random() * 10000),
      responseTime: 100 + Math.floor(Math.random() * 50)
    });
  }
  
  return data;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'realtime';
    const days = parseInt(searchParams.get('days')) || 7;

    switch (type) {
      case 'realtime':
        return NextResponse.json({
          success: true,
          data: generateRealTimeMetrics()
        });

      case 'historical':
        return NextResponse.json({
          success: true,
          data: generateHistoricalData(days)
        });

      case 'alerts':
        const alerts = [
          {
            id: 1,
            type: 'info',
            message: 'System optimization completed successfully',
            timestamp: Date.now() - 300000 // 5 minutes ago
          },
          {
            id: 2,
            type: 'success', 
            message: 'New AI model deployed to production',
            timestamp: Date.now() - 1800000 // 30 minutes ago
          }
        ];
        
        return NextResponse.json({
          success: true,
          data: alerts
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid metrics type'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Performance metrics API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch performance metrics'
    }, { status: 500 });
  }
}
