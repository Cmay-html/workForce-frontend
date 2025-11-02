
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/freelancer/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Freelancer Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your professional profile and portfolio
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          {/* Success/Error Messages */}
          {formik.status?.success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
              {formik.status.success}
            </div>
          )}

          {formik.status?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {formik.status.error}
            </div>
          )}

        <form onSubmit={formik.handleSubmit}>
          {/* Profile Picture Section */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                1
              </span>
              Profile Picture
            </h3>

            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg"
                  style={{
                    background: avatar
                      ? `url(${avatar}) center/cover`
                      : undefined,
                  }}
                >
                  {!avatar &&
                    (user?.firstName?.[0] || "F") + (user?.lastName?.[0] || "L")}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                />
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Click the camera icon to upload a profile picture
                <br />
                <span className="text-xs text-gray-500">
                  JPG, PNG, GIF • Max 5MB
                </span>
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                2
              </span>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                3
              </span>
              Professional Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Professional Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  placeholder="e.g., Senior React Developer"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Professional Bio <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="bio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500 resize-vertical"
                  rows="5"
                  placeholder="Describe your experience, skills, expertise, and what you can offer to clients..."
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.bio && formik.errors.bio && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.bio}
                  </p>
                )}
                <div className="text-xs text-gray-500 text-right mt-1">
                  {formik.values.bio.length}/1000 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Experience Level <span className="text-red-600">*</span>
                </label>
                <select
                  name="experienceLevel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black"
                  value={formik.values.experienceLevel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" className="text-gray-500">Select Experience Level</option>
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value} className="text-black">
                      {level.label}
                    </option>
                  ))}
                </select>
                {formik.touched.experienceLevel &&
                  formik.errors.experienceLevel && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.experienceLevel}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Skills & Categories */}
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                4
              </span>
              Skills & Specializations
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Skills <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {skills.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formik.values.skills.includes(skill)
                          ? "bg-blue-100 border-blue-500 text-blue-900"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
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
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{skill}</span>
                    </label>
                  ))}
                </div>
                {formik.touched.skills && formik.errors.skills && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.skills}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Categories <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formik.values.categories.includes(category)
                          ? "bg-blue-100 border-blue-500 text-blue-900"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
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
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{category}</span>
                    </label>
                  ))}
                </div>
                {formik.touched.categories && formik.errors.categories && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.categories}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Portfolio Links */}
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                5
              </span>
              Portfolio & Links
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Portfolio Website
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  placeholder="https://yourportfolio.com"
                  value={formik.values.portfolioUrl}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                    placeholder="https://github.com/username"
                    value={formik.values.githubUrl}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                    placeholder="https://linkedin.com/in/username"
                    value={formik.values.linkedinUrl}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Behance/Dribbble (Designers)
                </label>
                <input
                  type="url"
                  name="behanceUrl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  placeholder="https://behance.net/username"
                  value={formik.values.behanceUrl}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>

          {/* Location & Availability */}
          <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                6
              </span>
              Location & Availability
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Average Response Time
                </label>
                <select
                  name="responseTime"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black"
                  value={formik.values.responseTime}
                  onChange={formik.handleChange}
                >
                  <option value="2 hours">Within 2 hours</option>
                  <option value="6 hours">Within 6 hours</option>
                  <option value="24 hours">Within 24 hours</option>
                  <option value="48 hours">Within 48 hours</option>
                </select>
              </div>

              <label className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="availableForWork"
                  checked={formik.values.availableForWork}
                  onChange={formik.handleChange}
                  className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    Available for Work
                  </div>
                  <div className="text-sm text-gray-600">
                    I am currently available for new projects
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                7
              </span>
              Payment Information
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">
                Milestone-Based Payments
              </h4>
              <p className="text-blue-800 leading-relaxed">
                All payments are milestone-based. You'll agree on project
                milestones with clients, and payments are released when each
                milestone is completed and approved. This ensures fair payment
                for delivered work.
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                8
              </span>
              Save Changes
            </h3>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/freelancer/dashboard")}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfileForm;
