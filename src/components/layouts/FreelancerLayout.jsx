import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const FreelancerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActivePage = (path) => {
    if (path === "/freelancer/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userProjects");
    localStorage.removeItem("proposals");
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50" style={{ minWidth: "1024px" }}>
      {/* Sidebar - Fixed */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">
                WorkforceFlow
              </span>
              <div className="text-xs text-gray-500 font-medium">
                Freelancer Portal
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-orange-600">Freelancer Account</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/freelancer/dashboard")}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage("/freelancer/dashboard")
                    ? "bg-orange-50 text-orange-700 border-l-4 border-orange-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActivePage("/freelancer/dashboard")
                      ? "bg-orange-100"
                      : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      isActivePage("/freelancer/dashboard")
                        ? "text-orange-600"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Dashboard</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Business overview
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/freelancer/projects")}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage("/freelancer/projects")
                    ? "bg-orange-50 text-orange-700 border-l-4 border-orange-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActivePage("/freelancer/projects")
                      ? "bg-orange-100"
                      : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      isActivePage("/freelancer/projects")
                        ? "text-orange-600"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Browse Projects</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Find opportunities
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/freelancer/proposals")}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage("/freelancer/proposals")
                    ? "bg-orange-50 text-orange-700 border-l-4 border-orange-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActivePage("/freelancer/proposals")
                      ? "bg-orange-100"
                      : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      isActivePage("/freelancer/proposals")
                        ? "text-orange-600"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">My Proposals</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Track submissions
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/freelancer/active-projects")}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage("/freelancer/active-projects")
                    ? "bg-orange-50 text-orange-700 border-l-4 border-orange-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActivePage("/freelancer/active-projects")
                      ? "bg-orange-100"
                      : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      isActivePage("/freelancer/active-projects")
                        ? "text-orange-600"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Active Projects</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Current work
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/chat")}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage("/chat")
                    ? "bg-orange-50 text-orange-700 border-l-4 border-orange-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActivePage("/chat") ? "bg-orange-100" : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      isActivePage("/chat")
                        ? "text-orange-600"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Messages</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Chat with clients
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/freelancer/payments")}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage("/freelancer/payments")
                    ? "bg-orange-50 text-orange-700 border-l-4 border-orange-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActivePage("/freelancer/payments")
                      ? "bg-orange-100"
                      : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      isActivePage("/freelancer/payments")
                        ? "text-orange-600"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Payments</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Earnings & history
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/freelancer/profile")}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage("/freelancer/profile")
                    ? "bg-orange-50 text-orange-700 border-l-4 border-orange-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActivePage("/freelancer/profile")
                      ? "bg-orange-100"
                      : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      isActivePage("/freelancer/profile")
                        ? "text-orange-600"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Profile</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Portfolio & settings
                  </div>
                </div>
              </button>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-red-100">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">Logout</div>
                <div className="text-xs text-gray-500 mt-0.5">Sign out</div>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area - Adjusted for fixed sidebar */}
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-5">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  {location.pathname === "/freelancer/dashboard" && "Dashboard"}
                  {location.pathname.startsWith("/freelancer/projects") &&
                    "Projects"}
                  {location.pathname.startsWith("/freelancer/proposals") &&
                    "Proposals"}
                  {location.pathname.startsWith("/freelancer/profile") &&
                    "Profile"}
                  {location.pathname.startsWith("/freelancer/payments") &&
                    "Payments"}
                  {location.pathname.startsWith("/chat") && "Messages"}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Welcome, {user?.firstName}
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
};

export default FreelancerLayout;
