
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const ProjectEditForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const isCreateMode = !projectId; // If no projectId, we're in create mode

  const categories = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
  ];
  const skills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "UI/UX Design",
    "Content Writing",
    "SEO",
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
      try {
        if (isCreateMode) {
          console.log("Creating project:", values);
          // API call to create project would go here
          setStatus({ success: "Project created successfully!" });
          setTimeout(() => navigate("/client/projects"), 1500);
        } else {
          console.log("Updating project:", values);
          // API call to update project would go here
          setStatus({ success: "Project updated successfully!" });
          setTimeout(() => navigate("/client/projects"), 1500);
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch {
        setStatus({ error: `Failed to ${isCreateMode ? 'create' : 'update'} project. Please try again.` });
      } finally {
        setSubmitting(false);
      }
    },
  });

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
    <div className="main-content" style={{ minWidth: '1024px' }}>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isCreateMode ? 'Create New Project' : 'Edit Project'}
        </h1>
        <p className="text-gray-600">
          {isCreateMode ? 'Fill in the details below to create a new project' : 'Update your project details and requirements'}
        </p>
      </div>

      <div className="chart-card">
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

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Project Status - Only show when editing */}
            {!isCreateMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Project Status</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="accepting_proposals"
                      checked={formik.values.status === "accepting_proposals"}
                      onChange={formik.handleChange}
                      className="text-blue-600 focus:ring-blue-500"
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
                      className="text-blue-600 focus:ring-blue-500"
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
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Closed</span>
                  </label>
                </div>
              </div>
            )}

            {/* Project Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
                )}
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
              <textarea
                name="description"
                rows="6"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Describe your project in detail..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
              )}
            </div>

            {/* Budget, Deadline & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($) *</label>
                <input
                  type="number"
                  name="budget"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                  value={formik.values.budget}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.budget && formik.errors.budget && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.budget}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline *</label>
                <input
                  type="date"
                  name="deadline"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formik.values.deadline}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.deadline && formik.errors.deadline && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.deadline}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <select
                  name="duration"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Duration</option>
                  {projectDurations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
                {formik.touched.duration && formik.errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.duration}</p>
                )}
              </div>
            </div>

            {/* Experience Level */}
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
                      className="text-blue-600 focus:ring-blue-500"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Required Skills</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skills.map((skill) => (
                  <label
                    key={skill}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formik.values.skills.includes(skill)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
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
            </div>

            {/* Submit Buttons */}
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
                        console.log("Deleting project:", projectId);
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
                className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (isCreateMode ? "Creating..." : "Updating...") : (isCreateMode ? "Create Project" : "Update Project")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditForm;
