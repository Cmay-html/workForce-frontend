
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    const pendingUserData = localStorage.getItem('pendingUserData');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    } else if (pendingUserData) {
      // Handle newly registered user
      try {
        const parsedUser = JSON.parse(pendingUserData);
        setUser(parsedUser);
        localStorage.setItem('userData', pendingUserData);
        localStorage.setItem('authToken', 'temp_token_' + Date.now());
        localStorage.removeItem('pendingUserData');
      } catch (error) {
        console.error('Error parsing pending user data:', error);
        localStorage.removeItem('pendingUserData');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await authService.login({ email, password });
      // Tolerant parsing of token/user shapes
      const data = res.data || {};
      const token = data.token || data.access_token || data.accessToken;
      const userData = data.user || data.data?.user || null;

      if (!token || !userData) {
        throw new Error('Invalid login response');
      }

      setUser(userData);
      // Store under both keys for compatibility with existing code
      localStorage.setItem('authToken', token);
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const registerClient = async (clientData) => {
    try {
      setLoading(true);
      const payload = { ...clientData, role: 'client' };
      const res = await authService.register(payload);
      const data = res.data || {};
      // Assume backend may require email verification
      return {
        success: true,
        verificationRequired: !!data.verificationRequired,
        email: clientData.email,
        message: data.message || 'Client registration successful',
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const registerFreelancer = async (freelancerData) => {
    try {
      setLoading(true);
      const payload = { ...freelancerData, role: 'freelancer' };
      const res = await authService.register(payload);
      const data = res.data || {};
      return {
        success: true,
        verificationRequired: !!data.verificationRequired,
        email: freelancerData.email,
        message: data.message || 'Freelancer registration successful',
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('pendingUserData');
    localStorage.removeItem('userProjects');
    localStorage.removeItem('proposals');
    setUser(null);
  };

  const verifyEmail = async (token, email) => {
    try {
      setLoading(true);
      // Some backends accept POST /auth/verify-email with token+email
      const res = await authService.verifyEmail
        ? authService.verifyEmail({ token, email })
        : Promise.reject(new Error('Email verification not supported'));
      const data = res.data || {};
      const jwt = data.token || data.access_token;
      const userData = data.user;
      if (jwt && userData) {
        setUser(userData);
        localStorage.setItem('authToken', jwt);
        localStorage.setItem('token', jwt);
        localStorage.setItem('userData', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      throw new Error('Invalid verification response');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Email verification failed';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    registerClient,
    registerFreelancer,
    verifyEmail,
    loading,
    isAuthenticated: !!user,
    isClient: user?.role === 'client',
    isFreelancer: user?.role === 'freelancer',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
