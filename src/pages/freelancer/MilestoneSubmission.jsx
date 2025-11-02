import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const MilestoneSubmission = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [loadingMilestones, setLoadingMilestones] = useState(true);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [submissionData, setSubmissionData] = useState({
    description: '',
    files: [],
    notes: ''
  });

  useEffect(() => {
    const mockMilestones = [
      {
        id: 1,
        title: 'Project Planning & Setup',
        description: 'Initial project setup and planning phase',
        dueDate: '2024-02-10',
        amount: 1000,
        status: 'completed'
      },
      {
        id: 2,
        title: 'UI/UX Design Completion',
        description: 'Complete all design mockups and user flows',
        dueDate: '2024-02-20',
        amount: 1500,
        status: 'in-progress'
      },
      {
        id: 3,
        title: 'Development Phase 1',
        description: 'Backend API development and basic frontend structure',
        dueDate: '2024-02-28',
        amount: 1500,
        status: 'pending'
      }
    ];

    setMilestones(mockMilestones);
    setLoadingMilestones(false);
  }, [projectId]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSubmissionData({
      ...submissionData,
      files: [...submissionData.files, ...files]
    });
  };

  const removeFile = (index) => {
    setSubmissionData({
      ...submissionData,
      files: submissionData.files.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to submit milestone work
    setSelectedMilestone(null);
    setSubmissionData({ description: '', files: [], notes: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'pending': return 'Pending';
      default: return status;
    }
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

  if (loading || loadingMilestones) {
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
    <div className="flex h-screen bg-gray-50" style={{ minWidth: '100%' }}>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
                placeholder="Search milestones..."
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
                  Milestone Submission
                </h1>
                <p className="text-gray-600">
                  Submit completed work for client approval.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Milestones List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Project Milestones</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Select a milestone to submit work</p>
                  </div>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="space-y-4">
                      {milestones.map(milestone => (
                        <div key={milestone.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                              {getStatusText(milestone.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                          <div className="flex justify-between text-sm text-gray-500 mb-3">
                            <span>Due: {milestone.dueDate}</span>
                            <span className="font-semibold text-gray-900">${milestone.amount}</span>
                          </div>
                          {milestone.status === 'in-progress' && (
                            <button
                              onClick={() => setSelectedMilestone(milestone)}
                              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                              </svg>
                              Submit Work
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submission Form */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedMilestone ? `Submit: ${selectedMilestone.title}` : 'Select a Milestone'}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {selectedMilestone ? 'Provide details about your completed work' : 'Choose a milestone from the list to submit work'}
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:px-6">
                    {selectedMilestone ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Work Description *
                          </label>
                          <textarea
                            value={submissionData.description}
                            onChange={(e) => setSubmissionData({...submissionData, description: e.target.value})}
                            rows="4"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Describe the work completed for this milestone..."
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Files
                          </label>
                          <input
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                          {submissionData.files.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {submissionData.files.map((file, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                  <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Notes
                          </label>
                          <textarea
                            value={submissionData.notes}
                            onChange={(e) => setSubmissionData({...submissionData, notes: e.target.value})}
                            rows="3"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Any additional information for the client..."
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => setSelectedMilestone(null)}
                            className="flex-1 bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Submit for Approval
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Select a Milestone</h3>
                        <p className="mt-1 text-sm text-gray-500">Choose a milestone from the list to submit work</p>
                      </div>
                    )}
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

export default MilestoneSubmission;