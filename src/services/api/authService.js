import api from './index.js';

// Authentication services
export const authService = {
  login: async (credentials) => {
    // Implement login API call
    return api.post('/auth/login', credentials);
  },
  register: async (userData) => {
    // Implement register API call
    return api.post('/auth/register', userData);
  },
  logout: async () => {
    // Implement logout API call
    return api.post('/auth/logout');
  },
};
