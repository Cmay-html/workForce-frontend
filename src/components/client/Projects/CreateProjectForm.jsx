
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    skills: [],
    requirements: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to create the project
      // For now, we'll simulate success
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        budget: "",
        deadline: "",
        skills: [],
        requirements: "",
      });
      // Navigate back to dashboard to see the new project
      navigate('/client/dashboard');
    } catch (error) {
      // Handle error appropriately
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Title
        </label>
        <input
          type="text"
          id="project-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="project-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget ($)
        </label>
        <input
          type="number"
          id="project-budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deadline
        </label>
        <input
          type="date"
          id="project-deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProjectForm;
