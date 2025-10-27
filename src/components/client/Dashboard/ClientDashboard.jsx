// src/components/ClientDashboard.jsx - NEW FILE
import React from "react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's your project overview
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            + New Project
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <Link to="/client/projects/create" className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 text-center block">
            <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Create</div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Create Project</h3>
            <p className="text-gray-600 text-xs md:text-sm">Start a new project</p>
          </Link>
          <Link to="/client/milestones" className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 text-center block">
            <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Review</div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Review Milestones</h3>
            <p className="text-gray-600 text-xs md:text-sm">Approve pending work</p>
          </Link>
          <Link to="/client/projects" className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 text-center block">
            <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Manage</div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Manage Projects</h3>
            <p className="text-gray-600 text-xs md:text-sm">View all your projects</p>
          </Link>
          <Link to="/client/reviews/create" className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 text-center block">
            <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Rate</div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Leave Review</h3>
            <p className="text-gray-600 text-xs md:text-sm">Review freelancers</p>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600 font-medium text-sm md:text-base">Total Projects</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
            <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-gray-600 font-medium text-sm md:text-base">Active Projects</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600 font-medium text-sm md:text-base">Pending Milestones</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border-l-4 border-orange-500 hover:shadow-md transition-shadow">
            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">0</div>
            <div className="text-gray-600 font-medium text-sm md:text-base">Completed Projects</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
