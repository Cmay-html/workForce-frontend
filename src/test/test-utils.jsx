import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the AuthContext module
vi.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: vi.fn(),
}));

import { AuthContext } from '../contexts/AuthContext';

// Custom render function that includes necessary providers
export const renderWithProviders = (
  ui,
  {
    authState = {},
    route = '/',
    ...renderOptions
  } = {}
) => {
  // Mock the useAuth hook to return the authState
  const { useAuth } = require('../contexts/AuthContext');
  useAuth.mockReturnValue({
    user: null,
    loading: false,
    isAuthenticated: false,
    isClient: false,
    isFreelancer: false,
    isAdmin: false,
    login: vi.fn(),
    logout: vi.fn(),
    registerClient: vi.fn(),
    registerFreelancer: vi.fn(),
    verifyEmail: vi.fn(),
    ...authState
  });

  const Wrapper = ({ children }) => (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Helper to create mock user objects
export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'client',
  ...overrides
});

// Helper to create authenticated auth state
export const createAuthenticatedState = (user = createMockUser()) => ({
  user,
  loading: false,
  isAuthenticated: true,
  isClient: user.role === 'client',
  isFreelancer: user.role === 'freelancer',
  isAdmin: user.role === 'admin'
});

// Helper to create unauthenticated auth state
export const createUnauthenticatedState = () => ({
  user: null,
  loading: false,
  isAuthenticated: false,
  isClient: false,
  isFreelancer: false,
  isAdmin: false
});

// Helper to create loading auth state
export const createLoadingState = () => ({
  user: null,
  loading: true,
  isAuthenticated: false,
  isClient: false,
  isFreelancer: false,
  isAdmin: false
});
