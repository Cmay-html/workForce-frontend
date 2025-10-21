// src/components/Dashboard/DashboardLayout.jsx
import React from "react";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const freelancerName = "John Doe"; // Placeholder for now

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Freelancer Dashboard</h2>
        <ul>
          <li>Profile</li>
          <li>Projects</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Welcome, {freelancerName}!</h1>
        <p>This is your dashboard. Start exploring your profile and projects.</p>
      </main>
    </div>
  );
};

export default DashboardLayout;
