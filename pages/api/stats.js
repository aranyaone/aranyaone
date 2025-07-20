// API endpoint for dashboard statistics
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Mock live statistics data
    const stats = {
      earnings: {
        current: 12847.50,
        previous: 11234.20,
        change: 14.4
      },
      visitors: {
        current: 8564,
        previous: 7892,
        change: 8.5
      },
      signups: {
        current: 324,
        previous: 298,
        change: 8.7
      },
      conversionRate: {
        current: 3.78,
        previous: 3.77,
        change: 0.3
      },
      chartData: [
        { month: 'Jan', earnings: 8500, visitors: 6200, signups: 145 },
        { month: 'Feb', earnings: 9200, visitors: 6800, signups: 167 },
        { month: 'Mar', earnings: 8900, visitors: 6500, signups: 156 },
        { month: 'Apr', earnings: 10200, visitors: 7300, signups: 189 },
        { month: 'May', earnings: 11100, visitors: 7800, signups: 234 },
        { month: 'Jun', earnings: 12847, visitors: 8564, signups: 324 }
      ],
      quickStats: {
        activeUsers: 1247,
        pendingOrders: 23,
        systemHealth: 99.2,
        lastUpdate: new Date().toISOString()
      }
    };

    res.status(200).json(stats);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}