import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const FreelancerProposals = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [loadingProposals, setLoadingProposals] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Skip API call and go directly to mock data to avoid HTML response errors
    const mockProposals = [
      {
        id: 1,
        projectTitle: 'E-commerce Website Development',
        clientName: 'TechCorp Inc',
        proposedBudget: 5000,
        proposedTimeline: 30,
        submittedDate: '2024-01-15',
        status: 'pending', // pending, accepted, rejected
        coverLetter: 'I have extensive experience in building e-commerce platforms...'
      },
      {
        id: 2,
        projectTitle: 'Mobile App UI/UX Design',
        clientName: 'StartupXYZ',
        proposedBudget: 3000,
        proposedTimeline: 21,
        submittedDate: '2024-01-10',
        status: 'accepted',
        coverLetter: 'As a UI/UX designer with 5 years of experience...'
      },
      {
        id: 3,
        projectTitle: 'API Integration Service',
        clientName: 'DataSystems Ltd',
        proposedBudget: 2000,
        proposedTimeline: 14,
        submittedDate: '2024-01-05',
        status: 'rejected',
        coverLetter: 'I specialize in API development and integration...'
      }
    ];

    setProposals(mockProposals);
    setLoadingProposals(false);
  }, []);

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    return proposal.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      case 'pending': return 'Under Review';
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

  if (loading || loadingProposals) {
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
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="text-xl font-bold text-gray-900">Kaziflow</span>
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
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">R</span>
                <div className="flex-1">
                  <div className="font-medium">My Proposals</div>
                  <div className="text-xs text-gray-500 mt-0.5">Track submissions</div>
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
                placeholder="Search proposals..."
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                  My Proposals
                </h1>
                <p className="text-gray-600">
                  Track your submitted proposals and their status.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    {['all', 'pending', 'accepted', 'rejected'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`py-4 px-6 text-sm font-medium border-b-2 ${
                          filter === tab
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {tab === 'all' && ` (${proposals.length})`}
                        {tab === 'pending' && ` (${proposals.filter(p => p.status === 'pending').length})`}
                        {tab === 'accepted' && ` (${proposals.filter(p => p.status === 'accepted').length})`}
                        {tab === 'rejected' && ` (${proposals.filter(p => p.status === 'rejected').length})`}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Proposals List */}
              <div className="space-y-6">
                {filteredProposals.length === 0 ? (
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    <div className="px-4 py-5 sm:px-6 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No proposals found</h3>
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
                  filteredProposals.map(proposal => (
                    <div key={proposal.id} className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{proposal.projectTitle}</h3>
                            <p className="text-gray-600 mt-1">Client: {proposal.clientName}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                            {getStatusText(proposal.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">Proposed Budget:</span>
                            <p className="font-semibold text-gray-900">${proposal.proposedBudget}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Timeline:</span>
                            <p className="font-semibold text-gray-900">{proposal.proposedTimeline} days</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Submitted:</span>
                            <p className="font-semibold text-gray-900">{proposal.submittedDate}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="text-sm text-gray-500 block mb-2">Cover Letter:</span>
                          <p className="text-gray-800 bg-gray-50 p-3 rounded-md">{proposal.coverLetter}</p>
                        </div>

                        {proposal.status === 'accepted' && (
                          <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <p className="text-green-800 font-medium">Congratulations! Your proposal was accepted.</p>
                            </div>
                            <button
                              onClick={() => navigate(`/projects/${proposal.id}/chat`)}
                              className="text-green-700 hover:text-green-800 font-medium mt-2 inline-block hover:underline"
                            >
                              Start working on the project →
                            </button>
                          </div>
                        )}
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

export default FreelancerProposals;