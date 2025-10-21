// src/Pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import Card from '../components/UI/Card';

const Dashboard = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.firstName}! Here's your overview.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Team Overview
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Freelancers</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Projects</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Tasks</span>
                <span className="font-semibold">8</span>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Add New Freelancer
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Create Project
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Schedule Meeting
              </button>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New team member added</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Project "Q4 Planning" completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">3 tasks due tomorrow</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;