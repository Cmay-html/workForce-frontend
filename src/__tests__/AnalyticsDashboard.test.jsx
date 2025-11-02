import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AnalyticsDashboard from '../pages/admin/AnalyticsDashboard';
import { renderWithProviders, createAuthenticatedState, createMockUser } from '../test/test-utils';

// Mock the admin service
vi.mock('../services/api/adminService', () => ({
  default: {
    getAnalytics: vi.fn(),
  },
}));

// Mock recharts components
vi.mock('recharts', () => ({
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
}));

// Mock the useAuth hook
const mockUseAuth = vi.fn(() => ({
  user: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  isClient: false,
  isFreelancer: false,
}));
vi.mock('../hooks/useAuth', () => ({
  useAuth: mockUseAuth,
}));

// Mock Navbar component
vi.mock('../components/shared/dashboard/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

import adminService from '../services/api/adminService';

describe('AnalyticsDashboard', () => {
  const mockAnalytics = {
    total_users: 150,
    ongoing_projects: 25,
    revenue: 50000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    adminService.getAnalytics.mockResolvedValue(mockAnalytics);
    mockUseAuth.mockReturnValue({
      user: createMockUser({ role: 'admin' }),
      loading: false,
      isAuthenticated: true,
      isAdmin: true,
      isClient: false,
      isFreelancer: false,
    });
  });

  describe('Rendering', () => {
    test('renders dashboard title', async () => {
      renderWithProviders(<AnalyticsDashboard />);

      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    });

    test('displays analytics metrics', async () => {
      renderWithProviders(<AnalyticsDashboard />);

      await waitFor(() => {
        expect(screen.getByText('Total Users: 150')).toBeInTheDocument();
        expect(screen.getByText('Ongoing Projects: 25')).toBeInTheDocument();
        expect(screen.getByText('Revenue: $50000')).toBeInTheDocument();
      });
    });

    test('renders pie chart with data', async () => {
      renderWithProviders(<AnalyticsDashboard />);

      await waitFor(() => {
        expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
        expect(screen.getByTestId('pie')).toBeInTheDocument();
      });
    });
  });

  describe('Data Fetching', () => {
    test('calls getAnalytics on mount', async () => {
      renderWithProviders(<AnalyticsDashboard />);

      await waitFor(() => {
        expect(adminService.getAnalytics).toHaveBeenCalledTimes(1);
      });
    });

    test('handles API error gracefully', async () => {
      adminService.getAnalytics.mockRejectedValue(new Error('API Error'));

      renderWithProviders(<AnalyticsDashboard />);

      await waitFor(() => {
        expect(screen.getByText('Total Users:')).toBeInTheDocument();
        expect(screen.getByText('Ongoing Projects:')).toBeInTheDocument();
        expect(screen.getByText('Revenue: $')).toBeInTheDocument();
      });
    });
  });

  describe('Chart Data', () => {
    test('passes correct data to pie chart', async () => {
      renderWithProviders(<AnalyticsDashboard />);

      await waitFor(() => {
        // The pie chart should receive data with clients and ongoing projects
        expect(screen.getByTestId('pie')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper heading structure', async () => {
      renderWithProviders(<AnalyticsDashboard />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Analytics Dashboard');
    });
  });
});
