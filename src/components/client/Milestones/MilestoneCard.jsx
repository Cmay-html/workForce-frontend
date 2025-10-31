
import React, { useState } from "react";

const MilestoneCard = ({ milestone, onApprove, onRequestRevision }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const statusColors = {
    pending_approval: {
      background: "#fffbf0",
      color: "#d97706",
      border: "#f59e0b",
    },
    approved: { background: "#f0f9ff", color: "#0369a1", border: "#0ea5e9" },
    in_progress: {
      background: "var(--secondary-white)",
      color: "var(--accent-blue)",
      border: "var(--accent-blue)",
    },
    completed: { background: "#f0fdf4", color: "#059669", border: "#10b981" },
    revision_requested: {
      background: "#fff7ed",
      color: "#ea580c",
      border: "#f97316",
    },
  };

  const statusStyle =
    statusColors[milestone.status] || statusColors.pending_approval;

  const handlePayment = () => {
    alert(`Processing payment of $${milestone.amount} via ${paymentMethod}`);
    setShowPaymentModal(false);
    onApprove(milestone.id);
  };

  return (
    <>
      <div
        className="stat-card"
        style={{ borderLeft: `4px solid ${statusStyle.border}` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "var(--text-primary)",
              }}
            >
              {milestone.title}
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              {milestone.projectTitle}
            </p>
          </div>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "500",
              background: statusStyle.background,
              color: statusStyle.color,
              border: `1px solid ${statusStyle.border}`,
            }}
          >
            {milestone.status.replace("_", " ")}
          </span>
        </div>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          {milestone.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div>
            <span style={{ color: "var(--text-light)", fontSize: "12px" }}>
              Amount:
            </span>
            <p style={{ fontWeight: "600", color: "var(--text-primary)" }}>
              ${milestone.amount}
            </p>
          </div>
          <div>
            <span style={{ color: "var(--text-light)", fontSize: "12px" }}>
              Due Date:
            </span>
            <p style={{ fontWeight: "500", color: "var(--text-primary)" }}>
              {milestone.dueDate}
            </p>
          </div>
        </div>

        {milestone.status === "pending_approval" && (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="login-btn"
              style={{ padding: "10px 20px", margin: 0 }}
            >
              Approve & Pay
            </button>
            <button
              onClick={() => onRequestRevision(milestone.id)}
              style={{
                background: "var(--secondary-white)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Request Revision
            </button>
          </div>
        )}
      </div>

      {showPaymentModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 50,
          }}
        >
          <div
            className="chart-card"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              Process Payment
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "8px" }}>
              Amount:{" "}
              <span
                style={{ fontWeight: "bold", color: "var(--text-primary)" }}
              >
                ${milestone.amount}
              </span>
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
              For: {milestone.title}
            </p>

            <div style={{ marginBottom: "24px" }}>
              {["Credit Card", "PayPal", "Bank Transfer", "Mobile Money"].map((method) => (
                <label
                  key={method}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: "8px" }}
                  />
                  {method}
                </label>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handlePayment}
                disabled={!paymentMethod}
                className="login-btn"
                style={{
                  flex: 1,
                  padding: "12px",
                  margin: 0,
                  opacity: !paymentMethod ? 0.6 : 1,
                  cursor: !paymentMethod ? "not-allowed" : "pointer",
                }}
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  flex: 1,
                  background: "var(--secondary-white)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MilestoneCard;
