import api from './index.js';

// Generic projects API service
export const projectsService = {
  // Client-specific
  getClientProjects: async () => api.get('/projects/client'),

  // Freelancer/global
  getAllProjects: async (params = {}) => api.get('/projects/all', { params }),

  createProject: async (projectData) => api.post('/projects', projectData),

  getProjectById: async (projectId) => api.get(`/projects/${projectId}`),

  updateProject: async (projectId, payload) => api.put(`/projects/${projectId}`, payload),
};
