# Manual Test Cases for Dashboard Routing

## Test Environment Setup
- Browser: Chrome/Firefox/Safari (latest versions)
- Clear cookies and localStorage before testing
- Test with different viewport sizes (desktop, tablet, mobile)

---

## 1. Route Testing

### 1.1 Public Routes (Unauthenticated)

#### Test Case: TC-RT-001 - Landing Page Access
**Objective:** Verify landing page is accessible without authentication

**Prerequisites:** User is not logged in

**Steps:**
1. Navigate to `http://localhost:5173/`
2. Observe page loads

**Expected Result:**
- Landing page loads successfully
- Navigation bar shows "Login" and "Register" buttons
- No authentication errors appear

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-RT-002 - Login Page Access
**Objective:** Verify login page is accessible without authentication

**Steps:**
1. Navigate to `http://localhost:5173/login`
2. Observe page loads

**Expected Result:**
- Login form is displayed
- Email and password fields are visible
- "Register" link is available

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-RT-003 - Registration Page Access
**Objective:** Verify registration page is accessible

**Steps:**
1. Navigate to `http://localhost:5173/register`
2. Click "Register as Client" or "Register as Freelancer"

**Expected Result:**
- Registration form loads
- Role-specific fields are displayed
- Form validation works

**Status:** [ ] Pass [ ] Fail

---

### 1.2 Protected Routes

#### Test Case: TC-RT-004 - Protected Route Redirect
**Objective:** Verify unauthenticated users are redirected from protected routes

**Prerequisites:** User is not logged in

**Steps:**
1. Navigate to `http://localhost:5173/client/dashboard`
2. Observe redirect behavior

**Expected Result:**
- User is redirected to `/login`
- URL changes to login page
- No dashboard content is visible

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-RT-005 - Client Dashboard Access
**Objective:** Verify authenticated client can access client dashboard

**Prerequisites:** 
- User is logged in as client
- Token is stored in localStorage

**Steps:**
1. Login as client (email: test@client.com)
2. Navigate to `/client/dashboard`
3. Observe page content

**Expected Result:**
- Dashboard loads successfully
- Welcome message shows user's first name
- Project cards are displayed
- Navigation sidebar is visible

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-RT-006 - Freelancer Dashboard Access
**Objective:** Verify authenticated freelancer can access freelancer dashboard

**Prerequisites:** User is logged in as freelancer

**Steps:**
1. Login as freelancer (email: test@freelancer.com)
2. Navigate to `/freelancer/dashboard`
3. Observe page content

**Expected Result:**
- Dashboard loads successfully
- Welcome message displays
- Available projects are shown
- Stats cards display correct data
- Quick actions are visible

**Status:** [ ] Pass [ ] Fail

---

### 1.3 Role-Based Access Control

#### Test Case: TC-RT-007 - Client Accessing Freelancer Routes
**Objective:** Verify client is redirected when accessing freelancer routes

**Prerequisites:** User is logged in as client

**Steps:**
1. Navigate to `/freelancer/dashboard`
2. Observe redirect behavior

**Expected Result:**
- User is automatically redirected to `/client/dashboard`
- No freelancer dashboard content is shown
- URL updates to client dashboard

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-RT-008 - Freelancer Accessing Client Routes
**Objective:** Verify freelancer is redirected when accessing client routes

**Prerequisites:** User is logged in as freelancer

**Steps:**
1. Navigate to `/client/dashboard`
2. Observe redirect behavior

**Expected Result:**
- User is automatically redirected to `/freelancer/dashboard`
- No client dashboard content is shown
- URL updates to freelancer dashboard

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-RT-009 - Admin Route Access
**Objective:** Verify only admin users can access admin routes

**Prerequisites:** Test with both admin and non-admin accounts

**Steps:**
1. Login as regular user
2. Navigate to `/admin`
3. Observe result
4. Logout and login as admin
5. Navigate to `/admin`
6. Observe result

**Expected Result:**
- Regular user sees "Unauthorized Access" message
- Admin user can access admin dashboard
- Proper role validation occurs

**Status:** [ ] Pass [ ] Fail

---

### 1.4 404 Handling

