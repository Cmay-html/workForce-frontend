import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const ClientRegistrationForm = () => {
  const navigate = useNavigate();
  const { registerClient } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      password: "",
      confirmPassword: "",

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
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      companyName: Yup.string().required("Company name is required"),
      industry: Yup.string().required("Industry is required"),
      companySize: Yup.string().required("Company size is required"),
      description: Yup.string()
        .min(50, "Description must be at least 50 characters")
        .max(1000, "Description must be less than 1000 characters"),
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

        // API call to register client
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Register client
        const result = await registerClient(values);
        if (result.success) {
          setStatus({ success: "Client profile created successfully!" });
          setTimeout(() => navigate('/client/dashboard'), 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mx-auto mb-6 shadow-2xl flex items-center justify-center">
            <span className="text-white font-bold text-3xl">KF</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Join as a Client
          </h1>
          <p className="text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto">
            Create your client profile to start posting projects and hiring talented freelancers
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Success Message */}
          {formik.status?.success && (
            <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{formik.status.success}</h3>
                  {formik.status.verificationRequired && (
                    <div className="mt-3">
                      <p className="mb-2 text-lg">
                        Check your email at <strong>{formik.status.email}</strong> for a verification link.
                      </p>
                      <p className="mb-3 text-lg opacity-90">
                        The verification link has been logged to the console for testing purposes.
                      </p>
                      <button
                        onClick={() => navigate('/login')}
                        className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                      >
                        Go to Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {formik.status?.error && (
            <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{formik.status.error}</h3>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="p-8">
            {/* Profile Picture Section */}
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white">
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    "CU"
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                />
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-lg font-medium mt-4">
                Click to upload profile picture <span className="text-gray-400">(Optional)</span>
              </p>
            </div>

            {/* Personal Information */}
            <div className="mb-12 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-3xl border-2 border-blue-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
                  <p className="text-gray-600 text-lg mt-1">Tell us about yourself</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`w-full border-2 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formik.touched.firstName && formik.errors.firstName ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white'
                    }`}
                    placeholder="John"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={`w-full border-2 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formik.touched.lastName && formik.errors.lastName ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white'
                    }`}
                    placeholder="Doe"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`w-full border-2 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formik.touched.email && formik.errors.email ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white'
                    }`}
                    placeholder="john.doe@company.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field with Visibility Toggle */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`w-full border-2 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12 ${
                        formik.touched.password && formik.errors.password ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white'
                      }`}
                      placeholder="Create a password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field with Visibility Toggle */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className={`w-full border-2 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12 ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white'
                      }`}
                      placeholder="Confirm your password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border-2 border-blue-200 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                    placeholder="+1 (555) 123-4567"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="mb-12 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-3xl border-2 border-purple-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Company Information</h2>
                  <p className="text-gray-600 text-lg mt-1">Tell us about your company</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    className={`w-full border-2 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      formik.touched.companyName && formik.errors.companyName ? 'border-red-400 bg-red-50' : 'border-purple-200 bg-white'
                    }`}
                    placeholder="Acme Corporation"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.companyName && formik.errors.companyName && (
                    <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.companyName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="industry"
                      className={`w-full border-2 rounded-xl px-5 py-4 text-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        formik.touched.industry && formik.errors.industry ? 'border-red-400 bg-red-50' : 'border-purple-200 bg-white'
                      }`}
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
                      <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {formik.errors.industry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Company Size <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="companySize"
                      className={`w-full border-2 rounded-xl px-5 py-4 text-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        formik.touched.companySize && formik.errors.companySize ? 'border-red-400 bg-red-50' : 'border-purple-200 bg-white'
                      }`}
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
                      <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {formik.errors.companySize}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Company Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    className="w-full border-2 border-purple-200 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white"
                    placeholder="https://www.company.com"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Company Description
                  </label>
                  <textarea
                    name="description"
                    className={`w-full border-2 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-vertical ${
                      formik.touched.description && formik.errors.description ? 'border-red-400 bg-red-50' : 'border-purple-200 bg-white'
                    }`}
                    rows="5"
                    placeholder="Describe your company, its mission, and what type of projects you typically work on..."
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.description}
                    </p>
                  )}
                  <div className={`text-right mt-2 text-lg font-medium ${
                    formik.values.description.length < 50 ? 'text-red-600' : 'text-purple-600'
                  }`}>
                    {formik.values.description.length}/1000 characters
                    {formik.values.description.length < 50 && " (Minimum 50 characters required)"}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Preferences */}
            <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Project Preferences</h2>
                  <p className="text-gray-600 text-lg mt-1">What type of projects do you need?</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    Project Types <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-600 text-lg mb-6">
                    Select the types of projects you typically need (choose at least one)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectTypes.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          formik.values.projectTypes.includes(type)
                            ? 'border-green-500 bg-green-100 text-green-800 shadow-md'
                            : 'border-green-200 bg-white text-gray-700 hover:border-green-300'
                        }`}
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
                          className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                        />
                        <span className="text-lg font-medium">{type}</span>
                      </label>
                    ))}
                  </div>
                  {formik.touched.projectTypes && formik.errors.projectTypes && (
                    <p className="mt-4 text-red-600 font-medium text-lg flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.projectTypes}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Typical Budget Range
                    </label>
                    <select
                      name="budgetRange"
                      className="w-full border-2 border-green-200 rounded-xl px-5 py-4 text-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
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
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Typical Project Timeline
                    </label>
                    <select
                      name="timeline"
                      className="w-full border-2 border-green-200 rounded-xl px-5 py-4 text-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white"
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
            </div>

            {/* Location */}
            <div className="mb-12 bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-3xl border-2 border-orange-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Location</h2>
                  <p className="text-gray-600 text-lg mt-1">Where is your company based?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="w-full border-2 border-orange-200 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-white"
                    placeholder="United States"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="w-full border-2 border-orange-200 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-white"
                    placeholder="New York"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Timezone
                  </label>
                  <input
                    type="text"
                    name="timezone"
                    className="w-full border-2 border-orange-200 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-white"
                    placeholder="EST (UTC-5)"
                    value={formik.values.timezone}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="mb-12 bg-gradient-to-r from-gray-50 to-slate-100 p-8 rounded-3xl border-2 border-gray-200">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-xl">5</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Terms & Agreement</h2>
                  <p className="text-gray-600 text-lg mt-1">Final steps to complete your registration</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
                <label className="flex items-start space-x-6 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formik.values.termsAccepted}
                    onChange={formik.handleChange}
                    className={`mt-2 w-6 h-6 text-blue-600 focus:ring-blue-500 rounded ${
                      formik.touched.termsAccepted && formik.errors.termsAccepted ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-3">
                      I agree to the Client Terms of Service and Privacy Policy <span className="text-red-500">*</span>
                    </div>
                    <div className="text-lg text-gray-700 leading-relaxed">
                      By creating a client account, you agree to our platform rules,
                      payment terms, and freelancer hiring guidelines.
                    </div>
                    {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                      <p className="mt-4 text-red-600 font-medium text-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {formik.errors.termsAccepted}
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-between items-center pt-12 border-t-2 border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-12 py-4 bg-gray-200 text-gray-800 text-xl font-semibold rounded-xl hover:bg-gray-300 transition-colors duration-200 border-2 border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Profile...
                  </span>
                ) : (
                  "Create Client Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientRegistrationForm;