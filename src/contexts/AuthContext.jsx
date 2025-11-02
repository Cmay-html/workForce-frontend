
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

      // Mock authentication for development
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists in localStorage (from registration)
      const storedUserData = localStorage.getItem('userData');
      let userData = null;

      if (storedUserData) {
        try {
          userData = JSON.parse(storedUserData);
        } catch (e) {
        }
      }

      // If user exists and password matches, use stored data
      if (userData && userData.email === email && userData.password === password) {
        setUser(userData);
        // Store fresh token for this session
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        return { success: true, user: userData };
      }

      // Fallback to mock data based on email for development
      const emailStr = String(email || '');
      const mockUser = {
        id: Date.now().toString(),
        email: emailStr,
        firstName: emailStr.includes('client') ? 'John' : 'Jane',
        lastName: emailStr.includes('client') ? 'Doe' : 'Smith',
        role: emailStr.includes('client') ? 'client' : 'freelancer',
        password: password // Store password for consistency
      };

      // Store mock token and user data
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(mockUser));

      setUser(mockUser);
      return { success: true, user: mockUser };

    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const registerClient = async (clientData) => {
    try {
      setLoading(true);

      // Mock client registration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate verification token
      const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      // Create pending user data (not verified yet)
      const pendingUser = {
        id: Date.now().toString(),
        email: clientData.email,
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        role: 'client',
        companyName: clientData.companyName,
        industry: clientData.industry,
        companySize: clientData.companySize,
        password: clientData.password, // Store password for login verification
        emailVerified: false,
        verificationToken: verificationToken
      };

      // Store pending user data
      localStorage.setItem('pendingUserData', JSON.stringify(pendingUser));

      // Mock email sending - in production, this would send actual email
      const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}&email=${encodeURIComponent(clientData.email)}`;
      console.log('Email verification link (for testing):', verificationLink);

      return {
        success: true,
        verificationRequired: true,
        email: clientData.email,
        message: 'Registration successful! Please check your email for verification link.'
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

      // Mock freelancer registration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate verification token
      const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      // Create pending user data (not verified yet)
      const pendingUser = {
        id: Date.now().toString(),
        email: freelancerData.email,
        firstName: freelancerData.firstName,
        lastName: freelancerData.lastName,
        role: 'freelancer',
        title: freelancerData.title,
        bio: freelancerData.bio,
        experienceLevel: freelancerData.experienceLevel,
        skills: freelancerData.skills,
        categories: freelancerData.categories,
        password: freelancerData.password, // Store password for login verification
        emailVerified: false,
        verificationToken: verificationToken
      };

      // Store pending user data
      localStorage.setItem('pendingUserData', JSON.stringify(pendingUser));

      // Mock email sending - in production, this would send actual email
      const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}&email=${encodeURIComponent(freelancerData.email)}`;
      console.log('Email verification link (for testing):', verificationLink);

      return {
        success: true,
        verificationRequired: true,
        email: freelancerData.email,
        message: 'Registration successful! Please check your email for verification link.'
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

      // Check if there's a pending user with matching token and email
      const pendingUserData = localStorage.getItem('pendingUserData');

      if (!pendingUserData) {
        return { success: false, error: 'No pending verification found.' };
      }

      const pendingUser = JSON.parse(pendingUserData);

      if (pendingUser.email !== email || pendingUser.verificationToken !== token) {
        return { success: false, error: 'Invalid verification token or email.' };
      }

      // Mark email as verified and create authenticated user
      const verifiedUser = {
        ...pendingUser,
        emailVerified: true
      };

      // Remove verification token and pending data
      delete verifiedUser.verificationToken;

      // Store authenticated user
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(verifiedUser));
      localStorage.removeItem('pendingUserData');

      setUser(verifiedUser);
      return { success: true, user: verifiedUser };

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