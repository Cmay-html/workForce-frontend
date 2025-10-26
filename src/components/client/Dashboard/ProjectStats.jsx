// src/components/client/Dashboard/ProjectStats.jsx
import React from "react";

const ProjectStats = () => {
  const stats = [
    {
      title: "Total Projects",
      value: "0",
      gradient:
        "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
    },
    {
      title: "Active Projects",
      value: "0",
      gradient: "linear-gradient(135deg, #00d4aa, #0099ff)",
    },
    {
      title: "Pending Milestones",
      value: "0",
      gradient: "linear-gradient(135deg, #ff6b6b, #ffa726)",
    },
    {
      title: "Completed Projects",
      value: "0",
      gradient: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div
            className="stat-value"
            style={{
              background: stat.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {stat.value}
          </div>
          <div className="stat-label">{stat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;
