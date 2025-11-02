
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock projects data - replace with actual API call
    const mockProjects = [
      {
        id: 1,
        title: "Website Redesign",
        description: "Complete website redesign with modern UI/UX and responsive design",
        status: "active",
        budget: 5000,
        freelancer: "John Grinder",
        progress: 75,
        deadline: "2024-02-15",
        createdAt: "2024-01-01",
        category: "Web Development",
        proposals: 3,
        milestones: 4
      },
      {
        id: 2,
        title: "Mobile App Development",
        description: "Cross-platform mobile application for iOS and Android",
        status: "pending",
        budget: 12000,
        freelancer: null,
        progress: 0,
        deadline: "2024-03-20",
        createdAt: "2024-01-05",
        category: "Mobile Development",
        proposals: 7,
        milestones: 0
      },
      {
        id: 3,
        title: "E-commerce Platform",
        description: "Full-featured online store with payment integration",
        status: "completed",
        budget: 8000,
        freelancer: "Sarah Mkenya",
        progress: 100,
        deadline: "2024-01-30",
        createdAt: "2023-12-15",
        category: "Web Development",
        proposals: 5,
        milestones: 6
      },
      {
        id: 4,
        title: "Brand Identity Design",
        description: "Complete brand identity including logo, colors, and guidelines",
        status: "draft",
        budget: 2500,
        freelancer: null,
        progress: 0,
        deadline: "2024-02-28",
        createdAt: "2024-01-10",
        category: "Design",
        proposals: 0,
        milestones: 0
      }
    ];

    setProjects(mockProjects);
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{projects.length}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                <dd className="text-lg font-medium text-gray-900">{projects.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{projects.filter(p => p.status === 'active').length}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                <dd className="text-lg font-medium text-gray-900">{projects.filter(p => p.status === 'active').length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{projects.filter(p => p.status === 'completed').length}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                <dd className="text-lg font-medium text-gray-900">{projects.filter(p => p.status === 'completed').length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden rounded-lg p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">${projects.reduce((sum, p) => sum + p.budget, 0)}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Budget</dt>
                <dd className="text-lg font-medium text-gray-900">${projects.reduce((sum, p) => sum + p.budget, 0)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">All Projects</h2>
          <button
            onClick={() => navigate('/client/projects/create')}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            + New Project
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 border-b border-gray-200">
          {[
            { key: 'all', label: 'All Projects', count: projects.length },
            { key: 'active', label: 'Active', count: projects.filter(p => p.status === 'active').length },
            { key: 'pending', label: 'Pending', count: projects.filter(p => p.status === 'pending').length },
            { key: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
            { key: 'draft', label: 'Drafts', count: projects.filter(p => p.status === 'draft').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                filter === tab.key
                  ? 'bg-blue-50 text-primary-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' ? 'Get started by creating your first project.' : `No ${filter} projects found.`}
          </p>
          {filter === 'all' && (
            <div className="mt-6">
              <button
                onClick={() => navigate('/client/projects/create')}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Create New Project
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
