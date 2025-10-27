import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const isClient = context.role === 'client';
  const isFreelancer = context.role === 'freelancer';

  return {
    ...context,
    isClient,
    isFreelancer,
  };
};
