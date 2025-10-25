import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/admin'; // Placeholder URL, not used
const api = axios.create({ baseURL: API_BASE });

// Mock data
const mockUsers = {
  data: {
    users: [
      { id: 1, email: 'admin@example.com', role: 'admin' },
      { id: 2, email: 'client@example.com', role: 'client' },
      { id: 3, email: 'freelancer@example.com', role: 'freelancer' },
    ],
    total: 3,
  },
};

const mockAnalytics = {
  data: {
    total_users: 10,
    ongoing_projects: 5,
    revenue: 500.00,
  },
};

api.interceptors.request.use(config => {
  const token = 'mock-token'; // Simulate JWT token
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Mock API calls
export const getUsers = (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const perPage = 2;
      const start = (page - 1) * perPage;
      const paginatedUsers = mockUsers.data.users.slice(start, start + perPage);
      resolve({
        data: {
          users: paginatedUsers,
          total: mockUsers.data.total,
        },
      });
    }, 500);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUsers.data.users = mockUsers.data.users.filter(user => user.id !== id);
      mockUsers.data.total = mockUsers.data.users.length;
      resolve({ data: { message: 'User deleted' } });
    }, 500);
  });
};

export const getAnalytics = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAnalytics), 500);
  });
};

export const resolveDispute = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { message: 'Dispute resolved' } }), 500);
  });
};

export default api; // Default export is the axios instance, named exports are the functions