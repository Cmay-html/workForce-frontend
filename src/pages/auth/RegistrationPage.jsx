// src/pages/auth/RegistrationPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClientRegistrationForm from '../../components/shared/auth/ClientRegistrationForm';
import FreelancerRegistrationForm from '../../components/shared/auth/FreelancerRegistrationForm';

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Left Side - Image/Branding */}
        <div style={styles.leftSide}>
          <div style={styles.circle1}></div>
          <div style={styles.circle2}></div>
          <div style={styles.circle3}></div>
        </div>

        {/* Right Side - Registration Content */}
        <div style={styles.rightSide}>
          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Join WorkforceFlow</h2>
              <p style={styles.formSubtitle}>
                Choose your account type to get started
              </p>
            </div>

            <div style={styles.selectionContainer}>
              <div
                onClick={() => navigate('/register/client')}
                style={styles.accountTypeCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <div style={{ ...styles.accountTypeIcon, backgroundColor: '#3b82f6' }}>
                  🏢
                </div>
                <div style={styles.accountTypeContent}>
                  <h3 style={styles.accountTypeTitle}>Hire Freelancers</h3>
                  <p style={styles.accountTypeDescription}>
                    Post projects, find talent, and manage your business
                  </p>
                </div>
              </div>

              <div
                onClick={() => navigate('/register/freelancer')}
                style={styles.accountTypeCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.backgroundColor = '#ecfdf5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <div style={{ ...styles.accountTypeIcon, backgroundColor: '#10b981' }}>
                  💼
                </div>
                <div style={styles.accountTypeContent}>
                  <h3 style={styles.accountTypeTitle}>Find Work</h3>
                  <p style={styles.accountTypeDescription}>
                    Apply to projects, showcase your skills, and get paid
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.footer}>
              <p style={styles.switchText}>
                Already have an account?{' '}
                <span
                  style={styles.switchLink}
                  onClick={() => navigate('/login')}
                >
                  Sign in here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
    padding: "2rem",
    boxSizing: "border-box",
  },

  loginCard: {
    display: "flex",
    width: "100%",
    maxWidth: "750px",
    height: "70vh",
    overflow: "hidden",
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },

  leftSide: {
    flex: "0 0 45%",
    background: `url('https://i.pinimg.com/1200x/9b/7f/a2/9b7fa25193e0b7efed42c0dc3f97061d.jpg') center/cover`,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  circle1: {
    position: "absolute",
    top: "15%",
    left: "15%",
    width: "120px",
    height: "120px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite",
  },

  circle2: {
    position: "absolute",
    bottom: "25%",
    right: "15%",
    width: "90px",
    height: "90px",
    background: "rgba(255, 255, 255, 0.04)",
    borderRadius: "50%",
    animation: "float 8s ease-in-out infinite 1s",
  },

  circle3: {
    position: "absolute",
    top: "65%",
    right: "35%",
    width: "60px",
    height: "60px",
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "50%",
    animation: "float 5s ease-in-out infinite 0.5s",
  },

  rightSide: {
    flex: "0 0 55%",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    borderTopRightRadius: "24px",
    borderBottomRightRadius: "24px",
  },

  formContainer: {
    width: "100%",
    maxWidth: "100%",
    background: "#ffffff",
    padding: "0",
    borderRadius: "0",
    border: "none",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },

  formHeader: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },

  formTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1a202c",
    margin: "0 0 0.5rem 0",
    letterSpacing: "-0.02em",
  },

  formSubtitle: {
    fontSize: "0.9rem",
    color: "#718096",
    margin: 0,
    fontWeight: "400",
    lineHeight: "1.4",
  },

  selectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    marginBottom: "1.5rem",
  },

  accountTypeCard: {
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    padding: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
  },

  accountTypeIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
  },

  accountTypeContent: {
    flex: 1,
  },

  accountTypeTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 0.2rem 0",
  },

  accountTypeDescription: {
    fontSize: "0.8rem",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.3",
  },

  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#f97316",
    background: "none",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: "500",
    cursor: "pointer",
    marginBottom: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },

  formWrapper: {
    maxHeight: "60vh",
    overflowY: "auto",
    paddingRight: "0.5rem",
  },

  footer: {
    textAlign: "center",
  },

  switchText: {
    fontSize: "0.8rem",
    color: "#718096",
    margin: 0,
  },

  switchLink: {
    color: "#f97316",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
};

// Add keyframes for animations
const keyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
`;

// Inject keyframes
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = keyframes;
  document.head.appendChild(styleElement);
}

export default RegistrationPage;
