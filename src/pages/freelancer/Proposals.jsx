import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FreelancerLayout from '../../components/layouts/FreelancerLayout';

const FreelancerProposals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock proposals data
    const mockProposals = [
      {
        id: 1,
        projectTitle: "E-commerce Website Development",
        client: "TechCorp Inc.",
        submittedDate: "2024-01-16",
        status: "pending",
        proposedBudget: 4800,
        coverLetter: "I have extensive experience in React and Node.js development...",
        timeline: "8 weeks"
      },
      {
        id: 2,
        projectTitle: "Mobile App UI/UX Design",
        client: "FitLife Solutions",
        submittedDate: "2024-01-21",
        status: "accepted",
        proposedBudget: 2800,
        coverLetter: "I specialize in mobile app design with a focus on user experience...",
        timeline: "6 weeks"
      },
      {
        id: 3,
        projectTitle: "Content Writing for Blog",
        client: "Digital Marketing Co.",
        submittedDate: "2024-01-10",
        status: "rejected",
        proposedBudget: 1200,
        coverLetter: "I'm a professional content writer with 5+ years of experience...",
        timeline: "4 weeks"
      }
    ];
    
    setTimeout(() => {
      setProposals(mockProposals);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProposals = proposals.filter(proposal => 
    filterStatus === 'all' || proposal.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <FreelancerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </FreelancerLayout>
    );
  }

  return (
    <FreelancerLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Proposals
          </h1>
          <p className="text-gray-600">
            Track your submitted proposals and their status
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{proposals.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {proposals.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Accepted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {proposals.filter(p => p.status === 'accepted').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {proposals.length > 0 ? Math.round((proposals.filter(p => p.status === 'accepted').length / proposals.length) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Proposals</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
              <p className="text-gray-500 mb-4">You haven't submitted any proposals yet.</p>
              <button
                onClick={() => navigate('/freelancer/projects')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Browse Projects
              </button>
            </div>
          ) : (
            filteredProposals.map((proposal) => (
              <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{proposal.projectTitle}</h3>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                        {getStatusIcon(proposal.status)}
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{proposal.coverLetter}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Client:</span>
                        <div className="text-gray-900">{proposal.client}</div>
                      </div>
                      <div>
                        <span className="font-medium">Proposed Budget:</span>
                        <div className="text-lg font-bold text-green-600">${proposal.proposedBudget.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span>
                        <div className="text-gray-900">{proposal.timeline}</div>
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span>
                        <div className="text-gray-900">{new Date(proposal.submittedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex flex-col gap-2">
                    <button
                      onClick={() => navigate(`/freelancer/proposals/${proposal.id}`)}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      View Details
                    </button>
                    {proposal.status === 'accepted' && (
                      <button
                        onClick={() => navigate(`/freelancer/projects/${proposal.id}/workspace`)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                      >
                        Go to Project
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default FreelancerProposals;
