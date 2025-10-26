// Client-specific API calls
export const clientService = {
  getDashboardData: async () => {
    // Implement get dashboard data API call
    return fetch('/api/client/dashboard');
  },
  getProjects: async () => {
    // Implement get projects API call
    return fetch('/api/client/projects');
  },
  getMilestones: async () => {
    // Implement get milestones API call
    return fetch('/api/client/milestones');
  },
  getReviews: async () => {
    // Implement get reviews API call
    return fetch('/api/client/reviews');
  },
};
