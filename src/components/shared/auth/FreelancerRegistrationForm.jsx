
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const FreelancerRegistrationForm = () => {
  const navigate = useNavigate();
  const { registerFreelancer } = useAuth();
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

  const formik = useFormik({
    initialValues: {
      // Personal Info
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",

      // Professional Info
      title: "",
      bio: "",
      experienceLevel: "",
      skills: [],
      categories: [],

      // Portfolio
      portfolioUrl: "",
      githubUrl: "",
      linkedinUrl: "",
      behanceUrl: "",

      // Location
      country: "",
      city: "",
      timezone: "",

      // Agreement
      termsAccepted: false,
      availableForWork: true,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
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
      termsAccepted: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Freelancer registration:", values);

        // API call to register freelancer
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Register freelancer
        const result = await registerFreelancer(values);
        if (result.success) {
          setStatus({ success: "Freelancer profile created successfully!" });
          setTimeout(() => navigate('/freelancer/dashboard'), 1500);
        } else {
          setStatus({ error: result.error || "Registration failed. Please try again." });
        }
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
    <div style={{
      padding: "20px",
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffff",
      overflow: "auto"
    }}>
      <div style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "1px solid #e9ecef"
      }}>
        <div>
          <h1 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1a202c",
            margin: "0 0 8px 0"
          }}>
            Become a Freelancer
          </h1>
          <p style={{
            color: "#718096",
            marginTop: "1px",
            fontSize: "16px",
            margin: "8px 0 0 0"
          }}>
            Create your freelancer profile to start getting projects
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "32px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e2e8f0"
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
             {formik.status.verificationRequired && (
               <div style={{ marginTop: "12px", fontSize: "14px" }}>
                 <p style={{ marginBottom: "8px" }}>
                   Check your email at <strong>{formik.status.email}</strong> for a verification link.
                 </p>
                 <p style={{ marginBottom: "8px" }}>
                   The verification link has been logged to the console for testing purposes.
                 </p>
                 <button
                   onClick={() => navigate('/login')}
                   style={{
                     background: "#166534",
                     color: "white",
                     border: "none",
                     padding: "8px 16px",
                     borderRadius: "4px",
                     cursor: "pointer",
                     fontSize: "14px"
                   }}
                 >
                   Go to Login
                 </button>
               </div>
             )}
           </div>
         )}

        {formik.status?.error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            {formik.status.error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Profile Picture */}
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <div style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: avatar
                ? `url(${avatar}) center/cover`
                : "linear-gradient(135deg, #667eea, #764ba2)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "36px",
              fontWeight: "600",
              position: "relative",
              border: "4px solid #ffffff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}>
              {!avatar && "FU"}

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
            <div style={{
              fontSize: "14px",
              color: "#718096",
              textAlign: "center"
            }}>
              Click to upload profile picture (Optional)
            </div>
          </div>

          {/* Personal Information */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#1a202c"
            }}>
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
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px"
                }}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    backgroundColor: "#ffffff"
                  }}
                  placeholder="John"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}>
                    {formik.errors.firstName}
                  </div>
                )}
              </div>

              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px"
                }}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    backgroundColor: "#ffffff"
                  }}
                  placeholder="Doe"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}>
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="john.doe@example.com"
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Create a password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
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
                placeholder="e.g., Senior React Developer, UI/UX Designer"
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
                placeholder="Describe your experience, skills, expertise, and what you can offer to clients. Include your background, achievements, and what makes you unique..."
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
                {formik.values.bio.length < 100 &&
                  " (Minimum 100 characters required)"}
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
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-light)",
                  marginBottom: "12px",
                }}
              >
                Select the skills you specialize in (choose at least one)
              </p>
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
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-light)",
                  marginBottom: "12px",
                }}
              >
                Select the categories you work in (choose at least one)
              </p>
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
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-light)",
                marginBottom: "16px",
              }}
            >
              Add links to your portfolio and professional profiles (optional
              but recommended)
            </p>

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

          {/* Location */}
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
                All payments on our platform are milestone-based. You'll agree
                on project milestones with clients, and payments are released
                when each milestone is completed and approved. This ensures fair
                payment for delivered work and protects both freelancers and
                clients.
              </p>
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
                  I agree to the Freelancer Terms of Service and Privacy Policy
                  *
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--text-light)",
                    marginTop: "4px",
                  }}
                >
                  By creating a freelancer account, you agree to our platform
                  rules, community guidelines, and milestone-based payment
                  terms.
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
                : "Create Freelancer Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreelancerRegistrationForm;
