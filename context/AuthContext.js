import { createContext, useContext, useReducer, useEffect } from 'react';

// Action types
const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  LOGOUT: 'LOGOUT',
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'en',
  },
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      };
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    
    case ACTIONS.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };
    
    case ACTIONS.LOGOUT:
      return {
        ...initialState,
        isLoading: false,
      };
    
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Load user data on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check for stored auth token
        const token = localStorage.getItem('aranya_auth_token');
        if (token) {
          // In a real app, validate the token with your API
          const mockUser = {
            id: 1,
            name: 'Alex Johnson',
            email: 'alex@aranyaone.com',
            role: 'Admin',
            avatar: '/images/avatar.jpg',
          };
          dispatch({ type: ACTIONS.SET_USER, payload: mockUser });
        } else {
          dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    };
    
    loadUser();
  }, []);
  
  // Actions
  const login = async (credentials) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      // Mock login - replace with real API call
      const mockUser = {
        id: 1,
        name: 'Alex Johnson',
        email: credentials.email,
        role: 'Admin',
        avatar: '/images/avatar.jpg',
      };
      
      localStorage.setItem('aranya_auth_token', 'mock_token_123');
      dispatch({ type: ACTIONS.SET_USER, payload: mockUser });
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };
  
  const logout = () => {
    localStorage.removeItem('aranya_auth_token');
    dispatch({ type: ACTIONS.LOGOUT });
  };
  
  const updatePreferences = (newPreferences) => {
    dispatch({ type: ACTIONS.UPDATE_PREFERENCES, payload: newPreferences });
    // Persist to localStorage
    localStorage.setItem('aranya_preferences', JSON.stringify({
      ...state.preferences,
      ...newPreferences,
    }));
  };
  
  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };
  
  const value = {
    ...state,
    login,
    logout,
    updatePreferences,
    clearError,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}