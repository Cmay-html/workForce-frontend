import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const ClientLayout = () => {
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/client/dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      description: "Project overview",
    },
    {
      name: "Projects",
      href: "/client/projects",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      description: "Manage projects",
    },
    {
      name: "Messages",
      href: "/client/messages",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      description: "Chat with team",
    },
    {
      name: "Milestones",
      href: "/client/milestones",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      description: "Review work",
    },
    {
      name: "Profile",
      href: "/client/profile",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      description: "Account settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/25">
                  <span className="text-white font-bold text-lg">WFF</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                   WorkForceFlow
                  </h1>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                    Client Portal
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation */}
            <nav className="flex space-x-1 bg-white/50 rounded-2xl p-1 border border-gray-200/50 shadow-sm">
              {navigation.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== "/client/dashboard" &&
                    location.pathname.startsWith(item.href));

                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={`
                      group relative flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105"
                          : "text-gray-600 hover:text-primary-600 hover:bg-white/80 hover:shadow-md"
                      }
                    `}
                  >
                    <div
                      className={`
                      transition-transform duration-300
                      ${
                        isActive
                          ? "transform scale-110"
                          : "group-hover:scale-110"
                      }
                    `}
                    >
                      {item.icon}
                    </div>
                    <span className="font-semibold">{item.name}</span>

                    {/* Tooltip on hover */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50">
                      <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
                        {item.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </nav>

            {/* Enhanced User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/80 rounded-2xl px-3 py-2 border border-gray-200/50 shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-semibold">SJ</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    Sarah Johnson
                  </p>
                  <p className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    Client
                  </p>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/60 mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">KF</span>
              </div>
              <p className="text-sm text-gray-600">
                © 2024 WorkforceFlow. All rights reserved.
              </p>
            </div>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium hover:underline underline-offset-4"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium hover:underline underline-offset-4"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium hover:underline underline-offset-4"
              >
                Support
              </a>
            </div>
          </div>

          {/* Additional footer info */}
          <div className="mt-4 pt-4 border-t border-gray-200/60 text-center">
            <p className="text-xs text-gray-500">
              Built for seamless project management
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
