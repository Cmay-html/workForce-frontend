import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { clientService } from '../../services/api/clientService';
import ClientLayout from '../../components/layouts/ClientLayout';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // Check if user is newly registered
    const pendingUserData = localStorage.getItem('pendingUserData');
    if (pendingUserData && !user) {
      // This will trigger the AuthContext to process the pending user
      window.location.reload();
      return;
    }

    if (user) {
      // Load user's projects or initialize empty state for new users
      const userProjects = localStorage.getItem(`userProjects_${user.id}`) || '[]';
      try {
        const parsedProjects = JSON.parse(userProjects);
        setProjects(parsedProjects);
        setFilteredProjects(parsedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
        setFilteredProjects([]);
      }
    }
    setLoadingProjects(false);
  }, [user]);

  if (loading || loadingProjects) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Welcome message for new users
  const isNewUser = projects.length === 0;
  const welcomeMessage = isNewUser 
    ? `Welcome to WorkforceFlow, ${user.firstName}!` 
    : `Welcome back, ${user.firstName}!`;
  
  const welcomeSubtext = isNewUser
    ? "Let's get you started by creating your first project."
    : "Here's your project overview and recent activity.";

  const handleCreateProject = () => {
    navigate('/client/projects/create');
  };

  const handleViewDetails = (projectId) => {
    navigate(`/client/projects/${projectId}`);
  };

  const handleChat = (projectId) => {
    navigate(`/client/projects/${projectId}/chat`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-400 text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'open':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ClientLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.firstName}! Here's your overview.
          </p>
        </div>

        {/* Welcome Header - Plain Blue */}
        <div className="bg-blue-500 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-white mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{welcomeMessage}</h1>
              <p className="text-blue-100 text-sm sm:text-base md:text-lg opacity-90">
                {welcomeSubtext}
              </p>
              {user.company && (
                <p className="text-blue-100 text-xs sm:text-sm mt-2">
                  {user.company} • {user.industry}
                </p>
              )}
            </div>
            <button 
              onClick={handleCreateProject}
              className="w-full lg:w-auto bg-white text-blue-500 hover:bg-blue-50 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-blue-200 text-sm sm:text-base"
            >
              + {isNewUser ? 'Create Your First Project' : 'New Project'}
            </button>
          </div>
        </div>

        {/* New User Onboarding */}
        {isNewUser && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">
                  Getting Started Guide
                </h3>
                <p className="text-orange-800 mb-4">
                  Welcome to your client dashboard! Here's how to get started:
                </p>
                <ul className="space-y-2 text-orange-800">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    Create your first project to start finding freelancers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    Browse our talented freelancer community
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    Set up milestones to track project progress
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards - Improved */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 md:mb-8">
          <div className="bg-white border border-gray-200 overflow-hidden rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                  <dd className="text-2xl font-bold text-gray-900">{filteredProjects.length}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 overflow-hidden rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                  <dd className="text-2xl font-bold text-gray-900">{filteredProjects.filter(p => p.status === 'completed').length}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 overflow-hidden rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                  <dd className="text-2xl font-bold text-gray-900">{filteredProjects.filter(p => p.status === 'in_progress').length}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 overflow-hidden rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Budget</dt>
                  <dd className="text-2xl font-bold text-gray-900">${filteredProjects.reduce((sum, p) => sum + (p.budget || 0), 0).toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
          </div>
          <div className="p-6">
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
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.slice(0, 3).map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                        <div className="mt-1 flex items-center gap-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                            {project.status.replace('_', ' ')}
                          </span>
                          <span className="text-sm text-gray-500">Budget: ${project.budget}</span>
                          <span className="text-sm text-gray-500">Deadline: {project.deadline}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(project.id)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleChat(project.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Improved */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Create Project</h3>
                  <p className="text-sm text-gray-500">Post a new project and find freelancers</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleCreateProject}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Browse Freelancers</h3>
                  <p className="text-sm text-gray-500">Find and hire talented freelancers</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/freelancers')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Browse Now
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                  <p className="text-sm text-gray-500">Communicate with your freelancers</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/chat')}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  View Messages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;
