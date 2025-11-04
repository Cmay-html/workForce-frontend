import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import App from '../../App';

// Mock all child components to avoid complex rendering
vi.mock('../../pages/auth/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login Page</div>
}));

vi.mock('../../pages/auth/RegistrationPage', () => ({
  default: () => <div data-testid="registration-page">Registration Page</div>
}));

vi.mock('../../pages/client/Dashboard', () => ({
  default: () => <div data-testid="client-dashboard">Client Dashboard</div>
}));

vi.mock('../../pages/freelancer/Dashboard', () => ({
  default: () => <div data-testid="freelancer-dashboard">Freelancer Dashboard</div>
}));

vi.mock('../../pages/admin/AdminDashboard', () => ({
  default: () => <div data-testid="admin-dashboard">Admin Dashboard</div>
}));

vi.mock('../../pages/LandingPage', () => ({
  default: () => <div data-testid="landing-page">Landing Page</div>
}));

// Mock the useAuth hook
const mockUseAuth = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));

describe('Route Guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Public Routes', () => {
    it('should allow access to landing page without authentication', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    it('should allow access to login page without authentication', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('should redirect authenticated users from login to their dashboard', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client' },
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('Protected Routes', () => {
    it('should redirect unauthenticated users to login', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });

    it('should show loading state while checking authentication', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: true,
        user: null,
        role: null
      });

      render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
    });
  });

  describe('Client Routes', () => {
    it('should allow client to access client dashboard', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client' },
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
    });

    it('should redirect freelancer from client routes to freelancer dashboard', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'freelancer' },
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
        expect(screen.getByTestId('freelancer-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('Freelancer Routes', () => {
    it('should allow freelancer to access freelancer dashboard', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'freelancer' },
        role: 'freelancer',
        isClient: false,
        isFreelancer: true
      });

      render(
        <MemoryRouter initialEntries={['/freelancer/dashboard']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('freelancer-dashboard')).toBeInTheDocument();
    });

    it('should redirect client from freelancer routes to client dashboard', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client' },
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
        expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
      });
    });
  });

  describe('Admin Routes', () => {
    it('should allow admin to access admin dashboard', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'admin' },
        role: 'admin',
        isClient: false,
        isFreelancer: false,
        isAdmin: true
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument();
    });

    it('should redirect non-admin to unauthorized page', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client' },
        role: 'client',
        isClient: true,
        isAdmin: false
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Unauthorized Access')).toBeInTheDocument();
      });
    });
  });

  describe('404 Handling', () => {
    it('should redirect unknown routes to landing page', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        loading: false,
        user: null,
        role: null
      });

      render(
        <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('landing-page')).toBeInTheDocument();
      });
    });
  });
});
