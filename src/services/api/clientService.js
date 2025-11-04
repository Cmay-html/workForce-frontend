import api from './index.js';

// Client-specific API calls
export const clientService = {
  getDashboardData: async () => {
    // Implement get dashboard data API call
    return api.get('/client/dashboard');
  },
  getProjects: async () => {
    // Implement get projects API call
    return api.get('/client/projects');
  },
  getMilestones: async () => {
    // Implement get milestones API call
    return api.get('/client/milestones');
  },
  getReviews: async () => {
    // Implement get reviews API call
    return api.get('/client/reviews');
  },
  getFreelancers: async (filters = {}) => {
    // Implement get freelancers API call with optional filters
    return api.get('/freelancers', { params: filters });
  },
  createProject: async (projectData) => {
    // Implement create project API call
    return api.post('/client/projects', projectData);
  },
  updateProject: async (projectId, projectData) => {
    // Implement update project API call
    return api.put(`/client/projects/${projectId}`, projectData);
  },
};
