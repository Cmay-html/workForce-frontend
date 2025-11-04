# E2E Testing Suite - Quick Start Guide

## Overview
This testing suite provides comprehensive coverage for dashboard routing, navigation flows, and component integration.

## Test Structure

```
src/__tests__/
├── routing/
│   ├── RouteGuards.test.jsx          # Route protection and redirects
│   └── NavigationFlow.test.jsx        # User navigation scenarios
├── components/
│   └── DashboardIntegration.test.jsx  # Dashboard component tests
├── e2e/
│   └── UserFlows.test.jsx             # End-to-end user journeys
├── MANUAL_TEST_CASES.md               # Manual test procedures
└── TESTING_GUIDE.md                   # This file
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
# Route guards only
npm test RouteGuards

# Navigation flows
npm test NavigationFlow

# Dashboard integration
npm test DashboardIntegration

# E2E user flows
npm test UserFlows
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Tests in UI Mode (Interactive)
```bash
npm test -- --ui
```

## Test Categories

### 1. Route Guard Tests (`RouteGuards.test.jsx`)

**What it tests:**
- Public routes accessible without auth
- Protected routes redirect to login
- Role-based access control (Client/Freelancer/Admin)
- 404 handling
- Authentication state during navigation

**Key scenarios:**
- ✓ Unauthenticated access to public pages
- ✓ Authenticated users redirected from login/register
- ✓ Protected routes require authentication
- ✓ Clients can't access freelancer routes (and vice versa)
- ✓ Admin routes only for admin users
- ✓ Unknown routes redirect to landing page

**Run:** `npm test RouteGuards`

### 2. Navigation Flow Tests (`NavigationFlow.test.jsx`)

**What it tests:**
- Navigation between pages
- Deep linking functionality
- Browser back/forward buttons
- Query parameter preservation
- Breadcrumb navigation (when implemented)

**Key scenarios:**
- ✓ Navigate from landing to login to dashboard
- ✓ Dashboard section navigation
- ✓ Direct URL access to nested routes
- ✓ Browser history navigation works
- ✓ Authentication state maintained during navigation

**Run:** `npm test NavigationFlow`

### 3. Dashboard Integration Tests (`DashboardIntegration.test.jsx`)

**What it tests:**
- Dashboard data loading
- API error handling
- Stats card rendering
- Project display and filtering
- Quick action buttons

**Key scenarios:**
- ✓ Dashboard loads with user data
- ✓ Projects fetched from API
- ✓ Loading states displayed
- ✓ Error states handled gracefully
- ✓ Empty states show appropriate messages
- ✓ Quick actions navigate correctly

**Run:** `npm test DashboardIntegration`

### 4. E2E User Flow Tests (`UserFlows.test.jsx`)

**What it tests:**
- Complete user journeys
- Session persistence
- Multi-tab behavior
- Error recovery
- Token expiration handling

**Key scenarios:**
- ✓ Full client registration to dashboard flow
- ✓ Full freelancer registration to dashboard flow
- ✓ Role-based route enforcement
- ✓ Authentication persists across refreshes
- ✓ Logout syncs across tabs
- ✓ Invalid token handling

**Run:** `npm test UserFlows`

## Manual Testing

For comprehensive manual testing procedures, see: [`MANUAL_TEST_CASES.md`](./MANUAL_TEST_CASES.md)

**Manual test categories:**
1. Route Testing (11 test cases)
2. Navigation Flow Tests (11 test cases)
3. Component Integration Tests (12 test cases)
4. Edge Cases and Error Scenarios (3 test cases)

**Total:** 40+ manual test cases

## Test Scenarios Covered

### Authentication & Authorization
- [x] Unauthenticated access to public routes
- [x] Authenticated users redirected from public routes
- [x] Protected routes require authentication
- [x] Client role-based access
- [x] Freelancer role-based access
- [x] Admin role-based access
- [x] Cross-role access prevention
- [x] Token expiration handling
- [x] Session persistence

### Navigation & Routing
- [x] Landing page to login navigation
- [x] Login to registration navigation
- [x] Dashboard section navigation
- [x] Deep linking to nested routes
- [x] Browser back button functionality
- [x] Browser forward button functionality
- [x] Page refresh maintains state
- [x] Query parameter preservation
- [x] 404 redirect to landing page

### Dashboard Components
- [x] Dashboard loads user-specific data
- [x] Stats cards display correct counts
- [x] Projects list renders
- [x] Empty state for no projects
- [x] Loading states during API calls
- [x] Error states with retry options
- [x] Quick action buttons functional
- [x] Different response shapes handled

### User Flows
- [x] Complete client registration flow
- [x] Complete freelancer registration flow
- [x] Project creation flow
- [x] Proposal submission flow
- [x] Profile update flow
- [x] Multi-tab synchronization
- [x] Error recovery mechanisms

## Common Issues & Troubleshooting

### Tests Failing Due to Mocks

**Issue:** "Cannot find module" errors

**Solution:**
```bash
# Clear module cache
npm test -- --clearCache

