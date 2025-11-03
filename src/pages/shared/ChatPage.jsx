// src/pages/shared/ChatPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ChatLayout from '../../components/chat/ChatLayout';
import ActivityFeed from '../../components/shared/activity/ActivityFeed';
import FileUploadForm from '../../components/shared/files/FileUploadForm';
import ProjectEditForm from '../../components/client/Projects/ProjectEditForm';
import CreateReviewPage from '../../pages/client/reviews/create';
import ClientLayout from '../../components/layouts/ClientLayout';
import FreelancerLayout from '../../components/layouts/FreelancerLayout';

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

  // Choose layout based on user role
  const Layout = user?.role === 'client' ? ClientLayout : FreelancerLayout;

  const ChatContent = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
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
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'activity'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Activity Feed
              </button>
              <button
                onClick={() => setActiveTab('milestones')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'milestones'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Milestones
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'files'
                    ? 'border-blue-500 text-blue-600'
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Add Milestone
                </button>
              </div>
              <p className="text-gray-600">
                Milestone management is available in the dedicated milestones section.
                <br />
                <a href={`/client/milestones/${projectId}`} className="text-blue-600 hover:underline">
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
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
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
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {recipient.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{recipient.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{recipient.role}</p>
                </div>
              </div>
              {user?.role === 'client' && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
                >
                  Submit Review
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                {user?.role === 'client' && (
                  <>
                    <a
                      href={`/client/projects/${projectId}/proposals`}
                      className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm"
                    >
                      View Proposals
                    </a>
                    <a
                      href={`/client/milestones/${projectId}`}
                      className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-sm"
                    >
                      Manage Milestones
                    </a>
                  </>
                )}
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
  );

  return (
    <Layout>
      <ChatContent />
    </Layout>
  );
};

export default ChatPage;
