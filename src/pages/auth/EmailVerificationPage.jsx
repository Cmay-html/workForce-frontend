import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({});

  useEffect(() => {
    const verifyUserEmail = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        setStatus({
          success: false,
          message: 'Invalid verification link. Missing token or email.'
        });
        setLoading(false);
        return;
      }

      try {
        const result = await verifyEmail(token, email);
        if (result.success) {
          setStatus({
            success: true,
            message: 'Email verified successfully! Welcome to Kazi Flow.',
            user: result.user
          });
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            const redirectPath = result.user.role === 'client'
              ? '/client/dashboard'
              : '/freelancer/dashboard';
            navigate(redirectPath);
          }, 3000);
        } else {
          setStatus({
            success: false,
            message: result.error || 'Email verification failed.'
          });
        }
      } catch (error) {
        setStatus({
          success: false,
          message: 'An error occurred during verification.'
        });
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#D85A3E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(2px)",
        }}></div>
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "500px", padding: "2rem" }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "3rem 2.5rem",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            textAlign: "center"
          }}>
            {/* Header */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #D85A3E, #ff6b4a)",
                  borderRadius: "20px",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 25px rgba(216, 90, 62, 0.3)"
                }}>
                  <span style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}>KF</span>
                </div>
              </div>
              <h1 style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "0.5rem"
              }}>
                Email Verification
              </h1>
              <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: "1.5" }}>
                Verifying your email address...
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ marginBottom: "2rem" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  border: "4px solid #e2e8f0",
                  borderTop: "4px solid #D85A3E",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 1.5rem"
                }}></div>
                <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
                  Please wait while we verify your email...
                </p>
              </div>
            )}

            {/* Success State */}
            {!loading && status.success && (
              <div style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#166534",
                padding: "1.5rem",
                borderRadius: "12px",
                marginBottom: "2rem"
              }}>
                <div style={{ marginBottom: "1rem" }}>
                  <svg style={{
                    width: "48px",
                    height: "48px",
                    color: "#16a34a",
                    margin: "0 auto",
                    display: "block"
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem"
                }}>
                  Verification Successful!
                </h3>
                <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  {status.message}
                </p>
                <p style={{
                  fontSize: "0.9rem",
                  marginTop: "1rem",
                  opacity: 0.8
                }}>
                  Redirecting to your dashboard in a few seconds...
                </p>
              </div>
            )}

            {/* Error State */}
            {!loading && !status.success && (
              <div style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "1.5rem",
                borderRadius: "12px",
                marginBottom: "2rem"
              }}>
                <div style={{ marginBottom: "1rem" }}>
                  <svg style={{
                    width: "48px",
                    height: "48px",
                    color: "#dc2626",
                    margin: "0 auto",
                    display: "block"
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem"
                }}>
                  Verification Failed
                </h3>
                <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  {status.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {!loading && (
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    background: "#D85A3E",
                    border: "none",
                    borderRadius: "8px",
                    color: "#ffffff",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.background = "#c44a35"}
                  onMouseOut={(e) => e.target.style.background = "#D85A3E"}
                >
                  Go to Login
                </button>
                {!status.success && (
                  <button
                    onClick={() => navigate('/register')}
                    style={{
                      padding: "0.75rem 1.5rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      background: "transparent",
                      border: "2px solid #D85A3E",
                      borderRadius: "8px",
                      color: "#D85A3E",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = "#D85A3E";
                      e.target.style.color = "#ffffff";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#D85A3E";
                    }}
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default EmailVerificationPage;