# Restart test runner
```

### Authentication Mock Not Working

**Issue:** Tests show user as unauthenticated when they should be authenticated

**Solution:** Ensure `mockUseAuth` is set correctly before rendering:
```javascript
mockUseAuth.mockReturnValue({
  isAuthenticated: true,
  loading: false,
  user: { id: '1', role: 'client' },
  role: 'client',
  isClient: true,
  isFreelancer: false
});
```

### Async Test Failures

**Issue:** "Unable to find element" in async tests

**Solution:** Use `waitFor` for async assertions:
```javascript
await waitFor(() => {
  expect(screen.getByTestId('dashboard')).toBeInTheDocument();
});
```

### LocalStorage Not Persisting

**Issue:** LocalStorage values lost between tests

**Solution:** Use `beforeEach` to set initial state:
```javascript
beforeEach(() => {
  localStorage.setItem('authToken', 'fake-token');
  localStorage.setItem('userData', JSON.stringify(mockUser));
});
```

## Writing New Tests

### Test File Template

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock dependencies
const mockUseAuth = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));

describe('Feature Name', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should do something', async () => {
    // Arrange: Setup mocks and initial state
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1' }
    });

    // Act: Render component and interact
    render(
      <MemoryRouter>
        <YourComponent />
      </MemoryRouter>
    );

    // Assert: Verify expected behavior
    await waitFor(() => {
      expect(screen.getByText('Expected Text')).toBeInTheDocument();
    });
  });
});
```

### Best Practices

1. **Clear mocks between tests:**
   ```javascript
   beforeEach(() => {
     vi.clearAllMocks();
   });
   ```

2. **Use data-testid for test selection:**
   ```jsx
   <div data-testid="dashboard">...</div>
   ```

3. **Wait for async operations:**
   ```javascript
   await waitFor(() => {
     expect(apiMock).toHaveBeenCalled();
   });
   ```

4. **Mock external dependencies:**
   ```javascript
   vi.mock('../../services/api', () => ({
     api: { get: vi.fn() }
   }));
   ```

5. **Test user interactions:**
   ```javascript
   import userEvent from '@testing-library/user-event';
   
   const user = userEvent.setup();
   await user.click(screen.getByRole('button'));
   ```

## Coverage Goals

Target coverage percentages:
- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

Current coverage:
```bash
npm test -- --coverage
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test -- --run
      - name: Generate coverage
        run: npm test -- --coverage
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Next Steps

1. **Run the test suite:**
   ```bash
   npm test
   ```

2. **Review manual test cases:**
   Open `MANUAL_TEST_CASES.md` and execute manual tests

3. **Check coverage:**
   ```bash
   npm test -- --coverage
   ```

4. **Add missing tests:**
   Identify uncovered areas and write additional tests

5. **Integrate with CI/CD:**
   Add tests to your deployment pipeline

## Contact & Support

For questions or issues with the test suite:
- Review test file comments
- Check vitest documentation
- Consult with team lead

---

**Last Updated:** November 4, 2025
**Test Suite Version:** 1.0.0
