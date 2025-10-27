
import React, { useState } from "react";

const ProjectProposalForm = () => {
  const [proposal, setProposal] = useState({
    coverLetter: "",
    proposedBudget: "",
    estimatedTimeline: "",
    relevantExperience: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Proposal submitted:", proposal);
    // API call to submit proposal
  };

  const handleChange = (e) => {
    setProposal({
      ...proposal,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Submit Proposal</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            name="coverLetter"
            value={proposal.coverLetter}
            onChange={handleChange}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Proposed Budget ($)
          </label>
          <input
            type="number"
            name="proposedBudget"
            value={proposal.proposedBudget}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estimated Timeline (days)
          </label>
          <input
            type="number"
            name="estimatedTimeline"
            value={proposal.estimatedTimeline}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Relevant Experience
          </label>
          <textarea
            name="relevantExperience"
            value={proposal.relevantExperience}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit Proposal
        </button>
      </form>
    </div>
  );
};

export default ProjectProposalForm;
