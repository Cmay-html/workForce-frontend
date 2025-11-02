
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const FreelancerSettingsForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("notifications");

  const formik = useFormik({
    initialValues: {
      // Notifications
      emailNotifications: true,
      proposalAlerts: true,
      milestoneUpdates: true,
      paymentNotifications: true,
      clientMessages: true,
      projectInvites: true,

      // Privacy
      profileVisibility: "public",
      showCompletedProjects: true,
      showEarnings: false,
      allowDirectMessages: true,

      // Security
      twoFactorAuth: false,
      loginAlerts: true,
    },
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStatus({ success: "Settings updated successfully!" });
      } catch {
        setStatus({ error: "Failed to update settings. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const TabContent = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Notification Settings
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  Email Notifications
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
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
                      name="emailNotifications"
                      checked={formik.values.emailNotifications}
                      onChange={formik.handleChange}
                    />
                    Enable all email notifications
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
                      name="proposalAlerts"
                      checked={formik.values.proposalAlerts}
                      onChange={formik.handleChange}
                    />
                    New project alerts and invitations
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
                      name="milestoneUpdates"
                      checked={formik.values.milestoneUpdates}
                      onChange={formik.handleChange}
                    />
                    Milestone approval and revision requests
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
                      name="paymentNotifications"
                      checked={formik.values.paymentNotifications}
                      onChange={formik.handleChange}
                    />
                    Payment receipts and releases
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
                      name="clientMessages"
                      checked={formik.values.clientMessages}
                      onChange={formik.handleChange}
                    />
                    Client messages and communications
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Privacy Settings
            </h3>

            <div style={{ marginBottom: "24px" }}>
              <label className="form-label">Profile Visibility</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >
                <label
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="public"
                    checked={formik.values.profileVisibility === "public"}
                    onChange={formik.handleChange}
                  />
                  <div>
                    <div style={{ fontWeight: "500" }}>Public</div>
                    <div
                      style={{ fontSize: "14px", color: "var(--text-light)" }}
                    >
                      Anyone can see your profile and portfolio
                    </div>
                  </div>
                </label>

                <label
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="clients_only"
                    checked={formik.values.profileVisibility === "clients_only"}
                    onChange={formik.handleChange}
                  />
                  <div>
                    <div style={{ fontWeight: "500" }}>Clients Only</div>
                    <div
                      style={{ fontSize: "14px", color: "var(--text-light)" }}
                    >
                      Only registered clients can see your profile
                    </div>
                  </div>
                </label>

                <label
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="private"
                    checked={formik.values.profileVisibility === "private"}
                    onChange={formik.handleChange}
                  />
                  <div>
                    <div style={{ fontWeight: "500" }}>Private</div>
                    <div
                      style={{ fontSize: "14px", color: "var(--text-light)" }}
                    >
                      Only you can see your profile details
                    </div>
                  </div>
                </label>
              </div>
            </div>

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
                  name="showCompletedProjects"
                  checked={formik.values.showCompletedProjects}
                  onChange={formik.handleChange}
                />
                Show completed projects on my public profile
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
                  name="showEarnings"
                  checked={formik.values.showEarnings}
                  onChange={formik.handleChange}
                />
                Show project earnings (amounts will be hidden)
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
                  name="allowDirectMessages"
                  checked={formik.values.allowDirectMessages}
                  onChange={formik.handleChange}
                />
                Allow clients to message me directly
              </label>
            </div>
          </div>
        );

      case "security":
        return (
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Security Settings
            </h3>

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
                  name="twoFactorAuth"
                  checked={formik.values.twoFactorAuth}
                  onChange={formik.handleChange}
                />
                Enable Two-Factor Authentication
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
                  name="loginAlerts"
                  checked={formik.values.loginAlerts}
                  onChange={formik.handleChange}
                />
                Send email alerts for new logins
              </label>
            </div>

            <div
              style={{
                background: "#fef3f2",
                padding: "16px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #fecaca",
                marginTop: "24px",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#dc2626",
                }}
              >
                Account Actions
              </h4>
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to deactivate your account? This action can be reversed within 30 days."
                    )
                  ) {
                  }
                }}
                style={{
                  background: "none",
                  border: "1px solid #dc2626",
                  color: "#dc2626",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Deactivate Account
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
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
            Freelancer Settings
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account preferences and security
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <nav>
              <ul className="space-y-2">
                {[
                  { id: "notifications", label: "Notifications", icon: "🔔" },
                  { id: "privacy", label: "Privacy", icon: "👁️" },
                  { id: "security", label: "Security", icon: "🔒" },
                ].map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-white text-primary-600 font-semibold"
                          : "text-gray-700 hover:bg-white hover:text-gray-900"
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
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
                <TabContent />

                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate("/freelancer/dashboard")}
                    className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="login-btn px-8 py-3"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSettingsForm;
