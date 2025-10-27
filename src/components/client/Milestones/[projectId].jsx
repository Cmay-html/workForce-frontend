
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProjectMilestonesPage = () => {
  const { projectId } = useParams();
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: "Project Planning & Setup",
      description: "Initial project setup and planning phase",
      dueDate: "2024-12-10",
      amount: 1000,
      status: "pending",
    },
    {
      id: 2,
      title: "UI/UX Design Completion",
      description: "Complete all design mockups and user flows",
      dueDate: "2024-12-20",
      amount: 1500,
      status: "pending",
    },
    {
      id: 3,
      title: "Development Phase 1",
      description: "Backend API development and basic frontend structure",
      dueDate: "2024-12-30",
      amount: 1500,
      status: "pending",
    },
    {
      id: 4,
      title: "Final Delivery & Testing",
      description: "Complete development, testing, and project delivery",
      dueDate: "2025-01-10",
      amount: 1000,
      status: "pending",
    },
  ]);

  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    dueDate: "",
    amount: "",
  });

  const handleAddMilestone = (e) => {
    e.preventDefault();
    const milestone = {
      id: milestones.length + 1,
      ...newMilestone,
      amount: parseInt(newMilestone.amount),
      status: "pending",
    };
    setMilestones([...milestones, milestone]);
    setNewMilestone({ title: "", description: "", dueDate: "", amount: "" });
  };

  const handleMilestoneStatus = (milestoneId, status) => {
    setMilestones(
      milestones.map((milestone) =>
        milestone.id === milestoneId ? { ...milestone, status } : milestone
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Project Milestones</h1>
      <p className="text-gray-600 mb-8">Project ID: {projectId}</p>

      {/* Add Milestone Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Milestone</h2>
        <form onSubmit={handleAddMilestone} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Milestone Title"
            value={newMilestone.title}
            onChange={(e) =>
              setNewMilestone({ ...newMilestone, title: e.target.value })
            }
            className="border rounded-md p-2"
            required
          />
          <input
            type="date"
            value={newMilestone.dueDate}
            onChange={(e) =>
              setNewMilestone({ ...newMilestone, dueDate: e.target.value })
            }
            className="border rounded-md p-2"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newMilestone.description}
            onChange={(e) =>
              setNewMilestone({ ...newMilestone, description: e.target.value })
            }
            className="border rounded-md p-2 col-span-2"
            required
          />
          <input
            type="number"
            placeholder="Amount ($)"
            value={newMilestone.amount}
            onChange={(e) =>
              setNewMilestone({ ...newMilestone, amount: e.target.value })
            }
            className="border rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Milestone
          </button>
        </form>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-blue-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  milestone.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : milestone.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {milestone.status.charAt(0).toUpperCase() +
                  milestone.status.slice(1)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-6">
                <div>
                  <span className="font-medium">Due Date:</span>
                  <p>{milestone.dueDate}</p>
                </div>
                <div>
                  <span className="font-medium">Amount:</span>
                  <p className="text-green-600">${milestone.amount}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleMilestoneStatus(milestone.id, "in-progress")
                  }
                  className="bg-yellow-500 text-white py-1 px-3 rounded text-sm"
                >
                  Start
                </button>
                <button
                  onClick={() =>
                    handleMilestoneStatus(milestone.id, "completed")
                  }
                  className="bg-green-600 text-white py-1 px-3 rounded text-sm"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMilestonesPage;
