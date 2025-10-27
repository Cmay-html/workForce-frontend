// src/components/client/Projects/ProjectProposals.jsx
import React, { useState, useEffect } from 'react';

const ProjectProposals = ({ projectId }) => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showHireModal, setShowHireModal] = useState(false);

  // Fetch proposals when component mounts or projectId changes
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockProposals = [
          {
            id: 1,
            freelancerName: 'John Doe',
            freelancerId: 'freelancer_1',
            coverLetter: 'I have extensive experience in React development and have built similar websites before. I can deliver high-quality code with proper testing and documentation.',
            proposedBudget: 4500,
            estimatedTimeline: 30,
            relevantExperience: '5 years of React development, 10+ successful projects',
            portfolioUrl: 'https://johndoe-portfolio.com',
            rating: 4.8,
            completedProjects: 24,
            status: 'pending',
            submittedDate: '2024-01-15'
          },
          {
            id: 2,
            freelancerName: 'Jane Smith',
            freelancerId: 'freelancer_2',
            coverLetter: 'I specialize in responsive web design and modern frontend development. My focus is on creating user-friendly interfaces with optimal performance.',
            proposedBudget: 4800,
            estimatedTimeline: 25,
            relevantExperience: '3 years of frontend development, UI/UX expertise',
            portfolioUrl: 'https://janesmith-design.com',
            rating: 4.9,
            completedProjects: 18,
            status: 'pending',
            submittedDate: '2024-01-14'
          },
          {
            id: 3,
            freelancerName: 'Mike Johnson',
            freelancerId: 'freelancer_3',
            coverLetter: 'Full-stack developer with expertise in React, Node.js, and database design. I can handle both frontend and backend development for your project.',
            proposedBudget: 5200,
            estimatedTimeline: 35,
            relevantExperience: '4 years full-stack development, e-commerce specialist',
            portfolioUrl: 'https://mikejohnson-dev.com',
            rating: 4.7,
            completedProjects: 32,
            status: 'pending',
            submittedDate: '2024-01-16'
          }
        ];
        setProposals(mockProposals);
      } catch (err) {
        setError('Failed to load proposals');
        console.error('Error fetching proposals:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProposals();
    }
  }, [projectId]);

  const handleHire = (proposal) => {
    setSelectedProposal(proposal);
    setShowHireModal(true);
  };

  const confirmHire = async () => {
    try {
      // API call to update proposal status and create contract
      setProposals(proposals.map(proposal => 
        proposal.id === selectedProposal.id 
          ? { ...proposal, status: 'hired' }
          : { ...proposal, status: 'rejected' }
      ));
      
      console.log('Hired freelancer:', {
        proposalId: selectedProposal.id,
        freelancerId: selectedProposal.freelancerId,
        projectId: projectId
      });
      
      // Here you would make the actual API call
      // await api.hireFreelancer(selectedProposal.id, projectId);
      
      setShowHireModal(false);
      setSelectedProposal(null);
    } catch (err) {
      setError('Failed to hire freelancer');
      console.error('Error hiring freelancer:', err);
    }
  };

  const handleReject = async (proposalId) => {
    try {
      setProposals(proposals.map(proposal => 
        proposal.id === proposalId 
          ? { ...proposal, status: 'rejected' }
          : proposal
      ));
      
      console.log('Rejected proposal ID:', proposalId);
      // await api.rejectProposal(proposalId);
    } catch (err) {
      setError('Failed to reject proposal');
      console.error('Error rejecting proposal:', err);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Under Review' },
      hired: { color: 'bg-green-100 text-green-800', label: 'Hired' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      withdrawn: { color: 'bg-gray-100 text-gray-800', label: 'Withdrawn' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Proposals</h1>
        <div className="text-sm text-gray-600">
          {proposals.length} proposal{proposals.length !== 1 ? 's' : ''} received
        </div>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">No proposals received yet.</p>
          <p className="text-gray-500 mt-2">Check back later for new proposals.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {proposals.map(proposal => (
            <div key={proposal.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {proposal.freelancerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{proposal.freelancerName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <span>⭐ {proposal.rating}</span>
                      <span>•</span>
                      <span>{proposal.completedProjects} projects</span>
                      {proposal.portfolioUrl && (
                        <>
                          <span>•</span>
                          <a 
                            href={proposal.portfolioUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Portfolio
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {getStatusBadge(proposal.status)}
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Cover Letter:</h4>
                <p className="text-gray-600 leading-relaxed">{proposal.coverLetter}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="font-medium text-gray-700">Proposed Budget:</span>
                  <p className="text-lg text-green-600 font-semibold">${proposal.proposedBudget.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="font-medium text-gray-700">Timeline:</span>
                  <p className="text-lg text-blue-600 font-semibold">{proposal.estimatedTimeline} days</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="font-medium text-gray-700">Experience:</span>
                  <p className="text-sm text-gray-600 mt-1">{proposal.relevantExperience}</p>
                </div>
              </div>

              {proposal.status === 'pending' && (
                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={() => handleHire(proposal)}
                    className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Hire Freelancer
                  </button>
                  <button
                    onClick={() => handleReject(proposal.id)}
                    className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Reject Proposal
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hire Confirmation Modal */}
      {showHireModal && selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Confirm Hire</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to hire <strong>{selectedProposal.freelancerName}</strong> for ${selectedProposal.proposedBudget.toLocaleString()}? 
              This will automatically reject all other proposals.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowHireModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmHire}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
              >
                Confirm Hire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectProposals;