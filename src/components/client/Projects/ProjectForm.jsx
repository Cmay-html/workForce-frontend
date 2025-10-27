
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

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

  // File validation function
  const validateFiles = (files) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    for (let file of files) {
      if (file.size > maxSize) {
        return `File ${file.name} is too large. Maximum size is 10MB.`;
      }
      if (!allowedTypes.includes(file.type)) {
        return `File ${file.name} has an unsupported format. Allowed: PDF, DOC, DOCX, JPG, PNG, GIF`;
      }
    }
    return null;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      budget: "",
      deadline: "",
      duration: "",
      experienceLevel: "",
      skills: [],
      files: [],
      budgetType: "fixed",
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
      files: Yup.array().max(5, "Maximum 5 files allowed"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setUploading(true);
        console.log("Project created with files:", values);

        // Simulate file upload to Cloudinary (capstone requirement)
        if (values.files.length > 0) {
          console.log("Uploading files to Cloudinary...");
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload
        }

        setStatus({ success: "Project created successfully!" });
        setTimeout(() => navigate("/client/projects"), 1500);
      } catch (error) {
        setStatus({ error: "Failed to create project. Please try again." });
      } finally {
        setSubmitting(false);
        setUploading(false);
      }
    },
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validationError = validateFiles(files);

    if (validationError) {
      formik.setStatus({ error: validationError });
      return;
    }

    if (formik.values.files.length + files.length > 5) {
      formik.setStatus({
        error: "Maximum 5 files allowed. Please remove some files first.",
      });
      return;
    }

    formik.setFieldValue("files", [...formik.values.files, ...files]);
    formik.setStatus(null); // Clear any previous errors
  };

  const removeFile = (index) => {
    const updatedFiles = formik.values.files.filter((_, i) => i !== index);
    formik.setFieldValue("files", updatedFiles);
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return "🖼️";
    if (fileType === "application/pdf") return "📄";
    if (fileType.includes("word") || fileType.includes("document")) return "📝";
    return "📎";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

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
            Create New Project
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Please fill in the details to start your project
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
              placeholder="Describe your project in detail. Include goals, requirements, and specific features needed..."
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
                  placeholder="$5000"
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
          <div style={{ marginBottom: "24px" }}>
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

          {/* File Upload Section */}
          <div style={{ marginBottom: "32px" }}>
            <label className="form-label">Project Files (Optional)</label>
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "14px",
                marginBottom: "16px",
              }}
            >
              Upload reference documents, images, or specifications. Max 5
              files, 10MB each.
            </p>

            {/* File Upload Area */}
            <div
              style={{
                border: "2px dashed var(--border-light)",
                borderRadius: "var(--radius-sm)",
                padding: "40px 20px",
                textAlign: "center",
                marginBottom: "20px",
                background: "var(--secondary-white)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = "var(--accent-blue)";
                e.currentTarget.style.background = "#f0f7ff";
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = "var(--border-light)";
                e.currentTarget.style.background = "var(--secondary-white)";
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = "var(--border-light)";
                e.currentTarget.style.background = "var(--secondary-white)";
                handleFileUpload({ target: { files: e.dataTransfer.files } });
              }}
              onClick={() => document.getElementById("file-upload").click()}
            >
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              />
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📁</div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                Drag & drop files here or click to browse
              </div>
              <div style={{ fontSize: "14px", color: "var(--text-light)" }}>
                Supports PDF, DOC, DOCX, JPG, PNG, GIF (Max 10MB each)
              </div>
            </div>

            {/* File List */}
            {formik.values.files.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  Selected Files ({formik.values.files.length}/5)
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {formik.values.files.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        background: "var(--primary-white)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span style={{ fontSize: "20px" }}>
                          {getFileIcon(file.type)}
                        </span>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "500" }}>
                            {file.name}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "var(--text-light)",
                            }}
                          >
                            {formatFileSize(file.size)} •{" "}
                            {file.type.split("/")[1]?.toUpperCase() || "FILE"}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#dc2626",
                          cursor: "pointer",
                          fontSize: "14px",
                          padding: "6px 12px",
                          borderRadius: "var(--radius-sm)",
                          fontWeight: "500",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = "#fef2f2";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = "none";
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formik.touched.files && formik.errors.files && (
              <div
                style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px" }}
              >
                {formik.errors.files}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
              paddingTop: "24px",
              borderTop: "1px solid var(--border-light)",
            }}
          >
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
              type="submit"
              className="login-btn"
              style={{ padding: "12px 32px", margin: 0 }}
              disabled={formik.isSubmitting || uploading}
            >
              {formik.isSubmitting || uploading
                ? "Creating Project..."
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
