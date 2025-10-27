
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
        console.log("Updating freelancer settings:", values);
        // API call would go here
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
                    console.log("Deactivating account...");
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
            Freelancer Settings
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Manage your account preferences and security
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px" }}>
        {/* Sidebar Navigation */}
        <div
          style={{
            width: "250px",
            background: "var(--primary-white)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-light)",
            padding: "20px",
          }}
        >
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { id: "notifications", label: "Notifications", icon: "🔔" },
                { id: "privacy", label: "Privacy", icon: "👁️" },
                { id: "security", label: "Security", icon: "🔒" },
              ].map((tab) => (
                <li key={tab.id} style={{ marginBottom: "8px" }}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      background:
                        activeTab === tab.id
                          ? "var(--secondary-white)"
                          : "transparent",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: activeTab === tab.id ? "600" : "400",
                      color:
                        activeTab === tab.id
                          ? "var(--accent-blue)"
                          : "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Settings Content */}
        <div style={{ flex: 1 }}>
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
              <TabContent />

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  paddingTop: "24px",
                  marginTop: "24px",
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
                  {formik.isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSettingsForm;
