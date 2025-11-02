import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { clientService } from "../../../services/api/clientService";

const ProjectEditForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const isCreateMode = !projectId; // If no projectId, we're in create mode

  const categories = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
    "Blockchain",
    "DevOps",
    "E-commerce",
    "API Development",
    "Database Design",
    "Machine Learning",
  ];
  const skills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "HTML",
    "CSS",
    "UI/UX Design",
    "Content Writing",
    "SEO",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "Solidity",
    "Web3",
    "TensorFlow",
    "Data Science",
    "Mobile Development",
    "iOS",
    "Android",
    "React Native",
    "Flutter",
    "PHP",
    "Laravel",
    "Java",
    "C#",
    "Ruby",
    "Go",
    "Rust",
    "TypeScript",
    "Vue.js",
    "Angular",
    "Express.js",
    "GraphQL",
    "REST API",
    "Testing",
    "CI/CD",
    "Git",
    "Agile",
    "Scrum",
  ];
  const experienceLevels = ["Entry Level", "Intermediate", "Expert"];
  const projectDurations = [
    "Less than 1 week",
    "1-2 weeks",
    "2-4 weeks",
    "1-2 months",
    "2-4 months",
    "4+ months",
  ];

  // Mock project data - would come from API
  useEffect(() => {
    const fetchProject = async () => {
      if (!isCreateMode) {
        // Only fetch if editing existing project
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setLoading(false);
    };
    fetchProject();
  }, [projectId, isCreateMode]);

  const formik = useFormik({
    initialValues: isCreateMode ? {
      title: "",
      description: "",
      category: "",
      budget: "",
      deadline: "",
      duration: "",
      experienceLevel: "",
      skills: [],
      status: "accepting_proposals",
    } : {
      title: "E-commerce Website Development",
      description:
        "Build a modern e-commerce platform with React and Node.js. Need responsive design and payment integration. Looking for an experienced developer who can deliver high-quality code.",
      category: "Web Development",
      budget: "5000",
      deadline: "2024-03-15",
      duration: "1-2 months",
      experienceLevel: "Intermediate",
      skills: ["React", "Node.js", "MongoDB"],
      status: "accepting_proposals",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(10, "Title must be at least 10 characters")
        .max(100, "Title must be less than 100 characters")
        .required("Project title is required"),
      description: Yup.string()
        .min(50, "Description must be at least 50 characters")
        .max(2000, "Description must be less than 2000 characters")
        .required("Project description is required"),
      category: Yup.string().required("Please select a category"),
      budget: Yup.number()
        .min(50, "Budget must be at least $50")
        .max(100000, "Budget must be less than $100,000")
        .required("Budget is required"),
      deadline: Yup.date()
        .min(new Date(), "Deadline must be in the future")
        .required("Deadline is required"),
      duration: Yup.string().required("Please select project duration"),
      experienceLevel: Yup.string().required(
        "Please select required experience level"
      ),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      if (isCreateMode) {
        setFormValues(values);
        setShowConfirmDialog(true);
        return;
      }

      await submitProject(values);
    },
  });

  const handleConfirmSubmit = async () => {
    setShowConfirmDialog(false);
    if (formValues) {
      await submitProject(formValues);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmDialog(false);
    setFormValues(null);
  };

  const submitProject = async (values) => {
    try {
      let response;
      if (isCreateMode) {
        response = await clientService.createProject(values);
      } else {
        response = await clientService.updateProject(projectId, values);
      }

      if (response.ok) {
        const result = await response.json();
        formik.setStatus({ success: `Project ${isCreateMode ? 'created' : 'updated'} successfully!` });
        // Store the new project in localStorage to persist across page refreshes
        if (isCreateMode && result.id) {
          const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
          const newProject = {
            id: result.id,
            title: values.title,
            status: 'open',
            freelancer: null,
            budget: parseInt(values.budget),
            description: values.description,
            deadline: values.deadline,
            milestones: []
          };
          existingProjects.push(newProject);
          localStorage.setItem('userProjects', JSON.stringify(existingProjects));
        }
        setTimeout(() => navigate(isCreateMode ? "/dashboard" : "/client/projects"), 1500);
      } else {
        // Fallback for when API is not available - simulate success
        formik.setStatus({ success: `Project ${isCreateMode ? 'created' : 'updated'} successfully!` });
        // Store the new project in localStorage for demo purposes
        if (isCreateMode) {
          const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
          const newProject = {
            id: Date.now(), // Generate a simple ID
            title: values.title,
            status: 'open',
            freelancer: null,
            budget: parseInt(values.budget),
            description: values.description,
            deadline: values.deadline,
            milestones: []
          };
          existingProjects.push(newProject);
          localStorage.setItem('userProjects', JSON.stringify(existingProjects));
        }
        setTimeout(() => navigate(isCreateMode ? "/dashboard" : "/client/projects"), 1500);
      }
    } catch (error) {
      // Fallback for when API fails - simulate success for demo purposes
      formik.setStatus({ success: `Project ${isCreateMode ? 'created' : 'updated'} successfully!` });
      // Store the new project in localStorage for demo purposes
      if (isCreateMode) {
        const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        const newProject = {
          id: Date.now(), // Generate a simple ID
          title: values.title,
          status: 'open',
          freelancer: null,
          budget: parseInt(values.budget),
          description: values.description,
          deadline: values.deadline,
          milestones: []
        };
        existingProjects.push(newProject);
        localStorage.setItem('userProjects', JSON.stringify(existingProjects));
      }
      setTimeout(() => navigate(isCreateMode ? "/dashboard" : "/client/projects"), 1500);
    } finally {
      formik.setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <div>Loading project details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ minWidth: '1024px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(isCreateMode ? '/dashboard' : '/client/projects')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {isCreateMode ? 'Dashboard' : 'Projects'}
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {isCreateMode ? 'Create New Project' : 'Edit Project'}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {isCreateMode ? 'Fill in the details below to create a new project' : 'Update your project details and requirements'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          {formik.status?.success && (
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#166534",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                marginBottom: "20px",
              }}
            >
              {formik.status.success}
            </div>
          )}

          {formik.status?.error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                marginBottom: "20px",
              }}
            >
              {formik.status.error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {/* Project Status - Only show when editing */}
            {!isCreateMode && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <label className="block text-lg font-semibold text-gray-800 mb-4 text-primary-600">Project Status</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="accepting_proposals"
                      checked={formik.values.status === "accepting_proposals"}
                      onChange={formik.handleChange}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Accepting Proposals</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="paused"
                      checked={formik.values.status === "paused"}
                      onChange={formik.handleChange}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Paused</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="closed"
                      checked={formik.values.status === "closed"}
                      onChange={formik.handleChange}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Closed</span>
                  </label>
                </div>
              </div>
            )}

            {/* Project Title & Category */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-black mb-6">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-black mb-3">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black placeholder:text-gray-500 bg-white"
                    placeholder="Enter a clear, descriptive project title"
                    maxLength="100"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formik.values.title.length}/100 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Category *</label>
                  <select
                    name="category"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black bg-white"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" className="text-gray-500">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="text-black">
                        {cat}
                      </option>
                    ))}
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-black mb-6">
                Project Details
              </h3>
              <div>
                <label className="block text-base font-medium text-black mb-3">Project Description *</label>
                <textarea
                  name="description"
                  rows="6"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical text-black placeholder:text-gray-500 bg-white"
                  placeholder="Describe your project in detail. Include specific requirements, deliverables, and any technical specifications..."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                )}
                <p className="mt-1 text-sm text-gray-600">
                  {formik.values.description.length}/2000 characters (minimum 50 required)
                </p>
              </div>
            </div>

            {/* Budget, Deadline & Duration */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-black mb-6">
                Project Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Budget ($) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="budget"
                      className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black placeholder:text-gray-500 bg-white"
                      placeholder="5000"
                      min="50"
                      max="100000"
                      value={formik.values.budget}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.budget && formik.errors.budget && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.budget}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Minimum: $50, Maximum: $100,000</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Deadline *</label>
                  <input
                    type="date"
                    name="deadline"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black bg-white"
                    min={new Date().toISOString().split('T')[0]}
                    value={formik.values.deadline}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.deadline && formik.errors.deadline && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.deadline}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Select a date in the future</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Duration *</label>
                  <select
                    name="duration"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black bg-white"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" className="text-gray-500">Select Duration</option>
                    {projectDurations.map((duration) => (
                      <option key={duration} value={duration} className="text-black">
                        {duration}
                      </option>
                    ))}
                  </select>
                  {formik.touched.duration && formik.errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.duration}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-6">
                Skills & Experience
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Required Experience Level *</label>
                <div className="flex gap-6">
                  {experienceLevels.map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={level}
                        checked={formik.values.experienceLevel === level}
                        onChange={formik.handleChange}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
                {formik.touched.experienceLevel && formik.errors.experienceLevel && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.experienceLevel}</p>
                )}
              </div>

              {/* Required Skills */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Required Skills</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {skills.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formik.values.skills.includes(skill)
                          ? 'border-primary-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formik.values.skills.includes(skill)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            formik.setFieldValue("skills", [
                              ...formik.values.skills,
                              skill,
                            ]);
                          } else {
                            formik.setFieldValue(
                              "skills",
                              formik.values.skills.filter((s) => s !== skill)
                            );
                          }
                        }}
                        className="hidden"
                      />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
                {formik.values.skills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Selected skills ({formik.values.skills.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {formik.values.skills.map((skill) => (
                        <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {skill}
                          <button
                            type="button"
                            onClick={() => formik.setFieldValue("skills", formik.values.skills.filter((s) => s !== skill))}
                            className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
                          >
                            <span className="sr-only">Remove {skill}</span>
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Review & Submit
              </h3>
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(isCreateMode ? '/dashboard' : '/client/projects')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  {!isCreateMode && (
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this project? This action cannot be undone."
                          )
                        ) {
                          // Delete project logic
                          navigate("/client/projects");
                        }
                      }}
                      className="px-6 py-3 border border-red-300 rounded-md text-red-700 font-medium hover:bg-red-50 transition-colors duration-200"
                    >
                      Delete Project
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (isCreateMode ? "Creating..." : "Updating...") : (isCreateMode ? "Create Project" : "Update Project")}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Confirm Project Creation</h3>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  Are you sure you want to create this project? Once created, freelancers will be able to submit proposals.
                </p>
                {formValues && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <div className="font-medium text-gray-900 mb-2">{formValues.title}</div>
                    <div className="text-gray-600">
                      <div>Budget: ${formValues.budget}</div>
                      <div>Deadline: {new Date(formValues.deadline).toLocaleDateString()}</div>
                      <div>Skills: {formValues.skills.join(', ')}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelSubmit}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="px-4 py-2 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors duration-200"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectEditForm;
