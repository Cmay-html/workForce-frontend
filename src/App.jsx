import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import ClientDashboard from "./pages/client/Dashboard";
import AuthForm from "./components/shared/auth/AuthForm";
import DashboardLayout from "./components/shared/dashboard/DashboardLayout";
import ClientDashboardPage from "./pages/client/Dashboard";
import ClientProjectsPage from "./pages/client/Projects/index";
import ProjectMilestonesPage from "./pages/client/Milestones/[projectId]";
import ProjectEditForm from "./components/client/Projects/ProjectEditForm";
import ClientProfileForm from "./components/client/Profile/ClientProfileForm";
import ClientSettingsForm from "./components/client/Settings/ClientSettingsForm";
import CreateProjectPage from "./pages/client/Projects/create";
import ProjectDetailsPage from "./pages/client/Projects/[projectId]";
import CreateReviewPage from "./pages/client/reviews/create";
import ChatPage from "./pages/shared/ChatPage";
import FreelancerProjectList from "./components/freelancer/Projects/ProjectList";
import ProjectProposalForm from "./components/freelancer/Projects/ProjectProposalForm";
import FreelancerDashboard from "./pages/freelancer/Dashboard";
import FreelancerProposals from "./pages/freelancer/Proposals";
import ActiveProjects from "./pages/freelancer/ActiveProjects";
import MilestoneSubmission from "./pages/freelancer/MilestoneSubmission";
import PaymentTracking from "./pages/freelancer/PaymentTracking";
import ProfilePortfolio from "./pages/freelancer/ProfilePortfolio";
import FreelancerLayout from "./components/layouts/FreelancerLayout";
import ClientLayout from "./components/layouts/ClientLayout";
import EmailVerification from "./components/shared/auth/EmailVerification";
import ProjectProposals from "./components/client/Projects/ProjectProposals";
import MilestonesOverviewPage from "./components/client/Milestones/index";
import FreelancersList from "./components/client/FreelancersList";
import CreateMilestone from "./components/client/Milestones/CreateMilestone";

// Protected Route component (requires authentication)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Client Route component (requires client role)
const ClientRoute = ({ children }) => {
  const { isAuthenticated, isClient, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isClient) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to="/freelancer/dashboard" replace />;
  }

  return children;
};

// Freelancer Route component (requires freelancer role)
const FreelancerRoute = ({ children }) => {
  const { isAuthenticated, isFreelancer, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isFreelancer) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to="/client/dashboard" replace />;
  }

  return children;
};

// Public Route component (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user?.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Smart root redirect based on auth status and role
const RootRedirect = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    const redirectPath = user?.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white" style={{ minWidth: '1024px' }}>
        <Routes>
            {/* Auth routes - only accessible when logged out */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegistrationPage />
                </PublicRoute>
              }
            />

            {/* Alternative auth route using AuthForm component */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthForm />
                </PublicRoute>
              }
            />

            {/* Email Verification Route */}
            <Route
              path="/verify-email"
              element={<EmailVerification />}
            />

            {/* Client Dashboard - Main dashboard route */}
            <Route
              path="/client/dashboard"
              element={
                <ClientRoute>
                  <ClientDashboardPage />
                </ClientRoute>
              }
            />

            {/* Project Management Routes */}
            <Route
              path="/client/projects"
              element={
                <ClientRoute>
                  <ClientProjectsPage />
                </ClientRoute>
              }
            />
            <Route
              path="/client/projects/create"
              element={
                <ClientRoute>
                  <CreateProjectPage />
                </ClientRoute>
              }
            />
            <Route
              path="/client/projects/:projectId"
              element={
                <ClientRoute>
                  <ProjectDetailsPage />
                </ClientRoute>
              }
            />
            <Route
              path="/client/projects/:projectId/edit"
              element={
                <ClientRoute>
                  <ProjectEditForm />
                </ClientRoute>
              }
            />
            <Route
              path="/client/projects/:projectId/proposals"
              element={
                <ClientRoute>
                  <ProjectProposals />
                </ClientRoute>
              }
            />

            {/* Milestone Management Routes */}
            <Route
              path="/client/milestones"
              element={
                <ClientRoute>
                  <MilestonesOverviewPage />
                </ClientRoute>
              }
            />
            <Route
              path="/client/milestones/:projectId"
              element={
                <ClientRoute>
                  <ProjectMilestonesPage />
                </ClientRoute>
              }
            />
            <Route
              path="/client/milestones/:projectId/create"
              element={
                <ClientRoute>
                  <CreateMilestone />
                </ClientRoute>
              }
            />

            {/* Review Management Routes */}
            <Route
              path="/client/reviews/create"
              element={
                <ClientRoute>
                  <CreateReviewPage />
                </ClientRoute>
              }
            />

            {/* Profile & Settings Routes */}
            <Route
              path="/client/profile"
              element={
                <ClientRoute>
                  <ClientProfileForm />
                </ClientRoute>
              }
            />
            <Route
              path="/client/settings"
              element={
                <ClientRoute>
                  <ClientSettingsForm />
                </ClientRoute>
              }
            />


            {/* Project Collaboration Routes */}
            <Route
              path="/projects/:projectId/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            {/* Global Chat Route - accessible from dashboard */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            {/* Freelancer Routes with Nested Layout */}
            <Route
              path="/freelancer"
              element={
                <FreelancerRoute>
                  <FreelancerLayout />
                </FreelancerRoute>
              }
            >
              <Route
                path="dashboard"
                element={<FreelancerDashboard />}
              />
              <Route
                path="projects"
                element={<FreelancerProjectList />}
              />
              <Route
                path="projects/:projectId/propose"
                element={<ProjectProposalForm />}
              />
              <Route
                path="proposals"
                element={<FreelancerProposals />}
              />
              <Route
                path="active-projects"
                element={<ActiveProjects />}
              />
              <Route
                path="projects/:projectId/milestones"
                element={<MilestoneSubmission />}
              />
              <Route
                path="payments"
                element={<PaymentTracking />}
              />
              <Route
                path="profile"
                element={<ProfilePortfolio />}
              />
              <Route
                path="time-tracking"
                element={
                  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                      <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          Time Tracking
                        </h1>
                        <p className="text-gray-600">
                          Track your work hours and manage time entries.
                        </p>
                      </div>
                      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                        <div className="px-4 py-5 sm:px-6 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Time Tracking</h3>
                          <p className="mt-1 text-sm text-gray-500">Time tracking feature coming soon...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </Route>

            {/* Freelancer Dashboard - Alternative route */}
            <Route
              path="/freelancer/dashboard"
              element={
                <FreelancerRoute>
                  <FreelancerLayout />
                </FreelancerRoute>
              }
            >
              <Route index element={<FreelancerDashboard />} />
            </Route>

            {/* Freelancers Browse Route */}
            <Route
              path="/freelancers"
              element={
                <ClientRoute>
                  <FreelancersList />
                </ClientRoute>
              }
            />

            {/* Smart root redirect */}
            <Route path="/" element={<RootRedirect />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
    </AuthProvider>
  );
}

export default App;
