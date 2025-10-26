// src/components/ClientDashboard.jsx - NEW FILE
import React from "react";

const ClientDashboard = () => {
  return (
    <div className="main-content">
      <div className="top-bar">
        <div>
          <h1 className="text-2xl font-bold">Client Dashboard</h1>
          <p className="text-secondary">
            Welcome back! Here's your project overview
          </p>
        </div>
        <button
          className="login-btn"
          style={{ width: "auto", padding: "12px 24px", margin: 0 }}
        >
          + New Project
        </button>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="action-btn">
          <div className="action-icon">Create</div>
          <h3>Create Project</h3>
          <p>Start a new project</p>
        </div>
        <div className="action-btn">
          <div className="action-icon">Review</div>
          <h3>Review Milestones</h3>
          <p>Approve pending work</p>
        </div>
        <div className="action-btn">
          <div className="action-icon">Manage</div>
          <h3>Manage Projects</h3>
          <p>View all your projects</p>
        </div>
        <div className="action-btn">
          <div className="action-icon">Rate</div>
          <h3>Leave Review</h3>
          <p>Review freelancers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Active Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Pending Milestones</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Completed Projects</div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
