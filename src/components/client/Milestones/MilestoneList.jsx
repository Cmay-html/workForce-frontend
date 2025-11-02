
import React, { useState, useEffect } from "react";
import MilestoneCard from "./MilestoneCard";

const MilestoneList = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMilestones = async () => {
      try {
        // TODO: Replace with actual API call to fetch milestones for review
        const response = await fetch('/api/client/milestones/pending', {
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

    loadMilestones();
  }, []);

  const handleApprove = async (milestoneId) => {
    try {
      // TODO: Replace with actual API call to approve milestone
      const response = await fetch(`/api/client/milestones/${milestoneId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve milestone');
      }

      // Update local state
      setMilestones(
        milestones.map((milestone) =>
          milestone.id === milestoneId
            ? { ...milestone, status: "approved" }
            : milestone
        )
      );
    } catch (error) {
      console.error('Error approving milestone:', error);
    }
  };

  const handleRequestRevision = async (milestoneId) => {
    try {
      // TODO: Replace with actual API call to request revision
      const response = await fetch(`/api/client/milestones/${milestoneId}/request-revision`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to request revision');
      }

      // Update local state
      setMilestones(
        milestones.map((milestone) =>
          milestone.id === milestoneId
            ? { ...milestone, status: "revision_requested" }
            : milestone
        )
      );
    } catch (error) {
      console.error('Error requesting revision:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-full p-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md mb-6">
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
    <div className="h-full p-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Milestones</h1>
        <p className="text-gray-600">Review and approve milestone submissions</p>
      </div>

      {milestones.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">No milestones pending review.</p>
          <p className="text-gray-500 mt-2">Milestones submitted by freelancers will appear here for approval.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {milestones.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onApprove={handleApprove}
              onRequestRevision={handleRequestRevision}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MilestoneList;
