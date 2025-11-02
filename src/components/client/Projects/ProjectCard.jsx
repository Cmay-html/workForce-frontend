
import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const statusColors = {
    active: "bg-blue-100 text-blue-800 border-blue-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    draft: "bg-gray-100 text-gray-800 border-gray-200",
    cancelled: "bg-red-100 text-red-800 border-red-200"
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-primary-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {project.title}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[project.status] || statusColors.pending}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Budget:</span>
          <span className="font-semibold text-gray-900">${project.budget.toLocaleString()}</span>
        </div>

        {project.freelancer && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Freelancer:</span>
            <span className="font-medium text-gray-900">{project.freelancer}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Deadline:</span>
          <span className="font-medium text-gray-900">{project.deadline}</span>
        </div>

        {project.proposals !== undefined && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Proposals:</span>
            <span className="font-medium text-gray-900">{project.proposals}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getProgressColor(project.progress)} transition-all duration-300`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/client/projects/${project.id}/chat`)}
          className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-3 rounded-md text-sm transition-colors duration-200"
        >
          View Details
        </button>
        <button
          onClick={() => navigate(`/client/projects/${project.id}/milestones/create`)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-md text-sm transition-colors duration-200"
        >
          + Add Milestone
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
