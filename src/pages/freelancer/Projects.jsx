import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FreelancerLayout from '../../components/layouts/FreelancerLayout';

const FreelancerProjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterBudget, setFilterBudget] = useState('all');

  useEffect(() => {
    // Mock projects data
    const mockProjects = [
      {
        id: 1,
        title: "E-commerce Website Development",
        description: "Build a modern e-commerce platform with React and Node.js",
        budget: 5000,
        category: "Web Development",
        client: "TechCorp Inc.",
        postedDate: "2024-01-15",
        deadline: "2024-03-15",
        skills: ["React", "Node.js", "MongoDB"],
        proposals: 12,
        status: "open"
      },
      {
        id: 2,
        title: "Mobile App UI/UX Design",
        description: "Design a user-friendly mobile app interface for fitness tracking",
        budget: 3000,
        category: "Design",
        client: "FitLife Solutions",
        postedDate: "2024-01-20",
        deadline: "2024-02-28",
        skills: ["Figma", "UI/UX", "Mobile Design"],
        proposals: 8,
        status: "open"
      }
    ];
    
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesBudget = filterBudget === 'all' || 
                         (filterBudget === 'low' && project.budget < 2000) ||
                         (filterBudget === 'medium' && project.budget >= 2000 && project.budget < 5000) ||
                         (filterBudget === 'high' && project.budget >= 5000);
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const handleSubmitProposal = (projectId) => {
    navigate(`/freelancer/projects/${projectId}/proposal`);
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
            Browse Projects
          </h1>
          <p className="text-gray-600">
            Find exciting opportunities that match your skills
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Projects
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Writing">Writing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                value={filterBudget}
                onChange={(e) => setFilterBudget(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Budgets</option>
                <option value="low">Under $2,000</option>
                <option value="medium">$2,000 - $5,000</option>
                <option value="high">$5,000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Budget:</span>
                        <div className="text-lg font-bold text-green-600">${project.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="font-medium">Client:</span>
                        <div className="text-gray-900">{project.client}</div>
                      </div>
                      <div>
                        <span className="font-medium">Deadline:</span>
                        <div className="text-gray-900">{new Date(project.deadline).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="font-medium">Proposals:</span>
                        <div className="text-gray-900">{project.proposals} submitted</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex flex-col gap-2">
                    <button
                      onClick={() => handleSubmitProposal(project.id)}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Submit Proposal
                    </button>
                    <button
                      onClick={() => navigate(`/freelancer/projects/${project.id}`)}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      View Details
                    </button>
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

export default FreelancerProjects;