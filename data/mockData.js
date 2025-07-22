export const mockAnalyticsData = {
  metrics: {
    totalUsers: 12543,
    activeUsers: 8721,
    revenue: 142567,
    growth: 23.5,
    conversionRate: 4.8,
    bounceRate: 32.1,
  },
  
  chartData: {
    userGrowth: [
      { label: 'Jan', value: 1200 },
      { label: 'Feb', value: 1890 },
      { label: 'Mar', value: 2100 },
      { label: 'Apr', value: 2800 },
      { label: 'May', value: 3200 },
      { label: 'Jun', value: 3800 },
      { label: 'Jul', value: 4200 },
    ],
    
    revenue: [
      { label: 'Jan', value: 15000 },
      { label: 'Feb', value: 22000 },
      { label: 'Mar', value: 28000 },
      { label: 'Apr', value: 35000 },
      { label: 'May', value: 41000 },
      { label: 'Jun', value: 48000 },
      { label: 'Jul', value: 52000 },
    ],
    
    serviceUsage: [
      { label: 'Dashboard', value: 85 },
      { label: 'Analytics', value: 67 },
      { label: 'Services', value: 78 },
      { label: 'Settings', value: 45 },
      { label: 'Profile', value: 56 },
    ],
  },
  
  topPages: [
    { path: '/dashboard', views: 15420, uniqueViews: 8930 },
    { path: '/analytics', views: 12340, uniqueViews: 7650 },
    { path: '/services', views: 9870, uniqueViews: 6540 },
    { path: '/profile', views: 7650, uniqueViews: 5430 },
    { path: '/settings', views: 5430, uniqueViews: 4320 },
  ],
  
  recentActivity: [
    {
      id: 1,
      type: 'user_signup',
      message: 'New user registered',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      user: 'john@example.com',
    },
    {
      id: 2,
      type: 'service_deployed',
      message: 'Service deployed successfully',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      service: 'api-gateway',
    },
    {
      id: 3,
      type: 'payment_received',
      message: 'Payment processed',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      amount: '$299.00',
    },
    {
      id: 4,
      type: 'system_update',
      message: 'System updated to v2.1.0',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
  ],
};

export const mockServiceData = {
  services: [
    {
      id: 1,
      name: 'API Gateway',
      status: 'running',
      health: 98.5,
      requests: 145692,
      lastDeployed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      version: '2.1.3',
    },
    {
      id: 2,
      name: 'Database',
      status: 'running',
      health: 99.2,
      requests: 87432,
      lastDeployed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      version: '1.8.2',
    },
    {
      id: 3,
      name: 'Authentication',
      status: 'warning',
      health: 95.1,
      requests: 23456,
      lastDeployed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      version: '3.2.1',
    },
    {
      id: 4,
      name: 'File Storage',
      status: 'running',
      health: 97.8,
      requests: 12765,
      lastDeployed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      version: '1.5.0',
    },
  ],
  
  deployments: [
    {
      id: 1,
      service: 'API Gateway',
      version: '2.1.3',
      status: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      duration: '2m 34s',
    },
    {
      id: 2,
      service: 'Authentication',
      version: '3.2.1',
      status: 'success',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      duration: '1m 45s',
    },
    {
      id: 3,
      service: 'Database',
      version: '1.8.2',
      status: 'failed',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      duration: '45s',
      error: 'Connection timeout',
    },
  ],
};

export const mockUserData = {
  profile: {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@aranyaone.com',
    avatar: '/images/avatar.jpg',
    role: 'Admin',
    joinedDate: new Date('2023-01-15'),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    preferences: {
      theme: 'light',
      notifications: true,
      emailUpdates: true,
      language: 'en',
    },
  },
  
  achievements: [
    {
      id: 1,
      title: 'First Login',
      description: 'Completed your first login',
      icon: '🎉',
      completed: true,
      date: new Date('2023-01-15'),
    },
    {
      id: 2,
      title: 'Dashboard Master',
      description: 'Customized your dashboard',
      icon: '🎯',
      completed: true,
      date: new Date('2023-01-20'),
    },
    {
      id: 3,
      title: 'Service Manager',
      description: 'Deployed your first service',
      icon: '⚙️',
      completed: true,
      date: new Date('2023-02-01'),
    },
    {
      id: 4,
      title: 'Analytics Pro',
      description: 'Used analytics for 30 days',
      icon: '📊',
      completed: false,
      progress: 75,
    },
  ],
};