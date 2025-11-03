
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const FreelancerRegistrationForm = () => {
  const navigate = useNavigate();
  const { registerFreelancer } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderProfessionalInfo();
      case 3:
        return renderSkillsAndCategories();
      case 4:
        return renderPortfolioLinks();
      case 5:
        return renderLocationInfo();
      case 6:
        return renderTermsAndPayment();
      default:
        return renderPersonalInfo();
    }
  };

  const skills = [
    "JavaScript", "React", "Node.js", "Python", "PHP", "Java", "C++", "HTML/CSS",
    "Vue.js", "Angular", "TypeScript", "MongoDB", "MySQL", "PostgreSQL",
    "AWS", "Docker", "Git", "Figma", "Photoshop", "Illustrator", "UI/UX Design",
    "Mobile Development", "WordPress", "SEO", "Digital Marketing", "Content Writing",
    "Data Analysis", "Machine Learning", "DevOps", "Cybersecurity"
  ];

  const categories = [
    "Web Development", "Mobile Development", "UI/UX Design", "Graphic Design",
    "Digital Marketing", "Content Writing", "Data Science", "DevOps",
    "Cybersecurity", "E-commerce", "WordPress", "SEO", "Social Media Marketing",
    "Video Editing", "Animation", "Photography", "Consulting", "Project Management"
  ];

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic information" },
    { number: 2, title: "Professional", description: "Your expertise" },
    { number: 3, title: "Skills", description: "Skills & categories" },
    { number: 4, title: "Portfolio", description: "Your work" },
    { number: 5, title: "Location", description: "Where you're based" },
    { number: 6, title: "Terms", description: "Agreement" }
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
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
      title: Yup.string().required("Professional title is required"),
      bio: Yup.string().min(50, "Bio must be at least 50 characters").required("Bio is required"),
      experienceLevel: Yup.string().required("Experience level is required"),
      skills: Yup.array().min(3, "Please select at least 3 skills"),
      categories: Yup.array().min(1, "Please select at least 1 category"),
      termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setStatus(null);

        // API call to register freelancer
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Register freelancer
        const result = await registerFreelancer(values);
        if (result.success) {
          setStatus({ success: "Freelancer profile created successfully!" });
          
          // Store user data temporarily for dashboard access
          const userData = {
            ...values,
            role: 'freelancer',
            id: Date.now(), // Temporary ID
            avatar: avatar
          };
          localStorage.setItem('pendingUserData', JSON.stringify(userData));
          
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

  const renderPersonalInfo = () => (
    <div>
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
          cursor: "pointer"
        }}>
          {!avatar && "FU"}
          <input
            type="file"
            accept="image/*"
            style={{
              position: "absolute",
              inset: "0",
              width: "100%",
              height: "100%",
              opacity: "0",
              cursor: "pointer"
            }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => setAvatar(e.target.result);
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
          Click to upload profile picture
        </p>
      </div>

      {/* Personal Information Fields */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "20px",
      }}>
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
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter your first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
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
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter your last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
              {formik.errors.lastName}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>Email Address *</label>
        <input
          type="email"
          name="email"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Enter your email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
            {formik.errors.email}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Enter your phone number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
            {formik.errors.phone}
          </div>
        )}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "20px",
      }}>
        <div>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "8px"
          }}>Password *</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Create a strong password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
              {formik.errors.password}
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
          }}>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Confirm your password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>Professional Title *</label>
        <input
          type="text"
          name="title"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="e.g., Senior React Developer"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
            {formik.errors.title}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>Professional Bio *</label>
        <textarea
          name="bio"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors resize-vertical"
          rows="5"
          placeholder="Describe your experience, skills, and what you can offer to clients..."
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.bio && formik.errors.bio && (
          <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
            {formik.errors.bio}
          </div>
        )}
        <div style={{ fontSize: "12px", color: "#6b7280", textAlign: "right", marginTop: "4px" }}>
          {formik.values.bio.length}/1000 characters
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>Experience Level *</label>
        <select
          name="experienceLevel"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
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
        {formik.touched.experienceLevel && formik.errors.experienceLevel && (
          <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
            {formik.errors.experienceLevel}
          </div>
        )}
      </div>
    </div>
  );

  const renderSkillsAndCategories = () => (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "12px"
        }}>Skills *</label>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "8px",
        }}>
          {skills.map((skill) => (
            <label key={skill} style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              backgroundColor: formik.values.skills.includes(skill) ? "#dbeafe" : "#ffffff",
              borderColor: formik.values.skills.includes(skill) ? "#3b82f6" : "#e5e7eb",
            }}>
              <input
                type="checkbox"
                checked={formik.values.skills.includes(skill)}
                onChange={(e) => {
                  const newSkills = e.target.checked
                    ? [...formik.values.skills, skill]
                    : formik.values.skills.filter(s => s !== skill);
                  formik.setFieldValue('skills', newSkills);
                }}
                style={{ marginRight: "8px" }}
              />
              <span style={{ fontSize: "14px", color: "#374151" }}>{skill}</span>
            </label>
          ))}
        </div>
        {formik.touched.skills && formik.errors.skills && (
          <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px" }}>
            {formik.errors.skills}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "12px"
        }}>Categories *</label>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "8px",
        }}>
          {categories.map((category) => (
            <label key={category} style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              backgroundColor: formik.values.categories.includes(category) ? "#dbeafe" : "#ffffff",
              borderColor: formik.values.categories.includes(category) ? "#3b82f6" : "#e5e7eb",
            }}>
              <input
                type="checkbox"
                checked={formik.values.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...formik.values.categories, category]
                    : formik.values.categories.filter(c => c !== category);
                  formik.setFieldValue('categories', newCategories);
                }}
                style={{ marginRight: "8px" }}
              />
              <span style={{ fontSize: "14px", color: "#374151" }}>{category}</span>
            </label>
          ))}
        </div>
        {formik.touched.categories && formik.errors.categories && (
          <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px" }}>
            {formik.errors.categories}
          </div>
        )}
      </div>
    </div>
  );

  const renderPortfolioLinks = () => (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>Portfolio Website</label>
        <input
          type="url"
          name="portfolioUrl"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="https://yourportfolio.com"
          value={formik.values.portfolioUrl}
          onChange={formik.handleChange}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>GitHub Profile</label>
        <input
          type="url"
          name="githubUrl"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="https://github.com/yourusername"
          value={formik.values.githubUrl}
          onChange={formik.handleChange}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>LinkedIn Profile</label>
        <input
          type="url"
          name="linkedinUrl"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formik.values.linkedinUrl}
          onChange={formik.handleChange}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>Behance Profile</label>
        <input
          type="url"
          name="behanceUrl"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="https://behance.net/yourprofile"
          value={formik.values.behanceUrl}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  );

  const renderLocationInfo = () => (
    <div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "20px",
      }}>
        <div>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "8px"
          }}>Country</label>
          <input
            type="text"
            name="country"
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="United States"
            value={formik.values.country}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "8px"
          }}>City</label>
          <input
            type="text"
            name="city"
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="New York"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "8px"
        }}>Timezone</label>
        <input
          type="text"
          name="timezone"
          className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black text-base focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="EST (UTC-5)"
          value={formik.values.timezone}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  );

  const renderTermsAndPayment = () => (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <label style={{
          display: "flex",
          alignItems: "flex-start",
          cursor: "pointer",
          fontSize: "14px",
          color: "#374151",
        }}>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formik.values.termsAccepted}
            onChange={formik.handleChange}
            style={{ marginRight: "12px", marginTop: "2px" }}
          />
          <span>
            I agree to the{" "}
            <span style={{ color: "#3b82f6", textDecoration: "underline" }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span style={{ color: "#3b82f6", textDecoration: "underline" }}>
              Privacy Policy
            </span>
          </span>
        </label>
        {formik.touched.termsAccepted && formik.errors.termsAccepted && (
          <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "4px" }}>
            {formik.errors.termsAccepted}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "14px",
          color: "#374151",
        }}>
          <input
            type="checkbox"
            name="availableForWork"
            checked={formik.values.availableForWork}
            onChange={formik.handleChange}
            style={{ marginRight: "12px" }}
          />
          <span>I am currently available for work</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Progress Header */}
        <div className="bg-white border-b border-gray-200 px-12 py-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-base text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between px-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep(step.number)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    step.number <= currentStep 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                  }`}
                >
                  {step.number <= currentStep ? '✓' : step.number}
                </button>
                <div className="mt-3 text-center">
                  <div className={`text-sm font-medium cursor-pointer transition-colors ${
                    step.number <= currentStep ? 'text-blue-600 hover:text-blue-700' : 'text-gray-500'
                  }`}
                  onClick={() => setCurrentStep(step.number)}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="px-12 py-10">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-lg text-gray-600">
                {steps[currentStep - 1].description}
              </p>
            </div>

            <div className="mb-10">
              <div className="max-w-4xl">
                {renderStepContent()}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-10 py-4 rounded-lg font-medium text-base transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              {currentStep === totalSteps ? (
                <button
                  type="submit"
                  className="px-10 py-4 bg-blue-600 text-white rounded-lg font-medium text-base hover:bg-blue-700 transition-colors"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Creating Profile...' : 'Create Freelancer Profile'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-10 py-4 bg-blue-600 text-white rounded-lg font-medium text-base hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRegistrationForm;
