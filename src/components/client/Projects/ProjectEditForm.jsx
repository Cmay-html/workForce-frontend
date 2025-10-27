
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const ProjectEditForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchProject();
  }, [projectId]);

  const formik = useFormik({
    initialValues: {
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
        console.log("Updating project:", values);
        // API call would go here
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus({ success: "Project updated successfully!" });
        setTimeout(() => navigate("/client/projects"), 1500);
      } catch (error) {
        setStatus({ error: "Failed to update project. Please try again." });
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
    <div className="main-content">
      <div className="top-bar">
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "var(--text-primary)",
            }}
          >
            Edit Project
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Update your project details and requirements
          </p>
        </div>
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

        <form onSubmit={formik.handleSubmit}>
          {/* Project Status */}
          <div style={{ marginBottom: "24px" }}>
            <label className="form-label">Project Status</label>
            <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="radio"
                  name="status"
                  value="accepting_proposals"
                  checked={formik.values.status === "accepting_proposals"}
                  onChange={formik.handleChange}
                />
                Accepting Proposals
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="radio"
                  name="status"
                  value="paused"
                  checked={formik.values.status === "paused"}
                  onChange={formik.handleChange}
                />
                Paused
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="radio"
                  name="status"
                  value="closed"
                  checked={formik.values.status === "closed"}
                  onChange={formik.handleChange}
                />
                Closed
              </label>
            </div>
          </div>

          {/* Project Title & Category */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="E-commerce Website Development"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.title}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  className="form-input"
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
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.category}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div style={{ marginBottom: "24px" }}>
            <label className="form-label">Project Description *</label>
            <textarea
              name="description"
              className="form-input"
              rows="6"
              placeholder="Describe your project in detail..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <div
                style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}
              >
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Budget, Deadline & Duration */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label className="form-label">Budget ($) *</label>
                <input
                  type="number"
                  name="budget"
                  className="form-input"
                  placeholder="5000"
                  value={formik.values.budget}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.budget && formik.errors.budget && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.budget}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Deadline *</label>
                <input
                  type="date"
                  name="deadline"
                  className="form-input"
                  value={formik.values.deadline}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.deadline && formik.errors.deadline && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.deadline}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Duration *</label>
                <select
                  name="duration"
                  className="form-input"
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
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.duration}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Experience Level */}
          <div style={{ marginBottom: "24px" }}>
            <label className="form-label">Required Experience Level *</label>
            <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
              {experienceLevels.map((level) => (
                <label
                  key={level}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={level}
                    checked={formik.values.experienceLevel === level}
                    onChange={formik.handleChange}
                  />
                  {level}
                </label>
              ))}
            </div>
            {formik.touched.experienceLevel &&
              formik.errors.experienceLevel && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  {formik.errors.experienceLevel}
                </div>
              )}
          </div>

          {/* Required Skills */}
          <div style={{ marginBottom: "32px" }}>
            <label className="form-label">Required Skills</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "12px",
                marginTop: "12px",
              }}
            >
              {skills.map((skill) => (
                <label
                  key={skill}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    background: formik.values.skills.includes(skill)
                      ? "var(--secondary-white)"
                      : "transparent",
                    border: `1px solid ${
                      formik.values.skills.includes(skill)
                        ? "var(--accent-blue)"
                        : "var(--border-light)"
                    }`,
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                  }}
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
                    style={{ display: "none" }}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "space-between",
              paddingTop: "24px",
              borderTop: "1px solid var(--border-light)",
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                onClick={() => navigate("/client/projects")}
                style={{
                  background: "var(--secondary-white)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
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
                style={{
                  background: "#fef2f2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Delete Project
              </button>
            </div>

            <button
              type="submit"
              className="login-btn"
              style={{ padding: "12px 32px", margin: 0 }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Updating..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEditForm;
