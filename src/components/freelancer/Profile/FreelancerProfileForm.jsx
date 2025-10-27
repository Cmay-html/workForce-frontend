
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const FreelancerProfileForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(null);

  const skills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "Vue.js",
    "Angular",
    "UI/UX Design",
    "Graphic Design",
    "Figma",
    "Adobe XD",
    "Sketch",
    "Content Writing",
    "Copywriting",
    "Technical Writing",
    "SEO Writing",
    "Digital Marketing",
    "SEO",
    "Social Media Marketing",
    "Email Marketing",
    "Mobile Development",
    "Flutter",
    "React Native",
    "iOS",
    "Android",
    "Database Design",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "DevOps",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ];

  const categories = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Data Science",
    "DevOps",
    "QA Testing",
    "Project Management",
  ];

  const experienceLevels = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "intermediate", label: "Intermediate (2-5 years)" },
    { value: "expert", label: "Expert (5+ years)" },
  ];

  // Pre-fill with current user data
  const formik = useFormik({
    initialValues: {
      // Personal Info
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",

      // Professional Info
      title: user?.title || "",
      bio:
        user?.bio ||
        "Experienced developer with 5+ years in web development. Specialized in React and Node.js with a track record of delivering high-quality projects on time.",
      experienceLevel: user?.experienceLevel || "intermediate",
      skills: user?.skills || ["React", "Node.js", "JavaScript"],
      categories: user?.categories || ["Web Development"],

      // Portfolio
      portfolioUrl: user?.portfolioUrl || "https://johndoeportfolio.com",
      githubUrl: user?.githubUrl || "https://github.com/johndoe",
      linkedinUrl: user?.linkedinUrl || "https://linkedin.com/in/johndoe",
      behanceUrl: user?.behanceUrl || "",

      // Location
      country: user?.country || "United States",
      city: user?.city || "New York",
      timezone: user?.timezone || "EST",

      // Availability
      availableForWork: user?.availableForWork ?? true,
      responseTime: user?.responseTime || "24 hours",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      title: Yup.string().required("Professional title is required"),
      bio: Yup.string()
        .min(100, "Bio must be at least 100 characters")
        .max(1000, "Bio must be less than 1000 characters")
        .required("Bio is required"),
      experienceLevel: Yup.string().required("Please select experience level"),
      skills: Yup.array()
        .min(1, "Select at least one skill")
        .required("Skills are required"),
      categories: Yup.array()
        .min(1, "Select at least one category")
        .required("Categories are required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Updating freelancer profile:", values);
        // API call would go here
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus({ success: "Profile updated successfully!" });
      } catch {
        setStatus({ error: "Failed to update profile. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        formik.setStatus({ error: "File size must be less than 5MB" });
        return;
      }
      if (!file.type.startsWith("image/")) {
        formik.setStatus({ error: "Please upload an image file" });
        return;
      }
      setAvatar(URL.createObjectURL(file));
    }
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
            Freelancer Profile
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Manage your professional profile and portfolio
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
          {/* Profile Picture */}
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: avatar
                  ? `url(${avatar}) center/cover`
                  : "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "36px",
                fontWeight: "600",
                position: "relative",
                border: "4px solid var(--primary-white)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {!avatar &&
                (user?.firstName?.[0] || "F") + (user?.lastName?.[0] || "L")}

              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-light)" }}>
              Click to upload profile picture
            </div>
          </div>

          {/* Personal Information */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Personal Information
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.firstName}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Professional Information
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Professional Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g., Senior React Developer"
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
              <label className="form-label">Professional Bio *</label>
              <textarea
                name="bio"
                className="form-input"
                rows="5"
                placeholder="Describe your experience, skills, expertise, and what you can offer to clients..."
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bio && formik.errors.bio && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  {formik.errors.bio}
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  color:
                    formik.values.bio.length < 100
                      ? "#dc2626"
                      : "var(--text-light)",
                  marginTop: "4px",
                  textAlign: "right",
                }}
              >
                {formik.values.bio.length}/1000 characters
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Experience Level *</label>
              <select
                name="experienceLevel"
                className="form-input"
                value={formik.values.experienceLevel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
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
          </div>

          {/* Skills & Categories */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Skills & Specializations
            </h2>

            <div style={{ marginBottom: "24px" }}>
              <label className="form-label">Skills *</label>
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
                      fontSize: "14px",
                      transition: "all 0.2s ease",
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
              {formik.touched.skills && formik.errors.skills && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "8px",
                  }}
                >
                  {formik.errors.skills}
                </div>
              )}
            </div>

            <div>
              <label className="form-label">Categories *</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                  marginTop: "12px",
                }}
              >
                {categories.map((category) => (
                  <label
                    key={category}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      background: formik.values.categories.includes(category)
                        ? "var(--secondary-white)"
                        : "transparent",
                      border: `1px solid ${
                        formik.values.categories.includes(category)
                          ? "var(--accent-blue)"
                          : "var(--border-light)"
                      }`,
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formik.values.categories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue("categories", [
                            ...formik.values.categories,
                            category,
                          ]);
                        } else {
                          formik.setFieldValue(
                            "categories",
                            formik.values.categories.filter(
                              (c) => c !== category
                            )
                          );
                        }
                      }}
                      style={{ display: "none" }}
                    />
                    {category}
                  </label>
                ))}
              </div>
              {formik.touched.categories && formik.errors.categories && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "8px",
                  }}
                >
                  {formik.errors.categories}
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Links */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Portfolio & Links
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
              }}
            >
              <div>
                <label className="form-label">Portfolio Website</label>
                <input
                  type="url"
                  name="portfolioUrl"
                  className="form-input"
                  placeholder="https://yourportfolio.com"
                  value={formik.values.portfolioUrl}
                  onChange={formik.handleChange}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    className="form-input"
                    placeholder="https://github.com/username"
                    value={formik.values.githubUrl}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <label className="form-label">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    className="form-input"
                    placeholder="https://linkedin.com/in/username"
                    value={formik.values.linkedinUrl}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">
                  Behance/Dribbble (Designers)
                </label>
                <input
                  type="url"
                  name="behanceUrl"
                  className="form-input"
                  placeholder="https://behance.net/username"
                  value={formik.values.behanceUrl}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>

          {/* Location & Availability */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Location & Availability
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-input"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Average Response Time</label>
              <select
                name="responseTime"
                className="form-input"
                value={formik.values.responseTime}
                onChange={formik.handleChange}
              >
                <option value="2 hours">Within 2 hours</option>
                <option value="6 hours">Within 6 hours</option>
                <option value="24 hours">Within 24 hours</option>
                <option value="48 hours">Within 48 hours</option>
              </select>
            </div>

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
                name="availableForWork"
                checked={formik.values.availableForWork}
                onChange={formik.handleChange}
              />
              I am currently available for new projects
            </label>
          </div>

          {/* Payment Information */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Payment Information
            </h2>
            <div
              style={{
                background: "#f0f9ff",
                padding: "20px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #bae6fd",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  color: "#0369a1",
                }}
              >
                Milestone-Based Payments
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#0369a1",
                  lineHeight: "1.5",
                }}
              >
                All payments are milestone-based. You'll agree on project
                milestones with clients, and payments are released when each
                milestone is completed and approved. This ensures fair payment
                for delivered work.
              </p>
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
              onClick={() => navigate("/freelancer/dashboard")}
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
              {formik.isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreelancerProfileForm;
