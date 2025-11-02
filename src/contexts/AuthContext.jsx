
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication token on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    console.log('Auth check:', {
      token: !!token,
      userData: !!userData,
      tokenValue: token,
      userDataValue: userData
    });

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    } else {
    }
    setLoading(false);
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
      const response = await fetch(`${apiUrl}/api/auth/register/client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();

      return {
        success: true,
        verificationRequired: data.verificationRequired,
        email: clientData.email,
        message: data.message
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
      const response = await fetch(`${apiUrl}/api/auth/register/freelancer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(freelancerData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();

      return {
        success: true,
        verificationRequired: data.verificationRequired,
        email: freelancerData.email,
        message: data.message
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