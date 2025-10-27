
import React from "react";

const FreelancerProjectList = () => {
  // Mock data - replace with actual API call
  const projects = [
    {
      id: 1,
      title: "Website Development",
      description: "Need a responsive website built with React",
      budget: 5000,
      deadline: "2024-12-31",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "UI/UX design for a fitness tracking app",
      budget: 3000,
      deadline: "2024-12-15",
      category: "Design",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Projects</h1>
      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">${project.budget}</span>
              <span className="text-sm text-gray-500">
                Due: {project.deadline}
              </span>
            </div>
            <button
              onClick={() =>
                (window.location.href = `/freelancer/projects/${project.id}/propose`)
              }
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Submit Proposal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancerProjectList;
