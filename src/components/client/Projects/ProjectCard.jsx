
import React from "react";

const ProjectCard = ({ project }) => {
  const statusColors = {
    active: {
      background: "var(--secondary-white)",
      color: "var(--accent-blue)",
      border: "var(--accent-blue)",
    },
    pending: { background: "#fffbf0", color: "#d97706", border: "#f59e0b" },
    completed: { background: "#f0f9ff", color: "#0369a1", border: "#0ea5e9" },
    cancelled: { background: "#fef2f2", color: "#dc2626", border: "#ef4444" },
  };

  const statusStyle = statusColors[project.status] || statusColors.pending;

  return (
    <div className="stat-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--text-primary)",
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
            background: statusStyle.background,
            color: statusStyle.color,
            border: `1px solid ${statusStyle.border}`,
          }}
        >
          {project.status}
        </span>
      </div>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          marginBottom: "16px",
        }}
      >
        {project.description}
      </p>

      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          <span style={{ color: "var(--text-light)" }}>Budget:</span>
          <span style={{ fontWeight: "600" }}>${project.budget}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          <span style={{ color: "var(--text-light)" }}>Freelancer:</span>
          <span style={{ fontWeight: "500" }}>{project.freelancer}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "var(--text-light)" }}>Deadline:</span>
          <span style={{ fontWeight: "500" }}>{project.deadline}</span>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          <span style={{ color: "var(--text-light)" }}>Progress</span>
          <span style={{ fontWeight: "500" }}>{project.progress}%</span>
        </div>
        <div
          style={{
            width: "100%",
            background: "var(--border-light)",
            borderRadius: "10px",
            height: "6px",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
              height: "6px",
              borderRadius: "10px",
              width: `${project.progress}%`,
            }}
          ></div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          className="login-btn"
          style={{ flex: 1, padding: "10px", fontSize: "14px", margin: 0 }}
        >
          View Details
        </button>
        <button
          style={{
            flex: 1,
            background: "var(--secondary-white)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-sm)",
            padding: "10px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Manage
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
