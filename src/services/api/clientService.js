import api from './index.js';

// Client-specific API calls
export const clientService = {
  getDashboardData: async () => {
    // Implement get dashboard data API call
    return api.get('/client/dashboard');
  },
  getProjects: async () => {
    // Legacy client-specific endpoint (if supported)
    return api.get('/client/projects');
  },
  getClientProjects: async () => {
    // Standardized endpoint per backend spec
    return api.get('/projects/client');
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
    // Standardized create project API call
    return api.post('/projects', projectData);
  },
  updateProject: async (projectId, projectData) => {
    // Implement update project API call
    return api.put(`/client/projects/${projectId}`, projectData);
  },
};
