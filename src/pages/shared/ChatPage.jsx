// src/pages/shared/ChatPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ChatLayout from '../../components/chat/ChatLayout';
import ActivityFeed from '../../components/shared/activity/ActivityFeed';
import FileUploadForm from '../../components/shared/files/FileUploadForm';
import ProjectEditForm from '../../components/client/Projects/ProjectEditForm';
import CreateReviewPage from '../../pages/client/reviews/create';

const ChatPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Determine if this is a global chat or project-specific chat
  const isGlobalChat = !projectId;

  // Mock recipient data - replace with actual data from API
  const recipient = {
    id: 'user2',
    name: 'John Freelancer',
    role: 'freelancer'
  };

  const projectDetails = projectId ? {
    id: projectId,
    title: 'Website Development Project',
    budget: 5000,
    status: 'In Progress',
    timeline: '30 days'
  } : null;

  const handleProjectUpdate = (updatedData) => {
    setShowEditForm(false);
    // Here you would typically update the project via API
  };

  const handleReviewSubmit = (reviewData) => {
    setShowReviewForm(false);
    // Here you would typically submit the review via API
  };

  const getBackPath = () => {
    if (user?.role === 'client') {
      return '/client/dashboard';
    } else if (user?.role === 'freelancer') {
      return '/freelancer/dashboard';
    }
    return '/dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50" style={{ minWidth: '120%' }}>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 h-full z-10">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="text-xl font-bold text-orange-600">WorkForceFlow</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">
              {user?.role === 'client' ? 'Client Account' : 'Freelancer Account'}
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => navigate(getBackPath())}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">D</span>
                <div className="flex-1">
                  <div className="font-medium">Dashboard</div>
                  <div className="text-xs text-gray-500 mt-0.5">Business overview</div>
                </div>
              </button>
            </li>
            {user?.role === 'freelancer' && (
              <>
                <li>
                  <button
                    onClick={() => navigate('/freelancer/dashboard')}
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
                  <button
                    onClick={() => navigate('/freelancer/active-projects')}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
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
                    onClick={() => navigate('/freelancer/payments')}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">$</span>
                    <div className="flex-1">
                      <div className="font-medium">Payments</div>
                      <div className="text-xs text-gray-500 mt-0.5">Earnings & history</div>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/freelancer/profile')}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 ease-in-out"
                  >
                    <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">P</span>
                    <div className="flex-1">
                      <div className="font-medium">Profile</div>
                      <div className="text-xs text-gray-500 mt-0.5">Portfolio & settings</div>
                    </div>
                  </button>
                </li>
              </>
            )}
            <li>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left bg-orange-50 text-orange-700 border-r-2 border-orange-700 transition-all duration-200 ease-in-out">
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">M</span>
                <div className="flex-1">
                  <div className="font-medium">Messages</div>
                  <div className="text-xs text-gray-500 mt-0.5">Chat with team</div>
                </div>
              </button>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                localStorage.removeItem('userProjects');
                localStorage.removeItem('proposals');
                navigate('/login');
              }}
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
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 fixed top-0 right-0 left-64 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500">
                {user?.role === 'freelancer' ? 'Freelancer' : 'Client'}
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 overflow-auto pt-20">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  {isGlobalChat ? 'Messages' : 'Project Collaboration'}
                </h1>
                {projectDetails && (
                  <p className="text-gray-600">Project: {projectDetails.title}</p>
                )}
                {isGlobalChat && (
                  <p className="text-gray-600">Communicate with your team and clients</p>
                )}
              </div>

      {/* Tab Navigation - Only show for project-specific chat */}
      {!isGlobalChat && (
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'chat'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'activity'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Activity Feed
              </button>
              <button
                onClick={() => setActiveTab('milestones')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'milestones'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Milestones
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'files'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Files
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Chat Content */}
      <div className={isGlobalChat ? "w-full" : "grid grid-cols-1 lg:grid-cols-3 gap-6"}>
        {/* Main Content */}
        <div className={isGlobalChat ? "w-full" : "lg:col-span-2"}>
          {(!isGlobalChat && activeTab === 'chat') || isGlobalChat ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
              <ChatLayout projectId={projectId} />
            </div>
          ) : null}

          {!isGlobalChat && activeTab === 'activity' && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Activity Feed</h3>
              <div className="text-center py-12">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Project Activity</h4>
                <p className="text-gray-600 mb-4">
                  Track all project updates, milestones, and communications.
                </p>
                <p className="text-sm text-gray-500">
                  Activity feed will be implemented in the next phase.
                </p>
              </div>
            </div>
          )}

          {!isGlobalChat && activeTab === 'milestones' && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Project Milestones</h3>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600">
                  Add Milestone
                </button>
              </div>
              <p className="text-gray-600">
                Milestone management is available in the dedicated milestones section.
                <br />
                <a href={`/client/milestones/${projectId}`} className="text-primary-600 hover:underline">
                  Go to Milestones Management →
                </a>
              </p>
            </div>
          )}

          {!isGlobalChat && activeTab === 'files' && (
            <FileUploadForm projectId={projectId} />
          )}
        </div>

        {/* Sidebar - Only show for project-specific chat */}
        {!isGlobalChat && (
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold">Project Details</h4>
                <button
                  onClick={() => setShowEditForm(true)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {projectDetails.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Budget:</span>
                  <span className="ml-2 font-medium">${projectDetails.budget}</span>
                </div>
                <div>
                  <span className="text-gray-600">Timeline:</span>
                  <span className="ml-2">{projectDetails.timeline}</span>
                </div>
              </div>
            </div>

            {/* Team Member */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h4 className="font-semibold mb-3">Team Member</h4>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {recipient.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{recipient.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{recipient.role}</p>
                </div>
              </div>
              <button
                onClick={() => setShowReviewForm(true)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
              >
                Submit Review
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <a
                  href={`/client/projects/${projectId}/proposals`}
                  className="block w-full text-center bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 text-sm"
                >
                  View Proposals
                </a>
                <a
                  href={`/client/milestones/${projectId}`}
                  className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-sm"
                >
                  Manage Milestones
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Project</h2>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ProjectEditForm
                projectId={projectId}
                onCancel={() => setShowEditForm(false)}
                onSave={handleProjectUpdate}
              />
            </div>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Submit Review</h2>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <CreateReviewPage
                embedded={true}
                freelancerId={recipient.id}
                freelancerName={recipient.name}
                projectId={projectId}
                onCancel={() => setShowReviewForm(false)}
                onSubmit={handleReviewSubmit}
              />
            </div>
          </div>
        </div>
      )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;