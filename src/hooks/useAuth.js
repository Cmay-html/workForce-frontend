import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Development bypass - check environment variable
  const authBypass = import.meta.env.VITE_AUTH_BYPASS === 'true';
  
  if (authBypass && import.meta.env.DEV) {
    return {
      ...context,
      isAuthenticated: true,
      user: {
        id: 'dev-user',
        email: 'dev@example.com',
        firstName: 'Dev',
        lastName: 'User',
        role: import.meta.env.VITE_DEV_ROLE || 'client'
      },
      loading: false,
      isClient: (import.meta.env.VITE_DEV_ROLE || 'client') === 'client',
      isFreelancer: (import.meta.env.VITE_DEV_ROLE || 'client') === 'freelancer',
      isAdmin: (import.meta.env.VITE_DEV_ROLE || 'client') === 'admin'
    };
  }

  return context;
};
