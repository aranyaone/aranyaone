export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.aranyaone.com';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  SERVICES: '/services',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  FOUNDER: '/founder',
  SUPPORT: '/support',
  DOCS: '/docs',
  STATUS: '/status',
};

export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    900: '#7f1d1d',
  },
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'aranya_user_preferences',
  THEME: 'aranya_theme',
  AUTH_TOKEN: 'aranya_auth_token',
  DASHBOARD_CONFIG: 'aranya_dashboard_config',
};

export const CHART_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // yellow
  '#ef4444', // red
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#f97316', // orange
  '#84cc16', // lime
];

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  maxLimit: 100,
};

export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
};