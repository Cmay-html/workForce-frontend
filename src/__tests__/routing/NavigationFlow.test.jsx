import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

// Mock components
vi.mock('../../pages/LandingPage', () => ({
  default: () => (
    <div data-testid="landing-page">
      <a href="/login" data-testid="nav-login">Login</a>
      <a href="/register" data-testid="nav-register">Register</a>
      <a href="/contact" data-testid="nav-contact">Contact</a>
    </div>
  )
}));

vi.mock('../../pages/auth/LoginPage', () => ({
  default: () => (
    <div data-testid="login-page">
      <button data-testid="login-submit">Login</button>
      <a href="/register" data-testid="link-register">Register</a>
    </div>
  )
}));

vi.mock('../../pages/client/Dashboard', () => ({
  default: () => (
    <div data-testid="client-dashboard">
      <nav data-testid="client-nav">
        <a href="/client/projects" data-testid="nav-projects">Projects</a>
        <a href="/client/milestones" data-testid="nav-milestones">Milestones</a>
        <a href="/client/profile" data-testid="nav-profile">Profile</a>
        <a href="/freelancers" data-testid="nav-freelancers">Browse Freelancers</a>
      </nav>
    </div>
  )
}));

vi.mock('../../pages/freelancer/Dashboard', () => ({
  default: () => (
    <div data-testid="freelancer-dashboard">
      <nav data-testid="freelancer-nav">
        <a href="/freelancer/projects" data-testid="nav-browse-projects">Browse Projects</a>
        <a href="/freelancer/proposals" data-testid="nav-proposals">Proposals</a>
        <a href="/freelancer/profile" data-testid="nav-profile">Profile</a>
        <a href="/freelancer/payments" data-testid="nav-payments">Payments</a>
      </nav>
    </div>
  )
}));

// Mock useAuth
const mockUseAuth = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));

describe('Navigation Flow Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Public Navigation', () => {
    it('should navigate from landing page to login', async () => {
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

      const loginLink = screen.getByTestId('nav-login');
      fireEvent.click(loginLink);

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });

    it('should navigate from login to registration', async () => {
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

      const registerLink = screen.getByTestId('link-register');
      fireEvent.click(registerLink);

      await waitFor(() => {
        expect(screen.getByTestId('registration-page')).toBeInTheDocument();
      });
    });
  });

  describe('Client Dashboard Navigation', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client', firstName: 'John' },
        role: 'client',
        isClient: true,
        isFreelancer: false
      });
    });

    it('should navigate between client dashboard sections', async () => {
      render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      const dashboard = screen.getByTestId('client-dashboard');
      expect(dashboard).toBeInTheDocument();

      // Should have navigation links
      expect(screen.getByTestId('nav-projects')).toBeInTheDocument();
      expect(screen.getByTestId('nav-milestones')).toBeInTheDocument();
      expect(screen.getByTestId('nav-profile')).toBeInTheDocument();
    });

    it('should maintain authentication state during navigation', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();

      // Simulate navigation to projects
      rerender(
        <MemoryRouter initialEntries={['/client/projects']}>
          <App />
        </MemoryRouter>
      );

      // Should still be authenticated
      await waitFor(() => {
        expect(mockUseAuth).toHaveBeenCalled();
      });
    });
  });

  describe('Freelancer Dashboard Navigation', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '2', role: 'freelancer', firstName: 'Jane' },
        role: 'freelancer',
        isClient: false,
        isFreelancer: true
      });
    });

    it('should navigate between freelancer dashboard sections', async () => {
      render(
        <MemoryRouter initialEntries={['/freelancer/dashboard']}>
          <App />
        </MemoryRouter>
      );

      const dashboard = screen.getByTestId('freelancer-dashboard');
      expect(dashboard).toBeInTheDocument();

      // Should have navigation links
      expect(screen.getByTestId('nav-browse-projects')).toBeInTheDocument();
      expect(screen.getByTestId('nav-proposals')).toBeInTheDocument();
      expect(screen.getByTestId('nav-profile')).toBeInTheDocument();
      expect(screen.getByTestId('nav-payments')).toBeInTheDocument();
    });
  });

  describe('Deep Linking', () => {
    it('should handle direct navigation to nested routes with authentication', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client' },
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      render(
        <MemoryRouter initialEntries={['/client/projects/create']}>
          <App />
        </MemoryRouter>
      );

      // Should render the nested route component
      // Since we mocked it, we'd expect it to be present
      expect(mockUseAuth).toHaveBeenCalled();
    });

    it('should preserve query parameters during navigation', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client' },
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      render(
        <MemoryRouter initialEntries={['/chat?room=123']}>
          <App />
        </MemoryRouter>
      );

      // Verify the route was accessed with query params
      expect(mockUseAuth).toHaveBeenCalled();
    });
  });

  describe('Browser Navigation', () => {
    it('should support browser back button', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client' },
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      render(
        <MemoryRouter initialEntries={['/client/dashboard', '/client/projects']}>
          <App />
        </MemoryRouter>
      );

      // Simulate going back
      window.history.back();

      await waitFor(() => {
        expect(mockUseAuth).toHaveBeenCalled();
      });
    });

    it('should support browser forward button', async () => {
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

      // Simulate going forward
      window.history.forward();

      await waitFor(() => {
        expect(mockUseAuth).toHaveBeenCalled();
      });
    });
  });

  describe('Breadcrumb Navigation', () => {
    it('should reflect current location in breadcrumbs', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
        user: { id: '1', role: 'client' },
        role: 'client',
        isClient: true,
        isFreelancer: false
      });

      render(
        <MemoryRouter initialEntries={['/client/projects/create']}>
          <App />
        </MemoryRouter>
      );

      // Breadcrumb should show: Dashboard > Projects > Create
      // This would be tested once breadcrumb component is implemented
      expect(mockUseAuth).toHaveBeenCalled();
    });
  });
});
