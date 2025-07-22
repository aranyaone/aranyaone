const config = {
  app: {
    name: 'Aranya One',
    version: '2.0.0',
    description: 'Complete Digital Empire Management Platform',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://aranyaone.com',
  },
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.aranyaone.com',
    timeout: 30000,
    retries: 3,
  },
  
  auth: {
    tokenKey: 'aranya_auth_token',
    refreshTokenKey: 'aranya_refresh_token',
    sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
  },
  
  features: {
    analytics: {
      enabled: true,
      realTimeUpdates: true,
      historicalData: true,
      exportData: true,
    },
    dashboard: {
      customizable: true,
      widgets: ['metrics', 'charts', 'tables', 'notifications'],
      autoRefresh: true,
      refreshInterval: 30000, // 30 seconds
    },
    services: {
      monitoring: true,
      management: true,
      deployment: true,
      scaling: true,
    },
    notifications: {
      enabled: true,
      realTime: true,
      email: true,
      push: true,
    },
  },
  
  ui: {
    theme: {
      default: 'light',
      options: ['light', 'dark', 'auto'],
    },
    animations: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
    },
    charts: {
      defaultColors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      animations: true,
      responsive: true,
    },
  },
  
  performance: {
    lazyLoading: true,
    imageOptimization: true,
    bundleSplitting: true,
    caching: {
      enabled: true,
      duration: 5 * 60 * 1000, // 5 minutes
    },
  },
  
  security: {
    csrfProtection: true,
    rateLimiting: true,
    dataEncryption: true,
  },
  
  development: {
    debug: process.env.NODE_ENV === 'development',
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      console: true,
      file: false,
    },
  },
};

export default config;