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
import LandingPage from "./pages/LandingPage";
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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import AdminLogin from './pages/admin/AdminLogin';

// Protected Route component (requires authentication)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Admin Route component (requires admin role)
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!isAdmin && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Client Route component (requires client role)
const ClientRoute = ({ children }) => {
  const { isAuthenticated, isClient, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect based on role
    return role === 'freelancer' ? (
      <Navigate to="/freelancer/dashboard" replace />
    ) : (
      <Navigate to="/client/dashboard" replace />
    );
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

            {/* Admin routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
            <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

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

            {/* Admin Routes */}
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <AnalyticsDashboard />
                </AdminRoute>
              }
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
            <Route
              path="/freelancer/projects"
              element={
                <FreelancerRoute>
                  <FreelancerProjectList />
                </FreelancerRoute>
              }
            />
            <Route
              path="/freelancer/projects/:projectId/propose"
              element={
                <FreelancerRoute>
                  <ProjectProposalForm />
                </FreelancerRoute>
              }
            />
            <Route
              path="/freelancer/proposals"
              element={
                <FreelancerRoute>
                  <FreelancerProposals />
                </FreelancerRoute>
              }
            />
            <Route
              path="/freelancer/active-projects"
              element={
                <FreelancerRoute>
                  <ActiveProjects />
                </FreelancerRoute>
              }
            />
            <Route
              path="/freelancer/projects/:projectId/milestones"
              element={
                <FreelancerRoute>
                  <MilestoneSubmission />
                </FreelancerRoute>
              }
            />
            <Route
              path="/freelancer/time-tracking"
              element={
                <FreelancerRoute>
                  <div className="max-w-6xl mx-auto py-8">
                    <h1 className="text-3xl font-bold text-gray-800">Time Tracking</h1>
                    <p className="text-gray-600 mt-2">Track your work hours and manage time entries</p>
                    <div className="bg-white rounded-lg shadow-md p-8 mt-6 text-center">
                      <p className="text-gray-500">Time tracking feature coming soon...</p>
                    </div>
                  </div>
                </FreelancerRoute>
              }
            />

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

            {/* Freelancer Profile Route */}
            <Route
              path="/freelancer/profile"
              element={
                <FreelancerRoute>
                  <ProfilePortfolio />
                </FreelancerRoute>
              }
            />

            {/* Freelancer Payments Route */}
            <Route
              path="/freelancer/payments"
              element={
                <FreelancerRoute>
                  <PaymentTracking />
                </FreelancerRoute>
              }
            />

            {/* Freelancers Browse Route */}
            <Route
              path="/freelancers"
              element={
                <ClientRoute>
                  <FreelancersList />
                </ClientRoute>
              }
            />

            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Privacy Policy and Terms of Service */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* Smart root redirect for authenticated users */}
            <Route path="/dashboard" element={<RootRedirect />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    );
  }

export default App;
