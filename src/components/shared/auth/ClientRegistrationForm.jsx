import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const ClientRegistrationForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [avatar, setAvatar] = useState(null);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Real Estate",
    "Marketing",
    "Consulting",
    "Non-profit",
    "Government",
    "Other"
  ];

  const companySizes = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-1000", label: "201-1000 employees" },
    { value: "1000+", label: "1000+ employees" }
  ];

  const projectTypes = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
    "Consulting",
    "Other"
  ];

  const formik = useFormik({
    initialValues: {
      // Personal Info
      firstName: "",
      lastName: "",
      email: "",
      phone: "",

      // Company Info
      companyName: "",
      industry: "",
      companySize: "",
      website: "",
      description: "",

      // Project Preferences
      projectTypes: [],
      budgetRange: "",
      timeline: "",

      // Location
      country: "",
      city: "",
      timezone: "",

      // Agreement
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      companyName: Yup.string().required("Company name is required"),
      industry: Yup.string().required("Industry is required"),
      companySize: Yup.string().required("Company size is required"),
      description: Yup.string()
        .min(50, "Description must be at least 50 characters")
        .max(1000, "Description must be less than 1000 characters")
        .required("Company description is required"),
      projectTypes: Yup.array()
        .min(1, "Select at least one project type")
        .required("Project types are required"),
      termsAccepted: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Client registration:", values);

        // API call to register client
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate login with client role
        login(values, null, {
          ...values,
          role: "client",
          id: Date.now().toString(),
        }, "client");

        setStatus({ success: "Client profile created successfully!" });
        setTimeout(() => window.location.href = '/dashboard', 1500);
      } catch {
        setStatus({ error: "Registration failed. Please try again." });
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
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          Join as a Client
        </h1>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>
          Create your client profile to start posting projects and hiring freelancers
        </p>
      </div>

      <div style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
      }}>
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
              {!avatar && "CU"}

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
              Click to upload profile picture (Optional)
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
                  placeholder="John"
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
                  placeholder="Doe"
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
                  placeholder="john.doe@company.com"
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
                  placeholder="+1 (555) 123-4567"
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
                placeholder="Acme Corporation"
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
                  <option value="">Select Company Size</option>
                  {companySizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
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

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Company Website</label>
              <input
                type="url"
                name="website"
                className="form-input"
                placeholder="https://www.company.com"
                value={formik.values.website}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <label className="form-label">Company Description *</label>
              <textarea
                name="description"
                className="form-input"
                rows="4"
                placeholder="Describe your company, its mission, and what type of projects you typically work on..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  {formik.errors.description}
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  color:
                    formik.values.description.length < 50
                      ? "#dc2626"
                      : "var(--text-light)",
                  marginTop: "4px",
                  textAlign: "right",
                }}
              >
                {formik.values.description.length}/1000 characters
                {formik.values.description.length < 50 &&
                  " (Minimum 50 characters required)"}
              </div>
            </div>
          </div>

          {/* Project Preferences */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Project Preferences
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Project Types *</label>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-light)",
                  marginBottom: "12px",
                }}
              >
                Select the types of projects you typically need (choose at least one)
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                  marginTop: "12px",
                }}
              >
                {projectTypes.map((type) => (
                  <label
                    key={type}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      background: formik.values.projectTypes.includes(type)
                        ? "var(--secondary-white)"
                        : "transparent",
                      border: `1px solid ${
                        formik.values.projectTypes.includes(type)
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
                      checked={formik.values.projectTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue("projectTypes", [
                            ...formik.values.projectTypes,
                            type,
                          ]);
                        } else {
                          formik.setFieldValue(
                            "projectTypes",
                            formik.values.projectTypes.filter((t) => t !== type)
                          );
                        }
                      }}
                      style={{ display: "none" }}
                    />
                    {type}
                  </label>
                ))}
              </div>
              {formik.touched.projectTypes && formik.errors.projectTypes && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "8px",
                  }}
                >
                  {formik.errors.projectTypes}
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label className="form-label">Typical Budget Range</label>
                <select
                  name="budgetRange"
                  className="form-input"
                  value={formik.values.budgetRange}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Budget Range</option>
                  <option value="$1k-5k">$1,000 - $5,000</option>
                  <option value="$5k-10k">$5,000 - $10,000</option>
                  <option value="$10k-25k">$10,000 - $25,000</option>
                  <option value="$25k-50k">$25,000 - $50,000</option>
                  <option value="$50k+">$50,000+</option>
                </select>
              </div>

              <div>
                <label className="form-label">Typical Project Timeline</label>
                <select
                  name="timeline"
                  className="form-input"
                  value={formik.values.timeline}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Timeline</option>
                  <option value="1-week">1 week</option>
                  <option value="2-4-weeks">2-4 weeks</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-months+">6+ months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
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
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-input"
                  placeholder="United States"
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
                  placeholder="New York"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <label className="form-label">Timezone</label>
                <input
                  type="text"
                  name="timezone"
                  className="form-input"
                  placeholder="EST (UTC-5)"
                  value={formik.values.timezone}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formik.values.termsAccepted}
                onChange={formik.handleChange}
                style={{ marginTop: "4px" }}
              />
              <div>
                <div style={{ fontWeight: "500" }}>
                  I agree to the Client Terms of Service and Privacy Policy *
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--text-light)",
                    marginTop: "4px",
                  }}
                >
                  By creating a client account, you agree to our platform rules,
                  payment terms, and freelancer hiring guidelines.
                </div>
              </div>
            </label>
            {formik.touched.termsAccepted && formik.errors.termsAccepted && (
              <div
                style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px" }}
              >
                {formik.errors.termsAccepted}
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
              onClick={() => navigate("/")}
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
                ? "Creating Profile..."
                : "Create Client Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientRegistrationForm;
