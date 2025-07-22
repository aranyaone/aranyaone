import config from '../config';

class ApiClient {
  constructor() {
    this.baseURL = config.api.baseUrl;
    this.timeout = config.api.timeout;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: this.timeout,
    };
    
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };
    
    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      mergedOptions.headers.Authorization = `Bearer ${token}`;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), mergedOptions.timeout);
      
      const response = await fetch(url, {
        ...mergedOptions,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }
  
  async get(endpoint, params = {}) {
    const url = new URL(endpoint, this.baseURL);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    
    return this.request(url.pathname + url.search);
  }
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
  
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
  
  getAuthToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(config.auth.tokenKey);
  }
  
  setAuthToken(token) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(config.auth.tokenKey, token);
  }
  
  clearAuthToken() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(config.auth.tokenKey);
    localStorage.removeItem(config.auth.refreshTokenKey);
  }
}

// API endpoints
export const api = new ApiClient();

export const analyticsApi = {
  getMetrics: () => api.get('/analytics/metrics'),
  getChartData: (type) => api.get(`/analytics/charts/${type}`),
  getTopPages: () => api.get('/analytics/pages'),
  getActivity: () => api.get('/analytics/activity'),
};

export const servicesApi = {
  getServices: () => api.get('/services'),
  getService: (id) => api.get(`/services/${id}`),
  deployService: (id, version) => api.post(`/services/${id}/deploy`, { version }),
  getDeployments: () => api.get('/deployments'),
  getLogs: (serviceId) => api.get(`/services/${serviceId}/logs`),
};

export const userApi = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.patch('/user/profile', data),
  getAchievements: () => api.get('/user/achievements'),
  updatePreferences: (preferences) => api.patch('/user/preferences', preferences),
};

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  register: (userData) => api.post('/auth/register', userData),
};