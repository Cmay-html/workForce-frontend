
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const MilestoneSubmissionForm = () => {
  const navigate = useNavigate();
  const { projectId, milestoneId } = useParams();
  const [files, setFiles] = useState([]);

  // Mock milestone data - would come from API
  const milestone = {
    id: milestoneId,
    title: "Design Phase Completion",
    description: "Complete all design mockups and get client approval",
    dueDate: "2024-02-15",
    amount: 1500,
    deliverables: ["Wireframes for all pages", "UI mockups", "Style guide"],
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      notes: "",
      files: [],
    },
    validationSchema: Yup.object({
      description: Yup.string()
        .min(50, "Please provide a detailed description of your work")
        .required("Description is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const submissionData = {
          projectId,
          milestoneId,
          ...values,
          files,
        };

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus({ success: "Milestone submitted successfully!" });
        setTimeout(() => navigate(`/freelancer/projects/${projectId}`), 1500);
      } catch {
        setStatus({ error: "Failed to submit milestone. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      "image/*",
      "application/pdf",
      "application/zip",
      "video/*",
    ];

    for (let file of newFiles) {
      if (file.size > maxSize) {
        formik.setStatus({
          error: `File ${file.name} is too large. Maximum size is 50MB.`,
        });
        return;
      }
      if (!allowedTypes.some((type) => file.type.match(type))) {
        formik.setStatus({
          error: `File ${file.name} has an unsupported format.`,
        });
        return;
      }
    }

    setFiles([...files, ...newFiles]);
    formik.setStatus(null);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="main-content" style={{ minWidth: '1024px' }}>
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Project
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Submit Milestone
        </h1>
        <p className="text-gray-600">Submit your work for: {milestone.title}</p>
      </div>

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

        {/* Milestone Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Milestone Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">Amount</div>
              <div className="text-xl font-bold text-blue-600">
                ${milestone.amount.toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">Due Date</div>
              <div className="text-base font-medium text-gray-900">
                {new Date(milestone.dueDate).toLocaleDateString()}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Awaiting Submission
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              Required Deliverables:
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              {milestone.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Work Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Description *
            </label>
            <textarea
              name="description"
              rows="6"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Describe the work you've completed for this milestone. Include details about what was delivered, any challenges faced, and how you addressed them..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              name="notes"
              rows="4"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Any additional information for the client, questions, or next steps..."
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deliverable Files
            </label>
            <p className="text-sm text-gray-500 mb-4">
              Upload all files related to this milestone delivery. Max 50MB per file.
            </p>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200"
              onClick={() => document.getElementById("file-upload").click()}
            >
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="image/*,application/pdf,application/zip,video/*,.doc,.docx,.xls,.xlsx"
              />
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-lg font-medium text-gray-900 mb-1">
                Click to upload files or drag and drop
              </div>
              <p className="text-sm text-gray-500">
                Supports images, PDFs, documents, and zip files
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Files to Upload ({files.length})
                </h4>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium hover:bg-red-50 px-2 py-1 rounded transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MilestoneSubmissionForm;