#### Test Case: TC-RT-010 - Invalid Route Handling
**Objective:** Verify invalid routes redirect to landing page

**Steps:**
1. Navigate to `/this-route-does-not-exist`
2. Observe redirect behavior

**Expected Result:**
- User is redirected to landing page (`/`)
- No error message is displayed
- Application remains functional

**Status:** [ ] Pass [ ] Fail

---

### 1.5 Query Parameter Handling

#### Test Case: TC-RT-011 - Chat Room Query Parameter
**Objective:** Verify query parameters are preserved in routes

**Prerequisites:** User is logged in

**Steps:**
1. Navigate to `/chat?room=123`
2. Check if room parameter is accessible
3. Verify chat loads with correct room

**Expected Result:**
- Query parameter is preserved in URL
- Chat component receives room ID
- Correct chat room loads

**Status:** [ ] Pass [ ] Fail

---

## 2. Navigation Flow Tests

### 2.1 Homepage Navigation

#### Test Case: TC-NF-001 - Navigation from Landing to Login
**Objective:** Verify user can navigate from landing page to login

**Steps:**
1. Start on landing page
2. Click "Login" button in header
3. Observe navigation

**Expected Result:**
- URL changes to `/login`
- Login page loads
- Navigation is smooth without flickering

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-NF-002 - Navigation from Login to Registration
**Objective:** Verify user can navigate from login to registration

**Steps:**
1. Navigate to login page
2. Click "Don't have an account? Register" link
3. Observe navigation

**Expected Result:**
- URL changes to `/register`
- Registration options page loads
- Login form is no longer visible

**Status:** [ ] Pass [ ] Fail

---

### 2.2 Client Dashboard Navigation

#### Test Case: TC-NF-003 - Client Dashboard Section Navigation
**Objective:** Verify client can navigate between dashboard sections

**Prerequisites:** User is logged in as client

**Steps:**
1. Navigate to `/client/dashboard`
2. Click "Projects" in sidebar
3. Click "Milestones" in sidebar
4. Click "Profile" in sidebar
5. Click "Settings" in sidebar

**Expected Result:**
- Each section loads correctly
- URL updates to reflect current section
- Sidebar remains visible and highlights active section
- No page reloads occur (SPA behavior)

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-NF-004 - Create Project Flow
**Objective:** Verify complete project creation flow

**Prerequisites:** User is logged in as client

**Steps:**
1. Navigate to `/client/dashboard`
2. Click "Create New Project" button
3. Fill in project form
4. Submit form
5. Observe redirect

**Expected Result:**
- Create project page loads
- Form validation works
- On submit, redirects to `/client/dashboard`
- New project appears in project list

**Status:** [ ] Pass [ ] Fail

---

### 2.3 Freelancer Dashboard Navigation

#### Test Case: TC-NF-005 - Browse Projects Navigation
**Objective:** Verify freelancer can browse and navigate to projects

**Prerequisites:** User is logged in as freelancer

**Steps:**
1. Navigate to `/freelancer/dashboard`
2. Click "Browse Projects" quick action
3. Select a project
4. Click "Submit Proposal"

**Expected Result:**
- Projects list page loads
- Individual project details are accessible
- Proposal form loads correctly
- Navigation breadcrumb shows path

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-NF-006 - Proposals Navigation
**Objective:** Verify freelancer can view and manage proposals

**Prerequisites:** User is logged in as freelancer

**Steps:**
1. Navigate to `/freelancer/proposals`
2. Click on a proposal
3. Edit proposal if applicable

**Expected Result:**
- Proposals list loads
- Individual proposal details are viewable
- Edit functionality works
- Status updates reflect immediately

**Status:** [ ] Pass [ ] Fail

---

### 2.4 Deep Linking

#### Test Case: TC-NF-007 - Direct URL to Nested Route
**Objective:** Verify deep links work correctly

**Prerequisites:** User is logged in as client

**Steps:**
1. Copy URL: `/client/projects/123`
2. Open new browser tab
3. Paste URL and navigate

**Expected Result:**
- User remains authenticated
- Specific project page loads
- All nested data is fetched
- Navigation context is preserved

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-NF-008 - Deep Link with Auth Required
**Objective:** Verify deep links redirect to login if not authenticated

