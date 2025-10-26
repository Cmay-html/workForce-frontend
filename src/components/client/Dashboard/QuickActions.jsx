
import React from "react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Create Project",
      description: "Start a new project",
      link: "/client/projects/create",
      gradient:
        "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
    },
    {
      title: "Review Milestones",
      description: "Approve pending work",
      link: "/client/milestones",
      gradient: "linear-gradient(135deg, #00d4aa, #0099ff)",
    },
    {
      title: "Manage Projects",
      description: "View all your projects",
      link: "/client/projects",
      gradient: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
    },
    {
      title: "Leave Review",
      description: "Review freelancers",
      link: "/client/reviews/create",
      gradient: "linear-gradient(135deg, #ff6b6b, #ffa726)",
    },
  ];

  return (
    <div className="quick-actions" style={{ marginBottom: "24px" }}>
      {actions.map((action, index) => (
        <Link key={index} to={action.link} className="action-btn">
          <div
            className="action-icon"
            style={{
              background: action.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {action.title.split(" ")[0]}
          </div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "8px",
              color: "var(--text-primary)",
            }}
          >
            {action.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              lineHeight: "1.4",
            }}
          >
            {action.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
