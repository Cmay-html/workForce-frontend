import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithProviders, createAuthenticatedState, createUnauthenticatedState, createLoadingState } from '../test/test-utils';

// Mock all the page components to avoid complex imports
vi.mock('../pages/auth/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login Page</div>
}));

vi.mock('../pages/auth/RegistrationPage', () => ({
  default: () => <div data-testid="registration-page">Registration Page</div>
}));

vi.mock('../pages/LandingPage', () => ({
  default: () => <div data-testid="landing-page">Landing Page</div>
}));

vi.mock('../pages/client/Dashboard', () => ({
  default: () => <div data-testid="client-dashboard">Client Dashboard</div>
}));

vi.mock('../pages/client/Projects/index', () => ({
  default: () => <div data-testid="client-projects">Client Projects</div>
}));

vi.mock('../pages/client/Projects/create', () => ({
  default: () => <div data-testid="create-project">Create Project</div>
}));

vi.mock('../pages/client/Projects/[projectId]', () => ({
  default: () => <div data-testid="project-details">Project Details</div>
}));

vi.mock('../components/client/Projects/ProjectEditForm', () => ({
  default: () => <div data-testid="project-edit">Project Edit</div>
}));

vi.mock('../components/client/Projects/ProjectProposals', () => ({
  default: () => <div data-testid="project-proposals">Project Proposals</div>
}));

vi.mock('../components/client/Milestones/index', () => ({
  default: () => <div data-testid="milestones-overview">Milestones Overview</div>
}));

vi.mock('../pages/client/Milestones/[projectId]', () => ({
  default: () => <div data-testid="project-milestones">Project Milestones</div>
}));

vi.mock('../components/client/Milestones/CreateMilestone', () => ({
  default: () => <div data-testid="create-milestone">Create Milestone</div>
}));

vi.mock('../pages/client/reviews/create', () => ({
  default: () => <div data-testid="create-review">Create Review</div>
}));

vi.mock('../components/client/Profile/ClientProfileForm', () => ({
  default: () => <div data-testid="client-profile">Client Profile</div>
}));

vi.mock('../components/client/Settings/ClientSettingsForm', () => ({
  default: () => <div data-testid="client-settings">Client Settings</div>
}));

vi.mock('../pages/shared/ChatPage', () => ({
  default: () => <div data-testid="chat-page">Chat Page</div>
}));

vi.mock('../components/freelancer/Projects/ProjectList', () => ({
  default: () => <div data-testid="freelancer-projects">Freelancer Projects</div>
}));

vi.mock('../components/freelancer/Projects/ProjectProposalForm', () => ({
  default: () => <div data-testid="project-proposal">Project Proposal</div>
}));

vi.mock('../pages/freelancer/Dashboard', () => ({
  default: () => <div data-testid="freelancer-dashboard">Freelancer Dashboard</div>
}));

vi.mock('../pages/freelancer/Proposals', () => ({
  default: () => <div data-testid="freelancer-proposals">Freelancer Proposals</div>
}));

vi.mock('../pages/freelancer/ActiveProjects', () => ({
  default: () => <div data-testid="active-projects">Active Projects</div>
}));

vi.mock('../pages/freelancer/MilestoneSubmission', () => ({
  default: () => <div data-testid="milestone-submission">Milestone Submission</div>
}));

vi.mock('../pages/freelancer/PaymentTracking', () => ({
  default: () => <div data-testid="payment-tracking">Payment Tracking</div>
}));

vi.mock('../pages/freelancer/ProfilePortfolio', () => ({
  default: () => <div data-testid="profile-portfolio">Profile Portfolio</div>
}));

vi.mock('../components/layouts/FreelancerLayout', () => ({
  default: ({ children }) => <div data-testid="freelancer-layout">{children}</div>
}));

vi.mock('../components/layouts/ClientLayout', () => ({
  default: ({ children }) => <div data-testid="client-layout">{children}</div>
}));

vi.mock('../components/shared/auth/AuthForm', () => ({
  default: () => <div data-testid="auth-form">Auth Form</div>
}));

vi.mock('../components/shared/auth/EmailVerification', () => ({
  default: () => <div data-testid="email-verification">Email Verification</div>
}));

vi.mock('../components/client/FreelancersList', () => ({
  default: () => <div data-testid="freelancers-list">Freelancers List</div>
}));

vi.mock('../pages/PrivacyPolicy', () => ({
  default: () => <div data-testid="privacy-policy">Privacy Policy</div>
}));

vi.mock('../pages/TermsOfService', () => ({
  default: () => <div data-testid="terms-of-service">Terms of Service</div>
}));

vi.mock('../pages/admin/AnalyticsDashboard', () => ({
  default: () => <div data-testid="analytics-dashboard">Analytics Dashboard</div>
}));

