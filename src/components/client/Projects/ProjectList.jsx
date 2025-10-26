
import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const projects = [
    {
      id: 1,
      title: "Website Redesign",
      description: "Complete website redesign with modern UI",
      status: "active",
      budget: 5000,
      freelancer: "John Grinder",
      progress: 75,
      deadline: "2024-02-15",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Cross-platform mobile application",
      status: "pending",
      budget: 12000,
      freelancer: "Sarah Mkenya",
      progress: 0,
      deadline: "2024-03-20",
    },
  ];

  return (
    <div className="main-content">
      <div className="top-bar">
        <div>
          <h1 className="text-2xl font-bold">My Projects</h1>
          <p className="text-secondary">Manage and track all your projects</p>
        </div>
        <button
          className="login-btn"
          style={{ width: "auto", padding: "12px 24px", margin: 0 }}
        >
          + New Project
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
