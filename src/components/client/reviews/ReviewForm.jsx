
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const navigate = useNavigate();

  const completedProjects = [
    {
      id: 1,
      title: "Website Redesign",
      freelancer: "John Designer",
      freelancerId: "101",
      completedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Mobile App Development",
      freelancer: "Sarah Developer",
      freelancerId: "102",
      completedDate: "2024-01-20",
    },
  ];

  const formik = useFormik({
    initialValues: {
      projectId: "",
      freelancerId: "",
      rating: 0,
      communication: 5,
      quality: 5,
      deadline: 5,
      collaboration: 5,
      title: "",
      comment: "",
      wouldRecommend: true,
      wouldHireAgain: true,
    },
    validationSchema: Yup.object({
      projectId: Yup.string().required("Please select a project"),
      rating: Yup.number()
        .min(1, "Please provide an overall rating")
        .required("Overall rating is required"),
      title: Yup.string()
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title must be less than 100 characters")
        .required("Review title is required"),
      comment: Yup.string()
        .min(20, "Please provide a more detailed review")
        .max(1000, "Review must be less than 1000 characters")
        .required("Review comment is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setStatus({ success: "Review submitted successfully!" });
        setTimeout(() => navigate("/client/reviews"), 1500);
      } catch {
        setStatus({ error: "Failed to submit review. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleProjectSelect = (project) => {
    formik.setValues({
      ...formik.values,
      projectId: project.id,
      freelancerId: project.freelancerId,
    });
  };

  const selectedProject = completedProjects.find(
    (p) => p.id === formik.values.projectId
  );

  const RatingStars = ({ rating, onRatingChange, label }) => (
    <div style={{ marginBottom: "20px" }}>
      <label className="form-label">{label}</label>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "8px",
          alignItems: "center",
        }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: star <= rating ? "#fbbf24" : "#e5e7eb",
              transition: "color 0.2s ease",
            }}
          >
            ★
          </button>
        ))}
        <span
          style={{
            marginLeft: "12px",
            color: "var(--text-secondary)",
            fontWeight: "500",
          }}
        >
          {rating}/5
        </span>
      </div>
    </div>
  );

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
            Leave a Review
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Share your experience working with freelancers
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
          {/* Project Selection */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Select Project
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {completedProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  style={{
                    border: `2px solid ${
                      formik.values.projectId === project.id
                        ? "var(--accent-blue)"
                        : "var(--border-light)"
                    }`,
                    borderRadius: "var(--radius-sm)",
                    padding: "20px",
                    cursor: "pointer",
                    background:
                      formik.values.projectId === project.id
                        ? "var(--secondary-white)"
                        : "var(--primary-white)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <h3 style={{ fontWeight: "600", marginBottom: "8px" }}>
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Freelancer: {project.freelancer}
                  </p>
                  <p style={{ color: "var(--text-light)", fontSize: "13px" }}>
                    Completed: {project.completedDate}
                  </p>
                </div>
              ))}
            </div>
            {formik.touched.projectId && formik.errors.projectId && (
              <div
                style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px" }}
              >
                {formik.errors.projectId}
              </div>
            )}
          </div>

          {selectedProject && (
            <>
              {/* Overall Rating */}
              <div style={{ marginBottom: "32px" }}>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  Overall Rating
                </h2>
                <RatingStars
                  rating={formik.values.rating}
                  onRatingChange={(rating) =>
                    formik.setFieldValue("rating", rating)
                  }
                  label="How would you rate your overall experience? *"
                />
                {formik.touched.rating && formik.errors.rating && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.rating}
                  </div>
                )}
              </div>

              {/* Detailed Ratings */}
              <div style={{ marginBottom: "32px" }}>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  Detailed Ratings
                </h2>
                <RatingStars
                  rating={formik.values.communication}
                  onRatingChange={(communication) =>
                    formik.setFieldValue("communication", communication)
                  }
                  label="Communication"
                />
                <RatingStars
                  rating={formik.values.quality}
                  onRatingChange={(quality) =>
                    formik.setFieldValue("quality", quality)
                  }
                  label="Quality of Work"
                />
                <RatingStars
                  rating={formik.values.deadline}
                  onRatingChange={(deadline) =>
                    formik.setFieldValue("deadline", deadline)
                  }
                  label="Meeting Deadlines"
                />
                <RatingStars
                  rating={formik.values.collaboration}
                  onRatingChange={(collaboration) =>
                    formik.setFieldValue("collaboration", collaboration)
                  }
                  label="Collaboration"
                />
              </div>

              {/* Review Details */}
              <div style={{ marginBottom: "32px" }}>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  Review Details
                </h2>

                <div style={{ marginBottom: "20px" }}>
                  <label className="form-label">Review Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-input"
                    placeholder="Excellent work, highly recommended!"
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

                <div style={{ marginBottom: "20px" }}>
                  <label className="form-label">Detailed Review *</label>
                  <textarea
                    name="comment"
                    className="form-input"
                    rows="6"
                    placeholder="Share details about your experience working with this freelancer..."
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.comment && formik.errors.comment && (
                    <div
                      style={{
                        color: "#dc2626",
                        fontSize: "14px",
                        marginTop: "4px",
                      }}
                    >
                      {formik.errors.comment}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="wouldRecommend"
                      checked={formik.values.wouldRecommend}
                      onChange={formik.handleChange}
                    />
                    I would recommend this freelancer to others
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="wouldHireAgain"
                      checked={formik.values.wouldHireAgain}
                      onChange={formik.handleChange}
                    />
                    I would hire this freelancer again
                  </label>
                </div>
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
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting
                    ? "Submitting Review..."
                    : "Submit Review"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
