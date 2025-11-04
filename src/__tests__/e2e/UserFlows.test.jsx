import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock useAuth
const mockUseAuth = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));

// Mock all page components
vi.mock('../../pages/LandingPage', () => ({
  default: () => <div data-testid="landing-page">Landing</div>
}));

vi.mock('../../pages/auth/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login</div>
}));

vi.mock('../../pages/client/Dashboard', () => ({
  default: () => <div data-testid="client-dashboard">Client Dashboard</div>
}));

vi.mock('../../pages/freelancer/Dashboard', () => ({
  default: () => <div data-testid="freelancer-dashboard">Freelancer Dashboard</div>
}));

describe('End-to-End User Flows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe('Client User Journey', () => {
    it('should complete full client registration and dashboard flow', async () => {
      // Step 1: Unauthenticated - lands on homepage
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('landing-page')).toBeInTheDocument();

      // Step 2: Navigates to login
      rerender(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('login-page')).toBeInTheDocument();

      // Step 3: After login - authenticated as client
      const clientUser = {
        id: '1',
        email: 'client@test.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'client'
      };

      localStorageMock.setItem('authToken', 'fake-jwt-token');
      localStorageMock.setItem('userData', JSON.stringify(clientUser));

      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: clientUser,
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      rerender(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
      });
    });

    it('should prevent client from accessing freelancer routes', async () => {
      const clientUser = {
        id: '1',
        email: 'client@test.com',
        role: 'client'
      };

      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: clientUser,
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      render(
        <MemoryRouter initialEntries={['/freelancer/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should redirect to client dashboard
        expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('Freelancer User Journey', () => {
    it('should complete full freelancer registration and dashboard flow', async () => {
      // Step 1: Unauthenticated
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('landing-page')).toBeInTheDocument();

      // Step 2: After login - authenticated as freelancer
      const freelancerUser = {
        id: '2',
        email: 'freelancer@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'freelancer'
      };

      localStorageMock.setItem('authToken', 'fake-jwt-token');
      localStorageMock.setItem('userData', JSON.stringify(freelancerUser));

      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: freelancerUser,
        role: 'freelancer',
        isClient: false,
        isFreelancer: true
      });

      rerender(
        <MemoryRouter initialEntries={['/freelancer/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('freelancer-dashboard')).toBeInTheDocument();
      });
    });

    it('should prevent freelancer from accessing client routes', async () => {
      const freelancerUser = {
        id: '2',
        email: 'freelancer@test.com',
        role: 'freelancer'
      };

      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: freelancerUser,
        role: 'freelancer',
        isClient: false,
        isFreelancer: true
      });

      render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should redirect to freelancer dashboard
        expect(screen.getByTestId('freelancer-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('Session Persistence', () => {
    it('should maintain authentication across page refreshes', async () => {
      const clientUser = {
        id: '1',
        email: 'client@test.com',
        firstName: 'John',
        role: 'client'
      };

      // Simulate existing auth in localStorage
      localStorageMock.setItem('authToken', 'fake-jwt-token');
      localStorageMock.setItem('userData', JSON.stringify(clientUser));

      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: clientUser,
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      // First render - simulate page load
      const { rerender } = render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();

      // Simulate refresh - unmount and remount
      rerender(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      // Should still be authenticated
      await waitFor(() => {
        expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
      });
    });

    it('should logout and redirect when token is removed', async () => {
      const clientUser = {
        id: '1',
        email: 'client@test.com',
        role: 'client'
      };

      // Start authenticated
      localStorageMock.setItem('authToken', 'fake-jwt-token');

      mockUseAuth.mockReturnValueOnce({
        isAuthenticated: true,
        loading: false,
        user: clientUser,
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      const { rerender } = render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();

      // Simulate logout - remove token
      localStorageMock.removeItem('authToken');
      localStorageMock.removeItem('userData');

      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      // Rerender to trigger check
      rerender(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });
  });

  describe('Error Recovery', () => {
    it('should recover from loading errors', async () => {
      // Start with loading state
      mockUseAuth.mockReturnValueOnce({
        isAuthenticated: false,
        loading: true,
        user: null,
        role: null
      });

      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      // Should show loading spinner
      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();

      // Then complete loading
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      rerender(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('landing-page')).toBeInTheDocument();
      });
    });

    it('should handle invalid tokens gracefully', async () => {
      // Set invalid/expired token
      localStorageMock.setItem('authToken', 'invalid-token');

      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null,
        error: 'Invalid token'
      });

      render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Should redirect to login
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });
  });

  describe('Multi-Tab Behavior', () => {
    it('should sync authentication state across tabs', async () => {
      const clientUser = {
        id: '1',
        email: 'client@test.com',
        role: 'client'
      };

      // Tab 1: User is authenticated
      localStorageMock.setItem('authToken', 'fake-jwt-token');
      localStorageMock.setItem('userData', JSON.stringify(clientUser));

      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: clientUser,
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      const { rerender } = render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();

      // Simulate logout in another tab (remove token)
      localStorageMock.removeItem('authToken');

      // Simulate storage event
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'authToken',
          oldValue: 'fake-jwt-token',
          newValue: null,
          url: window.location.href
        })
      );

      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      // This tab should detect the logout
      rerender(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });
  });
});
