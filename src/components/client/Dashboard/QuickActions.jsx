
import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Project",
      description: "Start a new project",
      action: () => navigate("/client/projects/create"),
      gradient: "linear-gradient(135deg, #93c5fd, #c4b5fd)",
    },
    {
      title: "Add Milestone",
      description: "Create project milestones",
      action: () => navigate("/client/milestones"),
      gradient: "linear-gradient(135deg, #86efac, #7dd3fc)",
    },
    {
      title: "Manage Projects",
      description: "View all your projects",
      action: () => navigate("/client/projects"),
      gradient: "linear-gradient(135deg, #c4b5fd, #67e8f9)",
    },
    {
      title: "Leave Review",
      description: "Review freelancers",
      action: () => navigate("/client/reviews/create"),
      gradient: "linear-gradient(135deg, #fca5a5, #fcd34d)",
    },
  ];

  return (
    <div className="quick-actions" style={{ marginBottom: "24px" }}>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.action}
          className="action-btn"
          style={{
            background: "#ffffff",
            border: "2px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textDecoration: "none",
            color: "#1f2937",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
          }}
        >
          <div
            className="action-icon"
            style={{
              background: action.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {action.title.split(" ")[0]}
          </div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#1f2937",
            }}
          >
            {action.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: "1.4",
            }}
          >
            {action.description}
          </p>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