**Prerequisites:** User is logged out

**Steps:**
1. Clear cookies/localStorage
2. Navigate directly to `/client/projects/create`

**Expected Result:**
- User is redirected to `/login`
- After login, user is redirected back to original URL (if implemented)
- Authentication flow completes successfully

**Status:** [ ] Pass [ ] Fail

---

### 2.5 Browser Navigation

#### Test Case: TC-NF-009 - Browser Back Button
**Objective:** Verify browser back button works correctly

**Prerequisites:** User is logged in

**Steps:**
1. Navigate to dashboard
2. Click to projects page
3. Click to specific project
4. Press browser back button twice

**Expected Result:**
- First back: returns to projects list
- Second back: returns to dashboard
- State is preserved at each step
- No errors occur

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-NF-010 - Browser Forward Button
**Objective:** Verify browser forward button works correctly

**Steps:**
1. Complete TC-NF-009
2. Press browser forward button twice

**Expected Result:**
- First forward: returns to projects list
- Second forward: returns to specific project
- All data is reloaded correctly
- Navigation is smooth

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-NF-011 - Browser Refresh on Protected Route
**Objective:** Verify page refresh maintains authentication

**Prerequisites:** User is logged in

**Steps:**
1. Navigate to `/client/projects`
2. Press F5 or Ctrl+R to refresh
3. Observe page reload

**Expected Result:**
- User remains authenticated
- Token is read from localStorage
- Page reloads with same content
- No redirect to login occurs

**Status:** [ ] Pass [ ] Fail

---

## 3. Component Integration Tests

### 3.1 Dashboard Widgets

#### Test Case: TC-CI-001 - Stats Cards Data Loading
**Objective:** Verify dashboard stats cards load data correctly

**Prerequisites:** User is logged in with existing projects

**Steps:**
1. Navigate to dashboard
2. Observe stats cards

**Expected Result:**
- All stats cards display numeric data
- Data matches actual project counts
- Loading states are shown during fetch
- Error states are handled gracefully

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-CI-002 - Project Cards Rendering
**Objective:** Verify project cards render with correct data

**Steps:**
1. Navigate to client dashboard
2. Observe project cards

**Expected Result:**
- All projects are displayed
- Each card shows: title, status, deadline, budget
- Status badges have correct colors
- Cards are clickable and navigate to details

**Status:** [ ] Pass [ ] Fail

---

### 3.2 Charts and Graphs

#### Test Case: TC-CI-003 - Analytics Chart Rendering
**Objective:** Verify charts render with sample data

**Prerequisites:** Admin user logged in

**Steps:**
1. Navigate to `/admin/analytics`
2. Observe charts

**Expected Result:**
- Charts load without errors
- Data is visualized correctly
- Hover interactions work
- Legend is displayed
- Charts are responsive

**Status:** [ ] Pass [ ] Fail

---

### 3.3 Data Tables

#### Test Case: TC-CI-004 - Projects Table Pagination
**Objective:** Verify project table pagination works

**Prerequisites:** User has more than 10 projects

**Steps:**
1. Navigate to projects page
2. Scroll to bottom of table
3. Click "Next" page button
4. Observe content change

**Expected Result:**
- Next page loads
- Page indicator updates
- New set of 10 projects displays
- Previous/Next buttons enable/disable correctly

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-CI-005 - Projects Table Sorting
**Objective:** Verify table sorting functionality

**Steps:**
1. Navigate to projects page
2. Click column header "Date Created"
3. Click again to reverse sort

**Expected Result:**
- First click: sorts ascending
- Second click: sorts descending
- Sort indicator (arrow) shows direction
- All rows reorder correctly

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-CI-006 - Projects Table Filtering
**Objective:** Verify table search/filter works

**Steps:**
1. Navigate to projects page
2. Enter search term in filter box
3. Observe results

**Expected Result:**
- Table filters in real-time
- Only matching projects display
- "No results" message if no matches
- Clear filter button resets table

**Status:** [ ] Pass [ ] Fail

---

### 3.4 Forms

#### Test Case: TC-CI-007 - Project Form Validation
**Objective:** Verify create project form validates inputs

