import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { clientService } from '../../services/api/clientService';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const loadProjects = () => {
      try {
        // Check for user-created projects in localStorage first
        const userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        if (userProjects.length > 0) {
          setProjects(userProjects);
        } else {
          // Fallback to mock data if no user projects
          setProjects([
            {
              id: 1,
              title: 'E-commerce Website',
              status: 'in_progress',
              freelancer: 'John Doe',
              budget: 3500,
              description: 'Full-stack e-commerce platform with payment integration',
              deadline: '2024-02-15',
              milestones: [
                { id: 1, title: 'Planning & Design', status: 'completed', amount: 800 },
                { id: 2, title: 'Frontend Development', status: 'in_progress', amount: 1500 },
                { id: 3, title: 'Backend & Payment', status: 'pending', amount: 1000 },
                { id: 4, title: 'Testing & Deployment', status: 'pending', amount: 200 }
              ]
            },
            {
              id: 2,
              title: 'Mobile App Development',
              status: 'open',
              freelancer: null,
              budget: 2800,
              description: 'Cross-platform mobile app for task management',
              deadline: '2024-03-01',
              milestones: [
                { id: 5, title: 'UI/UX Design', status: 'pending', amount: 600 },
                { id: 6, title: 'iOS Development', status: 'pending', amount: 1200 },
                { id: 7, title: 'Android Development', status: 'pending', amount: 800 },
                { id: 8, title: 'Testing & Launch', status: 'pending', amount: 200 }
              ]
            },
            {
              id: 3,
              title: 'Data Analytics Dashboard',
              status: 'completed',
              freelancer: 'Jane Smith',
              budget: 1800,
              description: 'Interactive dashboard for business analytics',
              deadline: '2024-01-20',
              milestones: [
                { id: 9, title: 'Data Analysis', status: 'completed', amount: 500 },
                { id: 10, title: 'Dashboard Design', status: 'completed', amount: 600 },
                { id: 11, title: 'Implementation', status: 'completed', amount: 600 },
                { id: 12, title: 'Final Review', status: 'completed', amount: 100 }
              ]
            }
          ]);
        }
      } catch (error) {
        // Final fallback to mock data
        setProjects([
          {
            id: 1,
            title: 'E-commerce Website',
            status: 'in_progress',
            freelancer: 'John Doe',
            budget: 3500,
            description: 'Full-stack e-commerce platform with payment integration',
            deadline: '2024-02-15',
            milestones: [
              { id: 1, title: 'Planning & Design', status: 'completed', amount: 800 },
              { id: 2, title: 'Frontend Development', status: 'in_progress', amount: 1500 },
              { id: 3, title: 'Backend & Payment', status: 'pending', amount: 1000 },
              { id: 4, title: 'Testing & Deployment', status: 'pending', amount: 200 }
            ]
          },
          {
            id: 2,
            title: 'Mobile App Development',
            status: 'open',
            freelancer: null,
            budget: 2800,
            description: 'Cross-platform mobile app for task management',
            deadline: '2024-03-01',
            milestones: [
              { id: 5, title: 'UI/UX Design', status: 'pending', amount: 600 },
              { id: 6, title: 'iOS Development', status: 'pending', amount: 1200 },
              { id: 7, title: 'Android Development', status: 'pending', amount: 800 },
              { id: 8, title: 'Testing & Launch', status: 'pending', amount: 200 }
            ]
          },
          {
            id: 3,
            title: 'Data Analytics Dashboard',
            status: 'completed',
            freelancer: 'Jane Smith',
            budget: 1800,
            description: 'Interactive dashboard for business analytics',
            deadline: '2024-01-20',
            milestones: [
              { id: 9, title: 'Data Analysis', status: 'completed', amount: 500 },
              { id: 10, title: 'Dashboard Design', status: 'completed', amount: 600 },
              { id: 11, title: 'Implementation', status: 'completed', amount: 600 },
              { id: 12, title: 'Final Review', status: 'completed', amount: 100 }
            ]
          }
        ]);
      } finally {
        setLoadingProjects(false);
      }
    };

    loadProjects();
  }, []);

  // Force refresh when navigating back to dashboard
  useEffect(() => {
    const refreshProjects = () => {
      try {
        // Check for user-created projects in localStorage
        const userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        if (userProjects.length > 0) {
          setProjects(userProjects);
        }
        // If no user projects, keep existing mock data
      } catch (error) {
      }
    };

    const handleFocus = () => {
      // Refresh projects when user returns to dashboard tab
      refreshProjects();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Update filtered projects when projects or search query changes
  useEffect(() => {
    // Always show all projects, but filter if there's a search query
    if (searchQuery.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.freelancer && project.freelancer.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProjects(filtered);
    }
  }, [projects, searchQuery]);

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

  const handleCreateProject = () => {
    navigate('/client/projects/create');
  };

  const handleViewDetails = (projectId) => {
    navigate(`/client/projects/${projectId}`);
  };

  const handleChat = (projectId) => {
    navigate(`/client/projects/${projectId}/chat`);
  };

  const handleLogout = () => {
    // Clear authentication and navigate to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('userProjects');
    localStorage.removeItem('proposals');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'open':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" style={{ minWidth: '1024px' }}>
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
              Client Account
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left bg-orange-50 text-orange-700 border-r-2 border-orange-700">
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">D</span>
                <div className="flex-1">
                  <div className="font-medium">Dashboard</div>
                  <div className="text-xs text-gray-500 mt-0.5">Project overview</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/client/projects')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">P</span>
                <div className="flex-1">
                  <div className="font-medium">Projects</div>
                  <div className="text-xs text-gray-500 mt-0.5">Manage projects</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/chat')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">C</span>
                <div className="flex-1">
                  <div className="font-medium">Messages</div>
                  <div className="text-xs text-gray-500 mt-0.5">Chat with team</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/client/milestones')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">M</span>
                <div className="flex-1">
                  <div className="font-medium">Milestones</div>
                  <div className="text-xs text-gray-500 mt-0.5">Review work</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/client/profile')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">P</span>
                <div className="flex-1">
                  <div className="font-medium">Profile</div>
                  <div className="text-xs text-gray-500 mt-0.5">Account settings</div>
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
        {/* Top Navigation Bar - Similar to Freelancer Layout */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-primary-600">Kaziflow</h1>
                <span className="ml-3 text-sm text-gray-500">Client Portal</span>
              </div>
              <div className="text-xs text-gray-500">
                Client
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 overflow-auto h-full">
          <div className="h-full p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.firstName}! Here's your overview.
              </p>
            </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
                   <div className="flex items-center">
                     <div className="flex-shrink-0">
                       <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                         <span className="text-white font-bold">{filteredProjects.length}</span>
                       </div>
                     </div>
                     <div className="ml-5 w-0 flex-1">
                       <dl>
                         <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                         <dd className="text-lg font-medium text-gray-900">{filteredProjects.length}</dd>
                       </dl>
                     </div>
                   </div>
                 </div>

                <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{filteredProjects.filter(p => p.status === 'completed').length}</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                        <dd className="text-lg font-medium text-gray-900">{filteredProjects.filter(p => p.status === 'completed').length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{filteredProjects.filter(p => p.status === 'in_progress').length}</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                        <dd className="text-lg font-medium text-gray-900">{filteredProjects.filter(p => p.status === 'in_progress').length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">${filteredProjects.reduce((sum, p) => sum + p.budget, 0)}</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Budget</dt>
                        <dd className="text-lg font-medium text-gray-900">${filteredProjects.reduce((sum, p) => sum + p.budget, 0)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">My Projects</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage and track your project progress</p>
                  </div>
                  <button
                    onClick={handleCreateProject}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    + New Project
                  </button>
                </div>

                {filteredProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
                    <div className="mt-6">
                      <button
                        onClick={handleCreateProject}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Create Project
                      </button>
                    </div>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredProjects.map((project) => (
                      <li key={project.id} className="px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-medium text-primary-600 truncate">
                                {project.title}
                              </h4>
                              <div className="ml-2 flex-shrink-0 flex">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                  {project.status.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  <span className="font-medium">Budget:</span>
                                  <span className="ml-1">${project.budget}</span>
                                </p>
                                {project.freelancer && (
                                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                    <span className="font-medium">Freelancer:</span>
                                    <span className="ml-1">{project.freelancer}</span>
                                  </p>
                                )}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <p className="font-medium">Deadline:</p>
                                <p className="ml-1">{project.deadline}</p>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{project.description}</p>

                            {/* Milestones */}
                            <div className="mt-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Milestones</h5>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {project.milestones.map((milestone) => (
                                  <div key={milestone.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                    <span className="text-sm text-gray-700">{milestone.title}</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-medium">${milestone.amount}</span>
                                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(milestone.status)}`}>
                                        {milestone.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => handleViewDetails(project.id)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleChat(project.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Chat
                          </button>
                          {project.status === 'open' && (
                            <button
                              onClick={() => navigate(`/client/projects/${project.id}/edit`)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Edit Project
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">Create Project</h3>
                        <p className="text-sm text-gray-500">Post a new project and find freelancers</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleCreateProject}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">Browse Freelancers</h3>
                        <p className="text-sm text-gray-500">Find and hire talented freelancers</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => navigate('/freelancers')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Browse Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                        <p className="text-sm text-gray-500">Communicate with your freelancers</p>
                      </div>
                    </div>
                    <div className="mt-4">
                    <button
                      onClick={() => navigate('/chat')}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      View Messages
                    </button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;