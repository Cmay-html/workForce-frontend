// src/Context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd validate the token with your backend
      // For now, we'll try to get user data from localStorage or use defaults
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser({ email: 'user@example.com', firstName: 'John', lastName: 'Doe' });
      }
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password, userData = null) => {
    // Support both signature styles:
    // login(email, password) OR login(userData)
    let userInfo;
    
    if (userData) {
      // If userData is provided, use it (compatible with first version)
      userInfo = userData;
    } else {
      // If email/password are provided (compatible with second version)
      userInfo = { email, firstName: '', lastName: '' };
    }
    
    setUser(userInfo);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};