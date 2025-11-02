import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadProject = async () => {
      try {
        // TODO: Replace with actual API call to fetch project details
        const response = await fetch(`/api/client/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        setProject(data.project);
      } catch (error) {
        console.error('Error loading project:', error);
        setProject(null);
      } finally {
        setLoadingProject(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

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

  const getMilestoneStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading || loadingProject) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return navigate('/login');
  }

  if (!project) {
    return (
      <div className="flex h-screen bg-gray-50" style={{ minWidth: '1024px' }}>
        <div className="flex-1 flex flex-col min-h-screen">
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
              <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50" style={{ minWidth: '1024px' }}>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="text-xl font-bold text-orange-600">WorkforceFlow</span>
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
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
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
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left bg-orange-50 text-orange-700 border-r-2 border-orange-700">
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">V</span>
                <div className="flex-1">
                  <div className="font-medium">Project Details</div>
                  <div className="text-xs text-gray-500 mt-0.5">View project info</div>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ')}
                </span>
                <span className="text-sm text-gray-500">{project.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500">
                Client
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
              {/* Project Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{project.progress || 0}%</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Progress</dt>
                        <dd className="text-lg font-medium text-gray-900">{project.progress || 0}%</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">${project.budget}</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Budget</dt>
                        <dd className="text-lg font-medium text-gray-900">${project.budget}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{project.milestones?.length || 0}</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Milestones</dt>
                        <dd className="text-lg font-medium text-gray-900">{project.milestones?.length || 0}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{project.deadline}</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Deadline</dt>
                        <dd className="text-lg font-medium text-gray-900">{project.deadline}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white shadow rounded-lg border border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === 'overview'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('milestones')}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === 'milestones'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Milestones
                    </button>
                    <button
                      onClick={() => setActiveTab('files')}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === 'files'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Files
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Project Description</h3>
                        <p className="text-gray-600">{project.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Project Details</h4>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="text-sm text-gray-500">Status:</dt>
                              <dd className={`text-sm font-medium ${getStatusColor(project.status)}`}>
                                {project.status.replace('_', ' ')}
                              </dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-sm text-gray-500">Budget:</dt>
                              <dd className="text-sm font-medium text-gray-900">${project.budget}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-sm text-gray-500">Deadline:</dt>
                              <dd className="text-sm font-medium text-gray-900">{project.deadline}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-sm text-gray-500">Created:</dt>
                              <dd className="text-sm font-medium text-gray-900">{project.createdAt}</dd>
                            </div>
                          </dl>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.skills?.map(skill => (
                              <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                {skill}
                              </span>
                            )) || <span className="text-sm text-gray-500">No skills specified</span>}
                          </div>
                        </div>
                      </div>

                      {project.freelancer && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Assigned Freelancer</h4>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {project.freelancer.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{project.freelancer}</p>
                              <p className="text-sm text-gray-500">Assigned freelancer</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'milestones' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Project Milestones</h3>
                        <button
                          onClick={() => navigate(`/client/milestones/${project.id}/create`)}
                          className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          + Add Milestone
                        </button>
                      </div>

                      {project.milestones && project.milestones.length > 0 ? (
                        <div className="space-y-4">
                          {project.milestones.map((milestone) => (
                            <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                                  <p className="text-sm text-gray-600">${milestone.amount}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full border ${getMilestoneStatusColor(milestone.status)}`}>
                                  {milestone.status.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No milestones</h3>
                          <p className="mt-1 text-sm text-gray-500">Get started by adding your first milestone.</p>
                          <div className="mt-6">
                            <button
                              onClick={() => navigate(`/client/milestones/${project.id}/create`)}
                              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                              Add Milestone
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'files' && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Project Files</h3>
                      <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No files uploaded</h3>
                        <p className="mt-1 text-sm text-gray-500">Files shared with freelancers will appear here.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {project.freelancer && (
                  <button
                    onClick={() => navigate(`/projects/${project.id}/chat`)}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Message Freelancer
                  </button>
                )}
                <button
                  onClick={() => navigate(`/client/projects/${project.id}/edit`)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Edit Project
                </button>
                {project.status === 'open' && (
                  <button
                    onClick={() => navigate('/freelancers')}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Find Freelancers
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;