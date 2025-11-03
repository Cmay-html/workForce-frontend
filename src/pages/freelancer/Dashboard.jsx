import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import FreelancerLayout from "../../components/layouts/FreelancerLayout";
import PageWrapper from "../../components/shared/PageWrapper";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [earnings, setEarnings] = useState({ thisMonth: 0, total: 0 });

  // Calculate stats from user data
  const stats = {
    activeProjects: projects.filter(p => p.status === 'active').length,
    pendingProposals: proposals.filter(p => p.status === 'pending').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalEarnings: projects
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.earnings || 0), 0)
  };

  useEffect(() => {
    if (user) {
      // Initialize with comprehensive mock data
      const mockProjects = [
        {
          id: 1,
          title: "E-commerce Website Development",
          status: "active",
          earnings: 2400,
          client: "TechCorp Inc.",
          progress: 75,
          deadline: "2024-02-15"
        },
        {
          id: 2,
          title: "Mobile App UI/UX Design",
          status: "completed",
          earnings: 1800,
          client: "StartupXYZ",
          progress: 100,
          deadline: "2024-01-20"
        },
        {
          id: 3,
          title: "Logo Design & Branding",
          status: "active",
          earnings: 800,
          client: "Creative Agency",
          progress: 50,
          deadline: "2024-02-28"
        }
      ];

      const mockProposals = [
        {
          id: 1,
          projectTitle: "Website Redesign",
          status: "pending",
          submittedDate: new Date().toISOString(),
          budget: 3000
        },
        {
          id: 2,
          projectTitle: "Logo Design",
          status: "accepted",
          submittedDate: new Date(Date.now() - 86400000).toISOString(),
          budget: 500
        },
        {
          id: 3,
          projectTitle: "React Development",
          status: "pending",
          submittedDate: new Date(Date.now() - 172800000).toISOString(),
          budget: 5000
        }
      ];

      const mockActivity = [
        {
          id: 1,
          type: "proposal_accepted",
          project: "E-commerce Website",
          client: "TechCorp Inc.",
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 2,
          type: "milestone_approved",
          project: "Mobile App Design",
          client: "StartupXYZ",
          amount: 800,
          timestamp: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 3,
          type: "new_message",
          project: "Website Redesign",
          client: "Digital Agency",
          timestamp: new Date(Date.now() - 10800000).toISOString()
        },
        {
          id: 4,
          type: "payment_received",
          project: "Logo Design",
          client: "Creative Studio",
          amount: 1200,
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      setProjects(mockProjects);
      setProposals(mockProposals);
      setRecentActivity(mockActivity);
      setEarnings({ thisMonth: 2400, total: 8500 });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const welcomeMessage = `Welcome back, ${user.firstName}!`;

  const headerActions = [
    <button
      key="browse"
      onClick={() => navigate("/freelancer/projects")}
      className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border border-orange-200"
    >
      Browse Projects
    </button>,
    <button
      key="profile"
      onClick={() => navigate("/freelancer/profile")}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      Update Profile
    </button>
  ];

  return (
    <FreelancerLayout>
      <PageWrapper 
        title="Dashboard" 
        subtitle={welcomeMessage}
        headerActions={headerActions}
      >
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{welcomeMessage}</h2>
              <p className="text-orange-100 text-lg opacity-90">
                Here's your business overview and recent activity.
              </p>
              <div className="mt-4 flex items-center gap-6">
                <div className="text-orange-100">
                  <span className="text-2xl font-bold">${earnings.thisMonth}</span>
                  <p className="text-sm">This Month</p>
                </div>
                <div className="text-orange-100">
                  <span className="text-2xl font-bold">{stats.activeProjects}</span>
                  <p className="text-sm">Active Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 overflow-hidden rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                  <dd className="text-2xl font-bold text-gray-900">{stats.activeProjects}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 overflow-hidden rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Proposals</dt>
                  <dd className="text-2xl font-bold text-gray-900">{stats.pendingProposals}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 overflow-hidden rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Projects</dt>
                  <dd className="text-2xl font-bold text-gray-900">{stats.completedProjects}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 overflow-hidden rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                  <dd className="text-2xl font-bold text-gray-900">${earnings.total.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2 bg-white shadow-sm overflow-hidden rounded-xl border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-semibold text-gray-900">Active Projects</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your current ongoing work</p>
            </div>
            <div className="px-6 py-5">
              {projects.filter(p => p.status === 'active').length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No active projects</h3>
                  <p className="mt-1 text-sm text-gray-500">Start by browsing available projects.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.filter(p => p.status === 'active').map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {project.progress}% Complete
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>Client: {project.client}</span>
                        <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white shadow-sm overflow-hidden rounded-xl border border-gray-200">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="px-6 py-5">
                <div className="space-y-4">
                  {recentActivity.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">
                          {activity.type === "proposal_accepted" && (
                            <>Your proposal for <strong>{activity.project}</strong> was accepted</>
                          )}
                          {activity.type === "milestone_approved" && (
                            <>Milestone approved for <strong>{activity.project}</strong> +${activity.amount}</>
                          )}
                          {activity.type === "new_message" && (
                            <>New message from {activity.client}</>
                          )}
                          {activity.type === "payment_received" && (
                            <>Payment received: ${activity.amount}</>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow-sm overflow-hidden rounded-xl border border-gray-200">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="px-6 py-5 space-y-3">
                <button
                  onClick={() => navigate("/freelancer/projects")}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Browse Projects
                </button>
                <button
                  onClick={() => navigate("/freelancer/proposals")}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  My Proposals
                </button>
                <button
                  onClick={() => navigate("/chat")}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                  Messages
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </FreelancerLayout>
  );
};

export default FreelancerDashboard;