**Steps:**
1. Navigate to `/client/projects/create`
2. Submit empty form
3. Fill in only title, submit
4. Fill in invalid data (negative budget)
5. Fill in valid data, submit

**Expected Result:**
- Empty form shows all field errors
- Partial form shows remaining errors
- Invalid data shows specific validation messages
- Valid data submits successfully
- Success message/redirect occurs

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-CI-008 - Form Field Interactions
**Objective:** Verify form fields work correctly

**Steps:**
1. Navigate to any form
2. Test each field type:
   - Text input
   - Textarea
   - Dropdown/Select
   - Date picker
   - File upload
   - Checkbox/Radio

**Expected Result:**
- All field types accept input
- Validation triggers on blur
- Error messages display below fields
- Required fields are marked with asterisk
- Character limits are enforced

**Status:** [ ] Pass [ ] Fail

---

### 3.5 Notifications

#### Test Case: TC-CI-009 - Success Notification Display
**Objective:** Verify success notifications appear and dismiss

**Steps:**
1. Complete an action (e.g., create project)
2. Observe notification
3. Wait or click dismiss

**Expected Result:**
- Success notification appears
- Green checkmark icon is shown
- Message is clear and specific
- Auto-dismisses after 3-5 seconds
- Manual dismiss button works

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-CI-010 - Error Notification Display
**Objective:** Verify error notifications appear correctly

**Steps:**
1. Trigger an error (e.g., submit invalid form)
2. Observe notification
3. Dismiss notification

**Expected Result:**
- Error notification appears
- Red X icon is shown
- Error message is descriptive
- Notification persists until dismissed
- Multiple errors stack properly

**Status:** [ ] Pass [ ] Fail

---

### 3.6 Chat Widget

#### Test Case: TC-CI-011 - Chat Widget Availability
**Objective:** Verify chat widget appears on all pages

**Steps:**
1. Navigate to various pages (dashboard, projects, profile)
2. Observe chat widget presence

**Expected Result:**
- Chat widget is visible in bottom-right corner
- Widget persists across page navigations
- Badge shows unread count (if any)
- Widget doesn't obscure important content

**Status:** [ ] Pass [ ] Fail

---

#### Test Case: TC-CI-012 - Chat Widget Interactions
**Objective:** Verify chat widget opens and functions

**Steps:**
1. Click chat widget icon
2. Type a message
3. Send message
4. Close chat widget

**Expected Result:**
- Chat panel opens
- Message input is functional
- Messages send successfully
- Real-time updates work
- Close button minimizes widget

**Status:** [ ] Pass [ ] Fail

---

## 4. Edge Cases and Error Scenarios

### Test Case: TC-EC-001 - Token Expiration
**Objective:** Verify app handles expired tokens correctly

**Steps:**
1. Login successfully
2. Manually expire token (modify localStorage)
3. Try to navigate to protected route
4. Make API call

**Expected Result:**
- Expired token triggers logout
- User is redirected to login
- Error message explains session expired
- No sensitive data is exposed

**Status:** [ ] Pass [ ] Fail

---

### Test Case: TC-EC-002 - Network Failure During Navigation
**Objective:** Verify app handles network errors gracefully

**Steps:**
1. Navigate to dashboard
2. Disable network (browser dev tools)
3. Try to navigate to projects
4. Re-enable network

**Expected Result:**
- Error message displays
- User can retry action
- App doesn't crash
- Previously loaded data remains visible

**Status:** [ ] Pass [ ] Fail

---

### Test Case: TC-EC-003 - Concurrent Login Sessions
**Objective:** Verify behavior with multiple browser tabs

**Steps:**
1. Login in Tab 1
2. Open Tab 2, navigate to app
3. Logout in Tab 1
4. Try action in Tab 2

**Expected Result:**
- Tab 2 detects logout
- User is redirected to login in Tab 2
- No inconsistent state occurs

**Status:** [ ] Pass [ ] Fail

---

## Test Execution Summary

**Total Test Cases:** 40+
**Passed:** ___
**Failed:** ___
**Blocked:** ___
**Not Executed:** ___

**Test Date:** _______________
**Tester Name:** _______________
**Environment:** _______________

---

## Notes and Observations

[Add any additional notes, bugs found, or observations here]
