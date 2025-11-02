import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navigation = () => {
  const { user, isClient, isFreelancer, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-primary-600">WorkForceFlow</Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {isClient && (
              <>
                <Link to="/client/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/client/projects" className="text-gray-700 hover:text-primary-600 transition-colors">
                  My Projects
                </Link>
                <Link to="/client/projects/create" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Create Project
                </Link>
                <Link to="/freelancers" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Browse Freelancers
                </Link>
              </>
            )}

            {isFreelancer && (
              <>
                <Link to="/freelancer/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/freelancer/projects" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Find Work
                </Link>
                <Link to="/freelancer/proposals" className="text-gray-700 hover:text-primary-600 transition-colors">
                  My Proposals
                </Link>
                <Link to="/freelancer/active-projects" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Active Projects
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              {user?.firstName} ({user?.role})
            </span>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  logout();
                  window.location.href = '/login';
                }
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;