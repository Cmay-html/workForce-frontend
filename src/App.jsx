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
import Dashboard from "./pages/client/Dashboard";
import AuthForm from "./components/shared/auth/AuthForm";
import DashboardLayout from "./components/shared/dashboard/DashboardLayout";
import ClientDashboardPage from "./pages/client/Dashboard";
import ClientProjectsPage from "./pages/client/Projects/index";
import ProjectMilestonesPage from "./pages/client/Milestones/[projectId]";
import ProjectEditForm from "./components/client/Projects/ProjectEditForm";
import ClientProfileForm from "./components/client/Profile/ClientProfileForm";
import ClientSettingsForm from "./components/client/Settings/ClientSettingsForm";
import CreateProjectPage from "./pages/client/Projects/create";
import CreateReviewPage from "./pages/client/reviews/create";
import FreelancerProjectList from "./components/freelancer/Projects/ProjectList";
import ProjectProposalForm from "./components/freelancer/Projects/ProjectProposalForm";
import ProjectProposals from "./components/client/Projects/ProjectProposals";
import MilestonesOverviewPage from "./components/client/Milestones/index";

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
      <div className="min-h-screen bg-gray-50">
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

            {/* Protected dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-layout"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            />

            {/* Client Routes */}
            <Route
              path="/client/dashboard"
              element={
                <ClientRoute>
                  <ClientDashboardPage />
                </ClientRoute>
              }
            />
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
              path="/client/reviews/create"
              element={
                <ClientRoute>
                  <CreateReviewPage />
                </ClientRoute>
              }
            />
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

            {/* Freelancer Routes */}
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
