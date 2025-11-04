import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [earnings, setEarnings] = useState({ thisMonth: 0, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (user) {
      // Initialize with mock data
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
          description: "Building a modern e-commerce platform with React and Node.js."
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
          description: "Designed a mobile app interface for a fitness tracking application."
        }
      ];

      setProjects(mockProjects);
      setEarnings({ thisMonth: 2400, total: 8500 });
    }
  }, [user]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
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
                        Ready to take on new challenges?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Projects</p>
                  <h3 className="text-2xl font-bold text-gray-900">{projects.filter(p => p.status === 'active').length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <h3 className="text-2xl font-bold text-gray-900">${earnings.total}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 8V7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredProjects.map(project => (
                <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  {project.progress && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium text-blue-600">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;