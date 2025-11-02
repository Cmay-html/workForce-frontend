import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock Auth Context Provider for testing
export const MockAuthProvider = ({ children, authState = {} }) => {
  const defaultAuthState = {
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
  };

  // Create a context with the mock provider
  const AuthContext = React.createContext();

  return (
    <AuthContext.Provider value={defaultAuthState}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom render function that includes necessary providers
export const renderWithProviders = (
  ui,
  {
    authState = {},
    route = '/',
    ...renderOptions
  } = {}
) => {
  // Mock the useAuth hook globally
  vi.mock('../hooks/useAuth', () => ({
    useAuth: () => ({
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
    })
  }));

  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <MockAuthProvider authState={authState}>
        {children}
      </MockAuthProvider>
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
