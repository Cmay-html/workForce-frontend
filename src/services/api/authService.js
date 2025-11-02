// Authentication services
export const authService = {
  login: async (credentials) => {
    // Implement login API call
    const apiUrl = import.meta.env.VITE_API_URL;
    return fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  },
  register: async (userData) => {
    // Implement register API call
    const apiUrl = import.meta.env.VITE_API_URL;
    return fetch(`${apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  },
  logout: async () => {
    // Implement logout API call
    const apiUrl = import.meta.env.VITE_API_URL;
    return fetch(`${apiUrl}/api/auth/logout`, {
      method: 'POST',
    });
  },
};
