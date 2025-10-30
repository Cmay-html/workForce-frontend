import React, { useState } from 'react';

const FreelancerProposals = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [loadingProposals, setLoadingProposals] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load proposals from localStorage
    const storedProposals = JSON.parse(localStorage.getItem('proposals') || '[]');

    // If no stored proposals, show default mock data
    if (storedProposals.length === 0) {
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
    } else {
      setProposals(storedProposals);
    }

    setLoadingProposals(false);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'under-review': { color: 'bg-yellow-100 text-yellow-800', label: 'Under Review' },
      'accepted': { color: 'bg-green-100 text-green-800', label: 'Accepted' },
      'rejected': { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status] || statusConfig['under-review'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

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
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left bg-orange-50 text-orange-700 border-r-2 border-orange-700">
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

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-600">Proposed Budget:</span>
                <p className="text-lg font-semibold text-green-600">${proposal.proposedBudget}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Submitted:</span>
                <p className="text-gray-900">{proposal.submittedDate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Cover Letter:</span>
                <p className="text-sm text-gray-700 line-clamp-2">{proposal.coverLetter}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Project Details
              </button>
              {proposal.status === 'under-review' && (
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Withdraw Proposal
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {proposals.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
          <p className="text-gray-600 mb-4">Start browsing projects and submit your first proposal!</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Browse Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default FreelancerProposals;