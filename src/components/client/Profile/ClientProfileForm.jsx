
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ClientProfileForm = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Marketing",
    "Real Estate",
    "Manufacturing",
    "Other",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const formik = useFormik({
    initialValues: {
      // Personal Information
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123-4567",

      // Company Information
      companyName: "Tech Innovations Inc.",
      companyWebsite: "https://techinnovations.com",
      industry: "Technology",
      companySize: "51-200 employees",
      companyDescription:
        "A leading technology company specializing in innovative software solutions for businesses.",

      // Location
      country: "United States",
      city: "San Francisco",
      timezone: "PST",

      // Preferences
      notificationEmail: true,
      notificationSMS: false,
      monthlyNewsletter: true,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      companyName: Yup.string().required("Company name is required"),
      industry: Yup.string().required("Please select industry"),
      companySize: Yup.string().required("Please select company size"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Updating client profile:", values);
        // API call would go here
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus({ success: "Profile updated successfully!" });
      } catch (error) {
        setStatus({ error: "Failed to update profile. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (file.size > 5 * 1024 * 1024) {
        formik.setStatus({ error: "File size must be less than 5MB" });
        return;
      }
      if (!file.type.startsWith("image/")) {
        formik.setStatus({ error: "Please upload an image file" });
        return;
      }

      setAvatar(URL.createObjectURL(file));
      // Here you would upload to Cloudinary
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
            Client Profile
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Manage your personal and company information
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
              }}
            >
              {!avatar &&
                formik.values.firstName[0] + formik.values.lastName[0]}

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

          {/* Company Information */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Company Information
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                name="companyName"
                className="form-input"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  {formik.errors.companyName}
                </div>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Company Website</label>
              <input
                type="url"
                name="companyWebsite"
                className="form-input"
                placeholder="https://example.com"
                value={formik.values.companyWebsite}
                onChange={formik.handleChange}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label className="form-label">Industry *</label>
                <select
                  name="industry"
                  className="form-input"
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {formik.touched.industry && formik.errors.industry && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.industry}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Company Size *</label>
                <select
                  name="companySize"
                  className="form-input"
                  value={formik.values.companySize}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {formik.touched.companySize && formik.errors.companySize && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.companySize}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="form-label">Company Description</label>
              <textarea
                name="companyDescription"
                className="form-input"
                rows="4"
                placeholder="Brief description of your company and what you do..."
                value={formik.values.companyDescription}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {/* Location Information */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Location
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
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
          </div>

          {/* Notification Preferences */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Notification Preferences
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
                  name="notificationEmail"
                  checked={formik.values.notificationEmail}
                  onChange={formik.handleChange}
                />
                Email notifications for new proposals and messages
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
                  name="notificationSMS"
                  checked={formik.values.notificationSMS}
                  onChange={formik.handleChange}
                />
                SMS notifications for urgent updates
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
                  name="monthlyNewsletter"
                  checked={formik.values.monthlyNewsletter}
                  onChange={formik.handleChange}
                />
                Monthly newsletter with platform updates
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
              onClick={() => navigate("/client/dashboard")}
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

export default ClientProfileForm;
