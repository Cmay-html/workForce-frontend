import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MilestonesOverviewPage = () => {
  const navigate = useNavigate();
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    // Mock milestones data - replace with actual API call
    const mockMilestones = [
      {
        id: 1,
        projectId: 'proj1',
        projectTitle: 'Website Development',
        title: 'Project Planning & Setup',
        description: 'Initial project setup, requirements gathering, and planning phase',
        status: 'completed',
        amount: 500,
        dueDate: '2024-01-10',
        freelancer: 'John Doe',
        progress: 100
      },
      {
        id: 2,
        projectId: 'proj1',
        projectTitle: 'Website Development',
        title: 'Design Phase',
        description: 'UI/UX design, wireframes, and mockups',
        status: 'completed',
        amount: 800,
        dueDate: '2024-01-20',
        freelancer: 'John Doe',
        progress: 100
      },
      {
        id: 3,
        projectId: 'proj1',
        projectTitle: 'Website Development',
        title: 'Development Phase',
        description: 'Frontend and backend development',
        status: 'in_progress',
        amount: 2000,
        dueDate: '2024-02-15',
        freelancer: 'John Doe',
        progress: 65
      },
      {
        id: 4,
        projectId: 'proj2',
        projectTitle: 'Mobile App Design',
        title: 'Wireframes & User Flow',
        description: 'Create wireframes and user flow diagrams',
        status: 'pending',
        amount: 400,
        dueDate: '2024-02-01',
        freelancer: 'Jane Smith',
        progress: 0
      }
    ];

    setMilestones(mockMilestones);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-primary-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const handleViewProject = (projectId) => {
    navigate(`/client/milestones/${projectId}`);
  };

  return (
    <div className="h-full p-12" style={{ minWidth: '1024px' }}>
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Milestones Overview</h1>
        <p className="text-gray-600">Track and manage all your project milestones</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{milestones.length}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Milestones</dt>
                <dd className="text-lg font-medium text-gray-900">{milestones.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{milestones.filter(m => m.status === 'completed').length}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                <dd className="text-lg font-medium text-gray-900">{milestones.filter(m => m.status === 'completed').length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{milestones.filter(m => m.status === 'in_progress').length}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                <dd className="text-lg font-medium text-gray-900">{milestones.filter(m => m.status === 'in_progress').length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">${milestones.reduce((sum, m) => sum + m.amount, 0)}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                <dd className="text-lg font-medium text-gray-900">${milestones.reduce((sum, m) => sum + m.amount, 0)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">All Milestones</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage milestones across all your projects</p>
            </div>
            <button
              onClick={() => navigate('/client/projects')}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              + Add Milestone
            </button>
          </div>
        </div>

        {milestones.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No milestones</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first milestone.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {milestones.map((milestone) => (
              <li key={milestone.id} className="px-4 py-6 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-primary-600 truncate">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{milestone.projectTitle}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(milestone.status)}`}>
                          {milestone.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex sm:space-x-6">
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Amount:</span>
                          <span className="ml-1">${milestone.amount}</span>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="font-medium">Due:</span>
                          <span className="ml-1">{milestone.dueDate}</span>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="font-medium">Freelancer:</span>
                          <span className="ml-1">{milestone.freelancer}</span>
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">{milestone.description}</p>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(milestone.progress)}`}
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleViewProject(milestone.projectId)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    View Project
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Update Progress
                  </button>
                  {milestone.status !== 'completed' && (
                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Mark Complete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MilestonesOverviewPage;