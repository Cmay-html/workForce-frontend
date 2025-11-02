
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Navbar from "../../shared/dashboard/Navbar";

const FreelancerProjectList = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Filter projects based on search query from navbar
  useEffect(() => {
    const handleSearch = (event) => {
      const query = event.detail;
      if (query === 'all' || query.trim() === '') {
        setFilteredProjects(projects);
      } else if (query === 'projects') {
        setFilteredProjects(projects);
      } else if (query === 'milestones') {
        // No milestones on this page, show all
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter(project =>
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.category.toLowerCase().includes(query.toLowerCase()) ||
          project.client.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProjects(filtered);
      }
    };

    window.addEventListener('dashboardSearch', handleSearch);

    return () => {
      window.removeEventListener('dashboardSearch', handleSearch);
    };
  }, [projects]);

  // Categories for filtering
  const categories = ["All", "Web Development", "Mobile Development", "Design", "Content Writing", "Data Science", "DevOps"];

  useEffect(() => {
    // TODO: Replace with actual API call to fetch projects
    const fetchProjects = async () => {
      try {
        // const response = await api.get('/freelancer/projects');
        // setProjects(response.data);
        setProjects([]); // Empty state until API is implemented
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'budget-high':
          return b.budget - a.budget;
        case 'budget-low':
          return a.budget - b.budget;
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'newest':
        default:
          return new Date(b.postedDate) - new Date(a.postedDate);
      }
    });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('userProjects');
    localStorage.removeItem('proposals');
    navigate('/login');
  };

  if (loading || loadingProjects) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex" style={{ minWidth: '100%' }}>
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 h-full z-10">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="text-xl font-bold text-orange-600">WorkForceFlow</span>
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
          <ul className="space-y-1">
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
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left bg-orange-50 text-orange-700 border-r-2 border-orange-700">
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
              onClick={() => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                navigate('/login');
              }}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200 ease-in-out"
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
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 fixed top-0 right-0 left-64 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
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
        <main className="flex-1 bg-gray-50 overflow-auto pt-20">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Browse Projects
                </h1>
                <p className="text-gray-600">
                  Find and apply for exciting freelance opportunities.
                </p>
              </div>

              {/* Filters and Sorting */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Category:</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="newest">Newest</option>
                      <option value="budget-high">Budget: High to Low</option>
                      <option value="budget-low">Budget: Low to High</option>
                      <option value="deadline">Deadline</option>
                    </select>
                  </div>

                  <div className="text-sm text-gray-600 ml-auto">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
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
                      <span className="text-lg font-bold text-gray-900">${project.budget.toLocaleString()}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="text-xs text-gray-500">+{project.skills.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>Posted: {new Date(project.postedDate).toLocaleDateString()}</span>
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">Client: <span className="font-medium">{project.client}</span></span>
                    </div>

                    <button
                      onClick={() => navigate(`/freelancer/projects/${project.id}/propose`)}
                      className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Proposal
                    </button>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
                </div>
              )}
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProjectList;
