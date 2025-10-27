
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const MilestoneSubmissionForm = () => {
  const navigate = useNavigate();
  const { projectId, milestoneId } = useParams();
  const [files, setFiles] = useState([]);

  // Mock milestone data - would come from API
  const milestone = {
    id: milestoneId,
    title: "Design Phase Completion",
    description: "Complete all design mockups and get client approval",
    dueDate: "2024-02-15",
    amount: 1500,
    deliverables: ["Wireframes for all pages", "UI mockups", "Style guide"],
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      notes: "",
      files: [],
    },
    validationSchema: Yup.object({
      description: Yup.string()
        .min(50, "Please provide a detailed description of your work")
        .required("Description is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Submitting milestone:", {
          projectId,
          milestoneId,
          ...values,
          files,
        });

        // API call would go here
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus({ success: "Milestone submitted successfully!" });
        setTimeout(() => navigate(`/freelancer/projects/${projectId}`), 1500);
      } catch (error) {
        setStatus({ error: "Failed to submit milestone. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      "image/*",
      "application/pdf",
      "application/zip",
      "video/*",
    ];

    for (let file of newFiles) {
      if (file.size > maxSize) {
        formik.setStatus({
          error: `File ${file.name} is too large. Maximum size is 50MB.`,
        });
        return;
      }
      if (!allowedTypes.some((type) => file.type.match(type))) {
        formik.setStatus({
          error: `File ${file.name} has an unsupported format.`,
        });
        return;
      }
    }

    setFiles([...files, ...newFiles]);
    formik.setStatus(null);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
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
            Submit Milestone
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Submit your work for: {milestone.title}
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

        {/* Milestone Information */}
        <div
          style={{
            background: "var(--secondary-white)",
            padding: "20px",
            borderRadius: "var(--radius-sm)",
            marginBottom: "24px",
            border: "1px solid var(--border-light)",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Milestone Details
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-light)" }}>
                Amount
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "var(--accent-blue)",
                }}
              >
                ${milestone.amount}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-light)" }}>
                Due Date
              </div>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {milestone.dueDate}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-light)" }}>
                Status
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  display: "inline-block",
                }}
              >
                Awaiting Submission
              </div>
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Required Deliverables:
            </div>
            <ul
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                paddingLeft: "20px",
              }}
            >
              {milestone.deliverables.map((deliverable, index) => (
                <li key={index}>{deliverable}</li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Work Description */}
          <div style={{ marginBottom: "24px" }}>
            <label className="form-label">Work Description *</label>
            <textarea
              name="description"
              className="form-input"
              rows="6"
              placeholder="Describe the work you've completed for this milestone. Include details about what was delivered, any challenges faced, and how you addressed them..."
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

          {/* Additional Notes */}
          <div style={{ marginBottom: "24px" }}>
            <label className="form-label">Additional Notes (Optional)</label>
            <textarea
              name="notes"
              className="form-input"
              rows="4"
              placeholder="Any additional information for the client, questions, or next steps..."
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
          </div>

          {/* File Upload */}
          <div style={{ marginBottom: "32px" }}>
            <label className="form-label">Deliverable Files</label>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-light)",
                marginBottom: "16px",
              }}
            >
              Upload all files related to this milestone delivery. Max 50MB per
              file.
            </p>

            <div
              style={{
                border: "2px dashed var(--border-light)",
                borderRadius: "var(--radius-sm)",
                padding: "40px 20px",
                textAlign: "center",
                marginBottom: "20px",
                background: "var(--secondary-white)",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("file-upload").click()}
            >
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="file-upload"
                accept="image/*,application/pdf,application/zip,video/*,.doc,.docx,.xls,.xlsx"
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
                Click to upload files or drag and drop
              </div>
              <div style={{ fontSize: "14px", color: "var(--text-light)" }}>
                Supports images, PDFs, documents, and zip files
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  Files to Upload ({files.length})
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {files.map((file, index) => (
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
                        <span style={{ fontSize: "20px" }}>📄</span>
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
                            {formatFileSize(file.size)}
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
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
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
              onClick={() => navigate(-1)}
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
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MilestoneSubmissionForm;
