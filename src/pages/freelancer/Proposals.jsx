import React, { useState } from 'react';

const FreelancerProposals = () => {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      projectTitle: 'E-commerce Website Development',
      clientName: 'TechCorp Inc.',
      proposedBudget: 4500,
      submittedDate: '2024-01-15',
      status: 'under-review', // under-review, accepted, rejected
      coverLetter: 'I have extensive experience in building e-commerce platforms...'
    },
    {
      id: 2,
      projectTitle: 'Mobile App UI/UX Design',
      clientName: 'StartupXYZ',
      proposedBudget: 3200,
      submittedDate: '2024-01-10',
      status: 'accepted',
      coverLetter: 'Specialized in creating intuitive mobile interfaces...'
    }
  ]);

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
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Proposals</h1>
        <span className="text-sm text-gray-600">
          {proposals.length} proposal{proposals.length !== 1 ? 's' : ''} submitted
        </span>
      </div>

      <div className="grid gap-6">
        {proposals.map(proposal => (
          <div key={proposal.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{proposal.projectTitle}</h3>
                <p className="text-gray-600 mt-1">Client: {proposal.clientName}</p>
              </div>
              {getStatusBadge(proposal.status)}
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