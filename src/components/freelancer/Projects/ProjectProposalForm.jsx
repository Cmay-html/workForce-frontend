
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProjectProposalForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [proposal, setProposal] = useState({
    coverLetter: "",
    proposedBudget: "",
    estimatedTimeline: "",
    relevantExperience: "",
  });

  useEffect(() => {
    // Mock project data - replace with actual API call
    const mockProjects = [
      {
        id: 1,
        title: 'E-commerce Website Development',
        description: 'Build a full-stack e-commerce platform with React, Node.js, and MongoDB.',
        budget: 5000,
        deadline: '2024-12-31',
        category: 'Web Development',
        skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        client: 'TechCorp Inc'
      },
      {
        id: 2,
        title: 'Mobile App UI/UX Design',
        description: 'Design a comprehensive UI/UX for a fitness tracking mobile application.',
        budget: 3000,
        deadline: '2024-12-15',
        category: 'Design',
        skills: ['Figma', 'Adobe XD', 'UI/UX Design', 'Mobile Design'],
        client: 'FitLife Apps'
      },
      {
        id: 3,
        title: 'API Development & Integration',
        description: 'Develop RESTful APIs for a logistics management system.',
        budget: 4000,
        deadline: '2024-11-30',
        category: 'Web Development',
        skills: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        client: 'LogiTech Solutions'
      },
      {
        id: 4,
        title: 'Content Management System',
        description: 'Build a custom CMS for a publishing company.',
        budget: 6000,
        deadline: '2025-01-15',
        category: 'Web Development',
        skills: ['React', 'Node.js', 'PostgreSQL', 'SEO'],
        client: 'PublishPro Media'
      },
      {
        id: 5,
        title: 'Data Visualization Dashboard',
        description: 'Create an interactive dashboard for business analytics.',
        budget: 3500,
        deadline: '2024-11-20',
        category: 'Data Science',
        skills: ['React', 'D3.js', 'Python', 'Data Analysis'],
        client: 'Analytics Corp'
      },
      {
        id: 6,
        title: 'DevOps Infrastructure Setup',
        description: 'Set up CI/CD pipelines, container orchestration, and cloud infrastructure.',
        budget: 4500,
        deadline: '2024-12-10',
        category: 'DevOps',
        skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
        client: 'CloudTech Systems'
      }
    ];

    const foundProject = mockProjects.find(p => p.id === parseInt(projectId));
    setProject(foundProject);
    setLoadingProject(false);
  }, [projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Proposal submitted:", proposal);

    // Simulate API call
    alert(`Proposal submitted successfully for "${project.title}"!`);

    // Add to pending proposals
    const proposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    const newProposal = {
      id: Date.now(),
      projectId: project.id,
      projectTitle: project.title,
      clientName: project.client,
      proposedBudget: parseInt(proposal.proposedBudget),
      proposedTimeline: parseInt(proposal.estimatedTimeline),
      submittedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      status: 'pending',
      coverLetter: proposal.coverLetter
    };
    proposals.push(newProposal);
    localStorage.setItem('proposals', JSON.stringify(proposals));

    // Navigate to proposals page
    navigate('/freelancer/proposals');
  };

  const handleChange = (e) => {
    setProposal({
      ...proposal,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  if (loading || loadingProject) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50" style={{ width: '100%' }}>
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
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left bg-orange-50 text-orange-700 border-r-2 border-orange-700">
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">R</span>
                <div className="flex-1">
                  <div className="font-medium">Submit Proposal</div>
                  <div className="text-xs text-gray-500 mt-0.5">Apply for projects</div>
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
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">U</span>
                <div className="flex-1">
                  <div className="font-medium">Profile</div>
                  <div className="text-xs text-gray-500 mt-0.5">Portfolio & settings</div>
                </div>
              </button>
            </li>
          </ul>

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
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">
                Submitting Proposal
              </div>
              <div className="text-xs text-gray-500">
                {project.title}
              </div>
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
          <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Submit Proposal
                </h1>
                <p className="text-gray-600">
                  Apply for this project opportunity.
                </p>
              </div>

              {/* Project Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Client:</span>
                      <span className="text-sm font-medium text-gray-900">{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Budget:</span>
                      <span className="text-sm font-medium text-gray-900">${project.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Deadline:</span>
                      <span className="text-sm font-medium text-gray-900">{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        project.category === 'Web Development' ? 'bg-blue-100 text-blue-800' :
                        project.category === 'Design' ? 'bg-purple-100 text-purple-800' :
                        project.category === 'Mobile Development' ? 'bg-green-100 text-green-800' :
                        project.category === 'Data Science' ? 'bg-orange-100 text-orange-800' :
                        project.category === 'DevOps' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proposal Form */}
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 rounded-lg p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Proposal</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={proposal.coverLetter}
                    onChange={(e) => setProposal({...proposal, coverLetter: e.target.value})}
                    rows={6}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Introduce yourself and explain why you're the perfect fit for this project..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proposed Budget ($) *
                    </label>
                    <input
                      type="number"
                      name="proposedBudget"
                      value={proposal.proposedBudget}
                      onChange={(e) => setProposal({...proposal, proposedBudget: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your proposed price"
                      min="1"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Client budget: ${project.budget.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Timeline (days) *
                    </label>
                    <input
                      type="number"
                      name="estimatedTimeline"
                      value={proposal.estimatedTimeline}
                      onChange={(e) => setProposal({...proposal, estimatedTimeline: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How many days to complete"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relevant Experience *
                  </label>
                  <textarea
                    name="relevantExperience"
                    value={proposal.relevantExperience}
                    onChange={(e) => setProposal({...proposal, relevantExperience: e.target.value})}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your relevant experience and past projects..."
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/freelancer/projects')}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectProposalForm;
