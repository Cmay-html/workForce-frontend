
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectMilestonesPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMilestones = async () => {
      try {
        // TODO: Replace with actual API call to fetch project milestones
        const response = await fetch(`/api/client/projects/${projectId}/milestones`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch milestones');
        }

        const data = await response.json();
        setMilestones(data.milestones || []);
      } catch (error) {
        console.error('Error loading milestones:', error);
        setMilestones([]);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadMilestones();
    }
  }, [projectId]);

  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    dueDate: "",
    amount: "",
  });

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call to create milestone
      const response = await fetch(`/api/client/projects/${projectId}/milestones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          ...newMilestone,
          amount: parseInt(newMilestone.amount),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create milestone');
      }

      const data = await response.json();
      setMilestones([...milestones, data.milestone]);
      setNewMilestone({ title: "", description: "", dueDate: "", amount: "" });
    } catch (error) {
      console.error('Error creating milestone:', error);
    }
  };

  const handleMilestoneStatus = async (milestoneId, status) => {
    try {
      // TODO: Replace with actual API call to update milestone status
      const response = await fetch(`/api/client/milestones/${milestoneId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update milestone status');
      }

      // Update local state
      setMilestones(
        milestones.map((milestone) =>
          milestone.id === milestoneId ? { ...milestone, status } : milestone
        )
      );
    } catch (error) {
      console.error('Error updating milestone status:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8" style={{ minWidth: '1024px' }}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8" style={{ minWidth: '1024px' }}>
      <div className="mb-8">
        <button
          onClick={() => navigate('/client/projects')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Milestones</h1>
        <p className="text-gray-600">Manage milestones for Project ID: {projectId}</p>
      </div>

      {/* Add Milestone Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Add New Milestone</h2>
        <form onSubmit={handleAddMilestone} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Milestone Title</label>
            <input
              type="text"
              placeholder="Milestone Title"
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={newMilestone.dueDate}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, dueDate: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Milestone description and deliverables"
              value={newMilestone.description}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, description: e.target.value })
              }
              rows={3}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              placeholder="Amount ($)"
              value={newMilestone.amount}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, amount: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-primary-500 text-white rounded-md hover:bg-primary-600 py-3 px-6 font-medium transition-colors duration-200"
            >
              Add Milestone
            </button>
          </div>
        </form>
      </div>

      {/* Milestones List */}
      <div className="space-y-6">
        {milestones.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No milestones</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first milestone above.</p>
          </div>
        ) : (
          milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        milestone.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : milestone.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{milestone.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-500">Due Date</span>
                  <p className="text-sm text-gray-900 mt-1">{milestone.dueDate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-500">Amount</span>
                  <p className="text-sm text-green-600 font-semibold mt-1">${milestone.amount}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <p className={`text-sm font-medium mt-1 ${
                    milestone.status === "completed" ? "text-green-600" :
                    milestone.status === "in-progress" ? "text-primary-600" : "text-gray-600"
                  }`}>
                    {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {milestone.status === "pending" && (
                  <button
                    onClick={() => handleMilestoneStatus(milestone.id, "in-progress")}
                    className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 text-sm font-medium transition-colors duration-200"
                  >
                    Start Milestone
                  </button>
                )}
                {milestone.status === "in-progress" && (
                  <button
                    onClick={() => handleMilestoneStatus(milestone.id, "completed")}
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm font-medium transition-colors duration-200"
                  >
                    Mark Complete
                  </button>
                )}
                {milestone.status === "completed" && (
                  <span className="bg-green-100 text-green-800 py-2 px-4 rounded-md text-sm font-medium">
                    ✓ Completed
                  </span>
                )}
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors duration-200">
                  Edit Milestone
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectMilestonesPage;
