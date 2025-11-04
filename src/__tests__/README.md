# Testing Suite for WorkForce Frontend

> Comprehensive end-to-end testing infrastructure for dashboard routing validation, navigation flows, and component integration.

## 📚 Table of Contents

- [Quick Start](#quick-start)
- [Test Files](#test-files)
- [Documentation](#documentation)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Contributing](#contributing)

## 🚀 Quick Start

```bash
# Install dependencies (if not already done)
npm install

# Run all tests
npm test

# Run in watch mode (recommended for development)
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## 📂 Test Files

### Automated Tests (45+ test cases)

```
__tests__/
├── routing/
│   ├── RouteGuards.test.jsx          # 10 tests - Route protection & auth
│   └── NavigationFlow.test.jsx        # 13 tests - Navigation scenarios
├── components/
│   └── DashboardIntegration.test.jsx  # 12 tests - Dashboard & API integration
└── e2e/
    └── UserFlows.test.jsx             # 10 tests - End-to-end user journeys
```

### Test Coverage

| Category | Tests | Status |
|----------|-------|--------|
| **Route Guards** | 10 | ✅ Implemented |
| **Navigation Flows** | 13 | ✅ Implemented |
| **Dashboard Integration** | 12 | ✅ Implemented |
| **E2E User Flows** | 10 | ✅ Implemented |
| **Manual Test Cases** | 40+ | 📋 Documented |
| **Total** | **85+** | **🎯 Ready** |

## 📖 Documentation

| Document | Purpose | Quick Link |
|----------|---------|------------|
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | Quick command reference & troubleshooting | [Open →](./QUICK_REFERENCE.md) |
| **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** | Complete testing guide & best practices | [Open →](./TESTING_GUIDE.md) |
| **[MANUAL_TEST_CASES.md](./MANUAL_TEST_CASES.md)** | 40+ step-by-step manual test procedures | [Open →](./MANUAL_TEST_CASES.md) |
| **[TEST_SUMMARY.md](./TEST_SUMMARY.md)** | Detailed test suite overview | [Open →](./TEST_SUMMARY.md) |
| **[TEST_RESULTS.md](./TEST_RESULTS.md)** | Test execution logs & tracking | [Open →](./TEST_RESULTS.md) |

### Which Document Should I Read?

- **New to testing?** → Start with [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Want to run tests?** → See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Writing new tests?** → Read [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- **Manual testing?** → Follow [MANUAL_TEST_CASES.md](./MANUAL_TEST_CASES.md)
- **Understanding coverage?** → Check [TEST_SUMMARY.md](./TEST_SUMMARY.md)
- **Tracking results?** → Update [TEST_RESULTS.md](./TEST_RESULTS.md)

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests once
npm test -- --run

# Watch mode (auto-rerun on changes)
npm test -- --watch

# Interactive UI mode
npm test -- --ui

# With coverage report
npm test -- --coverage

# Verbose output
npm test -- --reporter=verbose
```

### Run Specific Tests

```bash
# By file name
npm test RouteGuards
npm test NavigationFlow
npm test DashboardIntegration
npm test UserFlows

# By test name pattern
npm test -- --grep="client"
npm test -- --grep="authentication"
```

### CI/CD Mode

```bash
# Run once with coverage (for CI/CD)
npm test -- --run --coverage --reporter=json
```

## 📊 Test Coverage

### Current Status

```
Test Files:  4 automated test files
Test Cases:  45+ automated tests
             40+ manual test cases
Status:      27 passing | 18 failing (mock adjustments needed)
Coverage:    ~45% (will improve with integration tests)
```

### What's Tested

✅ **Route Protection**
- Public route access
- Protected route redirects
- Role-based access control
- Authentication guards

✅ **Navigation**
- Page-to-page navigation
- Deep linking
- Browser back/forward buttons
- Query parameters

✅ **Dashboard Components**
- Data loading from API
- Loading states
- Error handling
- Empty states
- Stats calculations

✅ **User Flows**
- Complete registration flows
- Authentication persistence
- Session management
- Multi-tab synchronization

### What Needs Manual Testing

📋 **Manual Testing Required**
- Browser compatibility (Chrome, Firefox, Safari)
- Responsive design (mobile, tablet, desktop)
- Performance under load
- Network failure scenarios
- Accessibility (a11y)
- Visual regression

See [MANUAL_TEST_CASES.md](./MANUAL_TEST_CASES.md) for complete procedures.

## 🔧 Configuration

### Vitest Configuration

Located in `/vite.config.js`:

```javascript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/__tests__/setup.js',
}
```

### Test Setup

Located in `/src/__tests__/setup.js`:

```javascript
import '@testing-library/jest-dom'
```

## 🐛 Troubleshooting

### Tests not running?

```bash
# Clear cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Mocks not working?

Ensure mocks are defined **before** imports:

```javascript
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));

import Component from '../../components/Component';
```

### More help?

See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#-troubleshooting) for common issues and solutions.

## 🤝 Contributing

### Adding New Tests

1. **Choose the right location:**
   - Route tests → `routing/`
   - Component tests → `components/`
   - E2E flows → `e2e/`

2. **Follow the template:**
   ```javascript
   import { describe, it, expect, vi, beforeEach } from 'vitest';
   
   describe('Feature Name', () => {
     beforeEach(() => {
       vi.clearAllMocks();
     });
     
     it('should do something', () => {
       // Arrange, Act, Assert
     });
   });
   ```

3. **Update documentation:**
   - Add test count to this README
   - Document in [TEST_SUMMARY.md](./TEST_SUMMARY.md)
   - Add manual cases to [MANUAL_TEST_CASES.md](./MANUAL_TEST_CASES.md) if needed

4. **Run tests:**
   ```bash
   npm test -- --watch
   ```

### Best Practices

- ✅ Use descriptive test names
- ✅ One assertion per test (when possible)
- ✅ Clear arrange-act-assert structure
- ✅ Mock external dependencies
- ✅ Use `data-testid` for element selection
- ✅ Clean up in `afterEach`/`beforeEach`
- ✅ Wait for async operations with `waitFor`

See [TESTING_GUIDE.md](./TESTING_GUIDE.md#writing-new-tests) for detailed guidelines.

## 📈 Next Steps

### Immediate (High Priority)

- [ ] Fix failing tests (18 tests need mock adjustments)
- [ ] Add `data-testid` attributes to components
- [ ] Execute manual test suite
- [ ] Achieve 80%+ code coverage

### Short-term (Medium Priority)

- [ ] Add integration tests with real API
- [ ] Set up CI/CD pipeline with tests
- [ ] Add more component tests
- [ ] Test error boundaries

### Long-term (Lower Priority)

- [ ] Add visual regression tests (Percy/Chromatic)
- [ ] Add performance benchmarks
- [ ] Add E2E tests with Playwright/Cypress
- [ ] Add accessibility tests
- [ ] Add security scanning

## 📞 Support

### Resources

- **Vitest Docs:** https://vitest.dev/
- **React Testing Library:** https://testing-library.com/react
- **Testing Best Practices:** https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

### Getting Help

1. Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for common commands
2. Read [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed guidance
3. Review [TEST_SUMMARY.md](./TEST_SUMMARY.md) for overview
4. Consult team lead for complex issues

## 📝 License

This testing suite is part of the WorkForce Frontend project.

---

**Created:** November 4, 2025  
**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Status:** ✅ Ready for use

**Quick Tip:** Start with `npm test -- --watch` for the best development experience! 🚀
