# Test Suite Quick Reference

## 🚀 Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended for development)
npm test -- --watch

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test RouteGuards
```

## 📋 Test Files

| File | Purpose | Tests |
|------|---------|-------|
| `RouteGuards.test.jsx` | Route protection & auth guards | 10 |
| `NavigationFlow.test.jsx` | User navigation scenarios | 13 |
| `DashboardIntegration.test.jsx` | Dashboard components & API | 12 |
| `UserFlows.test.jsx` | End-to-end user journeys | 10 |
| **TOTAL** | **Automated Tests** | **45+** |

## 🎯 Test Categories

### Route Testing
```bash
npm test RouteGuards
```
- ✓ Public routes (landing, login, register)
- ✓ Protected routes (dashboards, projects)
- ✓ Role-based access (client, freelancer, admin)
- ✓ 404 handling

### Navigation Testing
```bash
npm test NavigationFlow
```
- ✓ Page-to-page navigation
- ✓ Deep linking
- ✓ Browser back/forward
- ✓ Query parameters

### Dashboard Testing
```bash
npm test DashboardIntegration
```
- ✓ Data loading from API
- ✓ Loading states
- ✓ Error handling
- ✓ Empty states

### User Flow Testing
```bash
npm test UserFlows
```
- ✓ Complete registration flows
- ✓ Authentication persistence
- ✓ Multi-tab sync
- ✓ Token management

## 🛠️ Common Commands

```bash
# Development workflow
npm test -- --watch              # Auto-run on file changes
npm test -- --ui                 # Interactive test UI

# CI/CD workflow
npm test -- --run                # Run once and exit
npm test -- --run --coverage     # With coverage report

# Debugging
npm test -- --reporter=verbose   # Detailed output
npm test -- --no-coverage        # Skip coverage (faster)

# Specific tests
npm test RouteGuards            # Just route guard tests
npm test -- --grep="client"     # Tests matching "client"
```

## 📊 Coverage Report

```bash
# Generate coverage report
npm test -- --coverage

# Coverage is saved to: ./coverage/
# View HTML report: open coverage/index.html
```

**Coverage Targets:**
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

## 🐛 Troubleshooting

### Tests failing?
```bash
# Clear cache and retry
npm test -- --clearCache
npm test -- --run
```

### Import errors?
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Mock not working?
```javascript
// Ensure mock is before component import
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));
```

## 📖 Documentation

- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Complete testing documentation
- **[MANUAL_TEST_CASES.md](./MANUAL_TEST_CASES.md)** - 40+ manual test procedures
- **[TEST_SUMMARY.md](./TEST_SUMMARY.md)** - Detailed test suite overview

## ✅ Pre-Commit Checklist

Before committing code:
- [ ] Run `npm test -- --run` (all tests pass)
- [ ] Run `npm test -- --coverage` (coverage > 80%)
- [ ] Review any new warnings
- [ ] Update test cases for new features

## 🔗 Useful Links

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Quick Tip:** Use `npm test -- --watch` during development for instant feedback! 🚀
