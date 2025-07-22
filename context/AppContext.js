import { createContext, useContext, useReducer, useEffect } from 'react';

// Action types
const ACTIONS = {
  SET_THEME: 'SET_THEME',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_LOADING: 'SET_LOADING',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_PAGE_TITLE: 'SET_PAGE_TITLE',
};

// Initial state
const initialState = {
  theme: 'light',
  sidebarOpen: false,
  isLoading: false,
  notifications: [],
  pageTitle: 'Aranya One',
  preferences: {
    animations: true,
    compactMode: false,
    autoRefresh: true,
  },
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    
    case ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    
    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    
    case ACTIONS.SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload,
      };
    
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('aranya_theme');
    if (savedTheme) {
      dispatch({ type: ACTIONS.SET_THEME, payload: savedTheme });
    }
  }, []);
  
  // Actions
  const setTheme = (theme) => {
    dispatch({ type: ACTIONS.SET_THEME, payload: theme });
    localStorage.setItem('aranya_theme', theme);
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const toggleSidebar = () => {
    dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
  };
  
  const setLoading = (isLoading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading });
  };
  
  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification,
    };
    
    dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: newNotification });
    
    // Auto-remove notification after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  };
  
  const removeNotification = (id) => {
    dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id });
  };
  
  const setPageTitle = (title) => {
    dispatch({ type: ACTIONS.SET_PAGE_TITLE, payload: title });
    document.title = title;
  };
  
  const showSuccess = (message) => {
    addNotification({
      type: 'success',
      title: 'Success',
      message,
    });
  };
  
  const showError = (message) => {
    addNotification({
      type: 'error',
      title: 'Error',
      message,
      duration: 8000,
    });
  };
  
  const showInfo = (message) => {
    addNotification({
      type: 'info',
      title: 'Info',
      message,
    });
  };
  
  const value = {
    ...state,
    setTheme,
    toggleSidebar,
    setLoading,
    addNotification,
    removeNotification,
    setPageTitle,
    showSuccess,
    showError,
    showInfo,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use app context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}