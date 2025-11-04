// TEMPORARY: Development-only mock auth utilities
// TODO: REMOVE BEFORE PRODUCTION DEPLOYMENT

const MOCK_USERS = {
  freelancer: {
    id: 'test-freelancer-123',
    firstName: 'Test',
    lastName: 'Freelancer',
    email: 'test.freelancer@example.com',
    role: 'freelancer',
    createdAt: '2024-01-01T00:00:00.000Z',
    skills: ['React', 'Node.js', 'TypeScript'],
    hourlyRate: 45,
    profileCompleted: true,
  },
  client: {
    id: 'test-client-456',
    firstName: 'Test',
    lastName: 'Client',
    email: 'test.client@example.com',
    role: 'client',
    createdAt: '2024-01-01T00:00:00.000Z',
    company: 'Test Company Inc.',
    profileCompleted: true,
  }
};

const MOCK_JWT = {
  freelancer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LWZyZWVsYW5jZXItMTIzIiwicm9sZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3MDk4NzY4MDAsImV4cCI6MTcxMDQ4MTYwMH0.mock-signature',
  client: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LWNsaWVudC00NTYiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzA5ODc2ODAwLCJleHAiOjE3MTA0ODE2MDB9.mock-signature'
};

export const loginAsMockUser = (type = 'freelancer') => {
  if (!import.meta.env.DEV) {
    console.warn('Mock login attempted in production!');
    return;
  }

  const mockUser = MOCK_USERS[type];
  const mockToken = MOCK_JWT[type];

  // Store mock auth data
  localStorage.setItem('authToken', mockToken);
  localStorage.setItem('user', JSON.stringify(mockUser));
  localStorage.setItem('role', mockUser.role);

  // Return mock data for immediate use
  return {
    user: mockUser,
    token: mockToken
  };
};

export const isMockUser = (userId) => {
  return userId?.startsWith('test-') || false;
};

// Add warning to console when mock auth is active
if (import.meta.env.DEV) {
  const style = 'background: #FDE68A; color: #92400E; padding: 2px 4px; border-radius: 2px;';
  console.info('%c[DEV] Mock auth utilities loaded. Remember to remove before production!', style);
}