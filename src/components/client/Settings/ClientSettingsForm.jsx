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
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              Security Settings
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                placeholder="Enter current password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  placeholder="Enter new password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-black placeholder:text-gray-500"
                  placeholder="Confirm new password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="mt-1 text-sm text-red-600">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Password Requirements
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
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
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              Privacy Settings
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-800 mb-3">
                Profile Visibility
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="public"
                    checked={formik.values.profileVisibility === "public"}
                    onChange={formik.handleChange}
                    className="mt-1 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Public</div>
                    <div className="text-sm text-gray-600">
                      Anyone can see your profile and project history
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="freelancers_only"
                    checked={
                      formik.values.profileVisibility === "freelancers_only"
                    }
                    onChange={formik.handleChange}
                    className="mt-1 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Freelancers Only</div>
                    <div className="text-sm text-gray-600">
                      Only registered freelancers can see your profile
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="private"
                    checked={formik.values.profileVisibility === "private"}
                    onChange={formik.handleChange}
                    className="mt-1 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Private</div>
                    <div className="text-sm text-gray-600">
                      Only you can see your profile details
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="showEarnings"
                  checked={formik.values.showEarnings}
                  onChange={formik.handleChange}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-900">Show project budget ranges on my public profile</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="allowMessages"
                  checked={formik.values.allowMessages}
                  onChange={formik.handleChange}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-900">Allow freelancers to message me directly</span>
              </label>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              Notification Settings
            </h3>

            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Email Notifications
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formik.values.emailNotifications}
                      onChange={formik.handleChange}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-900">Enable all email notifications</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="proposalAlerts"
                      checked={formik.values.proposalAlerts}
                      onChange={formik.handleChange}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-900">New proposal alerts</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="milestoneUpdates"
                      checked={formik.values.milestoneUpdates}
                      onChange={formik.handleChange}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-900">Milestone submission updates</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="paymentReceipts"
                      checked={formik.values.paymentReceipts}
                      onChange={formik.handleChange}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-900">Payment receipts and invoices</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="marketingEmails"
                      checked={formik.values.marketingEmails}
                      onChange={formik.handleChange}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-900">Marketing and promotional emails</span>
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

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <nav>
            <ul className="space-y-2">
              {[
                { id: "security", label: "Security" },
                { id: "privacy", label: "Privacy" },
                { id: "notifications", label: "Notifications" },
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
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="chart-card">
            {formik.status?.success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-5">
                {formik.status.success}
              </div>
            )}

            {formik.status?.error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-5">
                {formik.status.error}
              </div>
            )}

            <form onSubmit={formik.handleSubmit}>
              <TabContent />

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
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
  );
};

export default ClientSettingsForm;
