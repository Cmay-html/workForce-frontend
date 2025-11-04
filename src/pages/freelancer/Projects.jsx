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
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const categories = [
    { key: 'all', label: 'All Categories', icon: '🌟' },
    { key: 'web-development', label: 'Web Development', icon: '💻' },
    { key: 'mobile-development', label: 'Mobile Development', icon: '📱' },
    { key: 'design', label: 'Design', icon: '🎨' },
    { key: 'writing', label: 'Content Writing', icon: '✍️' },
    { key: 'marketing', label: 'Digital Marketing', icon: '📈' },
    { key: 'data-science', label: 'Data Science', icon: '📊' },
  ];

  const budgetRanges = [
    { key: 'all', label: 'All Budgets' },
    { key: 'low', label: 'Under $1,000' },
    { key: 'medium', label: '$1,000 - $5,000' },
    { key: 'high', label: '$5,000+' },
  ];

  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        title: "Modern E-commerce Website Development",
        description: "Looking for an experienced developer to build a modern e-commerce platform with React, Node.js, and payment integration. The project includes user authentication, product catalog, shopping cart, and admin dashboard.",
        category: "web-development",
        budget: 4500,
        duration: "2-3 months",
        skillsRequired: ["React", "Node.js", "MongoDB", "Stripe"],
        client: {
          name: "TechCorp Solutions",
          rating: 4.8,
          reviewsCount: 127,
          location: "San Francisco, CA",
          verified: true
        },
        postedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        proposals: 12,
        urgency: "medium",
        featured: true
      },
      {
        id: 2,
        title: "Mobile App UI/UX Design",
        description: "Need a talented designer to create a modern, user-friendly interface for our fitness tracking mobile app. Looking for someone with experience in health/fitness apps.",
        category: "design",
        budget: 2800,
        duration: "1-2 months",
        skillsRequired: ["Figma", "UI/UX Design", "Mobile Design", "Prototyping"],
        client: {
          name: "FitLife Startup",
          rating: 4.9,
          reviewsCount: 89,
          location: "Austin, TX",
          verified: true
        },
        postedDate: new Date(Date.now() - 86400000 * 1).toISOString(),
        proposals: 8,
        urgency: "high",
        featured: false
      },
      {
        id: 3,
        title: "Content Writing for Tech Blog",
        description: "Seeking a skilled technical writer to create engaging blog posts about emerging technologies, AI, and software development trends.",
        category: "writing",
        budget: 1200,
        duration: "1 month",
        skillsRequired: ["Technical Writing", "SEO", "Research", "Technology"],
        client: {
          name: "Digital Insights Media",
          rating: 4.7,
          reviewsCount: 203,
          location: "New York, NY",
          verified: true
        },
        postedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        proposals: 15,
        urgency: "low",
        featured: false
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
                         (filterBudget === 'low' && project.budget < 1000) ||
                         (filterBudget === 'medium' && project.budget >= 1000 && project.budget < 5000) ||
                         (filterBudget === 'high' && project.budget >= 5000);
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate) - new Date(a.postedDate);
      case 'budget-high':
        return b.budget - a.budget;
      case 'budget-low':
        return a.budget - b.budget;
      case 'proposals':
        return a.proposals - b.proposals;
      default:
        return 0;
    }
  });

  const handleSubmitProposal = (projectId) => {
    navigate(`/freelancer/projects/${projectId}/proposal`);
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[urgency] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.key === category);
    return categoryData?.icon || '📁';
  };

  if (loading) {
    return (
      <FreelancerLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-200 mx-auto"></div>
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-orange-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Projects</h3>
            <p className="text-gray-500">Finding the best opportunities for you...</p>
          </div>
        </div>
      </FreelancerLayout>
    );
  }

  return (
    <FreelancerLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Enhanced Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
              <div className="relative p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-4">
                      Discover Amazing Projects 🚀
                    </h1>
                    <p className="text-blue-100 text-lg opacity-90 mb-6">
                      Find exciting opportunities that match your skills and grow your freelance career
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                        <div className="text-2xl font-bold text-white">{projects.length}</div>
                        <div className="text-blue-100 text-sm">Available Projects</div>
                      </div>
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                        <div className="text-2xl font-bold text-white">{categories.length - 1}</div>
                        <div className="text-blue-100 text-sm">Categories</div>
                      </div>
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                        <div className="text-2xl font-bold text-white">24/7</div>
                        <div className="text-blue-100 text-sm">New Opportunities</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => navigate("/freelancer/dashboard")}
                      className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h2a2 2 0 012 2v2H8V5z" />
                      </svg>
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Search & Filter Bar - Unique Feature */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by title, skills..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="design">Design</option>
                    <option value="writing">Writing</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select
                    value={filterBudget}
                    onChange={(e) => setFilterBudget(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">Any Budget</option>
                    <option value="0-1000">$0 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">$10,000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="budget-high">Highest Budget</option>
                    <option value="budget-low">Lowest Budget</option>
                    <option value="proposals">Fewest Proposals</option>
                  </select>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">{sortedProjects.length} projects found</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sortedProjects.length} Projects Found
                </h2>
                <p className="text-gray-600 mt-1">
                  {filterCategory !== 'all' && `in ${categories.find(c => c.key === filterCategory)?.label}`}
                </p>
              </div>
            </div>

            {/* Projects Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : 'space-y-6'}>
              {sortedProjects.length === 0 ? (
                <div className="col-span-full bg-white rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">No projects found</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Try adjusting your search criteria or check back later for new opportunities that match your skills.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterCategory('all');
                      setFilterBudget('all');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                sortedProjects.map((project) => (
                  <div key={project.id} className="group bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {project.featured && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 text-sm font-semibold">
                        ⭐ Featured Project
                      </div>
                    )}
                    
                    <div className="p-8">
                      {/* Project Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {project.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {project.description}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(project.urgency)}`}>
                          {project.urgency} priority
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.skillsRequired.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="font-semibold text-gray-900">${project.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600">{project.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gray-600">{project.proposals} proposals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-600">{new Date(project.postedDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {project.client.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{project.client.name}</span>
                              {project.client.verified && (
                                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>⭐ {project.client.rating}</span>
                              <span>•</span>
                              <span>{project.client.reviewsCount} reviews</span>
                              <span>•</span>
                              <span>{project.client.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleSubmitProposal(project.id)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Submit Proposal
                        </button>
                        <button className="px-6 py-4 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl font-semibold transition-all duration-200 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          Save
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
    </FreelancerLayout>
  );
};

export default FreelancerProjects;
