import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ActiveProjects = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [activeProjects, setActiveProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    // Load active projects from accepted proposals in localStorage
    const storedProposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    const acceptedProposals = storedProposals.filter(proposal => proposal.status === 'accepted');

    // If no accepted proposals, show default mock data
    if (acceptedProposals.length === 0) {
      const mockProjects = [
        {
          id: 1,
          title: 'E-commerce Website Development',
          client: 'TechCorp Inc',
          budget: 5000,
          deadline: '2024-02-28',
          status: 'in-progress',
          progress: 65,
          currentMilestone: 'Payment Integration',
          nextMilestoneDue: '2024-02-15'
        },
        {
          id: 2,
          title: 'Mobile App UI/UX Design',
          client: 'StartupXYZ',
          budget: 3000,
          deadline: '2024-03-15',
          status: 'in-progress',
          progress: 30,
          currentMilestone: 'Wireframe Design',
          nextMilestoneDue: '2024-02-10'
        },
        {
          id: 3,
          title: 'API Integration Service',
          client: 'DataSystems Ltd',
          budget: 2000,
          deadline: '2024-02-20',
          status: 'on-hold',
          progress: 80,
          currentMilestone: 'Testing Phase',
          nextMilestoneDue: '2024-02-05'
        }
      ];
      setActiveProjects(mockProjects);
    } else {
      // Transform accepted proposals to active projects format
      const formattedProjects = acceptedProposals.map(proposal => ({
        id: proposal.id,
        title: proposal.projectTitle,
        client: proposal.clientName,
        budget: proposal.proposedBudget,
        deadline: new Date(Date.now() + proposal.proposedTimeline * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Timeline from now
        status: 'in-progress',
        progress: 10,
        currentMilestone: 'Initial Setup',
        nextMilestoneDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days from now
      }));
      setActiveProjects(formattedProjects);
    }

    setLoadingProjects(false);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'in-progress': return 'In Progress';
      case 'on-hold': return 'On Hold';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const handleLogout = () => {
    // Clear authentication and navigate to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  if (loading || loadingProjects) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50" style={{ minWidth: '140%' }}>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="text-xl font-bold text-orange-600">Kaziflow</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">
              Freelancer Account
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">D</span>
                <div className="flex-1">
                  <div className="font-medium">Dashboard</div>
                  <div className="text-xs text-gray-500 mt-0.5">Business overview</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/freelancer/projects')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">P</span>
                <div className="flex-1">
                  <div className="font-medium">Browse Projects</div>
                  <div className="text-xs text-gray-500 mt-0.5">Find new opportunities</div>
                </div>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left bg-blue-50 text-blue-700 border-r-2 border-blue-700">
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">A</span>
                <div className="flex-1">
                  <div className="font-medium">Active Projects</div>
                  <div className="text-xs text-gray-500 mt-0.5">Current work</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/freelancer/proposals')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">R</span>
                <div className="flex-1">
                  <div className="font-medium">My Proposals</div>
                  <div className="text-xs text-gray-500 mt-0.5">Track submissions</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/freelancer/profile')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">P</span>
                <div className="flex-1">
                  <div className="font-medium">Profile</div>
                  <div className="text-xs text-gray-500 mt-0.5">Portfolio & settings</div>
                </div>
              </button>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">L</span>
              <div className="flex-1 text-left">
                <div className="font-medium">Logout</div>
                <div className="text-xs text-gray-500 mt-0.5">Sign out of account</div>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search active projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500">
                Freelancer
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Active Projects
                </h1>
                <p className="text-gray-600">
                  Manage your ongoing projects and deliverables.
                </p>
              </div>

              {/* Projects Grid */}
              <div className="space-y-6">
                {activeProjects.length === 0 ? (
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    <div className="px-4 py-5 sm:px-6 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No active projects</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by browsing available projects.</p>
                      <div className="mt-6">
                        <button
                          onClick={() => navigate('/freelancer/projects')}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Browse Projects
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  activeProjects.map(project => (
                    <div key={project.id} className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                            <p className="text-gray-600 mt-1">Client: {project.client}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div>
                            <span className="text-sm text-gray-500">Budget:</span>
                            <p className="font-semibold text-gray-900">${project.budget}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Deadline:</span>
                            <p className="font-semibold text-gray-900">{project.deadline}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Current Milestone:</span>
                            <p className="font-semibold text-gray-900">{project.currentMilestone}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Next Due:</span>
                            <p className="font-semibold text-gray-900">{project.nextMilestoneDue}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Project Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${
                                project.status === 'on-hold' ? 'bg-yellow-500' : 'bg-blue-600'
                              }`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => navigate(`/projects/${project.id}/chat`)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Chat with Client
                          </button>
                          <button
                            onClick={() => navigate(`/freelancer/projects/${project.id}/milestones`)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Submit Work
                          </button>
                          <button
                            onClick={() => navigate(`/freelancer/projects/${project.id}/time-tracking`)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Track Time
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActiveProjects;