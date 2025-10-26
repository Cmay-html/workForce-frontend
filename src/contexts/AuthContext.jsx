// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role state for multi-role support
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd validate the token with your backend
      // For now, we'll try to get user data from localStorage or use defaults
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('role');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser({ email: 'user@example.com', firstName: 'John', lastName: 'Doe' });
      }
      if (storedRole) {
        setRole(storedRole);
      } else {
        setRole('client'); // Default role
      }
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password, userData = null, userRole = 'client') => {
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
    setRole(userRole);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const value = {
    user,
    role,
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