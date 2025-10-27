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
import ProjectProposals from "./components/client/Projects/ProjectProposals";
import MilestonesOverviewPage from "./components/client/Milestones/index";
import FreelancersList from "./components/client/FreelancersList";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
        Loading...
      </div>
    );
  }

  return isAuthenticated && isClient ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

// Freelancer Route component (requires freelancer role)
const FreelancerRoute = ({ children }) => {
  const { isAuthenticated, isFreelancer, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return isAuthenticated && isFreelancer ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

// Public Route component (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

// Component to handle root redirect based on auth status
const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
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

            {/* Client Dashboard - Main dashboard route */}
            <Route
              path="/client/dashboard"
              element={
                <ClientRoute>
                  <ClientDashboardPage />
                </ClientRoute>
              }
            />
            <Route
              path="/dashboard"
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
                <ClientRoute>
                  <ChatPage />
                </ClientRoute>
              }
            />

            {/* Freelancer Routes */}
            <Route
              path="/freelancer/dashboard"
              element={
                <FreelancerRoute>
                  <FreelancerDashboard />
                </FreelancerRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <FreelancerRoute>
                  <FreelancerDashboard />
                </FreelancerRoute>
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
            <Route
              path="/freelancer/payments"
              element={
                <FreelancerRoute>
                  <PaymentTracking />
                </FreelancerRoute>
              }
            />
            <Route
              path="/freelancer/profile"
              element={
                <FreelancerRoute>
                  <ProfilePortfolio />
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
