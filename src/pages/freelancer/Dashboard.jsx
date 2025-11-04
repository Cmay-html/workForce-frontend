import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import FreelancerLayout from "../../components/layouts/FreelancerLayout";
import { projectsService } from "../../services/api/projectsService";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [earnings, setEarnings] = useState({ thisMonth: 0, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Calculate stats from user data
  const stats = [
    {
      value: projects.filter(p => p.status === 'active').length.toString(),
      label: "Active Projects",
      color: "blue",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      value: proposals.filter(p => p.status === 'pending').length.toString(),
      label: "Pending Proposals",
      color: "yellow",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      value: projects.filter(p => p.status === 'completed').length.toString(),
      label: "Completed",
      color: "green",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      value: `$${earnings.total}`,
      label: "Total Earnings",
      color: "orange",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      title: "Browse Projects",
      description: "Find new opportunities",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      href: "/freelancer/projects",
      color: "blue",
    },
    {
      title: "Submit Proposal",
      description: "Apply to projects",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: "/freelancer/proposals",
      color: "green",
    },
    {
      title: "Update Portfolio",
      description: "Showcase your work",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: "/freelancer/profile",
      color: "purple",
    },
    {
      title: "Track Payments",
      description: "Monitor earnings",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: "/freelancer/payments",
      color: "orange",
    },
  ];

  useEffect(() => {
    const load = async () => {
      if (user) {
        try {
          const res = await projectsService.getAllProjects();
          const list = res.data || [];
          const normalized = Array.isArray(list) ? list : (list.items || []);
          setProjects(normalized);
        } catch (e) {
          console.error('Failed to load projects:', e);
          setProjects([]);
        }

        // Keep proposals and activity as placeholders for now
        setProposals([]);
        setRecentActivity([]);
        setEarnings({ thisMonth: 0, total: 0 });
      }
    };
    load();
  }, [user]);

  // Filter projects based on search query
  useEffect(() => {
    const handleSearch = (event) => {
      const query = event.detail;
      setSearchQuery(query);
    };

    window.addEventListener('dashboardSearch', handleSearch);

    return () => {
      window.removeEventListener('dashboardSearch', handleSearch);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

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

  const getStatusColor = (status) => {
    const colors = {
      "active": "bg-blue-100 text-blue-800 border-blue-200",
      "completed": "bg-green-100 text-green-800 border-green-200",
      "pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusLabel = (status) => {
    const labels = {
      "active": "In Progress",
      "completed": "Completed",
      "pending": "Pending"
    };
    return labels[status] || status;
  };

  return (
    <FreelancerLayout>
      <div className="p-6 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user.firstName}!</h1>
                <p className="text-orange-100 text-lg opacity-90">
                  Here's your freelance business overview and recent activity.
                </p>
                <div className="mt-4 flex items-center gap-6">
                  <div className="text-orange-100">
                    <span className="text-2xl font-bold">${earnings.thisMonth}</span>
                    <p className="text-sm">This Month</p>
                  </div>
                  <div className="text-orange-100">
                    <span className="text-2xl font-bold">{projects.filter(p => p.status === 'active').length}</span>
                    <p className="text-sm">Active Projects</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => navigate("/freelancer/projects")}
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                + Browse Projects
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                    <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                  </div>
                  <div className={`text-2xl font-bold text-${stat.color}-600`}>
                    {stat.value}
                  </div>
                </div>
                <h3 className="text-gray-600 font-medium text-sm uppercase tracking-wide">
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    onClick={() => navigate(action.href)}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block w-full text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-${action.color}-50 group-hover:bg-${action.color}-100 transition-colors`}
                      >
                        <div
                          className={`text-${action.color}-600 group-hover:text-${action.color}-700`}
                        >
                          {action.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                          {action.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {action.description}
                        </p>
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Projects */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Active Projects</h2>
                <button
                  onClick={() => navigate("/freelancer/projects")}
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>View All</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {filteredProjects.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                    <p className="text-gray-500 mb-4">Start browsing available projects to begin your freelance journey.</p>
                    <button
                      onClick={() => navigate("/freelancer/projects")}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Browse Projects
                    </button>
                  </div>
                ) : (
                  filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-bold text-gray-900 text-lg">
                              {project.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                project.status
                              )}`}
                            >
                              {getStatusLabel(project.status)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <span>Client: {project.client}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                              </svg>
                              <span>Earnings: ${project.earnings}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {project.status === 'active' && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                              <p className="text-xs text-gray-500 mt-1">{project.progress}% Complete</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default FreelancerDashboard;
