import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const AddMilestoneForm = ({
  projectId = "",
  projectTitle = "",
  embedded = false,
  onCancel,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const { id: paramProjectId } = useParams();
  const finalProjectId = projectId || paramProjectId;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: "",
      amount: "",
      deliverables: [""],
      status: "pending",
      projectId: finalProjectId,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title must be less than 100 characters")
        .required("Milestone title is required"),
      description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters")
        .required("Description is required"),
      dueDate: Yup.date()
        .min(new Date(), "Due date must be in the future")
        .required("Due date is required"),
      amount: Yup.number()
        .min(1, "Amount must be at least $1")
        .max(1000000, "Amount must be less than $1,000,000")
        .required("Amount is required"),
      deliverables: Yup.array()
        .of(Yup.string().min(1, "Deliverable cannot be empty"))
        .min(1, "At least one deliverable is required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: async (values, { setStatus }) => {
      setIsSubmitting(true);
      try {
        console.log("Creating milestone:", values);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (onSubmit) {
          onSubmit(values);
        } else {
          // Default behavior for standalone page
          setStatus({ success: "Milestone created successfully!" });
          setTimeout(
            () => navigate(`/client/milestones/${finalProjectId}`),
            2000
          );
        }
      } catch (error) {
        setStatus({ error: "Failed to create milestone. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const addDeliverable = () => {
    formik.setFieldValue("deliverables", [...formik.values.deliverables, ""]);
  };

  const removeDeliverable = (index) => {
    const newDeliverables = formik.values.deliverables.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("deliverables", newDeliverables);
  };

  const updateDeliverable = (index, value) => {
    const newDeliverables = [...formik.values.deliverables];
    newDeliverables[index] = value;
    formik.setFieldValue("deliverables", newDeliverables);
  };

  const content = (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      {/* Success/Error Messages */}
      {formik.status?.success && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-100 border-l-4 border-green-500 p-6 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-green-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-green-800 font-semibold text-sm">
              {formik.status.success}
            </span>
          </div>
        </div>
      )}

      {formik.status?.error && (
        <div className="bg-gradient-to-r from-red-50 to-pink-100 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-red-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-800 font-semibold text-sm">
              {formik.status.error}
            </span>
          </div>
        </div>
      )}

      {/* Project Information */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900">
            Project Information
          </h3>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <p className="text-gray-700">
            <span className="font-semibold">Project:</span>{" "}
            {projectTitle || "Website Redesign"}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Project ID: {finalProjectId || "PROJ-001"}
          </p>
        </div>
      </div>

      {/* Milestone Details */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-lg">1</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Milestone Details
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Define the milestone objectives and requirements
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Milestone Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              className={`w-full border-2 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                formik.touched.title && formik.errors.title
                  ? "border-red-400 bg-red-50"
                  : "border-purple-200 bg-white"
              }`}
              placeholder="e.g., Design Phase Completion, Frontend Development"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {formik.errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows="4"
              className={`w-full border-2 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-vertical ${
                formik.touched.description && formik.errors.description
                  ? "border-red-400 bg-red-50"
                  : "border-purple-200 bg-white"
              }`}
              placeholder="Describe what needs to be accomplished in this milestone, including specific requirements and success criteria..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {formik.errors.description}
              </p>
            )}
            <div
              className={`text-right mt-2 text-sm font-medium ${
                formik.values.description.length < 10
                  ? "text-red-600"
                  : "text-purple-600"
              }`}
            >
              {formik.values.description.length}/500 characters
            </div>
          </div>
        </div>
      </div>

      {/* Timeline & Budget */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-lg">2</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Timeline & Budget
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Set deadlines and payment details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dueDate"
              className={`w-full border-2 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                formik.touched.dueDate && formik.errors.dueDate
                  ? "border-red-400 bg-red-50"
                  : "border-green-200 bg-white"
              }`}
              min={new Date().toISOString().split("T")[0]}
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {formik.errors.dueDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Amount ($) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                name="amount"
              className={`w-full border-2 rounded-xl pl-10 pr-5 py-4 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                formik.touched.amount && formik.errors.amount
                  ? "border-red-400 bg-red-50"
                  : "border-green-200 bg-white"
              }`}
                placeholder="0.00"
                min="1"
                max="1000000"
                step="0.01"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.amount && formik.errors.amount && (
              <p className="mt-2 text-red-600 font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {formik.errors.amount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-lg">3</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Deliverables</h3>
            <p className="text-gray-600 text-sm mt-1">
              List specific items to be delivered
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {formik.values.deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={deliverable}
                  onChange={(e) => updateDeliverable(index, e.target.value)}
                  onBlur={formik.handleBlur}
                  className={`w-full border-2 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    formik.touched.deliverables &&
                    formik.errors.deliverables?.[index]
                      ? "border-red-400 bg-red-50"
                      : "border-orange-200 bg-white"
                  }`}
                  placeholder={`Deliverable ${
                    index + 1
                  } (e.g., Design mockups, Source code, Documentation)`}
                />
              </div>
              {formik.values.deliverables.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDeliverable(index)}
                  className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors"
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}

          {formik.touched.deliverables &&
            typeof formik.errors.deliverables === "string" && (
              <p className="text-red-600 font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {formik.errors.deliverables}
              </p>
            )}

          <button
            type="button"
            onClick={addDeliverable}
            className="flex items-center gap-3 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors text-sm font-semibold"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Another Deliverable
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-6 rounded-2xl border-2 border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-lg">4</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Status</h3>
            <p className="text-gray-600 text-sm mt-1">
              Set the initial status of this milestone
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              value: "pending",
              label: "Pending",
              color: "bg-yellow-100 text-yellow-800 border-yellow-300",
            },
            {
              value: "in_progress",
              label: "In Progress",
              color: "bg-blue-100 text-blue-800 border-blue-300",
            },
            {
              value: "completed",
              label: "Completed",
              color: "bg-green-100 text-green-800 border-green-300",
            },
          ].map((status) => (
            <label
              key={status.value}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formik.values.status === status.value
                  ? `${status.color} border-current shadow-md`
                  : "bg-white border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="status"
                value={status.value}
                checked={formik.values.status === status.value}
                onChange={formik.handleChange}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold">{status.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-between items-center pt-8 border-t-2 border-gray-200">
        <button
          type="button"
          onClick={embedded && onCancel ? onCancel : () => navigate(-1)}
          className="px-8 py-4 bg-gray-200 text-gray-800 text-sm font-semibold rounded-xl hover:bg-gray-300 transition-colors duration-200 border-2 border-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <svg
                className="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Milestone...
            </span>
          ) : (
            "Create Milestone"
          )}
        </button>
      </div>
    </form>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 text-sm font-semibold"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Project
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Add New Milestone
          </h1>
          <p className="text-base text-gray-600">
            Create a milestone to track progress and manage payments for your
            project
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {content}
        </div>
      </div>
    </div>
  );
};

export default AddMilestoneForm;
