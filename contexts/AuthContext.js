import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users - replace with real authentication in production
const mockUsers = {
  'admin@aranyaone.com': {
    id: 1,
    email: 'admin@aranyaone.com',
    name: 'Admin User',
    role: 'admin',
    password: 'admin123' // In production, use proper hashing
  },
  'user@aranyaone.com': {
    id: 2,
    email: 'user@aranyaone.com', 
    name: 'Regular User',
    role: 'user',
    password: 'user123'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('aranyaone_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          localStorage.removeItem('aranyaone_user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - replace with real API call
    const mockUser = mockUsers[email];
    
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid email or password');
    }

    const userWithoutPassword = {
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      role: mockUser.role
    };

    setUser(userWithoutPassword);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('aranyaone_user', JSON.stringify(userWithoutPassword));
    }

    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aranyaone_user');
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};