
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ClientSettingsForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("security");

  const formik = useFormik({
    initialValues: {
      // Security
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",

      // Privacy
      profileVisibility: "public",
      showEarnings: false,
      allowMessages: true,

      // Billing
      paymentMethod: "credit_card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",

      // Notifications
      emailNotifications: true,
      proposalAlerts: true,
      milestoneUpdates: true,
      paymentReceipts: true,
      marketingEmails: false,
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain uppercase, lowercase, and number"
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Updating settings:", values);
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

            <div style={{ marginBottom: "24px" }}>
              <label className="form-label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="form-input"
                placeholder="Enter current password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "24px",
              }}
            >
              <div>
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-input"
                  placeholder="Enter new password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm new password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
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

            <div
              style={{
                background: "#f0f9ff",
                padding: "16px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #bae6fd",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Password Requirements
              </h4>
              <ul
                style={{
                  fontSize: "14px",
                  color: "#0369a1",
                  margin: 0,
                  paddingLeft: "20px",
                }}
              >
                <li>Minimum 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
              </ul>
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
                      Anyone can see your profile and project history
                    </div>
                  </div>
                </label>

                <label
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="freelancers_only"
                    checked={
                      formik.values.profileVisibility === "freelancers_only"
                    }
                    onChange={formik.handleChange}
                  />
                  <div>
                    <div style={{ fontWeight: "500" }}>Freelancers Only</div>
                    <div
                      style={{ fontSize: "14px", color: "var(--text-light)" }}
                    >
                      Only registered freelancers can see your profile
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
                  name="showEarnings"
                  checked={formik.values.showEarnings}
                  onChange={formik.handleChange}
                />
                Show project budget ranges on my public profile
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
                  name="allowMessages"
                  checked={formik.values.allowMessages}
                  onChange={formik.handleChange}
                />
                Allow freelancers to message me directly
              </label>
            </div>
          </div>
        );

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
                    New proposal alerts
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
                    Milestone submission updates
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
                      name="paymentReceipts"
                      checked={formik.values.paymentReceipts}
                      onChange={formik.handleChange}
                    />
                    Payment receipts and invoices
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
                      name="marketingEmails"
                      checked={formik.values.marketingEmails}
                      onChange={formik.handleChange}
                    />
                    Marketing and promotional emails
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-content" style={{ minWidth: '1024px' }}>
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Client Settings
        </h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>

      <div style={{ display: "flex", gap: "24px" }}>
        {/* Sidebar Navigation */}
        <div
          style={{
            width: "250px",
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { id: "security", label: "Security" },
                { id: "privacy", label: "Privacy" },
                { id: "notifications", label: "Notifications" },
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
                          ? "#f3f4f6"
                          : "transparent",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: activeTab === tab.id ? "600" : "400",
                      color:
                        activeTab === tab.id
                          ? "#3b82f6"
                          : "#1f2937",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s ease",
                    }}
                  >
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
                  onClick={() => window.location.href = '/dashboard'}
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

export default ClientSettingsForm;
