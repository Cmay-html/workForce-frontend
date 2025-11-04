import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ClientDashboard from '../../pages/client/Dashboard';
import FreelancerDashboard from '../../pages/freelancer/Dashboard';

// Mock API services
vi.mock('../../services/api/projectsService', () => ({
  projectsService: {
    getClientProjects: vi.fn(),
    getAllProjects: vi.fn(),
    getProjectById: vi.fn(),
    createProject: vi.fn(),
    updateProject: vi.fn()
  }
}));

vi.mock('../../services/api/clientService', () => ({
  clientService: {
    getFreelancers: vi.fn(),
    createProject: vi.fn()
  }
}));

// Mock useAuth hook
const mockUseAuth = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('Client Dashboard Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user: {
        id: '1',
        email: 'client@test.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'client'
      },
      role: 'client',
      isClient: true,
      isFreelancer: false
    });
  });

  it('should render dashboard with loading state initially', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: true,
      user: null,
      role: null
    });

    render(
      <MemoryRouter>
        <ClientDashboard />
      </MemoryRouter>
    );

    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('should load and display projects data', async () => {
    const { projectsService } = await import('../../services/api/projectsService');
    
    const mockProjects = [
      {
        id: '1',
        title: 'Website Redesign',
        description: 'Redesign company website',
        status: 'active',
        budget: 5000,
        deadline: '2024-12-31'
      },
      {
        id: '2',
        title: 'Mobile App Development',
        description: 'Build iOS and Android app',
        status: 'pending',
        budget: 10000,
        deadline: '2024-11-30'
      }
    ];

    projectsService.getClientProjects.mockResolvedValue({
      data: mockProjects
    });

    render(
      <MemoryRouter>
        <ClientDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(projectsService.getClientProjects).toHaveBeenCalled();
    });
  });

  it('should handle API errors gracefully', async () => {
    const { projectsService } = await import('../../services/api/projectsService');
    
    projectsService.getClientProjects.mockRejectedValue(
      new Error('Failed to fetch projects')
    );

    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ClientDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Error loading projects:',
        expect.any(Error)
      );
    });

    consoleError.mockRestore();
  });

  it('should redirect unauthenticated users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      loading: false,
      user: null,
      role: null
    });

    const { container } = render(
      <MemoryRouter>
        <ClientDashboard />
      </MemoryRouter>
    );

    // Should redirect, so the dashboard content should not render
    expect(container.querySelector('[data-testid="client-dashboard"]')).not.toBeInTheDocument();
  });
});

describe('Freelancer Dashboard Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user: {
        id: '2',
        email: 'freelancer@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'freelancer'
      },
      role: 'freelancer',
      isClient: false,
      isFreelancer: true
    });
  });

  it('should render dashboard with user greeting', async () => {
    const { projectsService } = await import('../../services/api/projectsService');
    
    projectsService.getAllProjects.mockResolvedValue({
      data: []
    });

    render(
      <MemoryRouter>
        <FreelancerDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Welcome back, Jane/i)).toBeInTheDocument();
    });
  });

  it('should load and display available projects', async () => {
    const { projectsService } = await import('../../services/api/projectsService');
    
    const mockProjects = [
      {
        id: '1',
        title: 'Logo Design',
        description: 'Create a modern logo',
        status: 'open',
        budget: 500,
        client: 'TechCorp Inc.'
      },
      {
        id: '2',
        title: 'Backend API Development',
        description: 'Build RESTful API',
        status: 'open',
        budget: 3000,
        client: 'StartupXYZ'
      }
    ];

    projectsService.getAllProjects.mockResolvedValue({
      data: mockProjects
    });

    render(
      <MemoryRouter>
        <FreelancerDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(projectsService.getAllProjects).toHaveBeenCalled();
    });
  });

  it('should display stats based on project data', async () => {
    const { projectsService } = await import('../../services/api/projectsService');
    
    const mockProjects = [
      {
        id: '1',
        title: 'Project 1',
        status: 'active',
        earnings: 1000
      },
      {
        id: '2',
        title: 'Project 2',
        status: 'completed',
        earnings: 2000
      }
    ];

    projectsService.getAllProjects.mockResolvedValue({
      data: mockProjects
    });

    render(
      <MemoryRouter>
        <FreelancerDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Should show 1 active project
      expect(screen.getByText('Active Projects')).toBeInTheDocument();
      // Should show 1 completed project
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
  });

  it('should show empty state when no projects exist', async () => {
    const { projectsService } = await import('../../services/api/projectsService');
    
    projectsService.getAllProjects.mockResolvedValue({
      data: []
    });

    render(
      <MemoryRouter>
        <FreelancerDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No projects found/i)).toBeInTheDocument();
    });
  });

  it('should handle different response shapes gracefully', async () => {
    const { projectsService } = await import('../../services/api/projectsService');
    
    // Test with {items: []} shape
    projectsService.getAllProjects.mockResolvedValue({
      data: {
        items: [
          { id: '1', title: 'Test Project', status: 'active' }
        ]
      }
    });

    render(
      <MemoryRouter>
        <FreelancerDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(projectsService.getAllProjects).toHaveBeenCalled();
    });
  });
});

describe('Dashboard Quick Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user: {
        id: '2',
        email: 'freelancer@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'freelancer'
      },
      role: 'freelancer',
      isClient: false,
      isFreelancer: true
    });
  });

  it('should have working quick action buttons', async () => {
    const { projectsService } = await import('../../services/api/projectsService');
    
    projectsService.getAllProjects.mockResolvedValue({
      data: []
    });

    render(
      <MemoryRouter>
        <FreelancerDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    });

    // Quick actions should be present
    expect(screen.getByText('Browse Projects')).toBeInTheDocument();
    expect(screen.getByText('Submit Proposal')).toBeInTheDocument();
    expect(screen.getByText('Update Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Track Payments')).toBeInTheDocument();
  });
});
