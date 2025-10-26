
import React, { useState } from "react";
import MilestoneCard from "./MilestoneCard";

const MilestoneList = () => {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      projectId: 1,
      projectTitle: "Website Redesign",
      title: "Design Phase Completion",
      description: "Complete all design mockups and get client approval",
      amount: 1500,
      status: "pending_approval",
      dueDate: "2024-01-31",
      submittedDate: "2024-01-28",
    },
  ]);

  const handleApprove = (milestoneId) => {
    setMilestones(
      milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, status: "approved" }
          : milestone
      )
    );
  };

  const handleRequestRevision = (milestoneId) => {
    setMilestones(
      milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, status: "revision_requested" }
          : milestone
      )
    );
  };

  return (
    <div className="main-content">
      <div className="top-bar">
        <h1 className="text-2xl font-bold">Project Milestones</h1>
      </div>

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
    </div>
  );
};

export default MilestoneList;
