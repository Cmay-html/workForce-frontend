import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout, isFreelancer, isClient } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-orange-600">
                WorkForce
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isFreelancer && (
                <>
                  <Link
                    to="/freelancer/dashboard"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/freelancer/projects"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
                  >
                    Find Work
                  </Link>
                  <Link
                    to="/freelancer/proposals"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
                  >
                    Proposals
                  </Link>
                </>
              )}

              {isClient && (
                <>
                  <Link
                    to="/client/dashboard"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/client/projects"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
                  >
                    Projects
                  </Link>
                  <Link
                    to="/freelancers"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
                  >
                    Find Freelancers
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={isFreelancer ? "/freelancer/profile" : "/client/profile"}
                  className="text-gray-900 hover:text-orange-600"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-orange-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
