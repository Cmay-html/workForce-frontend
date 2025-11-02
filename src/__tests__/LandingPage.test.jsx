import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import LandingPage from '../pages/LandingPage';

// Helper function to render component with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('LandingPage', () => {

  describe('Navigation Links', () => {
    test('renders navigation bar with correct links', () => {
      renderWithRouter(<LandingPage />);

      // Check main navigation elements - use getAllByText for duplicates
      expect(screen.getAllByText('WorkforceFlow')).toHaveLength(2); // Header and footer
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getAllByText('Sign In')).toHaveLength(2); // Desktop nav, CTA section (mobile is hidden initially)
      expect(screen.getAllByText('Get Started')).toHaveLength(2); // Desktop nav, CTA section (mobile is hidden initially)
    });

    test('desktop navigation links route correctly', async () => {
      const user = userEvent.setup();
      renderWithRouter(<LandingPage />);

      // Test Sign In link - get the first one (desktop nav)
      const signInLinks = screen.getAllByText('Sign In');
      await user.click(signInLinks[0]);
      expect(window.location.href).toBe('http://localhost:3000/login');

      // Test Get Started button - get the first one (desktop nav)
      const getStartedBtns = screen.getAllByText('Get Started');
      await user.click(getStartedBtns[0]);
      expect(window.location.href).toBe('http://localhost:3000/register');
    });

    test('mobile menu toggles correctly', async () => {
      const user = userEvent.setup();
      renderWithRouter(<LandingPage />);

      // Mobile menu should not be visible initially
      expect(screen.queryByText('Features')).toBeInTheDocument(); // Desktop version
      expect(screen.queryByText('Pricing')).not.toBeInTheDocument(); // Mobile only

      // Click mobile menu button
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);

      // Mobile menu should now be visible
      await waitFor(() => {
        expect(screen.getByText('Pricing')).toBeInTheDocument();
      });

      // Click again to close
      await user.click(menuButton);
      await waitFor(() => {
        expect(screen.queryByText('Pricing')).not.toBeInTheDocument();
      });
    });

    test('mobile navigation links route correctly', async () => {
      const user = userEvent.setup();
      renderWithRouter(<LandingPage />);

      // Open mobile menu
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);

      await waitFor(() => {
        const signInLinks = screen.getAllByText('Sign In');
        expect(signInLinks).toHaveLength(3);
      });

      // Test mobile Sign In link - get the second one (mobile nav)
      const signInLinks = screen.getAllByText('Sign In');
      await user.click(signInLinks[1]);
      expect(window.location.href).toBe('http://localhost:3000/login');

      // Re-open menu and test Get Started - get the second one (mobile nav)
      await user.click(menuButton);
      await waitFor(() => {
        const getStartedBtns = screen.getAllByText('Get Started');
        expect(getStartedBtns).toHaveLength(2);
      });
      const getStartedBtns = screen.getAllByText('Get Started');
      await user.click(getStartedBtns[1]);
      expect(window.location.href).toBe('http://localhost:3000/register');
    });
  });

  describe('Hero Section', () => {
    test('renders hero section with correct content', () => {
      renderWithRouter(<LandingPage />);

      expect(screen.getByText('Connect with')).toBeInTheDocument();
      expect(screen.getByText('Top Workers')).toBeInTheDocument();
      expect(screen.getByText(/The most trusted workforce platform/)).toBeInTheDocument();
    });

    test('hero CTA buttons route correctly', async () => {
      const user = userEvent.setup();
      renderWithRouter(<LandingPage />);

      // Test "Start Your Project" button
      const startProjectBtn = screen.getByText('Start Your Project');
      await user.click(startProjectBtn);
      expect(window.location.href).toBe('http://localhost:3000/register');

      // Test "Join as Worker" button
      const joinWorkerBtn = screen.getByText('Join as Worker');
      await user.click(joinWorkerBtn);
      expect(window.location.href).toBe('http://localhost:3000/register');
    });
  });

  describe('Features Section', () => {
    test('renders features section', () => {
      renderWithRouter(<LandingPage />);

      expect(screen.getByText('Everything You Need to Succeed')).toBeInTheDocument();
      expect(screen.getByText('Milestone Payments')).toBeInTheDocument();
      expect(screen.getByText('Real-Time Collaboration')).toBeInTheDocument();
      expect(screen.getByText('Smart Time Tracking')).toBeInTheDocument();
    });
  });

  describe('About Section', () => {
    test('renders about section', () => {
      renderWithRouter(<LandingPage />);

      expect(screen.getByText('About WorkforceFlow')).toBeInTheDocument();
      expect(screen.getByText('Our Mission')).toBeInTheDocument();
      expect(screen.getByText('Why Choose Us?')).toBeInTheDocument();
    });
  });

  describe('Stats Section', () => {
    test('renders stats section', () => {
      renderWithRouter(<LandingPage />);

      expect(screen.getAllByText('50K+')).toHaveLength(2); // Stats section and About section
      expect(screen.getByText('Active Workers')).toBeInTheDocument();
      expect(screen.getByText('100K+')).toBeInTheDocument();
      expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    });
  });

  describe('CTA Section', () => {
    test('renders CTA section with correct content', () => {
      renderWithRouter(<LandingPage />);

      expect(screen.getByText('Ready to Transform Your Workforce Career?')).toBeInTheDocument();
      expect(screen.getAllByText('Get Started')).toHaveLength(2); // Desktop nav, CTA section
      expect(screen.getAllByText('Sign In')).toHaveLength(2); // Desktop nav, CTA section
    });

    test('CTA buttons route correctly', async () => {
      const user = userEvent.setup();
      renderWithRouter(<LandingPage />);

      // Test CTA "Get Started" button - get the second one (CTA section)
      const getStartedBtns = screen.getAllByText('Get Started');
      await user.click(getStartedBtns[1]);
      expect(window.location.href).toBe('http://localhost:3000/register');

      // Test CTA "Sign In" button - get the second one (CTA section)
      const signInBtns = screen.getAllByText('Sign In');
      await user.click(signInBtns[1]);
      expect(window.location.href).toBe('http://localhost:3000/login');
    });
  });

  describe('Footer', () => {
    test('renders footer with correct links', () => {
      renderWithRouter(<LandingPage />);

      expect(screen.getAllByText('WorkforceFlow')).toHaveLength(2); // Header and footer
      expect(screen.getByText('Find Work')).toBeInTheDocument();
      expect(screen.getByText('Post Project')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    });

    test('footer links route correctly', async () => {
      const user = userEvent.setup();
      renderWithRouter(<LandingPage />);

      // Test Find Work link
      const findWorkLink = screen.getByText('Find Work');
      await user.click(findWorkLink);
      expect(window.location.href).toBe('http://localhost:3000/find-work');

      // Test Post Project link
      const postProjectLink = screen.getByText('Post Project');
      await user.click(postProjectLink);
      expect(window.location.href).toBe('http://localhost:3000/post-project');

      // Test Privacy Policy link
      const privacyLink = screen.getByText('Privacy Policy');
      await user.click(privacyLink);
      expect(window.location.href).toBe('http://localhost:3000/privacy-policy');

      // Test Terms of Service link
      const termsLink = screen.getByText('Terms of Service');
      await user.click(termsLink);
      expect(window.location.href).toBe('http://localhost:3000/terms-of-service');
    });

    test('footer social links have correct attributes', () => {
      renderWithRouter(<LandingPage />);

      const twitterLink = screen.getByLabelText('Twitter');
      const linkedinLink = screen.getByLabelText('LinkedIn');

      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');
    });
  });

  describe('Accessibility', () => {
    test('mobile menu button has correct aria-label', () => {
      renderWithRouter(<LandingPage />);

      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    test('social links have aria-labels', () => {
      renderWithRouter(<LandingPage />);

      expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    test('renders desktop navigation by default', () => {
      renderWithRouter(<LandingPage />);

      // Desktop nav should be visible
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
});