describe('App', () => {
  describe('Loading States', () => {
    test('shows loading spinner when auth is loading', () => {
      renderWithProviders(<App />, {
        authState: createLoadingState()
      });

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('loading spinner has correct styling', () => {
      renderWithProviders(<App />, {
        authState: createLoadingState()
      });

      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-green-600');
    });
  });

  describe('Public Routes', () => {
    test('renders landing page at root path', () => {
      renderWithProviders(<App />, {
        authState: createUnauthenticatedState(),
        route: '/'
      });

      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    test('renders login page for unauthenticated users', () => {
      renderWithProviders(<App />, {
        authState: createUnauthenticatedState(),
        route: '/login'
      });

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    test('renders registration page for unauthenticated users', () => {
      renderWithProviders(<App />, {
        authState: createUnauthenticatedState(),
        route: '/register'
      });

      expect(screen.getByTestId('registration-page')).toBeInTheDocument();
    });

    test('renders privacy policy page', () => {
      renderWithProviders(<App />, {
        authState: createUnauthenticatedState(),
        route: '/privacy-policy'
      });

      expect(screen.getByTestId('privacy-policy')).toBeInTheDocument();
    });

    test('renders terms of service page', () => {
      renderWithProviders(<App />, {
        authState: createUnauthenticatedState(),
        route: '/terms-of-service'
      });

      expect(screen.getByTestId('terms-of-service')).toBeInTheDocument();
    });
  });

  describe('Protected Routes', () => {
    test('redirects to login when accessing protected route without authentication', () => {
      renderWithProviders(<App />, {
        authState: createUnauthenticatedState(),
        route: '/client/dashboard'
      });

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    test('renders client dashboard for authenticated client', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/client/dashboard'
      });

      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
    });

    test('renders freelancer dashboard for authenticated freelancer', () => {
      const freelancerUser = { id: '1', email: 'freelancer@test.com', role: 'freelancer' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(freelancerUser),
        route: '/freelancer/dashboard'
      });

      expect(screen.getByTestId('freelancer-layout')).toBeInTheDocument();
    });
  });

  describe('Role-based Access Control', () => {
    test('client cannot access freelancer routes', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/freelancer/dashboard'
      });

      // Should redirect to client dashboard
      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
    });

    test('freelancer cannot access client routes', () => {
      const freelancerUser = { id: '1', email: 'freelancer@test.com', role: 'freelancer' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(freelancerUser),
        route: '/client/dashboard'
      });

      // Should redirect to freelancer dashboard
      expect(screen.getByTestId('freelancer-layout')).toBeInTheDocument();
    });

    test('admin can access admin routes', () => {
      const adminUser = { id: '1', email: 'admin@test.com', role: 'admin' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(adminUser),
        route: '/admin/analytics'
      });

      expect(screen.getByTestId('analytics-dashboard')).toBeInTheDocument();
    });

    test('non-admin cannot access admin routes', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/admin/analytics'
      });

      // Should redirect to dashboard
      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
    });
  });

  describe('Route Redirects', () => {
    test('authenticated client gets redirected from login to dashboard', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/login'
      });

      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
    });

    test('authenticated freelancer gets redirected from login to dashboard', () => {
      const freelancerUser = { id: '1', email: 'freelancer@test.com', role: 'freelancer' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(freelancerUser),
        route: '/login'
      });

      expect(screen.getByTestId('freelancer-layout')).toBeInTheDocument();
    });

    test('redirects unknown routes to landing page', () => {
      renderWithProviders(<App />, {
        authState: createUnauthenticatedState(),
        route: '/unknown-route'
      });

      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    test('/dashboard redirects based on user role', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/dashboard'
      });

      expect(screen.getByTestId('client-dashboard')).toBeInTheDocument();
    });
  });

  describe('Nested Routes', () => {
    test('renders client projects page', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/client/projects'
      });

      expect(screen.getByTestId('client-projects')).toBeInTheDocument();
    });

    test('renders create project page', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/client/projects/create'
      });

      expect(screen.getByTestId('create-project')).toBeInTheDocument();
    });

    test('renders project details page', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/client/projects/123'
      });

      expect(screen.getByTestId('project-details')).toBeInTheDocument();
    });

    test('renders freelancer proposals page', () => {
      const freelancerUser = { id: '1', email: 'freelancer@test.com', role: 'freelancer' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(freelancerUser),
        route: '/freelancer/proposals'
      });

      expect(screen.getByTestId('freelancer-proposals')).toBeInTheDocument();
    });
  });

  describe('Chat Routes', () => {
    test('renders chat page for authenticated users', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/chat'
      });

      expect(screen.getByTestId('chat-page')).toBeInTheDocument();
    });

    test('renders project-specific chat page', () => {
      const clientUser = { id: '1', email: 'client@test.com', role: 'client' };
      renderWithProviders(<App />, {
        authState: createAuthenticatedState(clientUser),
        route: '/projects/123/chat'
      });

      expect(screen.getByTestId('chat-page')).toBeInTheDocument();
    });
  });
});
