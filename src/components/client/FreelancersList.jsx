import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { clientService } from '../../services/api/clientService';

const FreelancersList = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [freelancers, setFreelancers] = useState([]);
  const [loadingFreelancers, setLoadingFreelancers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    // Skip API call and go directly to mock data to avoid HTML response errors
    setFreelancers([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        skills: ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS'],
        rating: 4.8,
        completedProjects: 25,
        bio: 'Full-stack developer with 5+ years of experience in web development.',
        location: 'New York, USA',
        profileImage: null,
        availability: 'Available'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
        rating: 4.9,
        completedProjects: 32,
        bio: 'Backend developer specializing in Python and cloud solutions.',
        location: 'San Francisco, USA',
        profileImage: null,
        availability: 'Available'
      },
      {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Sketch'],
        rating: 4.7,
        completedProjects: 18,
        bio: 'Creative UI/UX designer with a passion for user-centered design.',
        location: 'Los Angeles, USA',
        profileImage: null,
        availability: 'Busy'
      },
      {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@example.com',
        skills: ['Mobile Development', 'React Native', 'iOS', 'Android'],
        rating: 4.6,
        completedProjects: 22,
        bio: 'Mobile app developer experienced in cross-platform solutions.',
        location: 'Austin, USA',
        profileImage: null,
        availability: 'Available'
      },
      {
        id: 5,
        firstName: 'Alex',
        lastName: 'Chen',
        email: 'alex.chen@example.com',
        skills: ['DevOps', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        rating: 4.9,
        completedProjects: 28,
        bio: 'DevOps engineer with expertise in cloud infrastructure and automation.',
        location: 'Seattle, USA',
        profileImage: null,
        availability: 'Available'
      },
      {
        id: 6,
        firstName: 'Emma',
        lastName: 'Davis',
        email: 'emma.davis@example.com',
        skills: ['Data Science', 'Python', 'Machine Learning', 'TensorFlow', 'SQL'],
        rating: 4.7,
        completedProjects: 20,
        bio: 'Data scientist specializing in machine learning and predictive analytics.',
        location: 'Boston, USA',
        profileImage: null,
        availability: 'Available'
      },
      {
        id: 7,
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@example.com',
        skills: ['Blockchain', 'Solidity', 'Web3', 'Ethereum', 'Smart Contracts'],
        rating: 4.5,
        completedProjects: 15,
        bio: 'Blockchain developer experienced in DeFi and NFT projects.',
        location: 'Miami, USA',
        profileImage: null,
        availability: 'Busy'
      },
      {
        id: 8,
        firstName: 'Lisa',
        lastName: 'Garcia',
        email: 'lisa.garcia@example.com',
        skills: ['QA Testing', 'Selenium', 'Cypress', 'Jest', 'Test Automation'],
        rating: 4.6,
        completedProjects: 35,
        bio: 'Quality assurance engineer with expertise in automated testing.',
        location: 'Denver, USA',
        profileImage: null,
        availability: 'Available'
      }
    ]);
    setLoadingFreelancers(false);
  }, []);

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkills = selectedSkills.length === 0 ||
                         selectedSkills.some(skill => freelancer.skills.includes(skill));

    return matchesSearch && matchesSkills;
  });

  const handleContactFreelancer = (freelancerId) => {
    // Navigate to a chat or contact page
    navigate(`/freelancers/${freelancerId}/contact`);
  };

  const handleViewProfile = (freelancerId) => {
    // Navigate to freelancer profile page
    navigate(`/freelancers/${freelancerId}`);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const allSkills = [...new Set(freelancers.flatMap(f => f.skills))];

  if (loading || loadingFreelancers) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50" style={{ minWidth: '1024px' }}>
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
              Client Account
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">D</span>
                <div className="flex-1">
                  <div className="font-medium">Dashboard</div>
                  <div className="text-xs text-gray-500 mt-0.5">Project overview</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/client/projects')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">P</span>
                <div className="flex-1">
                  <div className="font-medium">Projects</div>
                  <div className="text-xs text-gray-500 mt-0.5">Manage projects</div>
                </div>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left bg-blue-50 text-blue-700 border-r-2 border-blue-700">
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">F</span>
                <div className="flex-1">
                  <div className="font-medium">Freelancers</div>
                  <div className="text-xs text-gray-500 mt-0.5">Browse talent</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/client/milestones')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">M</span>
                <div className="flex-1">
                  <div className="font-medium">Milestones</div>
                  <div className="text-xs text-gray-500 mt-0.5">Review work</div>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search freelancers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500">
                Client
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Browse Freelancers
                </h1>
                <p className="text-gray-600">
                  Find and hire talented freelancers for your projects.
                </p>
              </div>

              {/* Filters */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => {
                        if (selectedSkills.includes(skill)) {
                          setSelectedSkills(selectedSkills.filter(s => s !== skill));
                        } else {
                          setSelectedSkills([...selectedSkills, skill]);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedSkills.includes(skill)
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Freelancers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers.map((freelancer) => (
                  <div key={freelancer.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {freelancer.firstName.charAt(0)}{freelancer.lastName.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {freelancer.firstName} {freelancer.lastName}
                            </h3>
                            <p className="text-sm text-gray-500">{freelancer.location}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getAvailabilityColor(freelancer.availability)}`}>
                          {freelancer.availability}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{freelancer.bio}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {freelancer.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {freelancer.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                            +{freelancer.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm font-medium text-gray-900 ml-1">{freelancer.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({freelancer.completedProjects} projects)</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Milestone-based pricing</div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewProfile(freelancer.id)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => handleContactFreelancer(freelancer.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredFreelancers.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No freelancers found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancersList;