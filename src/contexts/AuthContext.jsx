
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      const pendingUserData = localStorage.getItem('pendingUserData');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
          setRole(parsedUser.role);
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
          setIsAuthenticated(true);
          setRole(parsedUser.role);
          localStorage.setItem('userData', pendingUserData);
          localStorage.setItem('authToken', 'temp_token_' + Date.now());
          localStorage.removeItem('pendingUserData');
        } catch (error) {
          console.error('Error parsing pending user data:', error);
          localStorage.removeItem('pendingUserData');
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call to backend
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
      setRole(data.user.role);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      return { success: true, user: data.user };

    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const registerClient = async (clientData) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call to backend
      const apiUrl = import.meta.env.VITE_API_URL;
      
      // Simulate successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        verificationRequired: false,
        email: clientData.email,
        message: "Client registration successful"
      };

    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const registerFreelancer = async (freelancerData) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call to backend
      const apiUrl = import.meta.env.VITE_API_URL;
      
      // Simulate successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        verificationRequired: false,
        email: freelancerData.email,
        message: "Freelancer registration successful"
      };

    } catch (error) {
      return { success: false, error: error.message };
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
    setIsAuthenticated(false);
    setRole(null);
  };

  const verifyEmail = async (token, email) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call to backend
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email }),
      });

      if (!response.ok) {
        throw new Error('Email verification failed');
      }

      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
      setRole(data.user.role);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      return { success: true, user: data.user };

    } catch (error) {
      return { success: false, error: error.message };
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
    isAuthenticated,
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
