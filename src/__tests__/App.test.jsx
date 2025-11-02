import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock the pages and components to avoid complex dependencies
vi.mock('../pages/LandingPage', () => ({
  default: () => <div data-testid="landing-page">Landing Page</div>
}));

vi.mock('../pages/auth/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login Page</div>
}));

vi.mock('../pages/auth/RegistrationPage', () => ({
  default: () => <div data-testid="registration-page">Registration Page</div>
}));

vi.mock('../pages/client/Dashboard', () => ({
  default: () => <div data-testid="client-dashboard">Client Dashboard</div>
}));

vi.mock('../components/shared/auth/AuthForm', () => ({
  default: () => <div data-testid="auth-form">Auth Form</div>
}));

vi.mock('../components/shared/auth/EmailVerification', () => ({
  default: () => <div data-testid="email-verification">Email Verification</div>
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
  default: ({ children }) => <div data-testid="freelancer-layout"><div data-testid="layout-children">{children}</div></div>
}));

vi.mock('../components/layouts/ClientLayout', () => ({
  default: ({ children }) => <div data-testid="client-layout"><div data-testid="layout-children">{children}</div></div>
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

describe('App', () => {
  describe('Public Routes', () => {
    it('renders landing page at root path', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    it('renders login page', () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('renders registration page', () => {
      render(
        <MemoryRouter initialEntries={['/register']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('registration-page')).toBeInTheDocument();
    });

    it('renders privacy policy page', () => {
      render(
        <MemoryRouter initialEntries={['/privacy-policy']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('privacy-policy')).toBeInTheDocument();
    });

    it('renders terms of service page', () => {
      render(
        <MemoryRouter initialEntries={['/terms-of-service']}>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByTestId('terms-of-service')).toBeInTheDocument();
    });
  });

  describe('Protected Routes - Unauthenticated Users', () => {
    it('redirects unauthenticated users from client dashboard to login', async () => {
      render(
        <MemoryRouter initialEntries={['/client/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });

    it('redirects unauthenticated users from freelancer dashboard to login', async () => {
      render(
        <MemoryRouter initialEntries={['/freelancer/dashboard']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });
  });

  describe('Catch-all Route', () => {
    it('redirects unknown routes to landing page', async () => {
      render(
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('landing-page')).toBeInTheDocument();
      });
    });
  });
});
