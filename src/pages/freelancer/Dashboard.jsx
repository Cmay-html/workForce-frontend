import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import FreelancerLayout from "../../components/layouts/FreelancerLayout";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [earnings, setEarnings] = useState({ thisMonth: 0, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Enhanced stats with better visual indicators
  const stats = [
    {
      value: projects.filter(p => p.status === 'active').length.toString(),
      label: "Active Projects",
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      change: "+2 this week",
      changeType: "positive",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      value: proposals.filter(p => p.status === 'pending').length.toString(),
      label: "Pending Proposals",
      color: "amber",
      bgGradient: "from-amber-500 to-orange-500",
      change: "+3 today",
      changeType: "positive",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      value: projects.filter(p => p.status === 'completed').length.toString(),
      label: "Completed Projects",
      color: "emerald",
      bgGradient: "from-emerald-500 to-green-600",
      change: "+1 this month",
      changeType: "positive",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      value: `$${earnings.total.toLocaleString()}`,
      label: "Total Earnings",
      color: "purple",
      bgGradient: "from-purple-500 to-indigo-600",
      change: "+$1,200 this month",
      changeType: "positive",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      title: "Browse Projects",
      description: "Discover new opportunities",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      href: "/freelancer/projects",
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "from-blue-600 to-blue-700",
    },
    {
      title: "Submit Proposal",
      description: "Apply to new projects",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: "/freelancer/proposals",
      gradient: "from-emerald-500 to-green-600",
      hoverGradient: "from-emerald-600 to-green-700",
    },
    {
      title: "Update Portfolio",
      description: "Showcase your best work",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      href: "/freelancer/profile",
      gradient: "from-purple-500 to-indigo-600",
      hoverGradient: "from-purple-600 to-indigo-700",
    },
    {
      title: "Track Payments",
      description: "Monitor your earnings",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: "/freelancer/payments",
      gradient: "from-amber-500 to-orange-600",
      hoverGradient: "from-amber-600 to-orange-700",
    },
  ];

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
          deadline: "2024-02-15",
          priority: "high",
          description: "Building a modern e-commerce platform with React and Node.js. Features include user authentication, payment processing, and inventory management."
        },
        {
          id: 2,
          title: "Mobile App UI/UX Design",
          status: "completed",
          earnings: 1800,
          client: "StartupXYZ",
          progress: 100,
          deadline: "2024-01-20",
          priority: "medium",
          description: "Designed a complete mobile app interface for a fitness tracking application with modern UI components and user-friendly navigation."
        },
        {
          id: 3,
          title: "WordPress Blog Setup",
          status: "active",
          earnings: 800,
          client: "BlogCorp",
          progress: 40,
          deadline: "2024-02-28",
          priority: "low",
          description: "Setting up a professional WordPress blog with custom theme, SEO optimization, and content management system."
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
          status: "pending",
          submittedDate: new Date(Date.now() - 86400000).toISOString(),
          budget: 500
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
          amount: 600,
          timestamp: new Date(Date.now() - 7200000).toISOString()
        }
      ];

      setProjects(mockProjects);
      setProposals(mockProposals);
      setRecentActivity(mockActivity);
      setEarnings({ thisMonth: 2400, total: 8500 });
    }
  }, [user]);

  // Filter projects based on search query
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-orange-200"></div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-orange-600 absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status) => {
    const colors = {
      "active": "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      "completed": "bg-gradient-to-r from-emerald-500 to-green-600 text-white",
      "pending": "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "high": "bg-red-100 text-red-800 border-red-200",
      "medium": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "low": "bg-green-100 text-green-800 border-green-200",
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-200";
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Enhanced Welcome Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
              <div className="relative p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-2xl font-bold text-white">
                          {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                          Welcome back, {user.firstName}! 👋
                        </h1>
                        <p className="text-orange-100 text-lg opacity-90">
                          Ready to take on new challenges and grow your freelance business?
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                        <div className="text-3xl font-bold text-white">${earnings.thisMonth.toLocaleString()}</div>
                        <div className="text-orange-100 text-sm">This Month</div>
                      </div>
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                        <div className="text-3xl font-bold text-white">{projects.filter(p => p.status === 'active').length}</div>
                        <div className="text-orange-100 text-sm">Active Projects</div>
                      </div>
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                        <div className="text-3xl font-bold text-white">{proposals.filter(p => p.status === 'pending').length}</div>
                        <div className="text-orange-100 text-sm">Pending Proposals</div>
                      </div>
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                        <div className="text-3xl font-bold text-white">4.9⭐</div>
                        <div className="text-orange-100 text-sm">Rating</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => navigate("/freelancer/projects")}
                      className="group bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3"
                    >
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Browse Projects
                    </button>
                    <button 
                      onClick={() => navigate("/freelancer/profile")}
                      className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bgGradient} shadow-lg`}>
                        <div className="text-white">{stat.icon}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {stat.change}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wider">
                      {stat.label}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Enhanced Quick Actions */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    Quick Actions
                  </h2>
                  <div className="space-y-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={action.title}
                        onClick={() => navigate(action.href)}
                        className={`group w-full bg-gradient-to-r ${action.gradient} hover:${action.hoverGradient} text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                            {action.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-bold text-lg mb-1">
                              {action.title}
                            </h3>
                            <p className="text-white text-opacity-80 text-sm">
                              {action.description}
                            </p>
                          </div>
                          <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Active Projects */}
              <div className="xl:col-span-3">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                      </div>
                      My Active Projects
                    </h2>
                    <button
                      onClick={() => navigate("/freelancer/projects")}
                      className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      <span>View All</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {filteredProjects.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-500 mb-8">Start browsing available projects to begin your freelance journey.</p>
                        <button
                          onClick={() => navigate("/freelancer/projects")}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Browse Projects
                        </button>
                      </div>
                    ) : (
                      filteredProjects.map((project, index) => (
                        <div
                          key={project.id}
                          className="group bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-orange-200"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-4">
                                <h3 className="font-bold text-gray-900 text-xl">
                                  {project.title}
                                </h3>
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                                  {getStatusLabel(project.status)}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                                  {project.priority} priority
                                </span>
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {project.description}
                              </p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  <span className="font-medium">Client: {project.client}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                  <span className="font-medium">Earnings: ${project.earnings.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span className="font-medium">Due: {new Date(project.deadline).toLocaleDateString()}</span>
                                </div>
                              </div>
                              
                              {project.status === 'active' && (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Progress</span>
                                    <span className="text-sm font-bold text-blue-600">{project.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
                                      style={{ width: `${project.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <button className="p-3 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 group-hover:scale-110">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 group-hover:scale-110">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </button>
                              <button className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group-hover:scale-110">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default FreelancerDashboard;
